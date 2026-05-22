import "server-only";
import fs from "node:fs";
import path from "node:path";

type SummaryEntry = {
  slug: string;
  rich_summary?: string | null;
  error?: string | null;
  word_count?: number;
};

let cache: Map<string, string> | null = null;

function loadSummaries(): Map<string, string> {
  if (cache !== null) return cache;
  const map = new Map<string, string>();
  const p = path.join(process.cwd(), "data", "summaries.json");
  if (fs.existsSync(p)) {
    try {
      const arr: SummaryEntry[] = JSON.parse(fs.readFileSync(p, "utf-8"));
      for (const item of arr) {
        if (item.slug && item.rich_summary) {
          map.set(item.slug, item.rich_summary);
        }
      }
    } catch {
      // ignore — empty map
    }
  }
  cache = map;
  return map;
}

export function getRichSummary(slug: string): string | null {
  return loadSummaries().get(slug) ?? null;
}

export function richSummaryCount(): number {
  return loadSummaries().size;
}
