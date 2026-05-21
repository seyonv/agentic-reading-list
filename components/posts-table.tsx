"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Post, Tier, Topic } from "@/lib/posts-types";
import { TIER_LABEL, TIER_ORDER, TOPIC_LABEL } from "@/lib/posts-types";

type SortKey = "tier" | "title" | "source" | "year_month" | "topic";
type SortDir = "asc" | "desc";

const ALL_TIERS: Tier[] = ["S", "A", "B"];
const ALL_TOPICS: Topic[] = [
  "foundational-concepts",
  "harness/loops",
  "production-deployment",
  "adjacent-coding-or-computer-use",
];

export function PostsTable({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<Set<Tier>>(new Set(ALL_TIERS));
  const [topicFilter, setTopicFilter] = useState<Set<Topic>>(
    new Set(ALL_TOPICS),
  );
  const [sortKey, setSortKey] = useState<SortKey>("tier");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((p) => tierFilter.has(p.tier))
      .filter((p) => topicFilter.has(p.topic))
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.source.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.rationale.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const dir = sortDir === "asc" ? 1 : -1;
        let cmp = 0;
        if (sortKey === "tier") {
          cmp = TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
          if (cmp === 0) cmp = a.title.localeCompare(b.title);
        } else if (sortKey === "title") {
          cmp = a.title.localeCompare(b.title);
        } else if (sortKey === "source") {
          cmp = a.source.localeCompare(b.source);
        } else if (sortKey === "year_month") {
          cmp = a.yearMonth.localeCompare(b.yearMonth);
        } else if (sortKey === "topic") {
          cmp = a.topic.localeCompare(b.topic);
        }
        return cmp * dir;
      });
  }, [posts, query, tierFilter, topicFilter, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "year_month" ? "desc" : "asc");
    }
  }

  function toggleTier(t: Tier) {
    setTierFilter((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next.size === 0 ? new Set(ALL_TIERS) : next;
    });
  }

  function toggleTopic(t: Topic) {
    setTopicFilter((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next.size === 0 ? new Set(ALL_TOPICS) : next;
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Search title, source, summary…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-20"
        />
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[var(--muted)] mr-1">Tier:</span>
          {ALL_TIERS.map((t) => (
            <button
              key={t}
              onClick={() => toggleTier(t)}
              className={`px-2.5 py-1 rounded-full border transition-opacity ${
                tierFilter.has(t)
                  ? `tier-pill-${t.toLowerCase()}`
                  : "border-[var(--border)] text-[var(--muted)] opacity-40 hover:opacity-100"
              }`}
            >
              {TIER_LABEL[t]}
            </button>
          ))}
          <span className="text-[var(--muted)] ml-3 mr-1">Topic:</span>
          {ALL_TOPICS.map((t) => (
            <button
              key={t}
              onClick={() => toggleTopic(t)}
              className={`px-2.5 py-1 rounded-full border transition-opacity ${
                topicFilter.has(t)
                  ? "border-[var(--foreground)] text-[var(--foreground)]"
                  : "border-[var(--border)] text-[var(--muted)] opacity-40 hover:opacity-100"
              }`}
            >
              {TOPIC_LABEL[t]}
            </button>
          ))}
        </div>
        <div className="text-xs font-mono text-[var(--muted)]">
          {filtered.length} of {posts.length} posts
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-xs uppercase tracking-wide text-[var(--muted)]">
              <Th
                onClick={() => toggleSort("tier")}
                active={sortKey === "tier"}
                dir={sortDir}
              >
                Tier
              </Th>
              <Th
                onClick={() => toggleSort("title")}
                active={sortKey === "title"}
                dir={sortDir}
              >
                Post
              </Th>
              <Th
                onClick={() => toggleSort("source")}
                active={sortKey === "source"}
                dir={sortDir}
              >
                Source
              </Th>
              <Th
                onClick={() => toggleSort("year_month")}
                active={sortKey === "year_month"}
                dir={sortDir}
              >
                Date
              </Th>
              <Th
                onClick={() => toggleSort("topic")}
                active={sortKey === "topic"}
                dir={sortDir}
              >
                Topic
              </Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.slug}
                className="border-b border-[var(--border)] hover:bg-[var(--card)] transition-colors"
              >
                <td className="py-3 px-4 align-top">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-mono font-semibold rounded tier-pill-${p.tier.toLowerCase()}`}
                  >
                    {p.tier}
                  </span>
                </td>
                <td className="py-3 px-4 align-top max-w-xl">
                  <Link
                    href={`/posts/${p.slug}`}
                    className="font-medium hover:underline underline-offset-2"
                  >
                    {p.title}
                  </Link>
                  <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed line-clamp-2">
                    {p.summary}
                  </p>
                </td>
                <td className="py-3 px-4 align-top whitespace-nowrap text-[var(--muted)]">
                  {p.source}
                </td>
                <td className="py-3 px-4 align-top whitespace-nowrap text-[var(--muted)] font-mono text-xs">
                  {p.yearMonth}
                </td>
                <td className="py-3 px-4 align-top whitespace-nowrap text-[var(--muted)] text-xs">
                  {TOPIC_LABEL[p.topic]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--muted)] text-sm">
            No posts match those filters.
          </div>
        )}
      </div>
    </div>
  );
}

function Th({
  children,
  onClick,
  active,
  dir,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  dir: SortDir;
}) {
  return (
    <th className="py-2 px-4 font-medium">
      <button
        onClick={onClick}
        className={`inline-flex items-center gap-1 hover:text-[var(--foreground)] transition-colors ${
          active ? "text-[var(--foreground)]" : ""
        }`}
      >
        {children}
        {active && (
          <span className="text-[10px]">{dir === "asc" ? "▲" : "▼"}</span>
        )}
      </button>
    </th>
  );
}
