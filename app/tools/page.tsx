import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { 
  Code, Shield, Globe, Zap, Users, Puzzle, 
  FileCheck, Database, Smartphone, Crown,
  Eye, Terminal, Settings, Package, Award,
  GitBranch, ChevronRight, Star, Rocket
} from 'lucide-react'

interface ToolCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  badge?: string
  badgeColor?: string
  priority?: 'high' | 'medium' | 'low'
}

function ToolCard({ title, description, href, icon, badge, badgeColor = 'blue', priority = 'medium' }: ToolCardProps) {
  const priorityStyles = {
    high: 'border-green-200 bg-green-50 hover:bg-green-100',
    medium: 'border-gray-200 bg-white hover:bg-gray-50', 
    low: 'border-gray-100 bg-gray-50 hover:bg-gray-100'
  }

  const badgeStyles = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    orange: 'bg-orange-100 text-orange-800',
    red: 'bg-red-100 text-red-800'
  }

  return (
    <Link
      href={href}
      className={`group block border rounded-xl p-6 transition-all duration-200 ${priorityStyles[priority]}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
              {title}
            </h3>
            {badge && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${badgeStyles[badgeColor]}`}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
      </div>
    </Link>
  )
}

export default function ToolsPage() {
  return (
    <>
      <SeoHead
        title="🧰 Tools - Complete MCP Ecosystem | WellKnownMCP"
        description="Explore the complete MCP ecosystem: validation tools, integration patterns, credential management, signature verification, and agent development tools."
        canonicalUrl="https://wellknownmcp.org/tools"
        keywords={[
          'MCP tools',
          'LLMFeed tools',
          'agent development',
          'feed validation',
          'integration patterns',
          'credential management',
          'signature verification',
          'developer ecosystem'
        ]}
        llmIntent="browse-tools"
        llmTopic="mcp-ecosystem-utilities"
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <PageTitle
          title="🧰 Tools"
          subtitle="Everything you need to make your site, app, or agent compatible with the Model Context Protocol"
        />

        {/* Hero Stats */}
        <div className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-900">25+</div>
              <div className="text-sm text-blue-700">Developer Tools</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">100%</div>
              <div className="text-sm text-green-700">Open Standards</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-900">3</div>
              <div className="text-sm text-purple-700">Integration Levels</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-900">∞</div>
              <div className="text-sm text-orange-700">Possibilities</div>
            </div>
          </div>
        </div>

        {/* Essential Tools */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-900">Essential Tools</h2>
            <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
              Start Here
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <ToolCard
              icon={<Globe className="w-6 h-6 text-blue-600" />}
              title="Well-Known Entrypoints"
              description="Declare how agents should enter and explore your service"
              href="/tools/well-known"
              priority="high"
              badge="Foundation"
              badgeColor="green"
            />
            
            <ToolCard
              icon={<FileCheck className="w-6 h-6 text-green-600" />}
              title="Validation Tools"
              description="Complete validation ecosystem: CLI, IDE, browser tools, and CI/CD integration"
              href="/tools/validation-tools"
              priority="high"
              badge="New"
              badgeColor="green"
            />
            
            <ToolCard
              icon={<Shield className="w-6 h-6 text-purple-600" />}
              title="Sign & Verify"
              description="Understand and apply trust scopes, certifiers and signature blocks"
              href="/tools/sign-and-verify"
              priority="high"
              badge="Security"
              badgeColor="purple"
            />
            
            <ToolCard
              icon={<Eye className="w-6 h-6 text-indigo-600" />}
              title="LLMFeedHub"
              description="Preview and simulate any feed, static or MCP-enabled"
              href="/llmfeedhub"
              priority="high"
              badge="Interactive"
              badgeColor="blue"
            />
          </div>
        </section>

        {/* Security & Trust */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Security & Trust</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <ToolCard
              icon={<Crown className="w-6 h-6 text-purple-600" />}
              title="Credential Management"
              description="Secure API access for AI agents with cryptographic integrity and scoped permissions"
              href="/tools/credential-explained"
              badge="Critical"
              badgeColor="red"
            />
            
            <ToolCard
              icon={<Award className="w-6 h-6 text-emerald-600" />}
              title="Certification Process"
              description="LLMCA trust validation for MCP feeds - from individual to enterprise certification"
              href="/tools/certification-process"
              badge="Trust"
              badgeColor="green"
            />
            
            <ToolCard
              icon={<Database className="w-6 h-6 text-blue-600" />}
              title="API Access Explained"
              description="How agents use /mcp-api.llmfeed.json with a credential"
              href="/tools/api-explained"
            />
            
            <ToolCard
              icon={<Package className="w-6 h-6 text-orange-600" />}
              title="Badges & Trust"
              description="Display signatures and trust levels visually"
              href="/tools/badges"
            />
          </div>
        </section>

        {/* Development & Integration */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Development & Integration</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <ToolCard
              icon={<Puzzle className="w-6 h-6 text-indigo-600" />}
              title="Integration Patterns"
              description="Building the MCP ecosystem together - CMS, cloud, serverless, and enterprise patterns"
              href="/tools/integration-patterns"
              badge="Community"
              badgeColor="purple"
            />
            
            <ToolCard
              icon={<Zap className="w-6 h-6 text-yellow-600" />}
              title="LLMFeedForge Explained"
              description="Visual feed builder for creating, validating, and signing LLMFeed files"
              href="/tools/llmfeedforge-explained"
              badge="Popular"
              badgeColor="orange"
            />
            
            <ToolCard
              icon={<Rocket className="w-6 h-6 text-green-600" />}
              title="Export Button"
              description="Generate an interactive export button and llmfeed.json for any page"
              href="/tools/export-button"
            />
            
            <ToolCard
              icon={<Settings className="w-6 h-6 text-gray-600" />}
              title="Schema Validation"
              description="Canonical JSON schema for validating .llmfeed.json feeds"
              href="/tools/schema"
            />
          </div>
        </section>

        {/* Understanding MCP */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Understanding MCP</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ToolCard
              icon={<Database className="w-5 h-5 text-blue-600" />}
              title="MCP Explained"
              description="Understand the Anthropic MCP and the LLMFeed layer"
              href="/tools/mcp-explained"
            />
            
            <ToolCard
              icon={<Users className="w-5 h-5 text-purple-600" />}
              title="Agent Behaviour"
              description="How LLMs interpret, trust, and interact with MCP feeds"
              href="/tools/agent-behavior"
            />
            
            <ToolCard
              icon={<Eye className="w-5 h-5 text-indigo-600" />}
              title="Prompt Intents"
              description="How prompts and keywords map to declared agent actions"
              href="/tools/prompts-explained"
            />
            
            <ToolCard
              icon={<Smartphone className="w-5 h-5 text-green-600" />}
              title="Mobile App Feed"
              description="Declare what your app does — let agents interact like native users"
              href="/tools/app-mobile-explained"
            />
            
            <ToolCard
              icon={<FileCheck className="w-5 h-5 text-orange-600" />}
              title="Capabilities Explained"
              description="API capabilities, tool definitions, and agent interaction patterns"
              href="/tools/capabilities-explained"
            />
            
            <ToolCard
              icon={<Package className="w-5 h-5 text-purple-600" />}
              title="Export Explained"
              description="Content packaging, metadata enrichment, and agent consumption patterns"
              href="/tools/export-explained"
            />
          </div>
        </section>

        {/* Advanced Tools */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-6 h-6 text-gray-600" />
            <h2 className="text-2xl font-bold text-gray-900">Advanced Tools</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ToolCard
              icon={<Code className="w-5 h-5 text-blue-600" />}
              title="Prompt Tool"
              description="Structure, sign and export prompts as agent-compatible .llmfeed.json files"
              href="/tools/prompt"
            />
            
            <ToolCard
              icon={<GitBranch className="w-5 h-5 text-green-600" />}
              title="Session Export"
              description="Capture an LLM session as a structured feed. Replay or transfer it anywhere"
              href="/tools/session-export"
            />
            
            <ToolCard
              icon={<Database className="w-5 h-5 text-purple-600" />}
              title="LLM Index"
              description="Create a feed index to guide agents across your ecosystem"
              href="/tools/llm-index"
            />
            
            <ToolCard
              icon={<Shield className="w-5 h-5 text-red-600" />}
              title="Feed Flagging System"
              description="How malicious or misleading feeds can be reported, reviewed, and revoked"
              href="/tools/feed-flagging"
            />
            
            <ToolCard
              icon={<Users className="w-5 h-5 text-indigo-600" />}
              title="User Spaces"
              description="Declare MCP behavior for user profiles on platforms like GitHub, Notion, etc."
              href="/tools/user-spaces"
            />
            
            <ToolCard
              icon={<Package className="w-5 h-5 text-orange-600" />}
              title="Pricing Feed"
              description="Declare unit costs, plans, and payment methods for your API or service"
              href="/tools/pricing"
            />
          </div>
        </section>

        {/* Exploration & Verification */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Exploration & Verification</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <ToolCard
              icon={<FileCheck className="w-6 h-6 text-green-600" />}
              title="Verify Feeds"
              description="Upload or check any feed's signature against a public key"
              href="/verify"
            />
            
            <ToolCard
              icon={<Database className="w-6 h-6 text-blue-600" />}
              title="Feeds Directory"
              description="List of known feeds indexed and browsable for inspection"
              href="/feeds"
            />
            
            <ToolCard
              icon={<Globe className="w-6 h-6 text-purple-600" />}
              title="Preview a URL"
              description="Drop a URL to see how agents interpret it (check the /.well-known/)"
              href="/llmfeedhub/preview"
            />
            
            <ToolCard
              icon={<Package className="w-6 h-6 text-gray-600" />}
              title="SDK (Work in Progress)"
              description="Use or extend our SDK to generate, sign or parse LLMFeeds"
              href="/sdk"
              badge="Coming Soon"
              badgeColor="orange"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <div className="mb-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">🚀 Quick Actions</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Getting Started</h3>
              <p className="text-sm text-gray-600 mb-4">New to MCP? Start with the essentials</p>
              <Link 
                href="/tools/well-known"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Begin Journey
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Validate Feeds</h3>
              <p className="text-sm text-gray-600 mb-4">Test your existing feeds for compliance</p>
              <Link 
                href="/llmfeedhub"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Test Now
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Join Community</h3>
              <p className="text-sm text-gray-600 mb-4">Connect with other developers</p>
              <Link 
                href="/join"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Join Us
              </Link>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="text-center bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📚 Additional Resources</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/spec/01_llmfeed/llmfeed" className="text-blue-600 hover:text-blue-800 font-medium">
              Full Specification →
            </Link>
            <Link href="/faq" className="text-blue-600 hover:text-blue-800 font-medium">
              FAQ →
            </Link>
            <Link href="/ecosystem" className="text-blue-600 hover:text-blue-800 font-medium">
              Ecosystem →
            </Link>
            <Link href="/join" className="text-blue-600 hover:text-blue-800 font-medium">
              Join Community →
            </Link>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-center items-center gap-4">
              <ExportToLLMButton 
                context="static"
                showSignatureStatus
                customLabel="Export Tools Guide"
              />
            </div>
          </div>
        </div>

        {/* Share */}
        <div className="mt-12">
          <ShareButtons 
            title="MCP Tools - Complete Developer Ecosystem"
            hashtags={["MCP", "tools", "developers", "AI", "agents"]}
          />
        </div>
      </div>
    </>
  )
}