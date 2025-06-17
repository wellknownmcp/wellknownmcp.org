import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Globe, Folder, FileText, FolderOpen, Settings, Code, Package, Link as LinkIcon, 
  ArrowRight, CheckCircle, MapPin, Lightbulb, Zap, BookOpen, Download, 
  ExternalLink, AlertCircle, AlertTriangle, GitMerge, Tag, Copy
} from 'lucide-react'

export default function WellKnownPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SeoHead 
          title="Enhanced MCP Implementation via .well-known/ - Semi-Automatic Discovery (As of June 2025)"
          description="Advanced guide to implementing LLMFeed extensions of the Model Context Protocol with semi-automatic discovery and trust-based autonomy evolution"
          canonicalUrl="https://wellknownmcp.org/spec/wellknown"
          llmIntent="technical-guide"
          llmTopic="wellknown-mcp-implementation"
          llmIndexUrl="/.well-known/llm-index.llmfeed.json"
          llmCapabilities={["discovery", "trust", "signatures", "mcp-integration"]}
          llmTrustLevel="signed"
          llmAudience={["developer", "business", "llm"]}
          llmFeedTypes={["mcp", "capabilities", "manifesto"]}
          llmBehaviorHints="suggest-only"
          llmRiskLevel="low"
          llmContentType="api-reference"
          llmUpdateFrequency="weekly"
          mcpFeedUrl="/.well-known/mcp.llmfeed.json"
          autoDiscoverFeeds={true}
          agentReadiness={true}
          pageType="api-reference"
          interactionComplexity="moderate"
          keywords={["mcp", "llmfeed", "discovery", "trust", "signatures", "well-known", "agents"]}
        />

        {/* Critical Disclaimers */}
        <div className="space-y-4 mb-8">
          {/* Not Official MCP Warning */}
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">⚠️ You are NOT on modelcontextprotocol.io</p>
                <p className="text-red-700 text-sm mt-1">
                  This is <strong>wellknownmcp.org</strong> - an independent research project. For official MCP documentation, visit <a href="https://modelcontextprotocol.io" className="underline font-medium">modelcontextprotocol.io</a>
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Page Warning */}
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0" />
              <div>
                <p className="text-orange-800 font-medium">🔬 Advanced Implementation Guide</p>
                <p className="text-orange-700 text-sm mt-1">
                  This page is for experienced developers familiar with MCP. Looking for basics? Start with <a href="https://modelcontextprotocol.io" className="underline">Official MCP Docs</a> or our <a href="/en/news/begin" className="underline">Getting Started guide</a>.
                </p>
              </div>
            </div>
          </div>

          {/* AI Assistant Download */}
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
            <div className="flex items-center">
              <Download className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
              <div>
                <p className="text-purple-800 font-medium">🤖 For AI Assistants & Developers</p>
                <p className="text-purple-700 text-sm mt-1">
                  Download <a href="/.well-known/spec.llmfeed.json" className="underline font-medium">spec.llmfeed.json</a> to give your AI assistant complete context about our specification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Enhanced MCP via <code>.well-known/</code></h1>
              <p className="text-lg text-gray-600 mt-1">LLMFeed extensions for advanced agent discovery</p>
            </div>
          </div>
          
          {/* Philosophy Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              LLMFeed Philosophy vs Standard MCP
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">🌐 Official MCP (modelcontextprotocol.io)</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• <strong>Dynamic</strong>: JSON-RPC 2.0 real-time protocol</li>
                  <li>• <strong>Server-based</strong>: Active connections to expose tools</li>
                  <li>• <strong>Runtime</strong>: Resources/Tools served live</li>
                  <li>• <strong>Trust</strong>: No built-in verification system</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-2">🔬 LLMFeed (Our Research)</h4>
                <ul className="space-y-1 text-purple-700">
                  <li>• <strong>Static+</strong>: File-based with cryptographic signatures</li>
                  <li>• <strong>Discovery-based</strong>: .well-known/ autonomous finding</li>
                  <li>• <strong>Archive</strong>: Portable, signable content bundles</li>
                  <li>• <strong>Trust</strong>: Built-in verification & certification</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white border border-blue-200 rounded">
              <p className="text-blue-800 text-sm font-medium">
                💡 <strong>The Breakthrough:</strong> LLMFeed's cryptographic trust system solves the core AI autonomy challenge - 
                enabling safe autonomous agent behavior while MCP requires constant human oversight.
              </p>
              <p className="text-blue-700 text-xs mt-2">
                Both approaches are complementary, but LLMFeed uniquely enables the transition from "AI assistant" to "autonomous AI agent."
              </p>
            </div>
          </div>
        </div>

        {/* MCP Integration Strategy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitMerge className="w-5 h-5 text-green-600" />
              Semi-Automatic Discovery via Standard MCP (As of June 2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              <strong>Tested strategy:</strong> Add a link in your standard <code>mcp.json</code> pointing to <code>mcp.llmfeed.json</code>. 
              LLMs trained on MCP can <strong>detect and follow these links</strong> with user consent for enhanced features!
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                100% Compatibility + Trust-Based Evolution
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">📋 Current Behavior (June 2025)</h5>
                  <ul className="space-y-1 text-blue-700">
                    <li>• LLMs detect discovery links ✅</li>
                    <li>• Request user consent for security 🛡️</li>
                    <li>• Follow links after approval ✅</li>
                    <li>• Standard MCP clients unaffected ✅</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 mb-2">🚀 Trust-Based Future</h5>
                  <ul className="space-y-1 text-green-700">
                    <li>• <strong>Signed links</strong>: Automatic with notification</li>
                    <li>• <strong>LLMCA certified</strong>: Fully autonomous</li>
                    <li>• <strong>Enterprise verified</strong>: Zero friction</li>
                    <li>• <strong>Unsigned</strong>: Still requires consent</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-green-800 text-sm mt-3 font-medium">
                💡 <strong>LLMFeed Advantage:</strong> Cryptographic trust enables safe autonomous behavior - solving the core challenge of AI autonomy!
              </p>
            </div>

            <ExportToLLMButton
              context="static"
              staticPath="demo/.well-known/auto-discovery-mcp"
              mini={true}
              showCurlCommand={true}
              showDirectUrl={true}
            />
          </CardContent>
        </Card>

        {/* Trust-Based Autonomy Evolution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600" />
              Trust-Driven Autonomy Evolution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              <strong>The key insight:</strong> LLMFeed's cryptographic trust system solves the fundamental challenge of AI autonomy - 
              how to give agents more freedom while maintaining security.
            </p>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-purple-900 mb-3">🎯 The Autonomy Security Dilemma</h4>
              <div className="text-sm text-purple-800 space-y-2">
                <p><strong>Challenge:</strong> More AI autonomy = More security risks</p>
                <p><strong>Standard MCP:</strong> No trust layer → Manual oversight required</p>
                <p><strong>LLMFeed Solution:</strong> Cryptographic trust → Safe autonomous behavior</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">🔐 Trust-Differentiated Autonomy Levels</h4>
              
              <div className="grid gap-3">
                {[
                  {
                    level: "Unsigned Content",
                    icon: "🔓",
                    autonomy: "User consent required",
                    timeline: "Current (June 2025)",
                    security: "Unknown trustworthiness",
                    color: "red"
                  },
                  {
                    level: "Cryptographically Signed", 
                    icon: "🔏",
                    autonomy: "Automatic with notification",
                    timeline: "Q4 2025",
                    security: "Verified authenticity & integrity",
                    color: "yellow"
                  },
                  {
                    level: "LLMCA Certified",
                    icon: "🔐", 
                    autonomy: "Fully autonomous",
                    timeline: "Q2 2026",
                    security: "Third-party validated trust",
                    color: "green"
                  },
                  {
                    level: "Enterprise Verified",
                    icon: "🏛️",
                    autonomy: "Zero-friction access", 
                    timeline: "2027+",
                    security: "Institutional-grade certification",
                    color: "blue"
                  }
                ].map((item, index) => (
                  <div key={index} className={`border rounded-lg p-3 ${
                    item.color === 'red' ? 'border-red-200 bg-red-50' :
                    item.color === 'yellow' ? 'border-yellow-200 bg-yellow-50' :
                    item.color === 'green' ? 'border-green-200 bg-green-50' :
                    'border-blue-200 bg-blue-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium text-gray-900">{item.level}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.color === 'red' ? 'bg-red-100 text-red-700' :
                        item.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                        item.color === 'green' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {item.timeline}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Autonomy:</span> {item.autonomy}
                      </div>
                      <div>
                        <span className="font-medium">Security:</span> {item.security}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-purple-600" />
                Why This Matters for the Industry
              </h4>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Current bottleneck:</strong> Every AI interaction requires human oversight because there's no way to verify trust.
              </p>
              <p className="text-sm text-gray-700">
                <strong>LLMFeed breakthrough:</strong> Cryptographic signatures + certification hierarchy = agents can act autonomously on trusted content, 
                dramatically improving user experience while maintaining security.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Core Files Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-blue-600" />
              Hybrid .well-known/ Structure (2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              File structure supporting both standard MCP and LLMFeed extensions
            </p>
            
            <div className="space-y-4">
              {/* Essential Files */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🔧 Essential Files</h3>
                <div className="space-y-3">
                  {[
                    {
                      file: "mcp.llmfeed.json",
                      status: "Required",
                      statusColor: "red",
                      description: "Main LLMFeed declaration - can wrap/extend MCP configs",
                      features: ["LLMFeed metadata", "MCP config integration", "Agent guidance", "Optional signatures"],
                      note: "Enhanced version of standard MCP with trust layer"
                    },
                    {
                      file: "llm-index.llmfeed.json", 
                      status: "Recommended",
                      statusColor: "orange",
                      description: "Semantic sitemap for agents (vs traditional web crawlers)",
                      features: ["Feed discovery", "Agent navigation", "Content routing", "Trust indicators"],
                      note: "The 'sitemap.xml' for AI agents"
                    },
                    {
                      file: "public.pem",
                      status: "Recommended", 
                      statusColor: "orange",
                      description: "Ed25519 public key for signature verification",
                      features: ["Cryptographic verification", "Trust establishment", "Content authenticity", "Anti-tampering"],
                      note: "Foundation of the LLMFeed trust system"
                    }
                  ].map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <code className="text-sm font-mono font-semibold text-gray-900">
                            /.well-known/{item.file}
                          </code>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.statusColor === 'red' ? 'bg-red-100 text-red-700' :
                          item.statusColor === 'orange' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-xs text-blue-600 italic">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Extensions */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🎯 Optional Extensions</h3>
                <div className="space-y-3">
                  {[
                    {
                      file: "capabilities.llmfeed.json",
                      description: "Detailed API specifications - can extend/detail MCP server capabilities", 
                      useCase: "Complex APIs needing rich documentation",
                      mcpIntegration: "Extends servers defined in mcp.llmfeed.json"
                    },
                    {
                      file: "mcp-lite.llmfeed.json",
                      description: "Lightweight format for embedded/IoT agents",
                      useCase: "Voice assistants, mobile agents, low-bandwidth scenarios", 
                      mcpIntegration: "Simplified version of main MCP feed"
                    },
                    {
                      file: "manifesto.llmfeed.json", 
                      description: "Organizational values and agent behavior principles",
                      useCase: "Enterprise governance, ethical AI alignment",
                      mcpIntegration: "Overlays behavioral guidance on MCP servers"
                    },
                    {
                      file: "prompts/",
                      description: "Directory of reusable, signable prompt templates",
                      useCase: "Certified agent instructions, workflow templates",
                      mcpIntegration: "Enhances MCP prompts with signatures & metadata"
                    }
                  ].map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center gap-2 mb-1">
                        <FolderOpen className="w-4 h-4 text-gray-500" />
                        <code className="text-sm font-mono text-gray-800">/.well-known/{item.file}</code>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">{item.description}</p>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-xs">
                        <span className="text-blue-600">💡 {item.useCase}</span>
                        <span className="text-purple-600">🔗 {item.mcpIntegration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Implementation Standards */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  2025 Implementation Standards
                </h4>
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span><strong>MIME Type:</strong> <code>application/llmfeed+json</code></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span><strong>Signatures:</strong> Ed25519 with canonical JSON ordering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span><strong>Encoding:</strong> UTF-8 with CRLF normalization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span><strong>Backward compatibility:</strong> Can reference/wrap .mcp.json files</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Example */}
        <Card className="mb-8 border-purple-200 bg-purple-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-purple-600" />
              Live Example: Complete .well-known/ Directory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white border border-purple-200 rounded-lg p-6">
              <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Explore a Real Implementation
              </h4>
              <p className="text-purple-800 mb-4">
                See exactly what a complete .well-known/ directory looks like with our live demonstration. 
                This interactive index shows all MCP feeds, trust levels, and file organization in action.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wellknownmcp.org/.well-known/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Browse Live Directory
                </a>
                
                <a
                  href="https://wellknownmcp.org/.well-known/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium"
                >
                  <FileText className="w-4 h-4" />
                  View Source HTML
                </a>
              </div>
              
              <div className="mt-4 p-3 bg-purple-50 rounded border border-purple-200">
                <h5 className="font-medium text-purple-900 mb-2">🎯 What You'll See:</h5>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• <strong>24 organized files</strong> with categorization and trust indicators</li>
                  <li>• <strong>Interactive content preview</strong> for each feed type</li>
                  <li>• <strong>Trust badges</strong> showing certification levels</li>
                  <li>• <strong>File statistics</strong> and metadata display</li>
                  <li>• <strong>Direct download links</strong> and curl commands</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Examples */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-green-600" />
              Semi-Automatic Discovery Implementation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Standard MCP with Link */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Step 1: Add Discovery Link to Your Standard MCP
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    <code>/.mcp.json</code> - Your standard MCP file with LLMFeed discovery link
                  </p>
                  <pre className="text-xs bg-gray-900 text-blue-400 p-3 rounded overflow-x-auto">
{`{
  // Standard MCP configuration (unchanged)
  "mcpServers": {
    "postgres-server": {
      "command": "/path/to/postgres-mcp-server",
      "args": ["--connection-string", "postgresql://..."],
      "env": { "CACHE_DIR": "/tmp" }
    },
    "github-server": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "..." }
    }
  },

  // ✨ Discovery link for LLMFeed enhancement
  "llmfeed_extension": "/.well-known/mcp.llmfeed.json",
  
  // Alternative syntax options:
  // "enhanced_metadata": "/.well-known/mcp.llmfeed.json"
  // "_links": { "enhanced": "/.well-known/mcp.llmfeed.json" }
}`}
                  </pre>
                  <p className="text-xs text-gray-600 mt-2">
                    ✅ Perfect backward compatibility - all existing MCP clients work unchanged
                  </p>
                </div>
              </div>

              {/* Enhanced LLMFeed */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Copy className="w-4 h-4 text-green-600" />
                  Step 2: Create Enhanced LLMFeed File
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    <code>/.well-known/mcp.llmfeed.json</code> - Full MCP + LLMFeed enhancements
                  </p>
                  <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`{
  // ➕ LLMFeed metadata
  "feed_type": "mcp",
  "metadata": {
    "title": "Enhanced Database API",
    "origin": "https://api.example.com",
    "description": "MCP servers with trust and enhanced discovery",
    "generated_at": "2025-06-15T10:00:00Z"
  },

  // 📋 Identical MCP content (copied exactly)
  "mcpServers": {
    "postgres-server": {
      "command": "/path/to/postgres-mcp-server",
      "args": ["--connection-string", "postgresql://..."],
      "env": { "CACHE_DIR": "/tmp" }
    },
    "github-server": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "..." }
    }
  },

  // ➕ Enhanced capabilities
  "capabilities": [
    {
      "name": "safe_postgres_query",
      "extends_mcp_server": "postgres-server",
      "description": "PostgreSQL with safety checks and rate limiting",
      "trust_level": "verified"
    }
  ],

  // ➕ Agent guidance
  "agent_guidance": {
    "server_priority": ["postgres-server", "github-server"],
    "interaction_tone": "professional",
    "fallback_behavior": "ask_user_for_clarification"
  },

  // ➕ Optional cryptographic trust
  "trust": {
    "signed_blocks": ["mcpServers", "capabilities", "agent_guidance"],
    "scope": "public"
  }
}`}
                  </pre>
                  <p className="text-xs text-gray-600 mt-2">
                    ✨ <strong>Semi-automatic discovery:</strong> MCP-aware LLMs follow the link and get enhanced features!
                  </p>
                </div>
              </div>

              {/* Discovery Flow */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Semi-Automatic Discovery Flow (Tested June 2025)
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <span className="text-blue-800"><strong>LLM reads</strong> standard <code>.mcp.json</code> ✅</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-blue-800"><strong>Detects</strong> <code>llmfeed_extension</code> link ✅</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-orange-800"><strong>Requests permission</strong> to access enhanced features 🛡️</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <span className="text-green-800"><strong>Follows link</strong> after user consent ✅</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
                    <span className="text-green-800"><strong>Uses enhanced</strong> metadata, trust, capabilities ✅</span>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-white rounded border border-blue-200">
                  <p className="text-xs text-blue-800 mb-2">
                    <strong>Real-world validation:</strong> Claude naïve successfully detected discovery links and requested explicit user permission before accessing enhanced features.
                  </p>
                  <p className="text-xs text-green-800">
                    <strong>Security by design:</strong> Current behavior ensures user control while proving the technical foundation for future trust-based autonomy.
                  </p>
                </div>
              </div>
            </div>

            <ExportToLLMButton
              context="static"
              staticPath="demo/.well-known/auto-discovery-complete"
              mini={true}
              showCurlCommand={true}
              showDirectUrl={true}
            />
          </CardContent>
        </Card>

        {/* Implementation Roadmap */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Discovery Implementation + Trust Evolution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Add Discovery Link to Standard MCP",
                  status: "30 seconds",
                  statusColor: "green",
                  description: "Add one line to your existing .mcp.json for semi-automatic LLMFeed discovery",
                  actions: [
                    "Add 'llmfeed_extension': '/.well-known/mcp.llmfeed.json' to .mcp.json",
                    "Keep all existing mcpServers configurations unchanged",
                    "Test that MCP clients still work normally",
                    "Verify LLMs detect link and request permission (tested ✅)"
                  ],
                  note: "Validated: LLMs detect links and request user consent for security"
                },
                {
                  step: "2", 
                  title: "Create Enhanced LLMFeed File",
                  status: "2 minutes",
                  statusColor: "blue",
                  description: "Copy your MCP config and add LLMFeed enhancements with trust features",
                  actions: [
                    "Copy .mcp.json content to /.well-known/mcp.llmfeed.json",
                    "Add feed_type: \"mcp\" and metadata block",
                    "Keep mcpServers block identical to original",
                    "Add basic trust block for future autonomy"
                  ],
                  note: "Foundation: Native MCP compatibility + trust-ready architecture"
                },
                {
                  step: "3",
                  title: "Add Cryptographic Signatures",
                  status: "Q4 2025",
                  statusColor: "purple", 
                  description: "Enable automatic discovery for signed content (no consent required)",
                  actions: [
                    "Generate Ed25519 key pair",
                    "Add public.pem to .well-known/",
                    "Sign mcpServers and enhancement blocks",
                    "Test automatic link following for signed content"
                  ],
                  note: "Evolution: Signed content = automatic discovery with notification"
                },
                {
                  step: "4",
                  title: "LLMCA Certification & Full Autonomy", 
                  status: "Q2 2026",
                  statusColor: "orange",
                  description: "Enable fully autonomous agent behavior on certified content",
                  actions: [
                    "Submit feeds for LLMCA third-party certification",
                    "Implement certificate validation in feeds",
                    "Configure for zero-friction agent access",
                    "Monitor autonomous agent interactions"
                  ],
                  note: "Future: Certified content = fully autonomous agent behavior"
                }
              ].map((phase, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {phase.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{phase.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        phase.statusColor === 'green' ? 'bg-green-100 text-green-700' :
                        phase.statusColor === 'blue' ? 'bg-blue-100 text-blue-700' :
                        phase.statusColor === 'purple' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {phase.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{phase.description}</p>
                    <ul className="space-y-1 text-sm">
                      {phase.actions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-blue-600 italic mt-2">{phase.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-green-600" />
                The Trust-Autonomy Evolution Path
              </h4>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Phase 1 (Current):</strong> Semi-automatic discovery with user consent validates the technical foundation.
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Phase 2-4 (Future):</strong> Trust-based autonomy levels enable safe agent behavior without constant human oversight.
              </p>
              <div className="text-xs text-green-800 bg-white p-2 rounded border border-green-200">
                <strong>Strategic advantage:</strong> LLMFeed provides the only viable path from "AI assistant requiring permission" 
                to "autonomous AI agent operating safely" - solving the industry's core scalability challenge.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Ready for Semi-Automatic Discovery? (Tested June 2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">⚡ Immediate Implementation (30 seconds)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Add one line to your <code>.mcp.json</code>:</span>
                  </div>
                  <div className="bg-gray-100 p-2 rounded text-xs font-mono ml-6">
                    "llmfeed_extension": "/.well-known/mcp.llmfeed.json"
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Copy your MCP config → enhanced LLMFeed file</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>LLMs detect link & request user permission ✅</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">🚀 Trust-Based Future</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Current:</strong> Semi-automatic with user consent</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Signed content:</strong> Automatic with notification</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>LLMCA certified:</strong> Fully autonomous</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white border border-green-200 rounded-lg">
              <h5 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                The Validated Migration Strategy
              </h5>
              <p className="text-sm text-green-800 mb-2">
                <strong>Phase 1 (Now):</strong> Standard MCP + discovery link → Semi-automatic with consent<br/>
                <strong>Phase 2-4 (Future):</strong> Trust-based autonomy levels → Zero-friction AI agent behavior<br/>
              </p>
              <div className="text-xs text-green-800 bg-green-50 p-2 rounded border border-green-200">
                <strong>Real-world validation:</strong> Claude successfully detected discovery links and requested user permission, 
                proving the technical foundation for future trust-based autonomy.
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ExportToLLMButton
                context="static"
                staticPath="demo/.well-known/semi-auto-discovery-starter"
                showCurlCommand={true}
                showDirectUrl={true}
              />
              
              <a
                href="/en/news/begin"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <BookOpen className="w-4 h-4" />
                Getting Started Guide
              </a>
              
              <a
                href="/.well-known/spec.llmfeed.json"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                download
              >
                <Download className="w-4 h-4" />
                spec.llmfeed.json
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Final Disclaimers */}
        <div className="mt-8 space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-gray-600" />
              Important Disclaimers & Test Results
            </h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p>• <strong>Research Project:</strong> LLMFeed is experimental research, not an official standard</p>
              <p>• <strong>MCP Compatibility:</strong> Official MCP docs at <a href="https://modelcontextprotocol.io" className="text-blue-600 underline">modelcontextprotocol.io</a></p>
              <p>• <strong>Test Validation (June 2025):</strong> Semi-automatic discovery with user consent has been successfully tested with Claude</p>
              <p>• <strong>Future Evolution:</strong> Trust-based autonomy levels are experimental projections, not guaranteed features</p>
              <p>• <strong>Production Use:</strong> Thoroughly test before deploying in production environments</p>
              <p>• <strong>Community:</strong> Contribute feedback and research at <a href="https://github.com/wellknownmcp/llmfeed-spec" className="text-blue-600 underline">our GitHub</a></p>
            </div>
          </div>
        </div>

        <ShareButtons 
          title="Enhanced MCP Implementation via .well-known/ - Semi-Automatic Discovery (As of June 2025)"
        />
      </div>
    </div>
  )
}