import { LATAM_COUNTRIES } from "./countries";
import { SOURCE_LABELS } from "./sourceColors";
import type {
  ConcernType,
  CountrySignal,
  FlowEdge,
  LiveResponse,
  SourceType,
  Trend,
} from "./types";

const SOURCE_KEYS: SourceType[] = ["whatsapp", "social", "tv_radio", "news", "ai"];

const CONCERN_LABELS: Record<ConcernType, string> = {
  fake_news: "Desinformación viral",
  manipulation: "Manipulación / sesgo",
  lack_context: "Falta de contexto",
  scams: "Estafas y engaños",
  privacy: "Privacidad y datos",
  other: "Otro",
};

const TRUST_LABELS: Record<number, string> = {
  1: "Muy baja",
  2: "Baja",
  3: "Intermedia",
  4: "Alta",
  5: "Muy alta",
};

export function trustLabel(level: number): string {
  const n = Math.round(level);
  return TRUST_LABELS[n] ?? "—";
}

export function concernLabel(c: ConcernType): string {
  return CONCERN_LABELS[c];
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function topKey<T extends string>(obj: Record<T, number>): T | null {
  const entries = Object.entries(obj) as Array<[T, number]>;
  if (!entries.length) return null;
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0]?.[0] ?? null;
}

function countBy<T extends string>(items: T[]): Record<T, number> {
  return items.reduce(
    (acc, item) => {
      acc[item] = (acc[item] ?? 0) + 1;
      return acc;
    },
    {} as Record<T, number>,
  );
}

export type AggregationOptions = {
  recentWindowMs?: number;
  previousWindowMs?: number;
};

export function aggregateByCountry(
  responses: LiveResponse[],
  now: number,
  opts: AggregationOptions = {},
): CountrySignal[] {
  const recentWindowMs = opts.recentWindowMs ?? 5 * 60 * 1000;
  const previousWindowMs = opts.previousWindowMs ?? 5 * 60 * 1000;

  const byIso = new Map<string, LiveResponse[]>();
  for (const r of responses) {
    const arr = byIso.get(r.countryIso);
    if (arr) arr.push(r);
    else byIso.set(r.countryIso, [r]);
  }

  return LATAM_COUNTRIES.map((c) => {
    const rows = byIso.get(c.iso) ?? [];
    const lastSeenAt = rows.length ? rows[rows.length - 1]!.createdAt : null;

    const recentCut = now - recentWindowMs;
    const prevFrom = now - (recentWindowMs + previousWindowMs);
    const prevTo = recentCut;

    const recentRows = rows.filter((r) => r.createdAt >= recentCut);
    const prevRows = rows.filter((r) => r.createdAt >= prevFrom && r.createdAt < prevTo);

    const recentCountBySource = SOURCE_KEYS.reduce(
      (acc, s) => {
        acc[s] = 0;
        return acc;
      },
      {} as Record<SourceType, number>,
    );

    for (const r of recentRows) recentCountBySource[r.source]++;

    const concernCounts = countBy(rows.map((r) => r.concern));
    const topConcern = topKey<ConcernType>(concernCounts);

    const avgTrust =
      rows.length > 0 ? rows.reduce((a, r) => a + r.trust, 0) / rows.length : null;

    const recentN = recentRows.length;
    const prevN = prevRows.length;
    const delta = recentN - prevN;

    const dominantSource: SourceType | null =
      recentN === 0 ? null : topKey(recentCountBySource);

    let trend: Trend = "stable";
    if (recentN >= 3) {
      const ratio = prevN === 0 ? (recentN >= 4 ? 2 : 1) : recentN / prevN;
      if (delta >= 2 && ratio >= 1.25) trend = "up";
      else if (delta <= -2 && ratio <= 0.8) trend = "down";
    }

    return {
      iso: c.iso,
      name: c.country,
      responsesTotal: rows.length,
      responsesRecent: recentN,
      lastSeenAt,
      dominantSource,
      recentCountBySource,
      avgTrust,
      topConcern,
      trend,
      trendDelta: delta,
    };
  });
}

export function buildSourceFlows(signals: CountrySignal[], maxPerSource = 4): FlowEdge[] {
  const edges: FlowEdge[] = [];

  for (const s of SOURCE_KEYS) {
    const ranked = [...signals]
      .map((sig) => ({
        iso: sig.iso,
        value: sig.recentCountBySource[s],
        lastSeenAt: sig.lastSeenAt,
      }))
      .filter((x) => x.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, maxPerSource);

    for (const item of ranked) {
      edges.push({
        source: s,
        fromIso: item.iso,
        value: item.value,
        lastSeenAt: item.lastSeenAt,
      });
    }
  }

  return edges;
}

export function buildLiveInsights(signals: CountrySignal[], now: number): string[] {
  const active = signals.filter((s) => s.responsesRecent > 0);

  if (!active.length) {
    return ["Aún no hay señales recientes suficientes para lectura regional."];
  }

  const dominanceBySource = SOURCE_KEYS.reduce(
    (acc, k) => {
      acc[k] = 0;
      return acc;
    },
    {} as Record<SourceType, number>,
  );

  for (const s of active) {
    if (s.dominantSource) dominanceBySource[s.dominantSource]++;
  }

  const topSource = topKey(dominanceBySource);
  const topSourceN = topSource ? dominanceBySource[topSource] : 0;

  const trendingUp = active.filter((s) => s.trend === "up");
  const hotCountry = [...active].sort((a, b) => b.responsesRecent - a.responsesRecent)[0];

  const minutes = 5;
  const lines: string[] = [];

  if (topSource) {
    lines.push(
      `Dominio reciente: ${SOURCE_LABELS[topSource]} en ${topSourceN} países (últimos ${minutes} min).`,
    );
  }

  if (hotCountry) {
    lines.push(
      `Mayor intensidad reciente: ${hotCountry.name} (${hotCountry.responsesRecent} señales en ${minutes} min).`,
    );
  }

  if (trendingUp.length >= 2) {
    const names = trendingUp.slice(0, 3).map((x) => x.name).join(", ");
    lines.push(`Tendencias al alza: ${names}${trendingUp.length > 3 ? "…" : ""}.`);
  } else {
    lines.push("Tendencias: estable (sin clusters claros al alza).");
  }

  const last = Math.max(...active.map((s) => s.lastSeenAt ?? 0));
  const sec = clamp(Math.round((now - last) / 1000), 0, 9999);
  lines.push(`Última señal regional: hace ${sec}s.`);

  return lines;
}

export function timeAgo(ms: number, now: number) {
  const s = Math.max(0, Math.floor((now - ms) / 1000));
  if (s < 60) return `hace ${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `hace ${m}m`;
  const h = Math.floor(m / 60);
  return `hace ${h}h`;
}

export function sumRecentBySource(signals: CountrySignal[]): Record<SourceType, number> {
  const out = SOURCE_KEYS.reduce(
    (acc, k) => {
      acc[k] = 0;
      return acc;
    },
    {} as Record<SourceType, number>,
  );
  for (const s of signals) {
    for (const k of SOURCE_KEYS) out[k] += s.recentCountBySource[k];
  }
  return out;
}
