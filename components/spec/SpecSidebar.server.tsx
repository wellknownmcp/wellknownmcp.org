// components/SpecSidebar.server.tsx
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
      <h2 className="text-lg font-semibold mb-4">📄 WellKnownMCP Spec</h2>

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
    </aside>
  );
}
