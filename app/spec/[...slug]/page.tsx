// page.tsx - Version corrigée avec parsing markdown intégré
import fs from 'fs/promises' // ✅ Asynchrone pour Next.js 13+
import path from 'path'
import matter from 'gray-matter'
import { redirect, notFound } from 'next/navigation'
import SeoHead from '@/components/SeoHead'
import SpecPage from '@/components/spec/SpecPage' // ✅ Plus "Client"
import { parseMarkdownSSR } from '@/utils/parseMarkdownSSR' // ✅ Parser SSR

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

// ✅ ASYNC server component pour Next.js 13+
export default async function SpecPageServer({ params }: { params: { slug?: string[] } }) {
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

  // ✅ Vérification asynchrone de l'existence du fichier
  try {
    await fs.access(mdPath)
  } catch {
    notFound()
  }

  let front: any
  let htmlContent: string

  try {
    // ✅ Lecture asynchrone du fichier
    const mdContent = await fs.readFile(mdPath, 'utf-8')
    const parsed = matter(mdContent)
    front = parsed.data || {}
    const content = parsed.content
    
    // ✅ PARSING MARKDOWN ICI (dans le vrai serveur)
    htmlContent = parseMarkdownSSR(content, cleanSlug)
    
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
      
      {/* ✅ SpecPage SSR avec HTML déjà parsé */}
      <SpecPage
        slug={cleanSlug}
        htmlContent={htmlContent} // ✅ HTML parsé, plus markdown brut
        front={front}
      />
    </>
  )
}

// ✅ Génération des métadonnées (CONSERVÉE et améliorée)
export async function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join('/') ?? ''
  const cleanSlug = slug.replace(/\.md$/, '')
  
  if (!cleanSlug) {
    return {
      title: 'LLMFeed Specification',
      description: 'Complete specification for LLMFeed protocol'
    }
  }

  const mdPath = path.join(
    process.cwd(),
    'public',
    'exports',
    'spec',
    `${cleanSlug}.md`
  )

  try {
    const mdContent = await fs.readFile(mdPath, 'utf-8')
    const { data: front } = matter(mdContent)
    
    const titleParts = cleanSlug
      .split('/')
      .map((part) => part.replace(/[_\-]/g, ' '))
    const pageTitle = front?.title || `Spec: ${titleParts.join(' / ')}`
    
    return {
      title: pageTitle,
      description: front?.description || `Documentation for ${cleanSlug}`,
      keywords: front?.tags?.join(', '),
      openGraph: {
        title: pageTitle,
        description: front?.description,
        images: [front?.image || 'https://wellknownmcp.org/og/spec.png'],
        url: front?.canonical_url || `https://wellknownmcp.org/spec/${cleanSlug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: front?.description,
      }
    }
  } catch {
    return {
      title: 'Specification Not Found',
      description: 'The requested specification could not be found.'
    }
  }
}