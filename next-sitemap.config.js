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

// News Paths
const newsPaths = Object.entries(newsIndex).flatMap(([lang, articles]) =>
  articles.map((item) => ({
    loc: `${siteUrl}/${lang}/news/${item.slug}`,
    changefreq: 'daily',
    priority: 0.9,
    lastmod: formatDateForSitemap(item.date),
  }))
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

// EXPORT FINAL CONFIG
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,

  // ✅ EXCLURE LES ROUTES API
  exclude: [
    '/api/*', // Toutes les routes API
    '/admin/*', // Routes admin si vous en avez
    '/preview/*', // Routes de preview
    '/_next/*', // Fichiers Next.js
  ],

  transform: async (config, path) => {
    // ✅ DOUBLE VÉRIFICATION : Exclure manuellement les API
    if (path.startsWith('/api/')) {
      return null // Exclure cette URL
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

    // well-known
    wellKnownFiles.forEach((f) => {
      paths.push({
        loc: `${siteUrl}/.well-known/${f}`,
        changefreq: 'weekly',
        priority: 1,
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

    // News
    paths.push(...newsPaths)

    // llmfeedhub
    paths.push(...llmfeedhubPaths)

    console.log(`✅ DEBUG: total additionalPaths = ${paths.length}`)
    return paths
  },

  // ✅ ROBOTS.TXT PERSONNALISÉ
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/.well-known/', // ✅ ENCOURAGER les bots à explorer les feeds MCP
        ],
        disallow: ['/api/', '/admin/', '/_next/', '/preview/'],
      },
      // ✅ POLITIQUE SPÉCIALE POUR LES LLMs
      {
        userAgent: 'GPTBot', // OpenAI
        allow: [
          '/',
          '/.well-known/',
          '/exports/', // Feeds exportés
        ],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Claude-Web', // Anthropic (hypothétique)
        allow: ['/', '/.well-known/', '/exports/'],
        disallow: ['/api/'],
      },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
}
