// check-all-pages-links.spec.ts
import { test, expect } from '@playwright/test'

test('All internal links across entire app tree should be valid', async ({
  page,
  baseURL,
}) => {
  
  // 🌍 LANGUES SUPPORTÉES (selon ton app structure)
  const languages = ['en', 'fr', 'es', 'hi', 'zh', 'ar', 'uk']
  
  // 📄 PAGES STATIQUES (basées sur ton app/ tree)
  const staticPages = [
    '/',                    // Homepage
    '/about',
    '/download', 
    '/ecosystem',
    '/faq',
    '/feeds', 
    '/join',
    '/legal',
    '/sdk',
    '/spec',
    '/verify',
    '/why-sign',
    
    // 🛠️ TOOLS (toutes les sous-pages)
    '/tools',
    '/tools/agent-behavior',
    '/tools/api-explained', 
    '/tools/app-mobile-explained',
    '/tools/badges',
    '/tools/export-button',
    '/tools/feed-flagging',
    '/tools/pricing',
    '/tools/prompt',
    '/tools/prompts-explained',
    '/tools/schema',
    '/tools/session-export',
    '/tools/session-feed', 
    '/tools/sign-and-verify',
    '/tools/user-spaces',
    '/tools/well-known',
    
    // 🧠 LLMFEEDHUB
    '/llmfeedhub',
    '/llmfeedhub/preview',
  ]
  
  // 📰 PAGES NEWS (multi-langues)
  const newsPages = languages.map(lang => `/${lang}/news`)
  
  // 🌍 PAGES TRADUITES (about, faq per language)
  const translatedPages = languages.flatMap(lang => [
    `/${lang}/about`,
    `/${lang}/faq`,
  ])
  
  // 🎯 TOUTES LES PAGES À TESTER
  const allPages = [
    ...staticPages,
    ...newsPages, 
    ...translatedPages
  ]
  
  console.log(`🔍 Testing ${allPages.length} pages for broken links...`)
  
  const brokenLinks: string[] = []
  const pageErrors: string[] = []
  
  for (const path of allPages) {
    const fullUrl = `${baseURL}${path}`
    
    try {
      console.log(`📄 Checking page: ${path}`)
      await page.goto(fullUrl, { timeout: 10000 })
      
      // Attendre que la page soit entièrement chargée
      await page.waitForLoadState('networkidle')
      
    } catch (err: any) {
      pageErrors.push(`❌ Failed to load page ${path} — ${err.message}`)
      continue
    }

    try {
      // 🔗 Extraire tous les liens internes
      const links = await page.$$eval('a[href^="/"]', (anchors) =>
        anchors.map((a) => a.getAttribute('href'))
      )

      const uniqueLinks = [
        ...new Set(links.filter((href) => 
          href && 
          !href.startsWith('/#') &&           // Ignorer les ancres
          !href.includes('/api/') &&          // Ignorer les routes API
          !href.match(/\.(json|xml|txt)$/)    // Ignorer les fichiers
        )),
      ]

      console.log(`  └─ Found ${uniqueLinks.length} internal links`)

      // 🧪 Tester chaque lien trouvé
      for (const href of uniqueLinks) {
        const target = `${baseURL}${href}`
        try {
          const response = await page.request.get(target)
          const status = response.status()
          
          if (status !== 200) {
            brokenLinks.push(`❌ ${href} → status ${status} (found on ${path})`)
          }
        } catch (err: any) {
          brokenLinks.push(`❌ ${href} → error: ${err.message} (found on ${path})`)
        }
      }
      
    } catch (err: any) {
      pageErrors.push(`❌ Failed to extract links from ${path} — ${err.message}`)
    }
  }

  // 📊 RAPPORT FINAL
  console.log(`\n📊 LINK CHECK SUMMARY:`)
  console.log(`✅ Pages tested: ${allPages.length}`) 
  console.log(`❌ Page errors: ${pageErrors.length}`)
  console.log(`❌ Broken links: ${brokenLinks.length}`)
  
  if (pageErrors.length > 0) {
    console.log(`\n🚨 PAGE ERRORS:\n${pageErrors.join('\n')}`)
  }
  
  if (brokenLinks.length > 0) {
    console.log(`\n🔗 BROKEN LINKS:\n${brokenLinks.join('\n')}`)
  }

  // ✅ ASSERTIONS
  expect(
    pageErrors.length,
    `Pages that failed to load:\n${pageErrors.join('\n')}`
  ).toBe(0)
  
  expect(
    brokenLinks.length,
    `Broken internal links found:\n${brokenLinks.join('\n')}`
  ).toBe(0)
})

// 🎯 TEST BONUS: Dynamic Routes Discovery
test('Discover and test dynamic routes', async ({ page, baseURL }) => {
  const dynamicRoutes: string[] = []
  const brokenDynamicLinks: string[] = []
  
  // 📰 Découvrir les articles de news depuis les pages index
  const newsIndexPages = ['/en/news', '/fr/news']
  
  for (const newsIndex of newsIndexPages) {
    try {
      await page.goto(`${baseURL}${newsIndex}`)
      await page.waitForLoadState('networkidle')
      
      // Extraire les liens vers les articles
      const articleLinks = await page.$$eval('a[href*="/news/"]', (anchors) =>
        anchors.map((a) => a.getAttribute('href'))
      )
      
      const uniqueArticles = [...new Set(articleLinks.filter(href => 
        href && href.includes('/news/') && !href.endsWith('/news')
      ))]
      
      dynamicRoutes.push(...uniqueArticles)
      
    } catch (err) {
      console.log(`⚠️ Could not discover routes from ${newsIndex}`)
    }
  }
  
  // 🧪 Tester un échantillon des routes dynamiques découvertes
  const sampleRoutes = [...new Set(dynamicRoutes)].slice(0, 10) // Limit to 10
  
  for (const route of sampleRoutes) {
    try {
      const response = await page.request.get(`${baseURL}${route}`)
      if (response.status() !== 200) {
        brokenDynamicLinks.push(`${route} → status ${response.status()}`)
      }
    } catch (err: any) {
      brokenDynamicLinks.push(`${route} → error: ${err.message}`)
    }
  }
  
  console.log(`🔍 Tested ${sampleRoutes.length} dynamic routes`)
  
  expect(
    brokenDynamicLinks.length,
    `Broken dynamic routes:\n${brokenDynamicLinks.join('\n')}`
  ).toBe(0)
})