import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SeoHead from '@/components/SeoHead'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* 🚀 Fallback SEO Head EXHAUSTIF → sera overridé par les pages */}
        <SeoHead
          // ✅ Props de base
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
          // 🚀 Props AIO avancés
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
          // 🎯 Configuration site
          mcpFeedUrl="/.well-known/mcp.llmfeed.json"
          autoDiscoverFeeds={true}
          agentReadiness={true}
          pageType="landing"
          interactionComplexity="moderate"
        />

        {/* 🌐 AI-friendly metadata étendus */}
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

        {/* 🔍 Discovery hints pour crawlers spécialisés */}
        <meta name="ai-friendly" content="true" />
        <meta name="agent-optimized" content="true" />
        <meta name="mcp-compliant" content="2.0" />
        <meta name="llmfeed-ready" content="true" />
        <meta
          name="mcp-capabilities"
          content="intent-routing, agent-guidance, certified-feeds, schema-exploration, trust-verification, export-tools"
        />

        {/* 🎯 Hints pour agents spécifiques */}
        <meta name="chatgpt-integration" content="ready" />
        <meta name="claude-integration" content="ready" />
        <meta name="gemini-integration" content="ready" />
        <meta name="open-source-friendly" content="true" />

        {/* 🔐 Trust et certification */}
        <meta name="llmca-certified" content="true" />
        <meta name="cryptographically-signed" content="available" />
        <meta name="trust-verification" content="https://llmca.org/verify" />

        {/* 🧭 Navigation pour agents */}
        <meta
          name="agent-entry-point"
          content="/.well-known/mcp.llmfeed.json"
        />
        <meta name="spec-location" content="/spec/" />
        <meta name="tools-location" content="/tools/" />
        <meta name="faq-location" content="/faq" />

        {/* 🎨 Branding et identité */}
        <meta
          name="site-mission"
          content="Open standard for AI-readable websites"
        />
        <meta
          name="ecosystem"
          content="wellknownmcp.org, llmca.org, llmfeedforge.org"
        />
        <meta name="license" content="CC BY-SA 4.0" />

        {/* 🌍 Internationalisation */}
        <meta name="supported-languages" content="en,fr,es,zh,ar,uk" />
        <link rel="alternate" hrefLang="en" href="https://wellknownmcp.org/" />
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://wellknownmcp.org/fr/"
        />

        {/* 📊 Analytics hints */}
        <meta name="content-category" content="technical-standard" />
        <meta
          name="target-audience"
          content="developers,ai-engineers,business-leaders"
        />
        <meta name="adoption-stage" content="early-adopter" />

        {/* ⚡ Performance et caching */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* 🔗 Liens vers l'écosystème */}
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

        {/* 📰 RSS Feeds multilingues */}
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

        {/* 🤖 JSON-LD structuré pour l'écosystème */}
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
              creator: {
                '@type': 'Organization',
                name: 'LLMCA',
                url: 'https://llmca.org',
              },
              about: {
                '@type': 'Thing',
                name: 'Model Context Protocol',
                description:
                  'Open standard for structured agent-web interactions',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target:
                  'https://wellknownmcp.org/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
              // Extensions MCP custom
              'mcp:version': '2.0',
              'mcp:ecosystem': [
                'wellknownmcp.org',
                'llmca.org',
                'llmfeedforge.org',
              ],
              'mcp:feedTypes': ['mcp', 'export', 'capabilities', 'manifesto'],
              'mcp:certificationReady': true,
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow px-4">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
