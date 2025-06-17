'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Zap, Clock, Brain, TrendingUp } from 'lucide-react'
import { useWellKnownMCPAnalytics } from '@/lib/hooks/useWellKnownMCPAnalytics'

interface MetricComparison {
  metric: string
  unit: string
  before: number
  after: number
  improvement: number
  icon: React.ComponentType<any>
  description: string
  color: 'red' | 'yellow' | 'green'
}

interface SimulationState {
  phase: 'idle' | 'scraping' | 'processing' | 'complete'
  progress: number
  currentMetric: string
}

export function BeforeAfterDemo() {
  const [isRunning, setIsRunning] = useState(false)
  const [simulationBefore, setSimulationBefore] = useState<SimulationState>({
    phase: 'idle', progress: 0, currentMetric: ''
  })
  const [simulationAfter, setSimulationAfter] = useState<SimulationState>({
    phase: 'idle', progress: 0, currentMetric: ''
  })
  const [showResults, setShowResults] = useState(false)
  const { trackEvent, trackToolUsage, trackConversionIntent } = useWellKnownMCPAnalytics()

  const metrics: MetricComparison[] = [
    {
      metric: 'Response Time',
      unit: 'seconds',
      before: 8.3,
      after: 0.8,
      improvement: 90.4,
      icon: Clock,
      description: 'Time from request to first meaningful response',
      color: 'green'
    },
    {
      metric: 'Token Usage',
      unit: 'tokens',
      before: 12000,
      after: 400,
      improvement: 96.7,
      icon: Brain,
      description: 'Total tokens consumed for equivalent understanding',
      color: 'green'
    },
    {
      metric: 'Accuracy Rate',
      unit: '%',
      before: 62,
      after: 98,
      improvement: 58.1,
      icon: TrendingUp,
      description: 'Correctness of agent understanding and responses',
      color: 'green'
    },
    {
      metric: 'API Calls',
      unit: 'requests',
      before: 15,
      after: 1,
      improvement: 93.3,
      icon: Zap,
      description: 'Number of HTTP requests needed for complete context',
      color: 'green'
    }
  ]

  const runSimulation = async () => {
    setIsRunning(true)
    setShowResults(false)
    
    // Track demo start
    trackToolUsage('before_after_demo', 'start_simulation', true)
    trackEvent('Performance Demo', {
      action: 'start_simulation',
      demo_type: 'before_after_comparison'
    })

    // Reset states
    setSimulationBefore({ phase: 'scraping', progress: 0, currentMetric: 'Fetching HTML...' })
    setSimulationAfter({ phase: 'processing', progress: 0, currentMetric: 'Reading MCP feed...' })

    // Simulate "Before" (slow scraping process)
    const beforeSteps = [
      { phase: 'scraping', metric: 'Fetching HTML...', duration: 2000 },
      { phase: 'processing', metric: 'Parsing DOM structure...', duration: 2500 },
      { phase: 'processing', metric: 'Extracting text content...', duration: 2000 },
      { phase: 'processing', metric: 'Analyzing semantic meaning...', duration: 2500 },
      { phase: 'complete', metric: 'Complete (uncertain)', duration: 500 }
    ]

    // Simulate "After" (fast MCP process)  
    const afterSteps = [
      { phase: 'processing', metric: 'Reading MCP feed...', duration: 300 },
      { phase: 'processing', metric: 'Validating signature...', duration: 200 },
      { phase: 'complete', metric: 'Complete (confident)', duration: 200 }
    ]

    // Run "After" simulation (faster)
    let afterProgress = 0
    for (const step of afterSteps) {
      setSimulationAfter({ 
        phase: step.phase as any, 
        progress: afterProgress, 
        currentMetric: step.metric 
      })
      await new Promise(resolve => setTimeout(resolve, step.duration))
      afterProgress += 100 / afterSteps.length
    }
    setSimulationAfter({ phase: 'complete', progress: 100, currentMetric: 'Complete (confident)' })

    // Continue "Before" simulation (slower)
    let beforeProgress = 0
    for (const step of beforeSteps) {
      setSimulationBefore({ 
        phase: step.phase as any, 
        progress: beforeProgress, 
        currentMetric: step.metric 
      })
      await new Promise(resolve => setTimeout(resolve, step.duration))
      beforeProgress += 100 / beforeSteps.length
    }
    setSimulationBefore({ phase: 'complete', progress: 100, currentMetric: 'Complete (uncertain)' })

    setIsRunning(false)
    setShowResults(true)
    
    // Track completion
    trackEvent('Performance Demo', {
      action: 'simulation_complete',
      engagement_level: 'high'
    })
    trackConversionIntent('evaluation', 'performance_demo_completed')
  }

  const resetSimulation = () => {
    setSimulationBefore({ phase: 'idle', progress: 0, currentMetric: '' })
    setSimulationAfter({ phase: 'idle', progress: 0, currentMetric: '' })
    setShowResults(false)
    setIsRunning(false)
  }

  const getPhaseColor = (phase: string, isAfter: boolean = false) => {
    switch (phase) {
      case 'idle': return 'bg-gray-100 text-gray-600'
      case 'scraping': return 'bg-red-100 text-red-700'
      case 'processing': return isAfter ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
      case 'complete': return isAfter ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <section className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Zap className="w-4 h-4" />
          Performance Comparison
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          ⚡ Before vs After MCP
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Watch how agents understand websites 10x faster with structured MCP feeds 
          versus traditional HTML scraping.
        </p>
      </div>

      {/* Control Panel */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Run Comparison
            </>
          )}
        </button>
        
        <button
          onClick={resetSimulation}
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      {/* Split Screen Simulation */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        
        {/* Before: Traditional Scraping */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-900">❌ Traditional HTML Scraping</h3>
              <p className="text-red-700 text-sm">Slow, uncertain, token-heavy</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-red-700 mb-2">
              <span>Progress</span>
              <span>{Math.round(simulationBefore.progress)}%</span>
            </div>
            <div className="w-full bg-red-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${simulationBefore.progress}%` }}
              />
            </div>
          </div>

          {/* Current Status */}
          <div className={`px-3 py-2 rounded-lg text-sm font-medium ${getPhaseColor(simulationBefore.phase)}`}>
            {simulationBefore.currentMetric || 'Ready to start...'}
          </div>

          {/* Simulated Agent Response */}
          {simulationBefore.phase === 'complete' && (
            <div className="mt-4 p-4 bg-white border border-red-200 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                "I can see this is some kind of website about... protocols? 
                There's a lot of HTML here but I'm not entirely sure what 
                the site actually does or how I should interact with it..."
              </p>
              <div className="mt-2 text-xs text-red-600">
                ⚠️ Confidence: ~60% • Took 8.3s • Used 12,000 tokens
              </div>
            </div>
          )}
        </div>

        {/* After: MCP Feed */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-900">✅ MCP Structured Feed</h3>
              <p className="text-green-700 text-sm">Fast, confident, efficient</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-green-700 mb-2">
              <span>Progress</span>
              <span>{Math.round(simulationAfter.progress)}%</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${simulationAfter.progress}%` }}
              />
            </div>
          </div>

          {/* Current Status */}
          <div className={`px-3 py-2 rounded-lg text-sm font-medium ${getPhaseColor(simulationAfter.phase, true)}`}>
            {simulationAfter.currentMetric || 'Ready to start...'}
          </div>

          {/* Simulated Agent Response */}
          {simulationAfter.phase === 'complete' && (
            <div className="mt-4 p-4 bg-white border border-green-200 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                "I know Kung Fu! 🥋 This is WellKnownMCP.org - the canonical 
                specification for agent-readable websites. I can help you 
                create MCP feeds, understand the protocol, or explore tools."
              </p>
              <div className="mt-2 text-xs text-green-600">
                ✅ Confidence: 98% • Took 0.8s • Used 400 tokens
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Comparison */}
      {showResults && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            📊 Performance Metrics
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <metric.icon className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">{metric.metric}</span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Before:</span>
                    <span className="font-mono">{metric.before.toLocaleString()}{metric.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">After:</span>
                    <span className="font-mono">{metric.after.toLocaleString()}{metric.unit}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-2">
                  <div className="text-center">
                    <span className="text-lg font-bold text-green-600">
                      +{metric.improvement}%
                    </span>
                    <div className="text-xs text-gray-500 mt-1">improvement</div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-blue-900 mb-2">
              🚀 The Bottom Line
            </h4>
            <p className="text-blue-800 text-sm">
              MCP feeds deliver <strong>10x faster responses</strong> with <strong>96% fewer tokens</strong> 
              and <strong>98% accuracy</strong>. Your users get instant, confident AI interactions.
            </p>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-8 text-center">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          Ready to implement MCP on your site?
        </h4>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/tools/prompt"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={() => trackConversionIntent('implementation', 'performance_demo_to_tools')}
          >
            🛠️ Build Your Feed
          </a>
          <a
            href="/spec"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            onClick={() => trackConversionIntent('evaluation', 'performance_demo_to_spec')}
          >
            📚 Read the Spec
          </a>
          <a
            href="/.well-known/mcp.llmfeed.json"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            onClick={() => trackToolUsage('performance_demo', 'view_example_feed', true)}
          >
            📄 See Our Feed
          </a>
        </div>
      </div>
    </section>
  )
}