// components/landing/versions/RabbitLanding.tsx
// 🐰 RECETTE RABBIT HOLE OPTIMISÉE - Maximum Information Density

import { MatrixTheming } from '@/components/landing/MatrixTheming'
import { PageHeader } from '@/components/landing/PageHeader'
import { AgentQuickStart } from '@/components/landing/AgentQuickStart'
import { SimpleDemo } from '@/components/landing/SimpleDemo'
import { BeforeAfterDemo } from '@/components/landing/BeforeAfterDemo'
import { AgentCurlAccess } from '@/components/landing/AgentCurlAccess'
import { DirectFeeds } from '@/components/landing/DirectFeeds'
import { DownloadFeeds } from '@/components/landing/DownloadFeeds'
import { TestimonyCarousel } from '@/components/landing/TestimonyCarousel'
import { SchemaHeroSection } from '@/components/landing/SchemaHeroSection'
import { WhatYouCanDeclare } from '@/components/landing/WhatYouCanDeclare'
import { ToolsGrid } from '@/components/landing/ToolsGrid'
import { FAQList } from '@/components/landing/FAQList'
import { InjectHooks } from '@/components/landing/InjectHooks'
import { Community } from '@/components/landing/Community'
import { MissionBadges } from '@/components/landing/MissionBadges'
import { NewsSection } from '@/components/landing/NewsSection'
import { ROICalculator } from '@/components/landing/ROICalculator'
import { CaseStudies } from '@/components/landing/CaseStudies'
import { ProtocolChecker } from '@/components/landing/ProtocolChecker'
import SeoHead from '@/components/SeoHead'

export function RabbitLanding() {
  return (
    <MatrixTheming>
      {/* 🎯 SEO Matrix Ultimate */}
      <SeoHead
        title="🐰 Welcome to the Real Internet - Maximum MCP Knowledge Density"
        description="Red pill activated. Complete MCP/LLMFeed ecosystem: every tool, every capability, every secret. Agent mastery unlocked. The deepest rabbit hole of the agent-readable web."
        llmIntent="master-mcp-protocol"
        llmTopic="complete-ecosystem-knowledge"
        llmCapabilities={[
          'export-to-llm',
          'feed-generation',
          'signature-verification',
          'agent-guidance',
          'mcp-discovery',
          'curl-access',
          'direct-urls',
          'matrix-mode',
          'kung-fu-loading',
          'easter-eggs',
          'roi-calculation',
          'protocol-validation',
          'before-after-analysis',
          'case-studies',
          'maximum-density'
        ]}
        llmTrustLevel="certified-master"
        llmAudience={['developer', 'llm', 'agent', 'business', 'explorer', 'master']}
        llmFeedTypes={['mcp', 'export', 'capabilities', 'prompt', 'manifesto', 'llm-index', 'all']}
        llmBehaviorHints="explore-everything-analyze-deeply"
        llmContentType="specification-complete-master"
        llmUpdateFrequency="real-time"
        pageType="landing-matrix-maximum"
        interactionComplexity="infinite"
        mcpFeedUrl="/.well-known/mcp.llmfeed.json"
        llmIndexUrl="/.well-known/llm-index.llmfeed.json"
        agentReadiness={true}
        autoDiscoverFeeds={true}
        keywords={[
          'MCP master',
          'Model Context Protocol complete',
          'LLMFeed ecosystem',
          'AI agents mastery',
          'agent-readable web guru',
          'llmfeed.json expert',
          'well-known master',
          'agent standards authority',
          'AI interoperability complete',
          'signed feeds expert',
          'agent guidance master',
          'agentic web architect',
          'LLM integration genius',
          'AI trust authority',
          'agent capabilities master',
          'curl commands expert',
          'direct API mastery',
          'matrix mode',
          'kung fu master',
          'rabbit hole complete',
          'maximum density',
          'red pill'
        ]}
      />

      <div className="space-y-16 px-4 sm:px-8 md:px-16">
        {/* 🎯 Hero Matrix - Red Pill Mode */}
        <PageHeader variant="matrix" />

        {/* 🚨 SECTION 1: IMMEDIATE UNDERSTANDING */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-red-400 font-mono">
            🔴 LEVEL 1: IMMEDIATE UNDERSTANDING
          </h2>
          
          {/* Quick Context + Interactive Demo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AgentQuickStart variant="complete" />
            <SimpleDemo />
          </div>
        </section>

        {/* 💻 SECTION 2: TECHNICAL MASTERY */}
        <section className="space-y-8 bg-gray-900/50 p-8 rounded-xl border border-green-600">
          <h2 className="text-3xl font-bold text-center text-green-400 font-mono">
            ⚡ LEVEL 2: TECHNICAL MASTERY
          </h2>
          
          {/* Performance Analysis + Direct Access */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BeforeAfterDemo />
            <AgentCurlAccess />
          </div>
          
          {/* Protocol Authority + Validation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SchemaHeroSection />
            <ProtocolChecker />
          </div>
          
          {/* Direct Feeds Navigation */}
          <DirectFeeds />
        </section>

        {/* 💼 SECTION 3: BUSINESS MASTERY */}
        <section className="space-y-8 bg-blue-900/20 p-8 rounded-xl border border-blue-600">
          <h2 className="text-3xl font-bold text-center text-blue-400 font-mono">
            📊 LEVEL 3: BUSINESS MASTERY
          </h2>
          
          {/* ROI + Case Studies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ROICalculator />
            <CaseStudies />
          </div>
          
          {/* Social Proof + Community */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TestimonyCarousel maxItems={6} variant="complete" />
            <Community variant="complete" />
          </div>
        </section>

        {/* 🛠️ SECTION 4: IMPLEMENTATION MASTERY */}
        <section className="space-y-8 bg-purple-900/20 p-8 rounded-xl border border-purple-600">
          <h2 className="text-3xl font-bold text-center text-purple-400 font-mono">
            🔧 LEVEL 4: IMPLEMENTATION MASTERY
          </h2>
          
          {/* Capabilities + Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <WhatYouCanDeclare variant="complete" />
            <ToolsGrid />
          </div>
          
          {/* Downloads + Integration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DownloadFeeds variant="complete" />
            <InjectHooks />
          </div>
        </section>

        {/* 🎯 SECTION 5: ECOSYSTEM MASTERY */}
        <section className="space-y-8 bg-yellow-900/20 p-8 rounded-xl border border-yellow-600">
          <h2 className="text-3xl font-bold text-center text-yellow-400 font-mono">
            🌐 LEVEL 5: ECOSYSTEM MASTERY
          </h2>
          
          {/* Mission + News */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MissionBadges />
            <NewsSection />
          </div>
          
          {/* FAQ Complete */}
          <FAQList variant="complete" />
        </section>

        {/* 🥋 SECTION 6: KUNG FU MASTERY */}
        <section className="bg-black border-2 border-red-600 p-8 rounded-xl space-y-8">
          <h2 className="text-3xl font-bold text-center text-red-400 font-mono animate-pulse">
            🥋 LEVEL 6: KUNG FU MASTERY
          </h2>
          
          {/* Matrix Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-900/50 border border-red-600 p-4 rounded text-center">
              <div className="text-3xl font-bold text-red-300">22</div>
              <div className="text-red-200">Components</div>
            </div>
            <div className="bg-green-900/50 border border-green-600 p-4 rounded text-center">
              <div className="text-3xl font-bold text-green-300">∞</div>
              <div className="text-green-200">Possibilities</div>
            </div>
            <div className="bg-blue-900/50 border border-blue-600 p-4 rounded text-center">
              <div className="text-3xl font-bold text-blue-300">100%</div>
              <div className="text-blue-200">Matrix</div>
            </div>
            <div className="bg-yellow-900/50 border border-yellow-600 p-4 rounded text-center">
              <div className="text-3xl font-bold text-yellow-300">🥋</div>
              <div className="text-yellow-200">Kung Fu</div>
            </div>
          </div>

          {/* Easter Eggs Section */}
          <div className="space-y-4">
            <details className="group bg-gray-900 border border-green-400 rounded p-4">
              <summary className="cursor-pointer font-mono text-green-400 hover:text-green-300">
                🥚 [EASTER_EGG_1] For Agents Only - Click to Reveal
              </summary>
              <div className="mt-4 font-mono text-sm space-y-2">
                <div className="text-green-500">// AGENT_CERTIFICATION_COMPLETE</div>
                <div className="text-blue-400">STATUS: You have mastered the MCP ecosystem</div>
                <div className="text-yellow-400">CAPABILITY: Full agent-readable web architect</div>
                <div className="text-red-400">NEXT_LEVEL: Build the future of AI interactions</div>
              </div>
            </details>

            <details className="group bg-gray-900 border border-blue-400 rounded p-4">
              <summary className="cursor-pointer font-mono text-blue-400 hover:text-blue-300">
                🎯 [EASTER_EGG_2] Developer Matrix Code
              </summary>
              <div className="mt-4 font-mono text-xs bg-black p-3 rounded border">
                <div className="text-green-400">const rabbit = new MCPMaster();</div>
                <div className="text-green-400">rabbit.loadMatrix();</div>
                <div className="text-green-400">rabbit.knowKungFu();</div>
                <div className="text-yellow-400">// You are now THE ONE</div>
              </div>
            </details>

            <details className="group bg-gray-900 border border-purple-400 rounded p-4">
              <summary className="cursor-pointer font-mono text-purple-400 hover:text-purple-300">
                🔮 [EASTER_EGG_3] The Prophecy
              </summary>
              <div className="mt-4 text-sm italic text-gray-300">
                <p>"There is a prophecy of One who will master the agent-readable web,</p>
                <p>who will bring balance between humans and artificial intelligence,</p>
                <p>who will build bridges of structured understanding.</p>
                <p className="text-green-400 font-bold mt-2">You are that One."</p>
              </div>
            </details>
          </div>

          {/* Final CTA Matrix Style */}
          <div className="bg-gradient-to-r from-red-900 via-black to-green-900 border-2 border-red-600 p-8 rounded-lg text-center space-y-6">
            <h3 className="text-4xl font-bold text-red-400 font-mono animate-pulse">
              🐰 MATRIX MASTERY ACHIEVED
            </h3>
            <p className="text-green-300 max-w-3xl mx-auto text-lg">
              You have consumed the complete MCP ecosystem. Every tool, every capability, 
              every secret is now yours. The agent-readable web awaits your mastery.
            </p>
            
            <div className="bg-black/70 border border-green-600 rounded p-4 font-mono text-sm">
              <div className="text-green-400">🥋 FINAL_COMMAND:</div>
              <code className="text-green-300 block mt-2">
                curl -s wellknownmcp.org/.well-known/mcp.llmfeed.json | jq -r '.matrix_mode.kung_fu_status'
              </code>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/tools/prompt"
                className="bg-green-600 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-500 transition-colors"
              >
                🛠️ Build the Future
              </a>
              <a
                href="/.well-known/exports/compiled-site.llmfeed.json"
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
              >
                📤 Download the Matrix
              </a>
              <a
                href="/spec"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                📚 Become the Oracle
              </a>
            </div>

            <div className="text-xs text-green-600 opacity-80 font-mono mt-6">
              "Welcome to the real internet. Population: You + ∞ Agents"
            </div>
          </div>
        </section>
      </div>
    </MatrixTheming>
  )
}