import { getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";

/** Nombre de app secundaria para no chocar si el sitio añade otro Firebase con app por defecto. */
const ENCUESTA_APP_NAME = "encuesta-informacion";

function readEncuestaFirebaseOptions(): FirebaseOptions | null {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_ENCUESTA_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_ENCUESTA_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_ENCUESTA_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_ENCUESTA_STORAGE_BUCKET;
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_ENCUESTA_MESSAGING_SENDER_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_ENCUESTA_APP_ID;
  if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId) {
    return null;
  }
  const measurementId = process.env.NEXT_PUBLIC_FIREBASE_ENCUESTA_MEASUREMENT_ID;
  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    ...(measurementId ? { measurementId } : {}),
  };
}

export function getEncuestaInformacionFirebaseApp(): FirebaseApp | null {
  const opts = readEncuestaFirebaseOptions();
  if (!opts) return null;
  const existing = getApps().find((a) => a.name === ENCUESTA_APP_NAME);
  if (existing) return existing;
  return initializeApp(opts, ENCUESTA_APP_NAME);
}
