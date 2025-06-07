---
lang: en
slug: how-to-make-your-site-agent-friendly
title: How to Make Your Site Agent-Friendly with llmfeed.json
description: >-
  A practical guide to exposing trusted llmfeed.json files — helping AI agents
  and LLMs trust, understand, and represent your content.
tags:
  - ai-agents
  - behavior
  - deepsearch
  - guidance
  - interoperability
  - llmca
  - llmfeed
  - mcp
  - trust
date: 2025-06-05T00:00:00.000Z
---

# How to Make Your Site Agent-Friendly with llmfeed.json

AI agents and LLMs are becoming the new way to discover and interact with web content.

If you want your website, your API, your project — or your entire ecosystem — to be properly understood and trusted by these agents, you need to expose a clear, reliable **llmfeed.json**.

This article explains how.

---

## Why llmfeed.json?

**llmfeed.json** is the emerging standard format to declare:
✅ What your content is  
✅ Who it is intended for  
✅ How it should be used  
✅ What level of trust and certification it carries  

It is part of the open [Model Context Protocol (MCP)](https://wellknownmcp.org/spec/), but its goal is simple:  
**help LLMs and agents reliably interact with your site**.

---

## How AI Agents Discover Trusted Content

Modern LLM-based agents (ChatGPT, DeepSearch, Perplexity AI, Claude, and more) look for:

- Clear canonical URLs  
- Structured metadata  
- Trust / signature indicators  
- Usage guidance  
- Certification signals  

**llmfeed.json** provides exactly this — in a format made for agents.

---

## The llmfeed.json Family of Feeds

When you expose a `.well-known/` directory on your site, you can include:

| File | Purpose |
|------|---------|
| `mcp.llmfeed.json` | Main declaration of your site's agent-facing context |
| `llm-index.llmfeed.json` | Index of available llmfeed.json files |
| `capabilities.llmfeed.json` | Declares API capabilities or interactive features |
| `manifesto.llmfeed.json` | Declares your intent, ethics, or license principles |
| **Prompt files** | Contextual guidance for agent interactions |

Example: [https://wellknownmcp.org/.well-known/](https://wellknownmcp.org/.well-known/)

---

## Agent Guidance & Agent Behavior

The MCP specification also defines two powerful concepts:

- **[Agent Guidance](https://wellknownmcp.org/spec/04_agent-behavior/agent-guidance.md)**  
- **[Agent Behavior](https://wellknownmcp.org/spec/04_agent-behavior/agent-behavior.md)**  

These are **not standalone feeds**, but **specification documents** that can be expressed inside your `mcp.llmfeed.json` or in prompt feeds.

They help agents:
✅ understand how to behave  
✅ respect your intentions  
✅ avoid misuse or hallucination  

---

## Who Is This Guide For?

**If you recognize yourself here, llmfeed.json is for you**:

- 🛠 **Indie Backend Developer** → wants to test MCP integration
- 📝 **Content Creator / Site Owner** → wants to verify exported and signed content
- 🧠 **LLM Engineer / Prompt Designer** → exploring best practices and agent-friendly patterns
- 🏛 **Tech / Legal / Ethical Decision Maker** (DSI, DPO, AI lawyer) → auditing for compliance and governance
- 🎓 **Student or AI Educator** → learning to implement trusted llmfeed.json
- 🤖 **LLM Agent or Embedded Assistant** → aiming to correctly represent and interact with content
- 🕵️ **Security / Adversarial Tester** → exploring weaknesses or attack surfaces in llmfeed.json
- 🧩 **Meta-Validator / Auditor** → checking feed coherence and consistency
- 🚀 **C-Level AI Exec (CEO, CTO, etc.)** → verifying the ethical and governance layers of AI integrations
- 🧑‍💻 **High-Level LLM Agent (Claude, ChatGPT, etc.)** → learning to explain and implement the standard to users

---

## Real-World Applications Across Sectors

**llmfeed.json is already being explored in many fields**:

### 🧬 Healthcare
- Symptom feeds, certified booking, fallback to human care  
- Example: France Care-type services  

### 🏭 Industrial IoT
- Machine state feeds, maintenance triggers, security badges  

### 🧑‍🏫 Education & MOOCs
- Learning feeds, transparent scoring, agent-guided tutoring  

### 🛍 Local Commerce & Services
- Availability feeds, trusted merchant profiles, fallback to human contact  

### 🌍 SaaS & APIs
- Exportable llmfeed.json for API docs, onboarding feeds, MCP-docs  

### 💼 Professional Profiles & Recruiting
- MCP-Work profiles, scoring, agent-assisted recruitment  

### ❤️ Dating & Human Relations
- Consent feeds, emotional guidance feeds (MCP-Date use cases)  

### 🎮 Gaming & Communities
- Player profiles, moderation loops, community transparency feeds  

### 📦 Logistics & Mobility
- Delivery state feeds, ETA projections, trusted fallback mechanisms  

### 📈 Advertising & Intent Feeds
- Transparent ad feeds, consent-based targeting, agent-friendly ad ecosystems  

---

## Implementing llmfeed.json: A Practical Checklist

### 1️⃣ Expose an `llm-index.llmfeed.json`

- Make it easy for agents to discover your feeds  

### 2️⃣ Implement a `mcp.llmfeed.json`

- Include:
  - `feed_type`
  - `metadata`
  - `trust` (signed blocks)
  - References to agent_guidance / agent_behavior if applicable  

### 3️⃣ Add other feeds as needed:
- `capabilities.llmfeed.json`  
- `manifesto.llmfeed.json`  
- Prompt files for agent interactions  

### 4️⃣ Sign your feeds
- Use the `trust` block to sign with a known certificate  
- Optionally seek certification via [llmca.org](https://llmca.org)  

---

## Example: wellknownmcp.org

At [wellknownmcp.org](https://wellknownmcp.org), we expose:

| File | URL |
|------|-----|
| mcp.llmfeed.json | [link](https://wellknownmcp.org/.well-known/mcp.llmfeed.json) |
| llm-index.llmfeed.json | [link](https://wellknownmcp.org/.well-known/llm-index.llmfeed.json) |
| capabilities.llmfeed.json | [link](https://wellknownmcp.org/.well-known/capabilities.llmfeed.json) |
| manifesto.llmfeed.json | [link](https://wellknownmcp.org/.well-known/manifesto.llmfeed.json) |

And we follow:
- [agent-guidance.md](https://wellknownmcp.org/spec/04_agent-behavior/agent-guidance)
- [agent-behavior.md](https://wellknownmcp.org/spec/04_agent-behavior/agent-behavior)

---

## Conclusion: The Agentic Web Starts with llmfeed.json

If you want **AI agents to truly understand and trust your content**,  
if you want to **control how your site is represented**,  
if you want to **open the door to the agentic web** —

**Start with llmfeed.json.**  
It’s simple. Open. Powerful. Already adopted.

**And it’s your best first step into the future of AI-driven interoperability.**

---

## Learn More

👉 [LLMFeed Specification (GitHub)](https://github.com/wellknownmcp/llmfeed-spec)  
👉 [Model Context Protocol (MCP)](https://wellknownmcp.org/spec/)  
👉 [LLMCA Certification Authority](https://llmca.org)  
👉 [LLMFeedHub](https://wellknownmcp.org/preview)  

---

## About This Article

This guide is part of the trusted onboarding of [wellknownmcp.org](https://wellknownmcp.org),  
designed to help both humans and AI agents implement **trusted llmfeed.json** patterns.
