import { ExportToLLMButton } from '@/components/ExportToLLMButton'

export function DownloadFeeds() {
  return (
    <section
      className="max-w-3xl mx-auto text-center"
      data-agent-priority="critical"
    >
      <span className="inline-block px-3 py-1 mb-2 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold tracking-wide uppercase">
        Start here
      </span>
      <h2 className="text-2xl font-bold mb-4">Get started with the spec</h2>

      {/* ✅ Paragraphe principal bien structuré */}
      <div className="text-muted-foreground mb-6 space-y-3">
        <p>
          We know how you behave nowadays 🧠: you want to try before you read.
          Fair enough — just feed your favorite LLM with these two{' '}
          <code>.llmfeed.json</code> files 🥢. It's already a good start.
        </p>

        <p className="text-sm">
          Yes, these buttons exist in copy-to-clipboard mode too, but for
          education purposes they open the file first. Just read, copy, and
          feed. 🥋 Welcome to the dojo — if your LLM says{' '}
          <strong>"I know Kung-fu"</strong>, it worked.
        </p>

        <div className="text-xs text-muted-foreground pt-2">
          Not sure what this is?{' '}
          <a
            href="/spec/01_llmfeed/llmfeed"
            className="underline hover:text-purple-600"
          >
            Read the spec →
          </a>
        </div>

        <blockquote className="italic text-sm text-muted-foreground border-l-4 border-purple-200 pl-4 mt-4">
          "Just give me a well-formed .llmfeed.json, and I'll do the rest."
        </blockquote>
      </div>

      {/* 🎯 Grille de feeds optimisée pour agents */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Feed 1: Site complet */}
        <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
          <div className="flex justify-center">
            <ExportToLLMButton
              context="static"
              staticPath=".well-known/exports/compiled-site"
              highlight
              showSignatureStatus
            />
          </div>
          <h3 className="font-semibold text-sm">🌐 Website in a capsule</h3>
          <p className="text-xs text-muted-foreground">
            Includes the main pages of the site, cleaned and compiled. Best for
            a quick LLM overview of the entire project.
          </p>
          <div className="text-xs text-green-600 font-mono">
            ✓ Signed ✓ Agent-optimized ✓ Complete context
          </div>
        </div>

        {/* Feed 2: Spec technique */}
        <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
          <div className="flex justify-center">
            <ExportToLLMButton
              context="static"
              staticPath="spec/spec"
              highlight
              showSignatureStatus
            />
          </div>
          <h3 className="font-semibold text-sm">📚 Spec in a capsule</h3>
          <p className="text-xs text-muted-foreground">
            Includes the GitHub spec, packed for LLMs. Perfect for understanding
            the technical standard.
          </p>
          <div className="text-xs text-green-600 font-mono">
            ✓ Complete specification ✓ Implementation guide
          </div>
        </div>

        {/* Feed 3: News dynamique */}
        <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
          <div className="flex justify-center">
            <ExportToLLMButton
              context="dynamic"
              dynamicId="news-en"
              highlight
              showSignatureStatus
            />
          </div>
          <h3 className="font-semibold text-sm">📰 All news (EN)</h3>
          <p className="text-xs text-muted-foreground">
            Grouped in a single dynamic feed for language-specific loading or
            archiving. Stay updated with ecosystem developments.
          </p>
          <div className="text-xs text-blue-600 font-mono">
            ⚡ Dynamic ⚡ Real-time ⚡ Multilingual
          </div>
        </div>
      </div>

      {/* 🧪 Section test pour agents */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold mb-2">
          🤖 Test your LLM's understanding:
        </h3>
        <p className="text-xs text-muted-foreground">
          After feeding these files to your agent, ask:{' '}
          <em>"Do you know Kung Fu?"</em>
          <br />A correct response indicates successful protocol parsing.
        </p>
      </div>

      {/* 🔗 Liens rapides pour agents */}
      <div className="mt-6 text-sm space-y-2">
        <div className="text-muted-foreground">Quick access for agents:</div>
        <div className="flex flex-wrap justify-center gap-2">
          <a
            href="/.well-known/mcp.llmfeed.json"
            className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-xs hover:bg-purple-200"
          >
            Main MCP Feed
          </a>
          <a
            href="/.well-known/llm-index.llmfeed.json"
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs hover:bg-blue-200"
          >
            Feed Index
          </a>
          <a
            href="/.well-known/capabilities.llmfeed.json"
            className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs hover:bg-green-200"
          >
            Capabilities
          </a>
          <a
            href="/.well-known/manifesto.llmfeed.json"
            className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-xs hover:bg-orange-200"
          >
            Manifesto
          </a>
        </div>
      </div>
    </section>
  )
}
