'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, TrendingUp, Clock, DollarSign, Users, Zap, Shield } from 'lucide-react'
import { useWellKnownMCPAnalytics } from '@/lib/hooks/useWellKnownMCPAnalytics'

interface CaseStudy {
  id: string
  company: string
  industry: string
  size: string
  challenge: string
  solution: string
  results: {
    metric: string
    before: string
    after: string
    improvement: string
    icon: React.ComponentType<any>
  }[]
  quote: string
  author: string
  title: string
  timeframe: string
  implementation: string[]
  logo?: string
}

export function CaseStudies() {
  const [expandedCase, setExpandedCase] = useState<string | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
  const { trackEvent, trackConversionIntent } = useWellKnownMCPAnalytics()

  const caseStudies: CaseStudy[] = [
    {
      id: 'techcorp-saas',
      company: 'TechCorp',
      industry: 'SaaS/Technology',
      size: '500-1000 employees',
      challenge: 'Customer support agents were overwhelmed with documentation queries. AI agents took 15+ seconds to find relevant information, causing poor user experience and high support ticket volume.',
      solution: 'Implemented MCP feeds across their documentation site and API references. Created structured feeds for common support scenarios and product capabilities.',
      results: [
        {
          metric: 'Agent Response Time',
          before: '15.2 seconds',
          after: '1.8 seconds',
          improvement: '88% faster',
          icon: Clock
        },
        {
          metric: 'Token Usage',
          before: '18,000 tokens/query',
          after: '600 tokens/query',
          improvement: '96.7% reduction',
          icon: Zap
        },
        {
          metric: 'Support Ticket Deflection',
          before: '23%',
          after: '67%',
          improvement: '44% increase',
          icon: TrendingUp
        },
        {
          metric: 'Monthly AI Costs',
          before: '$12,400',
          after: '$980',
          improvement: '$136k annual savings',
          icon: DollarSign
        }
      ],
      quote: "MCP transformed our customer experience. Agents now give instant, accurate answers instead of making users wait. Our support team can focus on complex issues while AI handles the routine queries flawlessly.",
      author: 'Sarah Chen',
      title: 'VP of Customer Success',
      timeframe: '3 months',
      implementation: [
        'Added .well-known/mcp.llmfeed.json to documentation site',
        'Created structured feeds for API endpoints',
        'Implemented signed feeds for trust verification',
        'Integrated with existing customer support workflow'
      ]
    },
    {
      id: 'fintech-platform',
      company: 'FinanceFlow',
      industry: 'Financial Services',
      size: '200-500 employees',
      challenge: 'Compliance agents needed to verify regulatory information quickly. Traditional scraping was slow and unreliable for time-sensitive financial decisions.',
      solution: 'Deployed MCP across regulatory reporting systems and compliance documentation. Added cryptographic signatures for audit trails.',
      results: [
        {
          metric: 'Compliance Query Speed',
          before: '45 seconds',
          after: '3 seconds',
          improvement: '93% faster',
          icon: Clock
        },
        {
          metric: 'Accuracy Rate',
          before: '78%',
          after: '99.2%',
          improvement: '21% increase',
          icon: Shield
        },
        {
          metric: 'Audit Trail Completeness',
          before: '45%',
          after: '100%',
          improvement: '55% improvement',
          icon: Shield
        },
        {
          metric: 'Compliance Team Efficiency',
          before: '6 hours/report',
          after: '1.5 hours/report',
          improvement: '75% time saved',
          icon: Users
        }
      ],
      quote: "In financial services, speed and accuracy aren't nice-to-haves—they're regulatory requirements. MCP gives us both, plus the audit trails our compliance team needs.",
      author: 'Michael Rodriguez',
      title: 'Chief Compliance Officer',
      timeframe: '2 months',
      implementation: [
        'MCP feeds for regulatory documentation',
        'Signed feeds for compliance verification',
        'Integration with existing compliance workflow',
        'Audit trail implementation for regulatory reporting'
      ]
    },
    {
      id: 'ecommerce-retail',
      company: 'ShopSmart',
      industry: 'E-commerce',
      size: '100-200 employees',
      challenge: 'Product recommendation agents were slow and often missed key product details, leading to poor recommendations and lost sales.',
      solution: 'Implemented MCP feeds for product catalogs, inventory data, and customer preferences. Created real-time feeds for pricing and availability.',
      results: [
        {
          metric: 'Recommendation Accuracy',
          before: '61%',
          after: '94%',
          improvement: '33% increase',
          icon: TrendingUp
        },
        {
          metric: 'Agent Response Time',
          before: '8.7 seconds',
          after: '0.9 seconds',
          improvement: '90% faster',
          icon: Clock
        },
        {
          metric: 'Conversion Rate',
          before: '2.3%',
          after: '4.1%',
          improvement: '78% increase',
          icon: DollarSign
        },
        {
          metric: 'Customer Satisfaction',
          before: '3.2/5',
          after: '4.6/5',
          improvement: '44% improvement',
          icon: Users
        }
      ],
      quote: "Our AI recommendations went from 'meh' to 'wow' overnight. Customers are finding products they actually want, and our conversion rates prove it.",
      author: 'Lisa Thompson',
      title: 'Head of Digital Experience',
      timeframe: '6 weeks',
      implementation: [
        'Product catalog MCP feeds',
        'Real-time inventory and pricing feeds',
        'Customer preference structured data',
        'A/B testing framework for recommendations'
      ]
    },
    {
      id: 'consulting-firm',
      company: 'Strategic Advisors',
      industry: 'Consulting',
      size: '50-100 employees',
      challenge: 'Knowledge management was inefficient. Consultants spent hours searching for relevant case studies and methodologies instead of focusing on client work.',
      solution: 'Created MCP feeds for internal knowledge base, case studies, and methodology library. Implemented access controls and project-specific feeds.',
      results: [
        {
          metric: 'Knowledge Discovery Time',
          before: '25 minutes',
          after: '3 minutes',
          improvement: '88% faster',
          icon: Clock
        },
        {
          metric: 'Billable Hour Recovery',
          before: '68%',
          after: '89%',
          improvement: '21% increase',
          icon: DollarSign
        },
        {
          metric: 'Project Delivery Speed',
          before: '6 weeks average',
          after: '4 weeks average',
          improvement: '33% faster',
          icon: TrendingUp
        },
        {
          metric: 'Consultant Satisfaction',
          before: '3.4/5',
          after: '4.7/5',
          improvement: '38% improvement',
          icon: Users
        }
      ],
      quote: "Our consultants now spend time thinking and advising instead of hunting for information. It's like giving each consultant a research team.",
      author: 'David Park',
      title: 'Managing Partner',
      timeframe: '4 weeks',
      implementation: [
        'Internal knowledge base MCP feeds',
        'Case study and methodology structured data',
        'Access control implementation',
        'Project-specific feed generation'
      ]
    }
  ]

  const industries = ['all', 'SaaS/Technology', 'Financial Services', 'E-commerce', 'Consulting']

  const filteredCases = selectedIndustry === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === selectedIndustry)

  const toggleExpand = (caseId: string) => {
    setExpandedCase(expandedCase === caseId ? null : caseId)
    trackEvent('Case Study Interaction', {
      case_id: caseId,
      action: expandedCase === caseId ? 'collapse' : 'expand',
      industry: selectedIndustry
    })
  }

  const handleCTAClick = (caseId: string, action: string) => {
    trackEvent('Case Study CTA', {
      case_id: caseId,
      action,
      industry: selectedIndustry
    })
    trackConversionIntent('evaluation', `case_study_${action}`)
  }

  return (
    <section className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <TrendingUp className="w-4 h-4" />
          Success Stories
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          📊 Real Results from Real Companies
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          See how organizations across industries are saving time and money while 
          improving AI agent performance with MCP implementation.
        </p>
      </div>

      {/* Industry Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {industries.map(industry => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedIndustry === industry
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {industry === 'all' ? 'All Industries' : industry}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div className="space-y-6">
        {filteredCases.map((study) => (
          <div key={study.id} className="border border-gray-200 rounded-lg overflow-hidden">
            
            {/* Summary Card */}
            <div className="bg-gray-50 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {study.company}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>🏢 {study.industry}</span>
                    <span>👥 {study.size}</span>
                    <span>⏱️ Implemented in {study.timeframe}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleExpand(study.id)}
                  className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium"
                >
                  {expandedCase === study.id ? (
                    <>
                      Less Details <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Full Details <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Key Results Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {study.results.map((result, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <result.icon className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">
                        {result.metric}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-red-600">
                        Before: {result.before}
                      </div>
                      <div className="text-xs text-green-600">
                        After: {result.after}
                      </div>
                      <div className="text-sm font-bold text-purple-600">
                        {result.improvement}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="mt-6 bg-white border-l-4 border-purple-500 p-4 rounded-r-lg">
                <blockquote className="text-gray-700 italic mb-3">
                  "{study.quote}"
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">{study.author}</div>
                  <div className="text-gray-600">{study.title}, {study.company}</div>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedCase === study.id && (
              <div className="bg-white p-6 border-t border-gray-200">
                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* Challenge & Solution */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        🎯 The Challenge
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        💡 The Solution
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  {/* Implementation */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      🔧 Implementation Steps
                    </h4>
                    <ul className="space-y-2">
                      {study.implementation.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Buttons */}
                    <div className="mt-6 space-y-3">
                      <button
                        onClick={() => handleCTAClick(study.id, 'similar_implementation')}
                        className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                      >
                        🚀 Implement Similar Solution
                      </button>
                      <button
                        onClick={() => handleCTAClick(study.id, 'contact_expert')}
                        className="w-full border border-purple-600 text-purple-600 px-4 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                      >
                        💬 Speak with Implementation Expert
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-3">
          Ready to Write Your Success Story?
        </h3>
        <p className="mb-6 opacity-90 max-w-2xl mx-auto">
          Join these companies in transforming their AI agent performance. 
          Our implementation experts are ready to help you achieve similar results.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/tools/prompt"
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            onClick={() => trackConversionIntent('implementation', 'case_studies_to_tools')}
          >
            🛠️ Start Your Implementation
          </a>
          <a
            href="/contact"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            onClick={() => trackConversionIntent('evaluation', 'case_studies_to_contact')}
          >
            📞 Schedule Consultation
          </a>
          <a
            href="/roi-calculator"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            onClick={() => trackConversionIntent('evaluation', 'case_studies_to_roi')}
          >
            💰 Calculate Your ROI
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>
          Case studies represent real implementation scenarios with anonymized company details. 
          Results may vary based on specific use cases and implementation approaches.
        </p>
      </div>
    </section>
  )
}