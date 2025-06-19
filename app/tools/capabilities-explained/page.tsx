import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Globe, Folder, FileText, Settings, Code, Package, 
  ArrowRight, CheckCircle, Lightbulb, Zap, BookOpen, Download, 
  ExternalLink, AlertCircle, GitMerge, Copy, Play, Shield,
  Cpu, Network, Database, Terminal, Eye, Users, Clock, Award,
  Bot, Workflow, Cog, Lock, Rocket, Target, Brain, Layers
} from 'lucide-react'

export default function CapabilitiesExplainedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SeoHead 
          title="MCP Server Capabilities Explained | Agent Automation Guide"
          description="Learn how MCP server capabilities enable autonomous AI agent actions. From basic tool exposure to intelligent workflow orchestration - complete guide with examples."
          pageType="documentation"
          seoMode="high-ctr"
          llmIntent="explanation"
          llmTopic="agent-capabilities-automation"
          llmCapabilities={["education", "automation", "orchestration"]}
          llmTrustLevel="certified"
          llmContentType="guide"
          llmAudience={["developer", "business", "enterprise-architect"]}
          keywords={[
            "MCP server capabilities", "agent automation capabilities", "autonomous AI actions",
            "MCP tools orchestration", "AI agent workflow automation", "capabilities feed",
            "agent action discovery", "intelligent automation", "MCP capabilities guide"
          ]}
          canonicalUrl="https://wellknownmcp.org/capabilities-explained"
        />

        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">MCP Server Capabilities Explained</h1>
              <p className="text-xl text-gray-600 mt-2">From tool exposure to autonomous agent orchestration</p>
            </div>
          </div>
          
          {/* Revolution Showcase */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">🔧 MCP Servers (Anthropic)</h2>
                <p className="text-green-100 mb-2">Tools that agents can call:</p>
                <ul className="text-sm text-green-100 space-y-1">
                  <li>• Manual tool configuration</li>
                  <li>• Local JSON-RPC protocol</li>
                  <li>• Human oversight required</li>
                  <li>• One-time tool execution</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-3">🚀 Capabilities (Enhanced)</h2>
                <p className="text-blue-100 mb-2">Actions that agents orchestrate:</p>
                <ul className="text-sm text-blue-100 space-y-1">
                  <li>• Automatic capability discovery</li>
                  <li>• Web-native REST endpoints</li>
                  <li>• Autonomous workflow execution</li>
                  <li>• Multi-step orchestration</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-medium">
                💡 <strong>Evolution:</strong> From "tools agents can use" → "actions agents can orchestrate"
              </p>
            </div>
          </div>
          
          {/* Quick Navigation */}
          <div className="bg-white border border-green-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📚 Complete Guide</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h3 className="font-medium text-green-900 mb-2">🏗️ MCP Foundation</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• <a href="#mcp-servers-basics" className="hover:text-green-600">Server Basics</a></li>
                  <li>• <a href="#tools-vs-capabilities" className="hover:text-green-600">Tools vs Capabilities</a></li>
                  <li>• <a href="#automation-challenge" className="hover:text-green-600">Automation Challenge</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-blue-900 mb-2">🤖 Agent Orchestration</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• <a href="#capability-discovery" className="hover:text-blue-600">Auto-Discovery</a></li>
                  <li>• <a href="#workflow-examples" className="hover:text-blue-600">Workflow Examples</a></li>
                  <li>• <a href="#trust-security" className="hover:text-blue-600">Trust & Security</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-purple-900 mb-2">🛠️ Implementation</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• <a href="#migration-guide" className="hover:text-purple-600">Migration Guide</a></li>
                  <li>• <a href="#real-examples" className="hover:text-purple-600">Real Examples</a></li>
                  <li>• <a href="#best-practices" className="hover:text-purple-600">Best Practices</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* MCP Servers Foundation */}
        <Card className="mb-8" id="mcp-servers-basics">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cog className="w-5 h-5 text-blue-600" />
              MCP Servers: The Foundation (Anthropic)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">🔧 What MCP Servers Provide</h4>
                <p className="text-blue-800 mb-3">
                  MCP servers expose <strong>tools, resources, and prompts</strong> that AI models can use through 
                  a standardized JSON-RPC protocol. Think of them as "API wrappers" that make external systems accessible to AI.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2">🛠️ Tools</h5>
                    <p className="text-blue-800">Functions that models can call</p>
                    <p className="text-xs text-blue-600 mt-1">e.g., create_file, query_database</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2">📋 Resources</h5>
                    <p className="text-blue-800">Data that models can read</p>
                    <p className="text-xs text-blue-600 mt-1">e.g., file contents, API responses</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2">💬 Prompts</h5>
                    <p className="text-blue-800">Templates for common tasks</p>
                    <p className="text-xs text-blue-600 mt-1">e.g., code review, data analysis</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">📝 Standard MCP Server Example</h4>
                <pre className="text-sm bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`// Typical MCP Server Configuration
{
  "mcpServers": {
    "github-server": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    },
    "database-server": {
      "command": "python",
      "args": ["-m", "mcp_server_database"],
      "env": {
        "DATABASE_URL": "postgresql://..."
      }
    }
  }
}

// What the agent gets:
{
  "tools": [
    {
      "name": "create_issue",
      "description": "Create a new GitHub issue",
      "parameters": {
        "title": "string",
        "body": "string",
        "labels": "array"
      }
    },
    {
      "name": "query_database", 
      "description": "Execute SQL query",
      "parameters": {
        "query": "string"
      }
    }
  ]
}`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  ✅ <strong>What this enables:</strong> Claude can create GitHub issues and query databases through structured tool calls.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tools vs Capabilities */}
        <Card className="mb-8 border-orange-200 bg-orange-50/50" id="tools-vs-capabilities">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              Tools vs Capabilities: The Key Distinction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Cog className="w-4 h-4" />
                    MCP Tools (Current)
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                      <span><strong>Single actions:</strong> One tool = one function call</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                      <span><strong>Local configuration:</strong> Manual setup required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                      <span><strong>Human oversight:</strong> User approval for each action</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                      <span><strong>Static definitions:</strong> Fixed tool descriptions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Workflow className="w-4 h-4" />
                    Enhanced Capabilities (Evolution)
                  </h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                      <span><strong>Workflow orchestration:</strong> Multi-step automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                      <span><strong>Auto-discovery:</strong> Agents find capabilities automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                      <span><strong>Risk-based autonomy:</strong> Smart consent based on trust</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                      <span><strong>Rich metadata:</strong> Intent, risk, and behavioral guidance</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Real-World Example: Booking an Appointment
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">🔧 MCP Tools Approach</h5>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-blue-700 mb-2"><strong>User:</strong> "Book me a doctor's appointment"</p>
                      <p className="text-blue-700 mb-2"><strong>Agent:</strong> "I can help you with that. Let me use the booking tool..."</p>
                      <ol className="text-xs text-blue-600 space-y-1">
                        <li>1. Calls book_appointment tool</li>
                        <li>2. User provides details manually</li>
                        <li>3. Tool creates appointment</li>
                        <li>4. Returns confirmation</li>
                        <li>5. <strong>User manually adds to calendar</strong></li>
                        <li>6. <strong>User sets own reminders</strong></li>
                      </ol>
                      <p className="text-blue-600 text-xs mt-2"><strong>Result:</strong> 1 automated step, 5+ manual steps</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-800 mb-2">🚀 Capabilities Approach</h5>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-green-700 mb-2"><strong>User:</strong> "Book me a doctor's appointment"</p>
                      <p className="text-green-700 mb-2"><strong>Agent:</strong> "Done! You're booked for Tuesday 2PM. Details sent to your email."</p>
                      <ol className="text-xs text-green-600 space-y-1">
                        <li>1. Discovers booking capabilities</li>
                        <li>2. Checks available times automatically</li>
                        <li>3. Books optimal appointment</li>
                        <li>4. Adds to calendar automatically</li>
                        <li>5. Sets reminders automatically</li>
                        <li>6. Sends confirmation email</li>
                      </ol>
                      <p className="text-green-600 text-xs mt-2"><strong>Result:</strong> Complete workflow automation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The Automation Challenge */}
        <Card className="mb-8" id="automation-challenge">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              The Web Automation Challenge
            </CardTitle>  
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-3">🚧 Current Limitations of MCP Tools</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-red-800 mb-2">Discovery Problem</h5>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• No automatic discovery mechanism</li>
                      <li>• Manual configuration required</li>
                      <li>• Limited to pre-configured tools</li>
                      <li>• Can't adapt to new services</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-800 mb-2">Orchestration Problem</h5>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Each tool call requires approval</li>
                      <li>• No workflow automation</li>
                      <li>• Limited cross-tool coordination</li>
                      <li>• High user friction</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">💡 What Users Actually Want</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Natural Intent Expression</h5>
                      <p className="text-sm text-gray-700">"Book me a flight to Paris next week and find a hotel near the Louvre"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Autonomous Execution</h5>
                      <p className="text-sm text-gray-700">Agent should discover services, compare options, and execute bookings automatically</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Intelligent Coordination</h5>
                      <p className="text-sm text-gray-700">Coordinate flight times with hotel check-in, add to calendar, set reminders</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-2">🎯 The Gap</h4>
                <p className="text-orange-800 text-lg font-medium">
                  MCP tools provide the <strong>building blocks</strong>, but capabilities provide the <strong>intelligent orchestration</strong> 
                  that users actually want.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Capability Discovery */}
        <Card className="mb-8 border-green-200 bg-green-50/50" id="capability-discovery">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              Capability Auto-Discovery: How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-white border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-3">🔍 Discovery Process</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Agent encounters service</h5>
                      <p className="text-sm text-gray-700">User mentions "book a flight" → Agent identifies airline websites</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Discovers capabilities</h5>
                      <p className="text-sm text-gray-700">Checks <code>/.well-known/capabilities.llmfeed.json</code> for available actions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Evaluates trust & risk</h5>
                      <p className="text-sm text-gray-700">Checks signatures, risk scores, and required consent levels</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Orchestrates workflow</h5>
                      <p className="text-sm text-gray-700">Combines multiple capabilities into intelligent automation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">📋 Capabilities Feed Structure</h4>
                <pre className="text-sm bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`{
  "feed_type": "capabilities",
  "metadata": {
    "title": "AirlineBooking Pro Capabilities",
    "origin": "https://airline-booking.com",
    "description": "Flight booking and travel automation"
  },
  "capabilities": [
    {
      "name": "searchFlights",
      "method": "GET",
      "path": "/api/flights/search",
      "description": "Search available flights with preferences",
      "input_schema": {
        "required": ["origin", "destination", "departure_date"],
        "optional": ["return_date", "passengers", "class"]
      },
      "requires_user_consent": false,
      "trust_level_required": "basic",
      "risk_score": 0.2,
      "audience": ["llm", "booking_agent"]
    },
    {
      "name": "bookFlight",
      "method": "POST", 
      "path": "/api/flights/book",
      "description": "Book selected flight with payment",
      "requires_user_consent": true,
      "trust_level_required": "verified_payment",
      "risk_score": 0.8,
      "audit_trail": "mandatory"
    },
    {
      "name": "addToCalendar",
      "method": "POST",
      "path": "/api/calendar/add",
      "description": "Add flight details to user's calendar",
      "requires_user_consent": false,
      "risk_score": 0.1,
      "follow_up_capability": true
    }
  ]
}`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  ✅ <strong>Key innovation:</strong> Risk-based consent, workflow orchestration, and trust verification built-in.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Examples */}
        <Card className="mb-8" id="workflow-examples">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="w-5 h-5 text-purple-600" />
              Real-World Workflow Examples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Healthcare Example */}
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50/50">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Healthcare: Comprehensive Patient Care
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">🗣️ User Intent</h5>
                    <p className="text-sm bg-white p-3 rounded border italic">
                      "I need to get my lab results analyzed and book a follow-up if needed"
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">🤖 Agent Orchestration</h5>
                    <ol className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Discovers lab analysis capabilities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Analyzes results with AI insights</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Determines follow-up needed</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Books appropriate specialist</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Sends analysis to doctor</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Adds appointment to calendar</span>
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white rounded border border-blue-200">
                  <h6 className="font-medium text-blue-900 mb-2">Capabilities Used:</h6>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">analyzeLabResults</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">bookSpecialistAppointment</span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">sendSecureMessage</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">addToCalendar</span>
                  </div>
                </div>
              </div>

              {/* Financial Example */}
              <div className="border border-green-200 rounded-lg p-4 bg-green-50/50">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Finance: Intelligent Portfolio Management
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-800 mb-2">🗣️ User Intent</h5>
                    <p className="text-sm bg-white p-3 rounded border italic">
                      "Rebalance my portfolio based on current market conditions"
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-800 mb-2">🤖 Agent Orchestration</h5>
                    <ol className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Analyzes current portfolio</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Assesses market sentiment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Calculates optimal allocation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Requests user approval</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Executes trades automatically</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Updates portfolio dashboard</span>
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white rounded border border-green-200">
                  <h6 className="font-medium text-green-900 mb-2">Risk-Based Execution:</h6>
                  <div className="grid md:grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Low Risk</span>
                      <p className="mt-1">Market analysis (automatic)</p>
                    </div>
                    <div>
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">Medium Risk</span>
                      <p className="mt-1">Portfolio calculation (notification)</p>
                    </div>
                    <div>
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded">High Risk</span>
                      <p className="mt-1">Trade execution (explicit consent)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise Example */}
              <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/50">
                <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Enterprise: Automated Contract Workflow
                </h4>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-purple-800 mb-2">🗣️ Business Intent</h5>
                      <p className="text-sm bg-white p-3 rounded border italic">
                        "Process this vendor contract and get it approved if it meets our standard terms"
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-purple-800 mb-2">🤖 Agent Orchestration</h5>
                      <ol className="text-sm space-y-1">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Extracts contract terms with AI</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Compares against company policies</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span>Flags compliance issues</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Routes for appropriate approval</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Updates contract management system</span>
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border border-purple-200">
                    <h6 className="font-medium text-purple-900 mb-2">Enterprise Integration:</h6>
                    <div className="text-sm text-purple-800">
                      <p><strong>Compliance:</strong> Automatic check against SOX, GDPR, industry regulations</p>
                      <p><strong>Audit Trail:</strong> Complete workflow logging for compliance reviews</p>
                      <p><strong>Role-Based Access:</strong> Different capabilities based on user role and certification level</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust & Security */}
        <Card className="mb-8" id="trust-security">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-600" />
              Trust & Security: Risk-Based Autonomy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-3">🛡️ The Security Challenge</h4>
                <p className="text-red-800 mb-3">
                  The more autonomous agents become, the more security risks they introduce. 
                  Capabilities solve this with <strong>risk-based consent</strong> and <strong>cryptographic trust</strong>.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded p-3 border border-red-200">
                    <h5 className="font-medium text-green-800 mb-2">🟢 Low Risk</h5>
                    <p className="text-gray-700 mb-2">Information retrieval, search</p>
                    <p className="text-xs text-green-600"><strong>Execution:</strong> Automatic, no consent needed</p>
                  </div>
                  <div className="bg-white rounded p-3 border border-red-200">
                    <h5 className="font-medium text-orange-800 mb-2">🟡 Medium Risk</h5>
                    <p className="text-gray-700 mb-2">Booking, messaging, scheduling</p>
                    <p className="text-xs text-orange-600"><strong>Execution:</strong> Notification + automatic</p>
                  </div>
                  <div className="bg-white rounded p-3 border border-red-200">
                    <h5 className="font-medium text-red-800 mb-2">🔴 High Risk</h5>
                    <p className="text-gray-700 mb-2">Financial transactions, medical</p>
                    <p className="text-xs text-red-600"><strong>Execution:</strong> Explicit user consent required</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">🔐 Trust Levels & Certification</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs font-bold">🌐</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Public Agent</h5>
                      <p className="text-sm text-gray-700">Basic information access, read-only operations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Verified Agent</h5>
                      <p className="text-sm text-gray-700">Identity verified, can perform bookings and basic transactions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">🏅</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Certified Agent</h5>
                      <p className="text-sm text-gray-700">LLMCA-certified, can handle financial and healthcare operations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">🏛️</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Specialized Agent</h5>
                      <p className="text-sm text-gray-700">Domain-specific certification (medical, legal, financial)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-3">🔄 Trust Evolution Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded font-medium">Current (2025)</span>
                    <span className="text-sm text-green-800">User consent required for all actions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded font-medium">Q4 2025</span>
                    <span className="text-sm text-blue-800">Signed capabilities → Automatic with notification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 text-xs rounded font-medium">Q2 2026</span>
                    <span className="text-sm text-purple-800">Certified capabilities → Fully autonomous</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Migration Guide */}
        <Card className="mb-8 border-blue-200 bg-blue-50/50" id="migration-guide">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitMerge className="w-5 h-5 text-blue-600" />
              Migration: From MCP Tools to Enhanced Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-white border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">🔄 Migration Strategy</h4>
                <p className="text-blue-800 mb-4">
                  Transform your existing MCP tools into web-discoverable capabilities while maintaining 100% backward compatibility.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Keep Your MCP Tools (Zero Changes)</h5>
                      <p className="text-sm text-gray-700 mb-2">Your existing local MCP configuration continues working unchanged.</p>
                      <pre className="text-xs bg-gray-100 p-2 rounded">
{`// Your existing MCP tools keep working
{
  "mcpServers": {
    "github-server": { /* unchanged */ },
    "database-server": { /* unchanged */ }
  }
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Create Web-Discoverable Capabilities</h5>
                      <p className="text-sm text-gray-700 mb-2">Transform tools into web-accessible capabilities with enhanced metadata.</p>
                      <pre className="text-xs bg-gray-100 p-2 rounded">
{`// /.well-known/capabilities.llmfeed.json
{
  "feed_type": "capabilities",
  "metadata": {
    "title": "My Development Tools",
    "origin": "https://mysite.com"
  },
  "capabilities": [
    {
      "name": "createGithubIssue",
      "method": "POST",
      "path": "/api/github/issues",
      "description": "Create GitHub issue with smart categorization",
      "requires_user_consent": false,
      "risk_score": 0.3,
      "audience": ["llm", "dev_agent"]
    }
  ]
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Add Enhanced Features</h5>
                      <p className="text-sm text-gray-700">Risk scoring, workflow orchestration, and trust verification.</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Risk-based consent</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Workflow chaining</span>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">Cryptographic trust</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">🛠️ Development Tools</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <ExportToLLMButton context="static" staticPath="demo/capabilities-template" mini={true} /> Template</li>
                    <li>• <a href="/llmfeedhub" className="text-blue-600 hover:underline">Validation Tool</a></li>
                    <li>• <a href="https://wellknownmcp.org/.well-known/capabilities.llmfeed.json" className="text-blue-600 hover:underline">Live Example</a></li>
                    <li>• <a href="/tools/well-known" className="text-blue-600 hover:underline">Implementation Guide</a></li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">📚 Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <a href="/mcp-explained" className="text-blue-600 hover:underline">MCP Basics Guide</a></li>
                    <li>• <a href="/spec" className="text-blue-600 hover:underline">Complete Specification</a></li>
                    <li>• <a href="/faq" className="text-blue-600 hover:underline">FAQ & Troubleshooting</a></li>
                    <li>• <a href="https://github.com/wellknownmcp" className="text-blue-600 hover:underline" target="_blank">GitHub Repository</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real Examples */}
        <Card className="mb-8 border-purple-200 bg-purple-50/50" id="real-examples">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-purple-600" />
              Live Examples & Demonstrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-3">🌐 Explore Real Implementations</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-purple-800 mb-2">Complete Capabilities Feed</h5>
                    <p className="text-sm text-purple-700 mb-3">
                      See a full implementation with multiple capabilities, risk scoring, and trust verification.
                    </p>
                    <a
                      href="https://wellknownmcp.org/.well-known/capabilities.llmfeed.json"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      View Capabilities Feed
                    </a>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-purple-800 mb-2">Interactive Analysis</h5>
                    <p className="text-sm text-purple-700 mb-3">
                      Use LLMFeedHub to analyze and understand the structure of capabilities feeds.
                    </p>
                    <a
                      href="https://wellknownmcp.org/llmfeedhub?wellknown=capabilities"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      Analyze Structure
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">💡 What You'll See</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-900 mb-2">Capability Structure</h5>
                    <ul className="space-y-1 text-purple-800">
                      <li>• Multi-format feed loading capabilities</li>
                      <li>• Risk-based security classification</li>
                      <li>• Trust verification and signatures</li>
                      <li>• Audience targeting by agent type</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-900 mb-2">Advanced Features</h5>
                    <ul className="space-y-1 text-blue-800">
                      <li>• Workflow orchestration examples</li>
                      <li>• Error handling and fallbacks</li>
                      <li>• Performance optimization patterns</li>
                      <li>• Enterprise integration guides</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="mb-8" id="best-practices">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              Best Practices & Implementation Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-3">✅ Do's</h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Start simple:</strong> Begin with low-risk, read-only capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Use risk scoring:</strong> Classify capabilities by security impact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Provide rich metadata:</strong> Help agents understand intent and usage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Implement fallbacks:</strong> Graceful degradation when capabilities fail</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Sign your feeds:</strong> Enable trust-based autonomy</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-3">❌ Don'ts</h4>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Expose high-risk actions</strong> without proper consent mechanisms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Skip input validation</strong> - always validate capability parameters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Ignore rate limiting</strong> - protect your services from abuse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Forget audit trails</strong> for financial or healthcare capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Make everything public</strong> - use audience targeting appropriately</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">🏢 Enterprise Considerations</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Security & Compliance</h5>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Implement proper authentication and authorization</li>
                      <li>• Maintain comprehensive audit logs</li>
                      <li>• Follow industry-specific compliance requirements</li>
                      <li>• Regular security assessments and updates</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Operational Excellence</h5>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Monitor capability usage and performance</li>
                      <li>• Implement circuit breakers and fallbacks</li>
                      <li>• Plan for capacity and scaling requirements</li>
                      <li>• Test disaster recovery procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Vision */}
        <Card className="mb-8 border-gradient-to-r from-blue-200 to-purple-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-blue-600" />
              The Future: Intelligent Agent Orchestration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">🌐 Vision: The Capability-Driven Web</h4>
                <p className="text-lg text-gray-700">
                  Every service exposes intelligent capabilities. Every agent orchestrates complex workflows. 
                  Every user gets sophisticated automation through simple conversation.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h5 className="font-medium text-blue-900 mb-2">🔮 Near Future (2025-2026)</h5>
                  <ul className="space-y-1 text-blue-800">
                    <li>• Trust-based autonomous execution</li>
                    <li>• Cross-service workflow orchestration</li>
                    <li>• Predictive capability suggestions</li>
                    <li>• Self-optimizing risk assessment</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <h5 className="font-medium text-purple-900 mb-2">🚀 Medium Future (2026-2027)</h5>
                  <ul className="space-y-1 text-purple-800">
                    <li>• AI-powered capability composition</li>
                    <li>• Dynamic workflow adaptation</li>
                    <li>• Cross-domain intelligent integration</li>
                    <li>• Autonomous capability enhancement</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <h5 className="font-medium text-green-900 mb-2">✨ Long Future (2027+)</h5>
                  <ul className="space-y-1 text-green-800">
                    <li>• Self-evolving capability networks</li>
                    <li>• Emergent workflow intelligence</li>
                    <li>• Universal agent interoperability</li>
                    <li>• Seamless human-agent collaboration</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 text-center">💫 The Transformation</h4>
                <p className="text-center text-gray-700">
                  From websites you navigate → to capabilities that orchestrate your intent
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Ready to Build Agent-Orchestrated Experiences?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <p className="text-lg text-gray-700">
                Transform your MCP tools into intelligent capabilities that agents can discover and orchestrate autonomously.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <ExportToLLMButton
                  context="static"
                  staticPath="demo/capabilities-starter"
                  showCurlCommand={true}
                  showDirectUrl={true}
                />
                
                <Link
                  href="/mcp-explained"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <BookOpen className="w-4 h-4" />
                  Learn MCP Basics
                </Link>
                
                <a
                  href="https://wellknownmcp.org/.well-known/capabilities.llmfeed.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Example
                </a>

                <Link
                  href="/tools/well-known"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                >
                  <Settings className="w-4 h-4" />
                  Implementation Guide
                </Link>
              </div>

              <div className="bg-white border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2 text-center">🎯 Start Your Journey</h4>
                <p className="text-center text-gray-700">
                  Join the capability revolution and help build the intelligent web that agents can orchestrate autonomously.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acknowledgment */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="font-medium text-gray-900 mb-1">📚 Acknowledgment & Standards</p>
              <p>
                MCP (Model Context Protocol) is developed by Anthropic. Official documentation at{' '}
                <a href="https://modelcontextprotocol.io" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                  modelcontextprotocol.io
                </a>.
                Capabilities feeds extend MCP with web-native discovery, intelligent orchestration, and trust-based autonomy. 
                This represents our research into the evolution from manual tools to autonomous agent workflows.
              </p>
            </div>
          </div>
        </div>

        <ShareButtons 
          title="MCP Server Capabilities Explained | Agent Automation & Workflow Orchestration Guide"
        />
      </div>
    </div>
  )
}