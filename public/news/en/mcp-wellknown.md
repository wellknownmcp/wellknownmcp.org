---
title: "🛰️ The Case for .well-known/mcp.llmfeed.json"
slug: mcp-wellknown
format: news
lang: en
date: 2025-05-25
description: "Why .well-known/ is the most logical place to declare AI-ready interfaces — and why signatures matter."
tags: [mcp, llmfeed, agents, trust, web, ai, well-known, certification]
---

# 🛰️ The Case for `.well-known/mcp.llmfeed.json`

---

## Why `.well-known/`?

`.well-known/` is the **standard gateway** for protocols to declare machine-consumable context:

✅ `security.txt` → for security contacts  
✅ `webfinger` → for identity resolution  
✅ `openid-configuration` → for OpenID Connect  
✅ `oauth-authorization-server` → for OAuth  

---

## In a World of LLMs

**LLM-based agents** need to know:

✅ **What this site offers**  
✅ **How to interact**  
✅ **What can be trusted**  
✅ **Who certifies what**  

---

## Why `.well-known/mcp.llmfeed.json`?

Placing MCP here provides:

✅ **Discoverability** → any agent can look in a known place  
✅ **Non-intrusive** → no impact on frontend routing  
✅ **Cross-domain friendly**  
✅ **Open standards compliant**  
✅ **Neutral and decentralized** → no central registry required  

---

## How It Complements HTML

LLMFeed doesn’t replace HTML:

- HTML serves **humans**  
- `.llmfeed.json` serves **agents**

It supplements it with:

✅ **Trust**  
✅ **Structure**  
✅ **Intent**  

---

## Why Signatures Matter

Unlike `security.txt` or `robots.txt`, MCP feeds can be:

✅ **Signed** → cryptographic proof of authorship  
✅ **Certified** → attested by a third party (ex: `llmca.org`)  

This is critical in the age of:

- **LLM-driven search**  
- **Agent-mediated interactions**  
- **AI-first browsers**  

Agents need to **verify** — not just read.

---

## Example Scenarios

### AI-First Browser

On visiting:

```
https://example.com/.well-known/mcp.llmfeed.json
```

The browser can immediately:

✅ Detect site capabilities  
✅ Verify trust level  
✅ Surface certified actions to the user  
✅ Adapt its interaction model accordingly  

---

### LLM-Based Assistant

When a user mentions:

> “Check flights on example.com”

The assistant can:

✅ Retrieve `.well-known/mcp.llmfeed.json`  
✅ See that the site exposes **signed APIs** for flights  
✅ Know which endpoints are **agent-optimized**  
✅ Guide the user confidently  

---

## Why It Fits MCP Philosophy

`.well-known/mcp.llmfeed.json` is:

✅ **Declarative** → what can be done  
✅ **Trustable** → signed  
✅ **LLM-friendly** → readable and auditable by LLMs  
✅ **Composable** → can point to other feeds (index, exports, prompts...)  

---

## A New Foundation for the Agentic Web

**Crawling is not enough.**  
**SEO is not enough.**  
**Agents need structured, verifiable context.**  

`.well-known/mcp.llmfeed.json` is the missing piece:

👉 A clear, auditable declaration:  
> **“This site is agent-ready. Ask me anything.”**

---

## Final Thought

In the emerging **Agentic Web**, `.well-known/mcp.llmfeed.json` plays a pivotal role:

✅ It makes **intent** and **trust** machine-visible  
✅ It empowers **agents** to reason and act  
✅ It aligns with **Web standards philosophy**  

👉 It’s time for the Web to declare itself **agent-ready**.

---