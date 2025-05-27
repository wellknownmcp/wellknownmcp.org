import Link from 'next/link'

interface FeedCardProps {
  title: string
  description?: string
  href: string
  tags?: string[]
  lang?: string
  feedType?: string
}

export function FeedCard({
  title,
  description,
  href,
  tags = [],
  lang = 'en',
  feedType = 'unknown'
}: FeedCardProps) {
  return (
    <Link href={href} className="block rounded-2xl p-4 shadow hover:shadow-lg border transition bg-white dark:bg-muted">
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{description}</p>
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="px-2 py-0.5 rounded-full bg-accent">{feedType}</span>
        <span className="px-2 py-0.5 rounded-full bg-accent">{lang}</span>
        {tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded-full bg-secondary">{tag}</span>
        ))}
      </div>
    </Link>
  )
}
