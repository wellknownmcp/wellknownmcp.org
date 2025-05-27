import fs from "fs";
import path from "path";
import Link from "next/link";
import {ExportToLLMButton} from "@/components/ExportToLLMButton";
import { Button } from "@/components/ui/button";

function getAllEntries(folder: string, base = ""): any[] {
  const entries = fs.readdirSync(folder).map(name => {
    const fullPath = path.join(folder, name);
    const relPath = path.join(base, name);
    const stats = fs.statSync(fullPath);
	const excludedFolders = ["spec", "internal", "private"];
if (stats.isDirectory() && excludedFolders.includes(name)) {
  return null;
}
    if (stats.isDirectory()) {
      return {
        type: "folder",
        name,
        path: relPath,
        children: getAllEntries(fullPath, relPath)
      };
    } else if (name.endsWith(".llmfeed.json")) {
      let signed = false, certified = false, feedType = "unknown", size = (stats.size / 1024).toFixed(1);
      try {
        const content = fs.readFileSync(fullPath, "utf-8");
        const json = JSON.parse(content);
        signed = !!json.signature;
        certified = !!json.certification && json.certification.level === "gold";
        feedType = json.feed_type ?? "unknown";
      } catch {}
      return { type: "file", name, path: relPath, size, signed, certified, feedType };
    }
  }).filter(Boolean);

  return entries.sort((a, b) =>
    a.type === b.type ? a.name.localeCompare(b.name) : a.type === "folder" ? -1 : 1
  );
}

export default async function Page() {
  const folderPath = path.resolve("./public/exports");
  const entries = getAllEntries(folderPath);

  return (
    <main className="max-w-4xl mx-auto p-4">
  <h1 className="text-3xl font-bold mb-6">Available LLMFeed examples</h1>

  {/* Fichiers root */}
  <ul className="space-y-2">
    {entries
      .filter(entry => entry.type === "file")
      .map(file => (
        <li key={file.path} className="border p-3 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-mono text-sm text-blue-700">{file.name}</div>
              <div className="text-xs text-gray-500">
                {file.size} KB • Type: {file.feedType}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {file.signed && (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Signed
                </span>
              )}
              {file.certified && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                  Gold Certified
                </span>
              )}
              <Link
				href={`/llmfeedhub/${file.name.replace(".llmfeed.json", "")}`}
				className="inline-flex items-center gap-1 no-underline border border-gray-300 bg-white text-black text-sm rounded-md px-3 py-1 hover:bg-gray-100"
				>
				🧩 LLMFeedHub
				</Link>

              <ExportToLLMButton
                context="static"
                staticPath={file.name.replace(".llmfeed.json", "")}
              />
            </div>
          </div>
        </li>
      ))}
  </ul>

  {/* Dossiers */}
  <ul className="space-y-2 mt-6">
    {entries.map(entry => entry.type === "folder" ? (
      <li key={entry.path} className="font-bold text-lg">📁 {entry.name}/
        <ul className="ml-4 space-y-1">
          {entry.children.map(child => (
            <li key={child.path} className="border p-3 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-mono text-sm text-blue-700">{child.name}</div>
                  <div className="text-xs text-gray-500">
                    {child.size} KB • Type: {child.feedType}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {child.signed && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Signed
                    </span>
                  )}
                  {child.certified && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Gold Certified
                    </span>
                  )}
                  <Link
				href={`/llmfeedhub/${child.name.replace(".llmfeed.json", "")}`}
				className="inline-flex items-center gap-1 no-underline border border-gray-300 bg-white text-black text-sm rounded-md px-3 py-1 hover:bg-gray-100"
				>
				🧩 LLMFeedHub
				</Link>

                  <ExportToLLMButton
                    context="static"
                    staticPath={child.name.replace(".llmfeed.json", "")}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </li>
    ) : null)}
  </ul>
</main>


  );
}
