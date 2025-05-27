---
title: "🛰️ The Case for .well-known/mcp.llmfeed.json"
slug: mcp-wellknown
format: news
lang: en
date: 2025-05-25
description: "Why .well-known/ is the most logical place to declare AI-ready interfaces."
tags: [mcp, llmfeed, agents, trust, web, ai, well-known]
---

`.well-known/` is where modern protocols (OAuth, Webfinger, OpenID, security.txt…) declare machine-consumable context. In a world of LLMs, it's the natural gateway.

LLMFeed doesn’t replace HTML — it supplements it with trust, structure, and intent. Placing it in `.well-known/` means:
- it can be discovered by any crawler, agent, or assistant
- it does not interfere with frontend routing
- it follows open standards and cross-domain conventions

A certified `.well-known/mcp.llmfeed.json` is a declaration: *“This site is agent-ready. Ask me anything.”*
