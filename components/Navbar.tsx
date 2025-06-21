'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function OptimizedNavbar() {
  const [toolsOpen, setToolsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
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

        {/* Navigation principale - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {/* 🎯 DOWNLOADS - Point d'entrée principal */}
          <Link
            href="/downloads"
            className={`${
              isActive('/downloads') ? 'font-semibold border-b-2 border-violet-500' : ''
            } hover:text-violet-600 transition-colors bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 px-3 py-1.5 rounded-lg border border-violet-200 dark:border-violet-700`}
          >
            📥 Downloads
          </Link>

          {/* 🧠 TRAIN AI - KILLER FEATURE originale en position #2 */}
          <Link
            href="/train"
            className={`${
              isActive('/train') ? 'font-semibold border-b-2 border-yellow-500' : ''
            } hover:text-yellow-600 transition-colors bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 px-3 py-1.5 rounded-lg border border-yellow-200 dark:border-yellow-700 relative group`}
          >
            🧠 Train AI
            {/* Badge "HOT" original */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
              HOT
            </span>
          </Link>

          {/* 🔍 PREVIEW - Nouvelle killer feature en position #3 */}
          <Link
            href="/preview"
            className={`${
              isActive('/preview') || isActive('/llmfeedhub/preview') ? 'font-semibold border-b-2 border-blue-500' : ''
            } hover:text-blue-600 transition-colors bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-700 relative group`}
          >
            🔍 Preview
            {/* Badge "NEW" pour différencier */}
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              NEW
            </span>
            {/* Tooltip explicatif */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Compare MCP vs Traditional Web
            </div>
          </Link>

          {/* 📚 SPEC - Point d'entrée technique */}
          <Link
            href="/spec"
            className={`${
              isActive('/spec') ? 'font-semibold border-b-2 border-purple-500' : ''
            } hover:text-purple-600 transition-colors`}
          >
            📚 Spec
          </Link>

          {/* 🧰 TOOLS restructuré */}
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
                
                {/* Section Featured */}
                <div className="px-4 py-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                    Featured Tools
                  </div>
                  <Link 
                    href="/llmfeedhub" 
                    className="block px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                  >
                    🔧 LLMFeed Analyzer
                  </Link>
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
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                {/* Section Learn */}
                <div className="px-4 py-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                    Learn & Understand
                  </div>
                  <Link 
                    href={`/${lang}/faq`}
                    className="block px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                  >
                    ❓ FAQ
                  </Link>
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

          {/* 📰 NEWS */}
          <Link
            href={`/${lang}/news`}
            className={`${
              isActive(`/${lang}/news`) ? 'font-semibold border-b-2 border-blue-500' : ''
            } hover:text-blue-600 transition-colors`}
          >
            📰 News
          </Link>

          {/* 🌐 ECOSYSTEM */}
          <Link
            href="/ecosystem"
            className={`${
              isActive('/ecosystem') ? 'font-semibold border-b-2 border-indigo-500' : ''
            } hover:text-indigo-600 transition-colors`}
          >
            🌐 Ecosystem
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-gray-800"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>

      {/* Partie droite - Actions */}
      <div className="hidden md:flex items-center space-x-4">
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
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          aria-label="Visit our GitHub repository"
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 z-40">
          <div className="px-6 py-4 space-y-4">
            <Link href="/downloads" className="block py-2 text-violet-600 font-medium">📥 Downloads</Link>
            <Link href="/train" className="block py-2 text-yellow-600 font-bold">
              🧠 Train AI 
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">HOT</span>
            </Link>
            <Link href="/preview" className="block py-2 text-blue-600 font-medium">
              🔍 Preview 
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">NEW</span>
            </Link>
            <Link href="/spec" className="block py-2">📚 Spec</Link>
            <Link href="/llmfeedhub" className="block py-2">🔧 Analyzer</Link>
            <Link href="/tools" className="block py-2">🧰 Tools</Link>
            <Link href={`/${lang}/news`} className="block py-2">📰 News</Link>
            <Link href="/ecosystem" className="block py-2">🌐 Ecosystem</Link>
            <Link href={`/${lang}/faq`} className="block py-2">❓ FAQ</Link>
            <Link href="/join" className="block py-2 text-purple-600 font-medium">🤝 Join</Link>
          </div>
        </div>
      )}
    </nav>
  )
}