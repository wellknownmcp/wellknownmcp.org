#!/bin/bash
echo "🚀 Push et déploiement optimisé"

# Vérifications basiques locales uniquement
echo "🔍 Vérifications syntax..."
npm run normalize-tags || exit 1

# Push vers GitHub
git add -A
git commit -m "🚀 Auto commit + push"
git push origin main || exit 1

# Build UNIQUEMENT sur serveur
ssh debian@54.37.40.223 << 'EOF'
  cd ~/sites/wellknownmcp.org
  git fetch origin main
  git reset --hard origin/main

  # Setup Node
  export NVM_DIR="$HOME/.nvm"
  source $NVM_DIR/nvm.sh

  npm install

  # Nettoyage + Build en une fois
  rm -rf .next public/sitemap*.xml public/robots.txt
  npm run build && npm run postbuild || exit 1

  # Vérification finale
  grep -q "undefined" public/sitemap*.xml && exit 1

  npx pm2 restart wellknownmcp
EOF