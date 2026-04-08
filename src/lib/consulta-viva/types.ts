export type SourceType = "whatsapp" | "social" | "tv_radio" | "news" | "ai";

export type TrustLevel = 1 | 2 | 3 | 4 | 5;

export type ConcernType =
  | "fake_news"
  | "manipulation"
  | "lack_context"
  | "scams"
  | "privacy"
  | "other";

export type Trend = "up" | "stable" | "down";

export type LiveResponse = {
  id: string;
  countryIso: string;
  source: SourceType;
  trust: TrustLevel;
  concern: ConcernType;
  createdAt: number;
};

export type CountrySignal = {
  iso: string;
  name: string;
  responsesTotal: number;
  responsesRecent: number;
  lastSeenAt: number | null;
  dominantSource: SourceType | null;
  recentCountBySource: Record<SourceType, number>;
  avgTrust: number | null;
  topConcern: ConcernType | null;
  trend: Trend;
  trendDelta: number;
};

export type FlowEdge = {
  source: SourceType;
  fromIso: string;
  value: number;
  lastSeenAt: number | null;
};

/** Alias usado en componentes existentes */
export type DominantSource = SourceType;
export type TopConcern = ConcernType;
