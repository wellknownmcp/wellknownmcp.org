'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import useSWR from 'swr'
import {
  TrendingUp,
  Globe,
  Shield,
  Award,
  Users,
  Calendar,
  MapPin,
  Star,
  Zap,
  Target,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  Crown,
  Rocket,
  BarChart3,
  Clock,
  Trophy,
  Heart,
  Share2,
  Copy,
  Download,
  Eye,
  ArrowUpRight,
  Filter,
  Search,
  Sparkles
} from 'lucide-react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface AgentSite {
  name: string
  url: string
  mcp_url: string
  description?: string
  trust?: 'signed' | 'certified'
  feed_types?: string[]
  badges?: {
    label: string
    badge_file: string
    source?: string | null
    scope?: string
  }[]
  // Nouvelles propriétés enrichies
  adoption_date?: string
  country?: string
  sector?: string
  company_size?: 'startup' | 'scaleup' | 'enterprise'
  trust_score?: number
  mcp_maturity?: 'basic' | 'intermediate' | 'advanced'
  success_metrics?: {
    agent_interactions?: number
    trust_improvement?: number
    feature_count?: number
  }
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  featured?: boolean
  early_adopter?: boolean
}

interface EcosystemStats {
  total_sites: number
  certified_sites: number
  signed_sites: number
  countries_count: number
  sectors_count: number
  avg_trust_score: number
  growth_rate: number
  total_agent_interactions: number
}

// 🎯 Hook pour les statistiques réelles de l'écosystème
function useEcosystemStats(sites: AgentSite[]): EcosystemStats {
  return useMemo(() => {
    const certified = sites.filter(s => s.trust === 'certified').length
    const signed = sites.filter(s => s.trust === 'signed').length
    const countries = new Set(sites.map(s => s.country).filter(Boolean)).size
    const sectors = new Set(sites.map(s => s.sector).filter(Boolean)).size
    
    return {
      total_sites: sites.length,
      certified_sites: certified,
      signed_sites: signed,
      countries_count: countries,
      sectors_count: sectors,
      avg_trust_score: 0, // Pas de données simulées
      growth_rate: 0, // Pas de données simulées
      total_agent_interactions: 0 // Pas de données simulées
    }
  }, [sites])
}

// 🎯 Hook pour les filtres de l'écosystème
function useEcosystemFilters(sites: AgentSite[]) {
  const [trustFilter, setTrustFilter] = useState<string>('all')
  const [sectorFilter, setSectorFilter] = useState<string>('all')
  const [maturityFilter, setMaturityFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSites = useMemo(() => {
    return sites.filter(site => {
      if (trustFilter !== 'all' && site.trust !== trustFilter) return false
      if (sectorFilter !== 'all' && site.sector !== sectorFilter) return false
      if (maturityFilter !== 'all' && site.mcp_maturity !== maturityFilter) return false
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesName = site.name.toLowerCase().includes(searchLower)
        const matchesDescription = site.description?.toLowerCase().includes(searchLower)
        const matchesSector = site.sector?.toLowerCase().includes(searchLower)
        if (!matchesName && !matchesDescription && !matchesSector) return false
      }
      return true
    })
  }, [sites, trustFilter, sectorFilter, maturityFilter, searchTerm])

  const availableSectors = useMemo(() => 
    Array.from(new Set(sites.map(s => s.sector).filter(Boolean))).sort(),
    [sites]
  )

  return {
    filteredSites,
    trustFilter, setTrustFilter,
    sectorFilter, setSectorFilter,
    maturityFilter, setMaturityFilter,
    searchTerm, setSearchTerm,
    availableSectors
  }
}

// 📊 Section basique des statistiques (données réelles uniquement)
const SimpleEcosystemStats = ({ stats }: { stats: EcosystemStats }) => (
  <div className="bg-gradient-to-br from-violet-50 via-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-violet-100">
    <div className="text-center mb-4">
      <h2 className="text-xl font-bold text-gray-900 mb-2">MCP Pioneer Network</h2>
      <p className="text-gray-600">Early adopters building the foundation of the Agent Web</p>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center bg-white rounded-lg p-4 border border-violet-100">
        <div className="text-2xl font-bold text-violet-600 mb-1">{stats.total_sites}</div>
        <div className="text-sm text-gray-600">Pioneer Sites</div>
      </div>
      
      <div className="text-center bg-white rounded-lg p-4 border border-green-100">
        <div className="text-2xl font-bold text-green-600 mb-1">{stats.certified_sites}</div>
        <div className="text-sm text-gray-600">LLMCA Certified</div>
      </div>
      
      <div className="text-center bg-white rounded-lg p-4 border border-blue-100">
        <div className="text-2xl font-bold text-blue-600 mb-1">{stats.signed_sites}</div>
        <div className="text-sm text-gray-600">Cryptographically Signed</div>
      </div>
      
      <div className="text-center bg-white rounded-lg p-4 border border-orange-100">
        <div className="text-2xl font-bold text-orange-600 mb-1">{stats.countries_count || 'N/A'}</div>
        <div className="text-sm text-gray-600">Countries</div>
      </div>
    </div>

    {/* Coming Soon section pour métriques avancées */}
    <div className="mt-6 pt-6 border-t border-violet-200">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm border border-amber-200">
          <Clock className="w-4 h-4" />
          Advanced metrics & growth analytics coming soon
        </div>
      </div>
    </div>
  </div>
)

// 🔍 Barre de recherche et filtres pour l'écosystème (version simplifiée)
const EcosystemFilters = ({
  searchTerm, setSearchTerm,
  trustFilter, setTrustFilter,
  sectorFilter, setSectorFilter,
  availableSectors,
  resultCount, totalCount
}: {
  searchTerm: string, setSearchTerm: (term: string) => void
  trustFilter: string, setTrustFilter: (filter: string) => void
  sectorFilter: string, setSectorFilter: (filter: string) => void
  availableSectors: string[]
  resultCount: number, totalCount: number
}) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
    {/* Barre de recherche */}
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search pioneer sites by name, sector, or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
      />
    </div>

    {/* Filtres */}
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <select
          value={trustFilter}
          onChange={(e) => setTrustFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All Trust Levels</option>
          <option value="certified">LLMCA Certified</option>
          <option value="signed">Cryptographically Signed</option>
        </select>
      </div>

      {availableSectors.length > 0 && (
        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All Sectors</option>
          {availableSectors.map(sector => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      )}

      <div className="ml-auto text-sm text-gray-600">
        {totalCount > 0 ? `Showing ${resultCount} of ${totalCount} pioneer sites` : 'No sites available yet'}
      </div>
    </div>
  </div>
)

// 🏆 Composant pour site pionnier avec rich features
const PioneerSiteCard = ({ 
  site, 
  rank, 
  showBadges 
}: { 
  site: AgentSite
  rank: number
  showBadges: boolean 
}) => {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const getTrustBadge = () => {
    if (site.trust === 'certified') return { 
      icon: Award, 
      text: 'LLMCA Certified', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200' 
    }
    if (site.trust === 'signed') return { 
      icon: Shield, 
      text: 'Cryptographically Signed', 
      color: 'bg-green-100 text-green-800 border-green-200' 
    }
    return { 
      icon: CheckCircle, 
      text: 'Basic MCP', 
      color: 'bg-gray-100 text-gray-600 border-gray-200' 
    }
  }

  const trustBadge = getTrustBadge()
  const TrustIcon = trustBadge.icon

  const copyMcpUrl = async () => {
    try {
      await navigator.clipboard.writeText(site.mcp_url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${site.trust === 'certified' ? 'ring-1 ring-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {/* Rank badge */}
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 
              rank <= 10 ? 'bg-blue-100 text-blue-800' : 
              'bg-gray-100 text-gray-600'
            }`}>
              {rank <= 3 ? <Trophy className="w-4 h-4" /> : rank}
            </div>
            
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                <a
                  href={site.url}
                  className="hover:text-violet-600 transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  {site.name}
                </a>
                {site.trust === 'certified' && <Award className="w-4 h-4 text-yellow-600" />}
                {rank <= 5 && <Crown className="w-4 h-4 text-violet-600" />}
              </CardTitle>
              
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${trustBadge.color}`}>
                  <TrustIcon className="w-3 h-3" />
                  {trustBadge.text}
                </span>
                {site.trust_score && (
                  <span className="text-xs text-gray-500 font-mono">
                    Trust: {site.trust_score}/100
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyMcpUrl}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy MCP URL"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-violet-600 hover:text-violet-800 font-medium"
            >
              {expanded ? 'Less' : 'More'}
            </button>
          </div>
        </div>

        {/* Métadonnées rapides */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
          {site.country && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {site.country}
            </span>
          )}
          {site.sector && (
            <span className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              {site.sector}
            </span>
          )}
          {site.adoption_date && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Pioneer since {new Date(site.adoption_date).toLocaleDateString()}
            </span>
          )}
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0">
          {/* Description */}
          {site.description && (
            <p className="text-sm text-gray-600 mb-4">{site.description}</p>
          )}

          {/* Feed types */}
          {site.feed_types && site.feed_types.length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-2">MCP Feed Types:</div>
              <div className="flex flex-wrap gap-1">
                {site.feed_types.map((type) => (
                  <Badge key={type} className="text-xs bg-gray-100 text-gray-700">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Success metrics - seulement si vraies données disponibles */}
          {site.success_metrics && (
            site.success_metrics.agent_interactions || 
            site.success_metrics.trust_improvement || 
            site.success_metrics.feature_count
          ) && (
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              {site.success_metrics.agent_interactions && (
                <div className="text-center">
                  <div className="font-semibold text-sm text-violet-600">
                    {site.success_metrics.agent_interactions.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Agent Calls</div>
                </div>
              )}
              {site.success_metrics.trust_improvement && (
                <div className="text-center">
                  <div className="font-semibold text-sm text-green-600">
                    +{site.success_metrics.trust_improvement}%
                  </div>
                  <div className="text-xs text-gray-500">Trust Gain</div>
                </div>
              )}
              {site.success_metrics.feature_count && (
                <div className="text-center">
                  <div className="font-semibold text-sm text-blue-600">
                    {site.success_metrics.feature_count}
                  </div>
                  <div className="text-xs text-gray-500">MCP Features</div>
                </div>
              )}
            </div>
          )}

          {/* Testimonial */}
          {site.testimonial && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <blockquote className="text-sm italic text-blue-900 mb-2">
                "{site.testimonial.quote}"
              </blockquote>
              <cite className="text-xs text-blue-700">
                — {site.testimonial.author}, {site.testimonial.role}
              </cite>
            </div>
          )}

          {/* Visual badges */}
          {showBadges && site.badges && site.badges.length > 0 && (
            <div className="flex gap-3 flex-wrap mb-4">
              {site.badges.map((badge) => (
                <Image
                  key={badge.label}
                  src={`/${badge.badge_file}`}
                  alt={badge.label}
                  width={100}
                  height={28}
                  className="rounded border"
                />
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-3 border-t">
            <a
              href={site.mcp_url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 text-sm text-violet-600 hover:text-violet-800"
            >
              <Eye className="w-4 h-4" />
              View MCP Feed
            </a>
            <a
              href={site.url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Site
            </a>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `${site.name} - MCP Pioneer`,
                    text: `Check out ${site.name}, an early adopter of the Model Context Protocol`,
                    url: site.url
                  })
                }
              }}
              className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

// Types de feeds avec descriptions enrichies
const FEED_TYPES = [
  {
    type: 'mcp',
    emoji: '🤝',
    description: 'Main MCP declaration: metadata, prompts, endpoints, trust.',
    color: 'bg-violet-50 text-violet-700 border-violet-200'
  },
  {
    type: 'capabilities',
    emoji: '⚙️',
    description: 'Dynamic capabilities: APIs and actions callable by agents.',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    type: 'llm-index',
    emoji: '📚',
    description: 'Index of feeds available on this site, human and agent-facing.',
    color: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    type: 'export',
    emoji: '📤',
    description: 'Static or dynamic content prepared for export to agents.',
    color: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  {
    type: 'credential',
    emoji: '🪪',
    description: 'Credential feeds: agent-readable proof or claim bundles.',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    type: 'custom',
    emoji: '🧪',
    description: 'Experimental feed types — proposed by the ecosystem.',
    color: 'bg-gray-50 text-gray-700 border-gray-200'
  },
]

// Composant principal amélioré
export default function EcosystemShowcasePage() {
  const { data, error } = useSWR(
    '/exports/ecosystem/agent-sites.llmfeed.json',
    fetcher
  )
  
  // Pas d'enrichissement - on garde les vraies données
  const sites: AgentSite[] = data?.sites ?? []

  const [showBadges, setShowBadges] = useState(false)
  
  const stats = useEcosystemStats(sites)
  const {
    filteredSites,
    trustFilter, setTrustFilter,
    sectorFilter, setSectorFilter,
    searchTerm, setSearchTerm,
    availableSectors
  } = useEcosystemFilters(sites)

  // Tri des sites par trust level et date d'adoption (si disponible)
  const rankedSites = useMemo(() => {
    return [...filteredSites].sort((a, b) => {
      // D'abord par trust level (certified > signed > basic)
      const getTrustValue = (trust?: string) => {
        if (trust === 'certified') return 3
        if (trust === 'signed') return 2
        return 1
      }
      
      const trustA = getTrustValue(a.trust)
      const trustB = getTrustValue(b.trust)
      if (trustA !== trustB) return trustB - trustA
      
      // Puis par date d'adoption (plus tôt = mieux) si disponible
      if (a.adoption_date && b.adoption_date) {
        const dateA = new Date(a.adoption_date).getTime()
        const dateB = new Date(b.adoption_date).getTime()
        return dateA - dateB
      }
      
      // Sinon par nom alphabétique
      return a.name.localeCompare(b.name)
    })
  }, [filteredSites])

  return (
    <>
      <SeoHead
        title={`MCP Ecosystem Showcase — Pioneer Sites Leading the Agent Web`}
        description={`Discover pioneering websites implementing MCP protocol. ${stats.total_sites > 0 ? `${stats.total_sites} sites` : 'Growing ecosystem'} with ${stats.certified_sites} LLMCA certified implementations driving the future of agent-web integration.`}
        canonicalUrl="https://wellknownmcp.org/ecosystem"
        ogImage="https://wellknownmcp.org/og/ecosystem-showcase.jpg"
        keywords={[
          'MCP ecosystem',
          'agent-ready sites',
          'early adopters',
          'pioneer implementations',
          'LLMCA certified',
          'cryptographically signed',
          'agent web',
          'trusted sites',
          'MCP adoption',
          'ecosystem growth',
          'agent indexing optimization',
          'web3 protocols',
          'structured data'
        ]}
        llmIntent="explore-mcp-ecosystem"
        llmTopic="ecosystem-showcase"
        llmIndexUrl="/.well-known/llm-index.llmfeed.json"
        llmlang="en"
      />

      <div className="max-w-7xl mx-auto space-y-8 py-10 px-4">
        <PageTitle
          title="MCP Ecosystem Showcase"
          subtitle="Pioneer sites leading the transition to the Agent Web — Signed, Certified, and Future-Ready"
        />

        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-lg text-gray-600 mb-4">
            These pioneering organizations are implementing the Model Context Protocol,
            creating the foundation for trustworthy agent-web interactions.
            {stats.total_sites > 0 && (
              <>
                {' '}Currently featuring <strong>{stats.total_sites} sites</strong>
                {stats.countries_count > 0 && <> across multiple countries</>}
                {stats.sectors_count > 0 && <> and sectors</>}.
              </>
            )}
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Rocket className="w-4 h-4 text-violet-600" />
              Pioneer Network
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-600" />
              Trust Verified
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4 text-blue-600" />
              Open Ecosystem
            </span>
          </div>
        </div>

        {/* Dashboard des statistiques (version simple) */}
        <SimpleEcosystemStats stats={stats} />

        {/* Export et contrôles */}
        <div className="flex justify-between items-center">
          <ExportToLLMButton
            context="static"
            staticPath="ecosystem/agent-sites"
            showCurlCommand={true}
            showDirectUrl={true}
          />
          <label className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              checked={showBadges}
              onChange={() => setShowBadges(!showBadges)}
              className="rounded"
            />
            Show visual badges
          </label>
        </div>

        {/* Filtres */}
        <EcosystemFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          trustFilter={trustFilter}
          setTrustFilter={setTrustFilter}
          sectorFilter={sectorFilter}
          setSectorFilter={setSectorFilter}
          availableSectors={availableSectors}
          resultCount={filteredSites.length}
          totalCount={sites.length}
        />

        {/* Types de feeds expliqués */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-violet-600" />
            MCP Feed Types in Production
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEED_TYPES.map((feedType) => (
              <div key={feedType.type} className={`p-4 rounded-lg border ${feedType.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" role="img">{feedType.emoji}</span>
                  <code className="font-mono text-sm font-semibold">
                    {feedType.type}.llmfeed.json
                  </code>
                </div>
                <p className="text-sm">{feedType.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* États de chargement */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Failed to load pioneer sites.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {!sites.length && !error && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading pioneer ecosystem...</p>
          </div>
        )}

        {/* Liste des sites */}
        {rankedSites.length > 0 && (
          <div className="space-y-6">
            {rankedSites.map((site, index) => (
              <PioneerSiteCard
                key={site.name}
                site={site}
                rank={index + 1}
                showBadges={showBadges}
              />
            ))}
          </div>
        )}

        {/* Call to action pour rejoindre */}
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Join the Pioneer Network</h3>
          <p className="text-violet-100 mb-6 max-w-2xl mx-auto">
            Implement MCP on your site and join the pioneers shaping the Agent Web. 
            Get discovered by AI agents, improve trust scores, and future-proof your digital presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/join"
              className="inline-flex items-center gap-2 bg-white text-violet-600 px-6 py-3 rounded-lg font-semibold hover:bg-violet-50 transition-colors"
            >
              <Rocket className="w-5 h-5" />
              Submit Your Site
            </a>
            <a
              href="/spec"
              className="inline-flex items-center gap-2 bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-800 transition-colors border border-violet-500"
            >
              <ExternalLink className="w-5 h-5" />
              Read Implementation Guide
            </a>
          </div>
          <p className="text-sm text-violet-200 mt-4">
            Your feed must be publicly accessible, signed or certified, and include metadata + capabilities.
          </p>
        </div>

        {/* Footer inspirationnel */}
        <div className="text-center py-8 border-t">
          <p className="text-lg text-gray-600 mb-2">
            🕸️ This is only the beginning of the Agent Web revolution.
          </p>
          <p className="text-sm text-gray-500">
            Soon, agents will explore not just who is ready — but how sites, tools and trust are connected.
            <br />
            <span className="font-semibold">MCP-Net</span> is coming.
          </p>
        </div>
      </div>
    </>
  )
}