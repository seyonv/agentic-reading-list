export type Tier = "S" | "A" | "B";

export type Topic =
  | "harness/loops"
  | "production-deployment"
  | "foundational-concepts"
  | "adjacent-coding-or-computer-use";

export type Post = {
  slug: string;
  title: string;
  url: string;
  source: string;
  yearMonth: string;
  topic: Topic;
  tier: Tier;
  summary: string;
  rationale: string;
};

export const TIER_ORDER: Record<Tier, number> = { S: 0, A: 1, B: 2 };

export const TOPIC_LABEL: Record<Topic, string> = {
  "harness/loops": "Harness / Loops",
  "production-deployment": "Production",
  "foundational-concepts": "Foundations",
  "adjacent-coding-or-computer-use": "Coding & Computer Use",
};

export const TIER_LABEL: Record<Tier, string> = {
  S: "S — Must-read",
  A: "A — Strong",
  B: "B — Useful",
};
