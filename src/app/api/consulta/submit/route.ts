import { NextResponse } from "next/server";
import { isEncuestaFirebaseConfigured } from "@/lib/firebase/encuestaFirebaseOptions";
import { persistConsultaSubmission } from "@/lib/consulta/persistConsultaSubmission";
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
        error: "Firebase no configurado en el servidor.",
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

  const answers = (body as { answers?: unknown }).answers;
  if (!isConsultaAnswers(answers)) {
    return NextResponse.json({ error: "Respuestas inválidas.", code: "INVALID_ANSWERS" }, { status: 400 });
  }

  try {
    await persistConsultaSubmission(answers);
    void notifyConsultaSubmission(answers).catch((err) =>
      console.error("[api/consulta/submit] notify email", err),
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/consulta/submit]", err);
    return NextResponse.json(
      { error: "No pudimos guardar tus respuestas.", code: "FIRESTORE_ERROR" },
      { status: 500 },
    );
  }
}
