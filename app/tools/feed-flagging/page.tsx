import { PageTitle } from "@/components/PageTitle";
import SeoHead from "@/components/SeoHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function FeedFlaggingPage() {
  return (
    <>
      <SeoHead
        title="🚩 Feed Flagging System"
        description="Understand how LLMFeed enables decentralized reporting of dangerous or misleading MCP feeds."
        canonicalUrl="https://wellknownmcp.org/tools/feed-flagging"
        keywords={["mcp", "llmfeed", "flag", "trust", "reputation", "report"]}
        llmlang="en"
        llmIntent="learn how feed flagging works"
        llmTopic="mcp feed reputation and warnings"
      />

      <div className="max-w-3xl mx-auto py-10 space-y-10">
        <PageTitle
          title="🚩 Feed Flagging System"
          subtitle="Decentralized trust management for the agentic web"
        />

        <Card>
          <CardHeader>
            <CardTitle>Why flag a feed?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              Some `.llmfeed.json` files may misrepresent capabilities, spoof prompts, or abuse trust declarations.
              When this happens, agents and users need a structured way to report it — and react.
            </p>
            <p>
              Flagging is how we surface trust concerns, invite audits, and maintain credibility across the MCP ecosystem.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How does flagging work?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              Anyone — a user, an agent, or a specialized bot — can flag a suspicious feed.
              The flag includes a reason, a timestamp, and may be signed by the reporting party.
            </p>
            <p>
              These flags are sent to <strong>LLMCA</strong>, the nonprofit entity overseeing trust and certification. 
              LLMCA reviews the flag and updates its status: <code>pending</code>, <code>acknowledged</code>, or <code>revoked</code>.
            </p>
            <p>
              Flags are published publicly and may be embedded directly into the feed’s metadata or exposed via a `.well-known/flags.llmfeed.json` file.
              Agents are encouraged to check for these flags — and react accordingly.
            </p>
            <p className="text-sm italic text-orange-700">
              Yes, this creates extra network traffic — which is why caching, mirroring and signing flags is part of the solution.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What is the role of LLMCA?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              LLMCA acts as the backbone of trust for the MCP ecosystem. It hosts submitted flags, moderates disputes, 
              and offers certification for feeds, agents, and issuers.
            </p>
            <p>
              The responsibility is immense — because <strong>trust only scales if its core is robust</strong>. 
              That’s why LLMCA is governed as a nonprofit, and why participation is open to co-auditors, civic actors, and public-minded institutions.
            </p>
            <p>
              We’re calling on the AI community — open-source, academic and industrial — to help govern this layer.
              If you want to be part of it, <Link href="/join" className="underline font-medium">declare your interest here →</Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview integration</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              You can view, inspect and simulate flag display inside the <Link href="/llmfeedhub/preview" className="underline">preview interface</Link>. 
              Try loading <code>/preview/demo/kungfu</code> to see an example.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What does a flag look like?</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-zinc-900 text-white p-4 rounded overflow-x-auto">
{`"flags": [
  {
    "type": "risk",
    "submitted_by": "agent://auditbot",
    "reason": "Declared capability mismatch",
    "date": "2025-05-19T12:00:00Z",
    "status": "pending",
    "source": "https://llmca.org/flag?id=823"
  }
]`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
