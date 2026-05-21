import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Post } from "./posts-types";

export * from "./posts-types";

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
        } else {
          inQuotes = false;
          i++;
        }
      } else {
        field += ch;
        i++;
      }
    } else if (ch === '"') {
      inQuotes = true;
      i++;
    } else if (ch === ",") {
      row.push(field);
      field = "";
      i++;
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
    } else if (ch === "\r") {
      i++;
    } else {
      field += ch;
      i++;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

let cachedPosts: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cachedPosts) return cachedPosts;

  const csvPath = path.join(process.cwd(), "data", "reading_list.csv");
  const text = fs.readFileSync(csvPath, "utf-8");
  const rows = parseCSV(text);
  const [header, ...dataRows] = rows;

  const idx = (name: string) => header.indexOf(name);
  const iTitle = idx("title");
  const iUrl = idx("url");
  const iSource = idx("source");
  const iYearMonth = idx("year_month");
  const iTopic = idx("topic");
  const iTier = idx("tier");
  const iSummary = idx("summary");
  const iRationale = idx("rationale");

  const slugCounts = new Map<string, number>();

  const posts: Post[] = dataRows
    .filter((r) => r.length > 1 && r[iTitle])
    .map((r) => {
      const title = r[iTitle];
      const baseSlug = slugify(title);
      const seen = slugCounts.get(baseSlug) ?? 0;
      const slug = seen > 0 ? `${baseSlug}-${seen + 1}` : baseSlug;
      slugCounts.set(baseSlug, seen + 1);
      return {
        slug,
        title,
        url: r[iUrl],
        source: r[iSource],
        yearMonth: r[iYearMonth],
        topic: r[iTopic] as Post["topic"],
        tier: r[iTier] as Post["tier"],
        summary: r[iSummary],
        rationale: r[iRationale],
      };
    });

  cachedPosts = posts;
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
