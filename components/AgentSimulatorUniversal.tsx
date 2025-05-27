'use client';

import { useEffect, useState } from "react";
import { getAgentInsightFromFeeds, simulateFallbackAnalysis } from "@/lib/agent/agent-insight";
import { AgentFeedSummary } from "@/components/AgentFeedSummary";
import { AgentFallbackSummary } from "@/components/AgentFallbackSummary";

export function AgentSimulatorUniversal({ url }: { url: string }) {
  const [withFeeds, setWithFeeds] = useState<any | null>(null);
  const [withoutFeeds, setWithoutFeeds] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Ignore direct .json file URLs
  if (!url.startsWith("http") || url.endsWith(".json")) {
    return (
      <p className="text-sm text-muted-foreground mt-6">
        This tool only works with domain-level URLs.<br />
        Please enter something like <code>https://example.org</code>, not a direct file.
      </p>
    );
  }

  useEffect(() => {
    async function fetchAndCompare() {
      setLoading(true);
      try {
        const feedData = await getAgentInsightFromFeeds(url);
        const fallback = await simulateFallbackAnalysis(url);
        setWithFeeds(feedData);
        setWithoutFeeds(fallback);
      } catch (err) {
        console.warn("Agent analysis failed:", err);
      }
      setLoading(false);
    }
    fetchAndCompare();
  }, [url]);

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">🌐 Agent View via MCP</h2>
        {loading && <p className="text-muted-foreground text-sm">Reading feeds...</p>}
        {withFeeds ? (
          <AgentFeedSummary insight={withFeeds} />
        ) : (
          <p className="text-sm text-muted-foreground">No .well-known data found.</p>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">🧠 Heuristic Web Scan (Fallback)</h2>
        {loading && <p className="text-muted-foreground text-sm">Analyzing content...</p>}
        {withoutFeeds ? (
          <AgentFallbackSummary fallback={withoutFeeds} />
        ) : (
          <p className="text-sm text-muted-foreground">No usable metadata found.</p>
        )}
      </div>
    </div>
  );
}
