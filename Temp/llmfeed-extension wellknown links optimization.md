# Recommendations for exposing `.well-known/` on WellKnownMCP.org

## 🎯 Objective

Ensure that all files in the `.well-known/` folder are:

- accessible to AI agents and LLM crawlers

- non-intrusive for human visitors

- aligned with the MCP signature and certification strategy

## ✅ Recommended strategy

### 1️⃣ Include `.well-known/` in `robots.txt`

```
User-agent: *
Allow: /.well-known/
Sitemap: https://wellknownmcp.org/sitemap.xml
```

👉 Explicitly signals to crawlers that this folder can be explored.

### 2️⃣ Automatically inject all `.well-known/` files into the sitemap

Use the following function in `next-sitemap.config.js`:

```js
function getWellKnownPaths() {
  const dir = path.resolve(__dirname, "public/.well-known");
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter(file => fs.statSync(path.join(dir, file)).isFile())
    .map(file => ({
      loc: `${siteUrl}/.well-known/${file}`,
      changefreq: "weekly",
      priority: 1.0,
      lastmod: new Date().toISOString()
    }));
}
```

👉 Dynamically adds all `.well-known/` files to the sitemap.

### 3️⃣ Add links to the site as `sr-only`

Integrate in `Footer.tsx`:

```tsx
import { getWellKnownLinks } from '@/libs/getWellKnownLinks';

const wellKnownLinks = getWellKnownLinks();

<div className="sr-only">
  <ul>
    {wellKnownLinks.map(link => (
      <li key={link.href}>
        <a href={link.href}>{link.label}</a>
      </li>
    ))}
  </ul>
</div>
```

👉 `sr-only` = completely invisible to users, fully readable by crawlers.

### 4️⃣ Use internal links (optional)

It is recommended to also add a discreet link in a dedicated page like "For LLM Agents" or "MCP Access":

```html
<a href="/.well-known/mcp">MCP Metadata</a>
```

👉 This further increases crawler visibility.

## ✅ Expected result

| Action               | Effect                                 |
| -------------------- | -------------------------------------- |
| robots.txt           | Explicit crawl permission              |
| sitemap              | Automatic discovery by all engines     |
| sr-only links        | Guaranteed crawl, no visual disruption |
| Optional public link | Enhanced crawling                      |

## 🎉 Conclusion

This strategy ensures WellKnownMCP.org follows best practices for:

- reliable exposure of `.well-known/` endpoints

- MCP compliance

- full compatibility with both classic search engines and LLM agent crawlers
