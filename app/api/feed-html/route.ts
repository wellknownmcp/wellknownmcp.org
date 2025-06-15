// app/api/feed-html/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { join } from 'path'
import { verifyFeedSignature, verifyFeedCertification } from '@/lib/verifyCrypto'
import { analyzeBlocks } from '@/lib/analyzeBlocks'

interface FeedData {
  feed_type?: string
  feedtype?: string
  metadata?: {
    title?: string
    description?: string
    origin?: string
    last_updated?: string
  }
  trust?: {
    signature?: string
    signed_blocks?: string[]
  }
  capabilities?: any
  tags?: string[]
  [key: string]: any
}

interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings?: string[]
}

interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning'
  suggestion?: string
}

interface CryptoValidationResult {
  signature: {
    present: boolean
    valid: boolean
    message: string
    algorithm?: string
  }
  certification: {
    present: boolean
    valid: boolean
    message: string
    certifier?: string
    level?: string
  }
  blocks: Array<{
    blockName: string
    isSigned: boolean
    isCertified: boolean
    signatureValid?: boolean
    certificationValid?: boolean
  }>
  trustLevel: 'none' | 'basic' | 'signed' | 'certified' | 'invalid'
  trustScore: number // 0-100
}

interface SourceInfo {
  url: string
  type: 'external' | 'local' | 'wellknown'
  sanitized: boolean
}

interface ValidatedParams {
  external?: string
  slug?: string
  wellknown?: string
  isValid: boolean
  error?: string
}

// 🛡️ SÉCURITÉ HTML - Fonctions d'échappement et sanitisation
function escapeHtml(unsafe: string): string {
  if (typeof unsafe !== 'string') return String(unsafe)
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') return ''
  const urlPattern = /^https?:\/\/[^\s<>"'\\]+$/i
  return urlPattern.test(url) ? url : ''
}

function sanitizeJsonForHtml(obj: any): string {
  try {
    const jsonString = JSON.stringify(obj, null, 2)
    return escapeHtml(jsonString)
  } catch (error) {
    return escapeHtml('{"error": "Invalid JSON structure"}')
  }
}

function sanitizeMetadata(metadata: any): {
  title: string
  description: string
  origin: string
  lastUpdated: string
} {
  const defaultValues = {
    title: 'Untitled Feed',
    description: '',
    origin: 'Unknown',
    lastUpdated: 'Unknown'
  }

  if (!metadata || typeof metadata !== 'object') {
    return defaultValues
  }

  return {
    title: escapeHtml(String(metadata.title || defaultValues.title)).substring(0, 200),
    description: escapeHtml(String(metadata.description || defaultValues.description)).substring(0, 500),
    origin: escapeHtml(String(metadata.origin || defaultValues.origin)).substring(0, 200),
    lastUpdated: metadata.last_updated ? 
      escapeHtml(String(metadata.last_updated)).substring(0, 50) : 
      defaultValues.lastUpdated
  }
}

function sanitizeTags(tags: any): string {
  if (!Array.isArray(tags)) return 'None'
  
  const safeTags = tags
    .filter(tag => typeof tag === 'string')
    .map(tag => escapeHtml(tag.substring(0, 50)))
    .slice(0, 10) // Max 10 tags
    
  return safeTags.length > 0 ? safeTags.join(', ') : 'None'
}

function validateAndSanitizeParams(searchParams: URLSearchParams): ValidatedParams {
  const external = searchParams.get('external')
  const slug = searchParams.get('slug')
  const wellknown = searchParams.get('wellknown')

  // Validation exclusive des paramètres
  const paramCount = [external, slug, wellknown].filter(p => p !== null).length
  if (paramCount !== 1) {
    return {
      isValid: false,
      error: 'Exactly one parameter required: external, slug, or wellknown'
    }
  }

  if (external) {
    const sanitizedUrl = sanitizeUrl(external)
    if (!sanitizedUrl) {
      return {
        isValid: false,
        error: 'Invalid external URL format'
      }
    }
    return { external: sanitizedUrl, isValid: true }
  }

  if (slug) {
    const slugPattern = /^[a-zA-Z0-9\-\/]+$/
    const cleanSlug = String(slug).substring(0, 200)
    if (!slugPattern.test(cleanSlug)) {
      return {
        isValid: false,
        error: 'Invalid slug format. Use alphanumeric characters, hyphens, and forward slashes only.'
      }
    }
    return { slug: cleanSlug, isValid: true }
  }

  if (wellknown) {
    const wellknownPattern = /^[a-zA-Z0-9\-]+$/
    const cleanWellknown = String(wellknown).substring(0, 100)
    if (!wellknownPattern.test(cleanWellknown)) {
      return {
        isValid: false,
        error: 'Invalid wellknown format. Use alphanumeric characters and hyphens only.'
      }
    }
    return { wellknown: cleanWellknown, isValid: true }
  }

  return { isValid: false, error: 'No valid parameter provided' }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  // 🛡️ VALIDATION ET SANITISATION DES PARAMÈTRES
  const params = validateAndSanitizeParams(searchParams)
  if (!params.isValid) {
    return new NextResponse(generateErrorHtml(params.error || 'Invalid parameters'), { 
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  }

  try {
    let feedData: FeedData
    let sourceInfo: SourceInfo

    if (params.external) {
      sourceInfo = { url: params.external, type: 'external', sanitized: true }
      feedData = await fetchExternalFeed(params.external)
    } else if (params.wellknown) {
      sourceInfo = { 
        url: `/.well-known/${params.wellknown}.llmfeed.json`, 
        type: 'wellknown',
        sanitized: true
      }
      feedData = await fetchWellKnownFeed(params.wellknown)
    } else if (params.slug) {
      sourceInfo = { 
        url: `/exports/${params.slug}.llmfeed.json`, 
        type: 'local',
        sanitized: true
      }
      feedData = await fetchLocalFeed(params.slug)
    } else {
      return new NextResponse(generateErrorHtml('Missing feed source parameter'), { 
        status: 400,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    }

    // ✅ VALIDATION CRITIQUE : Vérifier que c'est bien un LLMFeed valide
    const validationResult = validateLLMFeed(feedData, sourceInfo)
    if (!validationResult.isValid) {
      return new NextResponse(
        generateValidationErrorHtml(validationResult.errors, sourceInfo), 
        { 
          status: 422,
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        }
      )
    }

    // 🔐 VALIDATION CRYPTOGRAPHIQUE
    const cryptoValidation = await performCryptoValidation(feedData)

    // 🛡️ GÉNÉRATION HTML SÉCURISÉE
    const htmlContent = generateSecureFeedHtml(feedData, {
      sourceUrl: sourceInfo.url,
      sourceType: sourceInfo.type,
      pageUrl: request.url,
      jsonApiUrl: getJsonApiUrl(sourceInfo),
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://wellknownmcp.org',
      params: params // Passer les paramètres pour éviter les erreurs de scope
    }, cryptoValidation)

    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
        'X-LLM-Feed-Type': feedData.feed_type || feedData.feedtype || 'unknown',
        'X-LLM-Trust-Level': cryptoValidation.trustLevel,
        'X-LLM-Trust-Score': cryptoValidation.trustScore.toString(),
        'X-LLM-Signature-Valid': cryptoValidation.signature.valid.toString(),
        'X-LLM-Certification-Valid': cryptoValidation.certification.valid.toString(),
        'X-LLM-Content-Format': 'html-embedded-json',
        'X-LLM-Source-Type': sourceInfo.type,
        'X-LLM-Validation': 'passed',
        'X-LLM-Crypto-Validation': 'performed',
        'X-LLM-Security': 'sanitized',
        'X-Robots-Tag': 'index, follow',
        'Vary': 'Accept, User-Agent',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Security-Policy': "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; object-src 'none'; base-uri 'self';",
        'X-MCP-Version': '1.0',
        'X-LLMFeed-API': 'validated-secure-crypto'
      }
    })
  } catch (error: any) {
    console.error('❌ Feed HTML generation error:', error)
    
    const errorHtml = generateErrorHtml(
      `Failed to load feed: ${error.message}`,
      {
        requestedSource: params.external || params.wellknown || params.slug || 'unknown',
        sourceType: params.external ? 'external' : params.wellknown ? 'wellknown' : 'local',
        error: error.message
      }
    )
    
    return new NextResponse(errorHtml, { 
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  }
}

// Fonctions utilitaires...
async function performCryptoValidation(feed: any): Promise<CryptoValidationResult> {
  const result: CryptoValidationResult = {
    signature: { present: false, valid: false, message: 'No signature found' },
    certification: { present: false, valid: false, message: 'No certification found' },
    blocks: [],
    trustLevel: 'none',
    trustScore: 0
  }

  // Validation signature
  if (feed.signature && feed.trust?.signed_blocks) {
    result.signature.present = true
    result.signature.algorithm = feed.signature.algorithm || 'ed25519'
    
    try {
      const signatureResult = await verifyFeedSignature(feed)
      result.signature.valid = signatureResult.ok
      result.signature.message = signatureResult.message
    } catch (error: any) {
      result.signature.valid = false
      result.signature.message = `Signature verification failed: ${error.message}`
    }
  }

  // Validation certification
  const certifications = Array.isArray(feed.certification) 
    ? feed.certification 
    : feed.certification ? [feed.certification] : []

  if (certifications.length > 0) {
    result.certification.present = true
    
    try {
      const certResults = await Promise.all(
        certifications.map(cert => verifyFeedCertification(feed, cert))
      )
      
      const validCerts = certResults.filter(r => r.ok)
      result.certification.valid = validCerts.length > 0
      
      if (validCerts.length > 0) {
        const firstValidCert = certifications[certResults.findIndex(r => r.ok)]
        result.certification.certifier = firstValidCert.public_key_hint
        result.certification.level = firstValidCert.certification_level || 'basic'
        result.certification.message = `${validCerts.length} valid certification(s)`
      } else {
        result.certification.message = `All ${certifications.length} certification(s) invalid`
      }
    } catch (error: any) {
      result.certification.valid = false
      result.certification.message = `Certification verification failed: ${error.message}`
    }
  }

  // Analyse des blocs
  try {
    const blockAnalysis = analyzeBlocks(feed)
    result.blocks = blockAnalysis.map(block => ({
      blockName: block.blockName,
      isSigned: block.isSigned,
      isCertified: block.isCertificationPresent,
      signatureValid: block.isSigned ? result.signature.valid : undefined,
      certificationValid: block.isCertificationPresent ? result.certification.valid : undefined
    }))
  } catch (error) {
    console.warn('Block analysis failed:', error)
  }

  // Calcul du niveau de confiance
  if (result.certification.valid) {
    result.trustLevel = 'certified'
    result.trustScore = 90 + (result.signature.valid ? 10 : 0)
  } else if (result.signature.valid) {
    result.trustLevel = 'signed' 
    result.trustScore = 70 + (result.certification.present ? 10 : 0)
  } else if (result.signature.present || result.certification.present) {
    result.trustLevel = 'invalid'
    result.trustScore = 20
  } else {
    result.trustLevel = 'basic'
    result.trustScore = 50
  }

  return result
}

function validateLLMFeed(feedData: any, sourceInfo: SourceInfo): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: string[] = []

  if (!feedData || typeof feedData !== 'object') {
    errors.push({
      field: 'root',
      message: 'Invalid JSON structure',
      severity: 'error',
      suggestion: 'Ensure the content is valid JSON'
    })
    return { isValid: false, errors, warnings }
  }

  const feedType = feedData.feed_type || feedData.feedtype
  if (!feedType) {
    errors.push({
      field: 'feed_type',
      message: 'Missing required field: feed_type or feedtype',
      severity: 'error',
      suggestion: 'Add "feed_type": "mcp" or another valid feed type'
    })
  }

  if (!feedData.metadata) {
    errors.push({
      field: 'metadata',
      message: 'Missing required field: metadata',
      severity: 'error',
      suggestion: 'Add "metadata": {"title": "...", "origin": "..."}'
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined
  }
}

function generateSecureFeedHtml(
  feed: FeedData, 
  urls: {
    sourceUrl: string
    sourceType: string
    pageUrl: string
    jsonApiUrl: string
    siteUrl: string
    params: ValidatedParams
  }, 
  cryptoValidation: CryptoValidationResult
): string {
  const safeMetadata = sanitizeMetadata(feed.metadata)
  const safeTags = sanitizeTags(feed.tags)
  const safeJsonContent = sanitizeJsonForHtml(feed)
  
  const getTrustBadge = () => {
    switch (cryptoValidation.trustLevel) {
      case 'certified': return { status: 'Certified & Verified ✅🏆', class: 'trust-certified' }
      case 'signed': return { status: 'Cryptographically Verified ✅', class: 'trust-signed' }
      case 'invalid': return { status: 'Invalid Signature ❌', class: 'trust-invalid' }
      default: return { status: 'Unverified ⚠️', class: 'trust-basic' }
    }
  }
  
  const trustBadge = getTrustBadge()
  const safeJsonApiUrl = sanitizeUrl(urls.jsonApiUrl) || '#'
  const safeSiteUrl = sanitizeUrl(urls.siteUrl) || 'https://wellknownmcp.org'

  // Construction du lien LLMFeedHub sécurisé
  const buildLLMFeedHubUrl = () => {
    if (urls.params.external) {
      return `${safeSiteUrl}/llmfeedhub?external=${encodeURIComponent(safeJsonApiUrl)}`
    } else if (urls.params.wellknown) {
      return `${safeSiteUrl}/llmfeedhub?wellknown=${encodeURIComponent(urls.params.wellknown)}`
    } else if (urls.params.slug) {
      return `${safeSiteUrl}/llmfeedhub?slug=${encodeURIComponent(urls.params.slug)}`
    }
    return `${safeSiteUrl}/llmfeedhub`
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>LLMFeed: ${safeMetadata.title}</title>
  <meta name="llm-trust-score" content="${cryptoValidation.trustScore}">
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    .trust-certified { background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(251, 191, 36, 0.15)); color: #059669; }
    .trust-signed { background: rgba(16, 185, 129, 0.1); color: #10b981; }
    .trust-basic { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
    .trust-invalid { background: rgba(239, 68, 68, 0.1); color: #dc2626; }
    .trust-badge { display: inline-block; padding: 6px 12px; border-radius: 6px; font-weight: 600; }
  </style>
</head>
<body>
  <h1>📦 ${safeMetadata.title}</h1>
  <span class="trust-badge ${trustBadge.class}">${trustBadge.status}</span>
  
  <div>
    <a href="${safeJsonApiUrl}">📄 Raw JSON</a>
    <a href="${buildLLMFeedHubUrl()}">🧪 Analyze in LLMFeedHub</a>
  </div>

  <script type="application/json" id="llmfeed-raw-data">
${JSON.stringify(feed, null, 2)}
  </script>
  
  <details open>
    <summary>🔍 Complete JSON Data</summary>
    <pre>${safeJsonContent}</pre>
  </details>
</body>
</html>`
}

function getJsonApiUrl(sourceInfo: SourceInfo): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wellknownmcp.org'
  return sourceInfo.type === 'external' ? sourceInfo.url : `${baseUrl}${sourceInfo.url}`
}

function generateErrorHtml(message: string, details?: any): string {
  return `<!DOCTYPE html>
<html><head><title>Error</title></head>
<body><h1>Error</h1><p>${escapeHtml(message)}</p></body></html>`
}

function generateValidationErrorHtml(errors: ValidationError[], sourceInfo: SourceInfo): string {
  const errorList = errors.map(error => 
    `<li><strong>${escapeHtml(error.field)}:</strong> ${escapeHtml(error.message)}</li>`
  ).join('')
  
  return `<!DOCTYPE html>
<html><head><title>Validation Error</title></head>
<body><h1>Invalid LLMFeed</h1><ul>${errorList}</ul></body></html>`
}

async function fetchExternalFeed(url: string): Promise<FeedData> {
  const proxyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/external-feed?${new URLSearchParams({ url })}`
  const response = await fetch(proxyUrl)
  if (!response.ok) throw new Error(`External feed fetch failed: ${response.statusText}`)
  return response.json()
}

async function fetchWellKnownFeed(filename: string): Promise<FeedData> {
  const filePath = join(process.cwd(), 'public', '.well-known', `${filename}.llmfeed.json`)
  const fileContent = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(fileContent)
}

async function fetchLocalFeed(slug: string): Promise<FeedData> {
  const filePath = join(process.cwd(), 'public', 'exports', `${slug}.llmfeed.json`)
  const fileContent = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(fileContent)
}