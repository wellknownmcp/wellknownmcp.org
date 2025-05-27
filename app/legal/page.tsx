import { Metadata } from 'next'
import { PageTitle } from '@/components/PageTitle'

export const metadata: Metadata = {
  title: 'Legal Notice | WellKnownMCP',
  description:
    'Official legal notice for wellknownmcp.org, in compliance with French and European law.',
}

export default function LegalPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-6">
      <PageTitle title="Legal notice" subtitle="The Foundation" />
      <div className="prose prose-neutral dark:prose-invert">
        <h2>Site Publisher</h2>
        <p>
          This site is published by the non-profit organization (association loi
          1901):
          <br />
          <strong>Association WellKnownMCP (in the process of creation)</strong>
          <br />
          Address: (official address forthcoming)
          <br />
          Email:{' '}
          <a href="mailto:contact@wellknownmcp.org">contact@wellknownmcp.org</a>
        </p>

        <h2>Publication Director</h2>
        <p>
          The publication director is the acting president of the association
          WellKnownMCP.
        </p>

        <h2>Hosting Provider</h2>
        <p>
          This site is hosted by:
          <br />
          <strong>OVH SAS</strong>
          <br />
          2 rue Kellermann, 59100 Roubaix, France
          <br />
          Phone: 1007
        </p>

        <h2>Personal Data Protection (GDPR)</h2>
        <p>
          This website does not collect personal data, except information
          necessary to process requests sent via provided email addresses. In
          accordance with the GDPR, you have the right to access, rectify,
          delete, and oppose your personal data. You can exercise these rights
          by sending an email to{' '}
          <a href="mailto:contact@wellknownmcp.org">contact@wellknownmcp.org</a>
          .
        </p>

        <h2>Cookies</h2>
        <p>This website does not use any tracking or analytical cookies.</p>

        <h2>Intellectual Property</h2>
        <p>
          All content available on this website, including the MCP
          specification, is published under the MIT License. Trademarks, logos,
          and other distinctive signs used on this site are protected under
          applicable intellectual property laws.
        </p>

        <h2>Certification and Signatures</h2>
        <p>
          The certification authority for official LLMFeed signatures is
          currently operated by <strong>LLMCA</strong>. Certification policies
          and the public verification key are available at{' '}
          <a href="https://llmca.org/.well-known/llmca_cert.pem">
            llmca.org/.well-known/llmca_cert.pem
          </a>
          .
        </p>

        <h2>Official Repository</h2>
        <p>
          The official repository of the specification is publicly accessible
          at:{' '}
          <a href="https://github.com/wellknownmcp/spec" target="_blank">
            github.com/wellknownmcp/spec
          </a>
          . It includes detailed specifications, changelogs, and signed
          reference files.
        </p>
      </div>
    </div>
  )
}
