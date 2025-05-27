"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import FeedInteractionPanel from "@/components/FeedInteractionPanel";
import LLMFeedHubBase from "@/components/LLMFeedHubBase";
import Link from "next/link";

export default function LLMFeedHubPage() {
  const { slug } = useParams();
  const [feed, setFeed] = useState<any | null>(null);
  const [defaultText, setDefaultText] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleFeedLoaded = (loadedFeed: any) => {
    setFeed(loadedFeed);
    setDefaultText(JSON.stringify(loadedFeed, null, 2));
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    if (!slug) return;
    const localPath = `/exports/${slug}.llmfeed.json`;
    fetch(localPath)
      .then(res => {
        if (!res.ok) throw new Error("Not found locally");
        return res.json();
      })
      .then(json => handleFeedLoaded(json))
      .catch(() => setError(`❌ Feed not found at: ${localPath}`));
  }, [slug]);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">LLMFeedHub</h1>
      <p className="mb-4 text-muted-foreground">
        Upload or reference any `.llmfeed.json` file to explore its structure and trust level.
      </p>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="mb-2 font-semibold">💡 Test demo</p>
        <a
          href="/exports/demo/kungfu.llmfeed.json"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 no-underline"
        >
          👉 download kungfu.llmfeed.json
        </a>
        <button
          onClick={() => fetch("/exports/demo/kungfu.llmfeed.json")
            .then(res => res.json())
            .then(data => handleFeedLoaded(data))}
          className="mt-3 ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Inject
        </button>
        <Link href="/llmfeedhub/kungfu">
          <button
            className="mt-3 ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Go to /llmfeedhub/kungfu
          </button>
        </Link>
      </div>

      <FeedInteractionPanel
        mode="hub"
        onFeedLoaded={handleFeedLoaded}
        allowUrlInput
        allowTextInput
        debugRawJson={false}
        value={defaultText}
      />

      {feed && (
        <div ref={resultRef}>
          <LLMFeedHubBase feed={feed} />
        </div>
      )}
    </div>
  );
}
