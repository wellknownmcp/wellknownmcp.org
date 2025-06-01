import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Footer() {
  const params = useParams()
  const lang = typeof params?.lang === 'string' ? params.lang : 'en' // fallback
  return (
    <footer className="bg-white dark:bg-black border-t dark:border-gray-800 text-sm text-black dark:text-white mt-12">
      <div className="w-full px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-6xl mx-auto">
        {/* Left section: brand info */}
        <div>
          <h2 className="text-lg font-bold">WellKnownMCP</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            A trustable network for AI agents.
            <br />
            Join the community, contribute, or contact us directly.
          </p>
          <p className="text-sm mt-2">
            <a
              href="mailto:opensource@wellknownmcp.org"
              className="no-underline text-black dark:text-white hover:underline"
            >
              opensource@wellknownmcp.org
            </a>
          </p>
        </div>

        {/* Middle section: navigation links (2 columns) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Link
              href={`/${lang}/about`}
              className="block no-underline text-black dark:text-white hover:border-b hover:border-gray-400 transition"
            >
              🧭 About
            </Link>
            <Link
              href="/spec/01_llmfeed/llmfeed"
              className="block no-underline text-black dark:text-white hover:border-b hover:border-gray-400 transition"
            >
              📜 Spec
            </Link>
            <Link
              href="/llmfeedhub"
              className="block no-underline text-black dark:text-white hover:border-b hover:border-gray-400 transition"
            >
              🧪 Hub
            </Link>
            <Link
              href="/legal"
              className="block no-underline text-black dark:text-white hover:border-b hover:border-gray-400 transition"
            >
              ⚖️ Legal Notice
            </Link>
          </div>
          <div className="space-y-1">
            <Link
              href="/verify"
              className="block no-underline text-black dark:text-white hover:border-b hover:border-gray-400 transition"
            >
              ✅ Verify
            </Link>
            <Link
              href="/sdk"
              className="block no-underline text-black dark:text-white hover:border-b hover:border-gray-400 transition"
            >
              🧬 SDK
            </Link>
            <Link
              href="/join"
              className="block no-underline text-black dark:text-white hover:border-b hover:border-gray-400 transition"
            >
              🤝 Join
            </Link>
          </div>
        </div>

        {/* Right section: ecosystem links */}
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                href="https://github.com/wellknownmcp/llmfeed-spec"
                target="_blank"
                rel="noopener"
                className="no-underline text-black dark:text-white hover:border-b hover:border-gray-400 transition flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.8-1.5-3.8-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.6-.5 2-1 .1-.7.4-1.1.7-1.4-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 015.8 0C17 3.7 18 4 18 4c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.3.7.9.7 1.9v2.8c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5z" />
                </svg>
                <span>GitHub</span>
              </Link>
            </li>
            <li>
              <Link
                href="https://llmca.org"
                target="_blank"
                rel="noopener"
                className="no-underline text-black dark:text-white hover:border-b hover:border-gray-400 transition"
              >
                🛡️ LLMCA
              </Link>
            </li>
            <li>
              <Link
                href="https://llmfeedforge.org"
                target="_blank"
                rel="noopener"
                className="no-underline text-black dark:text-white hover:border-b hover:border-gray-400 transition"
              >
                🛠️ LLMFeedForge
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="col-span-full text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          © {new Date().getFullYear()} Association WellKnownMCP (in creation).
          All rights reserved.
        </div>
      </div>
    </footer>
  )
}
