import Head from 'next/head';

interface SeoHeadProps {
  title: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  llmIntent?: string;
  llmTopic?: string;
  llmIndexUrl?: string; // e.g., /.well-known/index.llmfeed.json
  llmlang?: string;
  keywords?: string[] | string;
}

export default function SeoHead({
  title,
  description,
  ogImage,
  canonicalUrl,
  llmIntent,
  llmTopic,
  llmIndexUrl,
  llmlang,
  keywords,
}: SeoHeadProps) {
  const fullTitle = `${title} — wellknownmcp.org`;

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: fullTitle,
    description: description || '',
    url: canonicalUrl || '',
  };
  const resolvedKeywords =
    typeof keywords === "string"
      ? keywords
      : Array.isArray(keywords)
      ? keywords.join(", ")
      : "";


  return (
    <Head>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />} 
     {resolvedKeywords && <meta name="keywords" content={resolvedKeywords} />}    

      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />} 
      {ogImage && <meta property="og:image" content={ogImage} />} 
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      {ogImage && <meta name="twitter:image" content={ogImage} />} 
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />} 

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />} 
      <meta name="robots" content="index, follow" />
      <meta name="author" content="LLMCA / wellknownmcp.org" />
      {llmIntent && <meta name="llm-intent" content={llmIntent} />} 
      {llmTopic && <meta name="llm-topic" content={llmTopic} />} 
      {llmIndexUrl && <link rel="llm-index" href={llmIndexUrl} />} 
      {llmlang && <meta name="llm-language" content={llmlang} />} 

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
    </Head>
  );
}
