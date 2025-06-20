import { MCPBlockStatus, CertificationInfo } from '@/types/MCPBlockStatus';

export function analyzeBlocks(feed: any): MCPBlockStatus[] {
  if (!feed || typeof feed !== 'object') return [];

  const signed = new Set(feed.trust?.signed_blocks || []);
  const excludedBlocks = new Set(['signature', 'certification', '_meta', '_verification_help']);

  // Process certifications
  const certifiedBlocks = new Map<string, CertificationInfo[]>();
  
  const certifications = Array.isArray(feed.certification)
    ? feed.certification
    : feed.certification
    ? [feed.certification]
    : [];

  for (const cert of certifications) {
    const blocks = cert.signed_blocks || cert.certified_blocks || [];
    const certInfo: CertificationInfo = {
      authority: cert.authority || extractAuthorityFromHint(cert.public_key_hint),
      owner: cert.owner,
      algorithm: cert.algorithm || 'ed25519',
      issued_at: cert.issued_at,
      public_key_hint: cert.public_key_hint,
      signed_blocks: blocks,
      signature_value_hash: cert.signature_value_hash
    };

    for (const block of blocks) {
      if (!certifiedBlocks.has(block)) {
        certifiedBlocks.set(block, []);
      }
      certifiedBlocks.get(block)!.push(certInfo);
    }
  }

  return Object.entries(feed).map(([blockName, content]) => {
    const blockCertifications = certifiedBlocks.get(blockName) || [];
    const primaryCert = blockCertifications[0]; // Use first certification as primary

    return {
      blockName,
      content,
      isSigned: signed.has(blockName),
      isCertificationPresent: blockCertifications.length > 0,
      certificationAuthority: primaryCert?.authority || null,
      certificationOwner: primaryCert?.owner || null,
      // Additional metadata
      isExcludedFromSigning: excludedBlocks.has(blockName),
      certificationCount: blockCertifications.length,
      certificationAlgorithm: primaryCert?.algorithm || null,
      certificationIssuedAt: primaryCert?.issued_at || null,
      hasSignatureHash: !!primaryCert?.signature_value_hash,
      allCertifications: blockCertifications,
      contentType: getContentType(content),
      contentSize: getContentSize(content),
      isEmpty: content == null || (typeof content === 'object' && Object.keys(content).length === 0),
    };
  });
}

/**
 * Extract authority name from public key hint URL
 */
function extractAuthorityFromHint(hint?: string): string | undefined {
  if (!hint) return undefined;
  
  try {
    const url = new URL(hint);
    const hostname = url.hostname;
    
    // Extract meaningful authority name
    if (hostname.includes('wellknownmcp.org')) return 'WellKnownMCP';
    if (hostname.includes('llmca.org')) return 'LLMCA';
    if (hostname.includes('github.com')) return 'GitHub';
    
    // Generic fallback
    return hostname.split('.')[0] || hostname;
  } catch {
    return hint.split('/').pop()?.replace(/\.(pem|json)$/, '') || 'Unknown';
  }
}

/**
 * Determine content type for better display
 */
function getContentType(content: any): string {
  if (content == null) return 'null';
  if (typeof content === 'string') return 'string';
  if (typeof content === 'number') return 'number';
  if (typeof content === 'boolean') return 'boolean';
  if (Array.isArray(content)) return 'array';
  if (typeof content === 'object') return 'object';
  return 'unknown';
}

/**
 * Calculate approximate content size
 */
function getContentSize(content: any): number {
  if (content == null) return 0;
  
  try {
    return JSON.stringify(content).length;
  } catch {
    return String(content).length;
  }
}

/**
 * Enhanced block analysis with validation context
 */
export function analyzeBlocksWithValidation(
  feed: any, 
  signatureStatus?: { ok: boolean; message: string } | null,
  certificationResults?: Array<{ cert: any; result: { ok: boolean; message: string } }>
): MCPBlockStatus[] {
  const blocks = analyzeBlocks(feed);
  
  return blocks.map(block => ({
    ...block,
    // Add validation context using the new helper functions
    signatureValidationStatus: getSignatureValidationStatus(block, signatureStatus),
    certificationValidationStatus: getCertificationValidationStatus(
      block.blockName, 
      certificationResults || []
    ),
    hasValidationErrors: hasValidationErrors(
      block, // Pass the whole block object
      signatureStatus,
      certificationResults || []
    ),
  }));
}

/**
 * Get certification validation status for a specific block
 */
function getCertificationValidationStatus(
  blockName: string,
  certificationResults: Array<{ cert: any; result: { ok: boolean; message: string } }>
): 'valid' | 'invalid' | 'error' | 'not_certified' | 'pending' {
  const relevantCerts = certificationResults.filter(certResult => 
    (certResult.cert.signed_blocks || []).includes(blockName)
  );
  
  if (relevantCerts.length === 0) return 'not_certified';
  
  const allValid = relevantCerts.every(cert => cert.result.ok);
  const hasError = relevantCerts.some(cert => 
    cert.result.message.includes('error') || cert.result.message.includes('failed')
  );
  
  if (allValid) return 'valid';
  if (hasError) return 'error';
  return 'invalid';
}

/**
 * Get signature validation status for a specific block
 */
function getSignatureValidationStatus(
  block: { blockName: string; isSigned: boolean },
  signatureStatus?: { ok: boolean; message: string } | null
): 'valid' | 'invalid' | 'error' | 'pending' | 'not_signed' {
  if (!block.isSigned) return 'not_signed';
  
  if (!signatureStatus) return 'pending';
  
  if (signatureStatus.ok) return 'valid';
  
  // Check if it's an error (network, key issues) vs invalid signature
  const isError = signatureStatus.message.includes('error') || 
                  signatureStatus.message.includes('failed') ||
                  signatureStatus.message.includes('Failed to load') ||
                  signatureStatus.message.includes('network') ||
                  signatureStatus.message.includes('timeout');
  
  return isError ? 'error' : 'invalid';
}

/**
 * Check if block has any validation errors
 */
function hasValidationErrors(
  block: { blockName: string; isSigned: boolean },
  signatureStatus?: { ok: boolean; message: string } | null,
  certificationResults?: Array<{ cert: any; result: { ok: boolean; message: string } }>
): boolean {
  // Check signature errors using the helper function
  const sigStatus = getSignatureValidationStatus(block, signatureStatus);
  if (sigStatus === 'invalid' || sigStatus === 'error') {
    return true;
  }
  
  // Check certification errors
  const certStatus = getCertificationValidationStatus(block.blockName, certificationResults || []);
  if (certStatus === 'invalid' || certStatus === 'error') {
    return true;
  }
  
  return false;
}