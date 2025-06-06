---
title: "\U0001F4E4 ExportToLLM: A Button That Talks to Agents"
slug: exporttollm-button
format: news
lang: en
date: 2025-05-25T00:00:00.000Z
description: Turn any page into an agent-readable capsule with a single button.
tags:
  - ai-agents
  - interoperability
  - llmfeed
  - mcp
  - trust
  - ux
  - web
  - well-known
---

# 📤 ExportToLLM: A Button That Talks to Agents

---

## Why This Matters

LLMs and agents are now **core actors** on the Web.

Yet most sites still speak **HTML** — not **agent-native formats**.

The `ExportToLLM` button bridges this gap:

✅ It turns **any page or content block** into a **structured, agent-readable capsule**  
✅ In one click  
✅ With explicit **trust and origin** metadata  
✅ Ready to be **read and acted upon** by any LLM or agent  

---

## Not Just Export — *Intent Export*

This isn’t just "save as JSON".

It’s **intent export** — every capsule declares:

- **origin** → where this came from  
- **trust level** → signed or not, certified or not  
- **timestamp** → when this was generated  
- **data block** → the meaningful content (clean Markdown, API data, code, specs...)  
- **optional prompts** → guide how agents should use this  

---

## Why It Changes UX

For agents:

✅ No more guessing what to extract  
✅ No more fragile scraping  
✅ Clear, declared capsules — **LLM-friendly, signed, composable**

For users:

✅ Click the button → pass to your agent of choice  
✅ Works **across agents** (chatbot, personal assistant, AI browser...)  
✅ You control what is shared  

---

## Real-World Example: Our Landing

On **wellknownmcp.org**, we expose:

1️⃣ `.well-known/mcp.llmfeed.json`  
2️⃣ `.well-known/llm-index.llmfeed.json`  
3️⃣ The **ExportToLLM** button on key pages

→ In **3 JSON files + one button**, any LLM can:

✅ Understand the MCP spec structure  
✅ Discover our tools and badges  
✅ Verify signatures and certifications  
✅ Retrieve exportable capsules  

**No need to scrape. No need to guess.**

---

## Agent-to-Agent Ready

The button also enables **agent-to-agent workflows**:

1️⃣ Agent **reads page**  
2️⃣ User clicks **ExportToLLM**  
3️⃣ Capsule is generated → LLM receives structured feed  
4️⃣ LLM can:

- **store** it  
- **reason** about it  
- **pass it to another agent**  
- **replay** it in a session  
- **build workflows**  

---

## Business and Ecosystem Impact

✅ **For sites**:

- Control what is exported  
- Declare trust level  
- Attract agent-based usage  
- Improve discoverability by LLMs  

✅ **For agents**:

- Provide better, safer UX  
- Build interoperable workflows  
- Respect site owner declarations  

✅ **For users**:

- Portable context across agents  
- No more scraping uncertainty  
- Full transparency  

---

### Why UX Matters: Clipboard, Not Just Files

Exporting **prompts or feeds**:

✅ **Directly to clipboard**  
✅ Or to a **ready-to-share page**  

→ is often **faster and more natural** than file downloads.

It aligns with:

✅ How users interact with LLMs (prompt windows, chat inputs)  
✅ How agents compose workflows (context injection)  
✅ How modern Web UX works (copy, share, cross-agent portability)

---

### Toward a Universal Pattern

👉 This should become a **recognized UX pattern**:

✅ Sites could declare **“LLM-friendly Export”** capability  
✅ Browsers and extensions could:

- Detect standard `ExportToLLM` buttons  
- **Enrich “Copy” or “Download” buttons** with LLMFeed-compatible exports  
- **Auto-extract key site info** (origin, trust level...) even if not declared natively)

**A simple browser extension could transform the Web:**

👉 Any "Copy" button → **enriched with a valid `.llmfeed.json` capsule**  
👉 Any "Download" → offer an LLM-friendly version  
👉 Even if the site does not implement full MCP yet.

**This is the spirit of the Agentic Web:**  
→ **Progressive enhancement**  
→ **Agent-aware UX**  
→ **Portable, trusted context — ready for LLM-native interactions.**

👉 `ExportToLLM` is a first step.  
👉 The ecosystem should evolve toward **universal, agent-friendly export patterns**.

---

## Final Thought

👉 The `ExportToLLM` button is not a gimmick.

It’s a **fundamental building block** for:

✅ **Agent-native UX**  
✅ **Interoperability**  
✅ **Trusted interactions**  
✅ **Progressive enhancement of the Web**  

**From page to capsule → from capsule to agent → from agent to action.**

That’s the future we’re enabling — one button at a time.

---

## Get Involved

👉 We need an **open ecosystem** to make this pattern universal:

✅ Developers → to build better `ExportToLLM` implementations  
✅ Browser makers → to support **LLM-friendly export UX** natively  
✅ Community and industry players → to drive **adoption and recognition** of this model  

If you want to:

✅ **Develop** tools and extensions  
✅ **Help with industry advocacy** and standardization  
✅ **Integrate MCP in AI-first browsers**

👉 **[Join us →](/join)** and be part of building the **Agentic Web**.

---
