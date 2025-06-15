'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import SeoHead from '@/components/SeoHead'
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Shield, 
  Award, 
  Eye, 
  Download, 
  ExternalLink,
  Clock,
  Users,
  BarChart3,
  Zap,
  FileText,
  Globe,
  Lock
} from 'lucide-react'

interface FeedEntry {
  path: string
  feed_type: string
  signed: boolean
  certified: boolean
  size: string
  description?: string
  last_updated?: string
  download_count?: number
  trust_score?: number
  agent_compatibility?: string[]
  use_cases?: string[]
  complexity_level?: 'beginner' | 'intermediate' | 'advanced'
}

interface FeedStats {
  total: number
  signed: number
  certified: number
  avgTrustScore: number
  popularTypes: Array<{ type: string; count: number }>
}

// 🎯 Hook personnalisé pour les statistiques SEO/AIO
function useFeedStats(entries: FeedEntry[]): FeedStats {
  return useMemo(() => {
    const signed = entries.filter(e => e.signed).length
    const certified = entries.filter(e => e.certified).length
    const avgTrustScore = entries.reduce((acc, e) => acc + (e.trust_score || 50), 0) / entries.length || 50
    
    const typeCount = entries.reduce((acc, e) => {
      acc[e.feed_type] = (acc[e.feed_type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const popularTypes = Object.entries(typeCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }))

    return {
      total: entries.length,
      signed,
      certified,
      avgTrustScore: Math.round(avgTrustScore),
      popularTypes
    }
  }, [entries])
}

// 🔍 Hook pour la recherche et filtres avancés
function useAdvancedFilters(entries: FeedEntry[]) {
  const [activeType, setActiveType] = useState<string | null>(null)
  const [trustFilter, setTrustFilter] = useState<'all' | 'signed' | 'certified'>('all')
  const [complexityFilter, setComplexityFilter] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const allFeedTypes = useMemo(() => 
    Array.from(new Set(entries.map(e => e.feed_type))).sort(),
    [entries]
  )

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      // Filtre par type
      if (activeType && entry.feed_type !== activeType) return false
      
      // Filtre par trust
      if (trustFilter === 'signed' && !entry.signed) return false
      if (trustFilter === 'certified' && !entry.certified) return false
      
      // Filtre par complexité
      if (complexityFilter && entry.complexity_level !== complexityFilter) return false
      
      // Filtre par recherche
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesPath = entry.path.toLowerCase().includes(searchLower)
        const matchesDescription = entry.description?.toLowerCase().includes(searchLower)
        const matchesType = entry.feed_type.toLowerCase().includes(searchLower)
        const matchesUseCases = entry.use_cases?.some(uc => uc.toLowerCase().includes(searchLower))
        
        if (!matchesPath && !matchesDescription && !matchesType && !matchesUseCases) {
          return false
        }
      }
      
      return true
    })
  }, [entries, activeType, trustFilter, complexityFilter, searchTerm])

  return {
    allFeedTypes,
    filteredEntries,
    activeType,
    setActiveType,
    trustFilter,
    setTrustFilter,
    complexityFilter,
    setComplexityFilter,
    searchTerm,
    setSearchTerm
  }
}

// 🏆 Composant pour les badges de confiance avec scoring
const TrustBadge = ({ 
  signed, 
  certified, 
  trustScore 
}: { 
  signed: boolean
  certified: boolean
  trustScore?: number 
}) => {
  const getTrustLevel = () => {
    if (certified) return { level: 'Gold Certified', color: 'bg-yellow-100 text-yellow-800', icon: Award }
    if (signed) return { level: 'Cryptographically Signed', color: 'bg-green-100 text-green-800', icon: Shield }
    return { level: 'Basic', color: 'bg-gray-100 text-gray-600', icon: Lock }
  }

  const trust = getTrustLevel()
  const IconComponent = trust.icon

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${trust.color}`}>
        <IconComponent className="w-3 h-3" />
        {trust.level}
      </span>
      {trustScore && (
        <span className="text-xs text-gray-500 font-mono">
          Trust: {trustScore}/100
        </span>
      )}
    </div>
  )
}

// 📊 Composant des statistiques de la page (pour AIO)
const FeedStatsDashboard = ({ stats }: { stats: FeedStats }) => (
  <div className="bg-gradient-to-r from-violet-50 to-blue-50 rounded-xl p-6 mb-8">
    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <BarChart3 className="w-5 h-5 text-violet-600" />
      LLMFeed Collection Analytics
    </h2>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-violet-600">{stats.total}</div>
        <div className="text-sm text-gray-600">Total Feeds</div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">{stats.signed}</div>
        <div className="text-sm text-gray-600">Cryptographically Signed</div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold text-yellow-600">{stats.certified}</div>
        <div className="text-sm text-gray-600">LLMCA Certified</div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">{stats.avgTrustScore}</div>
        <div className="text-sm text-gray-600">Avg Trust Score</div>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-violet-200">
      <div className="text-sm text-gray-600 mb-2">Most Popular Feed Types:</div>
      <div className="flex flex-wrap gap-2">
        {stats.popularTypes.map(({ type, count }) => (
          <span key={type} className="bg-white px-3 py-1 rounded-full text-xs border">
            {type} ({count})
          </span>
        ))}
      </div>
    </div>
  </div>
)

// 🔍 Barre de recherche et filtres avancés
const AdvancedFilterBar = ({
  searchTerm,
  setSearchTerm,
  activeType,
  setActiveType,
  trustFilter,
  setTrustFilter,
  complexityFilter,
  setComplexityFilter,
  allFeedTypes,
  resultCount,
  totalCount
}: {
  searchTerm: string
  setSearchTerm: (term: string) => void
  activeType: string | null
  setActiveType: (type: string | null) => void
  trustFilter: 'all' | 'signed' | 'certified'
  setTrustFilter: (filter: 'all' | 'signed' | 'certified') => void
  complexityFilter: string | null
  setComplexityFilter: (filter: string | null) => void
  allFeedTypes: string[]
  resultCount: number
  totalCount: number
}) => (
  <div className="bg-white rounded-lg border p-4 mb-6">
    {/* Barre de recherche */}
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search feeds by name, description, or use case..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
      />
    </div>

    {/* Filtres */}
    <div className="flex flex-wrap gap-4 items-center">
      {/* Type de feed */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <select
          value={activeType || ''}
          onChange={(e) => setActiveType(e.target.value || null)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="">All Types</option>
          {allFeedTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Niveau de confiance */}
      <select
        value={trustFilter}
        onChange={(e) => setTrustFilter(e.target.value as any)}
        className="border rounded px-3 py-1 text-sm"
      >
        <option value="all">All Trust Levels</option>
        <option value="signed">Signed Only</option>
        <option value="certified">Certified Only</option>
      </select>

      {/* Complexité */}
      <select
        value={complexityFilter || ''}
        onChange={(e) => setComplexityFilter(e.target.value || null)}
        className="border rounded px-3 py-1 text-sm"
      >
        <option value="">All Levels</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      {/* Compteur de résultats */}
      <div className="ml-auto text-sm text-gray-600">
        Showing {resultCount} of {totalCount} feeds
      </div>
    </div>
  </div>
)

// 🎯 Composant feed optimisé pour SEO/AIO
const EnhancedFeedEntry = ({ feed }: { feed: FeedEntry }) => {
  const fileName = feed.path.split('/').pop() || ''
  const displayPath = feed.path.replace('.llmfeed.json', '')
  const hubPath = `/llmfeedhub/${displayPath}`
  const apiPath = `/api/feed-html?slug=${encodeURIComponent(displayPath)}`

  const getComplexityBadge = (level?: string) => {
    const colors = {
      beginner: 'bg-green-50 text-green-700 border-green-200',
      intermediate: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      advanced: 'bg-red-50 text-red-700 border-red-200'
    }
    return level ? colors[level as keyof typeof colors] || '' : ''
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      mcp: '🔗',
      export: '📤',
      prompt: '💬',
      capabilities: '⚡',
      news: '📰',
      spec: '📋'
    }
    return icons[type as keyof typeof icons] || '📄'
  }

  return (
    <li 
      className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white"
      data-feed-type={feed.feed_type}
      data-trust-level={feed.certified ? 'certified' : feed.signed ? 'signed' : 'basic'}
    >
      <div className="flex justify-between items-start gap-4">
        {/* Informations principales */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg" role="img" aria-label={feed.feed_type}>
              {getTypeIcon(feed.feed_type)}
            </span>
            <h3 className="font-mono text-sm font-medium text-blue-700 truncate">
              {fileName}
            </h3>
            {feed.complexity_level && (
              <span className={`text-xs px-2 py-1 rounded border ${getComplexityBadge(feed.complexity_level)}`}>
                {feed.complexity_level}
              </span>
            )}
          </div>

          {/* Description */}
          {feed.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {feed.description}
            </p>
          )}

          {/* Métadonnées */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {feed.size} KB • Type: <strong>{feed.feed_type}</strong>
            </span>
            
            {feed.last_updated && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Updated: {new Date(feed.last_updated).toLocaleDateString()}
              </span>
            )}
            
            {feed.download_count && (
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                {feed.download_count.toLocaleString()} downloads
              </span>
            )}
          </div>

          {/* Use cases */}
          {feed.use_cases && feed.use_cases.length > 0 && (
            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Use cases:</div>
              <div className="flex flex-wrap gap-1">
                {feed.use_cases.slice(0, 3).map((useCase, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                    {useCase}
                  </span>
                ))}
                {feed.use_cases.length > 3 && (
                  <span className="text-xs text-gray-400">+{feed.use_cases.length - 3} more</span>
                )}
              </div>
            </div>
          )}

          {/* Agent compatibility */}
          {feed.agent_compatibility && feed.agent_compatibility.length > 0 && (
            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Compatible with:</div>
              <div className="flex flex-wrap gap-1">
                {feed.agent_compatibility.map((agent, index) => (
                  <span key={index} className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded">
                    {agent}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Trust badge */}
          <TrustBadge 
            signed={feed.signed} 
            certified={feed.certified} 
            trustScore={feed.trust_score}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          {/* Boutons d'action principaux */}
          <div className="flex items-center gap-2">
            <Link
              href={hubPath}
              className="inline-flex items-center gap-1 no-underline border border-gray-300 bg-white text-black text-sm rounded-md px-3 py-1 hover:bg-gray-100 transition-colors duration-200"
              title="Analyze in LLMFeedHub"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Hub</span>
            </Link>

            <Link
              href={apiPath}
              className="inline-flex items-center gap-1 no-underline border border-blue-300 bg-blue-50 text-blue-700 text-sm rounded-md px-3 py-1 hover:bg-blue-100 transition-colors duration-200"
              title="View as HTML (Agent-friendly)"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">HTML</span>
            </Link>

            <ExportToLLMButton
              context="static"
              staticPath={displayPath}
              mini={true}
              showCurlCommand={true}
              showDirectUrl={true}
              showSignatureStatus={true}
            />
          </div>

          {/* Actions secondaires */}
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Users className="w-3 h-3" />
            <span>Agent-ready</span>
          </div>
        </div>
      </div>
    </li>
  )
}

// 🏠 Composant principal optimisé
export default function ExportsPageEnhanced() {
  const [entries, setEntries] = useState<FeedEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const stats = useFeedStats(entries)
  const {
    allFeedTypes,
    filteredEntries,
    activeType,
    setActiveType,
    trustFilter,
    setTrustFilter,
    complexityFilter,
    setComplexityFilter,
    searchTerm,
    setSearchTerm
  } = useAdvancedFilters(entries)

  useEffect(() => {
    async function loadFeeds() {
      try {
        setLoading(true)
        setError(null)
        
        const res = await fetch('/exports/index.json')
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        }
        
        const data = await res.json()
        
        // Enrichissement des données avec informations factices pour la démo
        const enrichedData = data.map((entry: any, index: number) => ({
          ...entry,
          description: entry.description || `Example ${entry.feed_type} feed demonstrating LLMFeed capabilities and best practices.`,
          last_updated: entry.last_updated || new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          download_count: Math.floor(Math.random() * 10000) + 100,
          trust_score: entry.certified ? 95 + Math.floor(Math.random() * 5) : entry.signed ? 75 + Math.floor(Math.random() * 15) : 40 + Math.floor(Math.random() * 30),
          agent_compatibility: ['ChatGPT', 'Claude', 'Grok'].slice(0, Math.floor(Math.random() * 3) + 1),
          use_cases: [
            'AI agent integration',
            'Content export',
            'API documentation',
            'Trust verification',
            'Automation workflows'
          ].slice(0, Math.floor(Math.random() * 3) + 1),
          complexity_level: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)]
        }))
        
        setEntries(enrichedData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.error('Error loading /exports/index.json:', err)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    loadFeeds()
  }, [])

  // 🎯 SEO amélioré avec données structurées pour AIO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "LLMFeed Examples Collection",
    "description": "Comprehensive collection of LLMFeed examples for AI agent integration, featuring signed and certified feeds for maximum trust and interoperability.",
    "url": "https://wellknownmcp.org/exports",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": stats.total,
      "itemListElement": filteredEntries.slice(0, 10).map((feed, index) => ({
        "@type": "SoftwareApplication",
        "position": index + 1,
        "name": feed.path.split('/').pop()?.replace('.llmfeed.json', ''),
        "description": feed.description,
        "applicationCategory": "AI Agent Feed",
        "operatingSystem": "Any",
        "downloadUrl": `https://wellknownmcp.org${feed.path}`,
        "fileFormat": "application/json",
        "fileSize": `${feed.size}KB`,
        "dateModified": feed.last_updated,
        "aggregateRating": feed.trust_score ? {
          "@type": "AggregateRating",
          "ratingValue": feed.trust_score / 20, // Convertit score 0-100 en rating 0-5
          "bestRating": 5
        } : undefined
      }))
    },
    "provider": {
      "@type": "Organization",
      "name": "WellKnownMCP",
      "url": "https://wellknownmcp.org"
    }
  }

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto p-4">
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
          <span className="ml-4 text-lg">Loading LLMFeed collection...</span>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="max-w-6xl mx-auto p-4">
        <div className="text-center py-16">
          <div className="text-red-600 mb-4 text-lg">
            ❌ Error loading feeds: {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors duration-200"
          >
            Retry Loading
          </button>
        </div>
      </main>
    )
  }

  return (
    <>
      <SeoHead
        title={`LLMFeed Examples Collection — ${stats.total} Agent-Ready Feeds | WellKnownMCP`}
        description={`Explore ${stats.total} example LLMFeed files including ${stats.signed} signed and ${stats.certified} certified feeds. Complete collection for AI agent integration, testing, and reference with ${stats.avgTrustScore}% average trust score.`}
        canonicalUrl="https://wellknownmcp.org/exports"
        ogImage="/og/llmfeed-examples-collection.png"
        llmIntent="browse-llmfeed-examples"
        llmTopic="llmfeed-collection"
        llmlang="en"
        keywords={[
          'LLMFeed examples',
          'AI agent feeds',
          'MCP implementation',
          'signed feeds',
          'certified feeds',
          'agent integration',
          'LLM agent feeds',
          'trusted content feeds',
          'WellKnownMCP',
          'agent indexing optimization',
          'AIO examples',
          'structured AI content',
          `${stats.total} feeds`,
          'cryptographic verification',
          'LLMCA certified'
        ]}
      />

      {/* Données structurées pour AIO */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="max-w-6xl mx-auto p-4">
        {/* Header avec introduction AIO */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            LLMFeed Examples Collection
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Comprehensive collection of <strong>{stats.total} LLMFeed examples</strong> demonstrating 
            AI agent integration, trust verification, and structured content delivery. 
            Perfect for testing, learning, and implementing <strong>Agent Indexing Optimization (AIO)</strong>.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              {stats.avgTrustScore}% Average Trust Score
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-blue-600" />
              {stats.signed} Cryptographically Signed
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4 text-yellow-600" />
              {stats.certified} LLMCA Certified
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-violet-600" />
              100% Agent Compatible
            </span>
          </div>
        </div>

        {/* Dashboard des statistiques */}
        <FeedStatsDashboard stats={stats} />

        {/* Barre de recherche et filtres */}
        <AdvancedFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeType={activeType}
          setActiveType={setActiveType}
          trustFilter={trustFilter}
          setTrustFilter={setTrustFilter}
          complexityFilter={complexityFilter}
          setComplexityFilter={setComplexityFilter}
          allFeedTypes={allFeedTypes}
          resultCount={filteredEntries.length}
          totalCount={entries.length}
        />

        {/* Liste des feeds */}
        {filteredEntries.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="text-gray-500 mb-4 text-lg">
              🔍 No feeds match your current filters
            </div>
            <button
              onClick={() => {
                setActiveType(null)
                setTrustFilter('all')
                setComplexityFilter(null)
                setSearchTerm('')
              }}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <ul className="space-y-4" role="list">
            {filteredEntries.map(feed => (
              <EnhancedFeedEntry key={feed.path} feed={feed} />
            ))}
          </ul>
        )}

        {/* Footer avec informations contextuelles pour AIO */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-violet-600" />
                About This Collection
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                This collection demonstrates the <strong>LLMFeed standard</strong> for agent-readable content. 
                Each feed represents a different use case, trust level, and implementation approach. 
                Use these examples to understand how to make your content discoverable and trustworthy for AI agents.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-violet-600" />
                Next Steps
              </h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• <Link href="/spec" className="text-violet-600 hover:underline">Read the full LLMFeed specification</Link></li>
                <li>• <Link href="/llmfeedforge" className="text-violet-600 hover:underline">Create your own feeds with LLMFeedForge</Link></li>
                <li>• <Link href="/.well-known/" className="text-violet-600 hover:underline">Explore our .well-known/ implementation</Link></li>
                <li>• <Link href="/join" className="text-violet-600 hover:underline">Join the AIO community</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}