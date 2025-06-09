#!/bin/bash

echo "🚀 Push vers GitHub et déploiement VPS wellknownmcp.org"

# Étape 0 : Vérifications locales
echo "🔍 Vérifications préalables..."

# Vérifier que le build local fonctionne
echo "📦 Test build local..."
npm run build || { echo "❌ Build local échoue, arrêt du déploiement"; exit 1; }

# Vérifier que postbuild fonctionne
echo "📦 Test postbuild local..."
npm run postbuild || { echo "❌ Postbuild local échoue, arrêt du déploiement"; exit 1; }

# Vérifier l'absence d'URLs undefined
if grep -q "undefined" public/sitemap*.xml 2>/dev/null; then
  echo "❌ URLs undefined détectées localement, arrêt du déploiement"
  exit 1
fi

echo "✅ Vérifications locales réussies"

# Étape 1 : Ajout, commit et push local
echo "📦 Ajout des fichiers modifiés..."
git add -A
git commit -m "🚀 Auto commit + push"
git push origin main || { echo "❌ Échec du push vers GitHub"; exit 1; }

# Étape 2 : Connexion SSH et déploiement
ssh debian@54.37.40.223 << 'EOF'
  echo "📦 Pull depuis GitHub..."
  cd ~/sites/wellknownmcp.org || exit
  git fetch origin main
  git reset --hard origin/main

  echo "📦 Initialisation Node env"
  export NVM_DIR="$HOME/.nvm"
  source $NVM_DIR/nvm.sh

  echo "📦 Installation des dépendances..."
  npm install

  echo "🧹 Nettoyage complet des caches..."
  rm -rf .next
  rm -f public/sitemap*.xml
  rm -f public/robots.txt
  rm -f public/indexnow.json
  rm -f public/exports/index.json
  rm -f public/news/index.json

  echo "🏗️ Build du site..."
  npm run build || { echo "❌ Build serveur échoué"; exit 1; }

  echo "🔄 Post-build (index, sitemap, RSS)..."
  npm run postbuild || { echo "❌ Postbuild serveur échoué"; exit 1; }

  echo "🔍 Vérification finale de la qualité..."
  if grep -q "undefined" public/sitemap*.xml 2>/dev/null; then
    echo "❌ ERREUR: Des URLs undefined dans le sitemap serveur !"
    exit 1
  fi

  echo "📊 Statistiques du déploiement:"
  echo "   - Exports: $(cat public/exports/index.json | jq length) entrées"
  echo "   - Sitemap: $(grep -c "<url>" public/sitemap-0.xml) URLs"

  echo "🔁 Redémarrage via PM2..."
  npx pm2 restart wellknownmcp
EOF

echo "✅ Déploiement terminé sur le VPS."