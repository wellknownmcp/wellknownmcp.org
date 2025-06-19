// ExportToLLMButton.tsx - Version finale optimisée
'use client'
import { useState, useEffect } from 'react'
import { BrainCircuit, Copy, Shield, Lock, Package, Loader, Terminal, ExternalLink, Check, Eye, AlertCircle } from 'lucide-react'

// ✅ TYPES ÉTENDUS (100% backward compatible)
interface ExportToLLMButtonProps {
  // Props existantes (INCHANGÉES pour compatibilité)
  context?: 'current' | 'static' | 'dynamic' | 'zip'
  staticPath?: string
  dynamicId?: string
  highlight?: boolean
  mini?: boolean
  clipboard?: boolean
  showSignatureStatus?: boolean
  showCurlCommand?: boolean
  showDirectUrl?: boolean
  
  // 🆕 NOUVELLES PROPS (toutes optionnelles)
  variant?: 'ghost-mini' | 'primary' | 'developer' | 'default' | 'auto'
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
  showFeedSize?: boolean
  showLastUpdated?: boolean
  showPreview?: boolean
  customLabel?: string
  enableCache?: boolean
  enableAnalytics?: boolean
  onSuccess?: (feed: any, metadata: { size: number, signatureStatus: string }) => void
  onError?: (error: Error, context: { operation: string, retryCount: number }) => void
  maxRetries?: number
}

// ✅ CACHE INTELLIGENT (nouveau, optionnel)
const feedCache = new Map<string, { data: any, timestamp: number, size: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// ✅ HELPER FUNCTIONS (extraites pour réutilisabilité)
function extractSignatureStatus(feed: any): 'none' | 'signed' | 'certified' {
  if (feed?.certification?.value) return 'certified'
  if (feed?.signature?.value) return 'signed'
  return 'none'
}

function cleanClonedDOM(cloned: HTMLElement) {
  const nodes = cloned.querySelectorAll(
    'nav, footer, .share-buttons, [data-llm="ignore"], a[href*="twitter"], a[href*="linkedin"], a[href*="wa.me"]'
  )
  nodes.forEach((el) => el.remove())
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

// ✅ PREVIEW MODAL COMPONENT (nouveau)
interface FeedPreviewModalProps {
  feed: any
  url: string
  onClose: () => void
  onDownload: () => void
}

function FeedPreviewModal({ feed, url, onClose, onDownload }: FeedPreviewModalProps) {
  const feedSize = JSON.stringify(feed).length
  const signatureStatus = extractSignatureStatus(feed)
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Feed Preview</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
            aria-label="Close preview"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Title:</span>
              <p className="text-sm font-mono">{feed?.metadata?.title || feed?.title || 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Size:</span>
              <p className="text-sm font-mono">{formatBytes(feedSize)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Trust Level:</span>
              <p className="text-sm font-mono flex items-center gap-1">
                {signatureStatus === 'certified' && <Shield className="w-4 h-4 text-purple-500" />}
                {signatureStatus === 'signed' && <Lock className="w-4 h-4 text-blue-500" />}
                {signatureStatus === 'none' && <AlertCircle className="w-4 h-4 text-gray-400" />}
                {signatureStatus}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Type:</span>
              <p className="text-sm font-mono">{feed?.feed_type || 'unknown'}</p>
            </div>
          </div>
          
          {/* JSON Preview */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">JSON Content:</label>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-auto max-h-96 border">
              {JSON.stringify(feed, null, 2)}
            </pre>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button 
              onClick={onDownload}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <BrainCircuit className="w-4 h-4 inline mr-2" />
              Download Feed
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4 inline mr-2" />
              Open in New Tab
            </a>
            <button 
              onClick={onClose}
              className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ExportToLLMButton({
  // Props existantes avec valeurs par défaut INCHANGÉES
  context = 'current',
  staticPath,
  dynamicId,
  highlight = false,
  mini = false,
  clipboard = false,
  showSignatureStatus = false,
  showCurlCommand = false,
  showDirectUrl = false,
  
  // Nouvelles props avec défauts sûrs
  variant = 'auto',
  tooltipPosition = 'bottom',
  showFeedSize = false,
  showLastUpdated = false,
  showPreview = false,
  customLabel,
  enableCache = true,
  enableAnalytics = false,
  onSuccess,
  onError,
  maxRetries = 3,
}: ExportToLLMButtonProps) {
  
  // ✅ STATES (étendus mais compatibles)
  const [signatureStatus, setSignatureStatus] = useState<'none' | 'signed' | 'certified'>('none')
  const [loading, setLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [copiedCurl, setCopiedCurl] = useState(false)
  const [copied, setCopied] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [feedSize, setFeedSize] = useState<number>(0)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [previewData, setPreviewData] = useState<any>(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  // ✅ AUTO-VARIANT (détermine le style selon les props existantes)
  const getResolvedVariant = (): string => {
    if (variant !== 'auto') return variant
    
    if (mini && clipboard) return 'ghost-mini'
    if (highlight) return 'primary'
    if (showCurlCommand || showDirectUrl) return 'developer'
    return 'default'
  }

  // ✅ STYLE VARIANTS (backward compatible)
  const getButtonStyles = (): string => {
    const resolvedVariant = getResolvedVariant()
    const baseStyles = `relative inline-flex items-center justify-center transition-all duration-200 ${
      loading ? 'animate-pulse opacity-60 cursor-wait' : 'cursor-pointer'
    }`
    
    const variants = {
      'ghost-mini': `${baseStyles} p-1 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md`,
      'primary': `${baseStyles} px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg hover:from-violet-600 hover:to-purple-600 shadow-sm`,
      'developer': `${baseStyles} px-4 py-2 border border-violet-200 dark:border-violet-700 hover:border-violet-400 text-violet-600 dark:text-violet-400 rounded-lg bg-violet-50/50 dark:bg-violet-900/10 hover:bg-violet-50 dark:hover:bg-violet-900/20`,
      'default': `${baseStyles} px-4 py-2 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg`
    }
    
    return variants[resolvedVariant as keyof typeof variants] || variants.default
  }

  // ✅ URL ET CURL GENERATION (inchangées)
  const getDirectUrl = () => {
    const baseUrl = 'https://wellknownmcp.org'
    
    switch (context) {
      case 'static':
        return `${baseUrl}/api/llmfeed/static/${staticPath ?? 'default'}`
      case 'dynamic':
        return `${baseUrl}/api/llmfeed/dynamic/${dynamicId ?? 'default'}`
      case 'zip':
        const zipPath = staticPath ? staticPath.replace(/\.zip$/, '') : 'default'
        return `${baseUrl}/exports/${zipPath}.zip`
      default:
        return `${baseUrl}/api/export/feed`
    }
  }

  const getCurlCommand = () => {
    const url = getDirectUrl()
    
    if (context === 'zip') {
      return `curl -L -o "feed.zip" "${url}"`
    }
    
    if (context === 'current' || context === 'dynamic') {
      return `curl -X POST -H "Content-Type: application/json" -d '{"html":"<html>...</html>"}' "${url}" | jq .`
    }
    
    return `curl -s "${url}" | jq .`
  }

  // ✅ CACHE FUNCTIONS (nouvelles, optionnelles)
  const getCachedFeed = async (url: string) => {
    if (!enableCache) {
      const response = await fetch(url)
      const data = await response.json()
      return data
    }

    const cached = feedCache.get(url)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setFeedSize(cached.size)
      return cached.data
    }
    
    const response = await fetch(url)
    const data = await response.json()
    const size = JSON.stringify(data).length
    
    feedCache.set(url, { data, timestamp: Date.now(), size })
    setFeedSize(size)
    return data
  }

  // ✅ ANALYTICS (nouveau, optionnel)
  const trackEvent = (action: string, success: boolean, metadata?: any) => {
    if (!enableAnalytics) return
    
    try {
      // Custom event pour intégration analytics
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('llmfeed-analytics', {
          detail: { action, success, context, metadata, timestamp: Date.now() }
        }))
      }
      
      // Google Analytics si disponible
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // @ts-ignore
        window.gtag('event', action, {
          event_category: 'llmfeed_export',
          event_label: context,
          value: success ? 1 : 0,
          ...metadata
        })
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  }

  // ✅ ERROR HANDLING WITH RETRY (amélioré)
  const handleWithRetry = async (action: () => Promise<any>, operation: string) => {
    try {
      const result = await action()
      setRetryCount(0)
      return result
    } catch (error) {
      const currentRetry = retryCount + 1
      
      if (currentRetry <= maxRetries) {
        console.warn(`${operation} failed, retrying (${currentRetry}/${maxRetries})...`, error)
        setRetryCount(currentRetry)
        
        // Exponential backoff
        setTimeout(() => {
          handleWithRetry(action, operation)
        }, Math.pow(2, currentRetry) * 1000)
        
        return
      }
      
      // Max retries reached
      setRetryCount(0)
      trackEvent('export_error', false, { operation, error: error.message })
      
      if (onError) {
        onError(error as Error, { operation, retryCount: currentRetry })
      } else {
        console.error(`${operation} failed after ${maxRetries} retries:`, error)
      }
      
      throw error
    }
  }

  // ✅ CLIPBOARD FUNCTIONS (améliorées)
  const copyToClipboard = async (content: string, type: string = 'content') => {
    try {
      await navigator.clipboard.writeText(content)
      
      if (type === 'curl') {
        setCopiedCurl(true)
        setTimeout(() => setCopiedCurl(false), 2000)
      } else {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
      
      trackEvent('clipboard_copy', true, { type, size: content.length })
      
      // Custom event pour feedback UI
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('llmfeed-copied', { 
          detail: { type: context, contentType: type, size: content.length } 
        }))
      }
      
    } catch (err) {
      console.error('Clipboard failed:', err)
      trackEvent('clipboard_copy', false, { type, error: err.message })
      throw err
    }
  }

  const copyCurlCommand = () => copyToClipboard(getCurlCommand(), 'curl')

  // ✅ PREVIEW FUNCTION (nouvelle)
  const handlePreview = async () => {
    if (!showPreview) return
    
    setLoading(true)
    try {
      const url = getDirectUrl()
      const feed = await getCachedFeed(url)
      setPreviewData(feed)
      setShowPreviewModal(true)
      trackEvent('preview_opened', true)
    } catch (error) {
      console.error('Preview failed:', error)
      trackEvent('preview_opened', false, { error: error.message })
    } finally {
      setLoading(false)
    }
  }

  // ✅ MAIN CLICK HANDLER (étendu mais compatible)
  const handleClick = async () => {
    if (showPreview && !previewData) {
      handlePreview()
      return
    }

    setLoading(true)
    
    const operation = `export_${context}`
    trackEvent('export_started', true, { context, clipboard, mini })

    await handleWithRetry(async () => {
      let html = document.documentElement.outerHTML

      if (context === 'current') {
        const cloned = document.documentElement.cloneNode(true) as HTMLElement
        cleanClonedDOM(cloned)
        html = cloned.outerHTML
      }

      if (context === 'current') {
        const res = await fetch('/api/export/feed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html }),
        })
        const feed = await res.json()
        const size = JSON.stringify(feed).length

        if (showSignatureStatus) {
          const status = extractSignatureStatus(feed)
          setSignatureStatus(status)
        }

        if (clipboard) {
          await copyToClipboard(JSON.stringify(feed, null, 2))
          trackEvent('export_completed', true, { context, clipboard: true, size })
          onSuccess?.(feed, { size, signatureStatus: extractSignatureStatus(feed) })
          return
        }

        const blob = new Blob([JSON.stringify(feed, null, 2)], {
          type: 'application/json',
        })
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
        
        trackEvent('export_completed', true, { context, size })
        onSuccess?.(feed, { size, signatureStatus: extractSignatureStatus(feed) })
        return
      }

      if (context === 'static') {
        const path = `/api/llmfeed/static/${staticPath ?? 'default'}`

        if (clipboard) {
          const feed = await getCachedFeed(`https://wellknownmcp.org${path}`)
          await copyToClipboard(JSON.stringify(feed, null, 2))
          
          trackEvent('export_completed', true, { context, clipboard: true, size: feedSize })
          onSuccess?.(feed, { size: feedSize, signatureStatus: extractSignatureStatus(feed) })
          return
        }

        window.open(path, '_blank')

        if (showSignatureStatus) {
          const feed = await getCachedFeed(`https://wellknownmcp.org${path}`)
          const status = extractSignatureStatus(feed)
          setSignatureStatus(status)
          
          onSuccess?.(feed, { size: feedSize, signatureStatus: status })
        }

        trackEvent('export_completed', true, { context })
        return
      }

      if (context === 'dynamic') {
        const res = await fetch(
          `/api/llmfeed/dynamic/${dynamicId ?? 'default'}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html }),
          }
        )

        if (!res.ok) {
          const errorText = await res.text()
          throw new Error(`Dynamic export failed with status ${res.status}: ${errorText}`)
        }

        const text = await res.text()
        if (!text.trim()) {
          throw new Error('Empty response body from dynamic export')
        }

        const feed = JSON.parse(text)
        const size = JSON.stringify(feed).length

        if (clipboard) {
          await copyToClipboard(JSON.stringify(feed, null, 2))
          trackEvent('export_completed', true, { context, clipboard: true, size })
          onSuccess?.(feed, { size, signatureStatus: extractSignatureStatus(feed) })
          return
        }

        const blob = new Blob([JSON.stringify(feed, null, 2)], {
          type: 'application/json',
        })
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
        
        trackEvent('export_completed', true, { context, size })
        onSuccess?.(feed, { size, signatureStatus: extractSignatureStatus(feed) })
        return
      }

      if (context === 'zip') {
        const zipPath = staticPath ? staticPath.replace(/\.zip$/, '') : 'default'
        window.open(`/exports/${zipPath}.zip`, '_blank')
        trackEvent('export_completed', true, { context, format: 'zip' })
        return
      }
    }, operation)
    
    setLoading(false)
  }

  // ✅ KEYBOARD ACCESSIBILITY (nouveau)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
    
    if (e.key === 'c' && (e.ctrlKey || e.metaKey) && clipboard) {
      e.preventDefault()
      handleClick()
    }
  }

  // ✅ FETCH METADATA ON MOUNT (nouveau, optionnel)
  useEffect(() => {
    if ((showFeedSize || showLastUpdated) && context === 'static' && staticPath) {
      const fetchMetadata = async () => {
        try {
          const url = getDirectUrl()
          const response = await fetch(url, { method: 'HEAD' })
          
          if (showLastUpdated) {
            const lastModified = response.headers.get('last-modified')
            if (lastModified) {
              setLastUpdated(new Date(lastModified).toLocaleDateString())
            }
          }
          
          if (showFeedSize && enableCache) {
            const feed = await getCachedFeed(url)
            // feedSize sera mis à jour dans getCachedFeed
          }
        } catch (error) {
          console.warn('Failed to fetch metadata:', error)
        }
      }
      
      fetchMetadata()
    }
  }, [context, staticPath, showFeedSize, showLastUpdated, enableCache])

  // ✅ TOOLTIP CONTENT (étendu)
  const getTooltipPosition = () => {
    const positions = {
      top: 'bottom-full mb-2',
      bottom: 'top-full mt-2', 
      left: 'right-full mr-2',
      right: 'left-full ml-2'
    }
    return positions[tooltipPosition] || positions.bottom
  }

  return (
    <div className="relative inline-block" data-llm="ignore">
      {/* ✅ TOOLTIP ÉTENDU */}
      {showTooltip && (showCurlCommand || showDirectUrl || showFeedSize || showLastUpdated) && (
        <div className={`absolute ${getTooltipPosition()} left-1/2 transform -translate-x-1/2 p-3 bg-slate-900 text-white rounded-lg shadow-lg z-10 min-w-64 max-w-sm`}>
          {showDirectUrl && (
            <div className="mb-2">
              <p className="text-xs text-slate-300 mb-1">Direct URL:</p>
              <div className="flex items-center gap-2">
                <code className="text-xs text-green-400 flex-1 break-all">
                  {getDirectUrl()}
                </code>
                <a
                  href={getDirectUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
          
          {showCurlCommand && (
            <div className={showDirectUrl ? "mt-2" : ""}>
              <p className="text-xs text-slate-300 mb-1">Curl command:</p>
              <div className="flex items-center gap-2">
                <code className="text-xs text-green-400 flex-1 break-all">
                  {getCurlCommand()}
                </code>
                <button
                  onClick={copyCurlCommand}
                  className="text-blue-400 hover:text-blue-300"
                  title="Copy curl command"
                >
                  {copiedCurl ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          )}

          {(showFeedSize || showLastUpdated) && (
            <div className="mt-2 pt-2 border-t border-slate-700">
              {showFeedSize && feedSize > 0 && (
                <p className="text-xs text-slate-300">Size: {formatBytes(feedSize)}</p>
              )}
              {showLastUpdated && lastUpdated && (
                <p className="text-xs text-slate-300">Updated: {lastUpdated}</p>
              )}
            </div>
          )}
          
          {/* Flèche du tooltip */}
          <div className={`absolute ${
            tooltipPosition === 'top' ? 'top-full border-t-slate-900' :
            tooltipPosition === 'left' ? 'left-full border-l-slate-900' :
            tooltipPosition === 'right' ? 'right-full border-r-slate-900' :
            'bottom-full border-b-slate-900'
          } left-1/2 transform -translate-x-1/2 border-4 border-transparent`}></div>
        </div>
      )}

      {/* ✅ BOUTON PRINCIPAL */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        className={getButtonStyles()}
        title={customLabel || `Export ${context}${
          context === 'static' ? `: ${staticPath}` :
          context === 'dynamic' ? `: ${dynamicId}` : ''
        }`}
        aria-label={customLabel || `Export ${context}${
          context === 'static' ? `: ${staticPath}` :
          context === 'dynamic' ? `: ${dynamicId}` : ''
        }`}
        tabIndex={0}
      >
        {loading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            {!mini && <span className="ml-2">Exporting…</span>}
          </>
        ) : (
          <>
            {showPreview && !previewData ? (
              <Eye className="w-5 h-5" />
            ) : context === 'zip' ? (
              <Package className="w-5 h-5" />
            ) : (
              <BrainCircuit className="w-5 h-5" />
            )}
            
            {!mini && (
              <span className="ml-2">
                {customLabel || (
                  showPreview && !previewData ? 'Preview Feed' :
                  context === 'zip' ? 'Download ZIP' : 
                  'Export LLMFeed'
                )}
              </span>
            )}
            
            {(showCurlCommand || showDirectUrl) && (
              <Terminal className="w-3 h-3 ml-1 text-slate-400" />
            )}
          </>
        )}
      </button>

      {/* ✅ BADGES (inchangés mais améliorés) */}
      {highlight && (
        <span className="absolute -top-2 -right-3 bg-violet-600 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold shadow-sm">
          NEW
        </span>
      )}

      {clipboard && (
        <div className="absolute top-0 right-0 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm border">
          {copied ? (
            <Check className="w-2 h-2 text-green-500" />
          ) : (
            <Copy className="w-2 h-2 text-purple-500" />
          )}
        </div>
      )}

      {showSignatureStatus && signatureStatus !== 'none' && (
        <div className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm border">
          {signatureStatus === 'certified' ? (
            <Shield className="w-3 h-3 text-purple-500" />
          ) : (
            <Lock className="w-3 h-3 text-blue-500" />
          )}
        </div>
      )}

      {/* ✅ PREVIEW MODAL (nouveau) */}
      {showPreviewModal && previewData && (
        <FeedPreviewModal
          feed={previewData}
          url={getDirectUrl()}
          onClose={() => setShowPreviewModal(false)}
          onDownload={() => {
            setShowPreviewModal(false)
            handleClick()
          }}
        />
      )}
    </div>
  )
}