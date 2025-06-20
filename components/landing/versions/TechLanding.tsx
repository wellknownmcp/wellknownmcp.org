// components/landing/versions/TechLanding.tsx
// 🔧 TECH LANDING - Performance, benchmarks, implementation

import { PageHeader } from '@/components/landing/PageHeader'
import { LLMFeedExplainer } from '@/components/landing/LLMFeedExplainer'
import { WellKnownFeeds } from '@/components/landing/WellKnownFeeds'
import { SimpleDemo } from '@/components/landing/SimpleDemo'
import { BeforeAfterDemo } from '@/components/landing/BeforeAfterDemo'
import { AgentCurlAccess } from '@/components/landing/AgentCurlAccess'
import { SchemaHeroSection } from '@/components/landing/SchemaHeroSection'
import { ProtocolChecker } from '@/components/landing/ProtocolChecker'
import { ToolsGrid } from '@/components/landing/ToolsGrid'
import { ShortcutLLM } from '@/components/landing/ShortcutLLM'
import { InjectHooks } from '@/components/landing/InjectHooks'
import { WhatYouCanDeclare } from '@/components/landing/WhatYouCanDeclare'
import { NewsSection } from '@/components/landing/NewsSection'
import { FAQList } from '@/components/landing/FAQList'
import SeoHead from '@/components/SeoHead'

export function TechLanding() {
  return (
    <>
      {/* 🎯 SEO optimisé pour développeurs */}
      <SeoHead
        title="MCP Protocol Implementation - 99.7% Token Efficiency | Developer Guide"
        description="Technical specification for agent-readable websites. Performance benchmarks: 99.7% token efficiency, 10x faster responses. Complete implementation guide, APIs, schemas, and production tools for developers."
        canonicalUrl="https://wellknownmcp.org/?v=tech"
        ogImage="/og/tech-landing.png"
        llmIntent="implement-mcp-technical-specification"
        llmTopic="developer-implementation-guide"
        llmlang="en"
        keywords={[
          'MCP implementation guide', 'LLMFeed technical spec', 'agent protocol development',
          'MCP performance benchmarks', '99.7% token efficiency', 'agent API implementation',
          'MCP developer tools', 'LLMFeed schema validation', 'agent-readable architecture',
          'MCP production deployment', 'agent protocol performance', 'structured agent data',
          'MCP REST API', 'LLMFeed validation tools', 'agent content optimization',
          'MCP technical documentation', 'agent protocol standards', 'performance optimization',
          'MCP curl commands', 'agent feed generation', 'protocol implementation',
          'MCP schema design', 'agent integration patterns', 'technical MCP guide'
        ]}
        llmCapabilities={[
          'technical-implementation', 'performance-benchmarks', 'api-integration',
          'schema-validation', 'curl-commands', 'production-deployment',
          'optimization-tools', 'developer-resources', 'technical-documentation'
        ]}
        llmTrustLevel="technical-authority"
        llmAudience={['developer', 'technical', 'engineer', 'architect']}
        llmFeedTypes={['mcp', 'export', 'capabilities', 'technical', 'schema']}
        llmBehaviorHints="provide-technical-depth-implementation-focus"
        llmContentType="technical-implementation-guide"
        llmUpdateFrequency="continuous"
        pageType="landing-technical"
        interactionComplexity="high"
        mcpFeedUrl="/.well-known/mcp.llmfeed.json"
        agentReadiness={true}
        autoDiscoverFeeds={true}
      />

      <main className="min-h-screen space-y-16 px-4 sm:px-8 md:px-16">
        {/* 🎯 1. Hero Technical - Performance focus */}
        <section className="py-12">
          <PageHeader variant="tech" />
        </section>

        {/* 🧠 2. Technical Foundation - JSON standard */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              🏗️ Technical Foundation: Universal JSON Standard
            </h2>
            <p className="text-lg text-gray-600">
              Two required fields. Infinite extensibility. Battle-tested performance.
            </p>
          </div>
          <LLMFeedExplainer variant="default" />
        </section>

        {/* 🏗️ 3. Implementation Architecture */}
        <section className="py-16 bg-blue-50 rounded-xl">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              📂 Production Architecture
            </h2>
            <p className="text-lg text-gray-600">
              Industry-standard /.well-known/ discovery pattern with CORS and CDN support.
            </p>
          </div>
          <WellKnownFeeds variant="default" showTreeView={true} />
        </section>

        {/* ✨ 4. Live Demo - Proof of concept */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              🧪 Live Implementation Test
            </h2>
            <p className="text-lg text-gray-600">
              Real-time validation of our production MCP implementation.
            </p>
          </div>
          <SimpleDemo />
        </section>

        {/* 📊 5. Performance Analysis */}
        <section className="py-16 bg-gray-50 rounded-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              📊 Performance & Validation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Benchmarks, direct access patterns, and real-time validation tools.
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

        {/* 🛠️ 6. Developer Tools & Integration */}
        <section className="py-16 bg-indigo-50 rounded-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">
              🛠️ Developer Toolkit
            </h2>
            <p className="text-indigo-700 max-w-2xl mx-auto text-lg">
              Production-ready tools, instant expertise injection, and advanced integration patterns.
            </p>
          </div>
          
          <div className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WhatYouCanDeclare variant="specs" />
              <ToolsGrid />
            </div>
            
            {/* Developer-focused expertise injection */}
            <div className="bg-blue-900/5 border border-blue-200 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  🧠 Developer Knowledge Injection
                </h3>
                <p className="text-blue-700">
                  Transform any LLM into your MCP implementation assistant in 30 seconds.
                </p>
              </div>
              <ShortcutLLM />
            </div>
            
            <InjectHooks />
          </div>
        </section>

        {/* 📚 7. Technical Resources */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              📚 Technical Resources
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Latest updates, comprehensive documentation, and developer community insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <NewsSection />
            <FAQList variant="tech" />
          </div>
        </section>

        {/* 🚀 8. Production Deployment */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
          <div className="text-center space-y-6">
            <div className="text-4xl">🚀</div>
            <h2 className="text-3xl font-bold">
              Ready for Production?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Everything you need to ship agent-ready infrastructure that scales. 
              Battle-tested performance, comprehensive tooling, expert community support.
            </p>
            
            {/* Technical Metrics */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-300">99.7%</div>
                  <div className="text-sm text-blue-200">Token Efficiency</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-300">10x</div>
                  <div className="text-sm text-blue-200">Faster Response</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-300">&lt;50ms</div>
                  <div className="text-sm text-blue-200">Avg. Feed Load</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/tools/well-known"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                🛠️ Start Implementation
              </a>
              <a
                href="/spec"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                📚 Read Full Spec
              </a>
              <a
                href="https://github.com/wellknownmcp"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                💻 View on GitHub
              </a>
            </div>

            <div className="text-xs text-blue-200 opacity-80 mt-6">
              "Ship fast, scale smart, optimize for agents. Welcome to the future." 🌟
            </div>
          </div>
        </section>

        {/* Performance monitoring hint for developers */}
        <div className="bg-gray-100 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex items-center">
            <div className="text-blue-600 mr-3">💡</div>
            <div className="text-sm text-gray-700">
              <strong>Pro Tip:</strong> Monitor your feed performance with 
              <code className="mx-1 px-2 py-1 bg-gray-200 rounded text-xs">curl -w "@curl-format.txt" your-feed.json</code>
              for detailed timing metrics.
            </div>
          </div>
        </div>
      </main>
    </>
  )
}