// scripts/generate-index-news.js
// Génère public/news/index.json enrichi

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const languages = ['en', 'fr', 'es', 'zh', 'ar', 'uk']
const outputPath = path.join(__dirname, '..', 'public', 'news', 'index.json')
const siteNewsPath = path.join(__dirname, '..', 'news')

const index = {}

languages.forEach(lang => {
  const newsDir = path.join(siteNewsPath, lang)
  const files = fs.existsSync(newsDir)
    ? fs.readdirSync(newsDir).filter(file => file.endsWith('.md'))
    : []

  const articles = files.map(file => {
    const filePath = path.join(newsDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const cleanContent = content.replace(/[#>*_`~\-!\[\]\(\)]/g, '')
    const excerpt = cleanContent.split('\n').filter(Boolean).slice(0, 2).join(' ').slice(0, 200)

    return {
      slug: file.replace('.md', ''),
      title: data.title || file.replace('.md', ''),
      description: data.description || '',
      date: typeof data.date === 'string' ? data.date : data.date?.toString() ?? 'unknown',
      tags: data.tags || [],
      excerpt
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  index[lang] = articles
})

fs.writeFileSync(outputPath, JSON.stringify(index, null, 2))
console.log('✅ index.json generated at public/news/index.json')