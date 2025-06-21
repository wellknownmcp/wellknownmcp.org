// utils/parseMarkdownSSR.ts - Version corrigée sans options problématiques
import { marked } from 'marked'
import { Tokens } from 'marked'
import path from 'path'

const siteUrl = 'https://wellknownmcp.org'

export function parseMarkdownSSR(content: string, slug: string): string {
  // Helper function pour résoudre les slugs
  const resolveSpecSlug = (baseSlug: string, relatedPath: string): string => {
    const baseDir = path.posix.dirname(baseSlug)
    const resolved = path.posix.normalize(path.posix.join(baseDir, relatedPath))
    return resolved
  }

  // Configuration simplifiée et compatible
  marked.use({
    renderer: {
      // Liens sécurisés
      link(token: Tokens.Link): string {
        try {
          const href = token.href
          const title = token.title
          const text = token.text

          // Protection contre les liens malformés
          if (!href) {
            return `<span class="text-blue-600 dark:text-blue-400">${text || 'Link'}</span>`
          }

          // Liens externes
          if (href.startsWith('http://') || href.startsWith('https://')) {
            return `<a href="${href}" ${
              title ? `title="${title}"` : ''
            } target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline transition-colors">${text} <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>`
          }

          // Liens relatifs vers des .md
          if (href.endsWith('.md')) {
            const resolvedSlug = resolveSpecSlug(slug, href.replace('.md', ''))
            const finalHref = `/spec/${resolvedSlug}`

            return `<a href="${finalHref}" ${
              title ? `title="${title}"` : ''
            } class="text-blue-600 dark:text-blue-400 hover:underline transition-colors">${text}</a>`
          }

          // Liens absolus vers le site
          const absolutePrefixes = ['/tools', '/verify', '/faq', '/feeds', '/en', '/join']
          const shouldRewrite = absolutePrefixes.some((prefix) => href.startsWith(prefix))
          
          let finalHref = href
          if (shouldRewrite && href) {
            finalHref = `${siteUrl}${href}`
          }

          return `<a href="${finalHref}" ${
            title ? `title="${title}"` : ''
          } class="text-blue-600 dark:text-blue-400 hover:underline transition-colors">${text}</a>`
        } catch (error) {
          console.warn('Link rendering error:', error)
          return `<span class="text-blue-600 dark:text-blue-400">${token.text || 'Link'}</span>`
        }
      },

      // Images sécurisées
      image(token: Tokens.Image): string {
        try {
          const src = token.href
          const alt = token.text
          const title = token.title

          if (!src) {
            return `<div class="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded border-2 border-dashed border-gray-300 dark:border-gray-600"><span class="text-sm text-gray-500 dark:text-gray-400">${alt || 'Image'}</span></div>`
          }

          return `<img src="${src}" alt="${alt || 'Image'}" ${
            title ? `title="${title}"` : ''
          } class="max-w-full h-auto rounded-lg shadow-sm" loading="lazy" />`
        } catch (error) {
          console.warn('Image rendering error:', error)
          return `<div class="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded border-2 border-dashed border-gray-300 dark:border-gray-600"><span class="text-sm text-gray-500 dark:text-gray-400">${token.text || 'Image'}</span></div>`
        }
      },

      // Code blocks avec styling
      code(token: Tokens.Code): string {
        try {
          const lang = token.lang || ''
          const code = token.text || ''
          
          // Escape HTML dans le code
          const escapedCode = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')

          return `
            <div class="relative my-4">
              ${lang ? `<div class="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">${lang}</div>` : ''}
              <pre class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-200 dark:border-gray-700"><code class="font-mono text-sm text-gray-900 dark:text-gray-100">${escapedCode}</code></pre>
            </div>
          `
        } catch (error) {
          console.warn('Code rendering error:', error)
          return `<pre class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-200 dark:border-gray-700"><code class="font-mono text-sm text-gray-900 dark:text-gray-100">${token.text || ''}</code></pre>`
        }
      },

      // Code inline
      codespan(token: Tokens.Codespan): string {
        const code = token.text || ''
        const escapedCode = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
        
        return `<code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-gray-900 dark:text-gray-100">${escapedCode}</code>`
      },

      // Blockquotes
      blockquote(token: Tokens.Blockquote): string {
        return `<blockquote class="border-l-4 border-blue-200 dark:border-blue-800 pl-4 my-4 italic text-gray-700 dark:text-gray-300 bg-blue-50/50 dark:bg-blue-900/10 py-2 rounded-r">${token.text}</blockquote>`
      },

      // Tables
      table(token: Tokens.Table): string {
        let header = ''
        let body = ''

        if (token.header && token.header.length > 0) {
          header = '<thead><tr>' + 
            token.header.map(cell => `<th class="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">${cell.text}</th>`).join('') + 
            '</tr></thead>'
        }

        if (token.rows && token.rows.length > 0) {
          body = '<tbody>' + 
            token.rows.map(row => 
              '<tr>' + 
              row.map(cell => `<td class="border-b border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">${cell.text}</td>`).join('') + 
              '</tr>'
            ).join('') + 
            '</tbody>'
        }

        return `<div class="overflow-x-auto my-4"><table class="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">${header}${body}</table></div>`
      },

      // Headings avec meilleur styling
      heading(token: Tokens.Heading): string {
        const level = token.depth
        const text = token.text
        const baseClasses = "font-semibold text-gray-900 dark:text-gray-100"
        
        const levelClasses = {
          1: "text-3xl mb-4 mt-8",
          2: "text-2xl mb-3 mt-6", 
          3: "text-xl mb-2 mt-4",
          4: "text-lg mb-2 mt-3",
          5: "text-base mb-1 mt-2",
          6: "text-sm mb-1 mt-2"
        }

        const className = `${baseClasses} ${levelClasses[level as keyof typeof levelClasses] || levelClasses[3]}`
        
        return `<h${level} class="${className}">${text}</h${level}>`
      }
    }
  })

  try {
    // Pre-processing pour éviter les erreurs communes
    const processedContent = content
      ?.replace(/â€™/g, "'")
      ?.replace(/â€œ/g, '"')
      ?.replace(/â€/g, '"')
      ?.replace(/â€¦/g, '…')
      ?.replace(/\[([^\]]+)\]\(\s*\)/g, '[$1](#)') // Fix empty links
      ?.replace(/!\[\]\(/g, '![Image](') // Fix empty alt text
      || ''

    // Parse avec marked - options directement dans parse
    const parsed = marked.parse(processedContent, {
      breaks: true,
      gfm: true
    })
    
    return typeof parsed === 'string' ? parsed : ''
    
  } catch (error) {
    console.error('SSR Markdown parsing error:', error)
    
    // Fallback sécurisé en cas d'erreur
    const escapedContent = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    
    return `
      <div class="border border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800 rounded-lg p-4 mb-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-orange-600 dark:text-orange-400">⚠️</span>
          <h3 class="font-semibold text-orange-800 dark:text-orange-200">Markdown Parsing Error</h3>
        </div>
        <p class="text-sm text-orange-700 dark:text-orange-300 mb-3">
          Content displayed as plain text due to parsing issues.
        </p>
        <pre class="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100 leading-relaxed bg-white dark:bg-gray-900 p-3 rounded border">${escapedContent}</pre>
      </div>
    `
  }
}