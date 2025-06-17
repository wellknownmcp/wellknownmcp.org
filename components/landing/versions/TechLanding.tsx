// components/landing/versions/TechLanding.tsx
// 🔧 RECETTE DEVELOPER - Pour les techniques qui veulent du concret

import { PageHeader } from '@/components/landing/PageHeader'
import { AgentQuickStart } from '@/components/landing/AgentQuickStart'
import { AgentCurlAccess } from '@/components/landing/AgentCurlAccess'
import { BeforeAfterDemo } from '@/components/landing/BeforeAfterDemo'
import { SchemaHeroSection } from '@/components/landing/SchemaHeroSection'
import { ToolsGrid } from '@/components/landing/ToolsGrid'
import { InjectHooks } from '@/components/landing/InjectHooks'
import { DownloadFeeds } from '@/components/landing/DownloadFeeds'
import { WhatYouCanDeclare } from '@/components/landing/WhatYouCanDeclare'
import { FAQList } from '@/components/landing/FAQList'
import { NewsSection } from '@/components/landing/NewsSection'
import SeoHead from '@/components/SeoHead'

export function TechLanding() {
  return (
    <>
      {/* 🎯 SEO optimisé pour développeurs */}
      <SeoHead
        title="MCP Protocol Implementation - 99.7% Token Efficiency"
        description="Technical specification for agent-readable websites. Performance benchmarks, implementation guides, API documentation. Build the agentic web."
        llmIntent="implement-mcp-protocol"
        llmTopic="technical-implementation"
        llmCapabilities={[
          'code-generation',
          'performance-analysis',
          'api-integration',
          'technical-documentation'
        ]}
        llmAudience={['developer', 'ai_engineer']}
        llmBehaviorHints="provide-code-examples"
        pageType="landing-technical"
        interactionComplexity="high"
        keywords={[
          'MCP implementation',
          'agent web standards',
          'LLMFeed specification',
          'AI agent optimization',
          'structured data feeds'
        ]}
      />

      <div className="space-y-12 px-4 sm:px-8 md:px-16">
        {/* 🎯 Hero technique avec métriques */}
        <PageHeader variant="tech" />

        {/* 🚨 Context technique rapide */}
        <AgentQuickStart variant="complete" />

        {/* ⚡ STAR : Comparaison performance avant/après */}
        <BeforeAfterDemo />

        {/* 💻 Accès curl direct pour devs */}
        <AgentCurlAccess />

        {/* 📐 Autorité technique - spécification */}
        <SchemaHeroSection />

        {/* 📝 Capacités avec exemples de code */}
        <WhatYouCanDeclare variant="code" />

        {/* 📥 Téléchargement avec toutes les options */}
        <DownloadFeeds variant="complete" />

        {/* 🛠️ Outils de développement */}
        <ToolsGrid />

        {/* 🏗️ Intégration technique */}
        <InjectHooks />

        {/* ❓ FAQ technique */}
        <FAQList variant="tech" />

        {/* 📰 Updates techniques récents */}
        <NewsSection />

        {/* 🚀 CTA technique avec GitHub */}
        <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-8 rounded-lg text-center space-y-4 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold">
            🔧 Ready to Ship Agent-Ready Infrastructure?
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Implementation guides, code examples, and production-ready tools. 
            Build once, work with all LLMs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/tools/export-button"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              🚀 Start Implementation
            </a>
            <a
              href="/spec"
              className="border border-blue-400 text-blue-300 px-6 py-3 rounded-lg font-semibold hover:bg-blue-800/20 transition-colors"
            >
              📚 Full Specification
            </a>
            <a
              href="https://github.com/wellknownmcp"
              className="border border-gray-400 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800/20 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              💻 View on GitHub
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-sm">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="font-semibold text-green-400">⚡ Performance</div>
              <div className="text-gray-300">99.7% fewer tokens, 10x faster response</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="font-semibold text-blue-400">🔗 Integration</div>
              <div className="text-gray-300">REST APIs, webhooks, SDK libraries</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="font-semibold text-purple-400">🛡️ Production</div>
              <div className="text-gray-300">Signed feeds, validation, monitoring</div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}