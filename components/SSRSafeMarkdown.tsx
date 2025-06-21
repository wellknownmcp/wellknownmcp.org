// components/SSRSafeMarkdown.tsx
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ExternalLink, ImageIcon, Download } from 'lucide-react'

interface SSRSafeMarkdownProps {
  content: string
  className?: string
  dir?: 'ltr' | 'rtl'
  lang?: string
}

// Composants sécurisés pour SSR - pas de useState/useEffect
const SafeComponents = {
  // Image sécurisée sans useState
  img: ({ src, alt, ...props }: any) => {
    if (!src) {
      return (
        <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded border-2 border-dashed border-gray-300 dark:border-gray-600">
          <ImageIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">{alt || 'Image unavailable'}</span>
        </div>
      )
    }
    
    return (
      <img
        {...props}
        src={src}
        alt={alt || 'Article image'}
        className="max-w-full h-auto rounded-lg shadow-sm"
        loading="lazy"
        onError={(e) => {
          // Fallback simple sans useState
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          const fallback = document.createElement('div')
          fallback.className = 'flex items-center gap-2 p-3 bg-gray-100 rounded border-2 border-dashed'
          fallback.innerHTML = `<span class="text-sm text-gray-500">${alt || 'Image failed to load'}</span>`
          target.parentNode?.insertBefore(fallback, target)
        }}
      />
    )
  },

  // Liens sécurisés
  a: ({ href, children, ...props }: any) => {
    if (!href) {
      return <span className="text-blue-600 dark:text-blue-400">{children}</span>
    }

    const isExternal = href.startsWith('http')
    const isWellKnown = href.startsWith('/.well-known/')
    const isDownload = href.includes('download') || href.includes('.md') || href.includes('.json')
    
    return (
      <a
        {...props}
        href={href}
        className={`inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline transition-colors ${
          isWellKnown ? 'font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded' : ''
        }`}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
        {isExternal && <ExternalLink className="w-3 h-3 ml-1" />}
        {isDownload && <Download className="w-3 h-3 ml-1" />}
      </a>
    )
  },

  // Code blocks sécurisés
  code: ({ inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : ''

    if (inline) {
      return (
        <code 
          className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-gray-900 dark:text-gray-100" 
          {...props}
        >
          {children}
        </code>
      )
    }

    return (
      <div className="relative my-4">
        {language && (
          <div className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
            {language}
          </div>
        )}
        <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-200 dark:border-gray-700">
          <code className="font-mono text-sm text-gray-900 dark:text-gray-100" {...props}>
            {children}
          </code>
        </pre>
      </div>
    )
  },

  // Blockquotes sécurisés
  blockquote: ({ children, ...props }: any) => (
    <blockquote 
      className="border-l-4 border-blue-200 dark:border-blue-800 pl-4 my-4 italic text-gray-700 dark:text-gray-300 bg-blue-50/50 dark:bg-blue-900/10 py-2 rounded-r" 
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Tables sécurisées
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden" {...props}>
        {children}
      </table>
    </div>
  ),
  
  th: ({ children, ...props }: any) => (
    <th className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </th>
  ),
  
  td: ({ children, ...props }: any) => (
    <td className="border-b border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </td>
  ),

  // Headings avec meilleur styling
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl font-bold mb-4 mt-8 text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl font-semibold mb-3 mt-6 text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </h3>
  ),
}

export default function SSRSafeMarkdown({
  content,
  className = "prose dark:prose-invert max-w-none",
  dir = 'ltr',
  lang = 'en'
}: SSRSafeMarkdownProps) {
  // Pre-processing simple pour éviter les erreurs communes
  const processedContent = content
    ?.replace(/â€™/g, "'")
    ?.replace(/â€œ/g, '"')
    ?.replace(/â€/g, '"')
    ?.replace(/â€¦/g, '…')
    ?.replace(/\[([^\]]+)\]\(\s*\)/g, '[$1](#)') // Fix empty links
    ?.replace(/!\[\]\(/g, '![Image](') // Fix empty alt text
    || ''

  // Fallback en cas d'erreur de rendu
  try {
    return (
      <div className={className} dir={dir} lang={lang}>
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={SafeComponents}
          skipHtml={false}
        >
          {processedContent}
        </Markdown>
      </div>
    )
  } catch (error) {
    console.warn('Markdown rendering failed, showing plain text:', error)
    
    // Fallback gracieux en texte brut avec styling
    return (
      <div className={className} dir={dir} lang={lang}>
        <div className="border border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-600 dark:text-orange-400">⚠️</span>
            <h3 className="font-semibold text-orange-800 dark:text-orange-200">Markdown Rendering Issue</h3>
          </div>
          <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
            Content displayed as plain text due to formatting issues:
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
          <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100 leading-relaxed">{content}</pre>
        </div>
      </div>
    )
  }
}