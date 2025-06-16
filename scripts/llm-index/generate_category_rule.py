#!/usr/bin/env python3
"""
Génère le fichier llm-index-categories.json manquant
"""

import json
from pathlib import Path

def generate_category_rules():
    """Génère les règles de catégorisation intelligente"""
    return {
        "categorization_philosophy": "Organize content into intuitive categories that match how different audiences approach MCP. Each category has distinct behavioral patterns and routing logic.",
        
        "categories": {
            "core_infrastructure": {
                "title": "Core Infrastructure",
                "description": "Essential feeds for understanding site capabilities and agent handshake protocols. The foundation of trustworthy agent-web interaction.",
                "entry_point": "/.well-known/mcp.llmfeed.json",
                "audience": ["llm", "agent", "developer", "security"],
                "priority_weight": 10,
                "behavioral_note": "Critical for agent handshake and trust establishment. Always load these first.",
                "routing_strategy": "priority_first",
                "cache_policy": "aggressive_caching",
                "trust_requirement": "signed_preferred",
                "icon_suggestion": "🏗️",
                "color_theme": "blue",
                "discovery_hints": {
                    "parallel_loadable": True,
                    "prefetch_recommended": True,
                    "mobile_friendly": True,
                    "bandwidth_efficient": True
                }
            },
            
            "specialized_tools": {
                "title": "Developer Tools & Utilities",
                "description": "Interactive tools and utilities for implementation, testing, and hands-on learning. Where theory meets practice.",
                "entry_point": "/tools/export-button",
                "audience": ["developer", "implementer", "tester", "webmaster"],
                "priority_weight": 8,
                "behavioral_note": "Hands-on tools for practical implementation. Perfect for learning by doing.",
                "routing_strategy": "task_oriented",
                "cache_policy": "moderate_caching",
                "trust_requirement": "verified_preferred",
                "icon_suggestion": "🛠️",
                "color_theme": "green",
                "discovery_hints": {
                    "interactive_heavy": True,
                    "demo_available": True,
                    "requires_javascript": True,
                    "bandwidth_intensive": False
                }
            },
            
            "documentation": {
                "title": "Technical Documentation",
                "description": "Comprehensive guides, specifications, and reference materials. The authoritative source for MCP implementation.",
                "entry_point": "/spec",
                "audience": ["developer", "technical", "researcher", "implementer"],
                "priority_weight": 9,
                "behavioral_note": "Authoritative technical reference. Essential for proper implementation.",
                "routing_strategy": "depth_first",
                "cache_policy": "long_term_caching",
                "trust_requirement": "authoritative_required",
                "icon_suggestion": "📚",
                "color_theme": "purple",
                "discovery_hints": {
                    "text_heavy": True,
                    "requires_deep_reading": True,
                    "cross_references_heavy": True,
                    "printable_friendly": True
                }
            },
            
            "community_content": {
                "title": "Community & Ecosystem",
                "description": "News, ecosystem updates, community-driven content, and networking opportunities. Stay connected with the MCP evolution.",
                "entry_point": "/ecosystem",
                "audience": ["general", "community", "stakeholder", "business"],
                "priority_weight": 6,
                "behavioral_note": "Dynamic content for staying current with ecosystem developments and community insights.",
                "routing_strategy": "freshness_prioritized",
                "cache_policy": "short_term_caching",
                "trust_requirement": "editorial_acceptable",
                "icon_suggestion": "🌐",
                "color_theme": "orange",
                "discovery_hints": {
                    "frequently_updated": True,
                    "social_shareable": True,
                    "time_sensitive": True,
                    "multilingual_available": False
                }
            }
        },
        
        "url_classification_rules": [
            {
                "pattern": "/.well-known/",
                "category": "core_infrastructure",
                "importance": "critical",
                "reasoning": "Essential discovery endpoints for agent handshake"
            },
            {
                "pattern": "/tools/",
                "category": "specialized_tools",
                "importance": "high",
                "reasoning": "Interactive utilities for hands-on implementation"
            },
            {
                "pattern": "/spec",
                "category": "documentation",
                "importance": "critical",
                "reasoning": "Authoritative technical specifications"
            },
            {
                "pattern": "/api-explained",
                "category": "documentation",
                "importance": "high",
                "reasoning": "Technical integration documentation"
            },
            {
                "pattern": "/sdk",
                "category": "documentation",
                "importance": "high",
                "reasoning": "Development resources and libraries"
            },
            {
                "pattern": "/news/",
                "category": "community_content",
                "importance": "medium",
                "reasoning": "Latest updates and announcements"
            },
            {
                "pattern": "/ecosystem",
                "category": "community_content",
                "importance": "medium",
                "reasoning": "Ecosystem overview and partnerships"
            },
            {
                "pattern": "/join",
                "category": "community_content",
                "importance": "medium",
                "reasoning": "Community participation and onboarding"
            },
            {
                "pattern": "/verify",
                "category": "specialized_tools",
                "importance": "high",
                "reasoning": "Critical security and verification functionality"
            },
            {
                "pattern": "/llmfeedhub",
                "category": "specialized_tools",
                "importance": "high",
                "reasoning": "Interactive testing and simulation platform"
            },
            {
                "pattern": "^/$|index",
                "category": "core_infrastructure",
                "importance": "critical",
                "reasoning": "Primary entry point and orientation"
            },
            {
                "pattern": "/about",
                "category": "core_infrastructure",
                "importance": "high",
                "reasoning": "Foundational mission and philosophy"
            },
            {
                "pattern": "/faq",
                "category": "core_infrastructure",
                "importance": "high",
                "reasoning": "Essential support and clarification"
            }
        ]
    }

def main():
    config_dir = Path(__file__).parent
    output_file = config_dir / "llm-index-categories.json"
    
    rules = generate_category_rules()
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(rules, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Generated: {output_file}")

if __name__ == "__main__":
    main()