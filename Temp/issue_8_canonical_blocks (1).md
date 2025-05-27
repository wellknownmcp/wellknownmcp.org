# Issue #8: Canonical Block Structure for LLMFeeds

**Type**: Spec improvement  
**Scope**: `llmfeed-block-reference.md`, validation tooling  
**Labels**: enhancement, spec, MCP-1.1

---

## 🎯 Context

While the MCP protocol allows flexible `data[]` blocks, this flexibility limits:

- human comprehension
- automated verification by agents
- clean feed certification

To improve robustness and interoperability, we propose canonical typing.

---

## ✅ Proposal

In `llmfeed-block-reference.md`, for each known `type` (`summary`, `feed-reference`, `article`, `capsule`, `service-description`, etc.):

- Define `required fields`
- Define `recommended fields`
- Define `free/optional fields`

Optionally:

- Provide a public `llmfeed.schema.json` aligned with the spec
- Allow LLM viewers and agents to generate **conformity reports**:
  - ✅ present/absent fields
  - ⚠️ partial or informal structures
  - 🛑 missing `trust` blocks for unsigned data

---

## ✨ Future extensions

- CLI utility: `llmca check` or `@llmca/check`
- API endpoint from `wellknownmcp.org/verify`
- Require a `trust` block even in unsigned feeds (spec 1.1)
- Encourage use of `"trust_evaluation"` summaries for agent trust reasoning

---

Proposed as part of MCP 1.1 roadmap.
