import { test, expect } from '@playwright/test'

test('All internal links on each page should be valid', async ({
  page,
  baseURL,
}) => {
  const startUrls = [
    '/',
    '/spec',
    '/feeds',
    '/join',
    '/tools',
    '/llmfeedhub',
    // ajoute ici d'autres pages de ton site à vérifier
  ]

  const brokenLinks: string[] = []

  for (const path of startUrls) {
    const fullUrl = `${baseURL}${path}`
    await page.goto(fullUrl)

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
