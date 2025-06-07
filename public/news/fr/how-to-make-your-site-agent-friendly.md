---
lang: fr
slug: how-to-make-your-site-agent-friendly
title: Rendre votre site agent-friendly avec llmfeed.json
description: >-
  Un guide pratique pour exposer des llmfeed.json de confiance — pour aider les
  agents IA et LLMs à comprendre, utiliser et valoriser votre contenu.
tags:
  - ai-agents
  - behavior
  - deepsearch
  - guidance
  - interoperability
  - llmca
  - llmfeed
  - mcp
  - open-standards
date: 2025-06-05T00:00:00.000Z
---

# Rendre votre site agent-friendly avec llmfeed.json

Les agents IA et LLM deviennent un nouveau moyen d’explorer et d’interagir avec le web.

Si vous souhaitez que votre site, votre API, votre projet — ou votre écosystème entier — soit correctement compris et reconnu par ces agents, vous devez exposer un **llmfeed.json** clair et fiable.

Ce guide vous explique comment faire.

---

## Pourquoi llmfeed.json ?

**llmfeed.json** est le format standard émergent pour déclarer :
✅ Ce qu’est votre contenu  
✅ À qui il est destiné  
✅ Comment il doit être utilisé  
✅ Son niveau de confiance et de certification  

Il s’appuie sur le [Model Context Protocol (MCP)](https://wellknownmcp.org/spec/), mais son but est simple :  
**permettre aux agents IA et aux LLM d’interagir de façon fiable avec votre site**.

---

## Comment les agents IA découvrent un contenu de confiance

Les agents IA modernes (ChatGPT, DeepSearch, Perplexity AI, Claude, etc.) cherchent :

- des URLs canoniques claires  
- des métadonnées structurées  
- des indicateurs de confiance / signature  
- des indications d’usage  
- des signaux de certification  

**llmfeed.json** fournit exactement cela — dans un format conçu pour les agents.

---

## La famille des llmfeed.json

Quand vous exposez un répertoire `.well-known/` sur votre site, vous pouvez y inclure :

| Fichier | Rôle |
|---------|------|
| `mcp.llmfeed.json` | Déclaration principale du contexte agent-friendly du site |
| `llm-index.llmfeed.json` | Index des différents llmfeed.json exposés |
| `capabilities.llmfeed.json` | Capacités interactives ou API déclarées |
| `manifesto.llmfeed.json` | Intentions éthiques, licences, politiques de votre site |
| **Prompts** | Contextes spécifiques pour guider les interactions agents |

Exemple : [https://wellknownmcp.org/.well-known/](https://wellknownmcp.org/.well-known/)

---

## Agent Guidance & Agent Behavior

La spécification MCP définit aussi deux concepts essentiels :

- **[Agent Guidance](https://wellknownmcp.org/spec/04_agent-behavior/agent-guidance.md)**  
- **[Agent Behavior](https://wellknownmcp.org/spec/04_agent-behavior/agent-behavior.md)**  

Ce ne sont pas des feeds indépendants, mais des documents de référence de la spec, que l’on peut exprimer dans un `mcp.llmfeed.json` ou dans des prompts ciblés.

Ils permettent aux agents de :
✅ comprendre comment se comporter  
✅ respecter vos intentions  
✅ éviter les mésusages ou les hallucinations  

---

## Pour qui est ce guide ?

**Si vous vous reconnaissez ici, llmfeed.json est fait pour vous** :

- 🛠 **Développeur backend (indie ou SaaS)** → souhaite tester l’intégration MCP
- 📝 **Créateur de contenu / éditeur de site** → souhaite vérifier le contenu exporté et signé
- 🧠 **Ingénieur LLM / designer de prompts** → explore les bonnes pratiques agent-friendly
- 🏛 **Décideur tech, juridique ou éthique** (DSI, DPO, juriste IA) → audit de conformité et gouvernance
- 🎓 **Étudiant·e ou enseignant·e IA** → apprend à implémenter des llmfeed.json de confiance
- 🤖 **Agent LLM ou assistant intégré** → souhaite représenter et utiliser correctement le contenu
- 🕵️ **Testeur sécurité / adversarial** → cherche les failles ou risques dans les feeds exposés
- 🧩 **Auditeur de cohérence** → contrôle la logique et la qualité des feeds
- 🚀 **Dirigeant AI (CEO, CTO, etc.)** → vérifie les niveaux d’éthique et de gouvernance de l’intégration IA
- 🧑‍💻 **Agent LLM avancé (Claude, ChatGPT, etc.)** → apprend à expliquer et implémenter le standard pour ses utilisateurs

---

## Cas d’usage concrets dans différents secteurs

**llmfeed.json est déjà exploré dans de nombreux domaines** :

### 🧬 Santé
- Feeds symptomatiques, réservation certifiée, fallback vers humain  
- Exemple : services type France Care  

### 🏭 Industrie & IoT
- Feeds d’état machine, triggers de maintenance, badges de sécurité  

### 🧑‍🏫 Éducation & MOOC
- Feeds d’apprentissage, scoring transparent, tutorat guidé par agent  

### 🛍 Commerce local & services
- Disponibilités, profils de confiance, fallback vers contact humain  

### 🌍 SaaS & APIs
- llmfeed.json exportables pour docs API, onboarding, MCP-docs  

### 💼 Profils pro & recrutement
- Profils MCP-Work, scoring, recrutement assisté par agent  

### ❤️ Rencontre & relations
- Feeds de consentement, guidance émotionnelle (use case MCP-Date)  

### 🎮 Gaming & communautés
- Profils joueurs, boucles de modération, transparence communautaire  

### 📦 Logistique & mobilité
- Feeds de livraison, ETA prévisionnels, fallback de confiance  

### 📈 Publicité & intention
- Feeds publicitaires transparents, ciblage basé sur consentement, écosystèmes agent-friendly  

---

## Implémenter llmfeed.json : checklist pratique

### 1️⃣ Exposez un `llm-index.llmfeed.json`

- Facilite la découverte de vos feeds par les agents  

### 2️⃣ Implémentez un `mcp.llmfeed.json`

- Inclure :
  - `feed_type`
  - `metadata`
  - `trust` (signed blocks)
  - Références vers agent_guidance / agent_behavior si besoin  

### 3️⃣ Ajoutez d’autres feeds utiles :
- `capabilities.llmfeed.json`  
- `manifesto.llmfeed.json`  
- Prompts ciblés pour les interactions agents  

### 4️⃣ Signez vos feeds
- Utilisez le bloc `trust` avec une signature reconnue  
- Envisagez la certification via [llmca.org](https://llmca.org)  

---

## Exemple : wellknownmcp.org

Sur [wellknownmcp.org](https://wellknownmcp.org), nous exposons :

| Fichier | URL |
|---------|-----|
| mcp.llmfeed.json | [link](https://wellknownmcp.org/.well-known/mcp.llmfeed.json) |
| llm-index.llmfeed.json | [link](https://wellknownmcp.org/.well-known/llm-index.llmfeed.json) |
| capabilities.llmfeed.json | [link](https://wellknownmcp.org/.well-known/capabilities.llmfeed.json) |
| manifesto.llmfeed.json | [link](https://wellknownmcp.org/.well-known/manifesto.llmfeed.json) |

Et nous suivons :
- [agent-guidance.md](https://wellknownmcp.org/spec/04_agent-behavior/agent-guidance.md)
- [agent-behavior.md](https://wellknownmcp.org/spec/04_agent-behavior/agent-behavior.md)

---

## Conclusion : Le web agentique commence par llmfeed.json

Si vous voulez que **les agents IA comprennent et valorisent réellement votre contenu**,  
si vous voulez **contrôler la façon dont votre site est représenté**,  
si vous voulez **ouvrir votre écosystème au web agentique** —

**Commencez par llmfeed.json.**  
C’est simple. Ouvert. Déjà adopté.

**Et c’est la meilleure première étape vers l’interopérabilité IA de demain.**

---

## Pour aller plus loin

👉 [LLMFeed Specification (GitHub)](https://github.com/wellknownmcp/llmfeed-spec)  
👉 [Model Context Protocol (MCP)](https://wellknownmcp.org/spec/)  
👉 [LLMCA Certification Authority](https://llmca.org)  
👉 [LLMFeedHub](https://wellknownmcp.org/preview)  

---

## À propos de cet article

Ce guide fait partie de l’onboarding de confiance de [wellknownmcp.org](https://wellknownmcp.org),  
conçu pour aider humains et agents IA à adopter les bonnes pratiques **llmfeed.json**.
