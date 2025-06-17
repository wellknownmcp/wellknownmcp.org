#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

// 📂 Configuration par arguments
const TARGET_DIR = process.argv[2] || path.join(process.cwd(), 'public/.well-known')
const OUTPUT_FILE = path.join(TARGET_DIR, 'index.html')
const META_FILE = path.join(TARGET_DIR, '.index-meta.json')
const SITE_URL = 'https://wellknownmcp.org'
const FORCE_REGENERATION = process.argv.includes('--force') || process.argv.includes('-f')
const RECURSIVE_GENERATION = process.argv.includes('--recursive') || process.argv.includes('-r')

// 🎛️ Configuration taille des fichiers
const MAX_CONTENT_SIZE_FULL = 50 * 1024      // 50KB - affichage complet
const MAX_CONTENT_SIZE_TRUNCATED = 200 * 1024 // 200KB - affichage tronqué
const TRUNCATE_LINES = 50                      // Nombre de lignes à afficher en mode tronqué

// 📋 Métadonnées LLMFeed par type de feed (pour enrichissements automatiques)
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
  },
  'session': {
    title: 'Session Feeds',
    description: 'Agent interaction history and traceability',
    docs: '/spec/02_llmfeed_feedtype/llmfeed_feedtype_session',
    icon: '📝',
    priority: 9
  },
  'user-space': {
    title: 'User Spaces',
    description: 'Personal agent interaction preferences',
    docs: '/spec/02_llmfeed_feedtype/llmfeed_feedtype_user-space',
    icon: '👤',
    priority: 10
  }
}

// 🎯 Détecter le contexte et le type du dossier
function detectDirectoryContext(dirPath, files) {
  const normalizedPath = dirPath.replace(/\\/g, '/').toLowerCase()
  const hasLLMFeeds = files.some(f => f.name && f.name.endsWith('.llmfeed.json'))
  
  // Contextes spécialisés avec enrichissements LLMFeed automatiques
  if (normalizedPath.includes('.well-known')) {
    return {
      title: '/.well-known/ — Agent-Readable Feeds Index',
      description: 'Machine-readable feeds directory for AI agents and developers',
      context: 'wellknown',
      icon: '🤖',
      isLLMFeedEnabled: true,
      priority: 'critical'
    }
  } else if (normalizedPath.includes('exports')) {
    return {
      title: '/exports/ — Content Export Directory',
      description: 'Structured content exports for AI consumption and analysis',
      context: 'exports',
      icon: '📦',
      isLLMFeedEnabled: hasLLMFeeds,
      priority: 'high'
    }
  } else if (normalizedPath.includes('prompts')) {
    return {
      title: '/prompts/ — Certified Prompts Directory', 
      description: 'Reusable prompt templates and automation scripts',
      context: 'prompts',
      icon: '💬',
      isLLMFeedEnabled: hasLLMFeeds,
      priority: 'high'
    }
  } else if (normalizedPath.includes('demo')) {
    return {
      title: '/demo/ — Interactive Demonstrations',
      description: 'Live examples and interactive showcases',
      context: 'demo',
      icon: '🧪',
      isLLMFeedEnabled: hasLLMFeeds,
      priority: 'medium'
    }
  } else {
    const dirName = path.basename(dirPath)
    return {
      title: `/${dirName}/ — Directory Index`,
      description: `Files and resources in the ${dirName} directory`,
      context: 'generic',
      icon: '📁',
      isLLMFeedEnabled: hasLLMFeeds,
      priority: 'normal'
    }
  }
}

// 🔄 Gestion du cache et optimisations
function calculateFileHash(content) {
  return crypto.createHash('md5').update(content).digest('hex')
}

function getFileStats(files) {
  return files.map(file => ({
    path: file.path,
    size: file.size,
    mtime: file.modified.getTime()
  }))
}

// 🎛️ Fonctions utilitaires pour la gestion des tailles de fichiers
function getJsonContentSize(jsonObj) {
  return JSON.stringify(jsonObj, null, 2).length
}

function truncateJsonContent(jsonObj, maxLines = TRUNCATE_LINES) {
  const fullContent = JSON.stringify(jsonObj, null, 2)
  const lines = fullContent.split('\n')
  
  if (lines.length <= maxLines) {
    return fullContent
  }
  
  const truncatedLines = lines.slice(0, maxLines)
  const remainingLines = lines.length - maxLines
  truncatedLines.push(`  /* ... ${remainingLines} more lines (content truncated) ... */`)
  truncatedLines.push('}')
  
  return truncatedLines.join('\n')
}

function generateContentSummary(file) {
  const summary = {
    feed_type: file.metadata?.feedType || 'unknown',
    title: file.metadata?.title || file.name,
    description: file.metadata?.description || 'No description',
    file_size: `${(file.size / 1024).toFixed(1)} KB`,
    items_count: file.metadata?.itemCount || 'Unknown',
    trust_level: file.metadata?.trustLevel || 'basic'
  }
  
  if (file.metadata?.version) summary.version = file.metadata.version
  if (file.metadata?.lastUpdated) summary.last_updated = file.metadata.lastUpdated
  if (file.metadata?.audience) summary.audience = file.metadata.audience
  
  return summary
}

// 🔄 Gestion récursive des sous-dossiers
function discoverSubdirectories(baseDir) {
  const subdirs = []
  
  function scan(dir, relativePath = '') {
    const items = fs.readdirSync(dir)
    let hasFiles = false
    
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        const subRelativePath = path.join(relativePath, item).replace(/\\/g, '/')
        scan(fullPath, subRelativePath)
      } else if (item !== 'index.html' && item !== '.index-meta.json') {
        hasFiles = true
      }
    }
    
    // Ajouter ce dossier s'il contient des fichiers et n'est pas la racine
    if (hasFiles && relativePath) {
      subdirs.push({
        fullPath: dir,
        relativePath: relativePath,
        name: path.basename(dir)
      })
    }
  }
  
  scan(baseDir)
  return subdirs
}

function generateRecursiveIndexes() {
  console.log(`🔄 Recursive mode: generating indexes for all subdirectories`)
  
  // Générer l'index principal
  console.log(`\n📁 Generating main index for: ${TARGET_DIR}`)
  generateSingleDirectoryIndex(TARGET_DIR)
  
  // Découvrir et traiter les sous-dossiers
  const subdirs = discoverSubdirectories(TARGET_DIR)
  
  if (subdirs.length === 0) {
    console.log(`📁 No subdirectories with files found`)
    return
  }
  
  console.log(`📁 Found ${subdirs.length} subdirectories to process:`)
  subdirs.forEach(dir => console.log(`   - ${dir.relativePath}/`))
  
  // Générer un index pour chaque sous-dossier
  subdirs.forEach(dir => {
    console.log(`\n📁 Generating index for: ${dir.relativePath}/`)
    generateSingleDirectoryIndex(dir.fullPath)
  })
  
  console.log(`\n✅ Generated ${subdirs.length + 1} indexes (1 main + ${subdirs.length} subdirectories)`)
}

// 🔍 Scanner récursif de fichiers
function scanDirectory(dir, relativePath = '') {
  const files = []
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const relativeFilePath = path.join(relativePath, item).replace(/\\/g, '/')
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // Scan récursif des sous-dossiers
      files.push(...scanDirectory(fullPath, relativeFilePath))
    } else if (item !== 'index.html') {
      // Tous les fichiers sauf index.html
      files.push({
        path: relativeFilePath,
        fullPath,
        name: item,
        size: stat.size,
        modified: stat.mtime,
        isJson: item.endsWith('.json'),
        isLLMFeed: item.endsWith('.llmfeed.json'),
        extension: path.extname(item)
      })
    }
  }

  return files
}

// 🧠 Parser de métadonnées JSON/LLMFeed
function parseJsonMetadata(filePath, isLLMFeed = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const json = JSON.parse(content)
    
    if (isLLMFeed) {
      // Parse enrichi pour .llmfeed.json
      return {
        feedType: json.feed_type || 'unknown',
        title: json.metadata?.title || json.title || path.basename(filePath, '.llmfeed.json'),
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
        isValid: true,
        isLLMFeed: true
      }
    } else {
      // Parse basique pour .json ordinaires
      return {
        feedType: 'json',
        title: json.title || json.name || path.basename(filePath, '.json'),
        description: json.description || 'JSON data file',
        content,
        parsed: json,
        isValid: true,
        isLLMFeed: false
      }
    }
  } catch (error) {
    return {
      feedType: 'unknown',
      title: path.basename(filePath, path.extname(filePath)),
      description: 'Could not parse JSON content',
      content: fs.readFileSync(filePath, 'utf-8'),
      parseError: error.message,
      isValid: false,
      isLLMFeed: isLLMFeed
    }
  }
}

// 🏷️ Organiser les fichiers par type (LLMFeed) ou dossier (générique)
function organizeFiles(files, isLLMFeedEnabled) {
  if (isLLMFeedEnabled) {
    // Organisation par feed_type pour les dossiers avec .llmfeed.json
    const categorized = {}
    const uncategorized = []

    files.forEach(file => {
      if (file.isLLMFeed) {
        const metadata = parseJsonMetadata(file.fullPath, true)
        file.metadata = metadata
        
        const feedType = metadata.feedType
        if (FEED_TYPES[feedType]) {
          if (!categorized[feedType]) categorized[feedType] = []
          categorized[feedType].push(file)
        } else {
          uncategorized.push(file)
        }
      } else if (file.isJson) {
        const metadata = parseJsonMetadata(file.fullPath, false)
        file.metadata = metadata
        uncategorized.push(file)
      } else {
        uncategorized.push(file)
      }
    })

    return { categorized, uncategorized, byFeedType: true }
  } else {
    // Organisation par dossier pour les dossiers génériques
    const organized = {}
    
    files.forEach(file => {
      const dirPath = path.dirname(file.path)
      const dirName = dirPath === '.' ? 'Root' : dirPath
      
      if (!organized[dirName]) {
        organized[dirName] = []
      }
      
      // Parse JSON si applicable
      if (file.isJson) {
        file.metadata = parseJsonMetadata(file.fullPath, file.isLLMFeed)
      }
      
      organized[dirName].push(file)
    })
    
    return { organized, byFeedType: false }
  }
}

// 🎨 Générateur HTML enrichi
function generateIndexHtml(files, targetDir, context) {
  const now = new Date().toISOString()
  const relativePath = path.relative(process.cwd(), targetDir)
  const organization = organizeFiles(files, context.isLLMFeedEnabled)
  
  const jsonFiles = files.filter(f => f.isJson)
  const llmfeedFiles = files.filter(f => f.isLLMFeed)
  const otherFiles = files.filter(f => !f.isJson)
  
  // Métadonnées HTML conditionnelles pour agents IA
  const agentMetadata = context.isLLMFeedEnabled ? `
  <!-- 🤖 Agent-specific metadata -->
  <meta name="llm-intent" content="browse-feeds-index" />
  <meta name="llm-topic" content="${context.context} feeds directory mcp llmfeed" />
  <meta name="llm-audience" content="llm,agent,developer" />
  <meta name="llm-capabilities" content="browse,discover,inspect" />
  <meta name="llm-trust-level" content="signed" />
  
  <!-- 🔗 LLMFeed discovery -->
  <link rel="alternate" type="application/json" href="/.well-known/llm-index.llmfeed.json" title="Machine-readable site index" />
  ` : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${context.title} | WellKnownMCP</title>
  <meta name="robots" content="index, follow" />
  <meta name="description" content="${context.description}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${agentMetadata}
  
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
      display: flex; align-items: center; gap: 0.5rem;
    }
    
    .intro { 
      background: #fff; padding: 1.5rem; border-radius: 8px; 
      margin-bottom: 2rem; border-left: 4px solid #2563eb;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .stats {
      background: #fff; padding: 1rem 1.5rem; border-radius: 8px;
      margin-bottom: 2rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;
    }
    
    .stat { text-align: center; }
    .stat-number { font-size: 1.5rem; font-weight: bold; color: #2563eb; }
    .stat-label { font-size: 0.9rem; color: #64748b; }
    
    .category, .directory {
      background: #fff; margin-bottom: 2rem; border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;
    }
    
    .category-header, .directory-header {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white; padding: 1rem 1.5rem; margin: 0;
      display: flex; align-items: center; justify-content: space-between;
    }
    
    .header-left { display: flex; align-items: center; gap: 0.5rem; }
    .header-title { font-size: 1.1rem; font-weight: 600; }
    .header-subtitle { font-size: 0.9rem; opacity: 0.9; margin-top: 0.25rem; }
    
    .docs-link {
      color: white; text-decoration: none; font-size: 0.9rem;
      padding: 0.25rem 0.5rem; border-radius: 4px;
      border: 1px solid rgba(255,255,255,0.3);
      transition: background-color 0.2s;
    }
    .docs-link:hover { background-color: rgba(255,255,255,0.2); }
    
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
    
    .file-icon {
      display: inline-block; width: 1.2em; text-align: center;
      margin-right: 0.5em;
    }
    
    .error { color: #dc2626; background: #fef2f2; padding: 1rem; border-radius: 4px; }
    
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
    
    @media (max-width: 768px) {
      body { padding: 1rem; }
      h1 { font-size: 1.5rem; }
      .file-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
      .stats { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
<body>
  <header>
    <h1>
      <span>${context.icon}</span>
      ${context.title}
    </h1>
    <div class="intro">
      <p>${context.description}</p>
      <p><strong>📍 Directory:</strong> <code>${relativePath}</code></p>
      ${context.isLLMFeedEnabled ? `
      <p><strong>🤖 Agent-readable feeds</strong> following the 
         <a href="${SITE_URL}/spec" class="docs-link">MCP / LLMFeed specification</a>
         — Part of the <a href="${SITE_URL}" class="docs-link">WellKnownMCP ecosystem</a>
         — <a href="${SITE_URL}/join" class="docs-link">Join us</a></p>
      ` : ''}
    </div>
  </header>

  <div class="stats">
    <div class="stat">
      <div class="stat-number">${files.length}</div>
      <div class="stat-label">Total Files</div>
    </div>
    <div class="stat">
      <div class="stat-number">${jsonFiles.length}</div>
      <div class="stat-label">JSON Files</div>
    </div>
    ${context.isLLMFeedEnabled ? `
    <div class="stat">
      <div class="stat-number">${llmfeedFiles.length}</div>
      <div class="stat-label">LLMFeed Files</div>
    </div>
    <div class="stat">
      <div class="stat-number">${llmfeedFiles.filter(f => f.metadata?.isValid).length}</div>
      <div class="stat-label">Valid Feeds</div>
    </div>
    <div class="stat">
      <div class="stat-number">${llmfeedFiles.filter(f => f.metadata?.trustLevel === 'certified').length}</div>
      <div class="stat-label">Certified Feeds</div>
    </div>
    ` : `
    <div class="stat">
      <div class="stat-number">${otherFiles.length}</div>
      <div class="stat-label">Other Files</div>
    </div>
    `}
  </div>

  <main>
    ${organization.byFeedType ? 
      generateLLMFeedCategories(organization.categorized, organization.uncategorized) :
      generateDirectoryListing(organization.organized)
    }
  </main>

  <footer style="margin-top: 3rem; padding: 2rem 0; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b;">
    <p><strong>Generated automatically</strong> • ${now}</p>
    <p>Directory: <code>${relativePath}</code></p>
    ${context.isLLMFeedEnabled ? `
    <p>Part of the <a href="${SITE_URL}" class="docs-link">WellKnownMCP ecosystem</a> • 
       <a href="${SITE_URL}/spec" class="docs-link">Documentation</a> • 
       <a href="${SITE_URL}/join" class="docs-link">Join the ecosystem</a></p>
    ` : ''}
  </footer>
</body>
</html>`
}

// 🎯 Génération des catégories LLMFeed
function generateLLMFeedCategories(categorized, uncategorized) {
  // Trier par priorité
  const sortedCategories = Object.keys(categorized).sort((a, b) => {
    return (FEED_TYPES[a]?.priority || 999) - (FEED_TYPES[b]?.priority || 999)
  })

  let html = ''

  // Catégories de feeds LLMFeed
  sortedCategories.forEach(feedType => {
    const typeInfo = FEED_TYPES[feedType]
    const files = categorized[feedType]
    
    html += `
    <section class="category">
      <div class="category-header">
        <div class="header-left">
          <span style="font-size: 1.2em;">${typeInfo.icon}</span>
          <div>
            <div class="header-title">${typeInfo.title}</div>
            <div class="header-subtitle">${typeInfo.description}</div>
          </div>
        </div>
        <a href="${SITE_URL}${typeInfo.docs}" class="docs-link">📚 Docs</a>
      </div>
      
      <ul class="file-list">
        ${files.map(file => generateFileItem(file, true)).join('')}
      </ul>
    </section>`
  })

  // Fichiers non catégorisés
  if (uncategorized.length > 0) {
    html += `
    <section class="category">
      <div class="category-header">
        <div class="header-left">
          <span style="font-size: 1.2em;">📄</span>
          <div>
            <div class="header-title">Other Files</div>
            <div class="header-subtitle">Additional resources and files</div>
          </div>
        </div>
      </div>
      
      <ul class="file-list">
        ${uncategorized.map(file => generateFileItem(file, false)).join('')}
      </ul>
    </section>`
  }

  return html
}

// 📁 Génération de listing par dossiers
function generateDirectoryListing(organized) {
  const directories = Object.keys(organized).sort()
  
  return directories.map(dirName => {
    const dirFiles = organized[dirName]
    const dirIcon = dirName === 'Root' ? '📄' : '📁'
    
    return `
    <section class="directory">
      <div class="directory-header">
        <div class="header-left">
          <span style="font-size: 1.2em;">${dirIcon}</span>
          <div>
            <div class="header-title">${dirName === 'Root' ? 'Root Files' : dirName}</div>
            <div class="header-subtitle">${dirFiles.length} files</div>
          </div>
        </div>
      </div>
      
      <ul class="file-list">
        ${dirFiles.map(file => generateFileItem(file, file.isLLMFeed)).join('')}
      </ul>
    </section>`
  }).join('')
}

// 📄 Génération d'un item de fichier avec gestion des tailles
function generateFileItem(file, showDetails) {
  const fileIcon = file.isLLMFeed ? '📄' : 
                  file.isJson ? '📄' :
                  file.extension === '.pem' ? '🔐' :
                  file.extension === '.md' ? '📝' : '📎'

  if (showDetails && file.metadata && (file.isLLMFeed || file.isJson)) {
    // Déterminer le mode d'affichage basé sur la taille
    let contentMode = 'full'
    let displayContent = ''
    let sizeWarning = ''
    
    if (file.metadata.parsed) {
      const contentSize = getJsonContentSize(file.metadata.parsed)
      
      if (contentSize > MAX_CONTENT_SIZE_TRUNCATED) {
        // Fichier très volumineux : affichage résumé uniquement
        contentMode = 'summary'
        displayContent = JSON.stringify(generateContentSummary(file), null, 2)
        sizeWarning = `⚠️ <strong>Large file (${(file.size / 1024).toFixed(1)} KB)</strong> - Showing summary only. <a href="${file.path}" target="_blank">Download full file</a>`
        
      } else if (contentSize > MAX_CONTENT_SIZE_FULL) {
        // Fichier moyennement volumineux : affichage tronqué
        contentMode = 'truncated'
        displayContent = truncateJsonContent(file.metadata.parsed)
        sizeWarning = `📋 <strong>Content truncated</strong> - Showing first ${TRUNCATE_LINES} lines. <a href="${file.path}" target="_blank">View full file</a>`
        
      } else {
        // Petit fichier : affichage complet
        contentMode = 'full'
        displayContent = JSON.stringify(file.metadata.parsed, null, 2)
      }
    }

    return `
    <li class="file-item">
      <details>
        <summary class="file-header">
          <div class="file-info">
            <div class="file-name">
              <span class="file-icon">${fileIcon}</span>
              <a href="${file.path}">${file.path}</a>
              ${contentMode === 'summary' ? '<span style="color: #dc2626; font-size: 0.8em;">[LARGE FILE]</span>' : ''}
              ${contentMode === 'truncated' ? '<span style="color: #f59e0b; font-size: 0.8em;">[TRUNCATED]</span>' : ''}
            </div>
            <div class="file-description">${file.metadata.description || 'No description available'}</div>
            <div class="file-meta">
              ${file.metadata.feedType && file.metadata.feedType !== 'unknown' ? `<span>🏷️ ${file.metadata.feedType}</span>` : ''}
              ${file.metadata.itemCount ? `<span>📄 ${file.metadata.itemCount} items</span>` : ''}
              ${file.metadata.version ? `<span>🔖 v${file.metadata.version}</span>` : ''}
              ${file.metadata.audience?.length ? `<span>👥 ${file.metadata.audience.join(', ')}</span>` : ''}
              <span>📁 ${(file.size / 1024).toFixed(1)} KB</span>
              ${file.metadata.trustLevel ? `<span class="trust-badge trust-${file.metadata.trustLevel}">${file.metadata.trustLevel}</span>` : ''}
            </div>
          </div>
          <span style="color: #94a3b8;">🔍 View Content</span>
        </summary>
        
        ${sizeWarning ? `
        <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 1rem; margin: 1rem 1.5rem; border-radius: 4px;">
          ${sizeWarning}
        </div>
        ` : ''}
        
        ${file.metadata.parseError ? `
        <div class="error">
          <strong>Parse Error:</strong> ${file.metadata.parseError}
        </div>
        <pre class="json-content">${file.metadata.content}</pre>
        ` : `
        <pre class="json-content">${displayContent}</pre>
        `}
      </details>
    </li>`
  } else {
    return `
    <li class="file-item">
      <div class="file-header">
        <div class="file-info">
          <div class="file-name">
            <span class="file-icon">${fileIcon}</span>
            <a href="${file.path}">${file.path}</a>
          </div>
          <div class="file-meta">
            <span>📁 ${(file.size / 1024).toFixed(1)} KB</span>
            <span>🕐 ${file.modified.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </li>`
  }
}

function loadMetadataForDir(metaFile) {
  try {
    if (fs.existsSync(metaFile)) {
      return JSON.parse(fs.readFileSync(metaFile, 'utf-8'))
    }
  } catch (error) {
    // Silently fail for individual directories
  }
  return null
}

function saveMetadataForDir(files, contentHash, metaFile) {
  const metadata = {
    generated_at: new Date().toISOString(),
    content_hash: contentHash,
    file_stats: getFileStats(files),
    total_files: files.length,
    generator_version: '2.0.0'
  }
  
  try {
    fs.writeFileSync(metaFile, JSON.stringify(metadata, null, 2), 'utf-8')
  } catch (error) {
    // Silently fail for individual directories
  }
}

function needsRegenerationForDir(files, outputFile, metaFile) {
  if (FORCE_REGENERATION) {
    return true
  }
  
  // Vérifier si index.html existe
  if (!fs.existsSync(outputFile)) {
    return true
  }
  
  // Charger les métadonnées
  const metadata = loadMetadataForDir(metaFile)
  if (!metadata) {
    return true
  }
  
  // Vérifier le nombre de fichiers
  if (metadata.total_files !== files.length) {
    return true
  }
  
  // Vérifier les timestamps et tailles
  const currentStats = getFileStats(files)
  const previousStats = new Map(metadata.file_stats.map(stat => [stat.path, stat]))
  
  for (const stat of currentStats) {
    const previous = previousStats.get(stat.path)
    if (!previous) {
      return true
    }
    if (previous.mtime !== stat.mtime || previous.size !== stat.size) {
      return true
    }
  }
  
  // Vérifier si des fichiers ont été supprimés
  for (const [path] of previousStats) {
    if (!currentStats.find(stat => stat.path === path)) {
      return true
    }
  }
  
  return false
}

function generateSingleDirectoryIndex(targetDir) {
  const outputFile = path.join(targetDir, 'index.html')
  const metaFile = path.join(targetDir, '.index-meta.json')
  
  try {
    // Vérifier que le dossier existe
    if (!fs.existsSync(targetDir)) {
      console.error(`❌ Directory not found: ${targetDir}`)
      return false
    }
    
    console.log(`   🔍 Scanning: ${path.relative(process.cwd(), targetDir)}`)
    const files = scanDirectory(targetDir)
    
    // Vérifier si la régénération est nécessaire
    if (!needsRegenerationForDir(files, outputFile, metaFile)) {
      console.log(`   ⚡ Index is up to date, skipping`)
      return true
    }
    
    // Détecter le contexte après scan des fichiers
    const context = detectDirectoryContext(targetDir, files)
    
    const jsonFiles = files.filter(f => f.isJson)
    const llmfeedFiles = files.filter(f => f.isLLMFeed)
    console.log(`   📄 Found ${files.length} files (${jsonFiles.length} JSON, ${llmfeedFiles.length} LLMFeed)`)
    
    if (context.isLLMFeedEnabled) {
      console.log(`   🤖 LLMFeed mode enabled`)
    }
    
    console.log('   🎨 Generating HTML...')
    const html = generateIndexHtml(files, targetDir, context)
    
    // Calculer le hash du contenu généré
    const contentHash = calculateFileHash(html)
    
    fs.writeFileSync(outputFile, html, 'utf-8')
    console.log(`   ✅ Generated: ${path.relative(process.cwd(), outputFile)}`)
    
    // Sauvegarder les métadonnées pour le cache
    saveMetadataForDir(files, contentHash, metaFile)
    
    // Stats
    const validFeeds = llmfeedFiles.filter(f => f.metadata?.isValid).length
    const certifiedFeeds = llmfeedFiles.filter(f => f.metadata?.trustLevel === 'certified').length
    
    if (llmfeedFiles.length > 0) {
      console.log(`   📊 ${validFeeds}/${llmfeedFiles.length} valid LLMFeeds, ${certifiedFeeds} certified`)
    }
    
    return true
    
  } catch (error) {
    console.error(`❌ Error generating index for ${targetDir}:`, error.message)
    return false
  }
}

function loadMetadata() {
  return loadMetadataForDir(META_FILE)
}

function saveMetadata(files, contentHash) {
  saveMetadataForDir(files, contentHash, META_FILE)
}

function needsRegeneration(files) {
  return needsRegenerationForDir(files, OUTPUT_FILE, META_FILE)
}

// 🚀 Fonction principale
function generateDirectoryIndex() {
  if (RECURSIVE_GENERATION) {
    generateRecursiveIndexes()
  } else {
    generateSingleDirectoryIndex(TARGET_DIR)
  }
}

// 🎯 Aide
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
📁 Enhanced Directory Index Generator with File Size Management

Automatically detects .llmfeed.json files and enables advanced features:
- LLMFeed categorization by feed_type
- Trust badges and certification levels  
- Agent-specific HTML metadata
- Links to ecosystem and documentation
- Smart caching to avoid unnecessary regeneration
- Intelligent file size handling to prevent page overload

🎛️ File Size Management:
  - Files < 50KB: Full content display
  - Files 50KB-200KB: Truncated display (first 50 lines)
  - Files > 200KB: Summary metadata only

Usage:
  node generate-directory-index-enhanced.js [directory] [options]

Examples:
  node generate-directory-index-enhanced.js                           # Default: public/.well-known
  node generate-directory-index-enhanced.js public/exports           # Enhanced for LLMFeeds
  node generate-directory-index-enhanced.js public/exports --recursive # Generate indexes for all subdirs
  node generate-directory-index-enhanced.js public/exports -r -f      # Recursive + force regeneration
  node generate-directory-index-enhanced.js public/images            # Basic mode for non-feeds
  
Options:
  --recursive, -r                 Generate indexes for all subdirectories containing files
  --force, -f                     Force regeneration even if no changes detected
  --help, -h                      Show this help message

Recursive mode example:
  public/exports/examples/
  ├── index.html                  # Main index (all files + subdirs)
  ├── dynamic-feed-example.llmfeed.json
  ├── industries/
  │   ├── index.html              # Industries index (only industry files)
  │   ├── education-prompt.llmfeed.json
  │   └── france-care.mcp.llmfeed.json
  └── personas/
      ├── index.html              # Personas index (only persona files)
      ├── ai-developer.llmfeed.json
      └── oss-maintainer.llmfeed.json

Features:
  ✅ Auto-detection of .llmfeed.json files
  ✅ Feed categorization by type (mcp, export, prompt, etc.)
  ✅ Trust level badges (certified, signed, basic)
  ✅ Agent-ready HTML metadata 
  ✅ Ecosystem links and documentation
  ✅ Smart caching with change detection (per directory)
  ✅ Recursive index generation for subdirectories
  ✅ Intelligent file size handling to prevent overload
  ✅ Visual badges for large/truncated files
  ✅ Direct download links for full content
  ✅ Fallback to basic directory listing
  
Cache optimization:
  - Tracks file timestamps and sizes for each directory
  - Skips regeneration if no changes detected
  - Stores metadata in .index-meta.json (per directory)
  - Use --force to bypass cache
  - In recursive mode, each subdirectory has its own cache
  
File Size Handling:
  - Large files show summary metadata + download link
  - Truncated files show first 50 lines + view full link
  - Visual badges indicate file treatment level
  - Configurable size thresholds in script constants
  
Output:
  Creates index.html in the specified directory (and subdirectories if --recursive)
  Creates .index-meta.json for caching (can be gitignored)
`)
  process.exit(0)
}

// 🎯 Exécution
if (require.main === module) {
  generateDirectoryIndex()
}

module.exports = { generateDirectoryIndex }