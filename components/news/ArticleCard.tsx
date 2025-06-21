// components/news/ArticleCard.tsx - Composant SSR pour affichage d'articles

import Link from 'next/link'
import { SimpleArticle, LANG_EMOJIS } from '@/utils/newsUtils'

interface ArticleCardProps {
  article: SimpleArticle
  lang: string
  popularTags?: { tag: string; count: number }[]
  showDebugInfo?: boolean
}

// 🛡️ Composant d'avertissement pour articles corrigés
function ArticleWarningBadge({ article }: { article: SimpleArticle }) {
  if (!article._validationWarnings && !article._correctedFields) return null

  return (
    <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
      <details className="cursor-pointer">
        <summary className="text-yellow-700 dark:text-yellow-300 font-medium text-sm">
          ⚠️ Article auto-corrected during build
        </summary>
        <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
          {article._correctedFields && (
            <p><strong>Corrected fields:</strong> {article._correctedFields.join(', ')}</p>
          )}
          {article._validationWarnings && (
            <div className="mt-1">
              <strong>Warnings:</strong>
              {article._validationWarnings.map((warning, i) => (
                <div key={i} className="ml-2">• {warning}</div>
              ))}
            </div>
          )}
        </div>
      </details>
    </div>
  )
}

export default function ArticleCard({ 
  article, 
  lang, 
  popularTags = [], 
  showDebugInfo = false 
}: ArticleCardProps) {
  return (
    <article className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      {/* 🛡️ Debug info si demandé */}
      {showDebugInfo && (article._validationWarnings || article._correctedFields) && (
        <div className="p-4 pb-0">
          <ArticleWarningBadge article={article} />
        </div>
      )}

      {/* Image avec fallback gracieux */}
      {article.image && (
        <div className="aspect-video bg-gray-100 dark:bg-gray-800">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}

      <div className="p-6">
        {/* En-tête avec métadonnées enrichies */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-2">
            <time dateTime={article.date}>{article.date}</time>
            <span>•</span>
            <span>{article.estimatedReadTime}</span>
            <span>•</span>
            <span>{LANG_EMOJIS[lang] || lang.toUpperCase()}</span>
            
            {/* 🚀 SEO: Author si disponible */}
            {article.author && (
              <>
                <span>•</span>
                <span>by {article.author}</span>
              </>
            )}
          </div>

          {/* Badge de format */}
          {article.format && article.format !== 'news' && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
              {article.format}
            </span>
          )}
        </div>

        {/* 🚀 SEO: Métadonnées frontmatter visibles */}
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
                {article.capabilities.length > 2 && ` +${article.capabilities.length - 2}`}
              </span>
            )}
          </div>
        )}

        {/* Titre avec lien SEO-optimisé */}
        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          <Link
            href={`/${lang}/news/${article.slug}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {article.title}
          </Link>
        </h2>

        {/* Sous-titre optionnel */}
        {article.subtitle && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-3 font-medium">
            {article.subtitle}
          </p>
        )}

        {/* Description principale */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {article.description}
        </p>

        {/* Extrait optionnel */}
        {article.excerpt && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed italic">
            {article.excerpt}...
          </p>
        )}

        {/* 🚀 SEO: Keywords du frontmatter */}
        {article.keywords && article.keywords.length > 0 && (
          <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
            <strong>Keywords:</strong> {article.keywords.join(', ')}
          </div>
        )}

        {/* Tags avec priorité aux populaires */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags
              .filter((tag) => tag && tag.trim())
              .sort((a, b) => {
                // Priorité aux tags populaires
                const aIsPopular = popularTags.some((p) => p.tag === a)
                const bIsPopular = popularTags.some((p) => p.tag === b)
                if (aIsPopular && !bIsPopular) return -1
                if (!aIsPopular && bIsPopular) return 1
                return 0
              })
              .slice(0, 4) // Limite à 4 tags max
              .map((tag) => {
                const tagData = popularTags.find((p) => p.tag === tag)
                return (
                  <Link
                    key={tag}
                    href={`/${lang}/news?tag=${tag}`}
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
            href={`/${lang}/news/${article.slug}`}
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

          {/* Lien téléchargement markdown */}
          <a 
            href={`/news/${lang}/${article.slug}.md`}
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

        {/* 🚀 Structured Data par article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "headline": article.title,
              "description": article.description,
              "datePublished": article.date,
              "url": `https://wellknownmcp.org/${lang}/news/${article.slug}`,
              "keywords": article.tags?.join(", ") || "",
              "articleSection": article.format || "news",
              "inLanguage": lang,
              ...(article.author && { 
                "author": { "@type": "Person", "name": article.author } 
              }),
              ...(article.image && { "image": article.image }),
              ...(article.subtitle && { "alternativeHeadline": article.subtitle }),
              "publisher": {
                "@type": "Organization",
                "name": "WellKnown MCP",
                "url": "https://wellknownmcp.org"
              }
            })
          }}
        />
      </div>
    </article>
  )
}