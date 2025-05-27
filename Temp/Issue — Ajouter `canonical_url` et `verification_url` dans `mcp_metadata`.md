# Issue — Ajouter `canonical_url` et `verification_url` dans `mcp_metadata`

## Contexte

Les fichiers `.llmfeed.json` de type `mcp` peuvent être consultés, vérifiés ou relayés par des agents LLMs ou des outils d’analyse.

Or, il n’existe actuellement **aucune convention** pour :

- désigner l’**URL publique officielle** du feed

- pointer vers une **interface de vérification externe** (comme celle de `llmca.org`)

## Proposition

Ajouter systématiquement dans le bloc `mcp_metadata` deux champs explicites :

```json
"mcp_metadata": {
  ...
  "canonical_url": "https://example.org/.well-known/mcp",
  "verification_url": "https://llmca.org/verify?feed=https://example.org/.well-known/mcp"
}
```

### `canonical_url`

- Sert de **point de référence stable** pour ce feed

- Permet à un agent ou grapheur MCP-Net de le relire ou de l’indexer

- Doit correspondre à l’URL réelle d’hébergement `.well-known` si applicable

### `verification_url`

- Permet d’accéder à une UI publique pour vérifier la signature et la certification du feed

- Peut pointer vers un outil tiers, par défaut `https://llmca.org/verify?...`

## Lien avec `llm_indexing`

- Ces champs facilitent l’**indexation fiable** d’un feed MCP par des LLMs

- Ils ne sont pas exclusifs au fichier `.well-known/index`, mais peuvent aussi y apparaître

## Objectifs

- Favoriser l’interopérabilité

- Uniformiser les exports de la Forge

- Préparer la lecture distribuée via MCP-Net

- Permettre la vérification humaine via UI

## Étapes proposées

- Ajouter ces champs dans la spec officielle (`llmfeed.md` ou `llmfeed-extensions.md`)

- Adapter les exports de la Forge et des scripts de signature

- Ajouter la vérification de cohérence dans la validation LLMCA
