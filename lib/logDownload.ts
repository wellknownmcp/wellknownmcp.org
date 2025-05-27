export async function logDownload({
  href,
  feed_type = 'unknown',
  lang = 'en',
  source_page = typeof window !== 'undefined' ? window.location.pathname : ''
}: {
  href: string
  feed_type?: string
  lang?: string
  source_page?: string
}) {
  try {
    await fetch('/api/log-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ href, feed_type, lang, source_page })
    })
  } catch (err) {
    console.warn('Download logging failed:', err)
  }
}
