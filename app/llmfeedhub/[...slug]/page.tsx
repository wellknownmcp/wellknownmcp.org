// app/llmfeedhub/[...slug]/page.tsx
'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import FeedInteractionPanel from '@/components/FeedInteractionPanel'
import LLMFeedHubBase from '@/components/LLMFeedHubBase'
import Link from 'next/link'
import Head from 'next/head'

export default function LLMFeedHubPage() {
  const { slug } = useParams()
  const [feed, setFeed] = useState<any | null>(null)
  const [defaultText, setDefaultText] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const handleFeedLoaded = (loadedFeed: any) => {
    setFeed(loadedFeed)
    setDefaultText(JSON.stringify(loadedFeed, null, 2))
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  useEffect(() => {
    if (!slug) return

    // ✅ NOUVEAU : Convertir le slug array en string
    const slugString = Array.isArray(slug) ? slug.join('/') : slug
    console.log('🔍 Processing slug:', { slug, slugString })

    // ✅ NOUVEAU : Gérer les feeds temporaires depuis sessionStorage
    if (slugString.startsWith('temp-')) {
      const storedFeed = sessionStorage.getItem(`llmfeed-${slugString}`)
      if (storedFeed) {
        try {
          const parsedFeed = JSON.parse(storedFeed)
          handleFeedLoaded(parsedFeed)
          // Nettoyer le storage après utilisation
          sessionStorage.removeItem(`llmfeed-${slugString}`)
          return
        } catch (err) {
          console.error('Failed to parse stored feed:', err)
        }
      }
    }

    setIsLoading(true)
    setError(null)

    // ✅ NOUVEAU : Détecter si c'est une URL complète
    const isExternalUrl =
      slugString.startsWith('http://') ||
      slugString.startsWith('https://') ||
      slugString.startsWith('http%3A//') ||
      slugString.startsWith('https%3A//')

    let fetchUrl: string
    let sourceType: string

    if (isExternalUrl) {
      // URL externe - décoder si nécessaire
      fetchUrl = slugString.startsWith('http')
        ? slugString
        : decodeURIComponent(slugString)
      sourceType = 'external'
      console.log(`🌐 Fetching external URL: ${fetchUrl}`)
    } else {
      // Fichier local - utiliser le slug complet
      fetchUrl = `/exports/${slugString}.llmfeed.json`
      sourceType = 'local'
      console.log(`📁 Fetching local file: ${fetchUrl}`)
    }

    // Validation basique pour les URLs externes
    if (isExternalUrl) {
      try {
        const url = new URL(fetchUrl)
        if (!['http:', 'https:'].includes(url.protocol)) {
          setError('❌ Only HTTP/HTTPS URLs are supported')
          setIsLoading(false)
          return
        }
      } catch (err) {
        setError('❌ Invalid URL format')
        setIsLoading(false)
        return
      }
    }

    fetch(fetchUrl)
      .then((res) => {
        console.log(`📡 Fetch Response: ${res.status} ${res.statusText}`)
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        }
        return res.json()
      })
      .then((json) => {
        console.log(`✅ Successfully loaded ${sourceType} feed`)
        console.log('📄 Feed info:', {
          title: json?.metadata?.title || 'Untitled',
          feedType: json?.feed_type || 'unknown',
          slug: slugString
        })
        handleFeedLoaded(json)
      })
      .catch((err) => {
        const errorMsg =
          sourceType === 'external'
            ? `❌ External feed not accessible: ${err.message}`
            : `❌ Local feed not found: ${fetchUrl}`
        console.error(errorMsg, err)
        setError(errorMsg)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [slug])

  // Générer l'URL JSON appropriée pour le SEO
  const jsonUrl = slug
    ? (() => {
        const slugString = Array.isArray(slug) ? slug.join('/') : slug
        const isExternal =
          slugString.startsWith('http://') ||
          slugString.startsWith('https://') ||
          slugString.startsWith('http%3A//') ||
          slugString.startsWith('https%3A//')

        return isExternal
          ? slugString.startsWith('http')
            ? slugString
            : decodeURIComponent(slugString)
          : `${
              process.env.NEXT_PUBLIC_SITE_URL || 'https://wellknownmcp.org'
            }/exports/${slugString}.llmfeed.json`
      })()
    : ''

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Debug info en développement */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          <details>
            <summary className="font-semibold cursor-pointer">🐛 Debug Info</summary>
            <pre className="mt-2 text-xs">
              {JSON.stringify({
                slug,
                slugString: Array.isArray(slug) ? slug.join('/') : slug,
                isArray: Array.isArray(slug),
                jsonUrl
              }, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {/* SEO alternate link */}
      {slug && (
        <Head>
          <link rel="alternate" type="application/json" href={jsonUrl} />
        </Head>
      )}

      <h1 className="text-3xl font-bold">LLMFeedHub</h1>
      <p className="mb-4 text-muted-foreground">
        Upload, reference, or analyze any `.llmfeed.json` file to explore its
        structure and trust level.
        <br />
        <span className="text-sm text-blue-600">
          💡 Supports both local files and external URLs
        </span>
      </p>

      {/* Status indicator */}
      {isLoading && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-700">🔄 Loading feed...</p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Demo section */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="mb-2 font-semibold">💡 Test examples</p>

        <div className="space-y-2">
          {/* Local demo */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm">📁 Local:</span>
            <a
              href="/exports/demo/kungfu.llmfeed.json"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              kungfu.llmfeed.json
            </a>
            <button
              onClick={() =>
                fetch('/exports/demo/kungfu.llmfeed.json')
                  .then((res) => res.json())
                  .then((data) => handleFeedLoaded(data))
              }
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Load
            </button>
            <Link href="/llmfeedhub/demo/kungfu">
              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                /llmfeedhub/demo/kungfu
              </button>
            </Link>
          </div>

          {/* External demo */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm">🌐 External:</span>
            <a
              href="https://wellknownmcp.org/.well-known/mcp.llmfeed.json"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              wellknownmcp.org MCP feed
            </a>
            <Link
              href={`/llmfeedhub/${encodeURIComponent(
                'https://wellknownmcp.org/.well-known/mcp.llmfeed.json'
              )}`}
            >
              <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                Analyze external
              </button>
            </Link>
          </div>
        </div>
      </div>

      <FeedInteractionPanel
        mode="hub"
        onFeedLoaded={handleFeedLoaded}
        allowUrlInput
        allowTextInput
        debugRawJson={false}
        value={defaultText}
      />

      {feed && (
        <div ref={resultRef}>
          <LLMFeedHubBase feed={feed} />
        </div>
      )}
    </div>
  )
}