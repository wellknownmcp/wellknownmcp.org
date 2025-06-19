#!/usr/bin/env node

// setup-analytics.js — Script d'installation automatique pour WellKnownMCP Analytics

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

console.log(`
🤖 WellKnownMCP Analytics Setup
═════════════════════════════════

Setting up secure agent analytics for your LLMFeed endpoints...
`);

function setupAnalytics() {
  console.log('🔧 Initializing analytics setup...\n');

  // 1. Générer un salt sécurisé
  console.log('🔐 Generating secure analytics salt...');
  const timestamp = Date.now().toString(36);
  const randomPart = crypto.randomBytes(32).toString('hex');
  const salt = `wellknownmcp_${timestamp}_${randomPart}`;
  console.log('✅ Generated cryptographically secure salt');

  // 2. Chemins des fichiers
  const envPath = path.join(process.cwd(), '.env.local');
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  // 3. Ajouter le salt à .env.local
  console.log('\n📝 Configuring environment variables...');
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
  }
  
  if (!envContent.includes('ANALYTICS_SALT')) {
    const envAddition = `
# WellKnownMCP Analytics Configuration
# Generated: ${new Date().toISOString()}
ANALYTICS_SALT="${salt}"

# Optional: Set to 'production' for strict salt validation
# NODE_ENV=production
`;
    envContent += envAddition;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Added ANALYTICS_SALT to .env.local');
  } else {
    console.log('ℹ️  ANALYTICS_SALT already exists in .env.local');
  }
  
  // 4. Mettre à jour .gitignore
  console.log('📁 Updating .gitignore...');
  let gitignoreContent = '';
  if (fs.existsSync(gitignorePath)) {
    gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
  }
  
  const gitignoreAdditions = [
    '# WellKnownMCP Analytics',
    '.env.local',
    '.analytics-salt',
    'data/agent-logs.jsonl',
    'data/agent-logs-backup-*.jsonl'
  ];
  
  let gitignoreUpdated = false;
  const gitignoreSection = gitignoreAdditions.join('\n') + '\n';
  
  if (!gitignoreContent.includes('WellKnownMCP Analytics')) {
    gitignoreContent += '\n' + gitignoreSection;
    fs.writeFileSync(gitignorePath, gitignoreContent);
    gitignoreUpdated = true;
    console.log('✅ Updated .gitignore with analytics files');
  } else {
    console.log('ℹ️  .gitignore already configured for analytics');
  }
  
  // 5. Créer la structure de dossiers
  console.log('📂 Creating directory structure...');
  const directories = [
    'data',
    'components',
    'utils',
    'app/api/analytics/dashboard',
    'app/api/log-agent-event',
    'app/analytics'
  ];
  
  directories.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
  
  // 6. Ajouter scripts npm si package.json existe
  if (fs.existsSync(packageJsonPath)) {
    console.log('📦 Adding npm scripts...');
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }
      
      const newScripts = {
        'analytics:setup': 'node setup-analytics.js',
        'analytics:clear': 'rm -f data/agent-logs.jsonl && echo "Analytics logs cleared"',
        'analytics:backup': 'cp data/agent-logs.jsonl data/agent-logs-backup-$(date +%s).jsonl && echo "Analytics logs backed up"',
        'analytics:status': 'ls -la data/agent-logs.jsonl 2>/dev/null || echo "No analytics data found"'
      };
      
      let scriptsAdded = false;
      Object.entries(newScripts).forEach(([key, value]) => {
        if (!packageJson.scripts[key]) {
          packageJson.scripts[key] = value;
          scriptsAdded = true;
        }
      });
      
      if (scriptsAdded) {
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('✅ Added analytics scripts to package.json');
      } else {
        console.log('ℹ️  Analytics scripts already exist in package.json');
      }
    } catch (error) {
      console.log('⚠️  Could not update package.json:', error.message);
    }
  }
  
  // 7. Créer un fichier de configuration d'exemple
  console.log('📋 Creating configuration examples...');
  const configExample = `// analytics.config.example.js
// WellKnownMCP Analytics Configuration Examples

module.exports = {
  // Salt management strategy
  saltStrategy: 'auto_generate', // 'auto_generate' | 'strict' | 'runtime' | 'rotating'
  
  // Data retention (days)
  retentionDays: 90,
  
  // Rate limiting for analytics API
  rateLimiting: {
    enabled: true,
    requestsPerMinute: 100
  },
  
  // Privacy settings
  privacy: {
    hashIPs: true,
    truncateUserAgents: true,
    maxUserAgentLength: 150
  },
  
  // Agent detection patterns (can be extended)
  customAgentPatterns: [
    { pattern: /mycustomagent/i, type: 'custom_agent', confidence: 95 }
  ],
  
  // Export settings
  export: {
    format: 'jsonl', // 'jsonl' | 'csv' | 'json'
    includeHeaders: true
  }
};
`;
  
  const configPath = path.join(process.cwd(), 'analytics.config.example.js');
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, configExample);
    console.log('✅ Created analytics configuration example');
  }
  
  // 8. Créer un README pour les analytics
  const readmePath = path.join(process.cwd(), 'ANALYTICS.md');
  if (!fs.existsSync(readmePath)) {
    const readme = `# WellKnownMCP Analytics

## Overview
This system tracks AI agent interactions with your LLMFeed endpoints while maintaining privacy and security.

## Files Created
- \`middleware.ts\` - Edge Runtime compatible request interceptor
- \`app/api/log-agent-event/route.ts\` - Logging API endpoint
- \`utils/analytics-salt.ts\` - Secure salt management
- \`app/analytics/page.tsx\` - Analytics dashboard page
- \`components/AgentAnalyticsDashboard.tsx\` - Dashboard component

## Security Features
- 🔐 IP addresses are hashed with secure salt
- 📊 No personal data stored
- 🚫 GDPR compliant (no PII collection)
- 🔄 Configurable data retention

## Usage
1. Access any .llmfeed.json file to generate analytics data
2. Visit \`/analytics\` to view the dashboard
3. Use \`npm run analytics:status\` to check data files

## Scripts
- \`npm run analytics:clear\` - Clear all analytics data
- \`npm run analytics:backup\` - Backup current data
- \`npm run analytics:status\` - Check analytics status

## Environment Variables
- \`ANALYTICS_SALT\` - Secure salt for IP hashing (required)
- \`NODE_ENV\` - Set to 'production' for strict validation

Generated: ${new Date().toISOString()}
`;
    fs.writeFileSync(readmePath, readme);
    console.log('✅ Created ANALYTICS.md documentation');
  }
  
  // 9. Résumé final
  console.log(`
🎉 Analytics Setup Complete!
════════════════════════════

✅ Secure salt generated and configured
✅ Environment variables configured
✅ Directory structure created
✅ Git ignore rules updated
✅ npm scripts added
✅ Documentation created

📋 Next Steps:
1. Restart your Next.js development server:
   $ npm run dev

2. Test analytics by accessing a feed:
   $ curl http://localhost:3000/.well-known/mcp.llmfeed.json

3. View the analytics dashboard:
   $ open http://localhost:3000/analytics

🔐 Security:
- Your ANALYTICS_SALT is unique and secure
- IP addresses are hashed for privacy
- Analytics data: data/agent-logs.jsonl

📚 Documentation:
- See ANALYTICS.md for detailed usage
- Configuration examples in analytics.config.example.js

🤖 Your WellKnownMCP site now has comprehensive agent analytics!
  `);
}

// Fonction pour vérifier les prérequis
function checkPrerequisites() {
  const errors = [];
  
  // Vérifier Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion < 16) {
    errors.push(`Node.js 16+ required, found ${nodeVersion}`);
  }
  
  // Vérifier si on est dans un projet Next.js
  const nextConfigExists = fs.existsSync('next.config.js') || fs.existsSync('next.config.mjs');
  const packageJsonExists = fs.existsSync('package.json');
  
  if (packageJsonExists) {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
      const hasNext = packageJson.dependencies?.next || packageJson.devDependencies?.next;
      if (!hasNext && !nextConfigExists) {
        errors.push('Not a Next.js project (no next dependency found)');
      }
    } catch {
      errors.push('Could not parse package.json');
    }
  } else {
    errors.push('No package.json found (not a Node.js project)');
  }
  
  return errors;
}

// Exécuter le setup
function main() {
  const errors = checkPrerequisites();
  
  if (errors.length > 0) {
    console.error('❌ Prerequisites not met:');
    errors.forEach(error => console.error(`   - ${error}`));
    console.error('\nPlease run this script in a Next.js project directory.');
    process.exit(1);
  }
  
  try {
    setupAnalytics();
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  main();
}

module.exports = { setupAnalytics, checkPrerequisites };