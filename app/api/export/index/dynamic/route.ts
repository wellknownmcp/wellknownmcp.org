import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const exportDir = path.join(process.cwd(), 'public', 'exports');
  const entries = await fs.readdir(exportDir, { withFileTypes: true });

  const data = [];

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.llmfeed.json')) {
      const slug = entry.name.replace('.llmfeed.json', '');
      const filePath = path.join(exportDir, entry.name);
      try {
        const raw = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(raw);

        data.push({
          type: 'feed-reference',
          title: json.metadata?.title || slug,
          description: json.metadata?.description || '',
          feed_type: json.metadata?.feed_type || 'unknown',
          lang: json.metadata?.lang || 'en',
          tags: json.metadata?.tags || [],
          href: `/exports/${slug}.llmfeed.json`
        });
      } catch {
        continue;
      }
    }
  }

  const totalFeeds = data.length;

  const index = {
    origin: 'https://wellknownmcp.org/exports/index.dynamic.llmfeed.json',
    metadata: {
            title: 'Dynamic Index of Available LLMFeeds',
      feed_type: 'feed-index',
      version: 'draft',
      lang: 'en'
    },
    data: [
      {
        type: 'summary',
        content: `Index includes ${totalFeeds} feed(s). This version is generated dynamically and is not cryptographically certified.`
      },
      ...data,
      {
        type: 'notice',
        content: 'This feed was generated dynamically and is not certified. Contents may include drafts, tests, or feeds not yet reviewed.'
      }
    ]
  };

  return new Response(JSON.stringify(index, null, 2), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
