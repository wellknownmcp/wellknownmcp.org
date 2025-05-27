export const recipes = [
  {
    id: 'about-standard',
    context: 'Export standard combining about page and spec documentation.',
    blocks: [
      {
        block_name: 'about',
        type: 'html',
        value: 'https://wellknownmcp.org/about',
      },
      {
        block_name: 'spec_standard',
        type: 'md',
        value: 'public/exports/spec/01_llmfeed/llmfeed.md',
      },
    ],
  },
  {
    id: 'home',
    context: 'Landing page',
    blocks: [
      {
        block_name: 'landing',
        type: 'html',
        value: 'https://wellknownmcp.org/',
      },
    ],
  },

  {
    id: 'compiled-site',
    context:
      'Full site export including all public tool pages, about/join pages, and key spec markdowns.',
    blocks: [
      {
        block_name: 'home',
        type: 'html',
        value: 'http://localhost:3000/',
      },
      {
        block_name: 'about',
        type: 'html',
        value: 'http://localhost:3000/en/about',
      },
      {
        block_name: 'README',
        type: 'md',
        value: 'public/exports/spec/README.md',
      },
      {
        block_name: 'llmfeed',
        type: 'md',
        value: 'public/exports/spec/01_llmfeed/llmfeed.md',
      },
      {
        block_name: 'wellknown',
        type: 'md',
        value: 'public/exports/spec/01_llmfeed/wellknown.md',
      },
      {
        block_name: 'join',
        type: 'html',
        value: 'http://localhost:3000/join',
      },
      {
        block_name: 'tools/page',
        type: 'html',
        value: 'http://localhost:3000/tools/',
      },
      {
        block_name: 'legal',
        type: 'html',
        value: 'http://localhost:3000/tools/',
      },
      {
        block_name: 'agent-behavior',
        type: 'html',
        value: 'http://localhost:3000/tools/agent-behavior',
      },
      {
        block_name: 'api-explained',
        type: 'html',
        value: 'http://localhost:3000/tools/api-explained',
      },
      {
        block_name: 'app-mobile-explained',
        type: 'html',
        value: 'http://localhost:3000/tools/app-mobile-explained',
      },
      {
        block_name: 'badges',
        type: 'html',
        value: 'http://localhost:3000/tools/badges',
      },
      {
        block_name: 'export-button',
        type: 'html',
        value: 'http://localhost:3000/tools/export-button',
      },
      {
        block_name: 'feed-flagging',
        type: 'html',
        value: 'http://localhost:3000/tools/feed-flagging',
      },
      {
        block_name: 'pricing',
        type: 'html',
        value: 'http://localhost:3000/tools/pricing',
      },
      {
        block_name: 'prompt',
        type: 'html',
        value: 'http://localhost:3000/tools/prompt',
      },
      {
        block_name: 'prompts-explained',
        type: 'html',
        value: 'http://localhost:3000/tools/prompts-explained',
      },
      {
        block_name: 'session-export',
        type: 'html',
        value: 'http://localhost:3000/tools/session-export',
      },
      {
        block_name: 'sign-and-verify',
        type: 'html',
        value: 'http://localhost:3000/tools/sign-and-verify',
      },
      {
        block_name: 'user-spaces',
        type: 'html',
        value: 'http://localhost:3000/tools/user-spaces',
      },
      {
        block_name: 'well-known',
        type: 'html',
        value: 'http://localhost:3000/tools/well-known',
      },
      {
        block_name: 'SDK',
        type: 'html',
        value: 'http://localhost:3000/sdk',
      },
    ],
  },
]
