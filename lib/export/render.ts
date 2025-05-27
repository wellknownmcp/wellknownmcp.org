
export async function renderPageAsHtml(slug: string): Promise<string> {
  const fs = await import('fs/promises');
  const path = await import('path');
  const mdPath = path.join(process.cwd(), 'content', `${slug}.md`);
  const markdown = await fs.readFile(mdPath, 'utf-8');
  return `<html><body><pre>${markdown}</pre></body></html>`;
}
