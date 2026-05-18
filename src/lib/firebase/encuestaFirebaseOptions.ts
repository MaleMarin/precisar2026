import type { FirebaseOptions } from "firebase/app";

/** Lee config Firebase (cliente o servidor). Acepta NEXT_PUBLIC_* o FIREBASE_ENCUESTA_* en runtime. */
export function getEncuestaFirebaseOptions(): FirebaseOptions | null {
  const read = (suffix: string): string | undefined => {
    const pub = process.env[`NEXT_PUBLIC_FIREBASE_ENCUESTA_${suffix}`]?.trim();
    if (pub) return pub;
    return process.env[`FIREBASE_ENCUESTA_${suffix}`]?.trim() || undefined;
  };

  const apiKey = read("API_KEY");
  const authDomain = read("AUTH_DOMAIN");
  const projectId = read("PROJECT_ID");
  const storageBucket = read("STORAGE_BUCKET");
  const messagingSenderId = read("MESSAGING_SENDER_ID");
  const appId = read("APP_ID");

  if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId) {
    return null;
  }

  const measurementId = read("MEASUREMENT_ID");
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

export function isEncuestaFirebaseConfigured(): boolean {
  return getEncuestaFirebaseOptions() !== null;
}
