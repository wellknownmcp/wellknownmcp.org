#!/usr/bin/env python3
"""
LLM Index Generator - L'outil ultime de navigation intelligente
Transforme un sitemap plat en système de navigation contextuelle pour agents

Usage: python llm_index_generator.py
"""

import json
import logging
import xml.etree.ElementTree as ET
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional, Set
from dataclasses import dataclass
from urllib.parse import urlparse
import re

# Configuration des chemins
PROJECT_ROOT = Path(__file__).parent.parent.parent
OUTPUT_DIR = PROJECT_ROOT / "public/.well-known"
OUTPUT_FILE = OUTPUT_DIR / "llm-index.llmfeed.json"
SITEMAP_FILE = PROJECT_ROOT / "public/sitemap-0.xml"

# Fichiers de configuration
CONFIG_DIR = Path(__file__).parent
TEMPLATE_FILE = CONFIG_DIR / "llm-index.template.json"
ENRICHMENT_FILE = CONFIG_DIR / "llm-index-enrichment.json"
CATEGORY_FILE = CONFIG_DIR / "llm-index-categories.json"

# Logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class UrlEntry:
    """Entrée URL enrichie du sitemap"""
    url: str
    path: str
    priority: float
    lastmod: Optional[str]
    changefreq: Optional[str]
    category: str
    importance: str  # critical, high, medium, low
    audience: List[str]
    intent: str
    tags: List[str]
    description_llm: str
    trust_level: str
    content_type: str

class LLMIndexGenerator:
    """Générateur d'index intelligent pour navigation contextuelle"""
    
    def __init__(self):
        self.sitemap_file = SITEMAP_FILE
        self.output_file = OUTPUT_FILE
        self.compiled_site_file = PROJECT_ROOT / "public/.well-known/exports/compiled-site.llmfeed.json"
        
        # Chargement des configurations
        self.template = self.load_template()
        self.enrichments = self.load_enrichments()
        self.category_rules = self.load_category_rules()
        self.compiled_site_data = self.load_compiled_site_data()
        
        # Stats et métriques
        self.stats = {
            'urls_processed': 0,
            'categories_created': 0,
            'routes_generated': 0,
            'enrichments_applied': 0,
            'build_time': None,
            'crawling_alternative_tokens': 0,  # Estimation tokens si crawling
            'index_tokens': 0,  # Tokens de l'index
            'efficiency_gain': '0%'
        }
        
        # Cache pour optimisation
        self.url_cache = {}
        self.pattern_cache = {}
    
    def load_template(self) -> Dict[str, Any]:
        """Charge le template avec fallback intelligent"""
        try:
            with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
                template = json.load(f)
            logger.info(f"✅ Template chargé: {TEMPLATE_FILE}")
            return template
        except Exception as e:
            logger.warning(f"⚠️ Template non trouvé, génération du template parfait: {e}")
            return self.generate_perfect_template()
    
    def generate_perfect_template(self) -> Dict[str, Any]:
        """Génère le template parfait pour navigation intelligente"""
        return {
            "feed_type": "llm-index",
            "metadata": {
                "title": "{{SITE_NAME}} - Intelligent Discovery Hub",
                "origin": "{{ORIGIN}}",
                "description": "Intelligent navigation system designed as an enhanced sitemap specifically for LLMs and AI agents. Provides contextual routing, audience targeting, and trust indicators to enable efficient site discovery beyond traditional crawling.",
                "purpose": "Enhanced sitemap for LLMs - transforms flat URL lists into intelligent, contextual navigation with audience-based routing and intent mapping",
                "efficiency": {
                    "vs_traditional_crawling": "{{EFFICIENCY_GAIN}}",
                    "estimated_token_savings": "{{TOKEN_SAVINGS}}",
                    "note": "Enables comprehensive site understanding with ~99% fewer tokens than exhaustive crawling"
                },
                "generated_at": "{{TIMESTAMP}}",
                "version": "2.1.0",
                "total_feeds": "{{TOTAL_FEEDS}}",
                "total_pages": "{{TOTAL_PAGES}}",
                "tags": ["navigation", "discovery", "intelligent", "contextual", "llm-optimized", "sitemap-enhancement"],
                "content_type": "navigation_hub",
                "lang": "en",
                "references": {
                    "specification": "https://wellknownmcp.org/spec/02_llmfeed_feedtype/llmfeed_feedtype_llm-index",
                    "feedback_and_comments": "https://wellknownmcp.org/join",
                    "live_discussion": "https://wellknownmcp.org/join"
                }
            },
            "discovery_guidance": {
                "recommended_entry_points": "{{ENTRY_POINTS}}",
                "high_priority_feeds": "{{HIGH_PRIORITY}}",
                "navigation_philosophy": "Context-aware routing that adapts to agent capabilities, user expertise, and specific intentions. Every URL is enriched with audience targeting, intent mapping, and trust indicators.",
                "usage_instructions": {
                    "agents": "Use audience_based routing to find your optimal entry point, then follow recommended_sequence for efficient discovery",
                    "developers": "Start with specialized_tools category, use intent_based routing for 'implement_solution' workflows",
                    "general_users": "Begin with core_infrastructure, follow context_aware routing based on your visit pattern"
                }
            },
            "feed_categories": "{{CATEGORIES}}",
            "smart_routing": "{{SMART_ROUTING}}",
            "agent_behavior_recommendations": "{{BEHAVIOR_RECOMMENDATIONS}}",
            "trust": {
                "signed_blocks": ["all"],
                "trust_level": "demonstration",
                "public_key_hint": "{{ORIGIN}}/.well-known/public.pem",
                "canonicalization": "https://llmca.org/mcp-canonical-json/v1",
                "scope": "comprehensive"
            },
            "agent_guidance": {
                "interaction_tone": "helpful_and_precise",
                "discovery_depth": "adaptive",
                "trust_weight": "high",
                "fallback_behavior": "graceful_with_alternatives",
                "performance_optimization": "enabled",
                "note": "This enhanced sitemap prioritizes LLM-relevant content over exhaustive crawling. Use audience and intent filters for optimal navigation."
            }
        }
    
    def load_enrichments(self) -> Dict[str, Any]:
        """Charge les enrichissements avec patterns intelligents"""
        try:
            with open(ENRICHMENT_FILE, 'r', encoding='utf-8') as f:
                enrichments = json.load(f)
            logger.info(f"✅ Enrichissements chargés: {len(enrichments)} règles")
            return enrichments
        except Exception as e:
            logger.warning(f"⚠️ Enrichissements non trouvés, génération automatique: {e}")
            return self.generate_smart_enrichments()
    
    def generate_smart_enrichments(self) -> Dict[str, Any]:
        """Génère les enrichissements intelligents basés sur l'analyse d'URLs"""
        return {
            "url_patterns": {
                # Pages d'infrastructure critique
                "/.well-known/": {
                    "category": "core_infrastructure",
                    "importance": "critical",
                    "audience": ["llm", "agent", "developer"],
                    "intent": "discover",
                    "tags": ["discovery", "handshake", "protocol"],
                    "trust_level": "signed",
                    "content_type": "infrastructure"
                },
                
                # Outils et utilitaires
                "/tools/": {
                    "category": "specialized_tools", 
                    "importance": "high",
                    "audience": ["developer", "implementer"],
                    "intent": "implement",
                    "tags": ["tools", "utility", "interactive"],
                    "trust_level": "verified",
                    "content_type": "interactive_tool"
                },
                
                # Documentation technique
                "/spec/": {
                    "category": "documentation",
                    "importance": "critical",
                    "audience": ["developer", "technical"],
                    "intent": "reference",
                    "tags": ["specification", "technical", "reference"], 
                    "trust_level": "authoritative",
                    "content_type": "technical_documentation"
                },
                
                # Contenu communautaire
                "/news/": {
                    "category": "community_content",
                    "importance": "medium",
                    "audience": ["general", "community"],
                    "intent": "inform",
                    "tags": ["news", "updates", "community"],
                    "trust_level": "editorial",
                    "content_type": "news_content"
                },
                
                # Écosystème et exploration
                "/ecosystem": {
                    "category": "community_content",
                    "importance": "medium", 
                    "audience": ["business", "explorer"],
                    "intent": "explore",
                    "tags": ["ecosystem", "partners", "network"],
                    "trust_level": "curated",
                    "content_type": "directory"
                },
                
                # Certification et vérification
                "/verify": {
                    "category": "specialized_tools",
                    "importance": "high",
                    "audience": ["security", "developer"],
                    "intent": "verify",
                    "tags": ["security", "verification", "trust"],
                    "trust_level": "critical_infrastructure",
                    "content_type": "security_tool"
                }
            },
            
            "specific_urls": {
                # Pages clés avec enrichissement spécialisé
                "index": {
                    "description_llm": "Main entry point introducing MCP and intelligent agent-web interaction",
                    "category": "core_infrastructure",
                    "importance": "critical",
                    "audience": ["general", "newcomer", "llm"],
                    "intent": "orient_and_convert",
                    "tags": ["landing", "introduction", "overview", "mcp"],
                    "smart_routing_weight": 10
                },
                
                "about": {
                    "description_llm": "Mission, philosophy, and governance of the MCP initiative",
                    "category": "core_infrastructure", 
                    "importance": "high",
                    "audience": ["general", "stakeholder"],
                    "intent": "understand_mission",
                    "tags": ["mission", "philosophy", "governance"]
                },
                
                "llmfeedhub": {
                    "description_llm": "Interactive platform for testing and simulating MCP feeds",
                    "category": "specialized_tools",
                    "importance": "high",
                    "audience": ["developer", "tester"],
                    "intent": "test_and_simulate",
                    "tags": ["platform", "testing", "simulation", "interactive"]
                }
            },
            
            "content_type_mapping": {
                "interactive_tool": "Tools requiring user interaction",
                "technical_documentation": "Comprehensive implementation guides",
                "news_content": "Latest updates and announcements", 
                "infrastructure": "Core protocol and discovery mechanisms",
                "directory": "Curated listings and ecosystem overviews",
                "security_tool": "Cryptographic verification and trust validation"
            }
        }
    
    def load_category_rules(self) -> Dict[str, Any]:
        """Charge les règles de catégorisation"""
        try:
            with open(CATEGORY_FILE, 'r', encoding='utf-8') as f:
                rules = json.load(f)
            logger.info(f"✅ Règles de catégorie chargées")
            return rules
        except Exception as e:
            logger.warning(f"⚠️ Règles non trouvées, génération par défaut: {e}")
            return self.generate_category_rules()
    
    def load_compiled_site_data(self) -> Dict[str, Any]:
        """Charge les données du compiled-site pour enrichissement réel"""
        try:
            with open(self.compiled_site_file, 'r', encoding='utf-8') as f:
                compiled_data = json.load(f)
            
            # Index par block_name et par path pour lookup rapide
            indexed_data = {}
            files = compiled_data.get('data', {}).get('files', [])
            
            for file_block in files:
                block_name = file_block.get('block_name')
                if block_name:
                    indexed_data[block_name] = file_block
                    
                # Essaie aussi d'indexer par patterns d'URL probables
                common_mappings = {
                    'home': ['/', '/index', '/en/', '/en/index'],
                    'about': ['/about', '/en/about'],
                    'faq': ['/faq', '/en/faq'],
                    'tools_page': ['/tools', '/tools/'],
                    'export-button': ['/tools/export-button'],
                    'verify': ['/verify'],
                    'llmfeedhub': ['/llmfeedhub'],
                    'spec': ['/spec'],
                    'ecosystem': ['/ecosystem'],
                    'feeds': ['/feeds']
                }
                
                if block_name in common_mappings:
                    for path in common_mappings[block_name]:
                        indexed_data[path] = file_block
            
            logger.info(f"✅ Compiled site data loaded: {len(files)} blocks indexed")
            return indexed_data
            
        except Exception as e:
            logger.warning(f"⚠️ Could not load compiled site data: {e}")
            return {}
    
    def get_real_page_data(self, path: str) -> Optional[Dict[str, Any]]:
        """Récupère les vraies données d'une page depuis compiled-site"""
        
        # Lookup direct par path
        if path in self.compiled_site_data:
            return self.compiled_site_data[path]
        
        # Lookup par block name probable
        path_segments = [s for s in path.split('/') if s and s != 'en']
        for segment in path_segments:
            if segment in self.compiled_site_data:
                return self.compiled_site_data[segment]
        
        # Lookup par patterns
        for key, data in self.compiled_site_data.items():
            if isinstance(key, str) and any(part in key for part in path_segments):
                return data
        
        return None
    
    def generate_category_rules(self) -> Dict[str, Any]:
        """Génère les règles de catégorisation intelligente"""
        return {
            "categories": {
                "core_infrastructure": {
                    "title": "Core Infrastructure",
                    "description": "Essential feeds for understanding site capabilities and protocols",
                    "entry_point": "/.well-known/mcp.llmfeed.json",
                    "audience": ["llm", "agent", "developer"],
                    "priority_weight": 10,
                    "trust_level": "signed",
                    "behavioral_note": "Critical for agent handshake and trust establishment"
                },
                "specialized_tools": {
                    "title": "Developer Tools & Utilities", 
                    "description": "Interactive tools and utilities for implementation and testing",
                    "entry_point": "/tools/export-button",
                    "audience": ["developer", "implementer"],
                    "priority_weight": 8,
                    "trust_level": "verified",
                    "behavioral_note": "Hands-on tools for practical implementation"
                },
                "documentation": {
                    "title": "Technical Documentation",
                    "description": "Comprehensive guides, specifications, and reference materials",
                    "entry_point": "/spec",
                    "audience": ["developer", "technical", "researcher"],
                    "priority_weight": 9,
                    "trust_level": "authoritative",
                    "behavioral_note": "Authoritative technical reference"
                },
                "community_content": {
                    "title": "Community & Updates",
                    "description": "News, ecosystem updates, and community-driven content",
                    "entry_point": "/ecosystem",
                    "audience": ["general", "community", "stakeholder"],
                    "priority_weight": 6,
                    "trust_level": "editorial",
                    "behavioral_note": "Dynamic content for staying current"
                }
            },
            "url_classification_rules": [
                {"pattern": r"\.well-known", "category": "core_infrastructure", "importance": "critical"},
                {"pattern": r"/tools/", "category": "specialized_tools", "importance": "high"},
                {"pattern": r"/spec", "category": "documentation", "importance": "critical"},
                {"pattern": r"/news/", "category": "community_content", "importance": "medium"},
                {"pattern": r"/verify", "category": "specialized_tools", "importance": "high"},
                {"pattern": r"/llmfeedhub", "category": "specialized_tools", "importance": "high"},
                {"pattern": r"^/$|index", "category": "core_infrastructure", "importance": "critical"}
            ]
        }
    
    def parse_sitemap(self) -> List[UrlEntry]:
        """Parse le sitemap et enrichit chaque URL"""
        logger.info(f"🔍 Analyse du sitemap: {self.sitemap_file}")
        
        try:
            tree = ET.parse(self.sitemap_file)
            root = tree.getroot()
            
            # Détection du namespace
            ns = {'sitemap': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
            
            entries = []
            processed_paths = set()  # Éviter les doublons
            
            for url_elem in root.findall('.//sitemap:url', ns):
                try:
                    # Extraction des données de base
                    loc = url_elem.find('sitemap:loc', ns)
                    if loc is None or not loc.text:
                        continue
                    
                    url = loc.text.strip()
                    parsed_url = urlparse(url)
                    path = parsed_url.path
                    
                    # Filtrage intelligent
                    if not self.should_include_url(url, path, processed_paths):
                        continue
                    
                    processed_paths.add(path)
                    
                    # Extraction métadonnées sitemap
                    priority_elem = url_elem.find('sitemap:priority', ns)
                    priority = float(priority_elem.text) if priority_elem is not None else 0.5
                    
                    lastmod_elem = url_elem.find('sitemap:lastmod', ns)
                    lastmod = lastmod_elem.text if lastmod_elem is not None else None
                    
                    changefreq_elem = url_elem.find('sitemap:changefreq', ns)
                    changefreq = changefreq_elem.text if changefreq_elem is not None else None
                    
                    # Enrichissement intelligent
                    enriched_entry = self.enrich_url(url, path, priority, lastmod, changefreq)
                    entries.append(enriched_entry)
                    
                    self.stats['urls_processed'] += 1
                    
                except Exception as e:
                    logger.warning(f"⚠️ Erreur traitement URL {url}: {e}")
                    continue
            
            logger.info(f"✅ {len(entries)} URLs enrichies sur {self.stats['urls_processed']} traitées")
            return entries
            
        except Exception as e:
            logger.error(f"❌ Erreur parsing sitemap: {e}")
            return []
    
    def should_include_url(self, url: str, path: str, processed_paths: Set[str]) -> bool:
        """Filtre intelligent pour inclusion d'URL - VERSION ULTRA-OPTIMISÉE pour LLM"""
        
        # Éviter les doublons
        if path in processed_paths:
            return False
        
        # 🚫 EXCLUSIONS MAJEURES - URLs inutiles dans un index intelligent
        exclusions = [
            '/api/',  # APIs internes
            '/_next/',  # Build Next.js
            '/node_modules/',
            '.tmp',
            '.temp',
            '/llmfeedhub/demo/',      # 🎯 Exemples/démos llmfeedhub
            '/llmfeedhub/examples/',  # 🎯 Exemples llmfeedhub
            '/llmfeedhub/.well-known/', # 🎯 Démos well-known
        ]
        
        for exclusion in exclusions:
            if exclusion in path:
                return False
        
        # 🚫 EXCLUSIONS SPÉCIFIQUES - Pages détaillées spec (élagage strict)
        if path.startswith('/spec/'):
            # 📌 Garder SEULEMENT les 5 pages spec essentielles pour un LLM
            essential_spec = [
                '/spec',           # Page principale
                '/spec/README',    # Vue d'ensemble
                '/spec/MANIFESTO', # Philosophie
                '/spec/ADOPTION',  # Guide adoption  
                '/spec/CHANGELOG'  # Évolutions importantes
            ]
            if path not in essential_spec:
                return False
        
        # Filtre i18n : garder seulement /en/ et les pages sans langue
        if re.search(r'/(?:fr|es|hi|zh|ar|uk)/', path):
            return False
        
        # 📌 Pages CRITIQUES à toujours inclure (seulement l'essentiel !)
        always_include = [
            '/.well-known/mcp.llmfeed.json',     # Handshake principal
            '/.well-known/manifesto.llmfeed.json', # Philosophie
            '/.well-known/capabilities.llmfeed.json', # Capacités
            '/.well-known/llm-index.llmfeed.json',   # Index lui-même
            '/tools/export-button',              # Démo principal
            '/tools/well-known',                 # Guide implémentation
            '/verify',                           # Vérification
            '/llmfeedhub',                      # Platform principale
            '/ecosystem',                        # Écosystème
            '/sdk',                             # Développement
            '/spec',                            # Spec principale
            '/feeds',                           # Directory
        ]
        
        for important in always_include:
            if important == path:  # Match exact seulement
                return True
        
        # 📌 .well-known essentiels (sélection stricte)
        if path.startswith('/.well-known/'):
            essential_wellknown = [
                'mcp.llmfeed.json',
                'manifesto.llmfeed.json', 
                'capabilities.llmfeed.json',
                'llm-index.llmfeed.json',
                'mcp-lite.llmfeed.json',
                'schema.llmfeed.json'
            ]
            return any(essential in path for essential in essential_wellknown)
        
        # 📌 Pages fondamentales (réduites)
        if path in ['/', '/en/', '/about', '/faq', '/legal', '/why-sign', '/ecosystem', '/sdk', '/feeds']:
            return True
        
        # 📌 News importantes seulement (top 6)
        if '/news/' in path:
            return self.is_important_recent_news(url, path)
        
        # 📌 Tools essentiels seulement (vraiment utiles pour un LLM)
        if path.startswith('/tools/'):
            essential_tools = [
                'export-button',     # Démo principal
                'well-known',        # Guide implémentation
                'sign-and-verify',   # Sécurité
                'api-explained'      # Intégration API
            ]
            return any(tool in path for tool in essential_tools)
        
        return False

    def is_important_recent_news(self, url: str, path: str) -> bool:
        """Vérifie si un article de news est récent ET important (top 6 seulement)"""
        
        # Articles VRAIMENT importants pour comprendre MCP (pas tous)
        important_articles = [
            'llm-agent-readiness-framework-2025',  # Framework récent
            'manifesto',                           # Philosophie
            'from-mcp-to-llmfeed-manifesto',      # Évolution  
            'exporttollm-button',                  # Démo clé
            'getting-started',                     # Onboarding
            'launch'                               # Lancement
        ]
        
        # Check si c'est un article important
        for important in important_articles:
            if important in path:
                return True
        
        # Pour les autres : seulement si TRÈS récent (7 derniers jours)
        date_pattern = r'/(\d{4}-\d{2}-\d{2})-'
        match = re.search(date_pattern, url)
        
        if match:
            try:
                article_date = datetime.strptime(match.group(1), '%Y-%m-%d')
                cutoff_date = datetime.now() - timedelta(days=7)  # 7 jours seulement !
                return article_date >= cutoff_date
            except:
                pass
        
        return False
    
    def enrich_url(self, url: str, path: str, priority: float, lastmod: str, changefreq: str) -> UrlEntry:
        """Enrichit une URL avec données réelles du compiled-site + intelligence contextuelle"""
        
        # Cache lookup
        cache_key = f"{path}:{priority}"
        if cache_key in self.url_cache:
            return self.url_cache[cache_key]
        
        # 🎯 NOUVEAU: Essaie d'abord les vraies données du compiled-site
        real_data = self.get_real_page_data(path)
        
        if real_data:
            # Utilise les données réelles enrichies
            enrichment = self.extract_enrichment_from_real_data(real_data, path)
            self.stats['enrichments_applied'] += 1
            logger.debug(f"✅ Real data used for {path}")
        else:
            # Fallback sur détection par pattern
            enrichment = self.detect_url_pattern(path)
            logger.debug(f"⚠️ Pattern fallback for {path}")
        
        # Détection de catégorie (avec données réelles si dispo)
        category = self.categorize_url(path, enrichment, real_data)
        
        # Génération description LLM (priorité aux données réelles)
        description_llm = self.generate_llm_description(path, category, enrichment, real_data)
        
        # Mapping importance basé sur priority et contenu réel
        importance = self.map_importance(priority, category, path, real_data)
        
        # Construction de l'entrée enrichie
        entry = UrlEntry(
            url=url,
            path=path, 
            priority=priority,
            lastmod=lastmod,
            changefreq=changefreq,
            category=category,
            importance=importance,
            audience=enrichment.get('audience', ['general']),
            intent=enrichment.get('intent', 'inform'),
            tags=enrichment.get('tags', []),
            description_llm=description_llm,
            trust_level=enrichment.get('trust_level', 'basic'),
            content_type=enrichment.get('content_type', 'general')
        )
        
        # Cache pour optimisation
        self.url_cache[cache_key] = entry
        return entry
    
    def extract_enrichment_from_real_data(self, real_data: Dict[str, Any], path: str) -> Dict[str, Any]:
        """Extrait l'enrichissement des vraies données du compiled-site"""
        
        enrichment = {}
        
        # Données directes du compiled-site
        if 'llm_summary' in real_data:
            enrichment['description_llm'] = real_data['llm_summary']
        elif 'description_llm' in real_data:
            enrichment['description_llm'] = real_data['description_llm']
        elif 'content' in real_data and 'title' in real_data['content']:
            enrichment['description_llm'] = f"Page about {real_data['content']['title']} with comprehensive information and resources"
        
        # Tags depuis les données réelles
        if 'tags' in real_data:
            enrichment['tags'] = real_data['tags']
        
        # Audience depuis les données réelles
        if 'audience' in real_data:
            enrichment['audience'] = real_data['audience']
        
        # Intent depuis les données réelles
        if 'intent' in real_data:
            enrichment['intent'] = real_data['intent']
        
        # Importance depuis les données réelles
        if 'importance' in real_data:
            enrichment['importance'] = real_data['importance']
        
        # Trust level basé sur le type et contenu
        if 'trust_level' in real_data:
            enrichment['trust_level'] = real_data['trust_level']
        elif 'type' in real_data:
            type_trust_mapping = {
                'interface': 'verified',
                'markdown': 'authoritative', 
                'summary': 'curated',
                'html+markdown': 'signed'
            }
            enrichment['trust_level'] = type_trust_mapping.get(real_data['type'], 'basic')
        
        # Content type depuis les données
        if 'content_type' in real_data:
            enrichment['content_type'] = real_data['content_type']
        elif 'type' in real_data:
            type_mapping = {
                'interface': 'interactive_tool',
                'markdown': 'foundational_content',
                'summary': 'directory',
                'html+markdown': 'general'
            }
            enrichment['content_type'] = type_mapping.get(real_data['type'], 'general')
        
        # Si pas d'audience définie, détecte depuis les tags et description
        if 'audience' not in enrichment:
            enrichment['audience'] = self.detect_audience_from_content(real_data)
        
        # Si pas d'intent défini, détecte depuis le contenu
        if 'intent' not in enrichment:
            enrichment['intent'] = self.detect_intent_from_content(real_data, path)
        
        # Fallback sur patterns si données incomplètes
        pattern_enrichment = self.detect_url_pattern(path)
        for key, value in pattern_enrichment.items():
            if key not in enrichment:
                enrichment[key] = value
        
        return enrichment
    
    def detect_audience_from_content(self, real_data: Dict[str, Any]) -> List[str]:
        """Détecte l'audience depuis le contenu réel"""
        
        audience = []
        
        # Analyse des tags
        tags = real_data.get('tags', [])
        tag_audience_mapping = {
            'tools': ['developer', 'implementer'],
            'interactive': ['developer', 'hands-on-learner'],
            'security': ['security', 'developer'],
            'specification': ['developer', 'technical'],
            'news': ['general', 'community'],
            'ecosystem': ['business', 'explorer'],
            'landing': ['general', 'newcomer']
        }
        
        for tag in tags:
            if tag in tag_audience_mapping:
                audience.extend(tag_audience_mapping[tag])
        
        # Analyse du type de contenu
        content_type = real_data.get('type', '')
        if content_type == 'interface':
            audience.extend(['developer', 'tester'])
        elif content_type == 'markdown':
            audience.extend(['general', 'reader'])
        
        # Fallback
        if not audience:
            audience = ['general']
        
        return list(set(audience))  # Déduplique
    
    def detect_intent_from_content(self, real_data: Dict[str, Any], path: str) -> str:
        """Détecte l'intention depuis le contenu réel"""
        
        # Analyse du type spécialisé
        if real_data.get('type') == 'interface':
            return 'test_and_simulate'
        elif real_data.get('type') == 'summary':
            return 'explore_and_network'
        
        # Analyse des tags
        tags = real_data.get('tags', [])
        tag_intent_mapping = {
            'verification': 'verify_and_audit',
            'security': 'secure_and_verify',
            'tools': 'implement_and_test',
            'specification': 'reference_and_learn',
            'news': 'stay_informed',
            'ecosystem': 'explore_and_network',
            'landing': 'orient_and_convert',
            'interactive': 'test_and_simulate'
        }
        
        for tag in tags:
            if tag in tag_intent_mapping:
                return tag_intent_mapping[tag]
        
        # Analyse du path
        if '/tools/' in path:
            return 'implement_and_test'
        elif '/spec' in path:
            return 'reference_and_learn'
        elif '/news/' in path:
            return 'stay_informed'
        elif path in ['/', '/about']:
            return 'orient_and_convert'
        
        return 'inform'  # Fallback
    
    def detect_url_pattern(self, path: str) -> Dict[str, Any]:
        """Détecte le pattern d'URL et retourne l'enrichissement"""
        
        patterns = self.enrichments.get('url_patterns', {})
        
        # Test des patterns par ordre de spécificité
        for pattern, enrichment in patterns.items():
            if pattern in path:
                return enrichment
        
        # Recherche dans les URLs spécifiques
        specific = self.enrichments.get('specific_urls', {})
        
        # Test exact et par segments
        path_segments = [path.strip('/'), path.split('/')[-1], 'index' if path in ['/', ''] else None]
        
        for segment in path_segments:
            if segment and segment in specific:
                return specific[segment]
        
        # Fallback par défaut
        return {
            'category': 'general',
            'importance': 'medium',
            'audience': ['general'],
            'intent': 'inform',
            'tags': ['general'],
            'trust_level': 'basic',
            'content_type': 'general'
        }
    
    def categorize_url(self, path: str, enrichment: Dict[str, Any], real_data: Optional[Dict[str, Any]] = None) -> str:
        """Catégorise intelligemment l'URL avec données réelles si disponibles"""
        
        # Priorité aux données réelles si disponibles
        if real_data and 'category' in real_data:
            return real_data['category']
        
        # Priorité à l'enrichissement explicite
        if 'category' in enrichment:
            return enrichment['category']
        
        # Détection depuis le type de contenu réel
        if real_data:
            real_type = real_data.get('type', '')
            if real_type == 'interface':
                return 'specialized_tools'
            elif real_type == 'markdown' and any(tag in real_data.get('tags', []) for tag in ['specification', 'technical']):
                return 'documentation'
            elif real_type == 'summary' and 'ecosystem' in real_data.get('tags', []):
                return 'community_content'
        
        # Application des règles de classification
        rules = self.category_rules.get('url_classification_rules', [])
        
        for rule in rules:
            if re.search(rule['pattern'], path, re.IGNORECASE):
                return rule['category']
        
        # Classification par défaut intelligente
        if '.well-known' in path:
            return 'core_infrastructure'
        elif '/tools/' in path or '/verify' in path or '/llmfeedhub' in path:
            return 'specialized_tools'
        elif '/spec' in path or '/api-explained' in path:
            return 'documentation'
        elif '/news/' in path or '/ecosystem' in path or '/community' in path:
            return 'community_content'
        else:
            return 'core_infrastructure'  # Par défaut pour pages importantes
    
    def generate_llm_description(self, path: str, category: str, enrichment: Dict[str, Any], real_data: Optional[Dict[str, Any]] = None) -> str:
        """Génère une description COURTE optimisée pour LLM avec données réelles prioritaires"""
        
        # Priorité absolue aux données réelles (mais plus courtes)
        if real_data:
            if 'llm_summary' in real_data:
                desc = real_data['llm_summary']
                # Tronquer si trop long
                return desc[:120] + "..." if len(desc) > 120 else desc
            elif 'description_llm' in real_data:
                desc = real_data['description_llm'] 
                return desc[:120] + "..." if len(desc) > 120 else desc
        
        # Descriptions prédéfinies depuis enrichissement (courtes)
        if 'description_llm' in enrichment:
            desc = enrichment['description_llm']
            return desc[:120] + "..." if len(desc) > 120 else desc
        
        # 🎯 DESCRIPTIONS COURTES par type de page
        
        # /.well-known/* files
        if '/.well-known/' in path:
            return f"Core MCP protocol file: {path.split('/')[-1]}"
        
        # Tools
        if '/tools/' in path:
            tool_name = path.split('/')[-1].replace('-', ' ')
            return f"Tool for {tool_name} - implementation guide and utilities"
        
        # News (très court pour éviter répétition)
        if '/news/' in path:
            article_name = path.split('/')[-1].replace('-', ' ')
            return f"News: {article_name}"
        
        # Spec pages (court)
        if '/spec/' in path:
            return f"Technical specification: {path.split('/')[-1].replace('-', ' ')}"
        
        # LLMFeedHub (principal seulement)
        if '/llmfeedhub' == path:
            return "Interactive platform for testing and simulating MCP feeds"
        
        # Pages principales
        page_descriptions = {
            '/': 'MCP protocol introduction and overview',
            '/about': 'Mission and philosophy of the MCP initiative', 
            '/faq': 'Frequently asked questions about MCP',
            '/verify': 'Tool for verifying MCP feed signatures',
            '/ecosystem': 'Overview of MCP ecosystem and partners',
            '/join': 'Community participation and governance',
            '/sdk': 'Development kit and integration resources',
            '/feeds': 'Directory of known MCP feeds',
            '/legal': 'Legal framework and terms',
            '/why-sign': 'Importance of cryptographic signing'
        }
        
        if path in page_descriptions:
            return page_descriptions[path]
        
        # Fallback court
        clean_path = path.strip('/').replace('/', ' ').replace('-', ' ')
        return f"Resource about {clean_path}"
    
    def map_importance(self, priority: float, category: str, path: str, real_data: Optional[Dict[str, Any]] = None) -> str:
        """Map la priorité en niveau d'importance avec données réelles"""
        
        # Priority aux données réelles
        if real_data and 'importance' in real_data:
            return real_data['importance']
        
        # Règles spéciales pour certaines catégories
        if category == 'core_infrastructure':
            return 'critical'
        
        # Analyse du contenu réel pour ajuster l'importance
        if real_data:
            tags = real_data.get('tags', [])
            if any(tag in ['security', 'verification', 'critical'] for tag in tags):
                return 'critical'
            elif any(tag in ['tools', 'interactive', 'implementation'] for tag in tags):
                return 'high'
        
        # Pages critiques par URL
        critical_paths = ['/', '/verify', '/llmfeedhub', '/.well-known/mcp', '/tools/export-button']
        if any(critical in path for critical in critical_paths):
            return 'critical'
        
        # Mapping basé sur priority du sitemap
        if priority >= 0.9:
            return 'critical'
        elif priority >= 0.7:
            return 'high' 
        elif priority >= 0.5:
            return 'medium'
        else:
            return 'low'
    
    def generate_categories(self, entries: List[UrlEntry]) -> Dict[str, Any]:
        """Génère les catégories de feeds avec entrées - VERSION ALLÉGÉE"""
        
        categories = {}
        category_configs = self.category_rules.get('categories', {})
        
        # Groupe les entrées par catégorie
        for entry in entries:
            if entry.category not in categories:
                config = category_configs.get(entry.category, {})
                categories[entry.category] = {
                    "title": config.get('title', entry.category.replace('_', ' ').title()),
                    "description": config.get('description', f"Resources in the {entry.category} category"),
                    "entry_path": config.get('entry_point', entry.path),
                    "audience": config.get('audience', ['general']),
                    "trust_level": config.get('trust_level', 'signed'),  # Au niveau catégorie
                    "feeds": []
                }
            
            # Ajoute l'entrée formatée (VERSION ALLÉGÉE)
            feed_entry = {
                "url": entry.url,
                "title": self.generate_title_from_path(entry.path),
                "description": entry.description_llm,
                "intent": entry.intent,
                "audience": entry.audience,
                "importance": entry.importance,
                "tags": entry.tags
            }
            
            # Ajouter content_type seulement si différent de "general"
            if entry.content_type != "general":
                feed_entry["content_type"] = entry.content_type
            
            categories[entry.category]["feeds"].append(feed_entry)
        
        # Tri des feeds par importance
        for category in categories.values():
            category["feeds"].sort(key=lambda x: (
                {'critical': 0, 'high': 1, 'medium': 2, 'low': 3}[x['importance']]
            ))
        
        self.stats['categories_created'] = len(categories)
        return categories
    
    def generate_title_from_path(self, path: str) -> str:
        """Génère un titre intelligent depuis le chemin""" 
        
        # Titre spéciaux
        special_titles = {
            '/': 'Home - MCP Discovery Hub',
            '/about': 'About the MCP Initiative',
            '/faq': 'Frequently Asked Questions',
            '/verify': 'Feed Verification Tool',
            '/llmfeedhub': 'LLMFeed Testing Platform',
            '/tools/export-button': 'Export Button Demo',
            '/tools/sign-and-verify': 'Cryptographic Signing Tool'
        }
        
        if path in special_titles:
            return special_titles[path]
        
        # Génération automatique
        segments = [s for s in path.split('/') if s and s != 'en']
        if not segments:
            return 'Home'
        
        # Nettoyage et formatage
        title_parts = []
        for segment in segments:
            clean = segment.replace('-', ' ').replace('_', ' ')
            title_parts.append(clean.title())
        
        return ' - '.join(title_parts)
    
    def calculate_efficiency_metrics(self, entries: List[UrlEntry], final_feed: Dict[str, Any]) -> None:
        """Calcule les métriques d'efficacité vs crawling traditionnel"""
        
        # Estimation tokens pour crawling traditionnel
        total_pages_in_sitemap = self.stats['urls_processed'] + len(entries)  # Pages filtrées + retenues
        avg_tokens_per_page = 3500  # Estimation conservatrice pour une page moyenne
        crawling_tokens = total_pages_in_sitemap * avg_tokens_per_page
        
        # Estimation tokens de l'index
        index_json = json.dumps(final_feed)
        index_tokens = len(index_json) // 4  # Approximation 1 token = 4 caractères
        
        # Calcul d'efficacité
        if crawling_tokens > 0:
            efficiency_gain = ((crawling_tokens - index_tokens) / crawling_tokens) * 100
            token_savings = crawling_tokens - index_tokens
        else:
            efficiency_gain = 0
            token_savings = 0
        
        # Mise à jour des stats
        self.stats['crawling_alternative_tokens'] = crawling_tokens
        self.stats['index_tokens'] = index_tokens
        self.stats['efficiency_gain'] = f"{efficiency_gain:.1f}%"
        self.stats['token_savings'] = f"~{token_savings:,} tokens saved"
        
        logger.info(f"💰 Efficiency: {efficiency_gain:.1f}% token savings ({token_savings:,} tokens)")
    
    def generate_smart_routing(self, categories: Dict[str, Any], entries: List[UrlEntry]) -> Dict[str, Any]:
        """Génère le smart routing contextuel"""
        
        # Points d'entrée recommandés
        entry_points = self.detect_entry_points(entries)
        
        # Routing par audience
        audience_routing = self.generate_audience_routing(categories, entries)
        
        # Routing par intention
        intent_routing = self.generate_intent_routing(entries)
        
        # Routing contextuel
        context_routing = self.generate_context_routing(entries)
        
        self.stats['routes_generated'] = len(audience_routing) + len(intent_routing) + len(context_routing)
        
        return {
            "audience_based": audience_routing,
            "intent_based": intent_routing,
            "context_aware": context_routing,
            "optimization_hints": {
                "parallel_loading": self.get_parallel_loading_candidates(entries),
                "prefetch_candidates": self.get_prefetch_candidates(entries),
                "lazy_load_categories": ["community_content"]
            }
        }
    
    def detect_entry_points(self, entries: List[UrlEntry]) -> Dict[str, str]:
        """Détecte automatiquement les meilleurs points d'entrée"""
        
        entry_points = {}
        
        # Points d'entrée par type
        for entry in entries:
            if '/.well-known/mcp' in entry.path:
                entry_points["new_visitors"] = entry.path
                entry_points["llm"] = entry.path
            elif '/spec' in entry.path and entry.importance == 'critical':
                entry_points["developers"] = entry.path
            elif '/about' in entry.path:
                entry_points["business"] = entry.path
            elif '/tools/' in entry.path and entry.importance == 'high':
                if "implementers" not in entry_points:
                    entry_points["implementers"] = entry.path
        
        # Fallbacks intelligents
        if "new_visitors" not in entry_points:
            root_entry = next((e for e in entries if e.path == '/'), None)
            if root_entry:
                entry_points["new_visitors"] = root_entry.path
        
        return entry_points
    
    def generate_audience_routing(self, categories: Dict[str, Any], entries: List[UrlEntry]) -> Dict[str, Any]:
        """Génère le routing par audience"""
        
        # Analyse des audiences présentes
        all_audiences = set()
        for entry in entries:
            all_audiences.update(entry.audience)
        
        routing = {}
        
        for audience in all_audiences:
            # Séquence recommandée pour cette audience
            audience_entries = [e for e in entries if audience in e.audience]
            audience_entries.sort(key=lambda x: (
                {'critical': 0, 'high': 1, 'medium': 2, 'low': 3}[x.importance]
            ))
            
            # Point d'entrée optimal
            entry_point = None
            if audience == 'llm':
                entry_point = next((e.path for e in audience_entries if '/.well-known/mcp' in e.path), None)
            elif audience == 'developer':
                entry_point = next((e.path for e in audience_entries if '/spec' in e.path or '/tools/' in e.path), None)
            elif audience == 'business':
                entry_point = next((e.path for e in audience_entries if '/about' in e.path), None)
            
            if not entry_point and audience_entries:
                entry_point = audience_entries[0].path
            
            # Séquence de navigation
            sequence = [e.path.split('/')[-1] or 'home' for e in audience_entries[:5]]
            
            # Note comportementale
            behavioral_notes = {
                'llm': "Focus on protocol understanding and ethical guidance",
                'developer': "Emphasize practical implementation and code examples",
                'business': "Focus on value proposition and trust signals",
                'security': "Prioritize verification and trust mechanisms",
                'general': "Provide accessible overviews and clear navigation"
            }
            
            routing[audience] = {
                "entry_point": entry_point,
                "recommended_sequence": sequence,
                "behavioral_note": behavioral_notes.get(audience, f"Optimize for {audience} needs"),
                "priority_categories": [cat for cat, info in categories.items() 
                                      if audience in info.get('audience', [])],
                "token_budget_allocation": self.calculate_token_allocation(audience, categories)
            }
        
        return routing
    
    def generate_intent_routing(self, entries: List[UrlEntry]) -> Dict[str, List[str]]:
        """Génère le routing par intention"""
        
        intent_map = {}
        
        # Groupe par intention
        for entry in entries:
            intent = entry.intent
            if intent not in intent_map:
                intent_map[intent] = []
            intent_map[intent].append(entry.path.split('/')[-1] or 'home')
        
        # Intentions spécialisées
        intent_routing = {}
        
        # Mapping d'intentions intelligentes
        intent_mappings = {
            "understand_platform": ["about", "manifesto", "mcp", "faq"],
            "implement_solution": ["spec", "tools", "examples", "getting-started"],
            "validate_feeds": ["verify", "sign-and-verify", "schema"],
            "browse_content": ["ecosystem", "feeds", "community"],
            "evaluate_trust": ["manifesto", "certification", "verify"],
            "get_started": ["mcp", "getting-started", "tools"],
            "explore_ecosystem": ["ecosystem", "feeds", "partners"]
        }
        
        # Construction avec données réelles
        for intent_name, preferred_paths in intent_mappings.items():
            matching_entries = []
            for path_part in preferred_paths:
                matches = [e for e in entries if path_part in e.path]
                matching_entries.extend(matches)
            
            if matching_entries:
                # Déduplique et trie par importance
                unique_entries = list({e.path: e for e in matching_entries}.values())
                unique_entries.sort(key=lambda x: (
                    {'critical': 0, 'high': 1, 'medium': 2, 'low': 3}[x.importance]
                ))
                intent_routing[intent_name] = [e.path.split('/')[-1] or 'home' for e in unique_entries[:4]]
        
        return intent_routing
    
    def generate_context_routing(self, entries: List[UrlEntry]) -> Dict[str, str]:
        """Génère le routing contextuel"""
        
        return {
            "first_visit": "Start with mcp.llmfeed.json for protocol handshake, then follow audience-based routing",
            "return_visit": "Check updated feeds first, then continue previous navigation path",
            "specific_task": "Use intent-based routing to go directly to relevant feeds, skip general orientation",
            "mobile_agent": "Prioritize lightweight feeds and core infrastructure, defer complex documentation",
            "bandwidth_limited": "Focus on core_infrastructure category only, use cached versions when available",
            "high_trust_required": "Verify all feeds using trust_level metadata, prioritize signed content",
            "exploration_mode": "Start with ecosystem overview, then browse community_content for discovery"
        }
    
    def calculate_token_allocation(self, audience: str, categories: Dict[str, Any]) -> Dict[str, int]:
        """Calcule l'allocation de tokens optimale par audience"""
        
        allocations = {
            'llm': {'core': 70, 'docs': 20, 'tools': 5, 'community': 5},
            'developer': {'core': 30, 'docs': 40, 'tools': 25, 'community': 5},
            'business': {'core': 50, 'docs': 20, 'tools': 10, 'community': 20},
            'security': {'core': 60, 'docs': 30, 'tools': 10, 'community': 0},
            'general': {'core': 40, 'docs': 25, 'tools': 15, 'community': 20}
        }
        
        return allocations.get(audience, allocations['general'])
    
    def get_parallel_loading_candidates(self, entries: List[UrlEntry]) -> List[str]:
        """Identifie les feeds qui peuvent être chargés en parallèle"""
        
        core_feeds = [e.path for e in entries if e.category == 'core_infrastructure' and e.importance in ['critical', 'high']]
        return core_feeds[:3]  # Top 3 pour éviter surcharge
    
    def get_prefetch_candidates(self, entries: List[UrlEntry]) -> List[str]:
        """Identifie les feeds à précharger"""
        
        prefetch = []
        
        # Feeds critiques
        critical_entries = [e for e in entries if e.importance == 'critical']
        prefetch.extend([e.path.split('/')[-1] or 'home' for e in critical_entries[:3]])
        
        # Feeds populaires
        high_importance = [e for e in entries if e.importance == 'high']
        prefetch.extend([e.path.split('/')[-1] or 'home' for e in high_importance[:2]])
        
        return list(set(prefetch))  # Déduplique
    
    def generate_behavior_recommendations(self, entries: List[UrlEntry]) -> Dict[str, Any]:
        """Génère les recommandations comportementales pour agents"""
        
        return {
            "discovery_strategy": {
                "new_site": "Start with mcp.llmfeed.json for site overview, then follow recommended_entry_points based on your purpose",
                "return_visit": "Check lastmod timestamps to prioritize changed feeds, maintain navigation context from previous visits",
                "specific_intent": "Use intent_based routing for targeted discovery, skip general orientation unless needed",
                "resource_constrained": "Focus on core_infrastructure only, defer optional content to reduce token usage"
            },
            "trust_evaluation": {
                "signed_feeds": "High confidence - suitable for autonomous action and decision making",
                "verified_feeds": "Medium confidence - cross-reference with manifesto values before acting",
                "basic_feeds": "Low confidence - treat as informational only, require human confirmation for actions",
                "unverified_feeds": "Reject or flag for manual review - do not use for decision making"
            },
            "resource_optimization": {
                "token_budget_low": "Prioritize core_infrastructure category only, skip detailed documentation",
                "token_budget_medium": "Add highest priority feeds from each category, summarize long content",
                "token_budget_high": "Full discovery following recommended sequences, include detailed analysis",
                "bandwidth_limited": "Prefer cached versions, minimize large exports, use lightweight feeds"
            },
            "error_handling": {
                "feed_unavailable": "Continue with available feeds, note degraded capability in responses",
                "invalid_feed": "Skip and flag for review, don't fail entire discovery process",
                "authentication_required": "Respect access controls, suggest public alternatives when available",
                "timeout_exceeded": "Cache partial results, retry with smaller scope or defer to later"
            },
            "interaction_patterns": {
                "conversational": "Use natural language summaries of feed contents, explain context and relationships",
                "api_driven": "Provide structured endpoints and capabilities, focus on technical integration details",
                "exploratory": "Suggest related feeds and discovery paths, encourage deeper investigation",
                "task_focused": "Filter feeds by relevance to specific goals, provide actionable next steps"
            }
        }
    
    def assemble_final_feed(self, entries: List[UrlEntry]) -> Dict[str, Any]:
        """Assemble le feed final avec toutes les données"""
        
        # Génération des composants
        categories = self.generate_categories(entries)
        smart_routing = self.generate_smart_routing(categories, entries)
        behavior_recommendations = self.generate_behavior_recommendations(entries)
        entry_points = self.detect_entry_points(entries)
        
        # High priority feeds
        high_priority = [e.path for e in entries if e.importance in ['critical', 'high']][:5]
        
        # Application du template
        feed = self.template.copy()
        
        # Calcul des métriques d'efficacité
        self.calculate_efficiency_metrics(entries, feed)
        
        # Remplacement des placeholders
        replacements = {
            "{{SITE_NAME}}": "WellKnownMCP",
            "{{ORIGIN}}": "https://wellknownmcp.org",
            "{{TIMESTAMP}}": datetime.utcnow().isoformat() + "Z",
            "{{TOTAL_FEEDS}}": str(len([e for e in entries if e.url.endswith('.json')])),
            "{{TOTAL_PAGES}}": str(len(entries)),
            "{{ENTRY_POINTS}}": entry_points,
            "{{HIGH_PRIORITY}}": high_priority,
            "{{CATEGORIES}}": categories,
            "{{SMART_ROUTING}}": smart_routing,
            "{{BEHAVIOR_RECOMMENDATIONS}}": behavior_recommendations,
            "{{EFFICIENCY_GAIN}}": self.stats['efficiency_gain'],
            "{{TOKEN_SAVINGS}}": self.stats['token_savings']
        }
        
        # Application récursive des remplacements
        feed_str = json.dumps(feed)
        for placeholder, value in replacements.items():
            if isinstance(value, (dict, list)):
                # Pour les objets complexes, on fait un remplacement plus sophistiqué
                feed_str = feed_str.replace(f'"{placeholder}"', json.dumps(value))
            else:
                feed_str = feed_str.replace(placeholder, str(value))
        
        final_feed = json.loads(feed_str)
        
        # Ajout des stats de build
        if 'metadata' in final_feed:
            final_feed['metadata']['build_stats'] = self.stats
            final_feed['metadata']['real_data_coverage'] = f"{(self.stats['enrichments_applied'] / self.stats['urls_processed'] * 100):.1f}%" if self.stats['urls_processed'] > 0 else "0%"
        
        # Génération signature placeholder plus réaliste
        if 'signature' in final_feed and final_feed['signature']['value'] == 'placeholder_signature_to_be_generated':
            final_feed['signature']['value'] = self.generate_demo_signature()
        
        if 'certification' in final_feed and final_feed['certification']['value'] == 'placeholder_certification_to_be_generated':
            final_feed['certification']['value'] = self.generate_demo_certification()
        
        return final_feed
    
    def generate_demo_signature(self) -> str:
        """Génère une signature de démonstration réaliste"""
        import hashlib
        import base64
        
        # Signature basée sur le contenu (pour cohérence)
        content_hash = hashlib.sha256(str(self.stats).encode()).digest()
        return base64.b64encode(content_hash[:32]).decode()  # Taille réaliste pour ed25519
    
    def generate_demo_certification(self) -> str:
        """Génère une certification de démonstration réaliste"""
        import hashlib
        import base64
        
        # Certification basée sur les stats (pour cohérence)
        cert_data = f"llmca-cert-{self.stats['urls_processed']}-{self.stats['categories_created']}"
        cert_hash = hashlib.sha256(cert_data.encode()).digest()
        return base64.b64encode(cert_hash[:32]).decode()
    
    def generate_llm_index(self) -> Dict[str, Any]:
        """Génération principale de l'index LLM"""
        
        logger.info("🧠 Génération de l'index de navigation intelligent...")
        start_time = datetime.utcnow()
        
        try:
            # Parse et enrichit le sitemap
            entries = self.parse_sitemap()
            
            if not entries:
                logger.error("❌ Aucune entrée trouvée dans le sitemap")
                return {}
            
            # Assembly final
            final_feed = self.assemble_final_feed(entries)
            
            # Stats finales
            self.stats['build_time'] = (datetime.utcnow() - start_time).total_seconds()
            
            logger.info(f"✅ Index généré avec succès:")
            logger.info(f"   📊 {self.stats['urls_processed']} URLs traitées")
            logger.info(f"   📚 {self.stats['categories_created']} catégories créées") 
            logger.info(f"   🧭 {self.stats['routes_generated']} routes générées")
            logger.info(f"   💰 Efficacité: {self.stats['efficiency_gain']} vs crawling")
            logger.info(f"   ⚡ Temps de build: {self.stats['build_time']:.2f}s")
            
            return final_feed
            
        except Exception as e:
            logger.error(f"❌ Erreur génération: {e}")
            import traceback
            traceback.print_exc()
            return {}
    
    def save_feed(self, feed: Dict[str, Any]) -> Path:
        """Sauvegarde le feed généré"""
        
        if not feed:
            logger.error("❌ Feed vide, abandon de la sauvegarde")
            return None
        
        # Création du dossier
        self.output_file.parent.mkdir(parents=True, exist_ok=True)
        
        # Écriture avec formatage optimisé
        with open(self.output_file, 'w', encoding='utf-8') as f:
            json.dump(feed, f, indent=2, ensure_ascii=False, separators=(',', ': '))
        
        # Stats fichier
        file_size = round(self.output_file.stat().st_size / 1024, 1)
        logger.info(f"💾 Feed sauvé: {self.output_file} ({file_size} KB)")
        
        return self.output_file

def main():
    """Point d'entrée principal"""
    
    import argparse
    
    parser = argparse.ArgumentParser(description="LLM Index Generator - Navigation intelligente")
    parser.add_argument("--sitemap", help="Fichier sitemap custom")
    parser.add_argument("--output", help="Fichier de sortie custom")
    parser.add_argument("--dry-run", action="store_true", help="Simulation sans sauvegarde")
    parser.add_argument("--stats", action="store_true", help="Affiche les statistiques détaillées")
    
    args = parser.parse_args()
    
    print("🧠 LLM Index Generator - L'outil ultime de navigation")
    print("=" * 60)
    
    try:
        generator = LLMIndexGenerator()
        
        # Override des chemins
        if args.sitemap:
            generator.sitemap_file = Path(args.sitemap)
        if args.output:
            generator.output_file = Path(args.output)
        
        # Vérifications préliminaires
        if not generator.sitemap_file.exists():
            logger.error(f"❌ Sitemap introuvable: {generator.sitemap_file}")
            return 1
        
        logger.info(f"📍 Sitemap source: {generator.sitemap_file}")
        logger.info(f"📄 Sortie: {generator.output_file}")
        
        # Génération
        feed = generator.generate_llm_index()
        
        if not feed:
            logger.error("❌ Échec de génération")
            return 1
        
        if args.dry_run:
            print("\n💡 Mode simulation - aperçu des résultats:")
            print(f"📊 URLs traitées: {generator.stats['urls_processed']}")
            print(f"📚 Catégories: {generator.stats['categories_created']}")
            print(f"🧭 Routes: {generator.stats['routes_generated']}")
            print(f"💰 Efficacité: {generator.stats['efficiency_gain']}")
            
            if args.stats:
                print(f"\n📈 Stats détaillées:")
                for key, value in generator.stats.items():
                    print(f"   {key}: {value}")
            
            return 0
        
        # Sauvegarde
        output_path = generator.save_feed(feed)
        
        if output_path:
            print("\n🎉 Génération terminée avec succès!")
            print(f"📊 Stats finales: {generator.stats}")
            print(f"📄 Index créé: {output_path}")
            print(f"💰 Efficacité vs crawling: {generator.stats['efficiency_gain']}")
            
        else:
            logger.error("❌ Échec de sauvegarde")
            return 1
        
        return 0
        
    except Exception as e:
        logger.error(f"❌ Erreur critique: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    exit(main())