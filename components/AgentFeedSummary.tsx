export function AgentFeedSummary({ insight }: { insight: any }) {
  return (
    <div className="text-sm space-y-2 text-muted-foreground">
      <p><strong>Origin:</strong> {insight.origin}</p>
      {insight.prompts?.length > 0 && (
        <div>
          <p className="font-semibold">🧠 Prompts detected:</p>
          <ul className="list-disc ml-5">
            {insight.prompts.map((p: any, i: number) => (
              <li key={i}>{p.intent} — <em>{p.description}</em></li>
            ))}
          </ul>
        </div>
      )}
      {insight.capabilities?.length > 0 && (
        <div>
          <p className="font-semibold">⚙️ Capabilities:</p>
          <ul className="list-disc ml-5">
            {insight.capabilities.map((c: any, i: number) => (
              <li key={i}>{c.type} → {c.url}</li>
            ))}
          </ul>
        </div>
      )}
      {insight.trust && (
        <p><strong>🔒 Trust:</strong> {insight.trust.trust_level}</p>
      )}
    </div>
  );
}
