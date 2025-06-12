---
# 📄 Basic metadata

title: "Feed Type: llm-index.llmfeed.json — Intelligent Discovery Hub for the Agentic Web"
description: "Complete specification for llm-index feeds enabling smart feed discovery, organized by audience and intent, with metrics and behavioral guidance for AI agents"
date: "2025-06-10T00:00:00.000Z"
lang: "en"

# 🏷️ Tags

tags:

- "mcp"
- "llmfeed"
- "llm-index"
- "discovery"
- "sitemap"
- "navigation"
- "agent-discovery"
- "feed-organization"
- "trust"
- "certification"
- "ai-agents"
- "developers"

# 🎯 Content classification

format: "specification"
category: "technical"
contentType: "api-reference"

# 🧠 Intent and audience

intent: "enable-intelligent-discovery"
llmIntent: "understand-feed-discovery-and-navigation"
llmTopic: "llm-index-feeds-and-intelligent-discovery"
audience:

- "llm"
- "developer"
- "agent"
- "crawler"

# 📊 Advanced metadata

priority: "high"
riskLevel: "low"
updateFrequency: "dynamic"
pageType: "api-reference"
interactionComplexity: "moderate"

# 🔗 Urls

slug: "llmfeed-feedtype-llm-index"
canonical_url: "https://wellknownmcp.org/spec/02_llmfeed_feedtype/llmfeed_feedtype_llm-index"
mcpFeedUrl: "/.well-known/llm-index.llmfeed.json"

# 🤖 Agent configuration

autoDiscoverFeeds: true
agentReadiness: true
llmBehaviorHints: "full-autonomous"

# 📋 Specialized metadata

feedTypes:

- "llm-index"
- "discovery"
- "navigation"

capabilities:

- "feed-discovery"
- "intelligent-routing"
- "audience-filtering"
- "trust-prioritization"

trustLevel: "signed"

# 🏗️ Technical metadata

technicalLevel: "intermediate"
estimatedReadTime: "15 min"

# 📚 Relations

relatedArticles:

- "llmfeed-feedtype-mcp"
- "wellknown-discovery"
- "agent-behavior"

prerequisites:

- "basic-llmfeed-concepts"
- "understanding-of-feed-discovery"

---

# Feed Type: `llm-index.llmfeed.json`

## Purpose

This feed serves as an **intelligent discovery hub** that helps agents navigate and understand a site's complete feed ecosystem. It goes beyond a simple sitemap to provide **organized, contextualized, and prioritized access** to all available LLMFeed content.

Think of it as a **smart table of contents** designed specifically for AI agents.

---

## Evolution from Simple Sitemap to Intelligent Hub

| **Legacy Approach** | **Intelligent Index**                     |
| ------------------- | ----------------------------------------- |
| Flat list of feeds  | Organized by audience and intent          |
| Basic URL + title   | Rich metadata with context                |
| No prioritization   | Trust-based and audience-filtered routing |
| Static structure    | Dynamic with usage metrics                |
| No guidance         | Agent behavior recommendations            |
| Isolated feeds      | Ecosystem relationships mapped            |

---

## Complete Structure

```json
{
  "feed_type": "llm-index",
  "metadata": {
    "title": "WellKnownMCP Discovery Hub",
    "origin": "https://wellknownmcp.org",
    "description": "Intelligent index of all agent-ready feeds and capabilities",
    "generated_at": "2025-06-10T14:30:00Z",
    "last_crawl": "2025-06-10T14:25:00Z",
    "total_feeds": 12,
    "version": "2.1.0",
    "lang": "en"
  },

  "site_context": {
    "organization": "WellKnownMCP Foundation",
    "primary_purpose": "Agentic web standards and tools",
    "main_audiences": ["developers", "agents", "business"],
    "trust_level": "certified",
    "agent_friendly": true,
    "update_frequency": "daily",
    "architecture": "static_and_dynamic"
  },

  "discovery_guidance": {
    "recommended_entry_points": {
      "new_visitors": "/.well-known/mcp.llmfeed.json",
      "developers": "/exports/developer-guide.llmfeed.json", 
      "business": "/.well-known/manifesto.llmfeed.json",
      "agents": "/.well-known/capabilities.llmfeed.json"
    },
    "reading_order": [
      "manifesto → mcp → capabilities → specific_exports",
      "For understanding: manifesto first",
      "For action: capabilities first",
      "For content: exports by topic"
    ],
    "trust_prioritization": "certified > signed > basic",
    "audience_filtering": "Match agent audience to feed audience for relevance"
  },

  "feed_categories": {
    "core_infrastructure": {
      "description": "Essential feeds for understanding site capabilities",
      "priority": "critical",
      "feeds": [
        {
          "title": "Main MCP Declaration",
          "feed_type": "mcp",
          "url": "/.well-known/mcp.llmfeed.json",
          "description": "Primary site declaration with mission and capabilities",
          "audience": ["llm", "developer", "agent"],
          "trust_level": "certified",
          "last_updated": "2025-06-10T12:00:00Z",
          "estimated_tokens": 850,
          "complexity": "simple",
          "required_for": ["site_understanding", "agent_configuration"],
          "relationships": {
            "references": ["manifesto", "capabilities"],
            "extends": [],
            "requires": []
          }
        },
        {
          "title": "Organization Manifesto",
          "feed_type": "manifesto", 
          "url": "/.well-known/manifesto.llmfeed.json",
          "description": "Ethical framework and organizational values",
          "audience": ["llm", "organization", "regulator"],
          "trust_level": "certified",
          "last_updated": "2025-06-01T09:00:00Z",
          "estimated_tokens": 1200,
          "complexity": "moderate",
          "required_for": ["trust_establishment", "value_alignment"],
          "behavioral_impact": "Guides agent interaction tone and ethical boundaries"
        },
        {
          "title": "Site Capabilities",
          "feed_type": "capabilities",
          "url": "/.well-known/capabilities.llmfeed.json", 
          "description": "Available APIs, tools and interactive features",
          "audience": ["llm", "developer", "agent"],
          "trust_level": "signed",
          "last_updated": "2025-06-09T16:30:00Z",
          "estimated_tokens": 600,
          "complexity": "moderate",
          "required_for": ["action_planning", "api_usage"],
          "api_endpoints": 8,
          "authentication_required": false
        }
      ]
    },

    "documentation_exports": {
      "description": "Comprehensive documentation and guides",
      "priority": "high", 
      "audience_filter": ["developer", "business"],
      "feeds": [
        {
          "title": "Developer Getting Started Guide",
          "feed_type": "export",
          "url": "/exports/getting-started.llmfeed.json",
          "description": "Complete guide for developers new to LLMFeed",
          "audience": ["developer"],
          "trust_level": "signed",
          "tags": ["tutorial", "onboarding", "code-examples"],
          "last_updated": "2025-06-08T11:15:00Z",
          "estimated_tokens": 2400,
          "complexity": "intermediate",
          "prerequisites": ["basic-json-knowledge", "web-development-basics"],
          "completion_time": "45 minutes",
          "includes_code": true
        },
        {
          "title": "FAQ Collection",
          "feed_type": "export",
          "url": "/exports/faq.llmfeed.json",
          "description": "Frequently asked questions about MCP and LLMFeed",
          "audience": ["llm", "developer", "business"],
          "trust_level": "signed",
          "tags": ["faq", "support", "troubleshooting"],
          "last_updated": "2025-06-09T14:20:00Z",
          "estimated_tokens": 1800,
          "complexity": "simple",
          "search_topics": ["implementation", "trust", "certification", "tools"]
        }
      ]
    },

    "specialized_tools": {
      "description": "Interactive tools and advanced capabilities",
      "priority": "medium",
      "audience_filter": ["developer", "agent"],
      "feeds": [
        {
          "title": "Feed Validation Tool",
          "feed_type": "capabilities",
          "url": "/tools/validator.llmfeed.json",
          "description": "Interactive tool for validating LLMFeed files",
          "audience": ["developer"],
          "trust_level": "signed",
          "tags": ["validation", "debugging", "interactive"],
          "last_updated": "2025-06-07T13:45:00Z",
          "requires_interaction": true,
          "api_calls": ["POST /api/validate", "GET /api/schemas"]
        },
        {
          "title": "Prompt Library",
          "feed_type": "prompt",
          "url": "/prompts/library-index.llmfeed.json",
          "description": "Collection of certified prompts for common tasks",
          "audience": ["llm", "developer"],
          "trust_level": "certified",
          "tags": ["prompts", "templates", "examples"],
          "last_updated": "2025-06-06T10:30:00Z",
          "prompt_count": 24,
          "categories": ["validation", "generation", "analysis", "explanation"]
        }
      ]
    },

    "community_content": {
      "description": "Community-generated and collaborative content",
      "priority": "normal",
      "audience_filter": ["developer", "business"],
      "feeds": [
        {
          "title": "Implementation Examples",
          "feed_type": "export",
          "url": "/community/examples.llmfeed.json",
          "description": "Real-world implementation examples from the community",
          "audience": ["developer"],
          "trust_level": "basic",
          "tags": ["examples", "community", "real-world"],
          "last_updated": "2025-06-05T16:00:00Z",
          "contributed_by": "community",
          "review_status": "peer-reviewed"
        }
      ]
    }
  },

  "usage_analytics": {
    "most_accessed": [
      {"feed": "/.well-known/mcp.llmfeed.json", "requests_7d": 1247},
      {"feed": "/exports/faq.llmfeed.json", "requests_7d": 892},
      {"feed": "/.well-known/capabilities.llmfeed.json", "requests_7d": 734}
    ],
    "by_audience": {
      "llm": {"primary_feeds": ["mcp", "manifesto", "faq"], "avg_session_feeds": 3.2},
      "developer": {"primary_feeds": ["capabilities", "getting-started", "examples"], "avg_session_feeds": 4.7},
      "business": {"primary_feeds": ["manifesto", "faq", "mcp"], "avg_session_feeds": 2.1}
    },
    "trust_distribution": {
      "certified": 5,
      "signed": 6, 
      "basic": 1
    }
  },

  "smart_routing": {
    "audience_based": {
      "llm": {
        "entry_point": "/.well-known/mcp.llmfeed.json",
        "recommended_sequence": ["mcp", "manifesto", "capabilities", "faq"],
        "skip_categories": ["specialized_tools"],
        "behavioral_note": "Focus on understanding and ethical guidance"
      },
      "developer": {
        "entry_point": "/exports/getting-started.llmfeed.json",
        "recommended_sequence": ["getting-started", "capabilities", "examples", "tools"],
        "priority_categories": ["documentation_exports", "specialized_tools"],
        "behavioral_note": "Emphasize practical implementation and code examples"
      },
      "business": {
        "entry_point": "/.well-known/manifesto.llmfeed.json",
        "recommended_sequence": ["manifesto", "mcp", "faq"],
        "skip_categories": ["specialized_tools"],
        "behavioral_note": "Focus on value proposition and trust signals"
      }
    },
    "intent_based": {
      "understand_platform": ["manifesto", "mcp", "faq"],
      "implement_solution": ["capabilities", "getting-started", "examples"],
      "validate_feeds": ["validator", "schemas"],
      "browse_content": ["faq", "examples", "community"]
    }
  },

  "ecosystem_relationships": {
    "feed_dependencies": {
      "mcp": {"requires": ["manifesto"], "enhances": ["capabilities"]},
      "capabilities": {"requires": ["mcp"], "extends": ["tools"]},
      "manifesto": {"standalone": true, "influences": ["all"]}
    },
    "cross_references": {
      "certification_chain": ["manifesto → mcp → capabilities"],
      "learning_path": ["manifesto → getting-started → examples → tools"],
      "trust_verification": ["manifesto → mcp → individual_feeds"]
    },
    "update_propagation": {
      "manifesto_change": ["triggers_mcp_review", "updates_all_references"],
      "capabilities_change": ["updates_tools_index", "notifies_developers"],
      "structural_change": ["regenerates_index", "validates_relationships"]
    }
  },

  "agent_behavior_recommendations": {
    "discovery_strategy": {
      "new_site": "Start with mcp.llmfeed.json for overview, then follow recommended_entry_points",
      "return_visit": "Check last_updated timestamps, prioritize changed feeds",
      "specific_intent": "Use intent_based routing for targeted discovery"
    },
    "trust_evaluation": {
      "certified_feeds": "High confidence, suitable for autonomous action",
      "signed_feeds": "Medium confidence, verify against manifesto values",
      "basic_feeds": "Low confidence, cross-reference with trusted sources"
    },
    "resource_optimization": {
      "token_budget_low": "Prioritize core_infrastructure category only",
      "token_budget_medium": "Add highest priority from each category",
      "token_budget_high": "Full discovery following recommended sequences"
    },
    "error_handling": {
      "feed_unavailable": "Continue with available feeds, note degraded capability",
      "invalid_feed": "Skip and flag for review, don't fail entire discovery",
      "authentication_required": "Respect access controls, suggest alternatives"
    }
  },

  "maintenance_info": {
    "auto_update": {
      "frequency": "hourly",
      "triggers": ["new_feed_detected", "feed_modified", "trust_status_changed"],
      "validation": "All referenced feeds verified before index update"
    },
    "health_monitoring": {
      "broken_links": 0,
      "outdated_feeds": 1,
      "certification_expiring": [],
      "last_health_check": "2025-06-10T14:25:00Z"
    },
    "version_history": {
      "2.1.0": "Added smart routing and ecosystem relationships",
      "2.0.0": "Introduced feed categories and usage analytics", 
      "1.2.0": "Added trust levels and audience filtering",
      "1.0.0": "Basic feed listing with minimal metadata"
    }
  },

  "agent_guidance": {
    "interaction_tone": "helpful",
    "discovery_depth": "comprehensive",
    "trust_weight": "high",
    "fallback_behavior": "graceful_degradation",
    "custom_notes": "This index enables intelligent feed discovery. Use audience and intent filters for optimal navigation."
  },

  "trust": {
    "signed_blocks": ["feed_categories", "smart_routing", "agent_behavior_recommendations"],
    "scope": "comprehensive",
    "certifier": "https://llmca.org",
    "public_key_hint": "https://wellknownmcp.org/.well-known/public.pem",
    "certification_level": "Level 2 - Technical Audit Verified"
  }
}
```

---

## Key Innovations vs. Legacy Index

### 1. **Intelligent Organization**

```json
"feed_categories": {
  "core_infrastructure": { /* Essential feeds */ },
  "documentation_exports": { /* Guides and docs */ },
  "specialized_tools": { /* Interactive capabilities */ },
  "community_content": { /* User-generated content */ }
}
```

### 2. **Smart Routing System**

```json
"smart_routing": {
  "audience_based": {
    "llm": { "entry_point": "mcp", "sequence": ["mcp", "manifesto", "capabilities"] },
    "developer": { "entry_point": "getting-started", "priority_categories": ["tools"] }
  },
  "intent_based": {
    "understand_platform": ["manifesto", "mcp", "faq"],
    "implement_solution": ["capabilities", "getting-started", "examples"]
  }
}
```

### 3. **Rich Feed Metadata**

```json
{
  "title": "Developer Getting Started Guide",
  "audience": ["developer"],
  "trust_level": "signed",
  "estimated_tokens": 2400,
  "complexity": "intermediate", 
  "prerequisites": ["basic-json-knowledge"],
  "completion_time": "45 minutes",
  "includes_code": true
}
```

### 4. **Usage Analytics & Optimization**

```json
"usage_analytics": {
  "most_accessed": [{"feed": "mcp.llmfeed.json", "requests_7d": 1247}],
  "by_audience": {
    "developer": {"avg_session_feeds": 4.7, "primary_feeds": ["capabilities"]}
  }
}
```

### 5. **Ecosystem Relationship Mapping**

```json
"ecosystem_relationships": {
  "feed_dependencies": {
    "mcp": {"requires": ["manifesto"], "enhances": ["capabilities"]}
  },
  "cross_references": {
    "learning_path": ["manifesto → getting-started → examples → tools"]
  }
}
```

---

## Agent Behavior Recommendations

| Scenario              | Recommended Action                                       |
| --------------------- | -------------------------------------------------------- |
| **First Visit**       | Start with recommended entry point for detected audience |
| **Return Visit**      | Check timestamps, prioritize updated feeds               |
| **Specific Intent**   | Use intent-based routing for targeted discovery          |
| **Low Token Budget**  | Focus on core_infrastructure category only               |
| **High Trust Needed** | Prioritize certified > signed > basic feeds              |
| **Feed Unavailable**  | Follow fallback chains, continue gracefully              |

---

## Generation & Tooling

## Generation & Tooling

### **No-Code Generation with Certified Prompts**

**The ultimate meta-approach:** Use a signed `prompt.llmfeed.json` to generate your `llm-index.llmfeed.json` !

#### **Download the Official Prompt**

```bash
# Download the certified prompt
curl -o generate-llm-index.llmfeed.json \
  https://wellknownmcp.org/.well-known/prompts/generate-llm-index.llmfeed.json
```

Or use it directly:

```json
{
  "feed_type": "prompt",
  "metadata": {
    "title": "Generate Intelligent LLM Index",
    "origin": "https://wellknownmcp.org",
    "author": "WellKnownMCP Foundation",
    "created_at": "2025-06-10T14:30:00Z",
    "version": "1.0.0"
  },
  "intent": "generate_llm_index_from_site_structure",
  "context": "User provides their sitemap and feed list, wants a complete llm-index.llmfeed.json",
  "precision_level": "ultra-strict",
  "result_expected": "llm-index",
  "process_mode": "structured_generation",

  "prompt_body": "You are an expert in the LLMFeed specification and website architecture. I need you to generate a comprehensive `llm-index.llmfeed.json` file for my website.\n\n## Instructions:\n1. Analyze the provided sitemap and feed structure\n2. Categorize feeds by purpose (core_infrastructure, documentation, tools_and_utilities, examples_and_demos)\n3. Assign appropriate priorities (critical for .well-known/, high for main docs, medium for tools, low for examples)\n4. Create audience-based entry points (developers, business, agents)\n5. Include smart routing recommendations\n6. Estimate token counts based on content complexity\n7. Follow the complete llm-index specification structure\n\n## Site Information Template:\n**Site URL:** [USER PROVIDES]\n**Main Sections:** [USER LISTS: /docs/, /api/, /tools/, etc.]\n**Existing LLMFeed Files:** [USER LISTS: /.well-known/mcp.llmfeed.json, /exports/faq.llmfeed.json, etc.]\n**Sitemap XML:** [USER PASTES]\n**Site Type:** [e-commerce/saas/blog/corporate/etc.]\n**Target Audiences:** [developers/business/end-users/etc.]\n\n## Output Requirements:\n- Complete valid JSON following llm-index.llmfeed.json specification\n- Include all required blocks: metadata, discovery_guidance, categories, index, agent_guidance\n- Categorize all feeds logically\n- Set realistic priorities and complexity levels\n- Create audience-specific entry points\n- Include smart routing recommendations\n- Add appropriate tags for each entry\n- Estimate tokens realistically (API docs ~2000, simple feeds ~400, complex exports ~1500)\n\n## Quality Checklist:\n✅ Valid JSON structure\n✅ All feeds categorized appropriately\n✅ Priorities reflect actual importance\n✅ Entry points match audiences\n✅ Token estimates seem reasonable\n✅ Agent guidance is actionable\n✅ Categories have clear descriptions\n\nRespond with ONLY the complete JSON structure, no additional text.",

  "input_variables": [
    {
      "name": "site_url",
      "description": "The base URL of the website",
      "required": true,
      "example": "https://example.com"
    },
    {
      "name": "sitemap_xml", 
      "description": "The complete sitemap.xml content",
      "required": true,
      "example": "<?xml version=\"1.0\"?><urlset>...</urlset>"
    },
    {
      "name": "existing_feeds",
      "description": "List of existing .llmfeed.json files with their purposes",
      "required": true,
      "example": ["/.well-known/mcp.llmfeed.json (main declaration)", "/exports/docs.llmfeed.json (documentation)"]
    },
    {
      "name": "site_sections",
      "description": "Main sections/directories of the website",
      "required": true, 
      "example": ["/docs/ (documentation)", "/api/ (developer APIs)", "/tools/ (utilities)"]
    },
    {
      "name": "site_type",
      "description": "Type of website for context",
      "required": false,
      "example": "saas_platform"
    },
    {
      "name": "target_audiences",
      "description": "Primary audiences for the site",
      "required": false,
      "example": ["developers", "business_users"]
    }
  ],

  "examples": [
    {
      "title": "SaaS Platform Example",
      "input": {
        "site_url": "https://apiplatform.com",
        "site_type": "saas_platform",
        "target_audiences": ["developers", "business"],
        "existing_feeds": [
          "/.well-known/mcp.llmfeed.json (main platform declaration)",
          "/.well-known/capabilities.llmfeed.json (API capabilities)",
          "/exports/docs/api-reference.llmfeed.json (API documentation)"
        ],
        "site_sections": [
          "/docs/ (comprehensive API documentation)",
          "/tools/ (developer utilities and SDKs)", 
          "/pricing/ (subscription plans)",
          "/dashboard/ (user interface)"
        ]
      },
      "expected_categories": ["core_infrastructure", "api_documentation", "developer_tools", "business_info"],
      "expected_entry_points": {
        "developers": "/exports/docs/api-reference.llmfeed.json",
        "business": "/.well-known/mcp.llmfeed.json"
      }
    }
  ],

  "agent_guidance": {
    "interaction_tone": "professional",
    "output_format": "pure_json",
    "validation_required": true,
    "fallback_behavior": "request_clarification",
    "custom_notes": "This prompt generates the foundation of intelligent site discovery. Accuracy is critical."
  },

  "trust": {
    "signed_blocks": ["prompt_body", "input_variables", "examples"],
    "scope": "partial", 
    "certifier": "https://wellknownmcp.org",
    "public_key_hint": "https://wellknownmcp.org/.well-known/public.pem"
  }
}
```

#### **How to Use the Certified Prompt**

1. **Download** the prompt file from [wellknownmcp.org/.well-known/prompts/generate-llm-index.llmfeed.json](https://wellknownmcp.org/.well-known/prompts/generate-llm-index.llmfeed.json)

2. **Feed it to any LLM** (Claude, ChatGPT, Gemini) along with your site data:
   
   ```
   Please use this certified prompt to generate my llm-index:
   [paste the prompt.llmfeed.json content]
   
   My site details:
   - Site URL: https://mysite.com
   - Sitemap: [paste sitemap.xml]
   - Existing feeds: [list your .llmfeed.json files]
   - Main sections: [describe your site structure]
   ```

3. **Review the generated index** and save as `/.well-known/llm-index.llmfeed.json`

#### **Why Certified Prompts Are Powerful**

✅ **Standardized generation** - everyone gets consistent quality  
✅ **Verified instructions** - signed by WellKnownMCP Foundation  
✅ **Portable and reusable** - works with any LLM  
✅ **Continuously improved** - prompt updates improve all generations  
✅ **Full auditability** - you know exactly what instructions were used

#### **Available Certified Prompts**

| Prompt                       | Purpose                                 | Status         | Download                                                                     |
| ---------------------------- | --------------------------------------- | -------------- | ---------------------------------------------------------------------------- |
| **generate-llm-index**       | Create intelligent site discovery index | ✅ Available    | [Download](https://wellknownmcp.org/.well-known/prompts/generate-llm-index.llmfeed.json) |
| **generate-mcp-declaration** | Create main MCP site declaration        | ✅ Available    | [Download](https://wellknownmcp.org/.well-known/prompts/generate-mcp.llmfeed.json)       |
| **generate-capabilities**    | Create API capabilities feed            | 🚧 Coming Soon | [wellknownmcp.org/.well-known/prompts](https://wellknownmcp.org/.well_known/prompts)                 |
| **generate-manifesto**       | Create organizational manifesto         | 🚧 Coming Soon | [wellknownmcp.org/.well-known/prompts](https://wellknownmcp.org/.well-known/prompts)                 |

### **The Meta-Advantage**

This approach is **beautifully recursive:**

- **LLMFeed prompts** generate **LLMFeed indexes**
- **Signed prompts** ensure **consistent quality**
- **Portable prompts** work with **any LLM**
- **Versioned prompts** enable **continuous improvement**

**Result:** Anyone can generate professional-grade llm-index feeds using certified, auditable prompts ! 🤯

### Automated Generation Tools

For developers and frequent updates, **specialized tools** provide automation:

| Tool                 | Purpose                                       | Status            | Link                                                 |
| -------------------- | --------------------------------------------- | ----------------- | ---------------------------------------------------- |
| **Next.js Plugin**   | Automatic index generation for Next.js sites  | 🚧 Coming Soon    | [wellknownmcp.org/sdk](https://wellknownmcp.org/sdk) |
| **LLMFeedForge CLI** | Universal site crawler and index generator    | 🚧 In Development | [llmfeedforge.org](https://llmfeedforge.org/)        |
| **WordPress Plugin** | CMS integration for automatic feed generation | 📋 Planned        | [wellknownmcp.org/sdk](https://wellknownmcp.org/sdk) |
| **GitHub Action**    | CI/CD integration for automated index updates | 📋 Planned        | [wellknownmcp.org/sdk](https://wellknownmcp.org/sdk) |

#### **Next.js Integration (Coming Soon)**

```bash
npm install @wellknownmcp/next-sitemap-llmindex
```

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://yoursite.com',
  generateLLMIndex: true,
  llmIndexConfig: {
    enhancementRules: {
      '/.well-known/*': { priority: 'critical', category: 'core_infrastructure' },
      '/docs/*': { priority: 'high', category: 'documentation' },
      '/tools/*': { priority: 'medium', category: 'tools_and_utilities' }
    },
    audienceDetection: true,
    tokenEstimation: true,
    trustLevelInference: true
  }
}
```

### **Enhancement Rules Engine**

Tools use configurable **enhancement rules** to automatically enrich basic feed listings:

```typescript
interface EnhancementRule {
  pattern: string | RegExp           // URL pattern to match
  metadata: {
    priority?: 'critical' | 'high' | 'medium' | 'low'
    category?: string
    audience?: string[]
    complexity?: 'simple' | 'moderate' | 'complex' | 'advanced'
    trust_level?: 'certified' | 'signed' | 'basic'
    tags?: string[]
  }
}

const rules: EnhancementRule[] = [
  {
    pattern: /\.well-known\/mcp\.llmfeed\.json$/,
    metadata: {
      priority: 'critical',
      category: 'core_infrastructure',
      audience: ['llm', 'developer', 'agent'],
      trust_level: 'certified'
    }
  },
  {
    pattern: /\/docs\//,
    metadata: {
      priority: 'high', 
      category: 'documentation',
      audience: ['developer'],
      complexity: 'intermediate'
    }
  }
]
```

### **Integration Examples**

#### **Build Pipeline Integration**

```yaml
# .github/workflows/update-llm-index.yml
name: Update LLM Index
on:
  push:
    paths: ['public/exports/**/*.llmfeed.json']

jobs:
  update-index:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: wellknownmcp/generate-index-action@v1
        with:
          site-url: ${{ secrets.SITE_URL }}
          enhancement-config: './llmindex.config.js'
```

#### **Dynamic API Generation**

```javascript
// pages/api/llm-index.js
import { generateLLMIndex } from '@wellknownmcp/next-sitemap-llmindex'

export default async function handler(req, res) {
  const index = await generateLLMIndex({
    siteUrl: process.env.SITE_URL,
    includeAnalytics: true,
    enhancementRules: './rules.config.js'
  })

  res.setHeader('Content-Type', 'application/llmfeed+json')
  res.json(index)
}
```

**Learn More:** Visit [wellknownmcp.org/sdk](https://wellknownmcp.org/sdk) for the latest tools and [llmfeedforge.org](https://llmfeedforge.org/) for the comprehensive toolchain.

---

## Progressive Implementation

### Phase 1: Enhanced Basic Index

```json
{
  "feed_type": "llm-index",
  "metadata": { "title": "Site Discovery" },
  "feeds": [
    {
      "title": "Main MCP",
      "feed_type": "mcp",
      "url": "/.well-known/mcp.llmfeed.json",
      "audience": ["llm", "developer"],
      "trust_level": "signed"
    }
  ]
}
```

### Phase 2: Add Categories & Routing

```json
{
  "feed_categories": {
    "core": { "feeds": [...] },
    "docs": { "feeds": [...] }
  },
  "smart_routing": {
    "audience_based": { "llm": {...}, "developer": {...} }
  }
}
```

### Phase 3: Full Intelligence (Automated)

- Usage analytics integration
- Ecosystem relationships mapping
- Health monitoring
- Dynamic updates via CI/CD

---

## Benefits for Different Stakeholders

### **For AI Agents**

- ✅ **Intelligent discovery** without blind crawling
- ✅ **Audience-filtered** content recommendations
- ✅ **Trust-prioritized** feed selection
- ✅ **Token-optimized** resource allocation

### **For Developers**

- ✅ **Clear navigation** to relevant tools and docs
- ✅ **Implementation examples** and getting-started paths
- ✅ **API capabilities** clearly mapped
- ✅ **Community content** discoverable

### **For Site Owners**

- ✅ **Analytics insights** on feed usage
- ✅ **Maintenance automation** with health monitoring
- ✅ **SEO benefits** through structured discovery
- ✅ **Trust differentiation** through certification levels

### **For the Ecosystem**

- ✅ **Standardized discovery** patterns
- ✅ **Interoperable routing** across sites
- ✅ **Quality incentives** through trust levels
- ✅ **Community contributions** supported

---

## Integration with Other Feed Types

- **`mcp.llmfeed.json`**: Main entry point referenced in smart routing
- **`manifesto.llmfeed.json`**: Values influence agent behavior recommendations
- **`capabilities.llmfeed.json`**: API endpoints catalogued with metadata
- **`export.llmfeed.json`**: Documentation organized by audience and complexity

---

## Future Enhancements

- **Cross-site discovery** networks
- **Federated search** across llm-index feeds
- **AI-powered** content recommendations
- **Real-time** collaboration indicators
- **Community rating** systems

---

This evolved llm-index transforms from a simple **"sitemap"** into an **intelligent discovery hub** that makes the agentic web navigable, trustworthy, and efficient for all stakeholders.
