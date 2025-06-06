// scripts/generate-exports-index.ts
import fs from "fs";
import path from "path";

const excludedFolders = ["spec", "internal", "private"];

function collectFeeds(folder: string, base = ""): any[] {
  const entries = fs.readdirSync(folder).map((name) => {
    const fullPath = path.join(folder, name);
    const relPath = path.join(base, name);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory() && excludedFolders.includes(name)) {
      return [];
    }

    if (stats.isDirectory()) {
      return collectFeeds(fullPath, relPath);
    }

    if (name.endsWith(".llmfeed.json")) {
      let signed = false;
      let certified = false;
      let feedType = "unknown";
      const size = (stats.size / 1024).toFixed(1);

      try {
        const content = fs.readFileSync(fullPath, "utf-8");
        const json = JSON.parse(content);
        signed = !!json.signature;
        certified = !!json.certification && json.certification.level === "gold";
        feedType = json.feed_type ?? "unknown";
      } catch (err) {
        console.error(`❌ Error parsing ${relPath}:`, err);
      }

      return [{
        path: relPath.replace(/\\/g, "/"), // windows compatibility
        feed_type: feedType,
        signed,
        certified,
        size,
      }];
    }

    return [];
  });

  return entries.flat();
}

function main() {
  console.log("\n📦 Generating exports index...");
  const folderPath = path.resolve("./public/exports");
  const feeds = collectFeeds(folderPath);

  const indexPath = path.join(folderPath, "index.json");
  fs.writeFileSync(indexPath, JSON.stringify(feeds, null, 2), "utf-8");

  console.log(
    `✅ Generated ${feeds.length} entries in /public/exports/index.json\n`,
  );
}

main();
