// components/landing/TrainAICTA.tsx
// 🧠 TRAIN AI CTA WIDGET - Pour integration homepage

import Link from 'next/link'
import { Brain, Zap, ArrowRight, Sparkles } from 'lucide-react'

interface TrainAICTAProps {
  variant?: 'compact' | 'featured' | 'sidebar'
  className?: string
}

export function TrainAICTA({ variant = 'featured', className = '' }: TrainAICTAProps) {
  
  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 text-center ${className}`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-yellow-600" />
          <span className="font-bold text-yellow-900">Train Any LLM in 30s</span>
        </div>
        <p className="text-sm text-yellow-800 mb-3">
          Transform ChatGPT, Claude, Gemini into MCP experts instantly
        </p>
        <Link
          href="/train"
          className="inline-flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded font-medium text-sm hover:bg-yellow-700 transition-colors"
        >
          Get Prompt <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-gradient-to-br from-yellow-600 to-orange-600 text-white rounded-xl p-6 ${className}`}>
        <div className="text-center">
          <div className="text-3xl mb-3">🧠</div>
          <h3 className="text-lg font-bold mb-2">Instant AI Expertise</h3>
          <p className="text-yellow-100 text-sm mb-4">
            Train any LLM as MCP expert in 30 seconds
          </p>
          <Link
            href="/train"
            className="bg-white text-yellow-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors block"
          >
            Train AI Now →
          </Link>
        </div>
      </div>
    )
  }

  // Featured variant (default)
  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 text-6xl">🧠</div>
            <div className="absolute bottom-4 left-4 text-4xl">⚡</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-50">🤖</div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-10 h-10" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Train Any LLM as MCP Expert
              </h2>
              <Sparkles className="w-8 h-8" />
            </div>

            <p className="text-xl md:text-2xl text-yellow-100 mb-6 max-w-3xl mx-auto leading-relaxed">
              Copy one universal prompt → Paste in ChatGPT, Claude, Gemini → Get instant MCP expertise.
              <br />
              <span className="font-semibold text-white">Works on any LLM in 30 seconds!</span>
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold">99%+</div>
                <div className="text-yellow-200 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">30s</div>
                <div className="text-yellow-200 text-sm">Training Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">∞</div>
                <div className="text-yellow-200 text-sm">LLMs Supported</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/train"
                className="bg-white text-orange-600 hover:text-orange-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Zap className="w-6 h-6" />
                Get Training Prompt
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <div className="text-yellow-100 text-sm text-center">
                <div className="font-medium mb-1">✅ Works with:</div>
                <div className="flex items-center gap-4">
                  <span>ChatGPT</span>
                  <span>•</span>
                  <span>Claude</span>
                  <span>•</span>
                  <span>Gemini</span>
                  <span>•</span>
                  <span>Any LLM</span>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-yellow-100 text-sm">
                🚀 <strong>Join pionneer developers</strong> using trained LLMs to build the agent-readable web
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}