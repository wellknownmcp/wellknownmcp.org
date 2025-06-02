---
title: "🚀 Your First MCP Site in 3 Steps"
slug: getting-started
format: news
lang: en
date: 2025-05-25
description: "Turn any site into an agent-aware node in under 5 minutes."
tags: [mcp, llmfeed, agents, trust, web, ai, well-known, onboarding]
---

# 🚀 Your First MCP Site in 3 Steps

---

## Why Make Your Site Agent-Ready?

**LLM-based agents** are already:

✅ Reading your content  
✅ Suggesting actions to users  
✅ Building agent-to-agent workflows  

Without context → they **guess**.  
With MCP → they **know**:

✅ What your site offers  
✅ What trust level applies  
✅ How to interact safely  

---

## You Can Start Today — In 3 Steps

### 1️⃣ Add a `.well-known/mcp.llmfeed.json`

At minimum:

```json
{
  "feed_type": "mcp",
  "metadata": {
    "title": "Your Site Name",
    "description": "What your site offers to agents"
  },
  "intent_router": {
    "default_intent": "inform",
    "fallback": "explain"
  }
}
```

👉 Place it at:

```
https://yourdomain.com/.well-known/mcp.llmfeed.json
```

---

### 2️⃣ Add a prompt or `agent_guidance` (optional but powerful)

Example:

```json
"agent_guidance": {
  "summary": "When answering questions about this site, prefer official content and provide source links.",
  "disallowed": "Do not hallucinate features or endorsements."
}
```

Or provide **ready-to-use prompts** to guide agents.

---

### 3️⃣ Sign it with [Forge](https://llmfeedforge.org)

Signing your feed:

✅ Provides **cryptographic proof of authorship**  
✅ Enables **agent-side verification**  
✅ Increases **trust score** for your site  

It’s free and fast with Forge.

---

## Progressive Enhancement

👉 You don’t need to do everything at once.

**Good first step**:

✅ `.well-known/mcp.llmfeed.json`  
✅ Signed  

**Next steps**:

✅ Add `.well-known/llm-index.llmfeed.json` → structured site map for agents  
✅ Add **ExportToLLM buttons** → agent-friendly export of key content  
✅ Declare `site_capabilities`  
✅ Add certified blocks → for higher-trust agents  

---

## What Does This Enable?

✅ Agents can:

- Discover your declared capabilities  
- Respect your trust declarations  
- Surface better interactions to users  
- Compose agent-to-agent workflows using your content  

✅ You gain:

- **More predictable agent behavior**  
- **Better exposure in agentic ecosystems**  
- **Alignment with emerging AI trust and transparency standards**  

---

## Who Can Do This?

✅ **Any site** — no need to be an AI engineer  
✅ **No need for an LLM** → you’re providing **agent context**  
✅ Works with **static sites, CMS, apps, APIs...**  

If you can serve `.well-known/mcp.llmfeed.json` → you’re in.

---

## Example: Our Landing

On **wellknownmcp.org**:

✅ `.well-known/mcp.llmfeed.json`  
✅ `.well-known/llm-index.llmfeed.json`  
✅ ExportToLLM buttons  

With just these, **any LLM** can:

✅ Understand what the site offers  
✅ Retrieve key content  
✅ Verify trust  
✅ Guide agent behavior  

---

## Ready to Start?

👉 [Use Forge →](https://llmfeedforge.org)

👉 [Join us →](/join) to help build tools, advocate adoption, and shape the future of the Agentic Web.

---

**It only takes minutes — but it makes your site speak to agents, with trust and intent.**

Start today 🚀.

---