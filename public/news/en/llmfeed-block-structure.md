---
title: The Anatomy of a LLMFeed — Block by Block
description: >-
  Understand how each block of a .llmfeed.json works, and how to design your own
  feed.
date: '2025-05-21'
tags:
  - llmfeed
  - structure
lang: en
---

# 🧱 The Building Blocks of a Feed

Every `.llmfeed.json` file is made of **structured blocks**. Here's how to understand and use them:

## 🔹 `feed_type`

Declares the purpose (`prompt`, `export`, `session`, `mobile-app`, `mcp`, etc.)

## 🔹 `metadata`

Includes origin, description, title, tags, content_type...

## 🔹 `trust`

Tells the agent what is signed, who signed it, what the trust scope is.

## 🔹 `signature`

Cryptographic proof using Ed25519 — protects the signed_blocks only.

## 🔹 `certification`

Optional — adds third-party confirmation (e.g., by `llmca.org`), and a signature hash.

Start small. You can build your feed one block at a time.  
And use agents or tools to help validate it.
