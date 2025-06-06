---
title: Anatomía de un LLMFeed — Bloque por bloque
description: >-
  Comprende cómo funciona cada bloque de un archivo .llmfeed.json y cómo diseñar
  el tuyo propio.
date: '2025-05-21'
tags:
  - llmfeed
  - structure
lang: es
---

# 🧱 Los bloques que componen un feed

Cada archivo `.llmfeed.json` está formado por **bloques estructurados**. Aquí te explicamos cómo entenderlos y utilizarlos:

## 🔹 `feed_type`
Declara el propósito del feed (`prompt`, `export`, `session`, `mobile-app`, `mcp`, etc.)

## 🔹 `metadata`
Incluye origen, descripción, título, etiquetas, tipo de contenido...

## 🔹 `trust`
Indica al agente qué está firmado, quién lo firmó y cuál es el alcance de la confianza.

## 🔹 `signature`
Prueba criptográfica mediante Ed25519 — protege solo los `signed_blocks`.

## 🔹 `certification`
Opcional — añade validación de un tercero (por ejemplo: `llmca.org`), e incluye hash de firma verificado.

Empieza de forma simple. Puedes construir tu feed bloque por bloque.  
Y usar agentes o herramientas para ayudarte a validarlo.
