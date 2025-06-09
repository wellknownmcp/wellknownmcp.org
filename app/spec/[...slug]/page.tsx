import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { redirect, notFound } from 'next/navigation'
import SeoHead from '@/components/SeoHead'
import SpecPageClient from '@/components/spec/SpecPageClient' // ⬅️ Import du wrapper

export default function SpecPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join('/') ?? ''
  const cleanSlug = slug.replace(/\.md$/, '')

  if (!cleanSlug) {
    redirect('/spec/01_llmfeed/llmfeed')
  }

  const mdPath = path.join(
    process.cwd(),
    'public',
    'exports',
    'spec',
    `${cleanSlug}.md`
  )

  if (!fs.existsSync(mdPath)) {
    notFound()
  }

  const mdContent = fs.readFileSync(mdPath, 'utf-8')
  const { content, data: front } = matter(mdContent)

  const canonicalUrl = `https://wellknownmcp.org/spec/${cleanSlug}`
  const titleParts = cleanSlug
    .split('/')
    .map((part) => part.replace(/[_\-]/g, ' '))
  const pageTitle = front.title || `Spec: ${titleParts.join(' / ')}`

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={
          front.description ||
          `Detailed specification page for ${pageTitle} in the MCP documentation.`
        }
        canonicalUrl={canonicalUrl}
        ogImage="https://wellknownmcp.org/og/spec.png"
        llmIntent="browse-spec"
        llmTopic="spec"
        llmlang="en"
        keywords={
          front.keywords || [
            'specification',
            'mcp',
            'llmfeed',
            'agentic web',
            'standard',
          ]
        }
      />
      {/* ✅ CORRIGÉ : Server Component utilise Client Component wrapper */}
      <SpecPageClient
        slug={cleanSlug}
        content={content}
        front={front}
      />
    </>
  )
}