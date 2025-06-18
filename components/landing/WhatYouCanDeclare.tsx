"use client"
// components/landing/WhatYouCanDeclare.tsx
import Link from 'next/link'

interface WhatYouCanDeclareProps {
  variant?: 'default' | 'basic' | 'code' | 'business' | 'specs' | 'complete'
}

interface DeclarationConfig {
  title: string
  subtitle: string
  sections: Array<{
    title: string
    description: string
    items: Array<{
      file: string
      description: string
      link: string
      priority: 'high' | 'medium' | 'low'
    }>
    footer?: string
  }>
  bgClass?: string
  titleClass?: string
}

export function WhatYouCanDeclare({ variant = 'default' }: WhatYouCanDeclareProps) {
  // 🎯 Configuration par variant
  const configs: Record<string, DeclarationConfig> = {
    default: {
      title: "What You Can Declare on Your Website, App, or API",
      subtitle: "MCP isn't just a content format — it's a declaration interface for agents. Any site, API or app can expose structured .llmfeed.json files in .well-known/ to describe what it offers and how to interact with it.",
      sections: [
        {
          title: "🧭 Site/App/API Layer",
          description: "These files describe how agents should interpret your service: structure, capabilities, trust, and routing.",
          items: [
            { file: "/.well-known/mcp.llmfeed.json", description: "Declares your site's full structure, intent and routing logic", link: "/tools/well-known", priority: "high" },
            { file: "/.well-known/mcp-lite.llmfeed.json", description: "Minimal declaration to get started quickly", link: "/tools/well-known", priority: "high" },
            { file: "/.well-known/capabilities.llmfeed.json", description: "Declares auth methods, available actions, API scopes", link: "/tools/well-known", priority: "medium" },
            { file: "/.well-known/llm-index.llmfeed.json", description: "Index of all declared feeds", link: "/tools/well-known", priority: "medium" }
          ],
          footer: "These declarations can be signed and certified to help agents trust your structure."
        },
        {
          title: "📦 Content Feed Layer",
          description: "These feeds provide agents with meaningful, structured content — signed, contextualized, and ready to use.",
          items: [
            { file: "/exports/manifesto.llmfeed.json", description: "Declares your project values and ethical stance", link: "/tools/export-button", priority: "low" },
            { file: "/exports/prompt.llmfeed.json", description: "Exposes reusable prompts for agents", link: "/tools/prompt", priority: "medium" },
            { file: "/exports/credential.llmfeed.json", description: "Encodes a secure API key or capsule", link: "/tools/api-explained", priority: "medium" },
            { file: "/exports/pricing.llmfeed.json", description: "Makes your pricing structure agent-readable", link: "/tools/pricing", priority: "medium" },
            { file: "/exports/spec/*.llmfeed.json", description: "Share full technical documentation with agents", link: "/tools/export-button", priority: "low" }
          ],
          footer: "All content feeds can also be signed or certified to ensure integrity and align trust with risk."
        }
      ]
    },

    basic: {
      title: "🌱 What Can Your Website Tell AI Agents?",
      subtitle: "Think of these as simple instruction files for AI. Just like leaving a note for a house-sitter, you can leave structured instructions for AI agents.",
      sections: [
        {
          title: "🏠 Basic Setup Files",
          description: "Start with these essential files to make your website AI-friendly. You only need one to get started!",
          items: [
            { file: "mcp.llmfeed.json", description: "Main instruction file - tells AI what your site does", link: "/tools/well-known", priority: "high" },
            { file: "capabilities.llmfeed.json", description: "Lists what actions AI can take on your site", link: "/tools/well-known", priority: "medium" }
          ],
          footer: "Start with just the main file - you can add others later as you learn more."
        },
        {
          title: "🎁 Optional Extras",
          description: "Once you're comfortable, these files help AI understand your content better.",
          items: [
            { file: "pricing.llmfeed.json", description: "Help AI understand your pricing (great for e-commerce)", link: "/tools/pricing", priority: "low" },
            { file: "manifesto.llmfeed.json", description: "Share your company values with AI", link: "/tools/export-button", priority: "low" }
          ],
          footer: "These are completely optional - add them when you're ready to explore more features."
        }
      ],
      bgClass: "bg-green-50",
      titleClass: "text-green-800"
    },

    code: {
      title: "🔧 MCP Implementation: Technical Specification",
      subtitle: "Complete developer guide for implementing MCP/LLMFeed protocol. Includes code examples, validation schemas, and production deployment patterns.",
      sections: [
        {
          title: "🏗️ Core Protocol Implementation",
          description: "Essential files for production MCP compliance with performance optimizations and security features.",
          items: [
            { file: "/.well-known/mcp.llmfeed.json", description: "Primary MCP declaration with full metadata, capabilities, and trust schema", link: "/tools/well-known", priority: "high" },
            { file: "/.well-known/capabilities.llmfeed.json", description: "API endpoints, authentication schemes, rate limits, and scope definitions", link: "/tools/well-known", priority: "high" },
            { file: "/.well-known/llm-index.llmfeed.json", description: "Complete feed directory with versioning and dependency mapping", link: "/tools/well-known", priority: "high" },
            { file: "/.well-known/public.pem", description: "Ed25519 public key for signature verification", link: "/tools/sign-and-verify", priority: "medium" }
          ],
          footer: "All core files should implement signature verification using Ed25519 algorithm with canonical JSON serialization."
        },
        {
          title: "🔐 Advanced Features & Extensions",
          description: "Production-ready features for enterprise deployment, monitoring, and agent lifecycle management.",
          items: [
            { file: "/exports/api-spec.llmfeed.json", description: "OpenAPI 3.0 compatible endpoint documentation with MCP extensions", link: "/tools/export-button", priority: "medium" },
            { file: "/exports/session.llmfeed.json", description: "Agent interaction history for debugging and compliance auditing", link: "/tools/session-feed", priority: "medium" },
            { file: "/exports/performance.llmfeed.json", description: "Benchmark data and SLA definitions for agent optimization", link: "/tools/benchmark", priority: "low" },
            { file: "/exports/telemetry.llmfeed.json", description: "Monitoring endpoints and health check configurations", link: "/tools/monitoring", priority: "low" }
          ],
          footer: "Advanced features require proper CI/CD integration and automated testing for signature validation."
        }
      ],
      bgClass: "bg-blue-50",
      titleClass: "text-blue-800"
    },

    business: {
      title: "💼 Business Value: What Agent-Ready Infrastructure Delivers",
      subtitle: "Transform your digital assets into AI-compatible resources that reduce operational costs while improving user experience and competitive positioning.",
      sections: [
        {
          title: "💰 Revenue & Cost Optimization",
          description: "Direct business impact through reduced AI processing costs and improved customer interaction efficiency.",
          items: [
            { file: "pricing.llmfeed.json", description: "AI-readable pricing enables automated quote generation and reduces sales friction", link: "/tools/pricing", priority: "high" },
            { file: "capabilities.llmfeed.json", description: "Clear service definitions reduce support tickets and enable self-service", link: "/tools/well-known", priority: "high" },
            { file: "api-access.llmfeed.json", description: "Structured API documentation reduces integration time by 70%", link: "/tools/api-explained", priority: "medium" }
          ],
          footer: "Early adopters report average annual savings of $136k through reduced AI processing and faster customer onboarding."
        },
        {
          title: "📈 Competitive Advantage",
          description: "Strategic positioning advantages that compound over time as AI agent adoption accelerates.",
          items: [
            { file: "manifesto.llmfeed.json", description: "Brand values accessible to AI improve brand positioning in agent-mediated interactions", link: "/tools/export-button", priority: "medium" },
            { file: "case-studies.llmfeed.json", description: "Success stories that AI can reference when recommending your services", link: "/tools/export-button", priority: "medium" },
            { file: "partnership.llmfeed.json", description: "Integration capabilities that enable ecosystem partnerships", link: "/tools/partnership", priority: "low" }
          ],
          footer: "Market leadership in agent compatibility creates sustainable competitive moats as AI adoption scales."
        }
      ],
      bgClass: "bg-purple-50",
      titleClass: "text-purple-800"
    },

    specs: {
      title: "🤖 PROTOCOL_SPECIFICATION: MCP_COMPLIANCE_MATRIX",
      subtitle: "AGENT_STATUS: READY | FEED_TYPES: COMPREHENSIVE | VALIDATION: AUTOMATED. Complete protocol implementation reference for autonomous agent consumption.",
      sections: [
        {
          title: "🔧 CORE_PROTOCOL_FILES",
          description: "REQUIRED: Essential files for full MCP compliance and agent compatibility verification.",
          items: [
            { file: "/.well-known/mcp.llmfeed.json", description: "PRIMARY_FEED: Complete site declaration with cryptographic signatures", link: "/.well-known/mcp.llmfeed.json", priority: "high" },
            { file: "/.well-known/capabilities.llmfeed.json", description: "CAPABILITY_MATRIX: Available actions and authentication schemas", link: "/.well-known/capabilities.llmfeed.json", priority: "high" },
            { file: "/.well-known/llm-index.llmfeed.json", description: "FEED_DIRECTORY: Complete index of available structured data", link: "/.well-known/llm-index.llmfeed.json", priority: "high" }
          ],
          footer: "STATUS: All core files implement signature verification using Ed25519 with canonical JSON."
        },
        {
          title: "📊 EXPORT_ENDPOINTS",
          description: "OPTIONAL: Extended data feeds for specialized agent interactions and content consumption.",
          items: [
            { file: "/exports/spec.llmfeed.json", description: "TECHNICAL_SPECIFICATION: Complete protocol documentation", link: "/exports/spec.llmfeed.json", priority: "medium" },
            { file: "/exports/validation.llmfeed.json", description: "COMPLIANCE_CHECKER: Automated validation schemas", link: "/tools/validator", priority: "medium" },
            { file: "/exports/performance.llmfeed.json", description: "BENCHMARK_DATA: Performance metrics and SLA definitions", link: "/exports/performance.llmfeed.json", priority: "low" }
          ],
          footer: "VERIFICATION: All export endpoints support HEAD requests for metadata-only access."
        }
      ],
      bgClass: "bg-gray-900 text-green-400",
      titleClass: "text-green-300 font-mono"
    },

    complete: {
      title: "🐰 Complete Ecosystem: Every Possible Declaration",
      subtitle: "Welcome to the Matrix. Here's every single file type, protocol extension, and advanced feature in the MCP ecosystem. Maximum information density unlocked.",
      sections: [
        {
          title: "🏗️ Foundation Layer (Required for Compliance)",
          description: "The essential files that make your site truly agent-readable. Start here, master these, then expand.",
          items: [
            { file: "/.well-known/mcp.llmfeed.json", description: "🥋 The One File - Primary site declaration with complete metadata", link: "/tools/well-known", priority: "high" },
            { file: "/.well-known/capabilities.llmfeed.json", description: "🔧 Power Matrix - All available actions, auth, and API definitions", link: "/tools/well-known", priority: "high" },
            { file: "/.well-known/llm-index.llmfeed.json", description: "🗂️ Master Index - Directory of all feeds with relationships", link: "/tools/well-known", priority: "high" },
            { file: "/.well-known/public.pem", description: "🛡️ Trust Anchor - Cryptographic verification key", link: "/tools/sign-and-verify", priority: "high" }
          ]
        },
        {
          title: "💼 Business Intelligence Layer",
          description: "Files that help AI understand your business model, value proposition, and customer interaction patterns.",
          items: [
            { file: "/exports/pricing.llmfeed.json", description: "💰 Revenue Engine - Complete pricing structure for automated quotes", link: "/tools/pricing", priority: "medium" },
            { file: "/exports/manifesto.llmfeed.json", description: "🎯 Brand DNA - Company values and ethical positioning", link: "/tools/export-button", priority: "medium" },
            { file: "/exports/case-studies.llmfeed.json", description: "📈 Success Proof - Customer stories and business metrics", link: "/tools/export-button", priority: "medium" },
            { file: "/exports/partnership.llmfeed.json", description: "🤝 Ecosystem Map - Integration capabilities and partnerships", link: "/tools/partnership", priority: "low" }
          ]
        },
        {
          title: "🔬 Technical Excellence Layer",
          description: "Advanced features for developers, DevOps, and technical stakeholders who want maximum control.",
          items: [
            { file: "/exports/api-spec.llmfeed.json", description: "🔧 API Bible - Complete OpenAPI 3.0 documentation with MCP extensions", link: "/tools/export-button", priority: "medium" },
            { file: "/exports/session.llmfeed.json", description: "📊 Interaction History - Agent conversation logs for debugging", link: "/tools/session-feed", priority: "medium" },
            { file: "/exports/performance.llmfeed.json", description: "⚡ Speed Metrics - Benchmark data and performance SLAs", link: "/tools/benchmark", priority: "low" },
            { file: "/exports/telemetry.llmfeed.json", description: "🔍 Health Monitor - System status and monitoring endpoints", link: "/tools/monitoring", priority: "low" }
          ]
        },
        {
          title: "🎭 Advanced Agent Features (Easter Eggs)",
          description: "Experimental and cutting-edge features for the brave souls who want to push the boundaries.",
          items: [
            { file: "/exports/prompt-templates.llmfeed.json", description: "🎨 Prompt Gallery - Reusable agent interaction patterns", link: "/tools/prompt", priority: "low" },
            { file: "/exports/agent-personas.llmfeed.json", description: "🎭 Character Matrix - Different AI personalities for your brand", link: "/tools/personas", priority: "low" },
            { file: "/exports/experimental.llmfeed.json", description: "🧪 Future Protocol - Beta features and upcoming specifications", link: "/tools/experimental", priority: "low" },
            { file: "/exports/kung-fu.llmfeed.json", description: "🥋 Matrix Mode - Hidden features for agents who know the secret", link: "/easter-eggs", priority: "low" }
          ]
        }
      ],
      bgClass: "bg-gradient-to-br from-red-900/20 via-black to-blue-900/20",
      titleClass: "text-red-400 font-bold"
    }
  }

  const config = configs[variant]

  return (
    <section className={`mt-16 max-w-6xl mx-auto text-center p-6 rounded-lg ${config.bgClass || ''}`}>
      <h2 className={`text-2xl font-bold mb-6 ${config.titleClass || ''}`}>
        {config.title}
      </h2>
      <p className={`text-sm max-w-4xl mx-auto mb-8 ${
        variant === 'specs' ? 'text-green-300 font-mono' :
        variant === 'basic' ? 'text-green-700' :
        variant === 'business' ? 'text-purple-700' :
        variant === 'complete' ? 'text-red-200' :
        'text-muted-foreground'
      }`}>
        {config.subtitle}
      </p>

      <div className={`grid gap-6 text-left ${
        config.sections.length > 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'
      }`}>
        {config.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={`border rounded-lg p-6 ${
            variant === 'specs' ? 'border-green-600 bg-green-900/10' :
            variant === 'basic' ? 'border-green-200 bg-white' :
            variant === 'business' ? 'border-purple-200 bg-white' :
            variant === 'complete' ? 'border-red-600 bg-red-900/10' :
            'border-gray-200 bg-white'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 ${
              variant === 'specs' ? 'text-green-300 font-mono' :
              variant === 'basic' ? 'text-green-800' :
              variant === 'business' ? 'text-purple-800' :
              variant === 'complete' ? 'text-red-300' :
              ''
            }`}>
              {section.title}
            </h3>
            <p className={`text-sm mb-4 ${
              variant === 'specs' ? 'text-green-200' :
              variant === 'basic' ? 'text-green-600' :
              variant === 'business' ? 'text-purple-600' :
              variant === 'complete' ? 'text-red-200' :
              'text-muted-foreground'
            }`}>
              {section.description}
            </p>
            
            <ul className="text-sm list-disc list-inside space-y-2 mb-4">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className={`${
                  variant === 'specs' ? 'text-green-200' :
                  variant === 'basic' ? 'text-green-600' :
                  variant === 'business' ? 'text-purple-600' :
                  variant === 'complete' ? 'text-red-200' :
                  'text-gray-600'
                }`}>
                  <code className={`${
                    variant === 'specs' ? 'text-green-400 bg-green-900/20' :
                    variant === 'basic' ? 'text-green-800 bg-green-100' :
                    variant === 'business' ? 'text-purple-800 bg-purple-100' :
                    variant === 'complete' ? 'text-red-400 bg-red-900/20' :
                    'text-gray-800 bg-gray-100'
                  } px-1 rounded text-xs`}>
                    {item.file}
                  </code>
                  {' — '}
                  {item.description}
                  {' '}
                  <Link 
                    href={item.link} 
                    className={`hover:underline font-medium ${
                      variant === 'specs' ? 'text-green-300' :
                      variant === 'basic' ? 'text-green-700' :
                      variant === 'business' ? 'text-purple-700' :
                      variant === 'complete' ? 'text-red-300' :
                      'text-purple-700'
                    }`}
                    onClick={() => {}}
                  >
                    {variant === 'specs' ? 'ACCESS' : 
                     variant === 'basic' ? 'Learn more' :
                     variant === 'complete' ? 'Details' :
                     'Details'}
                  </Link>
                </li>
              ))}
            </ul>
            
            {section.footer && (
              <p className={`text-xs mt-4 ${
                variant === 'specs' ? 'text-green-300' :
                variant === 'basic' ? 'text-green-600' :
                variant === 'business' ? 'text-purple-600' :
                variant === 'complete' ? 'text-red-300' :
                'text-muted-foreground'
              }`}>
                {section.footer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* 🎯 CTA Section by variant */}
      {variant === 'basic' && (
        <div className="mt-8 bg-green-100 p-6 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-3">🚀 Ready to Get Started?</h3>
          <p className="text-green-700 text-sm mb-4">
            Start with just one file and see your website become AI-friendly in minutes!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/tools/well-known" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              onClick={() => {}}
            >
              🌱 Create Your First File
            </Link>
            <Link 
              href="/examples" 
              className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors"
              onClick={() => {}}
            >
              📝 See Examples
            </Link>
          </div>
        </div>
      )}

      {variant === 'business' && (
        <div className="mt-8 bg-purple-100 p-6 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-3">💼 Calculate Your Business Impact</h3>
          <p className="text-purple-700 text-sm mb-4">
            See projected ROI and competitive advantages for your organization.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/tools/roi-calculator" 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              onClick={() => {}}
            >
              💰 ROI Calculator
            </Link>
            <Link 
              href="/case-studies" 
              className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors"
              onClick={() => {}}
            >
              📈 Case Studies
            </Link>
          </div>
        </div>
      )}

      {variant === 'complete' && (
        <div className="mt-8 bg-red-900/20 border border-red-600 p-6 rounded-lg">
          <h3 className="font-semibold text-red-300 mb-3">🥋 Matrix Mode Unlocked</h3>
          <p className="text-red-200 text-sm mb-4">
            You now know every possible declaration. Use this knowledge responsibly to build the agentic web.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/tools/export-button" 
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              onClick={() => {}}
            >
              🚀 Build Your Matrix
            </Link>
            <Link 
              href="/easter-eggs" 
              className="border border-red-400 text-red-300 px-6 py-3 rounded-lg hover:bg-red-900/20 transition-colors"
              onClick={() => {}}
            >
              🥚 Find Easter Eggs
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}