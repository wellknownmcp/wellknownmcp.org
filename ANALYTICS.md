# WellKnownMCP Analytics

## Overview
This system tracks AI agent interactions with your LLMFeed endpoints while maintaining privacy and security.

## Files Created
- `middleware.ts` - Edge Runtime compatible request interceptor
- `app/api/log-agent-event/route.ts` - Logging API endpoint
- `utils/analytics-salt.ts` - Secure salt management
- `app/analytics/page.tsx` - Analytics dashboard page
- `components/AgentAnalyticsDashboard.tsx` - Dashboard component

## Security Features
- 🔐 IP addresses are hashed with secure salt
- 📊 No personal data stored
- 🚫 GDPR compliant (no PII collection)
- 🔄 Configurable data retention

## Usage
1. Access any .llmfeed.json file to generate analytics data
2. Visit `/analytics` to view the dashboard
3. Use `npm run analytics:status` to check data files

## Scripts
- `npm run analytics:clear` - Clear all analytics data
- `npm run analytics:backup` - Backup current data
- `npm run analytics:status` - Check analytics status

## Environment Variables
- `ANALYTICS_SALT` - Secure salt for IP hashing (required)
- `NODE_ENV` - Set to 'production' for strict validation

Generated: 2025-06-19T22:00:54.813Z
