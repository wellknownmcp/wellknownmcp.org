
---
title: "The Web Needs a Context Layer — Why We’re Standardizing Intent for Agents"
description: "Introducing the Model Context Protocol (MCP) and .llmfeed.json — a new open standard to make your site readable, verifiable, and understandable by LLMs and agents."
date: "2025-05-21"
tags: [llmfeed, mcp, ai, semanticweb, agent, webstandard]
lang: en
---

# The Web Needs a Context Layer  
**Why We’re Standardizing Intent for Agents**

---

Today, large language models are smarter than ever — but they’re still guessing what your website means.

They can read HTML.  
They can crawl content.  
But they don’t really **understand** purpose, permission, or trust.

That’s the gap the **Model Context Protocol** (MCP) and **`.llmfeed.json`** aim to close.

---

## ❓ What’s the problem?

LLMs don’t know:

- What your service *does*
- What actions are allowed
- What APIs require auth
- What a user is allowed to reuse or share
- What context is certified, trusted, or fake

So they hallucinate.  
Or they fall back on scraping, brute-force prompting, or trial-and-error.

---

## ✅ What’s the solution?

We propose a **new agent-readable layer**, using `.llmfeed.json` files served from `.well-known/`.

These files declare:

- `mcp.llmfeed.json`: site-wide metadata, trust, intent
- `capabilities.llmfeed.json`: callable APIs
- `prompt.llmfeed.json`: reusable intent capsules
- `llm-index.llmfeed.json`: structured feed discovery
- `export.llmfeed.json`: signed pages, bundles or sessions

It’s like `robots.txt`, but for meaning.
Like `schema.org`, but inspectable and signed.
Like `OpenAPI`, but with declared **intent and trust**.

---

## 🧠 What this unlocks

- Agents that *don’t guess*, but align
- Interfaces that explain themselves
- Prompts that carry certified behavior
- API docs that don’t need scraping
- A civic infrastructure for AI alignment

It works today with Claude, Gemini, DeepSeek, open-source models —  
any LLM that can read JSON and follow a declared structure.

---

## 🧱 How it works

- 🧩 It’s just JSON (no SDK required)
- 🌐 Served from `.well-known/`
- 🔏 Optionally signed with Ed25519
- 🛡️ Trust scopes + certifications (via llmca.org)
- 🔗 Can reference OpenAPI for deep integrations
- 📦 Fully offline-compatible for export bundles

And we’ve made it real with:

- [wellknownmcp.org](https://wellknownmcp.org) — spec & examples  
- [llmca.org](https://llmca.org) — certification & trust graph  
- [llmfeedforge.org](https://llmfeedforge.org) — tooling & previews

---

## 💬 Common concerns (and why they’re healthy)

- *“Why not just use OpenAPI?”*  
  → OpenAPI shows *how* to call. LLMFeed shows *whether*, *when*, and *why*.
- *“Won’t big vendors push their own thing?”*  
  → Maybe. But this is open, signed, portable — and here now.
- *“Do LLMs even read this?”*  
  → They do. And the ones that don’t — will soon, because it’s simple and inspectable.

This isn’t another spec to forget.  
It’s a call for a **semantic contract layer** on the web.

---

## 🔮 What’s next?

We believe this starts small — a few smart agents, a few brave websites.  
Then it grows.

The Respira Foundation (nonprofit) supports the governance of the standard.  
And one day, we hope to anchor this ecosystem in a dedicated domain: `.mcp`.

Because if agents are going to use the web,  
they deserve to know what it *means*.

---

Want to publish your own?  
- Try [llmfeedforge.org](https://llmfeedforge.org)  
- Read the spec at [wellknownmcp.org](https://wellknownmcp.org)  
- Or just create `.well-known/mcp.llmfeed.json` and tell your agent:  
  > “Here’s what I do. And here’s why you can trust it.”
