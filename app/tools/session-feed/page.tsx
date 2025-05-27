'use client'

import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'

export default function SessionFeedPage() {
  return (
    <>
      <SeoHead
        title="Session Feed — LLM Capsule"
        description="How to export a conversation or LLM session into a structured, replayable MCP session-feed."
        ogImage="/og/tools-session-feed.png"
        keywords={['mcp', 'session-feed', 'llm', 'trace', 'replay', 'llmfeed']}
        llmlang="en"
        llmIntent="learn session feed"
        llmTopic="session capture and replay"
      />

      <div className="max-w-3xl mx-auto space-y-10 py-12">
        <PageTitle
          title="🧠 Session Feeds"
          subtitle="Capture, replay, or transfer a full LLM interaction as a structured MCP capsule"
        />

        <Card className="bg-muted/40">
          <CardContent className="text-sm text-muted-foreground space-y-4 pt-6">
            <p>
              A <strong>session feed</strong> is a structured `.llmfeed.json`
              file that captures the context, intent, and memory of a
              conversation.
            </p>
            <p>
              It can include summaries, prompts, user intent, factual
              statements, decisions made, or trust constraints. This makes it
              ideal for replaying, auditing, or transferring interactions
              between agents or sessions.
            </p>
            <p>
              Use it to:
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>Archive sessions in an agent-readable format</li>
                <li>Export a chat from an assistant into a reusable feed</li>
                <li>Transfer conversation memory between platforms</li>
              </ul>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Example Prompt</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              Use this predefined prompt to ask your LLM to extract a
              session-feed from a transcript:
            </p>
            <div className="mt-4">
              <ExportToLLMButton
                context="static"
                staticPath="demo/prompt/generate-session-feed.llmfeed.json"
              />
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 text-xs text-muted-foreground italic text-center">
          Need more? Define your own session capsules, or let the Forge generate
          one for you.
        </div>
      </div>
    </>
  )
}
