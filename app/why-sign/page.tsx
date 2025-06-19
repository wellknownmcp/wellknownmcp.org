import SeoHead from '@/components/SeoHead'
import { PageTitle } from '@/components/PageTitle'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { CopyButton } from '@/components/CopyButton'
import Link from 'next/link'
import { 
  Shield, Lock, AlertTriangle, CheckCircle, Users, 
  Zap, Globe, Award, ArrowRight, ExternalLink,
  FileCheck, Building, Eye, Star, Crown, Key
} from 'lucide-react'

export default function WhySignPage() {
  return (
    <>
      <SeoHead
        title="Why Sign MCP Feeds? - Trust Foundation for the Agent Web | WellKnownMCP"
        description="Why signing is essential for building a trusted, interoperable Agentic Web with MCP. Learn cryptographic verification, trust levels, and enterprise security patterns."
        keywords={[
          'MCP signature',
          'cryptographic trust',
          'agent web security',
          'feed verification',
          'trust layers',
          'MCP certification',
          'Ed25519 signing',
          'agentic web trust',
          'LLMCA delegation',
          'enterprise MCP'
        ]}
        llmIntent="understand-mcp-security"
        llmTopic="why-cryptographic-signing-essential-for-mcp-feeds-trust-verification-agent-web"
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageTitle
          title="Why Sign MCP Feeds?"
          subtitle="Trust Foundation for the Agent Web"
        />

        {/* Hero Problem/Solution */}
        <div className="mb-12 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border border-red-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-900">The Trust Problem</h2>
              <p className="text-red-700">Why the agent web needs cryptographic verification</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-red-200">
              <h3 className="font-semibold text-red-900 mb-3">🚨 Without Signatures</h3>
              <ul className="space-y-2 text-sm text-red-800">
                <li>• <strong>No provenance:</strong> Who really published this feed?</li>
                <li>• <strong>No integrity:</strong> Has it been tampered with?</li>
                <li>• <strong>No trust scoring:</strong> All feeds look identical</li>
                <li>• <strong>Security risks:</strong> Agents can't verify authenticity</li>
                <li>• <strong>Enterprise blockers:</strong> No audit trail or compliance</li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">✅ With Signatures</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• <strong>Cryptographic proof:</strong> Verifiable publisher identity</li>
                <li>• <strong>Tamper detection:</strong> Any modification breaks signature</li>
                <li>• <strong>Trust hierarchy:</strong> Clear trust levels for agents</li>
                <li>• <strong>Safe interoperability:</strong> Agents exchange feeds securely</li>
                <li>• <strong>Enterprise ready:</strong> Audit trails and compliance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Visual Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Signed vs Unsigned: Visual Comparison</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Unsigned Feed */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-bold text-red-900">Unsigned Feed</h3>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                  Risky
                </span>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-xs overflow-x-auto">
{`{
  "feed_type": "mcp",
  "metadata": {
    "title": "API Service",
    "origin": "https://api.example.com"
  },
  "capabilities": [
    {
      "path": "/data",
      "method": "GET",
      "intent": "fetch_data"
    }
  ]
  // No trust block!
  // No signature!
  // No verification possible!
}`}
                </pre>
              </div>
              
              <div className="text-sm text-red-700">
                <p className="font-medium mb-2">⚠️ Agent perspective:</p>
                <ul className="space-y-1 text-xs">
                  <li>• "Who published this?"</li>
                  <li>• "Is this legitimate?"</li>
                  <li>• "Can I trust this data?"</li>
                  <li>• "Has it been modified?"</li>
                </ul>
              </div>
            </div>

            {/* Signed Feed */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-green-900">Signed Feed</h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  Trusted
                </span>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-xs overflow-x-auto">
{`{
  "feed_type": "mcp",
  "metadata": {
    "title": "API Service",
    "origin": "https://api.example.com"
  },
  "capabilities": [...],
  "trust": {
    "signed_blocks": ["metadata", "capabilities"],
    "trust_level": "certified",
    "scope": "restricted",
    "certifier": "https://llmca.org"
  },
  "signature": {
    "algorithm": "ed25519",
    "public_key_hint": "https://example.com/public.pem",
    "value": "base64-signature-value...",
    "created_at": "2025-06-19T10:30:00Z"
  }
}`}
                </pre>
              </div>
              
              <div className="text-sm text-green-700">
                <p className="font-medium mb-2">✅ Agent perspective:</p>
                <ul className="space-y-1 text-xs">
                  <li>• "Verified by LLMCA ✓"</li>
                  <li>• "Publisher: example.com ✓"</li>
                  <li>• "Integrity verified ✓"</li>
                  <li>• "Trust level: certified ✓"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Hierarchy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Trust Hierarchy</h2>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">0</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">Unsigned</h3>
                  <p className="text-gray-600">Anyone can publish — no guarantee of authenticity</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-500">0%</div>
                  <div className="text-xs text-gray-500">Trust Score</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-900">Self-Signed</h3>
                  <p className="text-blue-700">Feed signed by publisher's own cryptographic key</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">65%</div>
                  <div className="text-xs text-blue-600">Trust Score</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-green-900">Certified</h3>
                  <p className="text-green-700">Self-signed AND certified by recognized authority (LLMCA)</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-xs text-green-600">Trust Score</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-purple-900">Enterprise Certified</h3>
                  <p className="text-purple-700">Full enterprise verification with SOC2, compliance audit</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">99%</div>
                  <div className="text-xs text-purple-600">Trust Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Matrix */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💎 Why Each Feed Type Needs Signing</h2>
          
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Feed Type</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Why Sign?</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Criticality</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-600" />
                        <strong>MCP</strong>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      Active endpoint verification - agents must trust capabilities and API access
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        Critical
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-purple-600" />
                        <strong>Credential</strong>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      API access and permissions - security-critical for agent authorization
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        Critical
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-green-600" />
                        <strong>Capabilities</strong>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      Tool definitions and API contracts - prevents malicious capability injection
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                        High
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-indigo-600" />
                        <strong>Export</strong>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      Content authenticity and source verification for agent consumption
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        Medium
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-orange-600" />
                        <strong>Prompt</strong>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      Trusted prompt sharing and behavioral instruction verification
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        Medium
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Enterprise Use Cases */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏢 Enterprise Use Cases</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-bold text-indigo-900">Education & Professional Credentials</h3>
              </div>
              <div className="text-sm text-indigo-800 space-y-2">
                <p><strong>Challenge:</strong> Manual verification of degrees and work experience</p>
                <p><strong>Solution:</strong> Institutional feeds for academic and professional credentials</p>
                <ul className="mt-3 space-y-1 text-xs">
                  <li>• <strong>Universities:</strong> Harvard MBA, Stanford CS degrees with GPA</li>
                  <li>• <strong>GAFAM:</strong> Google, Meta, Apple verify former employees</li>
                  <li>• <strong>AI Giants:</strong> OpenAI, Anthropic certify team alumni</li>
                  <li>• Instant verification for employers and recruiters</li>
                  <li>• Anti-fraud through tamper-proof professional records</li>
                  <li>• Automated background check integration</li>
                </ul>
                <div className="mt-3 p-2 bg-white rounded border border-indigo-200">
                  <p className="text-xs text-indigo-700">
                    <strong>Examples:</strong><br/>
                    • "Jane Smith, Harvard MBA 2024, GPA 3.8, Magna Cum Laude" - hbs.edu signature<br/>
                    • "John Doe, Senior Engineer at Google 2020-2023" - google.com signature<br/>
                    • "Sarah Johnson, AI Researcher at OpenAI 2022-2024" - openai.com signature
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-blue-900">Financial Services</h3>
              </div>
              <div className="text-sm text-blue-800 space-y-2">
                <p><strong>Challenge:</strong> Regulatory compliance and audit requirements</p>
                <p><strong>Solution:</strong> Signed feeds provide complete audit trail</p>
                <ul className="mt-3 space-y-1 text-xs">
                  <li>• SOX compliance through cryptographic verification</li>
                  <li>• Immutable transaction feed signatures</li>
                  <li>• Agent authorization with certified credentials</li>
                  <li>• Real-time audit trail for regulatory reporting</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-green-900">Healthcare</h3>
              </div>
              <div className="text-sm text-green-800 space-y-2">
                <p><strong>Challenge:</strong> HIPAA compliance and patient data security</p>
                <p><strong>Solution:</strong> Certified feeds ensure data integrity</p>
                <ul className="mt-3 space-y-1 text-xs">
                  <li>• Patient data feeds with tamper-proof signatures</li>
                  <li>• Medical device API verification</li>
                  <li>• Healthcare provider credential validation</li>
                  <li>• Secure agent-to-agent medical data exchange</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-bold text-purple-900">E-commerce</h3>
              </div>
              <div className="text-sm text-purple-800 space-y-2">
                <p><strong>Challenge:</strong> Trust in automated purchasing and inventory</p>
                <p><strong>Solution:</strong> Verified product and pricing feeds</p>
                <ul className="mt-3 space-y-1 text-xs">
                  <li>• Certified product catalog feeds</li>
                  <li>• Verified pricing and inventory data</li>
                  <li>• Secure payment processing credentials</li>
                  <li>• Anti-fraud through signature verification</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-bold text-orange-900">Media & Publishing</h3>
              </div>
              <div className="text-sm text-orange-800 space-y-2">
                <p><strong>Challenge:</strong> Content authenticity and copyright protection</p>
                <p><strong>Solution:</strong> Signed content feeds with provenance</p>
                <ul className="mt-3 space-y-1 text-xs">
                  <li>• Verified news article feeds</li>
                  <li>• Copyright-protected content distribution</li>
                  <li>• Anti-misinformation through source verification</li>
                  <li>• Journalist credential and byline verification</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-6 h-6 text-teal-600" />
                <h3 className="text-lg font-bold text-teal-900">Supply Chain</h3>
              </div>
              <div className="text-sm text-teal-800 space-y-2">
                <p><strong>Challenge:</strong> Product authenticity and traceability verification</p>
                <p><strong>Solution:</strong> Manufacturer-signed product feeds</p>
                <ul className="mt-3 space-y-1 text-xs">
                  <li>• Anti-counterfeiting through origin verification</li>
                  <li>• Supply chain transparency and tracking</li>
                  <li>• Quality assurance and certification feeds</li>
                  <li>• Automated compliance and safety verification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔧 How to Sign Your Feeds</h2>
          
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 border border-gray-200">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">🚀 Option 1: Quick Start</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Use LLMFeedForge</h4>
                    <p className="text-sm text-gray-600 mb-3">Visual builder with one-click signing</p>
                    <a 
                      href="https://llmfeedforge.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Try LLMFeedForge
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Delegated Signatures</h4>
                    <p className="text-sm text-gray-600 mb-3">Email-verified signing for individuals</p>
                    <Link 
                      href="/tools/certification-process"
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Learn Process
                    </Link>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">💻 Option 2: Developer</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Self-Signing</h4>
                    <p className="text-sm text-gray-600 mb-3">Generate your own Ed25519 keys</p>
                    <Link 
                      href="/tools/sign-and-verify"
                      className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Signing Guide
                    </Link>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Validation Tools</h4>
                    <p className="text-sm text-gray-600 mb-3">CLI, IDE, and CI/CD integration</p>
                    <Link 
                      href="/tools/validation-tools"
                      className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Explore Tools
                    </Link>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">🏢 Option 3: Enterprise</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">LLMCA Certification</h4>
                    <p className="text-sm text-gray-600 mb-3">Third-party verification and compliance</p>
                    <Link 
                      href="/tools/certification-process"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Get Certified
                    </Link>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">SDK Integration</h4>
                    <p className="text-sm text-gray-600 mb-3">Programmatic signing and validation</p>
                    <Link 
                      href="/sdk"
                      className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      SDK Docs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step by Step Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Step-by-Step Signing Process</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Generate Key Pair</h3>
                <p className="text-sm text-gray-600 mb-3">Create Ed25519 public/private key pair for cryptographic signing</p>
                <div className="bg-gray-900 rounded-lg p-3">
                  <pre className="text-green-400 text-xs">
{`# Using OpenSSL
openssl genpkey -algorithm Ed25519 -out private.pem
openssl pkey -in private.pem -pubout -out public.pem`}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Structure Your Feed</h3>
                <p className="text-sm text-gray-600 mb-3">Create your MCP feed with proper metadata and capabilities</p>
                <div className="text-xs text-gray-500">
                  Use <Link href="/tools/schema" className="text-blue-600 hover:underline">schema validation</Link> to ensure compliance
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Add Trust Block</h3>
                <p className="text-sm text-gray-600 mb-3">Include trust metadata specifying which blocks are signed</p>
                <div className="bg-gray-900 rounded-lg p-3">
                  <pre className="text-green-400 text-xs">
{`"trust": {
  "signed_blocks": ["metadata", "capabilities"],
  "trust_level": "signed",
  "scope": "restricted"
}`}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Generate Signature</h3>
                <p className="text-sm text-gray-600 mb-3">Sign the canonical JSON representation of specified blocks</p>
                <div className="text-xs text-gray-500">
                  See <Link href="/tools/sign-and-verify" className="text-blue-600 hover:underline">detailed signing guide</Link> for implementation
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Publish & Serve</h3>
                <p className="text-sm text-gray-600 mb-3">Deploy to /.well-known/mcp.llmfeed.json and make public key accessible</p>
                <div className="text-xs text-gray-500">
                  Use <Link href="/llmfeedhub" className="text-blue-600 hover:underline">LLMFeedHub</Link> to test your signed feed
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg p-6">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                6
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Optional: Get Certified</h3>
                <p className="text-sm text-gray-600 mb-3">Request LLMCA certification for maximum trust and enterprise compliance</p>
                <Link 
                  href="/tools/certification-process"
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Certification Process
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* The Vision */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🌍 The Vision: HTTPS for the Agent Web</h2>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-4">From Chaos to Trust</h3>
              <p className="text-lg text-indigo-800 max-w-2xl mx-auto">
                Just like HTTPS transformed the web from insecure to trusted, 
                signed MCP feeds will transform the agent web from chaotic to reliable.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-indigo-900 mb-4">🔓 Before HTTPS (1990s Web)</h4>
                <ul className="space-y-2 text-sm text-indigo-800">
                  <li>• Plain text communication</li>
                  <li>• No identity verification</li>
                  <li>• Easy to intercept and modify</li>
                  <li>• No trust indicators</li>
                  <li>• Enterprise adoption blocked</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-indigo-900 mb-4">🔒 After HTTPS (Modern Web)</h4>
                <ul className="space-y-2 text-sm text-indigo-800">
                  <li>• Encrypted communication</li>
                  <li>• Certificate-based identity</li>
                  <li>• Tamper-proof connections</li>
                  <li>• Clear trust indicators (🔒)</li>
                  <li>• Universal enterprise adoption</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-indigo-200">
              <div className="text-center">
                <h4 className="font-semibold text-indigo-900 mb-4">🚀 The Agent Web Future</h4>
                <p className="text-indigo-800 max-w-3xl mx-auto">
                  Signed MCP feeds will become as fundamental as HTTPS certificates. 
                  Agents will automatically verify authenticity, enterprises will require signatures for compliance, 
                  and users will see clear trust indicators for AI interactions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mb-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-green-900 mb-4">🚀 Ready to Build the Trusted Agent Web?</h2>
            <p className="text-lg text-green-800 max-w-2xl mx-auto">
              Join thousands of developers building the next generation of AI-readable, trustworthy web infrastructure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-900 mb-2">Start Signing Today</h3>
              <p className="text-sm text-green-700 mb-4">Get your first signed feed running in minutes</p>
              <a 
                href="https://llmfeedforge.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Try LLMFeedForge
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-green-900 mb-2">Learn the Process</h3>
              <p className="text-sm text-green-700 mb-4">Master cryptographic signing and certification</p>
              <Link 
                href="/tools/sign-and-verify"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Signing Guide
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-green-900 mb-2">Join the Movement</h3>
              <p className="text-sm text-green-700 mb-4">Connect with other pioneers building the agent web</p>
              <Link 
                href="/join"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>

        {/* Export & Share */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">📤 Share This Guide</h2>
            <ExportToLLMButton 
              context="static"
              showSignatureStatus
              customLabel="Export Signing Guide"
            />
          </div>
          
          <ShareButtons 
            title="Why Sign MCP Feeds? - Trust Foundation for the Agent Web"
            hashtags={['MCPSigning', 'AgentWeb', 'Trust', 'Security', 'AI']}
          />
        </div>
      </div>
    </>
  )
}