---
lang: es
slug: how-to-make-your-site-agent-friendly
title: Cómo hacer que tu sitio sea compatible con agentes de IA mediante llmfeed.json
description: Una guía práctica para exponer un archivo llmfeed.json confiable que ayude a los agentes de IA y LLM a comprender y representar correctamente tu contenido.
tags:
  - llmfeed
  - mcp
  - tooling
  - agent-friendly
date: 2025-06-05
---

¿Cómo hacer que tu sitio sea compatible con agentes de IA?

Cada vez más LLMs y agentes de IA visitan sitios web para intentar comprender el contenido, resumir páginas e incluso recomendar enlaces automáticamente.  
Pero el HTML estándar + Schema.org ya no es suficiente.

**MCP / llmfeed.json ofrece una forma sencilla y poderosa de exponer explícitamente un contexto confiable que guía a los agentes de IA sobre cómo interpretar y utilizar tu sitio web.**

---

## 📄 ¿Qué es llmfeed.json?

Es un formato abierto (parte de la especificación MCP), expuesto en `.well-known/llm-index.llmfeed.json` o `.well-known/mcp.llmfeed.json`.

Su propósito es:

✅ Declarar explícitamente la estructura, propósito e intención del sitio  
✅ Describir las APIs o funcionalidades que ofrece el sitio  
✅ Proporcionar resúmenes y descripciones de páginas para uso de IA  
✅ Permitir firma y certificación para garantizar la confianza  
✅ Proteger ciertos contenidos de usos indebidos (mediante declaraciones de riesgo o permisos)

---

## 🤖 ¿Por qué lo necesitan los agentes de IA?

Hoy en día los LLMs infieren mucho sin información explícita, lo que genera problemas como:

⚠️ Malinterpretación del propósito de las páginas  
⚠️ Clasificación incorrecta del contenido  
⚠️ Generación errónea de enlaces / navegación  
⚠️ Uso indebido de datos no autorizados

**Con llmfeed.json puedes guiar a los agentes de IA para que comprendan correctamente tu sitio.**

---

## ✨ Ejemplo de llmfeed.json

    {
      "feed_type": "llm-index",
      "origin": "https://example.com",
      "metadata": {
        "title": "Sitio de ejemplo",
        "description": "Sitio de demostración que implementa el estándar MCP / LLMFeed.",
        "topics": ["IA", "estándar", "índice de sitio"]
      },
      "pages": [
        {
          "url": "/about",
          "title": "Acerca de nosotros",
          "description": "Conoce quiénes somos y por qué hemos creado este sitio."
        },
        {
          "url": "/products",
          "title": "Productos",
          "description": "Explora los productos y servicios que ofrecemos."
        }
      ]
    }

---

## ✅ Buenas prácticas

### 1️⃣ Exponer llm-index.llmfeed.json

👉 Exponer el feed en `.well-known/llm-index.llmfeed.json`.  
👉 Asegurarse de que los agentes de IA puedan acceder (código 200, sin bloqueo en robots.txt).

---

### 2️⃣ Proporcionar buenos metadatos

✅ Usar un `metadata` claro y conciso  
✅ Describir las páginas importantes en `pages`  
✅ Incluir `topics` para facilitar la clasificación

---

### 3️⃣ Firma (opcional)

✅ Si deseas que los agentes verifiquen la autenticidad, puedes firmar el feed con el bloque `trust` (ver extensión de firma MCP).

---

### 4️⃣ Actualización periódica

✅ Actualizar el feed en cada cambio importante  
✅ Mantener la coherencia entre sitemap y llmfeed

---

## 🚀 Herramientas recomendadas

Puedes usar:

- [LLMFeedForge.org](https://llmfeedforge.org) → generación gráfica y validación de llmfeed.json  
- `@wellknownmcp/client` → SDK para generación y validación automática

---

## 🌍 ¿Quién lo está usando?

Cada vez más agentes y LLMs están procesando llmfeed.json, incluyendo:

- Claude  
- GPT-4o  
- Microsoft NLWeb / Copilot  
- Meta Open Agents  
- Agentes de código abierto (AutoGPT, LangChain, etc.)  
- Agentes internos empresariales

---

## 🎁 Conclusión

**Publicar un llmfeed.json hace que tu sitio sea más amigable para los agentes de IA, aumenta la confiabilidad de tu contenido y protege tus intenciones.**

💡 En el futuro, los motores de búsqueda también priorizarán los sitios compatibles con MCP / llmfeed.json.

---

**Próximos pasos**:

✅ Genera tu llmfeed.json  
✅ Publícalo en `.well-known/`  
✅ Verifica → usa la herramienta de validación en [LLMCA.org](https://llmca.org)  
✅ Notifica las actualizaciones a los agentes mediante IndexNow / Sitemap

---

¡Haz tu contenido más accesible para los agentes de IA del futuro! 🚀
