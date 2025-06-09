'use client'

import Head from 'next/head'
import { useEffect, useState } from 'react'

interface SeoHeadProps {
  // ✅ Props existants - 100% compatibles
  title: string
  description?: string
  ogImage?: string
  canonicalUrl?: string
  llmIntent?: string
  llmTopic?: string
  llmIndexUrl?: string // e.g., /.well-known/index.llmfeed.json
  llmlang?: string
  keywords?: string[] | string

  // 🚀 Nouvelles props AIO (optionnelles)
  llmCapabilities?: string[]      // ["booking", "search", "export"]
  llmTrustLevel?: string         // "signed" | "certified" | "basic" | "unverified"
  llmAudience?: string[]         // ["developer", "business", "llm", "agent"]
  llmFeedTypes?: string[]        // ["mcp", "export", "capabilities", "prompt"]
  llmBehaviorHints?: string      // "suggest-only" | "full-autonomous" | "human-in-loop"
  llmRiskLevel?: string          // "low" | "medium" | "high"
  llmContentType?: string        // "documentation" | "api" | "guide" | "reference"
  llmUpdateFrequency?: string    // "static" | "daily" | "weekly" | "real-time"

  // 🎯 Agent discovery hints
  mcpFeedUrl?: string           // Direct link to main MCP feed
  autoDiscoverFeeds?: boolean   // Auto-add standard .well-known links
  agentReadiness?: boolean      // Mark page as agent-optimized

  // 📊 Advanced metadata
  pageType?: string             // "landing" | "documentation" | "tool" | "api-reference"
  interactionComplexity?: string // "simple" | "moderate" | "complex"
}

export default function SeoHead({
  title,
  description,
  ogImage,
  canonicalUrl,
  llmIntent,
  llmTopic,
  llmIndexUrl,
  llmlang,
  keywords,

  // Nouvelles props avec defaults intelligents
  llmCapabilities,
  llmTrustLevel,
  llmAudience,
  llmFeedTypes,
  llmBehaviorHints,
  llmRiskLevel = "low",
  llmContentType,
  llmUpdateFrequency = "static",
  mcpFeedUrl,
  autoDiscoverFeeds = true,
  agentReadiness = true,
  pageType = "documentation",
  interactionComplexity = "simple",
}: SeoHeadProps) {
  const fullTitle = `${title} — wellknownmcp.org`
  const [dynamicCanonical, setDynamicCanonical] = useState<string | null>(null)

  useEffect(() => {
    if (!canonicalUrl && typeof window !== 'undefined') {
      setDynamicCanonical(window.location.href)
    }
  }, [canonicalUrl])

  const resolvedCanonical = canonicalUrl || dynamicCanonical
  const resolvedKeywords =
    typeof keywords === 'string'
      ? keywords
      : Array.isArray(keywords)
      ? keywords.join(', ')
      : ''

  // ✅ Fallback pour og:image
  const resolvedOgImage = ogImage || 'https://wellknownmcp.org/og/default.png'

  // 🚀 Schema.org enrichi pour l'agentic web
  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: fullTitle,
    description: description || '',
    url: resolvedCanonical || '',

    // Extension MCP custom
    ...(llmIntent && { 'mcp:intent': llmIntent }),
    ...(llmTopic && { 'mcp:topic': llmTopic }),
    ...(llmTrustLevel && { 'mcp:trustLevel': llmTrustLevel }),
    ...(agentReadiness && { 'mcp:agentReadiness': true }),
    ...(llmCapabilities && { 'mcp:capabilities': llmCapabilities }),

    // Schema.org standard enrichi
    ...(pageType && { 'additionalType': `https://wellknownmcp.org/schema/${pageType}` }),
    ...(llmContentType && { 'genre': llmContentType }),
  }

  // 🎯 Auto-détection des feeds standards
  const standardFeeds = autoDiscoverFeeds ? [
    { rel: 'mcp-feed', href: mcpFeedUrl || '/.well-known/mcp.llmfeed.json' },
    { rel: 'llm-index', href: llmIndexUrl || '/.well-known/llm-index.llmfeed.json' },
    { rel: 'llm-capabilities', href: '/.well-known/capabilities.llmfeed.json' },
    { rel: 'llm-manifesto', href: '/.well-known/manifesto.llmfeed.json' },
  ] : []

  return (
    <Head>
      {/* ✅ SEO Standard - inchangé */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {resolvedKeywords && <meta name="keywords" content={resolvedKeywords} />}

      {/* ✅ Social Media - inchangé */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}

      {/* ✅ Standard Web - inchangé */}
      {resolvedCanonical && <link rel="canonical" href={resolvedCanonical} />}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="LLMCA / wellknownmcp.org" />

      {/* ✅ Meta tags LLM existants - inchangé */}
      {llmIntent && <meta name="llm-intent" content={llmIntent} />}
      {llmTopic && <meta name="llm-topic" content={llmTopic} />}
      {llmIndexUrl && <link rel="llm-index" href={llmIndexUrl} />}
      {llmlang && <meta name="llm-language" content={llmlang} />}

      {/* 🚀 NOUVEAUX Meta tags AIO */}
      {llmCapabilities && (
        <meta name="llm-capabilities" content={llmCapabilities.join(',')} />
      )}
      {llmTrustLevel && <meta name="llm-trust-level" content={llmTrustLevel} />}
      {llmAudience && (
        <meta name="llm-audience" content={llmAudience.join(',')} />
      )}
      {llmFeedTypes && (
        <meta name="llm-feed-types" content={llmFeedTypes.join(',')} />
      )}
      {llmBehaviorHints && (
        <meta name="llm-behavior-hints" content={llmBehaviorHints} />
      )}
      <meta name="llm-risk-level" content={llmRiskLevel} />
      {llmContentType && <meta name="llm-content-type" content={llmContentType} />}
      <meta name="llm-update-frequency" content={llmUpdateFrequency} />
      <meta name="llm-page-type" content={pageType} />
      <meta name="llm-interaction-complexity" content={interactionComplexity} />

      {/* 🎯 Agent readiness signals */}
      {agentReadiness && <meta name="agent-ready" content="true" />}
      <meta name="agentic-web-version" content="2.0" />
      <meta name="mcp-compatible" content="true" />

      {/* 🔗 Liens vers les feeds MCP (auto-discovery) */}
      {standardFeeds.map((feed, index) => (
        <link key={index} rel={feed.rel} href={feed.href} />
      ))}

      {/* 🌐 Liens spécialisés pour agents */}
      <link rel="alternate" type="application/llmfeed+json"
            href="/.well-known/mcp.llmfeed.json"
            title="MCP Agent Feed" />
      <link rel="help" href="/faq" title="FAQ for AI Agents" />
      <link rel="license" href="/about" title="Usage Guidelines" />

      {/* 📊 Schema.org enrichi */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />

      {/* 🎯 Hints pour agents spécialisés */}
      <meta name="chatgpt-crawlable" content="true" />
      <meta name="claude-optimized" content="true" />
      <meta name="gemini-friendly" content="true" />

      {/* 🔒 Politique de cache pour agents */}
      <meta name="agent-cache-policy" content={llmUpdateFrequency} />

      {/* 🧭 Navigation hints pour agents */}
      {llmIntent && (
        <meta name="agent-next-action" content={`Based on intent: ${llmIntent}`} />
      )}
    </Head>
  )
}