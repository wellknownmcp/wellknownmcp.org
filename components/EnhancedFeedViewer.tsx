
'use client';

import { useEffect, useState } from 'react';
import {
  verifyFeedSignature,
  verifyFeedCertification,
} from '@/lib/verifyCrypto';
import { analyzeBlocks } from '@/lib/analyzeBlocks';
import BlockCard from '@/components/BlockCard';

export default function EnhancedFeedViewer({
  feed,
  mode = 'hub',
}: {
  feed: any;
  mode?: 'hub' | 'verify';
}) {
  const [signatureStatus, setSignatureStatus] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  const [blockStatuses, setBlockStatuses] = useState<any[]>([]);
  const [certResults, setCertResults] = useState<{ cert: any; result: { ok: boolean; message: string } }[]>([]);

  useEffect(() => {
    if (!feed) return;

    const runAnalysis = async () => {
      let sigStatus;
      try {
        sigStatus = await verifyFeedSignature(feed);
      } catch (e) {
        sigStatus = {
          ok: false,
          message: 'Signature check has failed: ' + (e?.message ?? String(e)),
        };
      }
      setSignatureStatus(sigStatus);

      const certs =
        feed.certification && Array.isArray(feed.certification)
          ? feed.certification
          : feed.certification
          ? [feed.certification]
          : [];

      const results = await Promise.all(
        certs.map((cert) => verifyFeedCertification(feed, cert))
      );
      const mapped = results.map((result, i) => ({ cert: certs[i], result }));
      setCertResults(mapped);

      const blocks = analyzeBlocks(feed);
      setBlockStatuses(blocks);
    };

    runAnalysis();
  }, [feed]);

  if (!feed || typeof feed !== 'object') {
    return <p className="text-red-500">❌ No valid feed provided.</p>;
  }

  return (
    <div className="space-y-4">
      {blockStatuses.length > 0 && (
        <>
          <div className="mt-6 space-y-4">
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
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
