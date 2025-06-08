// scripts/generate-index-news.js
// Génère public/news/index.json enrichi + debug

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const languages = ['en', 'fr', 'es', 'hi', 'zh', 'ar', 'uk']
const outputPath = path.join(__dirname, '..', 'public', 'news', 'index.json')
const siteNewsPath = path.join(__dirname, '..', 'public', 'news')

const index = {}
const slugToLangs = {} // ← on ajoute ça

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
        console.warn(
          `⚠️ Could not parse frontmatter in ${filePath}: ${err.message}`
        )
        return null
      }

      const cleanContent = content.replace(/[#>*_`~\-!\[\]\(\)]/g, '')
      const excerpt = cleanContent
        .split('\n')
        .filter(Boolean)
        .slice(0, 2)
        .join(' ')
        .slice(0, 200)

      const slug = file.replace('.md', '')

      // On enregistre le slug dans slugToLangs
      if (!slugToLangs[slug]) {
        slugToLangs[slug] = {}
      }
      slugToLangs[slug][lang] = `/${lang}/news/${slug}`

      // Date parsing robuste
      const date = (() => {
        let dateValue = data.date
        if (typeof dateValue !== 'string') {
          dateValue = `${dateValue || ''}`.trim()
        }
        const parsed = Date.parse(dateValue)
        if (!isNaN(parsed)) {
          return new Date(parsed).toISOString().split('T')[0]
        } else {
          // fallback → date de dernière modif du fichier
          const stats = fs.statSync(filePath)
          const fallbackDate = stats.mtime.toISOString().split('T')[0]
          console.warn(`⚠️ Invalid or missing date for "${slug}" (${lang}): "${data.date}", fallback to file mtime: ${fallbackDate}`)
          return fallbackDate
        }
      })()

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date,
        tags: data.tags || [],
        excerpt,
        // On initialise translations vide (on remplira après)
        translations: {},
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  console.log(`→ Parsed ${articles.length} article(s) for lang "${lang}".`)

  index[lang] = articles
})

// Deuxième passe → on injecte translations
console.log('🔄 Adding translations...')

Object.entries(index).forEach(([lang, articles]) => {
  articles.forEach((article) => {
    const slug = article.slug
    article.translations = slugToLangs[slug] || {}
  })
})

fs.writeFileSync(outputPath, JSON.stringify(index, null, 2))
console.log('✅ index.json generated at public/news/index.json')
