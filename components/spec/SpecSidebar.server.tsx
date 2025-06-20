// components/SpecSidebar.server.tsx - Version améliorée avec liens feeds
import fs from "fs";
import path from "path";
import Link from "next/link";

const specPath = path.resolve(process.cwd(), "public/exports/spec");

interface FileLink {
  slug: string;
  name: string;
}

interface Folder {
  name: string;
  files: FileLink[];
}

export default function SpecSidebar() {
  const folders: Folder[] = [];
  const rootFiles: FileLink[] = [];

  function scanDirectory(dir: string, base = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(base, entry.name);

      if (entry.isDirectory()) {
        const subFiles: FileLink[] = [];
        const subEntries = fs.readdirSync(fullPath, { withFileTypes: true })
          .filter(e => e.isFile() && e.name.endsWith(".md"))
          .sort((a, b) => a.name.localeCompare(b.name));

        for (const file of subEntries) {
          const slug = path.join(relativePath, file.name.replace(/\.md$/, "")).replace(/\\/g, "/");
          subFiles.push({ slug, name: file.name.replace(/\.md$/, "") });
        }

        if (subFiles.length > 0) {
          folders.push({ name: entry.name, files: subFiles });
        }
      }

      if (entry.isFile() && entry.name.endsWith(".md") && base === "") {
        const slug = entry.name.replace(/\.md$/, "");
        rootFiles.push({ slug, name: slug });
      }
    }
  }

  scanDirectory(specPath);

  return (
    <aside className="w-64 h-screen overflow-y-auto bg-gray-100 border-r px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">📄 LLMFeed Specification</h2>

      {/* 🚀 Nouveau: Section feeds rapides */}
      <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
          ⚡ Quick AI Access
        </h3>
        <div className="space-y-2">
          <a
            href="https://wellknownmcp.org/.well-known/exports/spec-essential.llmfeed.json"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-blue-600 hover:text-blue-800 hover:underline"
          >
            🎯 Essential Spec (22K tokens)
          </a>
          <a
            href="https://wellknownmcp.org/.well-known/exports/spec.llmfeed.json"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-purple-600 hover:text-purple-800 hover:underline"
          >
            📚 Complete Spec (140K tokens)
          </a>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          💡 Copy URLs to your AI for instant implementation guidance
        </div>
      </div>

      {/* Root files */}
      {rootFiles.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Root files</h3>
          <ul className="space-y-1">
            {rootFiles.map(file => (
              <li key={file.slug}>
                <Link href={`/spec/${file.slug}`}>
                  <span className="text-xs text-blue-600 hover:underline">{file.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sub folders */}
      {folders.map(folder => (
        <div key={folder.name} className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            📁 {folder.name}
          </h3>
          <ul className="space-y-1">
            {folder.files.map(file => (
              <li key={file.slug}>
                <Link href={`/spec/${file.slug}`}>
                  <span className="text-xs text-blue-600 hover:underline">{file.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* 🚀 Nouveau: Section aide */}
      <div className="mt-8 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
          🤔 Need Help?
        </h3>
        <div className="space-y-2 text-xs text-gray-600">
          <div>📖 Reading manually? Try the AI feeds above</div>
          <div>🎯 Need quick start? Use spec-essential</div>
          <div>📚 Building production? Use complete spec</div>
        </div>
      </div>
    </aside>
  );
}