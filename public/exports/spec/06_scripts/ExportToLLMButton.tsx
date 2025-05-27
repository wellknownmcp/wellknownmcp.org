'use client'

import { useState } from 'react'
import { BrainCircuit, Copy, Shield, Lock, Package } from 'lucide-react'

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

  const handleClick = async () => {
    if (context === 'current') {
      const html = document.documentElement.outerHTML
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
      window.open(`/api/llmfeed/static/${staticPath ?? 'default'}`)
      return
    }

    if (context === 'dynamic') {
      window.open(`/api/llmfeed/dynamic/${dynamicId ?? 'default'}`)
      return
    }

    if (context === 'zip') {
      const zipPath = staticPath ? staticPath.replace(/\\.zip$/, '') : 'default'
      window.open(`/exports/${zipPath}.zip`, '_blank')
      return
    }
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className={`flex items-center justify-center ${
          mini ? 'p-1' : 'px-4 py-2'
        } text-violet-600 rounded`}
        title="Export"
        aria-label="Export"
      >
        {context === 'zip' ? (
          <Package className="w-5 h-5" aria-label="export zip icon" />
        ) : (
          <BrainCircuit className="w-5 h-5" aria-label="export button icon" />
        )}
        {!mini && (
          <span className="ml-2">
            {context === 'zip' ? 'Download ZIP' : 'Export LLMFeed'}
          </span>
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
