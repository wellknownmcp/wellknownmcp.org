'use client'
import { useState } from 'react'
import { BrainCircuit, Copy, Shield, Lock, Package, Loader } from 'lucide-react'

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

interface ExportToLLMButtonProps {
  context?: 'current' | 'static' | 'dynamic' | 'zip'
  staticPath?: string
  dynamicId?: string
  highlight?: boolean
  mini?: boolean
  clipboard?: boolean
  showSignatureStatus?: boolean
}

export function ExportToLLMButton({
  context = 'current',
  staticPath,
  dynamicId,
  highlight = false,
  mini = false,
  clipboard = false,
  showSignatureStatus = false,
}: ExportToLLMButtonProps) {
  const [signatureStatus, setSignatureStatus] = useState<
    'none' | 'signed' | 'certified'
  >('none')
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
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

        if (showSignatureStatus) {
          const status = feed.certification?.value
            ? 'certified'
            : feed.signature?.value
            ? 'signed'
            : 'none'
          setSignatureStatus(status)
        }

        if (clipboard) {
          try {
            if (document.hasFocus()) {
              await navigator.clipboard.writeText(JSON.stringify(feed, null, 2))
            } else {
              console.warn('Document not focused, clipboard skipped.')
            }
          } catch (e) {
            console.warn('Clipboard write failed:', e)
          }
          return
        }

        const blob = new Blob([JSON.stringify(feed, null, 2)], {
          type: 'application/json',
        })
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
        return
      }

      if (context === 'static') {
        const path = `/api/llmfeed/static/${staticPath ?? 'default'}`

        if (clipboard) {
          try {
            const res = await fetch(path)
            const feed = await res.json()
            await navigator.clipboard.writeText(JSON.stringify(feed, null, 2))
            console.info('✅ Static feed copied to clipboard')
          } catch (e) {
            console.error('❌ Failed to copy static feed to clipboard:', e)
          }
          return
        }

        window.open(path, '_blank')

        if (showSignatureStatus) {
          try {
            const res = await fetch(path)
            const feed = await res.json()
            const status = extractSignatureStatus(feed)
            setSignatureStatus(status)
          } catch (e) {
            console.warn('Unable to fetch static feed signature:', e)
          }
        }

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
          console.error('❌ Dynamic export failed:', res.status, errorText)
          throw new Error(`Dynamic export failed with status ${res.status}`)
        }

        const text = await res.text()
        if (!text.trim())
          throw new Error('Empty response body from dynamic export')

        const feed = JSON.parse(text)

        if (clipboard) {
          try {
            if (document.hasFocus()) {
              await navigator.clipboard.writeText(JSON.stringify(feed, null, 2))
            } else {
              console.warn('⚠️ Document not focused, clipboard skipped.')
            }
          } catch (e) {
            console.warn('⚠️ Clipboard write failed:', e)
          }
          return
        }

        const blob = new Blob([JSON.stringify(feed, null, 2)], {
          type: 'application/json',
        })
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
        return
      }

      if (context === 'zip') {
        const zipPath = staticPath
          ? staticPath.replace(/\.zip$/, '')
          : 'default'
        window.open(`/exports/${zipPath}.zip`, '_blank')
        return
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative inline-block" data-llm="ignore">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`flex items-center justify-center ${
          mini ? 'p-1' : 'px-4 py-2'
        } text-violet-600 rounded ${
          loading ? 'animate-pulse opacity-60 cursor-wait' : ''
        }`}
        title={`Export (${context}${
          context === 'static'
            ? `: ${staticPath}`
            : context === 'dynamic'
            ? `: ${dynamicId}`
            : ''
        })`}
        aria-label={`Export (${context}${
          context === 'static'
            ? `: ${staticPath}`
            : context === 'dynamic'
            ? `: ${dynamicId}`
            : ''
        })`}
      >
        {loading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            {!mini && <span className="ml-2">Exporting…</span>}
          </>
        ) : (
          <>
            {context === 'zip' ? (
              <Package className="w-5 h-5" />
            ) : (
              <BrainCircuit className="w-5 h-5" />
            )}
            {!mini && (
              <span className="ml-2">
                {context === 'zip' ? 'Download ZIP' : 'Export LLMFeed'}
              </span>
            )}
          </>
        )}
      </button>
      {highlight && (
        <span className="absolute -top-2 -right-3 bg-violet-600 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold shadow">
          NEW
        </span>
      )}

      {clipboard && (
        <div className="absolute top-0 right-0 bg-white rounded-full p-1 shadow">
          <Copy className="w-2 h-2 text-purple-500" />
        </div>
      )}

      {showSignatureStatus && signatureStatus !== 'none' && (
        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
          {signatureStatus === 'certified' ? (
            <Shield className="w-3 h-3 text-purple-500" />
          ) : (
            <Lock className="w-3 h-3 text-purple-500" />
          )}
        </div>
      )}
    </div>
  )
}
