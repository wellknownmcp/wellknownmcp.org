import type { Metadata } from "next"
import "@/styles/globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
//import { useTrackPageView } from "@/lib/hooks"

export const metadata: Metadata = {
  title: "WellKnownMCP",
  description: "Model Context Protocol — verified knowledge between agents",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    images: [
      {
        url: "/og-wellknownmcp.png",
        width: 1200,
        height: 630,
        alt: "WellKnownMCP"
      }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
 // useTrackPageView()
  return (
    <html lang="en">
	<head>
	
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