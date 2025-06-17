'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, Play, Sparkles, Brain, Zap } from 'lucide-react'
import { useWellKnownMCPAnalytics } from '@/lib/hooks/useWellKnownMCPAnalytics'

interface DemoStep {
  id: string
  title: string
  description: string
  instruction: string
  expectedResult: string
  feedUrl: string
  icon: React.ComponentType<any>
  difficulty: 'beginner' | 'intermediate'
}

export function SimpleDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [showMagicResult, setShowMagicResult] = useState(false)
  const { trackEvent, trackConversionIntent, trackExampleInteraction } = useWellKnownMCPAnalytics()

  const demoSteps: DemoStep[] = [
    {
      id: 'kung-fu-test',
      title: '🥋 The "I Know Kung Fu" Test',
      description: 'Copy this URL and paste it into Claude or ChatGPT. If it says "I know Kung Fu", the magic worked!',
      instruction: 'Paste this into your favorite AI: "Analyze this: [URL]"',
      expectedResult: 'The AI should understand the site immediately and say something like "I know Kung Fu" or reference The Matrix.',
      feedUrl: 'https://wellknownmcp.org/.well-known/mcp.llmfeed.json',
      icon: Brain,
      difficulty: 'beginner'
    },
    {
      id: 'site-understanding',
      title: '🧠 Instant Site Understanding',
      description: 'Test how AI agents instantly "get" what this website is about without reading HTML.',
      instruction: 'Ask your AI: "What can agents do with this site?"',
      expectedResult: 'The AI should understand the site purpose, capabilities, and available tools immediately.',
      feedUrl: 'https://wellknownmcp.org/.well-known/llm-index.llmfeed.json',
      icon: Sparkles,
      difficulty: 'beginner'
    },
    {
      id: 'your-site-test',
      title: '⚡ Test Your Own Site',
      description: 'Try with any website to see the difference between MCP-ready vs regular sites.',
      instruction: 'Compare: "Analyze wellknownmcp.org" vs "Analyze [your-site].com"',
      expectedResult: 'MCP sites give structured understanding, regular sites require scraping and guessing.',
      feedUrl: 'https://wellknownmcp.org/.well-known/capabilities.llmfeed.json',
      icon: Zap,
      difficulty: 'intermediate'
    }
  ]

  const copyToClipboard = async (text: string, stepId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedUrl(text)
      
      // Track interaction
      trackExampleInteraction('simple_demo_url', 'copy')
      trackEvent('Simple Demo Interaction', {
        step_id: stepId,
        action: 'copy_url',
        feed_type: 'mcp',
        user_intent: 'test_with_agent'
      })
      
      setTimeout(() => setCopiedUrl(null), 3000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const markStepCompleted = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
      trackEvent('Simple Demo Progress', {
        step_id: stepId,
        step_number: currentStep + 1,
        completion_rate: ((completedSteps.length + 1) / demoSteps.length) * 100
      })
      
      // Show magic result after first completion
      if (stepId === 'kung-fu-test') {
        setShowMagicResult(true)
        trackConversionIntent('interest', 'kung_fu_test_completed')
      }
    }
  }

  const currentStepData = demoSteps[currentStep]

  // Track demo load
  useEffect(() => {
    trackEvent('Simple Demo Load', {
      total_steps: demoSteps.length,
      demo_type: 'interactive_agent_test'
    })
  }, [])

  return (
    <section className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Play className="w-4 h-4" />
          Interactive Demo
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          ✨ See the Magic in 30 Seconds
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          No technical knowledge needed. Just copy, paste, and watch AI agents 
          instantly understand websites like never before.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Step {currentStep + 1} of {demoSteps.length}</span>
          <span>{completedSteps.length}/{demoSteps.length} completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <currentStepData.icon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-semibold text-gray-900">
                {currentStepData.title}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                currentStepData.difficulty === 'beginner' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {currentStepData.difficulty}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">
              {currentStepData.description}
            </p>

            {/* Copy URL Action */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    📋 Copy this URL:
                  </p>
                  <code className="text-sm bg-white p-2 rounded border block break-all">
                    {currentStepData.feedUrl}
                  </code>
                </div>
                <button
                  onClick={() => copyToClipboard(currentStepData.feedUrl, currentStepData.id)}
                  className="flex-shrink-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  {copiedUrl === currentStepData.feedUrl ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy URL
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-blue-800 mb-2">
                🎯 What to do next:
              </p>
              <p className="text-blue-700 text-sm">
                {currentStepData.instruction}
              </p>
            </div>

            {/* Expected Result */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-medium text-green-800 mb-2">
                ✨ What you should see:
              </p>
              <p className="text-green-700 text-sm">
                {currentStepData.expectedResult}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Magic Result Display */}
      {showMagicResult && currentStep === 0 && (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-6 mb-6 animate-pulse">
          <div className="text-center">
            <div className="text-4xl mb-3">🥋</div>
            <h4 className="text-lg font-bold text-purple-900 mb-2">
              "I know Kung Fu."
            </h4>
            <p className="text-purple-700 text-sm mb-4">
              If your AI said something like this, congratulations! You just witnessed 
              the difference between structured MCP feeds and regular web scraping.
            </p>
            <div className="bg-white/50 rounded-lg p-3 text-left">
              <p className="text-xs text-purple-600 font-medium mb-1">
                What just happened:
              </p>
              <ul className="text-xs text-purple-700 space-y-1">
                <li>• AI instantly understood the site purpose</li>
                <li>• No HTML parsing or guessing required</li>
                <li>• Structured data = faster, smarter responses</li>
                <li>• You experienced the "agentic web"!</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            ← Previous Step
          </button>
        )}

        <button
          onClick={() => markStepCompleted(currentStepData.id)}
          disabled={completedSteps.includes(currentStepData.id)}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            completedSteps.includes(currentStepData.id)
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {completedSteps.includes(currentStepData.id) ? '✓ Completed' : 'Mark as Done'}
        </button>

        {currentStep < demoSteps.length - 1 && (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Next Step →
          </button>
        )}
      </div>

      {/* Completion Message */}
      {completedSteps.length === demoSteps.length && (
        <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            Congratulations! You're now Agent-Aware!
          </h4>
          <p className="text-gray-600 mb-4">
            You've experienced how the "agentic web" works. Ready to make your own site agent-ready?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/tools/prompt"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              onClick={() => trackConversionIntent('implementation', 'demo_completion_to_tools')}
            >
              🛠️ Build Your First Feed
            </a>
            <a
              href="/spec"
              className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
              onClick={() => trackConversionIntent('evaluation', 'demo_completion_to_spec')}
            >
              📚 Learn the Details
            </a>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="mt-6 text-center">
        <details className="group">
          <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 transition-colors">
            💡 Pro Tips & Troubleshooting
          </summary>
          <div className="mt-4 bg-gray-50 rounded-lg p-4 text-left text-sm text-gray-600 space-y-2">
            <p><strong>Tip 1:</strong> Try different AIs - Claude, ChatGPT, and Gemini all react differently!</p>
            <p><strong>Tip 2:</strong> If nothing special happens, try asking: "What's special about this URL?"</p>
            <p><strong>Tip 3:</strong> Some AIs need permission to access URLs - just say "yes" when asked.</p>
            <p><strong>Troubleshooting:</strong> If the AI seems confused, try: "This is an MCP feed. What does it tell you about the site?"</p>
          </div>
        </details>
      </div>
    </section>
  )
}