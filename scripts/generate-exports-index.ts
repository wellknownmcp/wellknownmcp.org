import fs from 'fs'
import path from 'path'

const excludedFolders = ['spec', 'internal', 'private']

function collectFeeds(folder: string, base = ''): any[] {
  const entries = fs.readdirSync(folder).map((name) => {
    const fullPath = path.join(folder, name)
    const relPath = path.join(base, name)
    const stats = fs.statSync(fullPath)

    if (stats.isDirectory() && excludedFolders.includes(name)) {
      return []
    }

    if (stats.isDirectory()) {
      return collectFeeds(fullPath, relPath)
    }

    if (name.endsWith('.llmfeed.json')) {
      let signed = false
      let certified = false
      let feedType = 'unknown'
      const size = (stats.size / 1024).toFixed(1)
      let title = ''
      let description = ''
      const mechanical_tags: string[] = []

      try {
        const content = fs.readFileSync(fullPath, 'utf-8')
        const json = JSON.parse(content)

        signed = !!json.signature
        certified = !!json.certification && json.certification.level === 'gold'
        feedType = json.feed_type ?? 'unknown'

        title =
          json.metadata?.title ??
          relPath.split('/').pop()?.replace('.llmfeed.json', '') ??
          ''
        description = json.metadata?.description ?? ''

        mechanical_tags.push(feedType)
        if (signed) mechanical_tags.push('signed')
        else mechanical_tags.push('unsigned')
        if (certified) mechanical_tags.push('certified')

        const enriched_tags = json.enriched_tags ?? []

        // ✅ CORRECTION: Générer le slug
        const slug = relPath
          .replace(/\\/g, '/')
          .replace('.llmfeed.json', '')
          .replace(/^\/+/, '')

        return [
          {
            path: relPath.replace(/\\/g, '/'),
            slug,                              // ✅ AJOUTÉ
            feed_type: feedType,
            signed,
            certified,
            size,
            title,
            description,
            mechanical_tags,
            enriched_tags,
          },
        ]
      } catch (err) {
        console.error(`❌ Invalid JSON in ${relPath}:`, err.message)
        return [] // skip this file
      }
    }

    return []
  })

  return entries.flat()
}

function main() {
  console.log('\n📦 Generating exports index (Hub Ready)...')
  const folderPath = path.resolve('./public/exports')
  const feeds = collectFeeds(folderPath)

  const indexPath = path.join(folderPath, 'index.json')
  fs.writeFileSync(indexPath, JSON.stringify(feeds, null, 2), 'utf-8')

  console.log(
    `✅ Generated ${feeds.length} entries in /public/exports/index.json`
  )

  // ✅ BONUS: Debug pour vérifier les slugs
  const invalidSlugs = feeds.filter(f => !f.slug || f.slug === 'undefined')
  if (invalidSlugs.length > 0) {
    console.warn(`⚠️ Found ${invalidSlugs.length} entries with invalid slugs`)
    invalidSlugs.forEach(f => console.warn(`  - ${f.path} -> slug: "${f.slug}"`))
  } else {
    console.log(`✅ All ${feeds.length} entries have valid slugs`)
  }
}

main()