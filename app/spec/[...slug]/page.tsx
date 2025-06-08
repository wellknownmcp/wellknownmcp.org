import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { redirect, notFound } from 'next/navigation'
import { SpecProvider } from '@/components/spec/SpecContext'
import SpecViewer from '@/components/spec/SpecViewer'
import SeoHead from '@/components/SeoHead'

export default function SpecPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join('/') ?? ''
  const cleanSlug = slug.replace(/\.md$/, '')

  // Redirect root /spec → /spec/01_llmfeed/llmfeed (ou autre page par défaut)
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

  // Titre lisible à partir du slug
  const titleParts = cleanSlug
    .split('/')
    .map((part) => part.replace(/[_\-]/g, ' '))
  const pageTitle = front.title || `Spec: ${titleParts.join(' / ')}`
  console.log('[SpecPage] mdPath:', mdPath)
  console.log('[SpecPage] mdContent type:', typeof mdContent)
  console.log('[SpecPage] mdContent:', mdContent.slice(0, 200))
  console.log('Looking for MD file:', mdPath)
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
      <SpecProvider value={{ slug: cleanSlug, content, front }}>
        <SpecViewer slug={cleanSlug} />
      </SpecProvider>
    </>
  )
}
