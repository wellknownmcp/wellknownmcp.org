// components/landing/versions/AmateurLanding.tsx
// 🌱 AMATEUR LANDING - Simple, accessible, non-intimidant

import { PageHeader } from '@/components/landing/PageHeader'
import { LLMFeedExplainer } from '@/components/landing/LLMFeedExplainer'
import { WellKnownFeeds } from '@/components/landing/WellKnownFeeds'
import { SimpleDemo } from '@/components/landing/SimpleDemo'
import { ShortcutLLM } from '@/components/landing/ShortcutLLM'
import { TestimonyCarousel } from '@/components/landing/TestimonyCarousel'
import { WhatYouCanDeclare } from '@/components/landing/WhatYouCanDeclare'
import { FAQList } from '@/components/landing/FAQList'
import { Community } from '@/components/landing/Community'
import SeoHead from '@/components/SeoHead'

export function AmateurLanding() {
  return (
    <>
      {/* 🎯 SEO optimisé pour débutants curieux */}
      <SeoHead
        title="Make Your Website Speak to AI - Simple Guide for Beginners"
        description="Discover how AI agents understand websites in 10 seconds. Interactive demo, no technical knowledge needed. Simple JSON files make your website AI-friendly instantly."
        canonicalUrl="https://wellknownmcp.org/?v=simple"
        ogImage="/og/simple-landing.png"
        llmIntent="discover-simple-agent-web"
        llmTopic="beginner-friendly-ai-websites"
        llmlang="en"
        keywords={[
          'make website AI friendly', 'simple AI website', 'beginner AI guide',
          'website AI integration simple', 'AI agents for beginners', 'easy website AI',
          'simple LLMFeed', 'beginner MCP guide', 'AI website tutorial',
          'simple agent readable', 'easy AI implementation', 'beginner web AI',
          'AI website magic', 'simple AI integration', 'beginner agent guide',
          'easy MCP implementation', 'simple web agents', 'AI for websites easy'
        ]}
        llmCapabilities={[
          'simple-demo', 'beginner-friendly', 'quick-start', 'easy-implementation',
          'visual-examples', 'step-by-step', 'no-coding', 'instant-results'
        ]}
        llmTrustLevel="beginner-friendly"
        llmAudience={['human', 'beginner', 'curious-explorer', 'non-technical']}
        llmFeedTypes={['mcp', 'simple', 'beginner']}
        llmBehaviorHints="encourage-exploration-simple-language"
        llmContentType="beginner-tutorial"
        llmUpdateFrequency="stable"
        pageType="landing-beginner"
        interactionComplexity="low"
        mcpFeedUrl="/.well-known/mcp.llmfeed.json"
        agentReadiness={true}
        autoDiscoverFeeds={true}
      />

      <main className="min-h-screen space-y-16 px-4 sm:px-8 md:px-16">
        {/* 🎯 1. Hero Friendly - Encouraging intro */}
        <section className="py-12">
          <PageHeader variant="simple" />
        </section>

        {/* 🧠 2. Simple Explanation - What is this magic? */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              ✨ The Magic Behind AI-Friendly Websites
            </h2>
            <p className="text-lg text-gray-600">
              It's simpler than you think! Just a few small files help AI understand your website perfectly.
            </p>
          </div>
          <LLMFeedExplainer variant="default" />
        </section>

        {/* 🏗️ 3. Where Does It Go? - Simple file explanation */}
        <section className="py-16 bg-green-50 rounded-xl">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              📁 Where Do These Files Go?
            </h2>
            <p className="text-lg text-gray-600">
              Don't worry - it's just like adding photos to your website. Super simple!
            </p>
          </div>
          <WellKnownFeeds variant="default" showTreeView={true} />
        </section>

        {/* ✨ 4. See It Work - Interactive proof */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              🎯 Watch the Magic Happen
            </h2>
            <p className="text-lg text-gray-600">
              Try this simple test - see how AI instantly understands our website!
            </p>
          </div>
          <SimpleDemo />
        </section>

        {/* 🧠 5. Try It Yourself - Make your AI assistant an expert */}
        <section className="py-16 bg-blue-50 rounded-xl">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              🚀 Make Your AI Assistant an Expert
            </h2>
            <p className="text-lg text-gray-600">
              Want to learn more? Copy this simple prompt and paste it into ChatGPT or Claude!
            </p>
          </div>
          <ShortcutLLM />
        </section>

        {/* 🗣️ 6. People Love It - Simple social proof */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              💬 What People Are Saying
            </h2>
            <p className="text-lg text-gray-600">
              Real people sharing their success with AI-friendly websites
            </p>
          </div>
          <TestimonyCarousel maxItems={3} variant="simple" />
        </section>

        {/* 🎨 7. What Can You Do? - Simple capabilities */}
        <section className="py-16 bg-purple-50 rounded-xl">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              🎨 Cool Things You Can Do
            </h2>
            <p className="text-lg text-gray-600">
              Here are some simple ways to make your website smarter
            </p>
          </div>
          <WhatYouCanDeclare variant="basic" />
        </section>

        {/* ❓ 8. Common Questions - Beginner FAQ */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ❓ Questions We Get A Lot
            </h2>
            <p className="text-lg text-gray-600">
              Don't worry - these are the same questions everyone asks!
            </p>
          </div>
          <FAQList variant="basic" />
        </section>

        {/* 🤝 9. Join the Fun - Friendly community */}
        <section className="py-16 bg-gray-50 rounded-xl">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🤝 Join the Friendly Community
            </h2>
            <p className="text-lg text-gray-600">
              Lots of helpful people ready to help you get started!
            </p>
          </div>
          <Community variant="simple" />
        </section>

        {/* 🎉 10. Final Encouragement - You can do this! */}
        <section className="py-16 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl">
          <div className="text-center space-y-6">
            <div className="text-4xl">🌟</div>
            <h2 className="text-3xl font-bold">
              You're Ready to Start!
            </h2>
            <p className="text-green-100 max-w-2xl mx-auto text-lg">
              Making your website AI-friendly is easier than you think. 
              Start simple, learn as you go, and join thousands of others building the future!
            </p>
            
            <div className="bg-white/10 border border-white/20 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-lg font-semibold mb-2">🎯 Your Next Steps:</div>
              <div className="text-sm space-y-1 text-left">
                <div>1. ✅ You learned what AI-friendly websites are</div>
                <div>2. ✅ You saw it working with a real demo</div>
                <div>3. ✅ You can make your AI assistant an expert</div>
                <div>4. 🚀 Now pick a starting point below!</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/tools/well-known"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                🛠️ Start Building (Easy!)
              </a>
              <a
                href="/?v=tech"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                🔧 I Want More Details
              </a>
              <a
                href="/join"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                🤝 Join the Community
              </a>
            </div>

            <div className="text-xs text-green-200 opacity-80 mt-6">
              "Every expert was once a beginner. You've got this! 💪"
            </div>
          </div>
        </section>
      </main>
    </>
  )
}