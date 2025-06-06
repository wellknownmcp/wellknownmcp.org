import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const TAG_ALIASES: Record<string, string> = {
  'Agentic Web': 'agentic-web',
  'agentic web': 'agentic-web',
  Claude: 'claude',
  'GPT-4o': 'gpt-4o',
  LLMs: 'llm',
  LLM: 'llm',
  'AI agents': 'ai-agents',
  'ai agents': 'ai-agents',
  'trusted agents': 'trust',
  'trusted web': 'trust',
  'why sign': 'signature',
  'why certify': 'certification',
  'agent interoperability': 'interoperability',
  'agent guidance': 'guidance',
  'agent behavior': 'behavior',
}

function normalizeTag(tag: string): string {
  return TAG_ALIASES[tag.trim()] || tag.trim().toLowerCase()
}

const tagCountsGlobal: Record<string, number> = {}
const tagCountsPerLang: Record<string, Record<string, number>> = {}

const basePath = path.join(process.cwd(), 'public', 'news')
const langs = fs
  .readdirSync(basePath)
  .filter((f) => fs.statSync(path.join(basePath, f)).isDirectory())

langs.forEach((lang) => {
  console.log(`\n🌐 Scanning language: ${lang}`)
  const langPath = path.join(basePath, lang)
  const files = fs.readdirSync(langPath).filter((f) => f.endsWith('.md'))

  tagCountsPerLang[lang] = {}

  files.forEach((file) => {
    const fullPath = path.join(langPath, file)
    const raw = fs.readFileSync(fullPath, 'utf8')
    const parsed = matter(raw)

    const oldTags = parsed.data.tags || []
    const newTags = Array.from(new Set(oldTags.map(normalizeTag))).sort()

    // update counts
    newTags.forEach((tag: string) => {
      tagCountsGlobal[tag] = (tagCountsGlobal[tag] || 0) + 1
      tagCountsPerLang[lang][tag] = (tagCountsPerLang[lang][tag] || 0) + 1
    })

    // if normalization changed tags → update the file
    if (JSON.stringify(oldTags) !== JSON.stringify(newTags)) {
      console.log(`📝 Updating tags in ${lang}/${file} → ${newTags.join(', ')}`)

      parsed.data.tags = newTags
      const newContent = matter.stringify(parsed.content, parsed.data)
      fs.writeFileSync(fullPath, newContent, 'utf8')
    }
  })
})

// Final global report
console.log('\n--- GLOBAL TAG USAGE REPORT ---\n')
const sortedTagsGlobal = Object.entries(tagCountsGlobal).sort(
  (a, b) => b[1] - a[1]
)
sortedTagsGlobal.forEach(([tag, count]) => {
  console.log(`${tag.padEnd(30)} → ${count}`)
})

// Prepare full report object
const reportObject = {
  global: sortedTagsGlobal.map(([tag, count]) => ({ tag, count })),
  perLang: {},
}

for (const lang of langs) {
  const sortedPerLang = Object.entries(tagCountsPerLang[lang])
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }))

  reportObject.perLang[lang] = sortedPerLang
}

// Save report
const reportPath = path.join(
  process.cwd(),
  'public',
  'news',
  'tags-report.json'
)
fs.writeFileSync(reportPath, JSON.stringify(reportObject, null, 2), 'utf8')
console.log(
  `\n✅ tags-report.json generated at /public/news/tags-report.json\n`
)

console.log('🎉 Tag normalization and analysis complete.\n')
