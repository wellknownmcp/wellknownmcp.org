import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';

// 🎯 Interface pour les events loggés
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

// 🤖 Patterns de détection d'agents
const AGENT_PATTERNS = [
  { pattern: /claude.*anthropic|anthropic.*claude/i, type: 'claude', confidence: 95 },
  { pattern: /gpt|openai|chatgpt/i, type: 'gpt', confidence: 90 },
  { pattern: /curl\/[\d\.]+/i, type: 'curl', confidence: 98 },
  { pattern: /wget/i, type: 'wget', confidence: 95 },
  { pattern: /python-requests|httpx|aiohttp/i, type: 'python', confidence: 85 },
  { pattern: /node-fetch|axios/i, type: 'nodejs', confidence: 80 },
  { pattern: /postman/i, type: 'postman', confidence: 85 },
  { pattern: /insomnia/i, type: 'insomnia', confidence: 85 },
  { pattern: /mozilla.*chrome.*safari/i, type: 'browser', confidence: 90 },
  { pattern: /firefox/i, type: 'firefox', confidence: 90 },
  { pattern: /edge/i, type: 'edge', confidence: 90 },
  { pattern: /bot|crawler|spider/i, type: 'crawler', confidence: 80 },
  { pattern: /perplexity/i, type: 'perplexity', confidence: 85 },
  { pattern: /brave/i, type: 'brave_search', confidence: 80 },
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 🎯 Track seulement les feeds et .well-known
  if (shouldTrackPath(pathname)) {
    
    // 📝 Log async et non-bloquant (performance critique)
    setImmediate(() => {
      try {
        logAgentEvent(request);
      } catch (error) {
        // Silent fail - jamais casser le site pour des analytics
        if (process.env.NODE_ENV === 'development') {
          console.error('Agent analytics logging failed:', error);
        }
      }
    });
  }
  
  // ⚡ Continue la requête normalement (zero blocking)
  return NextResponse.next();
}

function shouldTrackPath(pathname: string): boolean {
  return (
    pathname.includes('.llmfeed.json') ||
    pathname.startsWith('/.well-known/') ||
    pathname.includes('/exports/') && pathname.includes('.json')
  );
}

function logAgentEvent(request: NextRequest) {
  // 🤖 Détection et classification
  const userAgent = request.headers.get('user-agent') || '';
  const detection = detectAgentType(userAgent);
  
  // 🔐 Génération session ID (IP + UA + timewindow de 30min)
  const sessionId = generateSessionId(request);
  
  // 📊 Analyse des headers pour plus de contexte
  const headersAnalysis = analyzeHeaders(request);
  
  // 📁 Contexte du feed
  const feedContext = analyzeFeedContext(request.nextUrl.pathname);
  
  // 📝 Construction de l'event
  const event: AgentEvent = {
    timestamp: new Date().toISOString(),
    path: request.nextUrl.pathname,
    agent_type: detection.type,
    confidence: detection.confidence,
    user_agent: userAgent.substring(0, 150), // Truncate pour privacy/storage
    referer: request.headers.get('referer')?.substring(0, 100) || '',
    country: request.geo?.country || 'unknown',
    ip_hash: hashIP(request.ip || ''),
    session_id: sessionId,
    headers_analysis: headersAnalysis,
    feed_context: feedContext,
  };
  
  // 💾 Storage dans fichier JSONL
  saveEventToFile(event);
}

function detectAgentType(userAgent: string): { type: string; confidence: number } {
  const ua = userAgent.toLowerCase();
  
  // 🔍 Test contre tous les patterns
  for (const { pattern, type, confidence } of AGENT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return { type, confidence };
    }
  }
  
  // 🤔 Détection behavioral pour unknown agents
  let unknownConfidence = 0;
  
  // Indicators d'automation
  if (ua.length < 20) unknownConfidence += 20; // UA trop court
  if (!ua.includes('/')) unknownConfidence += 15; // Pas de version
  if (/^[a-z]+$/i.test(ua)) unknownConfidence += 25; // Juste un mot
  
  if (unknownConfidence > 40) {
    return { type: 'unknown_agent', confidence: unknownConfidence };
  }
  
  return { type: 'unknown', confidence: 10 };
}

function generateSessionId(request: NextRequest): string {
  const ip = request.ip || 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  const timeWindow = Math.floor(Date.now() / (30 * 60 * 1000)); // 30min windows
  
  return createHash('sha256')
    .update(`${ip}:${userAgent}:${timeWindow}`)
    .digest('hex')
    .substring(0, 12);
}

function hashIP(ip: string): string {
  if (!ip || ip === 'unknown') return 'unknown';
  
  // Hash avec salt pour privacy
  const salt = process.env.ANALYTICS_SALT || 'wellknownmcp_default_salt';
  return createHash('sha256')
    .update(ip + salt)
    .digest('hex')
    .substring(0, 10);
}

function analyzeHeaders(request: NextRequest) {
  const headers = request.headers;
  
  // 📋 Headers standards qu'un browser humain aurait
  const humanHeaders = [
    'accept-language',
    'accept-encoding', 
    'cookie',
    'sec-fetch-site',
    'sec-fetch-mode',
    'sec-ch-ua'
  ];
  
  // 🔍 Headers custom/non-standard
  const customHeaders: string[] = [];
  headers.forEach((value, key) => {
    if (!key.startsWith('accept') && 
        !key.startsWith('sec-') && 
        !['user-agent', 'referer', 'host', 'connection'].includes(key)) {
      customHeaders.push(key);
    }
  });
  
  return {
    accept_language: !!headers.get('accept-language'),
    accept_encoding: !!headers.get('accept-encoding'),
    cookie_present: !!headers.get('cookie'),
    custom_headers: customHeaders,
  };
}

function analyzeFeedContext(pathname: string) {
  if (!shouldTrackPath(pathname)) return undefined;
  
  // 📝 Détermine le type de feed
  let feedType = 'unknown';
  if (pathname.includes('mcp.llmfeed.json')) feedType = 'mcp';
  else if (pathname.includes('capabilities')) feedType = 'capabilities';
  else if (pathname.includes('spec')) feedType = 'spec';
  else if (pathname.includes('schema')) feedType = 'schema';
  else if (pathname.includes('manifesto')) feedType = 'manifesto';
  else if (pathname.includes('news')) feedType = 'news';
  else if (pathname.includes('mirror')) feedType = 'mirror';
  else if (pathname.includes('llm-index')) feedType = 'index';
  
  return {
    feed_type: feedType,
    is_well_known: pathname.startsWith('/.well-known/'),
  };
}

function saveEventToFile(event: AgentEvent) {
  // 📁 Ensure data directory exists
  const dataDir = join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
  
  // 📝 Append to JSONL file (one JSON object per line)
  const logPath = join(dataDir, 'agent-logs.jsonl');
  const logLine = JSON.stringify(event) + '\n';
  
  try {
    appendFileSync(logPath, logLine);
  } catch (error) {
    // Fallback: try to create file if it doesn't exist
    if (error.code === 'ENOENT') {
      writeFileSync(logPath, logLine);
    } else {
      throw error;
    }
  }
}

// 🎯 Configuration du matcher Next.js
export const config = {
  matcher: [
    // .well-known files
    '/.well-known/:path*',
    
    // .llmfeed.json files anywhere
    '/((?!api|_next/static|_next/image|favicon.ico).*\\.llmfeed\\.json)',
    
    // exports directory
    '/exports/:path*.json',
  ]
};

// 📊 Helper function pour debug en dev
if (process.env.NODE_ENV === 'development') {
  console.log('🤖 Agent Analytics Middleware loaded');
  console.log('📝 Logs will be saved to: data/agent-logs.jsonl');
  console.log('🎯 Tracking paths:', config.matcher);
}