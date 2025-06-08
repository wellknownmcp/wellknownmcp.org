'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false)
  const pathname = usePathname()
  const langMatch = pathname.match(/^\/(en|fr|es|zh|ar|uk)(\/|$)/)
  const lang = langMatch ? langMatch[1] : 'en'

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-black z-50">
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="WellKnownMCP"
            height={40}
            width={120}
            className="h-10 w-auto object-contain rounded-md border border-gray-300 dark:border-gray-600 shadow-sm"
          />
        </Link>

        <Link
          href="/spec/01_llmfeed/llmfeed"
          className={
            isActive('/spec/01_llmfeed/llmfeed')
              ? 'font-semibold border-b-2'
              : ''
          }
        >
          📜 Spec
        </Link>

        <Link
          href={`/${lang}/news`}
          className={
            isActive(`/${lang}/news`) ? 'font-semibold border-b-2' : ''
          }
        >
          🗞️ News
        </Link>

        <Link
          href="/join"
          className={isActive('/join') ? 'font-semibold border-b-2' : ''}
        >
          🤝 Join
        </Link>

        <Link
          href={`/${lang}/about`}
          className={
            isActive(`/${lang}/about`) ? 'font-semibold border-b-2' : ''
          }
        >
          🧭 About
        </Link>

        {/* Tools menu */}
        <div
          className="relative"
          onMouseEnter={() => setToolsOpen(true)}
          onMouseLeave={() => setToolsOpen(false)}
        >
          <span className="cursor-pointer">🧰 Tools ▾</span>
          {toolsOpen && (
            <div className="absolute mt-1 min-w-[240px] bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-lg rounded-md z-10">
              <Link href="/tools#explore">🔎 Preview</Link>
              <Link href="/tools#concepts">🧠 Concepts Explained</Link>
              <Link href="/tools#developer">👩‍💻 Developer Tools</Link>
              <Link href="/tools">🧰 All Tools →</Link>
            </div>
          )}
        </div>

        <Link
          href="/tools/prompt"
          className={
            isActive('/tools/prompt') ? 'font-semibold border-b-2' : ''
          }
        >
          ✍️ Prompt
        </Link>
        <Link
          href="/ecosystem"
          className={isActive('/ecosystem') ? 'font-semibold border-b-2' : ''}
        >
          🌐 Ecosystem
        </Link>
        <Link
          href="/faq"
          className={isActive('/faq') ? 'font-semibold border-b-2' : ''}
        >
          ❓ FAQ
        </Link>
      </div>

      <div className="ml-auto">
        <Link
          href="https://github.com/wellknownmcp"
          target="_blank"
          rel="noopener"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.42 2.865 8.166 6.839 9.489..."
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </nav>
  )
}
