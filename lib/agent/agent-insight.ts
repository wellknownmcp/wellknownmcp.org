import * as cheerio from 'cheerio'

export async function getAgentInsightFromFeeds(origin: string) {
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
      console.warn(`Failed to fetch \${f}:`, err)
    }
  }

  return insight
}

export async function simulateFallbackAnalysis(origin: string) {
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
