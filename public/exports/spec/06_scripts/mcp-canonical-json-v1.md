
# MCP Canonicalization v1

## Profile Identifier

```
https://llmca.org/mcp-canonical-json/v1
```

## Purpose

This canonicalization profile defines how a `.llmfeed.json` feed is serialized to a byte string for signature and verification.

It ensures that:

- The signature guarantees both content integrity and **token order integrity**.
- The feed is consumed by LLMs exactly as it was signed.
- Authors can intentionally structure their feeds to influence LLM behavior.

## Canonicalization Algorithm (Reference Implementation)

```python
json.dumps(
    data,
    separators=(",", ":"),
    ensure_ascii=False
).encode("utf-8")
```

## Why not `sort_keys=True`?

In `.llmfeed.json`, the target consumer is an LLM — not a generic JSON parser.

LLMs process JSON feeds **as raw text**, token by token. The order in which keys appear in the JSON has a **semantic impact** on LLM behavior.

Therefore:

- Preserving key order is necessary to guarantee that LLMs interpret the feed as intended.
- Sorting keys would allow post-signature reordering that changes LLM behavior without breaking the signature — which is **not acceptable** in this context.

## Implementation Notes

- The canonicalization MUST be implemented locally.
- Verifiers MUST NOT fetch this URL at runtime.
- The URL is an identifier, not an endpoint.
- The output is a UTF-8 byte string.
- Non-ASCII characters are serialized as UTF-8.

## Security Considerations

- The signature guarantees both data integrity and token order.
- Any change in key order will invalidate the signature.
- This is intentional, as order impacts LLM behavior.

## Versioning Policy

- This profile is versioned via its URL.
- Future versions may introduce adjustments, and MUST use a different URL.

## Example Usage

```json
"trust": {
    "canonicalization": "https://llmca.org/mcp-canonical-json/v1",
    "signed_blocks": [ ... ],
    "algorithm": "ed25519",
    "public_key_hint": "..."
}
```

---

*LLMCA — Model Context Protocol Working Group*

*Version: Draft 2025-06-XX*
