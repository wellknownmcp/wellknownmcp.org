// scripts/generate-index-news.js
// Génère public/news/index.json enrichi + debug

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const languages = ['en', 'fr', 'es', 'hi', 'zh', 'ar', 'uk']
const outputPath = path.join(__dirname, '..', 'public', 'news', 'index.json')
const siteNewsPath = path.join(__dirname, '..', 'public', 'news')

const index = {}

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

      const cleanContent = content.replace(/[#>*_`~\-!\[\]\(\)]/g, '')
      const excerpt = cleanContent
        .split('\n')
        .filter(Boolean)
        .slice(0, 2)
        .join(' ')
        .slice(0, 200)

      return {
        slug: file.replace('.md', ''),
        title: data.title || file.replace('.md', ''),
        description: data.description || '',
        date:
          typeof data.date === 'string'
            ? data.date
            : data.date?.toString() ?? 'unknown',
        tags: data.tags || [],
        excerpt,
      }
    })
    .filter(Boolean) // enlève les `null` en cas d'erreur
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  console.log(`→ Parsed ${articles.length} article(s) for lang "${lang}".`)

  index[lang] = articles
})

fs.writeFileSync(outputPath, JSON.stringify(index, null, 2))
console.log('✅ index.json generated at public/news/index.json')
