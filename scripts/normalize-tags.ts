import fs from "fs";
import path from "path";
import matter from "gray-matter";

const TAG_ALIASES: Record<string, string> = {
  // Parasites à supprimer
  "about": "",
  "faq": "",
  "begin": "",
  "guide": "",
  "rationale": "",
  "why-mcp": "",
  "feed": "",
  "block": "",
  "vision": "",
  "opinion": "",
  "explained": "",
  "declaration": "",
  "startups": "",
  "onboarding": "",
  "tutorial": "",
  "crawling": "",
  "gptbot": "",
  "openai": "",
  "browsers": "",
  "scraping": "",
  "ecosystem": "",
  "ecosysteme": "",
  "futur": "",
  "philosophy": "",
  "france": "",
  "education": "",

  // Variantes unifiées
  "ai": "ai-agents",
  "agents": "ai-agents",
  "agents ia": "ai-agents",
  "agents-ia": "ai-agents",

  "interop": "interoperability",
  "interopérabilité": "interoperability",

  "open standards": "open-standards",
  "web standards": "open-standards",
  "web de confiance": "open-standards",

  "llms": "llm",
  "llm-agents": "llm",
  "llm-crawling": "llm",
  "llm-seo": "llm",

  "signature verification": "signature",
  "delegated signature": "signature",

  "mcpnet": "mcp-net",
  "mcp-net": "mcp-net",

  "mistral-ai": "mistral",

  "trusted-agents": "trust",
  "confiance": "trust",
  "confianza": "trust",

  "chiffrement": "encryption",
  "cifrado": "encryption",

  "privacidad": "privacy",

  "ai标准": "ai-standards",
  "互操作性": "interoperability",
  "代理互操作性": "interoperability",
  "mcp规范": "mcp-spec",
  "代理网络": "trusted-agents",
};

function normalizeTag(tag: any): string {
  if (typeof tag !== "string" || !tag.trim()) return "";
  const normalizedKey = tag.trim().toLowerCase();
  const alias = TAG_ALIASES[normalizedKey];
  return alias !== undefined ? alias : normalizedKey;
}

const tagCountsGlobal: Record<string, number> = {};
const tagCountsPerLang: Record<string, Record<string, number>> = {};

const basePath = path.join(process.cwd(), "public", "news");
const langs = fs.readdirSync(basePath).filter((f) =>
  fs.statSync(path.join(basePath, f)).isDirectory()
);

langs.forEach((lang) => {
  console.log(`\n🌐 Scanning language: ${lang}`);
  const langPath = path.join(basePath, lang);
  const files = fs.readdirSync(langPath).filter((f) => f.endsWith(".md"));

  tagCountsPerLang[lang] = {};

  files.forEach((file) => {
    const fullPath = path.join(langPath, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw);

    const oldTags = parsed.data.tags || [];
    const newTags = Array.from(
      new Set(
        oldTags
          .map(normalizeTag)
          .filter((t) => t), // supprime les vides
      ),
    ).sort();

    // update counts
    newTags.forEach((tag: string) => {
      tagCountsGlobal[tag] = (tagCountsGlobal[tag] || 0) + 1;
      tagCountsPerLang[lang][tag] = (tagCountsPerLang[lang][tag] || 0) + 1;
    });

    // if normalization changed tags → update the file
    if (JSON.stringify(oldTags) !== JSON.stringify(newTags)) {
      console.log(
        `📝 Updating tags in ${lang}/${file} → ${newTags.join(", ")}`,
      );

      parsed.data.tags = newTags;
      const newContent = matter.stringify(parsed.content, parsed.data);
      fs.writeFileSync(fullPath, newContent, "utf8");
    }
  });
});

// Final global report
console.log("\n--- GLOBAL TAG USAGE REPORT ---\n");
const sortedTagsGlobal = Object.entries(tagCountsGlobal).sort((a, b) =>
  b[1] - a[1]
);
//sortedTagsGlobal.forEach(([tag, count]) => {
//  console.log(`${tag.padEnd(30)} → ${count}`);
//});

// Prepare full report object
const reportObject = {
  global: sortedTagsGlobal.map(([tag, count]) => ({ tag, count })),
  perLang: {},
};

for (const lang of langs) {
  const sortedPerLang = Object.entries(tagCountsPerLang[lang])
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));

  reportObject.perLang[lang] = sortedPerLang;
}

// Save report
const reportPath = path.join(
  process.cwd(),
  "public",
  "news",
  "tags-report.json",
);
fs.writeFileSync(reportPath, JSON.stringify(reportObject, null, 2), "utf8");
console.log(
  `\n✅ tags-report.json generated at /public/news/tags-report.json\n`,
);

console.log("🎉 Tag normalization and analysis complete.\n");
