// fix-sitemap.js - Script pour corriger les hreflang dans le sitemap généré

const fs = require('fs')
const path = require('path')

console.log('🔧 Starting sitemap hreflang fix...')

// Lire l'index des news pour reconstituer les traductions
const newsIndexPath = path.resolve(__dirname, 'public/news/index.json')
const newsIndex = JSON.parse(fs.readFileSync(newsIndexPath, 'utf-8'))

// Créer un map des traductions réelles
const realTranslations = new Map()

Object.entries(newsIndex).forEach(([lang, articles]) => {
  if (lang !== '_meta' && Array.isArray(articles)) {
    articles.forEach(article => {
      if (!realTranslations.has(article.slug)) {
        realTranslations.set(article.slug, new Set())
      }
      realTranslations.get(article.slug).add(lang)
    })
  }
})

console.log(`📊 Found ${realTranslations.size} articles with translations`)

// Lire le sitemap généré
const sitemapPath = path.resolve(__dirname, 'public/sitemap-0.xml')
let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8')

console.log('📝 Original sitemap loaded')


// Fonction pour corriger les hreflang d'un article
function fixHreflangForArticle(slug, currentLang) {
  const availableLangs = realTranslations.get(slug)
  if (!availableLangs || availableLangs.size <= 1) {
    return '' // Pas de traductions
  }

  const hreflangTags = []
  
  // Générer les bonnes URLs
  for (const lang of availableLangs) {
    hreflangTags.push(`<xhtml:link rel="alternate" hreflang="${lang}" href="https://wellknownmcp.org/${lang}/news/${slug}"/>`)
  }

  // Ajouter x-default si anglais disponible
  if (availableLangs.has('en')) {
    hreflangTags.push(`<xhtml:link rel="alternate" hreflang="x-default" href="https://wellknownmcp.org/en/news/${slug}"/>`)
  }

  return hreflangTags.join('')
}

// NOUVELLE REGEX basée sur le vrai format
// Pattern: tout ce qui est entre <url> et </url> pour les articles news
const urlBlockPattern = /<url><loc>https:\/\/wellknownmcp\.org\/(en|fr|es|hi|zh|ar|uk)\/news\/([^<]+)<\/loc>(.*?)<\/url>/gs

let fixedCount = 0

sitemapContent = sitemapContent.replace(urlBlockPattern, (fullMatch, lang, slug, contentBetween) => {
  
  console.log(`🔍 Processing /${lang}/news/${slug}`)
  
  // Extraire les parties sans les xhtml:link existants
  const withoutHreflang = contentBetween.replace(/<xhtml:link[^>]*\/>/g, '')
  
  // Générer les bons hreflang pour cet article
  const correctHreflang = fixHreflangForArticle(slug, lang)
  
  if (correctHreflang) {
    fixedCount++
   // console.log(`✅ Fixed hreflang for /${lang}/news/${slug}`)
    
    return `<url><loc>https://wellknownmcp.org/${lang}/news/${slug}</loc>${withoutHreflang}${correctHreflang}</url>`
  } else {
    // Pas de traductions, garder sans hreflang
    return `<url><loc>https://wellknownmcp.org/${lang}/news/${slug}</loc>${withoutHreflang}</url>`
  }
})

// Sauvegarder le sitemap corrigé
fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8')

console.log(`✅ Sitemap fixed! Corrected ${fixedCount} articles with proper hreflang`)
console.log(`📁 Updated: ${sitemapPath}`)

// Vérification finale
const finalMatch = sitemapContent.match(/claude-mcp-agentic-web.*?<\/url>/s)
if (finalMatch) {
  console.log('\n🎯 FINAL result for claude-mcp-agentic-web:')
  console.log(finalMatch[0])
}