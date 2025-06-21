import { Shield, Brain, Settings, FileText, Clock } from 'lucide-react';

export function AgentFeedSummary({ insight }: { insight: any }) {
  return (
    <div className="space-y-4">
      {/* Feeds trouvés */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-green-600" />
          <span className="font-medium text-green-800">
            {insight.feedsFound?.length || 0} MCP Feed{insight.feedsFound?.length !== 1 ? 's' : ''} Found
          </span>
        </div>
        {insight.feedsFound?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {insight.feedsFound.map((feed: string, i: number) => (
              <span 
                key={i} 
                className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-mono"
              >
                {feed}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Informations de base */}
      <div className="text-sm space-y-3">
        <div>
          <span className="font-medium text-gray-700">Origin:</span>
          <span className="ml-2 text-gray-600 font-mono text-xs">{insight.origin}</span>
        </div>

        {insight.feed_type && (
          <div>
            <span className="font-medium text-gray-700">Feed Type:</span>
            <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
              {insight.feed_type}
            </span>
          </div>
        )}

        {insight.llm_intent && (
          <div>
            <span className="font-medium text-gray-700">LLM Intent:</span>
            <span className="ml-2 text-gray-600">{insight.llm_intent}</span>
          </div>
        )}
      </div>

      {/* Prompts détectés */}
      {insight.prompts?.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-800">
              {insight.prompts.length} Prompt{insight.prompts.length !== 1 ? 's' : ''} Available
            </span>
          </div>
          <div className="space-y-2">
            {insight.prompts.slice(0, 3).map((p: any, i: number) => (
              <div key={i} className="bg-blue-100 rounded p-2 text-sm">
                <div className="font-medium text-blue-800">{p.intent || 'Untitled'}</div>
                {p.description && (
                  <div className="text-blue-700 text-xs mt-1">{p.description}</div>
                )}
              </div>
            ))}
            {insight.prompts.length > 3 && (
              <div className="text-xs text-blue-600">
                +{insight.prompts.length - 3} more prompts available
              </div>
            )}
          </div>
        </div>
      )}

      {/* Capabilities */}
      {insight.capabilities?.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-4 h-4 text-purple-600" />
            <span className="font-medium text-purple-800">
              {insight.capabilities.length} Capabilit{insight.capabilities.length !== 1 ? 'ies' : 'y'}
            </span>
          </div>
          <div className="space-y-1">
            {insight.capabilities.slice(0, 5).map((c: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-purple-700 font-medium">
                  {c.type || c.name || 'Unknown'}
                </span>
                {c.url && (
                  <code className="text-purple-600 text-xs bg-purple-100 px-1 rounded">
                    {c.url.split('/').pop()}
                  </code>
                )}
              </div>
            ))}
            {insight.capabilities.length > 5 && (
              <div className="text-xs text-purple-600">
                +{insight.capabilities.length - 5} more capabilities
              </div>
            )}
          </div>
        </div>
      )}

      {/* Trust & Security */}
      {insight.trust && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-amber-600" />
            <span className="font-medium text-amber-800">Trust & Security</span>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-amber-700">Trust Level:</span>
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                {insight.trust.trust_level}
              </span>
            </div>
            {insight.signature && (
              <div className="text-xs text-amber-600 mt-1">
                ✓ Cryptographically signed content
              </div>
            )}
          </div>
        </div>
      )}

      {/* Summary stats */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-800">Analysis Summary</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-700">
              {insight.feedsFound?.length || 0}
            </div>
            <div className="text-gray-500">Feeds</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-700">
              {(insight.prompts?.length || 0) + (insight.capabilities?.length || 0)}
            </div>
            <div className="text-gray-500">Features</div>
          </div>
        </div>
      </div>
    </div>
  );
}