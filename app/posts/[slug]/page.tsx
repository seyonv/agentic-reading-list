import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { marked } from "marked";
import {
  getAllPosts,
  getPostBySlug,
  TIER_LABEL,
  TOPIC_LABEL,
} from "@/lib/posts";
import { getRichSummary } from "@/lib/summaries";
import { ArticleScreenshot } from "@/components/article-screenshot";

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
    title: `${post.title} — Agentic Reading List`,
    description: post.summary,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const richSummary = getRichSummary(post.slug);
  const richSummaryHtml = richSummary
    ? marked.parse(richSummary, { async: false })
    : null;

  return (
    <article className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
      <Link
        href="/"
        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        ← All posts
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2 mb-5">
        <span
          className={`text-xs font-mono font-semibold px-2 py-0.5 rounded tier-pill-${post.tier.toLowerCase()}`}
        >
          {TIER_LABEL[post.tier]}
        </span>
        <span className="text-xs text-[var(--muted)] font-mono">
          {TOPIC_LABEL[post.topic]}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight mb-4">
        {post.title}
      </h1>

      <div className="text-sm text-[var(--muted)] mb-6 font-mono">
        {post.source} · {post.yearMonth}
      </div>

      <ArticleScreenshot
        url={post.url}
        title={post.title}
        source={post.source}
      />

      <div className="flex flex-wrap items-center gap-3 mb-10">
        <a
          href={post.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity text-sm font-medium"
        >
          Read original ↗
        </a>
        <Link
          href={`/posts/${post.slug}/read`}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-[var(--border)] hover:bg-[var(--card)] transition-colors text-sm font-medium"
        >
          Read in-app →
        </Link>
      </div>

      {richSummaryHtml ? (
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-3">
            In-depth summary
          </h2>
          <div
            className="reader-html"
            dangerouslySetInnerHTML={{ __html: richSummaryHtml as string }}
          />
        </section>
      ) : (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
            Summary
          </h2>
          <p className="text-base leading-relaxed">{post.summary}</p>
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
          Why it&rsquo;s {post.tier}-tier
        </h2>
        <p className="text-base leading-relaxed text-[var(--muted)]">
          {post.rationale}
        </p>
      </section>

      <div className="pt-6 border-t border-[var(--border)] font-mono text-xs text-[var(--muted)] break-all">
        {post.url}
      </div>
    </article>
  );
}
