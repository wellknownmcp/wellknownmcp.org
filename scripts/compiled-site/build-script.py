#!/usr/bin/env python3
"""
Script de build rapide pour compiled-site.llmfeed.json
Adapté pour Next.js (.next structure)
Usage: python build-script.py
"""

import sys
from pathlib import Path

# Ajoute le dossier courant au path pour les imports
sys.path.append(str(Path(__file__).parent))

from compiled_site_generator import CompiledSiteGenerator

def main():
    print("🔥 Build Compiled Site Feed (Next.js)")
    print("=" * 40)
    
    try:
        generator = CompiledSiteGenerator()
        
        # Affichage de la détection
        print(f"📁 Build directory: {generator.build_dir}")
        print(f"📄 Pages configurées: {len(generator.pages_config)}")
        
        # Vérification des pages Next.js
        print("\n🔍 Vérification des pages Next.js:")
        for page in generator.pages_config:
            resolved_path = generator.resolve_nextjs_path(page.path)
            status = "✅" if resolved_path and resolved_path.exists() else "❌"
            print(f"  {status} {page.block_name} ({page.path})")
            if resolved_path:
                print(f"      → {resolved_path}")
        
        # Génération
        print("\n🔄 Génération...")
        feed = generator.generate_compiled_site()
        output_path = generator.save_feed(feed)
        
        print("\n🎉 Génération terminée!")
        print(f"📊 {generator.stats}")
        print(f"📄 Feed créé: {output_path}")
        
        # Next.js specific info
        if '.next' in str(generator.build_dir):
            print("\n💡 Tips Next.js:")
            print("   - Pour App Router: pages dans .next/server/app/*/page.html")
            print("   - Pour Pages Router: pages dans .next/server/pages/*.html")
            print("   - Pour export statique: next export puis scan du dossier 'out/'")
        
    except Exception as e:
        print(f"❌ Erreur: {e}")
        import traceback
        traceback.print_exc()
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())