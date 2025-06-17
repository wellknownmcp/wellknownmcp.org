// components/landing/versions/AmateurLanding.tsx
// 🌱 RECETTE SIMPLE - Pour les curieux qui découvrent

import { PageHeader } from '@/components/landing/PageHeader'
import { SimpleDemo } from '@/components/landing/SimpleDemo'
import { TestimonyCarousel } from '@/components/landing/TestimonyCarousel'
import { DownloadFeeds } from '@/components/landing/DownloadFeeds'
import { FAQList } from '@/components/landing/FAQList'
import { Community } from '@/components/landing/Community'
import { WhatYouCanDeclare } from '@/components/landing/WhatYouCanDeclare'
import SeoHead from '@/components/SeoHead'

export function AmateurLanding() {
  return (
    <>
      {/* 🎯 SEO optimisé pour débutants */}
      <SeoHead
        title="Make Your Website Speak to AI - Simple Guide"
        description="Discover how AI agents understand websites in 10 seconds. Interactive demo, no technical knowledge needed. Join the agent-readable web movement."
        llmIntent="discover-agent-web"
        llmTopic="beginner-guide"
        llmCapabilities={[
          'simple-demo',
          'beginner-friendly',
          'quick-start'
        ]}
        llmAudience={['human', 'curious-explorer']}
        llmBehaviorHints="encourage-exploration"
        pageType="landing-simple"
        interactionComplexity="low"
      />

      <div className="space-y-16 px-4 sm:px-8 md:px-16">
        {/* 🎯 Hero simplifié pour débutants */}
        <PageHeader variant="simple" />

        {/* ⭐ STAR : Demo interactive instantané */}
        <SimpleDemo />

        {/* 🗣️ Social proof léger - max 3 témoignages */}
        <TestimonyCarousel maxItems={3} variant="simple" />

        {/* 📥 Téléchargement simplifié */}
        <DownloadFeeds variant="simple" />

        {/* 📝 Capacités vulgarisées */}
        <WhatYouCanDeclare variant="basic" />

        {/* ❓ FAQ pour débutants */}
        <FAQList variant="basic" />

        {/* 👥 Communauté encourageante */}
        <Community variant="simple" />

        {/* 🚀 CTA encourageant et rassurant */}
        <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-lg text-center space-y-4 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold">
            🌱 Ready to Try Your First Agent-Friendly Website?
          </h2>
          <p className="text-green-100 max-w-2xl mx-auto">
            Start simple. No coding required. See the magic happen in real-time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/tools/prompt"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              🎯 Start Your First Test
            </a>
            <a
              href="/?v=tech"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              🔧 I Want More Details
            </a>
          </div>
          <p className="text-sm text-green-200 mt-4">
            💡 Curious about the technology? You can always explore the technical version later!
          </p>
        </section>
      </div>
    </>
  )
}