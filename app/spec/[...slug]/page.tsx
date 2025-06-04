import { redirect } from 'next/navigation'
import { SpecProvider } from '@/components/spec/SpecContext'
import SpecViewer from '@/components/spec/SpecViewer'
import SeoHead from '@/components/SeoHead'

export default function SpecPage({ params }: { params: { slug?: string[] } }) {
  // 1️⃣ On reconstitue le slug complet
  const slug = params.slug?.join('/') ?? ''

  // 2️⃣ Hack intelligent → on enlève .md si présent
  const cleanSlug = slug.replace(/\.md$/, '')

  // 3️⃣ Redirect root /spec → /spec/llmfeed (ou autre défaut)
  if (!cleanSlug) {
    redirect('/spec/01_llmfeed/llmfeed')
  }

  const canonicalUrl = `https://wellknownmcp.org/spec/${cleanSlug}`

  // On formate un titre lisible à partir du slug
  const titleParts = cleanSlug.split('/').map(part => part.replace(/[_\-]/g, ' '))
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
        keywords={['specification', 'mcp', 'llmfeed', 'agentic web', 'standard']}
      />
      <SpecProvider>
        <SpecViewer slug={cleanSlug} />
      </SpecProvider>
    </>
  )
}
