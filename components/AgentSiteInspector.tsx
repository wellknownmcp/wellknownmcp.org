'use client';

import { useState } from 'react';
import { AgentSimulatorUniversal } from './AgentSimulatorUniversal';

export function AgentSiteInspector() {
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.startsWith('http')) {
      setSubmitted(url);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="url" className="block text-sm font-medium text-muted-foreground">
          Enter a domain (e.g. https://example.org)
        </label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className="w-full border rounded px-4 py-2 text-sm"
          required
        />
        <button
          type="submit"
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 text-sm"
        >
          Analyze Site
        </button>
      </form>

      {submitted && (
        <div>
          <AgentSimulatorUniversal url={submitted} />
        </div>
      )}
    </div>
  );
}
