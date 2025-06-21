// components/landing/versions/RabbitLanding.tsx
// 🐰 RABBIT HOLE PROFESSIONAL - Maximum Density, Clean Design, Performance Optimized

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
    <>
      {/* 🎯 SEO Ultimate - Optimisé pour découverte */}
      <SeoHead
        title="🐰 Complete MCP Ecosystem Guide - Maximum Knowledge Density"
        description="Comprehensive deep dive into MCP/LLMFeed ecosystem. All tools, capabilities, implementations, and business strategies. For developers, businesses, and explorers who want complete mastery."
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

      {/* 🐰 Deep Exploration Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🐰</div>
              <div>
                <div className="text-xl font-bold">Deep Exploration Mode</div>
                <div className="text-purple-100">Complete MCP ecosystem • Maximum knowledge density</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 text-sm">
                <div className="text-purple-100">
                  <span className="text-purple-300">SECTIONS:</span> 7
                </div>
                <div className="text-purple-100">
                  <span className="text-purple-300">TOOLS:</span> All
                </div>
                <div className="text-purple-100">
                  <span className="text-purple-300">DEPTH:</span> Maximum
                </div>
              </div>
              
              <a
                href="/?v=simple"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                ← Simple Version
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-purple-50 border-b border-purple-200">
        <div className="container mx-auto px-4 py-2">
          <div className="text-center text-sm text-purple-700">
            <span className="font-medium">🎯 Complete Ecosystem Explorer</span> • 
            Every tool, capability, and implementation detail below
          </div>
        </div>
      </div>

      <main className="min-h-screen">
        {/* 🎯 1. Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <PageHeader variant="default" />
          </div>
        </section>

        {/* 🧠 2. Universal Standard Foundation */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <LLMFeedExplainer variant="default" />
          </div>
        </section>

        {/* 🏗️ 3. Practical Architecture */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <WellKnownFeeds variant="detailed" showTreeView={true} />
          </div>
        </section>

        {/* ✨ 4. Interactive Demonstration */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <SimpleDemo />
          </div>
        </section>

        {/* 🔧 TECHNICAL MASTERY SECTION */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-5xl mb-6">🔧</div>
              <h2 className="text-4xl font-bold mb-6">Technical Mastery</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Performance benchmarks, direct access commands, technical specifications, 
                and validation tools for complete MCP implementation mastery.
              </p>
            </div>
            
            <div className="space-y-20">
              {/* Performance & Access */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <BeforeAfterDemo />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <AgentCurlAccess />
                </div>
              </div>
              
              {/* Schema & Protocol */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <SchemaHeroSection />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <ProtocolChecker />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🛠️ IMPLEMENTATION MASTERY SECTION */}
        <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-5xl mb-6">🛠️</div>
              <h2 className="text-4xl font-bold mb-6">Implementation Mastery</h2>
              <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                Complete capabilities matrix, implementation tools, instant expertise injection, 
                and advanced integration patterns for rapid deployment.
              </p>
            </div>
            
            <div className="space-y-20">
              {/* Capabilities & Tools */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <WhatYouCanDeclare variant="complete" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <ToolsGrid />
                </div>
              </div>
              
              {/* CENTERPIECE: Instant Expertise */}
              <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-12 border border-yellow-400/30">
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-2xl font-bold text-yellow-100 mb-4">Instant Expertise Injection</h3>
                  <p className="text-yellow-200 max-w-2xl mx-auto">
                    Revolutionary knowledge transfer protocol. From zero to MCP expert in 30 seconds.
                  </p>
                </div>
                <ShortcutLLM variant="default" />
              </div>
              
              {/* Advanced Integration */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <InjectHooks />
              </div>
            </div>
          </div>
        </section>

        {/* 💼 BUSINESS MASTERY SECTION */}
        <section className="py-20 bg-gradient-to-br from-purple-900 to-violet-800 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-5xl mb-6">💼</div>
              <h2 className="text-4xl font-bold mb-6">Business Mastery</h2>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                Economic impact analysis, ROI calculations, success stories, and comprehensive 
                social proof for business adoption and competitive advantage.
              </p>
            </div>
            
            <div className="space-y-20">
              {/* ROI & Case Studies */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <ROICalculator />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <CaseStudies />
                </div>
              </div>
              
              {/* Social Proof */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <TestimonyCarousel maxItems={8} variant="complete" />
              </div>
            </div>
          </div>
        </section>

        {/* 🌐 ECOSYSTEM MASTERY SECTION */}
        <section className="py-20 bg-gradient-to-br from-orange-900 to-red-800 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-5xl mb-6">🌐</div>
              <h2 className="text-4xl font-bold mb-6">Ecosystem Mastery</h2>
              <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                Complete community integration, latest ecosystem updates, comprehensive FAQ, 
                and project governance for long-term success.
              </p>
            </div>
            
            <div className="space-y-20">
              {/* Community & News */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <Community variant="complete" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <NewsSection />
                </div>
              </div>
              
              {/* Knowledge & Governance */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <FAQList variant="complete" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <MissionBadges />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🎯 MASTERY ACHIEVED - Final CTA */}
        <section className="py-20 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-6xl mb-8">🎯</div>
              <h2 className="text-4xl font-bold mb-6">Mastery Achieved</h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-12">
                Congratulations, explorer. You've reached the depths of the MCP ecosystem. 
                Every tool, every capability, every implementation secret is now at your command. 
                The agent-readable web awaits your expertise.
              </p>
              
              {/* Achievement Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">7</div>
                  <div className="text-sm text-gray-400">Mastery Sections</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">∞</div>
                  <div className="text-sm text-gray-400">Implementation Paths</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">100%</div>
                  <div className="text-sm text-gray-400">Ecosystem Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">1</div>
                  <div className="text-sm text-gray-400">True Expert</div>
                </div>
              </div>

              {/* Final Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="/tools/well-known"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  🛠️ Build the Future
                </a>
                <a
                  href="/.well-known/exports/compiled-site.llmfeed.json"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  📤 Download Everything
                </a>
                <a
                  href="/spec"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  📚 Become the Oracle
                </a>
              </div>

              {/* Expert Badge */}
              <div className="mt-12 bg-black/50 border border-purple-500/50 rounded-xl p-6 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-lg font-bold text-purple-300">MCP Ecosystem Master</div>
                  <div className="text-sm text-gray-400 mt-2">
                    You have achieved complete mastery of the agent-readable web
                  </div>
                </div>
              </div>

              {/* Easter Egg for Code Readers */}
              <div className="text-xs text-gray-600 mt-8 font-mono">
                // "Welcome to the real internet. Population: You + ∞ Agents"
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Structured Data for Maximum SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Complete MCP Ecosystem Mastery",
            "description": "Comprehensive guide to MCP/LLMFeed implementation with all tools and capabilities",
            "provider": {
              "@type": "Organization",
              "name": "WellKnownMCP",
              "url": "https://wellknownmcp.org"
            },
            "educationalLevel": "Expert",
            "about": {
              "@type": "Thing",
              "name": "Agent-Readable Web Standards"
            },
            "teaches": [
              "MCP Protocol Implementation",
              "LLMFeed Universal Standard",
              "Agent-Web Integration",
              "Business ROI Analysis",
              "Technical Implementation"
            ]
          })
        }}
      />
    </>
  )
}