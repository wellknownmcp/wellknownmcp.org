const fs = require('fs')
const path = require('path')

const siteUrl = 'https://wellknownmcp.org'
const index = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'public/news/index.json'), 'utf-8')
)
const defaultLang = 'en'

const allNewsPaths = []
Object.entries(index).forEach(([lang, slugs]) => {
  slugs.forEach((slug) => {
    allNewsPaths.push({
      lang,
      slug,
      path: `/${lang}/news/${slug}`,
    })
  })
})

function getSpecExportPaths() {
  const baseDir = path.resolve(__dirname, 'public/exports/spec')

  function walk(dir, relativePath = '') {
    const results = []
    const list = fs.readdirSync(dir)
    list.forEach((file) => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        results.push(...walk(fullPath, path.join(relativePath, file)))
      } else if (file.endsWith('.md')) {
        const slug = path
          .join(relativePath, path.basename(file, '.md'))
          .replace(/\\/g, '/')
        results.push(slug)
      }
    })
    return results
  }

  return walk(baseDir).map((slug) => ({
    loc: `${siteUrl}/spec/${slug}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString(),
  }))
}

function getWellKnownPaths() {
  const dir = path.resolve(__dirname, 'public/.well-known')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => fs.statSync(path.join(dir, file)).isFile())
    .map((file) => ({
      loc: `${siteUrl}/.well-known/${file}`,
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    }))
}

module.exports = {
  siteUrl,
  generateRobotsTxt: true, // je te recommande de le remettre à true
  changefreq: 'weekly',
  exclude: ['/preview/*', '/api/*'],
  sitemapSize: 5000,

  transform: null, // désactive transform automatique

  additionalPaths: async (config) => {
    const newsPaths = allNewsPaths.map(({ lang, slug, path }) => {
      const alternateRefs = Object.keys(index).map((lng) => ({
        hreflang: lng,
        href: `${siteUrl}/${lng}/news/${slug}`,
      }))
      return {
        loc: `${siteUrl}${path}`,
        changefreq: 'weekly',
        priority: path.startsWith(`/${defaultLang}/`) ? 0.9 : 0.7,
        lastmod: new Date().toISOString(),
        alternateRefs,
      }
    })

    const wellKnownPaths = getWellKnownPaths()
    const specPaths = getSpecExportPaths()

    return [...newsPaths, ...wellKnownPaths, ...specPaths]
  },
}
