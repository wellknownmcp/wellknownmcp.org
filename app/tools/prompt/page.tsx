'use client'

import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import { PromptGallery } from '@/components/PromptGallery'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'

export default function PromptToolPage() {
  return (
    <>
      <SeoHead
        title="Structured Prompts — LLMFeed Tools"
        description="Define, structure, and sign your prompts like data. Perfect for AI assistants, automation, and LLM chains."
        ogImage="/og/tools-prompt.png"
      />

      <div className="max-w-3xl mx-auto space-y-10 py-12">
        <PageTitle
          title="Prompts as Agent Capsules"
          subtitle="Structure, sign, and share your prompts as `prompt.llmfeed.json`"
        />

        <p className="text-muted-foreground text-sm">
          A structured prompt is not just text. It's a complete, auditable and
          shareable instruction unit — trusted by humans and agents.
        </p>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold mt-6">🎯 Prompt Examples</h3>

          <div className="space-y-4 mt-6">
            <h3 className="text-sm font-semibold">🧩 Common Use Cases</h3>
            <ul className="list-disc list-inside text-xs text-muted-foreground">
              <li>Embed in chatbots or agent platforms</li>
              <li>
                Trigger backend workflows (via <code>intent</code> recognition)
              </li>
              <li>Display dynamic action buttons on your site</li>
              <li>Store replayable sessions or shareable agent shortcuts</li>
            </ul>
          </div>

          <h3 className="text-sm font-semibold mt-8">
            🧠 Notable Behavior Capsules
          </h3>
          <ul className="list-disc list-inside text-xs text-muted-foreground space-y-2">
            <li className="flex items-start justify-between">
              <span>
                <code>mcp-mode-activation.llmfeed.json</code> – Makes any agent
                check for MCP feeds before interpreting a site
              </span>
              <ExportToLLMButton
                context="static"
                staticPath="demo/prompt/mcp-mode-activation"
                mini
                clipboard
              />
            </li>
            <li className="flex items-start justify-between">
              <span>
                <code>generate-session-feed.llmfeed.json</code> – Teaches a LLM
                to export a session as `.llmfeed.json` instead of markdown
              </span>
              <ExportToLLMButton
                context="static"
                staticPath="demo/prompts/generate-session-feed"
                mini
                clipboard
              />
            </li>
            <li className="flex items-start justify-between">
              <span>
                <code>mcp-agent-behavior-override.llmfeed.json</code> – Full
                compliance logic injection (signature + trust required)
              </span>
              <ExportToLLMButton
                context="static"
                staticPath="demo/prompts/mcp-agent-behavior-override"
                mini
                clipboard
              />
            </li>
          </ul>

          <PromptGallery />
          <div className="pt-6 text-center">
            <ExportToLLMButton staticPath="tools/prompts/welcome" />
          </div>
        </div>

        <div className="mt-10 text-xs text-muted-foreground italic text-center">
          ✍️ Ready to publish your own? Start with our generator or export tool,
          and consider signing your prompt with LLMCA.
        </div>
      </div>
    </>
  )
}
