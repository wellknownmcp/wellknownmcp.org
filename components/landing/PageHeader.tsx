import Link from 'next/link'

export function PageHeader() {
  return (
    <div className="text-center py-16 space-y-4">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
        The agentic web starts here
      </h1>
      <p className="text-muted-foreground max-w-xl mx-auto">
        Model Context Protocol evolved into LLMFeed to define a new standard for
        trust, structure and intent on the web.
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <Link
          href="/en/about"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Learn more
        </Link>
        <Link
          href="/spec/01_llmfeed/llmfeed"
          className="text-purple-600 border border-purple-600 px-4 py-2 rounded hover:bg-purple-50"
        >
          Explore the Spec
        </Link>
      </div>
    </div>
  )
}
