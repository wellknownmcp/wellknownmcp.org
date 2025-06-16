// scripts/generate-index-news.js
// Version simplifiée pour usage solo - juste le score pour l'auteur

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const languages = ['en', 'fr', 'es', 'hi', 'zh', 'ar', 'uk']
const outputPath = path.join(__dirname, '..', 'public', 'news', 'index.json')
const siteNewsPath = path.join(__dirname, '..', 'public', 'news')

const index = {}
const slugToLangs = {}

// 📊 Fonction de scoring simplifié (pour l'auteur)
function calculateAIOScore(data) {
  let score = 0

  // Champs obligatoires (80 points max)
  if (data.title?.trim()) score += 15
  if (data.description?.trim()) score += 15
  if (data.date) score += 5
  if (data.lang) score += 5
  if (data.tags?.length > 0) score += 10
  if (data.format) score += 5
  if (data.intent) score += 5
  if (data.audience?.length > 0) score += 10
  if (data.audience?.includes('llm')) score += 10

  // Optimisations (20 points max)
  if (data.slug) score += 3
  if (data.image) score += 3
  if (data.subtitle) score += 2
  if (data.llmIntent) score += 2
  if (data.mcpFeedUrl) score += 3
  if (data.agentReadiness !== false) score += 2
  if (data.trustLevel && data.trustLevel !== 'basic') score += 3
  if (data.capabilities?.length > 0) score += 2

  return Math.min(100, score)
}

function estimateReadTime(content) {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

languages.forEach((lang) => {
  const newsDir = path.join(siteNewsPath, lang)
  console.log(`🔍 Scanning ${newsDir} ...`)

  const files = fs.existsSync(newsDir)
    ? fs.readdirSync(newsDir).filter((file) => file.endsWith('.md'))
    : []

  console.log(`→ Found ${files.length} file(s).`)

  const articles = files
    .map((file) => {
      const filePath = path.join(newsDir, file)
      let fileContent = ''
      try {
        fileContent = fs.readFileSync(filePath, 'utf-8')
      } catch (err) {
        console.warn(`⚠️ Could not read file ${filePath}: ${err.message}`)
        return null
      }

      let data, content
      try {
        const parsed = matter(fileContent)
        data = parsed.data
        content = parsed.content
      } catch (err) {
        console.warn(`⚠️ Could not parse frontmatter in ${filePath}: ${err.message}`)
        return null
      }

      // Score pour l'auteur (toi)
      const aioScore = calculateAIOScore(data)
      
      // Log pour feedback pendant l'écriture
      if (aioScore < 50) {
        console.log(`💡 "${file}" score: ${aioScore}/100 - consider improving frontmatter`)
      }

      // Nettoyage du contenu pour excerpt
      const cleanContent = content.replace(/[#>*_`~\-!\[\]\(\)]/g, '')
      const excerpt = cleanContent
        .split('\n')
        .filter(Boolean)
        .slice(0, 2)
        .join(' ')
        .slice(0, 200)

      const slug = file.replace('.md', '')

      // Enregistrement des traductions
      if (!slugToLangs[slug]) {
        slugToLangs[slug] = {}
      }
      slugToLangs[slug][lang] = `/${lang}/news/${slug}`

      // Date parsing
      const date = (() => {
        let dateValue = data.date
        if (typeof dateValue !== 'string') {
          dateValue = `${dateValue || ''}`.trim()
        }
        const parsed = Date.parse(dateValue)
        if (!isNaN(parsed)) {
          return new Date(parsed).toISOString().split('T')[0]
        } else {
          const stats = fs.statSync(filePath)
          const fallbackDate = stats.mtime.toISOString().split('T')[0]
          console.warn(`⚠️ Invalid date for "${slug}" (${lang}), using file mtime: ${fallbackDate}`)
          return fallbackDate
        }
      })()

      // Structure optimisée pour l'affichage public + score pour l'auteur
      return {
        // 📄 Métadonnées de base
        slug,
        title: data.title || slug,
        description: data.description || '',
        date,
        tags: data.tags || [],
        excerpt,
        
        // 🎯 Classification (utile pour le public)
        format: data.format || 'news',
        category: data.category || 'general',
        
        // 🧠 Intent et audience (utile pour filtrage)
        intent: data.intent || 'inform',
        llmIntent: data.llmIntent || 'browse-news-article',
        audience: data.audience || ['llm'],

        // 🎨 Présentation
        image: data.image || null,
        subtitle: data.subtitle || null,

        // 🏗️ Métadonnées utiles pour le public
        technicalLevel: data.technicalLevel || 'beginner',
        estimatedReadTime: data.estimatedReadTime || `${estimateReadTime(content)} min`,
        trustLevel: data.trustLevel || 'basic',
        
        // 💼 Contexte
        businessImpact: data.businessImpact || 'low',
        priority: data.priority || 'normal',

        // 📋 Capacités (utile pour les devs)
        feedTypes: data.feedTypes || [],
        capabilities: data.capabilities || [],

        // 🤖 Agent readiness (info publique utile)
        agentReadiness: data.agentReadiness !== false,
        
        // 📊 Score AIO (pour toi, l'auteur)
        aioScore,

        // Traductions (sera rempli dans la deuxième passe)
        translations: {},
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  console.log(`→ Parsed ${articles.length} article(s) for lang "${lang}".`)

  // Stats pour l'auteur
  const scores = articles.map(a => a.aioScore)
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  const needsWork = articles.filter(a => a.aioScore < 70).length
  
  console.log(`📊 ${lang}: Average ${avgScore}/100, ${needsWork} articles need improvement`)

  index[lang] = articles
})

// Deuxième passe → injection des traductions
console.log('🔄 Adding translations...')
Object.entries(index).forEach(([lang, articles]) => {
  articles.forEach((article) => {
    article.translations = slugToLangs[article.slug] || {}
  })
})

// Stats globales (pour info de l'auteur)
const allArticles = Object.values(index).flat()
const globalAvgScore = allArticles.length > 0 
  ? Math.round(allArticles.reduce((sum, a) => sum + a.aioScore, 0) / allArticles.length)
  : 0

const needsImprovementCount = allArticles.filter(a => a.aioScore < 70).length

console.log('\n📊 GLOBAL AUTHOR STATS:')
console.log(`Total articles: ${allArticles.length}`)
console.log(`Average AIO score: ${globalAvgScore}/100`)
console.log(`Articles needing improvement: ${needsImprovementCount}`)

// Articles avec le score le plus faible (pour focus amélioration)
const lowestScoring = allArticles
  .filter(a => a.aioScore < 80)
  .sort((a, b) => a.aioScore - b.aioScore)
  .slice(0, 5)

if (lowestScoring.length > 0) {
  console.log('\n🔧 TOP 5 ARTICLES TO IMPROVE:')
  lowestScoring.forEach(a => {
    console.log(`   ${a.aioScore}/100 - ${a.title} (${a.slug})`)
  })
}

const outputData = {
  ...index,
  _meta: {
    generated_at: new Date().toISOString(),
    total_articles: allArticles.length,
    global_avg_score: globalAvgScore,
    languages: languages
  }
}

fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2))
console.log('✅ Enhanced index.json generated (with AIO scores for author)')