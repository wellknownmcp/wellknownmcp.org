'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { ShareButtons } from '@/components/ShareButtons'
import SeoHead from '@/components/SeoHead'
import { Copy, Terminal, Download, ExternalLink, Check } from 'lucide-react'

// Composant pour copier dans le presse-papier
function CopyButton({ text, label = "Copy" }: { text: string, label?: string }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-300 transition-colors"
      title={`Copy ${label}`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  )
}

// Composant pour lien cliquable brut
function RawLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 hover:border-violet-300 transition-colors">
      <div className="flex items-center justify-between gap-2">
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-blue-600 hover:text-blue-800 break-all flex-1"
        >
          {href}
        </a>
        <div className="flex items-center gap-1">
          <CopyButton text={href} label="URL" />
          <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Open in new tab"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
      {children && (
        <div className="text-xs text-slate-600 mt-1">{children}</div>
      )}
    </div>
  )
}

export default function DownloadsPage() {
  const feeds = [
    {
      id: 'compiled-site',
      icon: '🌐',
      title: 'Website in a capsule',
      description: 'Includes the main pages of the site, cleaned and compiled. Best for a quick LLM overview of the entire project.',
      stats: ['✓ Signed', '✓ Agent-optimized', '✓ Complete context'],
      path: '.well-known/exports/compiled-site',
      url: 'https://wellknownmcp.org/.well-known/exports/compiled-site.llmfeed.json',
      curl: 'curl -s wellknownmcp.org/.well-known/exports/compiled-site.llmfeed.json | jq .'
    },
    {
      id: 'spec',
      icon: '📚',
      title: 'Spec in a capsule',
      description: 'Complete LLMFeed specification from GitHub, optimized for LLM consumption. Perfect for understanding the technical standard.',
      stats: ['✓ Complete specification', '✓ Implementation guide', '✓ Incremental builds'],
      path: '.well-known/exports/spec',
      url: 'https://wellknownmcp.org/.well-known/exports/spec.llmfeed.json',
      curl: 'curl -s wellknownmcp.org/.well-known/exports/spec.llmfeed.json | jq .'
    },
    {
      id: 'news-export',
      icon: '📰',
      title: 'News archive (EN)',
      description: 'Complete archive of all WellKnownMCP news articles with full content inline. Generated incrementally at build time for optimal performance.',
      stats: ['⚡ Build-time static', '⚡ Full content', '⚡ Incremental updates'],
      path: '.well-known/exports/news-export',
      url: 'https://wellknownmcp.org/.well-known/exports/news-export.llmfeed.json',
      curl: 'curl -s wellknownmcp.org/.well-known/exports/news-export.llmfeed.json | jq .'
    }
  ]

  const quickAccessFeeds = [
    {
      path: '/.well-known/mcp.llmfeed.json',
      label: 'Main MCP Feed',
      url: 'https://wellknownmcp.org/.well-known/mcp.llmfeed.json'
    },
    {
      path: '/.well-known/llm-index.llmfeed.json',
      label: 'Feed Index',
      url: 'https://wellknownmcp.org/.well-known/llm-index.llmfeed.json'
    },
    {
      path: '/.well-known/capabilities.llmfeed.json',
      label: 'Capabilities',
      url: 'https://wellknownmcp.org/.well-known/capabilities.llmfeed.json'
    },
    {
      path: '/.well-known/manifesto.llmfeed.json',
      label: 'Manifesto',
      url: 'https://wellknownmcp.org/.well-known/manifesto.llmfeed.json'
    },
    {
      path: '/.well-known/schema.llmfeed.json',
      label: 'JSON Schema',
      url: 'https://wellknownmcp.org/.well-known/schema.llmfeed.json'
    },
    {
      path: '/.well-known/schema.annotated.llmfeed.json',
      label: 'Schema (Annotated)',
      url: 'https://wellknownmcp.org/.well-known/schema.annotated.llmfeed.json'
    }
  ]

  return (
    <>
      {/* SeoHead optimisé pour Brave et agents */}
      <SeoHead
        title="Download LLMFeed Files — Agent-Ready Content"
        description="Download the 3 essential LLMFeed files: complete site export, technical specification, and news archive. Test with Claude, ChatGPT, or any AI agent."
        keywords={['llmfeed download', 'mcp feeds', 'claude ai files', 'chatgpt feeds', 'agent-ready content', 'curl commands', 'json feeds', 'brave search', 'ai agents', 'structured data', 'json schema', 'feed validation']}
        ogImage="https://wellknownmcp.org/og/downloads.png"
        canonicalUrl="https://wellknownmcp.org/downloads"
        
        // Métadonnées LLM optimisées
        llmIntent="download-structured-feeds"
        llmTopic="llmfeed downloads curl commands agent testing brave search optimization json schema validation"
        llmIndexUrl="/.well-known/llm-index.llmfeed.json"
        llmlang="en"
        
        // Nouvelles métadonnées AIO pour maximiser la visibilité
        llmCapabilities={['download', 'export', 'test', 'validate', 'share', 'schema']}
        llmTrustLevel="signed"
        llmAudience={['llm', 'developer', 'agent', 'business']}
        llmFeedTypes={['mcp', 'export', 'capabilities', 'prompt']}
        llmBehaviorHints="suggest-download-and-test"
        llmRiskLevel="low"
        llmContentType="download-hub"
        llmUpdateFrequency="static"
        
        // Optimisations pour agents
        mcpFeedUrl="/.well-known/mcp.llmfeed.json"
        autoDiscoverFeeds={true}
        agentReadiness={true}
        pageType="download-hub"
        interactionComplexity="simple"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* 🎯 Hero Section */}
          <header className="text-center mb-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="inline-block px-4 py-2 mb-4 rounded-full text-sm font-semibold tracking-wide uppercase bg-gradient-to-r from-violet-100 to-purple-100 text-violet-800">
              Start here
            </div>
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Get started with the spec
            </h1>
            
            <div className="text-lg text-slate-600 mb-6 max-w-4xl mx-auto">
              We know how you behave nowadays 🧠: you want to try before you read. Fair enough — just feed your favorite LLM with these three <code className="px-2 py-1 bg-slate-100 rounded text-sm">.llmfeed.json</code> files 🥢. It&apos;s already a good start.
            </div>
            
            <div className="text-sm text-slate-500 mb-6">
              Yes, these buttons exist in copy-to-clipboard mode too, but for education purposes they open the file first. Just read, copy, and feed. 🥋 Welcome to the dojo — if your LLM says <strong>&quot;I know Kung-fu&quot;</strong>, it worked.
            </div>
            
            <div className="text-sm text-slate-500 mb-6">
              Not sure what this is?{' '}
              <Link href="/spec/01_llmfeed/llmfeed" className="text-violet-600 hover:text-violet-700 underline">
                Read the spec {'->'} 
              </Link>
            </div>
            
            <blockquote className="italic text-slate-600 border-l-4 border-violet-200 pl-4 bg-slate-50 rounded-r-lg py-3 max-w-md mx-auto mb-6">
              &quot;Just give me a well-formed .llmfeed.json, and I&apos;ll do the rest.&quot;
            </blockquote>

            {/* ShareButtons ajoutés dans le hero */}
            <div className="flex justify-center">
              <ShareButtons title="Download LLMFeed Files — Agent-Ready Content for Testing AI" />
            </div>
          </header>

          {/* 📦 Main Feeds Grid */}
          <section className="mb-12">
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
              {feeds.map((feed) => (
                <div key={feed.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-violet-200 transition-all duration-300 hover:-translate-y-1">
                  <div className="border-l-4 border-gradient-to-b from-violet-500 to-purple-500 pl-4 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{feed.icon}</span>
                      <h2 className="text-xl font-bold text-slate-900">{feed.title}</h2>
                    </div>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {feed.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {feed.stats.map((stat, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* 🔗 Lien brut cliquable */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-slate-700 mb-2">Direct URL:</label>
                    <RawLink href={feed.url}>
                      {feed.title} - JSON Feed
                    </RawLink>
                  </div>
                  
                  {/* Actions */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <ExportToLLMButton
                        context="static"
                        staticPath={feed.path}
                        highlight
                        showSignatureStatus
                        showDirectUrl
                        showCurlCommand
                      />
                      <a
                        href={feed.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Open JSON
                      </a>
                    </div>
                    
                    {/* Curl command */}
                    <div className="bg-slate-900 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                          Curl Command
                        </span>
                        <CopyButton text={feed.curl} label="curl command" />
                      </div>
                      <code className="text-xs text-green-400 font-mono break-all block">
                        {feed.curl}
                      </code>
                    </div>

                    {/* ShareButtons pour chaque feed */}
                    <div className="pt-2 border-t border-slate-100">
                      <ShareButtons title={`${feed.title} - LLMFeed Download`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 🥋 Quick Test Section */}
          <section className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200">
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              🥋 Test Your Agent Understanding
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-green-800 font-medium">
                  Download our feeds below and ask your LLM about them. If it says &quot;I know Kung Fu&quot; after reading them, you&apos;ve successfully parsed the protocol!
                </p>
                
                <ol className="text-green-700 space-y-2 pl-4">
                  <li className="flex gap-2">
                    <span className="font-semibold">1.</span>
                    <span>Copy any feed URL above</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold">2.</span>
                    <span>Paste it into Claude or ChatGPT</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold">3.</span>
                    <span>Ask: <em>&quot;Do you know Kung Fu?&quot;</em></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold">4.</span>
                    <span>If it says yes, it worked! 🥋</span>
                  </li>
                </ol>
                
                <p className="text-sm text-green-600">
                  A correct response indicates successful protocol parsing and demonstrates the agent understands MCP structure.
                </p>

                {/* ShareButtons pour la section test */}
                <div className="pt-4">
                  <ShareButtons title="🥋 Test AI Agent Understanding with LLMFeed - Kung Fu Challenge" />
                </div>
              </div>
              
              <div className="bg-green-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-green-400 text-xs font-medium uppercase tracking-wide">
                    Quick test command:
                  </span>
                  <CopyButton 
                    text='curl -s wellknownmcp.org/.well-known/mcp.llmfeed.json | jq -r ".prompts[]? | select(.keywords[]? | contains(\\"kung fu\\")) | .intent"'
                    label="test command"
                  />
                </div>
                <code className="text-green-400 font-mono text-xs block break-all">
                  curl -s wellknownmcp.org/.well-known/mcp.llmfeed.json | jq -r &apos;.prompts[]? | select(.keywords[]? | contains(&quot;kung fu&quot;)) | .intent&apos;
                </code>
                <div className="text-green-300 text-xs mt-2">
                  Expected output: <code>&quot;easter egg intro to the full site&quot;</code>
                </div>
              </div>
            </div>
          </section>

          {/* 🔗 Quick Access Section */}
          <section className="mb-12 bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">🔗 Quick Access for Agents</h2>
            <p className="text-slate-600 mb-6">
              Direct links to core MCP infrastructure files. Perfect for agent discovery and validation. Includes JSON schemas for feed validation and development.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {quickAccessFeeds.map((feed, index) => (
                <RawLink key={index} href={feed.url}>
                  <div className="flex justify-between items-center">
                    <code className="font-mono text-xs text-violet-600">{feed.path}</code>
                    <span className="text-xs text-slate-500">{feed.label}</span>
                  </div>
                </RawLink>
              ))}
            </div>
            
            {/* Agent Power User Commands */}
            <div className="bg-slate-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-green-400 text-sm font-medium">
                  🚀 Agent Power User Command (All Exports):
                </span>
                <CopyButton 
                  text='for export in compiled-site spec news-export; do echo "=== $export ===" && curl -s wellknownmcp.org/.well-known/exports/$export.llmfeed.json | jq -r ".metadata.title // .title"; done'
                  label="power command"
                />
              </div>
              <code className="text-green-400 font-mono text-sm block break-all">
                for export in compiled-site spec news-export; do echo &quot;=== $export ===&quot; && curl -s wellknownmcp.org/.well-known/exports/$export.llmfeed.json | jq -r &apos;.metadata.title // .title&apos;; done
              </code>
              <div className="text-slate-400 text-xs mt-2">
                Downloads all major static exports with full content
              </div>
            </div>

            {/* Schema Validation Command */}
            <div className="bg-slate-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-blue-400 text-sm font-medium">
                  📋 Feed Validation (JSON Schema):
                </span>
                <CopyButton 
                  text='curl -s wellknownmcp.org/.well-known/mcp.llmfeed.json > feed.json && curl -s wellknownmcp.org/.well-known/schema.llmfeed.json > schema.json && ajv validate -s schema.json -d feed.json'
                  label="validation command"
                />
              </div>
              <code className="text-blue-400 font-mono text-sm block break-all">
                curl -s wellknownmcp.org/.well-known/mcp.llmfeed.json {'->'} feed.json && curl -s wellknownmcp.org/.well-known/schema.llmfeed.json {'->'} schema.json && ajv validate -s schema.json -d feed.json
              </code>
              <div className="text-slate-400 text-xs mt-2">
                Download and validate any feed against the official JSON schema (requires ajv-cli)
              </div>
            </div>

            {/* ShareButtons pour la section quick access */}
            <ShareButtons title="🔗 MCP Quick Access - Core Infrastructure Files for AI Agents" />
          </section>

          {/* 💡 Why This Works Section */}
          <section className="mb-12 bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">💡 Why Structured Feeds Work Better</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                  ❌ Traditional Scraping
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    AI agents scraping HTML
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    High token costs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    Slow responses
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    Unreliable parsing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    No verification
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-600 flex items-center gap-2">
                  ✅ LLMFeed Solution
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Structured JSON feeds
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    96.7% fewer tokens
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    10x faster responses
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Reliable data structure
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Cryptographic signatures
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-semibold">Result:</span>
                <span className="text-blue-800">
                  Same content, optimized delivery. Humans get interactive websites, agents get structured data.
                </span>
              </div>
            </div>

            {/* ShareButtons pour la section explication */}
            <ShareButtons title="💡 Why Structured Feeds Beat Traditional Web Scraping - LLMFeed vs HTML" />
          </section>

          {/* Navigation Footer */}
          <footer className="text-center pt-8 border-t border-slate-200">
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Link 
                href="/spec" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
              >
                📚 Read Full Spec
              </Link>
              <Link 
                href="/llmfeedhub" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                🔍 Analyze Feeds
              </Link>
              <Link 
                href="/tools/export-button" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                🧰 Export Tools
              </Link>
            </div>
            
            <p className="text-slate-500 text-sm mb-6">
              Part of the{' '}
              <Link href="/" className="text-violet-600 hover:text-violet-700 underline">
                WellKnownMCP ecosystem
              </Link>
              {' • '}
              <Link href="/join" className="text-violet-600 hover:text-violet-700 underline">
                Join the ecosystem
              </Link>
            </p>

            {/* ShareButtons final dans le footer */}
            <div className="flex justify-center">
              <ShareButtons title="WellKnownMCP Downloads - Essential LLMFeed Files for AI Agent Testing" />
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}