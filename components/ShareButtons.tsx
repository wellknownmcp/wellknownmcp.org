"use client"

import { usePathname } from "next/navigation"
import { Copy, Twitter, Linkedin, MessageSquareShare, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ExportToLLMButton } from "./ExportToLLMButton"

interface ShareButtonsProps {
  title?: string
  description?: string
  hashtags?: string[]
  showExportButtons?: boolean
  className?: string
  variant?: 'default' | 'compact' | 'minimal'
}

export function ShareButtons({ 
  title, 
  description,
  hashtags = [],
  showExportButtons = true,
  className = "",
  variant = 'default'
}: ShareButtonsProps) {
  const path = usePathname()
  const url = `https://wellknownmcp.org${path}`

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    toast("Link copied to clipboard")
  }

  // Prepare share content
  const shareTitle = title || "Discover this MCP-enabled resource"
  const shareDescription = description || ""
  const fullShareText = description ? `${shareTitle} - ${shareDescription}` : shareTitle
  
  const shareText = encodeURIComponent(fullShareText)
  const shareUrl = encodeURIComponent(url)
  const hashtagString = hashtags.length > 0 ? hashtags.join(',') : ''
  const encodedHashtags = encodeURIComponent(hashtagString)

  // Twitter/X URL with hashtags
  const twitterUrl = hashtags.length > 0 
    ? `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}&hashtags=${encodedHashtags}`
    : `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`

  // Styling variants
  const containerStyles = {
    default: "flex flex-wrap items-center gap-2 mt-4",
    compact: "flex items-center gap-1",
    minimal: "flex items-center gap-1"
  }

  const buttonStyles = {
    default: "text-sm px-3 py-2",
    compact: "text-xs px-2 py-1", 
    minimal: "text-xs px-1 py-1"
  }

  if (variant === 'minimal') {
    return (
      <div className={`${containerStyles[variant]} share-buttons ${className}`} data-llm="ignore">
        <Button onClick={handleCopy} variant="ghost" size="sm" className={buttonStyles[variant]}>
          <Copy className="w-3 h-3" />
        </Button>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="sm" className={`${buttonStyles[variant]} text-blue-500`}>
            <Twitter className="w-3 h-3" />
          </Button>
        </a>
        {showExportButtons && <ExportToLLMButton mini clipboard />}
      </div>
    )
  }

  return (
    <div className={`${containerStyles[variant]} share-buttons ${className}`} data-llm="ignore">
      {/* Social Share Buttons */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`Share on X${hashtags.length > 0 ? ` with hashtags: ${hashtags.join(', ')}` : ''}`}
      >
        <Button variant="ghost" size="sm" className={`${buttonStyles[variant]} text-blue-500 hover:bg-blue-50`}>
          <Twitter className="w-4 h-4 mr-1" /> 
          {variant === 'compact' ? 'X' : 'X'}
          {hashtags.length > 0 && variant === 'default' && (
            <Hash className="w-3 h-3 ml-1 opacity-60" />
          )}
        </Button>
      </a>

      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on LinkedIn"
      >
        <Button variant="ghost" size="sm" className={`${buttonStyles[variant]} text-[#0A66C2] hover:bg-blue-50`}>
          <Linkedin className="w-4 h-4 mr-1" /> 
          {variant === 'compact' ? 'LI' : 'LinkedIn'}
        </Button>
      </a>

      <a
        href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on WhatsApp"
      >
        <Button variant="ghost" size="sm" className={`${buttonStyles[variant]} text-green-600 hover:bg-green-50`}>
          <MessageSquareShare className="w-4 h-4 mr-1" /> 
          {variant === 'compact' ? 'WA' : 'WhatsApp'}
        </Button>
      </a>

      <Button 
        onClick={handleCopy} 
        variant="ghost" 
        size="sm" 
        className={`${buttonStyles[variant]} hover:bg-gray-50`}
        title="Copy link to clipboard"
      >
        <Copy className="w-4 h-4 mr-1" /> 
        {variant === 'compact' ? 'Copy' : 'Copy link'}
      </Button>

      {/* Hashtags Display (optional visual) */}
      {hashtags.length > 0 && variant === 'default' && (
        <div className="flex items-center gap-1 text-xs text-gray-500 ml-2">
          <Hash className="w-3 h-3" />
          <span>{hashtags.slice(0, 3).join(' ')}</span>
          {hashtags.length > 3 && <span>...</span>}
        </div>
      )}

      {/* Export Buttons */}
      {showExportButtons && (
        <>
          {variant === 'default' && <ExportToLLMButton highlight />}
          <ExportToLLMButton mini clipboard />
        </>
      )}
      
      {variant === 'default' && <p></p>}
    </div>
  )
}

// Legacy compatibility wrapper
export function LegacyShareButtons({ title }: { title?: string }) {
  return <ShareButtons title={title} />
}

// Specialized variants for common use cases
export function CompactShareButtons({ 
  title, 
  hashtags 
}: { 
  title?: string
  hashtags?: string[] 
}) {
  return (
    <ShareButtons 
      title={title}
      hashtags={hashtags}
      variant="compact"
      showExportButtons={false}
    />
  )
}

export function MinimalShareButtons({ 
  title 
}: { 
  title?: string 
}) {
  return (
    <ShareButtons 
      title={title}
      variant="minimal"
      showExportButtons={true}
    />
  )
}