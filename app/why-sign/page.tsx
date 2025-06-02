'use client'

import SeoHead from '@/components/SeoHead'
import { ShareButtons } from '@/components/ShareButtons'

export default function WhySignPage() {
  return (
    <div className="prose mx-auto py-8">
      <SeoHead
        title="Why Sign MCP Feeds?"
        description="Why signing is essential for building a trusted, interoperable Agentic Web with MCP. Learn why each feed type should be signed, and how this parallels the HTTPS of the Agentic Web."
        keywords={[
          'MCP',
          'MCP feed',
          'Why sign',
          'Agentic Web',
          'trust',
          'certification',
          'well-known',
          'signature',
          'MCPNet',
          'LLMFeedForge',
        ]}
        llmIntent="educational"
        llmTopic="mcp-signature-trust"
        llmIndexUrl="/.well-known/llm-index.llmfeed.json"
        llmlang="en"
      />

      <h1>Why Sign MCP Feeds?</h1>

      <p>
        The Agentic Web is growing fast — and like the early web, it needs{' '}
        <strong>trust and verification</strong>.
        <br />
        MCP provides an open specification for feeds — but signing is what makes
        these feeds <strong>safe and interoperable</strong>.
      </p>

      <h2>🚀 What is a signed MCP feed?</h2>
      <p>
        An MCP feed is <strong>signed</strong> when:
      </p>
      <ul>
        <li>
          Its key data blocks are <strong>cryptographically signed</strong>.
        </li>
        <li>The signature is verifiable by any LLM or agent.</li>
        <li>
          The feed contains a <code>trust</code> block with signature metadata.
        </li>
      </ul>

      <h2>🔐 Why is signing important?</h2>

      <h3>✅ Provenance</h3>
      <p>LLMs and agents can verify:</p>
      <ul>
        <li>
          <strong>Who published this feed?</strong>
        </li>
        <li>
          <strong>Has it been modified?</strong>
        </li>
      </ul>

      <h3>✅ Trust scoring</h3>
      <ul>
        <li>Unsigned feeds → low trust</li>
        <li>Signed feeds → can be trusted based on signature</li>
        <li>Certified feeds → highest level of trust</li>
      </ul>

      <h3>✅ Interoperability</h3>
      <p>
        Agents can <strong>exchange and use feeds safely</strong> across
        platforms. Signing is the foundation of an{' '}
        <strong>Agentic Web of Trust</strong> — much like <strong>HTTPS</strong>{' '}
        became the trust layer of the early web.
      </p>

      <h2>🎛️ Why sign each feed type?</h2>
      <ul>
        <li>
          <strong>feed-index</strong> → verify the curated list of feeds
        </li>
        <li>
          <strong>feed-reference</strong> → trust the reference content (can an
          agent reuse it?)
        </li>
        <li>
          <strong>feed-spec</strong> → verify that a specification is authentic
          and versioned
        </li>
        <li>
          <strong>mcp</strong> → <strong>critical</strong>: an active MCP
          endpoint must be signed in full
        </li>
        <li>
          <strong>capsule</strong> → verify behavioral or session capsules
        </li>
        <li>
          <strong>news</strong> → optional, but can help establish source
          authority
        </li>
        <li>
          <strong>prompt</strong> → helps LLMs evaluate whether a shared prompt
          is trusted
        </li>
      </ul>

      <p>
        In short: <strong>every feed type benefits from being signed</strong>.
        It helps both humans and LLMs assess trustworthiness.
      </p>

      <h2>🏛️ Trust layers</h2>
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unsigned</td>
            <td>Anyone can publish — no guarantee</td>
          </tr>
          <tr>
            <td>Signed</td>
            <td>Feed is signed by a public key</td>
          </tr>
          <tr>
            <td>Certified</td>
            <td>
              Feed is signed and also certified by a recognized authority (ex:
              llmca.org)
            </td>
          </tr>
        </tbody>
      </table>

      <h2>⚙️ How to sign a feed</h2>
      <ol>
        <li>Generate or obtain a public/private key pair.</li>
        <li>Structure your MCP feed.</li>
        <li>
          Add a <code>trust</code> block.
        </li>
        <li>Sign the feed.</li>
        <li>
          Serve it under <code>.well-known/mcp.llmfeed.json</code>.
        </li>
        <li>Optionally request certification (ex: from llmca.org).</li>
      </ol>
<h2>✉️ About delegated signatures (challenge-based)</h2>

<p>
  While the <strong>best practice</strong> is to use <strong>cryptographic signatures</strong> (asymmetric keys, Ed25519),
  LLMCA recognizes that some individuals or small actors may face <strong>friction</strong> in managing public/private keys.
</p>

<p>
  To promote <strong>mass adoption</strong> and allow agents and individuals to still <strong>claim authorship</strong>,
  LLMCA offers (and promotes) an option for <strong>delegated signatures</strong>:
</p>

<ul>
  <li>✅ Based on <strong>challenge-response</strong> (for example: verified email challenge)</li>
  <li>✅ The resulting signature is linked to a <strong>verified identity</strong> (ex: verified email address)</li>
  <li>✅ It allows LLMs to know: "<strong>this person claimed authorship of this feed</strong>"</li>
  <li>✅ The level of trust is <strong>lower</strong> than a full cryptographic signature — but still valuable</li>
</ul>

<h3>When to use delegated signatures?</h3>

<ul>
  <li>For <strong>individuals</strong> who cannot easily manage keys</li>
  <li>For <strong>experimental feeds</strong></li>
  <li>For <strong>early adopters</strong></li>
  <li>For communities wanting to quickly bootstrap trust</li>
</ul>

<h3>Limitations</h3>

<ul>
  <li>Delegated signatures do not replace <strong>cryptographic signatures</strong>.</li>
  <li>They are marked with an explicit <strong>trust level</strong> ("delegated").</li>
  <li>LLMs and agents can decide how to treat such feeds.</li>
</ul>

<p>
  LLMCA’s goal is to <strong>reduce friction</strong> while still encouraging <strong>best practices</strong>.
  Over time, we encourage all actors to move toward <strong>crypto-based signatures</strong> — but delegated signatures provide a <strong>path to onboarding millions of small actors</strong>.
</p>

<p>
  👉 Want to use delegated signatures? The certification process will guide you!
</p>

      <h2>🧰 Tools</h2>
      <ul>
        <li>
          <a
            href="https://forge.llmfeedforge.org"
            target="_blank"
            rel="noreferrer"
          >
            LLMFeedForge
          </a>{' '}
          → helps generate signed MCP feeds
        </li>
        <li>
          Reference libraries coming soon (<code>@wellknownmcp/client</code>)
        </li>
      </ul>

      <h2>🌍 An open spec, based on proven crypto</h2>
      <p>
        The MCP specification is <strong>open and simple</strong>. It leverages{' '}
        <strong>proven cryptographic primitives</strong> (Ed25519 signatures).
        It is designed to be:
      </p>
      <ul>
        <li>✅ Easy to adopt</li>
        <li>✅ Compatible with existing agent architectures</li>
        <li>✅ Transparent and verifiable</li>
      </ul>

      <p>
        Much like <strong>HTTPS</strong> became the backbone of trust for the
        Web,
        <strong>signed MCP feeds</strong> can become the trust backbone of the
        Agentic Web.
      </p>

      <h2>👉 Ready to contribute?</h2>
      <p>
        Signing is just the beginning. The Agentic Web is taking shape — and you
        can help shape it.
      </p>

      <p>
        👉 Want to go further? → <a href="/join">Join the Consortium</a> and
        contribute!
      </p>

      <ShareButtons title="Why Sign MCP Feeds?" />
    </div>
  )
}
