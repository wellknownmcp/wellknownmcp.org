import Link from 'next/link'

export function WhatYouCanDeclare() {
  return (
    <section className="mt-16 max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">
        What You Can Declare on Your Website, App, or API
      </h2>
      <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-4">
        MCP isn't just a content format — it's a declaration interface for agents.
        Any site, API or app can expose structured `.llmfeed.json` files in `.well-known/` to describe what it offers and how to interact with it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">🧭 Site/App/API Layer</h3>
          <p className="text-sm text-muted-foreground mb-4">
            These files describe how agents should interpret your service: structure, capabilities, trust, and routing.
          </p>
          <ul className="text-sm list-disc list-inside space-y-1 mb-2">
            <li>
              <code>/.well-known/mcp.llmfeed.json</code> — Declares your site's full structure, intent and routing logic.{' '}
              <Link href="/tools/well-known" className="text-purple-700 hover:underline">Learn more</Link>
            </li>
            <li>
              <code>/.well-known/mcp-lite.llmfeed.json</code> — Minimal declaration to get started quickly.{' '}
              <Link href="/tools/well-known" className="text-purple-700 hover:underline">Learn more</Link>
            </li>
            <li>
              <code>/.well-known/capabilities.llmfeed.json</code> — Declares auth methods, available actions, API scopes.{' '}
              <Link href="/tools/well-known" className="text-purple-700 hover:underline">Learn more</Link>
            </li>
            <li>
              <code>/.well-known/llm-index.llmfeed.json</code> — Index of all declared feeds.{' '}
              <Link href="/tools/well-known" className="text-purple-700 hover:underline">Learn more</Link>
            </li>
          </ul>
          <p className="text-xs text-muted-foreground mt-4">
            These declarations can be <strong>signed and certified</strong> to help agents trust your structure.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">📦 Content Feed Layer</h3>
          <p className="text-sm text-muted-foreground mb-4">
            These feeds provide agents with meaningful, structured content — signed, contextualized, and ready to use.
          </p>
          <ul className="text-sm list-disc list-inside space-y-1 mb-2">
            <li>
              <code>/exports/manifesto.llmfeed.json</code> — Declares your project values and ethical stance.{' '}
              <Link href="/tools/export-button" className="text-purple-700 hover:underline">Details</Link>
            </li>
            <li>
              <code>/exports/prompt.llmfeed.json</code> — Exposes reusable prompts for agents.{' '}
              <Link href="/tools/prompt" className="text-purple-700 hover:underline">Details</Link>
            </li>
            <li>
              <code>/exports/credential.llmfeed.json</code> — Encodes a secure API key or capsule.{' '}
              <Link href="/tools/api-explained" className="text-purple-700 hover:underline">Details</Link>
            </li>
            <li>
              <code>/exports/pricing.llmfeed.json</code> — Makes your pricing structure agent-readable.{' '}
              <Link href="/tools/pricing" className="text-purple-700 hover:underline">Details</Link>
            </li>
            <li>
              <code>/exports/spec/*.llmfeed.json</code> — Share full technical documentation with agents.{' '}
              <Link href="/tools/export-button" className="text-purple-700 hover:underline">Details</Link>
            </li>
          </ul>
          <p className="text-xs text-muted-foreground mt-4">
            All content feeds can also be <strong>signed or certified</strong> to ensure integrity and align trust with risk.
          </p>
        </div>
      </div>
    </section>
  )
}
