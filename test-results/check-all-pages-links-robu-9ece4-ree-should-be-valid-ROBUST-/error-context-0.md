# Test info

- Name: All internal links across entire app tree should be valid (ROBUST)
- Location: C:\Users\Santoline\wellknownmcp\wellknownmcp.org\tests\check-all-pages-links-robust.spec.ts:51:5

# Error details

```
Error: Only 8% of pages loaded successfully. Expected at least 80%.

expect(received).toBeGreaterThan(expected)

Expected: > 0.8
Received:   0.08333333333333333
    at C:\Users\Santoline\wellknownmcp\wellknownmcp.org\tests\check-all-pages-links-robust.spec.ts:196:5
```

# Test source

```ts
   96 |   
   97 |   const brokenLinks: string[] = []
   98 |   const pageErrors: string[] = []
   99 |   let successfulPages = 0
  100 |   
  101 |   // 🛡️ STRATÉGIE ROBUSTE : Test page par page avec gestion d'erreur
  102 |   for (let i = 0; i < allPages.length; i++) {
  103 |     const path = allPages[i]
  104 |     const fullUrl = `${baseURL}${path}`
  105 |     
  106 |     console.log(`📄 [${i+1}/${allPages.length}] Checking: ${path}`)
  107 |     
  108 |     try {
  109 |       // 🚀 Navigation avec retry intégré
  110 |       await page.goto(fullUrl, { 
  111 |         timeout: 30000,
  112 |         waitUntil: 'domcontentloaded' // Plus rapide que 'networkidle'
  113 |       })
  114 |       
  115 |       // ⏱️ Attente réduite mais robuste
  116 |       await page.waitForTimeout(1000) // 1 seconde de grâce
  117 |       
  118 |       successfulPages++
  119 |       
  120 |     } catch (err: any) {
  121 |       pageErrors.push(`❌ Failed to load ${path} — ${err.message}`)
  122 |       console.log(`  ⚠️ Skipping ${path}: ${err.message}`)
  123 |       
  124 |       // 🔄 Si trop d'erreurs consécutives, arrêter
  125 |       if (pageErrors.length > 10) {
  126 |         console.log(`🛑 Too many consecutive errors. Stopping test.`)
  127 |         break
  128 |       }
  129 |       continue
  130 |     }
  131 |
  132 |     try {
  133 |       // 🔗 Extraction des liens avec timeout
  134 |       const links = await page.$$eval('a[href^="/"]', (anchors) =>
  135 |         anchors.map((a) => a.getAttribute('href'))
  136 |       )
  137 |
  138 |       const uniqueLinks = [
  139 |         ...new Set(links.filter((href) => 
  140 |           href && 
  141 |           !href.startsWith('/#') &&
  142 |           !href.includes('/api/') &&
  143 |           !href.match(/\.(json|xml|txt|zip)$/)
  144 |         )),
  145 |       ].slice(0, 20) // Limite à 20 liens par page pour la vitesse
  146 |
  147 |       console.log(`  └─ Found ${uniqueLinks.length} internal links`)
  148 |
  149 |       // 🧪 Test rapide des liens (HEAD requests)
  150 |       for (const href of uniqueLinks) {
  151 |         const target = `${baseURL}${href}`
  152 |         try {
  153 |           const response = await page.request.head(target) // HEAD plus rapide que GET
  154 |           const status = response.status()
  155 |           
  156 |           if (status !== 200) {
  157 |             brokenLinks.push(`❌ ${href} → ${status} (on ${path})`)
  158 |           }
  159 |         } catch (err: any) {
  160 |           brokenLinks.push(`❌ ${href} → error (on ${path})`)
  161 |         }
  162 |       }
  163 |       
  164 |     } catch (err: any) {
  165 |       console.log(`  ⚠️ Could not extract links from ${path}`)
  166 |     }
  167 |     
  168 |     // 🎯 Progress feedback
  169 |     if ((i + 1) % 5 === 0) {
  170 |       console.log(`✅ Progress: ${i + 1}/${allPages.length} pages processed`)
  171 |     }
  172 |   }
  173 |
  174 |   // 📊 RAPPORT FINAL
  175 |   console.log(`\n📊 ROBUST LINK CHECK SUMMARY:`)
  176 |   console.log(`✅ Pages successfully tested: ${successfulPages}/${allPages.length}`) 
  177 |   console.log(`❌ Page load errors: ${pageErrors.length}`)
  178 |   console.log(`❌ Broken links found: ${brokenLinks.length}`)
  179 |   
  180 |   if (pageErrors.length > 0) {
  181 |     console.log(`\n🚨 FIRST 5 PAGE ERRORS:`)
  182 |     pageErrors.slice(0, 5).forEach(error => console.log(error))
  183 |   }
  184 |   
  185 |   if (brokenLinks.length > 0) {
  186 |     console.log(`\n🔗 FIRST 5 BROKEN LINKS:`)
  187 |     brokenLinks.slice(0, 5).forEach(link => console.log(link))
  188 |   }
  189 |
  190 |   // ✅ ASSERTIONS ADAPTABLES
  191 |   // Au lieu de fail hard, on vérifie qu'au moins 80% des pages sont OK
  192 |   const successRate = successfulPages / allPages.length
  193 |   expect(
  194 |     successRate,
  195 |     `Only ${Math.round(successRate * 100)}% of pages loaded successfully. Expected at least 80%.`
> 196 |   ).toBeGreaterThan(0.8)
      |     ^ Error: Only 8% of pages loaded successfully. Expected at least 80%.
  197 |   
  198 |   // Et on limite les liens cassés à max 5
  199 |   expect(
  200 |     brokenLinks.length,
  201 |     `Too many broken links (${brokenLinks.length}). Max 5 allowed:\n${brokenLinks.slice(0, 10).join('\n')}`
  202 |   ).toBeLessThan(5)
  203 | })
```