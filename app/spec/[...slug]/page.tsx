// app/spec/[...slug]/page.tsx
'use client'

import { redirect } from 'next/navigation'
import { SpecProvider } from '@/components/spec/SpecContext'
import SpecViewer from '@/components/spec/SpecViewer'

export default function SpecPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join('/') ?? ''

  // ✅ Redirect root /spec → /spec/llmfeed (or any default)
  if (!slug) {
    redirect('/spec/01_llmfeed/llmfeed')
  }

  return (
    <SpecProvider>
      <SpecViewer slug={slug} />
    </SpecProvider>
  )
}
