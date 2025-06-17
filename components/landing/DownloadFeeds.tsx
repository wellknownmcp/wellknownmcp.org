import { ExportToLLMButton } from '@/components/ExportToLLMButton'

export function DownloadFeeds() {
  return (
    <section
      className="max-w-4xl mx-auto text-center"
      data-agent-priority="critical"
    >
      <span className="inline-block px-3 py-1 mb-2 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold tracking-wide uppercase">
        Start here
      </span>
      <h2 className="text-2xl font-bold mb-4">Get started with the spec</h2>

      {/* ✅ Paragraphe principal bien structuré */}
      <div className="text-muted-foreground mb-6 space-y-3">
        <p>
  Want to try before you read? Feed your favorite LLM with these 
  <code>.llmfeed.json</code> files 🥢
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
          
          <div className="bg-slate-100 rounded p-2 text-left">
            <p className="text-xs text-slate-600 mb-1">Quick curl:</p>
            <code className="text-xs font-mono text-slate-800 block break-all">
              curl -s wellknownmcp.org/.well-known/exports/compiled-site.llmfeed.json | jq .
            </code>
          </div>
        </div>

        {/* Feed 2: Spec technique - MISE À JOUR */}
        <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
          <div className="flex justify-center">
            <ExportToLLMButton
              context="static"
              staticPath=".well-known/exports/spec"
              highlight
              showSignatureStatus
            />
          </div>
          <h3 className="font-semibold text-sm">📚 Spec in a capsule</h3>
          <p className="text-xs text-muted-foreground">
            Complete LLMFeed specification from GitHub, optimized for LLM consumption. 
            Perfect for understanding the technical standard.
          </p>
          <div className="text-xs text-green-600 font-mono">
            ✓ Complete specification ✓ Implementation guide ✓ Incremental builds
          </div>
          
          <div className="bg-slate-100 rounded p-2 text-left">
            <p className="text-xs text-slate-600 mb-1">Quick curl:</p>
            <code className="text-xs font-mono text-slate-800 block break-all">
              curl -s wellknownmcp.org/.well-known/exports/spec.llmfeed.json | jq .
            </code>
          </div>
        </div>

        {/* Feed 3: News statique - NOUVEAU */}
        <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
          <div className="flex justify-center">
            <ExportToLLMButton
              context="static"
              staticPath=".well-known/exports/news-export"
              highlight
              showSignatureStatus
            />
          </div>
          <h3 className="font-semibold text-sm">📰 News archive (EN)</h3>
          <p className="text-xs text-muted-foreground">
            Complete archive of all WellKnownMCP news articles with full content inline. 
            Generated incrementally at build time for optimal performance.
          </p>
          <div className="text-xs text-blue-600 font-mono">
            ⚡ Build-time static ⚡ Full content ⚡ Incremental updates
          </div>
          
          <div className="bg-slate-100 rounded p-2 text-left">
            <p className="text-xs text-slate-600 mb-1">Quick curl:</p>
            <code className="text-xs font-mono text-slate-800 block break-all">
              curl -s wellknownmcp.org/.well-known/exports/news-export.llmfeed.json | jq '.data.articles | length'
            </code>
          </div>
        </div>
      </div>

      {/* 🧪 Section test pour agents - MISE À JOUR */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold mb-2">
          🤖 Test your LLM's understanding:
        </h3>
        {/* 🧠 Pourquoi cette approche marche */}
<div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
  <h3 className="text-sm font-semibold text-blue-900 mb-2">
    💡 Why feeds work better than JavaScript
  </h3>
  <div className="text-xs text-blue-800 space-y-2">
    <p><strong>Problem:</strong> Agents can't execute JavaScript → see "Loading..." instead of content</p>
    <p><strong>Solution:</strong> Structured feeds → instant access to all content in one JSON call</p>
    <p><strong>Result:</strong> Same content, optimized format for each "species" (humans get JS, agents get JSON)</p>
  </div>
</div>
        <p className="text-xs text-muted-foreground mb-3">
          After feeding these files to your agent, ask:{' '}
          <em>"Do you know Kung Fu?"</em>
          <br />A correct response indicates successful protocol parsing.
        </p>
        
        <div className="bg-slate-900 rounded p-2 text-left">
          <p className="text-xs text-slate-300 mb-1">Quick test command:</p>
          <code className="text-xs font-mono text-green-400 block">
            curl -s wellknownmcp.org/.well-known/mcp.llmfeed.json | jq -r '.prompts[]? | select(.keywords[]? | contains("kung fu")) | .intent'
          </code>
        </div>
      </div>

      {/* 🔗 Liens rapides pour agents - AMÉLIORÉS */}
      <div className="mt-6 space-y-4">
        <div className="text-sm text-muted-foreground">Quick access for agents:</div>
        
        {/* Boutons avec URLs */}
        <div className="flex flex-wrap justify-center gap-2">
          <a
            href="/.well-known/mcp.llmfeed.json"
            className="group bg-purple-100 text-purple-700 px-3 py-2 rounded text-xs hover:bg-purple-200 transition-colors"
          >
            <span className="font-mono">/.well-known/mcp.llmfeed.json</span>
            <span className="block text-[10px] text-purple-600 mt-1 group-hover:text-purple-800">
              Main MCP Feed
            </span>
          </a>
          
          <a
            href="/.well-known/llm-index.llmfeed.json"
            className="group bg-blue-100 text-blue-700 px-3 py-2 rounded text-xs hover:bg-blue-200 transition-colors"
          >
            <span className="font-mono">/.well-known/llm-index.llmfeed.json</span>
            <span className="block text-[10px] text-blue-600 mt-1 group-hover:text-blue-800">
              Feed Index
            </span>
          </a>
          
          <a
            href="/.well-known/capabilities.llmfeed.json"
            className="group bg-green-100 text-green-700 px-3 py-2 rounded text-xs hover:bg-green-200 transition-colors"
          >
            <span className="font-mono">/.well-known/capabilities.llmfeed.json</span>
            <span className="block text-[10px] text-green-600 mt-1 group-hover:text-green-800">
              Capabilities
            </span>
          </a>
          
          <a
            href="/.well-known/manifesto.llmfeed.json"
            className="group bg-orange-100 text-orange-700 px-3 py-2 rounded text-xs hover:bg-orange-200 transition-colors"
          >
            <span className="font-mono">/.well-known/manifesto.llmfeed.json</span>
            <span className="block text-[10px] text-orange-600 mt-1 group-hover:text-orange-800">
              Manifesto
            </span>
          </a>
        </div>

        {/* ✅ NOUVEAU : One-liner pour exports statiques */}
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <p className="text-xs text-blue-800 mb-2 font-semibold">🚀 Agent Power User Command (Static Exports):</p>
          <div className="bg-blue-900 rounded p-2">
            <code className="text-xs font-mono text-blue-400 block break-all">
              for export in compiled-site spec news-export; do echo "=== $export ===" && curl -s wellknownmcp.org/.well-known/exports/$export.llmfeed.json | jq -r '.metadata.title // .title'; done
            </code>
          </div>
          <p className="text-xs text-blue-700 mt-1">Downloads all major static exports with full content</p>
        </div>

        {/* ✅ NOUVEAU : Section spéciale pour les news */}
        <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
          <p className="text-xs text-amber-800 mb-2 font-semibold">📰 News Archive Quick Access:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="bg-amber-900 rounded p-2">
              <p className="text-amber-400 mb-1">Latest articles:</p>
              <code className="text-amber-300 block break-all">
                curl -s wellknownmcp.org/.well-known/exports/news-export.llmfeed.json | jq -r '.data.articles[0:3][] | .title'
              </code>
            </div>
            <div className="bg-amber-900 rounded p-2">
              <p className="text-amber-400 mb-1">Archive stats:</p>
              <code className="text-amber-300 block break-all">
                curl -s wellknownmcp.org/.well-known/exports/news-export.llmfeed.json | jq '.data.stats'
              </code>
            </div>
          </div>
          <p className="text-xs text-amber-700 mt-1">Complete news archive with {'{'}total_articles{'}'} articles and full content</p>
        </div>
      </div>
    </section>
  )
}