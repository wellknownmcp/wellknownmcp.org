// CopyButtons.tsx - Seule partie qui nécessite 'use client'
'use client'

import { useState } from 'react'

export function CopyButtons() {
  const [copiedButton, setCopiedButton] = useState<string | null>(null)

  // A/B Test: 95% version pratique, 5% version technique avancée
  const showPracticalVersion = Math.random() < 0.95
  const specLiteUrl = "https://wellknownmcp.org/.well-known/exports/spec-essential.llmfeed.json"
  const specFullUrl = "https://wellknownmcp.org/.well-known/exports/spec.llmfeed.json"
  
  const handleCopy = async (promptText: string, buttonId: string) => {
    try {
      await navigator.clipboard.writeText(promptText)
      setCopiedButton(buttonId)
      setTimeout(() => setCopiedButton(null), 2000)
    } catch (err) {
      // Fallback pour navigateurs sans clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = promptText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedButton(buttonId)
      setTimeout(() => setCopiedButton(null), 2000)
    }
  }

  const handleCopyQuickStart = () => {
    const promptText = `Please analyze this LLMFeed specification for quick implementation guidance: ${specLiteUrl}`
    handleCopy(promptText, 'quick-start')
  }

  const handleCopyComplete = () => {
    const promptText = `Please analyze this complete LLMFeed specification for comprehensive implementation: ${specFullUrl}`
    handleCopy(promptText, 'complete')
  }

  if (showPracticalVersion) {
    // VERSION A (95%) - "Implementation-Ready Paths"
    return (
      <div className="mt-12 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border-2 border-dashed border-emerald-200 dark:border-emerald-800 hover:border-solid transition-all not-prose">
        <div className="flex items-start gap-4">
          <div className="text-3xl">⚡</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
              Ready to Implement? Get AI-Powered Guidance
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Reading docs manually takes time. Your AI can digest the <strong>complete LLMFeed specification</strong> and provide implementation guidance tailored to your needs.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {/* Option rapide */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎯</span>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Quick Start</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Essential concepts for immediate implementation
                </p>
                <button
                  onClick={handleCopyQuickStart}
                  className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium transition-all"
                >
                  {copiedButton === 'quick-start' ? '✅ Copied!' : '🚀 Copy Quick Start Prompt'}
                </button>
                <div className="mt-2 text-xs text-gray-500">
                  ~22K tokens • 30s analysis • Core concepts
                </div>
              </div>

              {/* Option complète */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📚</span>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Complete Mastery</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Full specification with examples and edge cases
                </p>
                <button
                  onClick={handleCopyComplete}
                  className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium transition-all"
                >
                  {copiedButton === 'complete' ? '✅ Copied!' : '📖 Copy Complete Spec Prompt'}
                </button>
                <div className="mt-2 text-xs text-gray-500">
                  ~140K tokens • 2min analysis • Everything
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span>💡 Works with Claude, ChatGPT, Gemini</span>
              <span>⚡ Instant implementation guidance</span>
              <span>🎯 Tailored to your specific needs</span>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    // VERSION B (5%) - "Developer Matrix Style"
    return (
      <div className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-dashed border-indigo-200 dark:border-indigo-800 hover:border-solid transition-all not-prose">
        <div className="flex items-start gap-4">
          <div className="text-3xl">⚙️</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
              Choose Your Implementation Path
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                if (needsImplementation) → feedToAI(specification)
              </span><br/>
              Skip the manual parsing. Download the spec directly to your AI's neural networks.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {/* Quick hack */}
              <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">⚡</span>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Rapid Prototype</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Essential algorithms, ready to ship
                </p>
                <button
                  onClick={handleCopyQuickStart}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-md font-medium transition-all"
                >
                  {copiedButton === 'quick-start' ? '✅ Copied!' : '⚡ Download Core Logic'}
                </button>
                <div className="mt-2 text-xs text-gray-500 font-mono">
                  O(1) implementation complexity
                </div>
              </div>

              {/* Deep dive */}
              <div className="p-4 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🔬</span>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">System Architecture</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Complete patterns, enterprise-grade
                </p>
                <button
                  onClick={handleCopyComplete}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-md font-medium transition-all"
                >
                  {copiedButton === 'complete' ? '✅ Copied!' : '🔬 Download Full Schema'}
                </button>
                <div className="mt-2 text-xs text-gray-500 font-mono">
                  O(everything) knowledge transfer
                </div>
              </div>
            </div>
            
            <div className="text-center text-xs text-gray-500 dark:text-gray-400 font-mono">
              <div>🤖 Compatible with: Claude.v4, GPT-4o, Gemini.Pro</div>
              <div className="mt-1">⚡ Transfer rate: ~200MB/s of pure knowledge</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}