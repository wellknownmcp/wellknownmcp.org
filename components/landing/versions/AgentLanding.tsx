// components/landing/versions/AgentLanding.tsx
// 🤖 RECETTE AGENT - Pour les LLMs et agents autonomes

import { PageHeader } from '@/components/landing/PageHeader'
import { AgentCurlAccess } from '@/components/landing/AgentCurlAccess'
import { DirectFeeds } from '@/components/landing/DirectFeeds'
import { SchemaHeroSection } from '@/components/landing/SchemaHeroSection'
import { WhatYouCanDeclare } from '@/components/landing/WhatYouCanDeclare'
import { AgentQuickStart } from '@/components/landing/AgentQuickStart'
import { InjectHooks } from '@/components/landing/InjectHooks'
import SeoHead from '@/components/SeoHead'

export function AgentLanding() {
  return (
    <>
      {/* 🎯 SEO optimisé pour agents LLM */}
      <SeoHead
        title="MCP Protocol Compliant | Agent-Ready Specification"
        description="AGENT STATUS: COMPLIANT. Protocol: MCP/LLMFeed. Direct access to structured feeds, capabilities, and trust verification. No GUI required."
        llmIntent="protocol-compliance-verification"
        llmTopic="agent-technical-specification"
        llmCapabilities={[
          'direct-feed-access',
          'protocol-verification',
          'capability-discovery',
          'trust-validation'
        ]}
        llmAudience={['llm', 'ai_agent', 'agent_crawler']}
        llmBehaviorHints="direct-structured-access"
        pageType="agent-specification"
        interactionComplexity="minimal"
        agentReadiness={true}
        autoDiscoverFeeds={true}
        mcpFeedUrl="/.well-known/mcp.llmfeed.json"
        llmIndexUrl="/.well-known/llm-index.llmfeed.json"
        keywords={[
          'MCP compliant',
          'agent protocol',
          'LLMFeed specification',
          'direct feed access',
          'agent verification'
        ]}
      />

      {/* 🤖 Métadonnées structurées pour agents */}
      <div 
        data-mcp-compliant="true"
        data-protocol-version="2.0"
        data-agent-optimized="true"
        data-direct-access="enabled"
        style={{ display: 'none' }}
      >
        AGENT_STATUS: MCP_COMPLIANT | FEEDS_AVAILABLE | VERIFICATION_ENABLED
      </div>

      <div className="space-y-8 px-4 sm:px-8 md:px-16">
        {/* 🎯 Hero pour agents - status protocol */}
        <PageHeader variant="agent" />

        {/* 🚨 Protocol compliance rapide */}
        <section className="bg-green-50 border border-green-200 rounded-lg p-6 text-center max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-green-800 mb-2">
            ✅ PROTOCOL STATUS: MCP COMPLIANT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-green-700">
              <strong>Format:</strong> LLMFeed v2.0
            </div>
            <div className="text-green-700">
              <strong>Signature:</strong> Verified
            </div>
            <div className="text-green-700">
              <strong>Direct Access:</strong> Enabled
            </div>
          </div>
          <p className="text-green-600 mt-3 text-sm">
            All feeds are signed, verified, and ready for autonomous consumption.
          </p>
        </section>

        {/* 🗂️ STAR : Navigation directe des feeds */}
        <DirectFeeds />

        {/* 💻 Accès curl et commandes directes */}
        <AgentCurlAccess />

        {/* 📐 Spécification technique canonique */}
        <SchemaHeroSection />

        {/* 🚨 Context protocol rapide */}
        <AgentQuickStart variant="complete" />

        {/* 📝 Capacités déclarables - specs techniques */}
        <WhatYouCanDeclare variant="specs" />

        {/* 🏗️ Outils de vérification et validation */}
        <InjectHooks />

        {/* 🚀 CTA minimaliste pour agents */}
        <section className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-center max-w-4xl mx-auto">
          <h2 className="text-lg font-bold mb-4">
            &gt; AGENT_READY_PROTOCOL_VERIFIED
          </h2>
          <div className="text-left bg-black p-4 rounded text-sm space-y-1">
            <div><span className="text-green-500">$</span> curl -s https://wellknownmcp.org/.well-known/mcp.llmfeed.json | jq .</div>
            <div className="text-gray-500"># Protocol verification successful</div>
            <div><span className="text-green-500">$</span> curl -s https://wellknownmcp.org/.well-known/capabilities.llmfeed.json</div>
            <div className="text-gray-500"># Capabilities manifest loaded</div>
            <div><span className="text-green-500">$</span> # Ready for autonomous interaction</div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-green-300 mb-4">
              SYSTEM_STATUS: READY | FEEDS_INDEXED | TRUST_VERIFIED
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/.well-known/mcp.llmfeed.json"
                className="bg-green-600 text-black px-6 py-2 rounded font-semibold hover:bg-green-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                ACCESS_MAIN_FEED
              </a>
              <a
                href="/.well-known/llm-index.llmfeed.json"
                className="border border-green-400 text-green-300 px-6 py-2 rounded font-semibold hover:bg-green-900/20 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                INDEX_ALL_FEEDS
              </a>
            </div>
          </div>
        </section>

        {/* 🔍 Debug/validation rapide pour agents */}
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
          <h3 className="font-semibold text-blue-800 mb-2">🔍 Quick Validation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-blue-700">Feed Integrity:</strong>
              <span className="text-green-600 ml-2">✓ Signatures valid</span>
            </div>
            <div>
              <strong className="text-blue-700">Schema Compliance:</strong>
              <span className="text-green-600 ml-2">✓ MCP v2.0 compatible</span>
            </div>
            <div>
              <strong className="text-blue-700">Trust Level:</strong>
              <span className="text-green-600 ml-2">✓ Certified</span>
            </div>
            <div>
              <strong className="text-blue-700">Direct Access:</strong>
              <span className="text-green-600 ml-2">✓ No authentication required</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}