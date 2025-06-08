'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const langMatch = pathname.match(/^\/(en|fr|es|zh|ar|uk)(\/|$)/)
  const lang = langMatch ? langMatch[1] : 'en'

  return (
    <footer className="bg-white dark:bg-black border-t dark:border-gray-800 text-sm text-black dark:text-white mt-12">
      <div className="w-full px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-6xl mx-auto">
        {/* Left section */}
        <div>
          <h2 className="text-lg font-bold">WellKnownMCP</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            A trustable network for AI agents.
            <br />
            Join the community, contribute, or contact us directly.
          </p>
          <p className="text-sm mt-2">
            <a
              href="mailto:opensource@wellknownmcp.org"
              className="no-underline text-black dark:text-white hover:underline"
            >
              opensource@wellknownmcp.org
            </a>
          </p>
        </div>

        {/* Middle section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Link href={`/${lang}/about`}>🧭 About</Link>
            <Link href="/spec/01_llmfeed/llmfeed">📜 Spec</Link>
            <Link href="/llmfeedhub">🧪 Hub</Link>
            <Link href="/legal">⚖️ Legal Notice</Link>
          </div>
          <div className="space-y-1">
            <Link href="/verify">✅ Verify</Link>
            <Link href="/sdk">🧬 SDK</Link>
            <Link href="/join">🤝 Join</Link>
          </div>
        </div>

        {/* Right section */}
        <div>
          <ul className="space-y-1">
            <li>
              <Link href="https://github.com/wellknownmcp/llmfeed-spec" target="_blank" rel="noopener">
                GitHub
              </Link>
            </li>
            <li>
              <Link href="https://llmca.org" target="_blank" rel="noopener">
                🛡️ LLMCA
              </Link>
            </li>
            <li>
              <Link href="https://llmfeedforge.org" target="_blank" rel="noopener">
                🛠️ LLMFeedForge
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="col-span-full text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          © {new Date().getFullYear()} Association WellKnownMCP (in creation). All rights reserved.
        </div>
      </div>
    </footer>
  )
}
