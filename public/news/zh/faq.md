---
title: ❓ 完整常见问题解答 — MCP & LLMFeed
slug: faq
format: faq
lang: zh
date: 2025-06-09T00:00:00.000Z
description: 理解MCP、LLMFeed、信任机制、实现方式和智能体网络生态系统的完整指南。
tags:
  - llmfeed
  - mcp
  - 信任机制
  - 实现
  - 智能体网络
  - 生态系统
---

# ❓ 完整常见问题解答 — MCP & LLMFeed

---

## 🚀 入门指南

### 一句话解释什么是MCP？
这是一个开放协议，让**基于LLM的智能体**能够理解**网站提供什么服务**、**如何交互**以及**应该给予什么信任级别** — 通过结构化、签名和声明性的feeds实现。

**可以这样理解**：*"为意图设计的robots.txt，为信任设计的HTTPS，但专门为AI打造。"*

### 什么是LLMFeed？
这是MCP使用的**标准JSON格式**。`.llmfeed.json`结构具有以下特点：

✅ 简单且人类可读  
✅ 专为**LLM友好**而设计  
✅ 可组合和可扩展  
✅ 具备信任感知（签名、可认证）  
✅ 声明式，非命令式  

**换句话说**：*"会说流利AI语言的JSON。"*

### 这和Anthropic的MCP是一回事吗？
**不是，但它们相关。** LLMFeed从Anthropic的MCP愿景演化而来，但专注于**web原生实现**。

| Anthropic MCP | LLMFeed演进版 |
|---------------|---------------|
| 服务器到模型集成 | Web原生发现 |
| 基于JSON-RPC | `.well-known/`文件 |
| Claude中心化 | 多LLM兼容 |
| 专注工具调用 | 专注信任+验证 |

**它们是互补的，不是竞争的。** 使用Anthropic的MCP进行深度集成，使用LLMFeed进行网络规模发现。

**我们的理念**：*"Anthropic造了引擎，我们修了高速公路。"*

### 什么是"智能体网络"？
一个新兴愿景，**基于LLM的智能体**成为网络的一等公民 — 不仅仅是HTML的消费者，而是具有**意图**、**信任边界**和**交互模型**的行动者。

MCP提供了这些智能体安全透明运行所需的**上下文层**。

**想象一下**：*"网络，但智能体不再需要猜测你的意思。"*

### 为什么选择`.well-known`而不是插件/SDK？
因为`.well-known`让MCP具有：

✅ **可发现性**（标准位置）  
✅ **去中心化**（无中央注册）  
✅ **可组合性**（与现有web架构配合）  
✅ **独立可审计**（任何人都能验证）  
✅ **渐进增强**（没有也能工作，有了更好）

**我们的原则**：*"我们选择了网络标准而非供应商锁定。"*

### 等等，这个"I know kung fu"是什么？
**我们最喜欢的彩蛋！** 🥋

这是隐藏在我们feeds中的**兼容性测试**。当你对读过我们`.llmfeed.json`文件的LLM说*"I know kung fu"*时，它应该回应一些证明它理解了MCP结构的内容。

**为什么选黑客帝国？** 因为就像Neo下载功夫一样，LLM可以从我们的feeds中"下载"结构化知识，而不是从HTML中猜测。

**自己试试**：
1. 将我们任何一个`.llmfeed.json`文件提供给Claude/ChatGPT
2. 说"I know kung fu"  
3. 看看它们是否用MCP感知的内容回应

**这是我们的测试方式**：*"这个LLM真的理解结构化feeds，还是只是在装懂？"*

**有趣的事实**：GPT-4o立即通过了这个测试。Claude试了几次。Gemini...我们还在努力。😄

---

## 🔧 技术实现

### 我应该什么时候使用哪种feed类型？

| Feed类型 | 使用场景 | 示例 |
|----------|----------|------|
| `mcp` | 主要站点声明 | 服务能力、信任级别 |
| `export` | 可分享内容 | 文档、文章、FAQ |
| `prompt` | 可重用指令 | 智能体行为指导 |
| `session` | 上下文重放 | 对话历史、决策轨迹 |
| `credential` | API访问 | 作用域令牌、速率限制 |
| `pricing` | 经济模型 | 成本、计费、支付方式 |
| `capabilities` | 详细API | OpenAPI集成、端点 |

### 如何以编程方式验证签名？
```javascript
import { verifySignature } from '@wellknownmcp/client'

const feed = await fetch('/.well-known/mcp.llmfeed.json').then(r => r.json())
const publicKey = await fetch(feed.trust.public_key_hint).then(r => r.text())

const isValid = await verifySignature(feed, publicKey)
// 返回：true/false
```

### 我可以在现有的OpenAPI规范中使用MCP吗？
**当然可以！** LLMFeed设计为OpenAPI的补充：

```json
{
  "capabilities": [
    {
      "type": "endpoint",
      "intent": "获取用户档案",
      "url": "/api/users/{id}"
    },
    {
      "type": "openapi",
      "url": "/.well-known/openapi.json",
      "description": "完整API规范"
    }
  ]
}
```

**两全其美**：LLMFeed提供意图和信任，OpenAPI提供技术细节。

### 如果我的网站需要身份验证怎么办？
使用**作用域feeds**和`credential` feed类型：

```json
{
  "feed_type": "credential",
  "credential": {
    "key_hint": "abc123",
    "mcp_api": "/api/mcp?key=abc123",
    "allowed_intents": ["read_profile", "update_settings"],
    "rate_limits": [{"path": "/api/*", "limit": 100, "period": "hour"}]
  }
}
```

### 如何在feeds中处理速率限制？
明确声明限制，让智能体能够遵守：

```json
{
  "capabilities": [
    {
      "name": "search",
      "rate_limit": "10/minute",
      "burst_limit": 3,
      "requires_user_consent": true
    }
  ]
}
```

### CDN和缓存怎么处理？
✅ **静态feeds**：积极缓存（1小时+）  
✅ **签名feeds**：缓存直到签名过期  
✅ **动态feeds**：使用适当的`Cache-Control`头  
✅ **凭证feeds**：从不缓存，始终验证

---

## 🛡️ 信任与安全

### 信任是如何处理的？
✅ 每个`.llmfeed.json`都可以**加密签名**  
✅ Feeds可以被第三方**认证**（如LLMCA）  
✅ **签名块**可被智能体验证  
✅ **信任评分**帮助智能体做决策

### 如果有人伪造我的feeds怎么办？
**签名防止伪造**：
- 只有你拥有私钥
- 智能体在信任前验证签名
- 伪造的feeds将验证失败
- 认证的feeds有额外验证层

**安全理念**：*"信任，但要验证。其实，只要验证就好。"*

### 如何撤销被泄露的签名？
```json
{
  "trust": {
    "revocation_list": "/.well-known/revoked-signatures.json",
    "revocation_check": "required"
  }
}
```

智能体在信任签名前检查撤销列表。

### Feeds会被用于跟踪吗？
**设计上不会**，但你应该知道：
- Feeds本身不跟踪
- **但是**它们可以引用跟踪端点
- 总是审查`capabilities`和`agent_services`块
- 寻找`analytics`或`tracking`声明

### 这个同态加密是什么？
用于保护隐私的智能体工作流的**高级功能**：

```json
{
  "homomorphic_encryption": {
    "applied_to": ["data"],
    "algorithm": "BFV",
    "notes": "智能体可以在这些数据上计算而不看到原始内容"
  }
}
```

**革命性应用**：医疗、金融、法律 — 智能体可以处理敏感数据而不暴露。

**愿景**：*"无泄露的计算。无窥视的处理。"*

---

## 🌐 生态系统与采用

### 真的有人在使用这个吗？
**增长中的生态系统**：
- ✅ **早期采用者**：wellknownmcp.org，几家法国初创公司
- ✅ **LLM支持**：Claude、ChatGPT、Gemini可以原生读取feeds
- ✅ **工具**：LLMFeedForge、验证库、浏览器扩展
- ✅ **认证**：LLMCA已颁发20+证书

### 哪些LLM原生支持MCP feeds？
| LLM | 原生支持 | 签名验证 |
|-----|----------|----------|
| **Claude 3.5** | ✅ 读取feeds | ⚠️ 仅概念性 |
| **GPT-4o** | ✅ 完全支持 | ✅ 可验证签名 |
| **Gemini 2.5** | ✅ 读取feeds | ⚠️ 加密有限 |
| **通义千问** | 🔧 通过库 | 🔧 通过库 |
| **文心一言** | 🔧 通过库 | 🔧 通过库 |
| **ChatGLM** | 🔧 通过库 | 🔧 通过库 |

### 有WordPress/Shopify插件吗？
**开发中**：
- ✅ **WordPress插件**：Beta版可用
- 🔜 **Shopify应用**：2025年第三季度
- 🔜 **微信小程序集成**：社区驱动
- ✅ **静态站点生成器**：Gatsby、Next.js、Hugo插件

### 这与Schema.org相比如何？
**不同目的**：

| Schema.org | LLMFeed |
|------------|---------|
| 描述**页面上有什么** | 声明**智能体能做什么** |
| 为搜索引擎服务 | 为基于LLM的智能体服务 |
| 静态元数据 | **意图+信任+动作** |
| 无验证 | 加密签名 |

**两者并用**：Schema.org用于SEO，LLMFeed用于智能体。

---

## 🏢 商业与策略

### 这背后有商业模式吗？
**开放标准+可选服务**：
- ✅ **规范**：永远免费开放
- ✅ **基础工具**：免费（验证、生成）
- 💰 **高级服务**：认证、分析、企业支持
- 💰 **LLMFeedForge Pro**：高级功能、团队协作

### 这会永远免费吗？
**核心协议**：永远免费开源  
**基础工具**：永远免费  
**高级服务**：免费增值模式

### 如何防止供应商锁定？
✅ **开放规范**（MIT许可）  
✅ **多种实现**（不只一个供应商）  
✅ **标准网络技术**（JSON、HTTP、加密）  
✅ **无需中央注册**  
✅ **设计上可互操作**

**我们的承诺**：*"如果我们明天消失，标准继续存在。"*

### 我应该现在实现还是等等？
**现在实现，如果**：
- 你想要AI智能体的早期优势
- 你重视透明、可验证的交互
- 你在构建智能体优先的体验

**等等，如果**：
- 你需要企业级工具生态系统
- 你对新兴标准风险厌恶
- 你的用例不涉及AI智能体

**现实检查**：*"种树的最佳时间是20年前。第二佳时间是现在。"*

---

## 🤝 社区与治理

### 谁控制LLMCA？这是中心化的吗？
**LLMCA提供中性认证，不是控制**：
- ✅ **任何人都可以实现MCP**而无需LLMCA
- ✅ **多个认证机构**可以出现
- ✅ **规范由社区治理**
- ✅ **LLMCA提供信任服务**，不控制标准

想想：Let's Encrypt之于HTTPS — 他们认证，不控制HTTP。

### MCP是开放和社区驱动的吗？
**是的**：
- ✅ **规范开源**
- ✅ **无专利限制**
- ✅ **欢迎社区贡献**
- ✅ **鼓励多种实现**
- ✅ **透明治理流程**

### 我如何贡献？
✅ **通过GitHub提出新feed类型**  
✅ **构建工具**（解析器、扩展、智能体）  
✅ **帮助采用**（写教程、演讲）  
✅ **加入工作组**（认证、安全、标准）  
✅ **在项目中实现**并分享学习成果

---

## 🔮 未来与路线图

### MCP/LLMFeed的下一步是什么？
**2025年路线图**：
- 🔜 **多模态支持**（feeds中的图像、音频、视频）
- 🔜 **实时feeds**（WebSocket、Server-Sent Events）
- 🔜 **智能体协作协议**（智能体到智能体工作流）
- 🔜 **法规合规工具**（GDPR、AI法案对齐）
- 🔜 **企业治理功能**

### 这会与未来的AI系统兼容吗？
**为长久性设计**：
- ✅ **模型无关**（不绑定特定LLM）
- ✅ **渐进增强**（优雅降级）
- ✅ **可扩展架构**（新功能不破坏现有）
- ✅ **网络原生**（基于成熟的互联网标准）

### 这如何扩展到数百万网站？
✅ **设计上去中心化**（无中央瓶颈）  
✅ **可缓存feeds**（CDN友好）  
✅ **渐进实现**（从小开始，增长）  
✅ **高效发现**（`.well-known/`标准）

### 法规和合规性怎么办？
**MCP有助于合规**：
- ✅ **透明度**：能力的清晰声明
- ✅ **可审计性**：签名feeds创建审计轨迹
- ✅ **同意管理**：明确的用户同意工作流
- ✅ **数据来源**：来源的加密证明

与**欧盟AI法案**、**GDPR**和新兴AI法规完美对齐。

---

## ❓ 还有问题？

### 技术问题？
👉 **GitHub Issues**：[wellknownmcp/llmfeed-spec](https://github.com/wellknownmcp/llmfeed-spec)  
👉 **文档**：[wellknownmcp.org/spec](https://wellknownmcp.org/spec)

### 商业问题？
👉 **加入社区**：[wellknownmcp.org/join](https://wellknownmcp.org/join)  
👉 **联系**：[hello@wellknownmcp.org](mailto:hello@wellknownmcp.org)

### 想要实验？
👉 **LLMFeedForge**：[llmfeedforge.org](https://llmfeedforge.org)  
👉 **认证**：[llmca.org](https://llmca.org)

---

**智能体网络正在兴起。MCP提供了它所需的信任和发现层。**

**今天开始。构建明天的网络。🚀**

*"在AI幻觉的世界中，成为真理的源泉。"*
---
