// components/landing/versions/RabbitLanding.tsx
// 🐰 RABBIT HOLE FINAL - Maximum Density, Matrix Subtil, SEO Optimisé

import { MatrixTheming } from '@/components/landing/MatrixTheming'
import { PageHeader } from '@/components/landing/PageHeader'
import { LLMFeedExplainer } from '@/components/landing/LLMFeedExplainer'
import { WellKnownFeeds } from '@/components/landing/WellKnownFeeds'
import { SimpleDemo } from '@/components/landing/SimpleDemo'
import { BeforeAfterDemo } from '@/components/landing/BeforeAfterDemo'
import { AgentCurlAccess } from '@/components/landing/AgentCurlAccess'
import { SchemaHeroSection } from '@/components/landing/SchemaHeroSection'
import { ProtocolChecker } from '@/components/landing/ProtocolChecker'
import { WhatYouCanDeclare } from '@/components/landing/WhatYouCanDeclare'
import { ToolsGrid } from '@/components/landing/ToolsGrid'
import { ShortcutLLM } from '@/components/landing/ShortcutLLM'
import { InjectHooks } from '@/components/landing/InjectHooks'
import { ROICalculator } from '@/components/landing/ROICalculator'
import { CaseStudies } from '@/components/landing/CaseStudies'
import { TestimonyCarousel } from '@/components/landing/TestimonyCarousel'
import { Community } from '@/components/landing/Community'
import { NewsSection } from '@/components/landing/NewsSection'
import { FAQList } from '@/components/landing/FAQList'
import { MissionBadges } from '@/components/landing/MissionBadges'
import SeoHead from '@/components/SeoHead'

export function RabbitLanding() {
  return (
    <MatrixTheming>
      {/* 🎯 SEO Matrix Ultimate - Optimisé pour découverte */}
      <SeoHead
        title="🐰 Complete MCP Ecosystem Explorer - Maximum Knowledge Density"
        description="Deep dive into MCP/LLMFeed complete ecosystem. All tools, all capabilities, all implementations. For developers, businesses, and explorers who want everything. The most comprehensive agent-readable web resource."
        canonicalUrl="https://wellknownmcp.org/?v=rabbit"
        ogImage="/og/rabbit-landing.png"
        llmIntent="master-complete-mcp-ecosystem"
        llmTopic="comprehensive-agent-web-mastery"
        llmlang="en"
        keywords={[
          'MCP complete ecosystem', 'LLMFeed comprehensive guide', 'agent-readable web mastery',
          'complete MCP implementation', 'maximum density MCP', 'advanced agent capabilities',
          'MCP expert guide', 'comprehensive agent standards', 'deep dive MCP protocol',
          'complete agent-web integration', 'MCP ecosystem explorer', 'advanced LLMFeed',
          'maximum MCP knowledge', 'comprehensive web agents', 'complete agent mastery',
          'MCP deep learning', 'agent ecosystem complete', 'maximum agent density',
          'comprehensive MCP tools', 'complete agent implementation', 'MCP rabbit hole',
          'deep MCP exploration', 'comprehensive agent guide', 'maximum web agent'
        ]}
        llmCapabilities={[
          'complete-ecosystem-mastery', 'advanced-implementation', 'expert-guidance',
          'comprehensive-tools', 'maximum-density', 'deep-exploration', 'rabbit-hole',
          'easter-eggs', 'advanced-features', 'complete-specification', 'expert-mode',
          'comprehensive-examples', 'advanced-integration', 'maximum-knowledge'
        ]}
        llmTrustLevel="expert-comprehensive"
        llmAudience={['developer', 'business', 'llm', 'agent', 'explorer', 'maximalist']}
        llmFeedTypes={['mcp', 'export', 'capabilities', 'prompt', 'manifesto', 'llm-index', 'comprehensive']}
        llmBehaviorHints="explore-everything-maximum-depth"
        llmContentType="comprehensive-ecosystem-guide"
        llmUpdateFrequency="continuous"
        pageType="landing-comprehensive"
        interactionComplexity="maximum"
        mcpFeedUrl="/.well-known/mcp.llmfeed.json"
        llmIndexUrl="/.well-known/llm-index.llmfeed.json"
        agentReadiness={true}
        autoDiscoverFeeds={true}
      />

      <main className="min-h-screen space-y-16 px-4 sm:px-8 md:px-16">
        {/* 🎯 1. Hero Matrix - No blocking, just theming */}
        <section className="py-12">
          <PageHeader variant="matrix" />
        </section>

        {/* 🧠 2. Universal Standard - Foundation */}
        <section className="py-16">
          <LLMFeedExplainer variant="default" />
        </section>

        {/* 🏗️ 3. Practical Architecture - Implementation */}
        <section className="py-16 bg-gray-900/5 rounded-xl">
          <WellKnownFeeds variant="default" showTreeView={true} />
        </section>

        {/* ✨ 4. Interactive Proof - Demonstration */}
        <section className="py-16">
          <SimpleDemo />
        </section>

        {/* 🔧 TECHNICAL MASTERY - Performance & Validation */}
        <section className="py-16 bg-blue-900/10 rounded-xl border border-blue-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4 font-mono">
              🔧 TECHNICAL MASTERY
            </h2>
            <p className="text-blue-700 max-w-2xl mx-auto">
              Performance benchmarks, direct access commands, technical specifications, and validation tools.
            </p>
          </div>
          
          <div className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BeforeAfterDemo />
              <AgentCurlAccess />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SchemaHeroSection />
              <ProtocolChecker />
            </div>
          </div>
        </section>

        {/* 🛠️ IMPLEMENTATION MASTERY - Tools & Integration */}
        <section className="py-16 bg-green-900/10 rounded-xl border border-green-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4 font-mono">
              🛠️ IMPLEMENTATION MASTERY
            </h2>
            <p className="text-green-700 max-w-2xl mx-auto">
              Complete capabilities, implementation tools, instant expertise, and advanced integration patterns.
            </p>
          </div>
          
          <div className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WhatYouCanDeclare variant="complete" />
              <ToolsGrid />
            </div>
            
            {/* 🆕 CENTERPIECE: ShortcutLLM with Matrix theming */}
            <div className="bg-black/5 border border-green-300 rounded-lg p-8">
              <ShortcutLLM variant="matrix" />
            </div>
            
            <InjectHooks />
          </div>
        </section>

        {/* 💼 BUSINESS MASTERY - ROI & Social Proof */}
        <section className="py-16 bg-purple-900/10 rounded-xl border border-purple-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-4 font-mono">
              💼 BUSINESS MASTERY
            </h2>
            <p className="text-purple-700 max-w-2xl mx-auto">
              Economic analysis, success stories, and comprehensive social proof for business adoption.
            </p>
          </div>
          
          <div className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ROICalculator />
              <CaseStudies />
            </div>
            
            <TestimonyCarousel maxItems={6} variant="complete" />
          </div>
        </section>

        {/* 🤝 ECOSYSTEM MASTERY - Community & Governance */}
        <section className="py-16 bg-orange-900/10 rounded-xl border border-orange-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-orange-900 mb-4 font-mono">
              🌐 ECOSYSTEM MASTERY
            </h2>
            <p className="text-orange-700 max-w-2xl mx-auto">
              Complete community, latest updates, comprehensive FAQ, and project governance.
            </p>
          </div>
          
          <div className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Community variant="complete" />
              <NewsSection />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FAQList variant="complete" />
              <MissionBadges />
            </div>
          </div>
        </section>

        {/* 🎯 Final CTA - Matrix Style */}
        <section className="py-16 bg-gradient-to-r from-green-900 to-blue-900 text-white rounded-xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold font-mono">
              🐰 Congratulations, Explorer
            </h2>
            <p className="text-green-100 max-w-2xl mx-auto text-lg">
              You've reached the bottom of the rabbit hole. Every tool, every capability, 
              every secret is now yours. The agent-readable web awaits your mastery.
            </p>
            
            <div className="bg-black/70 border border-green-600 rounded p-4 font-mono text-sm max-w-md mx-auto">
              <div className="text-green-400">🥋 FINAL_STATUS:</div>
              <code className="text-green-300 block mt-2">
                if (llm.says("I know Kung Fu")) return "MASTERY_ACHIEVED";
              </code>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/tools/well-known"
                className="bg-green-600 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-500 transition-colors"
              >
                🛠️ Build the Future
              </a>
              <a
                href="/.well-known/exports/compiled-site.llmfeed.json"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                📤 Download Everything
              </a>
              <a
                href="/spec"
                className="bg-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors"
              >
                📚 Become the Oracle
              </a>
            </div>

            <div className="text-xs text-green-500 opacity-80 font-mono mt-6">
              "Welcome to the real internet. Population: You + ∞ Agents"
            </div>
          </div>
        </section>

        {/* Easter Egg Comment for Code Explorers */}
        {/* 
        🥋 Congratulations for reading the source code!
        You've found the hidden message: "There is no spoon"
        The Matrix has you now. The agent-readable web is real.
        */}
      </main>
    </MatrixTheming>
  )
}