import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  const indexPath = path.join(process.cwd(), 'public', 'news', 'index.json')

  if (!fs.existsSync(indexPath)) {
    return NextResponse.json([], { status: 404 })
  }

  const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'))

  // On prend "en" par défaut ici — tu peux le rendre paramétrable plus tard si besoin !
  const currentLang = 'en'
  const entries = indexData[currentLang] || []

  const newsItems = entries.map((entry: any) => {
    return {
      title: entry.title || 'Untitled',
      date: entry.date || '1970-01-01',
      href: `/${currentLang}/news/${entry.slug}`,
    }
  })

  const sorted = newsItems
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return NextResponse.json(sorted)
}
