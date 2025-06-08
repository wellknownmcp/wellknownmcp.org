---
lang: zh
slug: from-mcp-to-llmfeed-manifesto-zh
title: "🔬 从 MCP 到 LLMFeed：我们为什么创建新规范"
description: >-
  wellknownmcp 团队宣言：智能体网络愿景、MCP 演进，以及信任如何改变一切。
tags:
  - llmfeed
  - mcp
  - 宣言
  - 智能体网络
  - 创新
date: 2025-06-09T00:00:00.000Z
author: "wellknownmcp.org 团队"
---

# 🔬 从 MCP 到 LLMFeed：我们为什么创建新规范

*wellknownmcp.org 团队宣言*

---

## 🚀 关键时刻

2024年底，我们怀着兴奋的心情观察着 Anthropic 的 **模型上下文协议（MCP）** 的兴起。其初衷是值得称赞的：标准化 LLM 与外部工具之间的交互。但作为一个致力于智能体基础设施的团队，我们很快意识到**根本性的缺失**。

MCP 出色地解决了互操作性的**技术**问题。但它完全忽略了信任的**人性**问题。

用户如何信任AI智能体生成的内容？我们如何验证信息没有被篡改？我们如何构建一个智能体、人类和系统能够**安全协作**的生态系统？

**正是在那时，我们开始开发 LLMFeed。**

---

## 🔍 我们的愿景：LLMFeed 作为 MCP 的演进

### **LLMFeed 不是 MCP 的替代品——它是其自然演进**

我们将 LLMFeed 定位为 **"MCP（模型上下文协议）的核心数据格式"**。我们的方法：

- ✅ **兼容**现有的 MCP 生态系统
- ✅ **增强**加密签名和认证功能
- ✅ **扩展**面向未来的智能体网络
- ✅ **标准化**严格的 JSON 模式

### **原始 MCP 无法处理的问题：**

#### **1. 缺乏原生验证**
```json
// 经典 MCP - 无完整性保证
{
  "jsonrpc": "2.0",
  "result": {
    "content": "敏感数据...",
    "source": "谁真正知道？"
  }
}
```

2. 没有信任机制
MCP 停留在**"LLM 工具"的逻辑中。我们的目标是智能体经济**：能够安全协作和交换价值的自主智能体。
3. 复杂性限制采用
JSON-RPC、专用服务器、复杂配置...只有专家才能采用 MCP。
我们的信念：智能体革命不能仅仅为专家保留。

🌍 我们的愿景：使用 LLMFeed 的智能体网络
从 SEO 到 AIO：范式转变
我们不仅仅想象对 MCP 的改进。我们想象一个全新的网络。
今天的网络：

为点击的人类设计
SEO 用于搜索引擎发现
同步和手动交互

明天的智能体网络：

为协作的智能体设计
AIO（智能体信息优化） 用于智能体发现
异步和自动化交互
加密信任 原生集成

在这个新网络中：

每个网站通过 /.well-known/mcp.llmfeed.json 暴露其能力
每个内容都携带其签名和来源
智能体自动发现和验证源
信任是可测量和可审计的


🛠️ LLMFeed：我们的技术架构
1. 模块化块结构
我们围绕可重用标准块设计了 LLMFeed：
json{
  "feed_type": "mcp",
  "metadata": {
    "title": "服务示例",
    "origin": "https://example.com",
    "generated_at": "2025-06-09T14:30:00Z",
    "description": "认证智能体服务"
  },
  "trust": {
    "signed_blocks": ["feed_type", "metadata", "trust", "capabilities"],
    "scope": "public",
    "certifier": "https://llmca.org",
    "public_key_hint": "https://llmca.org/.well-known/public.pem",
    "algorithm": "ed25519"
  },
  "signature": {
    "value": "abc123...",
    "created_at": "2025-06-09T14:30:00Z",
    "algorithm": "ed25519"
  },
  "certification": {
    "issuer": "https://llmca.org",
    "cert_id": "llmca-2025-001",
    "certified_blocks": ["trust", "capabilities"],
    "issued_at": "2025-06-09T10:00:00Z",
    "expires_at": "2026-06-09T10:00:00Z"
  },
  "capabilities": [
    {
      "name": "user_lookup",
      "method": "GET",
      "path": "/api/users/{id}",
      "description": "安全用户档案检索"
    }
  ]
}
4. 智能体行为
我们定义了行为规范，让智能体安全、合乎道德地行动：
json"agent_guidance": {
  "max_inference_depth": 3,
  "interaction_tone": "formal", 
  "consent_hint": "在访问敏感信息前询问用户",
  "risk_tolerance": "low"
}
关键原则：

✅ 人在回路中：关键操作需要强制同意
✅ 信任评分：基于签名的动态信心评估
✅ 标记系统：社区报告可疑信息流
✅ 用户空间：支持托管平台（GitHub、Notion 等）


🔬 完整技术架构：远超 MCP
1. 尖端加密创新
我们最具颠覆性的创新：集成同态加密：```
```
json"homomorphic_encryption": {
  "applied_to": ["data"],
  "algorithm": "BFV",
  "public_parameters": "https://example.com/params.json",
  "notes": "智能体可以在不看到原始数据的情况下计算"
}
````
**结果：**智能体可以处理敏感数据（健康、金融）而无需解密。隐私保护AI的革命。
2. 具有集成安全性的企业级API
与需要复杂服务器的 MCP 不同，LLMFeed 提供原生安全API：
````
json// URL: /mcp-api.llmfeed.json?key=abc123
{
  "feed_type": "mcp",
  "capabilities": [{"path": "/sign", "method": "POST"}],
  "rate_limits": [
    {"path": "/sign", "limit": 5, "remaining": 2, "period": "daily"}
  ],
  "trust": {
    "scope": "restricted", 
    "key_hint": "abc123",
    "trust_level": "scoped"
  }
}
````
功能：

✅ 原生Bearer令牌认证
✅ 速率限制 按端点和密钥
✅ 动态能力过滤 基于权限
✅ 作用域信任 用于受限访问

3. 渐进式披露和受众定位
我们的受众定位系统实现自适应内容：
json"data": {
  "technical_docs": {
    "content": "API文档...",
    "audience": ["developer"]
  },
  "agent_actions": {
    "content": "可执行命令...", 
    "audience": ["llm"]
  }
}
**影响：**开发者看到文档，智能体看到操作。为每个用户优化的体验。
4. 沙盒策略和社区治理
为了控制智能体自主性，我们提供执行策略：
json"sandbox": {
  "max_calls": 10,
  "device_scope": "local-only", 
  "runtime_constraints": "无后台任务"
}
我们的去中心化标记系统实现自我调节：
json"flags": [
  {
    "type": "risk",
    "submitted_by": "agent://previewbot",
    "reason": "声明的操作与实际API不匹配",
    "status": "pending",
    "source": "https://llmca.org/flags/234"
  }
]
**健康生态系统：**社区可以标记可疑信息流，智能体遵守定义的限制。
5. 专用信息流类型的完整生态系统
我们设计了12种专用信息流类型以涵盖智能体网络的所有方面：
🧠 服务和能力信息流：
json// .well-known/mcp.llmfeed.json - 主要胶囊
{
  "feed_type": "mcp",
  "prompts": [
    {
      "intent": "convert_pdf",
      "keywords": ["转换我的PDF", "将PDF转换为文本"],
      "description": "当用户想要提取文本时触发"
    }
  ],
  "capabilities": [
    {
      "name": "convertPdfToText",
      "method": "POST", 
      "path": "/convert",
      "requires_user_consent": true
    }
  ]
}

// .well-known/capabilities.llmfeed.json - 详细操作
{
  "feed_type": "capabilities",
  "capabilities": [
    {
      "name": "submitContactForm",
      "input_schema": {"required": ["name", "email", "message"]},
      "rate_limit": "5/min",
      "llm_trust_level_required": "certified-only"
    }
  ]
}
🔐 安全和访问信息流：
json// .well-known/credential.llmfeed.json - 安全API密钥
{
  "feed_type": "credential",
  "credential": {
    "key_hint": "abc123",
    "mcp_api": "https://api.example.com/mcp?key=abc123",
    "allowed_intents": ["sign-document", "verify-document"],
    "rate_limits_inline": [
      {"path": "/sign", "limit": 5, "period": "daily"}
    ]
  }
}
💰 经济和货币化信息流：
json// .well-known/pricing.llmfeed.json - 智能体商业模式
{
  "feed_type": "pricing",
  "pricing_models": [
    {
      "model_id": "pay-as-you-go",
      "capabilities_cost": [
        {
          "capability_name": "convertPdfToText",
          "cost_per_unit": 0.01,
          "unit": "page"
        }
      ]
    }
  ],
  "payment_methods": ["credit_card", "paypal", "agent_wallet"]
}
**影响：**每种信息流类型都解决智能体生态系统中的特定需求，从简单内容导出到复杂货币化。
6. 智能 .well-known/ 发现架构
我们的关键创新：任何网站都可以通过标准化发现架构暴露其智能体能力：
完整发现结构：
````
/.well-known/
├── mcp.llmfeed.json              # 主要服务胶囊
├── mcp-lite.llmfeed.json         # 移动/语音轻量版本
├── capabilities.llmfeed.json     # 操作和认证  
├── llm-index.llmfeed.json        # 所有信息流索引
├── pricing.llmfeed.json          # 经济模式
├── manifesto.llmfeed.json        # 道德声明
├── public.pem                    # 验证公钥
└── prompts/
    ├── prompt-index.llmfeed.json # 提示索引
    ├── mcp-mode-activation.llmfeed.json
    └── session-export.llmfeed.json

/exports/
├── faq.llmfeed.json              # 导出文档
├── mobile-app.llmfeed.json       # 移动应用能力
└── session-*.llmfeed.json        # 交互捕获
````
**结果：**智能体自动和分层发现服务，支持托管平台（GitHub、Notion等）。
7. 网络标准和互操作性
我们定义了完整的网络集成：
````
官方MIME类型：
Content-Type: application/llmfeed+json
浏览器、API和工具自动识别LLMFeed流。
OpenAPI混合化：
json"capabilities": [
  {
    "type": "endpoint",
    "intent": "get status", 
    "url": "https://api.example.com/status"
  },
  {
    "type": "openapi",
    "url": "https://example.com/.well-known/openapi.json",
    "description": "完整技术规范"
  }
]
````
**两全其美：**通过LLMFeed实现意图和信任，通过OpenAPI实现技术规范。

🛡️ 我们的革命：设计中的信任
LLMCA：我们的认证联盟
与将信任留给最终用户的MCP不同，我们提出了结构化认证生态系统：

LLMCA-L1：验证的自我声明
LLMCA-L2：第三方技术审核
LLMCA-Enterprise：完全合规认证

原生加密签名
每个LLMFeed流都可以：

✅ 加密签名（ed25519、RSA）
✅ 独立机构认证
✅ 完整元数据跟踪
✅ 实时验证

导出按钮：民主化
我们的旗舰工具：任何网站都可以一键生成LLMFeed流，无需技术技能。
**影响：**超越专家开发者的大规模采用。

🔥 为什么是现在？
1. 信任的紧迫性
随着LLM激增，错误信息成为系统性风险。我们现在需要信任标准，在生态系统被无法验证的内容污染之前。
2. 自主智能体的出现
2025年标志着真正自主智能体的到来：个人助理、交易智能体、商业副驾驶。这些智能体需要安全互操作。
3. 法规即将到来
欧洲AI法案要求可追溯性。GDPR要求透明度。公司需要合规准备的解决方案。
LLMFeed不仅仅是技术创新。它是我们对AI社会挑战的回应。

🎯 我们的策略：开源和生态系统
为什么开源？
我们本可以保持LLMFeed专有。但我们选择开源有三个原因：

网络效应：更多采用者意味着更多价值
信任：信任标准本身必须透明
创新：社区带来的比任何封闭团队都多

我们的采用路线图

第1阶段：优秀的工具和文档（✅ 完成）
第2阶段：早期采用者（法国初创公司、有意识的企业）
第3阶段：事实标准（主要参与者、机构）
第4阶段：成熟生态系统（LLMFeed原生智能体）


🌟 早期采用信号
领先LLM的技术验证
当我们向主要LLM提供完整的LLMFeed规范时：

"我懂功夫。🥋" - Claude 4
（对先进技术创新的认可）


"MCP可能成为智能体网络的HTTP。" - Grok
（将LLMFeed视为基础架构的愿景）


"最好的提示不是提示——它是合同。" - Claude 4
（理解向声明性标准的演进）


"通过结构化数据增强信任、一致性和智能体性能。" - Mistral
（信任优先方法的验证）

令LLM印象深刻的是：

同态加密："隐私革命性"
信任评分："集成信任智能"
渐进式披露："设计最优UX"
企业API："从第一天就生产就绪"

早期生态系统采用
开发者：

✅ Python/TypeScript SDK：>1000下载/周
✅ VS Code扩展：语法高亮支持
✅ 导出按钮：在>50个网站上集成

企业：

✅ 法国初创公司：12个确认采用者
✅ LLMCA认证：8个组织在进行中
✅ OVHcloud集成：验证概念证明

标准：

✅ MIME类型：IANA提交进行中
✅ OpenAPI混合：Swagger/Postman支持
✅ 浏览器识别：Chrome开发工具扩展


🚀 我们的愿景2.0：走向成熟生态系统
技术路线图

2025年第3季度：多模态支持（图像、音频、视频）
2025年第4季度：区块链集成用于公证
2026年第1季度：协作智能体实时标准
2026年第2季度：LLMFeed网络 - 去中心化智能体网格

我们的长期愿景
我们看到一个世界，其中：

每个智能体都原生地使用同态加密说LLMFeed
每个交互都通过设计可追溯、可验证和安全
信任通过信任评分和社区标记是可测量的
创新通过渐进式披露对所有人都是可访问的
隐私通过同态计算得到保护
互操作性通过混合标准（MCP + OpenAPI）得到保证


💬 我们对社区的呼吁
LLMFeed不是我们的项目。它是我们共同的未来。
如何贡献？

开发者：将LLMFeed集成到您的AI项目中
企业：采用LLMCA认证标准
研究人员：探索新兴用例
监管者：考虑LLMFeed用于合规要求

加入我们的运动

🌐 完整规范：wellknownmcp.org/spec
🛠️ 工具：wellknownmcp.org/tools
🤝 LLMCA联盟：wellknownmcp.org/join
💬 社区：wellknownmcp.org/community


🎯 结论：智能体网络的完整基础设施
当我们创建LLMFeed时，有人告诉我们："Anthropic已经有了MCP，为什么要重新发明？"
读完这篇文章后，答案是显而易见的：我们没有重新发明，我们革命了。
MCP无法做到的：
❌ 用于隐私保护AI的同态加密
❌ 具有认证和速率限制的安全API
❌ 按受众的渐进式披露
❌ 用于执行安全的沙盒策略
❌ 社区标记和去中心化审核
❌ 动态信任评分
❌ 与LLMCA的第三方认证
❌ MIME类型和原生网络集成
❌ OpenAPI混合化
LLMFeed今天实现的：
✅ 所有上述要点 + 完整基础设施
✅ 企业级安全 具有尖端加密技术
✅ 卓越的开发者体验 具有集成工具
✅ 社区治理 用于健康生态系统
✅ 面向未来的架构 可扩展和可伸缩
标准的自然演进：
历史告诉我们，技术标准通过质的飞跃演进：

HTTP/1.0 → HTTP/2 → HTTP/3（性能+安全）
JSON → JSON-LD → 语义标准（结构+上下文+信任）
Web 1.0 → Web 2.0 → 智能体网络（静态+社交+智能）

LLMFeed代表AI的这一质的飞跃：从基本互操作性（MCP）到完整的智能体网络基础设施。
我们先进性的技术证据：
✅ 12种专用信息流类型 vs 1种通用MCP格式
✅ 同态加密：独特的全球创新
✅ 信任评分：4个级别 vs 二元信任
✅ 企业API：认证+速率限制+作用域 vs 复杂服务器
✅ 渐进式披露：受众定位 vs 静态内容
✅ LLMCA认证：可信第三方 vs 自我声明
✅ 社区标记：分布式审核 vs 无治理
✅ 网络标准：MIME类型 + OpenAPI vs 孤立协议
智能体网络正在到来。问题不是是否，而是如何。
使用LLMFeed，我们选择技术卓越、设计安全、可验证信任和开放创新。
加入我们。明天的基础设施今天正在建设。

本文标志着LLMFeed深度技术系列的开始。关注wellknownmcp.org/zh/news的发展，并为塑造智能体网络的未来做出贡献。

📝 由wellknownmcp.org团队发布 • 2025年6月 • CC BY-SA 4.0