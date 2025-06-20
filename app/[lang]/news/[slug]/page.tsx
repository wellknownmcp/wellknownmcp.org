import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SeoHead from '@/components/SeoHead'
import { PageTitle } from '@/components/PageTitle'
import { ShareButtons } from '@/components/ShareButtons'
import index from '@/public/news/index.json'
import Link from 'next/link'

// 🚀 Helper functions pour extraire les métadonnées AIO (simplifié)
function extractAIOMetadata(front: any, slug: string, content: string) {
  // Protection contre frontmatter null/undefined
  const safeFront = front || {}
  const safeContent = content || ''

  // Extraction des capabilities depuis les tags et le contenu
  const capabilities = []
  if (safeFront.tags?.includes('booking')) capabilities.push('booking')
  if (safeFront.tags?.includes('search')) capabilities.push('search') 
  if (safeFront.tags?.includes('export')) capabilities.push('export')
  if (safeFront.tags?.includes('ai-agents')) capabilities.push('agent-interaction')
  if (safeContent.includes('ExportToLLM') || safeContent.includes('export')) capabilities.push('export')

  // Audience basée sur les tags et le contenu
  const audience = []
  if (safeFront.tags?.includes('developers') || safeContent.includes('developer')) audience.push('developer')
  if (safeFront.tags?.includes('business') || safeContent.includes('business')) audience.push('business')  
  if (safeFront.tags?.includes('ai-agents') || safeFront.tags?.includes('llm')) audience.push('llm')
  if (safeFront.audience) {
    audience.push(...(Array.isArray(safeFront.audience) ? safeFront.audience : [safeFront.audience]))
  }

  // Feed types détectés
  const feedTypes = []
  if (safeFront.tags?.includes('mcp')) feedTypes.push('mcp')
  if (safeFront.tags?.includes('export')) feedTypes.push('export')
  if (safeFront.tags?.includes('capabilities')) feedTypes.push('capabilities')

  // Content type simple
  let contentType = 'documentation'
  if (safeFront.format === 'empirical-research') contentType = 'research'
  else if (safeFront.format === 'news') contentType = 'news'
  else if (safeFront.format === 'specification') contentType = 'reference'

  // Page type simple  
  let pageType = 'article'
  if (safeFront.format === 'empirical-research') pageType = 'research-article'

  return {
    llmCapabilities: capabilities.length > 0 ? capabilities : undefined,
    llmAudience: audience.length > 0 ? audience : ['llm', 'developer'],
    llmFeedTypes: feedTypes.length > 0 ? feedTypes : undefined,
    llmContentType: contentType,
    pageType: pageType,
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: string }
}): Promise<Metadata> {
  const lang = params.lang || 'en'
  const slug = params.slug
  const fallbackLang = 'en'

  async function tryRead(filePath: string) {
    try {
      return await fs.readFile(filePath, 'utf-8')
    } catch {
      return null
    }
  }

  const mdPath = path.join(process.cwd(), 'public/news', lang, `${slug}.md`)
  let content = await tryRead(mdPath)

  if (!content && lang !== fallbackLang) {
    const fallbackPath = path.join(
      process.cwd(),
      'public/news',
      fallbackLang,
      `${slug}.md`
    )
    content = await tryRead(fallbackPath)
  }

  if (!content) notFound()

  const { data: front } = matter(content)

  // 🛡️ Fallbacks robustes
  const title = front.title || `${slug.replace(/[-_]/g, ' ')} — WellKnownMCP News`
  const description = front.description || `Latest insights about the LLMFeed protocol and agentic web: ${slug.replace(/[-_]/g, ' ')}`
  
  // 🚀 Keywords avec fallbacks multiples
  const keywords = front.tags?.join(', ') || 
                   front.keywords?.join(', ') || 
                   `LLMFeed, MCP, AI agents, ${slug.replace(/[-_]/g, ' ')}`

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [front.image || `/og/news/${lang}/default.png`],
      url: front.canonical_url || `https://wellknownmcp.org/${lang}/news/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  }
}

export default async function NewsPost({
  params,
}: {
  params: { lang: string; slug: string }
}) {
  const lang = params.lang || 'en'
  const slug = params.slug
  const fallbackLang = 'en'

  async function tryRead(filePath: string) {
    try {
      return await fs.readFile(filePath, 'utf-8')
    } catch {
      return null
    }
  }

  const mdPath = path.join(process.cwd(), 'public/news', lang, `${slug}.md`)
  let content = await tryRead(mdPath)

  if (!content && lang !== fallbackLang) {
    const fallbackPath = path.join(
      process.cwd(),
      'public/news',
      fallbackLang,
      `${slug}.md`
    )
    content = await tryRead(fallbackPath)
  }

  if (!content) notFound()

  const { content: markdown, data: front } = matter(content)

  // 🚀 Extract AIO metadata (simplifié)
  const aioMeta = extractAIOMetadata(front, slug, markdown)

  const articles = index[lang].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const currentIndex = articles.findIndex((a) => a.slug === slug)

  const prev = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null
  const next = currentIndex > 0 ? articles[currentIndex - 1] : null

  // URLs avec validation
  const canonicalUrl = front.canonical_url || `https://wellknownmcp.org/${lang}/news/${slug}`
  const mcpFeedUrl = front.mcpFeedUrl || '/.well-known/llm-index.llmfeed.json'
  
  // 🎯 URL de téléchargement markdown
  const markdownDownloadUrl = `/news/${lang}/${slug}.md`

  // 🛡️ Fallbacks robustes pour tous les champs
  const title = front.title || slug.replace(/[-_]/g, ' ')
  const description = front.description || `Latest insights about the LLMFeed protocol: ${slug.replace(/[-_]/g, ' ')}`
  const keywords = front.tags?.join(', ') || front.keywords?.join(', ') || `LLMFeed, MCP, AI agents, ${slug.replace(/[-_]/g, ' ')}`
  const author = front.author || "WellKnownMCP Team"
  const category = front.category || "LLMFeed"
  const date = front.date || new Date().toISOString()

  // 🚀 SEO AMÉLIORATION 2: JSON-LD robuste avec fallbacks
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": author
    },
    "publisher": {
      "@type": "Organization", 
      "name": "WellKnownMCP",
      "url": "https://wellknownmcp.org"
    },
    "datePublished": date,
    "keywords": keywords,
    "about": category,
    "mainEntityOfPage": canonicalUrl,
    "url": canonicalUrl,
    ...(front.image && { "image": front.image }),
    ...(front.format && { "genre": front.format }),
    ...(front.priority && { "audienceType": front.priority })
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      {/* 🚀 SEO AMÉLIORATION 2: JSON-LD structuré */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SeoHead
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        ogImage={front.image || `/og/news/${lang}/default.png`}
        keywords={keywords}
        llmIntent={front.intent || front.llmIntent || 'browse-news-article'}
        llmTopic={front.llmTopic || category}
        llmIndexUrl={front.llmIndexUrl || '/.well-known/llm-index.llmfeed.json'}
        llmlang={front.llmlang || lang}
        llmCapabilities={front.capabilities || aioMeta.llmCapabilities}
        llmAudience={front.audience || aioMeta.llmAudience}
        llmFeedTypes={front.feedTypes || aioMeta.llmFeedTypes}
        llmContentType={front.contentType || aioMeta.llmContentType}
        mcpFeedUrl={mcpFeedUrl}
        autoDiscoverFeeds={front.autoDiscoverFeeds !== false}
        agentReadiness={front.agentReadiness !== false}
        pageType={front.pageType || aioMeta.pageType}
      />

      <PageTitle
        title={title}
        subtitle={front.subtitle || "An update from the LLMFeed ecosystem"}
      />

      <ShareButtons title={front.title || slug} />

      {/* Navigation Previous/Next */}
      <div className="flex justify-between mt-8 text-sm text-blue-600 dark:text-blue-400">
        {prev && (
          <Link href={`/${lang}/news/${prev.slug}`} className="hover:underline">
            ← Previous: {prev.title.length > 20 ? `${prev.title.slice(0, 20)}…` : prev.title}
          </Link>
        )}
        {next && (
          <Link href={`/${lang}/news/${next.slug}`} className="hover:underline">
            Next →: {next.title.length > 20 ? `${next.title.slice(0, 20)}…` : next.title}
          </Link>
        )}
      </div>

      {front.image && (
        <img
          src={front.image}
          alt={front.title || "Article illustration"}
          className="w-full rounded-lg shadow-md mb-6 max-h-64 object-cover"
        />
      )}

      {/* Contenu principal */}
      <div
        className="prose dark:prose-invert max-w-none"
        dir={front.dir === 'rtl' ? 'rtl' : 'ltr'}
        lang={front.lang || lang}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </div>

      {/* 🚀 Call-to-Action pour feed news-lite - A/B Test automatique (95%/5%) */}
      {(() => {
        // A/B Test: 95% version principale, 5% version Matrix
        const showMainVersion = Math.random() < 0.95
        const feedUrl = "https://wellknownmcp.org/.well-known/exports/news-lite.llmfeed.json"
        
        const handleCopyPrompt = () => {
          const promptText = `Please analyze this LLMFeed news collection for complete ecosystem context: ${feedUrl}`
          navigator.clipboard.writeText(promptText).then(() => {
            // Success feedback
            const originalButton = document.querySelector('[data-cta-button]') as HTMLButtonElement
            if (originalButton) {
              const originalText = originalButton.textContent
              originalButton.textContent = '✅ Copied!'
              originalButton.disabled = true
              setTimeout(() => {
                originalButton.textContent = originalText
                originalButton.disabled = false
              }, 2000)
            }
          }).catch(() => {
            // Fallback for browsers without clipboard API
            prompt("Copy this prompt:", promptText)
          })
        }

        if (showMainVersion) {
          // VERSION A (95%) - "Unlock the Complete LLMFeed Ecosystem"
          return (
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border-2 border-dashed border-purple-200 dark:border-purple-800 hover:border-solid transition-all">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🔓</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                    Unlock the Complete LLMFeed Ecosystem
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    You've found one piece of the LLMFeed puzzle. Your AI can absorb the <strong>entire collection</strong> of developments, tutorials, and insights in 30 seconds. No more hunting through individual articles.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <button
                      onClick={handleCopyPrompt}
                      data-cta-button
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      🚀 Copy AI Prompt
                    </button>
                    
                    <a
                      href={feedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-600"
                    >
                      📄 View Raw Feed
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-purple-600 dark:text-purple-400">~20</div>
                      <div className="text-gray-600 dark:text-gray-400">Quality Articles</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-blue-600 dark:text-blue-400">30s</div>
                      <div className="text-gray-600 dark:text-gray-400">AI Analysis</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-green-600 dark:text-green-400">80%</div>
                      <div className="text-gray-600 dark:text-gray-400">LLMFeed Knowledge</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                    💡 Works with Claude, ChatGPT, Gemini, and other AI assistants
                  </div>
                </div>
              </div>
            </div>
          )
        } else {
          // VERSION B (5%) - "Red Pill Matrix Style"
          return (
            <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border-2 border-dashed border-red-200 dark:border-red-800 hover:border-solid transition-all">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💊</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                    How Deep Does the LLMFeed Rabbit Hole Go?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    You've glimpsed the surface. Ready to see the <strong>entire agentic web ecosystem</strong>? Your AI can digest the complete knowledge matrix in 30 seconds. Choose your pill.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <button
                      onClick={handleCopyPrompt}
                      data-cta-button
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      💊 Take the Knowledge Pill
                    </button>
                    
                    <a
                      href={feedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-600"
                    >
                      🐰 Down the Rabbit Hole
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-red-600 dark:text-red-400">Reality</div>
                      <div className="text-gray-600 dark:text-gray-400">20 Articles</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-orange-600 dark:text-orange-400">Instant</div>
                      <div className="text-gray-600 dark:text-gray-400">30s Download</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-purple-600 dark:text-purple-400">Matrix</div>
                      <div className="text-gray-600 dark:text-gray-400">Complete Truth</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                    🕶️ "There is no spoon... only structured data feeds"
                  </div>
                </div>
              </div>
            </div>
          )
        }
      })()}

      {/* 🚀 SEO AMÉLIORATION 1: Tags visibles */}
      {front.tags && front.tags.length > 0 && (
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-800 dark:text-gray-200">Topics:</strong>
            <div className="mt-2 flex flex-wrap gap-2">
              {front.tags.map((tag: string) => (
                <span 
                  key={tag} 
                  className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md text-xs hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                >
                  #{tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🎯 Téléchargement markdown + métadonnées techniques */}
      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          
          {/* Téléchargement markdown */}
          <div className="text-sm">
            <a 
              href={markdownDownloadUrl}
              download={`${slug}.md`}
              className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Markdown
            </a>
          </div>

          {/* Métadonnées techniques pour agents */}
          {(front.capabilities || aioMeta.llmCapabilities) && (
            <div className="text-xs text-blue-600 dark:text-blue-400">
              🤖 Capabilities: {(front.capabilities || aioMeta.llmCapabilities)?.join(', ')}
            </div>
          )}
        </div>

        {/* Format et catégorie si disponible */}
        {(front.format || front.category) && (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {front.format && <span className="mr-4">Format: {front.format}</span>}
            {front.category && <span>Category: {front.category}</span>}
          </div>
        )}
      </div>

      {/* Actions pour agents si export capability */}
      {aioMeta.llmCapabilities?.includes('export') && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🚀 Next Steps for Agents</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>• Export this content: <a href="/.well-known/exports/" className="text-blue-600 underline">Available formats</a></p>
            <p>• Explore capabilities: <a href="/.well-known/capabilities.llmfeed.json" className="text-blue-600 underline">API endpoints</a></p>
            <p>• Join ecosystem: <a href="/join" className="text-blue-600 underline">Contribute to LLMFeed</a></p>
          </div>
        </div>
      )}
    </div>
  )
}