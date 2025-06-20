// types/MCPBlockStatus.ts (recommandé au lieu de .d.ts)

export interface CertificationInfo {
  authority?: string;
  owner?: string;
  algorithm?: string;
  issued_at?: string;
  public_key_hint?: string;
  signed_blocks?: string[];
  signature_value_hash?: string;
}

export interface MCPBlockStatus {
  // ===== PROPRIÉTÉS EXISTANTES (à conserver) =====
  blockName: string;
  content: any;
  isSigned: boolean;
  isCertificationPresent: boolean;
  certificationAuthority: string | null;
  certificationOwner: string | null;
  
  // ===== NOUVELLES PROPRIÉTÉS ÉTENDUES =====
  
  // Métadonnées de signature
  isExcludedFromSigning?: boolean;
  
  // Métadonnées de certification  
  certificationCount?: number;
  certificationAlgorithm?: string | null;
  certificationIssuedAt?: string | null;
  hasSignatureHash?: boolean;
  allCertifications?: CertificationInfo[];
  
  // Métadonnées de contenu
  contentType?: string;
  contentSize?: number;
  isEmpty?: boolean;
  
  // États de validation (ajoutés par analyzeBlocksWithValidation)
  signatureValidationStatus?: SignatureValidationStatus;
  certificationValidationStatus?: CertificationValidationStatus;
  hasValidationErrors?: boolean;
}

// Types pour les statuts de validation
export type SignatureValidationStatus = 'valid' | 'invalid' | 'error' | 'pending' | 'not_signed';
export type CertificationValidationStatus = 'valid' | 'invalid' | 'error' | 'not_certified' | 'pending';

// Type helper pour les résultats de vérification
export interface VerificationResult {
  ok: boolean;
  message: string;
}

// Type pour les résultats de certification avec hash
export interface CertificationVerificationResult {
  cert: any;
  result: VerificationResult;
  signatureHashResult?: VerificationResult;
}

// ===== UTILITAIRES & HELPERS (possibles avec .ts) =====

/**
 * Type guard pour vérifier si un block a des erreurs de validation
 */
export function hasBlockValidationErrors(block: MCPBlockStatus): boolean {
  return block.hasValidationErrors === true ||
         block.signatureValidationStatus === 'invalid' ||
         block.signatureValidationStatus === 'error' ||
         block.certificationValidationStatus === 'invalid' ||
         block.certificationValidationStatus === 'error';
}

/**
 * Obtenir un résumé textuel du statut d'un block
 */
export function getBlockStatusSummary(block: MCPBlockStatus): string {
  if (hasBlockValidationErrors(block)) {
    return 'Invalid';
  }
  
  if (block.signatureValidationStatus === 'valid' && 
      block.certificationValidationStatus === 'valid') {
    return 'Fully Verified';
  }
  
  if (block.signatureValidationStatus === 'valid') {
    return 'Signed';
  }
  
  if (block.signatureValidationStatus === 'error') {
    return 'Signature Error';
  }
  
  if (block.signatureValidationStatus === 'not_signed') {
    return 'Not Signed';
  }
  
  return 'Pending';
}

/**
 * Constants pour les statuts
 */
export const BLOCK_STATUS = {
  SIGNATURE: {
    VALID: 'valid',
    INVALID: 'invalid',
    ERROR: 'error',
    PENDING: 'pending',
    NOT_SIGNED: 'not_signed'
  },
  CERTIFICATION: {
    VALID: 'valid',
    INVALID: 'invalid',
    ERROR: 'error',
    NOT_CERTIFIED: 'not_certified',
    PENDING: 'pending'
  }
} as const;