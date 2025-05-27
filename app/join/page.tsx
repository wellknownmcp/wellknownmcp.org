'use client'

import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import { ShareButtons } from '@/components/ShareButtons'
import Link from 'next/link'

export default function JoinPage() {
  return (
    <>
      <SeoHead
        title="Join the MCP Ecosystem"
        description="Declare your interest in trust, agents, certification or feed reputation. Help shape the agentic web."
        canonicalUrl="https://wellknownmcp.org/join"
        keywords={[
          'join',
          'llmca',
          'consortium',
          'trust',
          'agent',
          'certification',
          'governance',
        ]}
        llmlang="en"
        llmIntent="join the MCP consortium"
        llmTopic="open agent standard and certification"
      />

      <div className="max-w-2xl mx-auto py-10 space-y-8">
        <PageTitle
          title="Join the MCP Ecosystem"
          subtitle="Help shape the agentic web with trust, governance and shared vision"
        />

        <p className="text-sm text-muted-foreground">
          This initiative is backed by a signed{' '}
          <Link href="/exports/manifesto.llmfeed.json" className="underline">
            manifesto
          </Link>
          , published at <code>/.well-known/manifesto.llmfeed.json</code>. Our
          goal: build a web where agents and humans coexist — safely,
          responsibly, and independently of platforms.
        </p>

        <div className="space-y-2 mt-6">
          <h2 className="text-lg font-semibold">👥 Who should join?</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground mt-2 list-disc pl-5">
            <li>🧠 AI researcher curious about agent trust</li>
            <li>🛠️ Indie developer building tools or apps</li>
            <li>🏛️ Institution advocating open standards</li>
            <li>🔐 Certifier or reviewer of digital trust</li>
            <li>🤖 Agent builder (chatbot, voice assistant)</li>
            <li>🧭 Ethicist or systems thinker</li>
          </ul>
        </div>

        <div className="space-y-2 mt-10">
          <h3 className="text-sm font-semibold">🚀 Next milestones</h3>
          <ul className="list-disc text-sm text-muted-foreground pl-5">
            <li>Launch public feed flagging prototype (Q2)</li>
            <li>Open signature review interface</li>
            <li>Agent trust scoring and compatibility testing</li>
            <li>Volunteer co-auditor registry</li>
          </ul>
        </div>

        <p className="text-sm mt-8 text-muted-foreground">
          If you want to be part of this trust layer — as a contributor,
          validator, certifier, researcher, or partner — you can declare your
          intent below.
        </p>

        <form
          method="POST"
          action="https://formspree.io/f/xzbldnko"
          className="space-y-4 mt-4"
        >
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Your email (required)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="border rounded px-3 py-2 text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="motivation" className="text-sm font-medium">
              Why are you joining? (max 160 characters)
            </label>
            <textarea
              id="motivation"
              name="motivation"
              maxLength={160}
              rows={3}
              className="border rounded px-3 py-2 text-sm"
              placeholder="To help review feeds / To certify agent compatibility / To advise ethically..."
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-zinc-800 text-sm"
          >
            Join the ecosystem →
          </button>
        </form>

        <ShareButtons title="Join the MCP Ecosystem" />
      </div>
    </>
  )
}
