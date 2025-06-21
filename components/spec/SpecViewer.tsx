// SpecViewer.tsx - Version 100% SSR PURE (zéro client-side code)
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { CopyButtons } from './CopyButtons' // Seul import client

interface SpecViewerProps {
  slug: string
  htmlContent: string // HTML déjà parsé côté serveur
  front: Record<string, any>
}

// 🎨 Composant badges SSR pur
function FrontmatterBadges({ front }: { front: any }) {
  if (!front || typeof front !== 'object' || Object.keys(front).length === 0) return null

  const badges = []

  if (front.priority && front.priority !== 'normal') {
    badges.push({ 
      text: front.priority.toUpperCase(), 
      color: front.priority === 'critical' ? 'red' : front.priority === 'high' ? 'orange' : 'blue' 
    })
  }

  if (front.technicalLevel) {
    badges.push({ 
      text: front.technicalLevel, 
      color: front.technicalLevel === 'advanced' ? 'purple' : front.technicalLevel === 'intermediate' ? 'blue' : 'green' 
    })
  }

  if (front.trustLevel && front.trustLevel !== 'basic') {
    badges.push({ 
      text: front.trustLevel, 
      color: front.trustLevel === 'certified' ? 'green' : 'blue' 
    })
  }

  if (front.estimatedReadTime) {
    badges.push({ text: front.estimatedReadTime, color: 'gray' })
  }

  if (badges.length === 0) return null

  const colorClasses = {
    red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200', 
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
    green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200',
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4 not-prose">
      {badges.map((badge, index) => (
        <span 
          key={index}
          className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses[badge.color as keyof typeof colorClasses]}`}
        >
          {badge.text}
        </span>
      ))}
    </div>
  )
}

// 📊 Composant métadonnées SSR pur
function FrontmatterMeta({ front }: { front: any }) {
  if (!front || typeof front !== 'object' || Object.keys(front).length === 0) return null

  const hasMeta = front.date || front.audience || front.feedTypes || front.capabilities
  if (!hasMeta) return null

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 not-prose">
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
        
        {front.date && (
          <div>📅 <strong>Created:</strong> {new Date(front.date).toLocaleDateString()}</div>
        )}
        
        {front.audience && front.audience.length > 0 && (
          <div>👥 <strong>Audience:</strong> {front.audience.join(', ')}</div>
        )}
        
        {front.feedTypes && front.feedTypes.length > 0 && (
          <div>
            🔌 <strong>Feed Types:</strong> 
            <span className="ml-1">
              {front.feedTypes.map((type: string) => (
                <span key={type} className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-1 py-0.5 rounded text-xs mr-1">
                  {type}
                </span>
              ))}
            </span>
          </div>
        )}
        
        {front.capabilities && front.capabilities.length > 0 && (
          <div>
            ⚡ <strong>Capabilities:</strong>
            <span className="ml-1">
              {front.capabilities.map((cap: string) => (
                <span key={cap} className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-1 py-0.5 rounded text-xs mr-1">
                  {cap}
                </span>
              ))}
            </span>
          </div>
        )}

        {front.mcpFeedUrl && (
          <div className="flex items-center gap-1">
            🤖 <strong>LLMFeed:</strong> 
            <a 
              href={front.mcpFeedUrl} 
              className="ml-1 text-blue-600 dark:text-blue-400 hover:underline text-xs inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {front.mcpFeedUrl}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
        
      </div>
    </div>
  )
}

// 🛡️ Composant d'erreur SSR pur (sans useState)
function ContentError({ error }: { error: string }) {
  return (
    <div className="border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-red-600 dark:text-red-400">⚠️</span>
        <h3 className="font-semibold text-red-800 dark:text-red-200">Content Display Error</h3>
      </div>
      <p className="text-sm text-red-700 dark:text-red-300 mb-3">
        There was an issue displaying this content: {error}
      </p>
      <details className="mt-3">
        <summary className="text-sm cursor-pointer text-red-600 dark:text-red-400 hover:underline">
          Technical details
        </summary>
        <pre className="mt-2 text-xs bg-red-100 dark:bg-red-900/30 p-2 rounded overflow-auto max-h-32">
          {error}
        </pre>
      </details>
    </div>
  )
}

// 🔗 Helper pour liens related (SSR pur)
function generateRelatedLinks(slug: string, front: any) {
  const relatedList = Array.isArray(front?.Related)
    ? front?.Related.filter((item: any) => typeof item === 'string')
    : []

  const resolveSpecSlug = (baseSlug: string, relatedPath: string): string => {
    const baseDir = baseSlug.includes('/') ? baseSlug.substring(0, baseSlug.lastIndexOf('/')) : ''
    const resolved = baseDir ? `${baseDir}/${relatedPath}` : relatedPath
    return resolved.replace(/\/+/g, '/').replace(/^\//, '')
  }

  return relatedList.map((relatedPath: string) => {
    const resolvedSlug = resolveSpecSlug(slug, relatedPath)
    const url = `/spec/${resolvedSlug}`
    const displayTitle = resolvedSlug.split('/').pop()?.replace(/[_\-]/g, ' ') ?? resolvedSlug

    return {
      url,
      title: displayTitle,
      slug: resolvedSlug
    }
  })
}

// 🚀 Composant principal 100% SSR
export default function SpecViewer({ slug, htmlContent, front }: SpecViewerProps) {
  const relatedLinks = generateRelatedLinks(slug, front)

  // Vérification simple du contenu
  if (!htmlContent || htmlContent.trim() === '') {
    return <ContentError error="No content provided or content is empty" />
  }

  return (
    <article className="prose dark:prose-invert max-w-4xl mx-auto py-8 space-y-8">
      
      {/* En-tête avec métadonnées */}
      {front?.title && (
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {front.title}
        </h1>
      )}
      
      {front?.version && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Version: {front.version}
        </p>
      )}

      {front?.subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-400 not-prose mb-4">
          {front.subtitle}
        </p>
      )}

      {/* Composants SSR purs */}
      <FrontmatterBadges front={front} />
      <FrontmatterMeta front={front} />

      {/* Contenu principal - HTML sécurisé déjà parsé côté serveur */}
      <div 
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="markdown-content prose dark:prose-invert"
      />
      
      {/* CopyButtons - SEULE partie nécessitant 'use client' */}
      <CopyButtons />
      
      {/* Section Related - SSR pur */}
      {relatedLinks.length > 0 && (
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Related
          </h2>
          <ul className="space-y-1">
            {relatedLinks.map((link) => (
              <li key={link.slug}>
                <Link 
                  href={link.url} 
                  className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Articles connexes du frontmatter - SSR pur */}
      {front?.relatedArticles && front.relatedArticles.length > 0 && (
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Related Articles
          </h2>
          <div className="flex flex-wrap gap-2">
            {front.relatedArticles.map((article: string) => (
              <Link 
                key={article}
                href={`/spec/${article}`}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 text-sm no-underline transition-colors"
              >
                🔗 {article}
              </Link>
            ))}
          </div>
        </div>
      )}
      
    </article>
  )
}