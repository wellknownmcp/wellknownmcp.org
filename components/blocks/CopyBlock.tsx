'use client';

import { useState } from "react";

export function CopyBlock({ content, language = "text" }: { content: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative border rounded bg-muted p-4 text-sm font-mono whitespace-pre-wrap">
      <pre>
        <code className={`language-${language}`}>
          {content}
        </code>
      </pre>
      <button
        onClick={() => {
          navigator.clipboard.writeText(content);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="absolute top-2 right-2 text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded hover:opacity-90"
      >
        {copied ? "✅ Copied" : "📋 Copy"}
      </button>
    </div>
  );
}
