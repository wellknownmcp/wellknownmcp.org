import Link from 'next/link'

interface NewsCardProps {
  slug: string
  title: string
  date: string
  description?: string
  lang?: string
  tags?: string[]
}

export function NewsCard({
  slug,
  title,
  date,
  description,
  lang = 'en',
  tags = []
}: NewsCardProps) {
  return (
    <Link href={`/news/${lang}/${slug}`} className="block rounded-2xl p-4 border shadow hover:shadow-lg transition bg-white dark:bg-muted">
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{date}</span>
        <div className="flex flex-wrap gap-1">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded bg-secondary">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
