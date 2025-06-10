// page.tsx - Amélioration simple qui utilise mieux le frontmatter
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { redirect, notFound } from 'next/navigation'
import SeoHead from '@/components/SeoHead'
import SpecPageClient from '@/components/spec/SpecPageClient'

// 🎯 Fonction simple pour mapper frontmatter → SeoHead
function getFrontmatterSeoProps(front: any, canonicalUrl: string, fallbackTitle: string) {
  // 🛡️ Protection contre frontmatter vide/null
  const safeFront = front || {}
  
  return {
    // Props de base (inchangés)
    title: safeFront.title || fallbackTitle,
    description: safeFront.description,
    ogImage: safeFront.image || 'https://wellknownmcp.org/og/spec.png',
    canonicalUrl,
    keywords: safeFront.tags,

    // 🚀 Ajouts intelligents basés sur le frontmatter
    llmIntent: safeFront.llmIntent || 'browse-spec',
    llmTopic: safeFront.llmTopic || 'spec',
    llmlang: safeFront.lang || 'en',
    
    // Si le frontmatter a des champs avancés, on les utilise
    ...(safeFront.audience && { llmAudience: safeFront.audience }),
    ...(safeFront.capabilities && { llmCapabilities: safeFront.capabilities }),
    ...(safeFront.trustLevel && { llmTrustLevel: safeFront.trustLevel }),
    ...(safeFront.feedTypes && { llmFeedTypes: safeFront.feedTypes }),
    ...(safeFront.llmBehaviorHints && { llmBehaviorHints: safeFront.llmBehaviorHints }),
    ...(safeFront.riskLevel && { llmRiskLevel: safeFront.riskLevel }),
    ...(safeFront.contentType && { llmContentType: safeFront.contentType }),
    ...(safeFront.updateFrequency && { llmUpdateFrequency: safeFront.updateFrequency }),
    ...(safeFront.mcpFeedUrl && { mcpFeedUrl: safeFront.mcpFeedUrl }),
    ...(safeFront.pageType && { pageType: safeFront.pageType }),
    ...(safeFront.interactionComplexity && { interactionComplexity: safeFront.interactionComplexity }),
    
    // Defaults intelligents
    autoDiscoverFeeds: safeFront.autoDiscoverFeeds !== false,
    agentReadiness: safeFront.agentReadiness !== false,
  }
}

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

  // 🛡️ Protection contre l'absence de frontmatter
  const safeFront = front || {}

  // 🎯 Construction intelligente de l'URL canonique
  const canonicalUrl = safeFront.canonical_url || `https://wellknownmcp.org/spec/${cleanSlug}`
  
  // 🚀 Mapping du frontmatter vers SeoHead (garde votre logique titre existante)
  const titleParts = cleanSlug
    .split('/')
    .map((part) => part.replace(/[_\-]/g, ' '))
  const pageTitle = safeFront.title || `Spec: ${titleParts.join(' / ')}`
  
  const seoProps = getFrontmatterSeoProps(safeFront, canonicalUrl, pageTitle)

  return (
    <>
      <SeoHead {...seoProps} />
      
      {/* ✅ Votre SpecPageClient existant - pas de changement */}
      <SpecPageClient
        slug={cleanSlug}
        content={content}
        front={safeFront}
      />
    </>
  )
}