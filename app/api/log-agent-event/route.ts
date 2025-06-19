// app/api/log-agent-event/route.ts — API Route pour les opérations fichier
import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
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

export async function POST(request: NextRequest) {
  try {
    const event: AgentEvent = await request.json();
    
    // 🔍 Validation basique
    if (!event.timestamp || !event.path || !event.agent_type) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }
    
    // 💾 Storage dans fichier JSONL (Node.js runtime OK dans API routes)
    saveEventToFile(event);
    
    // 📊 Log pour debug en développement
    if (process.env.NODE_ENV === 'development') {
      console.log(`🤖 Logged ${event.agent_type} accessing ${event.path}`);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    // Silent fail pour ne pas impacter les agents
    console.error('Failed to log agent event:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
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
    if ((error as any).code === 'ENOENT') {
      writeFileSync(logPath, logLine);
    } else {
      throw error;
    }
  }
}

// 📊 GET endpoint pour vérifier le statut (optionnel)
export async function GET() {
  try {
    const dataDir = join(process.cwd(), 'data');
    const logPath = join(dataDir, 'agent-logs.jsonl');
    
    const stats = {
      logging_enabled: true,
      data_directory_exists: existsSync(dataDir),
      log_file_exists: existsSync(logPath),
      log_file_path: logPath,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to get logging status',
      details: error.message 
    }, { status: 500 });
  }
}