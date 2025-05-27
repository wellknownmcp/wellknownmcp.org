export async function parseSitemapUrl(sitemapUrl: string) {
  try {
    const res = await fetch("/api/parse-sitemap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: sitemapUrl })
    });
    if (!res.ok) throw new Error("Sitemap API error");
    const data = await res.json();
    return data.sitemap || [];
  } catch (err) {
    console.warn("Failed to parse sitemap:", err);
    return [];
  }
}
