"use client";
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface NewsItem {
  title: string
  date: string
  href: string
}

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    fetch('/api/news/latest')
      .then(res => res.json())
      .then(setNews)
      .catch(() => setNews([]))
  }, [])

  return (
    <section className="mt-16 max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-3">Latest from the ecosystem</h2>
      <p className="text-sm text-muted-foreground mb-4">
        We publish in multiple languages — and our agents read them all. 🌍 🇫🇷 🇬🇧 🇪🇸 🇨🇳 🇺🇦 🇮🇳 🇸🇦
      </p>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Standards move fast. Catch up on spec milestones, tooling announcements, and community breakthroughs.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {news.map((n) => (
          <Link href={n.href} key={n.href} className="border rounded-lg p-4 hover:shadow-md transition text-left block">
            <div className="text-xl mb-1">🗞️</div>
            <div className="font-semibold mb-1">{n.title}</div>
            <p className="text-sm text-muted-foreground">{new Date(n.date).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/en/news" className="text-sm text-purple-700 hover:underline">
          Browse all news →
        </Link>
      </div>
    </section>
  )
}
