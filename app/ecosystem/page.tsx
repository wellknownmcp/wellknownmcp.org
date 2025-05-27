'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface AgentSite {
  name: string
  url: string
  mcp_url: string
  description?: string
  trust?: 'signed' | 'certified'
  feed_types?: string[]
  badges?: {
    label: string
    badge_file: string
    source?: string | null
    scope?: string
  }[]
}

const FEED_TYPES = [
  {
    type: 'mcp',
    emoji: '🤝',
    description: 'Main MCP declaration: metadata, prompts, endpoints, trust.',
  },
  {
    type: 'capabilities',
    emoji: '⚙️',
    description: 'Dynamic capabilities: APIs and actions callable by agents.',
  },
  {
    type: 'llm-index',
    emoji: '📚',
    description:
      'Index of feeds available on this site, human and agent-facing.',
  },
  {
    type: 'export',
    emoji: '📤',
    description: 'Static or dynamic content prepared for export to agents.',
  },
  {
    type: 'credential',
    emoji: '🪪',
    description:
      'Credential feeds (planned): agent-readable proof or claim bundles.',
  },
  {
    type: 'custom',
    emoji: '🧪',
    description:
      'Experimental feed types — proposed by the ecosystem, not yet standardized.',
  },
]

export default function AgentReadySitesPage() {
  const { data, error } = useSWR(
    '/exports/ecosystem/agent-sites.llmfeed.json',
    fetcher
  )
  const SITES = data?.sites ?? []

  const [showBadges, setShowBadges] = useState(false)
  const [expandedSite, setExpandedSite] = useState<string | null>(null)

  return (
    <>
      <SeoHead
        title="Agent-Ready Sites — MCP Ecosystem Index"
        description="Discover the first websites that implement MCP: structured, signed and agent-readable declarations under /.well-known"
        canonicalUrl="https://wellknownmcp.org/ecosystem"
        ogImage="https://wellknownmcp.org/og/agent-sites.jpg"
        keywords={[
          'mcp',
          'ecosystem',
          'agent ready',
          'trusted sites',
          'llmfeed',
          'well-known',
          'signature',
          'certified',
        ]}
        llmIntent="explore agent-ready sites"
        llmTopic="ecosystem, trusted feeds, mcp adoption"
        llmIndexUrl="/.well-known/llm-index.llmfeed.json"
        llmlang="en"
      />
      <div className="max-w-3xl mx-auto space-y-8 py-10">
        <PageTitle
          title="Agent-Ready Sites"
          subtitle="Early adopters of the Model Context Protocol — Signed, Certified, and Exportable"
        />

        <p className="text-muted-foreground text-sm">
          These sites implement <code>/.well-known</code> declarations with full
          MCP support: metadata, prompts, trust, export, and public key
          exposure. Each capsule is signed and can be inspected by any agent.
        </p>

        <div className="flex justify-between items-center">
          <ExportToLLMButton
            context="static"
            staticPath="ecosystem/agent-sites"
          />
          <label className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              checked={showBadges}
              onChange={() => setShowBadges(!showBadges)}
            />
            Show visual badges
          </label>
  
        <div className="border-t pt-6 text-center text-sm text-zinc-500">
          🌍 Want to be listed here?
          <a href="/join" className="underline ml-1">Submit your site</a> and become part of the MCP network.
        </div>

      </div>

        <div className="border border-muted rounded-md p-4 bg-muted/30">
          <h3 className="text-sm font-semibold mb-2">
            🧩 Feed Types used in the MCP ecosystem
          </h3>
          <ul className="list-disc text-sm pl-5 space-y-1">
            {FEED_TYPES.map((f) => (
              <li key={f.type}>
                <span className="mr-1">{f.emoji}</span>
                <code>{f.type}.llmfeed.json</code> — {f.description}
              </li>
            ))}
          </ul>
  
        <div className="border-t pt-6 text-center text-sm text-zinc-500">
          🌍 Want to be listed here?
          <a href="/join" className="underline ml-1">Submit your site</a> and become part of the MCP network.
        </div>

      </div>

        {error && (
          <p className="text-sm text-red-500">Failed to load site list.</p>
        )}
        {!SITES && !error && (
          <p className="text-sm text-muted-foreground">
            Loading agent-ready sites…
          </p>
        )}

        {SITES.length > 0 && (
          <div className="space-y-4">
            {SITES.map((site) => (
              <Card key={site.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                      <a
                        href={site.url}
                        className="hover:underline"
                        target="_blank"
                        rel="noopener"
                      >
                        {site.name}
                      </a>
              
        <div className="border-t pt-6 text-center text-sm text-zinc-500">
          🌍 Want to be listed here?
          <a href="/join" className="underline ml-1">Submit your site</a> and become part of the MCP network.
        </div>

      </div>
                    <button
                      onClick={() =>
                        setExpandedSite(
                          expandedSite === site.name ? null : site.name
                        )
                      }
                      className="text-xs underline text-muted-foreground"
                    >
                      {expandedSite === site.name ? 'Hide' : 'Show'} details
                    </button>
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    <a
                      href={site.mcp_url}
                      className="text-xs hover:underline"
                      target="_blank"
                      rel="noopener"
                    >
                      View MCP capsule ↗
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {expandedSite === site.name && (
                    <>
                      <div className="text-sm text-muted-foreground">
                        Trust level: <strong>{site.trust}</strong>
                
        <div className="border-t pt-6 text-center text-sm text-zinc-500">
          🌍 Want to be listed here?
          <a href="/join" className="underline ml-1">Submit your site</a> and become part of the MCP network.
        </div>

      </div>
                      <div className="flex gap-2 flex-wrap">
                        {site.feed_types?.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                
        <div className="border-t pt-6 text-center text-sm text-zinc-500">
          🌍 Want to be listed here?
          <a href="/join" className="underline ml-1">Submit your site</a> and become part of the MCP network.
        </div>

      </div>
                      {showBadges && site.badges?.length > 0 && (
                        <div className="flex gap-3 flex-wrap mt-2">
                          {site.badges.map((b) => (
                            <Image
                              key={b.label}
                              src={`/${b.badge_file}`}
                              alt={b.label}
                              width={100}
                              height={28}
                              className="rounded"
                            />
                          ))}
                  
        <div className="border-t pt-6 text-center text-sm text-zinc-500">
          🌍 Want to be listed here?
          <a href="/join" className="underline ml-1">Submit your site</a> and become part of the MCP network.
        </div>

      </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
    
        <div className="border-t pt-6 text-center text-sm text-zinc-500">
          🌍 Want to be listed here?
          <a href="/join" className="underline ml-1">Submit your site</a> and become part of the MCP network.
        </div>

      </div>
        )}

        <p className="mt-10 text-sm text-muted-foreground">
          Want your site listed here? Your feed must be{' '}
          <strong>publicly accessible</strong>,{' '}
          <strong>signed or certified</strong>, and include metadata + prompts +
          capabilities. Then{' '}
          <a href="/join" className="underline">
            join the ecosystem
          </a>
          .
        </p>
        <p className="mt-12 text-xs text-muted-foreground text-center italic">
          🕸️ This ecosystem view is only the beginning. Soon, agents will
          explore not just who is ready — but how sites, tools and trust are
          connected.
          <br />
          <span className="font-semibold">MCP-Net</span> is coming.
        </p>

        <div className="border-t pt-6 text-center text-sm text-zinc-500">
          🌍 Want to be listed here?
          <a href="/join" className="underline ml-1">Submit your site</a> and become part of the MCP network.
        </div>

      </div>
    </>
  )
}
