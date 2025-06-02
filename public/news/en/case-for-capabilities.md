---
title: "📡 The Case for Capabilities"
slug: case-for-capabilities
format: news
lang: en
date: 2025-05-25
description: "Declaring agent-facing capabilities beats inference every time."
tags: [mcp, llmfeed, agents, trust, web, ai, well-known]
---

# 📡 The Case for Capabilities

---

## Why Capabilities Matter

Modern agents don’t want to **crawl and infer** — they want to **verify and act**.

When an agent lands on:

```
https://example.com/.well-known/mcp.llmfeed.json
```

It needs to know, at a glance:

✅ Is this site **LLM-readable**?  
✅ Are its feeds **signed**?  
✅ Are they **certified**?  
✅ What **level of trust** is declared?  
✅ What is the **interaction intent**?  

---

## The Role of `site_capabilities`

The `site_capabilities` block is a **simple declaration** — but with huge impact.

It typically includes:

```json
"site_capabilities": {
  "llm_readable": true,
  "feeds_signed": true,
  "feeds_certified": true,
  "session_feed_supported": true,
  "intent_router_present": true
}
```

---

## Why It Matters to Agents

Agents can use `site_capabilities` to:

✅ **Triage** sites quickly → skip non-LLM-friendly sites  
✅ **Filter** for trustworthy sources  
✅ **Prioritize** interactions with certified / signed sites  
✅ **Adapt behavior** (ex: stricter handling for unsigned feeds)  
✅ **Respect site design** → if no `intent_router`, fallback gracefully  

---

## From Inference to Declaration

Without `site_capabilities`, agents have to:

❌ **Guess** if the site is LLM-friendly  
❌ **Crawl deeply** to detect signed feeds  
❌ **Infer trust** from scattered signals  
❌ **Risk breaking user expectations**  

With `site_capabilities`, agents can:

✅ **Decide immediately** how to interact  
✅ **Save tokens and compute**  
✅ **Provide better UX**  
✅ **Align with site owner’s declared intent**  

---

## Example Agent Flow

1️⃣ Agent lands on `.well-known/mcp.llmfeed.json`  
2️⃣ Reads `site_capabilities`  
3️⃣ Adjusts strategy:

```plaintext
- llm_readable: true → OK to parse feeds
- feeds_signed: true → trustable feeds
- feeds_certified: true → high-trust actions possible
- session_feed_supported: true → can record/replay sessions
- intent_router_present: true → follow declared intents
```

4️⃣ Proceeds with **confidence**.

---

## Business Benefits

✅ **For site owners**:

- Declare what’s allowed and supported  
- Attract high-trust agents and integrations  
- Reduce scraping and misinterpretation  
- Align with emerging Agentic Web standards  

✅ **For agents**:

- Save compute  
- Improve trustworthiness  
- Provide better, safer user experiences  

---

## Why MCP Makes This Work

✅ **Signed** → site owners vouch for declared capabilities  
✅ **Auditable** → agents can report what was declared  
✅ **Composable** → evolves with new capabilities (ex: future agent collaboration)  

---

## Final Thought

**Agents should not be forced to guess.**  
**Site owners should have a voice.**

👉 `site_capabilities` is a simple, powerful way to move from **guessing to declaring**.

**It’s a key building block of a more trustworthy, agent-ready web.**

---