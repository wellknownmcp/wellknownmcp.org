import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CopyBlock } from '@/components/blocks/CopyBlock'
import { 
  Shield, Lock, Key, CheckCircle, AlertTriangle, Award, 
  ArrowRight, Users, Globe, FileCheck, Zap, Terminal,
  Eye, Target, Layers, Settings, Brain, Package,Rocket, 
  Lightbulb, Server, Database, Crown, Star, ExternalLink
} from 'lucide-react'

export default function SignAndVerifyPage() {
  
  const trustBlockExample = `{
  "feed_type": "export",
  "metadata": {
    "title": "API Documentation Export",
    "origin": "https://myapi.com/docs",
    "created_at": "2025-06-19T10:30:00Z"
  },
  "content": {
    "documentation": "Complete API reference...",
    "examples": [...]
  },
  "trust": {
    "trust_level": "certified",
    "scope": "full",
    "signed_blocks": ["metadata", "content", "trust"],
    "public_key_hint": "https://myapi.com/.well-known/public.pem"
  },
  "signature": {
    "algorithm": "ed25519",
    "value": "base64-signature-value...",
    "created_at": "2025-06-19T10:30:00Z"
  },
  "certification": {
    "certifier": "https://llmca.org",
    "model": "identity_validation",
    "verification_level": "enterprise",
    "value": "base64-certification-value...",
    "issued_at": "2025-06-19T10:30:00Z",
    "expires_at": "2026-06-19T10:30:00Z"
  }
}`;

  const delegatedSignatureExample = `{
  "trust": {
    "trust_level": "delegated",
    "scope": "partial", 
    "signed_blocks": ["metadata"],
    "delegation_method": "email_challenge",
    "identity_verified": "developer@example.com",
    "public_key_hint": "https://llmca.org/.well-known/llmca_authority.pem"
  },
  "signature": {
    "algorithm": "ed25519", 
    "value": "base64-delegated-signature...",
    "created_at": "2025-06-19T10:30:00Z",
    "signed_by": "LLMCA Authority"
  }
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SeoHead 
          title="🔐 Sign & Verify | Trust Architecture for AI Agents"
          description="Master cryptographic trust for AI agents: signatures, certification, delegated signing. Build secure agent interactions with asymmetric cryptography and LLMCA authority."
          canonicalUrl="https://wellknownmcp.org/tools/sign-and-verify"
          keywords={[
            "cryptographic signature",
            "ai agent trust",
            "llmfeed signature",
            "asymmetric cryptography", 
            "trust verification",
            "certification authority",
            "delegated signing",
            "llmca authority",
            "feed authentication",
            "agent security"
          ]}
          ogImage="/og/sign-verify.png"
          llmIntent="understand-trust"
          llmTopic="cryptographic-trust"
          pageType="tool"
          seoMode="technical"
        />

        <PageTitle
          title="🔐 Sign & Verify"
          subtitle="Build cryptographic trust for AI agents using signatures, certification, and delegated authority"
        />

        {/* Trust Problem & Solution */}
        <Card className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              The Agent Trust Problem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-700 mb-3">❌ Without Trust Verification</h4>
                <div className="space-y-2 text-sm text-red-600">
                  <p>• Agents can't verify content authenticity</p>
                  <p>• Easy to spoof or tamper with feeds</p>
                  <p>• No traceability of data origins</p>
                  <p>• Vulnerable to injection attacks</p>
                  <p>• Enterprise agents refuse to act</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ With Cryptographic Trust</h4>
                <div className="space-y-2 text-sm text-green-600">
                  <p>• Agents verify signatures before acting</p>
                  <p>• Tamper-proof content guarantee</p>
                  <p>• Full audit trail and provenance</p>
                  <p>• Protection against malicious feeds</p>
                  <p>• Enterprise-grade security compliance</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-red-200 rounded-lg p-4 mt-4">
              <p className="text-red-700 font-medium">
                🎯 <strong>Bottom Line:</strong> Agents need to trust your content before they'll act on it. 
                Cryptographic signatures provide mathematical proof of authenticity and integrity.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trust Hierarchy */}
        <Card className="mb-8 border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Layers className="w-5 h-5" />
              Trust Hierarchy: From Zero to Enterprise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                
                {/* Unsigned */}
                <div className="text-center p-4 rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileCheck className="w-6 h-6 text-gray-500" />
                  </div>
                  <h4 className="font-semibold text-gray-700 mb-2">Unsigned</h4>
                  <p className="text-xs text-gray-600">No guarantee of authenticity</p>
                  <div className="mt-2 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                    Basic feeds
                  </div>
                </div>

                {/* Signed */}
                <div className="text-center p-4 rounded-lg bg-gradient-to-b from-blue-50 to-blue-100 border border-blue-200">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Key className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-700 mb-2">Signed</h4>
                  <p className="text-xs text-blue-600">Cryptographic proof of origin</p>
                  <div className="mt-2 px-2 py-1 bg-blue-200 text-blue-700 text-xs rounded">
                    Self-declared
                  </div>
                </div>

                {/* Certified */}
                <div className="text-center p-4 rounded-lg bg-gradient-to-b from-green-50 to-green-100 border border-green-200">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-green-700 mb-2">Certified</h4>
                  <p className="text-xs text-green-600">Third-party validation</p>
                  <div className="mt-2 px-2 py-1 bg-green-200 text-green-700 text-xs rounded">
                    LLMCA verified
                  </div>
                </div>

                {/* Delegated */}
                <div className="text-center p-4 rounded-lg bg-gradient-to-b from-purple-50 to-purple-100 border border-purple-200">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-purple-700 mb-2">Delegated</h4>
                  <p className="text-xs text-purple-600">Authority-backed identity</p>
                  <div className="mt-2 px-2 py-1 bg-purple-200 text-purple-700 text-xs rounded">
                    Challenge-verified
                  </div>
                </div>
              </div>

              <div className="bg-white border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  Recommended Trust Levels by Use Case
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p><strong>📄 Documentation:</strong> Signed (traceability)</p>
                    <p><strong>🔑 API Credentials:</strong> Certified (mandatory)</p>
                    <p><strong>🏥 Healthcare Data:</strong> Certified (compliance)</p>
                  </div>
                  <div className="space-y-2">
                    <p><strong>💰 Financial APIs:</strong> Certified (regulations)</p>
                    <p><strong>🧪 Personal Experiments:</strong> Delegated (friction-free)</p>
                    <p><strong>🌍 Public Content:</strong> Signed (authenticity)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Asymmetric Crypto Explained */}
        <Card className="mb-8 border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Lock className="w-5 h-5" />
              Asymmetric Cryptography for Humans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-green-700">
              <p className="mb-4 text-lg">
                Two keys, one purpose: <strong>prove authenticity without sharing secrets</strong>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Private Key (Secret)
                </h4>
                <div className="space-y-2 text-sm text-green-700">
                  <p>• <strong>Keep it secret:</strong> Never share, never expose</p>
                  <p>• <strong>Used to sign:</strong> Creates digital signatures</p>
                  <p>• <strong>Your identity:</strong> Proves you authored content</p>
                  <p>• <strong>Secure storage:</strong> Hardware tokens, key vaults</p>
                </div>
              </div>

              <div className="bg-white border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Public Key (Shared)
                </h4>
                <div className="space-y-2 text-sm text-green-700">
                  <p>• <strong>Share freely:</strong> Public at /.well-known/public.pem</p>
                  <p>• <strong>Used to verify:</strong> Validates signatures</p>
                  <p>• <strong>Agent access:</strong> Agents fetch to verify feeds</p>
                  <p>• <strong>Trust anchor:</strong> Mathematical proof of authenticity</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-green-800">🔄 The Signature Workflow</h4>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FileCheck className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="font-medium">1. Create Feed</p>
                  <p className="text-xs text-gray-600">Structure your .llmfeed.json</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Key className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="font-medium">2. Sign</p>
                  <p className="text-xs text-gray-600">Use private key to sign</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="font-medium">3. Publish</p>
                  <p className="text-xs text-gray-600">Serve feed + public key</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="font-medium">4. Verify</p>
                  <p className="text-xs text-gray-600">Agents verify signature</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Block Structure */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" />
              Trust Block Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              The <code>trust</code>, <code>signature</code>, and <code>certification</code> blocks work together 
              to provide cryptographic proof and third-party validation:
            </p>
            
            <CopyBlock
              content={trustBlockExample}
              language="json"
            />

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h5 className="font-semibold text-blue-800 mb-2">🔒 Trust Block</h5>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>• <strong>trust_level:</strong> self-declared | certified | delegated</p>
                  <p>• <strong>scope:</strong> partial | full</p>
                  <p>• <strong>signed_blocks:</strong> what's cryptographically protected</p>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h5 className="font-semibold text-green-800 mb-2">✍️ Signature Block</h5>
                <div className="text-xs text-green-700 space-y-1">
                  <p>• <strong>algorithm:</strong> ed25519 (recommended)</p>
                  <p>• <strong>value:</strong> base64-encoded signature</p>
                  <p>• <strong>created_at:</strong> signing timestamp</p>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <h5 className="font-semibold text-purple-800 mb-2">🏆 Certification Block</h5>
                <div className="text-xs text-purple-700 space-y-1">
                  <p>• <strong>certifier:</strong> trusted authority (LLMCA)</p>
                  <p>• <strong>model:</strong> identity_validation</p>
                  <p>• <strong>expires_at:</strong> certification validity</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delegated Signing */}
        <Card className="mb-8 border-purple-200 bg-purple-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Users className="w-5 h-5" />
              Delegated Signing: Friction-Free Onboarding
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-purple-700">
              <p className="mb-4">
                Not everyone can manage cryptographic keys. <strong>Delegated signing</strong> provides 
                a bridge for individuals and small teams to participate in the trust ecosystem.
              </p>
            </div>

            <div className="bg-white border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-600" />
                How Delegated Signing Works
              </h4>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FileCheck className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="font-medium">1. Identity Challenge</p>
                  <p className="text-xs text-gray-600">Email, domain, or phone verification</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Server className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="font-medium">2. LLMCA Signs</p>
                  <p className="text-xs text-gray-600">Authority key creates signature</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Database className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="font-medium">3. Identity Linked</p>
                  <p className="text-xs text-gray-600">Signature tied to verified identity</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="font-medium">4. Agent Trust</p>
                  <p className="text-xs text-gray-600">Lower trust, but still verifiable</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-800 mb-3">✅ Perfect For</h4>
                <div className="space-y-2 text-sm text-purple-700">
                  <p>• Individual developers learning MCP</p>
                  <p>• Small teams without PKI infrastructure</p>
                  <p>• Experimental and prototype feeds</p>
                  <p>• Educational and tutorial content</p>
                  <p>• Open source community contributions</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-purple-800 mb-3">⚠️ Limitations</h4>
                <div className="space-y-2 text-sm text-purple-700">
                  <p>• Lower trust level than self-signing</p>
                  <p>• Depends on LLMCA infrastructure</p>
                  <p>• Not suitable for high-security scenarios</p>
                  <p>• Enterprise agents may require full crypto</p>
                  <p>• Limited to specific verification methods</p>
                </div>
              </div>
            </div>

            <CopyBlock
              content={delegatedSignatureExample}
              language="json"
            />

            <div className="bg-white border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-purple-800">🚀 Try Delegated Signing</h4>
              <p className="text-sm text-purple-700 mb-3">
                LLMCA provides a delegated signing service for easy onboarding to the trust ecosystem.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://llmca.org/sign"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium text-sm"
                >
                  <ExternalLink className="w-3 h-3" />
                  LLMCA Delegated Signing
                </a>
                <ExportToLLMButton
                  context="static"
                  staticPath="prompts/mcp-agent-behavior-override"
                  mini
                  clipboard
                  customLabel="📋 Example Signed Prompt"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed Types & Signing Requirements */}
        <Card className="mb-8 border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <FileCheck className="w-5 h-5" />
              Feed Types & Signing Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 mb-4">
              Different feed types have different security requirements based on their purpose and risk level.
            </p>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* High Security */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    🔴 High Security (Must Sign)
                  </h4>
                  <div className="space-y-2 text-sm text-red-700">
                    <p>• <strong>credential.llmfeed.json:</strong> API keys, tokens</p>
                    <p>• <strong>agent-behavior-override:</strong> Behavioral modification</p>
                    <p>• <strong>capabilities.llmfeed.json:</strong> Service capabilities</p>
                    <p>• <strong>Financial/Healthcare data:</strong> Regulated content</p>
                  </div>
                  <div className="mt-3 px-2 py-1 bg-red-200 text-red-800 text-xs rounded font-medium">
                    Certification recommended
                  </div>
                </div>

                {/* Medium Security */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    🟡 Medium Security (Should Sign)
                  </h4>
                  <div className="space-y-2 text-sm text-yellow-700">
                    <p>• <strong>mcp.llmfeed.json:</strong> Main service discovery</p>
                    <p>• <strong>export.llmfeed.json:</strong> Content exports</p>
                    <p>• <strong>Bundle manifests:</strong> Archive integrity</p>
                    <p>• <strong>API documentation:</strong> Technical specifications</p>
                  </div>
                  <div className="mt-3 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded font-medium">
                    Signing for traceability
                  </div>
                </div>

                {/* Low Security */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    🟢 Low Security (Optional)
                  </h4>
                  <div className="space-y-2 text-sm text-green-700">
                    <p>• <strong>llm-index.llmfeed.json:</strong> Feed directories</p>
                    <p>• <strong>manifesto.llmfeed.json:</strong> Policy statements</p>
                    <p>• <strong>Public documentation:</strong> General information</p>
                    <p>• <strong>Marketing content:</strong> Public-facing material</p>
                  </div>
                  <div className="mt-3 px-2 py-1 bg-green-200 text-green-800 text-xs rounded font-medium">
                    Delegated signing OK
                  </div>
                </div>

                {/* Experimental */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    🔵 Experimental (Flexible)
                  </h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p>• <strong>prompt.llmfeed.json:</strong> AI prompts & templates</p>
                    <p>• <strong>session.llmfeed.json:</strong> Conversation exports</p>
                    <p>• <strong>Prototype feeds:</strong> Development & testing</p>
                    <p>• <strong>Personal projects:</strong> Individual experiments</p>
                  </div>
                  <div className="mt-3 px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded font-medium">
                    Start unsigned, evolve trust
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card className="mb-8 bg-gradient-to-r from-gray-50 to-slate-100 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Rocket className="w-5 h-5" />
              Getting Started: Choose Your Path
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Beginner Path */}
              <div className="bg-white border border-purple-200 rounded-lg p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-purple-800 mb-3 text-center">🚀 Beginner</h4>
                <div className="space-y-2 text-sm text-purple-700 mb-4">
                  <p>• Start with delegated signing</p>
                  <p>• Email/domain verification</p>
                  <p>• Perfect for learning & experimenting</p>
                </div>
                <a 
                  href="https://llmca.org/sign"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Try Delegated Signing
                </a>
              </div>

              {/* Developer Path */}
              <div className="bg-white border border-blue-200 rounded-lg p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Terminal className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-800 mb-3 text-center">💻 Developer</h4>
                <div className="space-y-2 text-sm text-blue-700 mb-4">
                  <p>• Generate your own keys</p>
                  <p>• Self-sign feeds locally</p>
                  <p>• Full control over signing process</p>
                </div>
                <Link 
                  href="/sdk"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Use SDK & Tools
                </Link>
              </div>

              {/* Enterprise Path */}
              <div className="bg-white border border-green-200 rounded-lg p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-800 mb-3 text-center">🏢 Enterprise</h4>
                <div className="space-y-2 text-sm text-green-700 mb-4">
                  <p>• LLMCA certification program</p>
                  <p>• Hardware security modules</p>
                  <p>• Compliance & audit support</p>
                </div>
                <a 
                  href="mailto:enterprise@wellknownmcp.org"
                  className="block w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Contact Enterprise
                </a>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-gray-800">🛠️ Coming Soon: Enhanced Tooling</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p>• <strong>No-code signing:</strong> Visual interface for signatures</p>
                  <p>• <strong>Key hosting:</strong> LLMCA public key hosting service</p>
                  <p>• <strong>SDK improvements:</strong> One-line signing integration</p>
                </div>
                <div className="space-y-2">
                  <p>• <strong>Browser extension:</strong> Sign feeds from any page</p>
                  <p>• <strong>CI/CD integration:</strong> Automated signing pipelines</p>
                  <p>• <strong>Verification dashboard:</strong> Monitor trust status</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-3">
                📧 Want early access? Contact <a href="mailto:opensource@wellknownmcp.org" className="text-blue-600 hover:underline">opensource@wellknownmcp.org</a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Share & Export */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/tools/export-explained"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
            >
              Learn Export Concepts
            </Link>
            <Link 
              href="/verify"
              className="bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-lg font-medium transition-colors text-center"
            >
              Verify a Feed
            </Link>
            <ExportToLLMButton 
              context="current"
              variant="developer"
              showSignatureStatus
              customLabel="Export This Guide"
            />
          </div>

          <ShareButtons />
        </div>
      </div>
    </div>
  )
}