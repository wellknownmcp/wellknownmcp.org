import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CopyBlock } from '@/components/blocks/CopyBlock'
import { 
  Key, Shield, Lock, AlertTriangle, CheckCircle, Users, 
  ArrowRight, Eye, Target, Layers, Settings, Brain, 
  Database, Server, Globe, Award, Zap, Terminal,
  FileCheck, Package, Crown, Star, ExternalLink, Rocket,
  RefreshCw, UserCheck, Clock, AlertCircle
} from 'lucide-react'

export default function CredentialExplainedPage() {
  
  const traditionalApproach = `# Traditional API Key Usage - Problems
export API_KEY="sk_live_abc123def456..."
curl -H "Authorization: Bearer $API_KEY" https://api.example.com/data

# Problems:
❌ No ownership verification
❌ No integrity checking 
❌ No context or scope information
❌ Unsafe transfer between systems
❌ No audit trail
❌ Manual expiry management`;

  const credentialFeedExample = `{
  "feed_type": "credential",
  "metadata": {
    "title": "Analytics API Access",
    "origin": "https://analytics.example.com",
    "generated_at": "2025-06-19T10:30:00Z",
    "expires_at": "2025-12-19T10:30:00Z"
  },
  "credential": {
    "key_hint": "anl_pro_...9k4m",
    "mcp_api": "https://analytics.example.com/.well-known/mcp-api.llmfeed.json",
    "allowed_intents": [
      "read_reports",
      "create_dashboards", 
      "export_data"
    ],
    "excluded_intents": ["admin_access", "billing_management"],
    "rate_limits": {
      "requests_per_minute": 500,
      "data_export_per_day": "10GB"
    },
    "delegation_enabled": true,
    "validation_endpoint": "https://analytics.example.com/api/validate"
  },
  "trust": {
    "signed_blocks": ["metadata", "credential", "trust"],
    "trust_level": "certified",
    "scope": "restricted",
    "certifier": "https://llmca.org"
  },
  "signature": {
    "algorithm": "ed25519",
    "value": "base64-signature-value...",
    "created_at": "2025-06-19T10:30:00Z"
  }
}`;

  const delegationExample = `{
  "credential": {
    "delegation_enabled": true,
    "delegation_rules": [
      {
        "target_agent": "analytics.specialist.ai",
        "allowed_intents": ["read_reports"],
        "max_duration": "1h",
        "audit_trail": true
      }
    ],
    "delegation_endpoint": "https://api.example.com/delegate"
  }
}`;

  const enterpriseExample = `{
  "feed_type": "credential",
  "metadata": {
    "title": "Enterprise CRM Access",
    "origin": "https://crm.enterprise.com"
  },
  "credential": {
    "auth_method": "sso",
    "sso_provider": "okta",
    "user_context": "service-account@company.com",
    "mcp_api": "https://crm.enterprise.com/.well-known/mcp-api.llmfeed.json",
    "allowed_intents": ["read_contacts", "create_leads", "update_opportunities"],
    "session_duration": "8h",
    "refresh_token_available": true
  },
  "compliance": {
    "certifications": ["SOC2", "GDPR"],
    "audit_logging": true,
    "data_residency": "EU"
  }
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SeoHead 
          title="🔑 Credential Explained | Secure API Access for AI Agents"
          description="Master secure API credential management for AI agents: cryptographic integrity, scoped permissions, delegation patterns, and enterprise-grade security with LLMFeed credential feeds."
          canonicalUrl="https://wellknownmcp.org/tools/credential-explained"
          keywords={[
            "credential feeds",
            "api credential security",
            "ai agent authentication",
            "scoped api access",
            "cryptographic credentials", 
            "agent delegation",
            "api key management",
            "secure credential transfer",
            "enterprise api security",
            "llmfeed credentials"
          ]}
          ogImage="/og/credential-explained.png"
          llmIntent="understand-credentials"
          llmTopic="secure-api-access"
          pageType="tool"
          seoMode="technical"
        />

        <PageTitle
          title="🔑 Credential Explained"
          subtitle="Secure API access for AI agents with cryptographic integrity and scoped permissions"
        />

        {/* The API Key Problem */}
        <Card className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              The Traditional API Key Problem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-red-700">
              <p className="mb-4">
                Traditional API keys are <strong>fundamentally insecure</strong> for agent-to-agent workflows. 
                They're just strings with no context, verification, or audit capabilities.
              </p>
            </div>

            <CopyBlock
              content={traditionalApproach}
              language="bash"
            />

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-red-700 mb-3">❌ Critical Problems</h4>
                <div className="space-y-2 text-sm text-red-600">
                  <p>• <strong>No provenance:</strong> Who issued this key?</p>
                  <p>• <strong>No verification:</strong> Is it authentic and unmodified?</p>
                  <p>• <strong>No scope:</strong> What can it actually access?</p>
                  <p>• <strong>Unsafe transfer:</strong> Copy-paste between agents</p>
                  <p>• <strong>No audit trail:</strong> Who used it when?</p>
                  <p>• <strong>Manual management:</strong> Expiry, rotation, revocation</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ Agent Requirements</h4>
                <div className="space-y-2 text-sm text-green-600">
                  <p>• <strong>Cryptographic proof:</strong> Verify authenticity</p>
                  <p>• <strong>Rich context:</strong> Permissions, limits, scope</p>
                  <p>• <strong>Secure transfer:</strong> Agent-to-agent delegation</p>
                  <p>• <strong>Autonomous validation:</strong> Self-verifying credentials</p>
                  <p>• <strong>Complete audit:</strong> Full provenance tracking</p>
                  <p>• <strong>Enterprise compliance:</strong> SOX, GDPR, SOC2</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credential Feeds Solution */}
        <Card className="mb-8 border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Shield className="w-5 h-5" />
              Credential Feeds: The Agent-Native Solution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-blue-700">
              <p className="mb-4 text-lg">
                <strong>Credential feeds</strong> package API access with cryptographic integrity, 
                rich context, and autonomous verification capabilities designed for agent workflows.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white border border-blue-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-800 mb-2">Cryptographic Integrity</h4>
                <p className="text-sm text-blue-600">Signed with Ed25519, tamper-proof verification</p>
              </div>
              
              <div className="bg-white border border-blue-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-blue-800 mb-2">Scoped Permissions</h4>
                <p className="text-sm text-blue-600">Granular control over what agents can do</p>
              </div>
              
              <div className="bg-white border border-blue-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-blue-800 mb-2">Agent Delegation</h4>
                <p className="text-sm text-blue-600">Secure transfer between specialized agents</p>
              </div>
            </div>

            <div className="bg-white border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                How It Works
              </h4>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Key className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="font-medium">1. Generate</p>
                  <p className="text-xs text-gray-600">Create signed credential feed</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="font-medium">2. Verify</p>
                  <p className="text-xs text-gray-600">Agent validates signature</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="font-medium">3. Scope Check</p>
                  <p className="text-xs text-gray-600">Validate permissions & limits</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="font-medium">4. Execute</p>
                  <p className="text-xs text-gray-600">Safe API calls with audit</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Structure Example */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" />
              Credential Feed Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              A complete credential feed includes metadata, scoped permissions, rate limits, 
              and cryptographic signatures for autonomous agent verification:
            </p>
            
            <CopyBlock
              content={credentialFeedExample}
              language="json"
            />

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <h5 className="font-semibold text-cyan-800 mb-3">🔒 Security Fields</h5>
                <div className="text-xs text-cyan-700 space-y-1">
                  <p>• <strong>key_hint:</strong> Partial identifier (never full key)</p>
                  <p>• <strong>mcp_api:</strong> Scoped API endpoint URL</p>
                  <p>• <strong>validation_endpoint:</strong> Remote revocation check</p>
                  <p>• <strong>signature:</strong> Ed25519 cryptographic proof</p>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h5 className="font-semibold text-green-800 mb-3">🎯 Permission Fields</h5>
                <div className="text-xs text-green-700 space-y-1">
                  <p>• <strong>allowed_intents:</strong> What agent can do</p>
                  <p>• <strong>excluded_intents:</strong> Explicit prohibitions</p>
                  <p>• <strong>rate_limits:</strong> Usage boundaries</p>
                  <p>• <strong>expires_at:</strong> Automatic expiry</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Comparison */}
        <Card className="mb-8 border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Award className="w-5 h-5" />
              Security Comparison: Traditional vs Credential Feeds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-green-200">
                    <th className="text-left py-3 px-4 font-semibold text-green-800">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold text-red-700">Traditional API Keys</th>
                    <th className="text-center py-3 px-4 font-semibold text-green-700">LLMFeed Credentials</th>
                  </tr>
                </thead>
                <tbody className="text-green-700">
                  <tr className="border-b border-green-100">
                    <td className="py-3 px-4 font-medium">Integrity Verification</td>
                    <td className="text-center py-3 px-4 text-red-600">❌ No verification</td>
                    <td className="text-center py-3 px-4 text-green-600">✅ Cryptographic signature</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="py-3 px-4 font-medium">Ownership Proof</td>
                    <td className="text-center py-3 px-4 text-red-600">❌ Unknown provenance</td>
                    <td className="text-center py-3 px-4 text-green-600">✅ Verified issuer</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="py-3 px-4 font-medium">Context & Scope</td>
                    <td className="text-center py-3 px-4 text-red-600">❌ Just a string</td>
                    <td className="text-center py-3 px-4 text-green-600">✅ Full permissions, expiry</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="py-3 px-4 font-medium">Secure Transfer</td>
                    <td className="text-center py-3 px-4 text-red-600">❌ Copy-paste unsafe</td>
                    <td className="text-center py-3 px-4 text-green-600">✅ Secure signed capsule</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="py-3 px-4 font-medium">Audit Trail</td>
                    <td className="text-center py-3 px-4 text-red-600">❌ No trail</td>
                    <td className="text-center py-3 px-4 text-green-600">✅ Complete provenance</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="py-3 px-4 font-medium">Agent Autonomy</td>
                    <td className="text-center py-3 px-4 text-red-600">❌ Manual management</td>
                    <td className="text-center py-3 px-4 text-green-600">✅ Self-verifying agents</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="py-3 px-4 font-medium">Revocation</td>
                    <td className="text-center py-3 px-4 text-red-600">❌ Hard to track</td>
                    <td className="text-center py-3 px-4 text-green-600">✅ Remote validation</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Delegation</td>
                    <td className="text-center py-3 px-4 text-red-600">❌ All-or-nothing</td>
                    <td className="text-center py-3 px-4 text-green-600">✅ Scoped permissions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Agent Delegation */}
        <Card className="mb-8 border-purple-200 bg-purple-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Users className="w-5 h-5" />
              Agent Delegation: Secure Multi-Agent Workflows
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-purple-700">
              <p className="mb-4">
                <strong>Agent delegation</strong> enables secure credential sharing between specialized agents 
                with granular permission control and full audit trails.
              </p>
            </div>

            <div className="bg-white border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-purple-600" />
                Delegation Workflow
              </h4>
              <div className="grid md:grid-cols-5 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <UserCheck className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="font-medium">1. Primary Agent</p>
                  <p className="text-xs text-gray-600">Receives credential feed</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Eye className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="font-medium">2. Evaluate Rules</p>
                  <p className="text-xs text-gray-600">Check delegation permissions</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Server className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="font-medium">3. Request Token</p>
                  <p className="text-xs text-gray-600">Via delegation endpoint</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="font-medium">4. Specialized Agent</p>
                  <p className="text-xs text-gray-600">Receives scoped credential</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Database className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="font-medium">5. Audit Log</p>
                  <p className="text-xs text-gray-600">Complete provenance trail</p>
                </div>
              </div>
            </div>

            <CopyBlock
              content={delegationExample}
              language="json"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-800 mb-3">✅ Use Cases</h4>
                <div className="space-y-2 text-sm text-purple-700">
                  <p>• <strong>Marketing → Analytics:</strong> Report generation</p>
                  <p>• <strong>Sales → CRM:</strong> Lead qualification</p>
                  <p>• <strong>Support → Knowledge:</strong> Documentation search</p>
                  <p>• <strong>Finance → Audit:</strong> Compliance reporting</p>
                  <p>• <strong>Security → Monitoring:</strong> Threat assessment</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-purple-800 mb-3">🛡️ Security Controls</h4>
                <div className="space-y-2 text-sm text-purple-700">
                  <p>• <strong>Time limits:</strong> Max delegation duration</p>
                  <p>• <strong>Scope restriction:</strong> Limited intents only</p>
                  <p>• <strong>Audit requirements:</strong> Full action logging</p>
                  <p>• <strong>Revocation:</strong> Instant delegation cancellation</p>
                  <p>• <strong>Chain limits:</strong> Prevent deep delegation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enterprise Patterns */}
        <Card className="mb-8 border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Crown className="w-5 h-5" />
              Enterprise Integration Patterns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="text-orange-700">
              <p className="mb-4">
                Enterprise credential feeds integrate with existing identity systems, 
                compliance frameworks, and security policies.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white border border-orange-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-orange-800 mb-2">SSO Integration</h4>
                <p className="text-sm text-orange-600">Okta, Azure AD, SAML, OAuth2</p>
              </div>
              
              <div className="bg-white border border-orange-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-orange-800 mb-2">Compliance</h4>
                <p className="text-sm text-orange-600">SOC2, GDPR, HIPAA, SOX</p>
              </div>
              
              <div className="bg-white border border-orange-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-orange-800 mb-2">Audit Trails</h4>
                <p className="text-sm text-orange-600">Complete action logging</p>
              </div>
            </div>

            <CopyBlock
              content={enterpriseExample}
              language="json"
            />

            <div className="bg-white border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-orange-800">🏢 Enterprise Benefits</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p>• <strong>Centralized identity:</strong> Leverage existing SSO</p>
                  <p>• <strong>Policy enforcement:</strong> Automated compliance</p>
                  <p>• <strong>Risk management:</strong> Granular permission control</p>
                </div>
                <div className="space-y-2">
                  <p>• <strong>Audit automation:</strong> Built-in logging</p>
                  <p>• <strong>Cost optimization:</strong> Usage-based billing</p>
                  <p>• <strong>Incident response:</strong> Instant revocation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Patterns */}
        <Card className="mb-8 border-gray-200 bg-gray-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Terminal className="w-5 h-5" />
              Implementation Patterns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Basic Implementation */}
              <div className="bg-white border border-blue-200 rounded-lg p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileCheck className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-800 mb-3 text-center">🚀 Basic</h4>
                <div className="space-y-2 text-sm text-blue-700 mb-4">
                  <p>• Simple API key packaging</p>
                  <p>• Basic signature validation</p>
                  <p>• Manual credential generation</p>
                </div>
                <Link 
                  href="/tools/sign-and-verify"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Learn Signing
                </Link>
              </div>

              {/* LLMFeedForge Integration */}
              <div className="bg-white border border-green-200 rounded-lg p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-800 mb-3 text-center">⚡ LLMFeedForge</h4>
                <div className="space-y-2 text-sm text-green-700 mb-4">
                  <p>• Visual credential builder</p>
                  <p>• Automatic signing workflow</p>
                  <p>• Template-based generation</p>
                </div>
                <a 
                  href="https://llmfeedforge.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Use LLMFeedForge
                </a>
              </div>

              {/* Enterprise SDK */}
              <div className="bg-white border border-purple-200 rounded-lg p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-purple-800 mb-3 text-center">🏢 Enterprise</h4>
                <div className="space-y-2 text-sm text-purple-700 mb-4">
                  <p>• SDK integration</p>
                  <p>• Automated workflows</p>
                  <p>• Enterprise support</p>
                </div>
                <Link 
                  href="/sdk"
                  className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Explore SDK
                </Link>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-gray-800">🔄 Credential Lifecycle</h4>
              <div className="grid md:grid-cols-6 gap-2 text-sm">
                <div className="text-center">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <p className="font-medium text-xs">Generate</p>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <p className="font-medium text-xs">Sign</p>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <p className="font-medium text-xs">Distribute</p>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <p className="font-medium text-xs">Validate</p>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold">5</span>
                  </div>
                  <p className="font-medium text-xs">Execute</p>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-xs font-bold">6</span>
                  </div>
                  <p className="font-medium text-xs">Audit</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-800">
              <Zap className="w-5 h-5" />
              Ready to Implement Secure Credentials?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="text-cyan-700">
              <p className="mb-4">
                Start with your current API keys and transform them into secure, 
                agent-ready credential feeds with full cryptographic integrity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-cyan-800 mb-3">🚀 Quick Start</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/tools/sign-and-verify" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800">
                    <ArrowRight className="w-3 h-3" />
                    Learn cryptographic signing
                  </Link>
                  <a href="https://llmfeedforge.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800">
                    <ArrowRight className="w-3 h-3" />
                    Generate with LLMFeedForge
                  </a>
                  <Link href="/tools/schema" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800">
                    <ArrowRight className="w-3 h-3" />
                    Validate with schemas
                  </Link>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-cyan-800 mb-3">🏢 Enterprise</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/sdk" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800">
                    <ArrowRight className="w-3 h-3" />
                    SDK integration patterns
                  </Link>
                  <a href="mailto:enterprise@wellknownmcp.org" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800">
                    <ArrowRight className="w-3 h-3" />
                    Enterprise consulting
                  </a>
                  <Link href="/tools/capabilities-explained" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800">
                    <ArrowRight className="w-3 h-3" />
                    Build API capabilities
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 border-t border-cyan-200">
              <a 
                href="https://llmfeedforge.org" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Generate Credential Feed
              </a>
              <Link 
                href="/tools/sign-and-verify"
                className="bg-white border border-cyan-300 text-cyan-700 hover:bg-cyan-50 px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Learn Signing Process
              </Link>
              <ExportToLLMButton 
                context="current"
                variant="developer"
                showSignatureStatus
                customLabel="Export This Guide"
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