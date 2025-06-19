// middleware.ts — Edge Runtime Compatible Version
import { NextRequest, NextResponse } from 'next/server';

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

// 🔐 Salt pour le hashing (fallback sécurisé)
const getAnalyticsSalt = (): string => {
  return process.env.ANALYTICS_SALT || `wellknownmcp_fallback_${Date.now().toString(36)}`;
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 🎯 Track seulement les feeds et .well-known
  if (shouldTrackPath(pathname)) {
    // 📝 Log async via API route (non-bloquant, compatible Edge Runtime)
    buildAgentEvent(request).then(event => {
      // Fire-and-forget API call to logging endpoint
      fetch(`${request.nextUrl.origin}/api/log-agent-event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(() => {
        // Silent fail - jamais casser le site pour des analytics
        if (process.env.NODE_ENV === 'development') {
          console.warn('Agent analytics logging failed');
        }
      });
    }).catch(() => {
      // Silent fail si même la construction de l'event échoue
    });
  }
  
  // ⚡ Continue la requête normalement (zero blocking)
  return NextResponse.next();
}

function shouldTrackPath(pathname: string): boolean {
  return (
    pathname.includes('.llmfeed.json') ||
    pathname.startsWith('/.well-known/') ||
    (pathname.includes('/exports/') && pathname.includes('.json'))
  );
}

async function buildAgentEvent(request: NextRequest): Promise<AgentEvent> {
  // 🤖 Détection et classification
  const userAgent = request.headers.get('user-agent') || '';
  const detection = detectAgentType(userAgent);
  
  // 🔐 Génération session ID (compatible Edge Runtime)
  const sessionId = await generateSessionId(request);
  
  // 📊 Analyse des headers pour plus de contexte
  const headersAnalysis = analyzeHeaders(request);
  
  // 📁 Contexte du feed
  const feedContext = analyzeFeedContext(request.nextUrl.pathname);
  
  return {
    timestamp: new Date().toISOString(),
    path: request.nextUrl.pathname,
    agent_type: detection.type,
    confidence: detection.confidence,
    user_agent: userAgent.substring(0, 150), // Truncate pour privacy/storage
    referer: request.headers.get('referer')?.substring(0, 100) || '',
    country: request.geo?.country || 'unknown',
    ip_hash: await hashIP(request.ip || ''),
    session_id: sessionId,
    headers_analysis: headersAnalysis,
    feed_context: feedContext,
  };
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

async function generateSessionId(request: NextRequest): Promise<string> {
  const ip = request.ip || 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  const timeWindow = Math.floor(Date.now() / (30 * 60 * 1000)); // 30min windows
  
  // Use Web Crypto API (compatible with Edge Runtime)
  const encoder = new TextEncoder();
  const data = encoder.encode(`${ip}:${userAgent}:${timeWindow}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = new Uint8Array(hashBuffer);
  const hashHex = Array.from(hashArray).map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex.substring(0, 12);
}

async function hashIP(ip: string): Promise<string> {
  if (!ip || ip === 'unknown') return 'unknown';
  
  // Hash avec salt pour privacy (Web Crypto API)
  const salt = getAnalyticsSalt();
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = new Uint8Array(hashBuffer);
  const hashHex = Array.from(hashArray).map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex.substring(0, 10);
}

function analyzeHeaders(request: NextRequest) {
  const headers = request.headers;
  
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
  console.log('📝 Logs will be saved via API route');
  console.log('🎯 Tracking paths:', config.matcher);
}