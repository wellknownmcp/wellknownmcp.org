---
title: LLMFeed 的结构解剖 —— 按模块解析
description: 了解 .llmfeed.json 中各个模块的功能，并学习如何构建自己的 feed。
date: '2025-05-21'
tags:
  - llmfeed
  - structure
lang: zh
---

# 🧱 构成一个 feed 的模块

每个 `.llmfeed.json` 文件都由**结构化模块**组成。以下是每个模块的功能说明及用法：

## 🔹 `feed_type`
声明该 feed 的用途（如 `prompt`、`export`、`session`、`mobile-app`、`mcp` 等）

## 🔹 `metadata`
包含来源、描述、标题、标签、内容类型等信息

## 🔹 `trust`
告诉代理哪些模块被签名、由谁签名、信任范围如何定义

## 🔹 `signature`
通过 Ed25519 实现的加密签名 —— 只对 `signed_blocks` 中列出的模块进行保护

## 🔹 `certification`
可选 —— 增加由第三方（如 `llmca.org`）认证的信息，包含签名哈希校验

你可以从最简单的模块开始构建 feed，  
然后借助工具或代理来帮助你验证和扩展。
