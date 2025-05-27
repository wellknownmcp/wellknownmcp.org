# Session Summary: WellKnownMCP - 3 May 2025

## Check-list Restante

### ✅ Fait / Stable

* Intégration complète de la norme MCP avec feed hub, preview, validation, signature
* OG dynamic image pour les `feed_type`
* Export JSON / PDF / Markdown + partage réseaux sociaux (WhatsApp, WeChat, Telegram...)
* LLMFeedHub (anciennement /preview) affiché dans la navbar
* Filtrage par tags et langue multilingue géré dynamiquement
* Mise en place des news multilingues avec tags + export
* Pages protocol/about/news/sdk/feeds toutes finalisées
* “Join” et gestion du formulaire Supabase opérationnels
* Inclusion badge MCP certifié + structure des assets
* API dynamique d'export de feed injectant dans template signé
* LLM index / lite / mcp.json et capabilities mis à jour (projection agentielle du site)
* Route `/exports/index.dynamic.llmfeed.json` générant un feed de tous les exports

### ❌ À faire immédiatement

* Ajouter `ts-node` ou générer une version `.js` du script `generateOgImages.ts`
* Finaliser le script de génération d’images OG statiques pour les news
* Finir le README et `sitemap.xml` + `robots.txt` à la racine publique
* Intégrer les news traduites dans toutes les langues
* Vérifier et déployer `generate.ts` (PDF)
* Tester l’environnement de prod (OVH VPS Starter)
* Activer les enregistrements Supabase (logs, inspection, opt-in pour indexation)

### ⌛À faire très prochainement (gel des features pour lancement)

* Ajout d’un bouton de « Export complet norme MCP » avec les bons fichiers signés (README, blocks, manifestes...)
* Feed de type `capsule` (norme à préparer, issue GitHub faite)
* Feed audité / certified / trust disclaimer enrichi (bonne pratique sur `trust.scope` et `trust.warning`)
* Feed `prompt.llmfeed.json` comme norme de prompt structurant pour LLM
* Vérification de la compatibilité serveur Puppeteer en prod (PDF)

---

## Ce qu'on était en train de faire

* Génération dynamique d’images OG personnalisées selon le `feed_type`
* Validation des émojis pour chaque type :

  ```json
  {
    "feed-index": "🗝",
    "feed-reference": "📌",
    "feed-spec": "📜",
    "feed-example": "🧪",
    "feed-news": "📰",
    "capsule": "💊",
    "mcp": "🤖",
    "default": "🧠"
  }
  ```
* Utilisation d’une image de fond `og-wellknownmcp.png` + emoji + titre dans une image finale
* Discussion sur les difficultés d’installation de `canvas` sous Windows et limitation à Puppeteer

---

## Prochaines évolutions WellKnownMCP (stratégie après lancement)

* MCP interactive map : navigation entre feeds (liens MCP et HTML)
* Version publique certifiée du `core.llmfeed.json`
* Section SDK/API finalisée + bouton d’export signé
* Multi-bundle de news signées (ex: norme, manifeste, why)
* Ajout d’une véritable page d’audit de feed (diff entre signed\_blocks et contenu actuel)
* Intégration image OG dynamique par type de contenu autre que feed (spec, news, etc)

---

## Insights pour LLMFeedForge

* Ajout de la génération de `.llmfeed.json` par prompt
* Interface standalone : ouvrir, vérifier, envoyer vers assistants
* Logique de signature certifiée depuis UI
* Export complet `.zip` avec badge + readme + signature + image OG
* Mode premium : enrichissement automatique par IA (tags, contexte)
* Mode freemium : feed avec pub ou traqueur d’usage
* Système de feedback utilisateur / agent sur les feeds partagés

---

## Insights pour LLMCA

* Agent d’audit de site (crawling VS MCP)
* Certification des LLMs compatibles MCP (issue en préparation)
* GitHub bot pour validation de norme / feed signé
* Infrastructure de signatures, indexation, gestion d’héritage (MCP-Net)
* Projection agentielle : comment donner une image utile du site pour un LLM
* Discussion autour de `capsule.llmfeed.json` comme unité universelle
