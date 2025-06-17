import { redirect } from 'next/navigation'

export default function FaqRedirect() {
  // Redirection 301 côté serveur vers la version anglaise
  redirect('/en/faq')
}

// Métadonnées pour le SEO
export const metadata = {
  title: 'FAQ - WellKnownMCP',
  description: 'Frequently asked questions about WellKnownMCP, MCP protocol, and LLMFeed.',
  robots: 'noindex, follow' // Évite l'indexation de la page de redirection
}