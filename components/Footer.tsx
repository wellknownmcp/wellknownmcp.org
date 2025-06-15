'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function OptimizedFooter() {
  const pathname = usePathname()
  const langMatch = pathname.match(/^\/(en|fr|es|zh|ar|uk)(\/|$)/)
  const lang = langMatch ? langMatch[1] : 'en'

  return (
    <footer className="bg-white dark:bg-black border-t dark:border-gray-800 text-sm text-black dark:text-white mt-12">
      <div className="w-full px-4 py-8 max-w-6xl mx-auto">
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-3">WellKnownMCP</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Building the infrastructure for the agentic web. Open standards, cryptographic trust, and universal interoperability.
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <a
                  href="mailto:opensource@wellknownmcp.org"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  opensource@wellknownmcp.org
                </a>
              </p>
              <div className="flex space-x-3">
                <Link 
                  href="https://github.com/wellknownmcp" 
                  target="_blank" 
                  rel="noopener"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>

          {/* Core Platform */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Core Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/spec" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  📚 LLMFeed Specification
                </Link>
              </li>
              <li>
                <Link href="/llmfeedhub" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  🔧 LLMFeedHub (Universal Analyzer)
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/news`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  📰 Latest News & Updates
                </Link>
              </li>
              <li>
                <Link href="/ecosystem" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  🌐 Ecosystem & Adopters
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Tools & Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/prompt" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  ✍️ Prompt Builder
                </Link>
              </li>
              <li>
                <Link href="/tools/sign-and-verify" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  🔐 Sign & Verify Feeds
                </Link>
              </li>
              <li>
                <Link href="/tools/export-button" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  📤 Export Button Generator
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  🧰 All Developer Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Started & Ecosystem */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Get Started</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/join" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors">
                  🤝 Join the Community
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  🧭 About the Project
                </Link>
              </li>
              <li>
                <Link href="en/faq" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  ❓ Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  ✅ Verify Feed Authenticity
                </Link>
              </li>
            </ul>

            {/* Ecosystem Partners */}
            <div className="mt-6">
              <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wide">Ecosystem</h5>
              <div className="space-y-1">
                <Link 
                  href="https://llmca.org" 
                  target="_blank" 
                  rel="noopener"
                  className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  🛡️ LLMCA (Certification Authority)
                </Link>
                <Link 
                  href="https://llmfeedforge.org" 
                  target="_blank" 
                  rel="noopener"
                  className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  🛠️ LLMFeedForge (Builder Tools)
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Agent-friendly section - SEO bonus */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 text-sm">🤖 Quick Access for AI Agents</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <Link 
                href="/.well-known/mcp.llmfeed.json" 
                className="text-purple-600 dark:text-purple-400 hover:underline font-mono"
              >
                MCP Declaration
              </Link>
              <Link 
                href="/.well-known/capabilities.llmfeed.json" 
                className="text-blue-600 dark:text-blue-400 hover:underline font-mono"
              >
                Site Capabilities
              </Link>
              <Link 
                href="/.well-known/exports/news-export.llmfeed.json" 
                className="text-green-600 dark:text-green-400 hover:underline font-mono"
              >
                News Archive
              </Link>
              <Link 
                href="/.well-known/exports/spec.llmfeed.json" 
                className="text-orange-600 dark:text-orange-400 hover:underline font-mono"
              >
                Complete Spec
              </Link>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
              All feeds are cryptographically signed and agent-optimized
            </p>
          </div>
        </div>

        {/* Legal footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Association WellKnownMCP (in creation). All rights reserved.
            </div>
            <div className="flex space-x-4 text-xs">
              <Link href="/legal" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                Legal Notice
              </Link>
              <Link href="/sdk" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                SDK & API
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}