---
lang: zh
slug: how-to-make-your-site-agent-friendly
title: 如何通过 llmfeed.json 让您的网站适应 AI 代理
description: 一份实用指南，帮助您公开受信任的 llmfeed.json 文件，助力 AI 代理和大模型正确理解并呈现您的内容。
tags:
  - agent-friendly
  - llmfeed
  - mcp
  - tooling
date: 2025-06-05T00:00:00.000Z
---

如何让您的网站适应 AI 代理？

如今，越来越多的 LLM 和 AI 代理正在访问网站，试图理解内容、总结页面，甚至自动推荐。  
但标准的 HTML + Schema.org 已远远无法满足需要。

**MCP / llmfeed.json 提供了一种简单而强大的方式来显式公开可信的上下文，指导 AI 代理如何解释和使用您的网站。**

---

## 📄 什么是 llmfeed.json？

这是一种开放格式（MCP 规范的一部分），通过 `.well-known/llm-index.llmfeed.json` 或 `.well-known/mcp.llmfeed.json` 提供。

其作用是：

✅ 显式声明网站的结构、用途和意图  
✅ 描述网站提供的 API 或可调用功能  
✅ 提供页面摘要和说明，供 AI 使用  
✅ 允许签名和认证，确保可信度  
✅ 保护某些内容不被误用（通过声明风险或权限）

---

## 🤖 为什么 AI 代理需要它？

今天的 LLM 在没有明确信息的情况下进行推断，容易出现以下问题：

⚠️ 误解页面的用途  
⚠️ 错误归类内容  
⚠️ 错误生成链接 / 引导用户到错误路径  
⚠️ 误用未经授权的数据

**通过 llmfeed.json，您可以指导 AI 代理如何“正确”理解您的网站。**

---

## ✨ 示例 llmfeed.json

    {
      "feed_type": "llm-index",
      "origin": "https://example.com",
      "metadata": {
        "title": "Example 网站",
        "description": "示例网站，演示 MCP / LLMFeed 标准。",
        "topics": ["AI", "标准", "网站索引"]
      },
      "pages": [
        {
          "url": "/about",
          "title": "关于我们",
          "description": "了解我们是谁，以及我们为什么建立这个网站。"
        },
        {
          "url": "/products",
          "title": "产品",
          "description": "探索我们提供的产品和服务。"
        }
      ]
    }

---

## ✅ 最佳实践

### 1️⃣ 公开 llm-index.llmfeed.json

👉 在 `.well-known/llm-index.llmfeed.json` 提供 feed。  
👉 确保它能被 AI 代理访问（状态码 200，允许 robots）。

---

### 2️⃣ 提供良好的元数据

✅ 使用清晰、简洁的 `metadata`  
✅ 对每个重要页面提供 `pages` 描述  
✅ 包含 `topics` 有助于分类

---

### 3️⃣ 签名（可选）

✅ 如果您希望 AI 代理验证可信性，可以使用 `trust` 块对 feed 进行签名（参见 MCP 签名扩展）。

---

### 4️⃣ 定期更新

✅ 每次重要更新时刷新 feed  
✅ 确保 sitemap 和 llmfeed 保持一致

---

## 🚀 工具推荐

您可以使用：

- [LLMFeedForge.org](https://llmfeedforge.org) → 图形化生成和测试 llmfeed.json  
- `@wellknownmcp/client` → 自动生成和验证 feed 的 SDK

---

## 🌍 谁在使用？

越来越多的 AI 代理和 LLM 已开始解析 llmfeed.json，包括：

- Claude  
- GPT-4o  
- Microsoft NLWeb / Copilot  
- Meta Open Agents  
- Open Source Agents (AutoGPT, LangChain, 等)  
- 企业内部专用代理

---

## 🎁 结论

**通过公开 llmfeed.json，您将使您的网站对未来的 AI 代理友好，提升内容可信性，并保护您的意图。**

💡 未来，搜索引擎也将优先考虑支持 MCP / llmfeed.json 的网站。

---

**下一步**：

✅ 生成您的 llmfeed.json  
✅ 部署到 `.well-known/`  
✅ 验证 → [LLMCA.org](https://llmca.org) 提供签名验证工具  
✅ 通过 IndexNow / Sitemap 通知 AI 代理 feed 更新

---

保持 AI 友好，让您的内容更具影响力！ 🚀
