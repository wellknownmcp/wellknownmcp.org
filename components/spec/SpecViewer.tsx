// components/SpecViewer.tsx
'use client'

import { useEffect, useState } from 'react'
import { marked } from 'marked'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'

export function getSpecFilePath(slug: string) {
  return `/exports/spec/${slug}.md`
}

export default function SpecViewer({ slug }: { slug: string }) {
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    async function loadSpec() {
      const res = await fetch(getSpecFilePath(slug))
      if (res.ok) {
        const raw = await res.text()
        const markdown = raw.replace(/^---[\s\S]+?---/, '').trim()
        const htmlContent = marked.parse(markdown) // ✅ md → html
        setHtml(htmlContent as string)
      } else {
        setHtml("<p class='text-red-600'>404: Spec file not found.</p>")
      }
    }
    loadSpec()
  }, [slug])

  return (
    <div className="prose max-w-none">
      <h1 className="text-xl font-bold mb-4">{slug}</h1>
      <ExportToLLMButton />
      <div dangerouslySetInnerHTML={{ __html: html }} /> {/* ✅ render HTML */}
    </div>
  )
}
