#!/usr/bin/env python3
"""
Compiled Site Generator - Version finale
Génère compiled-site.llmfeed.json à partir du build Next.js + config pages

TRAITEMENTS SPÉCIALISÉS :
- markdown_from_exports : about/faq depuis MD exports
- summary_only : ecosystem/feeds (résumé intelligent)
- form_interface : verify/llmfeedhub/preview (description interface)
- Traitement normal : spec/news avec enrichissements et liens vers exports
"""

import json
import logging
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, List, Optional
from dataclasses import dataclass

# Configuration des chemins
PROJECT_ROOT = Path(__file__).parent.parent.parent  # Remonte de 3 niveaux (scripts/compiled-site/ → racine)
OUTPUT_DIR = PROJECT_ROOT / "public/.well-known/exports"  # Dossier de sortie
OUTPUT_FILE = OUTPUT_DIR / "compiled-site.llmfeed.json"   # ✅ Cohérent

# Fichiers de configuration
TEMPLATE_FILE = Path(__file__).parent / "compiled-site.template.json"
PAGES_CONFIG_FILE = Path(__file__).parent / "pages-config.json"
ENRICHMENTS_FILE = Path(__file__).parent / "compiled-site-enrichment.json"

# Logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class PageConfig:
    """Configuration d'une page à traiter"""
    path: str
    block_name: str
    priority: int = 1  # 1=high, 2=medium, 3=low
    include_full_content: bool = True
    content_selector: Optional[str] = None  # CSS selector pour extraction
    special_processing: Optional[str] = None  # Type de traitement spécialisé

class CompiledSiteGenerator:
    """Générateur adapté Next.js avec auto-détection et traitements spécialisés"""
    
    def __init__(self):
        self.build_dir = self.detect_build_directory()
        self.output_file = OUTPUT_FILE
        
        # Chargement des configurations
        self.template = self.load_template()
        self.pages_config = self.load_pages_config()
        self.enrichments = self.load_enrichments()
        
        # Stats
        self.stats = {
            'pages_processed': 0,
            'enrichments_applied': 0,
            'special_processing_used': 0,
            'build_time': None
        }
    
    def detect_build_directory(self) -> Path:
        """Auto-détection du dossier de build Next.js"""
        
        possible_dirs = [
            ".next/server/app",      # Next.js App Router  
            ".next/server/pages",    # Next.js Pages Router
            "out",                   # Next.js export statique
            ".next/static",          # Fallback Next.js
            "build",                 # Create React App
            "dist",                  # Vite/autres
            "public"                 # Fallback général
        ]
        
        for dir_path in possible_dirs:
            test_dir = PROJECT_ROOT / dir_path
            if test_dir.exists():
                # Vérification qu'il y a des fichiers HTML
                html_files = list(test_dir.rglob('*.html'))
                if html_files:
                    logger.info(f"📁 Build directory détecté: {test_dir}")
                    return test_dir
        
        # Fallback sur build par défaut
        fallback = PROJECT_ROOT / "build" 
        logger.warning(f"⚠️ Aucun build directory trouvé, utilisation de: {fallback}")
        return fallback
    
    def load_template(self) -> Dict[str, Any]:
        """Charge le template avec fallback"""
        try:
            with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
                template = json.load(f)
            logger.info(f"✅ Template chargé: {TEMPLATE_FILE}")
            return template
        except Exception as e:
            logger.warning(f"⚠️ Template non trouvé, utilisation du fallback: {e}")
            return self.get_fallback_template()
    
    def get_fallback_template(self) -> Dict[str, Any]:
        """Template de base si fichier absent"""
        return {
            "feed_type": "export",
            "metadata": {
                "origin": "https://wellknownmcp.org",
                "title": "Compiled Site Feed (Enriched)",
                "description": "Structured export of site pages, enriched for LLM interpretability",
                "generated_at": "{{TIMESTAMP}}",
                "tags": ["llmfeed", "mcp", "agent-data", "compiled-site"],
                "content_type": "agent-data"
            },
            "trust": {
                "signed_blocks": ["all"],
                "trust_level": "demonstration",
                "public_key_hint": "https://wellknownmcp.org/.well-known/public.pem"
            },
            "agent_guidance": {
                "on_load": "This feed provides structured content from wellknownmcp.org for agent consumption.",
                "recommended_start": ["/tools/prompt", "/tools/session-export"]
            },
            "data": {
                "files": "{{DYNAMIC_BLOCKS}}"
            }
        }
    
    def load_pages_config(self) -> List[PageConfig]:
        """Charge la config des pages à traiter"""
        try:
            with open(PAGES_CONFIG_FILE, 'r', encoding='utf-8') as f:
                config_data = json.load(f)
            
            pages = []
            for page_data in config_data.get('pages', []):
                pages.append(PageConfig(
                    path=page_data['path'],
                    block_name=page_data['block_name'],
                    priority=page_data.get('priority', 1),
                    include_full_content=page_data.get('include_full_content', True),
                    content_selector=page_data.get('content_selector'),
                    special_processing=page_data.get('special_processing')
                ))
            
            logger.info(f"✅ Config pages chargée: {len(pages)} pages")
            return pages
            
        except Exception as e:
            logger.warning(f"⚠️ Config pages non trouvée, utilisation du fallback: {e}")
            return self.get_fallback_pages_config()
    
    def get_fallback_pages_config(self) -> List[PageConfig]:
        """Config de base si fichier absent"""
        return [
            PageConfig("index.html", "home", 1, True, None, None),
            PageConfig("about", "about", 2, True, None, None),
            PageConfig("tools", "tools", 1, True, None, None),
        ]
    
    def load_enrichments(self) -> Dict[str, Any]:
        """Charge les enrichissements LLM pré-générés"""
        try:
            with open(ENRICHMENTS_FILE, 'r', encoding='utf-8') as f:
                enrichments = json.load(f)
            logger.info(f"✅ Enrichissements chargés: {len(enrichments)} entrées")
            return enrichments
        except Exception as e:
            logger.warning(f"⚠️ Enrichissements non trouvés: {e}")
            return {}
    
    def generate_compiled_site(self, target_page: Optional[str] = None):
        """Génération principale"""
        
        logger.info("🔍 Traitement des pages configurées...")
        
        # Filtre les pages si target_page spécifié
        pages_to_process = self.pages_config
        if target_page:
            pages_to_process = [p for p in pages_to_process if target_page in p.path]
            logger.info(f"🎯 Traitement ciblé: {len(pages_to_process)} pages")
        
        # Traitement des pages
        blocks = []
        for page_config in pages_to_process:
            block = self.process_page(page_config)
            if block:
                blocks.append(block)
                self.stats['pages_processed'] += 1
        
        # Assembly final
        compiled_feed = self.assemble_feed(blocks)
        
        # Application des métadonnées dynamiques
        compiled_feed = self.apply_dynamic_metadata(compiled_feed)
        
        logger.info(f"✅ Génération terminée: {len(blocks)} blocs créés")
        return compiled_feed
    
    def process_page(self, page_config: PageConfig) -> Optional[Dict[str, Any]]:
        """Traite une page selon sa config - AVEC TRAITEMENTS SPÉCIALISÉS FINAUX"""
        
        # Traitement spécialisé selon le type
        if page_config.special_processing:
            logger.info(f"🔧 Traitement spécialisé: {page_config.block_name} ({page_config.special_processing})")
            
            if page_config.special_processing == "markdown_from_exports":
                self.stats['special_processing_used'] += 1
                return self.process_markdown_from_exports(page_config)
            elif page_config.special_processing == "summary_only":
                self.stats['special_processing_used'] += 1
                return self.process_summary_only(page_config)
            elif page_config.special_processing == "form_interface":
                self.stats['special_processing_used'] += 1
                return self.process_form_interface(page_config)
            else:
                logger.warning(f"⚠️ Type special_processing non supporté: {page_config.special_processing}")
        
        # Traitement normal pour toutes les autres pages (y compris spec et news)
        page_path = self.resolve_nextjs_path(page_config.path)
        
        if not page_path or not page_path.exists():
            logger.warning(f"⚠️ Page non trouvée: {page_config.path}")
            return None
        
        return self.process_regular_page(page_path, page_config)
    
    def process_markdown_from_exports(self, page_config: PageConfig) -> Optional[Dict[str, Any]]:
        """Traite about/faq depuis les fichiers MD dans public/exports/news"""
        
        try:
            # Détermine le dossier source selon le block_name
            if page_config.block_name == "about":
                md_dir = PROJECT_ROOT / "public" / "exports" / "news" / "en" / "about"
            elif page_config.block_name == "faq":
                md_dir = PROJECT_ROOT / "public" / "exports" / "news" / "en" / "faq" 
            else:
                logger.warning(f"⚠️ Type markdown non supporté: {page_config.block_name}")
                return None
            
            if not md_dir.exists():
                logger.warning(f"⚠️ Dossier markdown non trouvé: {md_dir}")
                return None
            
            # Collecte tous les fichiers .md
            md_files = list(md_dir.glob("*.md"))
            if not md_files:
                logger.warning(f"⚠️ Aucun fichier .md trouvé dans: {md_dir}")
                return None
            
            # Traite tous les fichiers MD
            combined_content = []
            total_word_count = 0
            
            for md_file in sorted(md_files):
                try:
                    md_content = md_file.read_text(encoding='utf-8')
                    combined_content.append(f"## {md_file.stem}\n\n{md_content}")
                    total_word_count += len(md_content.split())
                    logger.info(f"📄 {page_config.block_name} ← {md_file.name}")
                except Exception as e:
                    logger.warning(f"⚠️ Erreur lecture {md_file}: {e}")
                    continue
            
            if not combined_content:
                return None
            
            # Assemblage final
            final_markdown = "\n\n---\n\n".join(combined_content)
            
            # Structure de bloc cohérente
            block = {
                "block_name": page_config.block_name,
                "type": "markdown",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "content": {
                    "markdown": final_markdown,
                    "title": f"{page_config.block_name.title()} (from MD exports)",
                    "word_count": total_word_count,
                    "content_type": "markdown",
                    "source_files": [str(f.relative_to(PROJECT_ROOT)) for f in md_files]
                },
                "context_summary": {
                    "origin_type": f"markdown files from exports directory",
                    "motivation": f"Structured export of {page_config.block_name} content from source MD",
                    "recommended_agent_actions": [
                        "Summarize markdown content",
                        "Extract key information", 
                        "Cross-reference with other pages",
                        "Identify actionable items"
                    ]
                }
            }
            
            # Application des enrichissements
            enrichment = self.get_enrichment_for_page(page_config.block_name)
            if enrichment:
                for key, value in enrichment.items():
                    if key not in ['content', 'context_summary']:
                        block[key] = value
                self.stats['enrichments_applied'] += 1
            
            logger.info(f"✅ {page_config.block_name} → traité depuis MD ({len(md_files)} fichiers)")
            return block
            
        except Exception as e:
            logger.error(f"❌ Erreur traitement MD {page_config.block_name}: {e}")
            return None
    
    def process_summary_only(self, page_config: PageConfig) -> Optional[Dict[str, Any]]:
        """Extrait uniquement un résumé pour les pages très longues"""
        
        try:
            page_path = self.resolve_nextjs_path(page_config.path)
            if not page_path or not page_path.exists():
                logger.warning(f"⚠️ Page non trouvée pour résumé: {page_config.path}")
                return None
            
            # Extraction HTML normale
            content_data = self.extract_html_content(page_path, page_config.content_selector)
            
            # Création du résumé
            summary_content = self.create_summary_content(content_data)
            
            # Structure de bloc
            block = {
                "block_name": page_config.block_name,
                "type": "summary",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "content": {
                    "title": content_data.get("title", ""),
                    "summary": summary_content,
                    "word_count": len(summary_content.split()),
                    "content_type": "summary_extract",
                    "note": "Content summarized due to length - full content available on site"
                },
                "context_summary": {
                    "origin_type": "summarized page content",
                    "motivation": f"Lightweight summary of {page_config.block_name} for agent overview",
                    "recommended_agent_actions": [
                        "Get overview of key concepts",
                        "Identify main topics and sections",
                        "Direct users to full page for details"
                    ]
                }
            }
            
            # Application des enrichissements
            enrichment = self.get_enrichment_for_page(page_config.block_name)
            if enrichment:
                for key, value in enrichment.items():
                    if key not in ['content', 'context_summary']:
                        block[key] = value
                self.stats['enrichments_applied'] += 1
            
            logger.info(f"✅ {page_config.block_name} → résumé créé ({len(summary_content.split())} mots)")
            return block
            
        except Exception as e:
            logger.error(f"❌ Erreur traitement résumé {page_config.block_name}: {e}")
            return None
    
    def process_form_interface(self, page_config: PageConfig) -> Optional[Dict[str, Any]]:
        """Décrit les interfaces/formulaires sans contenu dynamique"""
        
        try:
            page_path = self.resolve_nextjs_path(page_config.path)
            if not page_path or not page_path.exists():
                logger.warning(f"⚠️ Page non trouvée pour interface: {page_config.path}")
                return None
            
            # Extraction HTML avec focus sur les éléments statiques
            content_data = self.extract_html_content(page_path, page_config.content_selector)
            
            # Analyse de l'interface
            interface_description = self.analyze_interface_capabilities(page_config.block_name)
            
            # Structure de bloc
            block = {
                "block_name": page_config.block_name,
                "type": "interface",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "content": {
                    "title": content_data.get("title", ""),
                    "interface_type": self.detect_interface_type(page_config.block_name),
                    "capabilities": interface_description["capabilities"],
                    "instructions": interface_description["instructions"],
                    "content_type": "interactive_interface",
                    "note": "This is an interactive tool - agents should direct users to use it directly"
                },
                "context_summary": {
                    "origin_type": "interactive web interface",
                    "motivation": f"Describe {page_config.block_name} functionality for agent guidance",
                    "recommended_agent_actions": [
                        "Explain tool capabilities to users",
                        "Provide usage instructions",
                        "Direct users to the interface URL",
                        "Help interpret results if shared"
                    ]
                }
            }
            
            # Application des enrichissements
            enrichment = self.get_enrichment_for_page(page_config.block_name)
            if enrichment:
                for key, value in enrichment.items():
                    if key not in ['content', 'context_summary']:
                        block[key] = value
                self.stats['enrichments_applied'] += 1
            
            logger.info(f"✅ {page_config.block_name} → interface décrite")
            return block
            
        except Exception as e:
            logger.error(f"❌ Erreur traitement interface {page_config.block_name}: {e}")
            return None
    
    def resolve_nextjs_path(self, config_path: str) -> Optional[Path]:
        """Résout un chemin de config vers le fichier Next.js réel"""
        
        # Cas 1: Chemin direct (ex: "index.html")
        direct_path = self.build_dir / config_path
        if direct_path.exists() and direct_path.is_file():
            return direct_path
        
        # Cas 2: Next.js App Router avec i18n (ex: "about" → "en/about/page.html")
        for lang in ['en', 'fr', '']:  # Langues communes + sans langue
            if lang:
                i18n_path = self.build_dir / lang / config_path / "page.html"
            else:
                i18n_path = self.build_dir / config_path / "page.html"
            
            if i18n_path.exists() and i18n_path.is_file():
                return i18n_path
        
        # Cas 3: Next.js Pages Router avec i18n (ex: "about" → "en/about.html")
        for lang in ['en', 'fr', '']:
            if lang:
                pages_path = self.build_dir / lang / f"{config_path}.html"
            else:
                pages_path = self.build_dir / f"{config_path}.html"
            
            if pages_path.exists() and pages_path.is_file():
                return pages_path
        
        # Cas 4: Index page spéciale
        if config_path in ["index", "index.html", "/"]:
            for lang in ['en', 'fr', '']:
                if lang:
                    index_path = self.build_dir / lang / "page.html"
                else:
                    index_path = self.build_dir / "page.html"
                
                if index_path.exists() and index_path.is_file():
                    return index_path
        
        # Cas 5: Scan récursif intelligent
        try:
            for html_file in self.build_dir.rglob('*.html'):
                if html_file.is_file():
                    # Match par nom de fichier OU par dossier parent
                    file_parts = html_file.parts
                    if (config_path in str(html_file) or 
                        config_path in file_parts or
                        html_file.name == 'page.html' and config_path in file_parts[-2:]):
                        return html_file
        except Exception as e:
            logger.warning(f"Erreur lors du scan récursif: {e}")
        
        return None
    
    def process_regular_page(self, page_path: Path, config: PageConfig) -> Optional[Dict[str, Any]]:
        """Traite une page normale - HTML standard avec enrichissements"""
        
        try:
            # Extraction avec nettoyage
            content_data = self.extract_html_content(page_path, config.content_selector)
            content_type = 'html+markdown'
            
            # Structure de bloc cohérente
            block = {
                "block_name": config.block_name,
                "type": content_type,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
            
            # Données de contenu
            if config.include_full_content:
                block["content"] = content_data
            else:
                # Version résumée
                block["content"] = {
                    "title": content_data.get("title", ""),
                    "summary": self.create_content_summary(content_data),
                    "word_count": content_data.get("word_count", 0)
                }
            
            # Context summary
            block["context_summary"] = {
                "origin_type": f"{content_type} page from build directory",
                "motivation": f"Structured export of {config.block_name} for agent consumption",
                "recommended_agent_actions": [
                    "Summarize content",
                    "Extract key concepts", 
                    "Identify action items",
                    "Cross-reference with other pages"
                ]
            }
            
            # Application des enrichissements LLM (inclut les liens pour spec/news)
            enrichment = self.get_enrichment_for_page(config.block_name)
            if enrichment:
                # Merge enrichissements sans écraser content/context_summary
                for key, value in enrichment.items():
                    if key not in ['content', 'context_summary']:
                        block[key] = value
                self.stats['enrichments_applied'] += 1
            
            logger.info(f"📄 {config.block_name} → traité ({content_type})")
            return block
            
        except Exception as e:
            logger.error(f"❌ Erreur traitement {page_path}: {e}")
            return None
    
    def extract_html_content(self, html_file: Path, selector: Optional[str] = None) -> Dict[str, Any]:
        """Extraction de contenu HTML avec nettoyage"""
        try:
            # Vérification que c'est bien un fichier
            if not html_file.is_file():
                logger.warning(f"⚠️ Chemin n'est pas un fichier: {html_file}")
                return {
                    "html": "",
                    "markdown": f"Erreur: {html_file} n'est pas un fichier",
                    "title": html_file.name,
                    "word_count": 0,
                    "content_type": "error"
                }
            
            from bs4 import BeautifulSoup
            import markdownify
            
            content = html_file.read_text(encoding='utf-8')
            soup = BeautifulSoup(content, 'html.parser')
            
            # Nettoyage
            for tag in soup(['script', 'style', 'meta', 'link', 'noscript', 'nav', 'footer']):
                tag.decompose()
            
            # Supprime les attributs class, style, id
            for element in soup.find_all():
                element.attrs = {k: v for k, v in element.attrs.items() 
                               if k not in ['class', 'style', 'id']}
            
            # Extraction selon sélecteur ou body complet
            if selector:
                target = soup.select_one(selector)
                clean_html = str(target) if target else str(soup.body or soup)
            else:
                clean_html = str(soup.body or soup)
            
            # Conversion en Markdown
            try:
                markdown = markdownify.markdownify(clean_html, heading_style="ATX")
            except Exception as e:
                logger.warning(f"⚠️ Erreur conversion Markdown pour {html_file}: {e}")
                markdown = BeautifulSoup(clean_html, 'html.parser').get_text()
            
            # Titre depuis title tag ou h1
            title = soup.title.string if soup.title else html_file.stem
            if not title or title == html_file.stem:
                h1 = soup.find('h1')
                if h1:
                    title = h1.get_text(strip=True)
            
            return {
                "html": clean_html,
                "markdown": markdown,
                "title": title,
                "word_count": len(markdown.split()) if markdown else 0,
                "content_type": "html+markdown"
            }
            
        except ImportError:
            logger.warning("BeautifulSoup ou markdownify non disponible, extraction basique")
            try:
                content = html_file.read_text(encoding='utf-8')
                return {
                    "html": content,
                    "markdown": content,
                    "title": html_file.stem,
                    "word_count": len(content.split()),
                    "content_type": "html"
                }
            except Exception as e:
                logger.error(f"❌ Erreur lecture fichier {html_file}: {e}")
                return {
                    "html": "",
                    "markdown": f"Erreur de lecture: {str(e)}",
                    "title": html_file.stem,
                    "word_count": 0,
                    "content_type": "error"
                }
        except Exception as e:
            logger.error(f"❌ Erreur extraction contenu {html_file}: {e}")
            return {
                "html": "",
                "markdown": f"Erreur d'extraction: {str(e)}",
                "title": html_file.stem,
                "word_count": 0,
                "content_type": "error"
            }
    
    def create_summary_content(self, content_data: Dict[str, Any]) -> str:
        """Crée un résumé intelligent du contenu"""
        
        markdown = content_data.get('markdown', '')
        if not markdown:
            return "Contenu non disponible"
        
        lines = markdown.split('\n')
        summary_lines = []
        word_count = 0
        paragraph_count = 0
        max_paragraphs = 3
        word_limit = 500
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            # Inclut toujours les titres
            if line.startswith('#'):
                summary_lines.append(line)
                continue
            
            # Limite les paragraphes
            if paragraph_count >= max_paragraphs:
                break
                
            # Limite les mots
            line_words = len(line.split())
            if word_count + line_words > word_limit:
                break
                
            summary_lines.append(line)
            word_count += line_words
            
            if line and not line.startswith('#'):
                paragraph_count += 1
        
        summary = '\n'.join(summary_lines)
        if word_count >= word_limit:
            summary += "\n\n[Contenu tronqué - voir la page complète pour plus de détails]"
        
        return summary
    
    def analyze_interface_capabilities(self, block_name: str) -> Dict[str, Any]:
        """Analyse les capacités d'une interface selon son nom"""
        
        capabilities = []
        instructions = []
        
        if "verify" in block_name:
            capabilities = [
                "Upload and verify MCP feed files",
                "Check cryptographic signatures",
                "Validate feed structure and compliance",
                "Display trust chain information"
            ]
            instructions = [
                "Upload a .llmfeed.json file or paste feed content",
                "Tool will verify signature and structure",
                "Results show trust level and any issues found"
            ]
        
        elif "llmfeedhub" in block_name:
            if "preview" in block_name:
                capabilities = [
                    "Analyze any website URL for MCP compatibility",
                    "Check for /.well-known/ directory structure",
                    "Discover available feeds and capabilities",
                    "Preview how agents would interpret the site"
                ]
                instructions = [
                    "Enter any website URL",
                    "Tool scans for MCP feeds and well-known structure",
                    "Results show agent-readable content and trust level"
                ]
            else:
                capabilities = [
                    "Preview and test MCP feeds",
                    "Simulate agent interactions",
                    "Validate feed formats and structure",
                    "Test different feed types and scenarios"
                ]
                instructions = [
                    "Upload feed file or enter feed URL",
                    "Use simulation tools to test agent interactions",
                    "Validate structure and content formatting"
                ]
        
        # Fallback si pas de correspondance
        if not capabilities:
            capabilities = ["Interactive tool for MCP operations"]
            instructions = ["Use the interface to access tool functionality"]
        
        return {
            "capabilities": capabilities,
            "instructions": instructions
        }
    
    def detect_interface_type(self, block_name: str) -> str:
        """Détecte le type d'interface"""
        
        if "verify" in block_name:
            return "verification_tool"
        elif "preview" in block_name:
            return "analysis_tool"
        elif "llmfeedhub" in block_name:
            return "testing_platform"
        else:
            return "interactive_tool"
    
    def get_enrichment_for_page(self, block_name: str) -> Optional[Dict[str, Any]]:
        """Récupère l'enrichissement pour un bloc donné"""
        
        # Recherche directe
        if block_name in self.enrichments:
            return self.enrichments[block_name]
        
        # Recherche par pattern
        for pattern, enrichment in self.enrichments.items():
            if pattern in block_name or block_name in pattern:
                return enrichment
        
        return None
    
    def assemble_feed(self, blocks: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Assembly final du feed"""
        
        feed = self.template.copy()
        
        # Tri des blocs par priorité si disponible
        blocks.sort(key=lambda b: b.get('priority', 999))
        
        # Remplacement des placeholders
        if 'data' in feed and feed['data'] == "{{DYNAMIC_BLOCKS}}":
            feed['data'] = {"files": blocks}
        elif 'data' in feed and isinstance(feed['data'], dict):
            feed['data']['files'] = blocks
        else:
            feed['data'] = {"files": blocks}
        
        return feed
    
    def apply_dynamic_metadata(self, feed: Dict[str, Any]) -> Dict[str, Any]:
        """Application des métadonnées dynamiques"""
        
        now = datetime.utcnow()
        timestamp = now.isoformat() + "Z"
        
        # Remplace les placeholders
        feed_str = json.dumps(feed).replace("{{TIMESTAMP}}", timestamp)
        feed = json.loads(feed_str)
        
        # Stats de build
        if 'metadata' in feed:
            feed['metadata']['build_stats'] = {
                'pages_processed': self.stats['pages_processed'],
                'enrichments_applied': self.stats['enrichments_applied'],
                'special_processing_used': self.stats['special_processing_used'],
                'build_time': timestamp
            }
        
        return feed
    
    def save_feed(self, feed: Dict[str, Any]):
        """Sauvegarde le feed généré"""
        
        # Création du dossier de sortie
        self.output_file.parent.mkdir(parents=True, exist_ok=True)
        
        # Écriture
        with open(self.output_file, 'w', encoding='utf-8') as f:
            json.dump(feed, f, indent=2, ensure_ascii=False)
        
        file_size = round(self.output_file.stat().st_size / 1024, 1)
        logger.info(f"✅ Feed sauvé: {self.output_file} ({file_size} KB)")
        
        return self.output_file
    
    def create_content_summary(self, content: Any) -> str:
        """Crée un résumé du contenu pour version courte"""
        if isinstance(content, dict):
            text = content.get('markdown', content.get('html', str(content)))
        else:
            text = str(content)
        
        # Résumé simple : premiers 300 caractères
        if len(text) > 300:
            return text[:300] + "..."
        return text

def main():
    """Point d'entrée principal"""
    
    import argparse
    
    parser = argparse.ArgumentParser(description="Compiled Site Generator - Version finale")
    parser.add_argument("--page", help="Traiter une page spécifique")
    parser.add_argument("--build-dir", help="Dossier de build custom")
    parser.add_argument("--output", help="Fichier de sortie custom")
    parser.add_argument("--dry-run", action="store_true", help="Simulation")
    parser.add_argument("--show-special", action="store_true", help="Affiche les traitements spéciaux")
    
    args = parser.parse_args()
    
    print("🔥 Compiled Site Generator - Version finale")
    print("=" * 50)
    
    try:
        generator = CompiledSiteGenerator()
        
        # Override des chemins si spécifiés
        if args.build_dir:
            generator.build_dir = Path(args.build_dir)
        if args.output:
            generator.output_file = Path(args.output)
        
        # Affichage des traitements spéciaux
        if args.show_special:
            print("🔧 Traitements spécialisés configurés:")
            special_count = 0
            for page in generator.pages_config:
                if page.special_processing:
                    print(f"  ⚙️  {page.block_name} → {page.special_processing}")
                    special_count += 1
            if special_count == 0:
                print("  (Aucun traitement spécialisé)")
            print()
        
        if args.dry_run:
            print("💡 Mode simulation...")
            print(f"Build dir: {generator.build_dir}")
            print(f"Pages configurées: {len(generator.pages_config)}")
            
            normal_count = 0
            special_count = 0
            
            for page in generator.pages_config:
                resolved = generator.resolve_nextjs_path(page.path)
                status = "✅" if resolved and resolved.exists() else "❌"
                special = f" [{page.special_processing}]" if page.special_processing else ""
                print(f"  {status} {page.block_name} ({page.path}){special}")
                if resolved:
                    print(f"      → {resolved}")
                    
                if page.special_processing:
                    special_count += 1
                else:
                    normal_count += 1
            
            print(f"\n📊 Résumé: {normal_count} pages normales, {special_count} traitements spéciaux")
            return 0
        
        # Génération
        feed = generator.generate_compiled_site(args.page)
        output_path = generator.save_feed(feed)
        
        print("🎉 Génération terminée!")
        print(f"📊 Stats: {generator.stats}")
        print(f"📄 Feed créé: {output_path}")
        
        # Résumé des traitements utilisés
        if generator.stats['special_processing_used'] > 0:
            print(f"⚙️  Traitements spécialisés utilisés: {generator.stats['special_processing_used']}")
        
        return 0
        
    except Exception as e:
        logger.error(f"❌ Erreur: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    exit(main())