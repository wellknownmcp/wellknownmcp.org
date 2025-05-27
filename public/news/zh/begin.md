---
title: "从哪里开始"
description: "一个简单的指南，帮助你理解标准并迈出第一步。"
date: '2025-05-21'
tags:
  - begin
  - manual
  - llmfeed
lang: zh
---

# 👋 欢迎来到 WellKnownMCP

本页面是你了解 **Model Context Protocol (MCP)** 及其核心单元 `llmfeed.json` 的**起点**。

无论你是开发者、好奇的用户，还是刚刚接触的入门者——你都来对地方了。

---

## 🚀 为什么这很重要

大语言模型（LLM）不再只是被动响应。  
它们会**读取**、**探索**，甚至**采取行动**。

但网页并不是为它们设计的。  
它充满了视觉内容、脚本、为人类构建的信息 —— 却不适合代理使用。

我们提出一个新的层：  
📂 将 `.well-known/` 目录用于**结构化、可签名、可供代理读取的上下文**。

---

## 🧠 什么是 `.llmfeed.json`？

一个 `llmfeed.json` 是一个轻量级、灵活的 JSON 格式，任何 LLM 都可以读取。  
它不是一个封闭格式，而是一个**规范**：

- 可手写  
- 面向机器优化  
- 代理可理解  
- 开放且可扩展

它包含你的**意图**、**提示词**、**API**、**导出数据**或**认证声明**，一切都以可预测的结构表达。

---

## ✨ 它的优势是什么？

- ✅ 可被 ChatGPT、Claude、Mistral、Gemini 等模型读取  
- ✅ 可被**签名**（你自己）或被**认证**（如 `llmca.org`）  
- ✅ 可被导出、教学、重播或集成  
- ✅ 与已有内部格式兼容，也可以帮助它们自我说明

这是面向代理的 **意图 MIME 类型**。

---

## 🧪 在线试试

探索示例，或生成你自己的 feed：

- 🔧 [LLMFeed Forge（即将推出）](https://forge.llmfeedforge.org)  
- 🧠 [提示词实验区](/tools/prompts-explained)  
- 📤 [导出按钮演示](/tools/export-button)  
- 📚 [Feed 索引](/tools/llm-index)

---

## 🧰 通过实践学习

本网站中的任何 feed 或工具都可被**下载为 `.llmfeed.json` 格式**。

你可以：
- 📥 下载它  
- 🤖 交给 ChatGPT、Claude 或其他代理  
- 📚 将它变成你的**老师或审阅者**

> “请逐块解释这个 feed。”  
> “代理能做什么？”  
> “如何实现它？”

---

## 📁 核心概念

- [`/.well-known/`](/tools/well-known)：代理读取的标准位置  
- [`prompt.llmfeed.json`](/tools/prompts-explained)：如何构建签名提示词  
- [`export.llmfeed.json`](/tools/export-button)：将页面变成可移植的 capsule  
- [`llm-index.llmfeed.json`](/tools/llm-index)：列出所有可用 feed

---

## 🤝 加入生态系统

- 🌐 [从这里开始](/begin)  
- 🛠 使用 [Forge]（即将推出）创建你的 feed  
- 📬 [注册你的项目](/join)  
- 👁 或直接浏览探索

---

## ✅ TL;DR

- MCP 是你意图和代理理解之间的桥梁  
- `.llmfeed.json` 是你的通用格式  
- 从小处开始。发布一个。看它能走多远。

---

## 🧠 Bonus：让代理教你

你甚至可以通过提问 LLM 来学习：

> “这是一个 `llmfeed.json`，请解释一下。”  
> “这个网站为代理提供了什么？”  
> “我能让自己的网站变得兼容吗？”

大多数 LLM 已能理解。  
优秀的 LLM 会引导你去实现。
