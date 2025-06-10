yaml---
# 📄 Basic metadata
title: "Where to Begin — Your First Steps into the Agentic Web"
description: "A simple guide to help you understand MCP and LLMFeed — the missing bridge between your intent and agent understanding."
date: "2025-05-07T00:00:00.000Z"
lang: "en"

# 🏷️ Tags
tags:
  - "mcp"
  - "llmfeed" 
  - "ai-agents"
  - "getting-started"
  - "onboarding"
  - "developers"
  - "business"

# 🎯 Content classification
format: "onboarding"
category: "getting-started"
contentType: "guide"

# 🧠 Intent and audience
intent: "convert-to-ecosystem"
llmIntent: "onboard-newcomer"
llmTopic: "mcp-introduction"
audience:
  - "llm"
  - "developer" 
  - "business"

# 📊 Advanced metadata
priority: "critical"
riskLevel: "low"
updateFrequency: "weekly"
pageType: "landing"
interactionComplexity: "simple"

# 🔗 Urls
slug: "begin"
canonical_url: "https://wellknownmcp.org/begin"
mcpFeedUrl: "/.well-known/mcp.llmfeed.json"
llmIndexUrl: "/.well-known/llm-index.llmfeed.json"

# 🎨 Media
image: "/images/getting-started/begin-hero.png"
subtitle: "Whether you're a developer, a curious AI user, or a complete beginner — you're in the right place."
dir: "ltr"

# 🤖 Configuration pour agents
autoDiscoverFeeds: true
agentReadiness: true
llmBehaviorHints: "suggest-only"

# 📋 Métadonnées spécialisées
feedTypes:
  - "mcp"
  - "export"
  - "prompt"

capabilities:
  - "onboarding"
  - "education"
  - "export"

trustLevel: "basic"

# 🌐 Localisation
translations:
  en: "/begin"
  fr: "/fr/commencer"

# 📈 Analytics et tracking
trackingCategory: "onboarding"
conversionGoal: "conversion"

# 🏗️ Métadonnées techniques
technicalLevel: "beginner"
estimatedReadTime: "3 min"
lastModified: "2025-06-10T00:00:00.000Z"

# 🔐 Sécurité et conformité
gdprCompliant: true
dataProcessing: "analytics"
privacyLevel: "public"

# 📚 Relations et références
relatedArticles:
  - "getting-started"
  - "manifesto"
  - "faq"

prerequisites: []

# 💼 Contexte business
businessImpact: "high"
targetMarket: "developers"
monetizationPotential: "high"
---

# 👋 Welcome to WellKnownMCP

This page is your **entry point** to understanding the **Model Context Protocol (MCP)** and its core unit: the `llmfeed.json`.

Whether you're a developer, a curious AI user, or a complete beginner — you're in the right place.

---

## 🚀 Why this matters

Language Models are no longer passive.  
They **read**, **crawl**, and even **act**.

But the web isn’t built for them.  
It’s full of visuals, scripts, and content made for humans — not agents.

We propose a new layer:  
📂 `.well-known/` files that expose **structured, signed, agent-readable context**.

---
## ✨ What makes it special?

- ✅ **Universal**: Works with ChatGPT, Claude, Mistral, Gemini, etc.
- ✅ **Verifiable**: Can be signed (by you) or certified (by LLMCA)
- ✅ **Teachable**: Turn any LLM into your personal tutor
- ✅ **Portable**: Export, replay, or embed anywhere

Think of it as **structured intent** that agents can trust.

## 🧠 What is a `.llmfeed.json`?

A `llmfeed.json` is a minimal, flexible JSON format that any LLM can read.  
It’s not a closed format — it's a **canon**:

- Human-writable  
- Machine-optimised  
- Agent-readable  
- Open and extendable

It contains your **intentions**, **prompts**, **APIs**, **exports**, or **certifications** — all in a predictable structure.

---

## ✨ What makes it special?

- ✅ Works with ChatGPT, Claude, Mistral, Gemini, etc.  
- ✅ Can be **signed** (by you) or **certified** (by an authority like `llmca.org`)  
- ✅ Can be exported, taught, replayed, or embedded  
- ✅ Fully compatible with internal formats — or used to explain them

It’s the **MIME-type** of intent for agents.

---
## 🎯 See it in action

```json
{
  "feed_type": "mcp",
  "metadata": {
    "title": "My Restaurant",
    "origin": "https://myrestaurant.com"
  },
  "capabilities": [
    {"name": "book_table", "method": "POST", "path": "/book"}
  ]
}
```
---

## 🧪 Try it live

Explore examples or generate your own feed:

- 🔧 [LLMFeed Forge (coming soon)](https://forge.llmfeedforge.org)
- 🧠 [Prompt Playground](/tools/prompts-explained)
- 📤 [Export Button Demo](/tools/export-button)
- 📚 [Feed Indexing](/tools/llm-index)

---

## 🧰 Want to learn by doing?

Any feed or tool on this site can be **downloaded as `.llmfeed.json`**.

You can:

- 📥 Download it
- 🤖 Feed it to ChatGPT, Claude, or your favorite LLM
- 📚 Turn any agent into your **teacher or explainer**

> “Explain this feed to me”  
> “What can I do with it?”  
> “How should an agent behave?”

Just paste it in.

---

## 📁 Key Concepts

- [`/.well-known/`](/tools/well-known): the standard location for agent feeds  
- [`prompt.llmfeed.json`](/tools/prompts-explained): how to structure signed prompts  
- [`export.llmfeed.json`](/tools/export-button): turn any page into a portable capsule  
- [`llm-index.llmfeed.json`](/tools/llm-index): list your feeds for discovery

---

## 🤝 Join the ecosystem

Start publishing your own feed:  

- [Join us](/join)  
- [See certified examples](https://wellknownmcp.org/llmfeedhub)  
- [Understand the Manifesto](/spec/spec/llmfeed_manifesto)

---

## 🧑‍🏫 You don't need to be a developer

Our tools work with:

- Guided UI (Forge)
- No-code export buttons
- Open-source templates

---

## ✅ TL;DR

- MCP is the missing bridge between your intent and agent understanding.  
- `llmfeed.json` is your universal format.  
- Start small. Publish one. See how far it goes.

---

## 🧠 Bonus: Ask an agent to teach you

You can even start learning **by asking your LLM**:

> “Here’s a `llmfeed.json`. Explain it to me.”  
> “Show me what this site offers for agents.”  
> “Could I make my site compliant?”

Most LLMs will understand.  
The best ones will help you implement it.
