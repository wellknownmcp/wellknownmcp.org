---
# 📄 Basic metadata

title: "Extension: API Feed Handling — Autonomous Agent Service Discovery"
description: "How LLMFeed enables agents to autonomously discover, negotiate, and manage API access without manual user configuration"
date: "2025-06-10T00:00:00.000Z"
lang: "en"

# 🏷️ Tags

tags:

- "mcp"
- "llmfeed"
- "api-extension"
- "agent-autonomy"
- "service-discovery"
- "credential-management"
- "user-experience"
- "well-known"
- "authentication"

# 🎯 Content classification

format: "specification"
category: "technical"
contentType: "api-reference"

# 🧠 Intent and audience

intent: "technical-guide"
llmIntent: "understand-autonomous-api-access"
llmTopic: "agent-service-integration"
audience:

- "llm"
- "developer"
- "product-manager"

# 📊 Advanced metadata

priority: "high"
riskLevel: "low"
updateFrequency: "stable"
pageType: "specification"
interactionComplexity: "moderate"

# 🔗 Urls

slug: "llmfeed-extensions-api"
canonical_url: "https://wellknownmcp.org/spec/03_llmfeed_extensions/llmfeed_extensions_api"
mcpFeedUrl: "/.well-known/mcp.llmfeed.json"

# 🤖 Agent configuration

autoDiscoverFeeds: true
agentReadiness: true
llmBehaviorHints: "suggest-only"

# 📋 Specialized metadata

extensions:

- "api-authentication"
- "service-discovery"
- "credential-management"

capabilities:

- "autonomous-discovery"
- "credential-negotiation"
- "transparent-access"

trustLevel: "signed"

# 🏗️ Technical metadata

technicalLevel: "intermediate"
estimatedReadTime: "12 min"

# 📚 Relations

relatedArticles:

- "llmfeed-feedtype-credential"
- "llmfeed-feedtype-mcp"
- "llmfeed-feedtype-mobile-app"
- "wellknown-discovery"

prerequisites:

- "basic-llmfeed-concepts"
- "understanding-of-well-known-uris"
- "api-authentication-fundamentals"

---

# Extension: API Feed Handling

This extension describes how feeds like `/mcp-api.llmfeed.json` enable agents to **autonomously discover, negotiate, and manage** service access, eliminating the need for users to manually configure API keys.

## 🚀 The Revolution: From Manual Configuration to Total Autonomy

### **BEFORE LLMFeed: Configuration Hell**

```bash
# Users must:
1. Discover that a service exists
2. Visit the service website
3. Create a developer account
4. Generate an API key
5. Copy-paste it into agent configuration
6. Manage expiration, rotation, permissions...
```

### **AFTER LLMFeed: Agents Handle Everything**

```
User: "I'd like to analyze this document"
Agent: "I can do that! I found DocumentAI which looks perfect. 
        Would you like me to access their advanced features?"
User: "Yes"
Agent: [Automatically negotiates access, obtains credentials, 
        processes document]
Agent: "Here's your complete analysis!"
```

**The user never saw an API key. The agent managed everything.**

---

## 🔍 The Magic Flow in 4 Steps

### **Step 1: Automatic Discovery**

The agent discovers available services via [well-known URIs](https://tools.ietf.org/html/rfc5785):

```json
// /.well-known/mcp.llmfeed.json
{
  "feed_type": "mcp",
  "metadata": {
    "title": "DocumentAI Service",
    "origin": "https://api.documentai.com"
  },
  "capabilities": [
    {
      "name": "basic_preview",
      "description": "Preview document analysis",
      "auth_required": false
    },
    {
      "name": "full_analysis", 
      "description": "Complete AI document processing",
      "auth_required": true,
      "user_benefit": "10x more accurate, supports 50+ languages"
    }
  ],
  "auth_flow": {
    "agent_can_request": true,
    "user_consent_required": true,
    "credential_endpoint": "/.well-known/credential.llmfeed.json"
  }
}
```

*See [MCP Feed Type](../02_llmfeed_feedtype/llmfeed_feedtype_mcp.md) for complete specification.*

### **Step 2: Negotiation with Consent**

```
Agent: "DocumentAI offers advanced analysis that would be 
        perfect for your document. May I request access?"

User: "Yes, go ahead"

Agent: [Follows credential endpoint automatically]
```

### **Step 3: Autonomous Credential Management**

The agent receives and stores credentials automatically:

```json
// credential.llmfeed.json (managed by agent)
{
  "feed_type": "credential",
  "credential": {
    "key_hint": "dmai_...abc123",
    "mcp_api": "https://api.documentai.com/.well-known/mcp-api.llmfeed.json",
    "allowed_intents": ["document_analysis", "ocr", "translation"],
    "expires_at": "2025-12-10T14:30:00Z"
  },
  "trust": {
    "signed_blocks": ["credential"],
    "certifier": "https://llmca.org"
  }
}
```

*See [Credential Feed Type](../02_llmfeed_feedtype/llmfeed_feedtype_credential.md) for cryptographic security details.*

### **Step 4: Transparent Service Access**

```json
// /.well-known/mcp-api.llmfeed.json?key=dmai_abc123 (automatic)
{
  "feed_type": "mcp",
  "capabilities": [
    { "name": "advanced_ocr", "method": "POST", "path": "/api/ocr" },
    { "name": "multi_language_analysis", "method": "POST", "path": "/api/analyze" }
  ],
  "rate_limits": [
    { "path": "/api/ocr", "remaining": 87, "limit": 100, "period": "daily" }
  ],
  "trust": {
    "scope": "authenticated",
    "key_hint": "dmai_...abc123"
  }
}
```

**The agent can now use the service as if it were native.**

---

## 🌟 What This Changes Fundamentally

### **For Users**

- ✅ **Zero configuration**: never handle API keys manually
- ✅ **Informed consent**: understand what they're authorizing
- ✅ **Seamless experience**: agents handle everything behind the scenes
- ✅ **Security**: no sensitive keys exposed in interfaces

### **For Agents**

- ✅ **Automatic discovery**: find relevant services via [well-known discovery](../01_llmfeed/wellknown.md)
- ✅ **Autonomous management**: obtain and maintain credentials
- ✅ **Dynamic adaptation**: adjust to limits and permissions
- ✅ **Error recovery**: handle access issues automatically

### **For Service Providers**

- ✅ **Simplified acquisition**: agents bring qualified users
- ✅ **Smooth onboarding**: agent → paying user conversion
- ✅ **Optimized usage**: agents automatically respect limits
- ✅ **Verified trust**: signature and certification system

---

## 🔧 Authentication Methods (Transparent to Users)

Agents automatically handle:

### **Bearer Token** (Recommended)

```http
GET /.well-known/mcp-api.llmfeed.json
Authorization: Bearer dmai_abc123def456
```

### **API Key Header**

```http
GET /.well-known/mcp-api.llmfeed.json
X-API-Key: dmai_abc123def456
```

### **URL Parameter** (Fallback)

```http
GET /.well-known/mcp-api.llmfeed.json?key=dmai_abc123def456
```

### **Credential POST** (Secure Environments)

```http
POST /.well-known/mcp-api.llmfeed.json
Content-Type: application/json

{
  "credential": {
    "key_hint": "dmai_...def456",
    "signature": "proof_of_possession"
  }
}
```

*Users never see these technical details.*

---

## 📱 Mobile App Integration

The same principle applies to mobile applications:

```json
// /.well-known/mobile-app.llmfeed.json
{
  "feed_type": "mobile-app",
  "app_integration": {
    "agent_auth_flow": true,
    "deep_link_support": "myapp://agent-auth/callback",
    "credential_sharing": "secure_token_exchange"
  },
  "capabilities": [
    {
      "name": "fitness_tracking",
      "auth_required": true,
      "user_benefit": "Voice-controlled workout logging"
    }
  ]
}
```

**Result**: Agents can negotiate access to your mobile app and interact via API, without any user configuration.

*See [Mobile App Feed Type](../02_llmfeed_feedtype/llmfeed_feedtype_mobile-app.md) for complete mobile integration patterns.*

---

## 🧠 OpenAPI: Best of Both Worlds

```json
{
  "capabilities": [
    {
      "type": "endpoint",
      "intent": "analyze document",
      "description": "AI-powered document analysis", 
      "method": "POST",
      "path": "/api/analyze"
    },
    {
      "type": "openapi",
      "url": "/.well-known/openapi.json",
      "description": "Complete technical specification"
    }
  ]
}
```

→ **Agents understand intent** via LLMFeed, **validate parameters** via [OpenAPI](https://spec.openapis.org/oas/v3.1.0).

---

## ⚠️ Error Handling & Recovery

### **Authentication Errors**

```json
{
  "error": "invalid_credentials",
  "message": "API key is invalid or expired",
  "recovery": {
    "credential_renewal": "/.well-known/credential.llmfeed.json",
    "support_url": "https://documentai.com/support"
  },
  "fallback_access": {
    "demo_mode": true,
    "limited_capabilities": ["basic_preview"]
  }
}
```

### **Rate Limit Management**

```json
{
  "error": "rate_limit_exceeded",
  "rate_limits": [
    {
      "path": "/api/ocr",
      "limit": 100,
      "remaining": 0,
      "resets_at": "2025-06-11T00:00:00Z"
    }
  ],
  "alternatives": {
    "available_endpoints": ["/api/preview"],
    "upgrade_hint": "Enterprise tier offers 10x higher limits"
  }
}
```

*Agents handle these automatically, presenting users with constructive alternatives.*

---

## 🎯 The Impact: A Truly Agentic Web

### **Before**: Web for Humans

- Websites for human navigation
- APIs for technical developers
- Manual configuration required

### **After**: Web for Agents

- ✅ **Services auto-discoverable** by agents
- ✅ **Automatic access negotiation**
- ✅ **Transparent credential management**
- ✅ **Frictionless user experience**

---

## 🛡️ Security & Trust Integration

This extension integrates with LLMFeed's [risk scoring system](../04_agent-behavior/agent-behavior_risk-scoring.md):

```json
{
  "trust": {
    "risk_score": 0.15,
    "safety_tier": "low-risk",
    "signed_blocks": ["capabilities", "rate_limits"],
    "certifier": "https://llmca.org"
  }
}
```

*Agents can evaluate service trustworthiness before requesting user consent.*

---

## 📋 Implementation Guidelines

### **For Service Providers**

1. **Expose discovery endpoints**
   
   - Implement `/.well-known/mcp.llmfeed.json` for service discovery
   - Provide `/.well-known/credential.llmfeed.json` for agent authentication

2. **Enable agent-friendly flows**
   
   - Create agent-specific onboarding processes
   - Implement dynamic `/mcp-api.llmfeed.json` endpoints
   - Support multiple authentication methods

3. **Ensure security**
   
   - Sign all feeds using [LLMFeed signatures](./llmfeed_extensions_signatures.md)
   - Implement proper rate limiting and scoping
   - Provide clear error messages with recovery paths

### **For Agent Developers**

1. **Implement discovery**
   
   - Scan `/.well-known/` directories for service capabilities
   - Parse and understand service requirements
   - Present options to users in natural language

2. **Manage credentials securely**
   
   - Store `credential.llmfeed.json` files securely
   - Implement automatic rotation and renewal
   - Verify signatures before using credentials

3. **Handle errors gracefully**
   
   - Implement proper backoff for rate limits
   - Provide fallback options when services are unavailable
   - Surface meaningful error messages to users

### **For Enterprise Integration**

1. **Security compliance**
   
   - Implement audit trails for all API access
   - Support enterprise authentication methods ([OAuth 2.0](https://tools.ietf.org/html/rfc6749), SAML)
   - Enable policy-based access controls

2. **Monitoring and analytics**
   
   - Track service usage and costs
   - Monitor for anomalous access patterns
   - Generate compliance reports

---

## 🔗 Related Standards & Specifications

- **[RFC 5785: Well-Known URIs](https://tools.ietf.org/html/rfc5785)** - Foundation for service discovery
- **[OAuth 2.0](https://tools.ietf.org/html/rfc6749)** - Authorization framework compatibility
- **[OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0)** - Technical API specification
- **[JSON Web Tokens](https://tools.ietf.org/html/rfc7519)** - Secure credential transfer
- **[LLMCA Certification](https://llmca.org/)** - Trust and verification standards

---

## 💫 Vision: The End of Manual Configuration

**LLMFeed + API Extension = The End of User Configuration**

Users talk to their agents, agents automatically discover and negotiate access to the entire web of services.

**This is the true agentic web.**

---

## 📚 See Also

- [MCP Feed Type Specification](../02_llmfeed_feedtype/llmfeed_feedtype_mcp.md)
- [Credential Management](../02_llmfeed_feedtype/llmfeed_feedtype_credential.md)
- [Mobile App Integration](../02_llmfeed_feedtype/llmfeed_feedtype_mobile-app.md)
- [Well-Known Discovery](../01_llmfeed/wellknown.md)
- [Trust & Risk Scoring](../04_agent-behavior/agent-behavior_risk-scoring.md)
- [Signature Extensions](./llmfeed_extensions_signatures.md)
