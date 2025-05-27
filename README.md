# wellknownmcp.org

🔐 **Private repository** for the official website of the [LLMFeed/MCP specification](https://wellknownmcp.org).

This repository contains the **Next.js frontend**, static resources, markdown content, and tools used to serve, render, and verify `.llmfeed.json` files.

---

## 🧱 Project structure

```bash
/
├── app/               # Next.js routes and pages
├── components/        # Reusable UI components
├── lib/               # Utility logic (signature verification, rendering, etc.)
├── tools/             # Scripts (OG generation, feed tooling)
├── markdown/          # News, manifesto, vision, etc.
├── public/
│   ├── og/            # OG images used for social previews
│   └── .well-known/   # Static feed examples (signed or not)
├── package.json
├── tsconfig.json
├── README.md
└── .env.example       # Optional env config
```

---

## ✍️ Status

This project is currently:

* 🔧 Under active development
* ✅ Implements `trust.signed_blocks` logic
* ⚠️ Viewer and export flows are being adapted to the updated signature structure

---

## 🧪 Local development

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
```

> Requires Node.js 18+ and modern npm.

---

## 📦 Key features

* Enhanced `.llmfeed.json` viewer with signature & certification detection
* Static OG image generation (`tools/generate-og-images`)
* Multilingual static pages (vision, join, news…)
* MCP-ready export support for verified feeds

---

## 📌 Notes

This repo is **private by design**. A public version may be extracted later with cleaned demo content and examples.

> For internal access or staging deployments, contact: [admin@wellknownmcp.org](mailto:admin@wellknownmcp.org)

---

## 📄 License

This repository is part of the **LLMCA ecosystem** and subject to internal terms. Not for redistribution.
