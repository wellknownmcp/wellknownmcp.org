'use client'

import { redirect } from 'next/navigation'
import { SpecProvider } from '@/components/spec/SpecContext'
import SpecViewer from '@/components/spec/SpecViewer'
import SeoHead from '@/components/SeoHead'

export default function SpecPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join('/') ?? ''

  // Redirect root /spec → /spec/llmfeed (or any default)
  if (!slug) {
    redirect('/spec/01_llmfeed/llmfeed')
  }

  const canonicalUrl = `https://wellknownmcp.org/spec/${slug}`

  // On formate un titre lisible à partir du slug
  const titleParts = slug.split('/').map((part) => part.replace(/[_\-]/g, ' '))
  const pageTitle = `Spec: ${titleParts.join(' / ')}`

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={`Detailed specification page for ${pageTitle} in the MCP documentation.`}
        canonicalUrl={canonicalUrl}
        ogImage="https://wellknownmcp.org/og/spec.png"
        llmIntent="browse-spec"
        llmTopic="spec"
        llmlang="en"
        keywords={[
          'specification',
          'mcp',
          'llmfeed',
          'agentic web',
          'standard',
        ]}
      />
      <SpecProvider>
        <SpecViewer slug={slug} />
      </SpecProvider>
    </>
  )
}
