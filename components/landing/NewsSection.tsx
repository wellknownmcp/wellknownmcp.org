'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface NewsItem {
  lang: string
  slug: string
  title: string
  date: string
  description: string
  excerpt?: string
  href: string
}

const LANG_EMOJIS: Record<string, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  es: '🇪🇸',
  ar: '🇸🇦',
  hi: '🇮🇳',
  uk: '🇺🇦',
  zh: '🇨🇳',
}

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    fetch('/api/news/latest')
      .then((res) => res.json())
      .then(setNews)
      .catch(() => setNews([]))
  }, [])

  return (
    <section className="mt-16 max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-3">Latest from the ecosystem</h2>
      <p className="text-sm text-muted-foreground mb-4">
        We publish in multiple languages — and our agents read them all. 🌍 🇫🇷
        🇬🇧 🇪🇸 🇨🇳 🇺🇦 🇮🇳 🇸🇦
      </p>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Standards move fast. Catch up on spec milestones, tooling announcements,
        and community breakthroughs.
      </p>

      <div className="space-y-4 text-left">
        {news.map((n) => (
          <div
            key={n.href}
            className="p-4 border dark:border-gray-700 rounded shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-1">{n.title}</h3>
            <p className="text-xs text-gray-500 mb-1">
              {n.date} — {LANG_EMOJIS[n.lang] || n.lang.toUpperCase()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {n.description}
            </p>
            {n.excerpt && (
              <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
                {n.excerpt}...
              </p>
            )}
            <Link
              href={n.href}
              className="text-sm text-purple-700 hover:underline font-medium"
            >
              Read full →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link
          href="/en/news"
          className="text-sm text-purple-700 hover:underline"
        >
          Browse all news →
        </Link>
      </div>
    </section>
  )
}
