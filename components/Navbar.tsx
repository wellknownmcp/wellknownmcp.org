'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export default function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false)
  const pathname = usePathname()
  const params = useParams()
  const lang = typeof params?.lang === 'string' ? params.lang : 'en' // fallback
  const Logo = () => (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo.png"
        alt="WellKnownMCP"
        height={40}
        width={120}
        className="h-10 w-auto object-contain rounded-md border border-gray-300 dark:border-gray-600 shadow-sm"
      />
    </Link>
  )

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-black z-50">
      <div className="flex items-center space-x-8">
        <Logo />

        <Link
          href="/spec/01_llmfeed/llmfeed"
          className={`text-black dark:text-white no-underline hover:opacity-80 transition ${
            isActive('/spec/01_llmfeed/llmfeed')
              ? 'font-semibold border-b-2 border-black dark:border-white'
              : ''
          }`}
        >
          📜 Spec
        </Link>

        <Link
          href={`/${lang}/news`}
          className={`text-black dark:text-white no-underline hover:opacity-80 transition ${
            isActive(`/${lang}/news`)
              ? 'font-semibold border-b-2 border-black dark:border-white'
              : ''
          }`}
        >
          🗞️ News
        </Link>

        <Link
          href="/join"
          className={`text-black dark:text-white no-underline hover:opacity-80 transition ${
            isActive('/join')
              ? 'font-semibold border-b-2 border-black dark:border-white'
              : ''
          }`}
        >
          🤝 Join
        </Link>

        <Link
          href={`/${lang}/about`}
          className={`text-black dark:text-white no-underline hover:opacity-80 transition ${
            isActive(`/${lang}/about`)
              ? 'font-semibold border-b-2 border-black dark:border-white'
              : ''
          }`}
        >
          🧭 About
        </Link>

        <div
          className="relative"
          onMouseEnter={() => setToolsOpen(true)}
          onMouseLeave={() => setToolsOpen(false)}
        >
          <span className="cursor-pointer text-black dark:text-white hover:opacity-80">
            🧰 Tools ▾
          </span>

          {toolsOpen && (
            <div className="absolute mt-1 min-w-[240px] bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-lg rounded-md z-10">
              <Link
                href="/tools#explore"
                className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-black dark:hover:text-white"
              >
                🔎 Preview
              </Link>
              <Link
                href="/tools#concepts"
                className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-black dark:hover:text-white"
              >
                🧠 Concepts Explained
              </Link>
              <Link
                href="/tools#developer"
                className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-black dark:hover:text-white"
              >
                👩‍💻 Developer Tools
              </Link>
              <Link
                href="/tools"
                className="block px-4 py-2 text-sm font-semibold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                🧰 All Tools →
              </Link>
            </div>
          )}
        </div>
        <Link
          href="/tools/prompt"
          className={`text-black dark:text-white no-underline hover:opacity-80 transition ${
            isActive('/tools/prompt')
              ? 'font-semibold border-b-2 border-black dark:border-white'
              : ''
          }`}
        >
          ✍️ Prompt
        </Link>
        <Link
          href="/ecosystem"
          className={`text-black dark:text-white no-underline hover:opacity-80 transition ${
            isActive('/ecosystem')
              ? 'font-semibold border-b-2 border-black dark:border-white'
              : ''
          }`}
        >
          🌐 Ecosystem
        </Link>
        <Link
          href={`/faq`}
          className={`text-black dark:text-white no-underline hover:opacity-80 transition ${
            isActive(`/faq`)
              ? 'font-semibold border-b-2 border-black dark:border-white'
              : ''
          }`}
        >
          ❓ FAQ
        </Link>
      </div>

      <div className="ml-auto">
        <Link
          href="https://github.com/wellknownmcp"
          target="_blank"
          rel="noopener"
          className="text-black dark:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.153-1.11-1.461-1.11-1.461-.909-.621.069-.608.069-.608 1.004.07 1.533 1.032 1.533 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.56 9.56 0 012.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.481A10.019 10.019 0 0022 12.017C22 6.484 17.523 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </nav>
  )
}
