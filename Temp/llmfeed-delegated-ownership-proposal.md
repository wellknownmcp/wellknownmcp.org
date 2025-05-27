---
title: "Proposition : Delegated Ownership pour recettes utilisateur"
lang: fr
tags: [llmfeed, mcp, delegated ownership, user-scope, roadmap]
---

# 🚀 Extension standard : Delegated Ownership (LLMFeed MCP 1.1)

## 🎯 Objectif

Permettre à une plateforme ou un site d’exposer des recettes dynamiques associées à un utilisateur, tout en garantissant qu’aucun utilisateur final ne puisse manipuler ou usurper ce lien.

## ✅ Contexte

De nombreuses plateformes permettent à des utilisateurs d’écrire des contenus (posts, journaux, projets, articles).  
Cette extension standardise une façon vérifiable d’exposer :

> "Voici un export complet certifié de **toutes les données de l’utilisateur X**"

## 📝 Spécification

### Nouveau champ : `owner_scope`

Optionnel.  
Ajouté dans un bloc d’export ou de feed dynamique.

```json
"owner_scope": {
  "type": "user",
  "id": "user-123"
}
```

### Champs possibles

| Champ | Type | Description |
|------|------|-------------|
| type | string | `"user"` (ou futur `"org"` / `"project"` etc.) |
| id | string | identifiant unique local ou global |
| issuer (optionnel) | string | URL du serveur responsable de cet utilisateur (`https://example.com`) |

### Exemple complet

```json
{
  "type": "export",
  "id": "all-user-123",
  "title": "All posts by user-123",
  "generator": {
    "type": "dynamic",
    "recipe": "user-123"
  },
  "owner_scope": {
    "type": "user",
    "id": "user-123",
    "issuer": "https://example.com"
  },
  "url": "https://example.com/api/llmfeed/dynamic?id=user-123"
}
```

## 🔐 Sécurité

- Seul le backend (ex: le serveur du site) peut exposer ces URLs.
- Un LLM agent peut vérifier :
  - Que la recette correspond à un scope utilisateur contrôlé.
  - Que la plateforme certifie cette relation.

## 🛠 Usage recommandé

Cette extension doit être réservée aux cas :

- Exports `"tout mon contenu"` pour utilisateurs sur plateformes collaboratives.
- Délégation de visibilité agentielle (les agents accèdent mais l’utilisateur ne gère pas lui-même).

## 🎯 Impact standard

À intégrer dans `llmfeed-extensions.md` comme une future fonctionnalité MCP 1.1 :

- Ajout simple.
- Haute valeur ajoutée.
- Aucun impact backward compatibility.
