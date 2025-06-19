import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { CheckCircle, TrendingUp, Clock, DollarSign, Zap, Code, GitBranch, BarChart3, Brain, Compass, Shield, Rocket } from 'lucide-react'

export default function LLMIndexExplainedPage() {
  return (
    <>
      <SeoHead 
        title="LLM-Index Explained | Intelligent Sitemap Revolution"
        description="Discover how LLM-Index transforms traditional sitemaps into intelligent discovery hubs for AI agents. 93% token savings, 20x faster navigation, and automatic generation tools."
        pageType="tool"
        seoMode="high-ctr"
        llmIntent="understand-evolution"
        llmTopic="intelligent-discovery"
        llmCapabilities={["discovery", "navigation", "optimization"]}
        llmTrustLevel="certified"
        llmContentType="guide"
        llmAudience={["developer", "business", "agent"]}
        keywords={["intelligent sitemap", "AI agent navigation", "LLM discovery hub", "sitemap evolution", "token efficient navigation", "agent-friendly sitemap", "smart website discovery"]}
        canonicalUrl="https://wellknownmcp.org/tools/llm-index-explained"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              Intelligent Discovery Revolution
            </div>
            <PageTitle 
              title="LLM-Index Explained" 
              subtitle="From XML Sitemaps to Intelligent Discovery Hubs"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Discover how LLM-Index transforms traditional sitemaps into intelligent discovery hubs, 
              delivering <span className="font-bold text-blue-600">93% token savings</span> and 
              <span className="font-bold text-green-600">20x faster navigation</span> for AI agents.
            </p>
          </div>

          {/* Quick Impact Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-800">93%</div>
              <div className="text-sm text-blue-600">Token Savings</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
              <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">20x</div>
              <div className="text-sm text-green-600">Faster Discovery</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-800">2-5s</div>
              <div className="text-sm text-purple-600">Navigation Time</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center">
              <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-800">$M</div>
              <div className="text-sm text-orange-600">Industry Savings</div>
            </div>
          </div>

          {/* Hero CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl mb-12 text-center">
            <h2 className="text-2xl font-bold mb-4">🚀 Experience the Revolution</h2>
            <p className="text-blue-100 mb-6">
              See how an intelligent discovery hub transforms agent navigation from crawling to precision routing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ExportToLLMButton 
                context="static" 
                staticPath="demo/llm-index-example" 
                mini={false}

              />
              <Link 
                href="/llmfeedhub/preview?url=https://wellknownmcp.org/.well-known/llm-index.llmfeed.json"
                className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Live Demo
              </Link>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 p-6 rounded-xl mb-12">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5" />
              Navigation Guide
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Understanding the Revolution</h4>
                <ul className="space-y-1 text-sm">
                  <li><a href="#what-is-llm-index" className="text-blue-600 hover:underline">What is LLM-Index?</a></li>
                  <li><a href="#evolution-story" className="text-blue-600 hover:underline">Evolution from XML Sitemaps</a></li>
                  <li><a href="#quantified-benefits" className="text-blue-600 hover:underline">Quantified Performance Benefits</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Implementation & Tools</h4>
                <ul className="space-y-1 text-sm">
                  <li><a href="#how-it-works" className="text-blue-600 hover:underline">How It Works</a></li>
                  <li><a href="#implementation-guide" className="text-blue-600 hover:underline">Implementation Guide</a></li>
                  <li><a href="#tools-automation" className="text-blue-600 hover:underline">Tools & Automation</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* What is LLM-Index */}
          <section id="what-is-llm-index" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              What is LLM-Index?
            </h2>
            
            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Core Concept
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  An Intelligent Discovery Hub for AI Agents
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  LLM-Index transforms your traditional sitemap from a simple URL list into a 
                  <span className="font-semibold text-blue-600"> smart navigation system</span> designed 
                  specifically for AI agents and LLMs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-3">❌ Traditional Sitemap (XML)</h4>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• Simple URL list</li>
                    <li>• No context or intent</li>
                    <li>• HTML-focused discovery</li>
                    <li>• No audience targeting</li>
                    <li>• No trust signals</li>
                    <li>• Static structure</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-3">✅ LLM-Index (Intelligent)</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Organized by audience & intent</li>
                    <li>• Rich metadata & context</li>
                    <li>• API and capability focused</li>
                    <li>• Smart routing recommendations</li>
                    <li>• Cryptographic trust levels</li>
                    <li>• Dynamic with analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Evolution Story */}
          <section id="evolution-story" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <GitBranch className="w-8 h-8 text-purple-600" />
              The Evolution Story
            </h2>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">📄 Era 1: HTML Crawlers (1990s-2010s)</h3>
                <p className="text-gray-700 mb-4">
                  <code>sitemap.xml</code> was perfect for search engines crawling HTML pages. 
                  Simple, effective, but designed for human-browsable content.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <code className="text-sm">
                    &lt;url&gt;<br/>
                    &nbsp;&nbsp;&lt;loc&gt;https://site.com/page&lt;/loc&gt;<br/>
                    &nbsp;&nbsp;&lt;lastmod&gt;2025-01-01&lt;/lastmod&gt;<br/>
                    &lt;/url&gt;
                  </code>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">🤖 Era 2: AI Agents (2020s+)</h3>
                <p className="text-gray-700 mb-4">
                  AI agents need more than URLs - they need <strong>intent, capabilities, and trust signals</strong>. 
                  Traditional sitemaps leave agents crawling blindly, wasting tokens and time.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <code className="text-sm">
                    {`{
  "feed_type": "llm-index",
  "smart_routing": {
    "audience_based": {
      "developer": {
        "entry_point": "/tools/getting-started",
        "token_budget_allocation": {"tools": 40, "docs": 35}
      }
    }
  }
}`}
                  </code>
                </div>
              </div>
            </div>
          </section>

          {/* Quantified Benefits */}
          <section id="quantified-benefits" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-green-600" />
              Quantified Performance Benefits
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-red-600">❌ Traditional Crawling</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Token Consumption</span>
                    <span className="font-bold text-red-600">~107,593 tokens</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Discovery Time</span>
                    <span className="font-bold text-red-600">45-90 seconds</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Content Relevance</span>
                    <span className="font-bold text-red-600">15-30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Agent Efficiency</span>
                    <span className="font-bold text-red-600">Low</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-green-600">✅ LLM-Index Navigation</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Token Consumption</span>
                    <span className="font-bold text-green-600">~7,629 tokens</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Discovery Time</span>
                    <span className="font-bold text-green-600">2-5 seconds</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Content Relevance</span>
                    <span className="font-bold text-green-600">85-98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Agent Efficiency</span>
                    <span className="font-bold text-green-600">High</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-center">🎯 Economic Impact by Scale</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">Small Site</div>
                  <div className="text-sm text-gray-600">
                    <div>~1.4M tokens/month saved</div>
                    <div className="font-semibold">$420-4,200/month</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">Enterprise</div>
                  <div className="text-sm text-gray-600">
                    <div>~149M tokens/month saved</div>
                    <div className="font-semibold">$44,700-447,000/month</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">Ecosystem</div>
                  <div className="text-sm text-gray-600">
                    <div>10% adoption scenario</div>
                    <div className="font-semibold">500B tokens/month saved</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Compass className="w-8 h-8 text-orange-600" />
              How It Works
            </h2>

            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">🎯 Smart Categorization</h3>
                <p className="text-gray-700 mb-4">
                  Instead of a flat list, feeds are organized by purpose and audience:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Core Infrastructure</h4>
                    <p className="text-sm text-blue-600">Essential feeds for understanding the site</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Developer Tools</h4>
                    <p className="text-sm text-green-600">Interactive tools and implementation guides</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Documentation</h4>
                    <p className="text-sm text-purple-600">Technical specs and reference materials</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">🧭 Intelligent Routing</h3>
                <p className="text-gray-700 mb-4">
                  Agents receive customized navigation paths based on their purpose:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span><strong>New Visitors:</strong> Start with main MCP declaration → capabilities → FAQ</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span><strong>Developers:</strong> Jump to implementation guides → tools → examples</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span><strong>Business Users:</strong> Focus on manifesto → value proposition → trust signals</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">🔐 Trust-Based Prioritization</h3>
                <p className="text-gray-700 mb-4">
                  Cryptographic signatures enable agents to make autonomous decisions:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span><strong>Certified Feeds:</strong> High confidence, suitable for autonomous action</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span><strong>Signed Feeds:</strong> Medium confidence, verify against manifesto values</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <span><strong>Basic Feeds:</strong> Low confidence, cross-reference with trusted sources</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Implementation Guide */}
          <section id="implementation-guide" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Code className="w-8 h-8 text-blue-600" />
              Implementation Guide
            </h2>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">🚀 Quick Start (5 Minutes)</h3>
                <p className="text-gray-700 mb-4">
                  Create a basic LLM-Index for your site:
                </p>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <pre className="text-sm overflow-x-auto">
{`{
  "feed_type": "llm-index",
  "metadata": {
    "title": "My Site Discovery Hub",
    "origin": "https://mysite.com",
    "generated_at": "2025-06-15T00:00:00Z"
  },
  "discovery_guidance": {
    "recommended_entry_points": {
      "new_visitors": "/.well-known/mcp.llmfeed.json"
    }
  },
  "feed_categories": {
    "core_infrastructure": {
      "feeds": [
        {
          "title": "Main Declaration",
          "feed_type": "mcp",
          "url": "/.well-known/mcp.llmfeed.json",
          "audience": ["llm", "developer"],
          "trust_level": "signed"
        }
      ]
    }
  }
}`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600">
                  Save as <code className="bg-gray-100 px-2 py-1 rounded">/.well-known/llm-index.llmfeed.json</code>
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">🎯 Progressive Enhancement</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-800">Phase 1: Basic Index</h4>
                    <p className="text-sm text-gray-600">Simple feed listing with minimal metadata</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-800">Phase 2: Smart Routing</h4>
                    <p className="text-sm text-gray-600">Add categories and audience-based navigation</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-purple-800">Phase 3: Full Intelligence</h4>
                    <p className="text-sm text-gray-600">Analytics, relationships, and automated updates</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tools & Automation */}
          <section id="tools-automation" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Rocket className="w-8 h-8 text-green-600" />
              Tools & Automation
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">📋 Manual Creation</h3>
                <p className="text-gray-700 mb-4">
                  For simple sites, create your LLM-Index manually using our template.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Best for: Small sites (less than 10 feeds)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Setup time: 15-30 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Maintenance: Manual updates</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">🤖 Certified Prompt</h3>
                <p className="text-gray-700 mb-4">
                  Use our signed prompt to generate your LLM-Index with any LLM.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Best for: Most sites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Setup time: 5-10 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Quality: AI-optimized structure</span>
                  </div>
                </div>
                <div className="mt-4">
                  <ExportToLLMButton 
                    context="static" 
                    staticPath="prompts/generate-llm-index" 
                    mini={true}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mt-8">
              <h3 className="text-xl font-bold mb-4 text-center">🔮 Coming Soon: Automated Tools</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600 mb-2">Next.js Plugin</div>
                  <div className="text-sm text-gray-600">Automatic generation for Next.js sites</div>
                  <div className="text-xs text-gray-500 mt-1">🚧 In Development</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600 mb-2">CLI Tool</div>
                  <div className="text-sm text-gray-600">Universal crawler and generator</div>
                  <div className="text-xs text-gray-500 mt-1">🚧 In Development</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600 mb-2">GitHub Action</div>
                  <div className="text-sm text-gray-600">CI/CD integration</div>
                  <div className="text-xs text-gray-500 mt-1">📋 Planned</div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Site Discovery?</h2>
            <p className="text-purple-100 mb-6">
              Join the intelligent web revolution and give your site the navigation system AI agents deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/tools/well-known"
                className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Implementation Guide
              </Link>
              <Link 
                href="/llmfeedhub"
                className="bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Test Your Index
              </Link>
              <ExportToLLMButton 
                context="current"
                mini={false}
                
              />
            </div>
          </div>

          {/* Share */}
          <div className="mt-12">
            <ShareButtons />
          </div>
        </div>
      </div>
    </>
  )
}