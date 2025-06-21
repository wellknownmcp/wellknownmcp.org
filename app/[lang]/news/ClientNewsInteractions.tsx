'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// 🛡️ Types enrichis avec métadonnées frontmatter
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
  // 🚀 SEO AMÉLIORATION: Nouvelles métadonnées frontmatter
  keywords?: string[]
  capabilities?: string[]
  trustLevel?: string
  feedTypes?: string[]
  author?: string
  priority?: string
  contentType?: string
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

// 🛡️ Constants identiques à votre code
const LANG_EMOJIS: Record<string, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  es: '🇪🇸',
  ar: '🇸🇦',
  hi: '🇮🇳',
  uk: '🇺🇦',
  zh: '🇨🇳',
}

const USER_FRIENDLY_TAGS = [
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

// 🛡️ Fonctions utilitaires (réutilisées de votre code)
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
    const validFormats = ['news', 'guide', 'onboarding', 'specification', 'empirical-research']
    return validFormats.includes(format || '') ? format! : 'news'
  },
  slug: (slug?: string) => slug?.trim() || 'unknown-article',
}

// 🛡️ Fonction de nettoyage enrichie
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

// 🎨 Composant d'avertissement (identique à votre code)
function ArticleWarningBadge({ article }: { article: SimpleArticle }) {
   return null

  
}

interface Props {
  initialArticles: SimpleArticle[]
  initialPopularTags: { tag: string; count: number }[]
  buildMetadata: any
  lang: string
  hasServerError?: boolean
}

export function ClientNewsInteractions({ 
  initialArticles, 
  initialPopularTags, 
  buildMetadata, 
  lang,
  hasServerError = false
}: Props) {
  // 🎯 État intelligent : utilise les données serveur si disponibles
  const [articles, setArticles] = useState<SimpleArticle[]>(initialArticles)
  const [popularTags, setPopularTags] = useState<{ tag: string; count: number }[]>(initialPopularTags)
  const [buildMeta, setBuildMeta] = useState(buildMetadata)
  const [loading, setLoading] = useState(
    // Loading si : pas de données initiales OU erreur serveur et on veut retry
    initialArticles.length === 0 || hasServerError
  )
  const [error, setError] = useState<string | null>(hasServerError ? 'Server-side loading failed, attempting client-side...' : null)

  const searchParams = useSearchParams()
  const activeTag = searchParams.get('tag')
  const currentLang = safeFallbacks.slug(lang) || 'en'

  // 🚀 Chargement client-side - logique enrichie
  useEffect(() => {
    // Si on a déjà des données serveur valides et pas d'erreur, pas besoin de recharger
    if (initialArticles.length > 0 && !hasServerError) {
      setLoading(false)
      return
    }

    // Sinon, charger côté client (fallback ou retry)
    async function loadData() {
      try {
        setError(null)
        console.log(`[Client] Loading data for ${currentLang}`)

        // Charger les articles avec gestion d'erreur robuste
        const indexRes = await fetch('/news/index.json')
        if (!indexRes.ok) {
          throw new Error(`Failed to load articles: ${indexRes.status}`)
        }

        const data: IndexData = await indexRes.json()

        // Extraire les métadonnées de build si disponibles
        if (data._metadata) {
          setBuildMeta(data._metadata)
        }

        // 🛡️ Sanitize tous les articles avec fallbacks enrichis
        const langArticles = getArticlesByLang(data, currentLang).map(sanitizeArticle)
        setArticles(langArticles)

        // Charger les tags populaires avec gestion d'erreur
        try {
          const tagsRes = await fetch('/news/tags-report.json')
          if (tagsRes.ok) {
            const tagsReport = await tagsRes.json()
            const langTags = tagsReport.perLang?.[currentLang] || []

            const popularTagsForLang = langTags
              .filter(
                (tagData: { tag: string; count: number }) =>
                  tagData.count > 5 && USER_FRIENDLY_TAGS.includes(tagData.tag)
              )
              .sort((a: { count: number }, b: { count: number }) => b.count - a.count)

            setPopularTags(popularTagsForLang)
          }
        } catch (err) {
          console.warn('Could not load tags report:', err)
          // Continue sans les tags populaires
        }

        console.log(`[Client] Loaded ${langArticles.length} articles successfully`)
      } catch (err) {
        console.error('Error loading articles:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [currentLang, initialArticles.length, hasServerError])

  // 🛡️ États de chargement et d'erreur (identiques à votre code)
  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading articles...</p>
        {hasServerError && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Fallback to client-side loading...
          </p>
        )}
      </div>
    )
  }

  if (error && articles.length === 0) {
    return (
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Error Loading Articles
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  // 🎯 Filtrage sécurisé par tag (identique à votre code)
  const filtered = articles.filter((article) => {
    if (activeTag && !(article.tags || []).includes(activeTag)) return false
    return true
  })

  return (
    <>
      {/* 🛡️ Avertissements de build si disponibles (identique à votre code) */}
      {buildMeta && (buildMeta.warnings?.length > 0 || buildMeta.correctedArticles > 0) && (
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <details className="cursor-pointer">
            <summary className="text-blue-700 dark:text-blue-300 font-medium">
              ℹ️ Build Information ({buildMeta.validArticles}/{buildMeta.totalArticles} articles valid)
            </summary>
            <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
              <p>Last build: {buildMeta.lastBuild}</p>
              <p>Corrected articles: {buildMeta.correctedArticles}</p>
              {buildMeta.warnings?.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium">Build warnings:</p>
                  {buildMeta.warnings.map((warning: string, i: number) => (
                    <div key={i} className="ml-2">• {warning}</div>
                  ))}
                </div>
              )}
            </div>
          </details>
        </div>
      )}

      {/* Filtrage par tags populaires (identique à votre code) */}
      {popularTags.length > 0 && (
        <div className="mb-8">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Popular Topics
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Filter by topics with 5+ articles • {popularTags.length} available
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href={`/${currentLang}/news`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !activeTag
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:dark:bg-gray-700'
              }`}
            >
              All Articles ({articles.length})
            </Link>
            {popularTags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/${currentLang}/news?tag=${tag}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTag === tag
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:dark:bg-gray-700'
                }`}
              >
                #{tag} ({count})
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Liste des articles avec métadonnées frontmatter enrichies */}
      <div className="space-y-8">
        {filtered.map((article) => (
          <article
            key={`${currentLang}-${article.slug}`}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* 🛡️ Badge d'avertissement si article corrigé */}
            {(article._validationWarnings || article._correctedFields) && (
              <div className="p-4 pb-0">
                <ArticleWarningBadge article={article} />
              </div>
            )}

            {/* Image avec fallback */}
            {article.image && (
              <div className="aspect-video bg-gray-100 dark:bg-gray-800">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}

            <div className="p-6">
              {/* En-tête avec métadonnées sécurisées */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                <div className="flex items-center gap-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.estimatedReadTime}</span>
                  <span>•</span>
                  <span>
                    {LANG_EMOJIS[currentLang] || currentLang.toUpperCase()}
                  </span>
                  {/* 🚀 SEO AMÉLIORATION: Author si disponible */}
                  {article.author && (
                    <>
                      <span>•</span>
                      <span>{article.author}</span>
                    </>
                  )}
                </div>

                {/* Badge de format avec fallback */}
                {article.format && article.format !== 'news' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
                    {article.format}
                  </span>
                )}
              </div>

              {/* 🚀 SEO AMÉLIORATION: Trust level et capabilities visibles */}
              {(article.trustLevel || article.capabilities) && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.trustLevel && article.trustLevel !== 'basic' && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-xs">
                      🛡️ {article.trustLevel}
                    </span>
                  )}
                  {article.capabilities && article.capabilities.length > 0 && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs">
                      🤖 {article.capabilities.slice(0, 2).join(', ')}
                      {article.capabilities.length > 2 && ' +' + (article.capabilities.length - 2)}
                    </span>
                  )}
                </div>
              )}

              {/* Titre et sous-titre sécurisés */}
              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                <Link
                  href={`/${currentLang}/news/${article.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {article.title}
                </Link>
              </h2>

              {article.subtitle && (
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-3 font-medium">
                  {article.subtitle}
                </p>
              )}

              {/* Description sécurisée */}
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {article.description}
              </p>

              {/* Extrait optionnel */}
              {article.excerpt && (
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed italic">
                  {article.excerpt}...
                </p>
              )}

              {/* 🚀 SEO AMÉLIORATION: Keywords du frontmatter si disponibles */}
              {article.keywords && article.keywords.length > 0 && (
                <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                  <strong>Keywords:</strong> {article.keywords.join(', ')}
                </div>
              )}

              {/* Tags avec filtrage sécurisé */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags
                    .filter((tag) => tag && USER_FRIENDLY_TAGS.includes(tag))
                    .sort((a, b) => {
                      const aIsPopular = popularTags.some((p) => p.tag === a)
                      const bIsPopular = popularTags.some((p) => p.tag === b)
                      if (aIsPopular && !bIsPopular) return -1
                      if (!aIsPopular && bIsPopular) return 1
                      return 0
                    })
                    .slice(0, 4)
                    .map((tag) => {
                      const tagData = popularTags.find((p) => p.tag === tag)
                      return (
                        <Link
                          key={tag}
                          href={`/${currentLang}/news?tag=${tag}`}
                          className={`inline-flex items-center px-2 py-1 text-xs rounded transition-colors ${
                            tagData
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 font-medium'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:dark:bg-gray-700'
                          }`}
                        >
                          #{tag}
                          {tagData && (
                            <span className="ml-1 text-xs opacity-75">
                              ({tagData.count})
                            </span>
                          )}
                        </Link>
                      )
                    })}
                </div>
              )}

              {/* Actions avec téléchargement markdown */}
              <div className="flex justify-between items-center">
                <Link
                  href={`/${currentLang}/news/${article.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Read full article
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                {/* 🚀 SEO AMÉLIORATION: Lien téléchargement markdown */}
                <a 
                  href={`/news/${currentLang}/${article.slug}.md`}
                  download={`${article.slug}.md`}
                  className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                  title="Download article as Markdown"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  MD
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Message si aucun article */}
      {filtered.length === 0 && articles.length > 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📰</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
            No articles found for the selected filter.
          </p>
          <Link
            href={`/${currentLang}/news`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-block"
          >
            View all articles
          </Link>
        </div>
      )}

      {/* Message si vraiment aucun article */}
      {articles.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📰</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
            No articles available for {currentLang}.
          </p>
        </div>
      )}

      {/* Footer informatif enrichi */}
      <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Showing {filtered.length} of {articles.length} articles
          {activeTag && (
            <>
              <span> filtered by </span>
              <strong className="text-blue-600 dark:text-blue-400">#{activeTag}</strong>
              {popularTags.find((p) => p.tag === activeTag) && (
                <span className="text-xs ml-1">
                  ({popularTags.find((p) => p.tag === activeTag)?.count} total)
                </span>
              )}
            </>
          )}
        </p>
        {popularTags.length > 0 && (
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            {popularTags.length} popular topics available • Only showing topics with 5+ articles
          </p>
        )}
        {buildMeta && (
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Build quality: {buildMeta.validArticles}/{buildMeta.totalArticles} articles valid
            {buildMeta.correctedArticles > 0 &&
              ` • ${buildMeta.correctedArticles} auto-corrected`
            }
          </p>
        )}
        {hasServerError && !error && (
          <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-1">
            ⚠️ Loaded via client-side fallback due to server error
          </p>
        )}
      </div>
    </>
  )
}