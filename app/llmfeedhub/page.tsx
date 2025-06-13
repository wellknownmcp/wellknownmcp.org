'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FeedInteractionPanel from '@/components/FeedInteractionPanel'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'

export default function LLMFeedHubIndexPage() {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFeedLoaded = (loadedFeed: any) => {
    setLoading(true)
    
    // Stocker temporairement dans sessionStorage
    const timestamp = Date.now()
    const slug = `temp-${timestamp}`

    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`llmfeed-${slug}`, JSON.stringify(loadedFeed))
      router.push(`/llmfeedhub/${slug}`)
    }
  }

  const handleSlugSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    setLoading(true)

    // ✅ Détecter le type d'input
    const input = inputValue.trim()
    const isExternalUrl = input.startsWith('http://') || input.startsWith('https://')

    if (isExternalUrl) {
      // ✅ URLs externes via query parameter (plus robuste)
      const searchParams = new URLSearchParams()
      searchParams.set('external', input)
      router.push(`/llmfeedhub?${searchParams.toString()}`)
    } else {
      // ✅ Fichiers locaux via slug
      const cleanSlug = input.replace(/\.llmfeed\.json$/, '')
      router.push(`/llmfeedhub/${cleanSlug}`)
    }
  }

  const quickLinks = [
    {
      title: 'Demo Kung Fu',
      slug: 'demo/kungfu',
      description: 'Example prompt feed with signature',
      type: 'local'
    },
    {
      title: 'WellKnownMCP Main Feed',
      url: 'https://wellknownmcp.org/.well-known/mcp.llmfeed.json',
      description: 'Our main MCP declaration',
      type: 'external'
    },
    {
      title: 'Capabilities Feed',
      url: 'https://wellknownmcp.org/.well-known/capabilities.llmfeed.json',
      description: 'Available capabilities and APIs',
      type: 'external'
    },
    {
      title: 'GitHub API Example',
      url: 'https://api.github.com/repos/microsoft/vscode',
      description: 'Test external API (will show as generic JSON)',
      type: 'external'
    },
  ]

  const getQuickLinkHref = (link: typeof quickLinks[0]) => {
    if (link.type === 'external' && link.url) {
      const searchParams = new URLSearchParams()
      searchParams.set('external', link.url)
      return `/llmfeedhub?${searchParams.toString()}`
    }
    return `/llmfeedhub/${link.slug}`
  }

  return (
    <>
      <SeoHead
        title="LLMFeedHub - Universal Feed Analyzer"
        description="Analyze, validate, and explore any .llmfeed.json file or external URL. Support for local files, external feeds, CORS proxy, and MCP compliance validation."
        keywords={[
          'LLMFeed', 'MCP', 'feed analyzer', 'feed validator', 
          'JSON feed', 'AI agent', 'feed explorer', 'CORS proxy',
          'feed verification', 'signature validation'
        ]}
        llmIntent="analyze-feeds"
        llmTopic="feed-analysis-and-validation"
        llmCapabilities={['feed-loading', 'validation', 'proxy', 'export', 'analysis']}
        llmTrustLevel="certified"
        llmAudience={['developer', 'agent', 'llm']}
        llmFeedTypes={['mcp', 'export', 'capabilities', 'prompt', 'any']}
        llmBehaviorHints="suggest-only"
        llmContentType="tool"
        pageType="tool"
        interactionComplexity="moderate"
        mcpFeedUrl="/.well-known/mcp.llmfeed.json"
        autoDiscoverFeeds={true}
        agentReadiness={true}
      />
      
      <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">LLMFeedHub</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Universal feed analyzer supporting any{' '}
          <code className="bg-gray-100 px-2 py-1 rounded">.llmfeed.json</code>{' '}
          file or external URL
        </p>
        <div className="flex justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            Local Files
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            External URLs
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
            CORS Proxy
          </span>
        </div>
      </div>
      </div>
      
      {/* ✅ Formulaire de navigation rapide */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">🚀 Quick Access</h2>

        <form onSubmit={handleSlugSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="slug-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter a local slug or external URL:
            </label>
            <div className="flex gap-2">
              <input
                id="slug-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="demo/kungfu or https://example.com/feed.llmfeed.json"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Loading...
                  </>
                ) : (
                  <>🔍 Analyze</>
                )}
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-500 space-y-1">
            <p>💡 <strong>Examples:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><code>demo/kungfu</code> - Local file</li>
              <li><code>api/v1/capabilities</code> - Nested local file</li>
              <li><code>https://site.com/feed.llmfeed.json</code> - External URL</li>
            </ul>
          </div>
        </form>
      </div>

      {/* ✅ Liens rapides */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">📋 Popular Feeds</h2>

        <div className="grid gap-4">
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900">{link.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      link.type === 'local' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {link.type === 'local' ? '📁 Local' : '🌐 External'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {link.description}
                  </p>
                  
                  {/* Afficher l'URL/slug */}
                  <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
                    {link.type === 'external' ? link.url : `exports/${link.slug}.llmfeed.json`}
                  </div>
                </div>
                
                <div className="ml-4 flex flex-col gap-2">
                  <Link
                    href={getQuickLinkHref(link)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 whitespace-nowrap text-center"
                  >
                    🔍 Analyze
                  </Link>
                  
                  {/* Lien direct vers la source */}
                  {link.type === 'external' && link.url && (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 whitespace-nowrap text-center"
                    >
                      🔗 Direct
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Interface d'upload */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">📤 Upload or Paste Feed</h2>

        <FeedInteractionPanel
          mode="hub"
          onFeedLoaded={handleFeedLoaded}
          allowUrlInput
          allowTextInput
          debugRawJson={false}
        />

        <div className="mt-4 text-sm text-gray-500">
          💡 Upload a file, paste JSON content, or enter a URL to analyze any LLMFeed
        </div>
      </div>

      {/* ✅ Fonctionnalités */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">
          ⚡ LLMFeedHub Features
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-blue-800 text-sm">
          <div className="space-y-2">
            <p>• <strong>Universal Loading:</strong> Local files + External URLs</p>
            <p>• <strong>CORS Proxy:</strong> Access any public URL securely</p>
            <p>• <strong>Smart Validation:</strong> Feed structure compliance</p>
          </div>
          <div className="space-y-2">
            <p>• <strong>Trust Analysis:</strong> Signature verification</p>
            <p>• <strong>Metadata Explorer:</strong> Complete feed breakdown</p>
            <p>• <strong>Developer Tools:</strong> JSON export & debugging</p>
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <Link
            href="/spec"
            className="text-blue-700 underline hover:text-blue-900 text-sm"
          >
            📚 Read MCP Specification
          </Link>
          <Link
            href="/tools"
            className="text-blue-700 underline hover:text-blue-900 text-sm"
          >
            🛠️ Developer Tools
          </Link>
        </div>
      </div>
    </>
  )
}