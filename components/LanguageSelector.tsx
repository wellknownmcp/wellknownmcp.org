
"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

const languages = {
  fr: { label: "Français", flag: "🇫🇷" },
  en: { label: "English", flag: "🇬🇧" },
  es: { label: "Español", flag: "🇪🇸" },
  ar: { label: "العربية", flag: "🇸🇦" },
  hi: { label: "हिन्दी", flag: "🇮🇳" },
  uk: { label: "Українська", flag: "🇺🇦" },
  zh: { label: "中文", flag: "🇨🇳" }
}

export function LanguageSelector() {
  const pathname = usePathname()
  const router = useRouter()

  const segments = pathname.split("/").filter(Boolean)
  const currentLang = segments[0] in languages ? segments[0] : "en"

  function switchLang(lang: string) {
    if (!languages[lang]) return
    const newSegments = [...segments]
    if (newSegments[0] in languages) {
      newSegments[0] = lang
    } else {
      newSegments.unshift(lang)
    }
    const newPath = "/" + newSegments.join("/")
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}>
            {languages[currentLang]?.flag}
          </span>
          <span>{languages[currentLang]?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([lang, { label, flag }]) => (
          <DropdownMenuItem key={lang} onClick={() => switchLang(lang)}>
            <span
              className="mr-2"
              style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}
            >
              {flag}
            </span>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
