'use client';

import { PageTitle } from '@/components/PageTitle';
import SeoHead from '@/components/SeoHead';
import { AgentSiteInspector } from '@/components/AgentSiteInspector';

export default function AgentInsightAnalyzerPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <SeoHead
        title="🔍 Agent Insight Analyzer — mellknownMCP whith llmfeeds vs Traditional Web Comparison"
        description="Discover what AI agents can understand from any website. Compare MCP-enabled sites vs traditional web — see 96.7% cost reduction and 10x performance gains in real-time."
        canonicalUrl="https://wellknownmcp.org/preview"
        ogImage="/og/agent-insight-analyzer.png"
        keywords={[
          "agent insight analyzer", "mcp vs traditional web", "ai website analysis", "agent cost reduction",
          "structured web data", "agent-readable content", "brave search optimization", "llmfeed comparison",
          "mcp benefits demo", "agent performance testing", "web compatibility analyzer", "ai agent tools",
          "claude analysis", "anthropic mcp", "agent discovery", "website intelligence", "agent readiness test"
        ]}
        llmIntent="analyze website agent compatibility and demonstrate MCP value proposition"
        llmTopic="Real-time .well-known/MCP vs traditional web analysis and ROI demonstration"
        llmCapabilities={['analyze', 'compare', 'validate', 'demonstrate', 'benchmark']}
        llmAudience={['developer', 'business', 'agent', 'decision-maker']}
        
      />

      {/* Hero Section avec value prop claire */}
      <div className="text-center mb-12">
        <PageTitle
          title="🔍 Agent Insight Analyzer"
          subtitle="See what AI agents can understand from any website — MCP vs Traditional"
        />
        
        {/* Value proposition marquante */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">96.7%</div>
              <div className="text-sm text-gray-600">Cost Reduction</div>
              <div className="text-xs text-gray-500">vs traditional scraping</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10x</div>
              <div className="text-sm text-gray-600">Faster Performance</div>
              <div className="text-xs text-gray-500">structured vs unstructured</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">99.2%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
              <div className="text-xs text-gray-500">with MCP feeds</div>
            </div>
          </div>
        </div>

        {/* Quick example for immediate value */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
          <div className="text-sm text-gray-600 mb-2">🚀 <strong>Quick Test:</strong> Try these example URLs</div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs hover:bg-blue-200 transition-colors">
              wellknownmcp.org
            </button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-200 transition-colors">
              github.com
            </button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-200 transition-colors">
              stripe.com
            </button>
          </div>
        </div>
      </div>

      {/* Tool principal */}
      <AgentSiteInspector />

      {/* Section éducative pour le SEO et la compréhension */}
      <div className="mt-16 space-y-12">
        
        {/* What this tool shows */}
        <section className="bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 What This Tool Reveals</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-4">✅ With MCP Feeds</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span><strong>Instant Understanding:</strong> Agents immediately know site purpose, capabilities, and how to interact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span><strong>Structured Actions:</strong> Clear API endpoints, authentication, and expected responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span><strong>Trust Verification:</strong> Cryptographic signatures ensure content authenticity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span><strong>Cost Efficiency:</strong> No expensive scraping, parsing, or interpretation needed</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-4">⚠️ Traditional Web</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span><strong>Guesswork Required:</strong> Agents must interpret HTML, guess purpose and capabilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span><strong>Expensive Processing:</strong> Heavy LLM usage for content understanding and API discovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span><strong>Unreliable Results:</strong> No guarantees of accuracy or current information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  <span><strong>Security Risks:</strong> No verification of data integrity or source authenticity</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔬 Perfect For Testing</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Sites</h3>
              <p className="text-sm text-gray-600">Compare how agents understand your company vs competitors</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="font-semibold text-gray-900 mb-2">E-commerce</h3>
              <p className="text-sm text-gray-600">Test product discovery, pricing, and checkout processes</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🔧</div>
              <h3 className="font-semibold text-gray-900 mb-2">APIs & Tools</h3>
              <p className="text-sm text-gray-600">Validate that agents can discover and use your services</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Make Your Site Agent-Ready?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            After seeing the difference, implement MCP feeds on your site. Our tools make it easy to get started in minutes.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/downloads" 
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              📥 Download Core Feeds
            </a>
            <a 
              href="/tools/prompt" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              ✍️ Build Custom Feeds
            </a>
            <a 
              href="/spec" 
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              📚 Read Documentation
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}