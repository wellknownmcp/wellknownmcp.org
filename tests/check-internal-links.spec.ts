import { test, expect } from '@playwright/test'

test('All internal links on each page should be valid', async ({
  page,
  baseURL,
}) => {
  const startUrls = [
    '/',
    '/spec/01_llmfeed/llmfeed',
    '/feeds',
    '/join',
    '/tools',
    '/llmfeedhub',
    // Ajoute ici d'autres pages à auditer
  ]

  const brokenLinks: string[] = []

  for (const path of startUrls) {
    const fullUrl = `${baseURL}${path}`

    try {
      await page.goto(fullUrl)
    } catch (err: any) {
      brokenLinks.push(`Failed to load page ${path} — ${err.message}`)
      continue
    }

    const links = await page.$$eval('a[href^="/"]', (anchors) =>
      anchors.map((a) => a.getAttribute('href'))
    )

    const uniqueLinks = [
      ...new Set(links.filter((href) => href && !href.startsWith('/#'))),
    ]

    for (const href of uniqueLinks) {
      const target = `${baseURL}${href}`
      try {
        const response = await page.request.get(target)
        const status = response.status()
        if (status !== 200) {
          brokenLinks.push(`${href} (status ${status}) on page ${path}`)
        }
      } catch (err: any) {
        brokenLinks.push(`${href} (error: ${err.message}) on page ${path}`)
      }
    }
  }

  expect(
    brokenLinks.length,
    `Broken internal links:\n${brokenLinks.join('\n')}`
  ).toBe(0)
})
