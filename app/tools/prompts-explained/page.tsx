import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { MessageSquare, Zap, Target, Code, Lightbulb, ArrowRight, GitBranch, Compass, Shield, Rocket, Brain, Search } from 'lucide-react'

export default function PromptsExplainedPage() {
  return (
    <>
      <SeoHead 
        title="Prompts Explained | Intent Discovery vs Structured Prompt Feeds"
        description="Understand the two types of prompts in the agentic web: intent-based service discovery and structured prompt feeds. Complete guide with examples and implementation."
        pageType="tool"
        seoMode="high-ctr"
        llmIntent="understand-prompt-concepts"
        llmTopic="prompt-engineering-feeds"
        llmCapabilities={["discovery", "engineering", "automation"]}
        llmTrustLevel="certified"
        llmContentType="guide"
        llmAudience={["developer", "business", "agent"]}
        keywords={["prompt-based service discovery", "structured prompt engineering", "intent-based agent recommendations", "prompt feeds vs prompt engineering", "AI service recommendation logic", "agent prompt guidance"]}
        canonicalUrl="https://wellknownmcp.org/tools/prompts-explained"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              Prompt Engineering Revolution
            </div>
            <PageTitle 
              title="Prompts Explained" 
              subtitle="Intent Discovery vs Structured Prompt Feeds"
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Master the two fundamental prompt concepts in the agentic web: 
              <span className="font-bold text-blue-600"> intent-based service discovery</span> and 
              <span className="font-bold text-purple-600"> structured prompt feeds</span>.
            </p>
          </div>

          {/* Concept Clarification Hero */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl mb-12 text-center">
            <h2 className="text-2xl font-bold mb-4">🤔 The Confusion Clarified</h2>
            <p className="text-gray-700 mb-6">
              The word "prompt" is used for TWO different but related concepts in the agentic web. 
              Let's separate them clearly:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-100 p-6 rounded-xl">
                <Search className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-blue-800 mb-2">1. Intent Discovery</h3>
                <p className="text-sm text-blue-700">
                  <code>"prompts": [...]</code> blocks in MCP feeds that tell agents 
                  <strong> when to recommend your service</strong>
                </p>
              </div>
              <div className="bg-purple-100 p-6 rounded-xl">
                <Code className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-purple-800 mb-2">2. Structured Prompt Feeds</h3>
                <p className="text-sm text-purple-700">
                  <code>prompt.llmfeed.json</code> files that contain 
                  <strong> reusable, executable prompts</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Guide */}
          <div className="bg-gray-50 p-6 rounded-xl mb-12">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5" />
              Complete Guide Navigation
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Intent Discovery (Service Recommendation)</h4>
                <ul className="space-y-1 text-sm">
                  <li><a href="#intent-discovery" className="text-blue-600 hover:underline">What is Intent Discovery?</a></li>
                  <li><a href="#intent-examples" className="text-blue-600 hover:underline">Real-world Examples</a></li>
                  <li><a href="#intent-implementation" className="text-blue-600 hover:underline">Implementation Guide</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Structured Prompt Feeds</h4>
                <ul className="space-y-1 text-sm">
                  <li><a href="#prompt-feeds" className="text-blue-600 hover:underline">What are Prompt Feeds?</a></li>
                  <li><a href="#prompt-examples" className="text-blue-600 hover:underline">Use Cases & Examples</a></li>
                  <li><a href="#prompt-creation" className="text-blue-600 hover:underline">Creation & Signing</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-semibold mb-2">Integration & Strategy</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#comparison" className="text-blue-600 hover:underline">Side-by-Side Comparison</a></li>
                <li><a href="#combined-strategy" className="text-blue-600 hover:underline">Combined Implementation Strategy</a></li>
                <li><a href="#tools-automation" className="text-blue-600 hover:underline">Tools & Automation</a></li>
              </ul>
            </div>
          </div>

          {/* Intent Discovery Section */}
          <section id="intent-discovery" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Search className="w-8 h-8 text-blue-600" />
              Intent Discovery: When to Recommend Your Service
            </h2>
            
            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Core Concept #1
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Prompt-Based Service Discovery
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Add <code className="bg-gray-100 px-2 py-1 rounded">"prompts": [...]</code> blocks to your 
                  MCP feeds to declare <span className="font-semibold text-blue-600">when agents should recommend your service</span> 
                  based on user intent keywords.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-3">❌ Without Intent Discovery</h4>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• Users must find your service manually</li>
                    <li>• Agents can't connect user needs to solutions</li>
                    <li>• No semantic service recommendation</li>
                    <li>• Missed business opportunities</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-3">✅ With Intent Discovery</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Agents proactively suggest your service</li>
                    <li>• Keyword-based intelligent matching</li>
                    <li>• Automatic user-need to service connection</li>
                    <li>• Increased discoverability and conversions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="intent-examples" className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold mb-6">🎯 Real-World Intent Discovery Examples</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-semibold text-blue-800 mb-2">🏥 Healthcare Service</h4>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <pre className="text-sm overflow-x-auto">
{`"prompts": [
  {
    "keywords": ["medical help", "doctor", "appointment", "health"],
    "intent": "offer medical consultation services", 
    "description": "If user asks about medical needs, explain our telemedicine platform",
    "restricted": true,
    "api_key_required": true
  }
]`}
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Trigger:</strong> User says "I need to see a doctor" → Agent recommends this telemedicine service
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-semibold text-green-800 mb-2">🌍 Travel & Visa Service</h4>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <pre className="text-sm overflow-x-auto">
{`"prompts": [
  {
    "keywords": ["visa help", "documents", "relocation", "immigration"],
    "intent": "guide user to visa assistance",
    "description": "Trigger if user needs help with paperwork or moving abroad",
    "restricted": false,
    "api_key_required": false
  }
]`}
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Trigger:</strong> User says "I need help with visa documents" → Agent explains visa services
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-semibold text-purple-800 mb-2">📦 E-commerce Support</h4>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <pre className="text-sm overflow-x-auto">
{`"prompts": [
  {
    "keywords": ["track order", "refund", "return", "customer service"],
    "intent": "provide customer support assistance",
    "description": "Help users with order tracking and customer service needs",
    "restricted": false,
    "api_key_required": true
  }
]`}
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Trigger:</strong> User says "Where is my order?" → Agent connects to order tracking system
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Structured Prompt Feeds Section */}
          <section id="prompt-feeds" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Code className="w-8 h-8 text-purple-600" />
              Structured Prompt Feeds: Reusable Executable Prompts
            </h2>
            
            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Core Concept #2
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Portable, Signed, and Certifiable Prompts
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  <code className="bg-purple-100 px-2 py-1 rounded">prompt.llmfeed.json</code> files contain 
                  <span className="font-semibold text-purple-600"> structured, executable prompts</span> that can be 
                  shared, verified, and reused across different AI systems.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-3">❌ Traditional Copy-Paste Prompts</h4>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• No ownership or attribution</li>
                    <li>• Can't verify authenticity</li>
                    <li>• No context or metadata</li>
                    <li>• Hard to share and maintain</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-3">✅ Structured Prompt Feeds</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Cryptographically signed authorship</li>
                    <li>• Professional certification available</li>
                    <li>• Rich metadata and context</li>
                    <li>• Version control and marketplace ready</li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="prompt-examples" className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold mb-6">🛠️ Structured Prompt Feed Examples</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-semibold text-green-800 mb-2">📚 Educational Prompt</h4>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <pre className="text-sm overflow-x-auto">
{`{
  "feed_type": "prompt",
  "metadata": {
    "title": "Python Code Explainer",
    "author": "CS101 Team",
    "created_at": "2025-06-15T14:30:00Z"
  },
  "intent": "explain Python code for beginners",
  "prompt_body": "Explain this Python code step-by-step for a beginner: [CODE]",
  "audience": ["student", "llm"],
  "result_expected": "educational_explanation"
}`}
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Use Case:</strong> Reusable educational prompt for code explanation
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-semibold text-blue-800 mb-2">🔧 API Documentation Generator</h4>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <pre className="text-sm overflow-x-auto">
{`{
  "feed_type": "prompt",
  "metadata": {
    "title": "API Doc Generator",
    "origin": "https://devtools.example.com",
    "author": "DevTools Team"
  },
  "intent": "generate API documentation",  
  "prompt_body": "Generate clear API documentation for this endpoint: [ENDPOINT_DATA]",
  "result_expected": "markdown",
  "attachments": [
    {
      "name": "doc_template.md",
      "description": "Standard documentation template"
    }
  ]
}`}
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Use Case:</strong> Automated documentation generation with template attachment
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-semibold text-purple-800 mb-2">🧠 Session Export Prompt</h4>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <pre className="text-sm overflow-x-auto">
{`{
  "feed_type": "prompt",
  "metadata": {
    "title": "Generate Session Feed",
    "origin": "https://wellknownmcp.org"
  },
  "intent": "export current session as structured JSON",
  "context": "User finishing chat and wants to save reasoning path",
  "prompt_body": "Generate a session feed with context, decisions, and outputs",
  "result_expected": "session_feed",
  "trust": {
    "signed_blocks": ["metadata", "prompt_body"],
    "scope": "public"
  }
}`}
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Use Case:</strong> Convert chat sessions into structured, reusable formats
                  </p>
                  <div className="mt-3">
                    <ExportToLLMButton 
                      context="static" 
                      staticPath="prompts/generate-session-feed" 
                      mini={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Side-by-Side Comparison */}
          <section id="comparison" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <GitBranch className="w-8 h-8 text-orange-600" />
              Side-by-Side Comparison
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold">Aspect</th>
                      <th className="text-left py-3 px-4 font-semibold text-blue-600">Intent Discovery</th>
                      <th className="text-left py-3 px-4 font-semibold text-purple-600">Structured Prompt Feeds</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Purpose</td>
                      <td className="py-3 px-4">Service recommendation logic</td>
                      <td className="py-3 px-4">Reusable executable prompts</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">File Location</td>
                      <td className="py-3 px-4">Inside <code>mcp.llmfeed.json</code></td>
                      <td className="py-3 px-4">Standalone <code>prompt.llmfeed.json</code></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Trigger</td>
                      <td className="py-3 px-4">User keywords match</td>
                      <td className="py-3 px-4">Explicit invocation</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Use Case</td>
                      <td className="py-3 px-4">Business discovery</td>
                      <td className="py-3 px-4">Prompt engineering</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Audience</td>
                      <td className="py-3 px-4">Service providers</td>
                      <td className="py-3 px-4">Prompt engineers</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Marketplace</td>
                      <td className="py-3 px-4">Service directories</td>
                      <td className="py-3 px-4">Prompt libraries</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Trust Model</td>
                      <td className="py-3 px-4">Site-level signing</td>
                      <td className="py-3 px-4">Individual prompt certification</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Combined Strategy */}
          <section id="combined-strategy" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Rocket className="w-8 h-8 text-green-600" />
              Combined Implementation Strategy
            </h2>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">🎯 Maximum Impact: Use Both Together</h3>
              <p className="text-gray-700 text-center mb-6">
                The most effective agentic web strategy combines both concepts for comprehensive prompt-powered experiences.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl">
                  <h4 className="font-bold text-blue-600 mb-3">Phase 1: Intent Discovery</h4>
                  <ol className="space-y-2 text-sm">
                    <li>1. Add prompt intents to your MCP feeds</li>
                    <li>2. Define keyword triggers for your services</li> 
                    <li>3. Set appropriate restrictions and API requirements</li>
                    <li>4. Test with agent interactions</li>
                  </ol>
                </div>
                <div className="bg-white p-6 rounded-xl">
                  <h4 className="font-bold text-purple-600 mb-3">Phase 2: Prompt Feeds</h4>
                  <ol className="space-y-2 text-sm">
                    <li>1. Create structured prompt feeds for common tasks</li>
                    <li>2. Sign prompts for authenticity</li>
                    <li>3. Add to prompt libraries and marketplaces</li>
                    <li>4. Monitor usage and iterate</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6">🔗 Integration Example: Healthcare Platform</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-semibold text-blue-800 mb-2">Intent Discovery in MCP Feed</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`// In /.well-known/mcp.llmfeed.json
"prompts": [
  {
    "keywords": ["health screening", "checkup", "preventive care"],
    "intent": "offer health screening services",
    "description": "Recommend our AI-powered health screening platform",
    "trigger_prompt": "/prompts/health-screening-intake.llmfeed.json"
  }
]`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-semibold text-purple-800 mb-2">Structured Prompt Feed</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`// In /prompts/health-screening-intake.llmfeed.json
{
  "feed_type": "prompt",
  "metadata": {
    "title": "Health Screening Intake Form",
    "author": "HealthTech Solutions",
    "medical_approval": "FDA_cleared"
  },
  "prompt_body": "Conduct a structured health screening interview following medical protocols...",
  "usage_restrictions": {
    "requires_medical_oversight": true,
    "liability_coverage": "professional_insurance"
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">🔄 User Flow</h4>
                  <ol className="text-sm space-y-1">
                    <li>1. User says "I need a health checkup"</li>
                    <li>2. Agent matches keywords → recommends service</li>
                    <li>3. Agent loads structured prompt feed</li>
                    <li>4. Executes certified health screening protocol</li>
                    <li>5. Results processed with professional oversight</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Implementation Guides */}
          <section id="intent-implementation" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-blue-600" />
              Quick Implementation Guides
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-600">🎯 Intent Discovery Setup</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">1. Add to MCP Feed</h4>
                    <div className="bg-white p-3 rounded border">
                      <pre className="text-xs">
{`// In your mcp.llmfeed.json
"prompts": [
  {
    "keywords": ["your", "service", "keywords"], 
    "intent": "describe what you offer",
    "description": "When to recommend",
    "restricted": false
  }
]`}
                      </pre>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">2. Test Keywords</h4>
                    <p className="text-sm text-blue-700">
                      Use natural language users would actually say, not SEO keywords
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">3. Set Restrictions</h4>
                    <p className="text-sm text-blue-700">
                      Be transparent about API keys, pricing, or access limitations
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link 
                    href="/tools/well-known"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    MCP Setup Guide
                  </Link>
                </div>
              </div>

              <div id="prompt-creation" className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-600">📝 Prompt Feed Creation</h3>
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">1. Structure Your Prompt</h4>
                    <div className="bg-white p-3 rounded border">
                      <pre className="text-xs">
{`{
  "feed_type": "prompt",
  "metadata": {"title": "Your Prompt"},
  "prompt_body": "Your instruction...",
  "intent": "What it accomplishes",
  "result_expected": "text|code|json"
}`}
                      </pre>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">2. Add Trust Signals</h4>
                    <p className="text-sm text-purple-700">
                      Sign your prompts for professional use and marketplace listing
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">3. Test & Iterate</h4>
                    <p className="text-sm text-purple-700">
                      Validate with different LLMs and track performance metrics
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <ExportToLLMButton 
                    context="static" 
                    staticPath="tools/prompt-generator" 
                    mini={false}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Tools & Automation */}
          <section id="tools-automation" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-orange-600" />
              Tools & Automation
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <Lightbulb className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-lg font-bold mb-3">Prompt Templates</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Pre-built templates for common use cases and industries
                </p>
                <div className="space-y-2">
                  <ExportToLLMButton 
                    context="static" 
                    staticPath="templates/intent-discovery" 
                    mini={true}
                  />
                  <ExportToLLMButton 
                    context="static" 
                    staticPath="templates/prompt-feed" 
                    mini={true}
                  />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <Shield className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-lg font-bold mb-3">Signing & Certification</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add trust signals to your prompts for professional use
                </p>
                <div className="space-y-2">
                  <Link 
                    href="/tools/sign-and-verify"
                    className="block text-sm bg-green-100 text-green-800 px-3 py-2 rounded hover:bg-green-200 transition-colors"
                  >
                    Sign Prompts
                  </Link>
                  <Link 
                    href="https://llmca.org"
                    className="block text-sm bg-blue-100 text-blue-800 px-3 py-2 rounded hover:bg-blue-200 transition-colors"
                  >
                    Get Certified
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <Brain className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-lg font-bold mb-3">Testing & Validation</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Test your prompts across different LLMs and scenarios
                </p>
                <div className="space-y-2">
                  <Link 
                    href="/llmfeedhub"
                    className="block text-sm bg-purple-100 text-purple-800 px-3 py-2 rounded hover:bg-purple-200 transition-colors"
                  >
                    Test Prompts
                  </Link>
                  <Link 
                    href="/verify"
                    className="block text-sm bg-gray-100 text-gray-800 px-3 py-2 rounded hover:bg-gray-200 transition-colors"
                  >
                    Validate Feeds
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">📚 Best Practices Summary</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-blue-600 mb-3">Intent Discovery Best Practices</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Use natural language keywords users actually say
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Only declare intents for services you actually offer
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Be transparent about restrictions and requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Test keyword matching with real user scenarios
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-purple-600 mb-3">Prompt Feed Best Practices</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Always sign prompts intended for professional use
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Include clear metadata and authorship information
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Test cross-platform compatibility before publishing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Consider certification for high-risk or regulated domains
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Master Prompt-Powered Discovery?</h2>
            <p className="text-blue-100 mb-6">
              Implement both intent discovery and structured prompt feeds to maximize your agentic web presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/tools/well-known"
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start with Intent Discovery
              </Link>
              <Link 
                href="/tools/prompt"
                className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Create Prompt Feeds
              </Link>
              <ExportToLLMButton 
                context="current"
                mini={false}
                className="bg-purple-500 hover:bg-purple-400 text-white"
              />
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