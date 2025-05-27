'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-12">
      <h1 className="text-5xl font-bold mb-4">404 — Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-6 max-w-xl">
        “Unfortunately, no one can be told what the Matrix is. You have to see it for yourself.”
      </p>
      <Link href="/" className="text-blue-500 underline hover:text-blue-700">
        Return to reality — wellknownmcp.org
      </Link>
    </div>
  )
}
