import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import { ShareButtons } from '@/components/ShareButtons'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import Link from 'next/link'

export default function PricingToolPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <SeoHead
        title="Agent-Friendly Pricing — Monetize with MCP"
        description="Declare agent-readable pricing rules for your service. Compare, inform, consent, and monetize."
        canonicalUrl="https://wellknownmcp.org/tools/pricing"
        ogImage="/og/tools/pricing.png"
        keywords="pricing, agent, llmfeed, mcp, monetization"
        llmIntent="understand agent-compatible pricing"
        llmTopic="trustworthy, programmable economic models"
      />

      <PageTitle
        title="Agent-Compatible Pricing"
        subtitle="Declare your service's pricing for autonomous agents"
      />

      <ShareButtons />

      <p className="text-sm text-muted-foreground">
        This tool helps services expose pricing in a structured way. Agents can
        read this block and understand cost per unit, subscription plans,
        billing methods, and payment options.
      </p>

      <div className="border rounded-md p-4 bg-muted/30 text-sm space-y-2">
        <ul className="list-disc pl-5 space-y-1">
          <li>💰 Compare providers by cost, not just capability</li>
          <li>📦 Inform agents before triggering expensive actions</li>
          <li>📄 Offer subscription models and unit pricing</li>
          <li>🔐 Link to trust & consent modules automatically</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold mt-6">📂 Example Feed</h2>
        <ExportToLLMButton
          context="static"
          staticPath="demo/pricing/demo-pricing"
          highlight
        />
        <p className="text-xs text-muted-foreground">
          Download and reuse this agent-readable pricing feed — or build your
          own.
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        Read the full spec:{' '}
        <Link
          href="/spec/02_llmfeed_feedtype/llmfeed_feedtype_pricing"
          className="underline"
        >
          feedtype_pricing.md
        </Link>
      </p>
    </div>
  )
}
