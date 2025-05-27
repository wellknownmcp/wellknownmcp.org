#!/bin/bash

echo "🚀 Push vers GitHub et déploiement VPS wellknownmcp.org"

# Push Git local
git push origin main

# Déploiement distant via SSH
ssh debian@54.37.40.223 << 'ENDSSH'
echo "📦 Configuration du chemin Node"
export PATH="$HOME/.nvm/versions/node/v22.16.0/bin:$PATH"

echo "📦 Pull depuis GitHub..."
cd ~/sites/wellknownmcp.org
git pull origin main

echo "📦 Installation des dépendances..."
npm install

echo "🏗️ Build du site..."
npm run build

echo "🔁 Redémarrage via PM2..."
npx pm2 restart wellknownmcp

echo "✅ Déploiement terminé sur le VPS."
ENDSSH
