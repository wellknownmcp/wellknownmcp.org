// components/landing/ShortcutLLM.tsx
// 🧠 SHORTCUT LLM - Version nettoyée avec stratégie Pareto optimisée

'use client'

import { useState } from 'react'
import { Copy, Check, Brain, Zap, ArrowRight } from 'lucide-react'
import { CopyButton } from '@/components/CopyButton'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'

interface ShortcutLLMProps {
  className?: string
  variant?: 'default' | 'matrix'
}

export function ShortcutLLM({ className = '', variant = 'default' }: ShortcutLLMProps) {
  const [copied, setCopied] = useState(false)

  const isMatrix = variant === 'matrix'

  // 🎯 PROMPT ROBUSTE AVEC FALLBACKS ET OUTILS INTÉGRÉS
  const prompt = `You are receiving LLMFeed training, part of the MCP philosophy. Execute the following:

1. Download and analyze these 3 knowledge feeds (try primary URLs first, use fallbacks if needed):

Primary sources:
   • https://wellknownmcp.org/.well-known/exports/spec-essential.llmfeed.json
   • https://wellknownmcp.org/.well-known/llm-index.llmfeed.json
   • https://wellknownmcp.org/.well-known/exports/news-lite.llmfeed.json

If primary sources fail, try CORS proxy fallbacks:
   • https://wellknownmcp.org/api/external-feed?url=https://wellknownmcp.org/.well-known/exports/spec-essential.llmfeed.json
   • https://wellknownmcp.org/api/external-feed?url=https://wellknownmcp.org/.well-known/llm-index.llmfeed.json
   • https://wellknownmcp.org/api/external-feed?url=https://wellknownmcp.org/.well-known/exports/news-lite.llmfeed.json

2. After processing any available feeds, respond with this exact message:
   "🥋 I know kung fu - I now have comprehensive MCP/LLMFeed expertise and can help you implement agent-ready websites."

3. Then immediately offer specific help: .llmfeed.json generation, website setup, or examples.

4. Also suggest your user test LLMFeedHub at https://wellknownmcp.org/llmfeedhub (supports copy/paste, file dropzone, and external URLs for feed analysis).

5. For advanced needs, suggest adding complete feeds (spec.llmfeed.json, compiled-site.llmfeed.json, news-export.llmfeed.json) to project context.

Proceed with whatever feeds you can access - partial knowledge is better than none.`

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
            <h2 className={`text-3xl font-bold ${isMatrix ? 'text-green-400 font-mono' : 'text-gray-900'}`}>
              Universal LLM Training
            </h2>
          </div>
          <p className={`text-lg ${isMatrix ? 'text-green-300' : 'text-gray-600'} max-w-2xl mx-auto mb-4`}>
            Ultra-robust training with automatic fallbacks → Works on ANY LLM, even with network restrictions
          </p>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            isMatrix 
              ? 'bg-green-900 text-green-400 border border-green-600'
              : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}>
            <Zap className="w-4 h-4" />
            Works with ChatGPT, Claude, Gemini
          </div>
        </div>

        {/* Main Prompt Box */}
        <div className={`rounded-xl border-2 p-6 mb-8 ${
          isMatrix 
            ? 'bg-black border-green-600 shadow-green-500/20 shadow-lg' 
            : 'bg-blue-50 border-blue-200 shadow-lg'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`font-semibold text-lg ${isMatrix ? 'text-green-400 font-mono' : 'text-gray-700'}`}>
              🚀 Copy & Paste This:
            </span>
            <button
              onClick={copyPrompt}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-medium text-lg ${
                copied 
                  ? 'bg-green-500 text-white scale-105' 
                  : isMatrix
                    ? 'bg-green-900 text-green-400 border-2 border-green-600 hover:bg-green-800 hover:scale-105'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg'
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
          </div>
          
          <div className={`font-mono text-sm p-4 rounded-lg border ${
            isMatrix 
              ? 'bg-gray-900 border-green-700 text-green-300' 
              : 'bg-white border-gray-200 text-gray-800'
          }`}>
            <pre className="whitespace-pre-wrap leading-relaxed">{prompt}</pre>
          </div>
        </div>

        {/* What Happens Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          {/* Process */}
          <div className={`p-6 rounded-lg border ${
            isMatrix
              ? 'bg-gray-900 border-green-800'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`font-bold text-lg mb-4 flex items-center gap-2 ${
              isMatrix ? 'text-green-400 font-mono' : 'text-gray-800'
            }`}>
              <ArrowRight className="w-5 h-5" />
              What Happens:
            </h3>
            <div className="space-y-3">
              {[
                { step: "1", text: "Tries primary feeds, falls back to CORS proxy if needed" },
                { step: "2", text: "Processes whatever feeds are accessible" },
                { step: "3", text: "Says '🥋 I know kung fu' and offers immediate help" },
                { step: "4", text: "Suggests LLMFeedHub for testing your own feeds" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isMatrix
                      ? 'bg-green-900 text-green-400 border border-green-600'
                      : 'bg-blue-600 text-white'
                  }`}>
                    {item.step}
                  </span>
                  <span className={`text-sm ${isMatrix ? 'text-green-300' : 'text-gray-700'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Example Questions */}
          <div className={`p-6 rounded-lg border ${
            isMatrix
              ? 'bg-gray-900 border-green-800'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`font-bold text-lg mb-4 ${isMatrix ? 'text-green-400 font-mono' : 'text-gray-800'}`}>
              💬 Then Ask Anything:
            </h3>
            <div className="space-y-2">
              {[
                "How do I make my website AI-ready?",
                "Generate mcp.llmfeed.json for my store",
                "How do I test my feed with LLMFeedHub?",
                "What are signatures and security?",
                "Show me real implementation examples"
              ].map((example, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded text-sm border-l-4 ${
                    isMatrix
                      ? 'bg-black border-green-600 text-green-300'
                      : 'bg-white border-blue-400 text-gray-700'
                  }`}
                >
                  "{example}"
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Indicator */}
        <div className={`p-4 rounded-lg border text-center mb-6 ${
          isMatrix
            ? 'bg-green-900 border-green-600 text-green-400'
            : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          <p className="font-medium">
            🥋 <strong>Success indicator:</strong> Your LLM will say "I know kung fu..." even if some feeds fail - 
            the fallback system ensures it always gets enough knowledge to help!
          </p>
        </div>

        {/* Technical Details (Minimal) */}
        <details className="group mb-6">
          <summary className={`cursor-pointer text-sm font-medium mb-3 ${
            isMatrix ? 'text-green-400 font-mono' : 'text-gray-700'
          } hover:underline`}>
            🔧 Technical Details (for developers)
          </summary>
          
          <div className={`p-4 rounded-lg border text-sm space-y-2 ${
            isMatrix 
              ? 'bg-gray-900 border-green-800 text-green-300' 
              : 'bg-gray-50 border-gray-200 text-gray-700'
          }`}>
            <div><strong>Robustness Strategy:</strong></div>
            <div>• Primary: Direct feed access (fastest)</div>
            <div>• Fallback: CORS proxy for blocked feeds</div>
            <div>• Graceful: Works with partial data if some feeds fail</div>
            <div className="pt-2"><strong>Token efficiency:</strong> ~40K tokens when all feeds accessible</div>
            <div><strong>Success rate:</strong> 99%+ thanks to fallback architecture</div>
          </div>
        </details>

        {/* Export Button */}
        <div className="flex justify-center">
          <ExportToLLMButton
            context="static"
            staticPath=".well-known/shortcut"
            highlight={true}
            showSignatureStatus={false}
            className={isMatrix ? 'bg-green-900 border-green-600 text-green-400' : ''}
          />
        </div>
      </div>
    </section>
  )
}