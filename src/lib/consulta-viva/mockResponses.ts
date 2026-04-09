import { ConcernType, LiveResponse, SourceType, TrustLevel } from "./types";
import { LATAM_COUNTRIES } from "./countries";

const SOURCES: SourceType[] = ["whatsapp", "social", "tv_radio", "news", "ai"];
const CONCERNS: ConcernType[] = [
  "fake_news",
  "manipulation",
  "lack_context",
  "scams",
  "privacy",
  "other",
];
const TRUSTS: TrustLevel[] = [1, 2, 3, 4, 5];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function uid(): string {
  const c = globalThis.crypto as Crypto | undefined;
  if (c?.randomUUID) return c.randomUUID();
  return `${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
}

export function createMockResponse(now = Date.now()): LiveResponse {
  const country = pick(LATAM_COUNTRIES);
  return {
    id: uid(),
    countryIso: country.iso,
    source: pick(SOURCES),
    trust: pick(TRUSTS),
    concern: pick(CONCERNS),
    createdAt: now,
  };
}

/** Ventana un poco menor a 5 min para que la agregación “reciente” siempre tenga datos al arrancar. */
const SEED_WINDOW_MS = 4.5 * 60 * 1000;

/**
 * Siembra eventos distribuidos en los últimos ~4,5 min (respecto a `now`), para que líneas y nodos
 * no queden vacíos al cabo de unos minutos por timestamps viejos.
 */
export function seedMockResponses(count = 60, now = Date.now()): LiveResponse[] {
  const start = now - SEED_WINDOW_MS;
  const end = now - 1500;
  const denom = Math.max(count - 1, 1);
  return Array.from({ length: count }).map((_, i) => {
    const t = Math.round(start + ((end - start) * i) / denom);
    return createMockResponse(t);
  });
}

const DEFAULT_STORE_MAX = 300;
const STALE_MS = 3 * 60 * 1000;
const REJUV_BURST = 12;
const REJUV_SPACING_MS = 6000;

/**
 * Si el último evento es más viejo que `staleMs`, agrega un pulso de mocks recientes (demo in-memory).
 */
export function rejuvenateIfStale(
  responses: LiveResponse[],
  now = Date.now(),
  max = DEFAULT_STORE_MAX,
): LiveResponse[] {
  if (!responses.length) return responses;
  const last = responses[responses.length - 1]!.createdAt;
  if (now - last < STALE_MS) return responses;
  const next = responses.slice();
  for (let i = 0; i < REJUV_BURST; i++) {
    next.push(createMockResponse(now - (REJUV_BURST - 1 - i) * REJUV_SPACING_MS));
  }
  return next.length > max ? next.slice(next.length - max) : next;
}
