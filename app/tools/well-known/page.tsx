import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Globe, Folder, FileText, Settings, Code, Package, 
  ArrowRight, CheckCircle, Lightbulb, Zap, BookOpen, Download, 
  ExternalLink, AlertCircle, GitMerge, Copy, Play
} from 'lucide-react'

export default function WellKnownPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SeoHead 
          title="/.well-known/mcp Directory Implementation"
          description="Complete /.well-known/mcp setup guide with working examples. RFC 8615 compliant automatic MCP server discovery. Copy-paste ready code samples."
          pageType="tool"
          seoMode="high-ctr"
          llmIntent="implementation"
          llmTopic="server-discovery"
          llmCapabilities={["discovery", "implementation", "validation"]}
          llmTrustLevel="certified"
          llmContentType="guide"
          llmAudience={["developer", "agent"]}
          keywords={["/.well-known/mcp", "MCP server discovery", "RFC 8615", "automatic discovery", "well-known directory", "MCP implementation"]}
          canonicalUrl="https://wellknownmcp.org/tools/well-known"
        />

        {/* ✅ HERO SECTION - Positive First Impression */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">/.well-known/mcp Implementation Guide</h1>
              <p className="text-lg text-gray-600 mt-1">RFC 8615 compliant automatic MCP server discovery</p>
            </div>
          </div>
          
          {/* ✅ QUICK START CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">🚀 Quick Start: 30 Seconds Setup</h2>
                <p className="text-blue-100">Get automatic MCP server discovery working in under a minute</p>
              </div>
              <div className="flex gap-3">
                <ExportToLLMButton
                  context="static"
                  staticPath="demo/.well-known/quick-start"
                  mini={true}
                           />
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  <Play className="w-4 h-4 inline mr-2" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ TABLE OF CONTENTS - Navigation */}
        <Card className="mb-8 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Complete Implementation Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">⚡ Quick Implementation</h4>
                <ul className="space-y-1">
                  <li><a href="#30-second-setup" className="text-blue-600 hover:underline">30-Second Setup</a></li>
                  <li><a href="#file-structure" className="text-blue-600 hover:underline">File Structure</a></li>
                  <li><a href="#working-examples" className="text-blue-600 hover:underline">Working Examples</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🔧 Advanced Features</h4>
                <ul className="space-y-1">
                  <li><a href="#trust-system" className="text-blue-600 hover:underline">Trust & Signatures</a></li>
                  <li><a href="#discovery-protocol" className="text-blue-600 hover:underline">Discovery Protocol</a></li>
                  <li><a href="#live-demo" className="text-blue-600 hover:underline">Live Demo</a></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ✅ 30-SECOND SETUP */}
        <Card className="mb-8 border-green-200 bg-green-50/50" id="30-second-setup">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              30-Second Setup: Add Discovery to Your MCP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-3">Step 1: Add Discovery Link</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Add one line to your existing <code>/.mcp.json</code> file:
                </p>
                <pre className="text-sm bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`{
  "mcpServers": {
    // ... your existing servers
  },
  
  // ✅ Add this line for automatic discovery
  "llmfeed_extension": "/.well-known/mcp.llmfeed.json"
}`}
                </pre>
              </div>

              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-3">Step 2: Create Enhanced File</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Copy your MCP config to <code>/.well-known/mcp.llmfeed.json</code> and add:
                </p>
                <pre className="text-sm bg-gray-900 text-blue-400 p-3 rounded overflow-x-auto">
{`{
  "feed_type": "mcp",
  "metadata": {
    "title": "Your MCP Server",
    "description": "Automatic discovery enabled"
  },
  
  // Copy your exact mcpServers config here
  "mcpServers": { /* ... */ }
}`}
                </pre>
              </div>

              <div className="flex gap-3">
                <ExportToLLMButton
                  context="static"
                  staticPath="demo/.well-known/30-second-setup"
                  showCurlCommand={true}
                  showDirectUrl={true}
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Copy className="w-4 h-4 inline mr-2" />
                  Copy Template
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ✅ FILE STRUCTURE */}
        <Card className="mb-8" id="file-structure">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-blue-600" />
              /.well-known/mcp Directory Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">🔧 Essential Files (RFC 8615)</h4>
                <div className="space-y-3">
                  {[
                    {
                      file: "mcp.llmfeed.json",
                      status: "Required",
                      description: "Main MCP configuration with enhanced discovery metadata"
                    },
                    {
                      file: "llm-index.llmfeed.json", 
                      status: "Recommended",
                      description: "Semantic sitemap for automatic agent navigation"
                    },
                    {
                      file: "public.pem",
                      status: "Optional", 
                      description: "Ed25519 public key for cryptographic verification"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <div>
                          <code className="font-mono text-sm font-semibold">/.well-known/{item.file}</code>
                          <p className="text-xs text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        item.status === 'Required' ? 'bg-red-100 text-red-700' :
                        item.status === 'Recommended' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <ExportToLLMButton
                context="static"
                staticPath="demo/.well-known/file-structure"
                mini={true}
                showDirectUrl={true}
              />
            </div>
          </CardContent>
        </Card>

        {/* ✅ WORKING EXAMPLES */}
        <Card className="mb-8 border-purple-200 bg-purple-50/50" id="working-examples">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-purple-600" />
              Live Demo: See It Working
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3">🌐 Explore Complete Implementation</h4>
                <p className="text-sm text-purple-800 mb-4">
                  See a real /.well-known/mcp directory with 24+ files, trust indicators, and interactive preview.
                </p>
                <a
                  href="https://wellknownmcp.org/.well-known/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Browse Live Directory
                </a>
              </div>

              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3">📋 Copy Working Examples</h4>
                <p className="text-sm text-purple-800 mb-4">
                  Download working MCP configurations ready for copy-paste implementation.
                </p>
                <ExportToLLMButton
                  context="static"
                  staticPath="demo/.well-known/working-examples"
                  showCurlCommand={true}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ✅ DISCOVERY PROTOCOL */}
        <Card className="mb-8" id="discovery-protocol">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitMerge className="w-5 h-5 text-green-600" />
              Automatic Discovery Protocol (Tested June 2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-3">✅ How It Works</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span>LLM reads your standard <code>.mcp.json</code></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span>Detects <code>llmfeed_extension</code> link</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span>Requests user permission for enhanced features</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <span>Accesses enhanced metadata and capabilities</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Validation:</strong> Successfully tested with Claude Desktop - automatic detection with user consent for security.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ✅ TRUST SYSTEM */}
        <Card className="mb-8" id="trust-system">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600" />
              Trust-Based Autonomy (Future Evolution)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-3">🎯 Trust Levels & Autonomy</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span>🔓 <strong>Unsigned:</strong> User consent required</span>
                    <span className="text-xs text-gray-600">Current (2025)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span>🔏 <strong>Signed:</strong> Automatic with notification</span>
                    <span className="text-xs text-gray-600">Q4 2025</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span>🔐 <strong>Certified:</strong> Fully autonomous</span>
                    <span className="text-xs text-gray-600">Q2 2026</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">💡 The Breakthrough</h4>
                <p className="text-sm text-gray-700">
                  LLMFeed's cryptographic trust system solves the core AI autonomy challenge - enabling safe autonomous agent behavior 
                  while maintaining security. This is the only viable path from "AI assistant requiring permission" to "autonomous AI agent."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ✅ IMPLEMENTATION ROADMAP */}
        <Card className="mb-8 border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Implementation Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  phase: "Phase 1: Basic Discovery",
                  time: "30 seconds",
                  status: "✅ Available Now",
                  action: "Add discovery link to existing MCP config"
                },
                {
                  phase: "Phase 2: Enhanced Metadata", 
                  time: "2 minutes",
                  status: "✅ Available Now",
                  action: "Create /.well-known/mcp.llmfeed.json file"
                },
                {
                  phase: "Phase 3: Cryptographic Trust",
                  time: "Q4 2025",
                  status: "🔄 In Development",
                  action: "Add Ed25519 signatures for automatic discovery"
                },
                {
                  phase: "Phase 4: Full Autonomy",
                  time: "Q2 2026",
                  status: "🔮 Planned",
                  action: "LLMCA certification for zero-friction access"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded border border-green-200">
                  <div>
                    <div className="font-semibold text-gray-900">{item.phase}</div>
                    <div className="text-sm text-gray-700">{item.action}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-700">{item.status}</div>
                    <div className="text-xs text-gray-600">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ✅ FINAL CTA */}
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Start Your Implementation Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">1</div>
                <h4 className="font-semibold mb-2">Download Template</h4>
                <ExportToLLMButton
                  context="static"
                  staticPath="demo/.well-known/starter-template"
                  mini={true}
                />
              </div>
              
              <div className="text-center">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">2</div>
                <h4 className="font-semibold mb-2">See Examples</h4>
                <a
                  href="https://wellknownmcp.org/.well-known/"
                  target="_blank"
                  className="text-green-600 hover:underline text-sm"
                >
                  Browse Live Demo
                </a>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">3</div>
                <h4 className="font-semibold mb-2">Get Support</h4>
                <a
                  href="/faq"
                  className="text-purple-600 hover:underline text-sm"
                >
                  FAQ & Troubleshooting
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ✅ COMPACT DISCLAIMERS */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="font-medium text-gray-900 mb-1">📚 Research Project</p>
              <p>
                LLMFeed is experimental research extending MCP. For official docs visit{' '}
                <a href="https://modelcontextprotocol.io" className="text-blue-600 underline">modelcontextprotocol.io</a>.
                Semi-automatic discovery tested June 2025 with user consent.
              </p>
            </div>
          </div>
        </div>

        <ShareButtons 
          title="/.well-known/mcp Implementation Guide - Automatic MCP Server Discovery"
        />
      </div>
    </div>
  )
}