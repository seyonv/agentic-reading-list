import Link from "next/link";
import { PostsTable } from "@/components/posts-table";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const sCount = posts.filter((p) => p.tier === "S").length;
  const aCount = posts.filter((p) => p.tier === "A").length;
  const bCount = posts.filter((p) => p.tier === "B").length;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Agentic AI reading list
        </h1>
        <p className="text-[var(--muted)] max-w-2xl leading-relaxed">
          A curated, tiered reading list of {posts.length} blog posts
          (2024–2026) on building, deploying, and operating agentic AI systems.
          Covers agent harnesses, production war stories, context engineering,
          evals, MCP, memory, and computer-use agents.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <Link
            href="/start-here"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity"
          >
            Start here →
          </Link>
          <span className="text-[var(--muted)] text-xs font-mono">
            {sCount} S · {aCount} A · {bCount} B
          </span>
        </div>
      </section>

      <PostsTable posts={posts} />
    </div>
  );
}
