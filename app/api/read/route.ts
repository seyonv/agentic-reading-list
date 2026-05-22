import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { getAllPosts } from "@/lib/posts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Build a set of allowed URLs from the curated list — prevents using this
// route as an open proxy for arbitrary sites.
let allowedUrls: Set<string> | null = null;
function getAllowedUrls() {
  if (!allowedUrls) allowedUrls = new Set(getAllPosts().map((p) => p.url));
  return allowedUrls;
}

type ReadResult = {
  ok: boolean;
  title?: string;
  byline?: string | null;
  excerpt?: string | null;
  content?: string;
  textContent?: string | null;
  length?: number | null;
  siteName?: string | null;
  error?: string;
};

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json<ReadResult>(
      { ok: false, error: "Missing url parameter" },
      { status: 400 },
    );
  }

  if (!getAllowedUrls().has(url)) {
    return NextResponse.json<ReadResult>(
      { ok: false, error: "URL not in curated list" },
      { status: 403 },
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AgenticReadingList/1.0; +https://agentic-reading-list.vercel.app)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json<ReadResult>(
        { ok: false, error: `Fetch failed: HTTP ${res.status}` },
        {
          status: 502,
          headers: { "Cache-Control": "public, s-maxage=3600" },
        },
      );
    }

    const ct = res.headers.get("content-type") || "";
    if (
      !ct.includes("text/html") &&
      !ct.includes("application/xhtml") &&
      !ct.includes("text/plain") &&
      !ct.includes("text/markdown")
    ) {
      return NextResponse.json<ReadResult>(
        { ok: false, error: `Unsupported content-type: ${ct}` },
        { status: 415 },
      );
    }

    const html = await res.text();

    // jsdom doesn't render scripts/CSS and is intentionally limited; that's fine
    // for Readability which works on the parsed DOM.
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.content) {
      return NextResponse.json<ReadResult>(
        { ok: false, error: "Could not extract article content" },
        { status: 422 },
      );
    }

    return NextResponse.json<ReadResult>(
      {
        ok: true,
        title: article.title || undefined,
        byline: article.byline,
        excerpt: article.excerpt,
        content: article.content,
        textContent: article.textContent,
        length: article.length,
        siteName: article.siteName,
      },
      {
        headers: {
          // Cache aggressively at the edge — articles don't change often.
          "Cache-Control":
            "public, s-maxage=604800, stale-while-revalidate=86400",
        },
      },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json<ReadResult>(
      { ok: false, error: `Extract failed: ${msg}` },
      { status: 500 },
    );
  }
}
