// app/api/external-feed/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const targetUrl = searchParams.get('url')
  
  console.log(`🌐 [PROXY] Request for: ${targetUrl}`)
  
  if (!targetUrl) {
    return NextResponse.json({ 
      error: 'Missing URL parameter',
      usage: 'Add ?url=https://example.com/feed.llmfeed.json'
    }, { status: 400 })
  }
  
  // ✅ Validation de sécurité robuste
  let parsedUrl: URL
  try {
    parsedUrl = new URL(targetUrl)
    
    // Protocoles autorisés
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json({ 
        error: 'Invalid protocol', 
        allowed: ['http', 'https'],
        received: parsedUrl.protocol
      }, { status: 400 })
    }
    
    // Bloquer les URLs internes/privées (sécurité)
    const hostname = parsedUrl.hostname.toLowerCase()
    const blockedHosts = [
      'localhost', '127.0.0.1', '0.0.0.0',
      '10.', '172.16.', '192.168.', // Réseaux privés
      'metadata.google.internal', // Cloud metadata
    ]
    
    if (blockedHosts.some(blocked => hostname.includes(blocked))) {
      return NextResponse.json({ 
        error: 'Access to internal/private networks is not allowed',
        hostname 
      }, { status: 403 })
    }
    
  } catch (urlError) {
    return NextResponse.json({ 
      error: 'Invalid URL format',
      url: targetUrl,
      details: urlError.message
    }, { status: 400 })
  }
  
  try {
    console.log(`📡 [PROXY] Fetching: ${parsedUrl.href}`)
    
    // ✅ Fetch avec configuration robuste
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15s timeout
    
    const response = await fetch(parsedUrl.href, {
      method: 'GET',
      headers: {
        'User-Agent': 'LLMFeedHub/1.0 (+https://wellknownmcp.org/llmfeedhub)',
        'Accept': 'application/json, application/llmfeed+json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache',
      },
      signal: controller.signal,
      // Suivre les redirections mais limiter
      redirect: 'follow',
    })
    
    clearTimeout(timeoutId)
    
    console.log(`📊 [PROXY] Response: ${response.status} ${response.statusText}`)
    console.log(`📊 [PROXY] Content-Type: ${response.headers.get('content-type') || 'unknown'}`)
    
    if (!response.ok) {
      // Gérer les erreurs HTTP avec détails
      let errorDetails = {
        status: response.status,
        statusText: response.statusText,
        url: targetUrl,
        headers: Object.fromEntries(response.headers.entries())
      }
      
      // Messages d'erreur plus explicites
      let errorMessage = 'External server error'
      if (response.status === 404) {
        errorMessage = 'Feed not found on external server'
      } else if (response.status === 403) {
        errorMessage = 'Access forbidden by external server'
      } else if (response.status === 500) {
        errorMessage = 'External server internal error'
      } else if (response.status >= 400 && response.status < 500) {
        errorMessage = 'Client error - check URL format'
      } else if (response.status >= 500) {
        errorMessage = 'External server error'
      }
      
      return NextResponse.json({
        error: errorMessage,
        ...errorDetails
      }, { status: response.status })
    }
    
    // ✅ Validation du Content-Type
    const contentType = response.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json') || 
                   contentType.includes('application/llmfeed+json') ||
                   contentType.includes('text/plain')
    
    if (!isJson && !contentType.includes('text/')) {
      return NextResponse.json({
        error: 'Invalid content type - expected JSON',
        received: contentType,
        url: targetUrl
      }, { status: 422 })
    }
    
    // ✅ Parsing JSON avec gestion d'erreurs
    let feedData: any
    try {
      const textContent = await response.text()
      
      // Log de debug (limité)
      console.log(`📄 [PROXY] Content preview: ${textContent.substring(0, 200)}...`)
      
      feedData = JSON.parse(textContent)
      
      // Validation basique du feed LLM
      if (typeof feedData !== 'object' || feedData === null) {
        throw new Error('Response is not a valid JSON object')
      }
      
    } catch (jsonError: any) {
      console.error(`❌ [PROXY] JSON parsing failed:`, jsonError.message)
      
      return NextResponse.json({
        error: 'Response is not valid JSON',
        details: jsonError.message,
        contentType,
        url: targetUrl
      }, { status: 422 })
    }
    
    // ✅ Log de succès
    console.log(`✅ [PROXY] Success: ${feedData?.metadata?.title || 'Untitled Feed'}`)
    console.log(`📈 [PROXY] Feed type: ${feedData?.feed_type || 'unknown'}`)
    
    // ✅ Réponse avec headers CORS appropriés
    return NextResponse.json(feedData, {
      status: 200,
      headers: {
        // CORS headers
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        
        // Cache headers
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60', // 5min cache
        'Vary': 'Accept',
        
        // Security headers
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        
        // Response info
        'X-Proxied-From': parsedUrl.hostname,
        'X-Feed-Type': feedData?.feed_type || 'unknown',
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    
  } catch (error: any) {
    console.error(`❌ [PROXY] Fetch error:`, error)
    
    // ✅ Gestion d'erreurs détaillée
    let errorResponse = {
      error: 'Proxy server error',
      url: targetUrl,
      details: error.message,
      type: error.name
    }
    
    let statusCode = 500
    
    if (error.name === 'AbortError') {
      errorResponse.error = 'Request timeout (15 seconds)'
      statusCode = 408
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      errorResponse.error = 'Network error - URL may be unreachable or blocking requests'
      statusCode = 502
    } else if (error.code === 'ENOTFOUND') {
      errorResponse.error = 'DNS resolution failed - domain not found'
      statusCode = 502
    } else if (error.code === 'ECONNREFUSED') {
      errorResponse.error = 'Connection refused by target server'
      statusCode = 502
    }
    
    return NextResponse.json(errorResponse, { status: statusCode })
  }
}

// ✅ Support des requêtes OPTIONS pour CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
      'Access-Control-Max-Age': '86400', // 24h cache pour preflight
    },
  })
}