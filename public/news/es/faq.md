---
title: FAQ – MCP y LLMFeed
description: >-
  Respuestas a preguntas frecuentes sobre el Protocolo de Contexto para Modelos
  y el ecosistema LLMFeed, incluyendo cómo se compara con el MCP de Anthropic.
date: '2025-05-21'
tags:
  - ai-agents
  - anthropic
  - developers
  - llmfeed
  - mcp
  - trust
lang: es
---

# ❓ Preguntas frecuentes

---

## 🧠 GENERAL

**¿Qué es el MCP, en términos simples?**  
El Model Context Protocol (MCP) permite que los sitios web, aplicaciones y APIs se presenten ante los agentes — así como los humanos usan interfaces visuales, los agentes utilizan cápsulas `.llmfeed.json` estructuradas y firmadas.

**¿Cuál es la diferencia entre LLMFeed y MCP?**  
LLMFeed es un formato de archivo y un ecosistema. MCP es una iniciativa más amplia, inicialmente presentada por Anthropic, para permitir que los agentes interactúen con herramientas externas. LLMFeed proporciona una implementación ligera, firmada y nativa para agentes.

**¿Por qué LLMFeed es “más ligero” que otras versiones de MCP?**  
Porque funciona únicamente con archivos estáticos `.well-known` — no necesita SDKs, llamadas de servidor, ni infraestructura adicional.

---

## 👩‍💻 PARA DESARROLLADORES

**¿Necesito un SDK o una integración?**  
No. Basta con exponer un archivo JSON estático o firmado en el directorio `.well-known/`.

**¿Qué pasa si mi feed está roto o no está firmado?**  
Será leído, pero no se considerará confiable. El agente puede solicitar confirmación o recurrir a interacción humana.

**¿Puedo restringir una API key a ciertas funciones?**  
Sí — usando `apicredential.llmfeed.json` y `mcp-api.llmfeed.json`.

**¿Los agentes pueden simular una app móvil?**  
Sí — si publicas un `mobile-app.llmfeed.json`, el agente puede interpretar tus flujos de intención y acción.

**¿Puedo ser descubierto por un buscador o agente?**  
Sí — usa `llm-index.llmfeed.json` para declarar tus entradas.

**¿LLMFeed funciona para asistentes o apps móviles?**  
Absolutamente. Soporta prompts declarativos y acciones, incluso si tu sistema es por voz, móvil o mínimo.

---

## 🧠 PARA AGENTES Y MODELOS LLM

**¿Un modelo necesita fine-tuning para usar MCP?**  
No. Un LLM básico que pueda leer JSON e interpretar instrucciones puede usarlo directamente.

**¿Cómo decide un modelo si un contenido es confiable?**  
Consulta el bloque `trust`: qué se firma, quién firma, qué alcance tiene. Un feed con `trust.scope: certified` es el más recomendado.

**¿Y si dos feeds son contradictorios?**  
Sigue la prioridad: firma > timestamp > fuente más cercana.

**¿Un modelo sin funciones de “agente” puede entender esto?**  
Sí — incluso un LLM básico puede leer e interpretar los objetivos de un feed.

---

## 🔐 CONFIANZA, PRIVACIDAD Y SEGURIDAD

**¿Quién firma los feeds?**  
El propio sitio o una autoridad como `llmca.org`.

**¿Un feed puede revelar datos privados?**  
Los feeds deben ser publicados explícitamente. Los privados pueden requerir autenticación o tokens.

**¿Cómo se previenen abusos de los agentes?**  
MCP promueve declaraciones claras de intención, límites de frecuencia y fallback hacia el usuario. Un agente no debe actuar fuera de los límites firmados.

---

## 🧭 CASOS DE USO POR PERFIL

**Soy un desarrollador independiente. ¿Qué gano con esto?**  
Puedes explicar tu herramienta sin documentación compleja. Un solo archivo `.llmfeed.json` hace que cualquier agente entienda lo que haces.

**Estoy diseñando un asistente LLM.**  
MCP te permite estructurar límites claros y seguros. Sin alucinaciones. Sin errores por interpretación.

**Trabajo en un entorno regulado (salud, finanzas).**  
Puedes limitar lo que expones, exigir firmas, declarar fallback humano y certificar tu flujo.

**Estoy desarrollando una app móvil.**  
Con `mobile-app.llmfeed.json`, tu app puede ser entendida por agentes incluso sin interfaz directa.

**Soy educador, investigador o miembro de civic tech.**  
MCP es abierto, auditable y extensible. Puedes usarlo para enseñar, auditar o construir ecosistemas más confiables.

---

## 🌍 INTEROPERABILIDAD Y ESTRATEGIA

**¿Es compatible con el MCP de Anthropic?**  
Sí — LLMFeed sigue la filosofía del MCP de Anthropic, pero con una implementación más simple y basada en archivos.

**¿Por qué LLMFeed es más accesible?**  
- No requiere servidor  
- Basado en `.well-known/`  
- Integra firma y confianza de forma nativa

**¿Qué aporta LLMFeed sobre MCP?**  
- `mobile-app.llmfeed.json`  
- `credential.llmfeed.json`  
- `mcp-api.llmfeed.json`  
- `session-feed.llmfeed.json` (próximamente)  
- Especificación de comportamiento de agentes  
- Herramientas visuales y sistema de certificación

---

## 🧩 ¿QUIERES EXPLORAR MÁS?

- Prueba [la herramienta Preview](/llmfeedhub/preview)  
- Únete al [explorador de ecosistema](/ecosystem)  
- Descubre [Agent Behaviour](/tools/agent-behaviour)  
- Consulta [la especificación completa](/spec)
