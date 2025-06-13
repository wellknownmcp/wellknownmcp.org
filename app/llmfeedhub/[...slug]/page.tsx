'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import FeedInteractionPanel from '@/components/FeedInteractionPanel'
import LLMFeedHubBase from '@/components/LLMFeedHubBase'
import SeoHead from '@/components/SeoHead'
import Link from 'next/link'
import Head from 'next/head'

interface LoadingState {
  isLoading: boolean
  stage: string
  progress?: number
}

interface ErrorState {
  message: string
  type: string
  details?: any
  canRetry: boolean
}

export default function LLMFeedHubPage() {
  const { slug } = useParams()
  const searchParams = useSearchParams()
  const [feed, setFeed] = useState<any | null>(null)
  const [defaultText, setDefaultText] = useState<string | undefined>(undefined)
  const [error, setError] = useState<ErrorState | null>(null)
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false, stage: '' })
  const resultRef = useRef<HTMLDivElement>(null)

  const handleFeedLoaded = (loadedFeed: any) => {
    setFeed(loadedFeed)
    setDefaultText(JSON.stringify(loadedFeed, null, 2))
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const updateLoading = (stage: string, progress?: number) => {
    setLoading({ isLoading: true, stage, progress })
  }

  const setErrorState = (message: string, type: string, details?: any, canRetry: boolean = true) => {
    setError({ message, type, details, canRetry })
    setLoading({ isLoading: false, stage: '' })
  }

  const clearError = () => {
    setError(null)
  }

  const retryLoad = () => {
    clearError()
    // Re-trigger useEffect by forcing a re-render
    window.location.reload()
  }

  useEffect(() => {
    const externalUrl = searchParams?.get('external')
    const slugString = Array.isArray(slug) ? slug.join('/') : slug || ''
    
    console.log('🔍 [CLIENT] Processing request:', { 
      externalUrl, 
      slug, 
      slugString,
      hasSearchParams: !!searchParams?.toString()
    })

    // ✅ Priorité 1: URL externe via query parameter
    if (externalUrl) {
      console.log('🌐 [CLIENT] Loading external URL:', externalUrl)
      loadExternalFeed(externalUrl)
      return
    }

    // ✅ Priorité 2: Feed temporaire depuis sessionStorage
    if (slugString.startsWith('temp-')) {
      console.log('💾 [CLIENT] Loading temporary feed:', slugString)
      loadTemporaryFeed(slugString)
      return
    }

    // ✅ Priorité 3: URL externe encodée dans le slug (fallback)
    if (isEncodedExternalUrl(slugString)) {
      console.log('🔗 [CLIENT] Detected encoded external URL in slug')
      const decodedUrl = decodeURIComponent(slugString)
      loadExternalFeed(decodedUrl)
      return
    }

    // ✅ Priorité 4: Fichier local
    if (slugString) {
      console.log('📁 [CLIENT] Loading local file:', slugString)
      loadLocalFeed(slugString)
      return
    }

    // Aucun paramètre - ne rien faire
    console.log('ℹ️ [CLIENT] No parameters provided')

  }, [slug, searchParams])

  const isEncodedExternalUrl = (str: string): boolean => {
    return str.startsWith('http://') || 
           str.startsWith('https://') ||
           str.startsWith('http%3A//') || 
           str.startsWith('https%3A//')
  }

  const loadExternalFeed = async (url: string) => {
    try {
      updateLoading('Validating external URL...')
      
      // Validation côté client
      try {
        const urlObj = new URL(url)
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
          throw new Error('Only HTTP and HTTPS URLs are supported')
        }
      } catch (urlError) {
        setErrorState('Invalid URL format', 'validation', { url, error: urlError.message }, false)
        return
      }

      updateLoading('Connecting to external server...', 25)
      
      // ✅ Utiliser l'API proxy
      const proxyUrl = `/api/external-feed?${new URLSearchParams({ url })}`
      const response = await fetch(proxyUrl)
      
      updateLoading('Processing response...', 75)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        setErrorState(
          errorData.error || `HTTP ${response.status}`,
          'external_fetch',
          { status: response.status, url, details: errorData },
          true
        )
        return
      }

      const feedData = await response.json()
      
      updateLoading('Feed loaded successfully!', 100)
      console.log('✅ [CLIENT] External feed loaded:', {
        title: feedData?.metadata?.title || 'Untitled',
        type: feedData?.feed_type || 'unknown',
        url
      })
      
      setTimeout(() => {
        setLoading({ isLoading: false, stage: '' })
        handleFeedLoaded(feedData)
      }, 500) // Petite pause pour montrer le succès

    } catch (fetchError: any) {
      console.error('❌ [CLIENT] External fetch error:', fetchError)
      setErrorState(
        'Network error while loading external feed',
        'network',
        { url, error: fetchError.message },
        true
      )
    }
  }

  const loadTemporaryFeed = (slugString: string) => {
    try {
      updateLoading('Loading temporary feed from storage...')
      
      const storedFeed = sessionStorage.getItem(`llmfeed-${slugString}`)
      if (!storedFeed) {
        setErrorState('Temporary feed expired or not found', 'storage', { slug: slugString }, false)
        return
      }

      const parsedFeed = JSON.parse(storedFeed)
      console.log('✅ [CLIENT] Temporary feed loaded:', parsedFeed?.metadata?.title || 'Untitled')
      
      handleFeedLoaded(parsedFeed)
      
      // Nettoyer le storage
      sessionStorage.removeItem(`llmfeed-${slugString}`)
      setLoading({ isLoading: false, stage: '' })
      
    } catch (storageError: any) {
      console.error('❌ [CLIENT] Storage error:', storageError)
      setErrorState('Failed to parse temporary feed', 'storage', { error: storageError.message }, false)
    }
  }

  const loadLocalFeed = async (slugString: string) => {
    try {
      updateLoading('Loading local feed...', 25)
      
      const fetchUrl = `/exports/${slugString}.llmfeed.json`
      console.log('📁 [CLIENT] Fetching local file:', fetchUrl)
      
      const response = await fetch(fetchUrl)
      
      updateLoading('Processing local feed...', 75)
      
      if (!response.ok) {
        setErrorState(
          response.status === 404 
            ? `Local feed not found: ${slugString}.llmfeed.json`
            : `Failed to load local feed (HTTP ${response.status})`,
          'local_fetch',
          { 
            status: response.status, 
            slug: slugString,
            expectedPath: `public/exports/${slugString}.llmfeed.json`
          },
          false
        )
        return
      }

      const feedData = await response.json()
      
      console.log('✅ [CLIENT] Local feed loaded:', {
        title: feedData?.metadata?.title || 'Untitled',
        type: feedData?.feed_type || 'unknown',
        path: fetchUrl
      })
      
      updateLoading('Local feed loaded successfully!', 100)
      
      setTimeout(() => {
        setLoading({ isLoading: false, stage: '' })
        handleFeedLoaded(feedData)
      }, 300)

    } catch (fetchError: any) {
      console.error('❌ [CLIENT] Local fetch error:', fetchError)
      setErrorState(
        'Failed to load local feed',
        'local_fetch',
        { slug: slugString, error: fetchError.message },
        true
      )
    }
  }

  // Générer l'URL JSON pour le SEO
  const generateSeoProps = () => {
    const externalUrl = searchParams?.get('external')
    const slugString = Array.isArray(slug) ? slug.join('/') : slug || ''
    
    // Données de base selon la source
    let baseTitle = 'LLMFeedHub'
    let baseDescription = 'Loading and analyzing feed...'
    let sourceInfo = ''
    
    if (feed) {
      // SEO enrichi avec les données du feed
      baseTitle = `${feed.metadata?.title || 'Untitled Feed'} - LLMFeedHub`
      baseDescription = feed.metadata?.description || 
                        feed.summary || 
                        `Analyzing ${feed.feed_type || 'unknown'} feed with ${Object.keys(feed).length} properties`
      
      const capabilities = []
      if (feed.capabilities) capabilities.push(...Object.keys(feed.capabilities))
      if (feed.data?.files) capabilities.push('file-export')
      if (feed.prompts) capabilities.push('prompts')
      if (feed.trust?.signature) capabilities.push('signed')
      
      return {
        title: baseTitle,
        description: baseDescription,
        keywords: [
          'LLMFeed', feed.feed_type, 
          ...(feed.tags || []),
          ...(capabilities.slice(0, 5)), // Limiter les capabilities
          'feed-analysis'
        ],
        llmIntent: 'analyze-specific-feed',
        llmTopic: feed.feed_type || 'feed-analysis',
        llmCapabilities: capabilities.length > 0 ? capabilities : ['analysis'],
        llmTrustLevel: feed.trust?.signature ? 'signed' : 
                       feed.trust?.certified ? 'certified' : 'basic',
        llmAudience: feed.metadata?.audience || ['developer', 'agent'],
        llmFeedTypes: [feed.feed_type || 'unknown'],
        llmBehaviorHints: feed.feed_type === 'prompt' ? 'suggest-only' : 'full-autonomous',
        llmContentType: feed.feed_type === 'export' ? 'documentation' : 'api',
        canonicalUrl: externalUrl || undefined, // URL canonique = source externe si applicable
      }
    }
    
    // Pendant le chargement ou en cas d'erreur
    if (externalUrl) {
      sourceInfo = `external URL: ${externalUrl}`
      baseDescription = `Analyzing external feed from ${new URL(externalUrl).hostname}`
    } else if (slugString) {
      sourceInfo = `local file: ${slugString}`
      baseDescription = `Analyzing local feed: ${slugString}.llmfeed.json`
    }
    
    return {
      title: loading.isLoading ? `Loading ${sourceInfo} - LLMFeedHub` : baseTitle,
      description: baseDescription,
      keywords: ['LLMFeed', 'feed-analysis', 'loading'],
      llmIntent: 'analyze-specific-feed',
      llmTopic: 'feed-loading',
      llmCapabilities: ['feed-loading', 'analysis'],
      llmTrustLevel: 'basic',
      llmAudience: ['developer', 'agent', 'llm'],
      llmFeedTypes: ['unknown'],
      llmBehaviorHints: 'suggest-only',
      llmContentType: 'tool',
    }
  }

  const generateJsonUrl = () => {
    const externalUrl = searchParams?.get('external')
    if (externalUrl) {
      return externalUrl
    }
    
    const slugString = Array.isArray(slug) ? slug.join('/') : slug || ''
    if (isEncodedExternalUrl(slugString)) {
      return slugString.startsWith('http') ? slugString : decodeURIComponent(slugString)
    }
    
    if (slugString) {
      return `${process.env.NEXT_PUBLIC_SITE_URL || 'https://wellknownmcp.org'}/exports/${slugString}.llmfeed.json`
    }
    
    return ''
  }

  const jsonUrl = generateJsonUrl()
  const currentSource = searchParams?.get('external') || 
                       (Array.isArray(slug) ? slug.join('/') : slug) || 
                       'none'
  const seoProps = generateSeoProps()

  return (
    <>
      <SeoHead
        {...seoProps}
        pageType="tool"
        interactionComplexity={feed ? "moderate" : "simple"}
        mcpFeedUrl="/.well-known/mcp.llmfeed.json"
        autoDiscoverFeeds={true}
        agentReadiness={true}
      />
      
      <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* JSON LD enrichi pour le feed spécifique */}
      {feed && jsonUrl && (
        <Head>
          <link rel="alternate" type="application/json" href={jsonUrl} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Dataset',
                name: feed.metadata?.title || 'LLMFeed Dataset',
                description: feed.metadata?.description || feed.summary,
                url: jsonUrl,
                creator: {
                  '@type': 'Organization',
                  name: feed.metadata?.origin || 'Unknown'
                },
                dateModified: feed.metadata?.last_updated || new Date().toISOString(),
                keywords: feed.tags?.join(', ') || '',
                'mcp:feedType': feed.feed_type,
                'mcp:trustLevel': feed.trust?.signature ? 'signed' : 'basic',
                'mcp:capabilities': feed.capabilities ? Object.keys(feed.capabilities) : []
              })
            }}
          />
        </Head>
      )}

      {/* Debug en développement */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded text-sm">
          <details>
            <summary className="font-semibold cursor-pointer text-slate-700">🐛 Debug Info</summary>
            <pre className="mt-2 text-xs text-slate-600 overflow-auto">
              {JSON.stringify({
                slug,
                searchParams: searchParams?.toString(),
                external: searchParams?.get('external'),
                currentSource,
                jsonUrl,
                loading: loading.isLoading ? loading.stage : 'idle'
              }, null, 2)}
            </pre>
          </details>
        </div>
      )}

      <h1 className="text-3xl font-bold">LLMFeedHub</h1>
      <p className="text-muted-foreground">
        Universal feed loader supporting local files and external URLs with CORS proxy.
        <br />
        <span className="text-sm text-blue-600">
          💡 Now supports any external URL through our secure proxy
        </span>
      </p>

      {/* État de chargement */}
      {loading.isLoading && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <div className="flex-1">
              <p className="text-blue-700 font-medium">{loading.stage}</p>
              {loading.progress && (
                <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${loading.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* État d'erreur */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-red-600 text-xl">❌</span>
            <div className="flex-1">
              <h3 className="text-red-800 font-semibold mb-1">{error.message}</h3>
              <p className="text-red-700 text-sm mb-2">Error type: {error.type}</p>
              
              {error.details && (
                <details className="mb-3">
                  <summary className="text-red-600 text-sm cursor-pointer hover:text-red-800">
                    Technical details
                  </summary>
                  <pre className="mt-2 text-xs text-red-600 bg-red-100 p-2 rounded overflow-auto">
                    {JSON.stringify(error.details, null, 2)}
                  </pre>
                </details>
              )}
              
              <div className="flex gap-2">
                {error.canRetry && (
                  <button
                    onClick={retryLoad}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    🔄 Retry
                  </button>
                )}
                <button
                  onClick={clearError}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                >
                  ✕ Dismiss
                </button>
                <Link 
                  href="/llmfeedhub"
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                >
                  🏠 Back to Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Source info */}
      {currentSource !== 'none' && !loading.isLoading && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
          <p className="text-green-700 text-sm">
            <strong>📍 Source:</strong> 
            <code className="ml-2 text-green-800">{currentSource}</code>
            {jsonUrl && jsonUrl !== currentSource && (
              <>
                <br />
                <strong>🔗 Direct URL:</strong> 
                <a 
                  href={jsonUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-green-600 underline hover:text-green-800"
                >
                  {jsonUrl}
                </a>
              </>
            )}
          </p>
        </div>
      )}

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
    </>
  )
}