import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CopyBlock } from '@/components/blocks/CopyBlock'
import { 
  Package, Shield, Zap, Globe, Smartphone, Terminal, Database, 
  ArrowRight, CheckCircle, AlertTriangle, Lock, Eye, Users, 
  Download, Upload, FileText, Code, Image, Video, Archive,
  Brain, Target, Lightbulb, Rocket, GitBranch, Layers, Award,
  Server, Cloud, Computer, Monitor
} from 'lucide-react'

export default function ExportExplainedPage() {
  
  const exportStructureExample = `{
  "feed_type": "export",
  "metadata": {
    "title": "Project Documentation",
    "origin": "https://myapp.com/docs",
    "generated_at": "2025-06-19T10:30:00Z",
    "description": "Complete project documentation with examples"
  },
  "data_classification": {
    "security_scan_performed": true,
    "sensitive_data_handling": "user_consented",
    "classification_level": "public"
  },
  "content": {
    "documentation": "Complete guide to using our API...",
    "examples": ["curl -X GET /api/users", "POST /api/login"],
    "metadata": {
      "word_count": 2847,
      "last_updated": "2025-06-15",
      "contributors": ["dev-team"]
    }
  },
  "trust": {
    "signed_blocks": ["metadata", "content"],
    "trust_level": "certified",
    "certifier": "https://myapp.com/.well-known/public.pem"
  }
}`

  const bundleExample = `{
  "feed_type": "export",
  "metadata": {
    "title": "Complete Project Bundle",
    "origin": "https://github.com/user/project"
  },
  "data": {
    "files": [
      {
        "path": "README.md",
        "description": "Project overview",
        "security_classification": "public"
      },
      {
        "path": "src/config.js", 
        "description": "Configuration file",
        "security_classification": "sensitive",
        "redaction_applied": "credentials_masked"
      },
      {
        "path": "docs/api.pdf",
        "description": "API documentation",
        "security_classification": "public"
      }
    ],
    "security_summary": {
      "total_files": 3,
      "public_files": 2,
      "sensitive_files": 1
    }
  }
}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SeoHead 
          title="Export Explained | Information Capsules for AI Agents"
          description="Understanding export feeds: structured information capsules that transform how data flows between humans, applications, and AI agents. Security, trust, and universal compatibility."
          canonicalUrl="https://wellknownmcp.org/tools/export-explained"
          keywords={[
            "information capsules",
            "export feeds",
            "ai agent data",
            "structured data export",
            "data security",
            "llm feed format",
            "agent interoperability",
            "data classification",
            "trust verification",
            "agent-ready data"
          ]}
          ogImage="/og/export-explained.png"
          llmIntent="understand-exports"
          llmTopic="information-capsules"
          pageType="tool"
          seoMode="high-ctr"
        />

        <PageTitle
          title="Export Explained"
          subtitle="Information capsules that bridge the gap between human data and AI agent understanding"
        />

        {/* Hero Problem/Solution */}
        <Card className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              The Copy-Paste Problem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-700 mb-2">❌ Traditional Workflow</h4>
                <div className="space-y-2 text-sm text-red-600">
                  <p>1. User opens website/app</p>
                  <p>2. Selects all content (Ctrl+A)</p>
                  <p>3. Copies to clipboard</p>
                  <p>4. Pastes into ChatGPT/Claude</p>
                  <p>5. Loses structure, context, metadata</p>
                  <p>6. Agent gets confused, hallucinates</p>
                  <p>7. User repeats process...</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Export Capsule Workflow</h4>
                <div className="space-y-2 text-sm text-green-600">
                  <p>1. User clicks Export button</p>
                  <p>2. System creates structured capsule</p>
                  <p>3. Agent receives complete context</p>
                  <p>4. Metadata, trust level included</p>
                  <p>5. Perfect data preservation</p>
                  <p>6. Agent processes efficiently</p>
                  <p>7. ✨ Magic happens</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What is an Information Capsule */}
        <Card className="mb-8 border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Package className="w-5 h-5" />
              What is an Information Capsule?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-blue-700">
              <p className="mb-4 text-lg">
                An <strong>information capsule</strong> is a standardized way to package any data with its context, 
                metadata, and trust information so AI agents can understand it perfectly.
              </p>
              <p className="mb-4">
                Think of it as "copy-paste on steroids" — but instead of losing all structure and context, 
                everything is preserved in a machine-readable format.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-800">Structure</h4>
                  <p className="text-sm text-blue-600">Organized data that machines can parse reliably</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Eye className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-800">Context</h4>
                  <p className="text-sm text-blue-600">Where it came from, why it exists, how to use it</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-800">Trust</h4>
                  <p className="text-sm text-blue-600">Cryptographic signatures and verification</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Universal Sources */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-600" />
              Universal Application Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              Export feeds aren't just for websites. Any application can create information capsules:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-b from-blue-50 to-blue-100">
                <Monitor className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800">Web Apps</h4>
                <p className="text-xs text-blue-600">Dashboards, docs, user interfaces</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gradient-to-b from-green-50 to-green-100">
                <Computer className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-800">Desktop</h4>
                <p className="text-xs text-green-600">Documents, databases, project files</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gradient-to-b from-purple-50 to-purple-100">
                <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-800">Mobile</h4>
                <p className="text-xs text-purple-600">User data, settings, conversations</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gradient-to-b from-orange-50 to-orange-100">
                <Terminal className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800">CLI Tools</h4>
                <p className="text-xs text-orange-600">Logs, reports, system info</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-gray-600" />
                The Universal Pattern
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><code>Any Data Source → Export Feed → LLM understands context</code></p>
                <p><code>Database Query → Export Feed → Agent processes results</code></p>
                <p><code>User Conversation → Export Feed → Transfer to another agent</code></p>
                <p><code>System Logs → Export Feed → AI analyzes patterns</code></p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generation Modes */}
        <Card className="mb-8 border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Zap className="w-5 h-5" />
              Three Generation Modes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Archive className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-800 mb-2">Static</h4>
                <p className="text-sm text-blue-600 mb-3">Pre-generated files stored anywhere</p>
                <div className="text-xs space-y-1">
                  <p className="flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Pre-screened content
                  </p>
                  <p className="flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Works offline
                  </p>
                  <p className="flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-orange-500" />
                    Frozen at build time
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Server className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-purple-800 mb-2">Dynamic</h4>
                <p className="text-sm text-purple-600 mb-3">Generated on-demand via API</p>
                <div className="text-xs space-y-1">
                  <p className="flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Real-time classification
                  </p>
                  <p className="flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Personalized exports
                  </p>
                  <p className="flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-orange-500" />
                    Requires backend
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-orange-800 mb-2">Live</h4>
                <p className="text-sm text-orange-600 mb-3">Extracted from running application</p>
                <div className="text-xs space-y-1">
                  <p className="flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Interactive consent
                  </p>
                  <p className="flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Always current
                  </p>
                  <p className="flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-orange-500" />
                    Requires browser
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Data Classification */}
        <Card className="mb-8 border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Lock className="w-5 h-5" />
              Security & Data Classification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-red-700">
              <p className="mb-4">
                Export feeds automatically scan for sensitive data and apply appropriate security measures.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-red-100 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">🔴 CRITICAL</h4>
                <div className="text-xs text-red-600 space-y-1">
                  <p>• API keys (sk_, pk_)</p>
                  <p>• Passwords</p>
                  <p>• Private keys</p>
                  <p>• Session tokens</p>
                </div>
                <p className="text-xs text-red-700 mt-2 font-medium">→ Automatically redacted</p>
              </div>

              <div className="bg-yellow-100 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">🟡 SENSITIVE</h4>
                <div className="text-xs text-yellow-600 space-y-1">
                  <p>• Email addresses</p>
                  <p>• Phone numbers</p>
                  <p>• Internal URLs</p>
                  <p>• User IDs</p>
                </div>
                <p className="text-xs text-yellow-700 mt-2 font-medium">→ User consent required</p>
              </div>

              <div className="bg-green-100 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🟢 PUBLIC</h4>
                <div className="text-xs text-green-600 space-y-1">
                  <p>• Documentation</p>
                  <p>• Marketing content</p>
                  <p>• Public APIs</p>
                  <p>• General info</p>
                </div>
                <p className="text-xs text-green-700 mt-2 font-medium">→ Normal export</p>
              </div>
            </div>

            <div className="bg-white border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-600" />
                Security Workflow
              </h4>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="font-medium">1. Scan</p>
                  <p className="text-xs text-gray-600">Automatic detection</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Layers className="w-4 h-4 text-yellow-600" />
                  </div>
                  <p className="font-medium">2. Classify</p>
                  <p className="text-xs text-gray-600">Risk categorization</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="font-medium">3. Consent</p>
                  <p className="text-xs text-gray-600">User chooses</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Download className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="font-medium">4. Export</p>
                  <p className="text-xs text-gray-600">Secure capsule</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Structure Example */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-600" />
              Export Feed Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Every export feed follows a standardized structure that agents can reliably parse:
            </p>
            <CopyBlock
              content={exportStructureExample}
              language="json"
            />
          </CardContent>
        </Card>

        {/* Bundle Archives */}
        <Card className="mb-8 border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Archive className="w-5 h-5" />
              Bundle Archives (.zip)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-orange-700">
              <p className="mb-4">
                For complex exports, you can package multiple files into a single archive with 
                the <code>.llmfeed.json</code> acting as the index and descriptor.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Documents & Text</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Image className="w-4 h-4 text-green-600" />
                <span>Images & Assets</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Database className="w-4 h-4 text-purple-600" />
                <span>Data & Configurations</span>
              </div>
            </div>

            <CopyBlock
              content={bundleExample}
              language="json"
            />

            <div className="bg-white border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">📦 Use Cases for Bundles</h4>
              <div className="text-sm space-y-2">
                <p>• <strong>API provider:</strong> credentials.llmfeed.json + usage_guide.md + samples.json</p>
                <p>• <strong>Researcher:</strong> dataset_info.llmfeed.json + data.csv + license.txt + paper.pdf</p>
                <p>• <strong>Developer:</strong> project_context.llmfeed.json + source_code/ + docs/ + assets/</p>
                <p>• <strong>Enterprise:</strong> compliance_report.llmfeed.json + audit_trail.xlsx + certificates/</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Impact */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Rocket className="w-5 h-5" />
              Why This Matters for Business
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Competitive Advantage
                </h4>
                <div className="space-y-2 text-sm text-purple-700">
                  <p>• <strong>2010:</strong> Websites fought for SEO ranking</p>
                  <p>• <strong>2025:</strong> Websites compete for AIO (Agent Indexing Optimization)</p>
                  <p>• <strong>Early adopters</strong> get better agent discovery</p>
                  <p>• <strong>Structured data</strong> = more reliable agent interactions</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Enterprise Benefits
                </h4>
                <div className="space-y-2 text-sm text-purple-700">
                  <p>• <strong>Security:</strong> Controlled data exposure</p>
                  <p>• <strong>Compliance:</strong> Audit trails and consent</p>
                  <p>• <strong>Efficiency:</strong> Less copy-paste errors</p>
                  <p>• <strong>Innovation:</strong> New agent-driven workflows</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-purple-800">🎯 Key Audiences</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">👨‍💻 Developers</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">👨‍💼 CTOs</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">👩‍💼 Product Managers</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">🛡️ Security Officers</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">🧑‍💻 Webmasters</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Lightbulb className="w-5 h-5" />
              Ready to Get Started?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-800 mb-3">📚 Learn More</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/tools/export-button" className="flex items-center gap-2 text-green-600 hover:text-green-800">
                    <ArrowRight className="w-3 h-3" />
                    Try the Export Playground
                  </Link>
                  <Link href="/spec/02_llmfeed_feedtype/llmfeed_feedtype_export" className="flex items-center gap-2 text-green-600 hover:text-green-800">
                    <ArrowRight className="w-3 h-3" />
                    Read the Technical Spec
                  </Link>
                  <Link href="/tools/well-known" className="flex items-center gap-2 text-green-600 hover:text-green-800">
                    <ArrowRight className="w-3 h-3" />
                    Implement /.well-known
                  </Link>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-800 mb-3">🛠️ Implementation</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/sdk" className="flex items-center gap-2 text-green-600 hover:text-green-800">
                    <ArrowRight className="w-3 h-3" />
                    Use the SDK
                  </Link>
                  <Link href="/tools/sign-and-verify" className="flex items-center gap-2 text-green-600 hover:text-green-800">
                    <ArrowRight className="w-3 h-3" />
                    Add Signatures
                  </Link>
                  <Link href="/join" className="flex items-center gap-2 text-green-600 hover:text-green-800">
                    <ArrowRight className="w-3 h-3" />
                    Join the Ecosystem
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 border-t border-green-200">
              <Link 
                href="/tools/export-button"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Try Export Playground
              </Link>
              <Link 
                href="/spec/02_llmfeed_feedtype/llmfeed_feedtype_export"
                className="bg-white border border-green-300 text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Read Full Spec
              </Link>
              <ExportToLLMButton 
                context="current"
                variant="developer"
                showSignatureStatus
                customLabel="Export This Page"
              />
            </div>
          </CardContent>
        </Card>

        {/* Share */}
        <ShareButtons />
      </div>
    </div>
  )
}