# Test info

- Name: All internal links on each page should be valid
- Location: C:\Users\Santoline\wellknownmcp\wellknownmcp.org\tests\check-internal-links.spec.ts:3:5

# Error details

```
Error: Broken internal links:
/ (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/spec/01_llmfeed/llmfeed (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/en/news (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/join (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/en/about (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/tools/prompt (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/ecosystem (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/faq (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/spec/llmfeed (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/tools/well-known (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/tools/export-button (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/tools/api-explained (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/tools/pricing (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/tools/session-feed (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/tools/mcp-explained (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/llmfeedhub (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/feeds (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/badges (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/spec (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/verify (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/.well-known/llm-index.llmfeed.json (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/tools/sign-and-verify (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/legal (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/sdk (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/.well-known/capabilities.llmfeed.json (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/.well-known/index.html (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/.well-known/mcp-lite.llmfeed.json (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/.well-known/mcp.llmfeed.json (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
/.well-known/public.pem (error: apiRequestContext.get: Test timeout of 30000ms exceeded.) on page /
Failed to load page /spec/01_llmfeed/llmfeed — page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3000/spec/01_llmfeed/llmfeed", waiting until "load"

Failed to load page /feeds — page.goto: Target page, context or browser has been closed
Failed to load page /join — page.goto: Target page, context or browser has been closed
Failed to load page /tools — page.goto: Target page, context or browser has been closed
Failed to load page /llmfeedhub — page.goto: Target page, context or browser has been closed

expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 34
    at C:\Users\Santoline\wellknownmcp\wellknownmcp.org\tests\check-internal-links.spec.ts:54:5
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
   9 |     '/spec/01_llmfeed/llmfeed',
  10 |     '/feeds',
  11 |     '/join',
  12 |     '/tools',
  13 |     '/llmfeedhub',
  14 |     // Ajoute ici d'autres pages à auditer
  15 |   ]
  16 |
  17 |   const brokenLinks: string[] = []
  18 |
  19 |   for (const path of startUrls) {
  20 |     const fullUrl = `${baseURL}${path}`
  21 |
  22 |     try {
  23 |       await page.goto(fullUrl)
  24 |     } catch (err: any) {
  25 |       brokenLinks.push(`Failed to load page ${path} — ${err.message}`)
  26 |       continue
  27 |     }
  28 |
  29 |     const links = await page.$$eval('a[href^="/"]', (anchors) =>
  30 |       anchors.map((a) => a.getAttribute('href'))
  31 |     )
  32 |
  33 |     const uniqueLinks = [
  34 |       ...new Set(links.filter((href) => href && !href.startsWith('/#'))),
  35 |     ]
  36 |
  37 |     for (const href of uniqueLinks) {
  38 |       const target = `${baseURL}${href}`
  39 |       try {
  40 |         const response = await page.request.get(target)
  41 |         const status = response.status()
  42 |         if (status !== 200) {
  43 |           brokenLinks.push(`${href} (status ${status}) on page ${path}`)
  44 |         }
  45 |       } catch (err: any) {
  46 |         brokenLinks.push(`${href} (error: ${err.message}) on page ${path}`)
  47 |       }
  48 |     }
  49 |   }
  50 |
  51 |   expect(
  52 |     brokenLinks.length,
  53 |     `Broken internal links:\n${brokenLinks.join('\n')}`
> 54 |   ).toBe(0)
     |     ^ Error: Broken internal links:
  55 | })
  56 |
```