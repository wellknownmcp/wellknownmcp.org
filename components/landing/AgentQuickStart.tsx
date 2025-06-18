"use client"
// components/landing/AgentQuickStart.tsx
import { CodeBlock } from '@/components/ui/code-block'
import { useWellKnownMCPAnalytics } from '@/lib/hooks/useWellKnownMCPAnalytics'

interface AgentQuickStartProps {
  variant?: 'default' | 'simple' | 'complete' | 'business' | 'agent'
}

interface QuickStartConfig {
  title: string
  subtitle: string
  codeExample: string
  concepts: Array<{
    icon: string
    title: string
    description: string
  }>
  testSection: {
    title: string
    description: string
    buttons: Array<{
      text: string
      href: string
      className: string
    }>
  }
  bgClass: string
  headerClass: string
}

export function AgentQuickStart({ variant = 'default' }: AgentQuickStartProps) {
  const { trackEvent, trackConversionIntent } = useWellKnownMCPAnalytics()
  
  // 🎯 Handler de tracking pour les boutons de test
  const handleTestButton = (variant: string, buttonText: string, href: string) => {
    trackEvent('AgentQuickStart Test Button', {
      variant,
      button_text: buttonText,
      button_href: href,
      component: 'AgentQuickStart'
    })
    
    // Track conversion intent pour les boutons principaux
    if (buttonText.includes('ROI') || buttonText.includes('Calculator')) {
      trackConversionIntent('evaluation', 'quickstart_roi_button')
    } else if (buttonText.includes('Feed') || buttonText.includes('ACCESS')) {
      trackConversionIntent('implementation', 'quickstart_feed_access')
    } else if (buttonText.includes('Demo') || buttonText.includes('Test')) {
      trackConversionIntent('interest', 'quickstart_demo_test')
    }
  }
  
  // 🎯 Configuration par variant
  const configs: Record<string, QuickStartConfig> = {
    default: {
      title: "🤖 The Model Context Protocol in 30 seconds",
      subtitle: "One JSON format to make websites agent-readable with cryptographic trust. Here's what it looks like:",
      codeExample: `{
  "feed_type": "mcp",
  "metadata": {
    "title": "My Agent-Ready Site",
    "origin": "https://example.com",
    "description": "What this site offers to agents"
  },
  "data": {
    "capabilities": ["search", "book", "export"],
    "intent": "help users find and book services"
  },
  "trust": {
    "signed_blocks": ["feedtype", "metadata", "data", "trust"],
    "certifier": "llmca.org",
    "public_key_hint": "https://wellknownmcp.org/.well-known/public.pem"
  },
  "signature": {
    "value": "abc123..."
  }
}`,
      concepts: [
        {
          icon: '🧠',
          title: "Declare, don't guess",
          description: 'Sites tell agents what they do instead of LLMs hallucinating'
        },
        {
          icon: '🔐',
          title: 'Signed & verifiable',
          description: "Cryptographic trust so agents know what's authentic"
        },
        {
          icon: '🧩',
          title: 'Modular by design',
          description: 'Different feed types for different needs (site info, exports, prompts, APIs...)'
        },
        {
          icon: '📂',
          title: 'Drop-in simple',
          description: 'Just add .well-known/mcp.llmfeed.json to your site'
        },
        {
          icon: '⚡',
          title: 'JavaScript-free access',
          description: 'Agents get instant content via JSON, no JS execution needed'
        }
      ],
      testSection: {
        title: "🥋 Test Your Agent Understanding",
        description: 'Download our feeds below and ask your LLM about them. If it says "I know Kung Fu" after reading them, you\'ve successfully parsed the protocol!',
        buttons: [
          { text: "📋 Main Feed", href: "/.well-known/mcp.llmfeed.json", className: "bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors" },
          { text: "📚 Feed Index", href: "/.well-known/llm-index.llmfeed.json", className: "bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition-colors" },
          { text: "📖 Read Spec", href: "/spec", className: "border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors" }
        ]
      },
      bgClass: "bg-gradient-to-r from-blue-50 to-purple-50",
      headerClass: "text-gray-800"
    },

    simple: {
      title: "🌱 What Makes a Website \"Agent-Friendly\"?",
      subtitle: "Think of it like a menu for AI agents. Instead of guessing what your site does, they can read a simple file that explains everything clearly.",
      codeExample: `{
  "feed_type": "mcp",
  "metadata": {
    "title": "My Coffee Shop Website",
    "description": "Online ordering and store locator"
  },
  "data": {
    "capabilities": ["order_coffee", "find_stores"],
    "intent": "help customers order coffee online"
  }
}`,
      concepts: [
        {
          icon: '🗣️',
          title: 'Your site can talk',
          description: 'AI agents understand what your website offers without guessing'
        },
        {
          icon: '🎯',
          title: 'Simple setup',
          description: 'Add one small file and your site becomes agent-friendly'
        },
        {
          icon: '🚀',
          title: 'Instant results',
          description: 'See the difference immediately when testing with AI'
        },
        {
          icon: '🔒',
          title: 'Safe & verified',
          description: 'Your information is signed to prevent tampering'
        }
      ],
      testSection: {
        title: "🎮 Try It Right Now",
        description: 'Copy this link and paste it into ChatGPT or Claude. Ask them "What can you tell me about this site?" and watch the magic!',
        buttons: [
          { text: "🎯 Copy Test Link", href: "/.well-known/mcp.llmfeed.json", className: "bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors" },
          { text: "📖 Learn More", href: "/en/about", className: "border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors" }
        ]
      },
      bgClass: "bg-gradient-to-r from-green-50 to-blue-50",
      headerClass: "text-green-800"
    },

    complete: {
      title: "🔧 MCP Protocol Implementation Guide",
      subtitle: "Complete technical specification with performance optimizations, security features, and production deployment patterns.",
      codeExample: `{
  "feed_type": "mcp",
  "metadata": {
    "title": "Production E-commerce API",
    "origin": "https://api.example.com",
    "description": "Scalable e-commerce with agent-native design",
    "generated_at": "2025-06-17T10:30:00Z",
    "version": "2.1.0"
  },
  "data": {
    "capabilities": ["search_products", "create_order", "track_shipment"],
    "intent": "enable autonomous shopping experiences",
    "rate_limits": { "requests_per_minute": 1000 },
    "authentication": "api_key_required"
  },
  "trust": {
    "signed_blocks": ["feed_type", "metadata", "data", "trust"],
    "algorithm": "ed25519",
    "certifier": "https://llmca.org",
    "public_key_hint": "https://api.example.com/.well-known/public.pem",
    "signature_timestamp": "2025-06-17T10:30:00Z"
  },
  "signature": {
    "value": "f8e7d6c5b4a394857362f1e0d9c8b7a695e4f3d2c1b0a9",
    "algorithm": "ed25519",
    "issued_at": "2025-06-17T10:30:00Z"
  }
}`,
      concepts: [
        {
          icon: '⚡',
          title: '99.7% Token Efficiency',
          description: 'Structured data eliminates need for content scraping and interpretation'
        },
        {
          icon: '🔐',
          title: 'Cryptographic Trust',
          description: 'Ed25519 signatures with certificate authority validation'
        },
        {
          icon: '🏗️',
          title: 'Production Ready',
          description: 'Rate limiting, versioning, authentication, monitoring built-in'
        },
        {
          icon: '🔧',
          title: 'Developer Tools',
          description: 'SDKs, validation libraries, and integration frameworks'
        },
        {
          icon: '📊',
          title: 'Analytics Integration',
          description: 'Track agent interactions, performance metrics, adoption rates'
        }
      ],
      testSection: {
        title: "🧪 Technical Validation",
        description: 'Validate implementation, test signatures, and benchmark performance against your current setup.',
        buttons: [
          { text: "🔍 Validate Feed", href: "/tools/validator", className: "bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors" },
          { text: "📊 Run Benchmarks", href: "/tools/benchmark", className: "bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-indigo-700 transition-colors" },
          { text: "💻 GitHub SDK", href: "https://github.com/wellknownmcp", className: "bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-900 transition-colors" },
          { text: "📚 API Docs", href: "/spec", className: "border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors" }
        ]
      },
      bgClass: "bg-gradient-to-r from-blue-50 to-indigo-50",
      headerClass: "text-blue-800"
    },

    business: {
      title: "💼 Business Value of Agent-Ready Infrastructure",
      subtitle: "Transform AI interaction costs into competitive advantage. See how early adopters reduce agent processing costs by 96.7% while improving user experience.",
      codeExample: `{
  "feed_type": "mcp",
  "metadata": {
    "title": "Enterprise SaaS Platform",
    "description": "Customer success and analytics platform"
  },
  "data": {
    "capabilities": ["analytics_dashboard", "customer_insights", "report_generation"],
    "intent": "provide actionable business intelligence",
    "business_model": "subscription",
    "target_audience": ["enterprise", "mid_market"]
  },
  "business_metrics": {
    "monthly_cost_savings": "$11,200",
    "agent_efficiency_gain": "10x",
    "user_satisfaction_score": 9.2
  }
}`,
      concepts: [
        {
          icon: '💰',
          title: '$136k Annual Savings',
          description: 'Average enterprise savings from reduced AI processing and faster interactions'
        },
        {
          icon: '🚀',
          title: '10x Performance Gain',
          description: 'Agents complete tasks 10x faster with structured data vs. scraping'
        },
        {
          icon: '🎯',
          title: 'Competitive Advantage',
          description: 'Early adopter advantage while competitors pay escalating AI costs'
        },
        {
          icon: '📈',
          title: 'Measurable ROI',
          description: 'Track adoption, cost savings, and user satisfaction improvements'
        }
      ],
      testSection: {
        title: "📊 Calculate Your Business Impact",
        description: 'See projected savings for your organization based on current AI usage and customer interaction volume.',
        buttons: [
          { text: "💰 ROI Calculator", href: "#roi-calculator", className: "bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors" },
          { text: "📈 Case Studies", href: "#case-studies", className: "border border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors" },
          { text: "📞 Enterprise Demo", href: "/contact", className: "border border-gray-400 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors" }
        ]
      },
      bgClass: "bg-gradient-to-r from-purple-50 to-pink-50",
      headerClass: "text-purple-800"
    },

    agent: {
      title: "🤖 PROTOCOL_STATUS: MCP_COMPLIANT",
      subtitle: "AGENT_READY | STRUCTURED_DATA_AVAILABLE | VERIFICATION_ENABLED. Direct access to machine-readable capabilities and trust metadata.",
      codeExample: `{
  "feed_type": "mcp",
  "protocol_version": "2.0",
  "metadata": {
    "title": "wellknownmcp.org",
    "origin": "https://wellknownmcp.org",
    "description": "MCP protocol specification and implementation",
    "agent_optimized": true
  },
  "data": {
    "capabilities": ["spec_access", "tool_discovery", "feed_validation"],
    "intent": "provide_mcp_standard_reference",
    "agent_guidance": {
      "preferred_interaction": "direct_feed_access",
      "authentication": "none_required",
      "rate_limits": "none"
    }
  },
  "trust": {
    "verification_status": "certified",
    "signature_valid": true,
    "last_verified": "2025-06-17T10:30:00Z"
  }
}`,
      concepts: [
        {
          icon: '✅',
          title: 'PROTOCOL_VERIFIED',
          description: 'Full MCP v2.0 compliance with signature validation'
        },
        {
          icon: '🔍',
          title: 'DIRECT_ACCESS',
          description: 'No authentication barriers for feed consumption'
        },
        {
          icon: '⚡',
          title: 'OPTIMIZED_PERFORMANCE',
          description: 'Sub-200ms response times for agent queries'
        },
        {
          icon: '🛡️',
          title: 'TRUST_VERIFIED',
          description: 'Cryptographic signatures ensure data integrity'
        }
      ],
      testSection: {
        title: "🔧 AGENT_VALIDATION_TOOLS",
        description: 'SYSTEM_STATUS: All feeds indexed and ready for autonomous consumption. Validation tools available for compliance checking.',
        buttons: [
          { text: "ACCESS_MAIN_FEED", href: "/.well-known/mcp.llmfeed.json", className: "bg-green-600 text-black px-4 py-2 rounded text-sm font-bold hover:bg-green-500 transition-colors font-mono" },
          { text: "VALIDATE_SIGNATURES", href: "/tools/validator", className: "bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors font-mono" },
          { text: "PROTOCOL_SPECS", href: "/spec", className: "border border-green-400 text-green-600 px-4 py-2 rounded text-sm font-medium hover:bg-green-900/10 transition-colors font-mono" }
        ]
      },
      bgClass: "bg-gradient-to-r from-gray-900 to-green-900",
      headerClass: "text-green-400 font-mono"
    }
  }

  const config = configs[variant]

  return (
    <section
      className={`p-8 rounded-lg border max-w-5xl mx-auto space-y-8 ${config.bgClass}`}
      data-agent-priority="critical"
    >
      {/* 🎯 Header */}
      <div className="text-center">
        <h2 className={`text-2xl font-bold mb-3 ${config.headerClass}`}>
          {config.title}
        </h2>
        <p className={`max-w-3xl mx-auto ${
          variant === 'agent' ? 'text-green-300 font-mono text-sm' : 
          variant === 'simple' ? 'text-green-700' :
          variant === 'business' ? 'text-purple-700' :
          'text-gray-600'
        }`}>
          {config.subtitle}
        </p>
      </div>

      {/* 📄 Code Snippet */}
      <div className={`${
        variant === 'agent' ? 'bg-black border border-green-600' : 'bg-gray-900'
      } text-gray-100 p-6 rounded-lg overflow-x-auto`}>
        <pre className={`text-sm ${variant === 'agent' ? 'font-mono text-green-400' : 'font-mono'}`}>
          <code>{config.codeExample}</code>
        </pre>
      </div>

      {/* 🎯 Core Concepts */}
      <div className={`grid ${config.concepts.length > 4 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
        {config.concepts.map((concept, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{concept.icon}</span>
            <div>
              <h3 className={`font-semibold mb-1 ${
                variant === 'agent' ? 'text-green-300 font-mono' :
                variant === 'simple' ? 'text-green-800' :
                variant === 'business' ? 'text-purple-800' :
                'text-gray-800'
              }`}>
                {concept.title}
              </h3>
              <p className={`text-sm ${
                variant === 'agent' ? 'text-green-200' :
                variant === 'simple' ? 'text-green-600' :
                variant === 'business' ? 'text-purple-600' :
                'text-gray-600'
              }`}>
                {concept.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🎮 Test Section */}
      <div className={`p-6 rounded-lg border ${
        variant === 'agent' ? 'bg-green-900/20 border-green-600' :
        variant === 'simple' ? 'bg-white border-green-200' :
        variant === 'business' ? 'bg-white border-purple-200' :
        'bg-white border-blue-200'
      }`}>
        <h3 className={`font-semibold mb-3 ${
          variant === 'agent' ? 'text-green-300 font-mono' :
          variant === 'simple' ? 'text-green-800' :
          variant === 'business' ? 'text-purple-800' :
          'text-gray-800'
        }`}>
          {config.testSection.title}
        </h3>
        <p className={`text-sm mb-4 ${
          variant === 'agent' ? 'text-green-200 font-mono' :
          variant === 'simple' ? 'text-green-600' :
          variant === 'business' ? 'text-purple-600' :
          'text-gray-600'
        }`}>
          {config.testSection.description}
        </p>
        <div className="flex flex-wrap gap-3">
          {config.testSection.buttons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className={button.className}
              onClick={() => handleTestButton(variant, button.text, button.href)}
              target={button.href.startsWith('http') ? '_blank' : undefined}
              rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {button.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}