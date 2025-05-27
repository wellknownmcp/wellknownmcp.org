// app/[lang]/news/[slug]/page.tsx
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SeoHead from "@/components/SeoHead";
import { PageTitle } from "@/components/PageTitle";
import {ShareButtons} from "@/components/ShareButtons";

export async function generateMetadata({ params }: { params: { slug: string; lang: string } }): Promise<Metadata> {
  const lang = params.lang || "en";
  const slug = params.slug;
  const fallbackLang = "en";

  async function tryRead(filePath: string) {
    try {
      return await fs.readFile(filePath, "utf-8");
    } catch {
      return null;
    }
  }

  const mdPath = path.join(process.cwd(), "public/news", lang, `${slug}.md`);
  let content = await tryRead(mdPath);

  if (!content && lang !== fallbackLang) {
    const fallbackPath = path.join(process.cwd(), "public/news", fallbackLang, `${slug}.md`);
    content = await tryRead(fallbackPath);
  }

  if (!content) notFound();

  const { data: front } = matter(content);

  // Filter out future-dated articles
  const now = new Date();
  const pubDate = front.date ? new Date(front.date) : null;
  if (pubDate && pubDate > now) notFound();

  return {
    title: front.title || `${slug} — News from wellknownmcp.org`,
    description: front.description || `Read the latest news: ${slug}`,
    keywords: front.keywords || "MCP, news, update, llmfeed, trust, protocol",
    openGraph: {
      images: [front.image || `/og/news/${slug}.png`]
    }
  };
}

export default async function NewsPost({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang || "en";
  const slug = params.slug;
  const fallbackLang = "en";

  async function tryRead(filePath: string) {
    try {
      return await fs.readFile(filePath, "utf-8");
    } catch {
      return null;
    }
  }

  const mdPath = path.join(process.cwd(), "public/news", lang, `${slug}.md`);
  let content = await tryRead(mdPath);

  if (!content && lang !== fallbackLang) {
    const fallbackPath = path.join(process.cwd(), "public/news", fallbackLang, `${slug}.md`);
    content = await tryRead(fallbackPath);
  }

  if (!content) notFound();

  const { content: markdown, data: front } = matter(content);

  const now = new Date();
  const pubDate = front.date ? new Date(front.date) : null;
  if (pubDate && pubDate > now) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <SeoHead
        title={front.title || slug}
        description={front.description || "Latest protocol update."}
        canonicalUrl={`https://wellknownmcp.org/${lang}/news/${slug}`}
        ogImage={front.image || `/og/news/${slug}.png`}
        llmIntent={front.llmIntent}
        llmTopic={front.llmTopic}
        llmIndexUrl={front.llmIndexUrl}
        llmlang={front.llmlang || lang}
        keywords={front.keywords}
      />

      <PageTitle title={front.title || slug.replace(/[-_]/g, " ")} subtitle="An update from the protocol ecosystem" />
      <ShareButtons />

      {front.image && (
        <img
          src={front.image}
          alt=""
          className="w-full rounded-lg shadow-md mb-6 max-h-64 object-cover"
        />
      )}

      <div className="prose dark:prose-invert" dir={front.dir === "rtl" ? "rtl" : "ltr"} lang={front.lang || lang}>
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </div>
    </div>
  );
}
