// app/api/analytics/dashboard/route.ts — Analytics Dashboard API
import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

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
  headers_analysis: {
    accept_language: boolean;
    accept_encoding: boolean;
    cookie_present: boolean;
    custom_headers: string[];
  };
  feed_context?: {
    feed_type: string;
    is_well_known: boolean;
  };
}

interface AnalyticsSummary {
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
}

export async function GET(request: NextRequest) {
  try {
    const dataPath = join(process.cwd(), 'data', 'agent-logs.jsonl');
    
    if (!existsSync(dataPath)) {
      return NextResponse.json({ 
        error: 'No analytics data available',
        message: 'Start accessing .llmfeed.json files to generate analytics data',
        summary: getEmptySummary()
      });
    }

    // Lire et parser les logs
    const logContent = readFileSync(dataPath, 'utf-8');
    const logs = logContent
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean) as AgentEvent[];

    if (logs.length === 0) {
      return NextResponse.json({
        error: 'No valid analytics data found',
        summary: getEmptySummary()
      });
    }

    // Filtrage optionnel par période
    const daysFilter = request.nextUrl.searchParams.get('days');
    let filteredLogs = logs;
    
    if (daysFilter) {
      const days = parseInt(daysFilter);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      filteredLogs = logs.filter(log => 
        new Date(log.timestamp) >= cutoffDate
      );
    }

    const summary = generateAnalyticsSummary(filteredLogs);
    
    return NextResponse.json({ 
      success: true,
      summary,
      metadata: {
        total_logs_available: logs.length,
        filtered_logs: filteredLogs.length,
        oldest_log: logs[0]?.timestamp,
        newest_log: logs[logs.length - 1]?.timestamp,
        generated_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Analytics dashboard error:', error);
    return NextResponse.json({ 
      error: 'Failed to analyze logs',
      details: error.message 
    }, { status: 500 });
  }
}

function generateAnalyticsSummary(logs: AgentEvent[]): AnalyticsSummary {
  const agentTypes = new Map<string, number>();
  const feedPaths = new Map<string, number>();
  const hourlyRequests = new Map<number, number>();
  const dailyRequests = new Map<string, number>();
  const agentConfidence = new Map<string, number[]>();
  const uniqueAgents = new Set<string>();
  const countries = new Map<string, number>();
  let wellKnownRequests = 0;
  let regularRequests = 0;

  logs.forEach(log => {
    // Agent types
    agentTypes.set(log.agent_type, (agentTypes.get(log.agent_type) || 0) + 1);
    
    // Feed paths
    feedPaths.set(log.path, (feedPaths.get(log.path) || 0) + 1);
    
    // Hourly distribution
    const hour = new Date(log.timestamp).getHours();
    hourlyRequests.set(hour, (hourlyRequests.get(hour) || 0) + 1);
    
    // Daily distribution
    const date = new Date(log.timestamp).toISOString().split('T')[0];
    dailyRequests.set(date, (dailyRequests.get(date) || 0) + 1);
    
    // Confidence scores
    if (!agentConfidence.has(log.agent_type)) {
      agentConfidence.set(log.agent_type, []);
    }
    agentConfidence.get(log.agent_type)!.push(log.confidence);
    
    // Unique agents (by session_id)
    uniqueAgents.add(log.session_id);
    
    // Countries
    if (log.country && log.country !== 'unknown') {
      countries.set(log.country, (countries.get(log.country) || 0) + 1);
    }
    
    // Well-known vs regular feeds
    if (log.feed_context?.is_well_known) {
      wellKnownRequests++;
    } else {
      regularRequests++;
    }
  });

  const totalRequests = logs.length;

  return {
    total_requests: totalRequests,
    unique_agents: uniqueAgents.size,
    
    top_agent_types: Array.from(agentTypes.entries())
      .map(([type, count]) => ({ 
        type, 
        count, 
        percentage: Math.round((count / totalRequests) * 100) 
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    
    popular_feeds: Array.from(feedPaths.entries())
      .map(([path, requests]) => ({ 
        path, 
        requests, 
        percentage: Math.round((requests / totalRequests) * 100) 
      }))
      .sort((a, b) => b.requests - a.requests)
      .slice(0, 10),
    
    hourly_distribution: Array.from({ length: 24 }, (_, hour) => ({
      hour,
      requests: hourlyRequests.get(hour) || 0
    })),
    
    daily_distribution: Array.from(dailyRequests.entries())
      .map(([date, requests]) => ({ date, requests }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30), // Last 30 days
    
    agent_confidence_scores: Array.from(agentConfidence.entries())
      .map(([type, scores]) => ({
        type,
        avg_confidence: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        request_count: scores.length
      }))
      .sort((a, b) => b.avg_confidence - a.avg_confidence),
    
    countries: Array.from(countries.entries())
      .map(([country, requests]) => ({
        country,
        requests,
        percentage: Math.round((requests / totalRequests) * 100)
      }))
      .sort((a, b) => b.requests - a.requests)
      .slice(0, 10),
    
    well_known_vs_regular: {
      well_known: wellKnownRequests,
      regular: regularRequests
    },
    
    recent_activity: logs
      .slice(-20) // Last 20 events
      .reverse() // Most recent first
  };
}

function getEmptySummary(): AnalyticsSummary {
  return {
    total_requests: 0,
    unique_agents: 0,
    top_agent_types: [],
    popular_feeds: [],
    hourly_distribution: Array.from({ length: 24 }, (_, hour) => ({ hour, requests: 0 })),
    daily_distribution: [],
    agent_confidence_scores: [],
    countries: [],
    well_known_vs_regular: { well_known: 0, regular: 0 },
    recent_activity: []
  };
}

// POST endpoint pour nettoyer les logs (optionnel)
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'clear_logs') {
      const dataPath = join(process.cwd(), 'data', 'agent-logs.jsonl');
      
      if (existsSync(dataPath)) {
        // Backup avant suppression
        const backupPath = join(process.cwd(), 'data', `agent-logs-backup-${Date.now()}.jsonl`);
        const fs = require('fs');
        fs.copyFileSync(dataPath, backupPath);
        
        // Vider le fichier principal
        fs.writeFileSync(dataPath, '');
        
        return NextResponse.json({
          success: true,
          message: 'Logs cleared successfully',
          backup_created: backupPath
        });
      }
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid action'
    }, { status: 400 });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to process request',
      details: error.message
    }, { status: 500 });
  }
}