export function parseFeed(json: any) {
  if (!json || typeof json !== 'object') return { type: 'invalid' };

  if (json.mcp_metadata) return { type: 'mcp' };
  if (json.origin && json.feeds) return { type: 'index' };
  if (json.origin && json.data) return { type: 'export' };

  return { type: 'unknown' };
}
