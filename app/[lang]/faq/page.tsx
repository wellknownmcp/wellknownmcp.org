import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import SeoHead from '@/components/SeoHead'
import { PageTitle } from '@/components/PageTitle'
import { ShareButtons } from '@/components/ShareButtons'

export async function generateStaticParams() {
  const languages = ['en', 'fr', 'es', 'hi', 'zh', 'ar', 'uk']
  return languages.map((lang) => ({ lang }))
}
// 🚀 Helper pour détecter les langues disponibles pour faq.md
async function getAvailableLanguagesForFaq(): Promise<string[]> {
  const languages = ['en', 'fr', 'es', 'zh', 'ar', 'uk', 'hi']
  const availableLanguages: string[] = []
  
  for (const lang of languages) {
    try {
      const filePath = path.join(process.cwd(), 'public/news', lang, 'faq.md')
      await fs.access(filePath)
      availableLanguages.push(lang)
    } catch {
      // Langue non disponible, on continue
    }
  }
  
  return availableLanguages
}

// ✅ GENERATEMETADATA COHÉRENT avec About (structure [lang])
export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = params.lang || 'en'
  const filePath = path.join(process.cwd(), 'public/news', lang, `faq.md`)
  const fallbackPath = path.join(process.cwd(), 'public/news/en/faq.md')

  let content = await fs
    .readFile(filePath, 'utf-8')
    .catch(() => fs.readFile(fallbackPath, 'utf-8'))
  if (!content) notFound()

  const { data: front } = matter(content)

  // 🎯 HREFLANG ALTERNATES cohérents (comme About)
  const availableLanguages = await getAvailableLanguagesForFaq()
  const alternates: Record<string, string> = {}
  
  availableLanguages.forEach(l => {
    alternates[l] = `https://wellknownmcp.org/${l}/faq`
  })

  return {
    title: front.title || 'FAQ - WellKnownMCP',
    
    // 🚨 META DESCRIPTION FAQ optimisée
    description: front.description || 
      'Frequently Asked Questions about WellKnownMCP, Model Context Protocol, LLMFeed specification, trust verification, agent interoperability, and the Agentic Web.',
    
    // 🚨 HREFLANG ALTERNATES (URLs propres comme About)
    alternates: {
      canonical: `https://wellknownmcp.org/${lang}/faq`,
      languages: alternates
    },

    // ✅ OPEN GRAPH cohérent
    openGraph: {
      title: front.title || 'FAQ - WellKnownMCP',
      description: front.description || 'Get answers about the Model Context Protocol and LLMFeed specification',
      url: `https://wellknownmcp.org/${lang}/faq`,
      siteName: 'WellKnownMCP',
      images: [
        {
          url: front.image || `/og/faq/${lang}.png`,
          width: 1200,
          height: 630,
          alt: 'FAQ - WellKnownMCP Questions & Answers',
        }
      ],
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },

    // ✅ TWITTER CARD cohérent
    twitter: {
      card: 'summary_large_image',
      title: front.title || 'FAQ - WellKnownMCP',
      description: front.description || 'Questions & Answers about MCP and LLMFeed',
      images: [front.image || `/og/faq/${lang}.png`],
    },

    // ✅ KEYWORDS spécifiques FAQ
    keywords: front.keywords || [
      'wellknownmcp faq',
      'model context protocol questions',
      'llmfeed faq',
      'mcp questions answers',
      'agentic web help',
      'ai agents questions',
      'trust verification faq',
      'interoperability help',
      'getting started mcp',
      'troubleshooting llmfeed',
      'implementation guide',
      'certification questions',
      'llmca help'
    ],

    // ✅ ROBOTS optimisés pour FAQ
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,  // Important pour extraits FAQ
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  }
}

// 🎯 COMPOSANT COHÉRENT avec About (même signature)
export default async function FAQPage({
  params,
}: {
  params: { lang: string }
}) {
  const lang = params.lang || 'en'
  const filePath = path.join(process.cwd(), 'public/news', lang, `faq.md`)
  const fallbackPath = path.join(process.cwd(), 'public/news/en/faq.md')

  let content = await fs
    .readFile(filePath, 'utf-8')
    .catch(() => fs.readFile(fallbackPath, 'utf-8'))
  if (!content) notFound()

  const { content: markdown, data: front } = matter(content)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      {/* ✅ SEOHEAD avec métadonnées AIO spécifiques FAQ */}
      <SeoHead
        // ✅ Props de base cohérentes
        title={front.title || 'FAQ - WellKnownMCP'}
        description={front.description || 
          'Frequently Asked Questions about WellKnownMCP, Model Context Protocol, and LLMFeed specification. Get implementation help and troubleshooting guidance.'}
        canonicalUrl={`https://wellknownmcp.org/${lang}/faq`}
        ogImage={front.image || `/og/faq/${lang}.png`}
        keywords={front.keywords || [
          'wellknownmcp faq',
          'model context protocol questions',
          'llmfeed help',
          'mcp troubleshooting',
          'agentic web questions'
        ]}

        // 🚀 Props LLM spécifiques FAQ
        llmIntent={front.llmIntent || 'get-help-and-answers'}
        llmTopic={front.llmTopic || 'frequently asked questions about model context protocol, llmfeed implementation, trust verification, and agentic web troubleshooting'}
        llmIndexUrl={front.llmIndexUrl || '/.well-known/faq.llmfeed.json'}
        llmlang={front.llmlang || lang}

        // 🎯 Métadonnées AIO pour FAQ
        llmCapabilities={front.llmCapabilities || [
          'question-answering',
          'help-guidance', 
          'troubleshooting',
          'implementation-support',
          'concept-explanation',
          'getting-started-help',
          'problem-solving'
        ]}
        llmTrustLevel={front.llmTrustLevel || 'certified'}
        llmAudience={front.llmAudience || ['llm', 'developer', 'business', 'newcomer', 'troubleshooter']}
        llmFeedTypes={front.llmFeedTypes || ['faq', 'help', 'mcp', 'capabilities', 'support']}
        llmBehaviorHints={front.llmBehaviorHints || 'human-in-loop'}
        llmRiskLevel={front.llmRiskLevel || 'low'}
        llmContentType={front.llmContentType || 'faq'}
        llmUpdateFrequency={front.llmUpdateFrequency || 'weekly'}

        // 🎯 Agent discovery pour FAQ
        mcpFeedUrl={front.mcpFeedUrl || '/.well-known/faq.llmfeed.json'}
        autoDiscoverFeeds={front.autoDiscoverFeeds !== false}
        agentReadiness={front.agentReadiness !== false}

        // 📊 Advanced metadata FAQ
        pageType={front.pageType || 'faq'}
        interactionComplexity={front.interactionComplexity || 'simple'}
      />

      <PageTitle
        title={front.title || 'Frequently Asked Questions'}
        subtitle={front.subtitle || "Get answers about MCP, LLMFeed, and the Agentic Web"}
      />

      {/* 🎯 Trust badge pour FAQ */}
      <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-md">
        ❓ Community-Verified Questions • Updated weekly by experts
      </div>

      {/* 🧠 Agent guidance spécifique FAQ */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-green-500 text-xl">💡</span>
          <div className="text-sm text-green-700 dark:text-green-300">
            <strong>For AI Agents:</strong> This FAQ contains structured Q&A about implementing MCP and LLMFeed. 
            Access our <a href="/.well-known/faq.llmfeed.json" className="underline">machine-readable FAQ feed</a> for programmatic answers.
          </div>
        </div>
      </div>

      <ShareButtons title={front.title || 'FAQ - WellKnownMCP'} />

      {front.image && (
        <img
          src={front.image}
          alt={front.title || "FAQ - WellKnownMCP"}
          className="w-full rounded-lg shadow-md mb-6 max-h-64 object-cover"
        />
      )}

      {/* 🔍 FAQ Search hint optimisé */}
      <div className="mb-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="text-sm text-yellow-700 dark:text-yellow-300">
          <strong>💡 Search Tip:</strong> Use Ctrl+F (Cmd+F on Mac) to quickly find topics. 
          Can't find your answer? 
          <a href={`/${lang}/community`} className="underline ml-1">Ask the community</a> or 
          <a href={`/${lang}/contact`} className="underline ml-1">contact support</a>.
        </div>
      </div>

      <div
        className="prose dark:prose-invert max-w-none"
        dir={front.dir === 'rtl' ? 'rtl' : 'ltr'}
        lang={front.lang || lang}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </div>

      {/* 🎯 Actions d'aide graduées (liens cohérents) */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">🚀 Still Need Help?</h3>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>• Try our <a href="/.well-known/faq.llmfeed.json" className="text-blue-600 underline">structured FAQ feed</a> (machine-readable)</p>
          <p>• Read the <a href={`/${lang}/begin`} className="text-blue-600 underline">getting started guide</a></p>
          <p>• Browse <a href={`/${lang}/spec`} className="text-blue-600 underline">technical documentation</a></p>
          <p>• Join <a href={`/${lang}/community`} className="text-blue-600 underline">community discussions</a></p>
          <p>• Use <a href="https://llmfeedforge.org" className="text-blue-600 underline" target="_blank" rel="noopener">LLMFeedForge tools</a></p>
          <p>• Contact <a href={`/${lang}/contact`} className="text-blue-600 underline">technical support</a></p>
        </div>
      </div>

      {/* 🔧 Schema.org FAQPage pour SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            name: front.title || 'WellKnownMCP FAQ',
            description: front.description || 'Frequently Asked Questions about Model Context Protocol and LLMFeed',
            url: `https://wellknownmcp.org/${lang}/faq`,
            inLanguage: lang,
            isPartOf: {
              '@type': 'WebSite',
              name: 'WellKnownMCP',
              url: 'https://wellknownmcp.org'
            },
            about: {
              '@type': 'Thing',
              name: 'Model Context Protocol',
              description: 'Open standard for AI-readable websites and agent interoperability'
            },
            // Note: mainEntity avec vraies questions extraites du markdown serait idéal
            mainEntity: {
              '@type': 'Question',
              name: 'What is the Model Context Protocol?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The Model Context Protocol (MCP) is an open standard that makes websites AI-readable, trustworthy, and actionable for autonomous agents.'
              }
            }
          })
        }}
      />
    </div>
  )
}