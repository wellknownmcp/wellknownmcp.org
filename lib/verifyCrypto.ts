import nacl from 'tweetnacl'
import base64js from 'base64-js'

function base64ToUint8Array(b64: string): Uint8Array {
  return base64js.toByteArray(b64)
}

async function loadPublicKey(url: string): Promise<Uint8Array> {
  const res = await fetch(url)
  const pem = await res.text()

  // Clean PEM
  const b64 = pem
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')
    .replace(/\s+/g, '')
  const der = base64ToUint8Array(b64)

  // If it's an Ed25519 SubjectPublicKeyInfo → skip ASN.1 header (12 bytes) → extract raw 32 bytes
  if (der.length === 44 && der[0] === 0x30) {
    return der.slice(-32)
  }

  // If it's already raw (32 bytes)
  if (der.length === 32) {
    return der
  }

  throw new Error(`Unsupported public key size: ${der.length} bytes`)
}

/**
 * 🚨 CRITICAL: LLMFeed/MCP Canonicalization v1
 * Must match Python backend exactly: separators=(',', ':')
 * NO spaces after commas or colons!
 */
function canonicalizeForMCP(data: any): string {
  return JSON.stringify(data)
    .replace(/,\s+/g, ',')    // Remove spaces after commas
    .replace(/:\s+/g, ':')    // Remove spaces after colons
}

/**
 * Build partial feed from signed blocks in correct order
 * Excludes signature, certification, _meta blocks
 */
function buildPartialFeed(feed: any, signedBlocks: string[]): any {
  const partial: any = {}
  
  for (const key of signedBlocks) {
    if (
      feed[key] !== undefined &&
      key !== 'signature' &&
      key !== 'certification' &&
      key !== '_meta' &&
      key !== '_verification_help'
    ) {
      partial[key] = feed[key]
    }
  }
  
  return partial
}

// ✅ Helper pour formatter proprement les erreurs
function formatError(e: any): string {
  return e?.message ?? String(e)
}

export async function verifyFeedSignature(feed: any): Promise<{ ok: boolean; message: string }> {
  if (!feed || typeof feed !== 'object') {
    return { ok: false, message: 'Invalid feed.' }
  }

  const sig = feed.signature?.value
  const trust = feed.trust

  if (typeof sig !== 'string' || sig.trim() === '') {
    return {
      ok: false,
      message: `Invalid or missing signature value. Expected Base64 string in feed.signature.value.`,
    }
  }

  const publicKeyHint = trust?.public_key_hint
  if (!publicKeyHint) {
    return { ok: false, message: 'Missing public_key_hint in trust block.' }
  }

  // Load public key
  let publicKey: Uint8Array
  try {
    publicKey = await loadPublicKey(publicKeyHint)
  } catch (e) {
    return {
      ok: false,
      message: 'Failed to load public key: ' + formatError(e),
    }
  }

  const signedBlocks = trust?.signed_blocks ?? []

  // 🚩 Build partial feed in signed_blocks order (same as Python backend)
  const partial = buildPartialFeed(feed, signedBlocks)

  // 🚩 CRITICAL: Use MCP canonicalization v1 (compact, no spaces)
  const payloadString = canonicalizeForMCP(partial)
  const payloadBytes = new TextEncoder().encode(payloadString)

  // Prepare signature
  let signatureBytes: Uint8Array
  try {
    signatureBytes = base64ToUint8Array(sig)
  } catch (e) {
    return {
      ok: false,
      message: 'Invalid base64 signature: ' + formatError(e),
    }
  }

  if (signatureBytes.length !== 64) {
    return {
      ok: false,
      message: `Ed25519 signature must be 64 bytes, got ${signatureBytes.length}`,
    }
  }

  // Verify signature
  const valid = nacl.sign.detached.verify(
    payloadBytes,
    signatureBytes,
    publicKey
  )

  return {
    ok: valid,
    message: valid ? 'Signature valid.' : 'Signature invalid.',
  }
}

export async function verifyFeedCertification(
  feed: any,
  cert: any
): Promise<{ ok: boolean; message: string }> {
  if (!feed || typeof feed !== 'object') {
    return { ok: false, message: 'Invalid feed.' }
  }
  if (!cert || typeof cert !== 'object') {
    return { ok: false, message: 'Invalid certification block.' }
  }

  const publicKeyHint = cert?.public_key_hint
  if (!publicKeyHint) {
    return {
      ok: false,
      message: 'Missing public_key_hint in certification block.',
    }
  }

  // Load certifier public key
  let publicKey: Uint8Array
  try {
    publicKey = await loadPublicKey(publicKeyHint)
  } catch (e) {
    return {
      ok: false,
      message: 'Failed to load cert public key: ' + formatError(e),
    }
  }

  const certifiedBlocks = cert?.signed_blocks ?? []
  if (!certifiedBlocks.length) {
    return {
      ok: false,
      message: 'No signed_blocks in certification.',
    }
  }

  // 🚩 CORRECTED: Use same logic as signature verification
  // Build partial feed with certified blocks
  const partial = buildPartialFeed(feed, certifiedBlocks)

  // 🚩 CORRECTED: Use same canonicalization as signature
  const payloadString = canonicalizeForMCP(partial)
  const payloadBytes = new TextEncoder().encode(payloadString)

  // 🚩 CORRECTED: Use cert.value, not cert.signature
  const certSignatureValue = cert?.value
  if (!certSignatureValue) {
    return {
      ok: false,
      message: 'Missing certification.value field.',
    }
  }

  let signatureBytes: Uint8Array
  try {
    signatureBytes = base64ToUint8Array(certSignatureValue)
  } catch (e) {
    return {
      ok: false,
      message: 'Invalid base64 certification signature: ' + formatError(e),
    }
  }

  if (signatureBytes.length !== 64) {
    return {
      ok: false,
      message: `Ed25519 certification signature must be 64 bytes, got ${signatureBytes.length}`,
    }
  }

  // Verify certification signature
  const valid = nacl.sign.detached.verify(
    payloadBytes,
    signatureBytes,
    publicKey
  )

  return {
    ok: valid,
    message: valid ? 'Certification valid.' : 'Certification invalid.',
  }
}

/**
 * Verify signature hash if present in certification
 */
export async function verifySignatureHash(feed: any, cert: any): Promise<{ ok: boolean; message: string }> {
  const expectedHash = cert?.signature_value_hash
  if (!expectedHash) {
    return { ok: true, message: 'No signature hash to verify.' }
  }

  const signatureValue = feed?.signature?.value
  if (!signatureValue) {
    return {
      ok: false,
      message: 'Certification includes signature hash but feed has no signature.value',
    }
  }

  try {
    // Calculate SHA256 of signature value (same as Python backend)
    const encoder = new TextEncoder()
    const data = encoder.encode(signatureValue)
    
    // Use Web Crypto API for SHA256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    
    if (expectedHash === computedHash) {
      return { ok: true, message: 'Signature hash verified.' }
    } else {
      return {
        ok: false,
        message: `Signature hash mismatch. Expected: ${expectedHash}, got: ${computedHash}`,
      }
    }
  } catch (e) {
    return {
      ok: false,
      message: 'Failed to compute signature hash: ' + formatError(e),
    }
  }
}