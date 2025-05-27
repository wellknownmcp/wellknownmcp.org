// app/verify/page.tsx
"use client";

import { useState, useRef } from "react";
import SeoHead from "@/components/SeoHead";
import FeedInteractionPanel from "@/components/FeedInteractionPanel";
import EnhancedFeedViewer from "@/components/EnhancedFeedViewer";

export default function VerifyPage() {
  const [feed, setFeed] = useState<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleFeedLoaded = (loadedFeed: any) => {
    setFeed(loadedFeed);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const loadKungfuDemo = async () => {
    try {
      const response = await fetch("/exports/demo/kungfu.llmfeed.json");
      if (!response.ok) throw new Error("Failed to fetch demo feed");
      const demoFeed = await response.json();
      handleFeedLoaded(demoFeed);
    } catch (error) {
      console.error("Error loading demo feed:", error);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <SeoHead
        title="LLMFeed Signature Verification | WellKnownMCP"
        description="Check the authenticity, signature, and certification status of any LLMFeed file."
        keywords="LLMFeed, MCP, feed verification, signature, certification"
       
      />
      <h1 className="text-3xl font-bold mb-6">Verify an LLMFeed</h1>

      {/* Bloc test demo */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="mb-2 font-semibold">💡 Test demo</p>
        <a
          href="/exports/demo/kungfu.llmfeed.json"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 no-underline"
        >
          👉 Test kungfu.llmfeed.json
        </a>
        <button
          onClick={loadKungfuDemo}
          className="mt-3 ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test our Kungfu example
        </button>
      </div>

      <FeedInteractionPanel
        mode="verify"
        onFeedLoaded={handleFeedLoaded}
        allowUrlInput
      />
      {feed && (
        <div ref={resultRef}>
          <EnhancedFeedViewer feed={feed} mode="verify" />
        </div>
      )}
    </main>
  );
}
