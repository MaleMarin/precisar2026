import { NextResponse } from "next/server";
import { isEncuestaFirebaseConfigured } from "@/lib/firebase/encuestaFirebaseOptions";
import { persistConsultaSubmissionServer } from "@/lib/consulta/persistConsultaSubmissionServer";
import type { ConsultaAnswers } from "@/lib/consulta/types";
import { notifyConsultaSubmission } from "@/lib/email/notifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

function isConsultaAnswers(x: unknown): x is ConsultaAnswers {
  return typeof x === "object" && x !== null;
}

export async function POST(request: Request) {
  if (!isEncuestaFirebaseConfigured()) {
    return NextResponse.json(
      {
        error: "Firebase no configurado en Vercel. Revisa NEXT_PUBLIC_FIREBASE_ENCUESTA_* y redeploy.",
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

  const answers = (body as { answers?: unknown }).answers;
  if (!isConsultaAnswers(answers)) {
    return NextResponse.json({ error: "Respuestas inválidas.", code: "INVALID_ANSWERS" }, { status: 400 });
  }

  try {
    await persistConsultaSubmissionServer(answers);
  } catch (err) {
    console.error("[api/consulta/submit]", err);
    const msg = err instanceof Error ? err.message : "Error al guardar.";
    return NextResponse.json({ error: msg, code: "FIRESTORE_ERROR" }, { status: 500 });
  }

  void notifyConsultaSubmission(answers).catch((err) =>
    console.error("[api/consulta/submit] notify", err),
  );

  return NextResponse.json({ ok: true });
}
