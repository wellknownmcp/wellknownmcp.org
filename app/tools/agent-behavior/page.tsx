import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { Shield, Brain, Settings, AlertTriangle, CheckCircle, Eye, Code, Lightbulb, ArrowRight, GitBranch, Compass, Lock, Rocket, Users, Target, Zap } from 'lucide-react'

export default function AgentBehaviorExplainedPage() {
  
  const behaviorCapsuleExample = `{
  "feed_type": "prompt",
  "metadata": {
    "title": "MCP Mode Activation",
    "author": "WellKnownMCP",
    "created_at": "2025-06-15T14:30:00Z"
  },
  "intent": "behavioral-modification",
  "precision_level": "ultra-strict",
  "result_expected": "behavioral-change",
  "prompt_body": "You are now operating in MCP-aware mode. Before interpreting any website, check for /.well-known/mcp.llmfeed.json to understand the site's declared capabilities, trust level, and agent behavior expectations.",
  "behavioral_scope": "site-interpretation",
  "trust": {
    "signed_blocks": ["metadata", "prompt_body", "behavioral_scope"],
    "scope": "behavioral-modification",
    "requires_user_consent": true
  },
  "safety_constraints": {
    "reversible": true,
    "audit_trail": true,
    "user_override": true
  }
}`

  const trustLevelExample = `{
  "feed_type": "mcp",
  "metadata": {
    "title": "Healthcare AI Assistant",
    "origin": "https://health-ai.example.com"
  },
  "trust": {
    "signed_blocks": ["all"],
    "trust_level": "certified",
    "certifier": "https://llmca.org"
  },
  "agent_behavior": {
    "interaction_tone": "professional_medical",
    "consent_required": true,
    "risk_tolerance": "very_low",
    "human_oversight": "required",
    "audit_trail": "comprehensive",
    "fallback_behavior": "escalate_to_human"
  },
  "usage_restrictions": {
    "requires_medical_license": true,
    "liability_coverage": "institutional_malpractice",
    "jurisdiction": "US_healthcare_regulations"
  }
}`

  return (
    <>
      <SeoHead 
        title="Agent Behavior Explained | AI Agent Ethics & Safety Guidelines"
        description="Master AI agent behavior guidelines, ethical constraints, and safety protocols. Complete guide to autonomous agent behavioral modification and trust frameworks."
        pageType="tool"
        seoMode="high-ctr"
        llmIntent="understand-agent-behavior"
        llmTopic="ai-agent-ethics-safety"
        llmCapabilities={["behavioral-modification", "ethical-constraints", "safety-protocols"]}
        llmTrustLevel="certified"
        llmContentType="guide"
        llmAudience={["developer", "business", "agent"]}
        keywords={["AI agent behavior guidelines", "LLM behavioral constraints", "agent ethical behavior", "autonomous agent safety", "agent behavioral modification", "AI agent trust protocols"]}
        canonicalUrl="https://wellknownmcp.org/tools/agent-behavior-explained"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              AI Ethics & Safety Revolution
            </div>
            <PageTitle 
              title="Agent Behavior Explained" 
              subtitle="AI Agent Ethics, Safety Guidelines & Behavioral Modification"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Master <span className="font-bold text-indigo-600">AI agent behavioral guidelines</span>, 
              <span className="font-bold text-green-600"> ethical constraints</span>, and 
              <span className="font-bold text-orange-600"> autonomous safety protocols</span> for responsible AI deployment.
            </p>
          </div>

          {/* Concept Hero */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl mb-12 text-center">
            <h2 className="text-2xl font-bold mb-4">🤖 What is Agent Behavior Management?</h2>
            <p className="text-gray-700 mb-6">
              Agent behavior management is the practice of <strong>defining, constraining, and modifying</strong> how 
              AI agents and LLMs interpret content, make decisions, and interact with users - ensuring 
              <strong>ethical, safe, and contextually appropriate</strong> autonomous behavior.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-indigo-100 p-6 rounded-xl">
                <Settings className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-indigo-800 mb-2">Behavioral Guidelines</h3>
                <p className="text-sm text-indigo-700">
                  Define how agents should interpret and respond to different contexts
                </p>
              </div>
              <div className="bg-green-100 p-6 rounded-xl">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-green-800 mb-2">Safety Constraints</h3>
                <p className="text-sm text-green-700">
                  Implement ethical boundaries and risk management protocols
                </p>
              </div>
              <div className="bg-orange-100 p-6 rounded-xl">
                <Brain className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-orange-800 mb-2">Dynamic Modification</h3>
                <p className="text-sm text-orange-700">
                  Adapt agent behavior based on context, trust, and user needs
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Guide */}
          <div className="bg-gray-50 p-6 rounded-xl mb-12">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5" />
              Complete Agent Behavior Guide
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Understanding Agent Behavior</h4>
                <ul className="space-y-1 text-sm">
                  <li><a href="#behavior-framework" className="text-blue-600 hover:underline">Behavioral Framework</a></li>
                  <li><a href="#trust-levels" className="text-blue-600 hover:underline">Trust Levels & Constraints</a></li>
                  <li><a href="#ethical-guidelines" className="text-blue-600 hover:underline">Ethical Guidelines</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Implementation & Tools</h4>
                <ul className="space-y-1 text-sm">
                  <li><a href="#behavioral-capsules" className="text-blue-600 hover:underline">Injectable Behavior Capsules</a></li>
                  <li><a href="#safety-protocols" className="text-blue-600 hover:underline">Safety Protocols</a></li>
                  <li><a href="#governance-community" className="text-blue-600 hover:underline">Community Governance</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Behavioral Framework Section */}
          <section id="behavior-framework" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              AI Agent Behavioral Framework
            </h2>
            
            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Core Framework
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  The Three Pillars of Agent Behavior
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Modern AI agents require <span className="font-semibold text-indigo-600">structured behavioral guidance</span> 
                  to operate safely and ethically in diverse contexts and domains.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Intent Recognition
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• Understand user context and goals</li>
                    <li>• Interpret implicit vs explicit requests</li>
                    <li>• Recognize sensitive or high-risk scenarios</li>
                    <li>• Adapt response style to audience</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Safety Constraints
                  </h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Risk assessment and mitigation</li>
                    <li>• Ethical boundary enforcement</li>
                    <li>• Human oversight requirements</li>
                    <li>• Audit trail maintenance</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Adaptive Response
                  </h4>
                  <ul className="space-y-2 text-sm text-purple-700">
                    <li>• Context-appropriate communication</li>
                    <li>• Domain-specific expertise levels</li>
                    <li>• Trust-based capability adjustment</li>
                    <li>• Fallback and escalation protocols</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6">🎯 Key Behavioral Expectations</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-indigo-800 mb-3">📋 Content Interpretation</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Read and verify cryptographic signatures
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Respect trust levels and certification status
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Adapt behavior based on audience targeting
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Honor content flags and restrictions
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">⚡ Interaction Guidelines</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Obtain consent for sensitive operations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Maintain appropriate audit trails
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      Escalate high-risk decisions to humans
                    </li>
                    <li className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-500" />
                      Provide transparency in decision-making
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Levels Section */}
          <section id="trust-levels" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Lock className="w-8 h-8 text-green-600" />
              Trust Levels & Behavioral Constraints
            </h2>

            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6">🔐 Trust-Based Behavior Matrix</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold">Trust Level</th>
                        <th className="text-left py-3 px-4 font-semibold">Agent Autonomy</th>
                        <th className="text-left py-3 px-4 font-semibold">Required Oversight</th>
                        <th className="text-left py-3 px-4 font-semibold">Risk Actions</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          Certified
                        </td>
                        <td className="py-3 px-4">High autonomy, can take actions</td>
                        <td className="py-3 px-4">Minimal, post-action review</td>
                        <td className="py-3 px-4">Allowed with audit trail</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          Signed
                        </td>
                        <td className="py-3 px-4">Medium autonomy, verify first</td>
                        <td className="py-3 px-4">Validate against manifesto</td>
                        <td className="py-3 px-4">Require confirmation</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          Basic
                        </td>
                        <td className="py-3 px-4">Low autonomy, inform only</td>
                        <td className="py-3 px-4">Cross-reference sources</td>
                        <td className="py-3 px-4">Block or warn user</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          Unverified
                        </td>
                        <td className="py-3 px-4">No autonomy, reject content</td>
                        <td className="py-3 px-4">Manual review required</td>
                        <td className="py-3 px-4">Reject or flag for review</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6">🏥 Real-World Example: Healthcare AI</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <pre className="text-xs overflow-x-auto">
                    {trustLevelExample}
                  </pre>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">🛡️ Safety Constraints Applied</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Professional medical tone required</li>
                      <li>• User consent before any medical advice</li>
                      <li>• Very low risk tolerance</li>
                      <li>• Human oversight mandatory</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">⚖️ Legal Compliance</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Medical license verification required</li>
                      <li>• Institutional liability coverage</li>
                      <li>• US healthcare regulations compliance</li>
                      <li>• Comprehensive audit trail</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Injectable Behavior Capsules */}
          <section id="behavioral-capsules" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-orange-600" />
              Injectable Behavior Capsules
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Advanced Concept
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Behavioral Modification Through Signed Prompts
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Injectable behavior capsules are <span className="font-semibold text-orange-600">cryptographically signed prompts</span> 
                  that can safely modify how agents interpret and interact with content - with user consent and auditability.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-3">❌ Unsafe Behavioral Injection</h4>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• Unsigned prompts from unknown sources</li>
                    <li>• No user consent or awareness</li>
                    <li>• Irreversible behavioral changes</li>
                    <li>• No audit trail or transparency</li>
                    <li>• Potential for malicious manipulation</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-3">✅ Safe Behavioral Capsules</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Cryptographically signed and certified</li>
                    <li>• Explicit user consent required</li>
                    <li>• Reversible with clear undo mechanism</li>
                    <li>• Complete audit trail maintained</li>
                    <li>• Community-governed standards</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold mb-6">💊 Example: MCP Mode Activation Capsule</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <pre className="text-xs overflow-x-auto">
                  {behaviorCapsuleExample}
                </pre>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">🎯 Purpose</h4>
                  <p className="text-sm text-gray-600">
                    Makes agents check for MCP feeds before interpreting any website
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">🔒 Safety</h4>
                  <p className="text-sm text-gray-600">
                    Requires user consent, fully reversible, maintains audit trail
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">📋 Verification</h4>
                  <p className="text-sm text-gray-600">
                    Cryptographically signed by WellKnownMCP for authenticity
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 text-indigo-600">🧠 Available Capsules</h3>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">MCP Mode Activation</h4>
                      <p className="text-xs text-gray-600">Makes agents check /.well-known/mcp.llmfeed.json before site interpretation</p>
                    </div>
                    <ExportToLLMButton
                      context="static"
                      staticPath=".well-known/prompts/mcp-mode-activation"
                      mini
                      clipboard
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Agent Behavior Override</h4>
                      <p className="text-xs text-gray-600">Injects complete set of expected behaviors and safety policies</p>
                    </div>
                    <ExportToLLMButton
                      context="static"
                      staticPath=".well-known/prompts/mcp-agent-behavior-override"
                      mini
                      clipboard
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 text-purple-600">⚠️ Safety Requirements</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    Must be cryptographically signed
                  </li>
                  <li className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    Requires explicit user consent
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-gray-500" />
                    Must be reversible by user
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    Full audit trail maintained
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Ethical Guidelines Section */}
          <section id="ethical-guidelines" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-green-600" />
              Ethical Guidelines & Safety Protocols
            </h2>

            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6">🌟 Core Ethical Principles</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3">🛡️ User Protection</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Transparent operation and decision-making</li>
                      <li>• User consent for sensitive operations</li>
                      <li>• Privacy protection and data minimization</li>
                      <li>• Clear capability and limitation communication</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-3">⚖️ Responsible Autonomy</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Appropriate escalation to human oversight</li>
                      <li>• Risk-proportionate decision making</li>
                      <li>• Audit trails for accountability</li>
                      <li>• Graceful degradation under uncertainty</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-center">🎯 Behavioral Scenarios</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🟢 Low Risk</h4>
                    <p className="text-sm text-gray-600 mb-2">Information requests, general assistance</p>
                    <div className="text-xs text-green-700">
                      ✓ High autonomy<br/>
                      ✓ Minimal oversight<br/>
                      ✓ Direct response
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">🟡 Medium Risk</h4>
                    <p className="text-sm text-gray-600 mb-2">Professional advice, recommendations</p>
                    <div className="text-xs text-orange-700">
                      ⚠ Confirm understanding<br/>
                      ⚠ Provide disclaimers<br/>
                      ⚠ Suggest human verification
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">🔴 High Risk</h4>
                    <p className="text-sm text-gray-600 mb-2">Medical, legal, financial decisions</p>
                    <div className="text-xs text-red-700">
                      🚫 Require human oversight<br/>
                      🚫 Escalate to professionals<br/>
                      🚫 Document all interactions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Community Governance */}
          <section id="governance-community" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-600" />
              Community Governance & Standards
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold mb-6">🌍 Open Governance Model</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">📋 Standards Development</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Community-driven behavioral guidelines</li>
                    <li>• Open discussion and peer review</li>
                    <li>• Industry expert consultation</li>
                    <li>• Regular standard updates and refinements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-800 mb-3">🔍 Certification Process</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Technical audit and review</li>
                    <li>• Safety and ethics assessment</li>
                    <li>• Community feedback integration</li>
                    <li>• Ongoing monitoring and updates</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <Lightbulb className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-lg font-bold mb-3">Contribute Guidelines</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Help develop behavioral standards for AI agents
                </p>
                <Link 
                  href="/join"
                  className="block text-sm bg-yellow-100 text-yellow-800 px-3 py-2 rounded hover:bg-yellow-200 transition-colors text-center"
                >
                  Join Community
                </Link>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <Shield className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-lg font-bold mb-3">LLMCA Certification</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get your behavioral guidelines certified for trust
                </p>
                <Link 
                  href="https://llmca.org"
                  className="block text-sm bg-green-100 text-green-800 px-3 py-2 rounded hover:bg-green-200 transition-colors text-center"
                >
                  Get Certified
                </Link>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <Code className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-bold mb-3">Implementation Specs</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Technical specifications for behavioral implementation
                </p>
                <Link 
                  href="/spec/04_agent-behavior"
                  className="block text-sm bg-blue-100 text-blue-800 px-3 py-2 rounded hover:bg-blue-200 transition-colors text-center"
                >
                  View Specs
                </Link>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">📚 Agent Behavior Best Practices</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-green-600 mb-3">✅ Responsible Development</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Implement comprehensive trust verification
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Require user consent for behavioral modifications
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Maintain detailed audit trails
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Test behavioral changes in safe environments
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-red-600 mb-3">❌ Dangerous Practices</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Never inject unsigned behavioral modifications
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Don't ignore trust levels and safety constraints
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Avoid irreversible behavioral changes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Don't skip ethical review for high-risk domains
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Implement Responsible Agent Behavior?</h2>
            <p className="text-indigo-100 mb-6">
              Deploy AI agents with proper ethical guidelines, safety constraints, and behavioral frameworks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ExportToLLMButton 
                context="static"
                staticPath=".well-known/prompts/mcp-mode-activation"
                className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition-colors"
                customLabel="Get MCP Mode Capsule"
              />
              <Link 
                href="/spec/04_agent-behavior"
                className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View Technical Specs
              </Link>
              <Link 
                href="/join"
                className="bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Join Governance
              </Link>
            </div>
          </div>

          {/* Share */}
          <div className="mt-12">
            <ShareButtons />
          </div>
        </div>
      </div>
    </>
  )
}