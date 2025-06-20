// scripts/generate-news-export.js
// Version dual output : news-export.llmfeed.json + news-lite.llmfeed.json

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

// Configuration
const config = {
  indexPath: path.join(__dirname, '..', 'public', 'news', 'index.json'),
  newsDir: path.join(__dirname, '..', 'public', 'news', 'en'),
  outputPath: path.join(__dirname, '..', 'public','.well-known', 'exports', 'news-export.llmfeed.json'),
  outputLitePath: path.join(__dirname, '..', 'public','.well-known', 'exports', 'news-lite.llmfeed.json'),
  cachePath: path.join(__dirname, '..', '.cache', 'news-export-cache.json'),
  siteOrigin: 'https://wellknownmcp.org',
  maxContentLength: 15000,
  
  // Configuration Lite (Stratégie Pareto 80/20)
  lite: {
    qualityThreshold: 65,         // Score qualité minimum - seul critère de sélection
    maxContentLength: 1300,       // Résumés structurels intelligents
    maxArticlesSafety: 50,        // Limite haute de sécurité (évite feeds monstrueux)
    essentialCategories: ['launch', 'manifesto', 'tutorial', 'announcement', 'getting-started'],
    priorityBoostKeywords: ['launch', 'manifesto', 'getting-started', 'agents', 'llmfeed']
  }
}

class DualNewsExportGenerator {
  constructor() {
    this.template = this.createFeedTemplate()
    this.liteTemplate = this.createLiteFeedTemplate()
    this.cache = this.loadCache()
    this.stats = {
      processed: 0,
      updated: 0,
      removed: 0,
      cached: 0,
      lite_selected: 0
    }
  }

  /**
   * Template pour version complète
   */
  createFeedTemplate() {
    return {
      feed_type: "export",
      metadata: {
        origin: config.siteOrigin,
        title: "WellKnownMCP News Archive - Complete Export",
        description: "Complete archive of all WellKnownMCP news articles, tutorials, and advocacy pieces about the agentic web and MCP standards",
        version: "1.0.0",
        generated_at: new Date().toISOString(),
        language: "en",
        content_type: "news_archive",
        total_articles: 0,
        usage_context: "project_context_comprehensive"
      },
      intent: {
        primary: "comprehensive_news_archive",
        secondary: ["research", "reference", "analysis"],
        use_cases: [
          "Research MCP protocol evolution",
          "Understand agentic web trends", 
          "Reference implementation examples",
          "Follow WellKnownMCP project timeline"
        ]
      },
      llm_behavior: {
        summarization_hint: "Focus on technical innovations, standard developments, and ecosystem evolution",
        analysis_depth: "comprehensive",
        key_themes: ["interoperability", "open_standards", "agent_optimization", "user_control"],
        context_preservation: "high"
      },
      agent_instructions: {
        content_access: "All articles available with full content inline",
        navigation_pattern: "chronological_and_thematic",
        trust_level: "verified_source",
        update_frequency: "build_time_static"
      },
      data: {
        articles: [],
        index: {},
        stats: {}
      },
      trust: {
        scope: "complete",
        signed_blocks: ["feed_type", "metadata", "data"],
        trust_level: "self-issued",
        content_authenticity: "source_verified"
      }
    }
  }

  /**
   * Template pour version lite (Pareto 80/20)
   */
  createLiteFeedTemplate() {
    return {
      feed_type: "export",
      metadata: {
        origin: config.siteOrigin,
        title: "WellKnownMCP News - Quality Curated",
        description: "All high-quality MCP news articles with intelligent structural extraction - optimized for prompt shortcut (quality-based Pareto selection)",
        version: "1.0.0-lite",
        generated_at: new Date().toISOString(),
        language: "en",
        content_type: "news_highlights",
        total_articles: 0,
        usage_context: "prompt_shortcut_pareto",
        optimization: {
          strategy: "pareto_80_20",
          content_reduction: "summarized_essentials",
          selection_criteria: "priority_score_and_categories"
        }
      },
      intent: {
        primary: "instant_mcp_context",
        secondary: ["quick_reference", "trend_awareness"],
        use_cases: [
          "Quick MCP ecosystem overview",
          "Recent developments summary",
          "Key implementation examples",
          "Essential context for agents"
        ]
      },
      llm_behavior: {
        summarization_hint: "Prioritize key developments, major announcements, and practical examples",
        analysis_depth: "focused_essentials",
        key_themes: ["launch_updates", "practical_guides", "ecosystem_growth"],
        context_preservation: "optimized"
      },
      agent_instructions: {
        content_access: "Summarized articles with links to full versions",
        navigation_pattern: "priority_based",
        trust_level: "curated_highlights",
        update_frequency: "build_time_static",
        upgrade_guidance: "For complete archive, use news-export.llmfeed.json in project context"
      },
      data: {
        articles: [],
        selection_criteria: {
          quality_threshold: config.lite.qualityThreshold, // Score 65+ seul critère
          selection_method: "natural_pareto_by_quality",
          max_safety_limit: config.lite.maxArticlesSafety, // 50 articles max
          essential_categories: config.lite.essentialCategories,
          content_optimization: "intelligent_structural_extraction"
        },
        stats: {}
      },
      trust: {
        scope: "curated_essentials",
        signed_blocks: ["feed_type", "metadata", "data"],
        trust_level: "self-issued",
        content_authenticity: "source_verified"
      }
    }
  }

  /**
   * Charge le cache des articles traités
   */
  loadCache() {
    if (!fs.existsSync(config.cachePath)) {
      return { articles: {}, index_hash: null, last_generation: null }
    }

    try {
      const cache = JSON.parse(fs.readFileSync(config.cachePath, 'utf-8'))
      console.log(`📋 Cache loaded: ${Object.keys(cache.articles || {}).length} articles`)
      return cache
    } catch (error) {
      console.warn(`⚠️ Cache corrupted, starting fresh: ${error.message}`)
      return { articles: {}, index_hash: null, last_generation: null }
    }
  }

  /**
   * Calcule score de priorité pour sélection lite (critère qualité pure)
   */
  calculatePriorityScore(article) {
    let score = 0
    
    // Score de base depuis l'index
    score += article.aioScore || 0
    
    // Bonus catégories essentielles
    if (config.lite.essentialCategories.includes(article.category)) {
      score += 20
    }
    
    // Bonus récence (articles récents plus importants)
    const articleDate = new Date(article.date)
    const now = new Date()
    const daysDiff = (now - articleDate) / (1000 * 60 * 60 * 24)
    if (daysDiff < 30) score += 15
    else if (daysDiff < 90) score += 10
    else if (daysDiff < 180) score += 5
    
    // Bonus mots-clés stratégiques
    const slug = article.slug.toLowerCase()
    config.lite.priorityBoostKeywords.forEach(keyword => {
      if (slug.includes(keyword)) score += 12
    })
    
    // Bonus impact business
    if (article.businessImpact === 'high') score += 15
    else if (article.businessImpact === 'medium') score += 8
    
    // Bonus niveau technique accessible (pour lite)
    if (article.technicalLevel === 'beginner' || article.technicalLevel === 'intermediate') {
      score += 5
    }
    
    return Math.min(score, 100) // Cap à 100
  }

  /**
   * Génère résumé optimisé pour version lite - Stratégie hybride intelligente
   * Combine : Introduction + Sections clés + Conclusion + Frontmatter rich
   */
  generateLiteSummary(fullContent, article) {
    const maxLength = config.lite.maxContentLength // 1300 chars
    let summary = ''
    let usedLength = 0
    
    // 1. INTRODUCTION (premier paragraphe significatif)
    const paragraphs = fullContent.split('\n\n').filter(p => p.trim().length > 50)
    const introParagraph = paragraphs[0]
    if (introParagraph && introParagraph.length <= 400) {
      summary += introParagraph + '\n\n'
      usedLength += introParagraph.length + 2
    }
    
    // 2. SECTIONS PRINCIPALES (extraction basée sur structure ##)
    const sections = this.extractKeySections(fullContent, maxLength - usedLength - 200) // Garde 200 chars pour conclusion+lien
    if (sections.length > 0) {
      summary += sections + '\n\n'
      usedLength += sections.length + 2
    }
    
    // 3. CONCLUSION (dernier paragraphe si place disponible)
    const remainingSpace = maxLength - usedLength - 100 // 100 chars pour le lien
    if (remainingSpace > 150 && paragraphs.length > 2) {
      const lastParagraph = paragraphs[paragraphs.length - 1]
      if (lastParagraph && lastParagraph.length <= remainingSpace) {
        summary += '[...]\n\n' + lastParagraph + '\n\n'
        usedLength += lastParagraph.length + 8
      }
    }
    
    // 4. NAVIGATION INTELLIGENTE
    summary += `**→ Complete article:** ${config.siteOrigin}/en/news/${article.slug}`
    
    return summary.trim()
  }

  /**
   * Extrait les sections clés basées sur la structure markdown (## titles)
   */
  extractKeySections(content, maxLength) {
    // Trouve toutes les sections ## et ###
    const sectionRegex = /^(#{2,3})\s+(.+)$/gm
    const sections = []
    let match
    
    while ((match = sectionRegex.exec(content)) !== null) {
      const level = match[1].length // 2 pour ##, 3 pour ###
      const title = match[2].trim()
      const startIndex = match.index
      
      // Trouve le contenu de cette section (jusqu'au prochain titre du même niveau ou supérieur)
      const nextSectionRegex = new RegExp(`^#{1,${level}}\\s+`, 'gm')
      nextSectionRegex.lastIndex = startIndex + match[0].length
      const nextMatch = nextSectionRegex.exec(content)
      
      const endIndex = nextMatch ? nextMatch.index : content.length
      const sectionContent = content.substring(startIndex + match[0].length, endIndex)
        .trim()
        .split('\n\n')[0] // Premier paragraphe de la section
      
      if (sectionContent && sectionContent.length > 30) {
        sections.push({
          level,
          title,
          content: sectionContent,
          priority: level === 2 ? 2 : 1 // ## plus prioritaire que ###
        })
      }
    }
    
    // Trie par priorité et sélectionne les sections les plus importantes
    sections.sort((a, b) => b.priority - a.priority)
    
    let result = ''
    let currentLength = 0
    
    for (const section of sections.slice(0, 3)) { // Max 3 sections
      const sectionText = `**${section.title}**: ${section.content.substring(0, 200)}...\n\n`
      if (currentLength + sectionText.length > maxLength) {
        break
      }
      result += sectionText
      currentLength += sectionText.length
    }
    
    return result.trim()
  }

  /**
   * Traite un article pour version complète
   */
  processArticleFull(indexArticle) {
    const fullContent = this.loadArticleContent(indexArticle.slug)
    
    if (!fullContent) {
      return null
    }

    // Extrait concepts
    const concepts = this.extractConceptsFromContent(fullContent, indexArticle)

    const processedArticle = {
      // Identité
      slug: indexArticle.slug,
      title: indexArticle.title,
      description: indexArticle.description || '',
      date: indexArticle.date,
      
      // Classification
      categories: indexArticle.category ? [indexArticle.category] : [],
      tags: indexArticle.tags || [],
      type: indexArticle.format || 'news',
      
      // Contenu
      content: fullContent,
      concepts: concepts,
      
      // Score priorité (pour sélection lite)
      priority_score: this.calculatePriorityScore(indexArticle),
      
      // Intention
      intent: indexArticle.intent || 'inform',
      llm_intent: indexArticle.llmIntent || 'read_news_article',
      audience: indexArticle.audience || ['llm', 'human'],
      
      // Métadonnées LLM
      metadata: {
        source_file: `${indexArticle.slug}.md`,
        content_quality_score: indexArticle.aioScore || 0,
        technical_level: indexArticle.technicalLevel || 'intermediate',
        business_impact: indexArticle.businessImpact || 'medium',
        priority: indexArticle.priority || 'normal',
        agent_readiness: indexArticle.agentReadiness !== false
      },
      
      // URLs
      canonical_url: `${config.siteOrigin}/en/news/${indexArticle.slug}`,
      
      // Provenance
      author: 'WellKnownMCP Team',
      last_modified: indexArticle.date,
      
      // Capacités spécialisées
      ...(indexArticle.capabilities && { capabilities: indexArticle.capabilities }),
      ...(indexArticle.feedTypes && { feed_types: indexArticle.feedTypes })
    }

    return processedArticle
  }

  /**
   * Traite un article pour version lite
   */
  processArticleLite(fullArticle) {
    const liteArticle = {
      // Identité
      slug: fullArticle.slug,
      title: fullArticle.title,
      description: fullArticle.description,
      date: fullArticle.date,
      
      // Classification
      categories: fullArticle.categories,
      tags: fullArticle.tags.slice(0, 3), // Max 3 tags
      type: fullArticle.type,
      
      // Contenu optimisé
      content: this.generateLiteSummary(fullArticle.content, fullArticle),
      concepts: fullArticle.concepts.slice(0, 5), // Max 5 concepts
      
      // Scores
      priority_score: fullArticle.priority_score,
      
      // Métadonnées allégées
      metadata: {
        quality_score: fullArticle.metadata.content_quality_score,
        technical_level: fullArticle.metadata.technical_level,
        business_impact: fullArticle.metadata.business_impact,
        lite_optimization: "summarized_for_pareto_strategy"
      },
      
      // URLs
      canonical_url: fullArticle.canonical_url,
      
      // Provenance
      author: fullArticle.author,
      last_modified: fullArticle.last_modified
    }

    return liteArticle
  }

  /**
   * Sélectionne articles pour version lite - Critère qualité pure (Pareto naturel)
   */
  selectLiteArticles(allArticles) {
    // Filtre par qualité globale uniquement
    const qualityArticles = allArticles
      .filter(article => article.priority_score >= config.lite.qualityThreshold)
      .sort((a, b) => b.priority_score - a.priority_score)
    
    // Limite de sécurité pour éviter feeds monstrueux
    const selected = qualityArticles.slice(0, config.lite.maxArticlesSafety)
    
    console.log(`📋 Lite selection (quality-based): ${selected.length}/${allArticles.length} articles`)
    console.log(`📊 Quality threshold: ${config.lite.qualityThreshold}+ (natural Pareto selection)`)
    console.log(`📈 Priority scores range: ${selected[0]?.priority_score} - ${selected[selected.length-1]?.priority_score}`)
    console.log(`📝 Content per article: structured extraction (~${config.lite.maxContentLength} chars)`)
    console.log(`🎯 Selection logic: All articles meeting quality threshold (no artificial limit)`)
    
    this.stats.lite_selected = selected.length
    
    return selected.map(article => this.processArticleLite(article))
  }

  /**
   * Charge le contenu d'un article avec cache
   */
  loadArticleContent(slug) {
    const filePath = path.join(config.newsDir, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Article file not found: ${filePath}`)
      return null
    }

    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      
      // Supprime le frontmatter
      const cleanContent = content.replace(/^---[\s\S]*?---\n/m, '')
      
      // Nettoie pour agents
      return this.cleanMarkdownForAgent(cleanContent)
      
    } catch (error) {
      console.error(`❌ Error reading ${filePath}:`, error.message)
      return null
    }
  }

  /**
   * Nettoie le markdown pour optimisation agent
   */
  cleanMarkdownForAgent(content) {
    // Supprime éléments UI/navigation
    content = content.replace(/\[←.*?\]\(.*?\)/g, '')
    content = content.replace(/\*\*Ready to.*?\*\*/g, '')
    
    // Normalise titres
    content = content.replace(/^# /gm, '## ')
    
    // Nettoie espaces
    content = content.replace(/\n{3,}/g, '\n\n')
    content = content.replace(/[ \t]{2,}/g, ' ')
    
    // Limite taille pour version complète
    if (content.length > config.maxContentLength) {
      content = content.substring(0, config.maxContentLength) + "\n\n[Content truncated - see full article on website]"
    }
    
    return content.trim()
  }

  /**
   * Extrait concepts du contenu
   */
  extractConceptsFromContent(content, indexArticle) {
    if (indexArticle.concepts && indexArticle.concepts.length > 0) {
      return indexArticle.concepts
    }

    const concepts = new Set()
    
    // Tags de l'index
    if (indexArticle.tags) {
      indexArticle.tags.forEach(tag => concepts.add(tag))
    }
    
    // Concepts du contenu
    const headings = content.match(/^#{2,3}\s+(.+)$/gm) || []
    headings.forEach(heading => {
      const clean = heading.replace(/^#{2,3}\s+/, '').toLowerCase()
      const words = clean.split(/\s+/).filter(w => w.length > 3)
      words.slice(0, 2).forEach(w => concepts.add(w))
    })
    
    // Concepts techniques
    const techTerms = ['llmfeed', 'mcp', 'agent', 'agentic', 'session', 'feed', 'standard', 'interoperability']
    const contentLower = content.toLowerCase()
    techTerms.forEach(term => {
      if (contentLower.includes(term)) {
        concepts.add(term)
      }
    })
    
    return Array.from(concepts).slice(0, 8)
  }

  /**
   * Calcule le hash d'un fichier pour détecter les changements
   */
  getFileHash(filePath) {
    if (!fs.existsSync(filePath)) {
      return null
    }

    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      return crypto.createHash('md5').update(content).digest('hex')
    } catch (error) {
      return null
    }
  }

  /**
   * Calcule le hash de l'index pour détecter les changements globaux
   */
  getIndexHash(indexData) {
    const indexString = JSON.stringify(indexData, null, 0)
    return crypto.createHash('md5').update(indexString).digest('hex')
  }

  /**
   * Charge l'index et détecte les changements
   */
  analyzeChanges() {
    console.log(`🔍 Analyzing changes...`)
    
    if (!fs.existsSync(config.indexPath)) {
      throw new Error(`News index not found: ${config.indexPath}. Run generate-index-news.js first.`)
    }

    const indexData = JSON.parse(fs.readFileSync(config.indexPath, 'utf-8'))
    const articles = indexData.en || []
    const currentIndexHash = this.getIndexHash(articles)

    // Détection changements globaux
    const indexChanged = this.cache.index_hash !== currentIndexHash
    
    if (!indexChanged && articles.length === Object.keys(this.cache.articles).length) {
      console.log(`✅ No changes detected, using cached feed`)
      return { articles: [], indexChanged: false, useCache: true }
    }

    // Analyse détaillée des changements
    const changedArticles = []
    const currentSlugs = new Set()

    for (const article of articles) {
      currentSlugs.add(article.slug)
      
      const filePath = path.join(config.newsDir, `${article.slug}.md`)
      const currentHash = this.getFileHash(filePath)
      const cachedArticle = this.cache.articles[article.slug]

      // Nouveau article ou modifié
      if (!cachedArticle || cachedArticle.file_hash !== currentHash || cachedArticle.index_data_hash !== this.getIndexHash([article])) {
        changedArticles.push({
          ...article,
          _file_hash: currentHash,
          _index_data_hash: this.getIndexHash([article])
        })
      }
    }

    // Détection articles supprimés
    const removedSlugs = Object.keys(this.cache.articles).filter(slug => !currentSlugs.has(slug))
    
    console.log(`📊 Change analysis:`)
    console.log(`  - ${changedArticles.length} articles to process`)
    console.log(`  - ${removedSlugs.length} articles to remove`)
    console.log(`  - ${articles.length - changedArticles.length} articles cached`)

    // Nettoyage des articles supprimés
    removedSlugs.forEach(slug => {
      delete this.cache.articles[slug]
      this.stats.removed++
    })

    this.cache.index_hash = currentIndexHash
    
    return { 
      articles: changedArticles, 
      indexChanged: true, 
      useCache: false,
      allArticles: articles
    }
  }

  /**
   * Construit les index depuis tous les articles
   */
  buildIndexes(articles) {
    const indexes = {
      by_date: {},
      by_category: {},
      by_tag: {},
      by_intent: {}
    }

    articles.forEach((article, idx) => {
      // Index par date
      const yearMonth = article.date.substring(0, 7)
      if (!indexes.by_date[yearMonth]) indexes.by_date[yearMonth] = []
      indexes.by_date[yearMonth].push(idx)

      // Index par catégorie
      article.categories.forEach(cat => {
        if (!indexes.by_category[cat]) indexes.by_category[cat] = []
        indexes.by_category[cat].push(idx)
      })

      // Index par tag
      article.tags.forEach(tag => {
        if (!indexes.by_tag[tag]) indexes.by_tag[tag] = []
        indexes.by_tag[tag].push(idx)
      })

      // Index par intent
      if (!indexes.by_intent[article.intent]) indexes.by_intent[article.intent] = []
      indexes.by_intent[article.intent].push(idx)
    })

    return indexes
  }

  /**
   * Calcule stats depuis tous les articles
   */
  calculateStats(articles, isLite = false) {
    const contentDistribution = {}
    const qualityMetrics = { high_quality: 0, good_quality: 0, needs_improvement: 0 }
    const technicalLevels = {}
    const businessImpact = {}

    articles.forEach(article => {
      // Distribution type
      contentDistribution[article.type] = (contentDistribution[article.type] || 0) + 1
      
      // Qualité
      const score = article.metadata.content_quality_score || article.metadata.quality_score || 0
      if (score >= 80) qualityMetrics.high_quality++
      else if (score >= 60) qualityMetrics.good_quality++
      else qualityMetrics.needs_improvement++
      
      // Technical levels
      const techLevel = article.metadata.technical_level
      technicalLevels[techLevel] = (technicalLevels[techLevel] || 0) + 1
      
      // Business impact
      const bizImpact = article.metadata.business_impact
      businessImpact[bizImpact] = (businessImpact[bizImpact] || 0) + 1
    })

    // Tags fréquents
    const tagCounts = {}
    articles.forEach(article => {
      article.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })
    const mostCommonTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, isLite ? 5 : 10)
      .map(([tag, count]) => ({ tag, count }))

    const stats = {
      content_distribution: contentDistribution,
      quality_metrics: qualityMetrics,
      technical_levels: technicalLevels,
      business_impact_distribution: businessImpact,
      most_common_tags: mostCommonTags,
      date_range: {
        earliest: articles[articles.length - 1]?.date,
        latest: articles[0]?.date
      }
    }

    // Stats spécifiques version lite
    if (isLite) {
      stats.pareto_metrics = {
        selection_strategy: "quality_threshold_based",
        quality_threshold: config.lite.qualityThreshold,
        content_optimization: "intelligent_structural_extraction",
        token_efficiency: "natural_pareto_by_content_quality",
        no_artificial_limits: "includes_all_articles_meeting_quality_bar"
      }
    }

    return stats
  }

  /**
   * Sauvegarde le cache
   */
  saveCache() {
    const cacheDir = path.dirname(config.cachePath)
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true })
    }

    const cacheData = {
      articles: this.cache.articles,
      index_hash: this.cache.index_hash,
      last_generation: new Date().toISOString(),
      stats: this.stats
    }

    fs.writeFileSync(config.cachePath, JSON.stringify(cacheData, null, 2), 'utf-8')
  }

  /**
   * Génère les deux feeds (complet + lite)
   */
  async generateFeeds() {
    console.log('🔧 Building dual news export feeds (full + lite)...')
    
    // Analyse des changements
    const { articles: changedArticles, useCache, allArticles } = this.analyzeChanges()
    
    if (useCache) {
      // Charge les feeds existants
      if (fs.existsSync(config.outputPath) && fs.existsSync(config.outputLitePath)) {
        const existingFeed = JSON.parse(fs.readFileSync(config.outputPath, 'utf-8'))
        const existingLiteFeed = JSON.parse(fs.readFileSync(config.outputLitePath, 'utf-8'))
        
        existingFeed.metadata.generated_at = new Date().toISOString()
        existingLiteFeed.metadata.generated_at = new Date().toISOString()
        
        console.log(`📋 Using cached feeds: ${existingFeed.data.articles.length} full / ${existingLiteFeed.data.articles.length} lite`)
        return { fullFeed: existingFeed, liteFeed: existingLiteFeed }
      }
    }

    // Traite les articles modifiés
    for (const changedArticle of changedArticles) {
      const processedArticle = this.processArticleFull(changedArticle)
      if (processedArticle) {
        this.cache.articles[changedArticle.slug] = {
          article: processedArticle,
          file_hash: changedArticle._file_hash,
          index_data_hash: changedArticle._index_data_hash,
          processed_at: new Date().toISOString()
        }
        this.stats.updated++
        console.log(`✅ ${processedArticle.slug} processed (priority: ${processedArticle.priority_score}/100)`)
      }
    }
    this.stats.processed = changedArticles.length

    // Collecte tous les articles (cachés + nouveaux)
    const finalArticles = Object.values(this.cache.articles)
      .map(cached => cached.article)
      .sort((a, b) => new Date(b.date) - new Date(a.date))

    this.stats.cached = finalArticles.length - this.stats.updated

    // 🔥 GÉNÈRE VERSION COMPLÈTE
    this.template.metadata.total_articles = finalArticles.length
    this.template.metadata.generated_at = new Date().toISOString()
    this.template.data.articles = finalArticles
    this.template.data.index = this.buildIndexes(finalArticles)
    this.template.data.stats = this.calculateStats(finalArticles, false)

    // 🎯 GÉNÈRE VERSION LITE (Pareto 80/20)
    const liteArticles = this.selectLiteArticles(finalArticles)
    this.liteTemplate.metadata.total_articles = liteArticles.length
    this.liteTemplate.metadata.generated_at = new Date().toISOString()
    this.liteTemplate.data.articles = liteArticles
    this.liteTemplate.data.stats = this.calculateStats(liteArticles, true)
    
    console.log('📊 Dual generation stats:')
    console.log(`  - ${this.stats.updated} articles updated`)
    console.log(`  - ${this.stats.removed} articles removed`)
    console.log(`  - ${this.stats.cached} articles from cache`)
    console.log(`  - ${finalArticles.length} total articles in full feed`)
    console.log(`  - ${liteArticles.length} quality articles selected for lite feed (natural Pareto)`)
    
    return { fullFeed: this.template, liteFeed: this.liteTemplate }
  }

  /**
   * Sauvegarde les deux feeds
   */
  async saveFeeds(fullFeed, liteFeed) {
    // Sauvegarde version complète
    const outputDir = path.dirname(config.outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(config.outputPath, JSON.stringify(fullFeed, null, 2), 'utf-8')
    const fullFileSize = Math.round(fs.statSync(config.outputPath).size / 1024)
    
    // Sauvegarde version lite
    fs.writeFileSync(config.outputLitePath, JSON.stringify(liteFeed, null, 2), 'utf-8')
    const liteFileSize = Math.round(fs.statSync(config.outputLitePath).size / 1024)
    
    // Sauvegarde le cache
    this.saveCache()
    
    console.log(`✅ Full news export saved: ${config.outputPath} (${fullFileSize} KB)`)
    console.log(`🎯 Lite news export saved: ${config.outputLitePath} (${liteFileSize} KB)`)
    console.log(`💾 Cache updated: ${config.cachePath}`)
    
    const reduction = Math.round((1 - liteFileSize / fullFileSize) * 100)
    console.log(`📈 Lite version is ${reduction}% smaller for Pareto strategy!`)
  }

  /**
   * Force la régénération complète (bypass cache)
   */
  forceFullRegeneration() {
    console.log('🔄 Forcing full regeneration...')
    
    // Supprime le cache
    if (fs.existsSync(config.cachePath)) {
      fs.unlinkSync(config.cachePath)
    }
    
    // Recharge le cache vide
    this.cache = { articles: {}, index_hash: null, last_generation: null }
  }
}

// Fonction principale
async function main() {
  console.log('🚀 WellKnownMCP Dual News Export Generator (Full + Lite)')
  console.log('=========================================================')
  
  try {
    const generator = new DualNewsExportGenerator()
    
    // Option pour forcer la régénération complète
    if (process.argv.includes('--force')) {
      generator.forceFullRegeneration()
    }
    
    // Génère les deux feeds
    const { fullFeed, liteFeed } = await generator.generateFeeds()
    
    // Sauvegarde
    await generator.saveFeeds(fullFeed, liteFeed)
    
    console.log('🎉 Dual news export completed!')
    console.log(`📚 Full feed: ${config.outputPath}`)
    console.log(`🎯 Lite feed: ${config.outputLitePath}`)
    console.log('✨ Ready for both project context AND prompt shortcut!')
    
  } catch (error) {
    console.error('❌ Export generation failed:', error.message)
    process.exit(1)
  }
}

// Exécution si appelé directement
if (require.main === module) {
  main()
}

module.exports = { DualNewsExportGenerator }