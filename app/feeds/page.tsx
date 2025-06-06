'use client'

import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { useState } from 'react'
import SeoHead from '@/components/SeoHead'

const excludedFolders = ['spec', 'internal', 'private']

function getAllEntries(folder: string, base = ''): any[] {
  const entries = fs
    .readdirSync(folder)
    .map((name) => {
      const fullPath = path.join(folder, name)
      const relPath = path.join(base, name)
      const stats = fs.statSync(fullPath)

      if (stats.isDirectory() && excludedFolders.includes(name)) {
        return null
      }

      if (stats.isDirectory()) {
        return {
          type: 'folder',
          name,
          path: relPath,
          children: getAllEntries(fullPath, relPath),
        }
      } else if (name.endsWith('.llmfeed.json')) {
        let signed = false,
          certified = false,
          feedType = 'unknown',
          size = (stats.size / 1024).toFixed(1)
        try {
          const content = fs.readFileSync(fullPath, 'utf-8')
          const json = JSON.parse(content)
          signed = !!json.signature
          certified =
            !!json.certification && json.certification.level === 'gold'
          feedType = json.feed_type ?? 'unknown'
        } catch {}
        return {
          type: 'file',
          name,
          path: relPath,
          size,
          signed,
          certified,
          feedType,
        }
      }
    })
    .filter(Boolean)

  return entries.sort((a, b) =>
    a.type === b.type
      ? a.name.localeCompare(b.name)
      : a.type === 'folder'
      ? -1
      : 1
  )
}

export default async function Page() {
  const folderPath = path.resolve('./public/exports')
  const entries = getAllEntries(folderPath)

  const allFeedTypes = Array.from(
    new Set(
      entries.flatMap((e) =>
        e.type === 'file'
          ? [e.feedType]
          : e.children.map((c: any) => c.feedType)
      )
    )
  ).sort()

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
          'feed interoperability',
        ]}
      />

      <FeedExplorer entries={entries} feedTypes={allFeedTypes} />
    </>
  )
}

function FeedExplorer({
  entries,
  feedTypes,
}: {
  entries: any[]
  feedTypes: string[]
}) {
  const [activeType, setActiveType] = useState<string | null>(null)

  const typeMatch = (type: string) => !activeType || activeType === type

  const FeedItem = ({ file }: { file: any }) => {
    const hubPath = `/llmfeedhub/${file.path.replace('.llmfeed.json', '')}`
    const staticPath = file.path.replace('.llmfeed.json', '')

    const feedTypeBadge = (type: string) => {
      if (type.toLowerCase() === 'mcp') {
        return (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            MCP
          </span>
        )
      }
      if (type.toLowerCase() === 'prompt') {
        return (
          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
            Prompt
          </span>
        )
      }
      if (type.toLowerCase() === 'export') {
        return (
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            Export
          </span>
        )
      }
      return (
        <span className="inline-block bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">
          {type}
        </span>
      )
    }

    return (
      <div className="flex justify-between items-center">
        <div>
          <div className="font-mono text-sm text-blue-700">{file.name}</div>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            {file.size} KB • Type: {feedTypeBadge(file.feedType)}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {file.signed && (
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              Signed
            </span>
          )}
          {file.certified && (
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
          <ExportToLLMButton context="static" staticPath={staticPath} />
        </div>
      </div>
    )
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available LLMFeed examples</h1>

      {/* Filter UI */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveType(null)}
          className={`px-3 py-1 border rounded ${
            !activeType ? 'bg-blue-100' : ''
          }`}
        >
          All
        </button>
        {feedTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-3 py-1 border rounded ${
              activeType === type ? 'bg-blue-100' : ''
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Fichiers root */}
      <ul className="space-y-2">
        {entries
          .filter((entry) => entry.type === 'file' && typeMatch(entry.feedType))
          .map((file) => (
            <li key={file.path} className="border p-3 rounded-md">
              <FeedItem file={file} />
            </li>
          ))}
      </ul>

      {/* Dossiers */}
      <ul className="space-y-2 mt-6">
        {entries.map((entry) =>
          entry.type === 'folder' ? (
            <li key={entry.path} className="font-bold text-lg">
              📁 {entry.name}/
              <ul className="ml-4 space-y-1">
                {entry.children
                  .filter((child) => typeMatch(child.feedType))
                  .map((child) => (
                    <li key={child.path} className="border p-3 rounded-md">
                      <FeedItem file={child} />
                    </li>
                  ))}
              </ul>
            </li>
          ) : null
        )}
      </ul>
    </main>
  )
}
