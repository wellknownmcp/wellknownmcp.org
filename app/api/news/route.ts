// app/api/news/latest/route.ts
import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  const basePath = path.join(process.cwd(), 'public', 'news')
  const newsFiles = fs.readdirSync(basePath).filter((f) => f.endsWith('.md'))

  const newsItems = newsFiles.map((file) => {
    const fullPath = path.join(basePath, file)
    const content = fs.readFileSync(fullPath, 'utf8')
    const metaMatch = content.match(/^---[\s\S]*?---/)
    let title = 'Untitled'
    let date = '1970-01-01'
    if (metaMatch) {
      const meta = metaMatch[0]
      const titleMatch = meta.match(/title:\s*(.*)/)
      const dateMatch = meta.match(/date:\s*(.*)/)
      if (titleMatch) title = titleMatch[1].trim().replace(/^['"]|['"]$/g, '')
      if (dateMatch) date = dateMatch[1].trim().replace(/^['"]|['"]$/g, '')
    }
    return {
      title,
      date,
      href: '/en/news/' + file.replace(/\.md$/, ''),
    }
  })

  const sorted = newsItems
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
  return NextResponse.json(sorted)
}
