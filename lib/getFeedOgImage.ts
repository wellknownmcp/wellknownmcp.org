import fs from 'fs'
import path from 'path'

export function getFeedOgImage(feedType: string): string {
  const publicPath = path.join(process.cwd(), 'public', 'og')
  const specific = path.join(publicPath, `feed-${feedType}.png`)
  const fallback = path.join(publicPath, 'feed-default.png')

  if (fs.existsSync(specific)) {
    return `https://wellknownmcp.org/og/feed-${feedType}.png`
  }

  if (fs.existsSync(fallback)) {
    return `https://wellknownmcp.org/og/feed-default.png`
  }

  return ''
}
