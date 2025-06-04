---
id: agent-behavior_risk-scoring
title: Agent Behaviour — Risk Scoring
description: Defines how agents should interpret and act on `risk_score`, `safety_tier`, or `flags` in `.llmfeed.json` feeds.
tags: [llmfeed, agent, risk, safety, flags]
lang: en
---

# ⚠️ Agent Behaviour: Risk Scoring

This module defines **how agents should interpret and act on `risk_score`, `safety_tier`, and `flags` fields** in `.llmfeed.json` feeds.

Risk scoring helps agents make **safer, more transparent decisions** when consuming and acting upon feeds.

---

## 🎛️ Typical Risk Fields

Example fields an agent may encounter:

```json
"risk_score": 0.8,
"safety_tier": "high-risk",
"flags": ["potentially misleading", "unverified origin"]
```

---

## 🚦 Agent Behaviour Rules

Agents SHOULD apply the following logic:

| Field         | Action                                          |
| ------------- | ----------------------------------------------- |
| `risk_score` > 0.7 | Warn user or restrict critical actions         |
| `risk_score` > 0.9 | REJECT feed or require explicit override      |
| `safety_tier = high-risk` | Display warning and restrict sensitive capabilities |
| `flags` contains critical flag (ex: `unverified origin`) | Highlight, warn, and possibly reject |

---

## 🛠️ Example Agent Policy

Agents MAY allow configuration of risk thresholds:

```json
"agent_policy": {
  "max_acceptable_risk_score": 0.7,
  "reject_on_flags": ["unverified origin", "potentially misleading"]
}
```

---

## 🧩 Propagation to UI

Agents SHOULD propagate risk indicators to their UI:

- Show **risk badges** or color indicators.
- Provide **risk explanations** to the user.
- Disable or gate sensitive capabilities based on risk.

---

## 📡 Summary

Risk scoring enables agents to:

✅ Make context-aware decisions  
✅ Warn users when needed  
✅ Adapt behaviour based on feed trust signals  

A consistent risk handling policy is essential for building a **safe and transparent Agentic Web**.

---