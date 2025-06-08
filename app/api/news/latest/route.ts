// app/api/news/latest/route.ts
import { NextResponse } from 'next/server'
import index from '@/public/news/index.json'

export async function GET() {
  const lang = 'en' // pour l'instant : anglais

  const news = index[lang] || []

  const latest = [...news]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((item) => ({
      lang,
      slug: item.slug,
      title: item.title,
      date: item.date,
      description: item.description || '',
      excerpt: item.excerpt || '',
      href: item.translations?.[lang] || `/en/news/${item.slug}`,
    }))

  return NextResponse.json(latest)
}
