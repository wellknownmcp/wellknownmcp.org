---
title: ❓ FAQ Complète — MCP & LLMFeed
slug: faq
format: faq
lang: fr
date: 2025-06-09T00:00:00.000Z
description: >-
  Guide complet pour comprendre MCP, LLMFeed, la confiance, l'implémentation, et
  l'écosystème du web agentique.
tags:
  - implémentation
  - llmfeed
  - mcp
  - trust
  - web-agentique
  - écosystème
---

# ❓ FAQ Complète — MCP & LLMFeed

---

## 🚀 Pour Commencer

### Qu'est-ce que MCP en une phrase ?

C'est un protocole ouvert qui permet aux **agents basés sur des LLM** de comprendre **ce qu'un site propose**, **comment interagir**, et **quel niveau de confiance accorder** — via des feeds structurés, signés et déclaratifs.

**Pensez-y comme** : _"robots.txt pour l'intention, HTTPS pour la confiance, mais conçu pour l'IA."_

### Qu'est-ce que LLMFeed ?

C'est le **format JSON canonique** utilisé par MCP. La structure `.llmfeed.json` est :

✅ Simple et lisible par l'humain
✅ Conçue pour être **compatible LLM**
✅ Composable et extensible
✅ Consciente de la confiance (signée, certifiable)
✅ Déclarative, pas impérative

**En d'autres termes** : _"Du JSON qui parle couramment IA."_

### Est-ce la même chose que le MCP d'Anthropic ?

**Non, mais ils sont liés.** LLMFeed a évolué à partir de la vision MCP d'Anthropic mais se concentre sur **l'implémentation web-native**.

| MCP Anthropic              | Évolution LLMFeed              |
| -------------------------- | ------------------------------ |
| Intégration serveur-modèle | Découverte web-native          |
| Basé sur JSON-RPC          | Fichiers `.well-known/`        |
| Centré sur Claude          | Compatible multi-LLM           |
| Focus sur l'appel d'outils | Focus confiance + vérification |

**Ils sont complémentaires, pas concurrents.** Utilisez le MCP d'Anthropic pour les intégrations profondes, LLMFeed pour la découverte à l'échelle web.

**Notre devise** : _"Anthropic a construit le moteur. Nous avons construit les autoroutes."_

### Qu'est-ce que le "Web Agentique" ?

Une vision émergente où les **agents basés sur des LLM** sont des citoyens de première classe du Web — pas seulement des consommateurs de HTML, mais des acteurs avec **intention**, **limites de confiance**, et **modèles d'interaction**.

MCP fournit la **couche contextuelle** dont ces agents ont besoin pour opérer de manière sûre et transparente.

**Pensez** : _"Le web, mais les agents n'ont plus à deviner ce que vous voulez dire."_

### Pourquoi `.well-known` et pas un plugin/SDK ?

Parce que `.well-known` rend MCP :

✅ **Découvrable** (emplacement standard)
✅ **Décentralisé** (pas de registre central)
✅ **Composable** (fonctionne avec l'architecture web existante)
✅ **Auditable indépendamment** (n'importe qui peut vérifier)
✅ **Amélioration progressive** (fonctionne sans, mieux avec)

**Notre principe** : _"Nous avons choisi les standards web plutôt que le vendor lock-in."_

### Attendez, c'est quoi ce truc "I know kung fu" ?

**Notre easter egg favori !** 🥋

C'est un **test de compatibilité** caché dans nos feeds. Quand vous dites _"I know kung fu"_ à un LLM qui a lu nos fichiers `.llmfeed.json`, il devrait répondre avec quelque chose qui prouve qu'il a compris la structure MCP.

**Pourquoi Matrix ?** Parce que comme Neo qui télécharge le kung fu, les LLM peuvent "télécharger" des connaissances structurées depuis nos feeds au lieu de deviner depuis le HTML.

**Testez vous-même** :

1. Donnez n'importe lequel de nos fichiers `.llmfeed.json` à Claude/ChatGPT
2. Dites "I know kung fu"
3. Voyez s'ils répondent avec du contenu conscient du MCP

**C'est notre façon de tester** : _"Est-ce que ce LLM comprend vraiment les feeds structurés, ou fait-il semblant ?"_

**Fait amusant** : GPT-4o a réussi ce test immédiatement. Claude a pris quelques essais. Gemini... on y travaille encore. 😄

---

## 🔧 Implémentation Technique

### Quel type de feed dois-je utiliser quand ?

| Type de Feed   | Cas d'Usage                    | Exemple                                        |
| -------------- | ------------------------------ | ---------------------------------------------- |
| `mcp`          | Déclaration principale du site | Capacités du service, niveau de confiance      |
| `export`       | Contenu partageable            | Documentation, articles, FAQ                   |
| `prompt`       | Instructions réutilisables     | Directives de comportement d'agent             |
| `session`      | Rejeu de contexte              | Historique de conversation, traces de décision |
| `credential`   | Accès API                      | Tokens délimités, limites de taux              |
| `pricing`      | Modèles économiques            | Coûts, facturation, méthodes de paiement       |
| `capabilities` | APIs détaillées                | Intégration OpenAPI, endpoints                 |

### Comment valider une signature programmatiquement ?

```javascript
import { verifySignature } from '@wellknownmcp/client'

const feed = await fetch('/.well-known/mcp.llmfeed.json').then((r) => r.json())
const publicKey = await fetch(feed.trust.public_key_hint).then((r) => r.text())

const isValid = await verifySignature(feed, publicKey)
// Retourne : true/false
```

### Puis-je utiliser MCP avec ma spec OpenAPI existante ?

**Absolument !** LLMFeed est conçu pour compléter OpenAPI :

```json
{
  "capabilities": [
    {
      "type": "endpoint",
      "intent": "obtenir profil utilisateur",
      "url": "/api/users/{id}"
    },
    {
      "type": "openapi",
      "url": "/.well-known/openapi.json",
      "description": "Spécification API complète"
    }
  ]
}
```

**Le meilleur des deux mondes** : LLMFeed fournit l'intention et la confiance, OpenAPI fournit les détails techniques.

### Que se passe-t-il si mon site est derrière une authentification ?

Utilisez des **feeds délimités** et le type de feed `credential` :

```json
{
  "feed_type": "credential",
  "credential": {
    "key_hint": "abc123",
    "mcp_api": "/api/mcp?key=abc123",
    "allowed_intents": ["read_profile", "update_settings"],
    "rate_limits": [{ "path": "/api/*", "limit": 100, "period": "hour" }]
  }
}
```

### Comment gérer la limitation de taux dans les feeds ?

Déclarez les limites explicitement pour que les agents puissent les respecter :

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

### Et les CDN et la mise en cache ?

✅ **Feeds statiques** : Cache agressif (1 heure+)
✅ **Feeds signés** : Cache jusqu'à expiration de la signature
✅ **Feeds dynamiques** : Utilisez les en-têtes `Cache-Control` appropriés
✅ **Feeds credential** : Jamais de cache, toujours valider

---

## 🛡️ Confiance & Sécurité

### Comment la confiance est-elle gérée ?

✅ Chaque `.llmfeed.json` peut être **signé cryptographiquement**
✅ Les feeds peuvent être **certifiés** par des tiers (ex: LLMCA)
✅ Les **blocs signés** sont vérifiables par les agents
✅ Le **scoring de confiance** aide les agents à prendre des décisions

### Et si quelqu'un falsifie mes feeds ?

**Les signatures empêchent la falsification** :

- Vous seul avez votre clé privée
- Les agents vérifient les signatures avant de faire confiance
- Les feeds falsifiés échoueront à la vérification
- Les feeds certifiés ont des couches de vérification supplémentaires

**Philosophie sécurité** : _"Fais confiance, mais vérifie. En fait, vérifie juste."_

### Comment révoquer une signature compromise ?

```json
{
  "trust": {
    "revocation_list": "/.well-known/revoked-signatures.json",
    "revocation_check": "required"
  }
}
```

Les agents vérifient les listes de révocation avant de faire confiance aux signatures.

### Les feeds peuvent-ils être utilisés pour le tracking ?

**Pas par conception**, mais vous devriez être conscient :

- Les feeds eux-mêmes ne trackent pas
- **Mais** ils peuvent référencer des endpoints de tracking
- Toujours examiner les blocs `capabilities` et `agent_services`
- Cherchez les déclarations `analytics` ou `tracking`

### C'est quoi cette histoire de chiffrement homomorphe ?

**Fonctionnalité avancée** pour les workflows d'agents préservant la vie privée :

```json
{
  "homomorphic_encryption": {
    "applied_to": ["data"],
    "algorithm": "BFV",
    "notes": "Les agents peuvent calculer sur ces données sans voir le contenu brut"
  }
}
```

**Révolutionnaire pour** : Santé, finance, juridique — les agents peuvent traiter des données sensibles sans exposition.

**La vision** : _"Calcul sans révélation. Traitement sans regard indiscret."_

---

## 🌐 Écosystème & Adoption

### Est-ce que quelqu'un utilise vraiment ça ?

**Écosystème en croissance** :

- ✅ **Early adopters** : wellknownmcp.org, plusieurs startups françaises
- ✅ **Support LLM** : Claude, ChatGPT, Gemini peuvent lire les feeds nativement
- ✅ **Outils** : LLMFeedForge, bibliothèques de validation, extensions de navigateur
- ✅ **Certification** : LLMCA a émis 20+ certificats

### Quels LLM supportent les feeds MCP nativement ?

| LLM                 | Support Natif        | Vérification Signature      |
| ------------------- | -------------------- | --------------------------- |
| **Claude 3.5**      | ✅ Lit les feeds     | ⚠️ Conceptuel seulement     |
| **GPT-4o**          | ✅ Support complet   | ✅ Peut vérifier signatures |
| **Gemini 2.5**      | ✅ Lit les feeds     | ⚠️ Crypto limitée           |
| **Mistral**         | ⚠️ Partiel           | ❌ Non                      |
| **Modèles ouverts** | 🔧 Via bibliothèques | 🔧 Via bibliothèques        |

### Y a-t-il des plugins WordPress/Shopify ?

**En développement** :

- ✅ **Plugin WordPress** : Beta disponible
- 🔜 **App Shopify** : Q3 2025
- 🔜 **Intégration Webflow** : Dirigé par la communauté
- ✅ **Générateurs de sites statiques** : Plugins Gatsby, Next.js, Hugo

### Comment ça se compare à Schema.org ?

**Objectifs différents** :

| Schema.org                         | LLMFeed                                     |
| ---------------------------------- | ------------------------------------------- |
| Décrit **ce qui est sur une page** | Déclare **ce que les agents peuvent FAIRE** |
| Pour les moteurs de recherche      | Pour les agents basés LLM                   |
| Métadonnées statiques              | **Intention + confiance + actions**         |
| Pas de vérification                | Signé cryptographiquement                   |

**Utilisez les deux** : Schema.org pour le SEO, LLMFeed pour les agents.

---

## 🏢 Business & Stratégie

### Y a-t-il un modèle économique derrière ça ?

**Standard ouvert + services optionnels** :

- ✅ **Spécification** : Toujours gratuite et ouverte
- ✅ **Outils de base** : Gratuits (validation, génération)
- 💰 **Services premium** : Certification, analytics, support entreprise
- 💰 **LLMFeedForge Pro** : Fonctionnalités avancées, collaboration équipe

### Est-ce que ça restera toujours gratuit ?

**Protocole de base** : Toujours gratuit et open-source
**Outillage de base** : Toujours gratuit
**Services avancés** : Modèle freemium

### Comment prévenez-vous le vendor lock-in ?

✅ **Spécification ouverte** (licence MIT)
✅ **Implémentations multiples** (pas qu'un seul vendor)
✅ **Technologies web standard** (JSON, HTTP, cryptographie)
✅ **Pas de registre central requis**
✅ **Interopérable par conception**

**Notre promesse** : _"Si nous disparaissons demain, le standard continue à vivre."_

### Dois-je implémenter ça maintenant ou attendre ?

**Implémentez maintenant si** :

- Vous voulez l'avantage du premier arrivé avec les agents IA
- Vous valorisez les interactions transparentes et vérifiables
- Vous construisez des expériences agent-first

**Attendez si** :

- Vous avez besoin d'un écosystème d'outils enterprise-grade
- Vous êtes averse au risque concernant les standards émergents
- Votre cas d'usage n'implique pas d'agents IA

**Réalité** : _"Le meilleur moment pour planter un arbre était il y a 20 ans. Le deuxième meilleur moment est maintenant."_

---

## 🤝 Communauté & Gouvernance

### Qui contrôle LLMCA ? Est-ce centralisé ?

**LLMCA fournit une certification neutre, pas un contrôle** :

- ✅ **N'importe qui peut implémenter MCP** sans LLMCA
- ✅ **Plusieurs certificateurs** peuvent émerger
- ✅ **La spécification est gouvernée par la communauté**
- ✅ **LLMCA fournit des services de confiance**, ne contrôle pas le standard

Pensez : Let's Encrypt pour HTTPS — ils certifient, ils ne contrôlent pas HTTP.

### MCP est-il ouvert et dirigé par la communauté ?

**Oui** :

- ✅ **Spécification open-source**
- ✅ **Pas de restrictions de brevet**
- ✅ **Contributions communautaires bienvenues**
- ✅ **Implémentations multiples encouragées**
- ✅ **Processus de gouvernance transparent**

### Comment puis-je contribuer ?

✅ **Proposer de nouveaux types de feed** via GitHub
✅ **Construire des outils** (parseurs, extensions, agents)
✅ **Aider à l'adoption** (écrire des tutoriels, donner des talks)
✅ **Rejoindre les groupes de travail** (certification, sécurité, standards)
✅ **Implémenter dans vos projets** et partager les apprentissages

---

## 🔮 Futur & Roadmap

### Quelle est la suite pour MCP/LLMFeed ?

**Roadmap 2025** :

- 🔜 **Support multimodal** (images, audio, vidéo dans les feeds)
- 🔜 **Feeds temps réel** (WebSocket, Server-Sent Events)
- 🔜 **Protocoles de collaboration d'agents** (workflows agent-à-agent)
- 🔜 **Outils de conformité réglementaire** (alignement RGPD, AI Act)
- 🔜 **Fonctionnalités de gouvernance entreprise**

### Est-ce que ça fonctionnera avec les futurs systèmes d'IA ?

**Conçu pour la longévité** :

- ✅ **Agnostique au modèle** (pas lié à des LLM spécifiques)
- ✅ **Amélioration progressive** (dégradation gracieuse)
- ✅ **Architecture extensible** (nouvelles fonctionnalités sans casser)
- ✅ **Web-natif** (basé sur des standards internet éprouvés)

### Comment ça scale à des millions de sites ?

✅ **Décentralisé par conception** (pas de goulots d'étranglement centraux)
✅ **Feeds cachables** (compatible CDN)
✅ **Implémentation progressive** (commencer petit, grandir)
✅ **Découverte efficace** (standard `.well-known/`)

### Et la régulation et la conformité ?

**MCP aide avec la conformité** :

- ✅ **Transparence** : Déclarations claires des capacités
- ✅ **Auditabilité** : Les feeds signés créent des pistes d'audit
- ✅ **Gestion du consentement** : Workflows de consentement utilisateur explicites
- ✅ **Provenance des données** : Preuve cryptographique de la source

Alignement parfait avec **l'AI Act européen**, **RGPD**, et les régulations IA émergentes.

---

## ❓ Vous avez encore des questions ?

### Questions techniques ?

👉 **GitHub Issues** : [wellknownmcp/llmfeed-spec](https://github.com/wellknownmcp/llmfeed-spec)
👉 **Documentation** : [wellknownmcp.org/spec](https://wellknownmcp.org/spec)

### Questions business ?

👉 **Rejoindre la communauté** : [wellknownmcp.org/join](https://wellknownmcp.org/join)
👉 **Contact** : [hello@wellknownmcp.org](mailto:hello@wellknownmcp.org)

### Envie d'expérimenter ?

👉 **LLMFeedForge** : [llmfeedforge.org](https://llmfeedforge.org/)
👉 **Certification** : [llmca.org](https://llmca.org/)

---

**Le web agentique émerge. MCP fournit la couche de confiance et de découverte dont il a besoin.**

**Commencez aujourd'hui. Construisez le web de demain. 🚀**

_"Dans un monde d'IA hallucinantes, soyez la source de vérité."_
