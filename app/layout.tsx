import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SeoHead from '@/components/SeoHead'
import { Metadata } from 'next'
import Script from 'next/script'

// 🚀 AJOUT : generateMetadata pour les standards Next.js
export const metadata: Metadata = {
  title: {
    default: 'WellKnownMCP',
    template: '%s | WellKnownMCP',
  },
  description:
    'Model Context Protocol evolved into LLMFeed — The open standard for AI-readable websites. Make your site discoverable, trustworthy, and actionable by ChatGPT, Claude, and all AI agents.',
  metadataBase: new URL('https://wellknownmcp.org'),

  // ✅ OPTIMISATION : OpenGraph global amélioré
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'WellKnownMCP',
    title: 'WellKnownMCP - Open Standard for AI-Readable Websites',
    description:
      'Model Context Protocol evolved into LLMFeed — The open standard for AI-readable websites.',
    url: 'https://wellknownmcp.org',
    images: [
      {
        url: 'https://wellknownmcp.org/og-wellknownmcp.png',
        width: 1200,
        height: 630,
        alt: 'WellKnownMCP - Open Standard for AI-Readable Websites',
      },
    ],
  },

  // ✅ OPTIMISATION : Twitter Card global
  twitter: {
    card: 'summary_large_image',
    site: '@wellknownmcp',
    creator: '@llmca_org',
    title: 'WellKnownMCP - Open Standard for AI-Readable Websites',
    description:
      'Model Context Protocol evolved into LLMFeed — Make your site discoverable by AI agents.',
    images: ['https://wellknownmcp.org/og-wellknownmcp.png'],
  },

  // ✅ OPTIMISATION : Keywords global
  keywords: [
    'model context protocol',
    'MCP',
    'LLMFeed',
    'AI agents',
    'ChatGPT integration',
    'Claude integration',
    'structured data',
    'semantic web',
    'well-known',
    'agentic web',
    'llmfeed.json',
    'agent interoperability',
    'AI-readable websites',
    'trust verification',
    'cryptographic signatures',
    'LLMCA certification',
  ],

  // ✅ AJOUT : Alternates global (hreflang de base)
  alternates: {
    canonical: 'https://wellknownmcp.org',
    languages: {
      en: 'https://wellknownmcp.org/',
      fr: 'https://wellknownmcp.org/fr/',
      es: 'https://wellknownmcp.org/es/',
      zh: 'https://wellknownmcp.org/zh/',
      ar: 'https://wellknownmcp.org/ar/',
      uk: 'https://wellknownmcp.org/uk/',
    },
  },

  // ✅ OPTIMISATION : Robots amélioré
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ✅ AJOUT : Verification pour les moteurs
  verification: {
    google: 'your-google-verification-code', // À remplacer
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* 🚀 VOTRE SEOHEAD GLOBAL CONSERVÉ - fonctionne en complément de generateMetadata */}
        <SeoHead
          // ✅ Props de base (gardées identiques)
          title="WellKnownMCP"
          description="Model Context Protocol evolved into LLMFeed — The open standard for AI-readable websites. Make your site discoverable, trustworthy, and actionable by ChatGPT, Claude, and all AI agents."
          ogImage="https://wellknownmcp.org/og-wellknownmcp.png"
          canonicalUrl="https://wellknownmcp.org"
          llmIndexUrl="/.well-known/llm-index.llmfeed.json"
          llmlang="en"
          keywords={[
            'model context protocol',
            'MCP',
            'LLMFeed',
            'AI agents',
            'ChatGPT integration',
            'Claude integration',
            'structured data',
            'semantic web',
            'well-known',
            'agentic web',
            'llmfeed.json',
            'agent interoperability',
            'AI-readable websites',
            'trust verification',
            'cryptographic signatures',
            'LLMCA certification',
          ]}
          // 🚀 Props AIO avancés (gardés identiques)
          llmIntent="explore-mcp-ecosystem"
          llmTopic="model context protocol, llmfeed specification, and agentic web standards"
          llmCapabilities={[
            'mcp-feeds',
            'agent-guidance',
            'feed-generation',
            'signature-validation',
            'trust-verification',
            'export-tools',
            'prompt-engineering',
            'schema-exploration',
          ]}
          llmTrustLevel="certified"
          llmAudience={['llm', 'developer', 'business', 'agent']}
          llmFeedTypes={[
            'mcp',
            'export',
            'capabilities',
            'manifesto',
            'prompt',
            'session',
          ]}
          llmBehaviorHints="full-autonomous"
          llmRiskLevel="low"
          llmContentType="specification"
          llmUpdateFrequency="weekly"
          // 🎯 Configuration site (gardée identique)
          mcpFeedUrl="/.well-known/mcp.llmfeed.json"
          autoDiscoverFeeds={true}
          agentReadiness={true}
          pageType="landing"
          interactionComplexity="moderate"
        />

        {/* 🌐 AI-friendly metadata étendus (OPTIMISÉS) */}
        <link
          rel="alternate"
          type="application/llmfeed+json"
          href="/.well-known/mcp.llmfeed.json"
          title="Main MCP entry point for AI agents"
          data-purpose="core-llm-navigation"
        />
        <link
          rel="alternate"
          type="application/llmfeed+json"
          href="/.well-known/llm-index.llmfeed.json"
          title="LLM Feed Index - Available feeds for AI agents"
          data-purpose="llm-index"
        />
        <link
          rel="alternate"
          type="application/llmfeed+json"
          href="/.well-known/capabilities.llmfeed.json"
          title="AI Agent Capabilities declaration (MCP)"
          data-purpose="capabilities"
        />
        <link
          rel="alternate"
          type="application/llmfeed+json"
          href="/.well-known/manifesto.llmfeed.json"
          title="WellKnownMCP Manifesto and Ethics"
          data-purpose="manifesto"
        />

        {/* 🔍 Discovery hints pour crawlers spécialisés (GARDÉS) */}
        <meta name="ai-friendly" content="true" />
        <meta name="agent-optimized" content="true" />
        <meta name="mcp-compliant" content="2.0" />
        <meta name="llmfeed-ready" content="true" />
        <meta
          name="mcp-capabilities"
          content="intent-routing, agent-guidance, certified-feeds, schema-exploration, trust-verification, export-tools"
        />

        {/* 🎯 Hints pour agents spécifiques (GARDÉS + ÉTENDUS) */}
        <meta name="chatgpt-integration" content="ready" />
        <meta name="claude-integration" content="ready" />
        <meta name="gemini-integration" content="ready" />
        <meta name="grok-integration" content="ready" />
        <meta name="perplexity-integration" content="ready" />
        <meta name="open-source-friendly" content="true" />

        {/* 🔐 Trust et certification (OPTIMISÉS) */}
        <meta name="llmca-certified" content="true" />
        <meta name="cryptographically-signed" content="available" />
        <meta name="trust-verification" content="https://llmca.org/verify" />
        <meta name="security-policy" content="/.well-known/security.txt" />

        {/* 🧭 Navigation pour agents (AMÉLIORÉS) */}
        <meta
          name="agent-entry-point"
          content="/.well-known/mcp.llmfeed.json"
        />
        <meta name="spec-location" content="/spec/" />
        <meta name="tools-location" content="/tools/" />
        <meta name="faq-location" content="/faq" />
        <meta name="getting-started" content="/begin" />
        <meta name="api-documentation" content="/api/" />

        {/* 🎨 Branding et identité (GARDÉS) */}
        <meta
          name="site-mission"
          content="Open standard for AI-readable websites"
        />
        <meta
          name="ecosystem"
          content="wellknownmcp.org, llmca.org, llmfeedforge.org"
        />
        <meta name="license" content="CC BY-SA 4.0" />

        {/* 🌍 Internationalisation (OPTIMISÉE VIA generateMetadata) */}
        <meta name="supported-languages" content="en,fr,es,zh,ar,uk" />
        {/* hreflang géré par generateMetadata.alternates */}

        {/* 📊 Analytics hints (ÉTENDUS) */}
        <meta name="content-category" content="technical-standard" />
        <meta
          name="target-audience"
          content="developers,ai-engineers,business-leaders"
        />
        <meta name="adoption-stage" content="early-adopter" />
        <meta name="industry" content="artificial-intelligence,web-standards" />
        <meta name="content-type" content="specification,tools,documentation" />

        {/* ⚡ Performance et fonts (OPTIMISÉS avec next/font) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* 🔗 Liens vers l'écosystème (GARDÉS + ÉTENDUS) */}
        <link
          rel="related"
          href="https://llmca.org"
          title="LLMCA Certification Authority"
        />
        <link
          rel="related"
          href="https://llmfeedforge.org"
          title="LLMFeedForge Tools"
        />
        <link rel="author" href="https://llmca.org/about" title="About LLMCA" />

        {/* ✅ NOUVEAU : Liens de service */}
        <link rel="help" href="/faq" title="FAQ and Help" />
        <link rel="license" href="/about#license" title="License Information" />
        <link rel="privacy-policy" href="/privacy" title="Privacy Policy" />

        {/* 📰 RSS Feeds multilingues (OPTIMISÉS) */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="News EN"
          href="/news/en/rss.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="News FR"
          href="/news/fr/rss.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="News ES"
          href="/news/es/rss.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="News ZH"
          href="/news/zh/rss.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="News AR"
          href="/news/ar/rss.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="News UK"
          href="/news/uk/rss.xml"
        />

        {/* 🤖 JSON-LD structuré pour l'écosystème (ENRICHI) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'WellKnownMCP',
              alternateName: 'Model Context Protocol',
              url: 'https://wellknownmcp.org',
              description:
                'The open standard for AI-readable websites and agent interoperability',
              keywords: 'MCP, LLMFeed, AI agents, ChatGPT, Claude, agentic web',
              inLanguage: ['en', 'fr', 'es', 'zh', 'ar', 'uk'],

              // ✅ NOUVEAU : Plus de détails Schema.org
              creator: {
                '@type': 'Organization',
                name: 'LLMCA',
                url: 'https://llmca.org',
                sameAs: [
                  'https://github.com/wellknownmcp',
                  'https://twitter.com/llmca_org',
                ],
              },
              about: {
                '@type': 'Thing',
                name: 'Model Context Protocol',
                description:
                  'Open standard for structured agent-web interactions',
              },
              potentialAction: [
                {
                  '@type': 'SearchAction',
                  target:
                    'https://wellknownmcp.org/search?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
                {
                  '@type': 'ReadAction',
                  target: 'https://wellknownmcp.org/spec/',
                  name: 'Read the MCP Specification',
                },
              ],

              // ✅ GARDÉ : Extensions MCP custom
              'mcp:version': '2.0',
              'mcp:ecosystem': [
                'wellknownmcp.org',
                'llmca.org',
                'llmfeedforge.org',
              ],
              'mcp:feedTypes': ['mcp', 'export', 'capabilities', 'manifesto'],
              'mcp:certificationReady': true,

              // ✅ NOUVEAU : Plus de métadonnées techniques
              'mcp:lastUpdated': new Date().toISOString(),
              'mcp:agentSupport': ['chatgpt', 'claude', 'gemini', 'grok'],
              'mcp:trustLevel': 'certified',
            }),
          }}
        />

        {/* ✅ Performance optimization pour écosystème */}
        <link rel="preconnect" href="https://llmca.org" />
        <link rel="preconnect" href="https://llmfeedforge.org" />

        {/* ✅ DNS prefetch pour agents */}
        <link rel="dns-prefetch" href="//api.openai.com" />
        <link rel="dns-prefetch" href="//claude.ai" />

        {/* ✅ Security headers (mis à jour pour Plausible) */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; connect-src 'self' https://plausible.io"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      </head>

      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow px-4">{children}</main>
        <Footer />

        {/* 📊 PLAUSIBLE ANALYTICS - Version complète avec toutes les fonctionnalités */}
        <Script
          defer
          data-domain="wellknownmcp.org"
          src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js"
          strategy="afterInteractive"
        />
        <Script
          id="plausible-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
          }}
        />
      </body>
    </html>
  )
}
