# Proposal: Move `signed_blocks` into a signed `trust` block

## Context

In the current LLMFeed specification, the `signed_blocks` field—which defines which blocks are covered by the digital signature—is embedded inside the `signature` block. This design works technically: as long as signature verification strictly uses the declared `signed_blocks` to compute the hash, integrity is ensured.

## Limitation

However, `signed_blocks` being inside the `signature` block creates a few conceptual and structural issues:

- The `signature` block is **not itself signed** (by design), so there's no way to independently certify the declared list.
- It is hard to **extend the notion of trust** beyond a list of blocks (e.g. trust level, policy, timestamp, issuing authority).
- It breaks the modular logic of the format, where most meaningful information lives in top-level blocks that can be signed or certified individually.

## Suggested Improvement (backward-compatible)

- Move `signed_blocks` into a new top-level block named `trust`, which is then signed like any other block.
- Keep `signature` limited to cryptographic fields (`value`, `algo`, etc.).

Example:

```json
"trust": {
  "signed_blocks": ["origin", "api", "mcp_metadata"],
  "level": "strict",
  "issuer": "llmca.org"
}
```

## Benefits

- ✅ Enables **independent signature verification** of the trust declaration
- ✅ Allows the addition of trust-related metadata (issuer, level, policies, etc.)
- ✅ Improves semantic clarity and simplifies auditing
- ✅ Backward-compatible: clients can fallback to `signature.signed_blocks` if `trust` is missing

## Ecosystem Impact

- Feed viewers can show trust-related info more clearly
- Opens the door to future extensions: certified feeds, delegation of trust, multi-author feeds, etc.
- Does not break any existing valid `.llmfeed.json`

---

Proposed label: `spec-improvement`  
Milestone: `vNext`
