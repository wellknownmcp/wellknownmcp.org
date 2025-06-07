const path = require('path')
const fs = require('fs')

const siteUrl = 'https://wellknownmcp.org'
const languages = ['en', 'fr', 'es', 'hi', 'zh', 'ar', 'uk']

// Format date
function formatDateForSitemap(date) {
  if (!date) return new Date().toISOString().split('T')[0]
  return date.split('T')[0]
}

// Load news index
let news = {}
try {
  const newsPath = path.resolve(__dirname, 'public/news/index.json')
  if (fs.existsSync(newsPath)) {
    console.log(`✅ Found news index at ${newsPath}`)
    news = JSON.parse(fs.readFileSync(newsPath, 'utf-8'))
  } else {
    console.warn('⚠️ Could not find news index.json → skipping news')
  }
} catch (err) {
  console.warn('⚠️ Error loading news index.json:', err)
  news = {}
}

const newsItems = languages.flatMap((lang) =>
  (news[lang] || [])
    .filter((item) => item.translations && item.translations[lang])
    .map((item) => ({
      lang,
      slug: item.slug,
      translations: item.translations,
      date: item.date,
    }))
)

// Load llmfeedhub index
let llmfeedhubIndex = []
try {
  const hubIndexPath = path.resolve(__dirname, 'public/exports/index.json')
  if (fs.existsSync(hubIndexPath)) {
    console.log(`✅ Found llmfeedhub index at ${hubIndexPath}`)
    llmfeedhubIndex = JSON.parse(fs.readFileSync(hubIndexPath, 'utf-8'))
  } else {
    console.warn(
      '⚠️ Could not find llmfeedhub index.json → skipping llmfeedhub'
    )
  }
} catch (err) {
  console.warn('⚠️ Error loading llmfeedhub index.json:', err)
  llmfeedhubIndex = []
}

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  outDir: './public',

  transform: async (config, path) => {
    return {
      loc: `${siteUrl}${path}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString().split('T')[0],
    }
  },

  additionalPaths: async (config) => {
    // .well-known/
    const wellKnownDir = path.resolve(__dirname, 'public/.well-known')
    const wellKnownFiles = fs.existsSync(wellKnownDir)
      ? fs
          .readdirSync(wellKnownDir)
          .filter((f) => !f.startsWith('.') && !f.endsWith('~'))
          .map((f) => `${siteUrl}/.well-known/${f}`)
      : []

    // /spec (public/exports/spec)
    const specBaseDir = path.resolve(__dirname, 'public/exports/spec')

    function getSpecSlugs(dir, base = '/spec') {
      if (!fs.existsSync(dir)) return []
      const entries = fs.readdirSync(dir, { withFileTypes: true })
      const paths = []

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          paths.push(...getSpecSlugs(fullPath, `${base}/${entry.name}`))
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          const slug = entry.name.replace(/\.md$/, '')
          paths.push(`${siteUrl}${base}/${slug}`)
        }
      }
      return paths
    }

    const specPaths = getSpecSlugs(specBaseDir)

    // RSS per language
    const rssPaths = languages.map((lang) => ({
      loc: `${siteUrl}/news/${lang}/rss.xml`,
      changefreq: 'daily',
      priority: 0.6,
      lastmod: new Date().toISOString().split('T')[0], // <== AJOUT !a
    }))

    // News hreflang
    const newsPaths = newsItems.map((item) => {
      const loc = `${siteUrl}/${item.lang}/news/${item.slug}`
      const alternateRefs = Object.entries(item.translations).map(
        ([hreflang, href]) => ({
          hreflang,
          href: `${siteUrl}${href}`,
        })
      )

      return {
        loc,
        lastmod: formatDateForSitemap(item.date),
        changefreq: 'weekly',
        priority: 0.9,
        alternateRefs,
      }
    })

    // llmfeedhub paths (NO .well-known/, NO .json)
    const llmfeedhubPaths = llmfeedhubIndex
      .filter((entry) => !entry.path.startsWith('.well-known/'))
      .map((entry) => {
        const cleanPath = entry.path.replace(/\.llmfeed\.json$/, '')
        return {
          loc: `${siteUrl}/llmfeedhub/${cleanPath}`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: 0.7,
        }
      })

    // DEBUG global
    console.log('✅ DEBUG: wellKnownFiles =', wellKnownFiles.length)
    console.log('✅ DEBUG: specPaths =', specPaths.length)
    console.log('✅ DEBUG: rssPaths =', rssPaths.length)
    console.log('✅ DEBUG: newsPaths =', newsPaths.length)
    console.log('✅ DEBUG: llmfeedhubPaths =', llmfeedhubPaths.length)

    return [
      ...wellKnownFiles,
      ...specPaths,
      ...rssPaths,
      ...newsPaths,
      ...llmfeedhubPaths,
    ]
  },
}
