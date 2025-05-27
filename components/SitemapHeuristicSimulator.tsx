export function SitemapHeuristicSimulator({ sitemap }: { sitemap: any[] }) {
  if (!Array.isArray(sitemap) || sitemap.length === 0) {
    return <p className="text-sm text-muted-foreground">No sitemap entries found.</p>;
  }

  return (
    <div className="mt-4 border rounded bg-muted/40 p-4 text-sm space-y-2 max-h-96 overflow-y-auto">
      <p className="font-semibold">🗺️ Sitemap Pages:</p>
      <ul className="list-disc ml-5 space-y-1">
        {sitemap.map((entry, index) => (
          <li key={index}>
            <a href={entry.loc} className="underline" target="_blank" rel="noopener noreferrer">
              {entry.loc}
            </a>
            {entry.changefreq && (
              <span className="ml-2 text-muted-foreground">({entry.changefreq})</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
