import * as cheerio from 'cheerio';
import { parseSitemapUrl } from '../../app/api/parseSitemapUrl';

export async function simulateFallbackAnalysis(origin: string) {
  const fallback: any = { title: "", meta: {}, sitemap: null, keywords: [] };

  try {
    const htmlRes = await fetch(origin);
    if (htmlRes.ok) {
      const html = await htmlRes.text();
      const $ = cheerio.load(html);

      fallback.title = $("title").text();

      $("meta").each((_, el) => {
        const name = $(el).attr("name") || $(el).attr("property");
        const content = $(el).attr("content");
        if (name && content) {
          fallback.meta[name] = content;
          if (name.toLowerCase() === "keywords") {
            fallback.keywords = content.split(",").map(k => k.trim());
          }
        }
      });
    }
  } catch (err) {
    console.warn("HTML fetch failed:", err);
  }

  try {
    const entries = await parseSitemapUrl(origin + "/sitemap.xml");
    if (entries.length > 0) {
      fallback.sitemap = entries;
    }
  } catch (err) {
    console.warn("Sitemap parse failed:", err);
  }

  return fallback;
}
