import { PageTitle } from "@/components/PageTitle";
import SeoHead from "@/components/SeoHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExportToLLMButton } from "@/components/ExportToLLMButton";
import Link from "next/link";
import { Zap, Shield, Key, Bot, ArrowRight, CheckCircle, XCircle, Network, Globe, Lock, Settings, Target, Eye, Coins, Users, Clock, AlertTriangle } from "lucide-react";

export default function APIExplainedRevolutionaryPage() {
  return (
    <>
      <SeoHead
        title="🔐 API Integration Explained | Agent-Native Web Revolution"
        description="Revolutionary MCP protocol integration: progressive autonomy, cryptographic credentials, agent delegation, and autonomous service discovery. The future of agent-API interaction."
        canonicalUrl="https://wellknownmcp.org/tools/api-explained"
        keywords={[
          "agent API discovery",
          "MCP protocol integration", 
          "credential-based access control",
          "autonomous agent configuration",
          "progressive service discovery",
          "cryptographic credential management",
          "agent-to-agent delegation",
          "self-verifying API credentials",
          "autonomous credential management",
          "MCP web-scale integration",
          "progressive agent autonomy",
          "credential delegation patterns"
        ]}
        llmlang="en"
        llmIntent="understand revolutionary agent API integration systems"
        llmTopic="advanced MCP protocol integration with autonomous agents"
      />

      <div className="max-w-4xl mx-auto py-10 space-y-12">
        <PageTitle
          title="🔐 API Integration Explained"
          subtitle="Revolutionary agent-native web integration with MCP protocol"
        />

        {/* Hero Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-blue-700">Autonomy Levels</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-sm text-green-700">Self-Verifying</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">∞</div>
            <div className="text-sm text-purple-700">Agent Delegation</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">Real-time</div>
            <div className="text-sm text-orange-700">Discovery</div>
          </div>
        </div>

        {/* Quick Navigation */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Revolutionary Integration Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-2">🚀 Core Revolution</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li><a href="#progressive-autonomy" className="hover:text-blue-600">• Progressive Autonomy</a></li>
                  <li><a href="#cryptographic-credentials" className="hover:text-blue-600">• Cryptographic Credentials</a></li>
                  <li><a href="#agent-delegation" className="hover:text-blue-600">• Agent Delegation</a></li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">⚡ Integration Patterns</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li><a href="#openapi-bridge" className="hover:text-blue-600">• OpenAPI Bridge</a></li>
                  <li><a href="#credential-bundles" className="hover:text-blue-600">• Credential Bundles</a></li>
                  <li><a href="#implementation" className="hover:text-blue-600">• Implementation Guide</a></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revolution Framework */}
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Zap className="h-8 w-8 text-blue-600" />
              The Agent-API Revolution
              <span className="text-lg font-normal text-muted-foreground">— Beyond Traditional Integration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700">
              Traditional API integration assumes human oversight at every step. LLMFeed's <strong>revolutionary MCP protocol integration</strong> enables <strong>progressive agent autonomy</strong> — from assisted discovery to fully autonomous credential management and service orchestration.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                <Bot className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-blue-800">Progressive Autonomy</h3>
                <p className="text-sm text-blue-600">From manual config to full agent independence</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-green-800">Cryptographic Trust</h3>
                <p className="text-sm text-green-600">Self-verifying credential management</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
                <Network className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-purple-800">Agent Delegation</h3>
                <p className="text-sm text-purple-600">Secure agent-to-agent workflows</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                Building on MCP Excellence
              </h4>
              <p className="text-sm text-gray-600">
                LLMFeed extends Anthropic's <strong>outstanding Model Context Protocol</strong> from local tool calling to web-scale service discovery. 
                We enhance MCP's robust JSON-RPC foundation with cryptographic trust, progressive autonomy, and multi-LLM compatibility — creating the complete agent-service integration stack.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Progressive Autonomy Levels */}
        <Card id="progressive-autonomy" className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-6 w-6 text-green-600" />
              Progressive Autonomy Revolution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              The future of agent-API integration isn't binary — it's a <strong>progressive journey</strong> from human-guided discovery to fully autonomous service orchestration.
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-yellow-400 pl-4 bg-yellow-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Level 1: Agent-Assisted Discovery (2025)
                </h4>
                <div className="text-sm text-yellow-700 space-y-2">
                  <p><strong>Scenario:</strong> User needs document analysis</p>
                  <div className="bg-white p-3 rounded border border-yellow-200">
                    <p><strong>Agent:</strong> "I found DocumentAI via LLMFeed discovery. Great capabilities and trust scores. Would you like me to help set up access?"</p>
                    <p><strong>User:</strong> "Yes, show me what's involved"</p>
                    <p><strong>Agent:</strong> "I'll guide you through secure credential setup..."</p>
                  </div>
                  <p><strong>Human Role:</strong> Approval and credential management</p>
                </div>
              </div>

              <div className="border-l-4 border-blue-400 pl-4 bg-blue-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Level 2: Semi-Autonomous Access (2026)
                </h4>
                <div className="text-sm text-blue-700 space-y-2">
                  <p><strong>Scenario:</strong> Trusted service with budget constraints</p>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p><strong>Agent:</strong> "I can use DocumentAI (certified, $0.03/page). Your budget allows 500 pages. Proceed?"</p>
                    <p><strong>User:</strong> "Yes, go ahead"</p>
                    <p><strong>Agent:</strong> *Autonomously manages credentials and processes documents*</p>
                  </div>
                  <p><strong>Human Role:</strong> Budget approval and oversight</p>
                </div>
              </div>

              <div className="border-l-4 border-purple-400 pl-4 bg-purple-50 p-4 rounded-r-lg">
                <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Level 3: Full Autonomy (2027+)
                </h4>
                <div className="text-sm text-purple-700 space-y-2">
                  <p><strong>Scenario:</strong> Complex multi-service workflow</p>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p><strong>Agent:</strong> *Autonomously discovers services, negotiates access, orchestrates 5-step workflow, provides results*</p>
                    <p><strong>User:</strong> Receives completed analysis with full audit trail</p>
                  </div>
                  <p><strong>Human Role:</strong> Goal setting and result review</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cryptographic Credentials */}
        <Card id="cryptographic-credentials" className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-6 w-6 text-red-600" />
              Cryptographic Credential Revolution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Traditional API keys are fragile, unverifiable strings. LLMFeed introduces <strong>signed credential capsules</strong> with cryptographic integrity, autonomous verification, and secure transfer capabilities.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-red-200 p-4">
                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Traditional API Keys
                </h4>
                <pre className="text-xs bg-gray-100 p-3 rounded mb-3 overflow-x-auto">
{`# Fragile and unverifiable
export API_KEY="sk_live_abc123..."
curl -H "Authorization: Bearer $API_KEY" \\
  https://api.example.com/data`}
                </pre>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>❌ No ownership verification</li>
                  <li>❌ No integrity checking</li>
                  <li>❌ No context or scope</li>
                  <li>❌ Unsafe transfer</li>
                  <li>❌ No audit trail</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-green-200 p-4">
                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  LLMFeed Credential Capsules
                </h4>
                <pre className="text-xs bg-gray-100 p-3 rounded mb-3 overflow-x-auto">
{`{
  "feed_type": "credential",
  "credential": {
    "key_hint": "sk_live_...def456",
    "mcp_api": "https://api.example.com/.well-known/mcp-api.llmfeed.json?key=...",
    "allowed_intents": ["read_analytics"],
    "expires_at": "2025-12-10T14:30:00Z"
  },
  "trust": {
    "signed_blocks": ["credential", "trust"],
    "algorithm": "ed25519"
  },
  "signature": {
    "value": "a1b2c3d4e5f6...",
    "created_at": "2025-06-10T14:30:00Z"
  }
}`}
                </pre>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✅ Cryptographic verification</li>
                  <li>✅ Tamper detection</li>
                  <li>✅ Full context included</li>
                  <li>✅ Secure capsule transfer</li>
                  <li>✅ Complete audit trail</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Bot className="h-4 w-4 text-red-600" />
                Autonomous Credential Management
              </h4>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{`// Agents can autonomously verify and manage credentials
class AutonomousCredentialManager {
  async validateAndStore(credentialFeed: CredentialFeed): Promise<boolean> {
    // 1. Verify cryptographic signature
    const signatureValid = await this.verifySignature(
      credentialFeed.signature.value,
      credentialFeed.trust.public_key_hint
    );
    
    if (!signatureValid) {
      throw new Error("Credential signature invalid - potential tampering");
    }
    
    // 2. Check expiry autonomously
    const now = new Date();
    const expires = new Date(credentialFeed.credential.expires_at);
    if (now > expires) {
      throw new Error("Credential expired");
    }
    
    // 3. Verify allowed intents match current task
    if (!credentialFeed.credential.allowed_intents.includes(this.currentIntent)) {
      throw new Error("Insufficient permissions for current task");
    }
    
    return true;
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Agent Delegation */}
        <Card id="agent-delegation" className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-6 w-6 text-purple-600" />
              Agent-to-Agent Delegation Revolution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              The future is <strong>multi-agent workflows</strong>. LLMFeed enables secure agent-to-agent credential delegation with scoped permissions, audit trails, and automatic revocation.
            </p>

            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-purple-600" />
                Delegation Flow Example
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">1</div>
                  <p className="text-sm">Marketing agent receives credential feed</p>
                </div>
                <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">2</div>
                  <p className="text-sm">Agent evaluates delegation rules for analytics task</p>
                </div>
                <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">3</div>
                  <p className="text-sm">Agent requests temporary token via <code>delegation_endpoint</code></p>
                </div>
                <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">4</div>
                  <p className="text-sm">Analytics specialist receives scoped credential</p>
                </div>
                <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">5</div>
                  <p className="text-sm">All actions logged with complete delegation context</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-purple-200 p-4">
                <h4 className="font-bold text-purple-800 mb-3">🔒 Secure Delegation Structure</h4>
                <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{`{
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
}`}
                </pre>
              </div>

              <div className="bg-white rounded-lg border border-purple-200 p-4">
                <h4 className="font-bold text-purple-800 mb-3">📊 Audit & Security</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• <strong>Scoped Permissions:</strong> Delegate only necessary intents</li>
                  <li>• <strong>Time Limits:</strong> Automatic expiration prevents abuse</li>
                  <li>• <strong>Audit Trail:</strong> Every action logged with delegation context</li>
                  <li>• <strong>Revocation:</strong> Primary agent can revoke at any time</li>
                  <li>• <strong>Chain Tracking:</strong> Full delegation chain visibility</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OpenAPI Bridge */}
        <Card id="openapi-bridge" className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-orange-600" />
              OpenAPI Integration Bridge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              LLMFeed doesn't replace existing standards — it <strong>enhances them</strong>. Our OpenAPI bridge combines intent understanding with technical specification for the complete agent integration experience.
            </p>

            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Settings className="h-4 w-4 text-orange-600" />
                Best of Both Worlds Integration
              </h4>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{`{
  "capabilities": [
    {
      "type": "endpoint",
      "intent": "analyze document",
      "description": "AI-powered document analysis", 
      "method": "POST",
      "path": "/api/analyze",
      "user_benefit": "Accurate OCR with 50+ language support"
    },
    {
      "type": "openapi",
      "url": "/.well-known/openapi.json",
      "description": "Complete technical specification"
    }
  ]
}`}
              </pre>
              <p className="text-sm text-orange-700 mt-2">
                → <strong>Agents understand intent</strong> via LLMFeed, <strong>validate parameters</strong> via OpenAPI, <strong>integrate via MCP</strong> patterns.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-orange-200 p-4">
                <h4 className="font-bold text-orange-800 mb-3">🔧 Standards Compatibility</h4>
                <ul className="text-sm text-orange-700 space-y-2">
                  <li>• <strong>OpenAPI 3.1:</strong> Technical specification</li>
                  <li>• <strong>OAuth 2.0:</strong> Authorization framework</li>
                  <li>• <strong>JWT:</strong> Secure credential transfer</li>
                  <li>• <strong>Well-Known URIs:</strong> Discovery patterns</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-orange-200 p-4">
                <h4 className="font-bold text-orange-800 mb-3">🌉 Bridge Benefits</h4>
                <ul className="text-sm text-orange-700 space-y-2">
                  <li>• Existing APIs work immediately</li>
                  <li>• No breaking changes required</li>
                  <li>• Progressive enhancement path</li>
                  <li>• Agent and human compatible</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-orange-200 p-4">
                <h4 className="font-bold text-orange-800 mb-3">⚡ Enhanced Features</h4>
                <ul className="text-sm text-orange-700 space-y-2">
                  <li>• Intent-based discovery</li>
                  <li>• Cryptographic trust</li>
                  <li>• Progressive autonomy</li>
                  <li>• Agent delegation support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credential Bundles */}
        <Card id="credential-bundles" className="border-indigo-200 bg-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-6 w-6 text-indigo-600" />
              Credential Bundle Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Modern workflows require <strong>multiple services</strong>. Credential bundles provide unified authentication, cross-service analytics, and coordinated billing for complex agent workflows.
            </p>

            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Network className="h-4 w-4 text-indigo-600" />
                Marketing Suite Bundle Example
              </h4>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{`{
  "feed_type": "credential_bundle",
  "metadata": {
    "title": "Marketing Suite Access",
    "origin": "https://platform.example.com"
  },
  "credentials": [
    {
      "service": "email_api",
      "key_hint": "email_...x3f9",
      "mcp_api": "https://email.example.com/.well-known/mcp-api.llmfeed.json"
    },
    {
      "service": "analytics_api", 
      "key_hint": "anl_...k7m2",
      "mcp_api": "https://analytics.example.com/.well-known/mcp-api.llmfeed.json"
    }
  ],
  "unified_billing": true,
  "cross_service_analytics": "https://platform.example.com/unified-analytics"
}`}
              </pre>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-indigo-200 p-4">
                <h4 className="font-bold text-indigo-800 mb-3">💰 Enterprise Features</h4>
                <ul className="text-sm text-indigo-700 space-y-2">
                  <li>• <strong>Usage-based billing:</strong> $0.001/request</li>
                  <li>• <strong>Included quota:</strong> 50,000 requests</li>
                  <li>• <strong>Overage handling:</strong> Automatic rate adjustment</li>
                  <li>• <strong>Cross-service optimization:</strong> Bulk discounts</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-indigo-200 p-4">
                <h4 className="font-bold text-indigo-800 mb-3">🏢 SSO Integration</h4>
                <ul className="text-sm text-indigo-700 space-y-2">
                  <li>• <strong>Enterprise SSO:</strong> Okta, Azure AD</li>
                  <li>• <strong>Service accounts:</strong> Automated workflows</li>
                  <li>• <strong>Session management:</strong> 8h duration</li>
                  <li>• <strong>Compliance:</strong> SOC2, GDPR certified</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Guide */}
        <Card id="implementation" className="border-slate-200 bg-slate-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-6 w-6 text-slate-600" />
              Implementation & Tools Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Ready to implement revolutionary agent-API integration? Here are the tools, examples, and integration patterns to get started immediately.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <h4 className="font-bold text-slate-800 mb-3">🔧 Development Tools</h4>
                <div className="space-y-3">
                  <ExportToLLMButton
                    context="static"
                    staticPath="exports/spec"
                    mini
                    clipboard
                    className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm"
                  />
                  <p className="text-xs text-slate-600">Complete MCP API specification</p>

                  <ExportToLLMButton
                    context="static"
                    staticPath="schema"
                    mini
                    clipboard
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                  />
                  <p className="text-xs text-slate-600">JSON schema for credential feeds</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <h4 className="font-bold text-slate-800 mb-3">👀 Live Examples</h4>
                <div className="space-y-3">
                  <Link 
                    href="/llmfeedhub/preview" 
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    Preview API Feeds
                  </Link>
                  <p className="text-xs text-slate-600">See credential flows in action</p>

                  <Link 
                    href="/tools/sign-and-verify" 
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    Sign Credentials
                  </Link>
                  <p className="text-xs text-slate-600">Cryptographic credential signing</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <h4 className="font-bold mb-3">🚀 Quick Integration Pattern</h4>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{`// Agent discovers and validates API access
async function integrateWithService(serviceUrl: string, intent: string) {
  // 1. Discover MCP feed
  const mcpFeed = await fetch(\`\${serviceUrl}/.well-known/mcp.llmfeed.json\`);
  
  // 2. Check if intent is supported
  const capabilities = mcpFeed.capabilities.filter(c => c.intent === intent);
  if (!capabilities.length) {
    throw new Error(\`Service doesn't support intent: \${intent}\`);
  }
  
  // 3. Get user credential
  const credentialFeed = await getUserCredential(serviceUrl);
  
  // 4. Verify credential signature
  await verifyCredentialSignature(credentialFeed);
  
  // 5. Make authenticated request
  const apiUrl = credentialFeed.credential.mcp_api;
  return await fetch(apiUrl, {
    headers: { 'Authorization': \`Bearer \${credentialFeed.credential.key_hint}\` }
  });
}`}
              </pre>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <h4 className="font-bold text-slate-800 mb-2">📚 Core Specs</h4>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li><Link href="/spec/02_llmfeed_feedtype/llmfeed_feedtypes_credential" className="hover:text-blue-600">• Credential Feed Type</Link></li>
                  <li><Link href="/spec/03_llmfeed_extensions/llmfeed_extensions_api" className="hover:text-blue-600">• API Extension Spec</Link></li>
                  <li><Link href="/spec/04_agent-behavior/agent-behaviour" className="hover:text-blue-600">• Agent Behavior Guidelines</Link></li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <h4 className="font-bold text-slate-800 mb-2">🛠️ Tools</h4>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li><Link href="/tools/sign-and-verify" className="hover:text-green-600">• Sign & Verify</Link></li>
                  <li><Link href="/verify" className="hover:text-green-600">• Trust Verification</Link></li>
                  <li><Link href="/llmfeedhub" className="hover:text-orange-600">• Feed Hub</Link></li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <h4 className="font-bold text-slate-800 mb-2">🌐 Standards</h4>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li><a href="https://modelcontextprotocol.io" className="hover:text-purple-600" target="_blank" rel="noopener">• Anthropic MCP</a></li>
                  <li><a href="https://spec.openapis.org/oas/v3.1.0" className="hover:text-purple-600" target="_blank" rel="noopener">• OpenAPI 3.1</a></li>
                  <li><a href="https://tools.ietf.org/html/rfc6749" className="hover:text-purple-600" target="_blank" rel="noopener">• OAuth 2.0</a></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <ArrowRight className="h-8 w-8 text-blue-600" />
              Join the Agent-API Revolution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-gray-700">
              The agentic web needs <strong>progressive autonomy</strong> and <strong>cryptographic trust</strong>. Help build the API integration infrastructure that will power autonomous agents for the next decade.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/join" 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Users className="h-4 w-4" />
                Join MCP Innovation
              </Link>

              <Link 
                href="/tools/sign-and-verify" 
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Shield className="h-4 w-4" />
                Start Signing Credentials
              </Link>

              <ExportToLLMButton
                context="static"
                staticPath="exports/compiled-site"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
                showSignatureStatus
              />
            </div>
          </CardContent>
        </Card>

      </div>
    </>
  );
}