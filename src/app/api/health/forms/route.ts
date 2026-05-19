import { NextResponse } from "next/server";
import { isEncuestaFirebaseConfigured } from "@/lib/firebase/encuestaFirebaseOptions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Diagnóstico rápido: qué formularios pueden guardar / avisar en este entorno. */
export async function GET() {
  const firebase = isEncuestaFirebaseConfigured();
  const resend = Boolean(
    process.env.RESEND_API_KEY?.trim() && process.env.FOOTER_CONTACT_FROM?.trim(),
  );
  const notifyTo =
    process.env.PRECISAR_NOTIFY_TO?.trim() ||
    process.env.FOOTER_CONTACT_TO?.trim() ||
    "male@precisar.net";

  return NextResponse.json({
    firebase,
    resend,
    notifyTo: resend ? notifyTo : null,
    newsletter: firebase,
    consulta: firebase,
    contactEmail: resend,
    emailAlerts: resend,
    hint: !firebase
      ? "Faltan NEXT_PUBLIC_FIREBASE_ENCUESTA_* (o FIREBASE_ENCUESTA_*) en Vercel + redeploy."
      : !resend
        ? "Faltan RESEND_API_KEY y FOOTER_CONTACT_FROM para avisos por correo."
        : "OK en servidor. Prueba suscribirte y revisa Firestore + bandeja.",
  });
}
