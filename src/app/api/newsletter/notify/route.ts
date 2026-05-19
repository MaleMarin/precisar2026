import { NextResponse } from "next/server";
import { notifyNewsletterSubscription } from "@/lib/email/notifications";
import type { NewsletterSource } from "@/lib/newsletter/persistNewsletterSubscription";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SOURCES = new Set<NewsletterSource>(["site-footer", "participa"]);

/** Solo envía el correo de aviso (el alta ya está en Firestore). */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const email = typeof (body as { email?: unknown }).email === "string" ? (body as { email: string }).email : "";
  const source = (body as { source?: unknown }).source;
  const locale = typeof (body as { locale?: unknown }).locale === "string" ? (body as { locale: string }).locale : undefined;
  const path = typeof (body as { path?: unknown }).path === "string" ? (body as { path: string }).path : undefined;

  if (!email || !SOURCES.has(source as NewsletterSource)) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  await notifyNewsletterSubscription({
    email: email.trim().toLowerCase(),
    source: source as NewsletterSource,
    locale,
    path,
  });

  return NextResponse.json({ ok: true });
}
