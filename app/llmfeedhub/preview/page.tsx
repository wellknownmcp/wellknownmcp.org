'use client';

import { useState } from 'react';
import { PageTitle } from '@/components/PageTitle';
import SeoHead from '@/components/SeoHead';
import { AgentSimulatorUniversal } from '@/components/AgentSimulatorUniversal';

export default function LLMFeedPreviewPage() {
  const [url, setUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      <SeoHead
        title="Preview Agent Insight — Compare .well-known vs raw web"
        description="See what LLMs can interpret on any site with or without the Model Context Protocol."
        canonicalUrl="https://wellknownmcp.org/llmfeedhub/preview"
        ogImage="/og/llmfeedhub-preview.png"
        keywords="llmfeed, mcp, preview, trust, agent, insight, .well-known"
        llmIntent="preview agent understanding"
        llmTopic="MCP vs fallback interpretation"
      />

      <PageTitle
        title="Agent Insight Preview"
        subtitle="What a site reveals — with or without MCP"
      />

      <div className="space-y-3">
        <label htmlFor="url" className="block text-sm font-medium text-muted-foreground">
          Enter a website URL to inspect:
        </label>
        <input
          type="text"
          id="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded-md text-sm"
        />
        <button
          onClick={() => setSubmittedUrl(url)}
          className="px-4 py-2 text-sm rounded bg-violet-600 text-white hover:bg-violet-700"
        >
          Analyze Site
        </button>
      </div>

      {submittedUrl && (
        <>
          <div className="text-sm text-muted-foreground mt-8">
            <p>
              This analysis compares the traditional web metadata (title, meta tags, sitemap)
              to the structured `.llmfeed.json` capsules exposed via `.well-known/`.
            </p>
            <p>
              If both are available, the agent can demonstrate what it "understands" differently.
            </p>
          </div>
          <AgentSimulatorUniversal url={submittedUrl} />
        </>
      )}
    </div>
  );
}
