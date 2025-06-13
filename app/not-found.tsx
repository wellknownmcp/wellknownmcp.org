'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function NotFound() {
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [matrixRain, setMatrixRain] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  
  const quotes = [
    "Unfortunately, no one can be told what the Matrix is. You have to see it for yourself.",
    "There is no spoon... only .llmfeed.json",
    "What if I told you... your AI context doesn't have to be lost?",
    "The path you're looking for does not exist. But your session context can.",
    "Welcome to the real world, where context is portable."
  ]
  
  const [currentQuote, setCurrentQuote] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])
  
  const handleSecretClick = () => {
    setClickCount(prev => prev + 1)
    
    if (clickCount === 2) { // Third click
      setShowEasterEgg(true)
      setMatrixRain(true)
      setTimeout(() => setMatrixRain(false), 3000)
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-12 relative overflow-hidden">
      {/* Matrix Rain Effect */}
      {matrixRain && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="matrix-rain">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="matrix-char"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="z-10 relative">
        <h1 
          className="text-6xl font-bold mb-4 cursor-pointer hover:text-green-400 transition-colors duration-300"
          onClick={handleSecretClick}
        >
          4🔍4
        </h1>
        
        <div className="text-xl text-muted-foreground mb-8 max-w-2xl">
          <p className="mb-4 min-h-[3rem] flex items-center justify-center">
            "{quotes[currentQuote]}"
          </p>
          
          {showEasterEgg && (
            <div className="mt-6 p-4 border border-green-400 rounded-lg bg-green-950/20 animate-pulse">
              <p className="text-green-400 font-mono text-sm mb-2">
                🥋 I know kung fu.
              </p>
              <p className="text-xs text-green-300">
                Easter egg unlocked! You've discovered the secret of portable AI context.
              </p>
            </div>
          )}
        </div>
        
        {/* Navigation Options */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <span>🏠</span>
              Return to Reality
            </Link>
            
            <Link 
              href="/spec" 
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <span>📋</span>
              Read the Spec
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/examples" 
              className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <span>💡</span>
              See Examples
            </Link>
            
            <Link 
              href="/join" 
              className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <span>🤝</span>
              Join the Community
            </Link>
          </div>
        </div>
        
        {/* Context Export Tease */}
        <div className="max-w-md mx-auto text-sm text-gray-500 border-t pt-6">
          <p className="mb-2">Lost your way? Your context doesn't have to be.</p>
          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
            {"{ \"feed_type\": \"session\", \"current_location\": \"404\" }"}
          </code>
        </div>
      </div>
      
      {/* CSS for Matrix Rain */}
      <style jsx>{`
        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .matrix-char {
          position: absolute;
          top: -20px;
          color: #00ff00;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          animation: fall linear infinite;
          opacity: 0.8;
        }
        
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        @media (max-width: 640px) {
          .matrix-char {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  )
}