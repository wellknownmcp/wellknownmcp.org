// scripts/analyze-logs.js
// 📊 Quick analysis script pour voir les résultats
// Usage: node scripts/analyze-logs.js

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const LOG_PATH = join(process.cwd(), 'data/agent-logs.jsonl');

function analyzeLogs() {
  if (!existsSync(LOG_PATH)) {
    console.log('❌ No logs found. Make sure the middleware has captured some events.');
    console.log('💡 Try accessing: https://wellknownmcp.org/.well-known/mcp.llmfeed.json');
    return;
  }

  // 📖 Read and parse logs
  const logs = readFileSync(LOG_PATH, 'utf8')
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      try {
        return JSON.parse(line);
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean);

  if (logs.length === 0) {
    console.log('📝 Log file exists but no valid events found.');
    return;
  }

  console.log('🤖 WELLKNOWNMCP AGENT ANALYTICS');
  console.log('================================');
  console.log(`📊 Total events captured: ${logs.length}`);
  console.log(`📅 Time range: ${logs[0]?.timestamp} → ${logs[logs.length-1]?.timestamp}`);
  console.log('');

  // 🤖 Agent Type Breakdown
  const agentStats = logs.reduce((acc, log) => {
    const type = log.agent_type;
    if (!acc[type]) {
      acc[type] = { count: 0, confidence_sum: 0, paths: new Set() };
    }
    acc[type].count++;
    acc[type].confidence_sum += log.confidence || 0;
    acc[type].paths.add(log.path);
    return acc;
  }, {});

  console.log('🤖 AGENT TYPES DETECTED:');
  Object.entries(agentStats)
    .sort(([,a], [,b]) => b.count - a.count)
    .forEach(([type, stats]) => {
      const avgConfidence = (stats.confidence_sum / stats.count).toFixed(1);
      console.log(`  ${type.padEnd(15)} │ ${stats.count.toString().padStart(3)} events │ ~${avgConfidence}% confidence │ ${stats.paths.size} unique paths`);
    });
  console.log('');

  // 📁 Most Popular Feeds
  const feedStats = logs.reduce((acc, log) => {
    acc[log.path] = (acc[log.path] || 0) + 1;
    return acc;
  }, {});

  console.log('📁 MOST REQUESTED FEEDS:');
  Object.entries(feedStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .forEach(([path, count]) => {
      const truncatedPath = path.length > 50 ? path.substring(0, 47) + '...' : path;
      console.log(`  ${truncatedPath.padEnd(50)} │ ${count} requests`);
    });
  console.log('');

  // 🌍 Geographic Distribution
  const geoStats = logs.reduce((acc, log) => {
    const country = log.country || 'unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  console.log('🌍 GEOGRAPHIC DISTRIBUTION:');
  Object.entries(geoStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .forEach(([country, count]) => {
      const percentage = ((count / logs.length) * 100).toFixed(1);
      console.log(`  ${country.padEnd(10)} │ ${count.toString().padStart(3)} requests │ ${percentage}%`);
    });
  console.log('');

  // 🕒 Temporal Analysis
  const hourlyStats = logs.reduce((acc, log) => {
    const hour = new Date(log.timestamp).getUTCHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  const peakHour = Object.entries(hourlyStats)
    .sort(([,a], [,b]) => b - a)[0];

  console.log('🕒 TEMPORAL PATTERNS:');
  console.log(`  Peak activity: ${peakHour[0]}:00 UTC (${peakHour[1]} events)`);
  console.log(`  Total unique hours: ${Object.keys(hourlyStats).length}`);
  console.log('');

  // 🎯 Insights & Recommendations
  console.log('💡 KEY INSIGHTS:');
  
  const claudeEvents = logs.filter(l => l.agent_type === 'claude').length;
  const gptEvents = logs.filter(l => l.agent_type === 'gpt').length;
  const curlEvents = logs.filter(l => l.agent_type === 'curl').length;
  const browserEvents = logs.filter(l => l.agent_type.includes('browser')).length;
  
  if (claudeEvents > 0) {
    console.log(`  ✅ Claude agents: ${claudeEvents} visits detected`);
  }
  if (gptEvents > 0) {
    console.log(`  ✅ GPT agents: ${gptEvents} visits detected`);
  }
  if (curlEvents > 0) {
    console.log(`  ✅ Developer tools: ${curlEvents} curl downloads`);
  }
  if (browserEvents > 0) {
    console.log(`  ✅ Human browsers: ${browserEvents} human visits`);
  }

  const totalAgents = claudeEvents + gptEvents;
  const totalAutomated = curlEvents + totalAgents;
  
  if (totalAgents > 10) {
    console.log(`  🚀 High agent activity! (${totalAgents} LLM agent visits)`);
  }
  
  if (totalAutomated > browserEvents) {
    console.log(`  🤖 More automated than human traffic (${totalAutomated} vs ${browserEvents})`);
  }

  const uniqueSessions = new Set(logs.map(l => l.session_id)).size;
  console.log(`  📊 ${uniqueSessions} unique sessions detected`);
  
  console.log('');
  console.log('🎯 NEXT STEPS:');
  if (logs.length > 50) {
    console.log('  ✅ Sufficient data for dashboard development');
    console.log('  ✅ Consider building public analytics page');
    console.log('  ✅ Ready for mirror feed implementation');
  } else {
    console.log('  ⏳ Keep collecting data (need ~50+ events)');
    console.log('  💡 Share feeds on social media to attract agents');
  }
}

// 🚀 Run analysis
try {
  analyzeLogs();
} catch (error) {
  console.error('❌ Analysis failed:', error.message);
  console.log('💡 Make sure to run this from the project root directory');
}