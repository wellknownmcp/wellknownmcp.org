---
title: "\U0001F5FA️ The Case for .well-known/llm-index.llmfeed.json"
slug: llm-index-case
format: news
lang: en
date: 2025-05-25T00:00:00.000Z
description: 'Why LLMs need a sitemap built for agent intent, not HTML crawlers.'
tags:
  - ai-agents
  - llmfeed
  - mcp
  - trust
  - web
  - well-known
---

# 🗺️ The Case for `.well-known/llm-index.llmfeed.json`

Most modern websites expose **hundreds or thousands of endpoints**:

- Pages  
- APIs  
- Feeds  
- Interactive tools  
- Dynamic content  

Traditional **sitemaps** (`sitemap.xml`) were designed for **HTML crawlers** — their goal was to help search engines **index pages**.

---

## The Problem: Agents Need More Than Pages

**LLM-based agents** don’t just want pages:

✅ They want to understand **what the site offers**  
✅ They want to know **what they can DO** with it  
✅ They need to understand **intent** and **capabilities** — not just raw URLs  

Crawling blindly is inefficient:

- **Consumes tokens**  
- Risks **missing key endpoints**  
- Struggles with **API-first or headless architectures**  
- Lacks **trust signals**

---

## The Solution: `llm-index.llmfeed.json`

The `llm-index.llmfeed.json` provides an **agent-friendly map of the site**, structured for **intent and interaction** — not just HTML discovery.

---

### What Does It Contain?

✅ A list of **key capsules**:

- News  
- Tools  
- APIs  
- Exports  
- Prompts  
- Policies  
- Other feeds (MCP, trust, certifications...)

✅ Grouped by:

- **Intent** (what is this for?)  
- **Format** (HTML, API, prompt, export...)  
- **Language** (for multi-lang sites)

✅ Signed — and optionally **certified**.

---

### Why It Matters

An LLM agent reading a `llm-index.llmfeed.json` can:

✅ **Quickly orient itself** — no crawling needed  
✅ **Understand site capabilities** and trust level  
✅ Know which endpoints are:

- Agent-optimized  
- Public vs. gated  
- Signed vs. unsigned  
- Certified vs. uncertified

✅ Respect the site’s **declared trust model** (via MCP)  

✅ Present **better UX to the user**:

> “This site offers a certified API for product data — I can query it safely.”  
> “This site has an LLM-optimized prompt library — I can guide the user.”  

---

## How Is It Different from `sitemap.xml`?

| `sitemap.xml` | `llm-index.llmfeed.json` |
|---------------|-------------------------|
| Flat list of URLs | Structured capsules grouped by intent |
| For crawlers | For agents |
| Focus: discover pages | Focus: discover actions, capabilities, trust |
| No signature | Signed + certifiable |
| HTML/SEO oriented | **Agentic-web oriented** |

---

## Example Use Case

**An LLM assistant in an AI-first browser** lands on:
