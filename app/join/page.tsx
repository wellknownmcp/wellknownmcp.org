'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function JoinPage() {
  const [email, setEmail] = useState('')
  const [motivation, setMotivation] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, motivation }),
      })
      if (!res.ok) {
        throw new Error('Submission failed')
      }
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">✨ Join the LLMCA Consortium</h1>
      <p className="text-muted-foreground">
        LLMCA is building the trust layer for the agentic web. We certify
        `.llmfeed.json` files, define behavioral expectations for LLMs, and help
        establish interoperability standards. If you care about AI safety, open
        ecosystems, or agent ethics — we’d love to hear from you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Why do you want to join? (160 characters max)"
          maxLength={160}
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          required
        />
        <Button type="submit" disabled={submitted}>
          {submitted ? 'Submitted ✅' : 'Apply to join'}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>

      <div className="space-y-4 pt-6">
        <h2 className="text-lg font-semibold">👥 Who should join?</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground mt-2 list-disc pl-5">
          <li>🧠 AI researcher curious about agent trust</li>
          <li>🛠️ Indie developer building tools or apps</li>
          <li>🏛️ Institution advocating open standards</li>
          <li>🔐 Certifier or reviewer of digital trust</li>
          <li>🤖 Agent builder (chatbot, voice assistant)</li>
          <li>🧭 Ethicist or systems thinker</li>
        </ul>

        <h3 className="text-sm font-semibold">🚀 Next milestones</h3>
        <ul className="list-disc text-sm text-muted-foreground pl-5">
          <li>Launch public feed flagging prototype (Q2)</li>
          <li>Open signature review interface</li>
          <li>Agent trust scoring and compatibility testing</li>
          <li>Volunteer co-auditor registry</li>
        </ul>
      </div>
    </div>
  )
}
