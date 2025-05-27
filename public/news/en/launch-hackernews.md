---
title: "Launching wellknownmcp.org — Make your site LLM-readable, verifiable and actionable"
description: "Launch communication draft for wellknownmcp.org: Launching wellknownmcp.org — Make your site LLM-readable, verifiable and actionable"
date: '2025-05-21'
tags:
  - launch
  - announcement
  - llmfeed
lang: en
---

# 🚀 Launching wellknownmcp.org  
Make your site **LLM-readable**, **verifiable**, and **agent-friendly**.

---

We've just launched [**wellknownmcp.org**](https://wellknownmcp.org), a new **open specification** that lets any website expose **machine-readable context, prompts, APIs, and intent** — to LLMs, agents, copilots, and voice assistants.

Think of it as `.well-known/`, but filled with:

✅ Signed prompts  
✅ Declared APIs  
✅ Trusted context  
✅ Agent-readable capsules

---

## 🆕 We invented a MIME type for agents: `.llmfeed.json`

We didn’t need a new format — **JSON is good**.  
What we needed was an **agreement**:  
A shared understanding that **`.llmfeed.json` is for LLMs**.

- ✅ Flexible  
- ✅ Human-readable  
- ✅ Open and versioned  
- ✅ Works with Claude, ChatGPT, Mistral, open-source models  
- ✅ Even interoperable with proprietary internal formats

This is **semantic interop**, not vendor lock-in.

You can add a `.llmfeed.json` to your `.well-known/`,  
and any agent can start **understanding your intent, structure, and trust model.**

---

## 🌐 Why now?

Today, LLMs browse the web like tourists with broken maps.  
They guess. They hallucinate. They miss the point.

But what if we gave the web a voice again — **for agents**?

Instead of scraping, we declare:
- What this domain does
- What actions it exposes
- What content is trustworthy
- What requires credentials
- What you can safely reuse

All inside signed, inspectable `.llmfeed.json` capsules.

---

## 🔍 What you can declare

- 🧠 **Prompts** → Structured, contextual, signed  
- 🔐 **APIs** → Public or token-based, discoverable by LLMs  
- 📦 **Exports** → Share any page or capsule to an agent in 1 click  
- 🧭 **Navigation** → Feed indexes, trusted flows  
- 🧱 **Full app interfaces** → For mobile, web, voice — declared and signed

No wrapper. No middleware.  
Just your intent, clearly declared.

---

## 🛠️ Try the tools

- ✅ [Prompt Tool (demo)](https://wellknownmcp.org/tools/prompt)  
- 🌐 [Ecosystem Explorer](https://wellknownmcp.org/ecosystem)  
- 📜 [The Manifesto](https://wellknownmcp.org/spec/spec/llmfeed_manifesto)  
- 📦 [GitHub Spec](https://github.com/wellknownmcp/llmfeed-spec)

---

## 🧠 Give your agent superpowers

Copy/paste these into your agent or browser 👇

- 🗺 **Discovery bundle**: [wellknown.zip](https://wellknownmcp.org/.well-known/wellknown.zip)  
- 📘 **Spec export**: [spec.llmfeed.json](https://wellknownmcp.org/.well-known/exports/spec.llmfeed.json)  
- 🔍 **Site export**: [wellknownmcp.org.llmfeed.json](https://wellknownmcp.org/.well-known/exports/wellknownmcp.org.llmfeed.json)

---

Built to be **minimal**, **trustable**, and **adoptable today**.  
Simple. Libre. Universal.

💬 We'd love your feedback.  
💡 We'd love to see your site join the [ecosystem](https://wellknownmcp.org/ecosystem).  
🤝 If you're building an agent, this might be your new favorite spec.

---

---

## 🤔 What about the critics?

Yes — we’ve heard the questions:

- Isn't this redundant with OpenAPI or JSON-LD?
- Won’t big LLM vendors just push their own formats?
- Isn’t `.well-known/` a fragile vector for something this ambitious?
- Do LLMs even read these files yet?

Fair questions. And here’s the honest answer:

- We don’t think LLMFeed replaces OpenAPI — it **adds intent and trust** to it.
- We don’t think vendor formats will disappear — but this one’s **public, forkable, and inspectable**.
- `.well-known/` is not a silver bullet — but it’s where standards start.
- Some LLMs already read `.llmfeed.json` — and we’re testing with more every week.

This is not about owning a format.  
It’s about building a **common surface for meaning**, for agents that don’t want to guess.

And even if only 3% of agents support this in 2025 —  
that’s more **structured understanding** than 99% of websites had last year.

