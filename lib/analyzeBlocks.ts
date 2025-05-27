export function analyzeBlocks(feed: any): any[] {
  if (!feed || typeof feed !== 'object') return [];

  const signed = new Set(feed.trust?.signed_blocks || []);
  const signatureValid = new Set(feed._meta?.signature_valid_blocks || []);

  const certifiedBlocks = new Set();
  const certificationValid = new Set();
  const certMap = new Map();

  if (feed.certification && Array.isArray(feed.certification)) {
    for (const cert of feed.certification) {
      const blocks = cert.certified_blocks || [];
      for (const block of blocks) {
        certifiedBlocks.add(block);
        if (cert._valid) certificationValid.add(block);
        certMap.set(block, cert);
      }
    }
  }

  return Object.entries(feed)
    .filter(([key, val]) => typeof val === 'object' && key !== 'signed_blocks' && key !== 'certifications' && key !== '_meta')
    .map(([blockName, content]) => {
      return {
        blockName,
        content,
        isSigned: signed.has(blockName),
        isSignatureValid: signatureValid.has(blockName),
        isCertified: certifiedBlocks.has(blockName),
        isCertificationValid: certificationValid.has(blockName),
        authority: certMap.get(blockName)?.authority || null,
        owner: certMap.get(blockName)?.owner || null,
      };
    });
}
