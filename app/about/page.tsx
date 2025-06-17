import { redirect } from 'next/navigation'

export default function AboutRedirect() {
  // Redirection 301 côté serveur vers la version anglaise
  redirect('/en/about')
}

// Métadonnées pour le SEO
export const metadata = {
  title: 'About - WellKnownMCP',
  description: 'Learn about WellKnownMCP and our mission to build the agentic web.',
  robots: 'noindex, follow' // Évite l'indexation de la page de redirection
}