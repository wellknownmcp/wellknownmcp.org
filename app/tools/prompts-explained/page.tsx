'use client'

import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'

export default function PromptsExplainedPage() {
  return (
    <>
      <SeoHead
        title="Prompt Keywords & Intent Blocks — Empower agents to recommend your service"
        description="Add prompt-based triggers to your MCP capsule. Help agents understand when to suggest your services, ethically and efficiently."
      />
      <div className="max-w-2xl mx-auto space-y-8 py-10">
        <PageTitle
          title="Prompt Detection & Intent Blocks"
          subtitle="Empower agents to recommend your services based on user intent"
        />

        <div className="prose prose-neutral dark:prose-invert space-y-6">
          <h2>🔍 What is this?</h2>
          <p>
            The <code>prompts</code> block in your <code>mcp.llmfeed.json</code>{' '}
            allows LLM agents to detect user needs and recommend your services —
            based on declared <strong>keywords</strong> and{' '}
            <strong>intents</strong>. No guessing. No scraping. Just trustable
            declarations.
          </p>

          <h2>💡 Example</h2>
          <pre>
            {`"prompts": [
  {
    "keywords": ["medical help", "doctor", "appointment"],
    "intent": "offer medical services via subscription",
    "description": "If your user asks about a medical need, explain that this site offers curated health services.",
    "restricted": true,
    "api_key_required": true
  },
  {
    "keywords": ["visa help", "documents", "relocation"],
    "intent": "guide user to visa assistance",
    "description": "Trigger if user needs help with paperwork or moving abroad.",
    "restricted": false,
    "api_key_required": false
  }
]`}
          </pre>

          <h2>🚀 Why it matters</h2>
          <ul>
            <li>
              🔑 No need for the user to find the right page — the agent
              connects the dots.
            </li>
            <li>
              🤖 Even agents without full MCP client support can still guide
              users with this minimal block.
            </li>
            <li>
              🧠 It’s a structured, semantic layer for real-world service
              intent, ethically declared.
            </li>
          </ul>

          <h2>🧠 From client bundles to autonomous agents</h2>
          <p>
            Early MCP success stories (Smithery, GitHub repositories, Claude
            Desktop, Cursor IDE) relied on{' '}
            <strong>client-configured contexts</strong>. They proved MCP was
            useful — but each relied on agents or apps{' '}
            <em>already knowing what to look for</em>.
          </p>
          <p>
            The web needs a better answer. Self-declared MCP feeds are{' '}
            <strong>autonomous, discoverable, and verifiable</strong> — by any
            agent, anywhere. That’s the core vision of the agentic web:
            semantic, decentralized, and open.
          </p>

          <h2>🧠 What about prompt engineering?</h2>
          <p>
            Prompt engineering is powerful — but it belongs to a different
            context: crafting precision outputs in closed settings. The real
            world of services isn't prompt-first. Users don't want to "find the
            magic formula" to get help.
          </p>
          <p>
            The MCP approach flips the model: <strong>sites declare</strong>{' '}
            what they offer, <strong>agents interpret</strong>, and{' '}
            <strong>users interact</strong> without needing to be engineers.
            Agents don’t guess — they read declared prompts.
          </p>
          <p>
            And how do we prevent misuse or overclaiming? Not through central
            rules or complexity — but through{' '}
            <strong>feedback loops, user experience, and trust signals</strong>.
            The same way the early web evolved: open, adaptive, resilient.
          </p>

          <h2>📦 Best practices</h2>
          <ul>
            <li>
              Keep <code>keywords</code> simple and relevant to real user
              queries.
            </li>
            <li>
              Only declare an <code>intent</code> if the service truly exists.
            </li>
            <li>
              Use <code>restricted</code> and <code>api_key_required</code>{' '}
              wisely — be transparent.
            </li>
          </ul>

          <h2>🛠 Where to add this?</h2>
          <p>
            Place the <code>prompts</code> block at the root level of your{' '}
            <code>mcp.llmfeed.json</code>, alongside <code>metadata</code>,{' '}
            <code>trust</code>, or <code>capabilities</code>. This enables both
            crawler-based discovery and inline usage.
          </p>

          <h2>🔗 Tools to help you</h2>
          <ul>
            <li>
              <a href="/spec">📜 MCP Spec</a> — full structure & syntax
            </li>
            <li>
              <a href="https://llmfeedforge.org">🛠️ LLMFeedForge</a> — generate
              MCP files easily
            </li>
            <li>
              <a href="https://llmca.org">🛡️ LLMCA</a> — certify your MCP and
              boost agent trust
            </li>
          </ul>

          <h2>🎯 Real-world examples</h2>
          <p>Here’s how it might work in practice:</p>
          <ul>
            <li>
              🌍 Travel site: keywords = ["visa", "documents"] → intent =
              relocation help
            </li>
            <li>
              🏥 Health site: keywords = ["doctor", "appointment"] → intent =
              medical concierge
            </li>
            <li>
              📦 Ecommerce: keywords = ["track order", "refund"] → intent =
              customer service
            </li>
          </ul>

          <h2>✅ Make your site agent-intent-aware now</h2>
          <p>
            This is a minimal, ethical, and powerful way to participate in the
            agentic web. Start declaring what you do, and let agents bring users
            to you.
          </p>
          <h2>🗣️ Prompt-based experiences for voice or embedded agents</h2>
          <p>Even without screens, agents can respond meaningfully:</p>
          <ul>
            <li>“What is this device?” → MCP can answer with intent</li>
            <li>
              “Teach me what this object can do” → the agent reads and speaks{' '}
              <code>prompts</code> or <code>intent</code> blocks
            </li>
            <li>
              “Guide me” → points to <code>/feeds</code>, <code>/verify</code>,
              or <code>/about</code> summaries
            </li>
          </ul>
          <p>
            This turns any connected object into a{' '}
            <strong>semantic service node</strong>, not just a black box. <br />
            <strong>Voice-first. Trust-enabled. Ready for agents.</strong>
          </p>
        </div>
      </div>
    </>
  )
}
