'use client'

import { SpecProvider } from './SpecContext'
import SpecViewer from './SpecViewer'

interface SpecPageClientProps {
  slug: string
  content: string
  front: Record<string, any>
}

export default function SpecPageClient({
  slug,
  content,
  front,
}: SpecPageClientProps) {
  return (
    <SpecProvider value={{ slug, content, front }}>
      <SpecViewer slug={slug} />
    </SpecProvider>
  )
}
