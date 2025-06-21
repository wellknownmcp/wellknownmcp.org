'use client';

import { useEffect, useState } from "react";
import { analyzeSite, getFeedScore, getFallbackScore, getAnalysisComparison } from "@/lib/agent/agent-insight";
import { AgentFeedSummary } from "@/components/AgentFeedSummary";
import { AgentFallbackSummary } from "@/components/AgentFallbackSummary";
import { AlertCircle, CheckCircle, Clock, Zap } from "lucide-react";

interface AnalysisState {
  feedData: any | null;
  fallbackData: any | null;
  loading: boolean;
  error: string | null;
  analyzedUrl: string | null;
  fromCache: boolean;
}

export function AgentSimulatorUniversal({ url }: { url: string }) {
  const [state, setState] = useState<AnalysisState>({
    feedData: null,
    fallbackData: null,
    loading: false,
    error: null,
    analyzedUrl: null,
    fromCache: false
  });

  // Ignore direct .json file URLs
  if (!url.startsWith("http") || url.endsWith(".json")) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <div className="flex items-center gap-2 text-yellow-800">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">Invalid URL Format</span>
        </div>
        <p className="text-sm text-yellow-700 mt-1">
          This tool only works with domain-level URLs.<br />
          Please enter something like <code className="bg-yellow-100 px-1 rounded">https://example.org</code>, not a direct file.
        </p>
      </div>
    );
  }

  useEffect(() => {
    async function performAnalysis() {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const startTime = Date.now();
        const result = await analyzeSite(url);
        const duration = Date.now() - startTime;
        
        setState({
          feedData: result.feedData,
          fallbackData: result.fallbackData,
          loading: false,
          error: null,
          analyzedUrl: result.analyzedUrl,
          fromCache: duration < 100 // Probablement du cache si très rapide
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Analysis failed'
        }));
      }
    }

    performAnalysis();
  }, [url]);

  // Loading state
  if (state.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Analyzing {url}...</p>
          <p className="text-xs text-muted-foreground mt-1">
            Checking MCP feeds and traditional metadata
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
        <div className="flex items-center gap-2 text-red-800">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">Analysis Failed</span>
        </div>
        <p className="text-sm text-red-700 mt-1">{state.error}</p>
        <p className="text-xs text-red-600 mt-2">
          This might be due to CORS restrictions, server issues, or network problems.
        </p>
      </div>
    );
  }

  // Calcul des scores et comparaison
  const comparison = getAnalysisComparison(state.feedData, state.fallbackData);
  const feedScore = getFeedScore(state.feedData);
  const fallbackScore = getFallbackScore(state.fallbackData);

  return (
    <div className="space-y-6 mt-6">
      {/* Header avec scores */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium">Analysis Complete</span>
            {state.fromCache && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Cached
              </span>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {state.analyzedUrl}
          </div>
        </div>
        
        {/* Score comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{feedScore}%</div>
            <div className="text-sm text-muted-foreground">MCP Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{fallbackScore}%</div>
            <div className="text-sm text-muted-foreground">Traditional Score</div>
          </div>
        </div>
        
        {comparison.improvement > 0 && (
          <div className="bg-green-50 border border-green-200 rounded p-3 mt-3">
            <div className="flex items-center gap-2 text-green-800 text-sm">
              <Zap className="w-4 h-4" />
              <span className="font-medium">
                +{comparison.improvement}% improvement with MCP
              </span>
            </div>
            <p className="text-green-700 text-xs mt-1">{comparison.recommendation}</p>
          </div>
        )}
      </div>

      {/* Résultats en colonnes */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Colonne MCP */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">🌐 Agent View via MCP</h2>
            <span className={`text-sm px-2 py-1 rounded-full ${
              state.feedData && state.feedData.feedsFound?.length > 0
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {state.feedData?.feedsFound?.length || 0} feeds found
            </span>
          </div>
          
          {state.feedData && state.feedData.feedsFound?.length > 0 ? (
            <AgentFeedSummary insight={state.feedData} />
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">
                No .well-known MCP data found.
              </p>
              <p className="text-xs text-muted-foreground">
                This site doesn't implement MCP feeds yet. Consider implementing:
              </p>
              <ul className="text-xs text-muted-foreground mt-1 ml-4 list-disc">
                <li>/.well-known/mcp.llmfeed.json</li>
                <li>/.well-known/capabilities.llmfeed.json</li>
              </ul>
            </div>
          )}
        </div>

        {/* Colonne Traditional */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">🧠 Traditional Web Scan</h2>
            <span className={`text-sm px-2 py-1 rounded-full ${
              state.fallbackData && state.fallbackData.contentFound
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {state.fallbackData?.contentFound ? 'Content found' : 'Limited data'}
            </span>
          </div>
          
          {state.fallbackData ? (
            <AgentFallbackSummary fallback={state.fallbackData} />
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                No traditional metadata found.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer avec recommendations */}
      {(!state.feedData || state.feedData.feedsFound?.length === 0) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">💡 Recommendations</h3>
          <p className="text-sm text-blue-800 mb-3">
            This site could benefit from implementing MCP feeds to provide structured, agent-readable data.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/tools/well-known"
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              🛠️ Build MCP Feeds
            </a>
            <a
              href="/train"
              className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors"
            >
              🧠 Train AI Assistant
            </a>
            <a
              href="/spec"
              className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
            >
              📚 Read Specification
            </a>
          </div>
        </div>
      )}
    </div>
  );
}