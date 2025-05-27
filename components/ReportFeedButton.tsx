'use client';

import { useState } from "react";
import { AlertTriangle, CheckCircle, Clock, Ban } from "lucide-react";

export function ReportFeedButton({ feedUrl }: { feedUrl: string }) {
  const [status, setStatus] = useState<"idle" | "submitted" | "coming-soon">("coming-soon");

  return (
    <div className="border rounded-lg p-4 bg-muted/30 space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <AlertTriangle className="w-4 h-4 text-yellow-500" />
        Report this feed
      </div>

      {status === "coming-soon" && (
        <p className="text-xs text-muted-foreground">
          Feed reporting and reputation is currently operated manually by <strong>LLMCA</strong>.  
          A decentralized flagging system is coming soon to <code>llmfeedhub.org</code>.
        </p>
      )}

      {status === "submitted" && (
        <div className="flex items-center text-green-600 gap-2 text-sm">
          <CheckCircle className="w-4 h-4" />
          Report submitted. Thank you.
        </div>
      )}

      <button
        disabled
        className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-gray-400 rounded hover:bg-gray-500 cursor-not-allowed"
      >
        <Clock className="w-3 h-3 mr-2" />
        Report feed (coming soon)
      </button>
    </div>
  );
}
