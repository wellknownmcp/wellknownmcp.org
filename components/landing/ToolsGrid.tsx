import Link from 'next/link'
import { Wand2, FileText, PanelRightOpen, FileJson } from 'lucide-react'

const tools = [
  {
    title: 'Prompt Engineering Capsule',
    description: 'Explain structured prompts to agents using declarative JSON. Ideal for onboarding, guidance, and multi-agent workflows.',
    href: '/tools/prompt',
    icon: Wand2
  },
  {
    title: 'Session Feed',
    description: 'Capture and replay agent interaction history — useful for debugging, traceability and audits.',
    href: '/tools/session-feed',
    icon: FileText
  },
  {
    title: 'Export Button',
    description: 'Let users export any page as a signed LLMFeed. Comes with copy, preview, and share options.',
    href: '/tools/export-button',
    icon: PanelRightOpen
  },
  {
    title: 'MCP Feed Explained',
    description: 'Understand how agents interpret your /.well-known/mcp.llmfeed.json declaration — including intent and capabilities.',
    href: '/tools/mcp-explained',
    icon: FileJson
  }
]

export function ToolsGrid() {
  return (
    <section className="max-w-5xl mx-auto py-12">
      <h2 className="text-2xl font-bold text-center mb-2">🧰 Tools and Capsules</h2>
      <p className="text-sm text-muted-foreground text-center max-w-xl mx-auto mb-8">
        These tools extend MCP with actionable formats: prompts, session traces, export capsules... All compatible with signature and certification.
      </p>
      <div className="grid sm:grid-cols-2 gap-6">
        {tools.map(({ title, description, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="border rounded-xl p-4 flex flex-col gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{title}</span>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-sm text-muted-foreground text-center max-w-2xl mx-auto">
        <p>
          The spec is <strong>LLM-ready</strong>. Any smart agent knowing “Kung Fu” can already generate valid <code>.llmfeed.json</code> feeds — straight from this site.
        </p>
        <p className="mt-2">
          Explore feeds in the <Link href="/llmfeedhub" className="text-purple-700 hover:underline">LLMFeedHub</Link>, share yours in the <Link href="/feeds" className="text-purple-700 hover:underline">community feed index</Link>,
          earn <Link href="tools/badges" className="text-purple-700 hover:underline">agent-readable badges</Link>, and be part of the <Link href="/ecosystem" className="text-purple-700 hover:underline">growing MCP ecosystem</Link>.
        </p>
      </div>
    </section>
  )
}
