# ✅ Publication Checklist — wellknownmcp.org (v1)

## 1. Core Pages
- [x] /feeds — dynamique, certifié, taggable
- [x] /news — multilangue, tag filter, date
- [x] /manifesto, /ethics, /why-mcp — traduits et injectés en news
- [x] /llmfeedhub — (ex-preview) feed viewer + partage + drop
- [x] /verify — viewer de validation avec EnhancedFeedViewer

## 2. Navigation
- [x] Navbar complète : Protocol, News, Feeds, Feed Hub, About
- [x] Liens actualisés (`llmfeedhub`, `/feeds`, `/news?lang=...`)
- [x] Badge officiel dans le footer (`mcp-certified`, etc.)

## 3. Export & Signature
- [x] ExportOptions : JSON, PDF, Markdown, Share
- [x] OG Meta tag dynamiques
- [x] Pages `spec` et `news` prêtes à être exportées
- [x] `index.dynamic.llmfeed.json` généré automatiquement
- [x] `core.llmfeed.json` signé et validé

## 4. Accessibilité & UX
- [x] Détection langue navigateur pour news
- [x] Drag & drop `.llmfeed.json` dans llmfeedhub
- [x] Upload manuel de fichier
- [x] Partage réseaux sociaux (Twitter, LinkedIn, WhatsApp, Telegram, WeChat)
- [x] Section “Share with Agent”

## 5. Assets
- [x] Dossier `/assets/badges/` prêt
- [x] Composant `<Badge name="..." />` avec affichage SVG
- [x] Fichiers `.md` traduits en 6 langues
- [x] Archive `news_multilang_full_2025-05-03.zip`

## 6. Technique
- [x] Vérification de signature intégrée
- [x] Page `/llmfeedhub/[slug]` autonome
- [x] Composants `ui/` régénérés
- [x] OG preview opérationnel
- [x] index llmfeed dynamique, signature partielle OK

## 7. Prochaine étape
- [ ] Mise en ligne du site (build, push GitHub, déploiement OVH)
- [ ] Publication du `.well-known/public.pem`
- [ ] Déploiement des feeds `.llmfeed.json` certifiés

