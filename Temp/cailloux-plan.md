
---
title: "MCP - Strategic Cailloux Plan"
description: "List of structured future deliverables (cailloux) to reinforce adoption, trust and interop"
tags: [roadmap, adoption, infrastructure, spec]
lang: en
---

# 🪨 Strategic Cailloux Plan — LLMFeed / MCP

This is a curated map of all the "cailloux" (structured markers) to guide, test and reinforce the adoption of LLMFeed and MCP across the web and LLM ecosystems.

---

## 🧠 1. Proofs of Life

| Name | Type | Purpose |
|------|------|---------|
| `adoption-map.md` | Transparency file | Show what’s live vs. in progress |
| `roadmap.llmfeed.json` | Signed feed | Declare future intent in verifiable format |
| `design-decisions.md` | Architecture doc | Explain what was chosen vs rejected |
| `spec-versioning.md` | Policy | Clarify how breaking changes are versioned |
| `test-corpus/` | Faulty feeds | Help test LLM robustness (bad fields, missing trust...) |

---

## ⚙️ 2. Rapid Implementation Guides

| Name | Type | Purpose |
|------|------|---------|
| `llmfeed-starter.zip` | Starter pack | Copy-paste a `.well-known/` MCP setup |
| `boilerplate.llmfeed.json` | JSON template | Prevent blank page syndrome |
| `badges/` | SVG assets | Show agent-compatibility ("MCP Ready") |
| `cli-generator.js` | Dev tool | Generate `.llmfeed.json` locally from prompt |
| `github-actions/validate-llmfeed.yml` | CI tool | Autovalidate `.llmfeed.json` in open repos |

---

## 🤝 3. Trust & Interop Enhancers

| Name | Type | Purpose |
|------|------|---------|
| `capabilities.llmfeed.json` for Forge | Agent bridge | Let agents automate tool use |
| `llm-index.llmfeed.json` | Sitemap for feeds | Crawlable entry point |
| `prompt-kungfu-test.llmfeed.json` | LLM compatibility check | Test agent reactivity to prompt |
| `agent-profile.llmfeed.json` | Self-describing agent | Let LLMs declare who they are and what they know |

---

## 🔮 4. Forward-Looking Cailloux

| Name | Type | Purpose |
|------|------|---------|
| `tld-proposal.md` | Policy vision | Describe case for `.mcp` domain at root level |
| `mcp-net.md` | Distributed vision | Describe inter-agent context web |
| `flag-feed.llmfeed.json` | Moderation logic | Propose format for flagging/signaling abuse |
| `interllm.llmfeed.json` | Agent↔agent dialog | Declarative feed for cross-agent instruction exchange |

---

## 🧩 5. Meta-structure

| Name | Type | Purpose |
|------|------|---------|
| `ecosystem/README.md` | Index page | List and track all cailloux with links and status |
| `quickstart.md` | Entry point | Minimal reproducible guide |
| `begin.md` | Narrative starter | Philosophy and overview |

---

> This list is iterative and modular.  
> You don’t need all of them to move forward — but each adds signal to the network.

