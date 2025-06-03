
import { MCPBlockStatus } from '@/types/MCPBlockStatus';

export function analyzeBlocks(feed: any): MCPBlockStatus[] {
  if (!feed || typeof feed !== 'object') return [];

  const signed = new Set(feed.trust?.signed_blocks || []);

  const certifiedBlocks = new Set<string>();
  const certMap = new Map<string, any>();

  const certifications = Array.isArray(feed.certification)
    ? feed.certification
    : feed.certification
    ? [feed.certification]
    : [];

  for (const cert of certifications) {
    const blocks = cert.signed_blocks || cert.certified_blocks || [];
    for (const block of blocks) {
      certifiedBlocks.add(block);
      certMap.set(block, cert);
    }
  }

  return Object.entries(feed).map(([blockName, content]) => {
    return {
      blockName,
      content,
      isSigned: signed.has(blockName),
      isCertificationPresent: certifiedBlocks.has(blockName),
      certificationAuthority: certMap.get(blockName)?.authority || null,
      certificationOwner: certMap.get(blockName)?.owner || null,
    };
  });
}
