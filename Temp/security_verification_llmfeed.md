# Verification & Trust Considerations in LLMFeed and MCP

## Context

Feeds signed under the Model Context Protocol may include full or partial signatures. This creates a necessary distinction in trust scope.

## Trust Model

### Signed Templates

A signed template (e.g., `feed_type: "template"`) declares that only a specific subset of the feed is signed — typically the structural fields like:

- `origin`
- `tags`
- `summary`
- `publisher`
- `certificate_chain`

These templates are intended to be used with **dynamic injection of `data`**, and must **not** be interpreted as a fully verified feed.

### Potential Risk

If a template file is copied and repurposed maliciously (e.g. with misleading `data`), it may appear to come from a trusted source (`origin`, `publisher`), while carrying falsified payloads.

### Mitigation Strategy

- **All signed feeds must declare `signed_blocks` explicitly**
- Clients and agents **must validate which fields are covered**
- LLMs should **not treat unsigned content as trusted**, even if some blocks are verified
- If full content integrity is required, use **`feed_type: "export"` or `"mcp"` with full signature**

## Signature Scope Field (Proposal)

Add a new optional field:

```json
"signature_scope": "partial"  // or "full"
```

This improves clarity for downstream systems and future signature verification tools.

## Best Practices

- For dynamic content: use `feed_type: "template"` and sign only static blocks
- For public declarations: use `feed_type: "export"` and sign the entire feed
- For online active MCP feeds: require complete signature (`feed_type: "mcp"`)

## Summary Table

| feed_type | Signed Blocks     | Risk Mitigation |
|-----------|-------------------|------------------|
| template  | Partial (structure) | Agents must not trust unsigned `data` |
| export    | Optional or Full    | Use full signature for immutable content |
| mcp       | Full                | All blocks are covered — full verification |
| directory | Optional manifest   | Depends on bundle structure — validate root |

## Future Enhancements

- Agent libraries should expose APIs to check `signed_blocks`
- UI renderers may highlight signed vs. unsigned content
- Public feed validators should surface warnings on misuse