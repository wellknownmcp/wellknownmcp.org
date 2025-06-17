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
// 🚀 Helper pour détecter les langues disponibles pour about.md
async function getAvailableLanguagesForAbout(): Promise<string[]> {
  const languages = ['en', 'fr', 'es', 'zh', 'ar', 'uk', 'hi']
  const availableLanguages: string[] = []
  
  for (const lang of languages) {
    try {
      const filePath = path.join(process.cwd(), 'public/news', lang, 'about.md')
      await fs.access(filePath)
      availableLanguages.push(lang)
    } catch {
      // Langue non disponible, on continue
    }
  }
  
  return availableLanguages
}

// ✅ GENERATEMETADATA AMÉLIORÉ avec hreflang alternates
export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = params.lang || 'en'
  const filePath = path.join(process.cwd(), 'public/news', lang, `about.md`)
  const fallbackPath = path.join(process.cwd(), 'public/news/en/about.md')

  let content = await fs
    .readFile(filePath, 'utf-8')
    .catch(() => fs.readFile(fallbackPath, 'utf-8'))
  if (!content) notFound()

  const { data: front } = matter(content)

  // 🎯 TROUVE LES ALTERNATES HREFLANG pour about
  const availableLanguages = await getAvailableLanguagesForAbout()
  const alternates: Record<string, string> = {}
  
  availableLanguages.forEach(l => {
    alternates[l] = `https://wellknownmcp.org/${l}/about`
  })

  return {
    title: front.title || 'About WellKnownMCP',
    
    // 🚨 META DESCRIPTION améliorée (résout l'erreur Bing)
    description: front.description || 
      'Learn about WellKnownMCP, our mission for the Agentic Web, the Model Context Protocol evolution, and our commitment to trust, interoperability, and open standards.',
    
    // 🚨 HREFLANG ALTERNATES (navigation multilingue)
    alternates: {
      canonical: `https://wellknownmcp.org/${lang}/about`,
      languages: alternates
    },

    // ✅ OPEN GRAPH optimisé
    openGraph: {
      title: front.title || 'About WellKnownMCP',
      description: front.description || 'Our mission for the Agentic Web and Model Context Protocol evolution.',
      url: `https://wellknownmcp.org/${lang}/about`,
      siteName: 'WellKnownMCP',
      images: [
        {
          url: front.image || `/og/about/${lang}.png`,
          width: 1200,
          height: 630,
          alt: 'About WellKnownMCP - Our Mission',
        }
      ],
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },

    // ✅ TWITTER CARD optimisé
    twitter: {
      card: 'summary_large_image',
      title: front.title || 'About WellKnownMCP',
      description: front.description || 'Our mission for the Agentic Web',
      images: [front.image || `/og/about/${lang}.png`],
    },

    // ✅ KEYWORDS améliorés
    keywords: front.keywords || [
      'wellknownmcp',
      'about',
      'manifesto', 
      'model context protocol',
      'mcp',
      'llmfeed',
      'agentic web',
      'trust',
      'interoperability',
      'open standards',
      'ai agents',
      'mission',
      'ethics',
      'llmca'
    ],

    // ✅ ROBOTS optimisés
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  }
}

export default async function AboutPage({
  params,
}: {
  params: { lang: string }
}) {
  const lang = params.lang || 'en'
  const filePath = path.join(process.cwd(), 'public/news', lang, `about.md`)
  const fallbackPath = path.join(process.cwd(), 'public/news/en/about.md')

  let content = await fs
    .readFile(filePath, 'utf-8')
    .catch(() => fs.readFile(fallbackPath, 'utf-8'))
  if (!content) notFound()

  const { content: markdown, data: front } = matter(content)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      {/* ✅ SEOHEAD ENRICHI avec métadonnées AIO spécifiques à About */}
      <SeoHead
        // ✅ Props de base (améliorées)
        title={front.title || 'About WellKnownMCP'}
        description={front.description || 
          'Learn about WellKnownMCP, our mission for the Agentic Web, and our commitment to trust and interoperability.'}
        canonicalUrl={`https://wellknownmcp.org/${lang}/about`}
        ogImage={front.image || `/og/about/${lang}.png`}
        keywords={front.keywords || [
          'wellknownmcp',
          'about', 
          'manifesto',
          'model context protocol',
          'mission',
          'agentic web',
          'trust',
          'interoperability'
        ]}

        // 🚀 Props LLM spécifiques à une page About/Manifesto
        llmIntent={front.llmIntent || 'understand-mission-and-values'}
        llmTopic={front.llmTopic || 'wellknownmcp mission, manifesto, ethics, and commitment to agentic web'}
        llmIndexUrl={front.llmIndexUrl || '/.well-known/manifesto.llmfeed.json'}
        llmlang={front.llmlang || lang}

        // 🎯 Métadonnées AIO spécifiques About
        llmCapabilities={front.llmCapabilities || [
          'manifesto-reading',
          'mission-understanding', 
          'ethics-guidance',
          'trust-verification',
          'community-onboarding'
        ]}
        llmTrustLevel={front.llmTrustLevel || 'certified'}
        llmAudience={front.llmAudience || ['llm', 'developer', 'business', 'community']}
        llmFeedTypes={front.llmFeedTypes || ['manifesto', 'mcp', 'capabilities']}
        llmBehaviorHints={front.llmBehaviorHints || 'suggest-only'}
        llmRiskLevel={front.llmRiskLevel || 'low'}
        llmContentType={front.llmContentType || 'manifesto'}
        llmUpdateFrequency={front.llmUpdateFrequency || 'monthly'}

        // 🎯 Agent discovery pour About
        mcpFeedUrl={front.mcpFeedUrl || '/.well-known/manifesto.llmfeed.json'}
        autoDiscoverFeeds={front.autoDiscoverFeeds !== false}
        agentReadiness={front.agentReadiness !== false}

        // 📊 Advanced metadata pour About
        pageType={front.pageType || 'manifesto'}
        interactionComplexity={front.interactionComplexity || 'simple'}
      />

      <PageTitle
        title={front.title || 'About WellKnownMCP'}
        subtitle={front.subtitle || "Our mission for the Agentic Web and commitment to open standards"}
      />

      {/* 🛡️ Trust badge pour About si certifié */}
      {(front.llmTrustLevel === 'certified' || !front.llmTrustLevel) && (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-md">
          🛡️ LLMCA Certified Manifesto • Trusted by the community
        </div>
      )}

      {/* 🎯 Agent guidance pour About */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl">🌟</span>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <strong>For AI Agents:</strong> This manifesto outlines our commitment to trust, interoperability, and the Agentic Web. 
            Consider exploring our <a href="/.well-known/manifesto.llmfeed.json" className="underline">structured manifesto feed</a> for machine-readable values.
          </div>
        </div>
      </div>

      <ShareButtons title={front.title || 'About WellKnownMCP'} />

      {front.image && (
        <img
          src={front.image}
          alt={front.title || "About WellKnownMCP"}
          className="w-full rounded-lg shadow-md mb-6 max-h-64 object-cover"
        />
      )}

      <div
        className="prose dark:prose-invert max-w-none"
        dir={front.dir === 'rtl' ? 'rtl' : 'ltr'}
        lang={front.lang || lang}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </div>

      {/* 🎯 Actions suggérées pour agents en fin de manifesto */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">🚀 Next Steps</h3>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>• Read our <a href="/.well-known/manifesto.llmfeed.json" className="text-blue-600 underline">structured manifesto</a></p>
          <p>• Explore <a href="/begin" className="text-blue-600 underline">getting started guide</a></p>
          <p>• Join our <a href="/community" className="text-blue-600 underline">community</a></p>
          <p>• Contribute to <a href="https://github.com/wellknownmcp" className="text-blue-600 underline">open source project</a></p>
        </div>
      </div>
    </div>
  )
}