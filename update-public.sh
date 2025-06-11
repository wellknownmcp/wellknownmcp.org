#!/bin/bash
echo "🚀 Mise à jour statique - génération locale + push public/ vers GitHub + pull sur OVH"

# =============================================================================
# PHASE 1: GÉNÉRATION LOCALE
# =============================================================================
echo "📝 Phase 1: Génération des contenus en local..."

# Normalisation des tags
echo "🏷️  Normalisation des tags..."
npm run normalize-tags || { echo "❌ Erreur normalize-tags"; exit 1; }

# Génération des index d'export
echo "📦 Génération de l'index des exports..."
npm run generate-exports-index || { echo "❌ Erreur generate-exports-index"; exit 1; }

# Génération de l'index des news
echo "📰 Génération de l'index des news..."
npm run generate-index-news || { echo "❌ Erreur generate-index-news"; exit 1; }

# Génération du RSS
echo "📡 Génération du flux RSS..."
npm run generate-rss || { echo "❌ Erreur generate-rss"; exit 1; }

echo "✅ Phase 1 terminée - Contenus générés localement"

# =============================================================================
# PHASE 2: PUSH CODE COMPLET + PUSH public/ SÉPARÉMENT
# =============================================================================
echo "📤 Phase 2: Push vers GitHub..."

# Push du code complet (branche main)
git add -A
git commit -m "🚀 Auto update: contenus générés $(date '+%Y-%m-%d %H:%M')"
git push origin main || { echo "❌ Erreur push main"; exit 1; }

# Push SEULEMENT public/ vers branche production
echo "📁 Push public/ vers branche production..."
git subtree push --prefix=public origin production || {
  echo "🔧 Première fois ? Création de la branche production..."
  git subtree push --prefix=public origin production 2>/dev/null || {
    # Si ça échoue, on force la création
    git push origin `git subtree split --prefix=public HEAD`:production --force
  }
}

echo "✅ Phase 2 terminée - Code sur main, public/ sur production"

# =============================================================================
# PHASE 3: PULL public/ DEPUIS BRANCHE PRODUCTION SUR OVH
# =============================================================================
echo "🌐 Phase 3: Pull public/ sur OVH..."

ssh debian@54.37.40.223 << 'EOF'
  echo "🔄 Connexion au serveur OVH..."
  cd ~/sites/wellknownmcp.org
  
  # S'assurer qu'on est sur la branche production (public/ seulement)
  if ! git branch | grep -q "production"; then
    echo "🔧 Setup initial de la branche production..."
    git fetch origin production
    git checkout -b production origin/production
  else
    git checkout production
  fi
  
  # Pull des modifications (seulement public/)
  echo "📥 Pull des fichiers statiques..."
  git pull origin production || { echo "❌ Erreur pull"; exit 1; }
  
  # Vérification
  echo "🔍 Vérification des fichiers..."
  ls -la . | head -10
  
  # Redémarrage serveur web
  echo "🔄 Redémarrage du serveur web..."
  npx pm2 restart wellknownmcp 2>/dev/null || echo "⚠️  PM2 restart échoué (normal si pas configuré)"
  sudo systemctl reload nginx 2>/dev/null || echo "⚠️  Nginx reload échoué (normal si pas configuré)"
  
  echo "✅ Pull public/ terminé"
EOF

if [[ $? -eq 0 ]]; then
  echo ""
  echo "🎉 DÉPLOIEMENT RÉUSSI !"
  echo "📍 Site mis à jour sur : https://wellknownmcp.org"
  echo "🌳 main branch: code complet"
  echo "🌳 production branch: public/ seulement"
  echo "📁 Serveur OVH: public/ seulement"
  echo "⏰ Completed at: $(date '+%Y-%m-%d %H:%M:%S')"
else
  echo "❌ ERREUR lors du pull sur OVH"
  exit 1
fi