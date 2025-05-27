import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || undefined,
});

const REPO_OWNER = "wellknownmcp";
const REPO_NAME = "llmfeed-spec";
const CACHE_DURATION_MS = 1000 * 60 * 60; // 1 hour

let filesCache: { timestamp: number; files: any[] } | null = null;
let contentCache: { [path: string]: { timestamp: number; content: string } } = {};

export async function listSpecFiles(): Promise<string[]> {
  if (filesCache && Date.now() - filesCache.timestamp < CACHE_DURATION_MS) {
    return filesCache.files;
  }
  const res = await octokit.request('GET /repos/{owner}/{repo}/contents', {
    owner: REPO_OWNER,
    repo: REPO_NAME,
  });
  const files = res.data
    .filter((file: any) => file.name.endsWith('.md'))
    .map((file: any) => file.name.replace('.md', ''));

  filesCache = { timestamp: Date.now(), files };
  return files;
}

export async function fetchSpecFile(slug: string): Promise<string> {
  if (contentCache[slug] && Date.now() - contentCache[slug].timestamp < CACHE_DURATION_MS) {
    return contentCache[slug].content;
  }
  const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: slug + '.md',
  });
  const decoded = Buffer.from(res.data.content, 'base64').toString('utf-8');
  contentCache[slug] = { timestamp: Date.now(), content: decoded };
  return decoded;
}
