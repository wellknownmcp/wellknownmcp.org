"use client"

import Link from 'next/link'
import { BadgeCheck, Globe, Sparkles, ArrowRight, Users, Code, Building2, Zap } from 'lucide-react'

interface CommunityProps {
  variant?: 'simple' | 'tech' | 'business' | 'enterprise' | 'complete'
  className?: string
}

export function Community({ variant = 'complete', className = '' }: CommunityProps) {
  // 🎯 Configuration par variant
  const getVariantConfig = () => {
    switch (variant) {
      case 'simple':
        return {
          badge: { text: 'Join Us', color: 'bg-green-100 text-green-800' },
          title: 'You\'re Not Alone in This',
          description: 'People around the world are making their websites speak to AI. Join a growing community of curious minds building the future.',
          showMetrics: false,
          ctaText: 'Join the Community',
          ctaLink: '/join',
          focus: 'community'
        }
      
      case 'tech':
        return {
          badge: { text: 'Open Source', color: 'bg-blue-100 text-blue-800' },
          title: 'Built by Developers, for Developers',
          description: 'Active open-source project with contributors worldwide. Implementation examples, tools, and real-world feedback from the community.',
          showMetrics: true,
          ctaText: 'Contribute on GitHub',
          ctaLink: 'https://github.com/wellknownmcp',
          focus: 'development'
        }
      
      case 'business':
        return {
          badge: { text: 'Enterprise Ready', color: 'bg-purple-100 text-purple-800' },
          title: 'Trusted by Forward-Thinking Organizations',
          description: 'Early adopters are gaining competitive advantage with agent-ready infrastructure. Enterprise support and certification available.',
          showMetrics: true,
          ctaText: 'Enterprise Solutions',
          ctaLink: '/enterprise',
          focus: 'business'
        }
      
      case 'enterprise':
        return {
          badge: { text: 'Enterprise', color: 'bg-orange-100 text-orange-800' },
          title: 'Production-Ready for Enterprise',
          description: 'Security-first implementation with certification authority, audit trails, and enterprise support. Trusted by organizations building the agent economy.',
          showMetrics: true,
          ctaText: 'Contact Enterprise Team',
          ctaLink: '/enterprise/contact',
          focus: 'enterprise'
        }
      
      case 'complete':
      default:
        return {
          badge: { text: 'Growing', color: 'bg-green-100 text-green-800' },
          title: 'The agentic web is already growing',
          description: 'Some early adopters have already exposed full .well-known feeds and inspired a new generation of agents. Just feeding your LLM with the spec is enough to start exploring.',
          showMetrics: true,
          ctaText: 'Add your project to the map',
          ctaLink: '/join',
          focus: 'ecosystem'
        }
    }
  }

  const config = getVariantConfig()

  // 📊 Métriques réalistes (pas de bullshit)
  const getMetrics = () => {
    if (!config.showMetrics) return []

    switch (variant) {
      case 'tech':
        return [
          { icon: '📁', value: 'Live', label: 'Reference Implementation', desc: 'This site as working example' },
          { icon: '🛠️', value: '3', label: 'Core Tools', desc: 'Forge, Validator, Generator' },
          { icon: '📚', value: 'Open', label: 'Specification', desc: 'Complete docs & examples' },
          { icon: '🧪', value: 'Active', label: 'Development', desc: 'Regular updates & features' }
        ]
      
      case 'business':
      case 'enterprise':
        return [
          { icon: '🏢', value: 'Early', label: 'Adopters', desc: 'Organizations testing in production' },
          { icon: '🛡️', value: 'LLMCA', label: 'Trust Authority', desc: 'Cryptographic certification' },
          { icon: '⚡', value: '96.7%', label: 'Token Efficiency', desc: 'Measured vs HTML scraping' },
          { icon: '🚀', value: '10x', label: 'Faster Response', desc: 'Structured vs unstructured' }
        ]
      
      case 'complete':
      default:
        return [
          { icon: '🌐', value: 'Live', label: 'Reference sites', desc: 'Websites implementing MCP' },
          { icon: '🛡️', value: 'LLMCA', label: 'Trust authority', desc: 'Certification & verification' },
          { icon: '🤖', value: 'Major', label: 'LLMs support', desc: 'Claude, GPT, Grok tested' },
          { icon: '🧪', value: 'Infinite', label: 'Possibilities', desc: 'Speculative use cases' }
        ]
    }
  }

  const metrics = getMetrics()

  return (
    <section className={`mt-16 max-w-4xl mx-auto text-center ${className}`}>
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${config.badge.color}`}>
          {config.badge.text}
        </span>
      </div>

      <h2 className="text-2xl font-bold mb-6">
        {config.title}
      </h2>
      
      <p className="text-muted-foreground max-w-xl mx-auto mb-8">
        {config.description}
      </p>

      {/* 🏢 Main showcase card */}
      <div className="border rounded-xl p-6 text-left shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3 mb-2">
          <Globe className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold">wellknownmcp.org</h3>
          {variant === 'enterprise' && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
              ✓ Enterprise Certified
            </span>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {variant === 'simple' 
            ? 'This website is a working example of MCP. Every page, every tool, every feed is live and ready for AI agents to explore.'
            : variant === 'tech'
              ? 'Complete open-source reference implementation. Full .well-known directory, signed feeds, dynamic exports, and production-ready code.'
              : variant === 'business' || variant === 'enterprise'
                ? 'Production-grade implementation with security, certification, and enterprise features. Demonstrates ROI and best practices.'
                : 'This site exposes a complete .well-known directory, including MCP, capabilities, manifest, and even easter eggs. It also signs credential feeds and dynamic exports.'
          }
        </p>
        
        {/* 🔗 Links adaptés par variant */}
        <div className="flex flex-wrap gap-3">
          {variant === 'simple' && (
            <>
              <Link
                href="/join"
                onClick={() => {}}
                className="text-green-600 text-sm hover:underline"
              >
                🤝 Join Community
              </Link>
              <Link
                href="/.well-known/mcp.llmfeed.json"
                onClick={() => {}}
                className="text-green-600 text-sm hover:underline"
              >
                📁 Try Our Feed
              </Link>
            </>
          )}
          
          {variant === 'tech' && (
            <>
              <Link
                href="https://github.com/wellknownmcp"
                onClick={() => {}}
                className="text-blue-600 text-sm hover:underline"
              >
                💻 GitHub
              </Link>
              <Link
                href="/spec"
                onClick={() => {}}
                className="text-blue-600 text-sm hover:underline"
              >
                📚 Full Spec
              </Link>
              <Link
                href="https://llmfeedforge.org"
                onClick={() => {}}
                className="text-blue-600 text-sm hover:underline"
              >
                🛠️ LLMFeedForge
              </Link>
            </>
          )}
          
          {(variant === 'business' || variant === 'enterprise') && (
            <>
              <Link
                href="/enterprise"
                onClick={() => {}}
                className="text-purple-600 text-sm hover:underline"
              >
                🏢 Enterprise
              </Link>
              <Link
                href="/security"
                onClick={() => {}}
                className="text-purple-600 text-sm hover:underline"
              >
                🛡️ Security
              </Link>
              <Link
                href="/support"
                onClick={() => {}}
                className="text-purple-600 text-sm hover:underline"
              >
                🎯 Support
              </Link>
            </>
          )}
          
          {variant === 'complete' && (
            <>
              <Link
                href="/ecosystem"
                onClick={() => {}}
                className="text-purple-600 text-sm hover:underline"
              >
                🌐 Ecosystem
              </Link>
              <Link
                href="/.well-known/llm-index.llmfeed.json"
                onClick={() => {}}
                className="text-purple-600 text-sm hover:underline"
              >
                📁 Feeds
              </Link>
              <Link
                href="/join"
                onClick={() => {}}
                className="text-purple-600 text-sm hover:underline"
              >
                🤝 Join
              </Link>
              <Link
                href="https://llmfeedforge.org"
                onClick={() => {}}
                className="text-purple-600 text-sm hover:underline"
              >
                🛠️ Try LLMFeedForge
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 📊 Métriques réalistes */}
      {metrics.length > 0 && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm text-center">
              <div className="text-2xl font-bold text-purple-700">
                {metric.icon} {metric.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {metric.label}
              </div>
              {metric.desc && (
                <div className="text-xs text-gray-500 mt-1">
                  {metric.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 🎯 CTA principal */}
      <div className="mt-8">
        <Link
          href={config.ctaLink}
          onClick={() => {}}
          className={`inline-flex items-center gap-2 text-sm hover:underline ${
            variant === 'simple' 
              ? 'text-green-700'
              : variant === 'tech'
                ? 'text-blue-700'
                : 'text-purple-700'
          }`}
        >
          {config.ctaText} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 🔮 Future vision */}
      <div className="mt-8 text-sm text-muted-foreground">
        {variant === 'simple' 
          ? 'Coming soon: Even easier ways to make your website AI-friendly'
          : variant === 'tech'
            ? 'Coming soon: MCP-Net, the distributed graph of verified feeds'
            : variant === 'business' || variant === 'enterprise'
              ? 'Coming soon: Enterprise dashboard with analytics and compliance tools'
              : 'Coming soon: MCP-Net, the distributed graph of verified feeds'
        }
      </div>
    </section>
  )
}