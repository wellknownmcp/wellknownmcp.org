'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FeedInteractionPanel from '@/components/FeedInteractionPanel'
import Link from 'next/link'

export default function LLMFeedHubIndexPage() {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')

  const handleFeedLoaded = (loadedFeed: any) => {
    // Quand un feed est chargé, on redirige vers une page avec slug
    const timestamp = Date.now()
    const slug = `temp-${timestamp}`

    // Stocker temporairement le feed dans sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`llmfeed-${slug}`, JSON.stringify(loadedFeed))
      router.push(`/llmfeedhub/${slug}`)
    }
  }

  const handleSlugSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Détecter si c'est une URL externe
    const isExternalUrl =
      inputValue.startsWith('http://') || inputValue.startsWith('https://')

    if (isExternalUrl) {
      // Encoder l'URL pour la passer en slug
      const encodedUrl = encodeURIComponent(inputValue.trim())
      router.push(`/llmfeedhub/${encodedUrl}`)
    } else {
      // Slug local
      const cleanSlug = inputValue.trim().replace(/\.llmfeed\.json$/, '')
      router.push(`/llmfeedhub/${cleanSlug}`)
    }
  }

  const quickLinks = [
    {
      title: 'Demo Kung Fu',
      slug: 'demo/kungfu',
      description: 'Example prompt feed with signature',
    },
    {
      title: 'WellKnownMCP Main Feed',
      url: 'https://wellknownmcp.org/.well-known/mcp.llmfeed.json',
      description: 'Our main MCP declaration',
    },
    {
      title: 'Capabilities Feed',
      url: 'https://wellknownmcp.org/.well-known/capabilities.llmfeed.json',
      description: 'Available capabilities and APIs',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">LLMFeedHub</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Analyze, validate, and explore any{' '}
          <code className="bg-gray-100 px-2 py-1 rounded">.llmfeed.json</code>{' '}
          file
        </p>
      </div>

      {/* Quick navigation form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">🚀 Quick Access</h2>

        <form onSubmit={handleSlugSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="slug-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter a slug or external URL:
            </label>
            <div className="flex gap-2">
              <input
                id="slug-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="demo/kungfu or https://example.com/feed.llmfeed.json"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Analyze
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            💡 Examples: <code>demo/kungfu</code>, <code>mcp</code>, or{' '}
            <code>https://site.com/feed.llmfeed.json</code>
          </div>
        </form>
      </div>

      {/* Quick links */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">📋 Popular Feeds</h2>

        <div className="grid gap-4 md:grid-cols-1">
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{link.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {link.description}
                  </p>
                  {link.url && (
                    <p className="text-xs text-blue-600 mt-2 break-all">
                      {link.url}
                    </p>
                  )}
                </div>
                <Link
                  href={
                    link.url
                      ? `/llmfeedhub/${encodeURIComponent(link.url)}`
                      : `/llmfeedhub/${link.slug}`
                  }
                  className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 whitespace-nowrap"
                >
                  Analyze
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload interface */}
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
          💡 Upload a file, paste JSON content, or enter a URL to analyze any
          LLMFeed
        </div>
      </div>

      {/* Information section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">
          ℹ️ About LLMFeedHub
        </h2>
        <div className="text-blue-800 space-y-2 text-sm">
          <p>
            • <strong>Validate</strong> feed structure and compliance with MCP
            standards
          </p>
          <p>
            • <strong>Verify</strong> cryptographic signatures and trust levels
          </p>
          <p>
            • <strong>Explore</strong> capabilities, prompts, and metadata
          </p>
          <p>
            • <strong>Test</strong> both local and external feeds with CORS
            support
          </p>
        </div>

        <div className="mt-4">
          <Link
            href="/spec"
            className="text-blue-700 underline hover:text-blue-900"
          >
            📚 Read the full MCP specification
          </Link>
        </div>
      </div>
    </div>
  )
}
