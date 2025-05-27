// scripts/enrich-llmfeed-index.ts
// Adds intent explanations + extracts metadata + adds feed_type

import fs from 'fs';
import path from 'path';

const INDEX_FILE = path.resolve(__dirname, '../public/.well-known/llm-index.llmfeed.json');
const EXPORTS_DIR = path.resolve(__dirname, '../public/exports');
const SITE_ORIGIN = 'https://wellknownmcp.org';

interface IndexEntry {
  type: string;
  url: string;
  feed_type?: string;
  name?: string;
  intent?: string;
  title?: string;
  description?: string;
  tags?: string[];
  origin?: string;
}

const pageIntentMap: Record<string, string> = {
  [`${SITE_ORIGIN}/`]: 'Main entry point of WellKnownMCP project.',
  [`${SITE_ORIGIN}/spec`]: 'Reference documentation for the MCP protocol.',
  [`${SITE_ORIGIN}/feeds`]: 'Community feed explorer and submission portal.',
  [`${SITE_ORIGIN}/llmfeedhub`]: 'Agent interaction and LLM Feed Hub.',
  [`${SITE_ORIGIN}/join`]: 'Consortium membership request page.',
  [`${SITE_ORIGIN}/verify`]: 'MCP feed signature verification endpoint.',
  [`${SITE_ORIGIN}/sdk`]: 'SDK resources and documentation for developers.',
  [`${SITE_ORIGIN}/tools/export-button`]: 'Export button component reference for LLM integrations.',
  [`${SITE_ORIGIN}/tools/badges`]: 'LLMFeed & MCP certification badges for partner websites.',
};

function enrichIndex() {
  if (!fs.existsSync(INDEX_FILE)) {
    console.error(`❌ llmfeed-index not found: ${INDEX_FILE}`);
    return;
  }

  const raw = fs.readFileSync(INDEX_FILE, 'utf-8');
  const indexFile = JSON.parse(raw) as { index: IndexEntry[] };

  console.log(`🔎 Enriching ${indexFile.index.length} entries...`);

  indexFile.index = indexFile.index.map(entry => {
    // Enrich feeds with metadata + feed_type
    if (entry.type === 'feed') {
      try {
        const exportPath = path.resolve(EXPORTS_DIR, entry.url.replace(`${SITE_ORIGIN}/exports/`, ''));
        if (fs.existsSync(exportPath)) {
          const feedFile = JSON.parse(fs.readFileSync(exportPath, 'utf-8'));
          const metadata = feedFile.metadata || {};
          entry.feed_type = feedFile.feed_type;  // ✅ NEW
          entry.title = metadata.title || entry.name;
          entry.description = metadata.description;
          entry.tags = metadata.tags;
          entry.origin = metadata.origin;
        }
      } catch (e) {
        console.warn(`⚠️ Could not read metadata for feed: ${entry.url}`);
      }
      if (!entry.intent) entry.intent = 'exported llmfeed document';
    }

    // Enrich pages with manual mapping
    if (entry.type === 'page' && pageIntentMap[entry.url]) {
      entry.intent = pageIntentMap[entry.url];
    }

    return entry;
  });

  fs.writeFileSync(INDEX_FILE, JSON.stringify(indexFile, null, 2));
  console.log(`✅ Enrichment complete: ${INDEX_FILE}`);
}

enrichIndex();
