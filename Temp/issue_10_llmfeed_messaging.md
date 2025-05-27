# Issue #10: Sharing `.llmfeed.json` via Messaging Apps as Agent Context

**Type**: UX + Protocol enhancement  
**Scope**: Sharing behavior, MCP adoption pattern  
**Labels**: sharing, messaging, agent, context

---

## 🧠 Context

Users increasingly interact with AI agents via messaging apps (e.g., WhatsApp, Telegram, Discord, iMessage).  
Sharing a `.llmfeed.json` file in these contexts could become a **trusted, signed entrypoint** to agent execution.

---

## ✅ Proposal

Define and recommend a behavior for agents and apps when a user shares a `.llmfeed.json` via:

- WhatsApp
- Telegram
- Discord
- Signal / iMessage / Slack

Agents should:

- Parse the shared file
- Validate signature and `trust` block
- Use it as invocation context if `feed_type = prompt | capsule | intent`
- Optionally reply in `.llmfeed.json` format

---

## 🔍 Implementation ideas

- Use `.llmfeed.json` hosted at public URL
- Add a `preview/` route (OG compatible) for sharing
- Agents can watch shared folders or URLs
- Forge may generate short links for messenger-friendly previews

---

## 🔐 Trust Mechanisms

- Accept only feeds with `trust disclaimer`
- Highlight origin and signing key (publicly resolvable)
- Warn if feed is unsigned or tampered

---

## 🔮 Future Extensions

- LLMFeedForge adds a "Share via WhatsApp" button
- Agents implement `/accept-feed` endpoints
- App ecosystems adopt `.llmfeed.json` parsing natively

---

This would align agents with open feed standards and extend the power of messaging as an invocation interface.

