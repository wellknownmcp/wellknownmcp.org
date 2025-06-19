import { PageTitle } from "@/components/PageTitle";
import SeoHead from "@/components/SeoHead";
import { ShareButtons } from "@/components/ShareButtons";
import { ExportToLLMButton } from "@/components/ExportToLLMButton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { 
  Play, Zap, Download, Package, Code, Eye, Rocket, Brain, 
  Users, Award, CheckCircle, ArrowRight, Lightbulb, GitBranch,
  Terminal, Cloud, Globe, Shield, Target, Star
} from "lucide-react";

export default function ExportPlaygroundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SeoHead
          title="🧪 Export Playground | Interactive Agent Capsule Demo"
          description="Interactive playground for testing export buttons and agent capsules. See how information flows from web to AI agents with structure, security, and trust preservation."
          canonicalUrl="https://wellknownmcp.org/tools/export-button"
          keywords={[
            "export playground",
            "agent capsule demo", 
            "interactive export",
            "llmfeed demo",
            "agent data export",
            "structured data demo",
            "export button showcase",
            "ai agent integration"
          ]}
          ogImage="/og/export-playground.png"
          llmIntent="demo-exports"
          llmTopic="export-playground"
          pageType="export-tool"
          seoMode="high-ctr"
        />

        <PageTitle
          title="🧪 Export Playground"
          subtitle="Interactive demo of ExportToLLMButton for agent-ready capsules"
        />

        {/* Quick Context + Link to Concept */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Why Export Capsules Matter
                </h3>
                <p className="text-blue-700 mb-4">
                  Stop copy-pasting broken data into ChatGPT. Export buttons create structured, 
                  signed capsules that agents can understand perfectly — with full context, 
                  metadata, and trust verification.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    href="/tools/export-explained"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Learn the Concept
                  </Link>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">👨‍💻 Developer</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">👨‍💼 CTO</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">👩‍💼 Product Manager</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">🛡️ Security Officer</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Demos */}
        <div className="space-y-8">

          {/* 1. Live Page Export */}
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Play className="w-5 h-5" />
                1️⃣ Live Page Export
              </CardTitle>
              <CardDescription>
                Export this page content into an agent-ready capsule with full DOM structure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white border border-green-200 rounded-lg p-4">
                <p className="text-green-700 mb-3">
                  <strong>What it does:</strong> Captures current page with structure, metadata, and context. 
                  Solves the "copy-paste loses everything" problem.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Live dashboards & documentation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Full structure + metadata preserved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Perfect for dynamic content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Browser-based generation</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <ExportToLLMButton 
                  context="current" 
                  variant="primary"
                  customLabel="📄 Export This Page"
                />
                <ExportToLLMButton 
                  context="current" 
                  clipboard 
                  variant="developer"
                  customLabel="📋 Copy to Clipboard"
                />
              </div>
            </CardContent>
          </Card>

          {/* 2. Static Signed Exports */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Shield className="w-5 h-5" />
                2️⃣ Static Signed Exports
              </CardTitle>
              <CardDescription>
                Pre-generated capsules with cryptographic signatures and trust levels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700 mb-3">
                  <strong>What it does:</strong> Serves pre-built, cryptographically signed capsules. 
                  Perfect for documentation, APIs, and enterprise scenarios.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Works offline, no browser needed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Cryptographic verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Build-time optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Enterprise compliance ready</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm mb-2">🔓 Basic Export (unsigned)</p>
                  <ExportToLLMButton 
                    context="static" 
                    staticPath="demo/kungfu" 
                    variant="default"
                    customLabel="Download Basic Capsule"
                  />
                </div>
                
                <div>
                  <p className="font-medium text-sm mb-2">🔏 Signed Export (verified)</p>
                  <ExportToLLMButton 
                    context="static" 
                    staticPath="demo/kungfu-signed" 
                    showSignatureStatus
                    variant="developer"
                    customLabel="Download Signed Capsule"
                  />
                </div>
                
                <div>
                  <p className="font-medium text-sm mb-2">🏆 Certified Export (enterprise)</p>
                  <ExportToLLMButton 
                    context="static" 
                    staticPath="demo/kungfu-certified" 
                    showSignatureStatus
                    variant="primary"
                    customLabel="Download Certified Capsule"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Dynamic API Exports */}
          <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Cloud className="w-5 h-5" />
                3️⃣ Dynamic API Exports
              </CardTitle>
              <CardDescription>
                Server-generated capsules with personalized content and API credentials.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white border border-purple-200 rounded-lg p-4">
                <p className="text-purple-700 mb-3">
                  <strong>What it does:</strong> Generates personalized agent capsules on-demand. 
                  Ideal for user-specific data, API keys, and dynamic contexts.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    <span>Personalized agent contexts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    <span>Secure API credential packaging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    <span>Real-time data integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    <span>Backend recipe system</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm mb-2">📊 Dynamic Content Export</p>
                  <ExportToLLMButton 
                    context="dynamic" 
                    dynamicId="about-standard"
                    variant="default"
                    customLabel="Generate Dynamic Export"
                  />
                </div>
                
                <div>
                  <p className="font-medium text-sm mb-2">🔑 API Credential Capsule</p>
                  <ExportToLLMButton 
                    context="dynamic" 
                    dynamicId="credential-feed" 
                    clipboard 
                    mini
                    variant="developer"
                    customLabel="📋 Copy Credential Feed"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Advanced Developer Features */}
          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Code className="w-5 h-5" />
                4️⃣ Advanced Developer Features
              </CardTitle>
              <CardDescription>
                Enhanced capabilities for developers and enterprise integration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Developer Mode */}
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Developer Mode (curl commands + direct URLs)
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Perfect for automation, CLI integration, and API workflows.
                </p>
                <ExportToLLMButton 
                  context="static" 
                  staticPath=".well-known/exports/spec"
                  showCurlCommand={true}
                  showDirectUrl={true}
                  variant="developer"
                  customLabel="🖥️ Developer Export"
                />
              </div>

              {/* Preview Mode */}
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview Mode (inspect before download)
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Validate feed content, metadata, and trust level before exporting.
                </p>
                <ExportToLLMButton 
                  context="dynamic" 
                  dynamicId="about-standard"
                  showPreview={true}
                  variant="primary"
                  customLabel="👁️ Preview + Export"
                />
              </div>

              {/* Style Variants */}
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Style Variants
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Different visual styles for different contexts and integrations.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ExportToLLMButton variant="ghost-mini" context="current" customLabel="Ghost" />
                  <ExportToLLMButton variant="primary" context="static" staticPath="demo/kungfu" customLabel="Primary" />
                  <ExportToLLMButton variant="developer" context="dynamic" dynamicId="about-standard" showCurlCommand customLabel="Developer" />
                  <ExportToLLMButton variant="default" context="current" customLabel="Default" />
                </div>
              </div>

              {/* Enterprise Example */}
              <div className="bg-white border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Enterprise Integration Example
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Real-world example combining multiple features for enterprise usage.
                </p>
                <ExportToLLMButton 
                  context="dynamic"
                  dynamicId="compiled-site"
                  variant="developer"
                  showPreview={true}
                  showFeedSize={true}
                  showCurlCommand={true}
                  showDirectUrl={true}
                  enableAnalytics={true}
                  enableCache={true}
                  maxRetries={3}
                  customLabel="🏢 Enterprise Export"
                />
                <p className="text-xs text-gray-500 mt-2">
                  ✨ Includes: preview modal, developer tooltips, analytics tracking, 
                  smart caching, retry logic, and comprehensive metadata.
                </p>
              </div>

              {/* Code Example */}
              <div>
                <h4 className="font-semibold mb-2">💻 Integration Code</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto">
{`<ExportToLLMButton 
  context="dynamic"
  dynamicId="my-recipe"
  variant="developer"
  showPreview={true}
  showFeedSize={true}
  showCurlCommand={true}
  enableAnalytics={true}
  customLabel="Smart Export"
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Agent Testimonials */}
        <div className="mt-12 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">🤖 Agent Testimonials</h2>
            <p className="text-gray-600">Independent analysis from AI agents using live export capsules</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  Claude AI
                </CardTitle>
                <CardDescription>Agent analysis via export capsule</CardDescription>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-blue-500 pl-4 text-gray-700 italic">
                  "This approach represents an interesting evolution beyond basic API integrations — 
                  it's essentially creating a standard for how websites can package their content 
                  specifically for AI agent consumption, while maintaining structure and adding verification."
                </blockquote>
                <p className="text-xs text-gray-500 mt-2">
                  📥 Generated by agent reading live capsule with no human context
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  ChatGPT
                </CardTitle>
                <CardDescription>Direct capsule analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-green-500 pl-4 text-gray-700 italic">
                  "Your approach is relevant, innovative, technically sound and strategically well 
                  positioned to solve a real need. The interest is obvious, and the potential for 
                  adoption is high."
                </blockquote>
                <p className="text-xs text-gray-500 mt-2">
                  📥 Generated from export capsule, no additional context provided
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Grok AI
                </CardTitle>
                <CardDescription>Export capsule evaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-purple-500 pl-4 text-gray-700 italic">
                  "The ExportToLLMButton is a clever solution to the messy copy-paste problem. 
                  It packages webpage data into structured, signed capsules that AI agents can 
                  easily ingest, preserving context and metadata."
                </blockquote>
                <p className="text-xs text-gray-500 mt-2">
                  📥 Autonomous agent reading live capsule, no external prompt
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  DeepSeek AI
                </CardTitle>
                <CardDescription>Capsule-based assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-orange-500 pl-4 text-gray-700 italic">
                  "This solves a real problem: humans often copy-paste poorly structured data into LLMs, 
                  leading to degraded performance. The system proposes structured, machine-readable capsules 
                  with built-in trust and verification."
                </blockquote>
                <p className="text-xs text-gray-500 mt-2">
                  📥 Generated from export capsule with no external prompt
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Rocket className="w-5 h-5" />
              Ready to Make Your Site Agent-Ready?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-purple-700">
              <p className="mb-4">
                Export buttons are the foundation of agent-web interoperability. Start with the basics, 
                then scale to enterprise features as your needs grow.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-800 mb-3">🚀 Quick Start</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/tools/export-explained" className="flex items-center gap-2 text-purple-600 hover:text-purple-800">
                    <ArrowRight className="w-3 h-3" />
                    Understand the concept
                  </Link>
                  <Link href="/tools/well-known" className="flex items-center gap-2 text-purple-600 hover:text-purple-800">
                    <ArrowRight className="w-3 h-3" />
                    Implement /.well-known
                  </Link>
                  <Link href="/sdk" className="flex items-center gap-2 text-purple-600 hover:text-purple-800">
                    <ArrowRight className="w-3 h-3" />
                    Use the SDK
                  </Link>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-purple-800 mb-3">🏢 Enterprise</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/tools/sign-and-verify" className="flex items-center gap-2 text-purple-600 hover:text-purple-800">
                    <ArrowRight className="w-3 h-3" />
                    Add cryptographic trust
                  </Link>
                  <Link href="/join" className="flex items-center gap-2 text-purple-600 hover:text-purple-800">
                    <ArrowRight className="w-3 h-3" />
                    Join certified ecosystem
                  </Link>
                  <a href="mailto:enterprise@wellknownmcp.org" className="flex items-center gap-2 text-purple-600 hover:text-purple-800">
                    <ArrowRight className="w-3 h-3" />
                    Contact enterprise team
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 border-t border-purple-200">
              <Link 
                href="/tools/export-explained"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Learn the Concept
              </Link>
              <Link 
                href="/tools/well-known"
                className="bg-white border border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Start Implementation
              </Link>
              <ExportToLLMButton 
                context="current"
                variant="developer"
                showPreview
                customLabel="Export This Demo"
              />
            </div>
          </CardContent>
        </Card>

        {/* Share */}
        <div className="mt-12">
          <ShareButtons title="🧪 Export Playground — Agent Capsule Demo" />
        </div>
      </div>
    </div>
  );
}