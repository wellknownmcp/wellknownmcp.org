'use client'

import { useState, useEffect } from 'react'
import { Download, Copy, Check, ExternalLink, Shield, FileText, Zap, Database, Settings, Globe } from 'lucide-react'
import { useWellKnownMCPAnalytics } from '@/lib/hooks/useWellKnownMCPAnalytics'

interface FeedEntry {
  name: string
  path: string
  description: string
  type: 'core' | 'export' | 'specialized' | 'utility'
  size: string
  lastModified: string
  icon: React.ComponentType<any>
  signed: boolean
  certified: boolean
  agentRecommended: boolean
  contentPreview?: string
}

interface FeedCategory {
  id: string
  title: string
  description: string
  feeds: FeedEntry[]
  color: string
}

export function DirectFeeds() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'size' | 'modified'>('type')
  const { trackEvent, trackAgentFeature, trackFeedTypeInterest } = useWellKnownMCPAnalytics()

  const feedCategories: FeedCategory[] = [
    {
      id: 'core',
      title: '🔥 Core Protocol Feeds',
      description: 'Essential MCP feeds for agent discovery and interaction',
      color: 'border-red-200 bg-red-50',
      feeds: [
        {
          name: 'mcp.llmfeed.json',
          path: '/.well-known/mcp.llmfeed.json',
          description: 'Main MCP declaration - start here for site understanding',
          type: 'core',
          size: '2.8 KB',
          lastModified: '2025-06-17',
          icon: Shield,
          signed: true,
          certified: true,
          agentRecommended: true,
          contentPreview: 'Site identity, capabilities, agent guidance, trust metadata'
        },
        {
          name: 'capabilities.llmfeed.json',
          path: '/.well-known/capabilities.llmfeed.json',
          description: 'Available tools, APIs, and interactive capabilities',
          type: 'core',
          size: '1.9 KB',
          lastModified: '2025-06-17',
          icon: Settings,
          signed: true,
          certified: true,
          agentRecommended: true,
          contentPreview: 'Interactive tools, API endpoints, available actions'
        },
        {
          name: 'llm-index.llmfeed.json',
          path: '/.well-known/llm-index.llmfeed.json',
          description: 'Complete directory of all available feeds and navigation',
          type: 'core',
          size: '3.2 KB',
          lastModified: '2025-06-17',
          icon: Database,
          signed: true,
          certified: true,
          agentRecommended: true,
          contentPreview: 'Feed directory, site navigation, content organization'
        }
      ]
    },
    {
      id: 'exports',
      title: '📦 Content Export Feeds',
      description: 'Pre-packaged content for agent consumption',
      color: 'border-blue-200 bg-blue-50',
      feeds: [
        {
          name: 'compiled-site.llmfeed.json',
          path: '/.well-known/exports/compiled-site.llmfeed.json',
          description: 'Complete site content in agent-optimized format',
          type: 'export',
          size: '45.2 KB',
          lastModified: '2025-06-17',
          icon: Globe,
          signed: true,
          certified: true,
          agentRecommended: true,
          contentPreview: 'Full site content, optimized for agent understanding'
        },
        {
          name: 'spec.llmfeed.json',
          path: '/.well-known/exports/spec.llmfeed.json',
          description: 'Complete MCP/LLMFeed specification documentation',
          type: 'export',
          size: '23.1 KB',
          lastModified: '2025-06-16',
          icon: FileText,
          signed: true,
          certified: true,
          agentRecommended: false,
          contentPreview: 'Technical specification, implementation guides, examples'
        },
        {
          name: 'news-export.llmfeed.json',
          path: '/.well-known/exports/news-export.llmfeed.json',
          description: 'Latest news and updates from the MCP ecosystem',
          type: 'export',
          size: '12.7 KB',
          lastModified: '2025-06-15',
          icon: FileText,
          signed: true,
          certified: false,
          agentRecommended: false,
          contentPreview: 'Recent announcements, ecosystem updates, community news'
        }
      ]
    },
    {
      id: 'specialized',
      title: '🎯 Specialized Feeds',
      description: 'Purpose-built feeds for specific agent interactions',
      color: 'border-purple-200 bg-purple-50',
      feeds: [
        {
          name: 'prompts/prompt-index.llmfeed.json',
          path: '/.well-known/prompts/prompt-index.llmfeed.json',
          description: 'Directory of available prompt templates and guidance',
          type: 'specialized',
          size: '4.1 KB',
          lastModified: '2025-06-16',
          icon: Zap,
          signed: true,
          certified: false,
          agentRecommended: false,
          contentPreview: 'Prompt templates, agent guidance scenarios, examples'
        },
        {
          name: 'agent-profile.llmfeed.json',
          path: '/.well-known/agent-profile.llmfeed.json',
          description: 'Agent-specific configuration and behavioral preferences',
          type: 'specialized',
          size: '1.4 KB',
          lastModified: '2025-06-14',
          icon: Settings,
          signed: false,
          certified: false,
          agentRecommended: false,
          contentPreview: 'Agent preferences, behavioral hints, interaction styles'
        }
      ]
    },
    {
      id: 'utility',
      title: '🔧 Utility & Verification',
      description: 'Support files for trust, verification, and debugging',
      color: 'border-green-200 bg-green-50',
      feeds: [
        {
          name: 'public.pem',
          path: '/.well-known/public.pem',
          description: 'Public key for signature verification',
          type: 'utility',
          size: '0.8 KB',
          lastModified: '2025-06-10',
          icon: Shield,
          signed: false,
          certified: true,
          agentRecommended: false,
          contentPreview: 'Ed25519 public key for cryptographic verification'
        },
        {
          name: 'robots.txt',
          path: '/robots.txt',
          description: 'Agent access policies and crawling guidelines',
          type: 'utility',
          size: '0.3 KB',
          lastModified: '2025-06-12',
          icon: Settings,
          signed: false,
          certified: false,
          agentRecommended: false,
          contentPreview: 'Crawling permissions, agent-specific directives'
        }
      ]
    }
  ]

  const allFeeds = feedCategories.flatMap(cat => cat.feeds)
  
  const filteredFeeds = selectedCategory === 'all' 
    ? allFeeds 
    : allFeeds.filter(feed => feed.type === selectedCategory)

  const sortedFeeds = [...filteredFeeds].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name)
      case 'type': return a.type.localeCompare(b.type)
      case 'size': return parseFloat(a.size) - parseFloat(b.size)
      case 'modified': return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      default: return 0
    }
  })

  const copyToClipboard = async (url: string, feedName: string) => {
    const fullUrl = `https://wellknownmcp.org${url}`
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopiedUrl(url)
      
      // Track feed access
      trackFeedTypeInterest(feedName, 'copy', 'direct_feeds_component')
      trackEvent('Direct Feed Access', {
        feed_name: feedName,
        access_method: 'copy_url',
        feed_path: url
      })
      
      setTimeout(() => setCopiedUrl(null), 3000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const openFeed = (url: string, feedName: string) => {
    trackFeedTypeInterest(feedName, 'view', 'direct_feeds_component')
    trackEvent('Direct Feed Access', {
      feed_name: feedName,
      access_method: 'direct_view',
      feed_path: url
    })
    window.open(`https://wellknownmcp.org${url}`, '_blank')
  }

  const downloadFeed = async (url: string, feedName: string) => {
    trackFeedTypeInterest(feedName, 'download', 'direct_feeds_component')
    trackEvent('Direct Feed Access', {
      feed_name: feedName,
      access_method: 'download',
      feed_path: url
    })
    
    // Create download link
    const link = document.createElement('a')
    link.href = `https://wellknownmcp.org${url}`
    link.download = feedName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Track component load
  useEffect(() => {
    trackAgentFeature('direct_feeds_navigation', 'ai_agent')
    trackEvent('Direct Feeds Load', {
      total_feeds: allFeeds.length,
      core_feeds: feedCategories.find(c => c.id === 'core')?.feeds.length || 0
    })
  }, [])

  const getStatusBadges = (feed: FeedEntry) => {
    const badges = []
    if (feed.agentRecommended) badges.push({ text: 'Recommended', color: 'bg-green-100 text-green-700 border-green-200' })
    if (feed.signed) badges.push({ text: 'Signed', color: 'bg-blue-100 text-blue-700 border-blue-200' })
    if (feed.certified) badges.push({ text: 'Certified', color: 'bg-purple-100 text-purple-700 border-purple-200' })
    return badges
  }

  return (
    <section className="max-w-6xl mx-auto bg-gray-900 text-gray-100 rounded-xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Database className="w-4 h-4" />
          Direct Feed Access
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          🗂️ Agent Navigation Dashboard
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Direct access to all MCP feeds and resources. No GUI needed - just the data you need, 
          structured for optimal agent consumption and interaction.
        </p>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-400">Quick access:</span>
            {feedCategories.find(c => c.id === 'core')?.feeds.slice(0, 3).map((feed, index) => (
              <button
                key={index}
                onClick={() => openFeed(feed.path, feed.name)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded border border-gray-600 transition-colors"
              >
                {feed.name.replace('.llmfeed.json', '')}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm bg-gray-700 border border-gray-600 rounded px-3 py-1 text-gray-200"
            >
              <option value="all">All Feeds</option>
              <option value="core">Core Only</option>
              <option value="export">Exports Only</option>
              <option value="specialized">Specialized</option>
              <option value="utility">Utility</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm bg-gray-700 border border-gray-600 rounded px-3 py-1 text-gray-200"
            >
              <option value="type">Sort by Type</option>
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
              <option value="modified">Sort by Modified</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feed Categories or Filtered List */}
      {selectedCategory === 'all' ? (
        <div className="space-y-8">
          {feedCategories.map((category) => (
            <div key={category.id} className={`border rounded-lg p-6 ${category.color}`}>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-700 mb-4">{category.description}</p>
              
              <div className="space-y-3">
                {category.feeds.map((feed, index) => (
                  <div key={index} className="bg-white/80 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <feed.icon className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900 font-mono text-sm">
                              {feed.name}
                            </h4>
                            <div className="flex gap-1">
                              {getStatusBadges(feed).map((badge, i) => (
                                <span
                                  key={i}
                                  className={`text-xs px-2 py-0.5 rounded border ${badge.color}`}
                                >
                                  {badge.text}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{feed.description}</p>
                          {feed.contentPreview && (
                            <p className="text-xs text-gray-500 italic">{feed.contentPreview}</p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>{feed.size}</span>
                            <span>Modified: {feed.lastModified}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => copyToClipboard(feed.path, feed.name)}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors"
                          title="Copy URL"
                        >
                          {copiedUrl === feed.path ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                        <button
                          onClick={() => downloadFeed(feed.path, feed.name)}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => openFeed(feed.path, feed.name)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 rounded border border-blue-300 transition-colors"
                          title="Open in new tab"
                        >
                          <ExternalLink className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-100 mb-4">
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Feeds ({sortedFeeds.length})
          </h3>
          
          <div className="space-y-3">
            {sortedFeeds.map((feed, index) => (
              <div key={index} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <feed.icon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-100 font-mono text-sm">
                          {feed.name}
                        </h4>
                        <div className="flex gap-1">
                          {getStatusBadges(feed).map((badge, i) => (
                            <span
                              key={i}
                              className={`text-xs px-2 py-0.5 rounded border ${badge.color}`}
                            >
                              {badge.text}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{feed.description}</p>
                      {feed.contentPreview && (
                        <p className="text-xs text-gray-400 italic">{feed.contentPreview}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span>{feed.size}</span>
                        <span>Modified: {feed.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => copyToClipboard(feed.path, feed.name)}
                      className="p-2 bg-gray-600 hover:bg-gray-500 rounded border border-gray-500 transition-colors"
                      title="Copy URL"
                    >
                      {copiedUrl === feed.path ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-300" />
                      )}
                    </button>
                    <button
                      onClick={() => downloadFeed(feed.path, feed.name)}
                      className="p-2 bg-gray-600 hover:bg-gray-500 rounded border border-gray-500 transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-gray-300" />
                    </button>
                    <button
                      onClick={() => openFeed(feed.path, feed.name)}
                      className="p-2 bg-blue-600 hover:bg-blue-500 rounded border border-blue-500 transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-100" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Agent Quick Commands */}
      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h4 className="font-semibold text-gray-100 mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Agent Quick Commands
        </h4>
        <div className="space-y-2 text-sm font-mono text-gray-300">
          <div className="bg-gray-900 p-2 rounded">
            <span className="text-gray-500"># Get site overview</span><br />
            curl -s wellknownmcp.org/.well-known/mcp.llmfeed.json | jq .
          </div>
          <div className="bg-gray-900 p-2 rounded">
            <span className="text-gray-500"># List all available feeds</span><br />
            curl -s wellknownmcp.org/.well-known/llm-index.llmfeed.json | jq .feeds
          </div>
          <div className="bg-gray-900 p-2 rounded">
            <span className="text-gray-500"># Download complete site content</span><br />
            wget wellknownmcp.org/.well-known/exports/compiled-site.llmfeed.json
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
          <div className="text-lg font-bold text-gray-100">{allFeeds.length}</div>
          <div className="text-xs text-gray-400">Total Feeds</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
          <div className="text-lg font-bold text-green-400">{allFeeds.filter(f => f.signed).length}</div>
          <div className="text-xs text-gray-400">Signed</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
          <div className="text-lg font-bold text-purple-400">{allFeeds.filter(f => f.certified).length}</div>
          <div className="text-xs text-gray-400">Certified</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
          <div className="text-lg font-bold text-blue-400">{allFeeds.filter(f => f.agentRecommended).length}</div>
          <div className="text-xs text-gray-400">Recommended</div>
        </div>
      </div>
    </section>
  )
}