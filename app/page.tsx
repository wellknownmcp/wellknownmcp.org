// app/page.tsx
// 🎯 ROUTER PRINCIPAL - Orchestration des 5 personas
// Remplace votre page.tsx actuel pour diriger vers les versions spécialisées

import { VersionSelector } from '@/components/landing/VersionSelector'
import { AmateurLanding } from '@/components/landing/versions/AmateurLanding'
import { TechLanding } from '@/components/landing/versions/TechLanding'
import { BusinessLanding } from '@/components/landing/versions/BusinessLanding'
import { AgentLanding } from '@/components/landing/versions/AgentLanding'
import { RabbitLanding } from '@/components/landing/versions/RabbitLanding'

interface PageProps {
  searchParams: { 
    v?: string 
    debug?: string
    agent?: string
  }
}

export default function HomePage({ searchParams }: PageProps) {
  const version = searchParams.v
  const isDebugMode = searchParams.debug === '1'
  const isAgentMode = searchParams.agent === '1'
  
  // 🤖 Auto-detection agent si pas de version spécifiée
  const shouldShowAgentSelector = !version && isAgentMode

  // 🎯 Routing principal par version
  switch(version) {
    case 'simple':
      return <AmateurLanding />
      
    case 'tech':
      return <TechLanding />
      
    case 'business':
      return <BusinessLanding />
      
    case 'agent':
      return <AgentLanding />
      
    case 'rabbit':
      return <RabbitLanding />
      
    default:
      // 🚀 Sélecteur de version par défaut
      return (
        <VersionSelector 
          showAgentSection={shouldShowAgentSelector}
          currentVersion={version}
          className={isDebugMode ? 'debug-mode' : ''}
        />
      )
  }
}

// 🎯 Métadonnées par défaut (chaque landing a ses propres métadonnées)
export const metadata = {
  title: 'WellKnownMCP - Choose Your Experience Level',
  description: 'The canonical specification for agent-readable websites. Choose your experience level: Simple, Technical, Business, Agent, or Rabbit Hole.',
  keywords: [
    'MCP protocol',
    'agent-readable web', 
    'LLMFeed specification',
    'AI agent optimization',
    'structured data feeds',
    'Model Context Protocol',
    'llmfeed.json',
    'well-known',
    'agent standards'
  ],
  openGraph: {
    title: 'WellKnownMCP - The Agent-Readable Web Standard',
    description: 'Choose your experience level for learning about MCP/LLMFeed protocol implementation.',
    type: 'website',
    url: 'https://wellknownmcp.org',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WellKnownMCP - Agent-Readable Web Standard'
      }
    ]
  },
  // 🤖 Métadonnées pour agents
  other: {
    'llm-intent': 'choose-experience-level',
    'llm-capabilities': 'mcp,llmfeed,agent-guidance,version-selection',
    'llm-audience': 'all',
    'agent-action': 'version-selection',
    'llm-behavior-hints': 'suggest-appropriate-version'
  }
}