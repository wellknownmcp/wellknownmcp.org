import { promises as fs } from 'fs';
import path from 'path';

async function getAllJsonFilesRecursively(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(entry => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? getAllJsonFilesRecursively(fullPath) : fullPath.endsWith('.llmfeed.json') ? [fullPath] : [];
    })
  );
  return files.flat();
}

export async function GET() {
  const baseDir = path.join(process.cwd(), 'public/exports');
  let feeds = [];

  try {
    const files = await getAllJsonFilesRecursively(baseDir);
    for (const file of files) {
      const content = await fs.readFile(file, 'utf8');
      const json = JSON.parse(content);
      if (!json.metadata) continue;

      const relativePath = path.relative(baseDir, file).replace(/\\/g, '/');
      const slug = path.basename(file).replace('.llmfeed.json', '');
      const label = relativePath.replace('.llmfeed.json', '');
      feeds.push({ ...json, slug, label });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to read feeds", detail: err }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify(feeds), {
    headers: { "Content-Type": "application/json" }
  });
}