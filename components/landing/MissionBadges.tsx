import Link from 'next/link'

const badges = [
  {
    icon: '🧩',
    title: 'Interoperability first',
    description: 'A spec that works across models, platforms, and contexts.',
    href: '/spec',
  },
  {
    icon: '🛡️',
    title: 'Trust and verification',
    description: 'Signed feeds, certified endpoints, and auditable flows.',
    href: '/verify',
  },
  {
    icon: '🛠️',
    title: 'Tools for real adoption',
    description: 'Export buttons, agent SDKs, forge, and browser extensions.',
    href: '/join',
  },
  {
    icon: '🌐',
    title: 'Future-proof design',
    description:
      'Designed to scale into MCP-Net and anchor the agentic web of tomorrow.',
    href: '/en/about',
  },
]

export function MissionBadges() {
  return (
    <section className="mt-16 max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">
        The mission behind the protocol
      </h2>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        MCP is not just a spec — it’s a commitment to an open, agentic web.
        Here’s what we’re building together.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {badges.map((b) => (
          <Link
            href={b.href}
            key={b.title}
            className="border rounded-lg p-4 hover:shadow-md transition text-left block"
          >
            <div className="text-3xl mb-2">{b.icon}</div>
            <div className="font-semibold mb-1">{b.title}</div>
            <p className="text-sm text-muted-foreground">{b.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
