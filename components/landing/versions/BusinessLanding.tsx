// components/landing/versions/BusinessLanding.tsx
// 💼 BUSINESS LANDING - Opportunités, potentiel, early adopter advantage

import { PageHeader } from '@/components/landing/PageHeader'
import { LLMFeedExplainer } from '@/components/landing/LLMFeedExplainer'
import { WellKnownFeeds } from '@/components/landing/WellKnownFeeds'
import { SimpleDemo } from '@/components/landing/SimpleDemo'
import { WhatYouCanDeclare } from '@/components/landing/WhatYouCanDeclare'
import { ShortcutLLM } from '@/components/landing/ShortcutLLM'
import { ToolsGrid } from '@/components/landing/ToolsGrid'
import { Community } from '@/components/landing/Community'
import { NewsSection } from '@/components/landing/NewsSection'
import { FAQList } from '@/components/landing/FAQList'
import SeoHead from '@/components/SeoHead'
import { TrendingUp, Lightbulb, Target, Rocket, Brain, Zap } from 'lucide-react'

export function BusinessLanding() {
  return (
    <>
      {/* 🎯 SEO optimisé pour décideurs business */}
      <SeoHead
        title="Early Adopter Advantage - Agent-Ready Business Infrastructure"
        description="Position your business for the agent economy. Nascent standard with massive potential. Extensible JSON format enables unlimited innovation. First-mover advantage in agent-readable infrastructure."
        canonicalUrl="https://wellknownmcp.org/?v=business"
        ogImage="/og/business-landing.png"
        llmIntent="explore-business-opportunities-agent-economy"
        llmTopic="early-adopter-agent-infrastructure"
        llmlang="en"
        keywords={[
          'agent economy business', 'early adopter advantage', 'agent-ready infrastructure',
          'business agent integration', 'AI economy preparation', 'agent interaction business',
          'future business infrastructure', 'agent-first business strategy', 'AI agent marketplace',
          'business process automation', 'agent-enabled services', 'AI business optimization',
          'agent economy preparation', 'business AI transformation', 'agent-ready services',
          'competitive advantage AI', 'business agent capabilities', 'AI-first business',
          'agent infrastructure investment', 'business automation future', 'AI agent innovation'
        ]}
        llmCapabilities={[
          'business-opportunity-analysis', 'early-adopter-positioning', 'innovation-potential',
          'competitive-advantage', 'future-planning', 'strategic-implementation'
        ]}
        llmTrustLevel="business-strategic"
        llmAudience={['business', 'decision-maker', 'entrepreneur', 'executive']}
        llmFeedTypes={['mcp', 'business', 'strategy', 'opportunity']}
        llmBehaviorHints="focus-opportunities-strategic-thinking"
        llmContentType="business-strategy-guide"
        llmUpdateFrequency="strategic"
        pageType="landing-business"
        interactionComplexity="medium"
        mcpFeedUrl="/.well-known/mcp.llmfeed.json"
        agentReadiness={true}
        autoDiscoverFeeds={true}
      />

      <main className="min-h-screen space-y-16 px-4 sm:px-8 md:px-16">
        {/* 🎯 1. Hero Business - Opportunity focus */}
        <section className="py-12">
          <PageHeader variant="business" />
        </section>

        {/* 💡 2. The Opportunity - Why now? */}
        <section className="py-16 bg-purple-50 rounded-xl">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-purple-900">
                The Opportunity Window
              </h2>
            </div>
            <p className="text-xl text-purple-700 max-w-3xl mx-auto">
              We're at the inflection point. AI agents are moving from demos to production. 
              The infrastructure they need doesn't exist yet. That's the opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-purple-200">
              <div className="text-3xl mb-3">🌊</div>
              <h3 className="font-bold text-purple-900 mb-2">The Wave is Coming</h3>
              <p className="text-purple-700 text-sm">
                AI agents are transitioning from experimental to essential. 
                Every business will need agent-compatible infrastructure.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-purple-200">
              <div className="text-3xl mb-3">🏗️</div>
              <h3 className="font-bold text-purple-900 mb-2">Infrastructure Gap</h3>
              <p className="text-purple-700 text-sm">
                Current web infrastructure wasn't built for agents. 
                Structured data standards are nascent and fragmented.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-purple-200">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-purple-900 mb-2">First Mover Advantage</h3>
              <p className="text-purple-700 text-sm">
                Early adopters will define how agents interact with businesses. 
                Shape the standard instead of following it.
              </p>
            </div>
          </div>
        </section>

        {/* 🧠 3. Technical Foundation - Why this approach? */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🏗️ Why This Standard Has Potential
            </h2>
            <p className="text-lg text-gray-600">
              Simple, extensible, and built for innovation. The format that grows with your needs.
            </p>
          </div>
          <LLMFeedExplainer variant="default" />
        </section>

        {/* 🏗️ 4. Implementation Reality Check */}
        <section className="py-16 bg-blue-50 rounded-xl">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              📂 Implementation: Surprisingly Simple
            </h2>
            <p className="text-lg text-blue-700">
              No complex systems. No vendor lock-in. Just JSON files that unlock agent compatibility.
            </p>
          </div>
          <WellKnownFeeds variant="default" showTreeView={true} />
        </section>

        {/* ✨ 5. Proof of Concept */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🧪 See It Working Today
            </h2>
            <p className="text-lg text-gray-600">
              This site demonstrates the standard in action. Test it with any AI agent.
            </p>
          </div>
          <SimpleDemo />
        </section>

        {/* 🚀 6. Innovation Potential + Crowdsourcing */}
        <section className="py-16 bg-green-50 rounded-xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-green-900">
                The Innovation Race is On
              </h2>
            </div>
            <p className="text-green-700 max-w-3xl mx-auto text-lg">
              Every industry needs custom feed types. The first to define them wins. 
              The JSON format is infinitely extensible - your imagination is the only limit.
            </p>
          </div>

          <div className="space-y-12">
            {/* Feed Type Examples Gallery */}
            <div className="bg-white p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-900 mb-6 text-center">
                🎨 Feed Type Inspiration Gallery
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="space-y-2">
                  <div className="font-semibold text-green-800">E-commerce:</div>
                  <div className="bg-green-100 p-2 rounded">"product-catalog"</div>
                  <div className="bg-green-100 p-2 rounded">"inventory-status"</div>
                  <div className="bg-green-100 p-2 rounded">"pricing-strategy"</div>
                  <div className="bg-green-100 p-2 rounded">"customer-segments"</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-green-800">Healthcare:</div>
                  <div className="bg-green-100 p-2 rounded">"medical-protocols"</div>
                  <div className="bg-green-100 p-2 rounded">"treatment-options"</div>
                  <div className="bg-green-100 p-2 rounded">"patient-guidance"</div>
                  <div className="bg-green-100 p-2 rounded">"insurance-coverage"</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-green-800">Finance:</div>
                  <div className="bg-green-100 p-2 rounded">"investment-products"</div>
                  <div className="bg-green-100 p-2 rounded">"risk-assessment"</div>
                  <div className="bg-green-100 p-2 rounded">"compliance-rules"</div>
                  <div className="bg-green-100 p-2 rounded">"market-analysis"</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-green-800">Education:</div>
                  <div className="bg-green-100 p-2 rounded">"curriculum-map"</div>
                  <div className="bg-green-100 p-2 rounded">"learning-paths"</div>
                  <div className="bg-green-100 p-2 rounded">"assessment-criteria"</div>
                  <div className="bg-green-100 p-2 rounded">"skill-validation"</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-green-800">Real Estate:</div>
                  <div className="bg-green-100 p-2 rounded">"property-listings"</div>
                  <div className="bg-green-100 p-2 rounded">"market-trends"</div>
                  <div className="bg-green-100 p-2 rounded">"financing-options"</div>
                  <div className="bg-green-100 p-2 rounded">"neighborhood-data"</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-green-800">Manufacturing:</div>
                  <div className="bg-green-100 p-2 rounded">"supply-chain"</div>
                  <div className="bg-green-100 p-2 rounded">"quality-standards"</div>
                  <div className="bg-green-100 p-2 rounded">"production-capacity"</div>
                  <div className="bg-green-100 p-2 rounded">"certification-status"</div>
                </div>
              </div>
            </div>

            {/* Industry-Specific Innovation Prompt */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">
                  🎯 Generate Your Industry's Feed Types
                </h3>
                <p className="text-green-100">
                  Copy this prompt, paste it in your AI assistant, get custom ideas for your business
                </p>
              </div>

              <div className="bg-black/20 border border-white/30 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-300 mb-3">📋 Prerequisite: First run shortcut.llmfeed.json, then:</div>
                <div className="bg-black/30 p-4 rounded border border-green-400 text-green-200">
                  <pre className="whitespace-pre-wrap">{`You now understand MCP/LLMFeed. Help me innovate for my industry.

My business: [DESCRIBE YOUR BUSINESS/INDUSTRY]

Generate 5-10 custom feed_types that would give us competitive advantage:

1. Analyze what data/capabilities we have that agents would want
2. Identify interaction patterns unique to our industry  
3. Suggest feed_types that solve real customer problems
4. Calculate potential business impact for each
5. Prioritize by implementation difficulty vs market advantage

Format: JSON structure + business rationale + competitive moat analysis

The race is on. Help me win.`}</pre>
                </div>
              </div>

              <div className="text-center mt-6">
                <div className="text-yellow-300 font-bold">⚡ THE RACE IS ON ⚡</div>
                <div className="text-green-200 text-sm">
                  First movers will define how agents interact with entire industries
                </div>
              </div>
            </div>

            {/* Traditional capabilities but reframed */}
            <WhatYouCanDeclare variant="business" />
          </div>
        </section>

        {/* 🧠 7. Instant Expertise */}
        <section className="py-16 bg-indigo-50 rounded-xl">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">
              🧠 Instant Strategy Session
            </h2>
            <p className="text-lg text-indigo-700">
              Get your AI assistant up to speed on agent infrastructure opportunities in 30 seconds.
            </p>
          </div>
          <ShortcutLLM />
        </section>

        {/* 🛠️ 8. Implementation Tools */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🛠️ Start Experimenting Today
            </h2>
            <p className="text-lg text-gray-600">
              Low-risk experimentation tools. Test hypotheses before major investments.
            </p>
          </div>
          <ToolsGrid />
        </section>

        {/* 📈 9. Strategic Considerations */}
        <section className="py-16 bg-yellow-50 rounded-xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target className="w-8 h-8 text-yellow-600" />
                <h2 className="text-3xl font-bold text-yellow-900">
                  Strategic Questions to Consider
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg border border-yellow-200">
                <h3 className="font-bold text-yellow-900 mb-4">Market Positioning</h3>
                <ul className="space-y-2 text-yellow-700 text-sm">
                  <li>• How do customers currently discover your services?</li>
                  <li>• What if AI agents became the primary discovery method?</li>
                  <li>• Could you capture market share by being agent-ready first?</li>
                  <li>• What competitive advantages emerge from structured data?</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-yellow-200">
                <h3 className="font-bold text-yellow-900 mb-4">Innovation Opportunities</h3>
                <ul className="space-y-2 text-yellow-700 text-sm">
                  <li>• What unique feed types could serve your industry?</li>
                  <li>• How might agents change customer interaction patterns?</li>
                  <li>• What new services become possible with agent integration?</li>
                  <li>• Could you become the standard-setter for your vertical?</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 🤝 10. Collaborative Adoption Lobbying */}
        <section className="py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Rocket className="w-8 h-8 text-orange-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Join the Adoption Movement
              </h2>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Standards succeed through network effects. Join other forward-thinking businesses 
              to accelerate adoption, share innovations, and collectively lobby for ecosystem growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Collaborative Strategy */}
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <h3 className="font-bold text-orange-900 mb-4">🚀 Collaborative Strategy</h3>
              <div className="space-y-3 text-orange-700 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div><strong>Share Innovation:</strong> Exchange custom feed types and implementation patterns</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div><strong>Cross-Industry Pollination:</strong> Adapt successful patterns from other verticals</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div><strong>Collective Lobbying:</strong> Push LLM providers to support new feed types natively</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div><strong>Standard Evolution:</strong> Influence the specification roadmap together</div>
                </div>
              </div>
            </div>

            {/* Network Effects */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-4">📈 Network Effects Strategy</h3>
              <div className="space-y-3 text-blue-700 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div><strong>Critical Mass:</strong> More adopters = better agent understanding</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div><strong>Ecosystem Pressure:</strong> Force competitors to adopt or fall behind</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div><strong>Tool Development:</strong> Shared ecosystem attracts better developer tools</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div><strong>Market Education:</strong> Collective voice reaches more customers</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Community variant="business" />
            <div className="space-y-8">
              <NewsSection />
              <FAQList variant="business" />
            </div>
          </div>
        </section>

        {/* 🚀 11. Strategic Call to Arms */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl">
          <div className="text-center space-y-6">
            <div className="text-4xl">⚡</div>
            <h2 className="text-3xl font-bold">
              The Infrastructure Revolution Needs You
            </h2>
            <p className="text-purple-100 max-w-2xl mx-auto text-lg">
              This isn't just about technology adoption - it's about defining the future of business-agent interaction. 
              The companies that shape this standard will own the next economy.
            </p>
            
            <div className="bg-white/10 border border-white/20 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="text-yellow-300 font-bold text-lg mb-3">🏃‍♂️ THE RACE IS ON</div>
              <div className="text-sm space-y-2 text-left">
                <div>⚡ Generate your industry's feed types</div>
                <div>🧪 Start low-risk experiments immediately</div>
                <div>🤝 Join collaborative adoption movement</div>
                <div>🚀 Lobby for ecosystem-wide adoption</div>
                <div>👑 Become the standard-setter in your vertical</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/tools/well-known"
                className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors"
              >
                🧪 Start Racing
              </a>
              <a
                href="/join"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                🤝 Join Movement
              </a>
              <a
                href="/.well-known/shortcut.llmfeed.json"
                target="_blank"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                🧠 Get Strategic AI
              </a>
            </div>

            <div className="text-xs text-purple-200 opacity-80 mt-6">
              "In the race for the future, the starting line is intelligence. The finish line is market dominance." 🏁
            </div>
          </div>
        </section>
      </main>
    </>
  )
}