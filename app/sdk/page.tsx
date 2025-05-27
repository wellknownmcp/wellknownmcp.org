import { PageTitle } from "@/components/PageTitle";
import SeoHead from "@/components/SeoHead";
import { ShareButtons } from "@/components/ShareButtons";
import Link from "next/link";

export default function SdkPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      <SeoHead
        title="LLMFeed SDK & Integration Tools"
        description="Use our SDKs, APIs and components to publish, validate, and sign LLMFeed blocks across the web."
        canonicalUrl="https://wellknownmcp.org/sdk"
        keywords="sdk, api, llmfeed, integration, forge, validator"
        llmIntent="explore sdk and developer integrations"
        llmTopic="tools to publish, transform and certify llmfeed blocks"
      />

      <PageTitle
        title="LLMFeed SDK & Tools"
        subtitle="Use our open tools to build, sign and interact with agent-readable feeds"
      />

      <ShareButtons />

      <p className="text-muted-foreground text-sm">
        Everything you need to generate, validate, transform, and certify LLMFeed blocks.
        Explore our SDKs and scripts or connect to the API.
      </p>

      <div className="border rounded-md p-4 bg-muted/30 text-sm space-y-2">
        <h2 className="font-semibold text-base">🛠️ Core SDK & API Tools</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Sign & Verify:</strong> Python & TypeScript scripts for cryptographic validation</li>
          <li><strong>Canonicalization:</strong> Normalize feeds for consistent signature payloads</li>
          <li><strong>Export Button:</strong> Drop-in React component to expose `.llmfeed.json` from any page</li>
          <li><strong>Forge API:</strong> Programmatic access to build & sign feeds via llmfeedforge.org</li>
        </ul>
      </div>

      <div className="border rounded-md p-4 bg-muted/20 text-sm space-y-3">
        <h2 className="font-semibold text-base mt-4">🚀 Strategic SDK Extensions (Coming Soon)</h2>

        <h3 className="text-sm font-medium mt-2">1. 🧠 Agent Store & Reputation Graph</h3>
        <p>
          A decentralized directory of agent profiles and compatible services. Powered by signed <code>agent-profile.llmfeed.json</code> and certification scores by <code>llmca.org</code>.
          Includes search, trust filters, and flagging mechanisms.
        </p>

        <h3 className="text-sm font-medium mt-4">2. 🌐 Gateway SDKs for the Old Web</h3>
        <p>
          Wrappers and plugins for WordPress, Shopify, GraphQL or HTML APIs to auto-generate LLMFeed-compatible blocks.
          Accelerates compatibility for non-native services.
        </p>

        <h3 className="text-sm font-medium mt-4">3. 🧩 LLMFeed Browser Extension</h3>
        <p>
          A lightweight extension that detects <code>.well-known</code> feeds, enables agent interactions, and lets users preview agent-readable metadata.
        </p>

        <p className="text-sm text-muted-foreground">
          These components will turn LLMFeed into a full stack: discovery, interaction, monetization, trust.
        </p>
        <li><strong>LLMFeed Exporter Extension (Idea):</strong> A browser plugin that captures any web page and builds a downloadable `.llmfeed.json`. Perfect for fast sharing to agents — even without a server or signature.</li>
      </div>

      <p className="text-sm text-muted-foreground mt-6">
        Want to contribute or suggest your own tool? <Link href="/join" className="underline">Join the SDK community</Link>.
      </p>
    </div>
  );
}
