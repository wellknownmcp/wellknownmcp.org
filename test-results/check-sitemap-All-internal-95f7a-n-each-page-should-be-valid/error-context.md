# Test info

- Name: All internal links on each page should be valid
- Location: C:\Users\Santoline\wellknownmcp\wellknownmcp.org\tests\check-sitemap.spec.ts:3:5

# Error details

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3000/spec", waiting until "load"

    at C:\Users\Santoline\wellknownmcp\wellknownmcp.org\tests\check-sitemap.spec.ts:21:16
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test'
   2 |
   3 | test('All internal links on each page should be valid', async ({
   4 |   page,
   5 |   baseURL,
   6 | }) => {
   7 |   const startUrls = [
   8 |     '/',
   9 |     '/spec',
  10 |     '/feeds',
  11 |     '/join',
  12 |     '/tools',
  13 |     '/llmfeedhub',
  14 |     // ajoute ici d'autres pages de ton site à vérifier
  15 |   ]
  16 |
  17 |   const brokenLinks: string[] = []
  18 |
  19 |   for (const path of startUrls) {
  20 |     const fullUrl = `${baseURL}${path}`
> 21 |     await page.goto(fullUrl)
     |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  22 |
  23 |     const links = await page.$$eval('a[href^="/"]', (anchors) =>
  24 |       anchors.map((a) => a.getAttribute('href'))
  25 |     )
  26 |
  27 |     const uniqueLinks = [
  28 |       ...new Set(links.filter((href) => href && !href.startsWith('/#'))),
  29 |     ]
  30 |
  31 |     for (const href of uniqueLinks) {
  32 |       const target = `${baseURL}${href}`
  33 |       try {
  34 |         const response = await page.request.get(target)
  35 |         const status = response.status()
  36 |         if (status !== 200) {
  37 |           brokenLinks.push(`${href} (status ${status}) on page ${path}`)
  38 |         }
  39 |       } catch (err: any) {
  40 |         brokenLinks.push(`${href} (error: ${err.message}) on page ${path}`)
  41 |       }
  42 |     }
  43 |   }
  44 |
  45 |   expect(
  46 |     brokenLinks.length,
  47 |     `Broken internal links:\n${brokenLinks.join('\n')}`
  48 |   ).toBe(0)
  49 | })
  50 |
```