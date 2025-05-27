
import { Download, FileText, FileJson, FileDown } from "lucide-react"
import Link from "next/link"

export function ExportOptions({ slug }: { slug: string }) {
  const exportItems = [
    {
      href: `/exports/${slug}.llmfeed.json`,
      label: 'Export JSON',
      icon: <Download className="w-4 h-4 mr-2" />,
    },
    {
      href: `/exports/${slug}.md`,
      label: 'Export Markdown',
      icon: <FileText className="w-4 h-4 mr-2" />,
    },
    {
      href: `/exports/${slug}.pdf`,
      label: 'Export PDF',
      icon: <FileDown className="w-4 h-4 mr-2" />,
    },
    {
      href: `/llmfeedhub/${slug}`,
      label: 'Share',
      icon: <FileJson className="w-4 h-4 mr-2" />,
    },
  ]

  return (
    <div className="flex items-center gap-2">
      {exportItems.map(({ href, label, icon }) => (
        <Link
          key={label}
          href={href}
          className="text-sm flex items-center text-muted-foreground hover:text-foreground"
        >
          {icon}
          {label}
        </Link>
      ))}
    </div>
  )
}
