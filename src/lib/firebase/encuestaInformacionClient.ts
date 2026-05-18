import { getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getEncuestaFirebaseOptions } from "@/lib/firebase/encuestaFirebaseOptions";

/** Nombre de app secundaria para no chocar si el sitio añade otro Firebase con app por defecto. */
const ENCUESTA_APP_NAME = "encuesta-informacion";

function initEncuestaApp(opts: FirebaseOptions): FirebaseApp {
  const existing = getApps().find((a) => a.name === ENCUESTA_APP_NAME);
  if (existing) return existing;
  return initializeApp(opts, ENCUESTA_APP_NAME);
}

export function getEncuestaInformacionFirebaseApp(): FirebaseApp | null {
  const existing = getApps().find((a) => a.name === ENCUESTA_APP_NAME);
  if (existing) return existing;
  const opts = getEncuestaFirebaseOptions();
  if (!opts) return null;
  return initEncuestaApp(opts);
}

/** Inicializa Firebase en el navegador leyendo config del servidor (runtime en Vercel). */
export async function getEncuestaInformacionFirebaseAppAsync(): Promise<FirebaseApp | null> {
  const sync = getEncuestaInformacionFirebaseApp();
  if (sync) return sync;
  if (typeof window === "undefined") return null;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8_000);
    const res = await fetch("/api/newsletter/firebase-config", {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      configured?: boolean;
      firebase?: FirebaseOptions;
    };
    if (!data.configured || !data.firebase?.apiKey) return null;
    return initEncuestaApp(data.firebase);
  } catch {
    return null;
  }
}
