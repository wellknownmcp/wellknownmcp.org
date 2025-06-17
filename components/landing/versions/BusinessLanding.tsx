// components/landing/versions/BusinessLanding.tsx
// 💼 RECETTE BUSINESS - Pour les décideurs qui évaluent le ROI

import { PageHeader } from '@/components/landing/PageHeader'
import { ROICalculator } from '@/components/landing/ROICalculator'
import { CaseStudies } from '@/components/landing/CaseStudies'
import { TestimonyCarousel } from '@/components/landing/TestimonyCarousel'
import { MissionBadges } from '@/components/landing/MissionBadges'
import { Community } from '@/components/landing/Community'
import { WhatYouCanDeclare } from '@/components/landing/WhatYouCanDeclare'
import { DownloadFeeds } from '@/components/landing/DownloadFeeds'
import { FAQList } from '@/components/landing/FAQList'
import SeoHead from '@/components/SeoHead'

export function BusinessLanding() {
  return (
    <>
      {/* 🎯 SEO optimisé pour décideurs business */}
      <SeoHead
        title="Stop Paying for AI Scraping - Agent-Ready ROI Calculator"
        description="Calculate savings from AI agent optimization. Business case studies, enterprise features, competitive advantage through structured agent interactions."
        llmIntent="evaluate-business-case"
        llmTopic="business-roi"
        llmCapabilities={[
          'roi-calculation',
          'business-analysis',
          'cost-optimization',
          'competitive-advantage'
        ]}
        llmAudience={['business_decision_maker', 'enterprise']}
        llmBehaviorHints="focus-on-value-proposition"
        pageType="landing-business"
        interactionComplexity="moderate"
        keywords={[
          'AI agent ROI',
          'enterprise agent optimization',
          'AI scraping costs',
          'agent-ready business case',
          'competitive AI advantage'
        ]}
      />

      <div className="space-y-16 px-4 sm:px-8 md:px-16">
        {/* 🎯 Hero business avec value proposition */}
        <PageHeader variant="business" />

        {/* 💰 STAR : Calculateur ROI interactif */}
        <ROICalculator />

        {/* 📈 Success stories avec métriques business */}
        <CaseStudies />

        {/* 🗣️ Témoignages enterprise et social proof */}
        <TestimonyCarousel variant="business" maxItems={4} />

        {/* 📝 Use cases business */}
        <WhatYouCanDeclare variant="business" />

        {/* 📥 Téléchargement axé business */}
        <DownloadFeeds variant="business" />

        {/* 👥 Preuves d'adoption enterprise */}
        <Community variant="enterprise" />

        {/* 🎯 Mission et gouvernance */}
        <MissionBadges />

        {/* ❓ FAQ business */}
        <FAQList variant="business" />

        {/* 🚀 CTA business avec urgence concurrentielle */}
        <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-8 rounded-lg text-center space-y-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold">
            💼 Competitive Advantage Waiting
          </h2>
          <p className="text-purple-100 max-w-3xl mx-auto text-lg">
            While competitors pay escalating AI scraping costs, early adopters save 
            <strong className="text-yellow-300"> $136k annually</strong> with agent-ready infrastructure.
          </p>
          
          {/* Business metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-purple-800/30 p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-300">96.7%</div>
              <div className="text-purple-200">Token Reduction</div>
              <div className="text-sm text-purple-300">Less AI processing = lower costs</div>
            </div>
            <div className="bg-purple-800/30 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-300">8.2 months</div>
              <div className="text-purple-200">Avg. Payback Period</div>
              <div className="text-sm text-purple-300">Fast return on investment</div>
            </div>
            <div className="bg-purple-800/30 p-6 rounded-lg">
              <div className="text-3xl font-bold text-yellow-300">10x</div>
              <div className="text-purple-200">Agent Performance</div>
              <div className="text-sm text-purple-300">Better user experience</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/tools/roi-calculator"
              className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-colors text-lg"
            >
              📊 Calculate Your Savings
            </a>
            <a
              href="/contact"
              className="border border-purple-300 text-purple-100 px-8 py-4 rounded-lg font-semibold hover:bg-purple-600/20 transition-colors"
            >
              📞 Schedule Strategy Call
            </a>
          </div>

          {/* Social proof footer */}
          <div className="border-t border-purple-500 pt-6 mt-8">
            <p className="text-sm text-purple-200 mb-4">
              🏆 <strong>Early Adopter Advantage:</strong> Join forward-thinking companies already implementing agent-ready infrastructure
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-purple-300">
              <span>✅ Enterprise-grade security</span>
              <span>✅ Dedicated support</span>
              <span>✅ Custom implementation</span>
              <span>✅ Training included</span>
            </div>
          </div>
        </section>

        {/* Trust indicators */}
        <section className="bg-gray-50 p-6 rounded-lg text-center max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🛡️ Enterprise Trust & Compliance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div>✅ SOC 2 Type II</div>
            <div>✅ GDPR Compliant</div>
            <div>✅ ISO 27001</div>
            <div>✅ 99.9% Uptime SLA</div>
          </div>
        </section>
      </div>
    </>
  )
}