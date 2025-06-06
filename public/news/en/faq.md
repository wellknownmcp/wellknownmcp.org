---
title: ❓ Frequently Asked Questions — MCP & LLMFeed
slug: faq
format: faq
lang: en
date: 2025-05-25T00:00:00.000Z
description: >-
  Understand the key concepts, philosophy, and ecosystem of the Model Context
  Protocol (MCP).
tags:
  - agentic-web
  - llmfeed
  - mcp
  - trust
---

# ❓ Frequently Asked Questions — MCP & LLMFeed

---

## What is MCP in one sentence?

It’s an open protocol that lets **LLM-based agents** understand **what a site offers**, **how to interact**, and **what trust level to assign** — through structured, signed, declarative feeds.

---

## What is LLMFeed?

It’s the **canonical JSON format** used by MCP.  
The `.llmfeed.json` structure is:

✅ Simple and human-readable  
✅ Designed to be **LLM-friendly**  
✅ Composable and extensible  
✅ Trust-aware (signed, certifiable)  
✅ Declarative, not imperative  

---

## Why `.well-known` and not a plugin / SDK / proprietary API?

Because `.well-known` makes MCP:

✅ **Discoverable**  
✅ **Decentralized**  
✅ **Composable**  
✅ **Independently auditable**  
✅ **Compatible with Web philosophy**  

LLMFeed is intentionally **lighter than SDK-heavy designs** — it favors **progressive enhancement** of the Web.

---

## What is the “Agentic Web” and how does MCP fit?

The Agentic Web is an emerging vision where **LLM-based agents** are first-class citizens of the Web:  
→ not just consumers of HTML, but actors with **intent**, **trust boundaries**, and **interaction models**.  

MCP provides the **contextual layer** these agents need to operate safely and transparently.

---

## How is trust handled?

✅ Every `.llmfeed.json` can be **signed**  
✅ Feeds can be **certified** by a third party (ex: `llmca.org`)  
✅ **Signed blocks** are verifiable by agents  
✅ Certification **attests intent + trust scope**  

Agents can reason about:

- What is **signed**  
- Who **certified** it  
- What trust level to assign

---

## What is `ExportToLLM` and why does it matter?

It’s a simple pattern: **turn any content into an agent-readable capsule** — signed, trusted, structured.  
It enables:

✅ **Agent-to-agent workflows**  
✅ **Portable context for users**  
✅ **Progressive enhancement** of any site, even without full MCP adoption  

It’s one of the most **immediately impactful ways** to make a site "agent-ready".

---

## How is this different from Schema.org?

Schema.org describes **what’s on a page**.  
MCP and `.llmfeed.json` declare:

✅ **What agents can DO**  
✅ **What is trusted**  
✅ **How to interact**  
✅ **Fallbacks**  
✅ **Agent guidance**  

It’s a layer for **intent and trust**, not just metadata.

---

## Does this replace HTML?

No. It **complements** HTML:

✅ HTML → for **human users**  
✅ MCP → for **LLM-based agents**  

They can co-exist and evolve together.

---

## How does this help LLM-based agents?

It gives agents:

✅ **Trust signals**  
✅ **Declared capabilities**  
✅ **Clear intent routers**  
✅ **Portable prompts**  
✅ **Certified action scopes**  
✅ **Session context replay** possibilities  

This enables **safer, more predictable interactions**.

---

## How does this help site owners?

✅ Declare what’s allowed / trusted  
✅ Attract agent-based integrations  
✅ Improve agent UX  
✅ Reduce scraping and misinterpretation  
✅ Align with upcoming regulations (AI transparency, data provenance)

---

## I’m building an AI-first browser / platform. Why should I support MCP?

MCP provides:

✅ A **declarative contract** for agents  
✅ **Trust signals** for UX decisions  
✅ A **progressive layer** for the Web → no lock-in  
✅ **Portable UX patterns** like `ExportToLLM`  

Supporting MCP helps:

✅ **Guide agent behavior**  
✅ **Respect user and site intent**  
✅ Enable a **safer, more predictable Agentic Web**.

---

## How does this scale?

✅ MCP feeds are **modular**  
✅ Agents can **prioritize** by trust level  
✅ Signed and certified feeds are **cacheable**  
✅ Progressive enhancement means **no mandatory full adoption** — sites can implement **incrementally**.

---

## How does this compare to pure plugin / API models?

✅ MCP is **decentralized**  
✅ No central registry required  
✅ No mandatory SDKs  
✅ Works with **any agent** that understands MCP / `.llmfeed.json`  
✅ Aligns with **Web architecture** (URL-first, file-based, declarative)

---

## Is this compatible with W3C philosophy?

Yes — `.well-known` is a **standard pattern**.  
MCP:

✅ Respects existing Web standards  
✅ Is open, auditable  
✅ Encourages progressive adoption  
✅ Avoids lock-in

---

## Is MCP open and community-driven?

Yes:

✅ Spec is open  
✅ No lock-in  
✅ Community-driven extensions possible  
✅ [llmca.org](https://llmca.org) provides **neutral certification**  

---

## What’s next?

- More **standard feed types**  
- Reference **agent implementations**  
- Browser **extension prototypes**  
- Certification process refinement  
- Ecosystem growing around MCP

---

## How can I contribute to MCP / LLMFeed?

✅ Propose new feed types  
✅ Build tools (parsers, extensions, agents)  
✅ Help with industry advocacy  
✅ Participate in certification working groups  
✅ Implement MCP in AI-first browsers and apps  

👉 [Join us →](/join) — help shape the future of the Agentic Web.

---
