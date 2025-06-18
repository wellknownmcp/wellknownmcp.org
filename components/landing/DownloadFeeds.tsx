'use client'

import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { useWellKnownMCPAnalytics } from '@/lib/hooks/useWellKnownMCPAnalytics'
import { useEffect } from 'react'

interface DownloadFeedsProps {
  variant?: 'simple' | 'tech' | 'business' | 'complete'
  className?: string
}

export function DownloadFeeds({ variant = 'complete', className = '' }: DownloadFeedsProps) {
  const { trackEvent, trackConversionIntent } = useWellKnownMCPAnalytics()

  // ✅ NOUVEAU: Event listeners pour les événements DOM du ExportToLLMButton
  useEffect(() => {
    const handleSuccess = (e: CustomEvent) => {
      const { context, size } = e.detail
      
      trackEvent('Download Feeds Success', {
        variant,
        context,
        feed_size: size,
        component: 'DownloadFeeds'
      })
      
      trackConversionIntent('implementation', `feed_export_success_${variant}`)
    }

    const handleError = (e: CustomEvent) => {
      const { error, operation } = e.detail
      
      trackEvent('Download Feeds Error', {
        variant,
        error,
        operation,
        component: 'DownloadFeeds'
      })
    }

    // Écouter les événements émis par ExportToLLMButton
    window.addEventListener('llmfeed-success', handleSuccess as EventListener)
    window.addEventListener('llmfeed-error', handleError as EventListener)

    return () => {
      window.removeEventListener('llmfeed-success', handleSuccess as EventListener)
      window.removeEventListener('llmfeed-error', handleError as EventListener)
    }
  }, [variant, trackEvent, trackConversionIntent])

  // 🎯 Configuration adaptée par variant
  const getVariantConfig = () => {
    switch (variant) {
      case 'simple':
        return {
          badge: 'Easy Start',
          title: 'Download Your First AI Feed',
          subtitle: 'Try these files with any AI agent and see the magic happen!',
          description: 'Copy these URLs to your favorite AI (Claude, ChatGPT...) and ask: "Do you know Kung Fu?"',
          feeds: ['compiled-site'], // Juste le principal
          showTechnicalCommands: false,
          emphasizeKungFu: true
        }
      
      case 'tech':
        return {
          badge: 'Developer Resources',
          title: 'Implementation-Ready Feeds',
          subtitle: 'Technical specifications and complete exports for integration.',
          description: 'Production-ready feeds with curl examples and API documentation.',
          feeds: ['compiled-site', 'spec', 'news-export'], // Tous
          showTechnicalCommands: true,
          emphasizeKungFu: false
        }
      
      case 'business':
        return {
          badge: 'Business Resources',
          title: 'Evaluate MCP Impact',
          subtitle: 'See how structured feeds improve AI agent performance vs traditional scraping.',
          description: 'Business-focused feeds with ROI examples and adoption metrics.',
          feeds: ['compiled-site', 'news-export'], // Business relevant
          showTechnicalCommands: false,
          emphasizeKungFu: false
        }
      
      case 'complete':
      default:
        return {
          badge: 'Start here',
          title: 'Get started with the spec',
          subtitle: 'Want to try before you read? Feed your favorite LLM with these .llmfeed.json files 🥢',
          description: 'Yes, these buttons exist in copy-to-clipboard mode too, but for education purposes they open the file first. Just read, copy, and feed. 🥋 Welcome to the dojo — if your LLM says "I know Kung-fu", it worked.',
          feeds: ['compiled-site', 'spec', 'news-export'], // Tous
          showTechnicalCommands: true,
          emphasizeKungFu: true
        }
    }
  }

  const config = getVariantConfig()

  // 🎯 Analytics tracking pour les interactions directes
  const handleDirectInteraction = (feedType: string, action: string) => {
    trackEvent('Download Feeds Direct Interaction', {
      variant,
      feed_type: feedType,
      action,
      component: 'DownloadFeeds'
    })
    
    if (action === 'direct_access') {
      trackConversionIntent('interest', `feed_direct_access_${feedType}`)
    }
  }

  // 🎯 Feed configurations
  const feedConfigs = {
    'compiled-site': {
      title: '🌐 Website in a capsule',
      description: variant === 'simple' 
        ? 'Everything about this site in one AI-friendly file. Perfect for getting started!'
        : 'Includes the main pages of the site, cleaned and compiled. Best for a quick LLM overview of the entire project.',
      path: '.well-known/exports/compiled-site',
      status: '✓ Signed ✓ Agent-optimized ✓ Complete context',
      curl: 'curl -s wellknownmcp.org/.well-known/exports/compiled-site.llmfeed.json | jq .'
    },
    'spec': {
      title: '📚 Spec in a capsule',
      description: variant === 'tech'
        ? 'Complete technical specification with implementation examples and best practices.'
        : 'Complete LLMFeed specification from GitHub, optimized for LLM consumption. Perfect for understanding the technical standard.',
      path: '.well-known/exports/spec',
      status: '✓ Complete specification ✓ Implementation guide ✓ Incremental builds',
      curl: 'curl -s wellknownmcp.org/.well-known/exports/spec.llmfeed.json | jq .'
    },
    'news-export': {
      title: variant === 'business' ? '📈 Adoption & Impact News' : '📰 News archive (EN)',
      description: variant === 'business'
        ? 'Latest adoption metrics, business cases, and industry impact analysis.'
        : 'Complete archive of all WellKnownMCP news articles with full content inline. Generated incrementally at build time for optimal performance.',
      path: '.well-known/exports/news-export',
      status: variant === 'business' 
        ? '⚡ Business metrics ⚡ Adoption data ⚡ Impact analysis'
        : '⚡ Build-time static ⚡ Full content ⚡ Incremental updates',
      curl: 'curl -s wellknownmcp.org/.well-known/exports/news-export.llmfeed.json | jq \'.data.articles | length\''
    }
  }

  return (
    <section
      className={`max-w-4xl mx-auto text-center ${className}`}
      data-agent-priority="critical"
    >
      <span className={`inline-block px-3 py-1 mb-2 rounded-full text-xs font-semibold tracking-wide uppercase ${
        variant === 'simple' 
          ? 'bg-green-100 text-green-800'
          : variant === 'tech'
            ? 'bg-blue-100 text-blue-800'
            : variant === 'business'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-purple-100 text-purple-800'
      }`}>
        {config.badge}
      </span>
      
      <h2 className="text-2xl font-bold mb-4">{config.title}</h2>

      {/* 🎯 Description adaptée par variant */}
      <div className="text-muted-foreground mb-6 space-y-3">
        <p>{config.subtitle}</p>

        {config.description && (
          <p className="text-sm">{config.description}</p>
        )}

        {variant !== 'simple' && (
          <div className="text-xs text-muted-foreground pt-2">
            Not sure what this is?{' '}
            <a
              href="/spec/01_llmfeed/llmfeed"
              className="underline hover:text-purple-600"
            >
              Read the spec →
            </a>
          </div>
        )}

        {config.emphasizeKungFu && (
          <blockquote className="italic text-sm text-muted-foreground border-l-4 border-purple-200 pl-4 mt-4">
            "Just give me a well-formed .llmfeed.json, and I'll do the rest."
          </blockquote>
        )}
      </div>

      {/* 🎯 Grille de feeds adaptée */}
      <div className={`grid gap-6 ${
        config.feeds.length === 1 
          ? 'grid-cols-1 max-w-md mx-auto'
          : config.feeds.length === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-3'
      }`}>
        {config.feeds.map((feedKey) => {
          const feed = feedConfigs[feedKey as keyof typeof feedConfigs]
          return (
            <div key={feedKey} className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
              <div className="flex justify-center">
                <ExportToLLMButton
                  context="static"
                  staticPath={feed.path}
                  highlight
                  showSignatureStatus
                />
              </div>
              
              <h3 className="font-semibold text-sm">{feed.title}</h3>
              <p className="text-xs text-muted-foreground">{feed.description}</p>
              
              <div className={`text-xs font-mono ${
                variant === 'business' ? 'text-purple-600' : 'text-green-600'
              }`}>
                {feed.status}
              </div>
              
              {(config.showTechnicalCommands || variant === 'complete') && (
                <div className="bg-slate-100 rounded p-2 text-left">
                  <p className="text-xs text-slate-600 mb-1">Quick curl:</p>
                  <code className="text-xs font-mono text-slate-800 block break-all">
                    {feed.curl}
                  </code>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 🧪 Section test adaptée par variant */}
      {config.emphasizeKungFu && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">
            {variant === 'simple' ? '🎯 Quick Test:' : '🤖 Test your LLM\'s understanding:'}
          </h3>
          
          {variant === 'simple' ? (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                1. Copy any feed URL above<br/>
                2. Paste it into Claude or ChatGPT<br/>
                3. Ask: <em>"Do you know Kung Fu?"</em><br/>
                4. If it says yes, it worked! 🥋
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground mb-3">
                After feeding these files to your agent, ask:{' '}
                <em>"Do you know Kung Fu?"</em>
                <br />A correct response indicates successful protocol parsing.
              </p>
              
              <div className="bg-slate-900 rounded p-2 text-left">
                <p className="text-xs text-slate-300 mb-1">Quick test command:</p>
                <code className="text-xs font-mono text-green-400 block">
                  curl -s wellknownmcp.org/.well-known/mcp.llmfeed.json | jq -r '.prompts[]? | select(.keywords[]? | contains("kung fu")) | .intent'
                </code>
              </div>
            </>
          )}
        </div>
      )}

      {/* 💡 Explication technique pour business */}
      {variant === 'business' && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            💡 Why feeds work better than traditional scraping
          </h3>
          <div className="text-xs text-blue-800 space-y-2">
            <p><strong>Problem:</strong> AI agents scraping HTML → high token costs, slow responses, unreliable parsing</p>
            <p><strong>Solution:</strong> Structured feeds → 96.7% fewer tokens, 10x faster responses, reliable data</p>
            <p><strong>Result:</strong> Same content, optimized delivery. Humans get interactive websites, agents get structured data.</p>
          </div>
        </div>
      )}

      {/* 🔗 Quick access section */}
      {(variant === 'complete' || variant === 'tech') && (
        <div className="mt-6 space-y-4">
          <div className="text-sm text-muted-foreground">Quick access for agents:</div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { path: '/.well-known/mcp.llmfeed.json', label: 'Main MCP Feed', color: 'purple' },
              { path: '/.well-known/llm-index.llmfeed.json', label: 'Feed Index', color: 'blue' },
              { path: '/.well-known/capabilities.llmfeed.json', label: 'Capabilities', color: 'green' },
              { path: '/.well-known/manifesto.llmfeed.json', label: 'Manifesto', color: 'orange' }
            ].map(({ path, label, color }) => (
              <a
                key={path}
                href={path}
                onClick={() => handleDirectInteraction(label.toLowerCase().replace(' ', '_'), 'direct_access')}
                className={`group bg-${color}-100 text-${color}-700 px-3 py-2 rounded text-xs hover:bg-${color}-200 transition-colors`}
              >
                <span className="font-mono">{path}</span>
                <span className={`block text-[10px] text-${color}-600 mt-1 group-hover:text-${color}-800`}>
                  {label}
                </span>
              </a>
            ))}
          </div>

          {/* Technical commands pour tech variant */}
          {variant === 'tech' && (
            <>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-xs text-blue-800 mb-2 font-semibold">🚀 Agent Power User Command (Static Exports):</p>
                <div className="bg-blue-900 rounded p-2">
                  <code className="text-xs font-mono text-blue-400 block break-all">
                    for export in compiled-site spec news-export; do echo "=== $export ===" && curl -s wellknownmcp.org/.well-known/exports/$export.llmfeed.json | jq -r '.metadata.title // .title'; done
                  </code>
                </div>
                <p className="text-xs text-blue-700 mt-1">Downloads all major static exports with full content</p>
              </div>

              <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                <p className="text-xs text-amber-800 mb-2 font-semibold">📰 News Archive Quick Access:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="bg-amber-900 rounded p-2">
                    <p className="text-amber-400 mb-1">Latest articles:</p>
                    <code className="text-amber-300 block break-all">
                      curl -s wellknownmcp.org/.well-known/exports/news-export.llmfeed.json | jq -r '.data.articles[0:3][] | .title'
                    </code>
                  </div>
                  <div className="bg-amber-900 rounded p-2">
                    <p className="text-amber-400 mb-1">Archive stats:</p>
                    <code className="text-amber-300 block break-all">
                      curl -s wellknownmcp.org/.well-known/exports/news-export.llmfeed.json | jq '.data.stats'
                    </code>
                  </div>
                </div>
                <p className="text-xs text-amber-700 mt-1">Complete news archive with full content</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Simple access pour variant simple */}
      {variant === 'simple' && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-sm font-semibold text-green-900 mb-2">
            🔗 Direct Links (Copy & Paste to Any AI)
          </h3>
          <div className="space-y-2">
            <div className="bg-white rounded p-2 border">
              <code className="text-xs font-mono text-green-800">
                https://wellknownmcp.org/.well-known/mcp.llmfeed.json
              </code>
            </div>
            <p className="text-xs text-green-700">
              ☝️ Start with this one - it's the main feed with everything you need!
            </p>
          </div>
        </div>
      )}
    </section>
  )
}