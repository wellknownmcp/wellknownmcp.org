import { ExternalLink, Clock, Zap } from 'lucide-react';

interface SitemapEntry {
  loc: string;
  changefreq?: string;
  lastmod?: string;
}

export function SitemapHeuristicSimulator({ sitemap }: { sitemap: SitemapEntry[] }) {
  if (!Array.isArray(sitemap) || sitemap.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center">
        <p className="text-sm text-muted-foreground">No sitemap entries found.</p>
        <p className="text-xs text-muted-foreground mt-1">
          Site may not have a sitemap.xml or it's not publicly accessible.
        </p>
      </div>
    );
  }

  // Analyse des fréquences de changement
  const frequencyStats = sitemap.reduce((acc, entry) => {
    const freq = entry.changefreq || 'unknown';
    acc[freq] = (acc[freq] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Groupement par domaines/chemins
  const pathGroups = sitemap.reduce((acc, entry) => {
    try {
      const url = new URL(entry.loc);
      const pathParts = url.pathname.split('/').filter(Boolean);
      const category = pathParts[0] || 'root';
      if (!acc[category]) acc[category] = [];
      acc[category].push(entry);
      return acc;
    } catch {
      if (!acc['invalid']) acc['invalid'] = [];
      acc['invalid'].push(entry);
      return acc;
    }
  }, {} as Record<string, SitemapEntry[]>);

  const displayLimit = 20;
  const showingCount = Math.min(sitemap.length, displayLimit);

  return (
    <div className="space-y-3">
      {/* Stats rapides */}
      <div className="flex flex-wrap gap-2 text-xs">
        <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
          {sitemap.length} total pages
        </div>
        {Object.entries(frequencyStats).map(([freq, count]) => (
          <div key={freq} className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {freq}: {count}
          </div>
        ))}
      </div>

      {/* Groupes de pages principales */}
      <div className="space-y-2">
        {Object.entries(pathGroups)
          .sort(([,a], [,b]) => b.length - a.length)
          .slice(0, 5)
          .map(([category, entries]) => (
          <div key={category} className="bg-white border border-purple-200 rounded p-2">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-purple-800 text-sm capitalize">
                {category === 'root' ? '🏠 Homepage' : `📁 /${category}`}
              </span>
              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                {entries.length} page{entries.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="text-xs text-purple-700">
              {entries.slice(0, 3).map((entry, i) => (
                <div key={i} className="truncate">
                  {entry.loc.replace(/^https?:\/\/[^\/]+/, '')}
                </div>
              ))}
              {entries.length > 3 && (
                <div className="text-purple-500">+{entries.length - 3} more...</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Liste détaillée (limitée) */}
      <div className="border rounded bg-white">
        <div className="p-2 border-b bg-purple-50">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-purple-800">
              📋 Page Entries (showing {showingCount} of {sitemap.length})
            </span>
            {sitemap.length > displayLimit && (
              <span className="text-xs text-purple-600">
                Limited display for performance
              </span>
            )}
          </div>
        </div>
        
        <div className="max-h-64 overflow-y-auto">
          <div className="space-y-1 p-2">
            {sitemap.slice(0, displayLimit).map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-xs hover:bg-gray-50 p-1 rounded">
                <div className="flex-1 min-w-0">
                  <a 
                    href={entry.loc} 
                    className="text-purple-600 hover:text-purple-800 hover:underline truncate block"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {entry.loc}
                  </a>
                </div>
                <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                  {entry.changefreq && (
                    <span className={`px-1 py-0.5 rounded text-xs ${
                      entry.changefreq === 'daily' ? 'bg-green-100 text-green-700' :
                      entry.changefreq === 'weekly' ? 'bg-blue-100 text-blue-700' :
                      entry.changefreq === 'monthly' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      {entry.changefreq}
                    </span>
                  )}
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note sur les limitations */}
      <div className="bg-orange-50 border border-orange-200 rounded p-2">
        <div className="flex items-center gap-2 text-orange-700 text-xs">
          <Zap className="w-3 h-3" />
          <span className="font-medium">Analysis Limitation:</span>
        </div>
        <p className="text-orange-600 text-xs mt-1">
          Agents must crawl each URL individually to understand content and capabilities. 
          MCP feeds provide structured understanding without crawling.
        </p>
      </div>
    </div>
  );
}