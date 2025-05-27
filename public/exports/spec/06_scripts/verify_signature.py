import argparse
import json
import base64
import hashlib
import requests
from pathlib import Path
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey
from cryptography.hazmat.primitives import serialization

def canonicalize(obj):
    return json.dumps(obj, separators=(',', ':'), sort_keys=True).encode("utf-8")

def hash_blocks(feed, block_names):
    if block_names == ["all"]:
        block_names = [k for k in feed.keys() if k != "signature"]
    concatenated = b"".join(canonicalize(feed[block]) for block in block_names if block in feed)
    return hashlib.sha256(concatenated).digest()

def load_public_key(source):
    if source.startswith("http"):
        res = requests.get(source)
        res.raise_for_status()
        key_bytes = res.content
    else:
        with open(source, "rb") as f:
            key_bytes = f.read()
    return serialization.load_pem_public_key(key_bytes)

def verify_signature(feed_path, pubkey_path=None):
    with open(feed_path, "r", encoding="utf-8") as f:
        feed = json.load(f)

    sig = feed.get("signature")
    if not sig or not isinstance(sig, dict):
        raise ValueError("No structured signature found in feed")

    signature = base64.b64decode(sig["value"])
    algorithm = sig.get("algorithm")
    if algorithm != "ed25519":
        raise ValueError(f"Unsupported algorithm: {algorithm}")

    hint = feed.get("trust", {}).get("public_key_hint")
    key_source = pubkey_path or hint
    if not key_source:
        raise ValueError("No public key hint or file provided")

    public_key = load_public_key(key_source)

    signed_blocks = feed.get("trust", {}).get("signed_blocks")
    if not signed_blocks:
        raise ValueError("No signed_blocks declared in trust block")

    digest = hash_blocks(feed, signed_blocks)
    public_key.verify(signature, digest)
    print("✅ Signature is valid.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Verify a signed LLMFeed file")
    parser.add_argument("feed_path", type=Path, help="Path to .llmfeed.json file")
    parser.add_argument("--pubkey", type=str, help="Path or URL to public key")
    args = parser.parse_args()

    verify_signature(args.feed_path, args.pubkey)
