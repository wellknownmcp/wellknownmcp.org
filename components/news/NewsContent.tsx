// components/news/NewsContent.tsx - Composant SSR pour affichage de la liste d'articles

import { SimpleArticle, filterArticlesByTag } from '@/utils/newsUtils'
import ArticleCard from './ArticleCard'

interface NewsContentProps {
  articles: SimpleArticle[]
  popularTags: { tag: string; count: number }[]
  lang: string
  activeTag?: string | null
  showDebugInfo?: boolean
}

export default function NewsContent({ 
  articles, 
  popularTags, 
  lang, 
  activeTag,
  showDebugInfo = false 
}: NewsContentProps) {
  // 🎯 Filtrage SSR par tag actif
  const filteredArticles = filterArticlesByTag(articles, activeTag)

  // 🚀 Tri optimisé : priorité (frontmatter) puis date puis qualité
  const sortedArticles = filteredArticles.sort((a, b) => {
    // 1. Priorité frontmatter (high > medium > low > undefined)
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority
    }

    // 2. Date (plus récent d'abord)
    const aDate = new Date(a.date).getTime()
    const bDate = new Date(b.date).getTime()
    
    if (aDate !== bDate) {
      return bDate - aDate
    }

    // 3. Qualité (moins d'avertissements = meilleur)
    const aWarnings = a._validationWarnings?.length || 0
    const bWarnings = b._validationWarnings?.length || 0
    
    return aWarnings - bWarnings
  })

  return (
    <div className="space-y-8">
      {/* 🚀 Articles avec rendu SSR optimisé */}
      {sortedArticles.map((article) => (
        <ArticleCard
          key={`${lang}-${article.slug}`}
          article={article}
          lang={lang}
          popularTags={popularTags}
          showDebugInfo={showDebugInfo}
        />
      ))}

      {/* 📊 Statistiques de performance en mode debug */}
      {showDebugInfo && articles.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
          <h3 className="font-medium mb-2">🔧 Debug Information</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p><strong>Total articles:</strong> {articles.length}</p>
              <p><strong>Filtered articles:</strong> {filteredArticles.length}</p>
              <p><strong>Active filter:</strong> {activeTag || 'None'}</p>
            </div>
            <div>
              <p><strong>Articles with warnings:</strong> {articles.filter(a => a._validationWarnings).length}</p>
              <p><strong>Articles corrected:</strong> {articles.filter(a => a._correctedFields).length}</p>
              <p><strong>Popular tags:</strong> {popularTags.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}