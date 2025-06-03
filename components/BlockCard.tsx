import React from 'react'
import { MCPBlockStatus } from '@/types/MCPBlockStatus'

const blockEmojis: Record<string, string> = {
  metadata: '🧠',
  data: '📦',
  trust: '🛡️',
  api: '🛰️',
  auth: '🔐',
  ui: '🎨',
  example: '🧪',
  history: '🕰️',
  credits: '🙏',
  signature: '✍️',
  certification: '🏅',
}

interface BlockCardProps {
  block: MCPBlockStatus
  signatureValid: boolean
  certificationValid: boolean
  feed?: any
}

export default function BlockCard({
  block,
  signatureValid,
  certificationValid,
  feed,
}: BlockCardProps) {
  const {
    blockName,
    content,
    isSigned,
    isCertificationPresent,
    certificationAuthority,
    certificationOwner,
  } = block

  const emoji = blockEmojis[blockName] || '📄'

  // 🚀 Detect special "signature" block
  const isSignatureBlock = blockName === 'signature'
  const signatureBlockValid = isSignatureBlock && signatureValid

  // 🚀 Color logic
  let bgColor = 'bg-gray-100'
  if (signatureBlockValid) {
    bgColor = 'bg-yellow-400 text-black' // GOLD for valid signature block
  } else if (
    isSigned &&
    signatureValid &&
    isCertificationPresent &&
    certificationValid
  ) {
    bgColor = 'bg-green-700 text-white'
  } else if (isSigned && signatureValid) {
    bgColor = 'bg-green-500 text-white'
  } else if (isSigned && !signatureValid) {
    bgColor = 'bg-red-500 text-white'
  }

  return (
    <div className={`rounded shadow p-4 ${bgColor}`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-lg">
          {emoji} {blockName}
        </h4>
        <div className="text-sm space-x-2">
          {isSignatureBlock && signatureBlockValid && (
            <span className="px-2 py-1 rounded bg-white text-black">
              🏅 Signature Valid
            </span>
          )}
          {isSigned && (
            <span className="px-2 py-1 rounded bg-white text-black">
              🔒 Signed
            </span>
          )}
          {isSigned && signatureValid && (
            <span className="px-2 py-1 rounded bg-white text-black">
              ✅ Valid
            </span>
          )}
          {isCertificationPresent && certificationValid && (
            <span className="px-2 py-1 rounded bg-white text-black">
              🛡️ Certified
            </span>
          )}
          {certificationAuthority && (
            <span className="px-2 py-1 rounded bg-white text-black">
              👑 {certificationAuthority}
            </span>
          )}
        </div>
      </div>
      <pre className="text-xs whitespace-pre-wrap break-words font-mono">
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  )
}
