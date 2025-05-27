#!/bin/bash

echo "🚀 Push vers GitHub et déploiement VPS wellknownmcp.org"

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

  echo "🏗️ Build du site..."
  npm run build

  echo "🔁 Redémarrage via PM2..."
  npx pm2 restart wellknownmcp
EOF

echo "✅ Déploiement terminé sur le VPS."
