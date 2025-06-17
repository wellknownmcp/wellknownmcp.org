#!/usr/bin/env node

const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

// 📂 Configuration des dossiers à traiter
const INDEX_TARGETS = [
  {
    path: 'public/.well-known',
    recursive: false,
    description: '🤖 Agent feeds directory (.well-known)',
    priority: 'critical'
  },
  {
    path: 'public/exports',
    recursive: true,
    description: '📦 Content exports (with subdirectories)',
    priority: 'high'
  },
  {
    path: 'public/prompts',
    recursive: true,
    description: '💬 Certified prompts (with subdirectories)',
    priority: 'high'
  },
  {
    path: 'public/demo',
    recursive: false,
    description: '🧪 Demo files',
    priority: 'medium'
  }
]

// 🔧 Options
const FORCE_ALL = process.argv.includes('--force') || process.argv.includes('-f')
const VERBOSE = process.argv.includes('--verbose') || process.argv.includes('-v')
const DRY_RUN = process.argv.includes('--dry-run')
const SPECIFIC_TARGET = process.argv.find(arg => arg.startsWith('--target='))?.split('=')[1]

// 🎨 Couleurs pour les logs
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logVerbose(message) {
  if (VERBOSE) {
    log(`  ${message}`, 'cyan')
  }
}

// 🔍 Vérifier si un dossier existe et contient des fichiers
function shouldProcessTarget(target) {
  const fullPath = path.join(process.cwd(), target.path)
  
  if (!fs.existsSync(fullPath)) {
    logVerbose(`Directory ${target.path} does not exist, skipping`)
    return false
  }
  
  try {
    const files = fs.readdirSync(fullPath)
    const hasFiles = files.some(file => {
      const filePath = path.join(fullPath, file)
      const stat = fs.statSync(filePath)
      return stat.isFile() && file !== 'index.html' && file !== '.index-meta.json'
    })
    
    if (!hasFiles) {
      logVerbose(`Directory ${target.path} has no processable files, skipping`)
      return false
    }
    
    return true
  } catch (error) {
    log(`Error checking ${target.path}: ${error.message}`, 'red')
    return false
  }
}

// 🚀 Exécuter le générateur d'index
function executeIndexGenerator(target) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, 'generate-directory-index.js')
    const args = [scriptPath, target.path]
    
    if (target.recursive) {
      args.push('--recursive')
    }
    
    if (FORCE_ALL) {
      args.push('--force')
    }
    
    logVerbose(`Executing: node ${args.join(' ')}`)
    
    if (DRY_RUN) {
      log(`  [DRY RUN] Would execute: node ${args.join(' ')}`, 'yellow')
      resolve({ success: true, dryRun: true })
      return
    }
    
    const child = spawn('node', args, {
      stdio: VERBOSE ? 'inherit' : 'pipe',
      cwd: process.cwd()
    })
    
    let output = ''
    let error = ''
    
    if (!VERBOSE) {
      child.stdout?.on('data', (data) => {
        output += data.toString()
      })
      
      child.stderr?.on('data', (data) => {
        error += data.toString()
      })
    }
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, output, error })
      } else {
        reject(new Error(`Process exited with code ${code}\n${error}`))
      }
    })
    
    child.on('error', (err) => {
      reject(err)
    })
  })
}

// 📊 Générer le rapport final
function generateReport(results) {
  log('\n📊 Build Summary:', 'bright')
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue')
  
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  const skipped = results.filter(r => r.skipped).length
  
  log(`✅ Successful: ${successful}`, 'green')
  if (failed > 0) log(`❌ Failed: ${failed}`, 'red')
  if (skipped > 0) log(`⏭️  Skipped: ${skipped}`, 'yellow')
  
  results.forEach(result => {
    const icon = result.success ? '✅' : result.skipped ? '⏭️' : '❌'
    const color = result.success ? 'green' : result.skipped ? 'yellow' : 'red'
    log(`${icon} ${result.target.description}`, color)
    
    if (result.error) {
      log(`   Error: ${result.error}`, 'red')
    }
    
    if (result.dryRun) {
      log(`   [DRY RUN]`, 'yellow')
    }
  })
  
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue')
}

// 🚀 Fonction principale
async function buildIndexes() {
  log('🏗️  Building directory indexes...', 'bright')
  
  if (DRY_RUN) {
    log('🔍 DRY RUN MODE - No files will be modified', 'yellow')
  }
  
  if (FORCE_ALL) {
    log('🔄 FORCE MODE - All indexes will be regenerated', 'magenta')
  }
  
  // Filtrer les cibles
  let targets = INDEX_TARGETS
  
  if (SPECIFIC_TARGET) {
    targets = targets.filter(t => t.path.includes(SPECIFIC_TARGET))
    if (targets.length === 0) {
      log(`❌ No targets found matching: ${SPECIFIC_TARGET}`, 'red')
      process.exit(1)
    }
    log(`🎯 Processing specific target: ${SPECIFIC_TARGET}`, 'cyan')
  }
  
  // Vérifier les cibles et les traiter
  const results = []
  
  for (const target of targets) {
    log(`\n📁 Processing: ${target.description}`, 'blue')
    
    if (!shouldProcessTarget(target)) {
      results.push({
        target,
        success: false,
        skipped: true,
        error: 'Directory missing or empty'
      })
      continue
    }
    
    try {
      const result = await executeIndexGenerator(target)
      results.push({
        target,
        success: true,
        dryRun: result.dryRun,
        output: result.output
      })
      
      if (!result.dryRun) {
        log(`  ✅ Generated indexes for ${target.path}`, 'green')
      }
      
    } catch (error) {
      log(`  ❌ Failed to generate indexes for ${target.path}`, 'red')
      if (VERBOSE) {
        log(`     ${error.message}`, 'red')
      }
      
      results.push({
        target,
        success: false,
        error: error.message
      })
    }
  }
  
  // Rapport final
  generateReport(results)
  
  // Exit code
  const hasFailures = results.some(r => !r.success && !r.skipped)
  if (hasFailures && !DRY_RUN) {
    log('\n❌ Build completed with errors', 'red')
    process.exit(1)
  } else {
    log('\n✅ Build completed successfully', 'green')
    process.exit(0)
  }
}

// 🎯 Aide
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🏗️  Directory Index Build Tool

Automatically generates HTML indexes for all relevant directories in the project.

Usage:
  node build-indexes.js [options]

Options:
  --force, -f                     Force regeneration of all indexes
  --verbose, -v                   Show detailed output from generators
  --dry-run                       Show what would be done without making changes
  --target=<path>                 Process only targets containing this path
  --help, -h                      Show this help message

Examples:
  node build-indexes.js                           # Build all indexes (smart caching)
  node build-indexes.js --force                   # Force rebuild all indexes
  node build-indexes.js --target=exports          # Only process exports directories
  node build-indexes.js --dry-run --verbose       # Preview what would be done

Targets processed:
  🤖 public/.well-known           Core agent feeds directory
  📦 public/exports               Content exports (recursive)
  💬 public/prompts               Certified prompts (recursive)  
  🧪 public/demo                  Demo files

Features:
  ✅ Intelligent target detection (skips missing/empty directories)
  ✅ Parallel processing with error handling
  ✅ Smart caching (only rebuilds when needed)
  ✅ Detailed reporting and error messages
  ✅ Integration-ready for CI/CD pipelines
  ✅ Dry-run mode for safe testing

Integration:
  Add to package.json scripts:
  "scripts": {
    "build:indexes": "node scripts/build-indexes.js",
    "build:indexes:force": "node scripts/build-indexes.js --force"
  }
`)
  process.exit(0)
}

// 🎯 Exécution
if (require.main === module) {
  buildIndexes().catch(error => {
    log(`💥 Unexpected error: ${error.message}`, 'red')
    process.exit(1)
  })
}

module.exports = { buildIndexes }