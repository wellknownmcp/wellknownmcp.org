import nacl from 'tweetnacl';
import base64js from 'base64-js';
import { sha256 } from 'js-sha256';

function base64ToUint8Array(b64: string): Uint8Array {
  return base64js.toByteArray(b64);
}

function concatSignedBlocks(feed: any, blocks: string[]): string {
  return blocks.map(key => JSON.stringify(feed[key])).join("");
}

export async function verifyFeedSignature(feed: any): Promise<{ ok: boolean; message: string }> {

  if (!feed || typeof feed !== "object") {
    return { ok: false, message: "Invalid feed." };
  }

  const sig = feed.signature;
  const trust = feed.trust;

  if (!sig) return { ok: false, message: "No signature block found." };
  if (!trust || !Array.isArray(trust.signed_blocks)) {
    return { ok: false, message: "Missing or invalid 'trust.signed_blocks' block." };
  }

  const { value, algorithm } = sig;
  if (!value) {
    return { ok: false, message: "Incomplete signature block." };
  }

  if (algorithm && algorithm !== "ed25519") {
    return { ok: false, message: `Unsupported algorithm: ${algorithm}` };
  }

  try {
    // resolve full URL to public key
    const keyUrl = trust.public_key_hint.startsWith("http")
      ? trust.public_key_hint
      : `https://${trust.public_key_hint}/.well-known/public.pem`;

    const keyRes = await fetch(keyUrl);
    if (!keyRes.ok) {
      return { ok: false, message: `Could not fetch public key from: ${keyUrl}` };
    }

    const pubkeyText = await keyRes.text();
    const pubkeyBytes = base64ToUint8Array(pubkeyText.trim());

    const signedPayload = JSON.stringify(
      Object.fromEntries(
        trust.signed_blocks
          .filter((k: string) => k in feed)
          .map((k: string) => [k, feed[k]])
      )
    );

    const msgBytes = new TextEncoder().encode(signedPayload);
    const sigBytes = base64ToUint8Array(value); 

    const valid = nacl.sign.detached.verify(msgBytes, sigBytes, pubkeyBytes);
    return valid
      ? { ok: true, message: "Valid signature verified with remote public key." }
      : { ok: false, message: "Invalid signature." };

  } catch (e) {
    return { ok: false, message: `Verification error: ${e}` };
  }
}
export async function verifyFeedCertification(feed: any, cert: any): Promise<{ ok: boolean; message: string }> {
  const level = cert.level;
  const certified = cert.targets;
  const signed = feed.trust?.signed_blocks;
  const pubkey = feed?.public_key_hint;

  if (!signed || !certified) return { ok: false, message: "Missing blocks to verify." };

  if (cert.algo && cert.algo !== 'ed25519') {
    return { ok: false, message: `Unsupported certification algorithm: ${cert.algo}` };
  }

  const isLLMCA = cert.public_key_hint === 'https://llmca.org/.well-known/llmca_cert.pem';
  if (!isLLMCA) {
    return { ok: false, message: "Untrusted certifier: not LLMCA" };
  }

  // Level rules for LLMCA
  if (level === 'gold') {
    const expected = [...signed, 'signature'];
    if (JSON.stringify(certified) !== JSON.stringify(expected)) {
      return { ok: false, message: "Gold must certify signed_blocks + signature." };
    }
    const hash = sha256(base64ToUint8Array(feed.signature?.value));
    if (cert.signature_hash !== base64js.fromByteArray(Buffer.from(hash, 'hex'))) {
      return { ok: false, message: "Mismatch in signature_hash." };
    }
    if (cert.owner_key !== pubkey) {
      return { ok: false, message: "owner_key mismatch." };
    }
  } else {
    if (JSON.stringify(certified) !== JSON.stringify(signed)) {
      return { ok: false, message: `${level} must certify only signed_blocks.` };
    }
  }

  if (cert.expires_at) {
    const now = new Date();
    const exp = new Date(cert.expires_at);
    if (exp < now) {
      return { ok: false, message: "Certification expired." };
    }
  }

  // Verify certification signature
  try {
    const msg = new TextEncoder().encode(concatSignedBlocks(feed, certified));
    const sigBytes = base64ToUint8Array(cert.value);
    const keyUrl = cert.public_key_hint;
    const pem = await fetch(keyUrl).then(r => r.text());
    const key = pem
      .replace(/-----.*-----/g, '')
      .replace(/\s+/g, '');
    const pubkeyBytes = base64ToUint8Array(key);
    const ok = nacl.sign.detached.verify(msg, sigBytes, pubkeyBytes);
    return ok ? { ok: true, message: "Valid certification." } : { ok: false, message: "Invalid signature." };
  } catch (e) {
    return { ok: false, message: `Signature verification failed: ${e}` };
  }
}
