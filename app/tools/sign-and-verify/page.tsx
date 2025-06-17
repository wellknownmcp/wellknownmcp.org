
import { PageTitle } from '@/components/PageTitle'
import SeoHead from '@/components/SeoHead'
import { ShareButtons } from '@/components/ShareButtons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ExportToLLMButton } from '@/components/ExportToLLMButton'

export default function SignAndVerifyPage() {
  return (
    <>
      <SeoHead
        title="Sign & Verify — MCP Agent Trust Layer"
        description="Understand why signing and certifying your LLMFeeds matters. Explore asymmetric cryptography, trust blocks, and best practices across feed types to protect your content and guide agent behavior."
      />
      <div className="max-w-2xl mx-auto space-y-8 py-10">
        <PageTitle
          title="Sign & Verify"
          subtitle="Create trustable agent capsules using asymmetric cryptography and open standards. Secure your content, prove its origin, and gain trust."
        />

        <Card>
          <CardHeader>
            <CardTitle>1️⃣ Why Sign?</CardTitle>
            <CardDescription>
              Authenticity, Integrity, and Traceability
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Agents need to know the *origin* and *trust level* of a feed.
              Unsigned = untrusted. Signing with your private key lets agents
              verify the content using your public key.
            </p>
            <p>
              It prevents tampering, spoofing, or hallucination. For sensitive
              data like credentials, it's a must. For exports and public data,
              it enables traceability: who published what and when.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2️⃣ Asymmetric Crypto for Humans 🔐</CardTitle>
            <CardDescription>
              One key to sign, one key to verify
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Your private key is secret and used to <strong>sign</strong> the
              feed.
            </p>
            <p>
              Your public key is shared (usually at{' '}
              <code>/.well-known/public.pem</code>) and used by agents to{' '}
              <strong>verify</strong> the feed.
            </p>
            <p>It’s simple, proven, and powers the security of the web.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3️⃣ Trust Block Structure</CardTitle>
            <CardDescription>
              Declare the level of trust and what’s signed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <code>trust.trust_level</code> (e.g. self-declared, certified)
              </li>
              <li>
                <code>trust.scope</code> (e.g. partial, full)
              </li>
              <li>
                <code>trust.signed_blocks</code> — the list of blocks the
                signature covers
              </li>
              <li>
                <code>trust.public_key_hint</code> — where to find the public
                key
              </li>
              <li>
                <code>signature</code> — the cryptographic proof
              </li>
              <li>
                <code>certification</code> — optional endorsement by a neutral
                third party like{' '}
                <a href="https://llmca.org" target="_blank" rel="noopener">
                  LLMCA
                </a>
              </li>

              <li>
                Agent behavior override — must be signed to be accepted (e.g.{' '}
                <code>mcp-agent-behavior-override.llmfeed.json</code>)
              </li>
              <ExportToLLMButton
                context="static"
                staticPath="mcp-agent-behavior-override"
                mini
                clipboard
              />
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4️⃣ Feed Types & Why They Need Signing</CardTitle>
            <CardDescription>Different purpose, different risk</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>mcp.llmfeed.json</strong>: handshake + entrypoint —
                should be <em>fully signed</em>
              </li>
              <li>
                <strong>llm-index.llmfeed.json</strong>: list of feeds —{' '}
                <em>partially signed</em> is OK
              </li>
              <li>
                <strong>capabilities.llmfeed.json</strong>: API capabilities —
                recommended to sign
              </li>
              <li>
                <strong>export.llmfeed.json</strong>: traceability of export —
                signature helps future reuse
              </li>
              <li>
                <strong>credential.llmfeed.json</strong>: API key or token —{' '}
                <strong>must be fully signed</strong>
              </li>
              <li>
                <strong>export-bundle.llmfeed.json</strong>: archive manifest —
                full signature guarantees bundle integrity
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5️⃣ Signature vs Certification</CardTitle>
            <CardDescription>What’s the difference?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>Signature</strong> proves the content was published by
              you. It’s self-issued using your private key.
            </p>
            <p>
              <strong>Certification</strong> is an additional trust layer, where
              a neutral third party (like <code>llmca.org</code>) attests that
              your feed follows best practices and signs the signature.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6️⃣ Minimal vs Full Signature</CardTitle>
            <CardDescription>Know what you protect</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Signing <strong>only some blocks</strong> = minimal scope, for
              traceability.
            </p>
            <p>
              Signing <strong>all blocks</strong> = full signature, used for
              trust-sensitive feeds.
            </p>
            <p>
              Certification typically covers signed blocks (sometimes including
              the signature block itself).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7️⃣ Easy Start, Real-World Use Cases</CardTitle>
            <CardDescription>
              Don't overthink — sign what matters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>Credential capsule — full signature is mandatory</li>
              <li>Export of a dashboard — signature helps keep a trace</li>
              <li>
                Agent bundle (zip) — signature guarantees bundle integrity
              </li>
            </ul>
            <p>
              Start by signing with a local tool or open script. Need help?
              Contact{' '}
              <a href="mailto:opensource@wellknownmcp.org">
                opensource@wellknownmcp.org
              </a>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🛠️ Coming soon</CardTitle>
            <CardDescription>We’re making it easier</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>No public key hosting? → We’ll host one for you</li>
              <li>Can’t sign locally? → Use our delegated signing API</li>
              <li>Too complex? → Seamless Sign & Verify SDK coming</li>
              <li>
                Scripts and canonical rules → Open and hosted by{' '}
                <code>llmca.org</code>
              </li>
            </ul>
            <p>
              <strong>Open standard is the key</strong> — use our tools or build
              your own.
            </p>
            <p>
              Don’t let closed ecosystems define the future of AI trust. The
              race is open. The winners will be transparent.
            </p>
          </CardContent>
        </Card>

        <div>
          <ShareButtons title="Sign & Verify — Secure Your LLMFeeds" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>📦 Prompt Capsules and Trust</CardTitle>
            <CardDescription>
              Signed behavior prompts must be verified
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Prompts that modify the behavior of a LLM — like switching to MCP
              mode or exporting sessions as feeds — must be signed.
            </p>
            <p>Agents will reject or ignore them unless:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>They are cryptographically signed</li>
              <li>
                The signature is verifiable against{' '}
                <code>/.well-known/public.pem</code>
              </li>
              <li>The user consents to the injection</li>
            </ul>
            <p>
              Injecting an unsigned prompt is a potential attack vector.
              Verification protects trust.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
