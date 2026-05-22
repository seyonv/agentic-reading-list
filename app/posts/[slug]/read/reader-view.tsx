"use client";

import { useEffect, useState } from "react";

type ReadResult = {
  ok: boolean;
  title?: string;
  byline?: string | null;
  excerpt?: string | null;
  content?: string;
  length?: number;
  siteName?: string | null;
  error?: string;
};

export function ReaderView({
  url,
  sourceName,
}: {
  url: string;
  sourceName: string;
}) {
  const [data, setData] = useState<ReadResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/read?url=${encodeURIComponent(url)}`)
      .then((r) => r.json())
      .then((d: ReadResult) => {
        if (!cancelled) {
          setData(d);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setData({ ok: false, error: String(err) });
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (loading) {
    return (
      <div className="py-10 text-center text-[var(--muted)] text-sm">
        <div className="inline-block animate-pulse">Fetching article…</div>
      </div>
    );
  }

  if (!data || !data.ok || !data.content) {
    return (
      <div className="py-10 text-center">
        <p className="text-[var(--muted)] text-sm mb-4">
          Could not load the article in reader mode
          {data?.error ? ` — ${data.error.toLowerCase()}` : ""}.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity text-sm font-medium"
        >
          Read on {sourceName} ↗
        </a>
      </div>
    );
  }

  return (
    <div className="reader-content">
      {data.byline && (
        <p className="text-sm text-[var(--muted)] mb-6 italic">{data.byline}</p>
      )}
      <div
        className="reader-html"
        // Content comes from Mozilla Readability, which sanitizes during parse.
        // We restrict the upstream URL set to our curated allowlist in the API route.
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
      <hr className="my-12 border-[var(--border)]" />
      <p className="text-xs text-[var(--muted)] leading-relaxed">
        This is a reader-mode view extracted from the original article on{" "}
        <strong>{sourceName}</strong>. Formatting, images, and interactive
        elements may be missing. Copyright remains with the original author.{" "}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-[var(--foreground)]"
        >
          Read the original
        </a>
        .
      </p>
    </div>
  );
}
