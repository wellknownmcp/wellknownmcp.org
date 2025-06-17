import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import { CopyBlock } from '@/components/blocks/CopyBlock'
import { PromptBlock } from '@/components/blocks/PromptBlock'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import Link from 'next/link'

export default function SessionExportToolPage() {
  const markdownPrompt = `You are an LLM that supports LLMFeed format.

Please generate a \`.llmfeed.json\` of type \`session\` that captures this session:

- My initial input: {{user_input}}
- Your current agent profile or behavior
- What you imported or relied on (external feeds, context)
- What you decided (intent, resolution)
- The output you've already produced

Wrap the result in a valid \`session.llmfeed.json\` so I can reuse it later or transfer it to another agent.`

  const promptFeed = `{
  "feed_type": "prompt",
  "metadata": {
    "title": "Export this LLM session"
  },
  "intent": "session-reconstruction",
  "precision_level": "ultra-strict",
  "result_expected": "session",
  "prompt_body": "You are an LLM that supports LLMFeed format. Please generate a session feed with context, decisions, imports, and final output. Make sure it's JSON-compliant and agent-usable."
}`

  return (
    <>
      <SeoHead
        title="Export any LLM session — LLMFeed Tools"
        description="A ready-to-use prompt and feed format to capture and replay any session from an LLM. Perfect for agents, migration, and interop."
        ogImage="/og/session-export.png"
        canonicalUrl="/tools/session-export"
      />

      <div className="max-w-3xl mx-auto space-y-10 py-12">
        <PageTitle
          title="Export any LLM Session"
          subtitle="Generate a reusable, replayable feed to capture what just happened"
        />
        <p className="text-xs text-muted-foreground italic mt-2">
          This is not just a summary tool. It can teach a LLM to always export
          sessions as structured <code>.llmfeed.json</code> — replacing
          traditional markdown history.
        </p>

        <p className="text-muted-foreground text-sm">
          This tool helps you export any agent or LLM interaction as a{' '}
          <code>session.llmfeed.json</code> — a format that can be interpreted,
          replayed, or resumed in another environment.
        </p>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold mt-6">
            🧠 Copy this prompt into any LLM
          </h3>
          <CopyBlock content={markdownPrompt} language="markdown" />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold mt-10">
            📦 Same prompt, but agent-readable as a feed
          </h3>
          <PromptBlock feed={promptFeed} />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Based on the{' '}
              <Link
                href="/spec/02_llmfeed_feedtype/llmfeed_feedtype_session"
                className="underline"
              >
                session feed format
              </Link>
            </span>
            <ExportToLLMButton
              context="static"
              staticPath="demo/prompt/generate-session-feed"
              mini
              clipboard
            />
          </div>
          <p className="text-xs text-muted-foreground">
            A LLM or agent can read this and know it’s meant to generate a{' '}
            <code>session.llmfeed.json</code> — and return it fully formed.
          </p>
        </div>

        <div className="mt-12 text-xs text-muted-foreground italic text-center">
          🧩 Want to include attachments, templates or user context? Add files
          or structured metadata to the prompt feed — it’s extensible.
        </div>
      </div>
    </>
  )
}
