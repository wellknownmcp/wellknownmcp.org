// page.tsx - Version corrigée avec gestion d'erreur améliorée
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { redirect, notFound } from 'next/navigation'
import SeoHead from '@/components/SeoHead'
import SpecPageClient from '@/components/spec/SpecPageClient'

// 🎯 Fonction pour mapper frontmatter → SeoHead (TOUTES LES FONCTIONNALITÉS CONSERVÉES)
function getFrontmatterSeoProps(front: any, canonicalUrl: string, fallbackTitle: string) {
  // 🛡️ Protection contre frontmatter vide/null
  const safeFront = front || {}
  
  return {
    // Props de base (inchangés de votre version originale)
    title: safeFront.title || fallbackTitle,
    description: safeFront.description,
    ogImage: safeFront.image || 'https://wellknownmcp.org/og/spec.png',
    canonicalUrl,
    keywords: safeFront.tags,

    // 🚀 Ajouts intelligents basés sur le frontmatter (TOUS CONSERVÉS)
    llmIntent: safeFront.llmIntent || 'browse-spec',
    llmTopic: safeFront.llmTopic || 'spec',
    llmlang: safeFront.lang || 'en',
    
    // Props conditionnels - utilisation de la syntaxe CORRIGÉE (évite l'erreur de spread)
    llmAudience: safeFront.audience || undefined,
    llmCapabilities: safeFront.capabilities || undefined,
    llmTrustLevel: safeFront.trustLevel || undefined,
    llmFeedTypes: safeFront.feedTypes || undefined,
    llmBehaviorHints: safeFront.llmBehaviorHints || undefined,
    llmRiskLevel: safeFront.riskLevel || undefined,
    llmContentType: safeFront.contentType || undefined,
    llmUpdateFrequency: safeFront.updateFrequency || undefined,
    mcpFeedUrl: safeFront.mcpFeedUrl || undefined,
    pageType: safeFront.pageType || undefined,
    interactionComplexity: safeFront.interactionComplexity || undefined,
    
    // Defaults intelligents (CONSERVÉS)
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

  let mdContent: string
  let front: any
  let content: string

  try {
    mdContent = fs.readFileSync(mdPath, 'utf-8')
    const parsed = matter(mdContent)
    front = parsed.data || {}
    content = parsed.content
  } catch (error) {
    console.error('Erreur parsing markdown:', error)
    notFound()
  }

  // 🎯 Construction intelligente de l'URL canonique (CONSERVÉE)
  const canonicalUrl = front.canonical_url || `https://wellknownmcp.org/spec/${cleanSlug}`
  
  // 🚀 Mapping du frontmatter vers SeoHead (LOGIQUE CONSERVÉE)
  const titleParts = cleanSlug
    .split('/')
    .map((part) => part.replace(/[_\-]/g, ' '))
  const pageTitle = front.title || `Spec: ${titleParts.join(' / ')}`
  
  const seoProps = getFrontmatterSeoProps(front, canonicalUrl, pageTitle)

  return (
    <>
      <SeoHead {...seoProps} />
      
      {/* ✅ Votre SpecPageClient existant - AUCUN CHANGEMENT */}
      <SpecPageClient
        slug={cleanSlug}
        content={content}
        front={front}
      />
    </>
  )
}