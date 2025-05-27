import Link from 'next/link'
import { BadgeCheck } from 'lucide-react'

export function SiteBadge() {
  return (
    <div className="py-12 max-w-2xl mx-auto text-center space-y-4">
      <h2 className="text-xl font-semibold">✅ Is your site MCP-compatible?</h2>
      <p className="text-sm text-muted-foreground">
        Declare your capabilities and get a badge you can embed. Let agents verify your trust level instantly.
      </p>
      <div className="flex justify-center">
        <Link
          href="/verify"
          className="inline-flex items-center gap-2 text-sm bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          <BadgeCheck className="w-4 h-4" /> Claim your MCP badge
        </Link>
      </div>
    </div>
  )
}