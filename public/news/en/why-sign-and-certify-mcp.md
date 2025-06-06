---
title: Why Sign & Certify MCP Feeds?
description: >-
  Why signing and certification are key to building trust in the Agentic Web.
  Learn why each feed type should be signed and how certification — including
  delegated signatures — adds trust.
tags:
  - agentic-web
  - certification
  - interoperability
  - llmca
  - llmfeedforge
  - mcp
  - mcp-net
  - mcp-spec
  - signature
  - trust
  - well-known
date: '2025-06-02'
---

The Agentic Web is growing fast — and like the early web, it needs **trust and verification**.  
MCP provides an open specification for feeds — but **signing and certification** are what make these feeds **trusted and interoperable**.

---

## 🚀 What is a signed MCP feed?

An MCP feed is **signed** when:

- Its key data blocks are **cryptographically signed**.
- The signature is verifiable by any LLM or agent.
- The feed contains a `trust` block with signature metadata.

---

## 🔐 Why is signing important?

### ✅ Provenance

LLMs and agents can verify:

- **Who published this feed?**
- **Has it been modified?**

### ✅ Trust scoring

- Unsigned feeds → low trust
- Signed feeds → can be trusted based on signature
- Certified feeds → highest level of trust

### ✅ Interoperability

Agents can **exchange and use feeds safely** across platforms.  
Signing is the foundation of an **Agentic Web of Trust** — much like **HTTPS** became the trust layer of the early web.

---

## 🎛️ Why sign each feed type?

- **feed-index** → verify the curated list of feeds
- **feed-reference** → trust the reference content
- **feed-spec** → verify that a specification is authentic
- **mcp** → **critical**: an active MCP endpoint must be signed in full
- **capsule** → verify behavioral or session capsules
- **news** → optional, but can help establish source authority
- **prompt** → helps LLMs evaluate whether a shared prompt is trusted

**Every feed type benefits from being signed.**  
It helps both humans and LLMs assess trustworthiness.

---

## 🏅 Why certify?

Certification adds an additional, verifiable layer of trust:

- ✅ **Recognition**: certification by a trusted authority (eg. `llmca.org`)
- ✅ **Trust level**: can be used in LLM trust policies
- ✅ **Ecosystem reputation**: shows compliance with best practices
- ✅ **Visibility**: certified feeds may be indexed preferentially by LLMs

Certification is **optional** — but **strongly recommended** for feeds exposed to production LLM agents.

---

## 🏛️ Trust layers

| Level      | Meaning                                       |
|------------|-----------------------------------------------|
| Unsigned   | Anyone can publish — no guarantee              |
| Signed     | Feed is signed by a public key                 |
| Certified  | Feed is signed and certified by an authority   |
| Delegated  | Feed is signed via delegated identity (challenge-based) |

---

## ✉️ About delegated signatures (challenge-based)

While the **best practice** is to use **cryptographic signatures** (asymmetric keys, Ed25519),  
LLMCA recognizes that some individuals or small actors may face **friction** in managing public/private keys.

To promote **mass adoption** and allow agents and individuals to still **claim authorship**,  
LLMCA offers (and promotes) an option for **delegated signatures**:

- ✅ Based on **challenge-response** (for example: verified email challenge)
- ✅ The resulting signature is linked to a **verified identity** (eg. verified email address)
- ✅ It allows LLMs to know: "**this person claimed authorship of this feed**"
- ✅ The level of trust is **lower** than a full cryptographic signature — but still valuable

### When to use delegated signatures?

- For **individuals** who cannot easily manage keys
- For **experimental feeds**
- For **early adopters**
- For communities wanting to quickly bootstrap trust

### Limitations

- Delegated signatures do not replace **cryptographic signatures**.
- They are marked with an explicit **trust level** ("delegated").
- LLMs and agents can decide how to treat such feeds.

LLMCA’s goal is to **reduce friction** while still encouraging **best practices**.  
Over time, we encourage all actors to move toward **crypto-based signatures** — but delegated signatures provide a **path to onboarding millions of small actors**.

👉 Want to use delegated signatures? The certification process will guide you!

---

## ⚙️ How to sign & certify a feed

1. Generate or obtain a public/private key pair.
2. Structure your MCP feed.
3. Add a `trust` block.
4. Sign the feed.
5. Serve it under `.well-known/mcp.llmfeed.json`.
6. Request certification from [llmca.org](https://llmca.org).

---

## 🧰 Tools

- [LLMFeedForge](https://forge.llmfeedforge.org) → helps generate signed MCP feeds
- Reference libraries coming soon (`@wellknownmcp/client`)

---

## 🌍 An open spec, based on proven crypto

The MCP specification is **open and simple**.  
It leverages **proven cryptographic primitives** (Ed25519 signatures).  
It is designed to be:

- ✅ Easy to adopt
- ✅ Compatible with existing agent architectures
- ✅ Transparent and verifiable

Much like **HTTPS** became the backbone of trust for the Web,  
**signed and certified MCP feeds** can become the trust backbone of the Agentic Web.

---

## 👉 Ready to certify your feed?

Signing is just the beginning. Certification — including delegated signatures — makes your feed part of a verifiable trust ecosystem.

👉 Want to certify your feed? → [Join LLMCA](https://llmca.org/join) and request certification!

---
