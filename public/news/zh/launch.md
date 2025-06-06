---
title: 发布公告
description: WellKnownMCP 项目的正式发布及其官方网站的上线公告。
date: '2025-05-21'
tags:
  - announcement
  - launch
  - llmfeed
lang: zh
---

# 🚀 WellKnownMCP 正式上线！

我们很自豪地发布 [**wellknownmcp.org**](https://wellknownmcp.org)，  
一个开放标准的平台，旨在让网站变得**可被大型语言模型（LLMs）理解、验证和使用**。

---

## 🌍 为什么选择现在？

LLM 和代理无处不在 —— 但它们浏览网页时仍像迷路的游客。

它们猜测你的服务是做什么的；  
它们胡乱想象 API；  
它们误解你的意图。

如果你的网站可以**主动说明自己**会怎样？

不是通过展示界面，而是能**明确告诉代理**它能做什么、什么是可信的、哪些内容可复用、哪些是已签名的。

---

## 💡 什么是 WellKnownMCP？

它是 Web 的一个最小扩展 —— 使用 `.well-known/llmfeed.json` 文件来声明：

- ✅ 你希望代理知道的意图  
- ✅ 你的 prompts、导出内容  
- ✅ 你暴露的 API 和 token  
- ✅ 你的信任模型（签名、认证）

这一切都以结构化、可代理读取的方式呈现。

---

## 📁 什么是 `.llmfeed.json` 格式？

我们提出 `.llmfeed.json` 作为**LLM 交互的标准 MIME 类型**。

它具有以下特点：

- 人类可编写  
- 机器可解析  
- 完全 JSON 格式  
- 可扩展  
- 已被主流模型（ChatGPT、Claude、Mistral 等）识别

代理不再需要猜测网页的意义 —— 它们可以**读取你主动声明的内容**。

---

## 🔧 首发内容包含：

- 🧱 一份完整的[技术规范](https://wellknownmcp.org/spec)，附带示例与图解  
- 🧠 一份[宣言](https://wellknownmcp.org/spec/spec/llmfeed_manifesto)，阐述项目愿景  
- 📦 来自真实用例的[已认证 feed](https://wellknownmcp.org/llmfeedhub)  
- 🛠 多个[工具和演示](https://wellknownmcp.org/tools/prompt)，包括 prompt 工具、导出按钮和索引系统  
- 🤖 一个[生态探索器](https://wellknownmcp.org/ecosystem)，方便发现社区项目

---

## 🧪 用你最喜欢的 LLM 试试看

> “这是什么 feed？”  
> “有哪些工具/API 被暴露？”  
> “代理应该如何与此交互？”

你甚至可以将 LLM 变成你的**教练或讲解者** —— feed 就是教材。

---

## 🧭 谁应该关注？

- 想让自己的 API 和提示词被代理发现的开发者  
- 想让 app 更易集成的创业者  
- 相信公开可审查网络的 civic-tech 从业者  
- 探索 LLM-代理对齐的研究者  
- 各类代理、助手、AI 系统 —— 我们也欢迎你们

---

## 🤝 加入生态

- 🌐 [从这里开始](https://wellknownmcp.org/begin)  
- 🛠 使用即将推出的 [Forge](https://forge.llmfeedforge.org) 创建你的 feed  
- 📬 [加入生态](https://wellknownmcp.org/join)，将你的项目列入目录  
- 👁 或者只是探索和学习

---

## 🧩 小即是美，可信才可用

我们不是来重建 Web 的，  
我们是来为代理系统**扩展它**的。

感谢你站在起点上。  
让我们一起，构建一个 agent-ready 的网络，从一个 feed 开始。
