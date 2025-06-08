'use client'

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
        {/* Fallback SEO Head → sera overridé par les pages */}
        <SeoHead
          title="WellKnownMCP"
          description="Model Context Protocol — verified knowledge between agents"
          ogImage="https://wellknownmcp.org/og-wellknownmcp.png"
          llmIndexUrl="/.well-known/index.llmfeed.json"
          llmlang="en"
          keywords={[
            'model context protocol',
            'LLM',
            'structured data',
            'semantic web',
            'well-known',
            'AI agents',
          ]}
        />
        {/* AI-friendly metadata */}
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
        <meta name="ai-friendly" content="true" />
        <meta
          name="mcp-capabilities"
          content="intent-routing, agent-guidance, certified-feeds, schema-exploration"
        />
        <meta
          name="description"
          content="WellKnownMCP helps AI agents understand and interact with your site. Discover MCP feeds, certified schemas, and AI-friendly tools."
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* RSS Feeds */}
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
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow px-4">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
