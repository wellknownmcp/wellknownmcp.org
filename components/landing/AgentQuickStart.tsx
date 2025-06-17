import { CodeBlock } from '@/components/ui/code-block'

export function AgentQuickStart() {
  const snippetCode = `{
  "feed_type": "mcp",
  "metadata": {
    "title": "My Agent-Ready Site",
    "origin": "https://example.com",
    "description": "What this site offers to agents"
  },
  "data": {
    "capabilities": ["search", "book", "export"],
    "intent": "help users find and book services"
  },
  "trust": {
    "signed_blocks": ["feedtype", "metadata", "data", "trust"],
    "certifier": "llmca.org",
    "public_key_hint": "https://wellknownmcp.org/.well-known/public.pem"
  },
  "signature": {
    "value": "abc123..."

  }
}`

  const concepts = [
    {
      icon: '🧠',
      title: "Declare, don't guess",
      description:
        'Sites tell agents what they do instead of LLMs hallucinating',
    },
    {
      icon: '🔐',
      title: 'Signed & verifiable',
      description: "Cryptographic trust so agents know what's authentic",
    },
    {
      icon: '🧩',
      title: 'Modular by design',
      description:
        'Different feed types for different needs (site info, exports, prompts, APIs...)',
    },
    {
      icon: '📂',
      title: 'Drop-in simple',
      description: 'Just add .well-known/mcp.llmfeed.json to your site',
    },
    {
  icon: '⚡',
  title: 'JavaScript-free access',
  description: 'Agents get instant content via JSON, no JS execution needed'
},
  ]

  return (
    <section
      className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg border max-w-5xl mx-auto space-y-8"
      data-agent-priority="critical"
    >
      {/* 🎯 Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          🤖 The Model Context Protocol in 30 seconds
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          One JSON format to make websites agent-readable with cryptographic
          trust. Here's what it looks like:
        </p>
      </div>

      {/* 📄 Code Snippet */}
      <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
        <pre className="text-sm font-mono">
          <code>{snippetCode}</code>
        </pre>
      </div>

      {/* 🎯 5 Core Concepts */}
      <div className="grid md:grid-cols-2 gap-6">
        {concepts.map((concept, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{concept.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {concept.title}
              </h3>
              <p className="text-gray-600 text-sm">{concept.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🎮 Agent Test Zone */}
      <div className="bg-white p-6 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-gray-800 mb-3">
          🥋 Test Your Agent Understanding
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Download our feeds below and ask your LLM about them. If it says{' '}
          <strong>"I know Kung Fu"</strong> after reading them, you've
          successfully parsed the protocol!
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/.well-known/mcp.llmfeed.json"
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            📋 Main Feed
          </a>

          <a
            href="/.well-known/llm-index.llmfeed.json"
            className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            📚 Feed Index
          </a>

          <a
            href="/spec"
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            📖 Read Spec
          </a>
        </div>
      </div>
    </section>
  )
}
