// analytics.config.example.js
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
