import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function APIExplainedPage() {
  return (
    <>
      <SeoHead
        title="🔐 API Feed Explained (MCP)"
        description="How agents use mcp-api.llmfeed.json to discover scoped capabilities from a credential."
        canonicalUrl="https://wellknownmcp.org/tools/api-explained"
        keywords={[
          'mcp',
          'llmfeed',
          'api',
          'capabilities',
          'autoconfiguration',
          'credential',
        ]}
        llmlang="en"
        llmIntent="learn about mcp-api"
        llmTopic="api capabilities for agents"
      />

      <div className="max-w-3xl mx-auto py-10 space-y-10">
        <PageTitle
          title="🔐 API Access for Agents"
          subtitle="How agents discover what they can do using a credential and a feed"
        />

        <Card className="bg-muted/40">
          <CardContent className="text-sm text-muted-foreground space-y-4 pt-6">
            <p>
              <strong>
                MCP makes the web agent-readable — without rebuilding it.
              </strong>
            </p>
            <p>
              Large models like Claude or GPT increasingly support tool usage
              and external APIs. The Anthropic Model Context Protocol (MCP)
              proposes a way to expose those tools — but often assumes a “client
              SDK” architecture.
            </p>
            <p>
              <strong>The LLMFeed approach extends that vision.</strong> Every
              website can now declare its own agent-compatible API surface,{' '}
              <em>
                without requiring custom client code, user downloads, or central
                orchestration
              </em>
              .
            </p>
            <p>
              With a simple <code>.llmfeed.json</code> file, an agent can:
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>Understand the available actions</li>
                <li>Verify permissions or limits</li>
                <li>Automatically configure its intent-handling</li>
              </ul>
            </p>
            <p>
              The <code>/mcp-api.llmfeed.json</code> feed is how{' '}
              <strong>an agent retrieves its scoped access view</strong> once it
              receives a credential.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How it works</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                You give your agent a <code>apicredential.llmfeed.json</code>
              </li>
              <li>
                That credential includes a <code>mcp_api</code> URL
              </li>
              <li>The agent queries the endpoint with the key</li>
              <li>
                Receives a signed feed with only the capabilities it can use
              </li>
              <li>
                Reads <code>rate_limits</code>, prompts, trust scope
              </li>
              <li>Acts or requests user confirmation</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Example Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-zinc-900 text-white p-4 rounded overflow-x-auto">
              {`{
  "feed_type": "mcp",
  "capabilities": [
    { "path": "/sign", "method": "POST", "description": "Sign document" }
  ],
  "prompts": [
    { "intent": "sign-document", "description": "Prompt to trigger signing" }
  ],
  "rate_limits": [
    { "path": "/sign", "period": "daily", "limit": 5, "remaining": 2 }
  ],
  "trust": {
    "scope": "restricted",
    "key_hint": "abc123",
    "certifier": "https://llmca.org",
    "signed_blocks": ["capabilities", "prompts", "rate_limits", "trust"]
  }
}`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related pages</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2 text-muted-foreground">
            <ul className="list-disc pl-5">
              <li>
                <Link
                  className="underline"
                  href="/spec/04_agent-behavior/agent-behaviour"
                >
                  Agent Behaviour
                </Link>
              </li>
              <li>
                <Link
                  className="underline"
                  href="/spec/02_llmfeed_feedtype/llmfeed_feedtypes_credential"
                >
                  Credential Feed Type
                </Link>
              </li>
              <li>
                <Link
                  className="underline"
                  href="/spec/03_llmfeed_extensions/llmfeed_extensions_api"
                >
                  API Extension Spec
                </Link>
              </li>
              /
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
