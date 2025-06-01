---
title: "Microsoft’s NLWeb Protocol: A Competitor to MCP?"
lang: en
tags: [microsoft, nlweb, mcp, agentic-web, ai-standards]
description: "Microsoft introduces NLWeb — a protocol for natural language interactions on the web. How does it compare to MCP?"
---

# Microsoft’s NLWeb Protocol: A Competitor to MCP?

At Build 2025, Microsoft unveiled **NLWeb** — a new initiative to standardize how **natural language interactions** happen across the web.

According to Microsoft, NLWeb aims to:
- Define how services expose capabilities in NL-friendly formats.
- Support agent-to-service interactions beyond simple APIs.
- Provide a more “conversational web.”

But how does NLWeb relate to the existing work of **MCP (Model Context Protocol)**?

## What is NLWeb?

Microsoft’s vision for NLWeb includes:
- A schema for describing service capabilities and interaction flows.
- Support for `.well-known/nlweb.json` manifests.
- Guidelines for **LLM-friendly interaction patterns**.
- Built-in trust signals via signed manifests.

In short, it covers a similar space to MCP.

## How does it compare to MCP?

| Feature | MCP | NLWeb |
|---------|-----|-------|
| Base standard | `.well-known/mcp.llmfeed.json` | `.well-known/nlweb.json` |
| Trust model | Signed feeds, certificate verification | Signed manifests (similar) |
| Capabilities | Explicit, extensible | Explicit, but Microsoft-curated |
| Governance | Independent (via [wellknownmcp.org](https://wellknownmcp.org)) | Microsoft-led |
| Community alignment | Cross-industry | Microsoft ecosystem-first |

## Risks of fragmentation

There is clear **overlap** between NLWeb and MCP.  
The risk is that:
- Sites may have to implement **both**.
- Agents may prioritize proprietary protocols.
- The ecosystem may **fragment** instead of converging.

## Opportunities for convergence

There is also potential for:
- **Interop between NLWeb and MCP**.
- Mapping NLWeb schemas to MCP feeds.
- Joint work on **trust and verification models**.

The ideal outcome: NLWeb contributes to a richer MCP ecosystem — not a competing silo.

## Our take

Microsoft’s engagement in this space is a sign that **Agentic Web standards are gaining traction**.

But:
- True **openness and interoperability** must remain priorities.
- The community must guard against **ecosystem lock-in**.

At [wellknownmcp.org](https://wellknownmcp.org), we are already exploring mappings between MCP and NLWeb — and invite Microsoft to participate in these discussions.

---

**Next steps:** We’ll track the NLWeb specification and advocate for **alignment with MCP** — so the Agentic Web remains truly open.

Stay tuned.