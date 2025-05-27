#!/bin/bash

echo "🚀 Déploiement sécurisé de wellknownmcp.org"

# Étape 1 : Push local vers GitHub
echo "📦 Push vers GitHub..."
git add -A
git commit -m "🚀 Sync and deploy"
git push origin main

# Étape 2 : Connexion SSH et synchro distante
echo "🔗 Connexion SSH au VPS..."
ssh debian@54.37.40.223 << 'EOF'

  echo "📦 Synchronisation Git avec le dépôt distant..."
  cd ~/sites/wellknownmcp.org
  git fetch origin main
  if ! git diff --quiet HEAD origin/main; then
    echo "❗ Branche désynchronisée. Reset forcé."
    git reset --hard origin/main
  else
    echo "✅ Branche déjà à jour"
  fi

  echo "📦 Initialisation de l'environnement Node.js"
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

  echo "📦 Installation des dépendances..."
  npm install

  echo "🏗️ Build du site..."
  npm run build

  echo "🔁 Redémarrage via PM2..."
  npx pm2 restart wellknownmcp

EOF

echo "✅ Déploiement terminé."
