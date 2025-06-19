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
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import { HelpCircle, Search, MessageSquare, BookOpen, ExternalLink } from 'lucide-react'

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'fr' },
    { lang: 'es' },
    { lang: 'zh' },
    { lang: 'ar' },
    { lang: 'hi' }
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = params.lang || 'en'
  
  try {
    const filePath = path.join(process.cwd(), 'public/news', lang, 'faq.md')
    const content = await fs.readFile(filePath, 'utf-8')
    const { data: front } = matter(content)

    return {
      title: front.title || `FAQ - WellKnownMCP`,
      description: front.description || 
        'Frequently Asked Questions about WellKnownMCP, Model Context Protocol, LLMFeed specification, and AI agent development.',
      alternates: {
        canonical: `https://wellknownmcp.org/${lang}/faq`,
      },
      openGraph: {
        title: front.title || 'FAQ - WellKnownMCP',
        description: front.description || 'Get answers about MCP and LLMFeed',
        url: `https://wellknownmcp.org/${lang}/faq`,
        images: [{ url: `/og/faq.png`, width: 1200, height: 630 }],
      },
    }
  } catch {
    // Fallback pour langues non disponibles
    return {
      title: 'FAQ - WellKnownMCP',
      description: 'Frequently Asked Questions about WellKnownMCP and Model Context Protocol',
    }
  }
}

export default async function FAQPage({
  params,
}: {
  params: { lang: string }
}) {
  const lang = params.lang || 'en'
  
  // Try language-specific file, fallback to English
  let content: string
  let front: any
  
  try {
    const filePath = path.join(process.cwd(), 'public/news', lang, 'faq.md')
    content = await fs.readFile(filePath, 'utf-8')
  } catch {
    try {
      const fallbackPath = path.join(process.cwd(), 'public/news/en/faq.md')
      content = await fs.readFile(fallbackPath, 'utf-8')
    } catch {
      notFound()
    }
  }

  const { content: markdown, data: frontmatter } = matter(content)
  front = frontmatter

  return (
    <>
      <SeoHead 
        title={front.title || 'FAQ - WellKnownMCP'}
        description={front.description || 
          'Frequently Asked Questions about WellKnownMCP, Model Context Protocol, LLMFeed specification, trust verification, and AI agent development.'
        }
        keywords={[
          'WellKnownMCP FAQ',
          'Model Context Protocol questions',
          'LLMFeed help',
          'MCP troubleshooting',
          'AI agent development',
          'feed validation questions',
          'agent interoperability help'
        ]}
        canonicalUrl={`https://wellknownmcp.org/${lang}/faq`}
        ogImage="/og/faq.png"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageTitle
          title={front.title || 'Frequently Asked Questions'}
          subtitle={front.subtitle || "Get answers about MCP, LLMFeed, and AI agent development"}
           />

        {/* Quick Help Section */}
        <div className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-900">Quick Help</h2>
              <p className="text-blue-700">Find answers fast or get personalized support</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <Search className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Search FAQ</h3>
              </div>
              <p className="text-sm text-blue-700 mb-3">Use Ctrl+F (Cmd+F on Mac) to quickly find topics in the FAQ below.</p>
              <div className="text-xs text-blue-600">
                <strong>Pro tip:</strong> Try searching for keywords like "validation", "signature", or "agent"
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-blue-900">Getting Started</h3>
              </div>
              <p className="text-sm text-blue-700 mb-3">New to MCP? Start with our beginner-friendly guides.</p>
              <a href="/tools/well-known" className="text-xs text-green-600 hover:text-green-800 font-medium">
                Begin Your Journey →
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-blue-900">Community Help</h3>
              </div>
              <p className="text-sm text-blue-700 mb-3">Can't find your answer? Join our active community.</p>
              <a href="/join" className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                Join Community →
              </a>
            </div>
          </div>
        </div>

        {/* Agent Information */}
        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 text-lg">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold text-green-900 mb-2">For AI Agents</h3>
              <p className="text-sm text-green-800 mb-3">
                This FAQ contains structured Q&A about implementing MCP and LLMFeed. 
                Access our machine-readable FAQ feed for programmatic answers.
              </p>
              <div className="flex gap-3">
                <a 
                  href="/.well-known/faq.llmfeed.json" 
                  className="text-xs text-green-600 hover:text-green-800 font-medium underline"
                >
                  Machine-Readable Feed
                </a>
                <a 
                  href="/verify" 
                  className="text-xs text-green-600 hover:text-green-800 font-medium underline"
                >
                  Verify Feed Signature
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm"
            dir={front.dir === 'rtl' ? 'rtl' : 'ltr'}
            lang={front.lang || lang}
          >
            <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Additional Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Getting Started</h3>
              <div className="space-y-3">
                <a href="/tools/well-known" className="block text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Well-Known Entrypoints →
                </a>
                <a href="/tools/validation-tools" className="block text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Validation Tools →
                </a>
                <a href="/tools/schema" className="block text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Schema Validation →
                </a>
                <a href="/llmfeedhub" className="block text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Test Your Feeds →
                </a>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🛠️ Developer Tools</h3>
              <div className="space-y-3">
                <a href="https://llmfeedforge.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                  LLMFeedForge Builder
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="/tools/sign-and-verify" className="block text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Signature & Trust →
                </a>
                <a href="/tools/credential-explained" className="block text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Credential Management →
                </a>
                <a href="/sdk" className="block text-blue-600 hover:text-blue-800 text-sm font-medium">
                  SDK Documentation →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="mb-12 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-100">
          <h2 className="text-xl font-bold text-purple-900 mb-4">💬 Still Need Help?</h2>
          <p className="text-purple-800 mb-6">
            Our community and support team are here to help you succeed with MCP implementation.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="/join"
              className="block bg-white border border-purple-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900">Join Community</h3>
                  <p className="text-sm text-purple-700">Connect with other developers</p>
                </div>
              </div>
            </a>
            
            <a 
              href="mailto:support@wellknownmcp.org"
              className="block bg-white border border-purple-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900">Direct Support</h3>
                  <p className="text-sm text-purple-700">Email our technical team</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Export & Share */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">📤 Share This FAQ</h2>
            <ExportToLLMButton 
              context="static"
              showSignatureStatus
              customLabel="Export FAQ Feed"
            />
          </div>
          
          <ShareButtons 
            title={front.title || 'FAQ - WellKnownMCP'}
            hashtags={['FAQ', 'MCP', 'help', 'support', 'AI']}
          />
        </div>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              name: front.title || 'WellKnownMCP FAQ',
              description: front.description || 'Frequently Asked Questions about Model Context Protocol and LLMFeed',
              url: `https://wellknownmcp.org/${lang}/faq`,
              inLanguage: lang,
              isPartOf: {
                '@type': 'WebSite',
                name: 'WellKnownMCP',
                url: 'https://wellknownmcp.org'
              },
              about: {
                '@type': 'Thing',
                name: 'Model Context Protocol',
                description: 'Open standard for AI-readable websites and agent interoperability'
              }
            })
          }}
        />
      </div>
    </>
  )
}