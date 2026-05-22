import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, TOPIC_LABEL } from "@/lib/posts";
import { ReaderView } from "./reader-view";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — Reader View — Agentic Reading List`,
    description: post.summary,
  };
}

export default async function ReadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
      <Link
        href={`/posts/${post.slug}`}
        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        ← Back to post
      </Link>

      <header className="mt-6 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`text-xs font-mono font-semibold px-2 py-0.5 rounded tier-pill-${post.tier.toLowerCase()}`}
          >
            {post.tier}
          </span>
          <span className="text-xs text-[var(--muted)] font-mono">
            {TOPIC_LABEL[post.topic]}
          </span>
          <span className="text-xs text-[var(--muted)] font-mono">
            · Reader view
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight mb-3">
          {post.title}
        </h1>
        <div className="text-sm text-[var(--muted)] mb-4 font-mono">
          {post.source} · {post.yearMonth}
        </div>
        <a
          href={post.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Open on {post.source} ↗
        </a>
      </header>

      <ReaderView url={post.url} sourceName={post.source} />
    </article>
  );
}
