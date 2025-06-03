---
lang: en
slug: why-mcp-preserves-order
title: Why MCP preserves order in `.llmfeed.json`
description: How token order impacts LLM behavior, and why MCP signatures guarantee it.
tags: [mcp, llmfeed, signature, canonicalization, llm-behavior]
date: 2025-06-03
---

# Why MCP preserves order in `.llmfeed.json`

When signing `.llmfeed.json` feeds, MCP takes a deliberate stance: **we do NOT sort keys** during canonicalization.

This is not an oversight — it is a conscious design choice, and here is why.

## LLMs process tokens in order

Large Language Models do not parse JSON as structured data.  
They consume JSON as **raw text**, token by token, in sequence.

This means:

- The order of keys in the JSON affects how the LLM builds its internal context.
- Important keys placed first may receive more attention.
- Keys placed last may be ignored, especially in long contexts or with "early exit" models.

## The Easter Egg Effect

In testing `.llmfeed.json` feeds, we observed the following:

- When placing an *easter egg* instruction at the end of the feed, some LLMs ignored it.
- When moving it to the top, the same LLMs consistently followed the instruction.

**Conclusion:** token order matters.

## Why sorting keys breaks this guarantee

If MCP used `sort_keys=True`:

- A feed author could design an intentional order.
- But another tool re-serializing the feed (or even re-verifying it) could change that order without breaking the signature.
- The LLM would then interpret the feed differently — even though the signature "validates".

This is unacceptable in an agentic context.

## Our position

MCP declares:

> **In `.llmfeed.json`, signature MUST guarantee token order integrity.**

Therefore:

- MCP canonicalization **preserves key order**.
- Changing key order WILL break the signature — as it should.

## Conclusion

For generic APIs, sorting keys might be useful.  
For LLM-targeted feeds, it is **counterproductive and unsafe**.

By preserving order, MCP:

✅ Protects the feed as seen by the LLM  
✅ Allows intentional design of token flow  
✅ Guarantees semantic integrity — not just data integrity

---

*LLMCA — Model Context Protocol Working Group*
