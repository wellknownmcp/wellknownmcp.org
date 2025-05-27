// app/api/spec/list/route.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const folder = path.join(process.cwd(), "public", "exports", "spec");

function scanRecursive(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(scanRecursive(filePath));
    } else if (file.endsWith(".md") || file.endsWith(".json")) {
      results.push(filePath);
    }
  });

  return results;
}

function buildTree(paths: { name: string; path: string; updated: string }[]) {
  const root: any = {};

  for (const file of paths) {
    const parts = file.path.split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        current[part] = file;
      } else {
        if (!current[part]) current[part] = {};
        current = current[part];
      }
    }
  }

  return root;
}

export async function GET() {
  try {
    const entries = scanRecursive(folder);

    const files = entries
      .map((filePath) => {
        try {
          const stat = fs.statSync(filePath);
          const relativePath = path.relative(folder, filePath);

          return {
            name: path.basename(filePath),
            path: relativePath.replace(/\\/g, "/"),
            updated: stat.mtime.toISOString().slice(0, 10),
          };
        } catch (e) {
          console.warn("Skipped unreadable file:", filePath);
          return null;
        }
      })
      .filter(Boolean) as { name: string; path: string; updated: string }[];

    const tree = buildTree(files);
    return NextResponse.json(tree);
  } catch (error) {
    console.error("Failed to scan spec files:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
