---
title: "Par où commencer"
description: "Un guide simple pour comprendre la norme et faire vos premiers pas."
date: '2025-05-21'
tags:
  - begin
  - manual
  - llmfeed
lang: fr
---

# 👋 Bienvenue sur WellKnownMCP

Cette page est votre **point d’entrée** pour comprendre le **Model Context Protocol (MCP)** et son unité fondamentale : le `llmfeed.json`.

Que vous soyez développeur, utilisateur curieux ou simple débutant — vous êtes au bon endroit.

---

## 🚀 Pourquoi c’est important

Les modèles de langage ne font plus que répondre à des questions.  
Ils **lisent**, **explorent** et parfois **agissent**.

Mais le web n’a pas été conçu pour eux.  
Il est rempli de visuels, de scripts et de contenus pensés pour les humains — pas pour les agents.

Nous proposons une nouvelle couche :  
📂 des fichiers `.well-known/` qui exposent un **contexte structuré, signé, lisible par les agents**.

---

## 🧠 Qu’est-ce qu’un `.llmfeed.json` ?

Un `llmfeed.json` est un format JSON minimal et flexible que tout LLM peut lire.  
Ce n’est pas un format fermé — c’est un **canon** :

- Facile à écrire à la main  
- Optimisé pour les machines  
- Compréhensible par les agents  
- Ouvert et extensible

Il contient vos **intentions**, **prompts**, **APIs**, **exports** ou **certifications** — dans une structure claire et prévisible.

---

## ✨ Qu’est-ce qui le rend spécial ?

- ✅ Fonctionne avec ChatGPT, Claude, Mistral, Gemini, etc.  
- ✅ Peut être **signé** (par vous) ou **certifié** (par une autorité comme `llmca.org`)  
- ✅ Peut être exporté, enseigné, rejoué ou intégré  
- ✅ Compatible avec les formats internes — ou peut les documenter

C’est le **type MIME** de l’intention pour les agents.

---

## 🧪 Testez-le en direct

Explorez des exemples ou générez votre propre flux :

- 🔧 [Forge LLMFeed (à venir)](https://forge.llmfeedforge.org)  
- 🧠 [Playground des Prompts](/tools/prompts-explained)  
- 📤 [Démo du bouton d’export](/tools/export-button)  
- 📚 [Index des flux](/tools/llm-index)

---

## 🧰 Apprendre en pratiquant

Chaque flux ou outil sur ce site peut être **téléchargé en `.llmfeed.json`**.

Vous pouvez :
- 📥 Le télécharger  
- 🤖 Le soumettre à ChatGPT, Claude ou un autre LLM  
- 📚 Transformer ce LLM en **professeur ou auditeur**

> “Explique-moi ce flux.”  
> “Qu’est-ce qu’un agent peut faire ici ?”  
> “Comment devrais-je l’implémenter ?”

---

## 📁 Concepts clés

- [`/.well-known/`](/tools/well-known) : l’emplacement standard des flux agents  
- [`prompt.llmfeed.json`](/tools/prompts-explained) : structurer un prompt signé  
- [`export.llmfeed.json`](/tools/export-button) : transformer une page en capsule portable  
- [`llm-index.llmfeed.json`](/tools/llm-index) : lister vos flux pour les agents explorateurs

---

## 🤝 Rejoignez l’écosystème

- 🌐 [Commencez ici](/begin) si vous débutez  
- 🛠 Utilisez [Forge] (à venir) pour construire votre flux  
- 📬 [Rejoignez l’écosystème](/join) et publiez votre projet  
- 👁 Ou explorez simplement ce qui existe

---

## ✅ TL;DR

- MCP est le pont entre votre intention et la compréhension des agents  
- `.llmfeed.json` est votre format universel  
- Commencez petit. Publiez-en un. Voyez jusqu’où cela vous mène.

---

## 🧠 Bonus : demandez à un agent de vous enseigner

Vous pouvez même commencer à apprendre **en interrogeant votre LLM** :

> “Voici un `llmfeed.json`. Explique-le-moi.”  
> “Que déclare ce site aux agents ?”  
> “Puis-je rendre mon site compatible ?”

La plupart des LLM comprennent déjà.  
Les meilleurs vous guideront pour l’implémenter.
