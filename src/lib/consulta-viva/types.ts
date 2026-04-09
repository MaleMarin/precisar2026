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
  /** Última señal del país en la sesión (acumulado). */
  lastSeenAt: number | null;
  /** Canal dominante según toda la sesión (no solo ventana reciente). */
  dominantSource: SourceType | null;
  recentCountBySource: Record<SourceType, number>;
  /** Conteo por fuente en toda la sesión (sostiene líneas y peso del nodo). */
  sessionCountBySource: Record<SourceType, number>;
  avgTrust: number | null;
  topConcern: ConcernType | null;
  trend: Trend;
  trendDelta: number;
  /** 0–1: fuerza del halo / pulso por actividad reciente (decae con el tiempo). */
  pulseIntensity: number;
  /** Última respuesta dentro de la ventana reciente (null si responsesRecent === 0). */
  lastRecentAt: number | null;
};

export type FlowEdge = {
  source: SourceType;
  fromIso: string;
  /** Grosor relativo según acumulado de sesión. */
  value: number;
  lastSeenAt: number | null;
  pulseIntensity: number;
  recentValue: number;
};

export type DominantSource = SourceType;
export type TopConcern = ConcernType;
