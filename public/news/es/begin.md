---
title: "Por dónde empezar"
description: "Una guía sencilla para comprender el estándar y dar tus primeros pasos."
date: '2025-05-21'
tags:
  - begin
  - manual
  - llmfeed
lang: es
---

# 👋 Bienvenido a WellKnownMCP

Esta página es tu **punto de partida** para entender el **Model Context Protocol (MCP)** y su unidad fundamental: `llmfeed.json`.

Tanto si eres desarrollador, un usuario curioso o simplemente estás empezando, estás en el lugar correcto.

---

## 🚀 ¿Por qué es importante?

Los modelos de lenguaje ya no solo responden preguntas.  
Ahora **leen**, **exploran** y a veces incluso **actúan**.

Pero la web no fue diseñada para ellos.  
Está llena de interfaces visuales, scripts y contenidos pensados para humanos, no para agentes.

Proponemos una nueva capa:  
📂 Archivos `.well-known/llmfeed.json` que exponen **contexto estructurado, firmado y legible por agentes**.

---

## 🧠 ¿Qué es un `.llmfeed.json`?

Un `llmfeed.json` es un formato JSON mínimo y flexible que cualquier LLM puede leer.  
No es un formato cerrado: es un **canon**:

- Fácil de escribir a mano  
- Optimizado para máquinas  
- Comprensible por agentes  
- Abierto y extensible

Contiene tus **intenciones**, **prompts**, **APIs**, **exportaciones** o **certificaciones** en una estructura clara y predecible.

---

## ✨ ¿Qué lo hace especial?

- ✅ Funciona con ChatGPT, Claude, Mistral, Gemini, etc.  
- ✅ Puede estar **firmado** (por ti) o **certificado** (por una autoridad como `llmca.org`)  
- ✅ Se puede exportar, enseñar, reusar o integrar  
- ✅ Compatible con formatos internos o para documentarlos

Es el **tipo MIME de intención** para agentes.

---

## 🧪 Pruébalo en vivo

Explora ejemplos o genera tu propio feed:

- 🔧 [Forge LLMFeed (próximamente)](https://forge.llmfeedforge.org)  
- 🧠 [Zona de experimentación de Prompts](/tools/prompts-explained)  
- 📤 [Demostración del botón de exportación](/tools/export-button)  
- 📚 [Índice de feeds](/tools/llm-index)

---

## 🧰 Aprende practicando

Todo feed o herramienta en este sitio puede descargarse como `.llmfeed.json`.

Puedes:
- 📥 Descargarlo  
- 🤖 Enviárselo a ChatGPT, Claude u otro LLM  
- 📚 Convertir ese LLM en tu **profesor o auditor**

> “Explícame este feed.”  
> “¿Qué puede hacer un agente aquí?”  
> “¿Cómo lo implemento?”

---

## 📁 Conceptos clave

- [`/.well-known/`](/tools/well-known): ubicación estándar para feeds de agentes  
- [`prompt.llmfeed.json`](/tools/prompts-explained): estructura de un prompt firmado  
- [`export.llmfeed.json`](/tools/export-button): convierte una página en una cápsula portátil  
- [`llm-index.llmfeed.json`](/tools/llm-index): lista tus feeds para descubrimiento de agentes

---

## 🤝 Únete al ecosistema

- 🌐 [Empieza aquí](/begin) si eres nuevo  
- 🛠 Usa [Forge] (próximamente) para construir tu feed  
- 📬 [Únete al ecosistema](/join) y publica tu proyecto  
- 👁 O simplemente explora lo que ya existe

---

## ✅ TL;DR

- MCP es el puente entre tu intención y la comprensión del agente  
- `.llmfeed.json` es tu formato universal  
- Comienza con algo pequeño. Publica uno. Ve hasta dónde puede llevarte.

---

## 🧠 Bonus: deja que un agente te enseñe

Incluso puedes aprender **haciendo preguntas a tu LLM**:

> “Aquí hay un `llmfeed.json`. Explícamelo.”  
> “¿Qué declara este sitio a los agentes?”  
> “¿Puedo hacer mi sitio compatible?”

La mayoría de los LLMs ya lo entienden.  
Los mejores incluso pueden ayudarte a implementarlo.
