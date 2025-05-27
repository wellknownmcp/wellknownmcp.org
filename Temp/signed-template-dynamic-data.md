# Signed Template + Dynamic Data Pattern (LLMFeed Best Practice)

## Why this pattern?

To maintain signature integrity without freezing dynamic content, we recommend:
- Signing static structure: `origin`, `tags`, `certificate_chain`
- Serving dynamic `data` at request time
- Keeping the `signature.signed_blocks` list clear and strict

## Structure

```json
{
  "origin": "...",
  "tags": [...],
  "certificate_chain": [...],
  "signature": {
    "signed_blocks": ["origin", "tags", "certificate_chain"],
    "value": "..."
  },
  "data": {
    "text": "Updated content injected dynamically"
  }
}
```

## Benefits

- 🔐 Verifiable origin
- 🧠 Live content for agents
- 💡 Clear separation of trust vs. variability

## How to implement

1. Create a signed JSON template (`feed-templates/*.llmfeed.json`)
2. Write a dynamic data source (`dynamic_data/*.ts`)
3. Serve via a secure route (`/api/export/[slug]/route.ts`)

## Future

This model supports eventual integration with Vault MCP, LLMCA signature services, and on-demand certified feeds.