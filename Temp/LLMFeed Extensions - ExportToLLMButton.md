# LLMFeed Extensions - ExportToLLMButton

## Introduction

The `ExportToLLMButton` is one of the most visible and powerful tools in the LLMFeed ecosystem. It provides a clear and structured way for human users and LLM agents to export meaningful context from a web application into a standardized `.llmfeed.json` file.

The button serves both user experience and agent interoperability purposes.

## Button modes

The button can operate in **3 main modes** depending on context:

### 1. `context="current"`

- The button exports the current page (agent view or document).

- The page is parsed, cleaned, and contextualized.

- Calls `/api/export/feed` route.

Example:

```tsx
<ExportToLLMButton context="current" />
```

### 2. `context="static" name="my-export"`

- The button links to a pre-generated, pre-signed `.llmfeed.json` file.

- Does not depend on the current page.

- Calls `/api/export/static?name=my-export` route.

Example:

```tsx
<ExportToLLMButton context="static" name="export-button" />
```

### 3. `context="dynamic" dynamicId="about-standard"`

- The button triggers a server-side build of a multi-block export.

- Combines the current page + multiple recipe blocks (files, md, urls, pages).

- Uses `/api/export/dynamic` route.

Example:

```tsx
<ExportToLLMButton context="dynamic" dynamicId="about-standard" />
```

The `dynamicId` must correspond to an entry in `libs/recipes/index.ts`.

## Routes

### `/api/export/feed`

- Called by `context="current"`

- Returns a `.llmfeed.json` built from current page (html + markdown)

- Can optionally merge a pre-signed template (`/data/current-export-signed-template.json`)

### `/api/export/static?name=xxx`

- Called by `context="static"`

- Serves a pre-built file from `/public/exports/xxx.llmfeed.json`

### `/api/export/dynamic`

- Called by `context="dynamic"`

- Requires `{ html, dynamicId }` payload

- Matches the recipe in `libs/recipes/index.ts`

- Merges current page + all recipe blocks

- Returns a complete `.llmfeed.json`

## Recommendations for implementation

### Agent-friendly cleaning

- All html should be cleaned from classes, style, ids, data-* attributes

- Scripts, styles, meta, link and noscript elements must be removed

### Data block ordering

- Always append `data` block at the end of the export

- Respect the recommended block order: `feed_type, metadata, trust, signature, certification, data`

### Recipe file best practices

Recommended structure of a dynamic recipe:

```ts
export const recipes = [
  {
    id: "about-standard",
    context: "Standard export combining about page and specification.",
    blocks: [
      { block_name: "about", type: "page", value: "/about" },
      { block_name: "spec", type: "md", value: "public/spec/llmfeed.md" }
    ]
  }
]
```

Types allowed:

- `page`: internal Next page (`/about`, `/vision`)

- `url`: external url (`https://example.com/feed.json`)

- `md`: raw markdown file (server-side path)

- `file`: json file (server-side path)

## Key principles

- The button MUST be human and agent visible

- The action of the button MUST be deterministic

- An agent SHOULD be able to discover button presence and behavior by inspecting the DOM and routes

The `ExportToLLMButton` is one of the core features of wellknownmcp.org and MUST be implemented consistently by all compliant platforms.
