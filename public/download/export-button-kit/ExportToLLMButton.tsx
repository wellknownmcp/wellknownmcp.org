"use client"

import { Button } from "@/components/ui/button"
import { BrainCircuit } from "lucide-react"
import { saveAs } from "file-saver"

export function ExportToLLMButton({
  context = "current",
  staticName,
  dynamicId,
  highlight
}: {
  context?: "current" | "static" | "dynamic",
  staticName?: string,
  dynamicId?: string,
  highlight?: boolean
}) {
  const handleClick = async () => {
    let url = ""

    if (context === "current") {
      const html = document.documentElement.outerHTML
      const res = await fetch("/api/export/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html })
      })
      const feed = await res.json()
      const blob = new Blob([JSON.stringify(feed, null, 2)], {
        type: "application/json"
      })
      saveAs(blob, "export.llmfeed.json")
      return
    }

    if (context === "static" && staticName) {
      url = `/api/llmfeed/static?name=${staticName}`
    } else if (context === "dynamic" && dynamicId) {
      url = `/api/llmfeed/dynamic?id=${dynamicId}`
    }

    if (url) {
      window.open(url, "_blank")
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`text-violet-600 font-semibold flex items-center gap-2 relative`}
      onClick={handleClick}
      title="Export to LLMFeed"
    >
      <BrainCircuit className="w-4 h-4" />
      Export to LLM
      {highlight && (
        <span className="absolute -top-2 -right-3 bg-violet-600 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold shadow">
          NEW
        </span>
      )}
    </Button>
  )
}
