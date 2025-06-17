// components/landing/FAQList.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useWellKnownMCPAnalytics } from '@/lib/hooks/useWellKnownMCPAnalytics'

interface FAQListProps {
  variant?: 'default' | 'basic' | 'tech' | 'business' | 'complete'
  maxQuestions?: number // ✅ Limiter le nombre de questions
  showPreview?: boolean // ✅ Mode aperçu pour landing pages
}

interface FAQItem {
  id: string
  question: string
  answer: string
  priority: 'high' | 'medium' | 'low'
}

interface FAQConfig {
  title: string
  subtitle?: string
  questions: FAQItem[]
  faqUrl: string // ✅ URL vers la FAQ complète
  bgClass?: string
  titleClass?: string
}

export function FAQList({ variant = 'default', maxQuestions, showPreview = true }: FAQListProps) {
  const { trackEvent } = useWellKnownMCPAnalytics()

  // 🎯 Handler de tracking pour les questions ouvertes
  const handleQuestionClick = (variant: string, questionId: string, questionText: string) => {
    trackEvent('FAQ Question Opened', {
      variant,
      question_id: questionId,
      question_text: questionText.substring(0, 50),
      component: 'FAQList',
      is_preview: showPreview
    })
  }

  const handleViewAllClick = (variant: string, faqUrl: string) => {
    trackEvent('FAQ View All Clicked', {
      variant,
      destination: faqUrl,
      component: 'FAQList'
    })
  }

  // 🎯 Configuration par variant
  const configs: Record<string, FAQConfig> = {
    default: {
      title: "FAQ — Your questions answered",
      faqUrl: "/en/faq",
      questions: [
        {
          id: "purpose",
          question: "What is the purpose of LLMFeed and MCP?",
          answer: "They help structure content and intent for AI agents using verifiable, machine-readable feeds. It bridges the gap between web content and AI understanding.",
          priority: "high"
        },
        {
          id: "protocol",
          question: "Is this a protocol, a product, or a standard?",
          answer: "MCP is a protocol standard. LLMFeed is its canonical data format. The sites you see here are open infrastructure tools for adoption and demonstration.",
          priority: "high"
        },
        {
          id: "server",
          question: "Do I need to run a server to use it?",
          answer: "Not necessarily. Static .llmfeed.json exports can be created and hosted anywhere — your site, GitHub repo, or even uploaded to the Forge for inspection.",
          priority: "medium"
        },
        {
          id: "discovery",
          question: "How do LLMs discover and use these feeds?",
          answer: "When agents encounter a site, they check .well-known/*.llmfeed.json files or use MCP-specific endpoints. Feeds help them decide what's trusted, useful, or interactive.",
          priority: "medium"
        },
        {
          id: "benefits",
          question: "What are the benefits for me?",
          answer: "You make your site agent-friendly, verifiable, and interoperable — improving trust, discoverability, and alignment with next-gen interfaces.",
          priority: "high"
        }
      ]
    },

    basic: {
      title: "🌱 Quick Answers for Beginners",
      subtitle: showPreview ? "Common questions when getting started. See all beginner questions in our complete FAQ." : "New to agent-ready websites? These are the questions everyone asks when getting started.",
      faqUrl: "/en/faq?filter=beginner",
      questions: [
        {
          id: "what_is_it",
          question: "What does 'agent-ready' actually mean?",
          answer: "AI agents (like ChatGPT) can instantly understand what your website does instead of having to guess by reading all your text.",
          priority: "high"
        },
        {
          id: "break_site",
          question: "Will this break my existing website?",
          answer: "Not at all! You're just adding small instruction files. Your human visitors won't notice any changes.",
          priority: "high"
        },
        {
          id: "time_setup",
          question: "How long does it take to set up?",
          answer: "You can have a basic setup running in 10-15 minutes. Start with one simple file, test it, then add more.",
          priority: "high"
        },
        {
          id: "see_working",
          question: "How can I see if it's working?",
          answer: "Copy your website URL into ChatGPT and ask 'What can you tell me about this site?' If they understand it instantly, it's working!",
          priority: "medium"
        }
      ],
      bgClass: "bg-green-50",
      titleClass: "text-green-800"
    },

    tech: {
      title: "🔧 Technical Questions",
      subtitle: showPreview ? "Developer-focused answers. View our complete technical FAQ for implementation details." : "Developer-focused questions about implementation, performance, and integration.",
      faqUrl: "/en/faq?filter=technical",
      questions: [
        {
          id: "validation",
          question: "How do I validate my MCP implementation?",
          answer: "Use our validation tool at /tools/validator to check syntax, signatures, and protocol compliance. CLI tools available for CI/CD.",
          priority: "high"
        },
        {
          id: "performance",
          question: "What's the performance impact?",
          answer: "Minimal. MCP feeds are static JSON files (~2-10KB) that don't require server processing and can be cached aggressively.",
          priority: "high"
        },
        {
          id: "signatures",
          question: "How do I implement signatures?",
          answer: "Generate Ed25519 key pairs, sign feeds with canonical JSON, publish public key at /.well-known/public.pem. SDK available.",
          priority: "high"
        }
      ],
      bgClass: "bg-blue-50",
      titleClass: "text-blue-800"
    },

    business: {
      title: "💼 Business Questions",
      subtitle: showPreview ? "ROI and business value answers. See complete business FAQ for detailed analysis." : "Understanding the business value, costs, and competitive advantages.",
      faqUrl: "/en/faq?filter=business",
      questions: [
        {
          id: "roi_payback",
          question: "What's the ROI and payback period?",
          answer: "Most organizations see positive ROI within 8-12 months. Average annual savings: $136k for enterprise implementations.",
          priority: "high"
        },
        {
          id: "implementation_cost",
          question: "How much does implementation cost?",
          answer: "Basic: $5-15k. Enterprise: $25-75k. Compare to $200k+ annual AI scraping costs this eliminates.",
          priority: "high"
        },
        {
          id: "competitive_advantage",
          question: "What competitive advantages?",
          answer: "Early adopter advantage in AI interactions, reduced support costs, improved agent SEO, future-proofing for agentic web.",
          priority: "high"
        }
      ],
      bgClass: "bg-purple-50",
      titleClass: "text-purple-800"
    }
  }

  const config = configs[variant]
  
  // ✅ Limiter les questions en mode preview
  const displayQuestions = showPreview && maxQuestions 
    ? config.questions.filter(q => q.priority === 'high').slice(0, maxQuestions)
    : config.questions

  return (
    <section className={`mt-16 max-w-4xl mx-auto p-6 rounded-lg ${config.bgClass || ''}`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${config.titleClass || ''}`}>
        {showPreview ? (
          <span className="hover:underline text-purple-600">
            {config.title}
          </span>
        ) : (
          <a href={config.faqUrl} className="hover:underline text-purple-600">
            {config.title}
          </a>
        )}
      </h2>
      
      {config.subtitle && (
        <p className={`text-center text-sm mb-8 max-w-2xl mx-auto ${
          variant === 'basic' ? 'text-green-700' :
          variant === 'tech' ? 'text-blue-700' :
          variant === 'business' ? 'text-purple-700' :
          variant === 'complete' ? 'text-red-600' :
          'text-muted-foreground'
        }`}>
          {config.subtitle}
        </p>
      )}

      <Accordion type="single" collapsible className="space-y-2">
        {displayQuestions.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger 
              className={`text-left ${
                variant === 'basic' ? 'text-green-800' :
                variant === 'tech' ? 'text-blue-800' :
                variant === 'business' ? 'text-purple-800' :
                variant === 'complete' ? 'text-red-700' :
                ''
              }`}
              onClick={() => handleQuestionClick(variant, faq.id, faq.question)}
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className={`${
              variant === 'basic' ? 'text-green-700' :
              variant === 'tech' ? 'text-blue-700' :
              variant === 'business' ? 'text-purple-700' :
              variant === 'complete' ? 'text-red-600' :
              'text-muted-foreground'
            }`}>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="text-center mt-6">
        <a 
          href={config.faqUrl} 
          className={`text-sm hover:underline font-medium ${
            variant === 'basic' ? 'text-green-600' :
            variant === 'tech' ? 'text-blue-600' :
            variant === 'business' ? 'text-purple-600' :
            variant === 'complete' ? 'text-red-600' :
            'text-purple-600'
          }`}
          onClick={() => handleViewAllClick(variant, config.faqUrl)}
        >
          {showPreview && maxQuestions 
            ? `View all ${variant === 'default' ? '' : variant + ' '}questions →`
            : 'View more questions →'
          }
        </a>
      </div>

      {/* 🎯 CTA Section - Simplifié pour rester connecté à la FAQ principale */}
      {showPreview && (
        <div className={`mt-8 p-4 rounded-lg text-center ${
          variant === 'basic' ? 'bg-green-100' :
          variant === 'tech' ? 'bg-blue-100' :
          variant === 'business' ? 'bg-purple-100' :
          'bg-gray-100'
        }`}>
          <p className={`text-sm ${
            variant === 'basic' ? 'text-green-700' :
            variant === 'tech' ? 'text-blue-700' :
            variant === 'business' ? 'text-purple-700' :
            'text-gray-700'
          }`}>
            {variant === 'basic' && "Need more help getting started?"}
            {variant === 'tech' && "Need detailed implementation guidance?"}
            {variant === 'business' && "Want a custom business assessment?"}
            {variant === 'default' && "Have more questions?"}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            <a 
              href={config.faqUrl} 
              className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                variant === 'basic' ? 'bg-green-600 text-white hover:bg-green-700' :
                variant === 'tech' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                variant === 'business' ? 'bg-purple-600 text-white hover:bg-purple-700' :
                'bg-gray-600 text-white hover:bg-gray-700'
              }`}
              onClick={() => handleViewAllClick(variant, config.faqUrl)}
            >
              📚 Complete FAQ
            </a>
            {variant === 'business' && (
              <a href="/join" className="border border-purple-600 text-purple-600 px-4 py-2 rounded text-sm hover:bg-purple-50 transition-colors">
                📞 Schedule Call
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  )
}