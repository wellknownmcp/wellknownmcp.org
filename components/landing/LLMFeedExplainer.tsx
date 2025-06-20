// components/landing/LLMFeedExplainer.tsx
// 🎯 Explication du standard LLMFeed universel - Version Static SEO

import { CopyButton } from '@/components/CopyButton'

interface LLMFeedExplainerProps {
  variant?: 'default' | 'compact'
  className?: string
}

export function LLMFeedExplainer({ 
  variant = 'default',
  className = '' 
}: LLMFeedExplainerProps) {

  // Exemples JSON statiques - tous visibles pour SEO
  const jsonExamples = {
    minimal: `{
  // 🚨 REQUIRED: These 2 fields are enough for compatibility
  "feed_type": "export",
  "metadata": {
    "title": "My Website Content",
    "origin": "https://mysite.com"
  }
  
  // ✅ That's it! Your feed is valid and readable by all agents
}`,

    rich: `{
  // 🚨 REQUIRED: Universal standard
  "feed_type": "mcp", 
  "metadata": {
    "title": "My Agent-Ready Site",
    "origin": "https://mysite.com",
    "description": "E-commerce with AI optimization"
  },
  
  // ✅ RECOMMENDED: Adds richness and agent guidance
  "data": {
    "capabilities": ["search", "buy", "track"],
    "categories": ["electronics", "books"]
  },
  "trust": {
    "signed_blocks": ["metadata", "data"],
    "certifier": "llmca.org"
  },
  "prompts": [{
    "intent": "help_customers_buy",
    "keywords": ["purchase", "order", "buy"]
  }],
  
  // 🤖 MCP SERVER: Auto-discovery for MCP clients
  "mcp_server": {
    "name": "my-site-server",
    "version": "1.0.0",
    "tools": [
      {"name": "search_products", "description": "Search our catalog"},
      {"name": "get_order_status", "description": "Track orders"}
    ]
  }
}`,

    custom: `{
  // 🚨 REQUIRED: Always the same 2 fields
  "feed_type": "custom_analytics",
  "metadata": {
    "title": "Sales Dashboard Feed", 
    "origin": "https://dashboard.company.com"
  },
  
  // 🎨 FREE: Your creativity, your needs
  "business_metrics": {
    "monthly_revenue": "$50k",
    "customer_satisfaction": 4.8
  },
  "api_endpoints": [
    {"name": "sales_data", "url": "/api/sales"}
  ],
  "custom_ai_instructions": {
    "tone": "professional",
    "focus": "actionable insights"
  },
  "integration_hooks": ["zapier", "slack", "teams"],
  
  // 🤖 MCP COMPATIBILITY: Insert standard MCP server config
  "mcp_server": {
    "transport": {"type": "stdio"},
    "capabilities": {"tools": {}, "resources": {}}
  }
}`
  }

  const feedTypes = [
    { type: 'mcp', desc: 'Site capabilities & structure', icon: '🏠' },
    { type: 'export', desc: 'Content packages', icon: '📦' },
    { type: 'prompt', desc: 'AI interaction guidance', icon: '💬' },
    { type: 'session', desc: 'Conversation history', icon: '🔄' },
    { type: 'capabilities', desc: 'API endpoints & tools', icon: '🔧' },
    { type: 'manifesto', desc: 'Values & principles', icon: '📜' },
    { type: 'analytics', desc: 'Metrics & insights', icon: '📊' },
    { type: 'custom', desc: 'Your own invention', icon: '🎨' }
  ]

  const placementOptions = [
    { path: '/.well-known/feed.llmfeed.json', desc: 'Standard discovery' },
    { path: '/api/llmfeed/dynamic', desc: 'API endpoints' },
    { path: '/exports/content.llmfeed.json', desc: 'Static exports' },
    { path: 'https://cdn.example.com/feed.json', desc: 'CDN delivery' },
    { path: '/docs/api.llmfeed.json', desc: 'Documentation feeds' },
    { path: '/anywhere/you/want.json', desc: 'Total flexibility' }
  ]

  return (
    <section className={`max-w-6xl mx-auto py-16 px-4 ${className}`}>
      
      {/* 🎯 Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <span className="text-lg">📄</span>
          The Universal Standard
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          LLMFeed: One JSON Format for Everything
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
          Just 2 required fields. Infinite possibilities. If everyone agrees on this, 
          everything becomes standardizable and compatible with all AI agents.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
          <p className="text-blue-800 font-medium text-sm">
            💡 The entire MCP ecosystem is built on this simple foundation
          </p>
        </div>
      </div>

      {/* 🧩 Three Examples Side by Side - All Visible for SEO */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          🎯 Three Levels of Implementation
        </h3>
        
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Minimal Example */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-green-800">✨ Minimal (2 fields)</h4>
              <CopyButton 
                text={jsonExamples.minimal}
                variant="minimal"
                size="sm"
              />
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-xs text-gray-100 font-mono leading-relaxed overflow-x-auto">
                <code>{jsonExamples.minimal}</code>
              </pre>
            </div>
            <div className="mt-4 text-sm text-green-700">
              <strong>Perfect for:</strong> Simple sites, quick setup, basic agent compatibility
            </div>
          </div>

          {/* Rich Example */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-blue-800">🚀 Rich (recommended)</h4>
              <CopyButton 
                text={jsonExamples.rich}
                variant="minimal"
                size="sm"
              />
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-xs text-gray-100 font-mono leading-relaxed overflow-x-auto">
                <code>{jsonExamples.rich}</code>
              </pre>
            </div>
            <div className="mt-4 text-sm text-blue-700">
              <strong>Perfect for:</strong> Production sites, e-commerce, full agent integration
            </div>
          </div>

          {/* Custom Example */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-purple-800">🎨 Custom (unlimited)</h4>
              <CopyButton 
                text={jsonExamples.custom}
                variant="minimal"
                size="sm"
              />
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-xs text-gray-100 font-mono leading-relaxed overflow-x-auto">
                <code>{jsonExamples.custom}</code>
              </pre>
            </div>
            <div className="mt-4 text-sm text-purple-700">
              <strong>Perfect for:</strong> Custom integrations, unique business needs, innovation
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 The Magic Formula - Explanation */}
      <div className="mb-16 grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎯 The Magic Formula
          </h3>
          <div className="space-y-4">
            <div className="border border-red-200 bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">🚨 Required (2 fields)</h4>
              <div className="space-y-2 text-sm">
                <div><code className="bg-red-100 px-2 py-1 rounded">feed_type</code> - What kind of content</div>
                <div><code className="bg-red-100 px-2 py-1 rounded">metadata</code> - Basic info (title, origin)</div>
              </div>
            </div>

            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">✅ Recommended</h4>
              <div className="text-sm text-green-700">
                Add <code>data</code>, <code>trust</code>, <code>prompts</code> for richer agent interactions
              </div>
            </div>

            <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">🎨 Free Zone</h4>
              <div className="text-sm text-purple-700">
                Invent your own fields. Your creativity, your rules. Still compatible!
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🌐 Universal Compatibility
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <ul className="text-sm text-blue-700 space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Works with any AI agent (Claude, ChatGPT, Gemini, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Place anywhere on your infrastructure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Extend with custom fields as needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Future-proof and backwards compatible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Native JSON parsing in all programming languages</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🎨 Feed Types Gallery */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Infinite Feed Types, Same Format
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {feedTypes.map((feed) => (
            <div key={feed.type} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">{feed.icon}</div>
              <div className="font-mono text-sm text-blue-600 mb-1">{feed.type}</div>
              <div className="text-xs text-gray-600">{feed.desc}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-6 text-sm">
          Same JSON structure, different purposes. Create your own feed types!
        </p>
      </div>

      {/* 🤖 MCP Server Auto-Discovery */}
      <div className="mb-16 bg-blue-50 border border-blue-200 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-center text-blue-900 mb-6">
          🤖 MCP Server Auto-Discovery
        </h3>
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-800 text-center mb-6">
            Insert standard MCP server instructions directly in your <code className="bg-blue-100 px-2 py-1 rounded">/.well-known/mcp.llmfeed.json</code> 
            for automatic discovery by MCP clients like Claude Desktop.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-blue-800 mb-3">🔍 How It Works</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• MCP clients scan <code>/.well-known/mcp.llmfeed.json</code></li>
                <li>• Find <code>mcp_server</code> configuration block</li>
                <li>• Auto-connect to your server capabilities</li>
                <li>• No manual setup required for users</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-800 mb-3">⚡ Benefits</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• <strong>Zero-config discovery</strong> - Just works</li>
                <li>• <strong>Universal compatibility</strong> - Any MCP client</li>
                <li>• <strong>Single file setup</strong> - Web + MCP in one</li>
                <li>• <strong>Standard compliant</strong> - Follows MCP spec</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-xs text-blue-600 font-mono text-center">
              💡 Your LLMFeed becomes both web-discoverable AND MCP-server discoverable
            </p>
          </div>
        </div>
      </div>

      {/* 📍 Placement Flexibility */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Place Anywhere, Works Everywhere
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {placementOptions.map((option, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <code className="text-sm font-mono text-purple-600 block mb-2">
                {option.path}
              </code>
              <div className="text-sm text-gray-600">{option.desc}</div>
            </div>
          ))}
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <p className="text-yellow-800 text-sm text-center">
            <strong>Not just .well-known!</strong> LLMFeed works anywhere: APIs, CDNs, static files, databases, anywhere JSON can live.
          </p>
        </div>
      </div>

      {/* 🚀 Problems Solved */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Problems Solved Elegantly
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Before */}
          <div>
            <h4 className="text-lg font-semibold text-red-600 mb-4">❌ Before LLMFeed</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>AI agents scrape HTML and guess meaning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Every site has different data formats</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>High token costs for content parsing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Unreliable results, hallucinations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Complex integration for each site</span>
              </li>
            </ul>
          </div>

          {/* After */}
          <div>
            <h4 className="text-lg font-semibold text-green-600 mb-4">✅ With LLMFeed</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Agents read structured JSON instantly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Universal format, works everywhere</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>99.7% fewer tokens needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Accurate, verified information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>One integration, works with all agents</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto border border-gray-200">
            <p className="text-gray-800 font-medium mb-2">
              🎯 The Vision
            </p>
            <p className="text-gray-600 text-sm italic">
              "If everyone agrees on these 2 fields, everything becomes standardizable. 
              Compatible with everything, extensible to infinity."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}