
export interface MCPBlockStatus {
  blockName: string;
  content: any;
  isSigned: boolean;
  isCertificationPresent: boolean;
  certificationAuthority: string | null;
  certificationOwner: string | null;
}
