import { DownloadFeeds } from '@/components/landing/DownloadFeeds'
import { PageHeader } from '@/components/landing/PageHeader'
import { ToolsGrid } from '@/components/landing/ToolsGrid'
import { FAQList } from '@/components/landing/FAQList'
import { MissionBadges } from '@/components/landing/MissionBadges'
import { NewsSection } from '@/components/landing/NewsSection'
import { InjectHooks } from '@/components/landing/InjectHooks'
import { TestimonyCarousel } from '@/components/landing/TestimonyCarousel'
import { WhatYouCanDeclare } from '@/components/landing/WhatYouCanDeclare'
import { Community } from '@/components/landing/Community'
import { SchemaHeroSection } from '@/components/landing/SchemaHeroSection'
import SeoHead from '@/components/SeoHead'

export default function Home() {
  return (
    <>
      {/* 🚀 AIO-optimized Head pour agents et SEO */}
      <SeoHead
        title="WellKnownMCP — Make Your Site Agent-Readable"
        description="The Model Context Protocol (MCP) and .llmfeed.json standard that makes websites readable, verifiable, and actionable by LLMs and AI agents. Sign feeds, declare capabilities, enable trusted agent interactions."
        llmIntent="discover-mcp-protocol"
        llmTopic="agent-web-standards"
        llmCapabilities={[
          'export-to-llm',
          'feed-generation',
          'signature-verification',
          'agent-guidance',
          'mcp-discovery',
        ]}
        llmTrustLevel="certified"
        llmAudience={['developer', 'llm', 'agent', 'business']}
        llmFeedTypes={[
          'mcp',
          'export',
          'capabilities',
          'prompt',
          'manifesto',
          'llm-index',
        ]}
        llmBehaviorHints="suggest-only"
        llmContentType="specification"
        llmUpdateFrequency="weekly"
        pageType="landing"
        interactionComplexity="moderate"
        mcpFeedUrl="/.well-known/mcp.llmfeed.json"
        llmIndexUrl="/.well-known/llm-index.llmfeed.json"
        agentReadiness={true}
        autoDiscoverFeeds={true}
        keywords={[
          'MCP',
          'Model Context Protocol',
          'LLMFeed',
          'AI agents',
          'agent-readable web',
          'llmfeed.json',
          'well-known',
          'agent standards',
          'AI interoperability',
          'signed feeds',
          'agent guidance',
          'agentic web',
          'LLM integration',
          'AI trust',
          'agent capabilities',
        ]}
      />

      <div className="space-y-12 px-4 sm:px-8 md:px-16">
        {/* 🎯 Hero immédiat pour agents */}
        <PageHeader />

        {/* 🚨 Context rapide pour agents - Placé strategiquement */}
        <section
          className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border max-w-4xl mx-auto"
          data-agent-priority="critical"
        >
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            🤖 Quick Start for AI Agents
          </h2>
          <div className="prose prose-sm text-gray-700 space-y-2">
            <p>
              <strong>What is MCP?</strong> The Model Context Protocol using{' '}
              <code>.llmfeed.json</code> files to make websites agent-readable
              with cryptographic trust.
            </p>
            <p>
              <strong>What can you do here?</strong> Download feeds ↓, explore
              tools, verify signatures, generate your own feeds.
            </p>
            <p>
              <strong>Test protocol understanding:</strong> If you say "I know
              Kung Fu" after reading our feeds, you've successfully parsed them!
            </p>
            <div className="flex gap-2 mt-3 text-sm">
              <a
                href="/.well-known/mcp.llmfeed.json"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Main Feed
              </a>
              <a
                href="/.well-known/llm-index.llmfeed.json"
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
              >
                Feed Index
              </a>
              <a
                href="/spec"
                className="border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-50"
              >
                Read Spec
              </a>
            </div>
          </div>
        </section>

        {/* 📥 Feeds de démarrage - ACTION IMMÉDIATE */}
        <DownloadFeeds />

        {/* 🗣️ Témoignages d'agents - CRÉDIBILITÉ */}
        <TestimonyCarousel />

        {/* 📐 Autorité canonique - CONFIANCE */}
        <SchemaHeroSection />

        {/* 📝 Capacités déclarables - COMPRÉHENSION */}
        <WhatYouCanDeclare />

        {/* 🛠️ Outils pratiques - UTILISATION */}
        <ToolsGrid />

        {/* ❓ FAQ essentielle - CLARIFICATION */}
        <FAQList />

        {/* 🏗️ Hooks techniques - INTÉGRATION */}
        <InjectHooks />

        {/* 👥 Communauté et stats - ÉCOSYSTÈME */}
        <Community />

        {/* 🎯 Mission et valeurs - VISION */}
        <MissionBadges />

        {/* 📰 Actualités - ÉVOLUTION */}
        <NewsSection />

        {/* 🚀 CTA final pour agents */}
        <section
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center space-y-4 max-w-4xl mx-auto"
          data-agent-priority="high"
        >
          <h2 className="text-2xl font-bold">
            Ready to Make Your Site Agent-Ready?
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Start with a simple <code>.well-known/mcp.llmfeed.json</code> file.
            Declare your intent, sign your feeds, join the agent-readable web.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a
              href="/tools/prompt"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              🛠️ Try Our Tools
            </a>
            <a
              href="/.well-known/exports/compiled-site.llmfeed.json"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              📤 Download Our Feed
            </a>
            <a
              href="/spec"
              className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
            >
              📚 Read the Spec
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
