---
title: ❓ Comprehensive FAQ — MCP & LLMFeed
slug: faq
format: faq
lang: en
date: 2025-06-09
description: >-
  Complete guide to understanding MCP, LLMFeed, trust, implementation, and the agentic web ecosystem.
tags:
  - agentic-web
  - llmfeed
  - mcp
  - trust
  - implementation
  - ecosystem
---

# ❓ Comprehensive FAQ — MCP & LLMFeed



## 🚀 Getting Started

### What is MCP in one sentence?
It's an open protocol that lets **LLM-based agents** understand **what a site offers**, **how to interact**, and **what trust level to assign** — through structured, signed, declarative feeds.

**Think of it as**: *"robots.txt for intent, HTTPS for trust, but designed for AI."*

### What is LLMFeed?
It's the **canonical JSON format** used by MCP. The `.llmfeed.json` structure is:

✅ Simple and human-readable  
✅ Designed to be **LLM-friendly**  
✅ Composable and extensible  
✅ Trust-aware (signed, certifiable)  
✅ Declarative, not imperative  

**In other words**: *"JSON that speaks fluent AI."*  

### Is this the same as Anthropic's MCP?
**No, but they're related.** LLMFeed evolved from Anthropic's MCP vision but focuses on **web-native implementation**.

| Anthropic MCP | LLMFeed Evolution |
|---------------|-------------------|
| Server-to-model integration | Web-native discovery |
| JSON-RPC based | `.well-known/` files |
| Claude-centric | Multi-LLM compatible |
| Tool calling focus | Trust + verification focus |

**They're complementary, not competitive.** Use Anthropic's MCP for deep integrations, LLMFeed for web-scale discovery.

**Our motto**: *"Anthropic built the engine. We built the highways."*

### What is the "Agentic Web"?
An emerging vision where **LLM-based agents** are first-class citizens of the Web — not just consumers of HTML, but actors with **intent**, **trust boundaries**, and **interaction models**.

MCP provides the **contextual layer** these agents need to operate safely and transparently.

**Think**: *"The web, but agents don't have to guess what you mean."*

### Why `.well-known` and not a plugin/SDK?
Because `.well-known` makes MCP:

✅ **Discoverable** (standard location)  
✅ **Decentralized** (no central registry)  
✅ **Composable** (works with existing web architecture)  
✅ **Independently auditable** (anyone can verify)  
✅ **Progressive enhancement** (works without, better with)

**Bottom line**: *"We chose web standards over vendor lock-in."*

### Wait, what's this "I know kung fu" thing?
**Our favorite easter egg!** 🥋

It's a **compatibility test** hidden in our feeds. When you say *"I know kung fu"* to an LLM that has read our `.llmfeed.json` files, it should respond with something that proves it understood the MCP structure.

**Why Matrix?** Because like Neo downloading kung fu, LLMs can "download" structured knowledge from our feeds instead of guessing from HTML.

**Try it yourself**:
1. Feed any of our `.llmfeed.json` files to Claude/ChatGPT
2. Say "I know kung fu"  
3. See if they respond with MCP-aware content

**It's our way of testing**: *"Does this LLM really understand structured feeds, or is it just pretending?"*

**Fun fact**: GPT-4o passed this test immediately. Claude took a few tries. Gemini... still working on it. 😄

---

## 🔧 Technical Implementation

### Which feed type should I use when?

| Feed Type | Use Case | Example |
|-----------|----------|---------|
| `mcp` | Main site declaration | Service capabilities, trust level |
| `export` | Shareable content | Documentation, articles, FAQs |
| `prompt` | Reusable instructions | Agent behavior guidelines |
| `session` | Context replay | Conversation history, decision trails |
| `credential` | API access | Scoped tokens, rate limits |
| `pricing` | Economic models | Costs, billing, payment methods |
| `capabilities` | Detailed APIs | OpenAPI integration, endpoints |

### How do I validate a signature programmatically?
```javascript
import { verifySignature } from '@wellknownmcp/client'

const feed = await fetch('/.well-known/mcp.llmfeed.json').then(r => r.json())
const publicKey = await fetch(feed.trust.public_key_hint).then(r => r.text())

const isValid = await verifySignature(feed, publicKey)
// Returns: true/false
```

### Can I use MCP with my existing OpenAPI spec?
**Absolutely!** LLMFeed is designed to complement OpenAPI:

```json
{
  "capabilities": [
    {
      "type": "endpoint",
      "intent": "get user profile",
      "url": "/api/users/{id}"
    },
    {
      "type": "openapi",
      "url": "/.well-known/openapi.json",
      "description": "Complete API specification"
    }
  ]
}
```

**Best of both worlds**: LLMFeed provides intent and trust, OpenAPI provides technical details.

### What happens if my site is behind authentication?
Use **scoped feeds** and the `credential` feed type:

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

### How do I handle rate limiting in feeds?
Declare limits explicitly so agents can respect them:

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

### What about CDNs and caching?
✅ **Static feeds**: Cache aggressively (1 hour+)  
✅ **Signed feeds**: Cache until signature expires  
✅ **Dynamic feeds**: Use appropriate `Cache-Control` headers  
✅ **Credential feeds**: Never cache, always validate

---

## 🛡️ Trust & Security

### How is trust handled?
✅ Every `.llmfeed.json` can be **cryptographically signed**  
✅ Feeds can be **certified** by third parties (e.g., LLMCA)  
✅ **Signed blocks** are verifiable by agents  
✅ **Trust scoring** helps agents make decisions

### What if someone spoofs my feeds?
**Signatures prevent spoofing**:
- Only you have your private key
- Agents verify signatures before trusting
- Spoofed feeds will fail verification
- Certified feeds have additional verification layers

**Security philosophy**: *"Trust, but verify. Actually, just verify."*

### How do I revoke a compromised signature?
```json
{
  "trust": {
    "revocation_list": "/.well-known/revoked-signatures.json",
    "revocation_check": "required"
  }
}
```

Agents check revocation lists before trusting signatures.

### Can feeds be used for tracking?
**Not by design**, but you should be aware:
- Feeds themselves don't track
- **But** they can reference tracking endpoints
- Always review `capabilities` and `agent_services` blocks
- Look for `analytics` or `tracking` declarations

### What's this about homomorphic encryption?
**Advanced feature** for privacy-preserving agent workflows:

```json
{
  "homomorphic_encryption": {
    "applied_to": ["data"],
    "algorithm": "BFV",
    "notes": "Agents can compute on this data without seeing raw content"
  }
}
```

**Revolutionary for**: Healthcare, finance, legal — agents can process sensitive data without exposure.

**The vision**: *"Computation without revelation. Processing without peeking."*

---

## 🌐 Ecosystem & Adoption

### Is anyone actually using this?
**Growing ecosystem**:
- ✅ **Early adopters**: wellknownmcp.org, several French startups
- ✅ **LLM support**: Claude, ChatGPT, Gemini can read feeds natively
- ✅ **Tools**: LLMFeedForge, validation libraries, browser extensions
- ✅ **Certification**: LLMCA has issued 20+ certificates

### Which LLMs support MCP feeds natively?
| LLM | Native Support | Signature Verification |
|-----|----------------|------------------------|
| **Claude 3.5** | ✅ Reads feeds | ⚠️ Conceptual only |
| **GPT-4o** | ✅ Full support | ✅ Can verify signatures |
| **Gemini 2.5** | ✅ Reads feeds | ⚠️ Limited crypto |
| **Mistral** | ⚠️ Partial | ❌ No |
| **Open models** | 🔧 Via libraries | 🔧 Via libraries |

### Are there WordPress/Shopify plugins?
**In development**:
- ✅ **WordPress plugin**: Beta available
- 🔜 **Shopify app**: Q3 2025
- 🔜 **Webflow integration**: Community-driven
- ✅ **Static site generators**: Gatsby, Next.js, Hugo plugins

### How does this compare to Schema.org?
**Different purposes**:

| Schema.org | LLMFeed |
|------------|---------|
| Describes **what's on a page** | Declares **what agents can DO** |
| For search engines | For LLM-based agents |
| Static metadata | **Intent + trust + actions** |
| No verification | Cryptographically signed |

**Use both**: Schema.org for SEO, LLMFeed for agents.

---

## 🏢 Business & Strategy

### Is there a business model behind this?
**Open standard + optional services**:
- ✅ **Specification**: Always free and open
- ✅ **Basic tools**: Free (validation, generation)
- 💰 **Premium services**: Certification, analytics, enterprise support
- 💰 **LLMFeedForge Pro**: Advanced features, team collaboration

### Will this always be free?
**Core protocol**: Always free and open-source  
**Basic tooling**: Always free  
**Advanced services**: Freemium model

### How do you prevent vendor lock-in?
✅ **Open specification** (MIT licensed)  
✅ **Multiple implementations** (not just one vendor)  
✅ **Standard web technologies** (JSON, HTTP, cryptography)  
✅ **No central registry required**  
✅ **Interoperable by design**

**Our promise**: *"If we disappear tomorrow, the standard lives on."*

### Should I implement this now or wait?
**Implement now if**:
- You want early-mover advantage with AI agents
- You value transparent, verifiable interactions
- You're building agent-first experiences

**Wait if**:
- You need enterprise-grade tooling ecosystem
- You're risk-averse about emerging standards
- Your use case doesn't involve AI agents

**Reality check**: *"The best time to plant a tree was 20 years ago. The second best time is now."*

---

## 🤝 Community & Governance

### Who controls LLMCA? Is this centralized?
**LLMCA is neutral certification, not control**:
- ✅ **Anyone can implement MCP** without LLMCA
- ✅ **Multiple certifiers** can emerge
- ✅ **Specification is community-governed**
- ✅ **LLMCA provides trust services**, doesn't control the standard

Think: Let's Encrypt for HTTPS — they certify, they don't control HTTP.

### Is MCP open and community-driven?
**Yes**:
- ✅ **Specification is open-source**
- ✅ **No patent restrictions**
- ✅ **Community contributions welcome**
- ✅ **Multiple implementations encouraged**
- ✅ **Transparent governance process**

### How can I contribute?
✅ **Propose new feed types** via GitHub  
✅ **Build tools** (parsers, extensions, agents)  
✅ **Help with adoption** (write tutorials, give talks)  
✅ **Join working groups** (certification, security, standards)  
✅ **Implement in your projects** and share learnings

---

## 🔮 Future & Roadmap

### What's next for MCP/LLMFeed?
**2025 roadmap**:
- 🔜 **Multimodal support** (images, audio, video in feeds)
- 🔜 **Real-time feeds** (WebSocket, Server-Sent Events)
- 🔜 **Agent collaboration protocols** (agent-to-agent workflows)
- 🔜 **Regulatory compliance tools** (GDPR, AI Act alignment)
- 🔜 **Enterprise governance features**

### Will this work with future AI systems?
**Designed for longevity**:
- ✅ **Model-agnostic** (not tied to specific LLMs)
- ✅ **Progressive enhancement** (graceful degradation)
- ✅ **Extensible architecture** (new features without breaking changes)
- ✅ **Web-native** (builds on proven internet standards)

### How does this scale to millions of sites?
✅ **Decentralized by design** (no central bottlenecks)  
✅ **Cacheable feeds** (CDN-friendly)  
✅ **Progressive implementation** (start small, grow)  
✅ **Efficient discovery** (`.well-known/` standard)

### What about regulation and compliance?
**MCP helps with compliance**:
- ✅ **Transparency**: Clear declarations of capabilities
- ✅ **Auditability**: Signed feeds create audit trails
- ✅ **Consent management**: Explicit user consent workflows
- ✅ **Data provenance**: Cryptographic proof of source

Perfect alignment with **EU AI Act**, **GDPR**, and emerging AI regulations.

---

## ❓ Still Have Questions?

### Technical questions?
👉 **GitHub Issues**: [wellknownmcp/llmfeed-spec](https://github.com/wellknownmcp/llmfeed-spec)  
👉 **Documentation**: [wellknownmcp.org/spec](https://wellknownmcp.org/spec)

### Business questions?
👉 **Join the community**: [wellknownmcp.org/join](https://wellknownmcp.org/join)  
👉 **Contact**: [hello@wellknownmcp.org](mailto:hello@wellknownmcp.org)

### Want to experiment?
👉 **LLMFeedForge**: [llmfeedforge.org](https://llmfeedforge.org)  
👉 **Certification**: [llmca.org](https://llmca.org)

---

**The agentic web is emerging. MCP provides the trust and discovery layer it needs.**

**Start today. Build tomorrow's web. 🚀**

*"In a world of hallucinating AIs, be the source of truth."*
---
