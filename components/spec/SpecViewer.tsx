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
            🤖 <strong>LLMFeed:</strong> 
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
      
      {/* 🚀 Call-to-Action pour feeds spec - Stratégie Pareto (95%/5%) */}
      {(() => {
        // A/B Test: 95% version pratique, 5% version technique avancée
        const showPracticalVersion = Math.random() < 0.95
        const specLiteUrl = "https://wellknownmcp.org/.well-known/exports/spec-essential.llmfeed.json"
        const specFullUrl = "https://wellknownmcp.org/.well-known/exports/spec.llmfeed.json"
        
        const handleCopyQuickStart = () => {
          const promptText = `Please analyze this LLMFeed specification for quick implementation guidance: ${specLiteUrl}`
          navigator.clipboard.writeText(promptText).then(() => {
            const button = document.querySelector('[data-spec-quick]') as HTMLButtonElement
            if (button) {
              const originalText = button.textContent
              button.textContent = '✅ Copied!'
              button.disabled = true
              setTimeout(() => {
                button.textContent = originalText
                button.disabled = false
              }, 2000)
            }
          }).catch(() => {
            prompt("Copy this prompt:", promptText)
          })
        }

        const handleCopyComplete = () => {
          const promptText = `Please analyze this complete LLMFeed specification for comprehensive implementation: ${specFullUrl}`
          navigator.clipboard.writeText(promptText).then(() => {
            const button = document.querySelector('[data-spec-complete]') as HTMLButtonElement
            if (button) {
              const originalText = button.textContent
              button.textContent = '✅ Copied!'
              button.disabled = true
              setTimeout(() => {
                button.textContent = originalText
                button.disabled = false
              }, 2000)
            }
          }).catch(() => {
            prompt("Copy this prompt:", promptText)
          })
        }

        if (showPracticalVersion) {
          // VERSION A (95%) - "Implementation-Ready Paths"
          return (
            <div className="mt-12 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border-2 border-dashed border-emerald-200 dark:border-emerald-800 hover:border-solid transition-all not-prose">
              <div className="flex items-start gap-4">
                <div className="text-3xl">⚡</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                    Ready to Implement? Get AI-Powered Guidance
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Reading docs manually takes time. Your AI can digest the <strong>complete LLMFeed specification</strong> and provide implementation guidance tailored to your needs.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {/* Option rapide */}
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🎯</span>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">Quick Start</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Essential concepts for immediate implementation
                      </p>
                      <button
                        onClick={handleCopyQuickStart}
                        data-spec-quick
                        className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium transition-all"
                      >
                        🚀 Copy Quick Start Prompt
                      </button>
                      <div className="mt-2 text-xs text-gray-500">
                        ~22K tokens • 30s analysis • Core concepts
                      </div>
                    </div>

                    {/* Option complète */}
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">📚</span>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">Complete Mastery</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Full specification with examples and edge cases
                      </p>
                      <button
                        onClick={handleCopyComplete}
                        data-spec-complete
                        className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium transition-all"
                      >
                        📖 Copy Complete Spec Prompt
                      </button>
                      <div className="mt-2 text-xs text-gray-500">
                        ~140K tokens • 2min analysis • Everything
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>💡 Works with Claude, ChatGPT, Gemini</span>
                    <span>⚡ Instant implementation guidance</span>
                    <span>🎯 Tailored to your specific needs</span>
                  </div>
                </div>
              </div>
            </div>
          )
        } else {
          // VERSION B (5%) - "Developer Matrix Style"
          return (
            <div className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-dashed border-indigo-200 dark:border-indigo-800 hover:border-solid transition-all not-prose">
              <div className="flex items-start gap-4">
                <div className="text-3xl">⚙️</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                    Choose Your Implementation Path
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      if (needsImplementation) → feedToAI(specification)
                    </span><br/>
                    Skip the manual parsing. Download the spec directly to your AI's neural networks.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {/* Quick hack */}
                    <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">⚡</span>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">Rapid Prototype</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Essential algorithms, ready to ship
                      </p>
                      <button
                        onClick={handleCopyQuickStart}
                        data-spec-quick
                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md font-medium transition-all"
                      >
                        ⚡ Download Core Logic
                      </button>
                      <div className="mt-2 text-xs text-gray-500 font-mono">
                        O(1) implementation complexity
                      </div>
                    </div>

                    {/* Deep dive */}
                    <div className="p-4 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🔬</span>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">System Architecture</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Complete patterns, enterprise-grade
                      </p>
                      <button
                        onClick={handleCopyComplete}
                        data-spec-complete
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-md font-medium transition-all"
                      >
                        🔬 Download Full Schema
                      </button>
                      <div className="mt-2 text-xs text-gray-500 font-mono">
                        O(everything) knowledge transfer
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center text-xs text-gray-500 dark:text-gray-400 font-mono">
                    <div>🤖 Compatible with: Claude.v4, GPT-4o, Gemini.Pro</div>
                    <div className="mt-1">⚡ Transfer rate: ~200MB/s of pure knowledge</div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      })()}
      
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