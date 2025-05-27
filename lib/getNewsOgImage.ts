
import fs from 'fs'
import path from 'path'

export function getNewsOgImage(slug: string, lang: string): string {
  const publicPath = path.join(process.cwd(), 'public', 'og')
  const specific = path.join(publicPath, `news-${slug}.${lang}.png`)
  const fallback = path.join(publicPath, `news-default-${lang}.png`)

  if (fs.existsSync(specific)) {
    return `https://wellknownmcp.org/og/news-${slug}.${lang}.png`
  }

  if (fs.existsSync(fallback)) {
    return `https://wellknownmcp.org/og/news-default-${lang}.png`
  }

  // ultimate fallback
  return `https://wellknownmcp.org/og/news-default.png`
}
