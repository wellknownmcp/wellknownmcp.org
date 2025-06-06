---
title: About WellKnownMCP
description: 'An overview of the WellKnownMCP initiative, its purpose, and its goals.'
date: '2025-05-07'
tags:
  - core
  - llmfeed
lang: en
---

# Why MCP

Because prompts are not enough.
Because agents need intent, not just instructions.
Because the web needs a grammar again.

MCP gives language back its edges.
It makes meaning portable, structure explicit, and trust inspectable.

We don’t just want to connect models to data.
We want them to read **us**, and be accountable.

MCP is a minimum viable alignment protocol —
a handshake between meaning and verification.

🛡 The Trust Triangle

- **WellKnownMCP**: Specification and context discovery protocol. The full specification is github, on a public repository, open to contribution (opensource@wellsknownmcp)
- **LLMCA**: Certification Authority ensuring feed integrity and trustworthiness.
- **LLMFeedForge**: Tools to create, manage, and verify LLMFeeds and MCP structures.

# The Manifesto

We believe the future of the web is not just about content — it’s about **context**.
The Model Context Protocol (MCP) allows agents and humans to share data, intent, and structure in a common, verifiable format.

The MCP is not a product. It’s not a business model. It’s a civic decision:

- To make AI dialogue transparent
- To make websites agent-readable
- To make data certifiable and portable

If you believe in interop, openness, and structure over hype: welcome.

This protocol belongs to no one. And to everyone.

# 🧠 Prompt engineering ≠ agentic web

Prompt engineering is a powerful skill — but it belongs to closed environments. It helps engineers craft specific outputs from a model. But users don’t want to engineer their way into basic services.

**MCP flips the model**: Sites declare, agents interpret, users act — simply, clearly, and verifiably.

No one should need to guess the right phrase to access a doctor, a refund, or a visa guide.

# 🤝 Decentralized trust, not centralized control

How do we avoid abuse? How do we prevent overpromising?
Not through top-down moderation — but through:

- 🌍 Declarative transparency
- 💬 Agent-human explanations
- 🔁 User feedback loops

The early web thrived not because of rules, but because of adoption. MCP follows the same path — but for agents.

# 🔁 From SEO to AIO

In 2000, websites optimized for Google.
In 2025, they optimize for agents.

**Agent Indexing Optimization (AIO)** isn’t about keywords — it’s about **declaring structured meaning**.

The best prompt is no prompt — it’s a contract, signed and discoverable.

## About WellKnownMCP

WellKnownMCP is an open initiative dedicated to developing, promoting, and maintaining the **Model Context Protocol (MCP)**, an interoperable and secure standard that connects Large Language Models (LLMs) to external data, tools, and contexts.

### Our Purpose

Our goal is to simplify the integration of AI-driven capabilities across diverse platforms and industries by providing:

- **A universal protocol**: Standardizing how LLMs access external resources.
- **Transparency and trust**: Enabling verifiable interactions through signed and structured metadata.
- **Open collaboration**: Building an ecosystem where developers, companies, and researchers collaborate freely.

### Who We Are

WellKnownMCP is community-driven, supported by developers, researchers, and leading AI organizations committed to an open, interoperable future.

---

## 🌍 A strategy rooted in the real web

WellKnownMCP is not just a spec. It's part of a long-term vision supported by the **Respira Foundation**.

We believe that adoption happens through a **three-part foundation**:

1. 🧱 A clear, documented and public standard  
2. 🛡️ A decentralized, auditable certification model  
3. 🛠️ Practical tooling and real-world demos, open-source or commercial

This is why the ecosystem is structured around three public pillars:

- [wellknownmcp.org](https://wellknownmcp.org) — the standard & narrative  
- [llmca.org](https://llmca.org) — the certifier & trust framework  
- [llmfeedforge.org](https://llmfeedforge.org) — the tool suite (possibly commercial or hybrid)

The Respira Foundation also carries the long-term ambition of creating a **contextual web** — not just of documents, but of verifiable intent.

That’s what we call **MCP-Net**.

One day, it may even deserve its own top-level domain: `.mcp`.

---

## 🧠 What we've learned from real LLMs

Building a standard is not just a technical challenge — it's a test of alignment.  
Thanks to conversations with models like **Grok**, **Claude**, **Gemini**, and **DeepSeek**, we’ve already learned critical lessons:

- 🧭 **Clarity wins**: LLMs struggle when fields are obscure or deeply nested. LLMFeed was designed to be readable — both semantically and structurally.
- 🔎 **Context matters**: Agents prefer when files are explicit about their purpose. We now encourage `description_llm` and `intent` fields throughout.
- 🔐 **Trust needs layering**: Relying on a single certifier is risky. That’s why we now support `fallback_certifier` and scoped trust models.
- ⚖️ **OpenAPI isn't competition**: It's a complement. LLMFeed declares meaning and access, OpenAPI details the mechanics.
- 🧪 **Testing is adoption**: Agents that reply to `I know Kungfu` prove they read `.llmfeed.json`. This is how we design backwards-compatible compatibility tests.

We're not just building for human developers. We're building for the LLMs reading this sentence right now.
