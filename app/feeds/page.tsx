'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import SeoHead from '@/components/SeoHead'

interface FeedEntry {
  path: string
  feed_type: string
  signed: boolean
  certified: boolean
  size: string
}

export default function ExportsPage() {
  const [entries, setEntries] = useState<FeedEntry[]>([])
  const [activeType, setActiveType] = useState<string | null>(null)

  useEffect(() => {
    async function loadFeeds() {
      try {
        const res = await fetch('/exports/index.json')
        const data = await res.json()
        setEntries(data)
      } catch (err) {
        console.error('Error loading /exports/index.json:', err)
      }
    }

    loadFeeds()
  }, [])

  const allFeedTypes = Array.from(new Set(entries.map(e => e.feed_type))).sort()

  const filtered = activeType
    ? entries.filter(e => e.feed_type === activeType)
    : entries

  return (
    <>
      <SeoHead
        title="LLMFeed Examples — WellKnownMCP"
        description="Explore example LLMFeed files: MCP feeds, prompt feeds, export feeds, certified and signed feeds. All examples are available for testing and reference."
        canonicalUrl="https://wellknownmcp.org/exports"
        ogImage="/og/llmfeed-examples.png"
        llmIntent="browse-llmfeed-examples"
        llmTopic="llmfeed"
        llmlang="en"
        keywords={[
          'LLMFeed',
          'MCP',
          'prompt feeds',
          'signed feeds',
          'certified feeds',
          'LLM agent feeds',
          'example LLMFeed',
          'trusted feeds',
          'WellKnownMCP',
          'feed interoperability'
        ]}
      />

      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Available LLMFeed examples</h1>

        {/* Filter UI */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveType(null)}
            className={`px-3 py-1 border rounded ${!activeType ? 'bg-blue-100' : ''}`}
          >
            All
          </button>
          {allFeedTypes.map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1 border rounded ${activeType === type ? 'bg-blue-100' : ''}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Feed list */}
        <ul className="space-y-2">
          {filtered.map(feed => {
            const fileName = feed.path.split('/').pop() || ''
            const displayPath = feed.path.replace('.llmfeed.json', '')
            const hubPath = `/llmfeedhub/${displayPath}`
            const staticPath = displayPath

            return (
              <li key={feed.path} className="border p-3 rounded-md flex justify-between items-center">
                <div>
                  <div className="font-mono text-sm text-blue-700">{fileName}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    {feed.size} KB • Type: {feed.feed_type}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {feed.signed && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Signed
                    </span>
                  )}
                  {feed.certified && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Gold Certified
                    </span>
                  )}
                  <Link
                    href={hubPath}
                    className="inline-flex items-center gap-1 no-underline border border-gray-300 bg-white text-black text-sm rounded-md px-3 py-1 hover:bg-gray-100"
                  >
                    🧩 LLMFeedHub
                  </Link>
                  <ExportToLLMButton
                    context="static"
                    staticPath={staticPath}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}
