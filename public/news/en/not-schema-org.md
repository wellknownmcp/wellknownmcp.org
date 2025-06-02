---
title: "🧠 We Are Not Schema.org for LLMs — And That’s Good"
slug: not-schema-org
format: news
lang: en
date: 2025-05-25
description: "LLMFeed is not metadata. It’s intent, trust, and action for agents."
tags: [mcp, llmfeed, agents, trust, web, ai, well-known]
---

# 🧠 We Are Not Schema.org for LLMs — And That’s Good

---

## The Common Misunderstanding

When some developers first see `.llmfeed.json`, they ask:

> “Is this like Schema.org for LLMs?”

The answer is:

👉 **No — and that’s a feature, not a bug.**

---

## Schema.org vs LLMFeed: Philosophies

| Schema.org | LLMFeed |
|------------|---------|
| Describes **what’s on a page** | Declares **what the agent can DO**, and **how to trust it** |
| Designed for **HTML pages** | Designed for **agents** |
| Metadata | **Agent context** |
| Static annotations | Dynamic **intent + action** |
| No trust / signature | Signed, certifiable, trust-aware |
| Target: SEO | Target: **LLM and agent ecosystems** |

---

## Why Schema.org Is Not Enough for Agents

Schema.org is great for:

✅ Helping **search engines index content**  
✅ Adding **rich snippets** to search results  
✅ Providing **typed metadata** for HTML pages

But agents need more:

❌ They don’t want to just know that a page is an `Article`  
✅ They want to know:

- **What is this feed for?**  
- **What actions can I perform?**  
- **What is the trust level of this feed?**  
- **Who certifies it?**  
- **How should I handle fallback?**  
- **What guidance exists for interaction?**  

---

## LLMFeed: Designed for Agent Context

Instead of:

```yaml
type: Article
```

You get:

```json
"intent_router": {
  "default_intent": "learn",
  "fallback": "explain",
  "guided_intents": [
    "generate summary",
    "compare products",
    "answer user questions"
  ]
}
```

And:

- **`agent_guidance`** → how to interact  
- **`prompts`** → example prompts to steer the agent  
- **`trust`** → signed blocks  
- **`certifications`** → external verifications  
- **fallback logic** → for error handling and degraded modes  

---

## Why This Matters

Agents operate **dynamically**.

They don’t just "index" pages.  
They **decide what actions to take**, often in **real-time conversations** with users.

They need:

✅ Context  
✅ Trust  
✅ Intent  
✅ Actionability

This is what `.llmfeed.json` provides — **by design**.

---

## A New Layer for the Agentic Web

LLMFeed is not:

❌ Schema.org for agents  
❌ Just another metadata layer  
❌ A replacement for SEO (though it helps agent visibility)

LLMFeed is:

✅ A **trust and intent layer**  
✅ For **LLM-based agents**  
✅ For the **Agentic Web**  
✅ For **actions**, not just descriptions  

---

## Final Thought

The web of the future is **agent-mediated**.

Agents need more than metadata.  
They need **context** — and the ability to reason about **what they can do**, and **what can be trusted**.

👉 **That’s why we are not Schema.org — and that’s good.**

---