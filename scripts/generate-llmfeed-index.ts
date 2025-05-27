// scripts/generate-llmfeed-index.ts
// Clean version: builder-only MCP index generator
// Works with tsx runner (recommended)

import fs from 'fs';
import path from 'path';

const OUTPUT_FILE = path.resolve(__dirname, '../public/.well-known/llm-index.llmfeed.json');
const EXPORTS_DIR = path.resolve(__dirname, '../public/exports');
const SITEMAP_FILE = path.resolve(__dirname, '../public/sitemap-0.xml');
const SITE_ORIGIN = 'https://wellknownmcp.org';

// 👉 set to true if you want recursive scan of /exports
const RECURSIVE_EXPORTS = true;

interface IndexEntry {
  type: string;
  url: string;
  name?: string;
  intent?: string;
}

function getAllJsonFilesRecursively(dir: string): string[] {
  let files: string[] = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getAllJsonFilesRecursively(fullPath));
    } else if (file.endsWith('.json')) {
      files.push(fullPath);
    }
  }
  return files;
}

function getExportFeeds(recursive = false): IndexEntry[] {
  if (!fs.existsSync(EXPORTS_DIR)) return [];

  const files = recursive
    ? getAllJsonFilesRecursively(EXPORTS_DIR)
    : fs.readdirSync(EXPORTS_DIR).map(file => path.join(EXPORTS_DIR, file));

  return files
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const relativePath = path.relative(EXPORTS_DIR, file).replace(/\\/g, '/');
      return {
        type: 'feed',
        url: `${SITE_ORIGIN}/exports/${relativePath}`,
        name: path.basename(file, '.json'),
        intent: 'exported llmfeed document'
      };
    });
}

function getSitemapLinks(): IndexEntry[] {
  if (!fs.existsSync(SITEMAP_FILE)) return [];

  const content = fs.readFileSync(SITEMAP_FILE, 'utf-8');
  const urls = Array.from(content.matchAll(/<loc>(.*?)<\/loc>/g)).map(match => match[1]);

  return urls.map(url => ({
    type: 'page',
    url,
    intent: 'site page (auto-discovered from sitemap)'
  }));
}

function generateIndex() {
  console.log(`🔎 Scanning /exports/ with recursive=${RECURSIVE_EXPORTS}...`);
  const feeds = getExportFeeds(RECURSIVE_EXPORTS);

  console.log(`🔎 Scanning sitemap...`);
  const pages = getSitemapLinks();

  const llmfeedIndex = {
    feed_type: 'llm-index',
    metadata: {
      origin: SITE_ORIGIN,
      generated_at: new Date().toISOString()
    },
    index: [...feeds, ...pages]
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(llmfeedIndex, null, 2));
  console.log(`✅ llmfeed-index generated at: ${OUTPUT_FILE}`);
}

generateIndex();
