import Link from 'next/link'

export function SchemaHeroSection() {
  return (
    <div className="bg-violet-50 border border-violet-200 p-6 rounded-xl text-center space-y-2 shadow-sm">
      <div className="text-xl font-semibold">📐 We define the standard.</div>
      <p className="text-sm text-muted-foreground max-w-xl mx-auto">
        This site is the canonical source of truth for the
        <code className="mx-1 font-mono">.llmfeed.json</code> format used by
        agents and MCP-ready apps.
      </p>
      <Link
        href="/tools/schema"
        className="inline-block mt-2 bg-violet-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-violet-700"
      >
        Explore the Schema →
      </Link>
    </div>
  )
}
