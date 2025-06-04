# WellKnownMCP — Specification for `.llmfeed.json` feeds

**WellKnownMCP** defines an open convention for publishing structured, signed `.llmfeed.json` feeds to enable safe and trustworthy interactions between LLMs, agents, and the Web.

It is the reference spec for feeds used in the emerging **Agentic Web**.

---

## What is a LLMFeed?

A `.llmfeed.json` file lets an agent understand:

- The **intent** of a page or service
- The **capabilities** it exposes (with optional OpenAPI)
- The **prompts** it should react to
- The **cost or trust** associated with an action
- The **guidance or behaviour expectations** intended by the publisher

It also allows verification of:

- **Origin** (`origin` field in `metadata`)
- **Signed blocks** (`trust.signed_blocks`)
- **Certification** (`certification` block, optional)

---

## Core Feed Types

| Feed Type  | Purpose |
|------------|---------|
| `mcp`      | Describe a service or API |
| `export`   | Export page content for agents |
| `prompt`   | Define reusable prompts |
| `session`  | Carry agent session context |
| `credential` | Pass API credentials (with trust) |
| `pricing`  | Define pricing models |

---

## Trust and Signatures

Feeds may be:

✅ Signed (`trust` + `signature`)  
✅ Certified (by an external CA such as [llmca.org](https://llmca.org))  

Agents SHOULD respect:

- `trust.signed_blocks` to check which blocks are verifiably trusted
- Certification level when applying agent behaviours

---

## Feed Placement

Feeds may be:

- Published in `.well-known/llmfeed.json` or `.well-known/mcp.llmfeed.json`
- Served dynamically (for active MCP feeds)
- Attached to APIs (OpenAPI extension)
- Embedded in page metadata

---

## Spec Structure

```text
spec/
├── llmfeed.md                  # Core format
├── llmfeed_block-reference.md  # Canonical block reference
├── 02_feedtypes/               # Definitions of core feed types
├── 03_extensions/              # Extensions (signatures, API linkage...)
├── 04_agent-behavior/          # Optional expectations for agents consuming feeds
├── wellknown.md                # How to serve feeds via .well-known/
```

See also [`agent-guidance.md`](./spec/04_agent-behavior/agent-guidance.md) — for optional soft hints.

---

## Agents and OpenAPI

Agents processing `.llmfeed.json` feeds may use:

- `capabilities[]` for lightweight function definitions
- OpenAPI for full API specs (referenced from `capabilities` block)

This allows hybrid approaches:

- Lightweight LLM-first discovery
- Full API fallback

---

## Contributing

Contributions welcome!

- Open issues or PRs to propose improvements.
- Discuss extensions and future feed types.

---

## 🚀 Evolving Spec

The specification is **living** — new feed types and behaviours are proposed and reviewed openly.

Join us to help shape the future of the Agentic Web!

---