import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SeoHead from '@/components/SeoHead'
import { PageTitle } from '@/components/PageTitle'
import { ShareButtons } from '@/components/ShareButtons'
import index from '@/public/news/index.json'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: string }
}): Promise<Metadata> {
  const lang = params.lang || 'en'
  const slug = params.slug
  const fallbackLang = 'en'

  async function tryRead(filePath: string) {
    try {
      return await fs.readFile(filePath, 'utf-8')
    } catch {
      return null
    }
  }

  const mdPath = path.join(process.cwd(), 'public/news', lang, `${slug}.md`)
  let content = await tryRead(mdPath)

  if (!content && lang !== fallbackLang) {
    const fallbackPath = path.join(
      process.cwd(),
      'public/news',
      fallbackLang,
      `${slug}.md`
    )
    content = await tryRead(fallbackPath)
  }

  if (!content) notFound()

  const { data: front } = matter(content)

  const now = new Date()
  const pubDate = front.date ? new Date(front.date) : null
  if (pubDate && pubDate > now) notFound()

  return {
    title: front.title || `${slug} — News from wellknownmcp.org`,
    description:
      front.description ||
      `Explore this update about the Model Context Protocol: ${slug}`,
    keywords:
      front.keywords ||
      'MCP, news, update, llmfeed, agentic web, trust, protocol, certification',
    openGraph: {
      images: [front.image || `/og/news/${lang}/default.png`],
    },
  }
}

export default async function NewsPost({
  params,
}: {
  params: { lang: string; slug: string }
}) {
  const lang = params.lang || 'en'
  const slug = params.slug
  const fallbackLang = 'en'

  async function tryRead(filePath: string) {
    try {
      return await fs.readFile(filePath, 'utf-8')
    } catch {
      return null
    }
  }

  const mdPath = path.join(process.cwd(), 'public/news', lang, `${slug}.md`)
  let content = await tryRead(mdPath)

  if (!content && lang !== fallbackLang) {
    const fallbackPath = path.join(
      process.cwd(),
      'public/news',
      fallbackLang,
      `${slug}.md`
    )
    content = await tryRead(fallbackPath)
  }

  if (!content) notFound()

  const { content: markdown, data: front } = matter(content)

  const articles = index[lang].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const currentIndex = articles.findIndex((a) => a.slug === slug)

  const prev =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null
  const next = currentIndex > 0 ? articles[currentIndex - 1] : null

  const now = new Date()
  const pubDate = front.date ? new Date(front.date) : null
  if (pubDate && pubDate > now) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <SeoHead
        title={front.title || slug}
        description={
          front.description ||
          'Latest update on the Model Context Protocol and Agentic Web.'
        }
        canonicalUrl={`https://wellknownmcp.org/${lang}/news/${slug}`}
        ogImage={front.image || `/og/news/${lang}/default.png`}
        llmIntent={front.llmIntent || 'browse-news-article'}
        llmTopic={front.llmTopic || 'news'}
        llmIndexUrl={front.llmIndexUrl}
        llmlang={front.llmlang || lang}
        keywords={
          front.keywords || [
            'MCP',
            'agentic web',
            'protocol',
            'trust',
            'news',
            'llmfeed',
          ]
        }
      />

      <PageTitle
        title={front.title || slug.replace(/[-_]/g, ' ')}
        subtitle="An update from the protocol ecosystem"
      />
      <ShareButtons />

      {/* Previous / Next with shortened titles */}
      <div className="flex justify-between mt-8 text-sm text-blue-600 dark:text-blue-400">
        {prev && (
          <Link href={`/${lang}/news/${prev.slug}`}>
            ← Previous:{' '}
            {prev.title.length > 20
              ? `${prev.title.slice(0, 20)}…`
              : prev.title}
          </Link>
        )}
        {next && (
          <Link href={`/${lang}/news/${next.slug}`}>
            Next →:{' '}
            {next.title.length > 20
              ? `${next.title.slice(0, 20)}…`
              : next.title}
          </Link>
        )}
      </div>

      {front.image && (
        <img
          src={front.image}
          alt=""
          className="w-full rounded-lg shadow-md mb-6 max-h-64 object-cover"
        />
      )}

      <div
        className="prose dark:prose-invert"
        dir={front.dir === 'rtl' ? 'rtl' : 'ltr'}
        lang={front.lang || lang}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </div>
    </div>
  )
}
