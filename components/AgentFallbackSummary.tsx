export function AgentFallbackSummary({ fallback }: { fallback: any }) {
  return (
    <div className="text-sm space-y-2 text-muted-foreground">
      <p>
        <strong>Detected title:</strong> {fallback.title}
      </p>
      <p>
        <strong>Found sitemap:</strong> {fallback.sitemap || 'None'}
      </p>
      {fallback.meta && (
        <div>
          <p className="font-semibold">Meta:</p>
          <ul className="list-disc ml-5">
            {Object.entries(fallback.meta).map(([key, value]) => (
              <li key={key}>
                <code>{key}</code>: {String(value)}
              </li>
            ))}
          </ul>
        </div>
      )}
      {fallback.keywords?.length > 0 && (
        <p>
          <strong>Keywords:</strong> {fallback.keywords.join(', ')}
        </p>
      )}
    </div>
  )
}
