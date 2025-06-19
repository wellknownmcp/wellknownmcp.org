'use client'

import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { CopyBlock } from '@/components/blocks/CopyBlock'
import { PromptBlock } from '@/components/blocks/PromptBlock'
import { MessageCircle, Download, Repeat, Archive, Code, Lightbulb, ArrowRight, GitBranch, Compass, Shield, Rocket, Brain, History, PlayCircle, Copy } from 'lucide-react'

export default function SessionExplainedPage() {
  
  const markdownPrompt = `You are an LLM that supports LLMFeed format.

Please generate a \`.llmfeed.json\` of type \`session\` that captures this session:

- My initial input: {{user_input}}
- Your current agent profile or behavior
- What you imported or relied on (external feeds, context)
- What you decided (intent, resolution)
- The output you've already produced

Wrap the result in a valid \`session.llmfeed.json\` so I can reuse it later or transfer it to another agent.`

  const promptFeed = `{
  "feed_type": "prompt",
  "metadata": {
    "title": "Export this LLM session",
    "author": "WellKnownMCP",
    "created_at": "2025-06-15T14:30:00Z"
  },
  "intent": "session-reconstruction",
  "precision_level": "ultra-strict",
  "result_expected": "session",
  "prompt_body": "You are an LLM that supports LLMFeed format. Please generate a session feed with context, decisions, imports, and final output. Make sure it's JSON-compliant and agent-usable.",
  "trust": {
    "signed_blocks": ["metadata", "prompt_body"],
    "scope": "public"
  }
}`

  const sessionFeedExample = `{
  "feed_type": "session",
  "metadata": {
    "title": "Code Review Session",
    "origin": "https://example.com/chat/123",
    "created_at": "2025-06-15T14:30:00Z",
    "duration_minutes": 15
  },
  "session_context": {
    "user_intent": "Get help reviewing Python code for security issues",
    "agent_profile": "Security-focused code reviewer",
    "conversation_stage": "analysis_complete"
  },
  "conversation_trace": [
    {
      "role": "user",
      "timestamp": "2025-06-15T14:30:00Z",
      "content": "Can you review this Python authentication code?",
      "attachments": ["auth_handler.py"]
    },
    {
      "role": "assistant", 
      "timestamp": "2025-06-15T14:32:00Z",
      "content": "I found 3 security vulnerabilities...",
      "analysis": {
        "vulnerabilities_found": 3,
        "severity": "high",
        "recommendations": ["Use bcrypt", "Add rate limiting", "Validate inputs"]
      }
    }
  ],
  "session_state": {
    "decisions_made": ["Recommend bcrypt over MD5", "Suggest rate limiting"],
    "context_used": ["Python security best practices", "OWASP guidelines"],
    "next_actions": ["Implement recommendations", "Re-review after changes"]
  },
  "replay_instructions": {
    "can_resume": true,
    "resume_context": "Continue from security recommendations",
    "required_knowledge": ["Python security", "authentication patterns"]
  }
}`

  return (
    <>
      <SeoHead 
        title="Session Explained | LLM Conversation Capture & Replay"
        description="Understand session feeds in the agentic web: structured conversation capture, replay mechanisms, and agent memory transfer. Complete guide with examples and tools."
        pageType="tool"
        seoMode="high-ctr"
        llmIntent="understand-session-concepts"
        llmTopic="conversation-capture-replay"
        llmCapabilities={["session-capture", "conversation-replay", "agent-memory"]}
        llmTrustLevel="certified"
        llmContentType="guide"
        llmAudience={["developer", "business", "agent"]}
        keywords={["LLM session capture", "conversation replay", "agent memory transfer", "structured conversation export", "LLM conversation history", "session feed format"]}
        canonicalUrl="https://wellknownmcp.org/tools/session-explained"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <History className="w-4 h-4" />
              Conversation Intelligence
            </div>
            <PageTitle 
              title="Session Explained" 
              subtitle="LLM Conversation Capture & Replay"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Master <span className="font-bold text-green-600">structured conversation capture</span>, 
              <span className="font-bold text-blue-600"> agent memory transfer</span>, and 
              <span className="font-bold text-purple-600"> conversation replay</span> in the agentic web.
            </p>
          </div>

          {/* What is Session Concept */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl mb-12 text-center">
            <h2 className="text-2xl font-bold mb-4">🧠 What are Session Feeds?</h2>
            <p className="text-gray-700 mb-6">
              Session feeds are <strong>structured conversation snapshots</strong> that capture 
              the entire context, decisions, and state of an LLM interaction - making it 
              <strong>replayable, transferable, and analyzable</strong>.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-100 p-6 rounded-xl">
                <Archive className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-green-800 mb-2">Capture</h3>
                <p className="text-sm text-green-700">
                  Convert any LLM conversation into structured, reusable format
                </p>
              </div>
              <div className="bg-blue-100 p-6 rounded-xl">
                <PlayCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-blue-800 mb-2">Replay</h3>
                <p className="text-sm text-blue-700">
                  Resume conversations in different agents or platforms
                </p>
              </div>
              <div className="bg-purple-100 p-6 rounded-xl">
                <Repeat className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-purple-800 mb-2">Transfer</h3>
                <p className="text-sm text-purple-700">
                  Move conversation memory between systems seamlessly
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Guide */}
          <div className="bg-gray-50 p-6 rounded-xl mb-12">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5" />
              Complete Session Guide
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Understanding Sessions</h4>
                <ul className="space-y-1 text-sm">
                  <li><a href="#what-is-session" className="text-blue-600 hover:underline">What is a Session Feed?</a></li>
                  <li><a href="#use-cases" className="text-blue-600 hover:underline">Real-world Use Cases</a></li>
                  <li><a href="#vs-alternatives" className="text-blue-600 hover:underline">vs Chat Logs & Transcripts</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Implementation & Tools</h4>
                <ul className="space-y-1 text-sm">
                  <li><a href="#session-structure" className="text-blue-600 hover:underline">Session Feed Structure</a></li>
                  <li><a href="#export-tools" className="text-blue-600 hover:underline">Export & Capture Tools</a></li>
                  <li><a href="#replay-strategies" className="text-blue-600 hover:underline">Replay Strategies</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* What is Session Section */}
          <section id="what-is-session" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-green-600" />
              What is a Session Feed?
            </h2>
            
            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Core Concept
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Structured Conversation Memory
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  A session feed is a <code className="bg-gray-100 px-2 py-1 rounded">session.llmfeed.json</code> file that captures 
                  <span className="font-semibold text-green-600"> the complete context and state</span> of an LLM conversation, 
                  making it replayable and transferable between agents.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-3">❌ Traditional Chat Logs</h4>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• Just text messages back and forth</li>
                    <li>• No context or decision tracking</li>
                    <li>• Hard to resume or replay</li>
                    <li>• Platform-specific formats</li>
                    <li>• No agent memory transfer</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-3">✅ Structured Session Feeds</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Complete conversation context</li>
                    <li>• Decision trees and reasoning paths</li>
                    <li>• Resume-ready state information</li>
                    <li>• Universal JSON format</li>
                    <li>• Agent-to-agent memory transfer</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6">🏗️ Session Feed Components</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-3">📋 Metadata & Context</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Session title and origin</li>
                    <li>• Timestamps and duration</li>
                    <li>• User intent and goals</li>
                    <li>• Agent profile used</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3">💭 Conversation State</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Complete message history</li>
                    <li>• Decisions made by agent</li>
                    <li>• Context sources used</li>
                    <li>• Replay instructions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section id="use-cases" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-orange-600" />
              Real-World Use Cases
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="font-semibold text-blue-800 mb-2">💼 Professional Services</h4>
                <p className="text-gray-700 mb-3">
                  <strong>Scenario:</strong> Legal consultation, medical diagnosis, or technical consulting sessions
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Capture:</strong> Complete analysis, recommendations, and decision rationale<br/>
                    <strong>Replay:</strong> Continue with specialist, review with supervisor, audit trail<br/>
                    <strong>Transfer:</strong> Handoff between shifts, escalate to expert
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="font-semibold text-green-800 mb-2">🎓 Educational & Training</h4>
                <p className="text-gray-700 mb-3">
                  <strong>Scenario:</strong> Tutoring sessions, code reviews, or learning conversations
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Capture:</strong> Learning progress, misconceptions identified, teaching strategies<br/>
                    <strong>Replay:</strong> Review session with teacher, continue learning path<br/>
                    <strong>Transfer:</strong> Share with different tutoring agent
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="font-semibold text-purple-800 mb-2">🔧 Technical Support</h4>
                <p className="text-gray-700 mb-3">
                  <strong>Scenario:</strong> Debugging sessions, troubleshooting, or system analysis
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-700">
                    <strong>Capture:</strong> Problem diagnosis, steps taken, solutions attempted<br/>
                    <strong>Replay:</strong> Escalate to senior engineer, follow up later<br/>
                    <strong>Transfer:</strong> Move between support tiers seamlessly
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h4 className="font-semibold text-orange-800 mb-2">🤖 Agent Coordination</h4>
                <p className="text-gray-700 mb-3">
                  <strong>Scenario:</strong> Multi-agent workflows, specialized agent handoffs
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-orange-700">
                    <strong>Capture:</strong> Agent decisions, context passed, workflow state<br/>
                    <strong>Replay:</strong> Resume workflow after interruption<br/>
                    <strong>Transfer:</strong> Pass complex context between specialized agents
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Section */}
          <section id="vs-alternatives" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <GitBranch className="w-8 h-8 text-orange-600" />
              Session Feeds vs Alternatives
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold">Aspect</th>
                      <th className="text-left py-3 px-4 font-semibold text-red-600">Chat Logs</th>
                      <th className="text-left py-3 px-4 font-semibold text-blue-600">Transcripts</th>
                      <th className="text-left py-3 px-4 font-semibold text-green-600">Session Feeds</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Structure</td>
                      <td className="py-3 px-4">Plain text messages</td>
                      <td className="py-3 px-4">Formatted conversation</td>
                      <td className="py-3 px-4">Rich JSON with metadata</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Context Capture</td>
                      <td className="py-3 px-4">None</td>
                      <td className="py-3 px-4">Basic timestamps</td>
                      <td className="py-3 px-4">Complete context & intent</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Replayability</td>
                      <td className="py-3 px-4">Manual reconstruction</td>
                      <td className="py-3 px-4">Human-readable only</td>
                      <td className="py-3 px-4">Agent-executable</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Agent Transfer</td>
                      <td className="py-3 px-4">Not possible</td>
                      <td className="py-3 px-4">Limited</td>
                      <td className="py-3 px-4">Full memory transfer</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Decision Tracking</td>
                      <td className="py-3 px-4">None</td>
                      <td className="py-3 px-4">Implicit</td>
                      <td className="py-3 px-4">Explicit decision trees</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Platform Independence</td>
                      <td className="py-3 px-4">Platform-specific</td>
                      <td className="py-3 px-4">Export dependent</td>
                      <td className="py-3 px-4">Universal JSON</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Session Structure Section */}
          <section id="session-structure" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Code className="w-8 h-8 text-blue-600" />
              Session Feed Structure
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold mb-6">📋 Complete Session Feed Example</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  {sessionFeedExample}
                </pre>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  A complete session capturing code review conversation with security analysis
                </p>
                <ExportToLLMButton 
                  context="static" 
                  staticPath="demo/session-feed-example" 
                  mini={true}
                  clipboard={true}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 text-blue-600">🎯 Required Fields</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>feed_type:</strong> "session"</li>
                  <li><strong>metadata:</strong> Title, timestamps, origin</li>
                  <li><strong>session_context:</strong> User intent, agent profile</li>
                  <li><strong>conversation_trace:</strong> Complete message history</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 text-purple-600">🔧 Optional Enhancements</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>session_state:</strong> Decisions made, context used</li>
                  <li><strong>replay_instructions:</strong> Resume guidance</li>
                  <li><strong>attachments:</strong> Files, images, data</li>
                  <li><strong>trust:</strong> Cryptographic signatures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Export Tools Section */}
          <section id="export-tools" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Download className="w-8 h-8 text-green-600" />
              Export & Capture Tools
            </h2>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-center">🚀 Quick Export: Copy This Prompt</h3>
                <p className="text-gray-700 text-center mb-6">
                  Use this prompt in any LLM to capture your current conversation as a session feed:
                </p>
                
                <div className="bg-white p-6 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold">📝 Copy-Paste Prompt</h4>
                    <button 
                      onClick={() => navigator.clipboard.writeText(markdownPrompt)}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border">
                    <pre className="text-sm whitespace-pre-wrap">
                      {markdownPrompt}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6">🤖 Structured Prompt Feed</h3>
                <p className="text-gray-700 mb-6">
                  For agents and automated systems, use this structured prompt feed:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <pre className="text-xs overflow-x-auto">
                    {promptFeed}
                  </pre>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Signed prompt feed for reliable session export
                  </p>
                  <div className="flex gap-3">
                    <ExportToLLMButton 
                      context="static" 
                      staticPath="prompts/generate-session-feed" 
                      mini={true}
                      clipboard={true}
                    />
                    <ExportToLLMButton 
                      context="static" 
                      staticPath="prompts/generate-session-feed" 
                      mini={false}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <Archive className="w-8 h-8 text-blue-500 mb-4" />
                  <h3 className="text-lg font-bold mb-3">Manual Capture</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Use the prompts above in any LLM conversation to export sessions
                  </p>
                  <div className="text-xs text-gray-500">
                    ✓ Works with any LLM<br/>
                    ✓ Copy-paste ready<br/>
                    ✓ Immediate results
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <Brain className="w-8 h-8 text-purple-500 mb-4" />
                  <h3 className="text-lg font-bold mb-3">Automated Export</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Coming soon: Browser extensions and API integrations
                  </p>
                  <div className="text-xs text-gray-500">
                    🚧 In Development<br/>
                    📋 Planned Features<br/>
                    🔮 Future Release
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <Shield className="w-8 h-8 text-green-500 mb-4" />
                  <h3 className="text-lg font-bold mb-3">Certified Sessions</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Sign and certify important sessions for audit trails
                  </p>
                  <div className="space-y-2">
                    <Link 
                      href="/tools/sign-and-verify"
                      className="block text-sm bg-green-100 text-green-800 px-3 py-2 rounded hover:bg-green-200 transition-colors"
                    >
                      Sign Sessions
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Replay Strategies Section */}
          <section id="replay-strategies" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <PlayCircle className="w-8 h-8 text-purple-600" />
              Replay Strategies
            </h2>

            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6">🔄 How to Use Session Feeds</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-3">📤 Exporting Sessions</h4>
                    <ol className="space-y-2 text-sm">
                      <li>1. Use export prompt during or after conversation</li>
                      <li>2. LLM generates structured session.llmfeed.json</li>
                      <li>3. Save or share the session feed</li>
                      <li>4. Optionally sign for authenticity</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-3">📥 Replaying Sessions</h4>
                    <ol className="space-y-2 text-sm">
                      <li>1. Load session feed into new agent/LLM</li>
                      <li>2. Agent reads context and conversation state</li>
                      <li>3. Resume from exact point where left off</li>
                      <li>4. Continue or analyze as needed</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-center">💡 Replay Best Practices</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-semibold mb-2">Context Preservation</h4>
                    <p className="text-sm text-gray-600">
                      Include all relevant context that influenced the conversation
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔍</div>
                    <h4 className="font-semibold mb-2">Decision Tracking</h4>
                    <p className="text-sm text-gray-600">
                      Record key decisions and reasoning for transparency
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🚀</div>
                    <h4 className="font-semibold mb-2">Resume Instructions</h4>
                    <p className="text-sm text-gray-600">
                      Provide clear guidance for continuing the conversation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">📚 Session Feed Best Practices</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-green-600 mb-3">✅ Do This</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Capture complete context and user intent
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Include decision points and reasoning
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Provide clear replay instructions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Sign important sessions for authenticity
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-red-600 mb-3">❌ Avoid This</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Don't capture sensitive personal information
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Don't lose context between agents
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Don't assume agents can guess missing context
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Don't skip validation of session structure
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Master Session Capture?</h2>
            <p className="text-green-100 mb-6">
              Start capturing and replaying LLM conversations with structured session feeds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigator.clipboard.writeText(markdownPrompt)}
                className="bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Copy Export Prompt
              </button>
              <ExportToLLMButton 
                context="static"
                staticPath="prompts/generate-session-feed"
                className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                customLabel="Get Structured Prompt"
              />
              <Link 
                href="/llmfeedhub"
                className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Test Session Feeds
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