'use client'

import { useSpecContext } from './SpecContext'
import type { SpecContextType } from './SpecContext'
import { marked } from 'marked'
import { Tokens } from 'marked'
import Link from 'next/link'
import path from 'path'

const siteUrl = 'https://wellknownmcp.org'

function resolveSpecSlug(baseSlug: string, relatedPath: string): string {
  const baseDir = path.posix.dirname(baseSlug)
  const resolved = path.posix.normalize(path.posix.join(baseDir, relatedPath))
  return resolved
}

// 🎨 Composant simple pour afficher quelques badges si le frontmatter existe
function FrontmatterBadges({ front }: { front: any }) {
  // 🛡️ Protection robuste
  if (!front || typeof front !== 'object' || Object.keys(front).length === 0) return null

  const badges = []

  // Quelques badges utiles sans trop surcharger
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
    red: 'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800', 
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    gray: 'bg-gray-100 text-gray-800',
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

// 📊 Composant pour afficher quelques métadonnées utiles
function FrontmatterMeta({ front }: { front: any }) {
  // 🛡️ Protection robuste
  if (!front || typeof front !== 'object' || Object.keys(front).length === 0) return null

  const hasMeta = front.date || front.audience || front.feedTypes || front.capabilities

  if (!hasMeta) return null

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6 not-prose">
      <div className="text-sm text-gray-600 space-y-2">
        
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
                <span key={type} className="inline-block bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-xs mr-1">
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
                <span key={cap} className="inline-block bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs mr-1">
                  {cap}
                </span>
              ))}
            </span>
          </div>
        )}

        {front.mcpFeedUrl && (
          <div>
            🤖 <strong>MCP Feed:</strong> 
            <a href={front.mcpFeedUrl} className="ml-1 text-blue-600 hover:underline text-xs">
              {front.mcpFeedUrl}
            </a>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default function SpecViewer({ slug }: { slug: string }) {
  const { content, front } = useSpecContext() as SpecContextType

  // ✅ Votre configuration de marked existante - inchangée
  const configureMarked = (currentSlug: string) => {
    marked.use({
      renderer: {
        link(this: any, token: Tokens.Link): string | false {
          const href = token.href
          const title = token.title
          const text = token.text

          // Liens externes (gardés tels quels)
          if (href?.startsWith('http://') || href?.startsWith('https://')) {
            return `<a href="${href}" ${
              title ? `title="${title}"` : ''
            }>${text}</a>`
          }

          // Liens relatifs vers des .md
          if (href?.endsWith('.md')) {
            const resolvedSlug = resolveSpecSlug(
              currentSlug,
              href.replace('.md', '')
            )
            const finalHref = `/spec/${resolvedSlug}`

            return `<a href="${finalHref}" ${
              title ? `title="${title}"` : ''
            }>${text}</a>`
          }

          // Liens absolus vers le site
          const absolutePrefixes = [
            '/tools',
            '/verify',
            '/faq',
            '/feeds',
            '/en',
            '/join',
          ]

          const shouldRewrite = absolutePrefixes.some((prefix) =>
            href?.startsWith(prefix)
          )
          let finalHref = href
          if (shouldRewrite && href) {
            finalHref = `${siteUrl}${href}`
          }

          return `<a href="${finalHref}" ${
            title ? `title="${title}"` : ''
          }>${text}</a>`
        },
      },
    })
  }

  if (!content) {
    return <div className="text-red-600">Error: Spec content not found.</div>
  }

  // ✅ Votre logique existante de parsing - inchangée
  configureMarked(slug)

  let htmlContent = ''
  try {
    const parsed = marked.parse(content ?? '')
    htmlContent = typeof parsed === 'string' ? parsed : ''
  } catch (err) {
    console.error('Error while parsing markdown:', err)
    htmlContent = '<div class="text-red-600">Markdown parsing error</div>'
  }

  // ✅ Votre logique Related existante - inchangée
  const relatedList = Array.isArray(front?.Related)
    ? front?.Related.filter((item) => typeof item === 'string')
    : []

  const relatedLinks = relatedList.map((relatedPath: string) => {
    const resolvedSlug = resolveSpecSlug(slug, relatedPath)
    const url = `/spec/${resolvedSlug}`
    const displayTitle =
      resolvedSlug.split('/').pop()?.replace(/[_\-]/g, ' ') ?? resolvedSlug

    return (
      <li key={resolvedSlug}>
        <Link href={url}>{displayTitle}</Link>
      </li>
    )
  })

  return (
    <article className="prose dark:prose-invert max-w-4xl mx-auto py-8 space-y-8">
      
      {/* ✅ Votre titre existant - inchangé */}
      {front?.title && <h1>{front.title}</h1>}
      {front?.version && (
        <p className="text-sm text-gray-500">Version: {front.version}</p>
      )}

      {/* 🎨 Ajout simple: subtitle du frontmatter s'il existe */}
      {front?.subtitle && (
        <p className="text-lg text-gray-600 not-prose mb-4">{front.subtitle}</p>
      )}

      {/* 🎨 Ajout simple: badges du frontmatter */}
      <FrontmatterBadges front={front} />

      {/* 🎨 Ajout simple: métadonnées du frontmatter */}
      <FrontmatterMeta front={front} />

      {/* ✅ Votre contenu existant - inchangé */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      
      {/* ✅ Votre section Related existante - inchangée */}
      {relatedLinks.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Related</h2>
          <ul className="space-y-1">{relatedLinks}</ul>
        </div>
      )}

      {/* 🎨 Ajout simple: articles connexes du frontmatter */}
      {front?.relatedArticles && front.relatedArticles.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Related Articles (from frontmatter)</h2>
          <div className="flex flex-wrap gap-2">
            {front.relatedArticles.map((article: string) => (
              <Link 
                key={article}
                href={`/spec/${article}`}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 text-sm no-underline"
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