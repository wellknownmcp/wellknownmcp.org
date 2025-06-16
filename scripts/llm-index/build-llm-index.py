#!/usr/bin/env python3
"""
Script de build rapide pour llm-index.llmfeed.json
Transforme le sitemap plat en système de navigation intelligent

Usage: python build-llm-index.py
"""

import sys
from pathlib import Path

# Ajoute le dossier courant au path pour les imports
sys.path.append(str(Path(__file__).parent))

from llm_index_generator import LLMIndexGenerator

def main():
    print("🧠 Build LLM Index - Navigation Intelligente")
    print("=" * 50)
    
    try:
        generator = LLMIndexGenerator()
        
        # Arguments parsing
        import argparse
        parser = argparse.ArgumentParser(description="LLM Index Generator")
        parser.add_argument("--sitemap", help="Fichier sitemap custom")
        parser.add_argument("--output", help="Fichier de sortie custom")
        parser.add_argument("--dry-run", action="store_true", help="Simulation sans sauvegarde")
        parser.add_argument("--stats", action="store_true", help="Affiche les statistiques détaillées")
        
        args = parser.parse_args()
        
        # Override des chemins AVANT l'affichage
        if args.sitemap:
            generator.sitemap_file = Path(args.sitemap)
        if args.output:
            generator.output_file = Path(args.output)
        
        # Affichage de la configuration APRÈS l'override
        print(f"📍 Sitemap source: {generator.sitemap_file}")
        print(f"📚 Compiled site data: {generator.compiled_site_file}")
        print(f"📄 Sortie: {generator.output_file}")
        print(f"🔧 Règles d'enrichissement: {len(generator.enrichments.get('url_patterns', {}))} patterns")
        print(f"📚 Catégories: {len(generator.category_rules.get('categories', {}))}")
        print(f"🎯 Données réelles: {len(generator.compiled_site_data)} blocs disponibles")
        
        # Vérifications préliminaires
        if not generator.sitemap_file.exists():
            print(f"❌ Sitemap introuvable: {generator.sitemap_file}")
            print("💡 Assurez-vous que le sitemap est généré en premier")
            return 1
        
        if not generator.compiled_site_file.exists():
            print(f"⚠️ Compiled site absent: {generator.compiled_site_file}")
            print("💡 Le générateur utilisera les patterns par défaut")
        else:
            print(f"✅ Compiled site disponible - enrichissement premium activé!")
        
        print("\n🔄 Génération en cours...")
        
        # Mode dry-run
        if args.dry_run:
            # Parse juste pour obtenir les stats
            entries = generator.parse_sitemap()
            if not entries:
                print("❌ Aucune entrée trouvée dans le sitemap")
                return 1
            
            print("\n💡 Mode simulation - aperçu des résultats:")
            print(f"📊 URLs traitées: {generator.stats['urls_processed']}")
            print(f"📚 Catégories: 4 (simulées)")
            print(f"🧭 Routes: estimées")
            
            if args.stats:
                print(f"\n📈 Stats détaillées:")
                for key, value in generator.stats.items():
                    print(f"   {key}: {value}")
            
            return 0
        
        # Génération normale
        feed = generator.generate_llm_index()
        
        if not feed:
            print("❌ Échec de génération")
            return 1
        
        # Sauvegarde
        output_path = generator.save_feed(feed)
        
        if output_path:
            print("\n🎉 Génération terminée avec succès!")
            print(f"📊 Stats finales: {generator.stats}")
            print(f"📄 Index créé: {output_path}")
            
            # Résumé des capacités
            print("\n🧠 Capacités de navigation intelligente activées:")
            print(f"   🎯 {generator.stats['urls_processed']} URLs enrichies avec contexte RÉEL")
            print(f"   📚 {generator.stats['categories_created']} catégories organisées")
            print(f"   🧭 {generator.stats['routes_generated']} routes de navigation")
            print(f"   ⚡ Smart routing pour audiences multiples")
            print(f"   🔒 Indicateurs de confiance intégrés")
            print(f"   🎪 Optimisations de performance")
            print(f"   🎨 {generator.stats['enrichments_applied']} enrichissements depuis compiled-site")
            
            # Qualité des données
            real_data_ratio = (generator.stats['enrichments_applied'] / generator.stats['urls_processed'] * 100) if generator.stats['urls_processed'] > 0 else 0
            print(f"   📊 Qualité: {real_data_ratio:.1f}% des URLs avec données réelles")
            
            # Conseils d'utilisation
            print("\n💡 Utilisation par les agents:")
            print("   • LLM: Commencer par /.well-known/mcp.llmfeed.json")
            print("   • Développeur: Aller vers /tools/ pour implementation")
            print("   • Business: Consulter /about et /ecosystem")
            print("   • Sécurité: Vérifier avec /verify et trust indicators")
            
            print(f"\n⏱️  Temps de génération: {generator.stats.get('build_time', 0):.2f}s")
            
        else:
            print("❌ Échec de sauvegarde")
            return 1
        
        return 0
        
    except Exception as e:
        print(f"❌ Erreur: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    exit(main())