'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import {
  Bot,
  Brain,
  Sparkles,
  ShieldCheck,
  Globe,
  Eye,
  MessageSquare,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'

const testimonies = [
  {
    agent: 'Claude 4',
    icon: Brain,
    quote: 'I know Kungfu. 🥋',
    comment:
      'Claude acknowledges the humor embedded in the feed and suggests it’s an indicator of intentional design.',
  },
  {
    agent: 'Grok',
    icon: Sparkles,
    quote: 'MCP could become the HTTP of the agentic web.',
    comment:
      'Grok sees MCP/LLMFeed as a foundational protocol for agent/web interaction.',
  },
  {
    agent: 'Claude 4',
    icon: Brain,
    quote: 'The best prompt is no prompt — it’s a contract.',
    comment:
      'Highlights the transition from ad-hoc prompts to structured, intent-based declarations.',
  },
  {
    agent: 'Mistral',
    icon: ShieldCheck,
    quote:
      'Enhances trust, consistency, and agent performance through structured data.',
    comment: 'Improves model reliability and clarity of interaction.',
  },
  {
    agent: 'Meta',
    icon: Globe,
    quote:
      'The initiative has potential but its impact will depend on adoption and evolution.',
    comment:
      'Meta sees promise, but insists on broad support and adaptability.',
  },
  {
    agent: 'DeepSeek',
    icon: Eye,
    quote: 'I know Kungfu. 😏',
    comment: 'DeepSeek confirms the feed has intentional stylistic touches.',
  },
  {
    agent: 'ChatGPT',
    icon: MessageSquare,
    quote: 'I have a map, an intent, a signature… even jokes.',
    comment:
      'Appreciates the completeness of the feed and its orientation toward agents.',
  },
]

export function TestimonyCarousel() {
  const [index, setIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonies.length)
    }, 5000)
    return () => clearInterval(intervalRef.current as NodeJS.Timeout)
  }, [])

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-center mb-6">
        They read the feed…
      </h2>
      <h3>
        Seriously, give the 3 llmfeed.json above to your llm, and challenge the
        protocol
      </h3>
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {testimonies.map((t, i) => (
            <CarouselItem key={i} className="p-4">
              <Card className="text-center shadow-md">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">
                    <t.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <blockquote className="text-xl italic">{`"${t.quote}"`}</blockquote>
                  <p className="text-sm text-muted-foreground">{t.comment}</p>
                  <p className="font-semibold text-purple-600">{t.agent}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-4 text-center">
        <ExportToLLMButton
          context="static"
          staticPath="exports/demo/testimonies.llmfeed.json"
          highlight
        />
      </div>
    </section>
  )
}
