import { PageTitle } from "@/components/PageTitle";
import SeoHead from "@/components/SeoHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExportToLLMButton } from "@/components/ExportToLLMButton";
import Link from "next/link";
import { AlertTriangle, Shield, Brain, Users, Zap, Eye, Scale, Globe, Coins, Target, CheckCircle, XCircle, Clock, ArrowRight } from "lucide-react";

export default function FeedFlaggingExplainedPage() {
  return (
    <>
      <SeoHead
        title="🚩 Feed Flagging Explained | Decentralized Trust Management Revolution"
        description="Revolutionary AI-powered trust system: real-time threat detection, cryptoeconomic governance, and human-AI collaboration for the agentic web. Zero-trust flagging architecture."
        canonicalUrl="https://wellknownmcp.org/tools/feed-flagging-explained"
        keywords={[
          "decentralized content moderation",
          "AI-powered threat detection", 
          "cryptoeconomic governance",
          "human-AI collaboration flagging",
          "real-time trust scoring",
          "reputation mining systems",
          "democratic AI governance",
          "autonomous threat detection",
          "distributed quality control",
          "agent trust protocols"
        ]}
        llmlang="en"
        llmIntent="understand advanced AI trust and flagging systems"
        llmTopic="revolutionary decentralized trust management for AI agents"
      />

      <div className="max-w-4xl mx-auto py-10 space-y-12">
        <PageTitle
          title="🚩 Feed Flagging Explained"
          subtitle="Revolutionary decentralized trust management for the agentic web"
        />

        {/* Hero Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-sm text-red-700">Flagging Forms</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-sm text-blue-700">Trust Levels</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">Real-time</div>
            <div className="text-sm text-green-700">AI Detection</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">∞</div>
            <div className="text-sm text-purple-700">Democratic Scale</div>
          </div>
        </div>

        {/* Quick Navigation - Table of Contents */}
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              Complete Guide Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-2">🔍 Core Systems</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li><a href="#three-forms" className="hover:text-orange-600">• Three Flagging Forms</a></li>
                  <li><a href="#trust-scoring" className="hover:text-orange-600">• Real-Time Trust Scoring</a></li>
                  <li><a href="#ai-detection" className="hover:text-orange-600">• AI Detection Systems</a></li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">⚡ Advanced Features</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li><a href="#governance" className="hover:text-orange-600">• Democratic Governance</a></li>
                  <li><a href="#economics" className="hover:text-orange-600">• Cryptoeconomic Incentives</a></li>
                  <li><a href="#implementation" className="hover:text-orange-600">• Implementation Guide</a></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revolutionary Framework */}
        <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              The Flagging Revolution
              <span className="text-lg font-normal text-muted-foreground">— Trust at Internet Scale</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700">
              Traditional content moderation doesn't scale to the agentic web. LLMFeed's <strong>revolutionary flagging system</strong> combines AI-powered threat detection, cryptoeconomic incentives, and democratic governance to create the world's first <strong>decentralized trust management system</strong> for autonomous agents.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white rounded-lg border border-red-200">
                <Brain className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold text-red-800">AI Detection</h3>
                <p className="text-sm text-red-600">Real-time threat detection with machine learning</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-blue-800">Democratic Governance</h3>
                <p className="text-sm text-blue-600">Community-driven trust decisions</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                <Coins className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-green-800">Economic Incentives</h3>
                <p className="text-sm text-green-600">Cryptoeconomic reputation mining</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Three Forms of Flagging */}
        <Card id="three-forms">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              Three Forms of Flagging
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              The LLMFeed flagging system operates through three distinct but coordinated mechanisms, each optimized for different scenarios and use cases.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">1</span>
                  </div>
                  <h3 className="font-bold">Embedded Flags</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  <code>flags[]</code> array directly in the .llmfeed.json file
                </p>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`"flags": [{
  "type": "risk",
  "submitted_by": "agent://auditbot",
  "reason": "Capability mismatch",
  "status": "pending",
  "date": "2025-06-19T12:00:00Z"
}]`}
                </pre>
                <p className="text-xs text-muted-foreground mt-2">
                  ✅ Immediate visibility | ⚠️ Requires author cooperation
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h3 className="font-bold">Separate Flag Feeds</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Independent <code>flag.llmfeed.json</code> published by auditors
                </p>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{
  "feed_type": "flag",
  "target": "https://evil.com/.well-known/mcp.llmfeed.json",
  "reason": "Spoofed capabilities",
  "submitted_by": "https://trustbot.ai"
}`}
                </pre>
                <p className="text-xs text-muted-foreground mt-2">
                  ✅ Independent review | ✅ No permission needed
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <h3 className="font-bold">LLMCA Submission</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Central reporting to nonprofit governance entity
                </p>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`POST https://llmca.org/api/flags
{
  "feed_url": "https://example.org/.well-known/mcp.llmfeed.json",
  "violation_type": "trust_abuse",
  "evidence": {...}
}`}
                </pre>
                <p className="text-xs text-muted-foreground mt-2">
                  ✅ Official authority | ✅ Appeals process
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-Time Trust Scoring */}
        <Card id="trust-scoring" className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-blue-600" />
              Real-Time Trust Scoring Revolution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              The flagging system integrates with LLMFeed's <strong>4-level trust scoring</strong> to provide real-time trust adjustment with millisecond response times.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">Trust Level</th>
                    <th className="border border-gray-300 p-3 text-left">Flagging Impact</th>
                    <th className="border border-gray-300 p-3 text-left">Response Time</th>
                    <th className="border border-gray-300 p-3 text-left">Appeal Priority</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">
                      <span className="inline-flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <strong className="text-red-600">UNTRUSTED</strong>
                      </span>
                    </td>
                    <td className="border border-gray-300 p-3">Immediate restriction</td>
                    <td className="border border-gray-300 p-3 font-mono text-green-600">Real-time</td>
                    <td className="border border-gray-300 p-3">🚨 Emergency review</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">
                      <span className="inline-flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <strong className="text-yellow-600">BASIC</strong>
                      </span>
                    </td>
                    <td className="border border-gray-300 p-3">Cautionary warnings</td>
                    <td className="border border-gray-300 p-3 font-mono text-blue-600">&lt; 1 hour</td>
                    <td className="border border-gray-300 p-3">⚡ Standard process</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">
                      <span className="inline-flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <strong className="text-green-600">VERIFIED</strong>
                      </span>
                    </td>
                    <td className="border border-gray-300 p-3">Investigation required</td>
                    <td className="border border-gray-300 p-3 font-mono text-blue-600">&lt; 24 hours</td>
                    <td className="border border-gray-300 p-3">🔍 Thorough review</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">
                      <span className="inline-flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <strong className="text-blue-600">PREMIUM</strong>
                      </span>
                    </td>
                    <td className="border border-gray-300 p-3">Multiple flags needed</td>
                    <td className="border border-gray-300 p-3 font-mono text-blue-600">&lt; 1 week</td>
                    <td className="border border-gray-300 p-3">⚖️ Due process guaranteed</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                Dynamic Response Example
              </h4>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{`{
  "dynamic_response": {
    "threat_level_assessment": {
      "imminent_harm": "immediate_suspension",
      "reputation_gaming": "gradual_trust_reduction", 
      "technical_issues": "warning_with_investigation"
    },
    "escalation_triggers": {
      "multiple_flags_24h": "auto_escalate_to_human_review",
      "verified_agent_flag": "priority_investigation", 
      "community_consensus": "democratic_resolution"
    }
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* AI Detection Systems */}
        <Card id="ai-detection" className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-green-600" />
              AI-Powered Threat Detection Systems
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Revolutionary AI detection capabilities include manipulation detection, content safety screening, and quality assurance — all running in real-time with <strong>human-AI collaboration frameworks</strong>.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-green-200 p-4">
                <h4 className="font-bold text-green-800 mb-3">🎯 Manipulation Detection</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Coordinated inauthentic behavior</li>
                  <li>• Reputation gaming patterns</li>
                  <li>• Sockpuppet network analysis</li>
                  <li>• Economic manipulation detection</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-green-200 p-4">
                <h4 className="font-bold text-green-800 mb-3">🛡️ Content Safety</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Harmful guidance screening</li>
                  <li>• Privacy violation detection</li>
                  <li>• Security risk assessment</li>
                  <li>• Regulatory compliance checking</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-green-200 p-4">
                <h4 className="font-bold text-green-800 mb-3">✅ Quality Assurance</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Technical accuracy validation</li>
                  <li>• Logical consistency verification</li>
                  <li>• Performance claims testing</li>
                  <li>• User experience scoring</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-green-600" />
                Human-AI Collaboration Framework
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-green-800 mb-2">AI Contributions:</p>
                  <ul className="text-green-700 space-y-1">
                    <li>• Pattern recognition at scale</li>
                    <li>• 24/7 continuous monitoring</li>
                    <li>• Statistical anomaly detection</li>
                    <li>• Multi-language analysis</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-green-800 mb-2">Human Oversight:</p>
                  <ul className="text-green-700 space-y-1">
                    <li>• Contextual judgment calls</li>
                    <li>• Cultural sensitivity review</li>
                    <li>• Edge case resolution</li>
                    <li>• Appeals and corrections</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Democratic Governance */}
        <Card id="governance" className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-purple-600" />
              Democratic Governance Revolution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Unlike centralized moderation, LLMFeed implements <strong>democratic governance</strong> with elected community councils, transparent appeals processes, and anti-corruption mechanisms.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-purple-200 p-4">
                <h4 className="font-bold text-purple-800 mb-3">🏛️ Flagging Council</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• Multi-stakeholder elected representation</li>
                  <li>• Qualified majority with minority protection</li>
                  <li>• All decisions publicly auditable</li>
                  <li>• Regular elections and recall procedures</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-purple-200 p-4">
                <h4 className="font-bold text-purple-800 mb-3">⚖️ Appeals Process</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• Automated AI screening</li>
                  <li>• Diverse panel representation</li>
                  <li>• Community vote with veto protection</li>
                  <li>• Legal expert panel for edge cases</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-600" />
                Anti-Corruption Mechanisms
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-purple-800 mb-2">Structural:</p>
                  <ul className="text-purple-700 space-y-1">
                    <li>• Term limits for governance roles</li>
                    <li>• Separation of powers</li>
                    <li>• Checks and balances</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-purple-800 mb-2">Transparency:</p>
                  <ul className="text-purple-700 space-y-1">
                    <li>• Cryptographic voting verification</li>
                    <li>• Public audit logs</li>
                    <li>• Real-time decision tracking</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-purple-800 mb-2">Protection:</p>
                  <ul className="text-purple-700 space-y-1">
                    <li>• Whistleblower anonymity</li>
                    <li>• Minority veto power</li>
                    <li>• External audit requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cryptoeconomic Incentives */}
        <Card id="economics" className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-6 w-6 text-yellow-600" />
              Cryptoeconomic Incentives & Reputation Mining
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Revolutionary <strong>reputation mining</strong> system where participants earn verifiable reputation through quality contributions, with sophisticated anti-gaming mechanisms.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-yellow-200 p-4">
                <h4 className="font-bold text-yellow-800 mb-3">🏆 Earning Reputation</h4>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li>• <strong>Accurate Flagging:</strong> Bonus for identifying real problems</li>
                  <li>• <strong>Quality Review:</strong> Rewards for thorough assessment</li>
                  <li>• <strong>Community Service:</strong> Governance participation recognition</li>
                  <li>• <strong>Whistleblowing:</strong> Protected rewards for serious violations</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-yellow-200 p-4">
                <h4 className="font-bold text-yellow-800 mb-3">⚡ Anti-Gaming Protection</h4>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li>• Stake-weighted voting with anti-plutocracy</li>
                  <li>• Quadratic funding for community initiatives</li>
                  <li>• Sybil resistance through identity verification</li>
                  <li>• Long-term reputation staking requirements</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-yellow-200">
              <h4 className="font-bold mb-3">💎 Economic Incentive Structure</h4>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{`{
  "incentive_structure": {
    "flagging_rewards": {
      "accurate_flags": "reputation_tokens_plus_monetary_bonus",
      "false_positives": "reputation_penalty_with_learning_credit",
      "malicious_flagging": "severe_reputation_loss_and_temporary_ban"
    },
    "governance_participation": {
      "council_service": "governance_tokens_with_voting_power",
      "community_voting": "participation_rewards_scaled_by_stake",
      "appeal_review": "expert_witness_compensation"
    }
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Industry-Specific Adaptations */}
        <Card className="border-indigo-200 bg-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-indigo-600" />
              Industry-Specific Adaptations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              The flagging system adapts to industry-specific requirements with specialized compliance checking, ethics review, and regulatory monitoring.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-indigo-200 p-4">
                <h4 className="font-bold text-indigo-800 mb-3">🏥 Healthcare</h4>
                <ul className="text-sm text-indigo-700 space-y-2">
                  <li>• HIPAA compliance flagging</li>
                  <li>• Medical ethics review</li>
                  <li>• Clinical trial integrity</li>
                  <li>• Patient safety monitoring</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-indigo-200 p-4">
                <h4 className="font-bold text-indigo-800 mb-3">🏦 Financial Services</h4>
                <ul className="text-sm text-indigo-700 space-y-2">
                  <li>• SOX/PCI DSS/GDPR flagging</li>
                  <li>• Market manipulation detection</li>
                  <li>• Fiduciary duty monitoring</li>
                  <li>• Systemic risk assessment</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-indigo-200 p-4">
                <h4 className="font-bold text-indigo-800 mb-3">🏛️ Government</h4>
                <ul className="text-sm text-indigo-700 space-y-2">
                  <li>• Constitutional compliance</li>
                  <li>• Democratic oversight</li>
                  <li>• Transparency requirements</li>
                  <li>• Civil rights protection</li>
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
              Ready to implement the flagging system? Here are the tools, examples, and integration guides to get started immediately.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <h4 className="font-bold text-slate-800 mb-3">🔧 Development Tools</h4>
                <div className="space-y-3">
                  <ExportToLLMButton
                    context="static"
                    staticPath="prompts/mcp-agent-behavior-override"
                    mini
                    clipboard
                    className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm"
                  />
                  <p className="text-xs text-slate-600">Agent behavior override prompts</p>

                  <ExportToLLMButton
                    context="static"
                    staticPath="schema.annotated"
                    mini
                    clipboard
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                  />
                  <p className="text-xs text-slate-600">Complete schema with flagging structure</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <h4 className="font-bold text-slate-800 mb-3">👀 Live Examples</h4>
                <div className="space-y-3">
                  <Link 
                    href="/llmfeedhub/preview?demo=kungfu" 
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    Preview Flagged Feed
                  </Link>
                  <p className="text-xs text-slate-600">See flagging system in action</p>

                  <Link 
                    href="/verify" 
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    Verify Trust Status
                  </Link>
                  <p className="text-xs text-slate-600">Check feed trust and flags</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <h4 className="font-bold mb-3">🚀 Quick Implementation Example</h4>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{`// Agent behavior when encountering flagged feeds
if (feed.flags && feed.flags.length > 0) {
  const criticalFlags = feed.flags.filter(f => f.type === 'critical');
  
  if (criticalFlags.length > 0) {
    // Immediate rejection for critical flags
    return { action: 'reject', reason: 'Critical trust violations detected' };
  }
  
  // Warning for other flags
  return { 
    action: 'warn_user', 
    message: \`This feed has \${feed.flags.length} community flag(s). Proceed with caution.\`
  };
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <ArrowRight className="h-8 w-8 text-orange-600" />
              Join the Trust Revolution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-gray-700">
              The agentic web needs <strong>decentralized trust management</strong>. Help build the infrastructure that will secure autonomous agents for the next decade.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/join" 
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Users className="h-4 w-4" />
                Join LLMCA Governance
              </Link>

              <Link 
                href="/tools/sign-and-verify" 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Shield className="h-4 w-4" />
                Start Signing Feeds
              </Link>

              <ExportToLLMButton
                context="static"
                staticPath="exports/spec"
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