# MCP v1.1 — Distinction entre Signature et Certification

Ce document prépare la clarification des responsabilités et des emplacements dans le schéma `.llmfeed.json` version 1.1. Il servira de référence pour la norme à publier publiquement.

---

## ✅ Signature (déclarative)

- Le champ `signed_blocks` peut **vivre exclusivement dans le bloc `trust`**.

- Il définit **ce que l’auteur souhaite signer**.

- La signature cryptographique (champ `signature`) doit inclure **uniquement les blocs listés dans `trust.signed_blocks`**.

- Le bloc `trust` doit donc **obligatoirement être signé** si cette approche est retenue.

> ✔️ Le bloc `trust` devient alors le **point d’ancrage de la transparence et de l’intention**, inspectable même par un LLM sans vérification crypto.

### Exemple (minimal)

```json
{
  "metadata": { ... },
  "data": { ... },
  "trust": {
    "signed_blocks": ["metadata", "data", "trust"]
  },
  "signature": "..."
}
```

---

## 🛡️ Certification (externe, autoritaire)

- Le champ `certified_blocks` est exclusivement présent dans le tableau `certifications[]`.

- Chaque objet `certification` contient :
  
  - les `certified_blocks`
  
  - la `signature`
  
  - la `public_key_url`
  
  - une autorité (`authority`) et un niveau (`level`)

> 📦 Les blocs certifiés **ne sont pas modifiés** : la certification est une **vue externe** vérifiée à part.

### Exemple :

```json
{
  "certifications": [
    {
      "certified_blocks": ["metadata"],
      "signature": "...",
      "authority": "llmca.org",
      "level": "gold",
      "public_key_url": "https://llmca.org/.well-known/public.pem"
    }
  ]
}
```

---

## 🧩 Résumé comparatif

|                       | Signature (auteur)     | Certification (tiers)               |
| --------------------- | ---------------------- | ----------------------------------- |
| Bloc de déclaration   | `trust.signed_blocks`  | `certifications[].certified_blocks` |
| Emplacement technique | à l’intérieur du feed  | à l’intérieur du feed               |
| Nécessite crypto      | ✅ oui                  | ✅ oui                               |
| Vérifiable en local   | ✅ oui                  | ✅ oui                               |
| Visible sans crypto   | ✅ oui                  | ❌ non                               |
| Fonction              | Authentifier des blocs | Attester la qualité/confiance       |
| Usage attendu         | Pour les LLMs, humains | Pour les agents, plateformes        |

---

## 📌 Décision (proposée pour v1.1)

> Nous **autorisons** la déclaration des blocs signés uniquement dans `trust.signed_blocks`, à condition que `trust` soit signé.  
> Aucun champ `signed_blocks` global n’est requis au niveau racine. Cela réduit la redondance et améliore la lisibilité.

Cette décision sera reflétée dans :

- la génération des fichiers signés (`sign_feed.py`)

- les fonctions de vérification (`verifyFeedSignature`)

- les lecteurs (`EnhancedFeedViewer` et `BlockCard`)

---

## 📘 Proposition de règle à intégrer dans la norme

If the signature.public_key_hint field is a full URL (starting with http:// or https://), it must point directly to a .pem file containing the base64-encoded Ed25519 public key.
Otherwise, it is treated as a domain, and /.well-known/public.pem will be requested on that origin.

---

### ✅ Nouveau champ officiel : `signature.public_key_url`

- Ce champ **remplace** toute tentative d’inclure la clé en clair (`public_key`)

- Il **doit pointer directement** vers un fichier `.pem` en ligne, ex :
  
  json
  
  CopierModifier
  
  `{   "signature": {     "value": "AbCdEfG...",     "public_key_url": "https://wellknownmcp.org/.well-known/public.pem",     "algorithm": "ed25519"   } }`

---

### 🔄 Si `public_key_url` est un simple domaine (`wellknownmcp.org`) :

- On le complète automatiquement avec `/.well-known/public.pem`

- ⚠️ **Non recommandé** car trop implicite pour des validateurs limités

- Les validateurs devraient préférer une URL explicite

---

### ❌ À proscrire : `public_key` en base64 dans le bloc `signature`

Cela **n’offre aucune sécurité** puisque tout attaquant peut :

- générer sa propre paire clé privée/publique

- signer un contenu faux

- y inclure sa propre clé publique

- faire croire à une signature valide

## 🔜 Étapes suivantes

- Mise à jour de `sign_feed.py` pour injecter `trust.signed_blocks` si argumenté en CLI.

- Suppression du champ `signed_blocks` en racine.

- Mise à jour des exemples.

- Ajout dans le document de norme `llmfeed.md`.
