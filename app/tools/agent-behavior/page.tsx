import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import Link from 'next/link'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'

export default function AgentBehaviourPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <SeoHead
        title="Agent Behavior — How Agents Interpret LLMFeed"
        description="Explore how LLMs and agents should behave when consuming signed, trusted, or flagged feeds under the Model Context Protocol."
        canonicalUrl="https://wellknownmcp.org/tools/agent-behavior"
        keywords="agent, llm, behaviour, trust, signature, certification, flags"
        ogImage="/og/agent-behavior.png"
        llmIntent="understand agent behavior expectations"
        llmTopic="interpretation and trust logic for agents"
      />

      <Card>
        <CardHeader>
          <CardTitle>💊 Injectable Behavior Capsules</CardTitle>
          <CardDescription>
            Signed prompts that teach agents how to behave
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Some prompts in <code>/.well-known/prompts/</code> can modify how an
            agent interprets feeds — persistently and responsibly. These
            capsules must be signed and optionally certified.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="flex items-start justify-between">
              <span>
                <code>mcp-mode-activation.llmfeed.json</code>
                <br />
                Makes the agent check <code>
                  /.well-known/mcp.llmfeed.json
                </code>{' '}
                before interpreting a site
              </span>
              <ExportToLLMButton
                context="static"
                staticPath=".well-known/prompts/mcp-mode-activation.llmfeed.json"
                mini
                clipboard
              />
            </li>
            <li className="flex items-start justify-between">
              <span>
                <code>mcp-agent-behavior-override.llmfeed.json</code>
                <br />
                Injects the full set of expected agent behaviors and safety
                policies
              </span>
              <ExportToLLMButton
                context="static"
                staticPath=".well-known/prompts/mcp-agent-behavior-override.llmfeed.json"
                mini
                clipboard
              />
            </li>
          </ul>
          <p className="text-xs text-muted-foreground italic">
            These capsules must be interpreted only with user consent and
            cryptographic validation.
          </p>
        </CardContent>
      </Card>

      <PageTitle
        title="Agent Behavior"
        subtitle="How agents interpret trust, risk and responsibility"
      />
      <ShareButtons />

      <p className="text-muted-foreground text-sm">
        The way LLMs interpret content matters. That’s why the Model Context
        Protocol includes behavioural hints, flags, trust levels, audience
        targeting and certification logic — so agents can act responsibly.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>🎯 Key Behavior Expectations</CardTitle>
          <CardDescription>What agents are expected to respect</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Read <code>trust</code> and verify <code>signature</code>
            </li>
            <li>
              Adapt behavior based on <code>audience</code> and{' '}
              <code>agent_behavior</code>
            </li>
            <li>
              Decline or warn on <code>flags[]</code> or uncertified content
            </li>
            <li>
              Honor session expectations and <code>risk_score</code> in critical
              flows
            </li>
            <li>
              Cache or refresh feeds based on <code>cache_policy</code>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🧠 Behavior Modules (Spec)</CardTitle>
          <CardDescription>
            LLMFeed exposes dedicated guidance files
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <ul className="list-disc pl-6">
            <li>
              <Link href="/spec/04_agent-behavior/agent-behaviour_flagging" className="underline">
                Flagging & Reporting
              </Link>
            </li>
            <li>
              <Link
                href="/spec/04_agent-behavior/agent-behaviour_cache-policy"
                className="underline"
              >
                Cache Policy
              </Link>
            </li>
            <li>
              <Link
                href="/spec/04_agent-behavior/agent-behaviour_certified-only"
                className="underline"
              >
                Certified-Only Mode
              </Link>
            </li>
            <li>
              <Link
                href="/spec/04_agent-behavior/agent-behaviour_risk-scoring"
                className="underline"
              >
                Risk Scoring & Tier
              </Link>
            </li>
            <li>
              <Link
                href="/spec/04_agent-behavior/agent-behaviour_human-consent"
                className="underline"
              >
                Consent Before Action
              </Link>
            </li>
            <li>
              <Link
                href="/spec/04_agent-behavior/agent-behaviour_session-awareness"
                className="underline"
              >
                Session Memory
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🌐 Community-Governed Behaviour</CardTitle>
          <CardDescription>
            The LLMCA and the ethics of interpretation
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            The behaviour of agents matters — for safety, fairness, and societal
            alignment. That’s why we invite open participation in the trust
            layer of the ecosystem.
          </p>
          <p>
            Join the governance and protocol refinement at{' '}
            <Link href="/join" className="underline font-medium">
              wellknownmcp.org/join
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
