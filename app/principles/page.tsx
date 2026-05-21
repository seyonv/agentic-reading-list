import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Principles — Agentic Reading List",
  description:
    "The big ideas that emerge across 216 blog posts on agentic AI systems. What the field has actually learned.",
};

type Principle = {
  title: string;
  context: string;
  // Reference grounding posts by exact title — resolved to slugs at build time
  groundingTitles: string[];
};

type Section = {
  heading: string;
  blurb: string;
  principles: Principle[];
};

const SECTIONS: Section[] = [
  {
    heading: "I. Evals are the discipline that decides whether you ship",
    blurb:
      "If you internalize one thing from this list, internalize that evals — not prompting, not the model — separate AI products that work from those that don't.",
    principles: [
      {
        title: "Evals decide whether you ship.",
        context:
          "Every practitioner who has shipped an LLM product in anger ends up at the same conclusion: the team that wins is the one with a trustworthy evaluation system. Error analysis on real failures, custom data viewers, domain-expert involvement, and a tight observe-annotate-experiment loop matter more than which model or framework you pick. Lukewarm evals = lukewarm product.",
        groundingTitles: [
          "Your AI Product Needs Evals",
          "A Field Guide to Rapidly Improving AI Products",
          "Using LLM-as-a-Judge for Evaluation: A Complete Guide",
          "Demystifying evals for AI agents",
          "LLM Evals: Everything You Need to Know (FAQ)",
          "An LLM-as-Judge Won't Save The Product — Fixing Your Process Will",
          "Evaluating agents",
          "The Revenge of the Data Scientist",
        ],
      },
      {
        title:
          "Public benchmarks lie about what works for you. Build domain evals.",
        context:
          "SWE-Bench, GAIA, and leaderboards in general are saturated, leak-prone, and infrastructure-sensitive (Anthropic measured 6-point swings just from harness differences). Reliability also lags accuracy badly across all frontier models. The teams that ship build their own 50–100-case eval set on real production failures, then iterate against it.",
        groundingTitles: [
          "Financial Benchmarks",
          "Can AI agents build real Stripe integrations? A benchmark",
          "Open-Sourcing Harvey's Long Horizon Legal Agent Benchmark",
          "Quantifying infrastructure noise in agentic coding evals",
          "Towards a science of AI agent reliability",
          "Product Evals in Three Simple Steps",
          "Open-world evaluations for measuring frontier AI capabilities",
        ],
      },
    ],
  },
  {
    heading: "II. Context, tools, and the loop",
    blurb:
      "The day-to-day craft of building agents lives here. Context engineering, tool design, caching, and how the loop hands information back to itself.",
    principles: [
      {
        title:
          "Context is an attention budget, not infinite input. Engineer it like one.",
        context:
          "Performance degrades non-linearly with input length — even frontier models lose accuracy under semantic distractors and long contexts. The discipline that replaces 'prompt engineering' is context engineering: compaction, structured note-taking, sub-agents for isolation, progressive disclosure of tools, and just-in-time retrieval.",
        groundingTitles: [
          "Effective context engineering for AI agents",
          "Context Rot: How Increasing Input Tokens Impacts LLM Performance",
          "Context Engineering for AI Agents: Lessons from Building Manus",
          "Context engineering: the key to great agents",
          "Anatomy of a Context Window: A Guide to Context Engineering",
          "Context Engineering for Agents (LangChain)",
          "Context Engineering in Manus",
        ],
      },
      {
        title:
          "Tool design is half the system. Fewer, sharper tools beat many.",
        context:
          "Roughly 80% of what an agent sees in its loop is tool output, so tool design is at least as important as prompt design. Teams that replaced specialized tools with bash + filesystem access saw faster, cheaper, more reliable agents. When you do define tools, give them human-readable names, narrow scope, token-efficient outputs, and iterate the descriptions against evals.",
        groundingTitles: [
          "Writing effective tools for agents — with agents",
          "We removed 80% of our agent's tools",
          "Raising the bar on SWE-bench Verified with Claude 3.5 Sonnet",
          "The canonical agent architecture: A while loop with tools",
          "How to build agents with filesystems and bash",
          "CodeAgents + Structure: A Better Way to Execute Actions",
        ],
      },
      {
        title:
          "Cache aggressively. Prefix stability matters more than suffix cleverness.",
        context:
          "Prompt and KV cache hits cut cost up to 90% and latency 85%. That means tool definitions, system prompts, and few-shot examples should be ordered so they stay stable across turns. Mask tools (don't remove), keep names deterministic, and prefer code execution over giant tool-definition payloads when you have hundreds of tools.",
        groundingTitles: [
          "Prompt caching with Claude",
          "Context Engineering for AI Agents: Lessons from Building Manus",
          "Improving token efficiency in GitHub Agentic Workflows",
          "Code execution with MCP: Building more efficient AI agents",
        ],
      },
      {
        title:
          "Feed the agent's plan back to itself. Recitation, scratchpads, and drop-boxes work.",
        context:
          "Agents lose track of long objectives. Making them write down decisions in a structured file (PLANS.md, decisions.md, CLAUDE.md), then re-read or update it each turn, is the simplest reliable way to make long-horizon work converge. A no-op 'think' tool gave Claude a 54% relative gain on τ-Bench airline tasks.",
        groundingTitles: [
          "The 'think' tool: Enabling Claude to stop and think in complex tool use",
          "Using PLANS.md for multi-hour problem solving",
          "How Squad runs coordinated AI agents inside your repository",
          "Claude Diary: Learning from experience",
          "Effective harnesses for long-running agents",
          "Context Engineering for AI Agents: Lessons from Building Manus",
        ],
      },
    ],
  },
  {
    heading: "III. Architecture",
    blurb:
      "When to split work, when not to. How memory fits in. And the most important architectural truth of all: the model is not the product.",
    principles: [
      {
        title:
          "Single-thread is the default. Multi-agent only when the problem shape demands it.",
        context:
          "Multi-agent systems fragment decisions and lose context across handoffs (the 'telephone game'). Most production wins come from single-threaded agents with strong context management. Multi-agent works when subtasks are truly parallel and verifiable — research fan-out, narrow optimization, fan-out reads — and even then needs careful orchestration.",
        groundingTitles: [
          "Don't Build Multi-Agents",
          "Multi-Agents: What's Actually Working",
          "Why Cognition Does Not Use Multi-Agent Systems (Liu interview)",
          "How we built our multi-agent research system",
          "Speeding up GPU kernels by 38% with a multi-agent system",
          "The Multi-Agent Redesign Behind Matrix",
        ],
      },
      {
        title: "Memory is its own architecture, not just RAG.",
        context:
          "Classic single-shot RAG is reactive and stateless; agent memory is stateful, multi-step, and tiered: working buffer, core memory blocks, episodic recall, archival store. Teams that win at long-running agents treat memory as a first-class subsystem with its own pipeline (extract → transform → commit) rather than bolting on vector search.",
        groundingTitles: [
          "Agent Memory: How to Build Agents that Learn and Remember",
          "RAG is not Agent Memory",
          "Memory Blocks: The Key to Agentic Context Management",
          "Memory for Agents",
          "Benchmarked OpenAI Memory vs LangMem vs MemGPT vs Mem0",
          "ReasoningBank: enabling agents to learn from experience",
          "Engram: Memory by Weaviate",
          "Beyond Chunks: Context Engineering for RAG",
        ],
      },
      {
        title: "The model isn't the product. The system around it is.",
        context:
          "Companies that ship pick problems carefully, build their own evals, route around model weaknesses, and obsess over the wrapper. The model is a commodity that improves under you; the data viewers, escape hatches, observability, and feedback loops are where the durable value sits.",
        groundingTitles: [
          "What We Learned From A Year of Building with LLMs",
          "What we learned building agents at Vercel",
          "A Field Guide to Rapidly Improving AI Products",
          "How To Build Agents Users Can Trust",
          "How to Work and Compound with AI",
        ],
      },
    ],
  },
  {
    heading: "IV. Safety, infrastructure, and operations",
    blurb:
      "Everything you need to keep a production agent up, safe, and debuggable.",
    principles: [
      {
        title:
          "Security is architectural, not promptable. The lethal trifecta is a structural problem.",
        context:
          "The combination of private data + untrusted content + external comms makes any agent exfiltratable; no prompt-level guardrail patches this. Defense means architecture: split agents so any individual instance has at most two of those three capabilities (Meta's 'Rule of Two'), isolate untrusted content, gate external actions behind deterministic policy.",
        groundingTitles: [
          "The lethal trifecta for AI agents",
          "Model Context Protocol has prompt injection security problems",
          "New prompt injection papers: Agents Rule of Two and The Attacker Moves Second",
          "Design Patterns for Securing LLM Agents against Prompt Injections",
          "Agentic Misalignment: How LLMs Could Be Insider Threats",
          "Red-teaming a network of agents",
        ],
      },
      {
        title: "Sandboxes are non-negotiable for production agents.",
        context:
          "Per-session isolation, snapshotting, and durable execution are the unlocks for async / long-horizon agents. Cognition, Cursor, and Anthropic all converged independently on VM- or microVM-level isolation with state checkpointing. Sub-100ms sandbox spin-up has become a competitive primitive in agent infrastructure.",
        groundingTitles: [
          "What We Learned Building Cloud Agents",
          "What we've learned building cloud agents (Cursor)",
          "Beyond permission prompts: Claude Code sandboxing",
          "Firecracker vs QEMU",
          "We built caching into Stagehand. Here's how it works",
          "Introducing Daytona Cloud: The Agent-Native Infrastructure",
          "Making Cloudflare the best platform for building AI Agents",
          "Phoenix.new — The Remote AI Runtime for Phoenix",
          "Agent Sandbox on GKE + first look at Agent Substrate",
        ],
      },
      {
        title: "Observability-driven harnesses beat intuition-driven ones.",
        context:
          "You can't fix what you can't see. Span-level traces, replay, deterministic checkers, and verification layers turn agent loops from black boxes into engineering systems. Anomaly detection on tool-call patterns cut error rates by ~10x at Cursor; structured trace stores let LangSmith load 200-turn traces in 92ms.",
        groundingTitles: [
          "Closing the verification loop: observability-driven harnesses for agents",
          "Agent Timeline: The Flight Recorder for Your AI Agents",
          "Validating agentic behavior when 'correct' isn't deterministic",
          "Introducing SmithDB: the data layer for agent observability",
          "Quantifying infrastructure noise in agentic coding evals",
          "Continually improving our agent harness",
          "4,063 errors closed without a human opening PostHog",
        ],
      },
      {
        title: "Verification + critics beat 'just use a bigger model.'",
        context:
          "Generator/critic loops, GAN-style harnesses, and dominator-style trace validation outperform single-pass generation. Ramp's detector-manager-validator-fixer pipeline closed ~100 real vulnerabilities in a week with zero humans; Anthropic's critic harness improves full-stack app quality without changing the underlying model.",
        groundingTitles: [
          "Harness design for long-running application development",
          "Validating agentic behavior when 'correct' isn't deterministic",
          "We proactively fixed ~100 security issues in 6 days with 0 humans",
          "Demystifying evals for AI agents",
        ],
      },
    ],
  },
  {
    heading: "V. Product and UX",
    blurb:
      "Agents don't ship in a vacuum. The UX, target selection, and economic model decide whether anyone actually uses them.",
    principles: [
      {
        title: "Trust UX = reasoning + citations + escape hatches.",
        context:
          "Users won't hand off real work to an agent that doesn't show its reasoning, cite its sources, and offer a clear way to intervene. Suggestion-first beats action-first; permission prompts beat silent autonomy; HUDs beat copilots. The fastest way to lose trust is one confident wrong action.",
        groundingTitles: [
          "How To Build Agents Users Can Trust",
          "Beyond permission prompts: Claude Code sandboxing",
          "Agent pull requests are everywhere. Here's how to review them.",
          "Enough AI Copilots! We Need AI HUDs",
          "Malleable software: Restoring user agency",
          "Beyond Latency: The Art of Building a Truly Great Voice Agent",
        ],
      },
      {
        title: "Pick agent targets by ROI, not by what's impressive.",
        context:
          "The right first agent automates the boring high-volume work nobody likes, not the demo-friendly novelty. Vercel's lead-qualification agent took a 10-person team down to 1. PostHog's error-triage agent closed 4,063 issues without human intervention. Ramp's coding agent authors 60% of merged PRs. The pattern is the same: pick a workflow people already hate, then automate it.",
        groundingTitles: [
          "What we learned building agents at Vercel",
          "How To Build Agents Users Can Trust",
          "4,063 errors closed without a human opening PostHog",
          "The coding agent behind 60% of Ramp's merged PRs",
          "A Field Guide to Rapidly Improving AI Products",
        ],
      },
      {
        title:
          "Agents are becoming economic actors. Price and meter accordingly.",
        context:
          "Once agents can run for hours and spend real compute, you can't price per seat. Notion shipped credit caps after agents created 1M+ custom workflows in two months. The emerging 'agent payments stack' (wallets, identity, intent-to-pay, settlement) treats the agent as an entity that earns, pays, and is paid against headcount-equivalent value.",
        groundingTitles: [
          "How Will My Agent Pay for Things?",
          "Pricing AI Agents: Headcount and the Economic Reality",
          "What we learned during the Custom Agents beta",
        ],
      },
    ],
  },
];

function slugify(t: string): string {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function buildTitleToSlugMap() {
  const posts = getAllPosts();
  const map = new Map<string, string>();
  for (const p of posts) map.set(p.title, p.slug);
  return map;
}

export default function PrinciplesPage() {
  const titleToSlug = buildTitleToSlugMap();
  const posts = getAllPosts();
  const bySlug = new Map(posts.map((p) => [p.slug, p]));

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <header className="mb-12">
        <Link
          href="/"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          ← All posts
        </Link>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-3 mb-3">
          Principles
        </h1>
        <p className="text-[var(--muted)] leading-relaxed">
          The big ideas that emerge across {posts.length} curated posts on
          agentic AI systems. Bolded principle at the top of each block; context
          underneath; and the posts that ground that idea linked below. Read
          them like axioms — most experienced practitioners would defend all of
          these.
        </p>
      </header>

      <div className="space-y-16">
        {SECTIONS.map((section, sIdx) => (
          <section key={sIdx}>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2">
              {section.heading}
            </h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-8">
              {section.blurb}
            </p>
            <ol className="space-y-10">
              {section.principles.map((p, pIdx) => (
                <li key={pIdx}>
                  <p className="font-bold text-lg leading-snug mb-3">
                    {p.title}
                  </p>
                  <p className="text-[var(--foreground)] leading-relaxed mb-4">
                    {p.context}
                  </p>
                  <div className="border-l-2 border-[var(--border)] pl-4">
                    <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
                      Grounded in
                    </p>
                    <ul className="space-y-1.5">
                      {p.groundingTitles.map((title) => {
                        const slug = titleToSlug.get(title);
                        if (!slug) {
                          return (
                            <li
                              key={title}
                              className="text-xs text-red-500 font-mono"
                            >
                              missing: {title}
                            </li>
                          );
                        }
                        const post = bySlug.get(slug);
                        return (
                          <li key={slug} className="text-sm">
                            <Link
                              href={`/posts/${slug}`}
                              className="hover:underline underline-offset-2"
                            >
                              <span
                                className={`inline-block text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded mr-2 tier-pill-${
                                  post?.tier.toLowerCase() ?? "b"
                                }`}
                              >
                                {post?.tier ?? "?"}
                              </span>
                              <span>{title}</span>
                              <span className="text-[var(--muted)] text-xs ml-1.5">
                                · {post?.source}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <footer className="mt-20 pt-8 border-t border-[var(--border)] text-sm text-[var(--muted)]">
        <p>
          Want to push back on a principle, or suggest one I&rsquo;ve missed?{" "}
          <a
            href="https://github.com/seyonv/agentic-reading-list/issues"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-[var(--foreground)]"
          >
            Open an issue
          </a>{" "}
          on GitHub.
        </p>
      </footer>
      {/* keep slugify symbol used to satisfy lints if extracted later */}
      {false && <span>{slugify("")}</span>}
    </div>
  );
}
