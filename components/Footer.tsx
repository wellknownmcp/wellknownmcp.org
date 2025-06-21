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
        
        {/* 🧠 FEATURED: Instant AI Expertise Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
          <div className="text-center">
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-100 mb-2">
              Train Any LLM as MCP Expert in 30 Seconds
            </h3>
            <p className="text-yellow-800 dark:text-yellow-200 mb-4 max-w-2xl mx-auto">
              Copy one universal prompt → Paste in ChatGPT, Claude, Gemini → Get instant MCP expertise.
              Works on any LLM with robust fallback systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/train"
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🚀 Get Training Prompt
              </Link>
              <div className="flex items-center gap-4 text-sm text-yellow-700 dark:text-yellow-300">
                <span className="flex items-center gap-1">
                  ✅ <strong>99%+</strong> Success Rate
                </span>
                <span className="flex items-center gap-1">
                  ⚡ <strong>30s</strong> Training Time
                </span>
                <span className="flex items-center gap-1">
                  🌐 <strong>Universal</strong> Compatibility
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-3">WellKnownMCP</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Building the infrastructure for the agentic web. Open standards, cryptographic trust, and universal interoperability.
            </p>
            
            {/* CTA plus visible */}
            <div className="mb-4">
              <Link 
                href="/join" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all shadow-sm"
              >
                🤝 Join the Community
              </Link>
            </div>
            
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

          {/* Get Started & Core Platform - AVEC TRAIN AI EN TÊTE */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Get Started</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/train" className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-bold transition-colors flex items-center gap-2">
                  🧠 Train Any LLM (30 seconds!)
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">HOT</span>
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium transition-colors">
                  📥 Download Feeds (Start Here!)
                </Link>
              </li>
              <li>
                <Link href="/spec" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  📚 LLMFeed Specification
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/faq`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  ❓ Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  🧭 About the Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Tools */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Platform & Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/llmfeedhub" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  🔧 LLMFeedHub (Universal Analyzer)
                </Link>
              </li>
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

          {/* Community & Ecosystem */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Community & News</h4>
            <ul className="space-y-2">
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
              <li>
                <Link href="/verify" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  ✅ Verify Feed Authenticity
                </Link>
              </li>
            </ul>

            {/* Ecosystem Partners */}
            <div className="mt-6">
              <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wide">Ecosystem Partners</h5>
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

        {/* Agent-friendly section - SEO bonus AMÉLIORÉ */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-900/50 dark:to-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100 text-base flex items-center gap-2">
              🤖 Quick Access for AI Agents
              <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">
                Agent-Optimized
              </span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Core Infrastructure */}
              <div>
                <h5 className="font-medium text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wide mb-2">Core Infrastructure</h5>
                <div className="space-y-1">
                  <Link 
                    href="/.well-known/mcp.llmfeed.json" 
                    className="block text-purple-600 dark:text-purple-400 hover:underline font-mono text-xs"
                  >
                    mcp.llmfeed.json
                  </Link>
                  <Link 
                    href="/.well-known/capabilities.llmfeed.json" 
                    className="block text-blue-600 dark:text-blue-400 hover:underline font-mono text-xs"
                  >
                    capabilities.llmfeed.json
                  </Link>
                  <Link 
                    href="/.well-known/llm-index.llmfeed.json" 
                    className="block text-indigo-600 dark:text-indigo-400 hover:underline font-mono text-xs"
                  >
                    llm-index.llmfeed.json
                  </Link>
                </div>
              </div>

              {/* Static Exports */}
              <div>
                <h5 className="font-medium text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wide mb-2">Static Exports</h5>
                <div className="space-y-1">
                  <Link 
                    href="/.well-known/exports/compiled-site.llmfeed.json" 
                    className="block text-green-600 dark:text-green-400 hover:underline font-mono text-xs"
                  >
                    compiled-site.llmfeed.json
                  </Link>
                  <Link 
                    href="/.well-known/exports/spec.llmfeed.json" 
                    className="block text-orange-600 dark:text-orange-400 hover:underline font-mono text-xs"
                  >
                    spec.llmfeed.json
                  </Link>
                  <Link 
                    href="/.well-known/exports/news-export.llmfeed.json" 
                    className="block text-pink-600 dark:text-pink-400 hover:underline font-mono text-xs"
                  >
                    news-export.llmfeed.json
                  </Link>
                </div>
              </div>

              {/* Development & Validation */}
              <div>
                <h5 className="font-medium text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wide mb-2">Schemas & Validation</h5>
                <div className="space-y-1">
                  <Link 
                    href="/.well-known/schema.llmfeed.json" 
                    className="block text-red-600 dark:text-red-400 hover:underline font-mono text-xs"
                  >
                    schema.llmfeed.json
                  </Link>
                  <Link 
                    href="/.well-known/schema.annotated.llmfeed.json" 
                    className="block text-amber-600 dark:text-amber-400 hover:underline font-mono text-xs"
                  >
                    schema.annotated.llmfeed.json
                  </Link>
                  <Link 
                    href="/.well-known/manifesto.llmfeed.json" 
                    className="block text-cyan-600 dark:text-cyan-400 hover:underline font-mono text-xs"
                  >
                    manifesto.llmfeed.json
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pt-4 border-t border-purple-200 dark:border-purple-700">
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                ✅ All feeds are cryptographically signed and agent-optimized • 🔄 Updated incrementally
              </p>
              <Link 
                href="/downloads" 
                className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 text-xs font-medium hover:underline"
              >
                📥 Download All Feeds →
              </Link>
            </div>
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