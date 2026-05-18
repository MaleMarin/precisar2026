import { NextResponse } from "next/server";
import { isEncuestaFirebaseConfigured } from "@/lib/firebase/encuestaFirebaseOptions";
import {
  persistNewsletterSubscription,
  type NewsletterSource,
} from "@/lib/newsletter/persistNewsletterSubscription";
import { NEWSLETTER } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SOURCES = new Set<NewsletterSource>(["site-footer", "participa"]);

function firestoreErrorMessage(err: unknown): string | null {
  if (err && typeof err === "object" && "code" in err) {
    const code = String((err as { code: string }).code);
    if (code === "permission-denied") {
      return "Firestore rechazó el alta (reglas). Revisa newsletter_suscripciones en Firebase → Reglas.";
    }
  }
  return null;
}

export async function POST(request: Request) {
  if (NEWSLETTER.formActionUrl) {
    return NextResponse.json(
      {
        error: "El boletín usa un proveedor externo (NEXT_PUBLIC_NEWSLETTER_FORM_ACTION).",
        code: "EXTERNAL_PROVIDER",
      },
      { status: 400 },
    );
  }

  if (!isEncuestaFirebaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Firebase no configurado en el servidor. Añade NEXT_PUBLIC_FIREBASE_ENCUESTA_* o FIREBASE_ENCUESTA_* en Vercel y redeploy.",
        code: "MISSING_FIREBASE_ENCUESTA_CONFIG",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo JSON inválido.", code: "INVALID_BODY" }, { status: 400 });
  }

  const email = typeof (body as { email?: unknown }).email === "string" ? (body as { email: string }).email : "";
  const source = (body as { source?: unknown }).source;
  const locale = typeof (body as { locale?: unknown }).locale === "string" ? (body as { locale: string }).locale : undefined;
  const path = typeof (body as { path?: unknown }).path === "string" ? (body as { path: string }).path : undefined;

  if (!SOURCES.has(source as NewsletterSource)) {
    return NextResponse.json({ error: "Origen inválido.", code: "INVALID_SOURCE" }, { status: 400 });
  }

  try {
    await persistNewsletterSubscription({
      email,
      source: source as NewsletterSource,
      locale,
      path,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "UNKNOWN";
    if (message === "MISSING_FIREBASE_ENCUESTA_CONFIG") {
      return NextResponse.json(
        {
          error: "Firebase no configurado en el servidor.",
          code: "MISSING_FIREBASE_ENCUESTA_CONFIG",
        },
        { status: 503 },
      );
    }
    if (message === "INVALID_EMAIL") {
      return NextResponse.json({ error: "Correo inválido.", code: "INVALID_EMAIL" }, { status: 400 });
    }
    const rulesHint = firestoreErrorMessage(err);
    console.error("[api/newsletter/subscribe]", err);
    return NextResponse.json(
      {
        error: rulesHint ?? "No pudimos guardar tu correo. Intenta de nuevo.",
        code: "FIRESTORE_ERROR",
      },
      { status: 500 },
    );
  }
}
