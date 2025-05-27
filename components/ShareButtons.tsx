"use client"

import { usePathname } from "next/navigation"
import { Copy, Twitter, Linkedin, MessageSquareShare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ExportToLLMButton } from "./ExportToLLMButton";

export function ShareButtons({ title }: { title?: string }) {
  const path = usePathname()
  const url = `https://wellknownmcp.org${path}`

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    toast("Link copied to clipboard")
  }

  const shareText = encodeURIComponent(title || "Discover this MCP-enabled resource")
  const shareUrl = encodeURIComponent(url)

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4 share-buttons" data-llm="ignore">
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" size="sm" className="text-sm px-2 text-blue-500">
          <Twitter className="w-4 h-4 mr-1" /> X
        </Button>
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" size="sm" className="text-sm px-2 text-[#0A66C2]">
          <Linkedin className="w-4 h-4 mr-1" /> LinkedIn
        </Button>
      </a>
      <a
        href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" size="sm" className="text-sm px-2 text-green-600">
          <MessageSquareShare className="w-4 h-4 mr-1" /> WhatsApp
        </Button>
      </a>
      <Button onClick={handleCopy} variant="ghost" size="sm" className="text-sm px-2">
        <Copy className="w-4 h-4 mr-1" /> Copy link
      </Button>
	  <ExportToLLMButton highlight/>
    <ExportToLLMButton mini clipboard/>
    <p></p>
    </div>
  )
}