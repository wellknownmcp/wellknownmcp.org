// SpecPage.tsx - Version SSR complète (plus "Client" dans le nom)
import SpecViewer from './SpecViewer'

interface SpecPageProps {
  slug: string
  htmlContent: string // HTML déjà parsé dans page.tsx
  front: Record<string, any>
}

export default function SpecPage({
  slug,
  htmlContent,
  front,
}: SpecPageProps) {
  // ✅ Aucun parsing ici - tout reçu en props depuis page.tsx
  return (
    <SpecViewer 
      slug={slug} 
      htmlContent={htmlContent}
      front={front}
    />
  )
}