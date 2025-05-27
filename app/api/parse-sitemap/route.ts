import { NextRequest } from 'next/server';
import xml2js from 'xml2js';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || !url.startsWith('http')) {
      return new Response(JSON.stringify({ error: 'Invalid URL' }), { status: 400 });
    }

    const res = await fetch(url);
    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Unable to fetch sitemap' }), { status: 502 });
    }

    const xml = await res.text();
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xml);

    const urls = result.urlset?.url?.map((u: any) => ({
      loc: u.loc?.[0] || '',
      lastmod: u.lastmod?.[0] || null,
      changefreq: u.changefreq?.[0] || null,
      priority: u.priority?.[0] || null
    })) || [];

    return new Response(JSON.stringify({ sitemap: urls }, null, 2), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
