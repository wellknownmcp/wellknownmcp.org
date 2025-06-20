const siteUrl = 'https://wellknownmcp.org'

const fs = require('fs')
const path = require('path')

// Helper: format date YYYY-MM-DD
const formatDateForSitemap = (dateString) => {
  if (!dateString) return new Date().toISOString().split('T')[0]
  return dateString.split('T')[0]
}

// Read news index
let newsIndex = []
const newsIndexPath = path.resolve(__dirname, 'public/news/index.json')
if (fs.existsSync(newsIndexPath)) {
  console.log(`✅ Found news index at ${newsIndexPath}`)
  newsIndex = JSON.parse(fs.readFileSync(newsIndexPath, 'utf-8'))
} else {
  console.warn('⚠️ No news index found, skipping newsPaths')
}

// Read llmfeedhub index
let llmfeedhubIndex = []
const llmfeedhubIndexPath = path.resolve(__dirname, 'public/exports/index.json')
if (fs.existsSync(llmfeedhubIndexPath)) {
  console.log(`✅ Found llmfeedhub index at ${llmfeedhubIndexPath}`)
  llmfeedhubIndex = JSON.parse(fs.readFileSync(llmfeedhubIndexPath, 'utf-8'))
} else {
  console.warn('⚠️ No llmfeedhub index found, skipping llmfeedhubPaths')
}

// Well-known files
const wellKnownFiles = fs.readdirSync(
  path.resolve(__dirname, 'public/.well-known')
)
console.log(`✅ DEBUG: wellKnownFiles = ${wellKnownFiles.length}`)

// Spec paths from /public/exports/spec/**/*.md
const getSpecPaths = () => {
  const baseDir = path.resolve(__dirname, 'public/exports/spec')
  const walk = (dir) => {
    let results = []
    const list = fs.readdirSync(dir)
    list.forEach((file) => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        results = results.concat(walk(fullPath))
      } else if (file.endsWith('.md')) {
        const slug = fullPath
          .replace(baseDir, '')
          .replace(/\\/g, '/')
          .replace(/\.md$/, '')
        results.push(`${siteUrl}/spec${slug}`)
      }
    })
    return results
  }
  return walk(baseDir)
}
const specPaths = getSpecPaths()
console.log(`✅ DEBUG: specPaths = ${specPaths.length}`)

// Languages
const languages = ['en', 'fr', 'es', 'hi', 'zh', 'ar', 'uk']

// RSS Paths
const rssPaths = languages.map((lang) => ({
  loc: `${siteUrl}/news/${lang}/rss.xml`,
  changefreq: 'daily',
  priority: 0.6,
  lastmod: new Date().toISOString().split('T')[0],
}))
console.log(`✅ DEBUG: rssPaths = ${rssPaths.length}`)

// ✅ APPROCHE ROBUSTE : Créer un index global des traductions par slug
const globalTranslations = new Map()

// Étape 1: Collecter TOUTES les traductions de TOUS les articles
Object.entries(newsIndex).forEach(([lang, articles]) => {
  if (lang !== '_meta' && Array.isArray(articles)) {
    articles.forEach(article => {
      if (article.translations && typeof article.translations === 'object') {
        // Utiliser la première version complète des traductions trouvée
        if (!globalTranslations.has(article.slug)) {
          globalTranslations.set(article.slug, article.translations)
          console.log(`📝 Stored translations for "${article.slug}": ${Object.keys(article.translations).length} languages`)
        }
      }
    })
  }
})

console.log(`✅ Global translations map created with ${globalTranslations.size} articles`)

// Étape 2: Fonction pour générer les hreflang à partir de l'index global
const generateHreflangForSlug = (slug) => {
  const translations = globalTranslations.get(slug)
  if (!translations || Object.keys(translations).length <= 1) {
    return []
  }

  const alternateRefs = []

  // Ajouter chaque langue disponible
  Object.entries(translations).forEach(([lang, path]) => {
    if (path && typeof path === 'string') {
      alternateRefs.push({
        href: `${siteUrl}${path}`,
        hreflang: lang,
      })
    }
  })

  // Ajouter x-default (anglais si disponible)
  if (translations.en) {
    alternateRefs.push({
      href: `${siteUrl}${translations.en}`,
      hreflang: 'x-default',
    })
  }

  return alternateRefs
}

// ✅ News paths avec hreflang générés à partir de l'index global
const newsPaths = Object.entries(newsIndex)
  .filter(([lang, articles]) => {
    return lang !== '_meta' && Array.isArray(articles)
  })
  .flatMap(([lang, articles]) =>
    articles.map((item) => {
      const urlPath = `/${lang}/news/${item.slug}`
      
      const basePath = {
        loc: `${siteUrl}${urlPath}`,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: formatDateForSitemap(item.date),
      }

      // ✅ UTILISER L'INDEX GLOBAL pour assurer la cohérence
      const alternateRefs = generateHreflangForSlug(item.slug)
      
      if (alternateRefs.length > 0) {
        basePath.alternateRefs = alternateRefs

        // DEBUG spécial pour l'article claude
        if (item.slug === 'claude-mcp-agentic-web') {
          console.log(`\n🎯 CLAUDE ARTICLE (${lang}): ${urlPath}`)
          console.log(`🎯 Using global translations for "${item.slug}":`)
          const globalTrans = globalTranslations.get(item.slug)
          Object.entries(globalTrans || {}).forEach(([tLang, tPath]) => {
            console.log(`   ${tLang} -> ${tPath}`)
          })
          console.log(`🎯 Generated ${alternateRefs.length} hreflang entries:`)
          alternateRefs.forEach(ref => {
            console.log(`   ${ref.hreflang} -> ${ref.href}`)
          })
        }

        console.log(`✅ Added ${alternateRefs.length} hreflang entries for ${urlPath}`)
      } else {
        console.log(`📝 Single language article: ${urlPath}`)
      }

      return basePath
    })
  )

console.log(`✅ DEBUG: newsPaths = ${newsPaths.length}`)

// llmfeedhub Paths
const llmfeedhubPaths = llmfeedhubIndex
  .filter((item) => item.slug && item.slug !== 'undefined')
  .map((item) => ({
    loc: `${siteUrl}/llmfeedhub/${item.slug}`,
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0],
  }))
console.log(`✅ DEBUG: llmfeedhubPaths = ${llmfeedhubPaths.length}`)

// ✨ NOUVEAU: Landing Page Versions - Audiences spécialisées
const landingVersions = [
  {
    version: 'agent',
    priority: 0.9,
    changefreq: 'weekly',
    description: 'Agent-optimized interface for AI systems'
  },
  {
    version: 'tech', 
    priority: 0.8,
    changefreq: 'weekly',
    description: 'Technical implementation guide for developers'
  },
  {
    version: 'business',
    priority: 0.8,
    changefreq: 'weekly', 
    description: 'Business strategy and ROI analysis'
  },
  {
    version: 'simple',
    priority: 0.7,
    changefreq: 'monthly',
    description: 'Beginner-friendly introduction'
  },
  {
    version: 'rabbit',
    priority: 0.6,
    changefreq: 'monthly',
    description: 'Maximum information density explorer version'
  },
  {
    version: 'select',
    priority: 0.5,
    changefreq: 'monthly',
    description: 'Experience level selector interface'
  }
]

const landingVersionPaths = landingVersions.map((landing) => ({
  loc: `${siteUrl}/?v=${landing.version}`,
  changefreq: landing.changefreq,
  priority: landing.priority,
  lastmod: new Date().toISOString().split('T')[0],
}))

console.log(`✅ DEBUG: landingVersionPaths = ${landingVersionPaths.length}`)

// EXPORT FINAL CONFIG
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  trailingSlash: false,

  exclude: [
    '/api/*',
    '/admin/*',
    '/preview/*',
    '/_next/*',
  ],

  transform: async (config, path) => {
    // ✨ NOUVEAU: Autoriser feed-html mais bloquer autres API
    if (path.startsWith('/api/') && !path.startsWith('/api/feed-html')) {
      return null
    }

    return {
      loc: `${siteUrl}${path}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString().split('T')[0],
    }
  },

  additionalPaths: async (config) => {
    const paths = []

    // ✨ NOUVEAU: Landing Page Versions - Priorité haute pour agent discovery
    paths.push(...landingVersionPaths)

    // well-known
    wellKnownFiles.forEach((f) => {
      paths.push({
        loc: `${siteUrl}/.well-known/${f}`,
        changefreq: 'weekly',
        priority: 1,
        lastmod: new Date().toISOString().split('T')[0],
      })
    })

    // ✨ NOUVEAU: Well-known feeds HTML (test minimal)
    // Ajouter seulement pour les fichiers .llmfeed.json
    wellKnownFiles
      .filter(f => f.endsWith('.llmfeed.json'))
      .forEach((f) => {
        const feedName = f.replace('.llmfeed.json', '')
        paths.push({
          loc: `${siteUrl}/api/feed-html?wellknown=${feedName}`,
          changefreq: 'weekly',
          priority: 0.9, // Légèrement inférieur au JSON
          lastmod: new Date().toISOString().split('T')[0],
        })
      })

    // spec
    specPaths.forEach((url) => {
      paths.push({
        loc: url,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString().split('T')[0],
      })
    })

    // RSS
    paths.push(...rssPaths)

    // News avec hreflang cohérents
    paths.push(...newsPaths)

    // llmfeedhub
    paths.push(...llmfeedhubPaths)

    console.log(`✅ DEBUG: wellKnownHtmlFeeds = ${wellKnownFiles.filter(f => f.endsWith('.llmfeed.json')).length}`)
    console.log(`✅ DEBUG: landingVersions = ${landingVersionPaths.length}`)
    console.log(`✅ DEBUG: total additionalPaths = ${paths.length}`)
    
    // ✅ Vérification finale
    const claudeArticles = paths.filter(p => p.loc && p.loc.includes('claude-mcp-agentic-web'))
    console.log(`\n🎯 Found ${claudeArticles.length} Claude articles:`)
    claudeArticles.forEach(article => {
      console.log(`🎯 ${article.loc} - hreflang count: ${article.alternateRefs ? article.alternateRefs.length : 0}`)
      if (article.alternateRefs && article.alternateRefs.length > 0) {
        console.log(`   Sample hreflang: ${article.alternateRefs[0].hreflang} -> ${article.alternateRefs[0].href}`)
      }
    })

    // ✅ Vérification des nouvelles landing versions
    console.log(`\n🎭 Landing page versions added to sitemap:`)
    landingVersionPaths.forEach(landing => {
      console.log(`🎭 ${landing.loc} - priority: ${landing.priority}`)
    })

    return paths
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/.well-known/',
          '/api/feed-html', // ✨ NOUVEAU
        ],
        disallow: ['/api/', '/admin/', '/_next/', '/preview/'],
      },
      {
        userAgent: 'GPTBot',
        allow: [
          '/',
          '/.well-known/',
          '/exports/',
          '/api/feed-html', // ✨ NOUVEAU
        ],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: [
          '/', 
          '/.well-known/', 
          '/exports/',
          '/api/feed-html' // ✨ NOUVEAU
        ],
        disallow: ['/api/'],
      },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
}