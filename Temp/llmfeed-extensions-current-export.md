---
title: "Extension MCP : Export current page (html + optional markdown)"
lang: en
tags: [llmfeed, mcp, current-export, standard, html, markdown]
---

# 🚀 LLMFeed MCP Extension : Current Page Export (html + optional markdown)

## 🎯 Objective

Standardize the recommended structure for `context="current"` export mode in ExportToLLM buttons.

## ✅ Minimum required

A valid `.llmfeed.json` MUST contain at least:

```json
{
  "type": "llmfeed",
  "origin": "current-page-export",
  "source_url": "https://example.com/page",
  "content_type": "html",
  "data": {
    "html": "<div>...</div>"
  },
  "generated_at": "2025-05-01T12:00:00Z"
}
```

## 💡 Recommended (optional bonus)

In addition to `html`, the server SHOULD also provide a `markdown` version for better LLM compatibility:

```json
"data": {
  "html": "<div>...</div>",
  "markdown": "# Title\n\nSome content"
}
```

### Advantages of adding `markdown`:

| Benefit | Description |
|---------|-------------|
| LLM Friendly | Much easier to parse for text agents |
| Smaller size | Removes unnecessary html wrappers |
| Dual compatibility | Agents can fallback if `markdown` missing |

### Content type recommendation

`"content_type": "html+markdown"` if both are provided.  
Otherwise: `"content_type": "html"`

## 🛠 Recommended generation method

1. **Client-side:** send only `<main>.innerHTML`
2. **Server-side:** cleanup html with `cheerio`, optionally convert to markdown with `turndown`

## ✅ Summary

- `html` is **mandatory**
- `markdown` is **optional but strongly recommended**
- Always ensure safe content (remove `<script>`, `<style>`, etc.)

This extension does not break any existing MCP spec.  
It is proposed for MCP 1.1 inclusion.
