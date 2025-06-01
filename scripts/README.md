
# News Scripts

## Contents

- `generate-index-news.js` → generates `public/news/index.json` enriched (title, date, description, tags, excerpt)
- `generate-rss.js` → generates `public/news/[lang]/rss.xml` from `index.json`

## Install dependencies

```bash
npm install gray-matter feed
```

## Usage

```bash
node scripts/generate-index-news.js
node scripts/generate-rss.js
```

## Integration in build

```json
"scripts": {
  "build": "next build",
  "postbuild": "next-sitemap && node scripts/generate-index-news.js && node scripts/generate-rss.js"
}
```

## Notes

- The News page can read `index.json`, no need to fetch each .md dynamically.
- You can use `index.json` for Previous/Next links in article pages.
