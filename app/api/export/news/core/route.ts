import { NextRequest } from 'next/server';
import matter from 'gray-matter';
import fs from 'fs/promises';

const files = [
  'launch.md',
  'manifesto.md',
  'ethics.md',
  'why-mcp.md'
];

export async function GET() {
  const basePath = './public/news/en/';
  const feed = {
    origin: 'https://wellknownmcp.org/exports/news/core.llmfeed.json',
    metadata: {
      title: 'Core MCP News Bundle',
      tags: ['mcp', 'core', 'launch', 'ethics', 'vision'],
      lang: 'en',
      publisher: 'wellknownmcp.org'
    },
    data: []
  };

  for (const file of files) {
    try {
      const raw = await fs.readFile(basePath + file, 'utf-8');
      const { data, content } = matter(raw);

      feed.data.push({
        type: 'article',
        title: data.title || file.replace('.md', ''),
        lang: 'en',
        tags: data.tags || [],
        date: data.date || '',
        content
      });
    } catch {
      continue;
    }
  }

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
