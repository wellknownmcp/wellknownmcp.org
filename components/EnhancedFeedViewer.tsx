import { useEffect, useState } from 'react'
import {
  verifyFeedSignature,
  verifyFeedCertification,
} from '@/lib/verifyCrypto'
import { analyzeBlocks } from '@/lib/analyzeBlocks'
import BlockCard from '@/components/BlockCard'
import { UploadCloud } from 'lucide-react'

export default function EnhancedFeedViewer({
  feed,
  mode = 'hub',
}: {
  feed: any
  mode?: 'hub' | 'verify'
}) {
  const [signatureStatus, setSignatureStatus] = useState<{
    ok: boolean
    message: string
  } | null>(null)
  const [certStatuses, setCertStatuses] = useState<
    { cert: any; result: { ok: boolean; message: string } }[]
  >([])
  const [blockStatuses, setBlockStatuses] = useState<any[]>([])

  useEffect(() => {
    if (!feed) return

    const runAnalysis = async () => {
      let sigStatus
      try {
        sigStatus = await verifyFeedSignature(feed)
      } catch (e) {
        sigStatus = {
          ok: false,
          message: 'Signature check has failed: ' + (e?.message ?? String(e)),
        }
      }
      setSignatureStatus(sigStatus)

      const certs =
        feed.certifications ?? (feed.certification ? [feed.certification] : [])
      if (certs.length > 0) {
        const results = await Promise.all(
          certs.map((cert) => verifyFeedCertification(feed, cert))
        )
        setCertStatuses(
          results.map((result, i) => ({ cert: certs[i], result }))
        )
      }

      const blocks = analyzeBlocks(feed)
      setBlockStatuses(blocks)
    }

    runAnalysis()
  }, [feed])

  if (!feed || typeof feed !== 'object') {
    return <p className="text-red-500">❌ No valid feed provided.</p>
  }

  const feedTypeEmoji: Record<string, string> = {
    'feed-index': '🧭',
    'feed-reference': '📎',
    'feed-spec': '📜',
    example: '🧪',
    'feed-news': '📰',
    capsule: '💊',
    mcp: '🤖',
    default: '🧠',
  }

  const isMCP = feed.feed_type === 'mcp'
  const feedTypeLabel = feed.feed_type || 'default'

  return (
    <div className="space-y-4">
      {mode === 'verify' && isMCP && (
        <div className="border border-red-500 bg-red-50 text-red-800 p-4 rounded">
          <strong>⚠️ Attention :</strong> This feed is a <code>mcp</code> type
          but not signed/cerified in full. LLM can strongly downgrade their
          trust.
        </div>
      )}

      <h2 className="text-xl font-bold flex items-center gap-2">
        <UploadCloud className="text-blue-600" />
        {feed.title || feed.metadata?.title || 'Untitled Feed'}{' '}
        {feedTypeEmoji[feedTypeLabel] || feedTypeEmoji.default}
      </h2>

      <div>
        <p>
          <strong>Type:</strong> {feedTypeLabel}
        </p>
        <p>
          <strong>Description:</strong>{' '}
          {feed.metadata?.description || feed.description || ''}
        </p>
      </div>

      <div className="border rounded p-3">
        <h3 className="font-semibold">Signature</h3>
        {signatureStatus ? (
          <p className={signatureStatus.ok ? 'text-green-600' : 'text-red-600'}>
            {signatureStatus.ok ? '✅' : '❌'} {signatureStatus.message}
          </p>
        ) : (
          <p className="text-gray-500 italic">Checking...</p>
        )}
      </div>

      {blockStatuses.length > 0 && (
        <>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-4 flex-wrap mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-700" /> ✅ signé +
              certifié
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500" /> 🔒 signé
              uniquement
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500" /> ⚠️ signature
              invalide
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-400" /> ❌ non signé
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {blockStatuses.map((block) => (
              <BlockCard key={block.blockName} block={block} feed={feed} />
            ))}
          </div>
        </>
      )}

      <div className="border rounded p-3">
        <h3 className="font-semibold">Certifications</h3>
        {certStatuses.length === 0 ? (
          <p className="text-gray-500 italic">No certifications found.</p>
        ) : (
          <ul className="space-y-2">
            {certStatuses.map(({ cert, result }, idx) => (
              <li key={idx} className="border rounded p-2">
                <div className="flex items-center gap-2">
                  {result.ok ? '✅' : '❌'}
                  <span className="font-semibold">
                    {cert.level?.toUpperCase() || 'Unknown level'}
                  </span>
                  <span className="text-sm text-gray-500">
                    by{' '}
                    {cert.public_key_url || cert.public_key_hint
                      ? new URL(cert.public_key_url ?? cert.public_key_hint)
                          .hostname
                      : 'unknown'}
                  </span>
                </div>
                <div className="text-sm mt-1">
                  {result.message}
                  <br />
                  {cert.policy_url && (
                    <a
                      href={cert.policy_url}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View policy
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
