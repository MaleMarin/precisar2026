import { LATAM_COUNTRIES } from "./countries";
import type {
  ConcernType,
  CountrySignal,
  FlowEdge,
  LiveResponse,
  SourceType,
  Trend,
} from "./types";

export const SOURCE_LABELS: Record<SourceType, string> = {
  whatsapp: "WhatsApp / Telegram",
  social: "Redes sociales",
  tv_radio: "TV / radio",
  news: "Portales / diarios",
  ai: "IA / buscadores",
};

export const SOURCE_COLORS: Record<SourceType, string> = {
  whatsapp: "#25d366",
  social: "#6c8cff",
  tv_radio: "#ffb84d",
  news: "#7ee0d0",
  ai: "#c77dff",
};

export function sourceColorRgb(source: SourceType): [number, number, number] {
  const hex = SOURCE_COLORS[source].replace("#", "");
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
}

const SOURCE_KEYS: SourceType[] = ["whatsapp", "social", "tv_radio", "news", "ai"];

export const CONCERN_LABELS: Record<ConcernType, string> = {
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

function emptySourceCounts(): Record<SourceType, number> {
  return SOURCE_KEYS.reduce(
    (acc, s) => {
      acc[s] = 0;
      return acc;
    },
    {} as Record<SourceType, number>,
  );
}

export type SessionCountryAgg = {
  iso: string;
  name: string;
  responsesTotal: number;
  dominantSource: SourceType | null;
  avgTrust: number | null;
  topConcern: ConcernType | null;
  sessionCountBySource: Record<SourceType, number>;
  lastSeenAt: number | null;
};

/**
 * Acumulado de sesión: totales, dominante, confianza y preocupación sobre **todas** las respuestas.
 */
export function aggregateSessionByCountry(responses: LiveResponse[]): SessionCountryAgg[] {
  const byIso = new Map<string, LiveResponse[]>();
  for (const r of responses) {
    const arr = byIso.get(r.countryIso);
    if (arr) arr.push(r);
    else byIso.set(r.countryIso, [r]);
  }

  return LATAM_COUNTRIES.map((c) => {
    const rows = byIso.get(c.iso) ?? [];
    const sessionCountBySource = emptySourceCounts();
    for (const r of rows) sessionCountBySource[r.source]++;

    const dominantSource: SourceType | null =
      rows.length === 0 ? null : topKey(sessionCountBySource);

    const concernCounts = countBy(rows.map((r) => r.concern));
    const topConcern: ConcernType | null =
      rows.length === 0 ? null : topKey<ConcernType>(concernCounts);

    const avgTrust =
      rows.length > 0 ? rows.reduce((a, r) => a + r.trust, 0) / rows.length : null;

    let lastSeenAt: number | null = null;
    for (const r of rows) {
      if (lastSeenAt == null || r.createdAt > lastSeenAt) lastSeenAt = r.createdAt;
    }

    return {
      iso: c.iso,
      name: c.country,
      responsesTotal: rows.length,
      dominantSource,
      avgTrust,
      topConcern,
      sessionCountBySource,
      lastSeenAt,
    };
  });
}

export type RecentCountryAgg = {
  iso: string;
  responsesRecent: number;
  recentCountBySource: Record<SourceType, number>;
  trend: Trend;
  trendDelta: number;
  pulseIntensity: number;
  lastRecentAt: number | null;
};

/**
 * Ventana móvil: recencia, tendencia y pulso. No altera dominante ni promedios de sesión.
 */
export function aggregateRecentByCountry(
  responses: LiveResponse[],
  now: number,
  recentWindowMs = 5 * 60 * 1000,
  previousWindowMs = 5 * 60 * 1000,
): RecentCountryAgg[] {
  const byIso = new Map<string, LiveResponse[]>();
  for (const r of responses) {
    const arr = byIso.get(r.countryIso);
    if (arr) arr.push(r);
    else byIso.set(r.countryIso, [r]);
  }

  return LATAM_COUNTRIES.map((c) => {
    const rows = byIso.get(c.iso) ?? [];
    const recentCut = now - recentWindowMs;
    const prevFrom = now - (recentWindowMs + previousWindowMs);
    const prevTo = recentCut;

    const recentRows = rows.filter((r) => r.createdAt >= recentCut);
    const prevRows = rows.filter((r) => r.createdAt >= prevFrom && r.createdAt < prevTo);

    const recentCountBySource = emptySourceCounts();
    for (const r of recentRows) recentCountBySource[r.source]++;

    const recentN = recentRows.length;
    const prevN = prevRows.length;
    const delta = recentN - prevN;

    let trend: Trend = "stable";
    if (recentN >= 3) {
      const ratio = prevN === 0 ? (recentN >= 4 ? 2 : 1) : recentN / prevN;
      if (delta >= 2 && ratio >= 1.25) trend = "up";
      else if (delta <= -2 && ratio <= 0.8) trend = "down";
    }

    let lastRecentAt: number | null = null;
    for (const r of recentRows) {
      if (lastRecentAt == null || r.createdAt > lastRecentAt) lastRecentAt = r.createdAt;
    }

    const pulseIntensity =
      recentN === 0 || lastRecentAt == null
        ? 0
        : clamp(1 - (now - lastRecentAt) / recentWindowMs, 0, 1);

    return {
      iso: c.iso,
      responsesRecent: recentN,
      recentCountBySource,
      trend,
      trendDelta: delta,
      pulseIntensity,
      lastRecentAt,
    };
  });
}

export function mergeSessionAndRecent(
  session: SessionCountryAgg[],
  recent: RecentCountryAgg[],
): CountrySignal[] {
  const rMap = new Map(recent.map((r) => [r.iso, r]));
  return session.map((s) => {
    const r = rMap.get(s.iso)!;
    return {
      iso: s.iso,
      name: s.name,
      responsesTotal: s.responsesTotal,
      responsesRecent: r.responsesRecent,
      lastSeenAt: s.lastSeenAt,
      dominantSource: s.dominantSource,
      recentCountBySource: r.recentCountBySource,
      sessionCountBySource: s.sessionCountBySource,
      avgTrust: s.avgTrust,
      topConcern: s.topConcern,
      trend: r.trend,
      trendDelta: r.trendDelta,
      pulseIntensity: r.pulseIntensity,
      lastRecentAt: r.lastRecentAt,
    };
  });
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
  const session = aggregateSessionByCountry(responses);
  const recent = aggregateRecentByCountry(responses, now, recentWindowMs, previousWindowMs);
  return mergeSessionAndRecent(session, recent);
}

export function buildSourceFlows(signals: CountrySignal[], maxPerSource = 4): FlowEdge[] {
  const edges: FlowEdge[] = [];

  for (const s of SOURCE_KEYS) {
    const ranked = [...signals]
      .map((sig) => ({
        iso: sig.iso,
        value: sig.sessionCountBySource[s],
        lastSeenAt: sig.lastSeenAt,
        pulseIntensity: sig.pulseIntensity,
        recentValue: sig.recentCountBySource[s],
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
        pulseIntensity: item.pulseIntensity,
        recentValue: item.recentValue,
      });
    }
  }

  return edges;
}

/**
 * Pocas líneas de apoyo: solo países con actividad reciente en esa fuente, máximo `maxTotal` trazos.
 */
export function buildSparseFlows(signals: CountrySignal[], maxTotal = 3): FlowEdge[] {
  const edges: FlowEdge[] = [];
  for (const s of SOURCE_KEYS) {
    const best = [...signals]
      .filter((sig) => sig.recentCountBySource[s] > 0)
      .sort((a, b) => b.recentCountBySource[s] - a.recentCountBySource[s])[0];
    if (!best) continue;
    edges.push({
      source: s,
      fromIso: best.iso,
      value: best.sessionCountBySource[s],
      lastSeenAt: best.lastSeenAt,
      pulseIntensity: best.pulseIntensity,
      recentValue: best.recentCountBySource[s],
    });
  }
  return edges.sort((a, b) => b.recentValue - a.recentValue).slice(0, maxTotal);
}

/**
 * Para la capa "Cruce": un par de países para enlazar en el mapa (misma lectura dominante u otro país activo).
 */
export function crossPairForSelection(
  selectedIso: string,
  signals: CountrySignal[],
): { fromIso: string; toIso: string } | null {
  const sel = signals.find((s) => s.iso === selectedIso);
  if (!sel) return null;
  const others = signals.filter((s) => s.iso !== selectedIso && s.responsesTotal > 0);
  if (!others.length) return null;

  if (sel.dominantSource) {
    const same = [...others]
      .filter((s) => s.dominantSource === sel.dominantSource)
      .sort(
        (a, b) =>
          b.responsesRecent - a.responsesRecent || b.responsesTotal - a.responsesTotal,
      );
    if (same[0]) return { fromIso: selectedIso, toIso: same[0].iso };
  }

  const top = [...others].sort(
    (a, b) => b.responsesRecent - a.responsesRecent || b.responsesTotal - a.responsesTotal,
  )[0];
  return top ? { fromIso: selectedIso, toIso: top.iso } : null;
}

export function buildLiveInsights(signals: CountrySignal[], now: number): string[] {
  const activeRecent = signals.filter((s) => s.responsesRecent > 0);
  const withSession = signals.filter((s) => s.responsesTotal > 0);

  if (!activeRecent.length) {
    if (withSession.length) {
      const top = [...withSession].sort((a, b) => b.responsesTotal - a.responsesTotal)[0];
      return [
        `El mapa sigue mostrando lo que ya sumamos en la región.`,
        top ? `Con más respuestas hasta ahora: ${top.name}.` : "",
      ].filter(Boolean);
    }
    return [`Cuando entren respuestas, aquí verás en pocas frases qué está pasando en conjunto.`];
  }

  const dominanceBySource = SOURCE_KEYS.reduce(
    (acc, k) => {
      acc[k] = 0;
      return acc;
    },
    {} as Record<SourceType, number>,
  );

  for (const s of activeRecent) {
    if (s.dominantSource) dominanceBySource[s.dominantSource]++;
  }

  const topSource = topKey(dominanceBySource);
  const hotCountry = [...activeRecent].sort((a, b) => b.responsesRecent - a.responsesRecent)[0];

  const lines: string[] = [];

  if (topSource) {
    lines.push(`En varios países, lo que más se repite es informarse por: ${SOURCE_LABELS[topSource]}.`);
  }

  if (hotCountry) {
    lines.push(`Donde más hubo actividad reciente: ${hotCountry.name}.`);
  }

  const last = Math.max(...activeRecent.map((s) => s.lastRecentAt ?? 0));
  const sec = clamp(Math.round((now - last) / 1000), 0, 9999);
  lines.push(`La última respuesta llegó hace ${sec} s.`);

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
  const out = emptySourceCounts();
  for (const s of signals) {
    for (const k of SOURCE_KEYS) out[k] += s.recentCountBySource[k];
  }
  return out;
}
