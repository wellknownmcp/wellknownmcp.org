import { ExportToLLMButton } from '@/components/ExportToLLMButton'

export function DownloadFeeds() {
  return (
    <section className="max-w-3xl mx-auto text-center">
      <span className="inline-block px-3 py-1 mb-2 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold tracking-wide uppercase">
        Start here
      </span>
      <h2 className="text-2xl font-bold mb-4">Get started with the spec</h2>
      <p className="text-muted-foreground mb-6">
        We know how you behave nowadays 🧠: you want to try before you read.
        Fair enough — just feed your favorite LLM with these two `.llmfeed.json`
        files 🥢. It's already a good start.
        <br />
        Yes, these buttons exist in copy-to-clipboard mode too, but for
        education purposes they open the file first. Just read, copy, and feed.
        🥋 Welcome to the dojo — if your LLM says "I know Kung-fu", it worked.
        <p className="text-xs text-muted-foreground mt-4">
          Not sure what this is?{' '}
          <a href="/spec/01_llmfeed/llmfeed" className="underline">
            Read the spec →
          </a>
        </p>
        <blockquote className="italic text-sm text-muted-foreground mt-2">
          “Just give me a well-formed .llmfeed.json, and I’ll do the rest.”
        </blockquote>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <ExportToLLMButton
            context="static"
            staticPath=".well-known/exports/compiled-site"
            highlight
          />
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Website in a capsule — includes the main pages of the site, cleaned
            and compiled. Best for a quick LLM overview.
          </p>
        </div>
        <div className="space-y-2">
          <ExportToLLMButton
            context="static"
            staticPath="/spec/spec"
            highlight
          />
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Spec in a capusle — includes the github spec, packed for llms
          </p>
        </div>

        <div className="space-y-2">
          <ExportToLLMButton context="dynamic" dynamicId="news-en" highlight />
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            All news (EN) — grouped in a single dynamic feed for
            language-specific loading or archiving.
          </p>
        </div>
      </div>
    </section>
  )
}
