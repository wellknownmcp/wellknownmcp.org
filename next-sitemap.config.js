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
// 👇 NEW : fonction pour récupérer les exports de spec
function getSpecExportPaths() {
  const baseDir = path.resolve(__dirname, 'public/exports/spec')

  function walk(dir) {
    const results = []
    const list = fs.readdirSync(dir)
    list.forEach((file) => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        results.push(...walk(fullPath))
      } else if (file.endsWith('.md')) {
        const slug = path.basename(file, '.md')
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

// 👇 NEW : fonction pour récupérer tous les fichiers de .well-known
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
  generateRobotsTxt: false,
  changefreq: 'weekly',
  exclude: ['/preview/*', '/api/*'],
  sitemapSize: 5000,

  
  transform: async (config, path) => {
    const matchNewsTransform = path.match(/^\/([a-z]{2})\/news\/(.+)$/);
    if (matchNewsTransform) {
      const [_, lang, slug] = matchNewsTransform;
      const alternateRefs = Object.keys(index).map((lng) => ({
        hreflang: lng,
        href: `${siteUrl}/${lng}/news/${slug}`,
      }));
      return {
        loc: `${siteUrl}${path}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
        alternateRefs
      };
    }
    return {
      loc: `${siteUrl}${path}`,
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: new Date().toISOString()
    };
  },


  // 👇 Combine articles + fichiers .well-known
  
  additionalPaths: async () => {
    const newsPaths = allNewsPaths.map(({ lang, slug, path }) => {
      const alternateRefs = Object.keys(index).map((lng) => ({
        hreflang: lng,
        href: `${siteUrl}/${lng}/news/${slug}`,
      }));
      return {
        loc: `${siteUrl}${path}`,
        changefreq: 'weekly',
        priority: path.startsWith(`/${defaultLang}/`) ? 0.9 : 0.7,
        lastmod: new Date().toISOString(),
        alternateRefs
      };
    });

    const wellKnownPaths = getWellKnownPaths();
    const specPaths = getSpecExportPaths();
    return [...newsPaths, ...wellKnownPaths, ...specPaths];
  }

}
