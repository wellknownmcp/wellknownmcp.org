// app/analytics/page.tsx — Analytics Page
import { AgentAnalyticsDashboard } from '@/components/AgentAnalyticsDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agent Analytics - WellKnownMCP',
  description: 'Monitor AI agent interactions with LLMFeed endpoints and analyze usage patterns',
  keywords: ['agent analytics', 'llmfeed', 'mcp', 'ai analytics', 'agent monitoring'],
  openGraph: {
    title: 'Agent Analytics Dashboard',
    description: 'Real-time analytics for AI agent interactions with LLMFeed endpoints',
    type: 'website',
  },
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              🤖 Agent Analytics
            </h1>
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Live
            </div>
          </div>
          
          <p className="text-lg text-gray-600 mb-4">
            Monitor how AI agents interact with your LLMFeed endpoints
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-green-500">●</span>
              Real-time agent detection
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-blue-500">●</span>
              Feed usage analytics
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-purple-500">●</span>
              Privacy-first logging
            </div>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                🚀 Monitoring Active
              </h2>
              <p className="text-blue-100">
                Tracking agent interactions across all .llmfeed.json endpoints
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-200">Data Source</div>
              <div className="font-mono text-lg">data/agent-logs.jsonl</div>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <AgentAnalyticsDashboard />

        {/* Footer Info */}
        <div className="mt-12 border-t pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                🔐 Privacy & Security
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  IP addresses are hashed with secure salt
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  No personal data stored or transmitted
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  GDPR compliant analytics approach
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Session IDs for unique visitor counting
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                📊 What We Track
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">●</span>
                  Agent type detection (Claude, GPT, curl, etc.)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">●</span>
                  Feed access patterns and popularity
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">●</span>
                  Geographic distribution (country level)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">●</span>
                  Temporal usage patterns and trends
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-yellow-500 text-xl">💡</span>
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">
                  Analytics Setup
                </h4>
                <p className="text-sm text-yellow-700">
                  Analytics are automatically enabled when agents access your .llmfeed.json files. 
                  Make sure your <code className="bg-yellow-200 px-1 rounded">ANALYTICS_SALT</code> environment 
                  variable is set for secure IP hashing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}