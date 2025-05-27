import Link from 'next/link'
import { Wand2, ShieldCheck, FileCode, Download } from 'lucide-react'

export function InjectHooks() {
  const features = [
    {
      icon: Wand2,
      title: 'Inject prompts',
      description:
        'Guide LLMs using structured intent declarations via prompt.llmfeed.json.',
      href: '/tools/prompt',
    },
    {
      icon: FileCode,
      title: 'Certify feeds',
      description:
        'Sign and verify your data using trust and signature extensions.',
      href: '/tools/sign-and-verify',
    },
    {
      icon: ShieldCheck,
      title: 'Verify or explore',
      description:
        'Inspect feeds and confirm their authenticity using the verification tool.',
      href: '/llmfeedhub',
    },
    {
      icon: Download,
      title: 'Export yours',
      description:
        'Use buttons or APIs to generate dynamic and static .llmfeed.json from any page.',
      href: '/tools/export-button',
    },
  ]

  return (
    <section className="mt-12 max-w-5xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Inject, Certify or Explore</h2>
      <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
        Whether you want to guide a model, generate a feed, or check what's
        trustworthy, this ecosystem gives you practical tools to shape agentic
        interactions.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, description, href }, idx) => (
          <Link
            key={idx}
            href={href}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition text-left space-y-2"
          >
            <Icon className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
