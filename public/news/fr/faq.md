---
title: FAQ – MCP et LLMFeed
description: >-
  Réponses aux questions fréquentes sur le protocole MCP et l’écosystème
  LLMFeed, y compris ses différences avec le MCP d’Anthropic.
date: '2025-05-21'
tags:
  - ai-agents
  - anthropic
  - developers
  - llmfeed
  - mcp
  - trust
lang: fr
---

# ❓ Foire aux questions

---

## 🧠 GÉNÉRAL

**Qu’est-ce que le MCP, en termes simples ?**  
Le Model Context Protocol (MCP) permet aux sites web, applications et API de se présenter aux agents — de la même manière que les humains utilisent une interface visuelle, les agents utilisent des capsules `.llmfeed.json` structurées et signées.

**Quelle est la différence entre LLMFeed et MCP ?**  
LLMFeed est un format de fichier et un écosystème. MCP est une initiative plus large, initialement introduite par Anthropic, qui vise à permettre aux agents d’interagir avec des outils externes. LLMFeed fournit une implémentation MCP légère, signée et native aux agents.

**Pourquoi LLMFeed est-il “plus léger” que les autres conceptions MCP ?**  
Parce qu’il fonctionne uniquement avec des fichiers `.well-known` — pas besoin de SDK client, d’appels serveur complexes, ni d’infrastructure dédiée.

---

## 👩‍💻 POUR LES DÉVELOPPEURS

**Ai-je besoin d’un SDK ou d’une intégration ?**  
Non. Il suffit d’exposer un fichier JSON statique ou signé dans `.well-known/`.

**Et si mon flux est cassé ou non signé ?**  
Il sera lu, mais pas considéré comme fiable. L’agent demandera une confirmation ou basculera vers une interaction humaine.

**Puis-je restreindre une clé API à certaines fonctions ?**  
Oui — en utilisant `apicredential.llmfeed.json` et `mcp-api.llmfeed.json`.

**Les agents peuvent-ils simuler une application mobile ?**  
Oui — si vous exposez un `mobile-app.llmfeed.json`, l’agent peut reproduire les intentions et actions déclarées.

**Puis-je être découvert par un moteur de recherche ou un agent ?**  
Oui — utilisez `llm-index.llmfeed.json` pour déclarer vos points d’entrée.

**LLMFeed est-il adapté aux assistants ou apps mobiles ?**  
Absolument. Il prend en charge les prompts déclaratifs et les actions, même si votre système est vocal, mobile ou très minimal.

---

## 🧠 POUR LES AGENTS & LLM

**Un modèle a-t-il besoin d’un fine-tuning pour utiliser MCP ?**  
Non. Un LLM de base capable de lire du JSON et de suivre des instructions peut l’utiliser immédiatement.

**Comment décider si un contenu est fiable ?**  
Vérifiez le bloc `trust` : portée, certificateur, signature. Un flux avec `trust.scope: certified` est recommandé.

**Et si deux flux sont contradictoires ?**  
Suivez la priorité : signature > horodatage > proximité de la source.

**Un modèle sans fonctionnalités “agent” peut-il quand même utiliser ça ?**  
Oui — même un LLM simple peut résumer les capacités et intentions déclarées dans un flux.

---

## 🔐 CONFIANCE, VIE PRIVÉE & SÉCURITÉ

**Qui signe les flux ?**  
Le site lui-même ou une autorité comme `llmca.org`.

**Un flux peut-il divulguer des données privées ?**  
Les flux doivent être publiés explicitement. Les flux privés peuvent être restreints via un accès par identifiant ou jeton.

**Comment prévenir les abus d’agents ?**  
MCP encourage la déclaration explicite d’intentions, les limitations de fréquence, et les confirmations utilisateur. Un agent ne devrait agir que dans un cadre signé.

---

## 🧭 CAS D’USAGE STRATÉGIQUES (PAR PROFIL)

**Je suis un développeur indie. Pourquoi devrais-je m’y intéresser ?**  
Vous pouvez décrire ce que fait votre outil sans écrire de documentation complexe. Un seul fichier `.llmfeed.json` rend votre outil visible et exploitable par tous les agents.

**Je conçois un assistant IA.**  
MCP vous permet de structurer des limites claires et explicables. Plus d’hallucination, ni d’essai-erreur risqué.

**Je travaille dans un domaine réglementé (santé, finance).**  
Vous pouvez limiter ce que le flux expose, prévoir un fallback humain, et obtenir une certification (`trust.certifier = llmca.org`).

**Je développe une app mobile.**  
Avec `mobile-app.llmfeed.json`, votre app devient lisible par un agent — depuis votre site ou même une fiche App Store.

**Je suis enseignant, chercheur ou acteur civic tech.**  
MCP est un standard ouvert et inspectable. Vous pouvez l’enseigner, l’auditer, ou l’utiliser pour bâtir des agents de confiance.

---

## 🌍 INTEROPÉRABILITÉ & STRATÉGIE

**Est-ce compatible avec le MCP d’Anthropic ?**  
Oui — LLMFeed est aligné avec l’esprit du MCP d’Anthropic, mais il est plus léger, décentralisé et basé sur des fichiers.

**Qu’est-ce qui rend LLMFeed plus accessible ?**  
- Aucun serveur requis  
- Fonctionne avec `.well-known`  
- Intègre la signature et la notion de confiance

**Que propose LLMFeed en plus du MCP ?**  
- `mobile-app.llmfeed.json`  
- `credential.llmfeed.json`  
- `mcp-api.llmfeed.json`  
- `session-feed.llmfeed.json` (bientôt)  
- Une spécification du comportement agent  
- Des outils visuels et un système de certification

---

## 🧩 ENVIE D’ALLER PLUS LOIN ?

- Découvrez [l’outil Preview](/llmfeedhub/preview)  
- Rejoignez [l’écosystème](/ecosystem)  
- Explorez [Agent Behaviour](/tools/agent-behaviour)  
- Consultez [la spéc complète](/spec)
