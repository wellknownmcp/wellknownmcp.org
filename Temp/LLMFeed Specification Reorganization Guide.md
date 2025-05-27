# MCP / LLMFeed Specification Reorganization Guide

## Objective

This document provides a strategic plan for reorganizing the MCP (Model Context Protocol) and LLMFeed specification files to align with the maturity of the project, improve clarity, modularity, and prepare for long-term standardization across agent ecosystems.

It is intended as a guide for a future work session to implement a clean and robust documentation structure.

---

## I. Core Specification File

### `llmfeed.md`

This is the root document. It defines the **canonical structure of any MCP feed**.

#### It MUST include:

- General feed layout

- Block order and purpose

- Validation rules

- Required vs optional blocks

#### Standard blocks:

- `feed_type`

- `metadata`

- `trust`

- `signature`

- `certification`

- `data`

---

## II. Feed Type Extensions

Each `feed_type` should be defined in its own dedicated file.

### Existing feed types:

#### `export`

- Human-readable or page-generated context

- Usually html + markdown + optional template

- Used in: `/api/export/feed`, `/static`, `/dynamic`

#### `session-feed`

- Captures an LLM session context or design decision

- Contains narrative + code history + context

#### `service-credential`

- Represents a structured API key or secure credential capsule

- Includes origin, scope, user ID, expiration, signature

#### (planned) `mcp-index`

- Lists related feeds or nodes in an agent network

- Used in `.well-known/mcp/index`

#### (possible future) `llm-prompt`

- Represents a structured prompt or instruction unit

- Used for prompt injection, transmission, and traceability

---

## III. Thematic Extensions (Transversal to all feed types)

These modules define functionality that can be applied to any feed.

### Proposed files:

#### `llmfeed-extensions_canonicalization.md`

- Describes the canonical JSON rules (sorting, encoding, formatting)

- Reference of `https://llmca.org/mcp-canonical-json/v1`

#### `llmfeed-extensions_signatures.md`

- Signature block format

- Signed blocks handling

- Recommendation to use `canonicalization_hint`

- Example verification workflows

#### `llmfeed-extensions_api.md`

- Verification endpoint: `/verify/v1`

- Future: signing, certification, trust scoring

#### `llmfeed-extensions_wellknown.md`

- Structure and semantics of `.well-known/mcp/*` endpoints

- Index, lite, feed-specific, public.pem, manifest...

#### `llmfeed-extensions_certification.md`

- Rules for inserting `certification` blocks

- Validity durations, levels, authority signatures

#### `llmfeed-extensions_badges.md`

- Standard for displaying signed/certified badge buttons

- Link to .llmfeed.json and/or signature status

---

## IV. Optional Cross-References

#### `examples/`

- Concrete examples per feed type (export, session-feed, etc.)

- Signed and unsigned versions

#### `versioning.md`

- Strategy for evolving the spec cleanly

- Link to v1, v2 in the future

---

## V. Immediate Goals for Reorganization

### Short-term reorg (Day 1):

- Finalize `llmfeed.md` structure block

- Split current spec files into:
  
  - `/spec/llmfeed_feedtypes_export.md`
  
  - `/spec/llmfeed_feedtypes_session.md`
  
  - `/spec/llmfeed_feedtypes_service-credential.md`
  
  - `/spec/llmfeed-extensions_signatures.md`
  
  - `/spec/llmfeed-extensions_canonicalization.md`

### Mid-term:

- Add verification endpoint documentation

- Add real `examples/*.llmfeed.json`

- Draft certification & badge mechanisms

### Long-term:

- Versioning strategy

- MCP compliance levels

- Ecosystem registry or certification body guidance

---

## Notes from GTP Project Context

- The spec must remain human-writable, LLM-parseable, and independently verifiable

- Signed blocks and canonical JSON will be foundational for trust and compliance

- Recipes, export buttons, service credentials, and `.well-known` entries are key first adopters

- The ultimate goal is a seamless and open trust layer for agents across domains

This guide should serve as your anchor for the restructuring session.
