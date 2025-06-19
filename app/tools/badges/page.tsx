"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageTitle } from "@/components/PageTitle";
import SeoHead from "@/components/SeoHead";
import { ShareButtons } from "@/components/ShareButtons";
import { ExportToLLMButton } from "@/components/ExportToLLMButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, Download, Copy, CheckCircle, Shield, Award, Star, Zap } from "lucide-react";

interface BadgeEntry {
  label: string;
  emoji: string;
  badge_file: string;
  description: string;
}

export default function BadgeGalleryPage() {
  const [badges, setBadges] = useState<BadgeEntry[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<BadgeEntry | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/assets/badges/badges.export.llmfeed.json")
      .then((res) => res.json())
      .then((json) => setBadges(json.badges?.badges || []))
      .catch((err) => console.error("Failed to load badges:", err));
  }, []);

  const levelOrder = ["Ready", "Verified", "Signed", "Certified"];

  const handleBadgeSelect = (badge: BadgeEntry) => {
    setSelectedBadge(badge);
    setCopied(false);
  };

  const copyEmbedCode = async () => {
    if (!selectedBadge) return;
    
    const embedCode = `<a href="https://wellknownmcp.org/tools/badges" target="_blank" rel="noopener">
  <img
    src="https://wellknownmcp.org/${selectedBadge.badge_file}"
    alt="${selectedBadge.emoji} ${selectedBadge.label}: ${selectedBadge.description}"
    style="height: 40px; border-radius: 6px; vertical-align: middle;"
  />
</a>`;

    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const getBadgeStats = () => {
    const byLevel = badges.reduce((acc, badge) => {
      const level = badge.label.split("—")[1]?.trim() || "Unknown";
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total: badges.length, byLevel };
  };

  const stats = getBadgeStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <SeoHead
          title="🔖 MCP + LLMFeed Badges | Trust & Capability Indicators"
          description="Visual trust and capability badges for MCP-enabled websites. Display your verification status, agent compatibility, and certification level with beautiful, embeddable badges."
          canonicalUrl="https://wellknownmcp.org/tools/badges"
          keywords={[
            "mcp badges",
            "llmfeed badges", 
            "trust indicators",
            "verification badges",
            "agent compatibility",
            "certification levels",
            "website badges",
            "embedded badges"
          ]}
          ogImage="/og/badges.png"
          llmIntent="discover-badges"
          llmTopic="trust-indicators-badges"
          pageType="tool"
          seoMode="high-ctr"
        />

        <PageTitle
          title="🔖 MCP + LLMFeed Badges"
          subtitle="Visual trust and capability indicators for the agentic web"
        />

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-violet-600">{stats.total}</div>
              <p className="text-sm text-gray-600">Total Badges</p>
            </CardContent>
          </Card>
          {levelOrder.map((level) => (
            <Card key={level} className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.byLevel[level] || 0}
                </div>
                <p className="text-sm text-gray-600">{level}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Introduction */}
        <Card className="mb-8 bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Badge className="w-8 h-8 text-violet-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-violet-900 mb-3">
                  What are MCP badges?
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    Visual indicators that show your website's trust level, export capabilities, 
                    and agent compatibility at a glance.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm"><strong>Types:</strong> Protocol scope (MCP, LLMFeed, Export)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="text-sm"><strong>Levels:</strong> Trust status (Ready → Certified)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm"><strong>Visual:</strong> Unique emoji and color combinations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <span className="text-sm"><strong>Embed:</strong> Copy-paste ready HTML snippets</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badge Embed Tool */}
        <Card className="mb-8 border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copy className="w-5 h-5 text-blue-600" />
              Embed a Badge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Badge:
                </label>
                <select
                  onChange={(e) => {
                    const selected = badges.find(b => 
                      b.badge_file.includes(e.target.value)
                    );
                    if (selected) handleBadgeSelect(selected);
                  }}
                  className="w-full border rounded-lg p-3 bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">-- Choose a badge --</option>
                  {badges.map(badge => (
                    <option key={badge.label} value={badge.badge_file.split("/").pop()}>
                      {badge.emoji} {badge.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col justify-end">
                <Button
                  onClick={copyEmbedCode}
                  disabled={!selectedBadge}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Embed Code
                    </>
                  )}
                </Button>
              </div>
            </div>

            {selectedBadge && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                  <Image
                    src={`/${selectedBadge.badge_file}`}
                    alt={selectedBadge.label}
                    width={160}
                    height={40}
                    className="border rounded"
                  />
                  <div>
                    <h4 className="font-medium">
                      {selectedBadge.emoji} {selectedBadge.label}
                    </h4>
                    <p className="text-sm text-gray-600">{selectedBadge.description}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    HTML Embed Code:
                  </label>
                  <pre className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-lg p-4 overflow-auto text-sm border">
                    <code>{`<a href="https://wellknownmcp.org/tools/badges" target="_blank" rel="noopener">
  <img
    src="https://wellknownmcp.org/${selectedBadge.badge_file}"
    alt="${selectedBadge.emoji} ${selectedBadge.label}: ${selectedBadge.description}"
    style="height: 40px; border-radius: 6px; vertical-align: middle;"
  />
</a>`}</code>
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Badge Gallery */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Badge Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {badges
              .sort((a, b) => {
                const [atype, alevel] = a.label.split("—").map(s => s.trim());
                const [btype, blevel] = b.label.split("—").map(s => s.trim());
                return atype.localeCompare(btype) || levelOrder.indexOf(alevel) - levelOrder.indexOf(blevel);
              })
              .map((badge) => (
                <Card 
                  key={badge.label}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                    selectedBadge?.label === badge.label 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleBadgeSelect(badge)}
                >
                  <CardContent className="flex flex-col items-center justify-center text-center pt-6 pb-4 px-4">
                    <Image
                      src={`/${badge.badge_file}`}
                      alt={badge.label}
                      width={160}
                      height={40}
                      className="mb-3"
                    />
                    <h3 className="text-base font-medium">
                      {badge.emoji} {badge.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {badge.description}
                    </p>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Download className="w-5 h-5" />
              Download All Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              Get all badges + metadata for offline use or integration into your build pipeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <a href="/assets/badges/combined_badges.zip" download>
                  <Download className="w-4 h-4 mr-2" />
                  Download SVG ZIP
                </a>
              </Button>
              <Button  variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                <a href="/assets/badges/badges.export.llmfeed.json" download>
                  <Download className="w-4 h-4 mr-2" />
                  Download .llmfeed.json
                </a>
              </Button>
              <ExportToLLMButton
                context="static"
                staticPath="badges.export.llmfeed"
                showSignatureStatus
                mini
                customLabel="Export Page"
              />
            </div>
          </CardContent>
        </Card>

        {/* Share */}
        <ShareButtons />
      </div>
    </div>
  );
}