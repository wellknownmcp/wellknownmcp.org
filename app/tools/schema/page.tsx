import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CopyBlock } from '@/components/blocks/CopyBlock'
import { 
  FileCheck, Download, Shield, Zap, Code, CheckCircle, 
  AlertTriangle, ArrowRight, Eye, GitBranch, Layers, 
  Terminal, Globe, Package, Award, Lightbulb, Target,
  Settings, Database, FileText, Clipboard, ExternalLink
} from 'lucide-react'

export default function SchemaPage() {
  const basicSchemaExample = `{
  "$schema": "https://wellknownmcp.org/.well-known/schema.llmfeed.json",
  "feed_type": "export",
  "metadata": {
    "title": "My Documentation Export",
    "origin": "https://mysite.com/docs",
    "created_at": "2025-06-19T10:30:00Z",
    "description": "Complete API documentation with examples"
  },
  "content": {
    "documentation": "...",
    "examples": [...]
  },
  "trust": {
    "signed_blocks": ["metadata", "content"],
    "trust_level": "self-declared"
  }
}`;

  const advancedSchemaExample = `{
  "$schema": "https://wellknownmcp.org/.well-known/schema.annotated.llmfeed.json",
  "feed_type": "mcp",
  "metadata": {
    "title": "API Service Capabilities",
    "origin": "https://api.myservice.com"
  },
  "capabilities": [
    {
      "name": "search_documents",
      "description": "Search through document database",
      "input_schema": {
        "type": "object",
        "properties": {
          "query": { "type": "string" },
          "limit": { "type": "number", "maximum": 100 }
        },
        "required": ["query"]
      },
      "output_schema": {
        "type": "array",
        "items": { "$ref": "#/definitions/Document" }
      }
    }
  ],
  "trust": {
    "signed_blocks": ["all"],
    "trust_level": "certified",
    "certifier": "https://llmca.org"
  }
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SeoHead 
          title="📐 LLMFeed Schema | JSON Schema Validation & Standards"
          description="Official JSON schemas for LLMFeed validation. Canonical, annotated, and lite versions for developers. Ensure your .llmfeed.json files follow MCP standards."
          canonicalUrl="https://wellknownmcp.org/tools/schema"
          keywords={[
            "llmfeed schema",
            "json schema validation",
            "mcp schema",
            "feed validation",
            "llmfeed.json structure",
            "schema validation tool",
            "json schema spec",
            "feed format validation"
          ]}
          ogImage="/og/schema.png"
          llmIntent="validate-schema"
          llmTopic="schema-validation"
          pageType="tool"
          seoMode="technical"
        />

        <PageTitle
          title="📐 LLMFeed Schema"
          subtitle="Official JSON Schema validation for .llmfeed.json files"
        />

        {/* Schema Overview */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <FileCheck className="w-5 h-5" />
              Why Use Schemas?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-blue-700">
              <p className="mb-4">
                JSON schemas ensure your <code>.llmfeed.json</code> files are correctly structured, 
                helping agents understand your data reliably and preventing validation errors.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-800">Validation</h4>
                  <p className="text-sm text-blue-600">Catch errors before agents see them</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Code className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-800">IntelliSense</h4>
                  <p className="text-sm text-blue-600">Auto-completion in VS Code & IDEs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-800">Compliance</h4>
                  <p className="text-sm text-blue-600">Follow MCP standard requirements</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schema Files */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-600" />
              Available Schema Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Canonical Schema */}
              <div className="border rounded-lg p-4 bg-gradient-to-b from-green-50 to-green-100">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Canonical</h4>
                </div>
                <p className="text-sm text-green-700 mb-4">
                  Production-ready schema for all LLMFeed validation
                </p>
                <div className="space-y-2">
                  <a 
                    href="/.well-known/schema.llmfeed.json"
                    className="flex items-center gap-2 text-green-600 hover:text-green-800 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3 h-3" />
                    schema.llmfeed.json
                  </a>
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>Official validation standard</span>
                  </div>
                </div>
              </div>

              {/* Annotated Schema */}
              <div className="border rounded-lg p-4 bg-gradient-to-b from-blue-50 to-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Annotated</h4>
                </div>
                <p className="text-sm text-blue-700 mb-4">
                  Schema with developer comments and guidance
                </p>
                <div className="space-y-2">
                  <a 
                    href="/.well-known/schema.annotated.llmfeed.json"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3 h-3" />
                    schema.annotated.llmfeed.json
                  </a>
                  <div className="flex items-center gap-2 text-xs text-blue-600">
                    <Eye className="w-3 h-3" />
                    <span>Learning & documentation</span>
                  </div>
                </div>
              </div>

              {/* Lite Schema */}
              <div className="border rounded-lg p-4 bg-gradient-to-b from-orange-50 to-orange-100">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <h4 className="font-semibold text-orange-800">Lite</h4>
                </div>
                <p className="text-sm text-orange-700 mb-4">
                  Minimal schema for drafts and prompts
                </p>
                <div className="space-y-2">
                  <a 
                    href="/.well-known/schema.lite.llmfeed.json"
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-800 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3 h-3" />
                    schema.lite.llmfeed.json
                  </a>
                  <div className="flex items-center gap-2 text-xs text-orange-600">
                    <Zap className="w-3 h-3" />
                    <span>Rapid prototyping</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Download className="w-4 h-4 text-gray-600" />
                Quick Downloads
              </h4>
              <div className="flex flex-wrap gap-3">
                <ExportToLLMButton 
                  context="static"
                  staticPath=".well-known/schema"
                  variant="ghost-mini"
                  clipboard
                  customLabel="📋 All Schemas"
                />
                <ExportToLLMButton 
                  context="static"
                  staticPath=".well-known/schema.annotated"
                  variant="developer"
                  mini
                  customLabel="📖 Annotated"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Card className="mb-8 border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Code className="w-5 h-5" />
              Schema Usage Examples
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Basic Usage */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-green-600" />
                Basic Export Feed with Schema
              </h4>
              <p className="text-sm text-green-700 mb-3">
                Reference the canonical schema in your <code>.llmfeed.json</code> files:
              </p>
              <CopyBlock
                content={basicSchemaExample}
                language="json"
              />
            </div>

            {/* Advanced Usage */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-green-600" />
                Advanced MCP Feed with Capabilities
              </h4>
              <p className="text-sm text-green-700 mb-3">
                Use the annotated schema for complex capabilities and trust validation:
              </p>
              <CopyBlock
                content={advancedSchemaExample}
                language="json"
              />
            </div>
          </CardContent>
        </Card>

        {/* IDE Integration */}
        <Card className="mb-8 border-purple-200 bg-purple-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Settings className="w-5 h-5" />
              IDE Integration & Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* VS Code */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4 text-purple-600" />
                  VS Code Setup
                </h4>
                <div className="space-y-3 text-sm">
                  <p className="text-purple-700">
                    Add to your <code>settings.json</code> for automatic validation:
                  </p>
                  <pre className="bg-white border border-purple-200 rounded p-3 text-xs overflow-x-auto">
{`{
  "json.schemas": [
    {
      "fileMatch": ["*.llmfeed.json"],
      "url": "https://wellknownmcp.org/.well-known/schema.llmfeed.json"
    }
  ]
}`}
                  </pre>
                </div>
              </div>

              {/* CLI Validation */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-600" />
                  CLI Validation
                </h4>
                <div className="space-y-3 text-sm">
                  <p className="text-purple-700">
                    Validate feeds using <code>ajv-cli</code>:
                  </p>
                  <pre className="bg-white border border-purple-200 rounded p-3 text-xs overflow-x-auto">
{`# Install AJV CLI
npm install -g ajv-cli

# Validate your feed
ajv validate -s schema.llmfeed.json -d my-feed.llmfeed.json`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">🛠️ Development Tools</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>VS Code IntelliSense</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>JetBrains IDEs support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>CLI validation tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>CI/CD integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Pre-commit hooks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Browser extensions</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schema Validator Tool */}
        <Card className="mb-8 border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <FileCheck className="w-5 h-5" />
              Schema Validation Tool
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-orange-800 mb-2">Coming Soon: Interactive Validator</h4>
                <p className="text-orange-700 mb-4">
                  Drop your <code>.llmfeed.json</code> file here and validate it against our schemas 
                  with real-time feedback, structure suggestions, and compliance checking.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h5 className="font-medium text-orange-800">Features in Development:</h5>
                    <div className="space-y-1">
                      <p className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-orange-600" />
                        <span>Live validation with error highlighting</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-orange-600" />
                        <span>Structure suggestions and auto-fixes</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-orange-600" />
                        <span>MCP compliance checking</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-orange-800">Advanced Features:</h5>
                    <div className="space-y-1">
                      <p className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-orange-600" />
                        <span>Trust signature verification</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-orange-600" />
                        <span>Performance optimization hints</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-orange-600" />
                        <span>Security best practices audit</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-orange-800">Want early access?</h4>
              <p className="text-sm text-orange-700 mb-3">
                The validator is in active development. Join our community to get early access and help shape the tool.
              </p>
              <div className="flex gap-3">
                <Link 
                  href="/join"
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium text-sm"
                >
                  <ArrowRight className="w-3 h-3" />
                  Join the Community
                </Link>
                <Link 
                  href="/verify"
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium text-sm"
                >
                  <ArrowRight className="w-3 h-3" />
                  Try Current Validator
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
        <Card className="mb-8 bg-gradient-to-r from-gray-50 to-slate-100 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Globe className="w-5 h-5" />
              Related Tools & Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-800">📚 Documentation</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/spec/01_llmfeed/llmfeed" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                    <ArrowRight className="w-3 h-3" />
                    LLMFeed Specification
                  </Link>
                  <Link href="/tools/export-explained" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                    <ArrowRight className="w-3 h-3" />
                    Export Feeds Explained
                  </Link>
                  <Link href="/tools/sign-and-verify" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                    <ArrowRight className="w-3 h-3" />
                    Signature & Trust
                  </Link>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-800">🛠️ Developer Tools</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/sdk" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                    <ArrowRight className="w-3 h-3" />
                    SDK & Libraries
                  </Link>
                  <Link href="/tools/export-button" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                    <ArrowRight className="w-3 h-3" />
                    Export Playground
                  </Link>
                  <Link href="/verify" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                    <ArrowRight className="w-3 h-3" />
                    Feed Validator
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/tools/export-explained"
                  className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  Learn Export Concepts
                </Link>
                <Link 
                  href="/tools/export-button"
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  Try Export Playground
                </Link>
                <ExportToLLMButton 
                  context="current"
                  variant="developer"
                  showSignatureStatus
                  customLabel="Export Schema Page"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share */}
        <ShareButtons />
      </div>
    </div>
  )
}