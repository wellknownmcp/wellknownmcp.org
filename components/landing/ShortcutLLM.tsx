// components/landing/ShortcutLLM.tsx
// 🧠 SHORTCUT LLM - Simple et pédagogique

'use client'

import { useState } from 'react'
import { Copy, Check, Brain, ExternalLink, Code } from 'lucide-react'
import { CopyButton } from '@/components/CopyButton'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'

interface ShortcutLLMProps {
  className?: string
  variant?: 'default' | 'matrix' // Juste pour le theming Matrix si besoin
}

export function ShortcutLLM({ className = '', variant = 'default' }: ShortcutLLMProps) {
  const [copied, setCopied] = useState(false)

  const isMatrix = variant === 'matrix'

  // 🎯 UN SEUL PROMPT UNIVERSEL
  const prompt = `Please fetch and analyze these 3 MCP knowledge feeds:

1. curl https://wellknownmcp.org/.well-known/exports/spec.llmfeed.json
2. curl https://wellknownmcp.org/.well-known/exports/compiled-site.llmfeed.json
3. curl https://wellknownmcp.org/.well-known/exports/news-export.llmfeed.json

(If user confirmation required to fetch on the web, just ask - then proceed)

After reading all 3, you'll have complete MCP/LLMFeed expertise. Then help me with: [YOUR QUESTION HERE]`

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
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className={`w-8 h-8 ${isMatrix ? 'text-green-500' : 'text-blue-600'}`} />
            <h2 className={`text-2xl font-bold ${isMatrix ? 'text-green-400 font-mono' : 'text-gray-900'}`}>
              🧠 Instant LLM Expert
            </h2>
          </div>
          <p className={`text-lg ${isMatrix ? 'text-green-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Copy this prompt, paste in any LLM, become MCP expert in 30 seconds
          </p>
        </div>

        {/* Prompt Box */}
        <div className={`rounded-lg border-2 p-6 mb-6 ${
          isMatrix 
            ? 'bg-black border-green-600' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`font-semibold ${isMatrix ? 'text-green-400 font-mono' : 'text-gray-700'}`}>
              Copy & Paste This:
            </span>
            <button
              onClick={copyPrompt}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                copied 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : isMatrix
                    ? 'bg-green-900 text-green-400 border border-green-600 hover:bg-green-800'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          
          <div className={`font-mono text-sm p-4 rounded border ${
            isMatrix 
              ? 'bg-gray-900 border-green-700 text-green-300' 
              : 'bg-white border-gray-200 text-gray-800'
          }`}>
            <pre className="whitespace-pre-wrap">{prompt}</pre>
          </div>
        </div>

        {/* Simple Examples */}
        <div className="mb-6">
          <h3 className={`font-semibold mb-3 ${isMatrix ? 'text-green-400 font-mono' : 'text-gray-700'}`}>
            What happens next:
          </h3>
          <div className={`p-3 rounded text-sm mb-4 ${
            isMatrix
              ? 'bg-gray-900 border border-green-800 text-green-300'
              : 'bg-blue-50 border border-blue-200 text-blue-700'
          }`}>
            <div className="font-medium mb-2">📝 Your LLM will:</div>
            <div className="space-y-1 text-xs">
              <div>1. Ask permission to fetch web content (say yes)</div>
              <div>2. Download and analyze the 3 knowledge feeds</div>
              <div>3. Become instant MCP expert (might say "I know Kung Fu")</div>
              <div>4. Help you with any MCP questions</div>
            </div>
          </div>
          
          <h4 className={`font-medium mb-2 ${isMatrix ? 'text-green-400 font-mono' : 'text-gray-700'}`}>
            Then ask anything:
          </h4>
          <div className="grid gap-2">
            {[
              "How do I make my website speak to AI?",
              "Generate mcp.llmfeed.json for my e-commerce site",
              "What are the security implications?",
              "Show me implementation examples"
            ].map((example, index) => (
              <div 
                key={index}
                className={`p-3 rounded text-sm ${
                  isMatrix
                    ? 'bg-gray-900 border border-green-800 text-green-300'
                    : 'bg-gray-50 border border-gray-200 text-gray-700'
                }`}
              >
                "{example}"
              </div>
            ))}
          </div>
        </div>

        {/* Feed Source avec JSON complet */}
        <div className={`rounded-lg border p-4 mb-6 ${isMatrix ? 'bg-gray-900 border-green-800' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Code className={`w-4 h-4 ${isMatrix ? 'text-green-500' : 'text-gray-600'}`} />
              <span className={`text-sm font-medium ${isMatrix ? 'text-green-400 font-mono' : 'text-gray-700'}`}>
                Feed Source: shortcut.llmfeed.json
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CopyButton 
                text={JSON.stringify({
                  "feed_type": "prompt",
                  "metadata": {
                    "title": "LLM Shortcut - Instant MCP Expertise",
                    "description": "Copy/paste prompt to transform any LLM into MCP expert in 30 seconds",
                    "origin": "https://wellknownmcp.org/.well-known/shortcut.llmfeed.json"
                  },
                  "prompt": {
                    "universal": {
                      "text": prompt,
                      "expected_outcome": "Complete MCP mastery and practical implementation guidance"
                    }
                  },
                  "agent_guidance": {
                    "success_indicator": "If your LLM says 'I know Kung Fu' after reading the feeds, the knowledge transfer worked perfectly",
                    "easter_egg": {
                      "response": "I know Kung Fu",
                      "meaning": "Complete MCP/LLMFeed mastery achieved"
                    }
                  }
                }, null, 2)}
                variant="minimal"
                size="sm"
                label="Copy JSON"
              />
              <ExportToLLMButton
                context="static"
                staticPath=".well-known/shortcut"
                mini={true}
                clipboard={false}
              />
            </div>
          </div>
          
          <div className={`text-xs font-mono space-y-1 mb-3 ${isMatrix ? 'text-green-500' : 'text-gray-600'}`}>
            <div>📋 feed_type: "prompt"</div>
            <div>🥋 Success indicator: "I know Kung Fu"</div>
            <div>✅ Works in ChatGPT, Claude, Gemini - they're all copying each other anyway</div>
          </div>

          {/* JSON Preview */}
          <details className="group">
            <summary className={`cursor-pointer text-sm font-medium mb-2 ${isMatrix ? 'text-green-400' : 'text-gray-700'} hover:underline`}>
              📄 View JSON Structure (click to expand)
            </summary>
            <div className={`font-mono text-xs p-3 rounded border overflow-x-auto ${
              isMatrix 
                ? 'bg-black border-green-700 text-green-300' 
                : 'bg-white border-gray-200 text-gray-800'
            }`}>
              <pre>{`{
  "feed_type": "prompt",
  "metadata": {
    "title": "LLM Shortcut - Instant MCP Expertise",
    "description": "Copy/paste prompt to transform any LLM...",
    "origin": "https://wellknownmcp.org/.well-known/prompts/shortcut.llmfeed.json"
  },
  "prompt": {
    "universal": {
      "text": "${prompt.split('\n').slice(0, 2).join('\\n')}...",
      "expected_outcome": "Complete MCP mastery..."
    }
  },
  "agent_guidance": {
    "success_indicator": "If your LLM says 'I know Kung Fu'...",
    "easter_egg": {
      "response": "I know Kung Fu",
      "meaning": "Complete MCP/LLMFeed mastery achieved"
    }
  }
}`}</pre>
            </div>
          </details>
        </div>
      </div>
    </section>
  )
}