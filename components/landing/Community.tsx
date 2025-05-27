import Link from 'next/link'
import { BadgeCheck, Globe, Sparkles, ArrowRight } from 'lucide-react'

export function Community() {
  return (
    <section className="mt-16 max-w-4xl mx-auto text-center">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold tracking-wide uppercase">
          Growing
        </span>
      </div>

      <h2 className="text-2xl font-bold mb-6">
        The agentic web is already growing
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto mb-8">
        Some early adopters have already exposed full `.well-known` feeds and
        inspired a new generation of agents. Just feeding your LLM with the spec
        is enough to start exploring.
      </p>

      <div className="border rounded-xl p-6 text-left shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3 mb-2">
          <Globe className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold">wellknownmcp.org</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          This site exposes a complete `.well-known` directory, including MCP,
          capabilities, manifest, and even easter eggs. It also signs credential
          feeds and dynamic exports.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/ecosystem"
            className="text-purple-600 text-sm hover:underline"
          >
            🌐 Ecosystem
          </Link>
          <Link
            href="/.well-known/llm-index.llmfeed.json"
            className="text-purple-600 text-sm hover:underline"
          >
            📁 Feeds
          </Link>
          <Link
            href="/join"
            className="text-purple-600 text-sm hover:underline"
          >
            🤝 Join
          </Link>
          <Link
            href="https://llmfeedforge.org"
            className="text-purple-600 text-sm hover:underline"
          >
            🛠️ Try LLMFeedForge
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="border rounded-lg p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-purple-700">✅ 47</div>
          <div className="text-sm text-muted-foreground mt-1">
            Verified feeds
          </div>
        </div>
        <div className="border rounded-lg p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-purple-700">🛡️ 13</div>
          <div className="text-sm text-muted-foreground mt-1">
            Certified domains
          </div>
        </div>
        <div className="border rounded-lg p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-purple-700">🤖 9</div>
          <div className="text-sm text-muted-foreground mt-1">
            Agent-ready platforms
          </div>
        </div>
        <div className="border rounded-lg p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-purple-700">🧪 ∞</div>
          <div className="text-sm text-muted-foreground mt-1">
            Speculative use cases
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/join"
          className="inline-flex items-center gap-2 text-sm text-purple-700 hover:underline"
        >
          Add your project to the map <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="mt-8 text-sm text-muted-foreground">
        Coming soon:{' '}
        <span className="font-medium text-purple-700">MCP-Net</span>, the
        distributed graph of verified feeds.
      </div>
    </section>
  )
}
