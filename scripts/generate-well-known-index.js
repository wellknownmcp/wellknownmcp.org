#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// 📂 Configuration
const WELLKNOWN_DIR = path.join(process.cwd(), 'public/.well-known')
const OUTPUT_FILE = path.join(WELLKNOWN_DIR, 'index.html')
const SITE_URL = 'https://wellknownmcp.org'

// 📋 Métadonnées par type de feed
const FEED_TYPES = {
  'mcp': {
    title: 'Model Context Protocol (MCP)',
    description: 'Core MCP declaration and capabilities',
    docs: '/spec/02_llmfeed_feedtype/llmfeed_feedtype_mcp',
    icon: '🤖',
    priority: 1
  },
  'capabilities': {
    title: 'Site Capabilities',
    description: 'Available APIs, tools and interactive features',
    docs: '/spec/02_llmfeed_feedtype/llmfeed_feedtype_capabilities',
    icon: '⚡',
    priority: 2
  },
  'manifesto': {
    title: 'Manifesto & Values',
    description: 'Organizational values and ethical framework',
    docs: '/spec/02_llmfeed_feedtype/llmfeed_feedtype_manifesto',
    icon: '📜',
    priority: 3
  },
  'llm-index': {
    title: 'LLM Discovery Index',
    description: 'Agent-friendly site navigation and feed discovery',
    docs: '/spec/02_llmfeed_feedtype/llmfeed_feedtype_llm-index',
    icon: '🗺️',
    priority: 4
  },
  'prompt': {
    title: 'Certified Prompts',
    description: 'Reusable prompt templates for common tasks',
    docs: '/spec/02_llmfeed_feedtype/llmfeed_feedtype_prompt',
    icon: '💬',
    priority: 5
  },
  'export': {
    title: 'Content Exports',
    description: 'Structured content exports for AI consumption',
    docs: '/spec/02_llmfeed_feedtype/llmfeed_feedtype_export',
    icon: '📦',
    priority: 6
  },
  'schema': {
    title: 'JSON Schemas',
    description: 'Validation schemas for LLMFeed format',
    docs: '/spec/01_llmfeed/llmfeed',
    icon: '📋',
    priority: 7
  },
  'agent-behavior': {
    title: 'Agent Behavior',
    description: 'Guidelines for AI agent interactions',
    docs: '/spec/04_agent-behavior/agent-behavior',
    icon: '🎯',
    priority: 8
  }
}

// 🔍 Scanner récursif de fichiers
function scanWellKnownFiles(dir, relativePath = '') {
  const files = []
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const relativeFilePath = path.join(relativePath, item).replace(/\\/g, '/')
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // Scan récursif des sous-dossiers
      files.push(...scanWellKnownFiles(fullPath, relativeFilePath))
    } else if (item !== 'index.html') {
      // Tous les fichiers sauf index.html
      files.push({
        path: relativeFilePath,
        fullPath,
        name: item,
        size: stat.size,
        modified: stat.mtime
      })
    }
  }

  return files
}

// 🧠 Parser de métadonnées JSON
function parseJsonMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const json = JSON.parse(content)
    
    return {
      feedType: json.feed_type || 'unknown',
      title: json.metadata?.title || json.title || path.basename(filePath, '.json'),
      description: json.metadata?.description || json.description || '',
      version: json.metadata?.version || json.version || '',
      lastUpdated: json.metadata?.generated_at || json.last_updated || '',
      audience: json.metadata?.audience || json.audience || [],
      trustLevel: json.trust?.certification_level || json.trust_level || 'basic',
      itemCount: Array.isArray(json.items) ? json.items.length : 
                 Array.isArray(json.feeds) ? json.feeds.length : 
                 json.capabilities?.length || 0,
      content,
      parsed: json,
      isValid: true
    }
  } catch (error) {
    return {
      feedType: 'unknown',
      title: path.basename(filePath, path.extname(filePath)),
      description: 'Could not parse JSON content',
      content: fs.readFileSync(filePath, 'utf-8'),
      parseError: error.message,
      isValid: false
    }
  }
}

// 🎨 Générateur HTML avec contenu JSON intégré
function generateIndexHtml(files) {
  const now = new Date().toISOString()
  
  // Catégoriser et parser les fichiers
  const categorized = {}
  const uncategorized = []

  files.forEach(file => {
    if (file.name.endsWith('.json')) {
      const metadata = parseJsonMetadata(file.fullPath)
      file.metadata = metadata
      
      const feedType = metadata.feedType
      if (FEED_TYPES[feedType]) {
        if (!categorized[feedType]) categorized[feedType] = []
        categorized[feedType].push(file)
      } else {
        uncategorized.push(file)
      }
    } else {
      uncategorized.push(file)
    }
  })

  // Trier par priorité
  const sortedCategories = Object.keys(categorized).sort((a, b) => {
    return (FEED_TYPES[a]?.priority || 999) - (FEED_TYPES[b]?.priority || 999)
  })

  // Générer HTML
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>/.well-known/ — Agent-Readable Feeds Index | WellKnownMCP</title>
  <meta name="robots" content="index, follow" />
  <meta name="description" content="Complete index of machine-readable feeds and schemas for AI agents, with embedded JSON content for full accessibility" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  
  <!-- 🤖 Agent-specific metadata -->
  <meta name="llm-intent" content="browse-feeds-index" />
  <meta name="llm-topic" content="wellknown feeds directory mcp llmfeed" />
  <meta name="llm-audience" content="llm,agent,developer" />
  <meta name="llm-capabilities" content="browse,discover,inspect" />
  <meta name="llm-trust-level" content="signed" />
  
  <!-- 🔗 Canonical and discovery -->
  <link rel="canonical" href="${SITE_URL}/.well-known/" />
  <link rel="alternate" type="application/json" href="${SITE_URL}/.well-known/llm-index.llmfeed.json" title="Machine-readable site index" />
  
  <style>
    * { box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6; margin: 0; padding: 2rem; 
      background: #fafafa; color: #333;
      max-width: 1200px; margin: 0 auto;
    }
    
    h1 { 
      font-size: 2rem; margin-bottom: 1rem; color: #2563eb;
      border-bottom: 3px solid #2563eb; padding-bottom: 0.5rem;
    }
    
    .intro { 
      background: #fff; padding: 1.5rem; border-radius: 8px; 
      margin-bottom: 2rem; border-left: 4px solid #2563eb;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .category {
      background: #fff; margin-bottom: 2rem; border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;
    }
    
    .category-header {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white; padding: 1rem 1.5rem; margin: 0;
      display: flex; align-items: center; gap: 0.5rem;
    }
    
    .category-header .icon { font-size: 1.2em; }
    
    .file-list { margin: 0; padding: 0; list-style: none; }
    
    .file-item {
      border-bottom: 1px solid #f1f5f9;
      transition: background-color 0.2s;
    }
    
    .file-item:hover { background: #f8fafc; }
    .file-item:last-child { border-bottom: none; }
    
    .file-header {
      padding: 1rem 1.5rem; cursor: pointer;
      display: flex; align-items: center; justify-content: space-between;
    }
    
    .file-info { flex-grow: 1; }
    .file-name { 
      font-family: 'SF Mono', Monaco, Consolas, monospace;
      font-weight: 600; color: #1e40af; margin-bottom: 0.25rem;
    }
    
    .file-description { 
      color: #64748b; font-size: 0.9rem; margin-bottom: 0.25rem;
    }
    
    .file-meta {
      font-size: 0.8rem; color: #94a3b8;
      display: flex; gap: 1rem; flex-wrap: wrap;
    }
    
    .trust-badge {
      display: inline-block; padding: 0.15rem 0.5rem;
      border-radius: 12px; font-size: 0.7rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    
    .trust-certified { background: #dcfce7; color: #166534; }
    .trust-signed { background: #dbeafe; color: #1e40af; }
    .trust-basic { background: #f1f5f9; color: #475569; }
    
    .json-content {
      background: #1e293b; color: #e2e8f0; padding: 1.5rem;
      overflow-x: auto; font-family: 'SF Mono', Monaco, Consolas, monospace;
      font-size: 0.85rem; line-height: 1.4; margin: 0;
      max-height: 400px; overflow-y: auto;
    }
    
    .error { color: #dc2626; background: #fef2f2; padding: 1rem; border-radius: 4px; }
    
    .stats {
      background: #fff; padding: 1rem 1.5rem; border-radius: 8px;
      margin-bottom: 2rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;
    }
    
    .stat { text-align: center; }
    .stat-number { font-size: 1.5rem; font-weight: bold; color: #2563eb; }
    .stat-label { font-size: 0.9rem; color: #64748b; }
    
    .docs-link {
      color: #2563eb; text-decoration: none; font-weight: 500;
      border-bottom: 1px solid transparent; transition: border-color 0.2s;
    }
    .docs-link:hover { border-bottom-color: #2563eb; }
    
    @media (max-width: 768px) {
      body { padding: 1rem; }
      h1 { font-size: 1.5rem; }
      .file-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
      .file-meta { margin-top: 0.5rem; }
    }
  </style>
</head>
<body>
  <header>
    <h1>/.well-known/ — Agent-Readable Feeds Index</h1>
    <div class="intro">
      <p><strong>Machine-readable feeds directory</strong> for <a href="${SITE_URL}">WellKnownMCP</a> according to the <a href="${SITE_URL}/spec" class="docs-link">MCP / LLMFeed specification</a>.</p>
      <p>This index provides <strong>full accessibility</strong> to feed content for both automated agents and human inspection. Each feed includes embedded JSON content for complete transparency.</p>
      <p><strong>🤖 For AI Agents:</strong> Start with <a href="/.well-known/llm-index.llmfeed.json" class="docs-link">llm-index.llmfeed.json</a> for structured site discovery.</p>
    </div>
  </header>

  <div class="stats">
    <div class="stat">
      <div class="stat-number">${files.length}</div>
      <div class="stat-label">Total Files</div>
    </div>
    <div class="stat">
      <div class="stat-number">${files.filter(f => f.metadata?.isValid).length}</div>
      <div class="stat-label">Valid JSON Feeds</div>
    </div>
    <div class="stat">
      <div class="stat-number">${sortedCategories.length}</div>
      <div class="stat-label">Feed Categories</div>
    </div>
    <div class="stat">
      <div class="stat-number">${files.filter(f => f.metadata?.trustLevel === 'certified').length}</div>
      <div class="stat-label">Certified Feeds</div>
    </div>
  </div>

  <main>
    ${sortedCategories.map(feedType => {
      const typeInfo = FEED_TYPES[feedType]
      const files = categorized[feedType]
      
      return `
    <section class="category">
      <h2 class="category-header">
        <span class="icon">${typeInfo.icon}</span>
        <div>
          <div>${typeInfo.title}</div>
          <div style="font-size: 0.9rem; opacity: 0.9;">${typeInfo.description}</div>
        </div>
        <a href="${SITE_URL}${typeInfo.docs}" class="docs-link" style="color: white; font-size: 0.9rem;">📚 Docs</a>
      </h2>
      
      <ul class="file-list">
        ${files.map(file => `
        <li class="file-item">
          <details>
            <summary class="file-header">
              <div class="file-info">
                <div class="file-name">
                  <a href="/.well-known/${file.path}">${file.path}</a>
                </div>
                <div class="file-description">${file.metadata?.description || 'No description available'}</div>
                <div class="file-meta">
                  ${file.metadata?.itemCount ? `<span>📄 ${file.metadata.itemCount} items</span>` : ''}
                  ${file.metadata?.version ? `<span>🏷️ v${file.metadata.version}</span>` : ''}
                  ${file.metadata?.audience?.length ? `<span>👥 ${file.metadata.audience.join(', ')}</span>` : ''}
                  <span>📁 ${(file.size / 1024).toFixed(1)} KB</span>
                  ${file.metadata?.trustLevel ? `<span class="trust-badge trust-${file.metadata.trustLevel}">${file.metadata.trustLevel}</span>` : ''}
                </div>
              </div>
              <span style="color: #94a3b8;">🔍 View Content</span>
            </summary>
            
            ${file.metadata?.parseError ? `
            <div class="error">
              <strong>JSON Parse Error:</strong> ${file.metadata.parseError}
            </div>
            <pre class="json-content">${file.metadata.content}</pre>
            ` : `
            <pre class="json-content">${JSON.stringify(file.metadata?.parsed || {}, null, 2)}</pre>
            `}
          </details>
        </li>
        `).join('')}
      </ul>
    </section>
      `
    }).join('')}

    ${uncategorized.length > 0 ? `
    <section class="category">
      <h2 class="category-header">
        <span class="icon">📄</span>
        <div>
          <div>Other Files</div>
          <div style="font-size: 0.9rem; opacity: 0.9;">Additional resources and schemas</div>
        </div>
      </h2>
      
      <ul class="file-list">
        ${uncategorized.map(file => `
        <li class="file-item">
          <div class="file-header">
            <div class="file-info">
              <div class="file-name">
                <a href="/.well-known/${file.path}">${file.path}</a>
              </div>
              <div class="file-meta">
                <span>📁 ${(file.size / 1024).toFixed(1)} KB</span>
                <span>🕐 ${file.modified.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </li>
        `).join('')}
      </ul>
    </section>
    ` : ''}
  </main>

  <footer style="margin-top: 3rem; padding: 2rem 0; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b;">
    <p><strong>Generated automatically</strong> at build time • Last updated: ${now}</p>
    <p>For implementation details, see: <a href="${SITE_URL}/spec" class="docs-link">LLMFeed & MCP Specification</a></p>
    <p>This index is optimized for both <strong>automated agents</strong> and <strong>human accessibility</strong>.</p>
  </footer>
</body>
</html>`
}

// 🚀 Fonction principale
function generateWellKnownIndex() {
  try {
    console.log('🔍 Scanning .well-known directory...')
    const files = scanWellKnownFiles(WELLKNOWN_DIR)
    
    console.log(`📁 Found ${files.length} files`)
    const jsonFiles = files.filter(f => f.name.endsWith('.json'))
    console.log(`📄 Found ${jsonFiles.length} JSON feeds`)
    
    console.log('🎨 Generating HTML index...')
    const html = generateIndexHtml(files)
    
    fs.writeFileSync(OUTPUT_FILE, html, 'utf-8')
    console.log(`✅ Generated index at ${OUTPUT_FILE}`)
    
    // Stats
    const validJsons = files.filter(f => f.metadata?.isValid).length
    const certified = files.filter(f => f.metadata?.trustLevel === 'certified').length
    
    console.log(`📊 Stats: ${validJsons}/${jsonFiles.length} valid JSONs, ${certified} certified feeds`)
    
  } catch (error) {
    console.error('❌ Error generating well-known index:', error)
    process.exit(1)
  }
}

// 🎯 Exécution
if (require.main === module) {
  generateWellKnownIndex()
}

module.exports = { generateWellKnownIndex }