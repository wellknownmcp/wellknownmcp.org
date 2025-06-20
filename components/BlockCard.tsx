import React, { useState } from 'react'
import { 
  MCPBlockStatus, 
  VerificationResult, 
  CertificationVerificationResult,
  SignatureValidationStatus,
  CertificationValidationStatus 
} from '@/types/MCPBlockStatus'
import { ChevronDown, ChevronUp, CheckCircle, XCircle, AlertTriangle, Shield, Key } from 'lucide-react'

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
  feed_type: '🏷️',
  capabilities: '⚡',
  prompts: '💭',
  exports: '📤',
  _meta: '🔧',
  _verification_help: '❓',
}

interface BlockCardProps {
  block: MCPBlockStatus
  signatureValid: boolean
  certificationValid: boolean
  signatureStatus?: VerificationResult | null
  certificationResults?: CertificationVerificationResult[]
  feed?: any
}

interface VerificationState {
  signature: SignatureValidationStatus
  certification: CertificationValidationStatus
}

export default function BlockCard({
  block,
  signatureValid,
  certificationValid,
  signatureStatus,
  certificationResults = [],
  feed,
}: BlockCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const {
    blockName,
    content,
    isSigned,
    isCertificationPresent,
    certificationAuthority,
    certificationOwner,
  } = block

  const emoji = blockEmojis[blockName] || '📄'
  const isSignatureBlock = blockName === 'signature'
  const isTrustBlock = blockName === 'trust'
  const isCertificationBlock = blockName === 'certification'

  // 🔍 Determine verification state
  const getVerificationState = (): VerificationState => {
    let signatureState: VerificationState['signature'] = 'pending'
    let certificationState: VerificationState['certification'] = 'pending'

    // Signature verification state
    if (signatureStatus) {
      if (signatureStatus.ok) {
        signatureState = 'valid'
      } else {
        signatureState = signatureStatus.message.includes('error') || signatureStatus.message.includes('failed') 
          ? 'error' 
          : 'invalid'
      }
    } else if (!isSigned) {
      signatureState = 'not_signed'
    }

    // Certification verification state
    if (isCertificationPresent) {
      const relevantCerts = certificationResults.filter(certResult => 
        (certResult.cert.signed_blocks || []).includes(blockName)
      )
      
      if (relevantCerts.length > 0) {
        const allValid = relevantCerts.every(cert => cert.result.ok)
        const hasError = relevantCerts.some(cert => 
          cert.result.message.includes('error') || cert.result.message.includes('failed')
        )
        
        if (allValid) {
          certificationState = 'valid'
        } else if (hasError) {
          certificationState = 'error'
        } else {
          certificationState = 'invalid'
        }
      }
    } else {
      certificationState = 'not_certified'
    }

    return { signature: signatureState, certification: certificationState }
  }

  const verificationState = getVerificationState()

  // 🎨 Color and style logic
  const getCardStyle = () => {
    // Special handling for signature block
    if (isSignatureBlock && verificationState.signature === 'valid') {
      return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black border-2 border-yellow-600'
    }

    // Special handling for trust block
    if (isTrustBlock) {
      return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-2 border-blue-700'
    }

    // Special handling for certification block
    if (isCertificationBlock) {
      if (verificationState.certification === 'valid') {
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-2 border-purple-700'
      } else if (verificationState.certification === 'invalid' || verificationState.certification === 'error') {
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white border-2 border-red-700'
      }
    }

    // Regular blocks
    if (verificationState.signature === 'valid' && verificationState.certification === 'valid') {
      return 'bg-gradient-to-r from-green-700 to-green-800 text-white border-2 border-green-900'
    } else if (verificationState.signature === 'valid' && verificationState.certification !== 'invalid') {
      return 'bg-gradient-to-r from-green-500 to-green-600 text-white border-2 border-green-700'
    } else if (verificationState.signature === 'invalid' || verificationState.signature === 'error') {
      return 'bg-gradient-to-r from-red-500 to-red-600 text-white border-2 border-red-700'
    } else if (verificationState.signature === 'not_signed') {
      return 'bg-gray-100 border border-gray-300'
    }

    return 'bg-gray-100 border border-gray-300'
  }

  // 🏷️ Generate status badges
  const getStatusBadges = () => {
    const badges = []

    // Signature status badge
    if (isSignatureBlock) {
      if (verificationState.signature === 'valid') {
        badges.push(
          <span key="sig-valid" className="px-2 py-1 rounded bg-white text-green-800 text-xs font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Valid Signature
          </span>
        )
      } else {
        badges.push(
          <span key="sig-invalid" className="px-2 py-1 rounded bg-white text-red-800 text-xs font-medium flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Invalid
          </span>
        )
      }
    } else {
      // Regular blocks
      if (verificationState.signature === 'valid') {
        badges.push(
          <span key="signed" className="px-2 py-1 rounded bg-white text-green-800 text-xs font-medium flex items-center gap-1">
            <Key className="w-3 h-3" />
            Signed
          </span>
        )
      } else if (verificationState.signature === 'invalid') {
        badges.push(
          <span key="sig-invalid" className="px-2 py-1 rounded bg-white text-red-800 text-xs font-medium flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Invalid Signature
          </span>
        )
      } else if (verificationState.signature === 'error') {
        badges.push(
          <span key="sig-error" className="px-2 py-1 rounded bg-white text-orange-800 text-xs font-medium flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Signature Error
          </span>
        )
      }
    }

    // Certification status badge
    if (verificationState.certification === 'valid') {
      badges.push(
        <span key="cert-valid" className="px-2 py-1 rounded bg-white text-purple-800 text-xs font-medium flex items-center gap-1">
          <Shield className="w-3 h-3" />
          Certified
        </span>
      )
    } else if (verificationState.certification === 'invalid') {
      badges.push(
        <span key="cert-invalid" className="px-2 py-1 rounded bg-white text-red-800 text-xs font-medium flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Cert Invalid
        </span>
      )
    } else if (verificationState.certification === 'error') {
      badges.push(
        <span key="cert-error" className="px-2 py-1 rounded bg-white text-orange-800 text-xs font-medium flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Cert Error
        </span>
      )
    }

    // Authority badge
    if (certificationAuthority) {
      badges.push(
        <span key="authority" className="px-2 py-1 rounded bg-white text-blue-800 text-xs font-medium">
          👑 {certificationAuthority}
        </span>
      )
    }

    return badges
  }

  // 📋 Get relevant certifications for this block
  const getRelevantCertifications = () => {
    return certificationResults.filter(certResult => 
      (certResult.cert.signed_blocks || []).includes(blockName)
    )
  }

  return (
    <div className={`rounded-lg shadow-sm p-4 ${getCardStyle()}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-lg">
            {emoji} {blockName}
          </h4>
          {isTrustBlock && (
            <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
              Security Layer
            </span>
          )}
          {isSignatureBlock && (
            <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
              Cryptographic Proof
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {getStatusBadges()}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded hover:bg-white hover:bg-opacity-20 transition-colors"
            title={isExpanded ? 'Collapse content' : 'Expand content'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Verification Details */}
      {(signatureStatus || certificationResults.length > 0) && (
        <div className="mb-3 space-y-2">
          {/* Signature verification details */}
          {signatureStatus && (isSigned || isSignatureBlock) && (
            <div className="text-xs bg-white bg-opacity-20 p-2 rounded">
              <div className="font-medium">Signature Verification:</div>
              <div className={verificationState.signature === 'valid' ? 'text-green-200' : 'text-red-200'}>
                {signatureStatus.message}
              </div>
            </div>
          )}

          {/* Certification verification details */}
          {getRelevantCertifications().map((certResult, index) => (
            <div key={index} className="text-xs bg-white bg-opacity-20 p-2 rounded">
              <div className="font-medium">Certification {index + 1}:</div>
              <div className={certResult.result.ok ? 'text-green-200' : 'text-red-200'}>
                {certResult.result.message}
              </div>
              {certResult.signatureHashResult && (
                <div className={`mt-1 ${certResult.signatureHashResult.ok ? 'text-green-200' : 'text-red-200'}`}>
                  Hash: {certResult.signatureHashResult.message}
                </div>
              )}
              {certResult.cert.issued_at && (
                <div className="text-gray-300 mt-1">
                  Issued: {new Date(certResult.cert.issued_at).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className={`transition-all duration-200 ${
        isExpanded ? 'max-h-none' : 'max-h-32 overflow-hidden'
      }`}>
        <pre className="text-xs whitespace-pre-wrap break-words font-mono bg-white bg-opacity-10 p-3 rounded">
          {JSON.stringify(content, null, 2)}
        </pre>
      </div>

      {/* Content preview when collapsed */}
      {!isExpanded && (
        <div className="mt-2 text-xs opacity-75">
          Click to expand • {typeof content === 'object' ? Object.keys(content).length + ' fields' : 'Value: ' + String(content).substring(0, 50)}
        </div>
      )}
    </div>
  )
}