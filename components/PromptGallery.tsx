'use client';

import { PromptCard } from './PromptCard';
import promptGraphic from '@/public/exports/demo/prompts/prompt-graphic-design.llmfeed.json';
import promptMultidoc from '@/public/exports/demo/prompts/prompt-multidoc-analysis.llmfeed.json';
import promptDevtools from '@/public/exports/demo/prompts/prompt-devtools.llmfeed.json';
import promptEducation from '@/public/exports/demo/prompts/prompt-education-exam-prep.llmfeed.json';
import promptBusiness from '@/public/exports/demo/prompts/prompt-business-deck.llmfeed.json';
import promptAutomation from '@/public/exports/demo/prompts/prompt-automation-crm.llmfeed.json';
import promptTrust from '@/public/exports/demo/prompts/prompt-trust-signed-declaration.llmfeed.json';

export function PromptGallery() {
  const examples = [
    {
      title: '🎨 Brand Graphic + SVG',
      filename: 'prompt-graphic-design.llmfeed.json',
      feed: promptGraphic
    },
    {
      title: '🧠 Multi-document Analysis',
      filename: 'prompt-multidoc-analysis.llmfeed.json',
      feed: promptMultidoc
    },
    {
      title: '🖥️ Replit + Cursor prompt',
      filename: 'prompt-devtools.llmfeed.json',
      feed: promptDevtools
    },
    {
      title: '🎓 Exam preparation',
      filename: 'prompt-education-exam-prep.llmfeed.json',
      feed: promptEducation
    },
    {
      title: '📊 Pitch deck + roadmap',
      filename: 'prompt-business-deck.llmfeed.json',
      feed: promptBusiness
    },
    {
      title: '🧩 CRM + automation',
      filename: 'prompt-automation-crm.llmfeed.json',
      feed: promptAutomation
    },
    {
      title: '🪪 Trust declaration',
      filename: 'prompt-trust-signed-declaration.llmfeed.json',
      feed: promptTrust
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {examples.map((ex) => (
        <PromptCard key={ex.filename} title={ex.title} feed={ex.feed} filename={ex.filename} />
      ))}
    </div>
  );
}
