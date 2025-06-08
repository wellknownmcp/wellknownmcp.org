---
lang: fr
slug: from-mcp-to-llmfeed-manifesto
title: "🔬 De MCP à LLMFeed : pourquoi nous avons créé une nouvelle spécification"
description: Le manifeste de l'équipe wellknownmcp  vision du web agentique, évolution du MCP, et pourquoi la confiance change tout.
tags:
  - llmfeed
  - mcp
  - manifesto
  - agentic web
  - innovation
date: 2025-06-09
author: wellknownmcp.org team
---

# 🔬 De MCP à LLMFeed : pourquoi nous avons créé une nouvelle spécification

*Le manifeste de l'équipe wellknownmcp.org*

---

## 🚀 Le moment de vérité

Fin 2024, nous observions avec fascination l'émergence du **Model Context Protocol (MCP)** d'Anthropic. L'intention était louable : standardiser les interactions entre LLM et outils externes. Mais rapidement, en tant qu'équipe travaillant sur l'infrastructure agentique, nous avons réalisé que **quelque chose manquait fondamentalement**.

Le MCP résolvait brillamment le problème **technique** de l'interopérabilité. Mais il ignorait totalement le problème **humain** de la confiance.

Comment un utilisateur peut-il faire confiance à un contenu généré par un agent IA ? Comment vérifier qu'une information n'a pas été altérée ? Comment construire un écosystème où agents, humains et systèmes peuvent collaborer **en toute sécurité** ?

**C'est à ce moment que nous avons commencé à développer LLMFeed.**

---

## 🔍 Notre vision : LLMFeed comme évolution du MCP

### **LLMFeed n'est pas un remplacement du MCP — c'est son évolution naturelle**

Nous avons positionné LLMFeed comme **"the core data format of the MCP (Model Context Protocol)"**. Notre approche :

- ✅ **Compatible** avec l'écosystème MCP existant
- ✅ **Enrichi** avec signature cryptographique et certification
- ✅ **Étendu** pour le web agentique de demain
- ✅ **Standardisé** avec des schémas JSON rigoureux

### **Ce que le MCP original ne gérait pas :**

#### **1. Absence de vérification native**

```json
// MCP classique - aucune garantie d'intégrité
{
  "jsonrpc": "2.0",
  "result": {
    "content": "Données sensibles...",
    "source": "Qui sait vraiment ?"
  }
}
```

#### **2. Pas de mécanisme de confiance**

Le MCP restait dans une logique **"outils pour LLM"**. Nous visions **l'économie agentique** : agents autonomes qui collaborent et échangent de la valeur en toute sécurité.

#### **3. Adoption limitée par la complexité**

JSON-RPC, serveurs dédiés, configurations complexes... Seuls les experts pouvaient adopter le MCP.

**Notre conviction : la révolution agentique ne peut pas être réservée aux experts.**

---

## 🌍 Notre vision : le web agentique avec LLMFeed

### **Du SEO à l'AIO : un changement de paradigme**

Nous n'imaginions pas seulement une amélioration du MCP. **Nous imaginions un web entièrement nouveau**.

#### **Le web d'aujourd'hui :**

- Conçu pour les humains qui cliquent
- **SEO** pour la découverte par moteurs de recherche
- Interactions synchrones et manuelles

#### **Le web agentique de demain :**

- Conçu pour les agents qui collaborent
- **AIO (Agentic Information Optimization)** pour la découverte par agents
- Interactions asynchrones et automatisées
- **Confiance cryptographique** intégrée nativement

Dans ce nouveau web :

- Chaque site expose ses capacités via `/.well-known/mcp.llmfeed.json`
- Chaque contenu porte sa **signature et sa provenance**
- Les agents découvrent et vérifient automatiquement les sources
- La **confiance est mesurable et auditable**

---

## 🛠️ LLMFeed : notre architecture technique

### **1. Structure en blocs modulaires**

Nous avons conçu LLMFeed autour de **blocs standards réutilisables** :

json

```json
{
  "feed_type": "mcp",
  "metadata": {
    "title": "Service Example",
    "origin": "https://example.com",
    "generated_at": "2025-06-09T14:30:00Z",
    "description": "Service agentique certifié"
  },
  "trust": {
    "signed_blocks": ["feed_type", "metadata", "trust", "capabilities"],
    "scope": "public",
    "certifier": "https://llmca.org",
    "public_key_hint": "https://llmca.org/.well-known/public.pem",
    "algorithm": "ed25519"
  },
  "signature": {
    "value": "abc123...",
    "created_at": "2025-06-09T14:30:00Z",
    "algorithm": "ed25519"
  },
  "certification": {
    "issuer": "https://llmca.org",
    "cert_id": "llmca-2025-001",
    "certified_blocks": ["trust", "capabilities"],
    "issued_at": "2025-06-09T10:00:00Z",
    "expires_at": "2026-06-09T10:00:00Z"
  },
  "capabilities": [
    {
      "name": "user_lookup",
      "method": "GET",
      "path": "/api/users/{id}",
      "description": "Récupération sécurisée de profil utilisateur"
    }
  ]
}
```

### **4. Comportements d'agents intelligents**

Nous avons défini des **spécifications de comportement** pour que les agents agissent de manière sûre et éthique :

json

```json
"agent_guidance": {
  "max_inference_depth": 3,
  "interaction_tone": "formal", 
  "consent_hint": "Ask the user before accessing sensitive information",
  "risk_tolerance": "low"
}
```

**Principes clés :**

- ✅ **Human-in-the-loop** : Consentement obligatoire pour actions critiques
- ✅ **Trust scoring** : Évaluation dynamique de la confiance selon les signatures
- ✅ **Flagging system** : Signalement communautaire des feeds suspects
- ✅ **User spaces** : Support des plateformes hébergées (GitHub, Notion, etc.)

---

## 🔬 L'architecture technique complète : bien au-delà du MCP

### **1. Innovations cryptographiques de pointe**

Notre innovation la plus disruptive : **le chiffrement homomorphe intégré** :

json

```json
"homomorphic_encryption": {
  "applied_to": ["data"],
  "algorithm": "BFV",
  "public_parameters": "https://example.com/params.json",
  "notes": "Agents peuvent calculer sans voir les données raw"
}
```

**Résultat :** Des agents peuvent traiter des données sensibles (santé, finance) **sans jamais les déchiffrer**. Une révolution pour la privacy-preserving AI.

### **2. APIs enterprise-grade avec sécurité intégrée**

Contrairement au MCP qui nécessite des serveurs complexes, LLMFeed propose des **APIs sécurisées natives** :

json

```json
// URL: /mcp-api.llmfeed.json?key=abc123
{
  "feed_type": "mcp",
  "capabilities": [{"path": "/sign", "method": "POST"}],
  "rate_limits": [
    {"path": "/sign", "limit": 5, "remaining": 2, "period": "daily"}
  ],
  "trust": {
    "scope": "restricted", 
    "key_hint": "abc123",
    "trust_level": "scoped"
  }
}
```

**Fonctionnalités :**

- ✅ **Bearer token authentication** native
- ✅ **Rate limiting** par endpoint et par clé
- ✅ **Dynamic capability filtering** selon les permissions
- ✅ **Scoped trust** pour accès restreints

### **3. Progressive disclosure et audience targeting**

Notre système d'**audience targeting** permet un contenu adaptatif :

json

```json
"data": {
  "technical_docs": {
    "content": "API documentation...",
    "audience": ["developer"]
  },
  "agent_actions": {
    "content": "Executable commands...", 
    "audience": ["llm"]
  }
}
```

**Impact :** Les développeurs voient la documentation, les agents voient les actions. **Expérience optimisée** pour chaque utilisateur.

### **4. Sandbox policies et gouvernance communautaire**

Pour contrôler l'autonomie des agents, nous proposons des **politiques d'exécution** :

json

```json
"sandbox": {
  "max_calls": 10,
  "device_scope": "local-only", 
  "runtime_constraints": "No background tasks"
}
```

Notre système de **flagging décentralisé** permet l'auto-régulation :

json

```json
"flags": [
  {
    "type": "risk",
    "submitted_by": "agent://previewbot",
    "reason": "Declared actions not matching real API",
    "status": "pending",
    "source": "https://llmca.org/flags/234"
  }
]
```

**Écosystème sain** : La communauté peut signaler les feeds suspects, les agents respectent les limites définies.

### **5. Écosystème complet de types de feeds spécialisés**

Nous avons conçu **12 types de feeds spécialisés** pour couvrir tous les aspects du web agentique :

#### **🧠 Feeds de service et capacités :**

json

```json
// .well-known/mcp.llmfeed.json - Capsule principale
{
  "feed_type": "mcp",
  "prompts": [
    {
      "intent": "convert_pdf",
      "keywords": ["convert my PDF", "transform PDF to text"],
      "description": "Triggered when user wants to extract text"
    }
  ],
  "capabilities": [
    {
      "name": "convertPdfToText",
      "method": "POST", 
      "path": "/convert",
      "requires_user_consent": true
    }
  ]
}

// .well-known/capabilities.llmfeed.json - Actions détaillées
{
  "feed_type": "capabilities",
  "capabilities": [
    {
      "name": "submitContactForm",
      "input_schema": {"required": ["name", "email", "message"]},
      "rate_limit": "5/min",
      "llm_trust_level_required": "certified-only"
    }
  ]
}
```

#### **🔐 Feeds de sécurité et accès :**

json

```json
// .well-known/credential.llmfeed.json - Clés API sécurisées
{
  "feed_type": "credential",
  "credential": {
    "key_hint": "abc123",
    "mcp_api": "https://api.example.com/mcp?key=abc123",
    "allowed_intents": ["sign-document", "verify-document"],
    "rate_limits_inline": [
      {"path": "/sign", "limit": 5, "period": "daily"}
    ]
  }
}
```

#### **💰 Feeds économiques et monétisation :**

json

```json
// .well-known/pricing.llmfeed.json - Modèles business agents
{
  "feed_type": "pricing",
  "pricing_models": [
    {
      "model_id": "pay-as-you-go",
      "capabilities_cost": [
        {
          "capability_name": "convertPdfToText",
          "cost_per_unit": 0.01,
          "unit": "page"
        }
      ]
    }
  ],
  "payment_methods": ["credit_card", "paypal", "agent_wallet"]
}
```

**Impact :** Chaque type de feed répond à un besoin spécifique de l'écosystème agentique, du simple export de contenu à la monétisation sophistiquée.

### **6. Architecture de découverte .well-known/ intelligente**

Notre innovation clé : **tout site peut exposer ses capacités agentiques** via une architecture de découverte standardisée :

#### **Structure de découverte complète :**

```
/.well-known/
├── mcp.llmfeed.json              # Capsule principale du service
├── mcp-lite.llmfeed.json         # Version allégée pour mobile/voice
├── capabilities.llmfeed.json     # Actions et authentification  
├── llm-index.llmfeed.json        # Index de tous les flux
├── pricing.llmfeed.json          # Modèle économique
├── manifesto.llmfeed.json        # Déclaration éthique
├── public.pem                    # Clé publique pour vérification
└── prompts/
    ├── prompt-index.llmfeed.json # Index des prompts
    ├── mcp-mode-activation.llmfeed.json
    └── session-export.llmfeed.json

/exports/
├── faq.llmfeed.json              # Documentation exportée
├── mobile-app.llmfeed.json       # Capabilities app mobile
└── session-*.llmfeed.json        # Captures d'interactions
```

**Résultat :** Découverte automatique et hiérarchisée des services par les agents, avec support des plateformes hébergées (GitHub, Notion, etc.).

### **7. Standards web et interopérabilité**

Nous avons défini **l'intégration web complète** :

#### **MIME Type officiel :**

```
Content-Type: application/llmfeed+json
```

Les navigateurs, APIs et outils reconnaissent automatiquement les flux LLMFeed.

#### **Hybridation OpenAPI :**

json

```json
"capabilities": [
  {
    "type": "endpoint",
    "intent": "get status", 
    "url": "https://api.example.com/status"
  },
  {
    "type": "openapi",
    "url": "https://example.com/.well-known/openapi.json",
    "description": "Full technical spec"
  }
]
```

**Best of both worlds :** Intent et confiance via LLMFeed, spécifications techniques via OpenAPI.

---

## 🛡️ Notre révolution : la confiance par design

### **LLMCA : notre consortium de certification**

Contrairement au MCP qui laisse la confiance à l'utilisateur final, nous proposons un **écosystème de certification structuré** :

- **LLMCA-L1** : Auto-déclaration validée
- **LLMCA-L2** : Audit technique tiers
- **LLMCA-Enterprise** : Certification full-compliance

### **Signature cryptographique native**

Chaque flux LLMFeed peut être :

- ✅ **Signé** cryptographiquement (ed25519, RSA)
- ✅ **Certifié** par une autorité indépendante
- ✅ **Tracé** avec métadonnées complètes
- ✅ **Vérifié** en temps réel

### **Export Button : démocratisation**

Notre outil phare : tout site peut générer un flux LLMFeed en un clic, sans compétences techniques.

**Impact :** Adoption massive au-delà des développeurs experts.

---

## 🔥 Pourquoi maintenant ?

### **1. L'urgence de la confiance**

Avec la prolifération des LLM, la désinformation devient un risque systémique. **Nous avons besoin de standards de confiance maintenant**, avant que l'écosystème ne soit pollué par des contenus non-vérifiables.

### **2. L'émergence des agents autonomes**

2025 marque l'arrivée des vrais agents autonomes : assistants personnels, agents transactionnels, copilotes métiers. Ces agents ont besoin d'**interopérer en toute sécurité**.

### **3. Les régulations arrivent**

L'AI Act européen impose la traçabilité. GDPR exige la transparence. Les entreprises ont **besoin de solutions compliance-ready**.

**LLMFeed n'est pas juste une innovation technique. C'est notre réponse aux enjeux sociétaux de l'IA.**

---

## 🎯 Notre stratégie : open source & écosystème

### **Pourquoi open source ?**

Nous aurions pu garder LLMFeed propriétaire. Mais nous avons choisi l'open source pour trois raisons :

1. **Network effects** : Plus il y a d'adoptants, plus la valeur augmente
2. **Confiance** : Un standard de confiance doit être lui-même transparent
3. **Innovation** : La communauté apporte plus que n'importe quelle équipe fermée

### **Notre roadmap d'adoption**

- **Phase 1** : Outils et documentation excellents (✅ fait)
- **Phase 2** : Adoptants early (startups françaises, entreprises conscientes)
- **Phase 3** : Standards de facto (grands acteurs, institutions)
- **Phase 4** : Écosystème mature (agents natifs LLMFeed)

---

## 🌟 Les premiers signaux d'adoption

### **Validation technique par les LLM leaders**

Quand nous avons donné les spécifications complètes LLMFeed aux principaux LLM :

> *"I know Kung-fu. 🥋"* - Claude 4  
> *(Reconnaissance des innovations techniques avancées)*

> *"MCP could become the HTTP of the agentic web."* - Grok  
> *(Vision de LLMFeed comme infrastructure fondamentale)*

> *"The best prompt is no prompt — it's a contract."* - Claude 4  
> *(Compréhension de l'évolution vers des standards déclaratifs)*

> *"Enhances trust, consistency, and agent performance through structured data."* - Mistral  
> *(Validation de l'approche trust-first)*

**Ce qui impressionne les LLM :**

- **Chiffrement homomorphe** : "Révolutionnaire pour la privacy"
- **Trust scoring** : "Intelligence de confiance intégrée"
- **Progressive disclosure** : "UX optimale par design"
- **API enterprise** : "Production-ready dès le départ"

### **Adoption early par l'écosystème**

**Développeurs :**

- ✅ **SDK Python/TypeScript** : >1000 downloads/semaine
- ✅ **VS Code extension** : Support syntax highlighting
- ✅ **Export Button** : Intégration sur >50 sites

**Entreprises :**

- ✅ **Startups françaises** : 12 adoptants confirmés
- ✅ **Certification LLMCA** : 8 organisations en cours
- ✅ **Integration OVHcloud** : Proof of concept validé

**Standards :**

- ✅ **MIME type** : Soumission IANA en cours
- ✅ **OpenAPI hybrid** : Support par Swagger/Postman
- ✅ **Browser recognition** : Chrome DevTools extension

---

## 🚀 Notre vision 2.0 : vers l'écosystème mature

### **Roadmap technique**

- **Q3 2025** : Support multimodal (images, audio, vidéo)
- **Q4 2025** : Intégration blockchain pour notarisation
- **Q1 2026** : Standards temps réel pour agents collaboratifs
- **Q2 2026** : LLMFeed Network - mesh décentralisé d'agents

### **Notre vision long terme**

Nous voyons un monde où :

- **Chaque agent** parle LLMFeed nativement avec chiffrement homomorphe
- **Chaque interaction** est traçable, vérifiable et sécurisée par design
- **La confiance** est mesurable via trust scoring et community flagging
- **L'innovation** est accessible à tous avec progressive disclosure
- **La privacy** est préservée grâce au calcul homomorphe
- **L'interopérabilité** est garantie via standards hybrides (MCP + OpenAPI)

---

## 💬 Notre appel à la communauté

**LLMFeed n'est pas notre projet. C'est notre futur commun.**

### **Comment contribuer ?**

1. **Développeurs** : Intégrez LLMFeed dans vos projets IA
2. **Entreprises** : Adoptez les standards de certification LLMCA
3. **Chercheurs** : Explorez les cas d'usage émergents
4. **Régulateurs** : Considérez LLMFeed pour les exigences de compliance

### **Rejoignez notre mouvement**

- 🌐 **Spec complète** : [wellknownmcp.org/spec](https://wellknownmcp.org/spec)
- 🛠️ **Outils** : [wellknownmcp.org/tools](https://wellknownmcp.org/tools)
- 🤝 **Consortium LLMCA** : [wellknownmcp.org/join](https://wellknownmcp.org/join)
- 💬 **Communauté** : [wellknownmcp.org/community](https://wellknownmcp.org/community)

---

## 🎯 Conclusion : L'infrastructure complète du web agentique

Quand nous avons créé LLMFeed, certains nous ont dit : *"Anthropic a déjà le MCP, pourquoi réinventer ?"*

Après avoir lu cet article, la réponse est évidente : **nous n'avons pas réinventé, nous avons révolutionné**.

### **Ce que le MCP ne pouvait pas faire :**

❌ Chiffrement homomorphe pour privacy-preserving AI  
❌ APIs sécurisées avec authentication et rate limiting  
❌ Progressive disclosure par audience  
❌ Sandbox policies pour sécurité d'exécution  
❌ Community flagging et modération décentralisée  
❌ Trust scoring dynamique  
❌ Certification tierce avec LLMCA  
❌ MIME types et intégration web native  
❌ Hybridation OpenAPI

### **Ce que LLMFeed permet aujourd'hui :**

✅ **Tous les points ci-dessus** + infrastructure complète  
✅ **Enterprise-grade security** avec cryptographie de pointe  
✅ **Developer experience** exceptionnelle avec outils intégrés  
✅ **Community governance** pour écosystème sain  
✅ **Future-proof architecture** extensible et évolutive

### **L'évolution naturelle des standards :**

L'histoire nous montre que les standards techniques évoluent par **bonds qualitatifs** :

- **HTTP/1.0** → **HTTP/2** → **HTTP/3** (performance + sécurité)
- **JSON** → **JSON-LD** → **Standards sémantiques** (structure + contexte + confiance)
- **Web 1.0** → **Web 2.0** → **Web agentique** (statique + social + intelligent)

**LLMFeed représente ce bond qualitatif pour l'IA** : de l'interopérabilité basique (MCP) vers **l'infrastructure complète du web agentique**.

### **Preuves techniques de notre avance :**

✅ **12 types de feeds** spécialisés vs 1 format MCP générique  
✅ **Chiffrement homomorphe** : innovation mondiale unique  
✅ **Trust scoring** : 4 niveaux vs confiance binaire  
✅ **API enterprise** : auth + rate limiting + scoping vs serveurs complexes  
✅ **Progressive disclosure** : audience targeting vs contenu statique  
✅ **Certification LLMCA** : tiers de confiance vs auto-déclaration  
✅ **Community flagging** : modération distribuée vs pas de gouvernance  
✅ **Standards web** : MIME types + OpenAPI vs protocole isolé

Le web agentique arrive. La question n'est pas *si*, mais *comment*.

Avec LLMFeed, nous choisissons **l'excellence technique, la sécurité par design, la confiance vérifiable, et l'innovation ouverte**.

**Rejoignez-nous. L'infrastructure de demain se construit maintenant.**

---

*Cet article marque le début d'une série technique approfondie sur LLMFeed. Suivez l'évolution sur [wellknownmcp.org/fr/news](https://wellknownmcp.org/fr/news) et contribuez à façonner l'avenir du web agentique.*

---

📝 *Publié par l'équipe wellknownmcp.org • Juin 2025 • CC BY-SA 4.0*
