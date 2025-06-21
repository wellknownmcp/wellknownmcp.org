// app/api/analyze-site/route.ts
// 🔍 API Server-Side pour contourner les problèmes CORS

import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import { parseSitemapUrl } from '../parseSitemapUrl'

// Rate limiting simple (en production, utiliser Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10 // requêtes par IP par heure
const RATE_WINDOW = 60 * 60 * 1000 // 1 heure

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userRequests = requestCounts.get(ip)
  
  if (!userRequests || now > userRequests.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return true
  }
  
  if (userRequests.count >= RATE_LIMIT) {
    return false
  }
  
  userRequests.count++
  return true
}

async function getAgentInsightFromFeeds(origin: string) {
  const feeds = [
    'mcp.llmfeed.json',
    'llm-index.llmfeed.json', 
    'capabilities.llmfeed.json',
    'prompts/prompt-index.llmfeed.json'
  ]
  
  const insight: any = { 
    origin, 
    prompts: [], 
    capabilities: [], 
    trust: null,
    feedsFound: []
  }

  // Timeout pour éviter les requêtes qui traînent
  const timeout = 5000 // 5 secondes

  const fetchPromises = feeds.map(async (feedPath) => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)
      
      const response = await fetch(`${origin}/.well-known/${feedPath}`, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'WellKnownMCP-Analyzer/1.0',
          'Accept': 'application/json'
        }
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        const data = await response.json()
        insight.feedsFound.push(feedPath)
        
        if (Array.isArray(data.prompts)) {
          insight.prompts.push(...data.prompts)
        }
        if (Array.isArray(data.capabilities)) {
          insight.capabilities.push(...data.capabilities)
        }
        if (data.trust) {
          insight.trust = data.trust
        }
        
        // Garder d'autres propriétés intéressantes
        if (data.llm_intent) insight.llm_intent = data.llm_intent
        if (data.feed_type) insight.feed_type = data.feed_type
        if (data.signature) insight.signature = data.signature
      }
    } catch (error) {
      // Ignore les erreurs individuelles
      console.debug(`Failed to fetch ${feedPath}:`, error)
    }
  })

  await Promise.allSettled(fetchPromises)
  return insight
}

async function simulateFallbackAnalysis(origin: string) {
  const fallback: any = { 
    title: '', 
    meta: {}, 
    sitemap: null, 
    keywords: [],
    description: '',
    contentFound: false
  }

  // Fetch HTML avec timeout
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 secondes pour HTML
    
    const htmlResponse = await fetch(origin, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'WellKnownMCP-Analyzer/1.0',
        'Accept': 'text/html,application/xhtml+xml'
      }
    })
    
    clearTimeout(timeoutId)

    if (htmlResponse.ok) {
      const html = await htmlResponse.text()
      const $ = cheerio.load(html)

      fallback.title = $('title').text().trim()
      fallback.contentFound = true
      
      // Parse meta tags
      $('meta').each((_, el) => {
        const name = $(el).attr('name') || $(el).attr('property')
        const content = $(el).attr('content')
        
        if (name && content) {
          fallback.meta[name] = content.trim()
          
          if (name.toLowerCase() === 'keywords') {
            fallback.keywords = content.split(',').map(k => k.trim()).filter(Boolean)
          }
          
          if (name.toLowerCase() === 'description' || name === 'og:description') {
            fallback.description = content.trim()
          }
        }
      })
      
      // Fallback description depuis le premier paragraphe
      if (!fallback.description) {
        const firstP = $('p').first().text().trim()
        if (firstP.length > 20) {
          fallback.description = firstP.substring(0, 160) + '...'
        }
      }
    }
  } catch (error) {
    console.debug('HTML fetch failed:', error)
  }

  // Fetch sitemap séparément
  try {
    const sitemapEntries = await parseSitemapUrl(`${origin}/sitemap.xml`)
    if (sitemapEntries && sitemapEntries.length > 0) {
      fallback.sitemap = sitemapEntries.slice(0, 50) // Limiter à 50 entrées
    }
  } catch (error) {
    console.debug('Sitemap parse failed:', error)
  }

  return fallback
}

export async function POST(request: NextRequest) {
  try {
    // Validation de base
    const { url } = await request.json()
    
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required and must be a string' }, 
        { status: 400 }
      )
    }

    // Validation URL
    let normalizedUrl: string
    try {
      const parsedUrl = new URL(url)
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Invalid protocol')
      }
      normalizedUrl = `${parsedUrl.protocol}//${parsedUrl.host}`
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' }, 
        { status: 400 }
      )
    }

    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again later.' }, 
        { status: 429 }
      )
    }

    // Analyse en parallèle
    const [feedData, fallbackData] = await Promise.allSettled([
      getAgentInsightFromFeeds(normalizedUrl),
      simulateFallbackAnalysis(normalizedUrl)
    ])

    const result = {
      feedData: feedData.status === 'fulfilled' ? feedData.value : null,
      fallbackData: fallbackData.status === 'fulfilled' ? fallbackData.value : null,
      analyzedUrl: normalizedUrl,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('Site analysis error:', error)
    return NextResponse.json(
      { error: 'Internal server error during analysis' }, 
      { status: 500 }
    )
  }
}

// Optionnel : GET pour vérifier que l'API fonctionne
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Site analysis API is running',
    version: '1.0.0'
  })
}