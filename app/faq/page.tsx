import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import SeoHead from '@/components/SeoHead'
import { PageTitle } from '@/components/PageTitle'
import { ShareButtons } from '@/components/ShareButtons'

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = params.lang || 'en'
  const filePath = path.join(process.cwd(), 'public/news', lang, `faq.md`)
  const fallbackPath = path.join(process.cwd(), 'public/news/en/faq.md')

  let content = await fs
    .readFile(filePath, 'utf-8')
    .catch(() => fs.readFile(fallbackPath, 'utf-8'))
  if (!content) notFound()

  const { data: front } = matter(content)

  return {
    title: front.title || 'FAQ',
    description: front.description || 'FAQ.',
    openGraph: {
      images: [front.image || `/og/faq.png`],
    },
    keywords:
      front.keywords || 'llmfeed, mcp, about, trust, standard, faq,manifesto',
  }
}

export default async function AboutPage({
  params,
}: {
  params: { lang: string }
}) {
  const lang = params.lang || 'en'
  const filePath = path.join(process.cwd(), 'public/news', lang, `faq.md`)
  const fallbackPath = path.join(process.cwd(), 'public/news/en/faq.md')

  let content = await fs
    .readFile(filePath, 'utf-8')
    .catch(() => fs.readFile(fallbackPath, 'utf-8'))
  if (!content) notFound()

  const { content: markdown, data: front } = matter(content)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <SeoHead
        title={front.title || 'Frequently Asked Questions'}
        description={front.description}
        canonicalUrl={`https://wellknownmcp.org/${lang}/faq`}
        ogImage={front.image || `/og/faq.png`}
        llmIntent={front.llmIntent || 'answer questions'}
        llmTopic={front.llmTopic || 'faq'}
        llmlang={lang}
        keywords={front.keywords}
      />

      <PageTitle
        title={front.title || 'FAQ'}
        subtitle="Frequently asked questions"
      />
      <ShareButtons />

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
