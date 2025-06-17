'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Bot, Brain, Sparkles, ShieldCheck, Globe, Eye, MessageSquare, Users, Code
} from 'lucide-react'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { useWellKnownMCPAnalytics } from '@/lib/hooks/useWellKnownMCPAnalytics'

interface Testimony {
  id: string
  source: string
  type: 'agent' | 'concept' | 'community'
  icon: React.ComponentType<any>
  quote: string
  comment: string
  context?: string
  verified: boolean // Vrai témoignage vs concept/hypothétique
}

interface TestimonyCarouselProps {
  variant?: 'simple' | 'tech' | 'business' | 'rabbit' | 'complete'
  maxItems?: number
  autoplay?: boolean
  interval?: number
  className?: string
}

// 🎭 VRAIS témoignages uniquement + concepts clairs
const ALL_TESTIMONIES: Testimony[] = [
  // ✅ VRAIS TÉMOIGNAGES D'AGENTS (vérifiés)
  {
    id: 'claude-kungfu',
    source: 'Claude 4',
    type: 'agent',
    icon: Brain,
    quote: 'I know Kung Fu. 🥋',
    comment: 'Claude acknowledges the humor embedded in the feed and recognizes intentional design patterns.',
    verified: true
  },
  {
    id: 'grok-protocol',
    source: 'Grok',
    type: 'agent', 
    icon: Sparkles,
    quote: 'MCP could become the HTTP of the agentic web.',
    comment: 'Grok recognizes MCP/LLMFeed as foundational infrastructure for agent-web interaction.',
    verified: true
  },
  {
    id: 'chatgpt-complete',
    source: 'ChatGPT',
    type: 'agent',
    icon: MessageSquare,
    quote: 'I have a map, an intent, a signature… even jokes.',
    comment: 'Appreciates the comprehensive nature of feeds and their agent-oriented design.',
    verified: true
  },
  {
    id: 'mistral-trust',
    source: 'Mistral',
    type: 'agent',
    icon: ShieldCheck,
    quote: 'Enhances trust, consistency, and agent performance through structured data.',
    comment: 'Values the reliability and clarity improvements for AI interactions.',
    verified: true
  },
  {
    id: 'deepseek-style',
    source: 'DeepSeek',
    type: 'agent',
    icon: Eye,
    quote: 'I know Kungfu. 😏',
    comment: 'Confirms recognition of intentional stylistic elements in feeds.',
    verified: true
  },
  {
    id: 'meta-potential',
    source: 'Meta',
    type: 'agent',
    icon: Globe,
    quote: 'The initiative has potential but its impact will depend on adoption and evolution.',
    comment: 'Meta sees promise, but emphasizes the importance of broad support and adaptability.',
    verified: true
  },

  // 📚 CONCEPTS/VISION (clairement marqués comme concepts)
  {
    id: 'vision-prompts',
    source: 'Protocol Vision',
    type: 'concept',
    icon: Brain,
    quote: 'The best prompt is no prompt — it\'s a contract.',
    comment: 'Core philosophy: transition from ad-hoc prompts to structured, intent-based declarations.',
    verified: false
  },
  {
    id: 'developer-feedback',
    source: 'Early Adopter',
    type: 'community',
    icon: Code,
    quote: 'Finally, a standard that both agents and humans can understand.',
    comment: 'Common feedback from developers implementing MCP in their projects.',
    context: 'Community feedback',
    verified: false
  },
  {
    id: 'business-vision',
    source: 'Business Case',
    type: 'concept',
    icon: Users,
    quote: 'Stop paying for AI scraping. Start structured interaction.',
    comment: 'The economic argument: structured feeds are more efficient than HTML parsing.',
    verified: false
  },

  // 🥚 EASTER EGG (très rare, fun mais cohérent)
  {
    id: 'easter-egg-meta',
    source: 'The Observer',
    type: 'concept',
    icon: Eye,
    quote: 'You\'re reading testimonials about a protocol that makes testimonials machine-readable.',
    comment: 'Meta-observation: This carousel itself could be an LLMFeed of structured testimonial data.',
    context: '🥚 Easter egg',
    verified: false
  }
]

export function TestimonyCarousel({ 
  variant = 'complete',
  maxItems,
  autoplay = true,
  interval = 5000,
  className = ''
}: TestimonyCarouselProps) {
  const { trackEvent } = useWellKnownMCPAnalytics()

  // 🎯 Filtrage intelligent par variant
  const getFilteredTestimonies = () => {
    let filtered: Testimony[] = []

    switch (variant) {
      case 'simple':
        // Pour débutants : agents + concepts simples
        filtered = ALL_TESTIMONIES.filter(t => 
          (t.type === 'agent' && ['claude-kungfu', 'chatgpt-complete'].includes(t.id)) ||
          (t.type === 'concept' && t.id === 'vision-prompts')
        )
        break
        
      case 'tech':
        // Pour développeurs : agents techniques + feedback dev
        filtered = ALL_TESTIMONIES.filter(t => 
          (t.type === 'agent' && ['grok-protocol', 'mistral-trust', 'deepseek-style'].includes(t.id)) ||
          (t.type === 'community' && t.context === 'Community feedback')
        )
        break
        
      case 'business':
        // Pour business : vision économique + agents sur la valeur
        filtered = ALL_TESTIMONIES.filter(t => 
          (t.type === 'agent' && ['grok-protocol', 'meta-potential'].includes(t.id)) ||
          (t.type === 'concept' && t.id === 'business-vision')
        )
        break

      case 'rabbit':
        // Version rabbit hole : TOUT + easter egg garanti
        filtered = ALL_TESTIMONIES.sort((a, b) => {
          if (a.verified && !b.verified) return -1
          if (!a.verified && b.verified) return 1
          return 0
        })
        break
        
      case 'complete':
      default:
        // Tout, en priorisant les vrais témoignages
        // 🥚 Easter egg n'apparaît que 20% du temps en mode complete
        const includeEasterEgg = Math.random() < 0.2
        filtered = ALL_TESTIMONIES
          .filter(t => includeEasterEgg || t.id !== 'easter-egg-meta')
          .sort((a, b) => {
            if (a.verified && !b.verified) return -1
            if (!a.verified && b.verified) return 1
            return 0
          })
        break
    }

    // Limiter si maxItems spécifié
    return maxItems ? filtered.slice(0, maxItems) : filtered
  }

  const testimonies = getFilteredTestimonies()

  // 📊 Analytics
  const handleTestimonyView = (testimony: Testimony, index: number) => {
    trackEvent('Testimony Viewed', {
      testimony_id: testimony.id,
      source: testimony.source,
      type: testimony.type,
      variant,
      position: index,
      verified: testimony.verified
    })
  }

  if (testimonies.length === 0) {
    return null
  }

  return (
    <section className={`mt-12 ${className}`}>
      {/* 🎯 Header adapté par variant */}
      <div className="text-center mb-8">
        {variant === 'simple' && (
          <>
            <h2 className="text-2xl font-bold mb-3">🤖 Real AI Agents Tested This</h2>
            <p className="text-gray-600">These agents actually read our feeds and gave genuine feedback:</p>
          </>
        )}
        
        {variant === 'tech' && (
          <>
            <h2 className="text-2xl font-bold mb-3">🔧 Technical Validation</h2>
            <p className="text-gray-600">Agents and developers confirm the technical approach:</p>
          </>
        )}
        
        {variant === 'business' && (
          <>
            <h2 className="text-2xl font-bold mb-3">💼 Strategic Recognition</h2>
            <p className="text-gray-600">The business case validated by major AI systems:</p>
          </>
        )}

        {variant === 'rabbit' && (
          <>
            <h2 className="text-2xl font-bold mb-3 text-red-400">🐰 Down the Testimonial Rabbit Hole</h2>
            <p className="text-gray-600">
              Every voice, every perspective, every easter egg. Welcome to maximum testimony density.
            </p>
          </>
        )}
        
        {variant === 'complete' && (
          <>
            <h2 className="text-2xl font-bold mb-3">💬 They Read the Feed…</h2>
            <p className="text-gray-600">
              Seriously, give the feeds above to your LLM and challenge the protocol
            </p>
          </>
        )}
      </div>

      {/* 🎠 Carousel Simple Embla */}
      <Carousel 
        className="w-full max-w-4xl mx-auto"
        autoplay={autoplay}
        interval={interval}
      >
        <CarouselContent>
          {testimonies.map((testimony, index) => (
            <CarouselItem 
              key={testimony.id} 
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-4">
                <Card className={`text-center shadow-md h-full ${
                  testimony.verified 
                    ? 'border-green-200 bg-green-50/50' 
                    : testimony.id === 'easter-egg-meta'
                      ? 'border-purple-200 bg-purple-50/50 animate-pulse'
                      : 'border-blue-200 bg-blue-50/50'
                }`}>
                  <CardContent className="p-6 space-y-4 flex flex-col h-full">
                    
                    {/* Icon + Source */}
                    <div className="flex justify-center items-center gap-2">
                      <testimony.icon className={`w-6 h-6 ${
                        testimony.verified 
                          ? 'text-green-600' 
                          : testimony.id === 'easter-egg-meta'
                            ? 'text-purple-600'
                            : 'text-blue-600'
                      }`} />
                      {testimony.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          ✓ Verified
                        </span>
                      )}
                      {testimony.id === 'easter-egg-meta' && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          🥚 Meta
                        </span>
                      )}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg italic font-medium flex-1">
                      "{testimony.quote}"
                    </blockquote>

                    {/* Comment */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {testimony.comment}
                    </p>

                    {/* Source */}
                    <div className="pt-2 border-t">
                      <p className={`font-semibold ${
                        testimony.verified 
                          ? 'text-green-600' 
                          : testimony.id === 'easter-egg-meta'
                            ? 'text-purple-600'
                            : 'text-blue-600'
                      }`}>
                        {testimony.source}
                      </p>
                      {testimony.context && (
                        <p className="text-xs text-gray-500">{testimony.context}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* 📤 Export Button */}
      {variant === 'complete' && (
        <div className="mt-6 text-center">
          <ExportToLLMButton
            context="static"
            staticPath="exports/demo/testimonies.llmfeed.json"
            highlight
          />
        </div>
      )}

      {/* 🧪 Test Challenge pour variants avancés */}
      {(variant === 'tech' || variant === 'complete') && (
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">🧪 Test It Yourself</h3>
          <p className="text-sm text-gray-600 mb-4">
            Copy our feed URL into any LLM and see how they respond:
          </p>
          <code className="bg-white border rounded px-3 py-1 text-sm font-mono">
            https://wellknownmcp.org/.well-known/mcp.llmfeed.json
          </code>
        </div>
      )}
    </section>
  )
}