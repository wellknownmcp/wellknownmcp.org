"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";

interface BadgeEntry {
  label: string;
  emoji: string;
  badge_file: string;
  description: string;
}

export default function BadgeGalleryPage() {
  const [badges, setBadges] = useState<BadgeEntry[]>([]);

  useEffect(() => {
    fetch("/assets/badges/badges.export.llmfeed.json")
      .then((res) => res.json())
      .then((json) => setBadges(json.badges?.badges || []));
  }, []);

  const levelOrder = ["Ready", "Verified", "Signed", "Certified"];

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <SeoHead
        title="🔖 MCP + LLMFeed Badges"
        description="All trust and capability badges used in the wellknownmcp.org ecosystem."
        canonicalUrl="https://wellknownmcp.org/tools/badges"
        ogImage="/og/badges.png"
        llmIntent="learn-badges"
        llmTopic="mcp-badges"
      />

      <h1 className="text-3xl font-bold mb-4">🔖 MCP + LLMFeed Badges</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        This page lists all visual badges used to indicate trust levels, export availability, or agent compatibility.
        You can use these in your documentation, feed metadata, or badge previews.
      </p>

      <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-8 text-sm">
        <li><strong>Types</strong>: Represent protocol scope (e.g. MCP, LLMFeed, Export, etc.).</li>
        <li><strong>Levels</strong>: Represent trust or validation status (e.g. Ready, Verified, Signed, Certified).</li>
        <li>Each badge combines one type + one level, with distinct emoji and color.</li>
        <li>Badges are listed by level, in four columns: Ready, Verified, Signed, Certified.</li>
      </ul>

      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-4">Embed a Badge</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          Select a badge to generate an embeddable HTML snippet:
        </p>
        <select
          onChange={(e) => {
            const selected = badges.find(b => b.badge_file.includes(e.target.value));
            const codeBlock = document.getElementById("embed-snippet");
            if (selected && codeBlock) {
              const code = `<a href=\"https://wellknownmcp.org/tools/badges\" target=\"_blank\" rel=\"noopener\">
  <img
    src=\"https://wellknownmcp.org/${selected.badge_file}\"
    alt=\"${selected.emoji} ${selected.label}: ${selected.description}\"
    style=\"height: 40px; border-radius: 6px; vertical-align: middle;\"
  />
</a>`;
              codeBlock.textContent = code;
            }
          }}
          className="mb-4 border rounded p-2 bg-white dark:bg-gray-900 dark:text-white"
        >
          <option value="">-- Choose a badge --</option>
          {badges.map(b => (
            <option key={b.label} value={b.badge_file.split("/").pop()}>
              {b.emoji} {b.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            const code = document.getElementById("embed-snippet")?.textContent;
            if (code) {
              navigator.clipboard.writeText(code);
              const msg = document.getElementById("copied-msg");
              if (msg) {
                msg.style.opacity = "1";
                setTimeout(() => (msg.style.opacity = "0"), 1500);
              }
            }
          }}
          className="ml-2 mb-4 px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Copy to clipboard
        </button>
        <span id="copied-msg" className="ml-2 text-green-600 text-sm transition-opacity duration-300 opacity-0">Copied!</span>
        <pre className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded p-4 overflow-auto text-sm">
          <code id="embed-snippet">&lt;!-- Select a badge to generate embed code --&gt;</code>
        </pre>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
          You can paste this anywhere on your site. It links back to this badge gallery.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        {badges
          .sort((a, b) => {
            const [atype, alevel] = a.label.split("—").map(s => s.trim());
            const [btype, blevel] = b.label.split("—").map(s => s.trim());
            return atype.localeCompare(btype) || levelOrder.indexOf(alevel) - levelOrder.indexOf(blevel);
          })
          .map((badge) => (
            <Card key={badge.label}>
              <CardContent className="flex flex-col items-center justify-center text-center pt-6 pb-4 px-4">
                <Image
                  src={`/${badge.badge_file}`}
                  alt={badge.label}
                  width={160}
                  height={40}
                />
                <h3 className="text-base font-medium mt-2">{badge.emoji} {badge.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{badge.description}</p>
              </CardContent>
            </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="mb-2">Download all badges + metadata:</p>
        <div className="flex justify-center gap-4">
          <Button>
            <a href="/assets/badges/combined_badges.zip" download>
              Download SVG ZIP
            </a>
          </Button>
          <Button>
            <a href="/assets/badges/badges.export.llmfeed.json" download>
              Download .llmfeed.json
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
