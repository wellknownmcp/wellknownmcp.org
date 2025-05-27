// app/join/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function JoinPage() {
  const [email, setEmail] = useState('')
  const [motivation, setMotivation] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motivation }),
      })

      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
      setMotivation('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Join the LLMCA Initiative</h1>
        <p className="text-muted-foreground">
          The Model Context Protocol is becoming a new standard. Get involved
          now to shape the future of interpretable agents.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="motivation">
            Why do you want to join? (160 characters max)
          </Label>
          <Textarea
            id="motivation"
            maxLength={160}
            required
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder="To contribute to an open and transparent agent ecosystem..."
          />
          <p className="text-sm text-muted-foreground text-right">
            {motivation.length}/160
          </p>
        </div>

        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : 'Join Now'}
        </Button>

        {status === 'success' && (
          <p className="text-green-600">
            ✅ Thanks for joining! We'll be in touch soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600">
            ❌ Submission failed. Please try again later.
          </p>
        )}
      </form>
    </div>
  )
}
