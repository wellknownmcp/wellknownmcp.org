#!/usr/bin/env python3
"""
LLM Index Generator Enhanced - L'outil ultime de navigation intelligente avec support multi-versions
Transforme un sitemap plat en système de navigation contextuelle pour agents
NOUVEAU: Support natif des versions multiples de homepage (simple/tech/business/agent/rabbit)

Usage: python llm_index_generator_enhanced.py
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
ENRICHMENT_FILE = CONFIG_DIR / "llm-index-enrichment.json"  # 🆕 Version enrichie
CATEGORY_FILE = CONFIG_DIR / "llm-index-categories.json"

# Logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class UrlEntry:
    """Entrée URL enrichie du sitemap avec support multi-versions"""
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
    # 🆕 Nouveau : Support versions
    version_info: Optional[Dict[str, Any]] = None
    is_versioned: bool = False

class LLMIndexGenerator:
    """Générateur d'index intelligent avec support multi-versions homepage"""
    
    def __init__(self):
        self.sitemap_file = SITEMAP_FILE
        self.output_file = OUTPUT_FILE
        self.compiled_site_file = PROJECT_ROOT / "public/.well-known/exports/compiled-site.llmfeed.json"
        
        # Chargement des configurations
        self.template = self.load_template()
        self.enrichments = self.load_enrichments()
        self.category_rules = self.load_category_rules()
        self.compiled_site_data = self.load_compiled_site_data()
        
        # 🆕 Configuration des versions homepage
        self.homepage_versions = self.enrichments.get('homepage_versions', {})
        self.version_configs = self.homepage_versions.get('version_configs', {})
        self.version_routing = self.enrichments.get('version_routing_logic', {})
        
        # Stats et métriques
        self.stats = {
            'urls_processed': 0,
            'categories_created': 0,
            'routes_generated': 0,
            'enrichments_applied': 0,
            'versions_detected': 0,  # 🆕 Nombre de versions détectées
            'build_time': None,
            'crawling_alternative_tokens': 0,
            'index_tokens': 0,
            'efficiency_gain': '0%'
        }
        
        # Cache pour optimisation
        self.url_cache = {}
        self.pattern_cache = {}
        self.version_cache = {}  # 🆕 Cache pour les versions
    
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
        """Génère le template parfait pour navigation intelligente avec versions"""
        return {
            "feed_type": "llm-index",
            "metadata": {
                "title": "{{SITE_NAME}} - Intelligent Discovery Hub with Multi-Version Support",
                "origin": "{{ORIGIN}}",
                "description": "Intelligent navigation system with persona-based routing and multi-version homepage support. Transforms flat URL lists into contextual, audience-aware navigation with optimal content delivery.",
                "purpose": "Enhanced sitemap for LLMs with multi-version homepage support - enables persona-based routing and optimal content discovery",
                "features": {
                    "multi_version_homepage": "5 persona-optimized versions (simple/tech/business/agent/rabbit)",
                    "intelligent_routing": "Automatic persona detection and optimal version selection",
                    "efficiency_optimization": "{{EFFICIENCY_GAIN}} vs traditional crawling",
                    "token_savings": "{{TOKEN_SAVINGS}}"
                },
                "generated_at": "{{TIMESTAMP}}",
                "version": "3.0.0",
                "total_feeds": "{{TOTAL_FEEDS}}",
                "total_pages": "{{TOTAL_PAGES}}",
                "homepage_versions": "{{VERSION_COUNT}}",
                "tags": ["navigation", "discovery", "intelligent", "contextual", "llm-optimized", "multi-version", "persona-routing"],
                "content_type": "enhanced_navigation_hub",
                "lang": "en",
                "references": {
                    "specification": "https://wellknownmcp.org/spec/02_llmfeed_feedtype/llmfeed_feedtype_llm-index",
                    "feedback_and_comments": "https://wellknownmcp.org/join",
                    "live_discussion": "https://wellknownmcp.org/join"
                }
            },
            "homepage_intelligence": {
                "version_selection_strategy": "{{VERSION_STRATEGY}}",
                "available_versions": "{{AVAILABLE_VERSIONS}}",
                "routing_logic": "{{ROUTING_LOGIC}}",
                "persona_detection": {
                    "agent_signals": "User-Agent patterns, referrer analysis, behavioral indicators",
                    "business_signals": "LinkedIn referrers, business query terms, executive user patterns",
                    "technical_signals": "GitHub referrers, technical query terms, developer behavior",
                    "fallback_strategy": "Route to simple version for uncertain classification"
                }
            },
            "discovery_guidance": {
                "recommended_entry_points": "{{ENTRY_POINTS}}",
                "high_priority_feeds": "{{HIGH_PRIORITY}}",
                "version_specific_routing": "{{VERSION_ROUTING}}",
                "navigation_philosophy": "Persona-aware routing that adapts content complexity and focus to user expertise and intent. Each homepage version optimizes for different audience needs while maintaining full ecosystem access.",
                "usage_instructions": {
                    "agents": "Use /?v=agent for direct protocol access, structured metadata, and minimal interface abstractions",
                    "developers": "Start with /?v=tech for implementation focus, then follow technical documentation paths",
                    "business": "Begin with /?v=business for ROI analysis, case studies, and strategic overview",
                    "newcomers": "Use /?v=simple (default) for clear introduction without technical complexity",
                    "power_users": "Explore /?v=rabbit for comprehensive ecosystem view with maximum information density"
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
                "discovery_depth": "adaptive_to_version",
                "trust_weight": "high",
                "fallback_behavior": "graceful_with_alternatives",
                "performance_optimization": "enabled",
                "version_awareness": "automatically_detect_optimal_version",
                "note": "This enhanced sitemap supports multi-version homepage routing for optimal audience targeting. Use version parameters for precise content delivery."
            }
        }
    
    def load_enrichments(self) -> Dict[str, Any]:
        """Charge les enrichissements avec gestion multi-versions"""
        try:
            with open(ENRICHMENT_FILE, 'r', encoding='utf-8') as f:
                enrichments = json.load(f)
            logger.info(f"✅ Enrichissements avancés chargés: {len(enrichments.get('url_patterns', {}))} patterns")
            return enrichments
        except Exception as e:
            logger.warning(f"⚠️ Enrichissements non trouvés, génération automatique: {e}")
            return self.generate_smart_enrichments()
    
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
                    
                # Mapping spécifique pour les versions homepage
                version_mappings = {
                    'simple_landing': ['/?v=simple', '/simple', '/en/?v=simple'],
                    'tech_landing': ['/?v=tech', '/tech', '/en/?v=tech'],
                    'business_landing': ['/?v=business', '/business', '/en/?v=business'],
                    'agent_landing': ['/?v=agent', '/agent', '/en/?v=agent'],
                    'rabbit_landing': ['/?v=rabbit', '/rabbit', '/en/?v=rabbit'],
                    'home': ['/', '/index', '/en/', '/en/index']
                }
                
                if block_name in version_mappings:
                    for path in version_mappings[block_name]:
                        indexed_data[path] = file_block
            
            logger.info(f"✅ Compiled site data loaded: {len(files)} blocks indexed")
            return indexed_data
            
        except Exception as e:
            logger.warning(f"⚠️ Could not load compiled site data: {e}")
            return {}
    
    def detect_version_from_url(self, url: str, path: str) -> Optional[Dict[str, Any]]:
        """🆕 Détecte la version depuis l'URL et retourne les infos de version"""
        
        # Détection par paramètre de requête
        if '?v=' in url:
            version_match = re.search(r'[?&]v=([^&]+)', url)
            if version_match:
                version = version_match.group(1)
                if version in self.version_configs:
                    return {
                        'version': version,
                        'detection_method': 'query_parameter',
                        'config': self.version_configs[version]
                    }
        
        # Détection par path (fallback)
        version_path_patterns = {
            'simple': ['/simple', '/?v=simple'],
            'tech': ['/tech', '/?v=tech'], 
            'business': ['/business', '/?v=business'],
            'agent': ['/agent', '/?v=agent'],
            'rabbit': ['/rabbit', '/?v=rabbit']
        }
        
        for version, patterns in version_path_patterns.items():
            if any(pattern in path for pattern in patterns):
                if version in self.version_configs:
                    return {
                        'version': version,
                        'detection_method': 'path_pattern',
                        'config': self.version_configs[version]
                    }
        
        # Version par défaut pour homepage root
        if path in ['/', '/index', '/en/', '/en/index']:
            default_version = self.homepage_versions.get('default_version', 'simple')
            if default_version in self.version_configs:
                return {
                    'version': default_version,
                    'detection_method': 'default_homepage',
                    'config': self.version_configs[default_version]
                }
        
        return None
    
    def should_include_url(self, url: str, path: str, processed_paths: Set[str]) -> bool:
        """🔄 Filtre intelligent mis à jour pour les versions homepage"""
        
        # Éviter les doublons
        if path in processed_paths:
            return False
        
        # 🆕 Toujours inclure les versions homepage
        version_info = self.detect_version_from_url(url, path)
        if version_info:
            return True
        
        # Le reste de la logique existante...
        exclusions = [
            '/api/',
            '/_next/',
            '/node_modules/',
            '.tmp',
            '.temp',
            '/llmfeedhub/demo/',
            '/llmfeedhub/examples/',
            '/llmfeedhub/.well-known/',
        ]
        
        for exclusion in exclusions:
            if exclusion in path:
                return False
        
        # Pages CRITIQUES à toujours inclure
        always_include = [
            '/.well-known/mcp.llmfeed.json',
            '/.well-known/manifesto.llmfeed.json',
            '/.well-known/capabilities.llmfeed.json',
            '/.well-known/llm-index.llmfeed.json',
            '/tools/export-button',
            '/tools/well-known',
            '/verify',
            '/llmfeedhub',
            '/ecosystem',
            '/sdk',
            '/spec',
            '/feeds',
        ]
        
        for important in always_include:
            if important == path:
                return True
        
        # Filtrage intelligent standard
        if path.startswith('/spec/'):
            essential_spec = [
                '/spec',
                '/spec/README',
                '/spec/MANIFESTO',
                '/spec/ADOPTION',
                '/spec/CHANGELOG'
            ]
            if path not in essential_spec:
                return False
        
        # Filtres i18n
        if re.search(r'/(?:fr|es|hi|zh|ar|uk)/', path):
            return False
        
        # .well-known essentiels
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
        
        # Pages fondamentales
        if path in ['/', '/en/', '/about', '/faq', '/legal', '/why-sign', '/ecosystem', '/sdk', '/feeds']:
            return True
        
        # News importantes
        if '/news/' in path:
            return self.is_important_recent_news(url, path)
        
        # Tools essentiels
        if path.startswith('/tools/'):
            essential_tools = [
                'export-button',
                'well-known',
                'sign-and-verify',
                'api-explained'
            ]
            return any(tool in path for tool in essential_tools)
        
        return False
    
    def enrich_url(self, url: str, path: str, priority: float, lastmod: str, changefreq: str) -> UrlEntry:
        """🔄 Enrichit une URL avec support multi-versions"""
        
        cache_key = f"{path}:{priority}"
        if cache_key in self.url_cache:
            return self.url_cache[cache_key]
        
        # 🆕 Détection de version
        version_info = self.detect_version_from_url(url, path)
        is_versioned = version_info is not None
        
        if is_versioned:
            self.stats['versions_detected'] += 1
            logger.debug(f"🎯 Version détectée: {version_info['version']} pour {path}")
        
        # Enrichissement depuis les données réelles ou patterns
        real_data = self.get_real_page_data(path)
        
        if real_data:
            enrichment = self.extract_enrichment_from_real_data(real_data, path)
            self.stats['enrichments_applied'] += 1
        else:
            enrichment = self.detect_url_pattern(path)
        
        # 🆕 Application de l'enrichissement spécifique à la version
        if is_versioned:
            version_config = version_info['config']
            enrichment.update({
                'audience': version_config.get('audience', enrichment.get('audience', ['general'])),
                'intent': version_config.get('intent', enrichment.get('intent', 'inform')),
                'description_llm': version_config.get('description_llm', enrichment.get('description_llm', '')),
                'tags': list(set(enrichment.get('tags', []) + version_config.get('tags', []))),
                'trust_level': version_config.get('trust_level', enrichment.get('trust_level', 'basic')),
                'smart_routing_weight': version_config.get('smart_routing_weight', enrichment.get('smart_routing_weight', 5))
            })
        
        # Catégorisation et description
        category = self.categorize_url(path, enrichment, real_data)
        description_llm = self.generate_llm_description(path, category, enrichment, real_data, version_info)
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
            content_type=enrichment.get('content_type', 'general'),
            version_info=version_info,
            is_versioned=is_versioned
        )
        
        self.url_cache[cache_key] = entry
        return entry
    
    def generate_llm_description(self, path: str, category: str, enrichment: Dict[str, Any], 
                                real_data: Optional[Dict[str, Any]] = None, 
                                version_info: Optional[Dict[str, Any]] = None) -> str:
        """🔄 Description LLM enrichie avec info de version"""
        
        # 🆕 Description spécialisée pour versions
        if version_info:
            version = version_info['version']
            version_config = version_info['config']
            base_desc = version_config.get('description_llm', '')
            
            if base_desc:
                return base_desc
        
        # Fallback sur les descriptions existantes
        if real_data and 'llm_summary' in real_data:
            desc = real_data['llm_summary']
            return desc[:120] + "..." if len(desc) > 120 else desc
        
        if 'description_llm' in enrichment:
            desc = enrichment['description_llm']
            return desc[:120] + "..." if len(desc) > 120 else desc
        
        # Descriptions courtes par type de page
        if '/.well-known/' in path:
            return f"Core MCP protocol file: {path.split('/')[-1]}"
        
        if '/tools/' in path:
            tool_name = path.split('/')[-1].replace('-', ' ')
            return f"Tool for {tool_name} - implementation guide and utilities"
        
        # Pages principales
        page_descriptions = {
            '/': 'Multi-version MCP protocol introduction with intelligent persona routing',
            '/about': 'Mission and philosophy of the MCP initiative',
            '/faq': 'Frequently asked questions about MCP',
            '/verify': 'Tool for verifying MCP feed signatures',
            '/ecosystem': 'Overview of MCP ecosystem and partners',
        }
        
        if path in page_descriptions:
            return page_descriptions[path]
        
        # Fallback
        clean_path = path.strip('/').replace('/', ' ').replace('-', ' ')
        return f"Resource about {clean_path}"
    
    def generate_version_routing_logic(self, entries: List[UrlEntry]) -> Dict[str, Any]:
        """🆕 Génère la logique de routage pour les versions"""
        
        # Collecte des versions détectées
        detected_versions = {}
        versioned_entries = [e for e in entries if e.is_versioned]
        
        for entry in versioned_entries:
            if entry.version_info:
                version = entry.version_info['version']
                if version not in detected_versions:
                    detected_versions[version] = {
                        'version': version,
                        'url': entry.url,
                        'path': entry.path,
                        'audience': entry.audience,
                        'intent': entry.intent,
                        'description': entry.description_llm,
                        'config': entry.version_info['config']
                    }
        
        # Construction de la logique de routage
        routing_logic = {
            'available_versions': detected_versions,
            'version_count': len(detected_versions),
            'default_version': self.homepage_versions.get('default_version', 'simple'),
            'detection_strategies': self.version_routing,
            'routing_recommendations': {
                'ai_agents': 'agent',
                'developers': 'tech', 
                'business_users': 'business',
                'newcomers': 'simple',
                'power_users': 'rabbit'
            },
            'fallback_sequence': ['simple', 'tech', 'agent', 'business', 'rabbit']
        }
        
        return routing_logic
    
    def parse_sitemap(self) -> List[UrlEntry]:
        """🔄 Parse le sitemap avec support multi-versions"""
        logger.info(f"🔍 Analyse du sitemap avec support multi-versions: {self.sitemap_file}")
        
        try:
            tree = ET.parse(self.sitemap_file)
            root = tree.getroot()
            
            ns = {'sitemap': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
            
            entries = []
            processed_paths = set()
            
            for url_elem in root.findall('.//sitemap:url', ns):
                try:
                    loc = url_elem.find('sitemap:loc', ns)
                    if loc is None or not loc.text:
                        continue
                    
                    url = loc.text.strip()
                    parsed_url = urlparse(url)
                    path = parsed_url.path
                    
                    # Gestion spéciale pour les paramètres de version
                    if parsed_url.query and 'v=' in parsed_url.query:
                        path_with_query = f"{path}?{parsed_url.query}"
                        
                        # Utilise le path avec query pour le traitement
                        if not self.should_include_url(url, path_with_query, processed_paths):
                            continue
                        processed_paths.add(path_with_query)
                    else:
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
            
            logger.info(f"✅ {len(entries)} URLs enrichies ({self.stats['versions_detected']} versions détectées)")
            return entries
            
        except Exception as e:
            logger.error(f"❌ Erreur parsing sitemap: {e}")
            return []
    
    # Les autres méthodes restent identiques mais avec logging amélioré...
    def generate_categories(self, entries: List[UrlEntry]) -> Dict[str, Any]:
        """Génère les catégories avec indication des versions"""
        categories = {}
        category_configs = self.category_rules.get('categories', {})
        
        for entry in entries:
            if entry.category not in categories:
                config = category_configs.get(entry.category, {})
                categories[entry.category] = {
                    "title": config.get('title', entry.category.replace('_', ' ').title()),
                    "description": config.get('description', f"Resources in the {entry.category} category"),
                    "entry_path": config.get('entry_point', entry.path),
                    "audience": config.get('audience', ['general']),
                    "trust_level": config.get('trust_level', 'signed'),
                    "feeds": []
                }
            
            # Ajoute l'entrée avec info de version si applicable
            feed_entry = {
                "url": entry.url,
                "title": self.generate_title_from_path(entry.path),
                "description": entry.description_llm,
                "intent": entry.intent,
                "audience": entry.audience,
                "importance": entry.importance,
                "tags": entry.tags
            }
            
            # 🆕 Ajouter info de version
            if entry.is_versioned and entry.version_info:
                feed_entry["version"] = entry.version_info['version']
                feed_entry["version_audience"] = entry.version_info['config'].get('audience', [])
            
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
    
    def assemble_final_feed(self, entries: List[UrlEntry]) -> Dict[str, Any]:
        """🔄 Assembly final avec support multi-versions"""
        
        # Génération des composants
        categories = self.generate_categories(entries)
        smart_routing = self.generate_smart_routing(categories, entries)
        behavior_recommendations = self.generate_behavior_recommendations(entries)
        entry_points = self.detect_entry_points(entries)
        
        # 🆕 Génération logique de routage des versions
        version_routing = self.generate_version_routing_logic(entries)
        
        # High priority feeds
        high_priority = [e.path for e in entries if e.importance in ['critical', 'high']][:5]
        
        # Application du template
        feed = self.template.copy()
        
        # Calcul des métriques
        self.calculate_efficiency_metrics(entries, feed)
        
        # Remplacement des placeholders avec support versions
        replacements = {
            "{{SITE_NAME}}": "WellKnownMCP",
            "{{ORIGIN}}": "https://wellknownmcp.org",
            "{{TIMESTAMP}}": datetime.utcnow().isoformat() + "Z",
            "{{TOTAL_FEEDS}}": str(len([e for e in entries if e.url.endswith('.json')])),
            "{{TOTAL_PAGES}}": str(len(entries)),
            "{{VERSION_COUNT}}": str(version_routing['version_count']),
            "{{ENTRY_POINTS}}": entry_points,
            "{{HIGH_PRIORITY}}": high_priority,
            "{{CATEGORIES}}": categories,
            "{{SMART_ROUTING}}": smart_routing,
            "{{BEHAVIOR_RECOMMENDATIONS}}": behavior_recommendations,
            "{{VERSION_STRATEGY}}": version_routing,
            "{{AVAILABLE_VERSIONS}}": list(version_routing['available_versions'].keys()),
            "{{ROUTING_LOGIC}}": version_routing['detection_strategies'],
            "{{VERSION_ROUTING}}": version_routing['routing_recommendations'],
            "{{EFFICIENCY_GAIN}}": self.stats['efficiency_gain'],
            "{{TOKEN_SAVINGS}}": self.stats['token_savings']
        }
        
        # Application récursive des remplacements
        feed_str = json.dumps(feed)
        for placeholder, value in replacements.items():
            if isinstance(value, (dict, list)):
                feed_str = feed_str.replace(f'"{placeholder}"', json.dumps(value))
            else:
                feed_str = feed_str.replace(placeholder, str(value))
        
        final_feed = json.loads(feed_str)
        
        # Ajout des stats de build avec versions
        if 'metadata' in final_feed:
            final_feed['metadata']['build_stats'] = self.stats
            final_feed['metadata']['version_support'] = {
                'enabled': True,
                'versions_detected': self.stats['versions_detected'],
                'version_coverage': f"{(self.stats['versions_detected'] / max(1, len(self.version_configs)) * 100):.1f}%"
            }
        
        return final_feed
    
    # Méthodes utilitaires conservées...
    def generate_title_from_path(self, path: str) -> str:
        """Génère un titre intelligent depuis le chemin avec support versions"""
        
        # 🆕 Titres spéciaux pour versions
        if '?v=' in path:
            version_match = re.search(r'[?&]v=([^&]+)', path)
            if version_match:
                version = version_match.group(1)
                version_names = {
                    'simple': 'Simple Introduction',
                    'tech': 'Technical Implementation',
                    'business': 'Business Overview', 
                    'agent': 'Agent Interface',
                    'rabbit': 'Complete Exploration'
                }
                return f"Homepage - {version_names.get(version, version.title())} Version"
        
        # Titres spéciaux standards
        special_titles = {
            '/': 'Multi-Version Homepage - MCP Discovery Hub',
            '/about': 'About the MCP Initiative',
            '/faq': 'Frequently Asked Questions',
            '/verify': 'Feed Verification Tool',
            '/llmfeedhub': 'LLMFeed Testing Platform',
        }
        
        if path in special_titles:
            return special_titles[path]
        
        # Génération automatique
        segments = [s for s in path.split('/') if s and s != 'en']
        if not segments:
            return 'Multi-Version Homepage'
        
        title_parts = []
        for segment in segments:
            clean = segment.replace('-', ' ').replace('_', ' ')
            title_parts.append(clean.title())
        
        return ' - '.join(title_parts)
    
    # Le reste des méthodes restent identiques...
    def calculate_efficiency_metrics(self, entries: List[UrlEntry], final_feed: Dict[str, Any]) -> None:
        """Calcule les métriques d'efficacité"""
        total_pages_in_sitemap = self.stats['urls_processed'] + len(entries)
        avg_tokens_per_page = 3500
        crawling_tokens = total_pages_in_sitemap * avg_tokens_per_page
        
        index_json = json.dumps(final_feed)
        index_tokens = len(index_json) // 4
        
        if crawling_tokens > 0:
            efficiency_gain = ((crawling_tokens - index_tokens) / crawling_tokens) * 100
            token_savings = crawling_tokens - index_tokens
        else:
            efficiency_gain = 0
            token_savings = 0
        
        self.stats['crawling_alternative_tokens'] = crawling_tokens
        self.stats['index_tokens'] = index_tokens
        self.stats['efficiency_gain'] = f"{efficiency_gain:.1f}%"
        self.stats['token_savings'] = f"~{token_savings:,} tokens saved"
        
        logger.info(f"💰 Efficiency: {efficiency_gain:.1f}% ({self.stats['versions_detected']} versions)")
    
    def generate_llm_index(self) -> Dict[str, Any]:
        """🔄 Génération principale avec support multi-versions"""
        
        logger.info("🧠 Génération de l'index de navigation intelligent avec support multi-versions...")
        start_time = datetime.utcnow()
        
        try:
            entries = self.parse_sitemap()
            
            if not entries:
                logger.error("❌ Aucune entrée trouvée dans le sitemap")
                return {}
            
            final_feed = self.assemble_final_feed(entries)
            
            self.stats['build_time'] = (datetime.utcnow() - start_time).total_seconds()
            
            logger.info(f"✅ Index multi-versions généré avec succès:")
            logger.info(f"   📊 {self.stats['urls_processed']} URLs traitées")
            logger.info(f"   🎯 {self.stats['versions_detected']} versions détectées") 
            logger.info(f"   📚 {self.stats['categories_created']} catégories créées")
            logger.info(f"   💰 Efficacité: {self.stats['efficiency_gain']}")
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
        
        self.output_file.parent.mkdir(parents=True, exist_ok=True)
        
        with open(self.output_file, 'w', encoding='utf-8') as f:
            json.dump(feed, f, indent=2, ensure_ascii=False, separators=(',', ': '))
        
        file_size = round(self.output_file.stat().st_size / 1024, 1)
        logger.info(f"💾 Feed multi-versions sauvé: {self.output_file} ({file_size} KB)")
        
        return self.output_file

    # Méthodes héritées avec adaptations mineures...
    def generate_smart_enrichments(self) -> Dict[str, Any]:
        """Fallback enrichments generation"""
        return {
            "url_patterns": {
                "/.well-known/": {
                    "category": "core_infrastructure",
                    "importance": "critical",
                    "audience": ["llm", "agent", "developer"],
                    "intent": "discover",
                    "tags": ["discovery", "handshake", "protocol"],
                    "trust_level": "signed",
                    "content_type": "infrastructure"
                }
            },
            "specific_urls": {},
            "content_type_mapping": {}
        }
    
    def generate_category_rules(self) -> Dict[str, Any]:
        """Fallback category rules"""
        return {
            "categories": {
                "core_infrastructure": {
                    "title": "Core Infrastructure",
                    "description": "Essential feeds for understanding site capabilities",
                    "entry_point": "/.well-known/mcp.llmfeed.json",
                    "audience": ["llm", "agent", "developer"],
                    "priority_weight": 10
                }
            },
            "url_classification_rules": []
        }
    
    def get_real_page_data(self, path: str) -> Optional[Dict[str, Any]]:
        """Récupère les vraies données d'une page"""
        if path in self.compiled_site_data:
            return self.compiled_site_data[path]
        return None
    
    def extract_enrichment_from_real_data(self, real_data: Dict[str, Any], path: str) -> Dict[str, Any]:
        """Extrait l'enrichissement des données réelles"""
        enrichment = {}
        
        if 'llm_summary' in real_data:
            enrichment['description_llm'] = real_data['llm_summary']
        
        return enrichment
    
    def detect_url_pattern(self, path: str) -> Dict[str, Any]:
        """Détecte le pattern d'URL"""
        patterns = self.enrichments.get('url_patterns', {})
        
        for pattern, enrichment in patterns.items():
            if pattern in path:
                return enrichment
        
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
        """Catégorise l'URL"""
        if 'category' in enrichment:
            return enrichment['category']
        return 'core_infrastructure'
    
    def map_importance(self, priority: float, category: str, path: str, real_data: Optional[Dict[str, Any]] = None) -> str:
        """Map l'importance"""
        if priority >= 0.9:
            return 'critical'
        elif priority >= 0.7:
            return 'high'
        elif priority >= 0.5:
            return 'medium'
        else:
            return 'low'
    
    def is_important_recent_news(self, url: str, path: str) -> bool:
        """Filtre les news importantes"""
        important_articles = [
            'llm-agent-readiness-framework-2025',
            'manifesto',
            'from-mcp-to-llmfeed-manifesto',
            'exporttollm-button',
            'getting-started',
            'launch'
        ]
        
        for important in important_articles:
            if important in path:
                return True
        
        return False
    
    def generate_smart_routing(self, categories: Dict[str, Any], entries: List[UrlEntry]) -> Dict[str, Any]:
        """Génère le smart routing"""
        return {
            "audience_based": {},
            "intent_based": {},
            "context_aware": {}
        }
    
    def generate_behavior_recommendations(self, entries: List[UrlEntry]) -> Dict[str, Any]:
        """Génère les recommandations comportementales"""
        return {
            "discovery_strategy": {},
            "trust_evaluation": {},
            "resource_optimization": {}
        }
    
    def detect_entry_points(self, entries: List[UrlEntry]) -> Dict[str, str]:
        """Détecte les points d'entrée"""
        return {}

def main():
    """Point d'entrée principal"""
    
    import argparse
    
    parser = argparse.ArgumentParser(description="Enhanced LLM Index Generator - Navigation avec multi-versions")
    parser.add_argument("--sitemap", help="Fichier sitemap custom")
    parser.add_argument("--output", help="Fichier de sortie custom")
    parser.add_argument("--dry-run", action="store_true", help="Simulation sans sauvegarde")
    parser.add_argument("--stats", action="store_true", help="Affiche les statistiques détaillées")
    
    args = parser.parse_args()
    
    print("🧠 Enhanced LLM Index Generator - Multi-Version Homepage Support")
    print("=" * 70)
    
    try:
        generator = LLMIndexGenerator()
        
        if args.sitemap:
            generator.sitemap_file = Path(args.sitemap)
        if args.output:
            generator.output_file = Path(args.output)
        
        if not generator.sitemap_file.exists():
            logger.error(f"❌ Sitemap introuvable: {generator.sitemap_file}")
            return 1
        
        logger.info(f"📍 Sitemap source: {generator.sitemap_file}")
        logger.info(f"📄 Sortie: {generator.output_file}")
        logger.info(f"🎯 Support multi-versions: {len(generator.version_configs)} versions configurées")
        
        # Génération
        feed = generator.generate_llm_index()
        
        if not feed:
            logger.error("❌ Échec de génération")
            return 1
        
        if args.dry_run:
            print("\n💡 Mode simulation - aperçu des résultats:")
            print(f"📊 URLs traitées: {generator.stats['urls_processed']}")
            print(f"🎯 Versions détectées: {generator.stats['versions_detected']}")
            print(f"📚 Catégories: {generator.stats['categories_created']}")
            print(f"💰 Efficacité: {generator.stats['efficiency_gain']}")
            
            if args.stats:
                print(f"\n📈 Stats détaillées:")
                for key, value in generator.stats.items():
                    print(f"   {key}: {value}")
            
            return 0
        
        # Sauvegarde
        output_path = generator.save_feed(feed)
        
        if output_path:
            print("\n🎉 Génération multi-versions terminée avec succès!")
            print(f"📊 Stats finales: {generator.stats}")
            print(f"📄 Index créé: {output_path}")
            print(f"🎯 Versions prises en charge: {generator.stats['versions_detected']}")
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