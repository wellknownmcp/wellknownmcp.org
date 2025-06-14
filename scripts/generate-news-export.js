// scripts/generate-news-export.js
// Version incrémentale optimisée pour builds fréquents

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

// Configuration
const config = {
  indexPath: path.join(__dirname, '..', 'public', 'news', 'index.json'),
  newsDir: path.join(__dirname, '..', 'public', 'news', 'en'),
  outputPath: path.join(__dirname, '..', 'public','.well-known', 'exports', 'news-export.llmfeed.json'),
  cachePath: path.join(__dirname, '..', '.cache', 'news-export-cache.json'),
  siteOrigin: 'https://wellknownmcp.org',
  maxContentLength: 15000
}

class IncrementalNewsExportGenerator {
  constructor() {
    this.template = this.createFeedTemplate()
    this.cache = this.loadCache()
    this.stats = {
      processed: 0,
      updated: 0,
      removed: 0,
      cached: 0
    }
  }

  /**
   * Template hardcodé pour wellknownmcp.org
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
        total_articles: 0
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
    
    // Limite taille
    if (content.length > config.maxContentLength) {
      content = content.substring(0, config.maxContentLength) + "\n\n[Content truncated - see full article on website]"
    }
    
    return content.trim()
  }

  /**
   * Traite un article (nouveau ou modifié)
   */
  processArticle(indexArticle) {
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

    // Met à jour le cache
    this.cache.articles[indexArticle.slug] = {
      article: processedArticle,
      file_hash: indexArticle._file_hash,
      index_data_hash: indexArticle._index_data_hash,
      processed_at: new Date().toISOString()
    }

    return processedArticle
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
  calculateStats(articles) {
    const contentDistribution = {}
    const qualityMetrics = { high_quality: 0, good_quality: 0, needs_improvement: 0 }
    const technicalLevels = {}
    const businessImpact = {}

    articles.forEach(article => {
      // Distribution type
      contentDistribution[article.type] = (contentDistribution[article.type] || 0) + 1
      
      // Qualité
      const score = article.metadata.content_quality_score
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
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }))

    return {
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
  }

  /**
   * Génère le feed de manière incrémentale
   */
  async generateFeed() {
    console.log('🔧 Building incremental news export feed...')
    
    // Analyse des changements
    const { articles: changedArticles, useCache, allArticles } = this.analyzeChanges()
    
    if (useCache) {
      // Charge le feed existant
      if (fs.existsSync(config.outputPath)) {
        const existingFeed = JSON.parse(fs.readFileSync(config.outputPath, 'utf-8'))
        existingFeed.metadata.generated_at = new Date().toISOString()
        console.log(`📋 Using cached feed with ${existingFeed.data.articles.length} articles`)
        return existingFeed
      }
    }

    // Traite les articles modifiés
    for (const changedArticle of changedArticles) {
      const processedArticle = this.processArticle(changedArticle)
      if (processedArticle) {
        this.stats.updated++
        console.log(`✅ ${processedArticle.slug} processed (quality: ${processedArticle.metadata.content_quality_score}/100)`)
      }
    }
    this.stats.processed = changedArticles.length

    // Collecte tous les articles (cachés + nouveaux)
    const finalArticles = Object.values(this.cache.articles)
      .map(cached => cached.article)
      .sort((a, b) => new Date(b.date) - new Date(a.date))

    this.stats.cached = finalArticles.length - this.stats.updated

    // Met à jour le template
    this.template.metadata.total_articles = finalArticles.length
    this.template.metadata.generated_at = new Date().toISOString()
    
    // Ajoute les données
    this.template.data.articles = finalArticles
    this.template.data.index = this.buildIndexes(finalArticles)
    this.template.data.stats = this.calculateStats(finalArticles)
    
    console.log('📊 Incremental generation stats:')
    console.log(`  - ${this.stats.updated} articles updated`)
    console.log(`  - ${this.stats.removed} articles removed`)
    console.log(`  - ${this.stats.cached} articles from cache`)
    console.log(`  - ${finalArticles.length} total articles in feed`)
    
    return this.template
  }

  /**
   * Sauvegarde le feed et le cache
   */
  async saveFeed(feed) {
    // Sauvegarde le feed
    const outputDir = path.dirname(config.outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(config.outputPath, JSON.stringify(feed, null, 2), 'utf-8')
    
    const fileSize = fs.statSync(config.outputPath).size
    const fileSizeKB = Math.round(fileSize / 1024)
    
    // Sauvegarde le cache
    this.saveCache()
    
    console.log(`✅ News export saved: ${config.outputPath}`)
    console.log(`📦 File size: ${fileSizeKB} KB`)
    console.log(`💾 Cache updated: ${config.cachePath}`)
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
  console.log('🚀 WellKnownMCP News Export Generator (Incremental)')
  console.log('===================================================')
  
  try {
    const generator = new IncrementalNewsExportGenerator()
    
    // Option pour forcer la régénération complète
    if (process.argv.includes('--force')) {
      generator.forceFullRegeneration()
    }
    
    // Génère le feed incrémentalement
    const feed = await generator.generateFeed()
    
    // Sauvegarde
    await generator.saveFeed(feed)
    
    console.log('🎉 Incremental news export completed!')
    console.log(`🔗 Feed available at: ${config.outputPath}`)
    console.log('✨ Ready for agent consumption!')
    
  } catch (error) {
    console.error('❌ Export generation failed:', error.message)
    process.exit(1)
  }
}

// Exécution si appelé directement
if (require.main === module) {
  main()
}

module.exports = { IncrementalNewsExportGenerator }