---
title: "Signature vs Certification: What’s the Difference?"

title: "Signature vs Certification: What’s the Difference?"
description: "Understanding trust levels in LLMFeed and how to make your content verifiable."
date: '2025-05-21'
tags:
  - certification
  - signature
  - trust
lang: en
---

# 🔐 Signing and Certifying Your Feeds

## ✍️ Signature

- Done by the author (you)
- Cryptographic signature (Ed25519)
- Protects only `signed_blocks`
- Declares: “I vouch for this structure”

## 🏅 Certification

- Done by a third-party (e.g. `llmca.org`)
- Adds a `certification` block after the signature
- Can include signature hash verification, trust level, certifier URL
- Declares: “This has been reviewed and validated externally”

Levels:
- `self-declared`: unsigned or minimally signed
- `silver`: validated structure
- `gold`: signature integrity + trust level

Use both if you want **credibility + verifiability**.
