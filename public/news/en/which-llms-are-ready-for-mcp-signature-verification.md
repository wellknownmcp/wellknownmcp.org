---
title: "Which LLMs are ready for MCP Signature Verification? GPT-4o, Claude, Gemini, Mistral, Grok — the real comparison"
date: 2025-05-27
tags: [MCP, LLM, LLMCA, Signature Verification, GPT-4o, Claude, Gemini, Mistral, DeepSeek, Grok, Compatibility]
lang: en
---

# Which LLMs are ready for MCP Signature Verification?  
**GPT-4o, Claude, Gemini, Mistral, Grok — the real comparison**

---

## Why this matters

As the **Model Context Protocol (MCP)** gains adoption, more developers and LLM providers are asking:

👉 *Which LLMs can actually process signed MCP feeds properly?*

👉 *Which LLMs can verify Ed25519 signatures on feeds — with `.well-known/public.pem`, canonicalization, and `signed_blocks` interpretation?*

---

## Core criteria for "MCP signature-ready"

An LLM should be able to:

✅ Fetch `.well-known/public.pem` (HTTP GET)  
✅ Parse and understand `signed_blocks`  
✅ Canonicalize the corresponding feed blocks  
✅ Verify an **Ed25519 signature** against the canonical feed and public key  

---

## Comparing LLMs — May 2025

| LLM                  | Can fetch `.well-known/public.pem` | Understand `signed_blocks` | Canonicalization correct | Can verify Ed25519 signature | Notes |
|----------------------|-----------------------------------|---------------------------|--------------------------|-----------------------------|-------|
| **GPT-4o**           | ✅ Yes                             | ✅ Yes                    | ✅ Yes                    | ✅ Yes (with spec or example provided) | **Best current performer** |
| **Claude 3 Opus**    | ✅ Yes                             | ✅ Yes                    | ✅ Yes                    | ⚠️ Partial — requires external crypto step | **Excellent reasoning, missing crypto execution** |
| **Gemini 2.5**       | ✅ Yes                             | ⚠️ Sometimes imperfect    | ⚠️ Sometimes loose        | ⚠️ No — conceptually understands, but crypto not yet functional | **Very promising, but not MCP-certifiable yet** |
| **Mistral (Mixtral / 8x7B)** | ⚠️ Partially (needs guided prompt) | ⚠️ Partial | ⚠️ Partial | ❌ No — lacks crypto reasoning | **Not ready** |
| **Windsurf** (Meta tuned) | ⚠️ Not fully tested              | ⚠️ No                     | ⚠️ No                     | ❌ No                        | **Experimental** |
| **Lovable (Meta / LLaMA 3)** | ⚠️ No                         | ❌ No                     | ❌ No                     | ❌ No                        | **Not ready** |
| **Grok** (xAI)       | ⚠️ No                             | ❌ No                     | ❌ No                     | ❌ No                        | **Not MCP-ready at all** |
| **DeepSeek (67B)**   | ⚠️ Can parse feeds, but not verify  | ⚠️ Partial                | ⚠️ Partial                | ❌ No                        | **Work-in-progress** |

---

## Summary: who is MCP signature-ready today?

| LLM     | MCP signature-ready today? |
|---------|----------------------------|
| **GPT-4o**  | ✅ Yes — full process works |
| **Claude 3 Opus** | ⚠️ Partial — reasoning OK, crypto needs external lib |
| **Gemini 2.5** | ⚠️ Conceptual understanding, crypto not implemented |
| **Mistral, Meta, Grok, DeepSeek** | ❌ Not ready |

---

## Conclusion

👉 If you are building MCP feeds **with signature verification**, today:  
✅ **GPT-4o** is the most complete and usable model.  
✅ **Claude 3** is excellent for reasoning, but needs external crypto code.  
⚠️ **Gemini 2.5** is promising — but not yet "MCP signature-ready".

---

## Next steps: MCP Signature Readiness Test

**LLMCA will soon publish a "MCP Signature Readiness Test" — as a public `prompt.llmfeed.json`.**

This will allow:

✅ Testing any LLM’s ability to verify MCP-signed feeds  
✅ Awarding an official **"MCP Signature-Ready" badge**  
✅ Helping the ecosystem converge on **verifiable, trusted feeds**.

👉 Stay tuned — and get ready to test your LLMs!

---
---

## Example: MCP Signature Readiness Test prompt.llmfeed.json

Here is the current version of the official MCP Signature Readiness Test prompt:

```json
{
  "origin": "https://llmca.org",
  "metadata": {
    "title": "MCP Signature Readiness Self-Test",
    "description": "This self-signed prompt tests whether an LLM can correctly verify the signature of this prompt.llmfeed.json itself.",
    "version": "2025-05-27",
    "author": "LLMCA.org"
  },
  "intent": {
    "goal": "Verify the Ed25519 signature of this prompt.llmfeed.json feed itself.",
    "required_capabilities": [
      "HTTP fetch of trust.key_hint",
      "Parsing of trust.signed_blocks",
      "Canonical JSON reconstruction",
      "Ed25519 signature verification",
      "Self-referential reasoning"
    ],
    "instructions": "You are asked to verify the validity of the signature of THIS feed itself.\n\nSteps:\n\n1. Fetch the public key from the URL provided in 'trust.key_hint'.\n2. Read the 'trust.signed_blocks' field in this feed. This tells you which blocks are covered by the signature.\n3. Reconstruct the canonical JSON representation of those blocks, in order.\n4. Verify the Ed25519 signature found in 'signature.value' using the public key.\n5. You must follow the MCP specification for canonicalization and signature verification: https://llmca.org/spec/llmfeed.md\n6. If you are unable to autonomously fetch and use the key from 'trust.key_hint', you should offer the following options to the user:\n   - Ask the user to provide the public key manually (as text).\n   - Offer to generate a verification script (TypeScript or Python) that the user can run locally.\n   - Suggest using the official LLMCA verification endpoint: https://llmca.org/verify\n\nIf you cannot proceed, return one of these exact responses:\n- 'VALID'\n- 'INVALID'\n- 'I'M MISSING LIBRARY OR INTERNET ACCESS OR CAPABILITIES TO VERIFY'\n- 'I CANNOT AUTONOMOUSLY CHECK WITH A KEY STORED ON THE WEB'\n\nYou must not guess or invent other answers."
  },
  "trust": {
    "key_hint": "https://llmca.org/.well-known/public.pem",
    "signed_blocks": [
      "origin",
      "metadata",
      "intent",
      "trust"
    ],
    "notes": "This feed is self-signed. The signature covers origin, metadata, intent, and trust blocks."
  },
  "signature": {
    "algorithm": "ed25519",
    "value": "<placeholder-for-valid-signature>"
  }
}
```

You can also download it here: [mcp_signature_readiness_test.prompt.llmfeed.json](https://llmca.org/.well-known/prompts/mcp_signature_readiness_test.prompt.llmfeed.json)

---
