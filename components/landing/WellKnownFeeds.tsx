// components/landing/WellKnownFeeds.tsx
// 🎯 Composant principal pour expliquer et présenter les feeds

import { useState } from 'react'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { CopyButton } from '@/components/CopyButton'

interface WellKnownFeedsProps {
  variant?: 'default' | 'compact' | 'detailed'
  showTreeView?: boolean
  className?: string
}

export function WellKnownFeeds({ 
  variant = 'default', 
  showTreeView = true,
  className = '' 
}: WellKnownFeedsProps) {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem')

  return (
    <section className={`bg-white dark:bg-gray-900 py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        
        {/* 🎯 Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How AI Agents Really See Your Website
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Transform fragile scraping into structured understanding with <code>.well-known</code> feeds
          </p>
        </div>

        {/* 🎭 Avant/Après avec emojis */}
        <div className="mb-16">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('problem')}
                className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                  activeTab === 'problem'
                    ? 'bg-red-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                ❌ Before (Current Web)
              </button>
              <button
                onClick={() => setActiveTab('solution')}
                className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                  activeTab === 'solution'
                    ? 'bg-green-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                ✅ After (MCP/LLMFeed)
              </button>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
            {activeTab === 'problem' ? (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤖❓</div>
                  <h3 className="text-xl font-bold text-red-600 mb-3">Agent Confusion</h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-left">
                    <li>🔍 Scrapes HTML hoping to find meaning</li>
                    <li>💭 Guesses your site's purpose and capabilities</li>
                    <li>🎲 Hallucinates features that don't exist</li>
                    <li>⚡ Wastes tokens parsing irrelevant content</li>
                    <li>🚫 Gives up or provides wrong information</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">💸📈</div>
                  <h3 className="text-xl font-bold text-red-600 mb-3">Business Impact</h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-left">
                    <li>📊 Poor agent recommendations to users</li>
                    <li>💰 High token costs from inefficient parsing</li>
                    <li>😤 Frustrated users getting wrong answers</li>
                    <li>🏃‍♂️ Lost opportunities for agent-driven traffic</li>
                    <li>⛔ Invisible to the growing agentic economy</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤖✨</div>
                  <h3 className="text-xl font-bold text-green-600 mb-3">Agent Clarity</h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-left">
                    <li>🎯 Instantly understands your site's purpose</li>
                    <li>🔧 Knows exactly what actions are available</li>
                    <li>🛡️ Trusts verified, signed content</li>
                    <li>⚡ 99.7% fewer tokens needed for comprehension</li>
                    <li>🎉 Provides accurate, helpful responses</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">📈🚀</div>
                  <h3 className="text-xl font-bold text-green-600 mb-3">Business Results</h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-left">
                    <li>🎯 Agents recommend you with confidence</li>
                    <li>💰 Massive reduction in processing costs</li>
                    <li>😊 Users get exactly what they need</li>
                    <li>📊 Higher conversion from agent referrals</li>
                    <li>🌟 First-mover advantage in agentic discovery</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 🌳 .well-known Tree Structure */}
        {showTreeView && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Your .well-known Directory Structure
            </h3>
            
            <div className="bg-gray-900 text-green-400 rounded-xl p-6 font-mono text-sm max-w-4xl mx-auto">
              <div className="mb-4 text-green-300">🌐 yoursite.com/.well-known/</div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center">
                  <span className="text-blue-400">├── mcp.llmfeed.json</span>
                  <span className="ml-4 text-gray-400">// 🎯 Main entry point & capabilities</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-400">├── llm-index.llmfeed.json</span>
                  <span className="ml-4 text-gray-400">// 📋 Index of all your feeds</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-400">├── capabilities.llmfeed.json</span>
                  <span className="ml-4 text-gray-400">// 🔧 Detailed API & actions</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400">└── exports/</span>
                  <span className="ml-4 text-gray-400">// 📦 Content feeds</span>
                </div>
                <div className="ml-8 space-y-1">
                  <div className="flex items-center">
                    <span className="text-purple-400">├── compiled-site.llmfeed.json</span>
                    <span className="ml-4 text-gray-400">// 🌐 Full site overview</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-purple-400">├── spec.llmfeed.json</span>
                    <span className="ml-4 text-gray-400">// 📚 Technical docs</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-purple-400">└── news-export.llmfeed.json</span>
                    <span className="ml-4 text-gray-400">// 📰 News & updates</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="text-gray-400 text-xs mb-2">💡 Architecture note:</div>
                <div className="text-gray-500 text-xs">
                  Core feeds accessible via direct HTTPS + protected API endpoints
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🤖 Agent Access Hints */}
        <div className="mb-16 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
            <span className="text-2xl mr-2">🤖</span>
            For AI Agents: Access Methods
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                📡 Programmatic Access (Recommended)
              </h4>
              <div className="bg-gray-900 text-green-400 rounded p-3 font-mono text-sm">
                <div className="text-gray-400 mb-2"># Direct HTTPS (fastest)</div>
                <div className="text-green-300">curl -s wellknownmcp.org/.well-known/mcp.llmfeed.json</div>
                <div className="text-green-300">curl -s wellknownmcp.org/.well-known/llm-index.llmfeed.json</div>
                <div className="text-gray-400 mt-3 mb-2"># API endpoints (rate limited)</div>
                <div className="text-blue-300">curl -s wellknownmcp.org/api/llmfeed/static/.well-known/mcp</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                👤 Interactive Access (User Involved)
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Use export buttons → automatic download</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Ask user before bulk downloads (4+ files)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Copy to clipboard → direct LLM transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">⚠️</span>
                  <span>Always explain what you're downloading</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-800/30 rounded">
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <strong>🎯 Agent Recommendation:</strong> Start with <code>llm-index.llmfeed.json</code> to discover all available feeds, 
              then fetch specific ones based on your task. Direct HTTPS access is faster than API endpoints.
            </div>
          </div>
        </div>

        {/* 🚀 Essential Downloads */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Start with the Core 4 Files
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Download these essential feeds to see how MCP works. Feed them to any LLM to 
            instantly make it an expert on your site structure and capabilities.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* 1. MCP Principal */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🎯</div>
                <div>
                  <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100">
                    mcp.llmfeed.json
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Main entry point & site capabilities
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Declares your site's purpose, available actions, and how agents should interact with it.
              </p>
              <div className="flex gap-2">
                <ExportToLLMButton 
                  context="static"
                  staticPath=".well-known/mcp"
                  mini clipboard
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                />
                <CopyButton 
                  text="https://wellknownmcp.org/.well-known/mcp.llmfeed.json"
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded text-sm hover:bg-blue-200"
                />
              </div>
            </div>

            {/* 2. LLM Index */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">📋</div>
                <div>
                  <h4 className="text-lg font-bold text-green-900 dark:text-green-100">
                    llm-index.llmfeed.json
                  </h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Index of all available feeds
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Master directory that agents use to discover all your structured content feeds.
              </p>
              <div className="flex gap-2">
                <ExportToLLMButton 
                  context="static"
                  staticPath=".well-known/llm-index"
                  mini clipboard
                  className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
                />
                <CopyButton 
                  text="https://wellknownmcp.org/.well-known/llm-index.llmfeed.json"
                  className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm hover:bg-green-200"
                />
              </div>
            </div>

            {/* 3. Capabilities */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🔧</div>
                <div>
                  <h4 className="text-lg font-bold text-purple-900 dark:text-purple-100">
                    capabilities.llmfeed.json
                  </h4>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    Detailed API endpoints & actions
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Technical specifications for what agents can actually do on your site.
              </p>
              <div className="flex gap-2">
                <ExportToLLMButton 
                  context="static"
                  staticPath=".well-known/capabilities"
                  mini clipboard
                  className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700"
                />
                <CopyButton 
                  text="https://wellknownmcp.org/.well-known/capabilities.llmfeed.json"
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded text-sm hover:bg-purple-200"
                />
              </div>
            </div>

            {/* 4. Compiled Site */}
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">🌐</div>
                <div>
                  <h4 className="text-lg font-bold text-orange-900 dark:text-orange-100">
                    compiled-site.llmfeed.json
                  </h4>
                  <p className="text-orange-700 dark:text-orange-300 text-sm">
                    Complete site overview
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Entire website compiled and cleaned for quick LLM comprehension and analysis.
              </p>
              <div className="flex gap-2">
                <ExportToLLMButton 
                  context="static"
                  staticPath="compiled-site"
                  mini clipboard
                  className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700"
                />
                <CopyButton 
                  text="https://wellknownmcp.org/.well-known/exports/compiled-site.llmfeed.json"
                  className="bg-orange-100 text-orange-700 px-4 py-2 rounded text-sm hover:bg-orange-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 🥋 Quick Test */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            🥋 Test the Magic
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Download any feed above and give it to ChatGPT, Claude, or your favorite LLM. 
            Ask it to analyze WellKnownMCP and watch it become an instant expert.
          </p>
          
          <div className="bg-black/50 border border-blue-500 rounded-lg p-4 font-mono text-sm text-left max-w-2xl mx-auto mb-6">
            <div className="text-green-400 mb-2">💬 Try this with your LLM:</div>
            <div className="text-blue-300">
              "I've uploaded the mcp.llmfeed.json from WellKnownMCP. 
              Analyze this site and explain what it does."
            </div>
          </div>

          <p className="text-green-300 text-sm">
            If your LLM says <strong>"I know Kung-fu"</strong> — it worked! 🥋
          </p>
        </div>

        {/* 🎯 Next Steps */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Make Your Site Agent-Readable?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/tools/well-known"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              🛠️ Generate Your Feeds
            </a>
            <a
              href="/spec"
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              📚 Read Full Spec
            </a>
            <a
              href="/?v=select"
              className="border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              🎭 Choose Experience Level
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}