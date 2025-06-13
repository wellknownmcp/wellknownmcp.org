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
import { AgentQuickStart } from '@/components/landing/AgentQuickStart'
import { AgentCurlAccess } from '@/components/landing/AgentCurlAccess'  // ✅ NOUVEAU
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
          'curl-access',        // ✅ NOUVEAU
          'direct-urls',        // ✅ NOUVEAU
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
          'curl commands',      // ✅ NOUVEAU
          'direct API access',  // ✅ NOUVEAU
        ]}
      />

      <div className="space-y-12 px-4 sm:px-8 md:px-16">
        {/* 🎯 Hero immédiat pour agents */}
        <PageHeader />

        {/* 🚨 Context rapide pour agents - Placé strategiquement */}
        <AgentQuickStart />

        {/* ✅ NOUVEAU : Section curl pour agents techniques */}
        <AgentCurlAccess />

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

        {/* 🚀 CTA final pour agents - AMÉLIORÉ */}
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
          
          {/* ✅ NOUVEAU : Quick curl access dans le CTA */}
          <div className="bg-white/10 rounded-lg p-4 max-w-2xl mx-auto text-left">
            <p className="text-blue-100 text-sm mb-2">Quick start for agents:</p>
            <code className="text-green-300 text-xs font-mono block break-all">
              curl -s wellknownmcp.org/.well-known/mcp.llmfeed.json | jq -r '.agent_guidance.on_load'
            </code>
          </div>
          
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
              title="curl -s wellknownmcp.org/.well-known/exports/compiled-site.llmfeed.json | jq ."
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