import { ImageResponse } from 'next/og';
import fs from 'fs/promises';
import path from 'path';



const emojiMap: Record<string, string> = {
  "mcp-declaration": "📜",
  "llm-index": "🧭",
  "capsule": "📦",
  "prompt": "💬",
  "about": "🔥",
  "core": "🧠",
  "news": "📰",
  "feed-index": "📂",
  "sdk": "🛠️"
};

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), 'public', 'exports', `${slug}.llmfeed.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const feed = JSON.parse(raw);
    const emoji = emojiMap[feed?.metadata?.feed_type] || '🤖';
    const title = feed?.metadata?.title || slug;
    const origin = feed?.origin || 'wellknownmcp.org';
    const type = feed?.metadata?.feed_type || 'feed';

    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            fontFamily: 'sans-serif',
            position: 'relative'
          }}>
          <div
            style={{
              width: '100%',
              backgroundColor: 'black',
              color: 'white',
              padding: '40px 60px',
              fontSize: 38,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              boxSizing: 'border-box'
            }}>
            <div style={{ fontWeight: 'bold' }}>{title}</div>
            <div style={{ fontSize: 24, opacity: 0.7 }}>{origin}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 250, marginRight: 40 }}>{emoji}</div>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <div style={{ fontSize: 60, fontWeight: 'bold' }}>llmfeed</div>
              <div style={{ fontSize: 42, opacity: 0.6 }}>{type}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    );
  } catch (e) {
    return new Response('Feed not found', { status: 404 });
  }
}
