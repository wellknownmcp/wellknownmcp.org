export function PromptBlock({ feed }: { feed: any }) {
  return (
    <div className="border rounded bg-muted p-4 text-sm space-y-2">
      <p><strong>🎯 Intent:</strong> {feed.intent || "n/a"}</p>
      {feed.description && <p><strong>📝 Description:</strong> {feed.description}</p>}
      {feed.trigger_targets?.length > 0 && (
        <p><strong>⚡ Trigger targets:</strong> {feed.trigger_targets.join(", ")}</p>
      )}
      {feed.audience?.length > 0 && (
        <p><strong>🎯 Audience:</strong> {feed.audience.join(", ")}</p>
      )}
      {feed.trust?.trust_level && (
        <p><strong>🔐 Trust level:</strong> {feed.trust.trust_level}</p>
      )}
    </div>
  );
}
