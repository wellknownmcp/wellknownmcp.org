'use client';

// components/AgentAnalyticsDashboard.tsx — React Dashboard Component
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface AgentEvent {
  timestamp: string;
  path: string;
  agent_type: string;
  confidence: number;
  user_agent: string;
  referer: string;
  country: string;
  ip_hash: string;
  session_id: string;
}

interface AnalyticsData {
  summary: {
    total_requests: number;
    unique_agents: number;
    top_agent_types: { type: string; count: number; percentage: number }[];
    popular_feeds: { path: string; requests: number; percentage: number }[];
    hourly_distribution: { hour: number; requests: number }[];
    daily_distribution: { date: string; requests: number }[];
    agent_confidence_scores: { type: string; avg_confidence: number; request_count: number }[];
    countries: { country: string; requests: number; percentage: number }[];
    well_known_vs_regular: { well_known: number; regular: number };
    recent_activity: AgentEvent[];
  };
  metadata?: {
    total_logs_available: number;
    filtered_logs: number;
    oldest_log: string;
    newest_log: string;
    generated_at: string;
  };
}

// Couleurs pour les graphiques
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0', '#87d068'];

export function AgentAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const url = selectedPeriod === 'all' 
        ? '/api/analytics/dashboard'
        : `/api/analytics/dashboard?days=${selectedPeriod}`;
        
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.error) {
        setError(result.error);
      } else {
        setData(result);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch analytics data');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg flex items-center gap-3">
          <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          🤖 Analyzing agent activity...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-2xl mb-4">📊 {error}</div>
        <p className="text-gray-600 mb-4">
          {error.includes('No analytics data') 
            ? 'Agent activity will appear here once feeds are accessed.'
            : 'There was an issue loading the analytics data.'
          }
        </p>
        <button 
          onClick={fetchAnalytics}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data?.summary) {
    return (
      <div className="text-center p-8">
        <div className="text-2xl mb-4">📊 No Analytics Data Yet</div>
        <p className="text-gray-600">
          Agent activity will appear here once feeds are accessed.
        </p>
      </div>
    );
  }

  const { summary, metadata } = data;

  return (
    <div className="space-y-8 p-6">
      {/* Header avec contrôles */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🤖 Agent Analytics Dashboard
          </h1>
          {metadata && (
            <p className="text-sm text-gray-600">
              Last updated: {new Date(metadata.generated_at).toLocaleString()}
              {metadata.filtered_logs !== metadata.total_logs_available && (
                <span className="ml-2">
                  (Showing {metadata.filtered_logs} of {metadata.total_logs_available} events)
                </span>
              )}
            </p>
          )}
        </div>
        
        <div className="flex gap-2">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value="all">All Time</option>
            <option value="1">Last 24 Hours</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
          </select>
          <button 
            onClick={fetchAnalytics}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Requests"
          value={summary.total_requests.toLocaleString()}
          icon="📈"
          color="bg-blue-50 border-blue-200"
        />
        <StatCard
          title="Unique Agents"
          value={summary.unique_agents.toLocaleString()}
          icon="🤖"
          color="bg-purple-50 border-purple-200"
        />
        <StatCard
          title="Feed Types"
          value={summary.popular_feeds.length.toString()}
          icon="📋"
          color="bg-green-50 border-green-200"
        />
        <StatCard
          title="Countries"
          value={summary.countries.length.toString()}
          icon="🌍"
          color="bg-orange-50 border-orange-200"
        />
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Agent Types */}
        <ChartCard title="🎯 Agent Types Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={summary.top_agent_types.slice(0, 6)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percentage }) => `${type} (${percentage}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {summary.top_agent_types.slice(0, 6).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Well-known vs Regular */}
        <ChartCard title="📁 Feed Access Pattern">
          <div className="flex items-center justify-center h-72">
            <div className="space-y-4 w-full">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded">
                <span className="font-medium">/.well-known/ feeds</span>
                <span className="text-xl font-bold text-blue-600">
                  {summary.well_known_vs_regular.well_known}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded">
                <span className="font-medium">Regular feeds</span>
                <span className="text-xl font-bold text-green-600">
                  {summary.well_known_vs_regular.regular}
                </span>
              </div>
              <div className="text-center text-sm text-gray-600">
                Total: {summary.well_known_vs_regular.well_known + summary.well_known_vs_regular.regular} requests
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Hourly Activity */}
      <ChartCard title="⏰ Hourly Activity Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summary.hourly_distribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="requests" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Daily Trend (si données disponibles) */}
      {summary.daily_distribution.length > 1 && (
        <ChartCard title="📈 Daily Activity Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={summary.daily_distribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {/* Tables de données */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Feeds */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            🔥 Most Accessed Feeds
          </h3>
          <div className="space-y-2">
            {summary.popular_feeds.slice(0, 8).map(({ path, requests, percentage }) => (
              <div key={path} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <code className="text-sm bg-gray-200 px-2 py-1 rounded flex-1 mr-4 truncate">
                  {path}
                </code>
                <div className="text-right">
                  <div className="text-sm font-medium">{requests}</div>
                  <div className="text-xs text-gray-600">{percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Confidence */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            🎯 Agent Detection Confidence
          </h3>
          <div className="space-y-2">
            {summary.agent_confidence_scores.slice(0, 8).map(({ type, avg_confidence, request_count }) => (
              <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium capitalize">{type}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${avg_confidence}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    {avg_confidence}%
                  </span>
                  <span className="text-xs text-gray-500 w-8">
                    ({request_count})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Countries */}
      {summary.countries.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            🌍 Geographic Distribution
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {summary.countries.slice(0, 8).map(({ country, requests, percentage }) => (
              <div key={country} className="text-center p-3 bg-gray-50 rounded">
                <div className="text-2xl mb-1">
                  {getCountryFlag(country)}
                </div>
                <div className="text-sm font-medium">{country}</div>
                <div className="text-xs text-gray-600">{requests} ({percentage}%)</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          🕐 Recent Activity
        </h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {summary.recent_activity.slice(0, 15).map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded text-sm">
              <div className="flex items-center gap-3">
                <span className="font-mono text-gray-500">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {event.agent_type}
                </span>
                <code className="text-xs bg-gray-200 px-1 rounded">
                  {event.path}
                </code>
              </div>
              <div className="text-xs text-gray-500">
                {event.country !== 'unknown' && `🌍 ${event.country}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: {
  title: string;
  value: string;
  icon: string;
  color: string;
}) {
  return (
    <div className={`border rounded-lg p-6 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function getCountryFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    'US': '🇺🇸',
    'FR': '🇫🇷',
    'DE': '🇩🇪',
    'GB': '🇬🇧',
    'CA': '🇨🇦',
    'JP': '🇯🇵',
    'AU': '🇦🇺',
    'IN': '🇮🇳',
    'CN': '🇨🇳',
    'BR': '🇧🇷',
    'unknown': '🌍'
  };
  return flags[countryCode] || '🌍';
}