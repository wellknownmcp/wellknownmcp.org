// scripts/generate-indexnow.js
const fs = require('fs')
const path = require('path')
const { parseStringPromise } = require('xml2js')

const siteUrl = 'https://wellknownmcp.org'
const key = '33905d1367864dceaddec11db1301110'
const keyLocation = `${siteUrl}/${key}.txt`

async function generateIndexNow() {
  console.log('🔄 Generating indexnow.json...')

  // 1️⃣ Parse sitemap
  const sitemapXml = fs.readFileSync(
    path.join(__dirname, '../public/sitemap-0.xml'),
    'utf8'
  )
  const sitemapParsed = await parseStringPromise(sitemapXml)
  const sitemapUrls = sitemapParsed.urlset.url.map((entry) => entry.loc[0])

  // 2️⃣ Parse exports/index.json
  const exportsIndexPath = path.join(__dirname, '../public/exports/index.json')
  let exportsUrls = []
  if (fs.existsSync(exportsIndexPath)) {
    const exportsIndex = JSON.parse(fs.readFileSync(exportsIndexPath, 'utf8'))
    exportsUrls = exportsIndex.map(
      (entry) => `${siteUrl}/exports/${entry.path}`
    )
  }

  // 3️⃣ Hardcoded .well-known/*.json
  const wellKnownUrls = [
    `${siteUrl}/.well-known/mcp.llmfeed.json`,
    `${siteUrl}/.well-known/llm-index.llmfeed.json`,
    `${siteUrl}/.well-known/mcp-lite.llmfeed.json`,
    `${siteUrl}/.well-known/schema.llmfeed.json`,
    `${siteUrl}/.well-known/public.pem`,
  ]

  // 4️⃣ Merge
  const urlList = Array.from(
    new Set([...sitemapUrls, ...exportsUrls, ...wellKnownUrls])
  ).sort()

  // 5️⃣ Generate indexnow.json
  const indexnow = {
    host: 'wellknownmcp.org',
    key,
    keyLocation,
    urlList,
  }

  fs.writeFileSync(
    path.join(__dirname, '../public/indexnow.json'),
    JSON.stringify(indexnow, null, 2)
  )
  console.log(`✅ indexnow.json generated with ${urlList.length} URLs.`)
}

generateIndexNow().catch((err) => {
  console.error('❌ Error generating indexnow.json:', err)
  process.exit(1)
})
