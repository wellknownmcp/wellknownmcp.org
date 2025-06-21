import { Globe, Tag, FileText, Search, AlertTriangle } from 'lucide-react';
import { SitemapHeuristicSimulator } from '@/components/SitemapHeuristicSimulator';

export function AgentFallbackSummary({ fallback }: { fallback: any }) {
  const hasContent = fallback.contentFound;
  const metaCount = Object.keys(fallback.meta || {}).length;
  const keywordCount = fallback.keywords?.length || 0;
  const hasSitemap = fallback.sitemap && Array.isArray(fallback.sitemap) && fallback.sitemap.length > 0;

  return (
    <div className="space-y-4">
      {/* Status indicator */}
      <div className={`border rounded-lg p-3 ${
        hasContent ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <Globe className={`w-4 h-4 ${hasContent ? 'text-blue-600' : 'text-gray-400'}`} />
          <span className={`font-medium ${hasContent ? 'text-blue-800' : 'text-gray-600'}`}>
            {hasContent ? 'Content Accessible' : 'Limited Access'}
          </span>
        </div>
        {!hasContent && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <AlertTriangle className="w-3 h-3" />
            <span>Site may block automated access or have CORS restrictions</span>
          </div>
        )}
      </div>

      {/* Page Title */}
      {fallback.title && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-800">Page Title</span>
          </div>
          <div className="text-sm text-gray-700 font-medium">
            {fallback.title}
          </div>
        </div>
      )}

      {/* Description */}
      {fallback.description && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-800">Description</span>
          </div>
          <div className="text-sm text-blue-700">
            {fallback.description}
          </div>
        </div>
      )}

      {/* Meta Tags */}
      {metaCount > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-green-600" />
            <span className="font-medium text-green-800">
              {metaCount} Meta Tag{metaCount !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="space-y-1">
            {Object.entries(fallback.meta).slice(0, 5).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="font-mono text-green-700 text-xs bg-green-100 px-1 rounded">
                  {key}
                </span>
                <span className="text-green-600 ml-2 text-xs">
                  {String(value).length > 60 
                    ? String(value).substring(0, 60) + '...' 
                    : String(value)
                  }
                </span>
              </div>
            ))}
            {metaCount > 5 && (
              <div className="text-xs text-green-600">
                +{metaCount - 5} more meta tags
              </div>
            )}
          </div>
        </div>
      )}

      {/* Keywords */}
      {keywordCount > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-4 h-4 text-yellow-600" />
            <span className="font-medium text-yellow-800">
              {keywordCount} Keyword{keywordCount !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {fallback.keywords.slice(0, 10).map((keyword: string, i: number) => (
              <span 
                key={i} 
                className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded"
              >
                {keyword}
              </span>
            ))}
            {keywordCount > 10 && (
              <span className="text-xs text-yellow-600 px-2 py-1">
                +{keywordCount - 10} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Sitemap */}
      {hasSitemap && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-purple-600" />
            <span className="font-medium text-purple-800">
              Sitemap Found ({fallback.sitemap.length} entries)
            </span>
          </div>
          <SitemapHeuristicSimulator sitemap={fallback.sitemap} />
        </div>
      )}

      {/* Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-gray-700">{metaCount}</div>
            <div className="text-xs text-gray-500">Meta Tags</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-700">{keywordCount}</div>
            <div className="text-xs text-gray-500">Keywords</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-700">
              {hasSitemap ? fallback.sitemap.length : 0}
            </div>
            <div className="text-xs text-gray-500">Sitemap</div>
          </div>
        </div>
      </div>

      {/* Limitations notice */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
        <div className="text-xs text-orange-700">
          <strong>⚠️ Traditional Analysis Limitations:</strong>
          <ul className="mt-1 space-y-1 ml-4 list-disc">
            <li>Cannot understand site capabilities or available actions</li>
            <li>No structured data about prompts or agent interactions</li>
            <li>Limited to basic metadata and content scanning</li>
            <li>No trust verification or cryptographic signatures</li>
          </ul>
        </div>
      </div>
    </div>
  );
}