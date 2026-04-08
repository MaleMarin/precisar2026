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

export function seedMockResponses(count = 60, now = Date.now()): LiveResponse[] {
  const base = now - count * 12000;
  return Array.from({ length: count }).map((_, i) => {
    const t = base + i * 12000;
    return createMockResponse(t);
  });
}
