'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
  className?: string
  label?: string
  variant?: 'default' | 'minimal' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
}

export function CopyButton({ 
  text, 
  className = '',
  label = 'Copy',
  variant = 'default',
  size = 'md'
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const variantClasses = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-600',
    minimal: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200',
    outlined: 'bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300'
  }

  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'

  return (
    <button
      onClick={copyToClipboard}
      className={`
        inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200
        ${sizeClasses[size]}
        ${copied 
          ? 'bg-green-600 text-white border-green-600' 
          : variantClasses[variant]
        }
        ${className}
      `}
      disabled={copied}
      title={copied ? 'Copied!' : `Copy ${label.toLowerCase()}`}
    >
      {copied ? (
        <>
          <Check className={iconSize} />
          Copied!
        </>
      ) : (
        <>
          <Copy className={iconSize} />
          {label}
        </>
      )}
    </button>
  )
}

// Version avec icône seulement
export function CopyIconButton({ 
  text, 
  className = '',
  size = 'md'
}: Omit<CopyButtonProps, 'label' | 'variant'>) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  }

  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'

  return (
    <button
      onClick={copyToClipboard}
      className={`
        inline-flex items-center justify-center rounded-lg transition-all duration-200
        ${sizeClasses[size]}
        ${copied 
          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
        ${className}
      `}
      disabled={copied}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <Check className={iconSize} />
      ) : (
        <Copy className={iconSize} />
      )}
    </button>
  )
}