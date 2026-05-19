import { NextResponse } from "next/server";
import { isEncuestaFirebaseConfigured } from "@/lib/firebase/encuestaFirebaseOptions";
import { notifyNewsletterSubscription } from "@/lib/email/notifications";
import {
  persistNewsletterSubscriptionServer,
} from "@/lib/newsletter/persistNewsletterSubscriptionServer";
import type { NewsletterSource } from "@/lib/newsletter/persistNewsletterSubscription";
import { NEWSLETTER } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const SOURCES = new Set<NewsletterSource>(["site-footer", "participa"]);

export async function POST(request: Request) {
  if (NEWSLETTER.formActionUrl) {
    return NextResponse.json(
      { error: "Boletín configurado con proveedor externo.", code: "EXTERNAL_PROVIDER" },
      { status: 400 },
    );
  }

  if (!isEncuestaFirebaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Firebase no configurado. Añade NEXT_PUBLIC_FIREBASE_ENCUESTA_* en Vercel (Production) y redeploy.",
        code: "MISSING_FIREBASE_ENCUESTA_CONFIG",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido.", code: "INVALID_BODY" }, { status: 400 });
  }

  const email = typeof (body as { email?: unknown }).email === "string" ? (body as { email: string }).email : "";
  const source = (body as { source?: unknown }).source;
  const locale = typeof (body as { locale?: unknown }).locale === "string" ? (body as { locale: string }).locale : undefined;
  const path = typeof (body as { path?: unknown }).path === "string" ? (body as { path: string }).path : undefined;

  if (!SOURCES.has(source as NewsletterSource)) {
    return NextResponse.json({ error: "Origen inválido.", code: "INVALID_SOURCE" }, { status: 400 });
  }

  try {
    await persistNewsletterSubscriptionServer({
      email,
      source: source as NewsletterSource,
      locale,
      path,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "UNKNOWN";
    if (message === "INVALID_EMAIL") {
      return NextResponse.json({ error: "Correo inválido.", code: "INVALID_EMAIL" }, { status: 400 });
    }
    console.error("[api/newsletter/subscribe]", err);
    return NextResponse.json(
      { error: message || "No pudimos guardar tu correo.", code: "FIRESTORE_ERROR" },
      { status: 500 },
    );
  }

  void notifyNewsletterSubscription({
    email: email.trim().toLowerCase(),
    source: source as NewsletterSource,
    locale,
    path,
  }).catch((err) => console.error("[api/newsletter/subscribe] notify", err));

  return NextResponse.json({ ok: true });
}
