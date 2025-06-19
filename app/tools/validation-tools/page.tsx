import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { CopyButton } from '@/components/CopyButton'
import { 
  CheckCircle, AlertTriangle, Code, Terminal, Globe, 
  Zap, Settings, FileCheck, GitBranch, Monitor,
  Package, Shield, Clock, ExternalLink, ArrowRight,
  Play, Download, Wrench, Eye, ChevronRight
} from 'lucide-react'

export default function ValidationTools() {
  return (
    <>
      <SeoHead 
        title="Validation Tools - Complete MCP Feed Validation Ecosystem | WellKnownMCP"
        description="Master the complete MCP feed validation ecosystem: CLI tools, IDE integration, browser extensions, CI/CD workflows, and automated validation for enterprise."
        keywords="MCP validation, feed validation tools, CLI validation, IDE integration, CI/CD automation, schema validation, LLMFeed testing, developer tools"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageTitle 
          title="Validation Tools" 
          subtitle="Complete MCP Feed Validation Ecosystem"
          
        />

        {/* Hero Section */}
        <div className="mb-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-900">Validation at Every Stage</h2>
              <p className="text-green-700">From development to production, ensure feed quality and compliance</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">🎯 Why Validation Matters</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• <strong>Agent compatibility:</strong> Ensure feeds work across all agents</li>
                <li>• <strong>Early error detection:</strong> Catch issues before deployment</li>
                <li>• <strong>Compliance verification:</strong> Meet MCP specification standards</li>
                <li>• <strong>Performance optimization:</strong> Identify bottlenecks and inefficiencies</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">🚀 Validation Stages</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• <strong>Development:</strong> IDE integration + real-time feedback</li>
                <li>• <strong>Testing:</strong> CLI validation + automated testing</li>
                <li>• <strong>Deployment:</strong> CI/CD pipelines + quality gates</li>
                <li>• <strong>Production:</strong> Monitoring + health checks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ecosystem Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔧 Validation Ecosystem Overview</h2>
          
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 border border-gray-200 mb-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-blue-900">IDE Integration</h3>
                <p className="text-sm text-blue-700">Real-time validation while coding</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Terminal className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-green-900">CLI Tools</h3>
                <p className="text-sm text-green-700">Command-line validation automation</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-purple-900">Browser Tools</h3>
                <p className="text-sm text-purple-700">Web-based validation interface</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GitBranch className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-orange-900">CI/CD Pipeline</h3>
                <p className="text-sm text-orange-700">Automated deployment validation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">✅ Available Now</h2>
          
          <div className="space-y-6">
            {/* Schema Validation */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">Schema Validation</h3>
                  <p className="text-gray-600">JSON Schema validation for all feed types</p>
                </div>
                <div className="flex gap-2">
                  <Link href="/tools/schema" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Use Tool
                  </Link>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Canonical Schema</h4>
                  <p className="text-sm text-blue-700">Complete specification validation</p>
                  <ul className="text-xs text-blue-600 mt-2 space-y-1">
                    <li>• All required fields validated</li>
                    <li>• Type checking and constraints</li>
                    <li>• Cross-field validation rules</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Annotated Schema</h4>
                  <p className="text-sm text-green-700">Detailed error messages and guidance</p>
                  <ul className="text-xs text-green-600 mt-2 space-y-1">
                    <li>• Human-readable error descriptions</li>
                    <li>• Fix suggestions and examples</li>
                    <li>• Best practice recommendations</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Lite Schema</h4>
                  <p className="text-sm text-purple-700">Fast validation for CI/CD pipelines</p>
                  <ul className="text-xs text-purple-600 mt-2 space-y-1">
                    <li>• Core validation only</li>
                    <li>• Optimized for speed</li>
                    <li>• Perfect for automated testing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* LLMFeedHub */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">LLMFeedHub</h3>
                  <p className="text-gray-600">Web-based validation and testing platform</p>
                </div>
                <div className="flex gap-2">
                  <Link href="/llmfeedhub" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Open Hub
                  </Link>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🔍 Validation Features</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Drag & drop file validation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      URL-based feed testing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Real-time error highlighting
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Agent simulation testing
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🚀 Testing Capabilities</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-600" />
                      Agent interpretation preview
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      Signature verification
                    </li>
                    <li className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-blue-600" />
                      Performance analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      Feed dependency checking
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Verification API */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">Verification API</h3>
                  <p className="text-gray-600">Programmatic validation for automated workflows</p>
                </div>
                <div className="flex gap-2">
                  <Link href="/verify" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Try API
                  </Link>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Validate a feed via API
curl -X POST https://wellknownmcp.org/api/verify \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/.well-known/mcp.llmfeed.json"}'

# Response
{
  "valid": true,
  "score": 95,
  "checks": {
    "schema": "pass",
    "signature": "pass", 
    "performance": "pass"
  },
  "warnings": [],
  "recommendations": ["Add capabilities feed"]
}`}
                </pre>
              </div>
              
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Real-time validation
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  JSON response format
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Rate limit friendly
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* In Development */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚧 In Development</h2>
          
          <div className="space-y-6">
            {/* CLI Tools */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">CLI Validation Tools</h3>
                  <p className="text-gray-600">Command-line tools for developer workflows</p>
                </div>
                <div className="flex items-center gap-2 text-orange-600 text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  Coming Q3 2025
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🔧 Planned Features</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>mcp validate</strong> - Single feed validation</li>
                    <li>• <strong>mcp test</strong> - Agent simulation testing</li>
                    <li>• <strong>mcp lint</strong> - Code style and best practices</li>
                    <li>• <strong>mcp watch</strong> - Continuous validation mode</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">📦 Installation Preview</h4>
                  <div className="bg-gray-900 rounded-lg p-3">
                    <pre className="text-green-400 text-xs">
{`# Installation (coming soon)
npm install -g @wellknownmcp/cli
# or
pip install wellknownmcp-cli

# Usage
mcp validate ./feeds/
mcp test --agent-simulation
mcp lint --fix`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* IDE Integration */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">IDE Integration</h3>
                  <p className="text-gray-600">Real-time validation in VS Code, JetBrains, and more</p>
                </div>
                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  Coming Q4 2025
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">VS Code Extension</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Real-time schema validation</li>
                    <li>• Autocomplete for feed properties</li>
                    <li>• Error highlighting and fixes</li>
                    <li>• Built-in agent simulation</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">JetBrains Plugin</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• IntelliJ IDEA support</li>
                    <li>• WebStorm integration</li>
                    <li>• PyCharm compatibility</li>
                    <li>• Unified validation experience</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Language Servers</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• LSP protocol support</li>
                    <li>• Vim/Neovim integration</li>
                    <li>• Emacs support</li>
                    <li>• Universal editor compatibility</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Browser Extension */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">Browser Extension</h3>
                  <p className="text-gray-600">Validate feeds directly in the browser</p>
                </div>
                <div className="flex items-center gap-2 text-purple-600 text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  Coming 2026
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🌐 Browser Features</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Auto-detect MCP feeds on websites</li>
                    <li>• One-click validation from context menu</li>
                    <li>• Visual indicators for feed quality</li>
                    <li>• Export feeds for agent testing</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🔧 Developer Tools</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• DevTools panel integration</li>
                    <li>• Network request monitoring</li>
                    <li>• Performance profiling</li>
                    <li>• Agent behavior simulation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CI/CD Integration Patterns */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔄 CI/CD Integration Patterns</h2>
          
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 border border-gray-200">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automated Validation Workflows</h3>
              <p className="text-gray-700">
                Integrate MCP feed validation into your deployment pipeline to catch issues early and ensure production quality.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">🚀 GitHub Actions</h4>
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <pre className="text-green-400 text-xs overflow-x-auto">
{`name: Validate MCP Feeds
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Validate Feeds
        uses: wellknownmcp/validate-action@v1
        with:
          path: '.well-known/'
          strict: true
          agent_simulation: true`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">🐳 Docker Integration</h4>
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <pre className="text-green-400 text-xs overflow-x-auto">
{`# Dockerfile validation step
FROM wellknownmcp/validator:latest AS validator
COPY .well-known/ /feeds/
RUN mcp validate /feeds/ --strict

# Your app build...
FROM node:18-alpine
COPY --from=validator /feeds/ .well-known/
# Continue build...`}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-2">✅ Pre-merge Validation</h5>
                <p className="text-sm text-gray-600">Validate feeds before code reaches main branch</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-2">🚫 Quality Gates</h5>
                <p className="text-sm text-gray-600">Block deployment if validation fails</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-2">📊 Performance Monitoring</h5>
                <p className="text-sm text-gray-600">Track feed quality metrics over time</p>
              </div>
            </div>
          </div>
        </div>

        {/* SDK Section (Placeholder) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🧰 SDK Integration</h2>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">SDK Documentation Coming Soon</h3>
              <p className="text-indigo-700">
                Comprehensive SDK documentation for programmatic validation will be added here.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-indigo-200 text-center">
                <Code className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <h4 className="font-semibold text-indigo-800">JavaScript SDK</h4>
                <p className="text-sm text-indigo-600">@wellknownmcp/validator</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-indigo-200 text-center">
                <Terminal className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <h4 className="font-semibold text-indigo-800">Python SDK</h4>
                <p className="text-sm text-indigo-600">wellknownmcp-validator</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-indigo-200 text-center">
                <Settings className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <h4 className="font-semibold text-indigo-800">Go SDK</h4>
                <p className="text-sm text-indigo-600">github.com/wellknownmcp/validator</p>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-indigo-600 mb-4">
                SDK documentation will cover programmatic validation, custom rules, and integration patterns.
              </p>
              <Link 
                href="/sdk" 
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Package className="w-4 h-4" />
                Explore SDK (Coming Soon)
              </Link>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Getting Started</h2>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-green-900 mb-4">📋 Quick Start Checklist</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600" />
                    <span className="text-green-800">Validate existing feeds with LLMFeedHub</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600" />
                    <span className="text-green-800">Set up schema validation in your IDE</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600" />
                    <span className="text-green-800">Add API validation to CI/CD pipeline</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600" />
                    <span className="text-green-800">Monitor feed performance in production</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600" />
                    <span className="text-green-800">Plan for CLI and IDE integration</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-green-900 mb-4">🔗 Next Steps</h3>
                <div className="space-y-4">
                  <Link href="/tools/schema" className="block bg-white rounded-lg p-4 border border-green-200 hover:border-green-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900">Start with Schema Validation</h4>
                        <p className="text-sm text-green-700">Learn the validation fundamentals</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link href="/llmfeedhub" className="block bg-white rounded-lg p-4 border border-green-200 hover:border-green-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900">Test with LLMFeedHub</h4>
                        <p className="text-sm text-green-700">Validate your feeds online</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link href="/verify" className="block bg-white rounded-lg p-4 border border-green-200 hover:border-green-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900">Integrate Verification API</h4>
                        <p className="text-sm text-green-700">Add automated validation</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🗺️ Validation Roadmap</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Q2 2025 - Foundation (Complete)</h3>
              </div>
              <p className="text-green-700 text-sm">Schema validation, LLMFeedHub, and Verification API</p>
            </div>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-orange-800">Q3 2025 - CLI Tools</h3>
              </div>
              <p className="text-orange-700 text-sm">Command-line validation suite for developer workflows</p>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Q4 2025 - IDE Integration</h3>
              </div>
              <p className="text-blue-700 text-sm">VS Code extension and JetBrains plugin for real-time validation</p>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-purple-800">2026 - Advanced Tools</h3>
              </div>
              <p className="text-purple-700 text-sm">Browser extension, advanced analytics, and AI-powered validation</p>
            </div>
          </div>
        </div>

        {/* Export & Share */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">📤 Export This Guide</h2>
            <ExportToLLMButton 
              context="static"
              showSignatureStatus
              showCurlCommand
            />
          </div>
          
          <ShareButtons 
            title="Validation Tools - Complete MCP Feed Validation Ecosystem"
            
          />
        </div>
      </div>
    </>
  )
}