"use client"

import { Card } from "@/components/ui/card"
import EnhancedFeedViewer from "@/components/EnhancedFeedViewer"
import {ShareButtons} from "@/components/ShareButtons"
import SeoHead from '@/components/SeoHead'

export default function LLMFeedHubBase({ feed }: { feed: any }) {
  return ( <main className="max-w-5xl mx-auto p-4">
    <SeoHead
      title="LLMFeedHub | WellKnownMCP"
      description="Explore, understand, and share LLMFeed files with trust-level analysis and learning support."
      
      keywords="LLMFeed, MCP, feed explorer, feed visualizer"
     
    />
    <h1 className="text-3xl font-bold mb-4">LLMFeedHub</h1>
    <p className="mb-6 text-muted-foreground">
      Upload, paste, or reference any `.llmfeed.json` file to explore its structure, trust level, and metadata.
    </p>
    <div className="max-w-5xl mx-auto p-4 space-y-6">
	<div className="border-t pt-4">
        <p className="text-sm text-muted-foreground mb-2">Share this feed</p>
        <ShareButtons title={feed?.metadata?.title || "Check out this feed"} />
      </div>
      <h1 className="text-3xl font-bold">Feed preview</h1>

      <Card className="p-4 space-y-4">
        <EnhancedFeedViewer feed={feed} mode="hub" />
      </Card>

      
    </div>

    </main>
  )
}