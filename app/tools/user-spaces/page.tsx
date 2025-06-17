
import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import { CodeBlock } from '@/components/blocks/CodeBlock'

export default function UserSpacesToolPage() {
  const githubMCP = `{
  "feed_type": "mcp",
  "user_spaces": [
    {
      "pattern": "https://github.com/*",
      "mcp_proxy": "https://api.github.com/mcp/user/{username}",
      "trust_default": "public",
      "profile_fields": ["bio", "website"]
    }
  ]
}`

  return (
    <>
      <SeoHead
        title="User Spaces — Hosted MCP for Agent Interop"
        description="How platforms can expose `.llmfeed.json` for individual users through proxy MCP declarations"
        canonicalUrl="/tools/user-spaces"
        ogImage="/og/tools-user-spaces.png"
      />

      <div className="max-w-3xl mx-auto space-y-10 py-12">
        <PageTitle
          title="Hosted User Spaces"
          subtitle="Declare agent-compatible context for users on GitHub, Notion, and more"
        />

        <p className="text-muted-foreground text-sm">
          Many platforms host content at URLs like <code>github.com/user</code>{' '}
          or <code>notion.so/workspace</code>, where individuals can't control{' '}
          <code>/.well-known</code>. The MCP spec supports platform-declared
          user proxies.
        </p>

        <h3 className="text-sm font-semibold mt-10">
          📦 Platform Example: GitHub
        </h3>
        <CodeBlock language="json" code={githubMCP} />

        <p className="text-sm mt-4">
          Agents first look for <code>user/.well-known/mcp</code>, then fallback
          to <code>github.com/.well-known/mcp</code>
          which can redirect via <code>user_spaces</code>.
        </p>

        <div className="mt-10 text-xs text-muted-foreground italic text-center">
          🌐 This enables portable agent behavior even on platforms without
          static file hosting.
        </div>
      </div>
    </>
  )
}
