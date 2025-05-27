---
title: 'Giving Your Website a Voice — Introducing the Well-Known MCP Standard'
description: 'Launch communication draft for wellknownmcp.org: Giving Your Website a Voice — Introducing the Well-Known MCP Standard'
date: '2025-05-21'
tags:
  - launch
  - announcement
  - llmfeed
lang: en
---

Imagine if your website could **explain itself** to ChatGPT. Or Claude. Or any LLM.

Not just serve HTML, but **declare its intent**, list its prompts, expose APIs, or share signed exports — all in a structured, inspectable way.

That’s what we’re building with [wellknownmcp.org](https://wellknownmcp.org):
a small, open standard that turns **any domain into an agent-compatible endpoint**.

---

## 🧠 Why this matters

Today, LLMs browse the web like tourists with broken maps.

They hallucinate what your API does.
They miss your onboarding flow.
They guess your intent — and often guess wrong.

So instead of adding more scraping, we propose something better:
**let the site speak for itself.**

---

## 🧩 The core concept

We introduce `.llmfeed.json` files in your `.well-known/` folder.

Each one is a capsule of meaning:

- `mcp.llmfeed.json` → main declaration (metadata, trust, intent)
- `capabilities.llmfeed.json` → exposed APIs or tools
- `prompts/` → structured, signed prompt capsules
- `exports/` → contextual payloads (sessions, credentials, etc.)
- `llm-index.llmfeed.json` → list and describe all the above

These capsules are:

✅ JSON-based
✅ Signable
✅ Certifiable
✅ Optimized for agents
✅ Compatible with any LLM or custom assistant

---

## 🔍 What this unlocks

- 🤝 Agent onboarding → “Ask me anything on this domain”
- 🔐 API discovery → “This endpoint requires a token”
- 🧠 Prompt marketplaces → “This is a certified prompt”
- 📦 Session replays → “Here’s the full context capsule”
- 🧭 Inter-agent workflows → “I act here, then pass it on”

No need for plugins, wrappers, or SDKs.

Just **intent** — clearly declared, machine-readable, and trustable.

---

## 📥 Try it with your favorite LLM

Paste a feed into your assistant and say:

> “Explain this file to me”
> “What can an agent do here?”
> “Show me how this prompt is structured”

You’ll be surprised how many LLMs already understand.

And you’ll be amazed how easily they become **teachers** when fed the right structure.

---

## 🧰 Learn more, build more

- 🌐 [wellknownmcp.org](https://wellknownmcp.org)
- 📜 [The Manifesto](https://wellknownmcp.org/spec/spec/llmfeed_manifesto)
- 🛠 [Prompt Tool (demo)](https://wellknownmcp.org/tools/prompt)
- 🧱 [Spec on GitHub](https://github.com/wellknownmcp/llmfeed-spec)
- 🧩 [Ecosystem Explorer](https://wellknownmcp.org/ecosystem)

Everything is open. Everything is inspectable.

---

We believe in a softer web:

- One that **declares what it is**
- One that’s **trustable by design**
- One where agents and humans can collaborate with confidence

Thanks for reading 🙏
We hope you’ll [try it, share it, or even improve it](https://wellknownmcp.org/ecosystem).

#LLM #AI #SemanticWeb #PromptEngineering #OpenStandard #MCP #llmfeed

---

## 💬 Common doubts (and why they’re healthy)

You might be thinking:

- “Why would any LLM look for `.llmfeed.json` files?”
- “Is this yet another format no one will adopt?”
- “Why not just use OpenAPI and move on?”

Good. Doubt is healthy.

We’re not claiming `.llmfeed.json` will replace anything.  
We’re saying it **bridges the gap between intent and interpretation** —  
between what a site means, and what an agent guesses.

Some agents already understand it.  
Some will ignore it.  
But every agent that reads it is **closer to alignment**.

And every site that publishes one makes the web **a little more legible**.

This isn’t about control.  
It’s about **permissionless understanding**.

