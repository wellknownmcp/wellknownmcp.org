'use client'

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
          title="Enhanced MCP Implementation via .well-known/ - LLMFeed Spec"
          description="Advanced guide to implementing LLMFeed extensions of the Model Context Protocol through .well-known/ directory structure"
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
                  Download <a href="/.well-known/exports/spec.llmfeed.json" className="underline font-medium">spec.llmfeed.json</a> to give your AI assistant complete context about our specification.
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
                  <li>• <strong>Config</strong>: .mcp.json for server setup</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-2">🔬 LLMFeed (Our Research)</h4>
                <ul className="space-y-1 text-purple-700">
                  <li>• <strong>Static+</strong>: File-based with cryptographic signatures</li>
                  <li>• <strong>Discovery-based</strong>: .well-known/ autonomous finding</li>
                  <li>• <strong>Archive</strong>: Portable, signable content bundles</li>
                  <li>• <strong>Content</strong>: .llmfeed.json with rich metadata</li>
                </ul>
              </div>
            </div>
            <p className="text-blue-800 text-sm mt-4 font-medium">
              💡 <strong>Both approaches are complementary!</strong> LLMFeed can wrap/extend MCP configurations while adding trust, discovery, and portability layers.
            </p>
          </div>
        </div>

        {/* MCP Integration Strategy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitMerge className="w-5 h-5 text-green-600" />
              Automatic LLMFeed Discovery via Standard MCP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              <strong>Genius strategy:</strong> Add a link in your standard <code>mcp.json</code> pointing to <code>mcp.llmfeed.json</code>. 
              All LLMs trained on MCP will <strong>automatically discover</strong> your enhanced LLMFeed file!
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                100% Compatibility Strategy
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">📋 Standard MCP File</h5>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Keep your <code>.mcp.json</code> unchanged</li>
                    <li>• Add discovery link to LLMFeed</li>
                    <li>• 100% backward compatibility</li>
                    <li>• All MCP clients work normally</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 mb-2">➕ Automatic Discovery</h5>
                  <ul className="space-y-1 text-green-700">
                    <li>• MCP-trained LLMs find the link</li>
                    <li>• Follow to enhanced LLMFeed version</li>
                    <li>• Get rich metadata + trust features</li>
                    <li>• Progressive enhancement for free!</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-green-800 text-sm mt-3 font-medium">
                💡 <strong>Result:</strong> Perfect migration path - standard MCP compatibility + automatic LLMFeed discovery!
              </p>
            </div>

            <ExportToLLMButton
              context="static"
              staticPath="demo/.well-known/auto-discovery-mcp"
              mini={true}
              
            />
          </CardContent>
        </Card>

        {/* Core Files Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-blue-600" />
              Hybrid .well-known/ Structure (2025)
            </CardTitle>
            <CardContent className="p-0">
              <p className="text-gray-600 mb-4">
                File structure supporting both standard MCP and LLMFeed extensions
              </p>
            </CardContent>
          </CardHeader>
          <CardContent>
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

        {/* Integration Examples */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-green-600" />
              Automatic Discovery Implementation
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
                    ✨ <strong>Automatic discovery:</strong> MCP-aware LLMs follow the link and get enhanced features!
                  </p>
                </div>
              </div>

              {/* Discovery Flow */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Automatic Discovery Flow
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <span className="text-blue-800"><strong>LLM reads</strong> standard <code>.mcp.json</code></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-blue-800"><strong>Discovers</strong> <code>llmfeed_extension</code> link</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-green-800"><strong>Follows link</strong> to enhanced LLMFeed file</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <span className="text-green-800"><strong>Uses enhanced</strong> metadata, trust, capabilities</span>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-white rounded border border-blue-200">
                  <p className="text-xs text-blue-800">
                    <strong>100% Compatibility:</strong> Standard MCP clients ignore the link and work normally. 
                    Enhanced LLM agents automatically discover and use the rich LLMFeed version!
                  </p>
                </div>
              </div>
            </div>

            <ExportToLLMButton
              context="static"
              staticPath="demo/.well-known/auto-discovery-complete"
              mini={true}
              showCurlCommand={true}
                />
          </CardContent>
        </Card>

        {/* Implementation Roadmap */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Automatic Discovery Implementation
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
                  description: "Add one line to your existing .mcp.json for automatic LLMFeed discovery",
                  actions: [
                    "Add 'llmfeed_extension': '/.well-known/mcp.llmfeed.json' to .mcp.json",
                    "Keep all existing mcpServers configurations unchanged",
                    "Test that MCP clients still work normally",
                    "Verify link syntax is valid JSON"
                  ],
                  note: "One line addition = automatic discovery for enhanced LLMs!"
                },
                {
                  step: "2", 
                  title: "Create Enhanced LLMFeed File",
                  status: "2 minutes",
                  statusColor: "blue",
                  description: "Copy your MCP config and add LLMFeed enhancements",
                  actions: [
                    "Copy .mcp.json content to /.well-known/mcp.llmfeed.json",
                    "Add feed_type: \"mcp\" and metadata block",
                    "Keep mcpServers block identical to original",
                    "Test automatic discovery with LLMFeed-aware agents"
                  ],
                  note: "Native MCP compatibility + enhanced features"
                },
                {
                  step: "3",
                  title: "Enhanced Agent Features",
                  status: "Optional",
                  statusColor: "purple", 
                  description: "Add agent guidance and enhanced capabilities",
                  actions: [
                    "Add agent_guidance with server priorities and behavior",
                    "Include capabilities that extend MCP servers",
                    "Add interaction guidelines and fallback behaviors",
                    "Create llm-index.llmfeed.json for discovery optimization"
                  ],
                  note: "Improves agent behavior and user experience"
                },
                {
                  step: "4",
                  title: "Cryptographic Trust", 
                  status: "Production",
                  statusColor: "orange",
                  description: "Add signatures for enterprise-grade verification",
                  actions: [
                    "Generate Ed25519 key pair",
                    "Add public.pem to .well-known/",
                    "Sign mcpServers and enhancement blocks",
                    "Consider LLMCA certification for maximum trust"
                  ],
                  note: "Production-grade authenticity and integrity verification"
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
                Automatic Discovery Philosophy
              </h4>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Perfect migration strategy:</strong> Standard MCP file gains automatic discovery link. 
                Enhanced LLMs follow the link to rich LLMFeed features, while standard MCP clients work unchanged.
              </p>
              <div className="text-xs text-green-800 bg-white p-2 rounded border border-green-200">
                <strong>Genius insight:</strong> One line in standard MCP enables automatic discovery of enhanced features 
                for LLMFeed-aware agents - 100% backward compatibility guaranteed!
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Ready for Automatic LLMFeed Discovery?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">⚡ Super Quick Start (30 seconds)</h4>
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
                    <span>Enhanced LLMs auto-discover and use rich features!</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">🔬 Why This is Genius</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>100% backward compatibility</strong> - all MCP clients work</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Automatic discovery</strong> for enhanced agents</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Zero migration risk</strong> - perfect transition path</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white border border-green-200 rounded-lg">
              <h5 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Perfect Migration Strategy
              </h5>
              <p className="text-sm text-green-800">
                <strong>Standard MCP:</strong> Works exactly as before + gets discovery link<br/>
                <strong>Enhanced LLMs:</strong> Automatically find and use rich LLMFeed features<br/>
                <strong>Result:</strong> Best of both worlds with zero disruption!
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ExportToLLMButton
                context="static"
                staticPath="demo/.well-known/auto-discovery-starter"
                
              />
              
              <a
                href="/en/news/begin"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <BookOpen className="w-4 h-4" />
                Getting Started Guide
              </a>
              
              <a
                href="/.well-known/exports/spec.llmfeed.json"
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
              Important Disclaimers
            </h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p>• <strong>Research Project:</strong> LLMFeed is experimental research, not an official standard</p>
              <p>• <strong>MCP Compatibility:</strong> Official MCP docs at <a href="https://modelcontextprotocol.io" className="text-blue-600 underline">modelcontextprotocol.io</a></p>
              <p>• <strong>Production Use:</strong> Thoroughly test before deploying in production environments</p>
              <p>• <strong>Community:</strong> Contribute feedback and research at <a href="https://github.com/wellknownmcp/llmfeed-spec" className="text-blue-600 underline">our GitHub</a></p>
            </div>
          </div>
        </div>

        <ShareButtons 
          title="Enhanced MCP Implementation via .well-known/ - LLMFeed Spec"
        
        />
      </div>
    </div>
  )
}