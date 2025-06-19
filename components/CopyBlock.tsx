'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyBlockProps {
  content: string
  language?: string
  title?: string
  className?: string
  showLineNumbers?: boolean
}

export function CopyBlock({ 
  content, 
  language = 'text', 
  title,
  className = '',
  showLineNumbers = false 
}: CopyBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Simple syntax highlighting for common cases
  const getHighlightedContent = () => {
    if (language === 'json') {
      return content
        .replace(/"([^"]+)":/g, '<span class="text-blue-600">"$1":</span>')
        .replace(/: "([^"]+)"/g, ': <span class="text-green-600">"$1"</span>')
        .replace(/: ([0-9]+)/g, ': <span class="text-purple-600">$1</span>')
        .replace(/: (true|false)/g, ': <span class="text-orange-600">$1</span>')
        .replace(/{/g, '<span class="text-gray-800">{</span>')
        .replace(/}/g, '<span class="text-gray-800">}</span>')
        .replace(/\[/g, '<span class="text-gray-800">[</span>')
        .replace(/]/g, '<span class="text-gray-800">]</span>')
    }
    
    if (language === 'bash') {
      return content
        .replace(/^(#.*$)/gm, '<span class="text-gray-500">$1</span>')
        .replace(/^(export\s+)/gm, '<span class="text-blue-600">$1</span>')
        .replace(/^(curl\s+)/gm, '<span class="text-green-600">$1</span>')
        .replace(/(-[A-Za-z]+)/g, '<span class="text-purple-600">$1</span>')
        .replace(/(https?:\/\/[^\s]+)/g, '<span class="text-blue-500 underline">$1</span>')
        .replace(/("([^"]+)")/g, '<span class="text-yellow-600">$1</span>')
        .replace(/(❌|✅)/g, '<span class="text-lg">$1</span>')
    }

    return content
  }

  const lines = content.split('\n')

  return (
    <div className={`relative group ${className}`}>
      {title && (
        <div className="bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700">{title}</span>
          <span className="text-xs text-gray-500 ml-2 uppercase">{language}</span>
        </div>
      )}
      
      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 z-10 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors opacity-0 group-hover:opacity-100"
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300" />
          )}
        </button>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm">
            <code className="text-gray-100">
              {showLineNumbers ? (
                <div className="table">
                  {lines.map((line, index) => (
                    <div key={index} className="table-row">
                      <span className="table-cell text-gray-500 text-right pr-4 select-none border-r border-gray-700 mr-4">
                        {index + 1}
                      </span>
                      <span 
                        className="table-cell pl-4"
                        dangerouslySetInnerHTML={{ 
                          __html: getHighlightedContent().split('\n')[index] || '' 
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: getHighlightedContent() 
                  }}
                />
              )}
            </code>
          </pre>
        </div>

        {/* Copy Status Overlay */}
        {copied && (
          <div className="absolute inset-0 bg-green-900 bg-opacity-90 flex items-center justify-center">
            <div className="flex items-center gap-2 text-green-100 font-medium">
              <Check className="w-5 h-5" />
              Copied to clipboard!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Alternative simpler version without syntax highlighting
export function SimpleCopyBlock({ content, language = 'text', className = '' }: CopyBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className={`relative group ${className}`}>
      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 z-10 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors opacity-0 group-hover:opacity-100"
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300" />
          )}
        </button>

        <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
          <code>{content}</code>
        </pre>

        {copied && (
          <div className="absolute inset-0 bg-green-900 bg-opacity-90 flex items-center justify-center">
            <div className="flex items-center gap-2 text-green-100 font-medium">
              <Check className="w-5 h-5" />
              Copied!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}