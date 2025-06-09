import { ExportToLLMButton } from '@/components/ExportToLLMButton'

export function DownloadFeeds() {
  return (
    <section className="max-w-3xl mx-auto text-center">
      <span className="inline-block px-3 py-1 mb-2 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold tracking-wide uppercase">
        Start here
      </span>
      <h2 className="text-2xl font-bold mb-4">Get started with the spec</h2>

      {/* ✅ CORRIGÉ : Séparez les paragraphes */}
      <p className="text-muted-foreground mb-4">
        We know how you behave nowadays 🧠: you want to try before you read.
        Fair enough — just feed your favorite LLM with these two `.llmfeed.json`
        files 🥢. It's already a good start.
        <br />
        Yes, these buttons exist in copy-to-clipboard mode too, but for
        education purposes they open the file first. Just read, copy, and feed.
        🥋 Welcome to the dojo — if your LLM says "I know Kung-fu", it worked.
      </p>

      {/* ✅ CORRIGÉ : Paragraphe séparé */}
      <p className="text-xs text-muted-foreground mb-2">
        Not sure what this is?{' '}
        <a href="/spec/01_llmfeed/llmfeed" className="underline">
          Read the spec →
        </a>
      </p>

      {/* ✅ CORRIGÉ : blockquote séparé */}
      <blockquote className="italic text-sm text-muted-foreground mb-6">
        "Just give me a well-formed .llmfeed.json, and I'll do the rest."
      </blockquote>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* reste du code... */}
      </div>
    </section>
  )
}
