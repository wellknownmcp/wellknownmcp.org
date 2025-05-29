'use client'

import "@/styles/globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SeoHead from "@/components/SeoHead" // ajuste si nécessaire

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <SeoHead
          title="WellKnownMCP"
          description="Model Context Protocol — verified knowledge between agents"
          ogImage="https://wellknownmcp.org/og-wellknownmcp.png"
          llmIndexUrl="/.well-known/index.llmfeed.json"
          llmlang="en"
          keywords={[
            "model context protocol",
            "LLM",
            "structured data",
            "semantic web",
            "well-known",
            "AI agents"
          ]}
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow px-4">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
