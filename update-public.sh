#!/bin/bash

# Sécurité : stop en cas d'erreur
set -e

# Aller à la racine de llmfeed-spec
cd "$(dirname "$0")"

echo "=== 🚀 Génération de spec.llmfeed.json ==="
python3 06_scripts/update_spec.py

echo "=== ✅ spec.llmfeed.json généré ==="

# Commit dans llmfeed-spec
echo "=== 📦 Commit dans llmfeed-spec ==="
git add .
git commit -m "Update spec.llmfeed.json and markdown content"
git push

echo "=== 🚀 Push de llmfeed-spec terminé ==="

# Cible : public/exports/spec/
TARGET_EXPORT="../wellknownmcp.org/public/exports/spec"

echo "=== 🗑️ Nettoyage de $TARGET_EXPORT ==="
rm -rf "$TARGET_EXPORT"/*

echo "=== 📂 Synchronisation vers $TARGET_EXPORT ==="
rsync -av --exclude '.git/' --exclude '06_scripts/' --exclude 'update-and-push.sh' --exclude '.gitignore' ./ "$TARGET_EXPORT/"

echo "=== ✅ Synchronisation vers $TARGET_EXPORT terminée ==="

# Cible : .well-known/exports/
WELLKNOWN_EXPORT="../wellknownmcp.org/public/.well-known/exports"

echo "=== 📂 Copie de spec.llmfeed.json vers $WELLKNOWN_EXPORT ==="
mkdir -p "$WELLKNOWN_EXPORT"
cp spec.llmfeed.json "$WELLKNOWN_EXPORT/spec.llmfeed.json"

echo "=== ✅ spec.llmfeed.json copié dans .well-known/exports ==="

# Aller dans wellknownmcp.org et commit + push
cd ../wellknownmcp.org

echo "=== 📦 Commit dans wellknownmcp.org ==="
git add public/exports/spec
git add public/.well-known/exports/spec.llmfeed.json
git commit -m "Update exported spec (exports/spec + .well-known/exports)"
git push

echo "=== 🎉 TOUT TERMINE ==="
