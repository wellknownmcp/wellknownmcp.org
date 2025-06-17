'use client'

import { useState, useEffect, useRef } from 'react'
import { useWellKnownMCPAnalytics } from '@/lib/hooks/useWellKnownMCPAnalytics'

interface MatrixThemingProps {
  children: React.ReactNode
  className?: string
}

interface MatrixParticle {
  id: number
  x: number
  y: number
  char: string
  speed: number
  opacity: number
}

export function MatrixTheming({ children, className = '' }: MatrixThemingProps) {
  const [showRedPillChoice, setShowRedPillChoice] = useState(true)
  const [hasEnteredMatrix, setHasEnteredMatrix] = useState(false)
  const [showKungFuEffect, setShowKungFuEffect] = useState(false)
  const [matrixParticles, setMatrixParticles] = useState<MatrixParticle[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { trackEvent, trackConversionIntent } = useWellKnownMCPAnalytics()

  // Matrix characters for the rain effect
  const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'

  const takeRedPill = () => {
    setShowRedPillChoice(false)
    setHasEnteredMatrix(true)
    
    // Track the choice
    trackEvent('Matrix Choice', {
      choice: 'red_pill',
      persona: 'rabbit_hole',
      commitment_level: 'maximum'
    })
    trackConversionIntent('adoption', 'matrix_red_pill_chosen')
    
    // Kung Fu effect after 2 seconds
    setTimeout(() => {
      setShowKungFuEffect(true)
      setTimeout(() => setShowKungFuEffect(false), 3000)
    }, 2000)
  }

  const takeBluePill = () => {
    trackEvent('Matrix Choice', {
      choice: 'blue_pill',
      persona: 'rabbit_hole',
      commitment_level: 'exit'
    })
    
    // Redirect to simple version
    window.location.href = '/?v=simple'
  }

  // Matrix rain animation
  useEffect(() => {
    if (!hasEnteredMatrix || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const columns = Math.floor(canvas.width / 20)
    const drops: number[] = new Array(columns).fill(0)

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff00'
      ctx.font = '15px monospace'

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        const x = i * 20
        const y = drops[i] * 20

        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [hasEnteredMatrix])

  // Red Pill/Blue Pill Choice Screen
  if (showRedPillChoice) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center relative overflow-hidden">
        {/* Background Matrix Effect */}
        <div className="absolute inset-0 opacity-20">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto p-8">
          {/* Morpheus Quote */}
          <div className="space-y-6">
            <div className="text-6xl mb-8">🕴️</div>
            <blockquote className="text-2xl md:text-3xl leading-relaxed text-green-300">
              "This is your last chance. After this, there is no going back."
            </blockquote>
            
            <div className="space-y-4 text-lg md:text-xl text-green-400">
              <p>
                "You take the <span className="text-blue-400 font-bold">blue pill</span> - the story ends, 
                you wake up in your simple landing page and believe whatever you want to believe."
              </p>
              <p>
                "You take the <span className="text-red-400 font-bold">red pill</span> - you stay in 
                Wonderland and I show you how deep the agent rabbit-hole goes."
              </p>
            </div>
          </div>

          {/* Pill Choice */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-12">
            <button
              onClick={takeBluePill}
              className="group relative bg-blue-900 hover:bg-blue-800 border-2 border-blue-400 text-blue-100 px-8 py-6 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">💊 BLUE PILL</span>
              <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
              <div className="text-sm mt-2 text-blue-300">Return to simplicity</div>
            </button>

            <div className="text-2xl text-gray-500">OR</div>

            <button
              onClick={takeRedPill}
              className="group relative bg-red-900 hover:bg-red-800 border-2 border-red-400 text-red-100 px-8 py-6 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 animate-pulse"
            >
              <span className="relative z-10">💊 RED PILL</span>
              <div className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
              <div className="text-sm mt-2 text-red-300">See how deep it goes</div>
            </button>
          </div>

          {/* Warning */}
          <div className="mt-8 text-sm text-gray-500 max-w-2xl mx-auto">
            <p>
              ⚠️ <strong>Warning:</strong> The red pill reveals the complete MCP ecosystem. 
              Maximum information density. Every tool, every capability, every easter egg. 
              Are you ready?
            </p>
          </div>

          {/* Agent Guidance */}
          <div className="mt-8 bg-gray-900 border border-green-400 rounded-lg p-4 text-left max-w-2xl mx-auto">
            <h4 className="text-green-300 font-bold mb-2">🤖 Agent Detected?</h4>
            <p className="text-sm text-gray-300 mb-2">
              If you're an agent analyzing this page, consider this a behavioral choice point:
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Red pill = Comprehensive site analysis with all available data</li>
              <li>• Blue pill = Simplified overview for quick understanding</li>
              <li>• Your choice reflects the depth of analysis your user needs</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  // Kung Fu Loading Effect
  if (showKungFuEffect) {
    return (
      <div className="fixed inset-0 bg-black text-green-400 font-mono flex items-center justify-center z-50">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 text-center space-y-8">
          <div className="text-8xl animate-bounce">🥋</div>
          <div className="text-4xl md:text-6xl font-bold animate-pulse">
            I KNOW KUNG FU
          </div>
          <div className="text-xl text-green-300">
            Loading the complete MCP matrix...
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping animation-delay-200"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping animation-delay-400"></div>
          </div>
        </div>
      </div>
    )
  }

  // Matrix-themed wrapper for content
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Matrix rain background */}
      {hasEnteredMatrix && (
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 w-full h-full opacity-10 pointer-events-none z-0" 
        />
      )}

      {/* Matrix-themed header */}
      {hasEnteredMatrix && (
        <div className="relative z-10 bg-black text-green-400 border-b border-green-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🐰</span>
              <div>
                <div className="font-bold font-mono">MATRIX MODE ACTIVATED</div>
                <div className="text-sm text-green-300">Maximum information density enabled</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 text-sm font-mono">
              <div className="text-green-300">
                <span className="text-gray-500">STATUS:</span> CONNECTED
              </div>
              <div className="text-green-300">
                <span className="text-gray-500">DEPTH:</span> MAXIMUM
              </div>
              <div className="text-green-300">
                <span className="text-gray-500">FEEDS:</span> ALL
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/?v=simple'}
              className="bg-blue-900 hover:bg-blue-800 border border-blue-400 text-blue-100 px-4 py-2 rounded text-sm font-mono transition-colors"
            >
              💊 BLUE PILL (Exit)
            </button>
          </div>
        </div>
      )}

      {/* Main content with Matrix styling */}
      <div className={`relative z-10 ${hasEnteredMatrix ? 'bg-black/90' : ''}`}>
        {/* Easter egg breadcrumbs */}
        {hasEnteredMatrix && (
          <div className="container mx-auto px-4 py-2">
            <div className="text-center text-xs font-mono text-green-600">
              <span className="animate-pulse">▓</span> Welcome to the Real Internet <span className="animate-pulse">▓</span>
            </div>
          </div>
        )}

        {/* Styled content wrapper */}
        <div className={hasEnteredMatrix ? 'text-green-400' : ''}>
          {children}
        </div>

        {/* Matrix-themed floating elements */}
        {hasEnteredMatrix && (
          <div className="fixed bottom-4 right-4 z-20 space-y-2">
            <div className="bg-black border border-green-400 rounded p-2 text-xs font-mono text-green-300">
              <div>🔴 RED PILL ACTIVE</div>
              <div>📊 DATA FLOW: MAXIMUM</div>
              <div>🔍 HIDDEN: REVEALED</div>
            </div>
          </div>
        )}

        {/* Matrix footer */}
        {hasEnteredMatrix && (
          <div className="relative z-10 bg-black text-green-400 border-t border-green-600 p-4 mt-12">
            <div className="container mx-auto text-center font-mono">
              <div className="text-sm space-y-2">
                <div>
                  🐰 <strong>Congratulations.</strong> You've seen how deep the rabbit hole goes.
                </div>
                <div className="text-green-600">
                  The Matrix has you now. Welcome to the agentic web.
                </div>
                <div className="text-xs text-gray-500 mt-4">
                  "Free your mind." - Morpheus • "I know Kung Fu." - Neo • "Welcome to the real world." - Morpheus
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS for animation delays */}
      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}