'use client'

import { useEffect, useState } from 'react'
import matter from 'gray-matter'
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { TagFilterBar } from '@/components/TagFilterBar'
import { LanguageSelector } from '@/components/LanguageSelector'
import SeoHead from '@/components/SeoHead'

interface ArticleMeta {
  lang: string
  slug: string
  title: string
  description: string
  tags: string[]
  date: string
  excerpt?: string
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

export default function NewsPage() {
  const [articles, setArticles] = useState<ArticleMeta[]>([])
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const activeTag = searchParams.get('tag')
  const currentLang = pathname.split('/')[1] || 'en'

  useEffect(() => {
    async function loadNews() {
      const indexRes = await fetch('/news/index.json')
      const allSlugs = await indexRes.json()
      const slugs: string[] = allSlugs[currentLang] || []
      const results: ArticleMeta[] = []

      for (const slug of slugs) {
        try {
          const res = await fetch(`/news/${currentLang}/${slug}.md`) // ⚠️ à revoir
          if (!res.ok) continue
          const text = await res.text()
          const { data, content } = matter(text)

          // Générer un excerpt simple :
          const cleanContent = content.replace(/[#>*_`~\-!\[\]\(\)]/g, '') // remove markdown
          const excerpt = cleanContent
            .split('\n')
            .filter(Boolean)
            .slice(0, 2)
            .join(' ')
            .slice(0, 200)

          results.push({
            lang: currentLang,
            slug,
            title: data.title || slug,
            description: data.description || '',
            tags: data.tags || [],
            date:
              typeof data.date === 'string'
                ? data.date
                : data.date?.toString() ?? 'unknown',
            excerpt,
          })
        } catch {
          continue
        }
      }

      results.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      setArticles(results)
    }
    loadNews()
  }, [currentLang])

  const filtered = activeTag
    ? articles.filter((a) => a.tags.includes(activeTag))
    : articles
  const allTags = Array.from(new Set(articles.flatMap((a) => a.tags))).sort()

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <SeoHead
        title="News — WellKnownMCP"
        description="Read the latest news and articles related to MCP, feeds, and trusted infrastructure."
        canonicalUrl={`https://wellknownmcp.org/${currentLang}/news`}
        ogImage="/og/news.png"
        llmIntent="browse-news"
        llmTopic="news"
        llmlang={currentLang}
        keywords={['news', 'articles', 'mcp', 'llmfeed']}
      />

      <h1 className="text-3xl font-bold text-center mb-6">📰 All News</h1>
      <div className="flex justify-between items-center mb-6">
        <TagFilterBar
          tags={allTags}
          activeTag={activeTag}
          basePath={`/${currentLang}/news`}
        />
        <LanguageSelector />
      </div>
      <div className="space-y-6">
        {filtered.map((article) => (
          <div
            key={`${article.lang}-${article.slug}`}
            className="p-4 border dark:border-gray-700 rounded shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-1">{article.title}</h3>
            <p className="text-xs text-gray-500 mb-2">
              {article.date} —{' '}
              {LANG_EMOJIS[article.lang] || article.lang.toUpperCase()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {article.description}
            </p>
            {article.excerpt && (
              <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
                {article.excerpt}...
              </p>
            )}
            <Link
              href={`/${article.lang}/news/${article.slug}`}
              className="text-sm text-black dark:text-white hover:underline font-medium"
            >
              Read full →
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
