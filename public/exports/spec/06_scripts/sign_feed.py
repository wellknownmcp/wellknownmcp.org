from collections import OrderedDict
from datetime import datetime
import json
import argparse
import nacl.signing
import nacl.encoding

def load_feed(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_feed(feed, file_path):
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(feed, f, indent=2)

def canonicalize(feed, signed_blocks):
    result = OrderedDict()
    for key in signed_blocks:
        if key in feed:
            result[key] = feed[key]
    return json.dumps(result, separators=(",", ":"), ensure_ascii=False).encode("utf-8")

def insert_after(feed, key, insert_key, insert_value):
    new_feed = OrderedDict()
    for k, v in feed.items():
        new_feed[k] = v
        if k == key:
            new_feed[insert_key] = insert_value
    return new_feed

def load_private_key(path):
    try:
        with open(path, "rb") as f:
            key_bytes = f.read()
        if len(key_bytes) == 32:
            return nacl.signing.SigningKey(key_bytes)
        else:
            raise ValueError("Not raw Ed25519 seed, trying PEM parsing...")
    except Exception:
        pass

    with open(path, "r", encoding="utf-8") as f:
        pem = f.read()
    pem = "".join(pem.strip().splitlines()[1:-1])
    key_der = nacl.encoding.Base64Encoder.decode(pem.encode("ascii"))
    if len(key_der) < 48:
        raise ValueError("PEM content too short, cannot extract Ed25519 seed.")

    return nacl.signing.SigningKey(key_der[-32:])

def main():
    parser = argparse.ArgumentParser(description="Sign MCP feed (adaptive version)")
    parser.add_argument("input_file", help="Path to input JSON file")
    parser.add_argument("output_file", help="Path to output JSON file")
    parser.add_argument("--private_key", required=True, help="Path to Ed25519 private key file (raw or PEM)")
    parser.add_argument("--hint", required=True, help="Public key hint (URL)")
    args = parser.parse_args()

    feed = load_feed(args.input_file)

    if "trust" not in feed:
        trust_block = {
            "signed_blocks": ["feed_type", "metadata"],
			"canonicalization": "https://llmca.org/mcp-canonical-json/v1",
            "trust_level": "self-declared",
            "certifier": "",
            "agent_hint": "",
            "block_name": "trust disclaimer",
            "scope": "partial",
            "warning": "This feed is only partially signed."
        }
        if "metadata" in feed:
            feed = insert_after(feed, "metadata", "trust", trust_block)
        else:
            feed["trust"] = trust_block

    feed["trust"]["public_key_hint"] = args.hint
feed["trust"]["canonicalization"] = "https://llmca.org/mcp-canonical-json/v1"
signed_blocks = feed["trust"].get("signed_blocks", ["feed_type", "metadata"])
all_blocks = set(feed.keys()) - {"_meta"}
if set(signed_blocks) == all_blocks:
        feed["trust"]["scope"] = "full"
        feed["trust"]["warning"] = "This feed is fully signed."
else:
        feed["trust"]["scope"] = "partial"
        feed["trust"]["warning"] = "This feed is only partially signed."

canonical_json = canonicalize(feed, signed_blocks)

signing_key = load_private_key(args.private_key)
signature = signing_key.sign(canonical_json).signature
signature_b64 = nacl.encoding.Base64Encoder.encode(signature).decode("utf-8")

signature_block = {
        "algorithm": "ed25519",
        "value": signature_b64,
        "created_at": datetime.utcnow().isoformat() + "Z"
    }

feed = insert_after(feed, "trust", "signature", signature_block)
save_feed(feed, args.output_file)
print(f"Feed signed and saved to {args.output_file}")

if __name__ == "__main__":
    main()
