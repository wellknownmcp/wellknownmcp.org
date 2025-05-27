'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'

interface PromptCardProps {
  title: string
  filename: string
  feed: object
}

export function PromptCard({ title, filename, feed }: PromptCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(feed, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2">
          <ExportToLLMButton
            context="static"
            staticPath={`demo/prompts/${filename}`}
          />
        </div>
      </CardHeader>
      <CardContent>
        <pre className="text-xs overflow-x-auto">
          {JSON.stringify(feed, null, 2)}
        </pre>
      </CardContent>
    </Card>
  )
}
