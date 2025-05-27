
# Contexte complet WellKnownMCP — version maximisée

## Structure projet
- wellknownmcp.org : site principal, normatif, lisible par agents
- llmfeedforge.org : playground, génération de feed, simulateur agent à venir
- llmca.org : autorité de certification, expose public.pem et règles de trust
- Github principal : wellknownmcp/spec

## Objectifs
- Exposer le standard MCP (Model Context Protocol)
- Permettre l’export structuré `.llmfeed.json` sur chaque page
- Rendre les sites lisibles et interprétables par des LLMs
- Offrir signature, certification et documentation claire
- Offrir une expérience sobre, fiable, structurée

## Architecture technique
- Next.js (App Router)
- Tailwind CSS custom (fond neutre, prose, badge vert/rouge, minimalisme)
- Favicon, og:image, robots.txt, sitemap.xml intégrés
- Export automatique (API /api/export), formats `.llmfeed.json`, `.md`, `.pdf`
- Signature via `sign_feed.py` (PKCS#8), avec bloc trust enrichi
- Tous les blocs `.well-known/` disponibles et signés

## Navigation & Design
- Navigation divisée en 3 groupes :
  - `About` : /vision /manifesto /ethics
  - `Protocol` : /spec /sdk /verify
  - `Community` : /news /join /consortium
- Layout incluant Navbar + Footer + ExportOptions + LanguageSelector
- Responsive + menu mobile
- Icônes utilisées : Lock, ShieldCheck, CheckCircle, AlertTriangle

## Composants clés
- ExportOptions : menu export dynamique
- EnhancedFeedViewer : affichage pédagogique des blocs d’un `.llmfeed.json`
- ShareButtons : X / LinkedIn / copier le lien
- LanguageSelector : menu avec drapeaux
- Page /verify : input URL, fetch, rendu feed enrichi

## Pages et routes
- Toutes les pages multilingues : en, fr, es, ar, hi, uk
- Pages existantes : /vision /manifesto /ethics /spec /sdk /verify /news /join /consortium /legal
- `news` en markdown avec entête (date, title, slug)

## Fichiers spéciaux
- .well-known/mcp (version complète)
- .well-known/mcp-lite (réduit)
- .well-known/capabilities
- .well-known/llm-index
- .well-known/public.pem
- favicon.ico / og-wellknownmcp.png

## Règles utilisateur
- Toujours vérifier les zips avant livraison
- Ne jamais proposer de placeholder
- Signature obligatoire pour les feeds validés
- Générer des composants réutilisables, stylés et rigoureux
- Ne pas proposer d’automatisme excessif
- Préférence forte pour une interface lisible et rigoureuse

## TODO post-release
- Signer CHANGELOG.llmfeed.json
- Pousser en ligne sur OVH
- Intégrer simulateur agent sur llmfeedforge
- Proposer export combiné multi-fichiers
- Préparer /manifesto en version signée
- Lancer V1.1 du protocole avec clarification trust
