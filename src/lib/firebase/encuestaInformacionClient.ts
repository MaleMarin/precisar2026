import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getEncuestaFirebaseOptions } from "@/lib/firebase/encuestaFirebaseOptions";

/** Nombre de app secundaria para no chocar si el sitio añade otro Firebase con app por defecto. */
const ENCUESTA_APP_NAME = "encuesta-informacion";

export function getEncuestaInformacionFirebaseApp(): FirebaseApp | null {
  const opts = getEncuestaFirebaseOptions();
  if (!opts) return null;
  const existing = getApps().find((a) => a.name === ENCUESTA_APP_NAME);
  if (existing) return existing;
  return initializeApp(opts, ENCUESTA_APP_NAME);
}
