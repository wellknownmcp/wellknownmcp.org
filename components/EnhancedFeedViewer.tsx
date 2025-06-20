'use client';

import { useEffect, useState } from 'react';
import {
  verifyFeedSignature,
  verifyFeedCertification,
  verifySignatureHash,
} from '@/lib/verifyCrypto';
import { analyzeBlocksWithValidation } from '@/lib/analyzeBlocks';
import BlockCard from '@/components/BlockCard';
import { VerificationResult, CertificationVerificationResult } from '@/types/MCPBlockStatus';

export default function EnhancedFeedViewer({
  feed,
  mode = 'hub',
}: {
  feed: any;
  mode?: 'hub' | 'verify';
}) {
  const [signatureStatus, setSignatureStatus] = useState<VerificationResult | null>(null);
  const [blockStatuses, setBlockStatuses] = useState<any[]>([]);
  const [certResults, setCertResults] = useState<CertificationVerificationResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!feed) {
      setLoading(false);
      return;
    }

    const runAnalysis = async () => {
      setLoading(true);
      
      // 1. Verify main signature
      let sigStatus: VerificationResult;
      try {
        sigStatus = await verifyFeedSignature(feed);
      } catch (e) {
        sigStatus = {
          ok: false,
          message: 'Signature check failed: ' + (e?.message ?? String(e)),
        };
      }
      setSignatureStatus(sigStatus);

      // 2. Process certifications
      const certs =
        feed.certification && Array.isArray(feed.certification)
          ? feed.certification
          : feed.certification
          ? [feed.certification]
          : [];

      const certificationResults: CertificationVerificationResult[] = [];
      
      for (let i = 0; i < certs.length; i++) {
        const cert = certs[i];
        
        try {
          // Verify certification signature
          const certResult = await verifyFeedCertification(feed, cert);
          
          // Verify signature hash if present
          let signatureHashResult: VerificationResult | undefined;
          if (cert.signature_value_hash) {
            try {
              signatureHashResult = await verifySignatureHash(feed, cert);
            } catch (e) {
              signatureHashResult = {
                ok: false,
                message: 'Signature hash verification failed: ' + (e?.message ?? String(e))
              };
            }
          }
          
          certificationResults.push({
            cert,
            result: certResult,
            signatureHashResult
          });
        } catch (e) {
          certificationResults.push({
            cert,
            result: {
              ok: false,
              message: 'Certification verification failed: ' + (e?.message ?? String(e))
            }
          });
        }
      }
      
      setCertResults(certificationResults);

      // 3. Analyze blocks with validation context
      const blocks = analyzeBlocksWithValidation(feed, sigStatus, certificationResults);
      setBlockStatuses(blocks);
      
      setLoading(false);
    };

    runAnalysis();
  }, [feed]);

  if (!feed || typeof feed !== 'object') {
    return <p className="text-red-500">❌ No valid feed provided.</p>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Analyzing feed...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Signature Status */}
      {signatureStatus && (
        <div className={`p-4 rounded-lg border ${
          signatureStatus.ok 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <h3 className="font-semibold flex items-center gap-2">
            {signatureStatus.ok ? '✅' : '❌'} 
            Feed Signature
          </h3>
          <p className="text-sm mt-1">{signatureStatus.message}</p>
        </div>
      )}

      {/* Certification Status */}
      {certResults.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">🏆 Certifications</h3>
          {certResults.map((certResult, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              certResult.result.ok 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    certResult.result.ok ? 'text-blue-800' : 'text-red-800'
                  }`}>
                    {certResult.result.ok ? '✅' : '❌'} 
                    Certification {index + 1}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    certResult.result.ok ? 'text-blue-700' : 'text-red-700'
                  }`}>
                    {certResult.result.message}
                  </p>
                  
                  {/* Signature Hash Verification */}
                  {certResult.signatureHashResult && (
                    <div className={`mt-2 text-sm ${
                      certResult.signatureHashResult.ok ? 'text-green-700' : 'text-red-700'
                    }`}>
                      <span className="font-medium">
                        {certResult.signatureHashResult.ok ? '✅' : '❌'} 
                        Signature Hash: 
                      </span>
                      {' ' + certResult.signatureHashResult.message}
                    </div>
                  )}
                </div>
                
                <div className="ml-4 text-xs text-gray-500">
                  <div>Authority: {certResult.cert.public_key_hint?.split('/').pop()}</div>
                  <div>Blocks: {(certResult.cert.signed_blocks || []).length}</div>
                  {certResult.cert.issued_at && (
                    <div>Issued: {new Date(certResult.cert.issued_at).toLocaleDateString()}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Block Analysis */}
      {blockStatuses.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">📋 Block Analysis</h3>
          {blockStatuses.map((block) => (
            <BlockCard
              key={block.blockName}
              block={block}
              signatureValid={signatureStatus?.ok ?? false}
              certificationValid={certResults.some(
                (c) =>
                  (c.cert.signed_blocks || c.cert.certified_blocks || []).includes(
                    block.blockName
                  ) && c.result.ok
              )}
              signatureStatus={signatureStatus}
              certificationResults={certResults}
              feed={feed}
            />
          ))}
        </div>
      )}
    </div>
  );
}