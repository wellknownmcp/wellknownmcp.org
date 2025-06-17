// page.tsx - Server Component avec corrections complètes
import { Suspense } from 'react'
import { ClientNewsInteractions } from './ClientNewsInteractions'
import SeoHead from '@/components/SeoHead'
import { LanguageSelector } from '@/components/LanguageSelector'
import { PageTitle } from '@/components/PageTitle'

// Types identiques
interface SimpleArticle {
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
}

interface IndexData {
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

// Fonctions utilitaires identiques
function getArticlesByLang(data: IndexData, lang: string): SimpleArticle[] {
  const validLangs = ['en', 'fr', 'es', 'ar', 'hi', 'uk', 'zh']
  if (!validLangs.includes(lang)) return []
  
  const articles = data[lang as keyof IndexData]
  return Array.isArray(articles) ? articles : []
}

const safeFallbacks = {
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
    const validFormats = ['news', 'guide', 'onboarding', 'specification']
    return validFormats.includes(format || '') ? format! : 'news'
  },
  slug: (slug?: string) => slug?.trim() || 'unknown-article',
}

function sanitizeArticle(article: any): SimpleArticle {
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
  }
}

const USER_FRIENDLY_TAGS = [
  'ai-agents', 'agentic-web', 'trust', 'web', 'certification', 'privacy',
  'innovation', 'interoperability', 'business', 'developers', 'healthcare',
  'asia', 'europe', 'mcp', 'llmfeed', 'announcement', 'launch', 'anthropic', 'claude', 'open-standards',
]

export async function generateStaticParams() {
  const languages = ['en', 'fr', 'es', 'hi', 'zh', 'ar', 'uk']
  return languages.map((lang) => ({ lang }))
}

// 🚀 CORRECTION: Utilisation locale des fichiers pour le build
async function getNewsData(lang: string) {
  try {
    // 🎯 IMPORTANT: Utiliser des fichiers locaux au build, URL externe en runtime
    const isBuilding = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'production'
    const baseUrl = isBuilding ? 'http://localhost:3000' : 'https://wellknownmcp.org'
    
    console.log(`[SSR] Loading news data for ${lang} from ${baseUrl}`)
    
    const [indexRes, tagsRes] = await Promise.all([
      fetch(`${baseUrl}/news/index.json`, { 
        // 🚀 CORRECTION: Cache avec revalidation au lieu de no-store
        next: { revalidate: 300 }, // 5 minutes
        headers: {
          'User-Agent': 'NextJS-SSR/1.0'
        }
      }),
      fetch(`${baseUrl}/news/tags-report.json`, { 
        next: { revalidate: 300 },
        headers: {
          'User-Agent': 'NextJS-SSR/1.0'
        }
      }).catch(() => null)
    ])

    if (!indexRes.ok) {
      throw new Error(`Failed to load articles: ${indexRes.status}`)
    }

    const data: IndexData = await indexRes.json()
    const tagsReport = tagsRes?.ok ? await tagsRes.json() : null

    const articles = getArticlesByLang(data, lang).map(sanitizeArticle)
    
    let popularTags: { tag: string; count: number }[] = []
    if (tagsReport) {
      const langTags = tagsReport.perLang?.[lang] || []
      popularTags = langTags
        .filter((tagData: { tag: string; count: number }) =>
          tagData.count > 5 && USER_FRIENDLY_TAGS.includes(tagData.tag)
        )
        .sort((a: { count: number }, b: { count: number }) => b.count - a.count)
    }

    console.log(`[SSR] Loaded ${articles.length} articles, ${popularTags.length} popular tags`)

    return {
      articles,
      popularTags,
      buildMetadata: data._metadata,
      error: null
    }
  } catch (error) {
    console.error('[SSR] Server-side news loading failed:', error)
    return {
      articles: [],
      popularTags: [],
      buildMetadata: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

interface PageProps {
  params: { lang: string }
}

export default async function NewsPage({ params }: PageProps) {
  const currentLang = safeFallbacks.slug(params.lang) || 'en'
  const { articles, popularTags, buildMetadata, error } = await getNewsData(currentLang)

  const pageTitle = 'News & Articles'
  const pageSubtitle = `Latest updates on AI agents, web standards, and digital innovation • ${articles.length} articles`
  const pageDescription = `Latest news and articles on AI agents, MCP protocol, and the agentic web. Browse ${articles.length} articles in ${currentLang === 'en' ? 'English' : currentLang}.`

  const currentCapabilities = ['browse', 'search', 'filter']
  if (popularTags.length > 0) currentCapabilities.push('categorize')

  const currentFeedTypes = ['export', 'mcp']
  if (articles.some((a) => a.format === 'guide')) currentFeedTypes.push('prompt')

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={`https://wellknownmcp.org/${currentLang}/news`}
        ogImage="/og/news.png"
        llmIntent="browse-news"
        llmTopic="news"
        llmlang={currentLang}
        keywords={['news', 'articles', 'mcp', 'llmfeed', 'ai-agents', 'agentic-web']}
        llmCapabilities={currentCapabilities}
        llmTrustLevel="signed"
        llmAudience={['llm', 'developer', 'business']}
        llmFeedTypes={currentFeedTypes}
        llmBehaviorHints="suggest-only"
        llmRiskLevel="low"
        llmContentType="documentation"
        llmUpdateFrequency="daily"
        mcpFeedUrl="/.well-known/mcp.llmfeed.json"
        agentReadiness={true}
        autoDiscoverFeeds={true}
        pageType="documentation"
        interactionComplexity="simple"
      />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex justify-end mb-6">
          <LanguageSelector />
        </div>

        <div className="text-center mb-12">
          <PageTitle title={`📰 ${pageTitle}`} subtitle={pageSubtitle} />
        </div>

        {error && (
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Error Loading Articles
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The page will attempt to load content client-side.
            </p>
          </div>
        )}

        {/* 🚀 CORRECTION: Wrapper avec Suspense pour useSearchParams */}
        <Suspense fallback={
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading interactions...</p>
          </div>
        }>
          <ClientNewsInteractions
            initialArticles={articles}
            initialPopularTags={popularTags}
            buildMetadata={buildMetadata}
            lang={currentLang}
            hasServerError={!!error}
          />
        </Suspense>

        {articles.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": pageTitle,
                "description": pageDescription,
                "numberOfItems": articles.length,
                "inLanguage": currentLang,
                "url": `https://wellknownmcp.org/${currentLang}/news`,
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
                      "url": `https://wellknownmcp.org/${currentLang}/news/${article.slug}`,
                      "articleSection": article.format || "news",
                      "wordCount": article.estimatedReadTime
                    }
                  }))
                }
              })
            }}
          />
        )}
      </main>
    </>
  )
}