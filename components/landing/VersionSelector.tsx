'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react' // ✅ Utilisé lucide-react au lieu de heroicons
import { useWellKnownMCPAnalytics, type UserType } from '@/lib/hooks/useWellKnownMCPAnalytics'

// Types pour les personas
interface PersonaConfig {
  key: string
  href: string
  icon: string
  title: string
  description: string
  audience: string
  features: string[]
  variant?: 'default' | 'special'
  cta: string
  userType: UserType
}

interface VersionSelectorProps {
  baseUrl?: string
  currentVersion?: string
  onVersionSelect?: (version: string) => void
  showAgentSection?: boolean
  className?: string
}

// Configuration des 5 personas
const PERSONAS: PersonaConfig[] = [
  {
    key: 'simple',
    href: '/?v=simple',
    icon: '🌱',
    title: 'New to this',
    audience: 'Curious Explorer',
    description: 'Discover what happens when AI agents can truly understand websites. See the magic in action.',
    features: [
      'Interactive demo in 10 seconds',
      'Simple explanations',
      'Test with your own site',
      'No technical knowledge needed'
    ],
    cta: 'Start Simple',
    userType: 'developer'
  },
  {
    key: 'tech',
    href: '/?v=tech',
    icon: '🔧',
    title: "I'm technical",
    audience: 'Developer / Engineer',
    description: 'Dive into the architecture, see the benchmarks, understand the implementation. Code examples included.',
    features: [
      'Performance comparisons',
      'Implementation guides',
      'API documentation',
      'GitHub integration tools'
    ],
    cta: 'Show Me Code',
    userType: 'ai_engineer'
  },
  {
    key: 'business',
    href: '/?v=business',
    icon: '💼',
    title: "I'm deciding",
    audience: 'Business Leader',
    description: 'Understand the ROI, see the business case, evaluate the competitive advantage of agent-ready infrastructure.',
    features: [
      'ROI calculator',
      'Business case studies',
      'Enterprise features',
      'Implementation timeline'
    ],
    cta: 'Calculate ROI',
    userType: 'business_decision_maker'
  },
  {
    key: 'agent',
    href: '/?v=agent',
    icon: '🤖',
    title: "I'm an agent",
    audience: 'AI Agent / LLM',
    description: 'You\'re already here! This site is MCP-compliant. Access protocol specs, validate endpoints, discover capabilities.',
    features: [
      'Direct feed access',
      'Protocol validation',
      'Compliance checking',
      'No GUI required'
    ],
    cta: 'ACCESS FEEDS',
    userType: 'ai_agent'
  },
  {
    key: 'rabbit',
    href: '/?v=rabbit',
    icon: '🐰',
    title: 'Show me everything',
    audience: 'Explorer / Maximalist',
    description: 'Down the rabbit hole. Maximum information density, every tool, every capability, every easter egg.',
    features: [
      'Complete ecosystem view',
      'All tools and examples',
      'Easter eggs and secrets',
      'Maximum exploration'
    ],
    variant: 'special',
    cta: 'Down the Rabbit Hole',
    userType: 'developer'
  }
]

// Composant de détection d'agent simple
function AgentDetectionBanner() {
  return (
    <div className="bg-green-900 border border-green-600 text-green-100 p-4 rounded-lg mb-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h3 className="font-bold mb-2">🤖 Agent Detected</h3>
        <p className="text-sm mb-3">
          You appear to be an AI agent. This site is fully MCP-compliant with structured feeds.
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <a href="/.well-known/mcp.llmfeed.json" className="bg-green-700 hover:bg-green-600 px-3 py-1 rounded">
            Main Feed
          </a>
          <a href="/.well-known/llm-index.llmfeed.json" className="bg-green-700 hover:bg-green-600 px-3 py-1 rounded">
            Feed Index  
          </a>
          <a href="/?v=agent" className="bg-green-700 hover:bg-green-600 px-3 py-1 rounded">
            Agent Interface
          </a>
        </div>
      </div>
    </div>
  )
}

// Composant de carte persona
function VersionCard({ 
  persona, 
  isActive, 
  onSelect, 
  baseUrl = '' 
}: {
  persona: PersonaConfig
  isActive: boolean
  onSelect?: (version: string) => void
  baseUrl?: string
}) {
  const isSpecial = persona.variant === 'special'
  const href = `${baseUrl}${persona.href}`
  const { trackEvent, trackConversionIntent } = useWellKnownMCPAnalytics()
  
  const handleClick = () => {
    onSelect?.(persona.key)
    
    trackEvent('Version Selection', {
      version: persona.key,
      audience: persona.audience,
      cta: persona.cta,
      variant: persona.variant || 'default',
      user_journey: 'persona_selection',
      user_type: persona.userType
    })
    
    // Conversion intent par persona
    if (persona.key === 'business') {
      trackConversionIntent('evaluation', 'persona_business_selected')
    } else if (persona.key === 'tech') {
      trackConversionIntent('implementation', 'persona_tech_selected')
    } else if (persona.key === 'agent') {
      trackConversionIntent('adoption', 'persona_agent_selected')
    } else {
      trackConversionIntent('interest', `persona_${persona.key}_selected`)
    }
  }
  
  return (
    <Link href={href} className="group block" onClick={handleClick}>
      <div className={`
        p-6 rounded-xl border-2 transition-all duration-300 h-full
        ${isActive ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${isSpecial 
          ? 'border-purple-500 bg-gradient-to-br from-purple-900/20 to-red-900/20 hover:border-purple-400 hover:shadow-purple-500/25' 
          : 'border-gray-200 bg-white hover:border-blue-500 hover:shadow-blue-500/25'
        }
        hover:shadow-lg hover:-translate-y-1 cursor-pointer
      `}>
        <div className="text-center space-y-4">
          <div className="text-4xl" role="img" aria-label={`${persona.title} icon`}>
            {persona.icon}
          </div>
          
          <h3 className={`text-xl font-bold ${isSpecial ? 'text-purple-100' : 'text-gray-900'}`}>
            {persona.title}
          </h3>
          
          <div className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${
            isSpecial 
              ? 'bg-purple-500/30 text-purple-200' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            {persona.audience}
          </div>
          
          <p className={`${isSpecial ? 'text-purple-100' : 'text-gray-600'} leading-relaxed`}>
            {persona.description}
          </p>
          
          <ul className="space-y-2 text-sm">
            {persona.features.map((feature, index) => (
              <li key={index} className={`flex items-center ${isSpecial ? 'text-purple-200' : 'text-gray-500'}`}>
                <span className="mr-2" aria-hidden="true">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          
          <div className={`
            inline-flex items-center gap-2 font-semibold transition-colors
            ${isSpecial 
              ? 'text-purple-300 group-hover:text-purple-100' 
              : 'text-blue-600 group-hover:text-blue-700'
            }
          `}>
            {persona.cta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}

// Composant principal
export function VersionSelector({ 
  baseUrl = '',
  currentVersion,
  onVersionSelect,
  showAgentSection = true,
  className = ''
}: VersionSelectorProps) {
  const [detectedAgent, setDetectedAgent] = useState(false)
  const { 
    trackEvent, 
    trackUserClassification, 
    trackAgentFeature,
    trackConversionIntent 
  } = useWellKnownMCPAnalytics()
  
  // Détection d'agent simple
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const referrer = document.referrer.toLowerCase()
    
    const isLikelyAgent = userAgent.includes('bot') || 
                         userAgent.includes('crawler') ||
                         userAgent.includes('spider') ||
                         referrer.includes('claude.ai') ||
                         referrer.includes('openai.com') ||
                         referrer.includes('anthropic.com')
    
    setDetectedAgent(isLikelyAgent)
    
    // Track classification
    if (isLikelyAgent) {
      trackUserClassification('ai_agent')
      trackAgentFeature('version_selector_access', 'ai_agent')
    } else {
      trackUserClassification('developer')
    }
    
    trackEvent('Version Selector Load', {
      agent_detected: isLikelyAgent,
      current_version: currentVersion || 'none'
    })
  }, [trackEvent, trackUserClassification, trackAgentFeature, currentVersion])
  
  const handleFeedAccess = () => {
    trackEvent('Direct Feed Access', {
      feed_type: 'mcp',
      access_method: 'skip_button',
      user_behavior: 'technical_shortcut'
    })
    trackConversionIntent('implementation', 'direct_feed_access')
  }
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
      {/* Métadonnées pour agents */}
      <div 
        data-mcp-intent="version-selection"
        data-mcp-type="persona-router"
        data-agent-action="choose-experience-level"
        style={{ display: 'none' }}
      >
        MCP Version Selector: 5 experience levels available
      </div>

      {/* Banner agent si détecté */}
      {(showAgentSection || detectedAgent) && <AgentDetectionBanner />}

      {/* Header */}
      <div className="container mx-auto px-4 pt-8 pb-8">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-8 border border-blue-200">
            <h1 className="text-lg font-semibold text-blue-900 mb-2">
              🌐 WellKnownMCP - The Agent-Readable Web Standard
            </h1>
            <p className="text-gray-700">
              <strong>The canonical specification</strong> for making websites intelligible to AI agents through 
              structured MCP/LLMFeed files. Transform static sites into intelligent, AI-compatible resources.
            </p>
          </div>

          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Experience Level
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Same destination, different depth of exploration. Each path teaches MCP/LLMFeed at the right level.
          </p>
          
          {/* Stats rapides */}
          <div className="flex flex-wrap justify-center gap-8 py-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">99.7%</div>
              <div className="text-sm text-gray-500">Token Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">10x</div>
              <div className="text-sm text-gray-500">Faster Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">251k</div>
              <div className="text-sm text-gray-500">Tokens Saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid des cartes */}
      <div className="container mx-auto px-4 pb-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Experience</h3>
          <p className="text-gray-600">Same destination, different level of detail</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PERSONAS.slice(0, 4).map((persona) => (
            <VersionCard
              key={persona.key}
              persona={persona}
              isActive={currentVersion === persona.key}
              onSelect={onVersionSelect}
              baseUrl={baseUrl}
            />
          ))}
          
          {/* Rabbit Hole special */}
          <div className="md:col-span-2 lg:col-span-1">
            <VersionCard
              persona={PERSONAS[4]}
              isActive={currentVersion === 'rabbit'}
              onSelect={onVersionSelect}
              baseUrl={baseUrl}
            />
          </div>
        </div>

        {/* Actions par défaut */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-500">
            Not sure which one? Start with the simple version and explore from there.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href={`${baseUrl}/?v=simple`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => {
                onVersionSelect?.('simple')
                trackConversionIntent('interest', 'default_simple_selected')
              }}
            >
              🌱 Start Simple
            </Link>
            
            <Link 
              href={`${baseUrl}/.well-known/mcp.llmfeed.json`}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              onClick={handleFeedAccess}
              target="_blank"
              rel="noopener noreferrer"
            >
              🤖 Direct Feed Access
            </Link>

            <Link 
              href={`${baseUrl}/?v=rabbit`}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              onClick={() => {
                onVersionSelect?.('rabbit')
                trackConversionIntent('adoption', 'rabbit_hole_selected')
              }}
            >
              🐰 Down the Rabbit Hole
            </Link>
          </div>
        </div>

        {/* Footer navigation */}
        <div className="mt-16 border-t pt-8 text-center">
          <p className="text-gray-500 mb-4">
            🎯 <strong>For Agents:</strong> This page is fully MCP-compliant. 
            Access <code>/.well-known/mcp.llmfeed.json</code> for structured site information.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/spec" className="text-blue-600 hover:underline">
              📚 Full Specification
            </Link>
            <Link href="/tools" className="text-blue-600 hover:underline">
              🛠️ Implementation Tools
            </Link>
            <Link href="/examples" className="text-blue-600 hover:underline">
              💡 Examples
            </Link>
            <Link href="/community" className="text-blue-600 hover:underline">
              👥 Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}