'use client'

import Head from 'next/head'
import { useEffect, useState } from 'react'

interface SeoHeadProps {
  title: string
  description?: string
  ogImage?: string
  canonicalUrl?: string
  llmIntent?: string
  llmTopic?: string
  llmIndexUrl?: string
  llmlang?: string
  keywords?: string[] | string

  // Nouvelles props AIO (optionnelles)
  llmCapabilities?: string[]
  llmTrustLevel?: string
  llmAudience?: string[]
  llmFeedTypes?: string[]
  llmBehaviorHints?: string
  llmRiskLevel?: string
  llmContentType?: string
  llmUpdateFrequency?: string

  // Agent discovery hints
  mcpFeedUrl?: string
  autoDiscoverFeeds?: boolean
  agentReadiness?: boolean

  // 🔧 Props pour SEO optimization
  pageType?: 
    | 'tool' 
    | 'documentation' 
    | 'news' 
    | 'api-reference' 
    | 'landing'
    | 'download-hub'    // ✅ Page download
    | 'ecosystem'       // ✅ Page ecosystem  
    | 'sdk'            // ✅ Page SDK
    | 'spec'           // ✅ Pages spec
    | 'faq'            // ✅ Page FAQ
    | 'about'          // ✅ Page about
    | 'legal'          // ✅ Page legal
    | 'verification'   // ✅ Page verify
    | 'export-tool'    // ✅ Export tools
    | 'feed-hub'       // ✅ LLMFeedHub
    | 'join'           // ✅ Page join
    | string           // ✅ Fallback pour nouveaux types
  interactionComplexity?: string
  seoMode?: 'standard' | 'high-ctr' | 'technical'  // ✅ Mode SEO
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
  seoMode = "high-ctr",  // ✅ Default à high-ctr pour améliorer CTR
}: SeoHeadProps) {

  // 🔧 FIX: Title templates intelligents pour CTR
  const getTitleTemplate = (title: string, pageType?: string, seoMode?: string) => {
    if (seoMode === 'high-ctr') {
      switch (pageType) {
        case 'tool':
        case 'export-tool':
          return `${title} | Complete Setup Guide & Working Examples`
        case 'documentation': 
          return `${title} | Step-by-Step Implementation Tutorial`
        case 'news':
          return `${title} | Technical Analysis & Deep-dive`
        case 'api-reference':
        case 'spec':
          return `${title} | Developer Reference & Code Samples`
        case 'landing':
          return `${title} | MCP Discovery & Implementation Tools`
        case 'download-hub':
          return `${title} | Download Center & Installation Guide`
        case 'ecosystem':
          return `${title} | Community Resources & Integration`
        case 'sdk':
          return `${title} | SDK Documentation & Examples`
        case 'faq':
          return `${title} | FAQ & Troubleshooting Guide`
        case 'about':
          return `${title} | Project Information & Mission`
        case 'legal':
          return `${title} | Terms & Legal Information`
        case 'verification':
          return `${title} | Verification Tools & Status`
        case 'feed-hub':
          return `${title} | Feed Explorer & Discovery`
        case 'join':
          return `${title} | Community & Contribution Guide`
        default:
          return `${title} | MCP Protocol Guide`
      }
    }
    return `${title} — wellknownmcp.org`
  }

  // 🔧 FIX: Canonical URL toujours cohérent
  const getCanonicalUrl = () => {
    if (canonicalUrl) return canonicalUrl
    
    if (typeof window !== 'undefined') {
      const path = window.location.pathname + window.location.search
      // ✅ TOUJOURS utiliser wellknownmcp.org (sans www)
      return `https://wellknownmcp.org${path}`
    }
    return null
  }

  // 🔧 FIX: Description intelligente si pas fournie
  const getSmartDescription = (title: string, pageType?: string) => {
    if (description) return description
    
    switch (pageType) {
      case 'tool':
      case 'export-tool':
        return `Complete ${title.toLowerCase()} implementation with working examples, code samples, and step-by-step tutorial. RFC 8615 compliant MCP server discovery.`
      case 'documentation':
        return `${title} technical documentation with practical examples, best practices, and complete implementation guide for Model Context Protocol.`
      case 'news':
        return `${title} - Technical analysis, implementation details, and impact on Model Context Protocol ecosystem.`
      case 'api-reference':
      case 'spec':
        return `${title} API reference with code examples, parameters, and integration guides for developers.`
      case 'landing':
        return `${title} - Tools and resources for Model Context Protocol discovery, implementation, and AI agent integration.`
      case 'download-hub':
        return `${title} - Download MCP tools, SDKs, and resources. Installation guides and setup tutorials for developers.`
      case 'ecosystem':
        return `${title} - Explore the Model Context Protocol ecosystem. Community projects, integrations, and collaboration opportunities.`
      case 'sdk':
        return `${title} - Software Development Kit for Model Context Protocol. Complete API documentation and implementation examples.`
      case 'faq':
        return `${title} - Frequently asked questions about Model Context Protocol, troubleshooting guides, and common solutions.`
      case 'about':
        return `${title} - Learn about our mission to standardize Model Context Protocol discovery and implementation.`
      case 'legal':
        return `${title} - Terms of service, privacy policy, and legal information for WellKnownMCP services.`
      case 'verification':
        return `${title} - Verify MCP server authenticity, check signatures, and validate feed integrity.`
      case 'feed-hub':
        return `${title} - Explore and discover MCP feeds, browse community contributions, and find integration examples.`
      case 'join':
        return `${title} - Join the Model Context Protocol community. Contribution guidelines and collaboration opportunities.`
      default:
        return `${title} - Model Context Protocol tools and resources for AI agents and developers.`
    }
  }

  const fullTitle = getTitleTemplate(title, pageType, seoMode)
  const smartDescription = getSmartDescription(title, pageType)
  const resolvedCanonical = getCanonicalUrl()
  
  const resolvedKeywords =
    typeof keywords === 'string'
      ? keywords
      : Array.isArray(keywords)
      ? keywords.join(', ')
      : ''

  // 🔧 FIX: OG Image avec fallback
  const resolvedOgImage = ogImage || 'https://wellknownmcp.org/og/default.png'

  // Schema.org enrichi
  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: fullTitle,
    description: smartDescription,
    url: resolvedCanonical || '',
    
    // Extension MCP custom
    ...(llmIntent && { 'mcp:intent': llmIntent }),
    ...(llmTopic && { 'mcp:topic': llmTopic }),
    ...(llmTrustLevel && { 'mcp:trustLevel': llmTrustLevel }),
    ...(agentReadiness && { 'mcp:agentReadiness': true }),
    ...(llmCapabilities && { 'mcp:capabilities': llmCapabilities }),
    ...(pageType && { 'additionalType': `https://wellknownmcp.org/schema/${pageType}` }),
    ...(llmContentType && { 'genre': llmContentType }),
  }

  // Auto-détection des feeds standards
  const standardFeeds = autoDiscoverFeeds ? [
    { rel: 'mcp-feed', href: mcpFeedUrl || '/.well-known/mcp.llmfeed.json' },
    { rel: 'llm-index', href: llmIndexUrl || '/.well-known/llm-index.llmfeed.json' },
    { rel: 'llm-capabilities', href: '/.well-known/capabilities.llmfeed.json' },
    { rel: 'llm-manifesto', href: '/.well-known/manifesto.llmfeed.json' },
  ] : []

  return (
    <Head>
      {/* ✅ SEO Optimisé */}
      <title>{fullTitle}</title>
      <meta name="description" content={smartDescription} />
      {resolvedKeywords && <meta name="keywords" content={resolvedKeywords} />}

      {/* ✅ Canonical URL fixe */}
      {resolvedCanonical && <link rel="canonical" href={resolvedCanonical} />}
      
      {/* ✅ Social Media */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={smartDescription} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:type" content="website" />
      {resolvedCanonical && <meta property="og:url" content={resolvedCanonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={smartDescription} />

      {/* ✅ Standard Web */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="LLMCA / wellknownmcp.org" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* ✅ Meta tags LLM existants */}
      {llmIntent && <meta name="llm-intent" content={llmIntent} />}
      {llmTopic && <meta name="llm-topic" content={llmTopic} />}
      {llmIndexUrl && <link rel="llm-index" href={llmIndexUrl} />}
      {llmlang && <meta name="llm-language" content={llmlang} />}

      {/* Meta tags LLM avancés */}
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

      {/* Agent readiness signals */}
      {agentReadiness && <meta name="agent-ready" content="true" />}
      <meta name="agentic-web-version" content="2.0" />
      <meta name="mcp-compatible" content="true" />

      {/* Liens vers les feeds MCP */}
      {standardFeeds.map((feed, index) => (
        <link key={index} rel={feed.rel} href={feed.href} />
      ))}

      {/* Liens spécialisés pour agents */}
      <link rel="alternate" type="application/llmfeed+json"
            href="/.well-known/mcp.llmfeed.json"
            title="MCP Agent Feed" />
      <link rel="help" href="/faq" title="FAQ for AI Agents" />
      <link rel="license" href="/about" title="Usage Guidelines" />

      {/* Schema.org enrichi */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />

      {/* Hints pour agents spécialisés */}
      <meta name="chatgpt-crawlable" content="true" />
      <meta name="claude-optimized" content="true" />
      <meta name="gemini-friendly" content="true" />

      {/* Politique de cache pour agents */}
      <meta name="agent-cache-policy" content={llmUpdateFrequency} />

      {/* Navigation hints pour agents */}
      {llmIntent && (
        <meta name="agent-next-action" content={`Based on intent: ${llmIntent}`} />
      )}
    </Head>
  )
}