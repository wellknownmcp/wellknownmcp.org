import nacl from 'tweetnacl'
import base64js from 'base64-js'
import { sha256 } from 'js-sha256'

function base64ToUint8Array(b64: string): Uint8Array {
  return base64js.toByteArray(b64)
}

function concatSignedBlocks(feed: any, blocks: string[]): string {
  return blocks.map((key) => JSON.stringify(feed[key])).join('')
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

export async function verifyFeedSignature(
  feed: any
): Promise<{ ok: boolean; message: string }> {
  if (!feed || typeof feed !== 'object') {
    return { ok: false, message: 'Invalid feed.' }
  }

  const sig = feed.signature
  const trust = feed.trust

  const publicKeyHint = trust?.public_key_hint
  if (!publicKeyHint) {
    return { ok: false, message: 'Missing public_key_hint in trust block.' }
  }

  let publicKey: Uint8Array
  try {
    publicKey = await loadPublicKey(publicKeyHint)
  } catch (e) {
    return { ok: false, message: 'Failed to load public key: ' + e }
  }

  const signedBlocks = trust?.signed_blocks ?? []
  const payload = concatSignedBlocks(feed, signedBlocks)
  const payloadHash = sha256(payload)
  const payloadBytes = new TextEncoder().encode(payloadHash)

  const signatureBytes = base64ToUint8Array(sig)

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

  let publicKey: Uint8Array
  try {
    publicKey = await loadPublicKey(publicKeyHint)
  } catch (e) {
    return { ok: false, message: 'Failed to load cert public key: ' + e }
  }

  const signedBlocks = cert?.signed_blocks ?? []
  const payload = concatSignedBlocks(feed, signedBlocks)
  const payloadHash = sha256(payload)
  const payloadBytes = new TextEncoder().encode(payloadHash)

  const signatureBytes = base64ToUint8Array(cert.signature)

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
