import { NextResponse } from "next/server";
import { rejuvenateIfStale, seedMockResponses } from "@/lib/consulta-viva/mockResponses";
import type { ConcernType, LiveResponse, SourceType, TrustLevel } from "@/lib/consulta-viva/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Store = {
  responses: LiveResponse[];
  createdAt: number;
};

declare global {
  var __consultaVivaStore: Store | undefined;
}

function getStore(): Store {
  if (!globalThis.__consultaVivaStore) {
    globalThis.__consultaVivaStore = {
      responses: seedMockResponses(70),
      createdAt: Date.now(),
    };
  }
  return globalThis.__consultaVivaStore;
}

function clampLen<T>(arr: T[], max: number) {
  if (arr.length <= max) return arr;
  return arr.slice(arr.length - max);
}

function isSource(x: unknown): x is SourceType {
  return x === "whatsapp" || x === "social" || x === "tv_radio" || x === "news" || x === "ai";
}

function isTrust(x: unknown): x is TrustLevel {
  return x === 1 || x === 2 || x === 3 || x === 4 || x === 5;
}

function isConcern(x: unknown): x is ConcernType {
  return (
    x === "fake_news" ||
    x === "manipulation" ||
    x === "lack_context" ||
    x === "scams" ||
    x === "privacy" ||
    x === "other"
  );
}

export async function GET(request: Request) {
  const store = getStore();
  store.responses = rejuvenateIfStale(store.responses);

  const url = new URL(request.url);
  const sinceStr = url.searchParams.get("since");
  const since = sinceStr ? Number(sinceStr) : null;

  const items = since
    ? store.responses.filter((r) => r.createdAt > since)
    : store.responses;

  return NextResponse.json(
    { ok: true, count: items.length, responses: items, serverCreatedAt: store.createdAt },
    { status: 200 },
  );
}

export async function POST(request: Request) {
  const store = getStore();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const b = body as Partial<LiveResponse>;

  if (!b.countryIso || typeof b.countryIso !== "string") {
    return NextResponse.json({ ok: false, error: "countryIso requerido" }, { status: 400 });
  }
  if (!isSource(b.source)) {
    return NextResponse.json({ ok: false, error: "source inválido" }, { status: 400 });
  }
  if (!isTrust(b.trust)) {
    return NextResponse.json({ ok: false, error: "trust inválido" }, { status: 400 });
  }
  if (!isConcern(b.concern)) {
    return NextResponse.json({ ok: false, error: "concern inválido" }, { status: 400 });
  }

  const id = typeof b.id === "string" ? b.id : `${Math.random()}-${Date.now()}`;
  const createdAt = typeof b.createdAt === "number" ? b.createdAt : Date.now();

  const response: LiveResponse = {
    id,
    countryIso: b.countryIso.toUpperCase(),
    source: b.source,
    trust: b.trust,
    concern: b.concern,
    createdAt,
  };

  store.responses.push(response);
  store.responses = clampLen(store.responses, 300);

  return NextResponse.json({ ok: true, response, count: store.responses.length }, { status: 201 });
}
