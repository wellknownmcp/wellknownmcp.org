# `.well-known/` Files in the MCP Ecosystem

This document outlines the purpose, structure, and interoperability of the 3 key `.well-known/` files used in the MCP + LLMFeed standard.

---

## ✅ Overview

| File                          | Type                        | Core Content Fields                                | Meaning                                                           |
|-------------------------------|-----------------------------|----------------------------------------------------|-------------------------------------------------------------------|
| `/mcp`                        | `llmfeed.json` (type: MCP)  | `mcp_metadata`, `origin`, `capabilities`, etc.     | Declares that the site is MCP-compatible and exposes metadata     |
| `/capabilities.llmfeed.json`  | `llmfeed.json` (export/MCP) | `capabilities`, `actions`, `endpoints`             | Lists available services or agent capabilities                   |
| `/llmfeed-index.json`         | raw JSON or LLMFeed Index   | array or object mapping URLs to metadata           | Indexes all accessible `.llmfeed.json` exports                   |

---

## 🧩 Notes and Flexibility

### `/mcp`

- Can include a `capabilities` block directly in `mcp_metadata`
- Often signed and authoritative
- Used to declare MCP **intentions**, **origin**, and **public key hint**

### `/capabilities.llmfeed.json`

- Can be modular and reusable
- Describes **available services**, endpoints, and agent-facing actions
- Can be signed as a standalone LLMFeed export

### `/llmfeed-index.json`

- Traditionally an array of feed URLs:
  ```json
  ["/project/feed.llmfeed.json", "/blog/index.llmfeed.json"]
  ```

- May also contain **enriched objects** per route:
  ```json
  {
    "/blog/index.llmfeed.json": {
      "tags": ["journal", "llm-ready"],
      "llmlang": "en",
      "intention": "export recent thoughts"
    }
  }
  ```

---

## 🔍 Comparison Table

| File                     | Supports `capabilities` | Can be signed? | Can describe individual intentions? |
|--------------------------|--------------------------|----------------|-------------------------------------|
| `/mcp`                   | ✅ Yes (centralized)     | ✅ Yes         | ✅ Yes                              |
| `/capabilities.llmfeed.json` | ✅ Yes (modular)        | ✅ Yes         | ✅ Yes                              |
| `/llmfeed-index.json`    | ⚠️ Not standard, but allowed | ⚠️ Rarely     | ✅ Yes (if structured as object)    |

---

This design allows a spectrum of adoption, from minimal declarations (`/mcp` only) to fully modular and auditable infrastructures.

