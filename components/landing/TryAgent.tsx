import Link from 'next/link'
import { Rocket } from 'lucide-react'

export function TryAgent() {
  return (
    <div className="py-12 max-w-2xl mx-auto text-center space-y-4">
      <h2 className="text-xl font-semibold">
        🤖 Try it with your favorite agent
      </h2>
      <p className="text-sm text-muted-foreground">
        Test how Claude, GPT, or DeepSeek interpret this feed. You can also copy
        the URL or drop it into your agent UI.
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <a
          href="https://chat.openai.com/g/g-WMCPexplainer"
          target="_blank"
          className="text-sm bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Launch with ChatGPT
        </a>
        <a
          href="/preview/compiled-site"
          className="text-sm border border-purple-600 text-purple-600 px-4 py-2 rounded hover:bg-purple-50"
        >
          Open feed preview
        </a>
      </div>
    </div>
  )
}
