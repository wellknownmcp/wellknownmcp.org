'use client';

import { useState } from 'react';
import { AgentSimulatorUniversal } from './AgentSimulatorUniversal';
import { Search, Globe, Zap } from 'lucide-react';

const EXAMPLE_SITES = [
  {
    name: "WellKnownMCP (Full LLMfeed MCP)",
    url: "https://wellknownmcp.org",
    description: "Complete llmfeed mcp implementation",
    category: "mcp"
  },
  {
    name: "OpenAI (Traditional)",
    url: "https://openai.com", 
    description: "Major tech site without llmfeed",
    category: "traditional"
  },
  {
    name: "Anthropic (Traditional)",
    url: "https://anthropic.com",
    description: "AI company with traditional metadata",
    category: "traditional"
  },
  {
    name: "GitHub (Traditional)",
    url: "https://github.com",
    description: "Developer platform",
    category: "traditional"
  }
];

export function AgentSiteInspector() {
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.startsWith('http')) {
      setSubmitted(url);
    }
  };

  const analyzeExample = (exampleUrl: string) => {
    setUrl(exampleUrl);
    setSubmitted(exampleUrl);
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-900">Agent Insight Comparison</span>
        </div>
        <p className="text-sm text-blue-800">
          Compare what AI agents can understand from any website with MCP feeds vs traditional metadata extraction.
        </p>
      </div>

      {/* URL Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Enter a website URL to analyze:
          </label>
          <div className="flex gap-3">
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Search className="w-4 h-4" />
              Analyze
            </button>
          </div>
        </div>
      </form>

      {/* Example Sites */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-900">Try These Examples</span>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {EXAMPLE_SITES.map((site, index) => (
            <button
              key={index}
              onClick={() => analyzeExample(site.url)}
              className={`text-left p-3 rounded-lg border transition-all hover:shadow-md ${
                site.category === 'mcp' 
                  ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900 text-sm">{site.name}</div>
                {site.category === 'mcp' && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    MCP
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-600 mb-1">{site.description}</div>
              <div className="text-xs font-mono text-gray-500 truncate">{site.url}</div>
            </button>
          ))}
        </div>
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
          💡 <strong>Pro Tip:</strong> Compare WellKnownMCP (with MCP) vs OpenAI (without MCP) to see the dramatic difference!
        </div>
      </div>

      {/* Results */}
      {submitted && (
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Analysis Results</h3>
            <p className="text-sm text-gray-600">
              Analyzing: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{submitted}</code>
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800">
              <strong>Left column:</strong> MCP feeds (structured, actionable data) • 
              <strong>Right column:</strong> Traditional web scraping (basic metadata only)
            </p>
          </div>
          
          <AgentSimulatorUniversal url={submitted} />
        </div>
      )}

      {/* Action CTA après analyse */}
      {submitted && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-900 mb-2">🚀 Ready to Implement MCP?</h3>
          <p className="text-sm text-purple-800 mb-3">
            Transform your website into an agent-friendly resource with structured feeds.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/train"
              className="bg-yellow-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-yellow-700 transition-colors"
            >
              🧠 Train AI First
            </a>
            <a
              href="/tools/well-known"
              className="bg-purple-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              🛠️ Build Feeds
            </a>
            <a
              href="/spec"
              className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              📚 Read Spec
            </a>
          </div>
        </div>
      )}
    </div>
  );
}