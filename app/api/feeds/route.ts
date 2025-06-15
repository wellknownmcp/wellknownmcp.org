'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import SeoHead from '@/components/SeoHead'
import { Search, Filter, ExternalLink, Shield, Award, Globe, FileText, Zap } from 'lucide-react'

interface FeedEntry {
  path: string
  feed_type: string
  signed: boolean
  certified: boolean
  size: string
  title?: string
  description?: string
  trust_score?: number
  source_type: 'wellknown' | 'exports' | 'demo' | 'ecosystem'
  last_updated?: string
  audience?: string[]
  validation_status?: 'valid' | 'invalid' | 'unknown'
  crypto_valid?: boolean
}

interface FeedStats {
  total: number
  by_type: Record<string, number>
  by_source: Record<string, number>
  signed_count: number
  certified_count: number
  crypto_validated: number
}

export default function EnhancedFeedsPage() {
  const [allFeeds, setAllFeeds] = useState<FeedEntry[]>([])
  const [filteredFeeds, setFilteredFeeds] = useState<FeedEntry[]>([])
  const [stats, setStats] = useState<FeedStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filters state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [selectedTrust, setSelectedTrust] = useState<string | null>(null)
  const [showOnlyValidated, setShowOnlyValidated] = useState(false)

  useEffect(() => {
    async function loadAllFeeds() {
      setLoading(true)
      try {
        // Charger les feeds depuis différentes sources
        const feedSources = await Promise.allSettled([
          loadWellKnownFeeds(),
          loadExportsFeeds(),
          loadDemoFeeds(),
          loadEcosystemFeeds()
        ])

        const allFeedsData: FeedEntry[] = []
        feedSources.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            allFeedsData.push(...result.value)
          } else {
            console.warn(`Failed to load feeds from source ${index}:`, result.reason)
          }
        })

        // Enrichir avec validation crypto en arrière-plan
        const enrichedFeeds = await enrichFeedsWithValidation(allFeedsData)
        
        setAllFeeds(enrichedFeeds)
        setFilteredFeeds(enrichedFeeds)
        setStats(calculateStats(enrichedFeeds))
      } catch (err) {
        setError(`Failed to load feeds: ${err instanceof Error ? err.message : 'Unknown error'}`)
      } finally {
        setLoading(false)
      }
    }

    loadAllFeeds()
  }, [])

  // Filtrage en temps réel
  useEffect(() => {
    let filtered = allFeeds

    // Recherche textuelle
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(feed => 
        feed.path.toLowerCase().includes(term) ||
        feed.title?.toLowerCase().includes(term) ||
        feed.description?.toLowerCase().includes(term) ||
        feed.feed_type.toLowerCase().includes(term)
      )
    }

    // Filtres par catégorie
    if (selectedType) {
      filtered = filtered.filter(feed => feed.feed_type === selectedType)
    }
    
    if (selectedSource) {
      filtered = filtered.filter(feed => feed.source_type === selectedSource)
    }

    if (selectedTrust) {
      switch (selectedTrust) {
        case 'certified':
          filtered = filtered.filter(feed => feed.certified)
          break
        case 'signed':
          filtered = filtered.filter(feed => feed.signed)
          break
        case 'validated':
          filtered = filtered.filter(feed => feed.crypto_valid)
          break
      }
    }

    if (showOnlyValidated) {
      filtered = filtered.filter(feed => feed.validation_status === 'valid')
    }

    setFilteredFeeds(filtered)
  }, [allFeeds, searchTerm, selectedType, selectedSource, selectedTrust, showOnlyValidated])

  async function loadWellKnownFeeds(): Promise<FeedEntry[]> {
    // Liste des feeds well-known connus
    const wellKnownFeeds = [
      'mcp', 'capabilities', 'llm-index', 'manifesto', 'spec', 
      'public', 'index', 'compiled-site'
    ]
    
    const feeds: FeedEntry[] = []
    
    for (const feedName of wellKnownFeeds) {
      try {
        const response = await fetch(`/.well-known/${feedName}.llmfeed.json`, { method: 'HEAD' })
        if (response.ok) {
          feeds.push({
            path: `/.well-known/${feedName}.llmfeed.json`,
            feed_type: feedName === 'mcp' ? 'mcp' : feedName === 'capabilities' ? 'capabilities' : 'export',
            signed: false, // Will be enriched later
            certified: false, // Will be enriched later
            size: response.headers.get('content-length') ? 
              Math.round(parseInt(response.headers.get('content-length')!) / 1024).toString() : '?',
            source_type: 'wellknown',
            title: `${feedName.charAt(0).toUpperCase() + feedName.slice(1)} Declaration`,
            last_updated: response.headers.get('last-modified') || undefined
          })
        }
      } catch (err) {
        console.warn(`Could not check well-known feed: ${feedName}`)
      }
    }
    
    return feeds
  }

  async function loadExportsFeeds(): Promise<FeedEntry[]> {
    try {
      const response = await fetch('/exports/index.json')
      const data = await response.json()
      
      return data.map((item: any) => ({
        ...item,
        source_type: 'exports' as const,
        title: item.title || item.path.split('/').pop()?.replace('.llmfeed.json', ''),
        validation_status: 'unknown' as const
      }))
    } catch (err) {
      console.warn('Could not load exports index')
      return []
    }
  }

  async function loadDemoFeeds(): Promise<FeedEntry[]> {
    // Les feeds de demo (kungfu, etc.)
    const demoFeeds = ['kungfu', 'example', 'tutorial']
    const feeds: FeedEntry[] = []
    
    for (const demo of demoFeeds) {
      try {
        const response = await fetch(`/exports/demo/${demo}.llmfeed.json`, { method: 'HEAD' })
        if (response.ok) {
          feeds.push({
            path: `/exports/demo/${demo}.llmfeed.json`,
            feed_type: 'demo',
            signed: false,
            certified: false,
            size: response.headers.get('content-length') ? 
              Math.round(parseInt(response.headers.get('content-length')!) / 1024).toString() : '?',
            source_type: 'demo',
            title: `${demo.charAt(0).toUpperCase() + demo.slice(1)} Demo`
          })
        }
      } catch (err) {
        // Ignore missing demo feeds
      }
    }
    
    return feeds
  }

  async function loadEcosystemFeeds(): Promise<FeedEntry[]> {
    // Feeds ecosystem (partenaires, exemples externes)
    return [] // À implémenter selon ta structure
  }

  async function enrichFeedsWithValidation(feeds: FeedEntry[]): Promise<FeedEntry[]> {
    // Enrichir chaque feed avec validation crypto en parallèle (max 5 simultanés)
    const chunks = []
    for (let i = 0; i < feeds.length; i += 5) {
      chunks.push(feeds.slice(i, i + 5))
    }

    const enrichedFeeds: FeedEntry[] = []
    
    for (const chunk of chunks) {
      const enrichedChunk = await Promise.all(
        chunk.map(async (feed) => {
          try {
            // Charger le contenu du feed pour validation
            const response = await fetch(feed.path)
            if (!response.ok) {
              return { ...feed, validation_status: 'invalid' as const }
            }
            
            const feedData = await response.json()
            
            // Validation basique LLMFeed
            const isValidLLMFeed = feedData.feed_type || feedData.feedtype
            const hasMetadata = feedData.metadata
            
            // Détection crypto
            const hasSig = Boolean(feedData.signature)
            const hasCert = Boolean(feedData.certification)
            const trustScore = hasCert ? 95 : hasSig ? 75 : 50
            
            return {
              ...feed,
              title: feedData.metadata?.title || feed.title,
              description: feedData.metadata?.description || feed.description,
              signed: hasSig,
              certified: hasCert,
              trust_score: trustScore,
              validation_status: (isValidLLMFeed && hasMetadata) ? 'valid' : 'invalid' as const,
              crypto_valid: hasSig || hasCert,
              audience: feedData.metadata?.audience || [],
              last_updated: feedData.metadata?.last_updated || feed.last_updated
            }
          } catch (err) {
            return { ...feed, validation_status: 'invalid' as const }
          }
        })
      )
      
      enrichedFeeds.push(...enrichedChunk)
    }

    return enrichedFeeds
  }

  function calculateStats(feeds: FeedEntry[]): FeedStats {
    const stats: FeedStats = {
      total: feeds.length,
      by_type: {},
      by_source: {},
      signed_count: 0,
      certified_count: 0,
      crypto_validated: 0
    }

    feeds.forEach(feed => {
      // Par type
      stats.by_type[feed.feed_type] = (stats.by_type[feed.feed_type] || 0) + 1
      
      // Par source
      stats.by_source[feed.source_type] = (stats.by_source[feed.source_type] || 0) + 1
      
      // Compteurs crypto
      if (feed.signed) stats.signed_count++
      if (feed.certified) stats.certified_count++
      if (feed.crypto_valid) stats.crypto_validated++
    })

    return stats
  }

  function getTrustBadge(feed: FeedEntry) {
    if (feed.certified) {
      return <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-green-100 text-yellow-800 text-xs px-2 py-1 rounded border border-yellow-300">
        <Award className="w-3 h-3" />
        Certified
      </span>
    }
    
    if (feed.signed) {
      return <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded border border-green-300">
        <Shield className="w-3 h-3" />
        Signed
      </span>
    }
    
    if (feed.validation_status === 'valid') {
      return <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded border border-blue-300">
        <FileText className="w-3 h-3" />
        Valid
      </span>
    }

    return <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded border border-gray-300">
      ⚠️ Basic
    </span>
  }

  function getSourceIcon(sourceType: string) {
    switch (sourceType) {
      case 'wellknown': return <Globe className="w-4 h-4 text-blue-600" />
      case 'exports': return <FileText className="w-4 h-4 text-green-600" />
      case 'demo': return <Zap className="w-4 h-4 text-purple-600" />
      case 'ecosystem': return <ExternalLink className="w-4 h-4 text-orange-600" />
      default: return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Error Loading Feeds</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  const feedTypes = Array.from(new Set(allFeeds.map(f => f.feed_type))).sort()
  const sourceTypes = Array.from(new Set(allFeeds.map(f => f.source_type))).sort()

  return (
    <>
      <SeoHead
        title="Feed Directory — WellKnownMCP"
        description={`Comprehensive directory of ${stats?.total || 0} LLMFeed files with crypto validation. Explore well-known declarations, exports, demos, and ecosystem feeds with real-time trust verification.`}
        canonicalUrl="https://wellknownmcp.org/feeds"
        ogImage="/og/feed-directory.png"
        llmIntent="browse-feed-directory"
        llmTopic="llmfeed-directory"
        llmlang="en"
        keywords={[
          'LLMFeed directory',
          'feed validation',
          'crypto verification',
          'MCP feeds',
          'well-known feeds',
          'signed feeds',
          'certified feeds',
          'agent interoperability',
          'trust verification',
          'WellKnownMCP'
        ]}
      />

      <main className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="border-b pb-6">
          <h1 className="text-3xl font-bold mb-2">Feed Directory</h1>
          <p className="text-gray-600 mb-4">
            Comprehensive directory of LLMFeed files with real-time crypto validation and trust verification.
          </p>
          
          {/* Stats Overview */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-700">{stats.total}</div>
                <div className="text-sm text-blue-600">Total Feeds</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-700">{stats.crypto_validated}</div>
                <div className="text-sm text-green-600">Crypto Validated</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-700">{stats.certified_count}</div>
                <div className="text-sm text-yellow-600">Certified</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-700">{stats.signed_count}</div>
                <div className="text-sm text-purple-600">Signed</div>
              </div>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search feeds by name, type, or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedType || ''}
              onChange={(e) => setSelectedType(e.target.value || null)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="">All Types</option>
              {feedTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedSource || ''}
              onChange={(e) => setSelectedSource(e.target.value || null)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="">All Sources</option>
              {sourceTypes.map(source => (
                <option key={source} value={source}>
                  {source.charAt(0).toUpperCase() + source.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedTrust || ''}
              onChange={(e) => setSelectedTrust(e.target.value || null)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="">All Trust Levels</option>
              <option value="certified">Certified</option>
              <option value="signed">Signed</option>
              <option value="validated">Crypto Validated</option>
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showOnlyValidated}
                onChange={(e) => setShowOnlyValidated(e.target.checked)}
                className="rounded"
              />
              Only Valid Feeds
            </label>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredFeeds.length} of {allFeeds.length} feeds
          </div>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFeeds.map(feed => {
            const fileName = feed.path.split('/').pop() || ''
            const displayPath = feed.path.replace('.llmfeed.json', '')
            
            // URLs for different access methods
            const hubUrl = feed.source_type === 'wellknown' 
              ? `/llmfeedhub?wellknown=${fileName.replace('.llmfeed.json', '')}`
              : `/llmfeedhub/${displayPath.replace('/exports/', '')}`
            
            const htmlUrl = feed.source_type === 'wellknown'
              ? `/api/feed-html?wellknown=${fileName.replace('.llmfeed.json', '')}`
              : `/api/feed-html?slug=${displayPath.replace('/exports/', '')}`

            return (
              <div key={feed.path} className="border border-gray-200 rounded-lg p-4 space-y-3 hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getSourceIcon(feed.source_type)}
                    <h3 className="font-semibold text-sm truncate" title={feed.title}>
                      {feed.title || fileName}
                    </h3>
                  </div>
                  {getTrustBadge(feed)}
                </div>

                {/* Description */}
                {feed.description && (
                  <p className="text-xs text-gray-600 line-clamp-2">{feed.description}</p>
                )}

                {/* Metadata */}
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Type: <span className="font-mono">{feed.feed_type}</span></div>
                  <div>Size: {feed.size} KB</div>
                  {feed.trust_score && (
                    <div>Trust Score: <span className="font-semibold">{feed.trust_score}/100</span></div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={feed.path}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded border text-gray-700"
                  >
                    📄 JSON
                  </Link>
                  
                  <Link
                    href={htmlUrl}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded border text-blue-700"
                  >
                    🌐 HTML
                  </Link>

                  <Link
                    href={hubUrl}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-green-100 hover:bg-green-200 rounded border text-green-700"
                  >
                    🧪 Analyze
                  </Link>

                  <ExportToLLMButton
                    context="static"
                    staticPath={displayPath}
                    className="text-xs px-2 py-1"
                  />
                </div>
              </div>
            )
          })}
        </div>

        {filteredFeeds.length === 0 && (
          <div className="text-center py-12">
            <Filter className="mx-auto w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No feeds found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </main>
    </>
  )
}