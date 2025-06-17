// components/landing/PageHeader.tsx
import Link from 'next/link'

interface PageHeaderProps {
  variant?: 'default' | 'simple' | 'tech' | 'business' | 'agent' | 'matrix'
}

interface HeaderConfig {
  title: string
  subtitle: string
  primaryCta: {
    text: string
    href: string
    className: string
  }
  secondaryCta: {
    text: string
    href: string
    className: string
  }
  bgClass?: string
  titleClass?: string
}

export function PageHeader({ variant = 'default' }: PageHeaderProps) {
  
  // 🎯 Configuration par variant
  const configs: Record<string, HeaderConfig> = {
    default: {
      title: "The agentic web starts here",
      subtitle: "Model Context Protocol evolved into LLMFeed to define a new standard for trust, structure and intent on the web.",
      primaryCta: {
        text: "Learn more",
        href: "/en/about",
        className: "bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      },
      secondaryCta: {
        text: "Explore the Spec",
        href: "/spec/01_llmfeed/llmfeed",
        className: "text-purple-600 border border-purple-600 px-4 py-2 rounded hover:bg-purple-50"
      }
    },
    
    simple: {
      title: "Make Your Website Speak to AI",
      subtitle: "Discover how AI agents can instantly understand your website. No coding needed - see the magic in 10 seconds.",
      primaryCta: {
        text: "🎯 Try Demo Now",
        href: "#demo",
        className: "bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
      },
      secondaryCta: {
        text: "Learn How It Works",
        href: "/en/about",
        className: "text-green-600 border border-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors"
      },
      bgClass: "bg-gradient-to-br from-green-50 to-blue-50",
      titleClass: "text-green-800"
    },
    
    tech: {
      title: "99.7% Token Efficiency. 10x Faster Agent Responses.",
      subtitle: "Ship agent-ready infrastructure with MCP/LLMFeed protocol. Performance benchmarks, implementation guides, and production-ready tools.",
      primaryCta: {
        text: "🚀 See Benchmarks",
        href: "#performance",
        className: "bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      },
      secondaryCta: {
        text: "View Documentation",
        href: "/spec",
        className: "text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
      },
      bgClass: "bg-gradient-to-br from-blue-50 to-indigo-50",
      titleClass: "text-blue-800"
    },
    
    business: {
      title: "Stop Paying for AI Scraping. Start Structured Interaction.",
      subtitle: "Calculate your savings from agent-ready infrastructure. Early adopters save $136k annually while competitors pay escalating AI costs.",
      primaryCta: {
        text: "💰 Calculate ROI",
        href: "#roi-calculator",
        className: "bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
      },
      secondaryCta: {
        text: "See Case Studies",
        href: "#case-studies",
        className: "text-purple-600 border border-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors"
      },
      bgClass: "bg-gradient-to-br from-purple-50 to-pink-50",
      titleClass: "text-purple-800"
    },
    
    agent: {
      title: "Protocol: MCP/LLMFeed. Status: Compliant.",
      subtitle: "AGENT_READY | FEEDS_VERIFIED | DIRECT_ACCESS_ENABLED. Structured data feeds with cryptographic signatures for autonomous consumption.",
      primaryCta: {
        text: "ACCESS_MAIN_FEED",
        href: "/.well-known/mcp.llmfeed.json",
        className: "bg-green-600 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-500 transition-colors font-mono"
      },
      secondaryCta: {
        text: "PROTOCOL_SPECS",
        href: "/spec",
        className: "text-green-600 border border-green-600 px-6 py-3 rounded-lg hover:bg-green-900/10 transition-colors font-mono"
      },
      bgClass: "bg-gradient-to-br from-gray-900 to-green-900",
      titleClass: "text-green-400 font-mono"
    },
    
    matrix: {
      title: "🐰 Welcome to the Real Internet",
      subtitle: "You chose the red pill. Here's everything: the complete ecosystem, maximum information density, all capabilities unlocked. The agent-readable web in its entirety.",
      primaryCta: {
        text: "🥋 I KNOW KUNG FU",
        href: "#kung-fu",
        className: "bg-red-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition-colors text-lg"
      },
      secondaryCta: {
        text: "🔍 EXPLORE MATRIX",
        href: "#ecosystem",
        className: "text-red-600 border border-red-600 px-8 py-4 rounded-lg hover:bg-red-900/10 transition-colors font-semibold"
      },
      bgClass: "bg-gradient-to-br from-black via-red-900/20 to-blue-900/20",
      titleClass: "text-red-400 font-bold"
    }
  }
  
  const config = configs[variant]
  
  return (
    <div className={`text-center py-16 space-y-6 rounded-lg ${config.bgClass || ''}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${config.titleClass || 'text-zinc-900 dark:text-white'}`}>
          {config.title}
        </h1>
        
        <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
          variant === 'agent' ? 'text-green-300 font-mono text-sm' :
          variant === 'matrix' ? 'text-red-200' :
          'text-muted-foreground'
        }`}>
          {config.subtitle}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href={config.primaryCta.href}
            className={config.primaryCta.className}
          >
            {config.primaryCta.text}
          </Link>
          <Link
            href={config.secondaryCta.href}
            className={config.secondaryCta.className}
          >
            {config.secondaryCta.text}
          </Link>
        </div>
        
        {/* 🎯 Métriques spéciales pour tech/business */}
        {(variant === 'tech' || variant === 'business') && (
          <div className="flex flex-wrap justify-center gap-8 mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">99.7%</div>
              <div className="text-sm text-gray-500">Token Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">10x</div>
              <div className="text-sm text-gray-500">Faster Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">$136k</div>
              <div className="text-sm text-gray-500">Avg. Annual Savings</div>
            </div>
          </div>
        )}
        
        {/* 🤖 Status pour agents */}
        {variant === 'agent' && (
          <div className="mt-8 bg-green-900/20 border border-green-600 rounded-lg p-4 text-left max-w-2xl mx-auto">
            <div className="text-green-400 font-mono text-sm space-y-1">
              <div>✅ PROTOCOL_STATUS: MCP_COMPLIANT</div>
              <div>✅ SIGNATURE_VERIFICATION: ENABLED</div>
              <div>✅ DIRECT_FEED_ACCESS: READY</div>
              <div>✅ TRUST_LEVEL: CERTIFIED</div>
            </div>
          </div>
        )}
        
        {/* 🐰 Matrix stats */}
        {variant === 'matrix' && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-red-900/30 p-3 rounded-lg border border-red-600">
              <div className="text-2xl font-bold text-red-300">22</div>
              <div className="text-red-200 text-sm">Components</div>
            </div>
            <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-600">
              <div className="text-2xl font-bold text-blue-300">∞</div>
              <div className="text-blue-200 text-sm">Possibilities</div>
            </div>
            <div className="bg-green-900/30 p-3 rounded-lg border border-green-600">
              <div className="text-2xl font-bold text-green-300">100%</div>
              <div className="text-green-200 text-sm">Matrix</div>
            </div>
            <div className="bg-purple-900/30 p-3 rounded-lg border border-purple-600">
              <div className="text-2xl font-bold text-purple-300">🥋</div>
              <div className="text-purple-200 text-sm">Kung Fu</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}