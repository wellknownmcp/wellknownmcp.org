// lib/agent/agent-insight.ts
// 🔍 Version mise à jour - garde compatibilité + nouvelles fonctions

import * as cheerio from 'cheerio'

// Types pour la nouvelle API
export interface AgentInsight {
  origin: string
  prompts: any[]
  capabilities: any[]
  trust: any
  feedsFound: string[]
  llm_intent?: string
  feed_type?: string
  signature?: any
}

export interface FallbackAnalysis {
  title: string
  meta: Record<string, string>
  sitemap: any[] | null
  keywords: string[]
  description: string
  contentFound: boolean
}

export interface SiteAnalysisResult {
  feedData: AgentInsight | null
  fallbackData: FallbackAnalysis | null
  analyzedUrl: string
  timestamp: string
}

// Cache simple côté client (localStorage si disponible)
const CACHE_KEY = 'site-analysis-cache'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

function getCachedResult(url: string): SiteAnalysisResult | null {
  if (typeof window === 'undefined') return null
  
  try {
    const cached = localStorage.getItem(`${CACHE_KEY}-${url}`)
    if (cached) {
      const data = JSON.parse(cached)
      if (Date.now() - new Date(data.timestamp).getTime() < CACHE_DURATION) {
        return data
      }
      // Nettoyage cache expiré
      localStorage.removeItem(`${CACHE_KEY}-${url}`)
    }
  } catch (error) {
    console.debug('Cache read error:', error)
  }
  
  return null
}

function setCachedResult(url: string, result: SiteAnalysisResult): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(`${CACHE_KEY}-${url}`, JSON.stringify(result))
  } catch (error) {
    console.debug('Cache write error:', error)
  }
}

// Nouvelle fonction principale qui utilise l'API
export async function analyzeSite(url: string): Promise<SiteAnalysisResult> {
  // Vérifier le cache d'abord
  const cached = getCachedResult(url)
  if (cached) {
    return cached
  }

  const response = await fetch('/api/analyze-site', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }

  const result: SiteAnalysisResult = await response.json()
  
  // Mettre en cache
  setCachedResult(url, result)
  
  return result
}

// Fonctions de compatibilité avec l'ancienne interface (EXISTANTES - gardées pour compatibilité)
export async function getAgentInsightFromFeeds(origin: string) {
  try {
    const result = await analyzeSite(origin)
    return result.feedData
  } catch (error) {
    console.error('Failed to get agent insight:', error)
    // Fallback vers l'ancienne méthode si l'API échoue
    return await getAgentInsightFromFeedsLegacy(origin)
  }
}

export async function simulateFallbackAnalysis(origin: string) {
  try {
    const result = await analyzeSite(origin)
    return result.fallbackData
  } catch (error) {
    console.error('Failed to get fallback analysis:', error)
    // Fallback vers l'ancienne méthode si l'API échoue
    return await simulateFallbackAnalysisLegacy(origin)
  }
}

// Anciennes fonctions gardées comme fallback
async function getAgentInsightFromFeedsLegacy(origin: string) {
  const feeds = [
    'mcp.llmfeed.json',
    'llm-index.llmfeed.json',
    'capabilities.llmfeed.json',
    'prompts/prompt-index.llmfeed.json',
  ]
  const insight: any = { origin, prompts: [], capabilities: [], trust: null }

  for (const f of feeds) {
    try {
      const res = await fetch(`${origin}/.well-known/${f}`)
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data.prompts)) {
          insight.prompts.push(...data.prompts)
        }
        if (Array.isArray(data.capabilities)) {
          insight.capabilities.push(...data.capabilities)
        }
        if (data.trust) {
          insight.trust = data.trust
        }
      }
    } catch (err) {
      console.warn(`Failed to fetch ${f}:`, err)
    }
  }

  return insight
}

async function simulateFallbackAnalysisLegacy(origin: string) {
  const fallback: any = { title: '', meta: {}, sitemap: null, keywords: [] }

  try {
    const htmlRes = await fetch(origin)
    if (htmlRes.ok) {
      const html = await htmlRes.text()
      const $ = cheerio.load(html)

      fallback.title = $('title').text()

      $('meta').each((_, el) => {
        const name = $(el).attr('name') || $(el).attr('property')
        const content = $(el).attr('content')
        if (name && content) {
          fallback.meta[name] = content
          if (name.toLowerCase() === 'keywords') {
            fallback.keywords = content.split(',').map((k) => k.trim())
          }
        }
      })
    }
  } catch (err) {
    console.warn('HTML fetch failed:', err)
  }

  try {
    const sitemapRes = await fetch(origin + '/sitemap.xml')
    if (sitemapRes.ok) {
      fallback.sitemap = origin + '/sitemap.xml'
    }
  } catch (err) {
    console.warn('Sitemap check failed:', err)
  }

  return fallback
}

// Nouvelles fonctions utilitaires pour les composants
export function getFeedScore(insight: AgentInsight | null): number {
  if (!insight) return 0
  
  let score = 0
  score += (insight.feedsFound?.length || 0) * 25 // 25 points par feed trouvé
  score += insight.prompts.length * 5    // 5 points par prompt
  score += insight.capabilities.length * 10 // 10 points par capability
  score += insight.trust ? 20 : 0         // 20 points pour trust
  score += insight.signature ? 15 : 0     // 15 points pour signature
  
  return Math.min(score, 100) // Cap à 100
}

export function getFallbackScore(fallback: FallbackAnalysis | null): number {
  if (!fallback) return 0
  
  let score = 0
  score += fallback.title ? 20 : 0
  score += fallback.description ? 15 : 0
  score += Object.keys(fallback.meta).length * 2
  score += fallback.keywords.length * 1
  score += fallback.sitemap ? 10 : 0
  
  return Math.min(score, 100)
}

export function getAnalysisComparison(feedData: AgentInsight | null, fallbackData: FallbackAnalysis | null) {
  const feedScore = getFeedScore(feedData)
  const fallbackScore = getFallbackScore(fallbackData)
  
  return {
    feedScore,
    fallbackScore,
    improvement: feedScore - fallbackScore,
    recommendation: feedScore > fallbackScore ? 
      'Implement MCP feeds for better agent understanding' :
      'Site has good traditional metadata, MCP would add structured capabilities'
  }
}