'use client'

import { useSpecContext } from './SpecContext'
import type { SpecContextType } from './SpecContext'
import { marked } from 'marked'
import { Tokens } from 'marked'
import Link from 'next/link'
import path from 'path'

const siteUrl = 'https://wellknownmcp.org'

marked.use({
  renderer: {
    link(this: any, token: Tokens.Link): string | false {
      const href = token.href
      const title = token.title
      const text = token.text

      if (href?.startsWith('http://') || href?.startsWith('https://')) {
        return `<a href="${href}" ${title ? `title="${title}"` : ''}>${text}</a>`
      }

      const absolutePrefixes = ['/tools', '/verify', '/faq', '/feeds', '/en', '/join']

      const shouldRewrite = absolutePrefixes.some(prefix => href?.startsWith(prefix))
      let finalHref = href
      if (shouldRewrite && href) {
        finalHref = `${siteUrl}${href}`
      }

      return `<a href="${finalHref}" ${title ? `title="${title}"` : ''}>${text}</a>`
    },
  },
})

function resolveSpecSlug(baseSlug: string, relatedPath: string): string {
  const baseDir = path.posix.dirname(baseSlug)
  const resolved = path.posix.normalize(path.posix.join(baseDir, relatedPath))
  return resolved
}

export default function SpecViewer({ slug }: { slug: string }) {
  // ✅ Forcer le typage → plus d'erreur
  const { content, front } = useSpecContext() as SpecContextType

  if (!content) {
    return <div className="text-red-600">Error: Spec content not found.</div>
  }

  const htmlContent = marked.parse(content ?? '')

  const relatedLinks = front?.Related?.map((relatedPath: string) => {
    const resolvedSlug = resolveSpecSlug(slug, relatedPath)
    const url = `/spec/${resolvedSlug}`
    const displayTitle =
      resolvedSlug.split('/').pop()?.replace(/[_\-]/g, ' ') ?? resolvedSlug

    return (
      <li key={resolvedSlug}>
        <Link href={url}>{displayTitle}</Link>
      </li>
    )
  })

  return (
    <article className="prose dark:prose-invert max-w-4xl mx-auto py-8 space-y-8">
      {front?.title && <h1>{front.title}</h1>}
      {front?.version && <p className="text-sm text-gray-500">Version: {front.version}</p>}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      {relatedLinks && relatedLinks.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Related</h2>
          <ul className="space-y-1">{relatedLinks}</ul>
        </div>
      )}
    </article>
  )
}
