---
title: "MCP 能实现什么？真实世界的使用场景"
description: "从医疗到 SaaS，这里列举了 MCP 与 LLMFeed 的具体应用示例。"
date: '2025-05-21'
tags:
  - use-cases
  - mcp
  - industries
lang: zh
---

# 🧩 MCP 的实际应用场景

## 🏥 医疗领域
- `symptoms-export.llmfeed.json`：用于 LLM 症状分析的结构化 capsule
- `appointment-api.llmfeed.json`：代理可识别的预约 API 接口声明

## 🧑‍🏫 教育行业
- `course-index.llmfeed.json`：带 prompt 结构的课程目录
- `session-feed.llmfeed.json`：记录用户学习进度与反馈的会话 feed

## 🧰 SaaS 工具
- `capabilities.llmfeed.json`：向 Zapier、ChatGPT 插件、Notion AI 暴露工作流程能力
- `apicredential.llmfeed.json`：声明 token 的作用域和权限边界

## ❤️ 交友与陪伴场景
- `persona-prompt.llmfeed.json`：明确表达交友或指导意图的提示结构
- `flagzone.llmfeed.json`：设置代理交互中的伦理和行为边界

无论你的领域是什么 —— 如果代理能理解它，它就可以**行动**。
