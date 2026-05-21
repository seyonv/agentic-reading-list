# Agentic Reading List

A curated, tiered reading list of **216 blog posts (2024–2026)** on building, deploying, and operating **agentic AI systems**.

Live site: **[agentic-reading-list.vercel.app](https://agentic-reading-list.vercel.app)**

---

## Why this exists

The frontier of agentic AI moves faster than any one person can keep up with. Anthropic, OpenAI, Google, and Microsoft publish engineering posts almost weekly; companies like Ramp, Cursor, Cognition, Vercel, Sourcegraph, Stripe, Shopify, Notion, and Harvey share production war stories; independent voices — Simon Willison, Hamel Husain, Lilian Weng, Eugene Yan, Chip Huyen, Nathan Lambert — provide synthesis and second opinions.

This repo aggregates that work into a single reading list. Every post is:

- **Verified** — the URL was fetched and confirmed live (no LLM-fabricated links).
- **Tiered** — each post is rated **S** (must-read), **A** (strong), or **B** (useful when relevant) with a one-line rationale.
- **Summarized** — two-sentence summary of what the post actually teaches.
- **Tagged** — by topic (`foundations`, `harness/loops`, `production`, `coding/computer-use`).
- **Scoped to 2024–2026** — the field moves too fast for anything older to be load-bearing.

If you're trying to level up and don't know where to start, **[/start-here](https://agentic-reading-list.vercel.app/start-here)** lays out a suggested reading order through the S-tier posts, and **[/principles](https://agentic-reading-list.vercel.app/principles)** distills the big ideas the entire field has converged on.

## What's covered

- **Foundations** — agent taxonomies, context engineering, prompt caching, evals, tool design, MCP, memory, reasoning models, RL post-training, agent reliability.
- **Production war stories** — Ramp's Inspect, Cursor's harness, Cognition's cloud-agent infra, Vercel's tool minimalism, Sourcegraph's failure-mode study, Stripe's integration eval, Shopify's fine-tuned Flow, Notion's "Token Town" rebuild, Harvey's document-editing agent, and many more.
- **Harness & loop patterns** — single-agent vs multi-agent, generator-critic loops, code-as-action, bash-and-filesystem minimalism, PLANS.md / ExecPlans for long-horizon work.
- **Coding & computer-use agents** — Claude Code, Cursor, Devin, Codex, OpenHands, Augment, Continue, Stagehand, Smol2Operator, plus the open-source RL training recipes (DeepSWE, Tülu 3).
- **Infrastructure** — sandboxes (Modal, E2B, Daytona, Browserbase, Cloudflare, Fly.io), observability (Datadog, Honeycomb, LangSmith/SmithDB), memory (Letta, Mem0, Weaviate Engram, Google ReasoningBank).
- **Voice & enterprise** — LiveKit, Vapi, Retell, ElevenLabs, Suki on voice agents; Salesforce Agentforce, Atlassian Rovo, Glean on enterprise deployment.

## Principles

Patterns that show up again and again across the 216 posts. Each principle is grounded in 5–10 of them. (Full grounding and links: **[/principles](https://agentic-reading-list.vercel.app/principles)**.)

### I. Evals are the discipline that decides whether you ship

- **Evals decide whether you ship.** Not prompting, not the model — evals. Error analysis on real failures, custom data viewers, domain-expert involvement. _(Hamel Husain, Anthropic, Braintrust, Eugene Yan, Shreya Shankar)_
- **Public benchmarks lie about what works for you.** SWE-Bench and friends are leak-prone and harness-sensitive. Build your own 50–100-case eval set on real production failures. _(Ramp, Stripe, Harvey, Kapoor & Narayanan, Anthropic)_

### II. Context, tools, and the loop

- **Context is an attention budget, not infinite input.** Performance degrades non-linearly with length. The discipline that replaces 'prompt engineering' is context engineering. _(Anthropic, Chroma, Manus, Sierra, Letta, Lance Martin)_
- **Tool design is half the system. Fewer, sharper tools beat many.** ~80% of what the agent sees is tool output. Less harness, more model. _(Anthropic, Vercel, Braintrust, Hugging Face)_
- **Cache aggressively. Prefix stability matters more than suffix cleverness.** Tool definitions and system prompts should be stable across turns. Mask tools rather than remove them. _(Anthropic, Manus, GitHub)_
- **Feed the agent's plan back to itself.** PLANS.md, decisions.md, CLAUDE.md — written scratchpads outperform memory alone for long-horizon tasks. _(Anthropic, OpenAI, GitHub, Lance Martin, Manus)_

### III. Architecture

- **Single-thread is the default. Multi-agent only when the problem shape demands it.** Most multi-agent setups fragment context and lose decisions across handoffs. _(Cognition, Anthropic, Jason Liu, Cursor, Hebbia)_
- **Memory is its own architecture, not just RAG.** Tiered: working buffer, core blocks, episodic recall, archival store. _(Letta, LangChain, Google, Weaviate, Jason Liu)_
- **The model isn't the product. The system around it is.** Pick problems carefully, build evals, route around model weaknesses, obsess over the wrapper. _(applied-llms.org, Vercel, Hamel Husain, Ramp, Eugene Yan)_

### IV. Safety, infrastructure, and operations

- **Security is architectural, not promptable.** The "lethal trifecta" (private data + untrusted content + external comms) cannot be patched by prompts. _(Simon Willison, Meta "Rule of Two", Anthropic, Microsoft Research)_
- **Sandboxes are non-negotiable for production agents.** Per-session isolation + snapshotting + durable execution. Sub-100ms spin-ups are now table stakes. _(Cognition, Cursor, Anthropic, E2B, Browserbase, Daytona, Cloudflare, Fly.io, Google)_
- **Observability-driven harnesses beat intuition-driven ones.** Span-level traces, replay, deterministic checkers, anomaly detection on tool-call patterns. _(Datadog, Honeycomb, GitHub, LangChain, Anthropic, Cursor, PostHog)_
- **Verification + critics beat "just use a bigger model."** Generator/critic loops and trace-validation outperform single-pass generation. _(Anthropic, GitHub, Ramp)_

### V. Product and UX

- **Trust UX = reasoning + citations + escape hatches.** Suggestion-first beats action-first. Permission prompts beat silent autonomy. HUDs beat copilots. _(Ramp, Anthropic, GitHub, Geoffrey Litt, Decagon)_
- **Pick agent targets by ROI, not by what's impressive.** Automate the boring high-volume work, not the demo. Vercel: 10 → 1 person on lead-qual. _(Vercel, Ramp, PostHog, Hamel Husain)_
- **Agents are becoming economic actors. Price and meter accordingly.** Per-seat breaks once agents run for hours. _(a16z, Jason Liu, Notion)_

## Distribution

|                     | S (must-read) | A (strong) | B (useful) | Total   |
| ------------------- | ------------- | ---------- | ---------- | ------- |
| Foundations         | 27            | 38         | 8          | 73      |
| Production          | 15            | 40         | 14         | 69      |
| Harness/loops       | 14            | 34         | 3          | 51      |
| Coding/computer-use | 3             | 17         | 3          | 23      |
| **Total**           | **59**        | **129**    | **28**     | **216** |

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

Stack: **Next.js 16** (App Router, static export), **TypeScript**, **Tailwind v4**. No database — everything builds from the CSV at compile time. All 216 post pages are statically generated.

## Contributing

Contributions are very welcome. The easiest way to suggest a post:

1. Open an issue with the URL, your suggested tier (S/A/B), and one or two sentences on why it belongs.
2. Or open a PR adding a row to [`data/reading_list.csv`](./data/reading_list.csv).

### Criteria

A post belongs on the list if it:

- Was published **2024–2026** (the field moves fast; older posts are out of scope).
- Has real engineering depth — code, architecture diagrams, eval numbers, or a sharp opinion grounded in production experience. Pure announcements and marketing are out.
- Is publicly accessible (no paywalls beyond a free signup).

### Tier guidance

- **S** — Defines vocabulary the rest of the field has adopted, or is canonical reference material on a sub-topic. ~27% of the list.
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
