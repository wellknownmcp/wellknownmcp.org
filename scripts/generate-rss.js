// scripts/generate-rss.js
// Génère RSS à partir de index.json

const fs = require('fs')
const path = require('path')
const { Feed } = require('feed')

const languages = ['en', 'fr', 'es', 'zh', 'ar', 'uk']
const siteURL = 'https://wellknownmcp.org'

const indexPath = path.join(__dirname, '..', 'public', 'news', 'index.json')
const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))

languages.forEach(lang => {
  const articles = index[lang] || []
  const outputDir = path.join(__dirname, '..', 'public', 'news', lang)

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const feed = new Feed({
    title: `News (${lang}) - WellKnownMCP`,
    description: 'Agentic Web News',
    id: `${siteURL}/${lang}/news/`,
    link: `${siteURL}/${lang}/news/`,
    language: lang,
    copyright: `© ${(new Date()).getFullYear()} WellKnownMCP`,
  })

  articles.forEach(article => {
    feed.addItem({
      title: article.title,
      id: `${siteURL}/${lang}/news/${article.slug}`,
      link: `${siteURL}/${lang}/news/${article.slug}`,
      description: article.description,
      date: new Date(article.date),
    })
  })

  fs.writeFileSync(path.join(outputDir, 'rss.xml'), feed.rss2())
  console.log(`✅ RSS generated for ${lang}: public/news/${lang}/rss.xml`)
})

console.log('🎉 All RSS feeds generated!')
