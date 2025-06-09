import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: string
  language?: string
  className?: string
}

export function CodeBlock({
  children,
  language = 'json',
  className,
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        'relative bg-gray-950 text-gray-100 rounded-lg overflow-hidden border',
        className
      )}
    >
      {language && (
        <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-800 bg-gray-900 font-mono">
          {language}
        </div>
      )}
      <pre className="p-6 overflow-x-auto">
        <code className="text-sm font-mono text-green-400 whitespace-pre-wrap">
          {children}
        </code>
      </pre>
    </div>
  )
}
