import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, TOPIC_LABEL } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Start here — Agentic Reading List",
  description:
    "A suggested reading path through the S-tier posts: foundations first, then production patterns, then advanced topics.",
};

// Curated reading order — group S-tier posts into a sensible learning path.
const READING_PATH: { section: string; blurb: string; slugs: string[] }[] = [
  {
    section: "1. The vocabulary",
    blurb:
      "Start with the taxonomies and patterns everyone else assumes you already know.",
    slugs: [
      "building-effective-agents",
      "a-practical-guide-to-building-agents",
      "agents-chapter-excerpt",
      "what-we-learned-from-a-year-of-building-with-llms",
    ],
  },
  {
    section: "2. Context engineering",
    blurb:
      "The discipline of getting the right tokens in front of the model at the right time.",
    slugs: [
      "effective-context-engineering-for-ai-agents",
      "context-engineering-for-ai-agents-lessons-from-building-manus",
      "context-rot-how-increasing-input-tokens-impacts-llm-performance",
      "anatomy-of-a-context-window-a-guide-to-context-engineering",
      "prompt-caching-with-claude",
    ],
  },
  {
    section: "3. Tools, MCP, and harnesses",
    blurb:
      "How agents actually call out to the world, and the loops that make them work.",
    slugs: [
      "writing-effective-tools-for-agents-with-agents",
      "code-execution-with-mcp-building-more-efficient-ai-agents",
      "effective-harnesses-for-long-running-agents",
      "introducing-the-model-context-protocol",
      "we-removed-80-of-our-agent-s-tools",
    ],
  },
  {
    section: "4. The multi-agent debate",
    blurb:
      "Read both sides — Anthropic's case for it, Cognition's case against, Cognition's revised position.",
    slugs: [
      "how-we-built-our-multi-agent-research-system",
      "don-t-build-multi-agents",
      "multi-agents-what-s-actually-working",
    ],
  },
  {
    section: "5. Evals — the discipline that decides whether you ship",
    blurb: "If you only adopt one practice from this list, make it evals.",
    slugs: [
      "your-ai-product-needs-evals",
      "using-llm-as-a-judge-for-evaluation-a-complete-guide",
      "a-field-guide-to-rapidly-improving-ai-products",
      "demystifying-evals-for-ai-agents",
      "llm-evals-everything-you-need-to-know-faq",
    ],
  },
  {
    section: "6. Security",
    blurb:
      "The non-negotiable read before you give an agent any real-world capability.",
    slugs: [
      "the-lethal-trifecta-for-ai-agents",
      "model-context-protocol-has-prompt-injection-security-problems",
    ],
  },
  {
    section: "7. Production war stories",
    blurb:
      "Real companies running real agents — read these once you've internalized the foundations above.",
    slugs: [
      "why-we-built-our-own-background-agent",
      "how-to-build-agents-users-can-trust",
      "what-we-learned-building-agents-at-vercel",
      "continually-improving-our-agent-harness",
      "what-we-ve-learned-building-cloud-agents-cursor",
      "what-we-learned-building-cloud-agents",
      "why-coding-agents-fail-in-large-codebases-and-what-to-do-about-it",
      "closing-the-verification-loop-observability-driven-harnesses-for-agents",
    ],
  },
  {
    section: "8. Memory and reasoning",
    blurb:
      "Once you can ship a single-loop agent, these unlock longer-horizon work.",
    slugs: [
      "agent-memory-how-to-build-agents-that-learn-and-remember",
      "claude-s-extended-thinking",
      "reward-hacking-in-reinforcement-learning",
      "why-we-think",
    ],
  },
];

export default function StartHere() {
  const posts = getAllPosts();
  const bySlug = new Map(posts.map((p) => [p.slug, p]));

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <header className="mb-10">
        <Link
          href="/"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          ← All posts
        </Link>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-3 mb-3">
          Start here
        </h1>
        <p className="text-[var(--muted)] leading-relaxed">
          A suggested reading path through the S-tier posts. ~25 essays. Read
          them in order if you&rsquo;re new to agents; jump to whichever section
          matches your current question if you&rsquo;re not.
        </p>
      </header>

      <ol className="space-y-12">
        {READING_PATH.map((section, idx) => (
          <li key={idx}>
            <h2 className="text-xl font-semibold tracking-tight mb-1">
              {section.section}
            </h2>
            <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
              {section.blurb}
            </p>
            <ul className="space-y-3">
              {section.slugs.map((slug) => {
                const post = bySlug.get(slug);
                if (!post) {
                  return (
                    <li key={slug} className="text-xs text-red-500 font-mono">
                      missing slug: {slug}
                    </li>
                  );
                }
                return (
                  <li key={slug}>
                    <Link href={`/posts/${post.slug}`} className="group block">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded tier-pill-${post.tier.toLowerCase()}`}
                        >
                          {post.tier}
                        </span>
                        <span className="font-medium group-hover:underline underline-offset-2">
                          {post.title}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--muted)] mt-1 ml-7 leading-relaxed">
                        {post.source} · {post.yearMonth} ·{" "}
                        {TOPIC_LABEL[post.topic]}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
