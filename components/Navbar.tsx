'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function OptimizedNavbar() {
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

        {/* 🎯 SPEC plus visible - Point d'entrée technique */}
        <Link
          href="/spec"
          className={`${
            isActive('/spec') ? 'font-semibold border-b-2 border-purple-500' : ''
          } hover:text-purple-600 transition-colors`}
        >
          📚 Spec
        </Link>

        {/* 🗞️ NEWS - Source principale de trafic */}
        <Link
          href={`/${lang}/news`}
          className={`${
            isActive(`/${lang}/news`) ? 'font-semibold border-b-2 border-blue-500' : ''
          } hover:text-blue-600 transition-colors`}
        >
          📰 News
        </Link>

        {/* 🔧 LLMFEEDHUB - Outil phare maintenant visible */}
        <Link
          href="/llmfeedhub"
          className={`${
            isActive('/llmfeedhub') ? 'font-semibold border-b-2 border-green-500' : ''
          } hover:text-green-600 transition-colors bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md`}
        >
          🔧 LLMFeedHub
        </Link>

        {/* 🧰 TOOLS restructuré - Deuxième source de trafic */}
        <div
          className="relative"
          onMouseEnter={() => setToolsOpen(true)}
          onMouseLeave={() => setToolsOpen(false)}
        >
          <span className={`cursor-pointer hover:text-orange-600 transition-colors ${
            isActive('/tools') ? 'font-semibold border-b-2 border-orange-500' : ''
          }`}>
            🧰 Tools ▾
          </span>
          {toolsOpen && (
            <div className="absolute top-full left-0 mt-2 min-w-[280px] bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-xl rounded-lg z-50 py-3">
              
              {/* Section Interactive */}
              <div className="px-4 py-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                  Interactive Tools
                </div>
                <Link 
                  href="/tools/prompt" 
                  className="block px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  ✍️ Prompt Builder
                </Link>
                <Link 
                  href="/tools/sign-and-verify" 
                  className="block px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  🔐 Sign & Verify
                </Link>
                <Link 
                  href="/tools/export-button" 
                  className="block px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  📤 Export Button
                </Link>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

              {/* Section Concepts */}
              <div className="px-4 py-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                  Learn & Understand
                </div>
                <Link 
                  href="/tools/agent-behavior" 
                  className="block px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  🤖 Agent Behavior
                </Link>
                <Link 
                  href="/tools/api-explained" 
                  className="block px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  🔌 API Explained
                </Link>
                <Link 
                  href="en/faq" 
                  className="block px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  ❓ FAQ
                </Link>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

              {/* All Tools */}
              <div className="px-4 py-2">
                <Link 
                  href="/tools" 
                  className="block px-2 py-2 text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded transition-colors text-orange-600 dark:text-orange-400"
                >
                  🧰 All Tools & Resources →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 🌐 ECOSYSTEM - Groupé pour clarté */}
        <Link
          href="/ecosystem"
          className={`${
            isActive('/ecosystem') ? 'font-semibold border-b-2 border-indigo-500' : ''
          } hover:text-indigo-600 transition-colors`}
        >
          🌐 Ecosystem
        </Link>
      </div>

      {/* Partie droite - Actions et liens externes */}
      <div className="flex items-center space-x-4">
        {/* Join - Call to action */}
        <Link
          href="/join"
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all shadow-sm"
        >
          🤝 Join
        </Link>

        {/* GitHub */}
        <Link
          href="https://github.com/wellknownmcp"
          target="_blank"
          rel="noopener"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-z"/>
          </svg>
        </Link>
      </div>
    </nav>
  )
}