// Nouveau composant à ajouter : components/landing/AgentCurlAccess.tsx
'use client'

import { useState } from 'react'
import { Copy, Check, Terminal, Download } from 'lucide-react'

interface CurlCommand {
  name: string
  description: string
  url: string
  command: string
  type: 'feed' | 'api' | 'export'
}

export function AgentCurlAccess() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const curlCommands: CurlCommand[] = [
    {
      name: "Main MCP Feed",
      description: "Core site declaration",
      url: "/.well-known/mcp.llmfeed.json",
      command: "curl -s https://wellknownmcp.org/.well-known/mcp.llmfeed.json | jq .",
      type: "feed"
    },
    {
      name: "Capabilities Feed", 
      description: "Available tools & endpoints",
      url: "/.well-known/capabilities.llmfeed.json",
      command: "curl -s https://wellknownmcp.org/.well-known/capabilities.llmfeed.json | jq .",
      type: "feed"
    },
    {
      name: "LLM Index",
      description: "All feeds directory",
      url: "/.well-known/llm-index.llmfeed.json", 
      command: "curl -s https://wellknownmcp.org/.well-known/llm-index.llmfeed.json | jq .",
      type: "feed"
    },
    {
      name: "Complete Site Export",
      description: "Entire site in one feed",
      url: "/.well-known/exports/compiled-site.llmfeed.json",
      command: "curl -s https://wellknownmcp.org/.well-known/exports/compiled-site.llmfeed.json | jq .",
      type: "export"
    },
    {
      name: "Spec Documentation",
      description: "Technical specification",
      url: "/exports/spec.llmfeed.json",
      command: "curl -s https://wellknownmcp.org/exports/spec.llmfeed.json | jq .",
      type: "export"
    },
    {
      name: "LLMFeedHub Analysis",
      description: "Analyze any feed via API",
      url: "/api/external-feed?url=...",
      command: "curl -s 'https://wellknownmcp.org/api/external-feed?url=https%3A%2F%2Fapi.github.com%2Frepos%2Fmicrosoft%2Fvscode' | jq .",
      type: "api"
    }
  ]

  const copyToClipboard = async (command: string, name: string) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopiedCommand(name)
      setTimeout(() => setCopiedCommand(null), 2000)
    } catch (err) {
      console.error('Failed to copy command:', err)
    }
  }

  const getTypeIcon = (type: CurlCommand['type']) => {
    switch (type) {
      case 'feed': return '📡'
      case 'export': return '📦'
      case 'api': return '🔧'
      default: return '📄'
    }
  }

  const getTypeColor = (type: CurlCommand['type']) => {
    switch (type) {
      case 'feed': return 'bg-blue-100 text-blue-800'
      case 'export': return 'bg-green-100 text-green-800' 
      case 'api': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section 
      className="max-w-5xl mx-auto p-6 bg-slate-50 rounded-lg border"
      data-agent-priority="critical"
    >
      <div className="flex items-center gap-3 mb-6">
        <Terminal className="w-6 h-6 text-slate-700" />
        <div>
          <h2 className="text-xl font-bold text-slate-900">Agent Quick Access</h2>
          <p className="text-sm text-slate-600">Direct curl commands for immediate access</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {curlCommands.map((cmd, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{getTypeIcon(cmd.type)}</span>
                  <h3 className="font-semibold text-sm">{cmd.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(cmd.type)}`}>
                    {cmd.type}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2">{cmd.description}</p>
                
                {/* URL directe */}
                <div className="mb-3">
                  <p className="text-xs text-slate-500 mb-1">Direct URL:</p>
                  <a 
                    href={`https://wellknownmcp.org${cmd.url.replace('?url=...', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-blue-600 hover:text-blue-800 underline break-all"
                  >
                    wellknownmcp.org{cmd.url.replace('?url=...', '')}
                  </a>
                </div>
              </div>
            </div>

            {/* Commande curl */}
            <div className="bg-slate-900 rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium">CURL COMMAND</span>
                <button
                  onClick={() => copyToClipboard(cmd.command, cmd.name)}
                  className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-300 transition-colors"
                  title="Copy command"
                >
                  {copiedCommand === cmd.name ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <code className="text-xs text-green-400 font-mono break-all block">
                {cmd.command}
              </code>
            </div>

            {/* Actions rapides */}
            <div className="flex gap-2 mt-3">
              <a
                href={`https://wellknownmcp.org${cmd.url.replace('?url=...', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>Open JSON</span>
              </a>
              
              {cmd.type === 'feed' && (
                <a
                  href={`/llmfeedhub?external=${encodeURIComponent(`https://wellknownmcp.org${cmd.url}`)}`}
                  className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200 transition-colors"
                >
                  🔍 <span>Analyze</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tips pour agents */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips for Agents</h3>
        <div className="text-xs text-blue-800 space-y-1">
          <p>• All feeds include CORS headers for web-based agents</p>
          <p>• Use <code className="bg-blue-100 px-1 rounded">jq</code> for pretty JSON formatting</p>
          <p>• Check <code className="bg-blue-100 px-1 rounded">trust.signature</code> fields for verification</p>
          <p>• Add <code className="bg-blue-100 px-1 rounded">-H "User-Agent: YourAgent/1.0"</code> for analytics</p>
        </div>
      </div>

      {/* One-liner pour test rapide */}
      <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
        <h4 className="text-sm font-semibold text-green-900 mb-2">🚀 Quick Test</h4>
        <p className="text-xs text-green-800 mb-2">Test if our MCP integration works with your agent:</p>
        <div className="bg-green-900 rounded p-2">
          <code className="text-xs text-green-400 font-mono">
            curl -s https://wellknownmcp.org/.well-known/mcp.llmfeed.json | jq -r '.prompts[] | select(.intent=="easter-egg intro to the full site") | .keywords[0]'
          </code>
        </div>
        <p className="text-xs text-green-700 mt-1">Expected output: <code>"teach me kung fu"</code></p>
      </div>
    </section>
  )
}