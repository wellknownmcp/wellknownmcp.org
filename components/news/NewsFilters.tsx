'use client'

// components/news/NewsFilters.tsx - Composant client MINIMAL pour filtrage uniquement

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface NewsFiltersProps {
  popularTags: { tag: string; count: number }[]
  totalArticles: number
  filteredCount: number
  lang: string
  buildMetadata?: {
    totalArticles: number
    validArticles: number
    correctedArticles: number
    lastBuild: string
    warnings: string[]
  } | null
  hasServerError?: boolean
}

export default function NewsFilters({ 
  popularTags, 
  totalArticles, 
  filteredCount, 
  lang,
  buildMetadata,
  hasServerError = false
}: NewsFiltersProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTag = searchParams.get('tag')

  // 🎯 Navigation programmatique pour le filtrage
  const handleTagFilter = useCallback((tag: string | null) => {
    const url = tag 
      ? `/${lang}/news?tag=${encodeURIComponent(tag)}`
      : `/${lang}/news`
    router.push(url)
  }, [lang, router])

  return (
    <div className="space-y-6">
      {/* 🛡️ Avertissements de build si disponibles */}
      {buildMetadata && (buildMetadata.warnings?.length > 0 || buildMetadata.correctedArticles > 0) && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <details className="cursor-pointer">
            <summary className="text-blue-700 dark:text-blue-300 font-medium">
              ℹ️ Build Information ({buildMetadata.validArticles}/{buildMetadata.totalArticles} articles valid)
            </summary>
            <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
              <p>Last build: {buildMetadata.lastBuild}</p>
              <p>Corrected articles: {buildMetadata.correctedArticles}</p>
              {buildMetadata.warnings?.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium">Build warnings:</p>
                  {buildMetadata.warnings.map((warning: string, i: number) => (
                    <div key={i} className="ml-2">• {warning}</div>
                  ))}
                </div>
              )}
            </div>
          </details>
        </div>
      )}

      {/* 🎯 Filtres par tags populaires */}
      {popularTags.length > 0 && (
        <div>
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Popular Topics
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Filter by topics with 5+ articles • {popularTags.length} available
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {/* Bouton "All Articles" */}
            <Link
              href={`/${lang}/news`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !activeTag
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:dark:bg-gray-700'
              }`}
            >
              All Articles ({totalArticles})
            </Link>

            {/* Boutons de tags */}
            {popularTags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/${lang}/news?tag=${tag}`}
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

      {/* 🚀 Statistiques de filtrage */}
      <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {activeTag ? (
            <>
              Showing <strong className="text-blue-600 dark:text-blue-400">{filteredCount}</strong> of {totalArticles} articles
              <span> filtered by </span>
              <strong className="text-blue-600 dark:text-blue-400">#{activeTag}</strong>
              {popularTags.find((p) => p.tag === activeTag) && (
                <span className="text-xs ml-1">
                  ({popularTags.find((p) => p.tag === activeTag)?.count} total)
                </span>
              )}
            </>
          ) : (
            <>Showing all <strong>{totalArticles}</strong> articles</>
          )}
        </p>

        {/* Métadonnées additionnelles */}
        {popularTags.length > 0 && (
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            {popularTags.length} popular topics available • Only showing topics with 5+ articles
          </p>
        )}

        {buildMetadata && (
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Build quality: {buildMetadata.validArticles}/{buildMetadata.totalArticles} articles valid
            {buildMetadata.correctedArticles > 0 &&
              ` • ${buildMetadata.correctedArticles} auto-corrected`
            }
          </p>
        )}

        {hasServerError && (
          <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-1">
            ⚠️ Loaded via client-side fallback due to server error
          </p>
        )}
      </div>

      {/* Message si aucun résultat après filtrage */}
      {activeTag && filteredCount === 0 && totalArticles > 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">🔍</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
            No articles found for <strong className="text-blue-600 dark:text-blue-400">#{activeTag}</strong>
          </p>
          <Link
            href={`/${lang}/news`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            View all articles
          </Link>
        </div>
      )}

      {/* Message si vraiment aucun article */}
      {totalArticles === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📰</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
            No articles available for {lang === 'en' ? 'English' : lang}.
          </p>
          {hasServerError && (
            <p className="text-yellow-600 dark:text-yellow-400 text-sm mt-2">
              Content may be temporarily unavailable. Please try again later.
            </p>
          )}
        </div>
      )}
    </div>
  )
}