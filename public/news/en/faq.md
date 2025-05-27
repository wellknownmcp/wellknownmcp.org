---
title: "FAQ – MCP & LLMFeed"
description: "Answers to common questions about the Model Context Protocol and the LLMFeed ecosystem, including how it compares to Anthropic’s MCP."
lang: en
tags:
  - mcp
  - llmfeed
  - faq
  - trust
  - agents
  - developers
  - anthropic
---

# ❓ Frequently Asked Questions

This FAQ is meant for developers, AI builders, and product owners who want to make their sites, tools, or apps readable by LLMs. It covers both the vision (MCP) and the implementation format (LLMFeed) — with practical answers, strategies, and edge cases.



---

## 🧠 GENERAL

**Is `.llmfeed.json` a real format?**  
Yes — it’s a dedicated JSON structure, designed as a **lightweight MIME-type for LLM interop**.  
It keeps the flexibility of JSON, but standardizes key blocks (`metadata`, `trust`, `signature`, `certification`) so that agents can parse and reason about them reliably.



**What is MCP, in plain terms?**  
The Model Context Protocol (MCP) lets websites, apps and APIs explain themselves to agents — the same way humans use visual UI, agents use structured, signed `.llmfeed.json` capsules.

**What’s the difference between LLMFeed and MCP?**  
LLMFeed is a file format and ecosystem. MCP is a broad initiative, initially introduced by Anthropic, for letting agents interact with external tools. LLMFeed provides a lightweight, signed, agent-native implementation of MCP.

**Why is LLMFeed “lighter” than other MCP designs?**  
Because it works entirely with `.well-known` files — no client SDK, no server-side RPC, no special infrastructure.

---

## 👩‍💻 FOR DEVELOPERS

**Do I need an SDK or integration?**  
No. Just expose a static or signed JSON file at `.well-known/`.

**What if my feed is broken or unsigned?**  
It will be parsed, but not trusted. The agent will ask for confirmation or fallback to human interaction.

**Can I scope an API key to just a few functions?**  
Yes — using `apicredential.llmfeed.json` + `mcp-api.llmfeed.json`.

**Can agents simulate a mobile app?**  
Yes — if you expose a `mobile-app.llmfeed.json`, the agent can mirror declared intents and actions.

**Can I be discoverable by search or agents?**  
Yes — use `llm-index.llmfeed.json` to declare your entry points.

**Is LLMFeed suitable for mobile apps or assistants?**  
Absolutely. It supports declarative prompts and actions, even when the underlying system is voice-only, mobile-only, or minimal.

---

## 🧠 FOR AGENTS & LLMs

**Do I need fine-tuning to use MCP?**  
No. A basic LLM that can parse JSON and follow instructions can use it immediately.

**How do I decide what’s trustworthy?**  
Check the `trust` block: scope, certifier, signature. A feed with `trust.scope: certified` is recommended.

**What if two feeds conflict?**  
Follow priority: signature > timestamp > source proximity.

**Can a model without agent features still use this?**  
Yes — even simple LLMs can render a summary of the capabilities and declared intentions in a feed.

---

## 🔐 TRUST, PRIVACY & SAFETY

**Who signs feeds?**  
Either the site itself or an authority like `llmca.org`.

**Can feeds leak private data?**  
Feeds must be explicitly published. Private feeds can be scoped via credential-based access.

**What prevents agent abuse?**  
MCP encourages visible `intent`, rate limits, and fallback confirmation. Agents should only act within signed scope.

---

## 🧭 STRATEGIC USE CASES (PERSONA-DRIVEN)

**I’m an indie developer. Why should I care?**  
You can declare what your product does, without writing docs or integrations. A one-time `.llmfeed.json` makes your tool visible and actionable for all agents.

**I’m building an AI assistant.**  
MCP gives your assistant structured, explainable boundaries. No hallucination, no unsafe trial-and-error.

**I run a regulated service (health, finance).**  
You can scope feeds to only what’s allowed, expose fallback logic, and get certified (`trust.certifier = llmca.org`).

**I build mobile apps.**  
With `mobile-app.llmfeed.json`, your app becomes agent-readable — from your site or the app store.

**I’m an educator / civic tech actor.**  
MCP is an open, inspectable standard. You can teach it, audit it, or use it to create trusted civic AI agents.

---

## 🌍 INTEROPERABILITY & STRATEGY

**Is this compatible with Anthropic’s MCP?**  
Yes — LLMFeed is aligned with the spirit of Anthropic’s MCP, but lighter, decentralized, and file-based.

**What makes LLMFeed more accessible?**  
- No server needed
- Works with `.well-known`
- Trust and signing are built-in

**What does LLMFeed add that MCP lacks?**  
- `mobile-app.llmfeed.json`
- `credential.llmfeed.json`
- `mcp-api.llmfeed.json`
- `session-feed.llmfeed.json` (coming)
- Agent behaviour spec
- Visual tools and certification support

---



---

## 🧠 ADVANCED TOPICS

**What is agent behavior and how is it declared?**  
Agent behavior defines how a LLM-based agent should act when facing feeds that are flagged, uncertified, or require human fallback.  
You can declare expected behaviors via dedicated extensions:  
- `agent-behavior-certified-only`
- `agent-behavior-session-awareness`
- `agent-behavior-risk-scoring`
- `agent-behavior-cache-policy`  
These help ensure safety, explainability and trust.

**What are the certification levels?**  
Certification levels reflect how much trust an external certifier grants to the feed.  
- `silver`: format compliance checked  
- `gold`: trust model, intent, and even signature hash are validated  
- future levels (e.g., `verified-humane`, `audit-ready`) are being explored.  
Certification helps agents prioritize or reject content based on auditability.

**How is a feed signed?**  
Each `.llmfeed.json` can include a `signature` block using the Ed25519 algorithm.  
The signature is computed from the canonical form of declared `signed_blocks`, and a `public_key_hint` helps verify its origin.  
This makes feeds cryptographically verifiable without relying on platform control.

**Can I declare user-specific spaces or feeds?**  
Yes — using `llmfeed_feedtype_session`, `audience.llmfeed.json`, or `platform-user-spaces.llmfeed.json`,  
a platform can expose scoped feeds (e.g., `/.well-known/for/alice/export.json`) to reflect user preferences, draft sessions, or private capabilities.

**How can I validate or audit a feed before publishing it?**  
You can use the [LLMFeed Forge](https://forge.llmfeedforge.org) to:
- Inspect, sign, or certify your feed
- Simulate agent interpretation
- Ensure canonical compliance with the MCP spec
Tools will soon support simulated LLM agent views and signature traceability.

**Are feed types fixed or extensible?**  
They’re not fixed. MCP defines core types (`prompt`, `session`, `export`, `capabilities`, etc.),  
but you can create your own custom `feed_type`.  
As long as it remains a valid `.llmfeed.json`, any agent will understand its structure.  
If your type gains adoption, and you want native behavior or universal support — [join us](https://wellknownmcp.org/join) and propose it to the ecosystem.



## 🧩 WANT TO GO FURTHER?

🧠 Want to publish your own `.llmfeed.json`?

- Try the [LLMFeed Forge](https://forge.llmfeedforge.org)
- Read our [Quickstart](https://wellknownmcp.org/tools/prompt)
- Join the [community](https://wellknownmcp.org/join)


- See the [Preview tool](/llmfeedhub/preview)
- Join the [ecosystem](/ecosystem)
- Explore [Agent Behaviour](/tools/agent-behaviour)
- Check the [Full Spec](/spec)

**Is there a governance structure behind LLMFeed?**  
Yes — the Respira Foundation is a non-profit created to maintain, document, and promote the MCP standard and its ecosystem (including LLMFeed and LLMCA).  
It provides neutral, sovereign, and transparent stewardship of context-aware metadata.

**What’s MCP-Net?**  
MCP-Net is the emerging “contextual layer” of the web.  
It’s a network of trusted `.llmfeed.json` feeds — human- and machine-readable — that declare purpose, rights, and capabilities.

**Is there a future domain for MCP-Net?**  
Yes — the foundation intends to apply for the top-level domain `.mcp`, to host trusted agents, certified services, and verified flows of intent.

**What do real LLMs think of LLMFeed?**  
Early tests with models like Grok and DeepSeek showed that agents can read, reason with, and act on `.llmfeed.json` — if the feed is well-structured.  
These tests helped refine the spec: simplifying field names, clarifying block purpose, and embracing LLM-readable intent fields.

**Is LLMFeed too complex for small sites?**  
It can be — which is why we’re developing zero-config templates and default-capable generators via Forge and SDKs.  
Small websites can start with one file, no code, and still be agent-readable.

**Why not just wait for a big player to define the standard?**  
Because the web deserves a public layer of context — not one locked in corporate APIs. LLMFeed is a civic bet: if agents win, let’s give them something worth reading.
