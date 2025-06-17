import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function ToolCard({
  title,
  description,
  href,
  icon,
}: {
  title: string
  description: string
  href: string
  icon?: string
}) {
  return (
    <Link
      href={href}
      className="block border rounded-lg p-4 hover:bg-muted/40 transition"
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default function ToolsPage() {
  return (
    <>
      <SeoHead
        title="🧰 Tools"
        description="Explore the tools of the MCP ecosystem: export feeds, preview agent behavior, understand capabilities, and more."
        canonicalUrl="https://wellknownmcp.org/tools"
        keywords={[
          'mcp',
          'llmfeed',
          'tools',
          'preview',
          'api',
          'agent',
          'export',
        ]}
        llmlang="en"
        llmIntent="browse tools"
        llmTopic="mcp ecosystem utilities"
      />

      <div className="max-w-3xl mx-auto py-10 space-y-10">
        <PageTitle
          title="🧰 Tools"
          subtitle="Everything you need to make your site, app, or agent compatible with the Model Context Protocol"
        />

        {/* Concepts Section */}
        <section id="concepts">
          <h2 className="text-xl font-semibold mb-4">🧠 Conceptual Tools</h2>
          <div className="space-y-3">
            <ToolCard
              icon="🌐"
              title="Well-Known Entrypoints"
              description="Declare how agents should enter and explore your service"
              href="/tools/well-known"
            />

            <ToolCard
              icon="🔐"
              title="Sign & Verify"
              description="Understand and apply trust scopes, certifiers and signature blocks"
              href="/tools/sign-and-verify"
            />
            <ToolCard
              icon="🔐"
              title="API Access Explained"
              description="How agents use /mcp-api.llmfeed.json with a credential"
              href="/tools/api-explained"
            />
            <ToolCard
              icon="📱"
              title="Mobile App Feed"
              description="Declare what your app does — let agents interact like native users"
              href="/tools/app-mobile-explained"
            />
            <ToolCard
              icon="🤖"
              title="Agent Behaviour"
              description="How LLMs interpret, trust, and interact with MCP feeds"
              href="/tools/agent-behavior"
            />
            <ToolCard
              icon="🎯"
              title="Prompt Intents"
              description="How prompts and keywords map to declared agent actions"
              href="/tools/prompts-explained"
            />

            <ToolCard
              icon="🚩"
              title="Feed Flagging System"
              description="How malicious or misleading feeds can be reported, reviewed, and revoked"
              href="/tools/feed-flagging"
            />
            <ToolCard
              icon="🧍‍♂️"
              title="User Spaces"
              description="Declare MCP behavior for user profiles on platforms like GitHub, Notion, etc."
              href="/tools/user-spaces"
            />
            <ToolCard
              icon="💰"
              title="Pricing Feed"
              description="Declare unit costs, plans, and payment methods for your API or service"
              href="/tools/pricing"
            />
            <ToolCard
              icon="📐"
              title="Schema"
              description="Canonical JSON schema for validating .llmfeed.json feeds"
              href="/tools/schema"
            />
          </div>
        </section>

        {/* Developer Tools */}
        <section id="developer">
          <h2 className="text-xl font-semibold mt-10 mb-4">
            👩‍💻 Developer Tools
          </h2>
          <div className="space-y-3">
            <ToolCard
              icon="✍️"
              title="Prompt Tool"
              description="Structure, sign and export prompts as agent-compatible `.llmfeed.json` files"
              href="/tools/prompt"
            />

            <ToolCard
              icon="🧠"
              title="Session Export"
              description="Capture an LLM session as a structured feed. Replay or transfer it anywhere."
              href="/tools/session-export"
            />
            <ToolCard
              icon="📤"
              title="Export to LLM Button"
              description="Generate an interactive export button and llmfeed.json"
              href="/tools/export-button"
            />
            <ToolCard
              icon="📚"
              title="LLM Index"
              description="Create a feed index to guide agents across your ecosystem"
              href="/tools/llm-index"
            />
            <ToolCard
              icon="🏷️"
              title="Badges & Trust"
              description="Display signatures and trust levels visually"
              href="/tools/badges"
            />

            <ToolCard
              icon="🧬"
              title="SDK (work in progress)"
              description="Use or extend our SDK to generate, sign or parse LLMFeeds"
              href="/sdk"
            />
          </div>
        </section>

        {/* Exploration */}
        <section id="explore">
          <h2 className="text-xl font-semibold mt-10 mb-4">
            🔍 Exploration & Simulation
          </h2>
          <div className="space-y-3">
            <ToolCard
              icon="✅"
              title="Verify Feeds"
              description="Upload or check any feed’s signature against a public key"
              href="/verify"
            />

            <ToolCard
              icon="📁"
              title="Feeds Directory"
              description="List of known feeds indexed and browsable for inspection"
              href="/feeds"
            />

            <ToolCard
              icon="🧪"
              title="LLMFeedHub"
              description="Preview and simulate any feed, static or MCP-enabled"
              href="/llmfeedhub"
            />
            <ToolCard
              icon="🔎"
              title="Preview a url"
              description="Drop a URL to see how agents interpret it (check the /.well-known/)"
              href="/llmfeedhub/preview"
            />
          </div>
        </section>

        <div className="text-sm text-muted-foreground text-center mt-12">
          Want more? See the{' '}
          <Link href="/spec/01_llmfeed/llmfeed" className="underline">
            full spec
          </Link>{' '}
          or{' '}
          <Link href="/join" className="underline">
            join the ecosystem
          </Link>
          .
        </div>
      </div>
    </>
  )
}
