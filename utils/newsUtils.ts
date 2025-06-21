// utils/newsUtils.ts - Toutes les fonctions communes (plus de duplication !)

// 🛡️ Types enrichis avec métadonnées frontmatter
export interface SimpleArticle {
  slug: string
  title: string
  description: string
  excerpt?: string
  date: string
  tags: string[]
  estimatedReadTime: string
  image?: string
  subtitle?: string
  format: string
  _validationWarnings?: string[]
  _correctedFields?: string[]
  // 🚀 SEO AMÉLIORATION: Nouvelles métadonnées frontmatter
  keywords?: string[]
  capabilities?: string[]
  trustLevel?: string
  feedTypes?: string[]
  author?: string
  priority?: string
  contentType?: string
}

export interface IndexData {
  en?: SimpleArticle[]
  fr?: SimpleArticle[]
  es?: SimpleArticle[]
  ar?: SimpleArticle[]
  hi?: SimpleArticle[]
  uk?: SimpleArticle[]
  zh?: SimpleArticle[]
  _metadata?: {
    totalArticles: number
    validArticles: number
    correctedArticles: number
    lastBuild: string
    warnings: string[]
  }
}

// 🛡️ Constants
export const LANG_EMOJIS: Record<string, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  es: '🇪🇸',
  ar: '🇸🇦',
  hi: '🇮🇳',
  uk: '🇺🇦',
  zh: '🇨🇳',
}

export const USER_FRIENDLY_TAGS = [
  'ai-agents',
  'agentic-web',
  'trust',
  'web',
  'certification',
  'privacy',
  'innovation',
  'interoperability',
  'business',
  'developers',
  'healthcare',
  'asia',
  'europe',
  'mcp',
  'llmfeed',
  'announcement',
  'launch',
  'anthropic',
  'claude',
  'open-standards',
]

// 🛡️ Safe fallbacks with enhanced validation
export const safeFallbacks = {
  title: (title?: string) => title?.trim() || 'Untitled Article',
  description: (desc?: string) => desc?.trim() || 'No description available.',
  date: (date?: string) => {
    if (!date) return new Date().toISOString().split('T')[0]
    try {
      return new Date(date).toISOString().split('T')[0]
    } catch {
      return new Date().toISOString().split('T')[0]
    }
  },
  tags: (tags?: string[] | string) => {
    if (Array.isArray(tags)) return tags.filter(Boolean)
    if (typeof tags === 'string') return [tags]
    return []
  },
  estimatedReadTime: (time?: string) => time?.trim() || '5 min',
  format: (format?: string) => {
    const validFormats = ['news', 'guide', 'onboarding', 'specification', 'empirical-research']
    return validFormats.includes(format || '') ? format! : 'news'
  },
  slug: (slug?: string) => slug?.trim() || 'unknown-article',
}

// 🛡️ Enhanced article sanitization with frontmatter preservation
export function sanitizeArticle(article: any): SimpleArticle {
  const warnings: string[] = []
  const correctedFields: string[] = []

  const safeTitle = safeFallbacks.title(article.title)
  if (safeTitle === 'Untitled Article') {
    warnings.push('Missing or empty title')
    correctedFields.push('title')
  }

  const safeDescription = safeFallbacks.description(article.description)
  if (safeDescription === 'No description available.') {
    warnings.push('Missing or empty description')
    correctedFields.push('description')
  }

  const safeDate = safeFallbacks.date(article.date)
  if (safeDate !== article.date) {
    warnings.push('Invalid or missing date, using current date')
    correctedFields.push('date')
  }

  const safeTags = safeFallbacks.tags(article.tags)
  if (!article.tags || !Array.isArray(article.tags)) {
    warnings.push('Missing or invalid tags array')
    correctedFields.push('tags')
  }

  const safeFormat = safeFallbacks.format(article.format)
  if (safeFormat !== article.format) {
    warnings.push(`Invalid format "${article.format}", using "news"`)
    correctedFields.push('format')
  }

  return {
    slug: safeFallbacks.slug(article.slug),
    title: safeTitle,
    description: safeDescription,
    excerpt: article.excerpt?.trim(),
    date: safeDate,
    tags: safeTags,
    estimatedReadTime: safeFallbacks.estimatedReadTime(article.estimatedReadTime),
    image: article.image?.trim(),
    subtitle: article.subtitle?.trim(),
    format: safeFormat,
    _validationWarnings: warnings.length > 0 ? warnings : undefined,
    _correctedFields: correctedFields.length > 0 ? correctedFields : undefined,
    // 🚀 SEO AMÉLIORATION: Préservation métadonnées frontmatter
    keywords: safeFallbacks.tags(article.keywords),
    capabilities: safeFallbacks.tags(article.capabilities),
    trustLevel: article.trustLevel?.trim(),
    feedTypes: safeFallbacks.tags(article.feedTypes),
    author: article.author?.trim(),
    priority: article.priority?.trim(),
    contentType: article.contentType?.trim(),
  }
}

// 🛡️ Get articles by language with validation
export function getArticlesByLang(data: IndexData, lang: string): SimpleArticle[] {
  const validLangs = ['en', 'fr', 'es', 'ar', 'hi', 'uk', 'zh']
  if (!validLangs.includes(lang)) return []
  
  const articles = data[lang as keyof IndexData]
  return Array.isArray(articles) ? articles.map(sanitizeArticle) : []
}

// 🚀 Enhanced popular tags filtering
export function getPopularTagsForLang(tagsReport: any, lang: string, minCount: number = 5): { tag: string; count: number }[] {
  if (!tagsReport?.perLang?.[lang]) return []
  
  const langTags = tagsReport.perLang[lang]
  return langTags
    .filter((tagData: { tag: string; count: number }) =>
      tagData.count >= minCount && USER_FRIENDLY_TAGS.includes(tagData.tag)
    )
    .sort((a: { count: number }, b: { count: number }) => b.count - a.count)
}

// 🚀 Filter articles by tag with validation
export function filterArticlesByTag(articles: SimpleArticle[], activeTag?: string | null): SimpleArticle[] {
  if (!activeTag) return articles
  return articles.filter(article => 
    article.tags && article.tags.includes(activeTag)
  )
}

// 🚀 Generate SEO-optimized keywords from articles
export function generateSEOKeywords(articles: SimpleArticle[], popularTags: { tag: string; count: number }[], lang: string): string[] {
  const baseKeywords = ['news', 'articles', 'mcp', 'llmfeed', 'ai-agents', 'agentic-web']
  
  // Add language-specific keywords
  const langKeywords = lang === 'en' 
    ? ['AI news', 'artificial intelligence news', 'LLM news', 'agent updates']
    : [`${lang} news`, `${lang} articles`]
  
  // Add popular tags that are actually searchable
  const searchableTags = popularTags
    .slice(0, 3)
    .map(tag => tag.tag)
    .filter(tag => ['ai-agents', 'developers', 'business', 'anthropic', 'claude'].includes(tag))
  
  return [...baseKeywords, ...langKeywords, ...searchableTags]
}

// 🚀 Generate structured data for news collection
export function generateNewsCollectionLD(
  articles: SimpleArticle[], 
  lang: string, 
  pageTitle: string, 
  pageDescription: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "numberOfItems": articles.length,
    "inLanguage": lang,
    "url": `https://wellknownmcp.org/${lang}/news`,
    "publisher": {
      "@type": "Organization",
      "name": "WellKnown MCP",
      "url": "https://wellknownmcp.org"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": articles.length,
      "itemListElement": articles.slice(0, 10).map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "NewsArticle",
          "headline": article.title,
          "description": article.description,
          "datePublished": article.date,
          "keywords": article.tags?.join(", ") || "",
          "url": `https://wellknownmcp.org/${lang}/news/${article.slug}`,
          "articleSection": article.format || "news",
          "wordCount": article.estimatedReadTime,
          ...(article.author && { "author": { "@type": "Person", "name": article.author } }),
          ...(article.image && { "image": article.image })
        }
      }))
    }
  }
}

// 🚀 Build environment detection
export function isBuildTime(): boolean {
  return (
    process.env.NODE_ENV === 'production' && 
    (process.env.VERCEL_ENV === undefined || process.env.VERCEL_PHASE === 'VERCEL_PHASE_PRODUCTION_BUILD')
  ) || process.env.NEXT_PHASE === 'phase-production-build'
}

// 🚀 Unified data loading function - EXPORT PRINCIPAL
export async function getNewsData(lang: string) {
  try {
    if (isBuildTime()) {
      // Build time: read files directly
      const { promises: fs } = await import('fs')
      const path = await import('path')
      
      const publicDir = path.join(process.cwd(), 'public')
      const indexPath = path.join(publicDir, 'news', 'index.json')
      const tagsPath = path.join(publicDir, 'news', 'tags-report.json')

      console.log(`[Build] Reading files from filesystem for ${lang}`)

      const [indexData, tagsData] = await Promise.allSettled([
        fs.readFile(indexPath, 'utf8').then(content => JSON.parse(content)),
        fs.readFile(tagsPath, 'utf8').then(content => JSON.parse(content)).catch(() => null)
      ])

      const data: IndexData = indexData.status === 'fulfilled' ? indexData.value : {}
      const tagsReport = tagsData.status === 'fulfilled' ? tagsData.value : null

      const articles = getArticlesByLang(data, lang)
      const popularTags = tagsReport ? getPopularTagsForLang(tagsReport, lang) : []

      console.log(`[Build] Loaded ${articles.length} articles from filesystem`)

      return {
        articles,
        popularTags,
        buildMetadata: data._metadata,
        error: null
      }
    } else {
      // Runtime: use HTTP fetch
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://wellknownmcp.org' 
        : `http://localhost:3000`
      
      console.log(`[Runtime] Fetching data from ${baseUrl} for ${lang}`)
      
      const [indexRes, tagsRes] = await Promise.all([
        fetch(`${baseUrl}/news/index.json`, { 
          next: { revalidate: 300 },
          headers: { 'User-Agent': 'NextJS-SSR/1.0' }
        }),
        fetch(`${baseUrl}/news/tags-report.json`, { 
          next: { revalidate: 300 },
          headers: { 'User-Agent': 'NextJS-SSR/1.0' }
        }).catch(() => null)
      ])

      if (!indexRes.ok) {
        throw new Error(`Failed to load articles: ${indexRes.status}`)
      }

      const data: IndexData = await indexRes.json()
      const tagsReport = tagsRes?.ok ? await tagsRes.json() : null

      const articles = getArticlesByLang(data, lang)
      const popularTags = tagsReport ? getPopularTagsForLang(tagsReport, lang) : []

      console.log(`[Runtime] Loaded ${articles.length} articles via HTTP`)

      return {
        articles,
        popularTags,
        buildMetadata: data._metadata,
        error: null
      }
    }
  } catch (error) {
    console.error('[News Data] Loading failed:', error)
    return {
      articles: [],
      popularTags: [],
      buildMetadata: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}