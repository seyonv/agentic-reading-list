# Agentic Reading List

A curated, tiered reading list of **136 blog posts (2024–2026)** on building, deploying, and operating **agentic AI systems**.

Live site: **[agentic-reading-list.vercel.app](https://agentic-reading-list.vercel.app)**

---

## Why this exists

The frontier of agentic AI moves faster than any one person can keep up with. Anthropic, OpenAI, Google, and Microsoft publish engineering posts almost weekly; companies like Ramp, Cursor, Cognition, Vercel, Sourcegraph, Stripe, and Shopify share production war stories; and independent voices — Simon Willison, Hamel Husain, Lilian Weng, Eugene Yan, Chip Huyen — provide synthesis and second opinions.

This repo aggregates that work into a single reading list. Every post is:

- **Verified** — the URL was fetched and confirmed live (no LLM-fabricated links).
- **Tiered** — each post is rated **S** (must-read), **A** (strong), or **B** (useful when relevant) with a one-line rationale.
- **Summarized** — two-sentence summary of what the post actually teaches.
- **Tagged** — by topic (`foundations`, `harness/loops`, `production`, `coding/computer-use`).
- **Scoped to 2024–2026** — the field moves too fast for anything older to be load-bearing.

If you're trying to level up your understanding of agents and don't know where to start, **[/start-here](https://agentic-reading-list.vercel.app/start-here)** lays out a suggested reading order through the S-tier posts.

## What's covered

- **Foundations** — agent taxonomies, context engineering, prompt caching, evals, tool design, MCP, memory, reasoning models.
- **Production war stories** — Ramp's Inspect agent, Cursor's harness iteration, Cognition's cloud-agent infra, Vercel's "we removed 80% of our tools," Sourcegraph's 1,281-run failure-mode study, Stripe's integration eval, Shopify's fine-tuned Flow agent, and more.
- **Harness & loop patterns** — single-agent vs multi-agent, the Anthropic↔Cognition debate, parallel subagents, generator-critic loops, the bash-and-filesystem minimalism trend.
- **Coding & computer-use agents** — Claude Code, Cursor, Devin, GitHub Copilot architectures, SWE-Bench lessons, computer-use APIs.

## Distribution

|                     | S (must-read) | A (strong) | B (useful) | Total   |
| ------------------- | ------------- | ---------- | ---------- | ------- |
| Foundations         | 20            | 24         | 8          | 52      |
| Production          | 9             | 20         | 14         | 43      |
| Harness/loops       | 7             | 19         | 3          | 29      |
| Coding/computer-use | 1             | 8          | 3          | 12      |
| **Total**           | **37**        | **71**     | **28**     | **136** |

## Use the data directly

The single source of truth is [`data/reading_list.csv`](./data/reading_list.csv). Columns:

```
title, url, source, year_month, topic, tier, summary, rationale
```

Open it in Excel, Numbers, Notion, or pipe it to anything that reads CSV. The site is just a friendly view on top.

## Run locally

```bash
git clone https://github.com/seyonv/agentic-reading-list.git
cd agentic-reading-list
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Stack: **Next.js 16** (App Router, static export), **TypeScript**, **Tailwind v4**. No database — everything is built from the CSV at compile time. All 136 post pages are statically generated.

## Contributing

Contributions are very welcome. The easiest way to suggest a post:

1. Open an issue with the URL, your suggested tier (S/A/B), and one or two sentences on why it belongs.
2. Or open a PR adding a row to [`data/reading_list.csv`](./data/reading_list.csv).

### Criteria

A post belongs on the list if it:

- Was published **2024–2026** (the field moves fast; older posts are out of scope).
- Has real engineering depth — code, architecture diagrams, eval numbers, or a sharp opinion grounded in production experience. Pure announcements and marketing are out.
- Is publicly accessible (no paywall walls beyond a free signup).

### Tier guidance

- **S** — Defines vocabulary the rest of the field has adopted, or is canonical reference material on a sub-topic. ~25% of the list.
- **A** — Strong engineering content, often with novel data or a clear opinion. The bulk of the list.
- **B** — Useful when the specific sub-topic comes up. Don't read these first.

### CSV format

Each row uses double-quoted fields (RFC 4180). Topics are one of:

- `foundational-concepts`
- `harness/loops`
- `production-deployment`
- `adjacent-coding-or-computer-use`

`year_month` is `YYYY-MM`. Summary and rationale should be concise — one to two sentences each.

## License

MIT. See [LICENSE](./LICENSE).

The blog posts themselves remain the property of their respective authors — this repo only catalogs links, titles, and editorial summaries.
