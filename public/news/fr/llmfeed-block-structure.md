---
title: "Anatomie d’un LLMFeed — Bloc par bloc"
description: "Comprendre comment chaque bloc d’un .llmfeed.json fonctionne et comment concevoir votre propre flux."
date: '2025-05-21'
tags:
  - guide
  - structure
  - llmfeed
lang: fr
---

# 🧱 Les blocs qui composent un flux

Chaque fichier `.llmfeed.json` est composé de **blocs structurés**. Voici comment les comprendre et les utiliser :

## 🔹 `feed_type`
Déclare la finalité du flux (`prompt`, `export`, `session`, `mobile-app`, `mcp`, etc.)

## 🔹 `metadata`
Contient les informations d’origine, description, titre, tags, type de contenu...

## 🔹 `trust`
Indique à l’agent ce qui est signé, qui l’a signé, et quelle est la portée de confiance.

## 🔹 `signature`
Preuve cryptographique via Ed25519 — protège uniquement les `signed_blocks`.

## 🔹 `certification`
Optionnel — ajoute une validation par une tierce partie (ex. : `llmca.org`), avec vérification du hash de signature.

Commencez simplement. Vous pouvez construire votre flux bloc par bloc.  
Et utiliser des agents ou des outils pour vous aider à le valider.
