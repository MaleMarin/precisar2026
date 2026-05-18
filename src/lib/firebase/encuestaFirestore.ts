import { getFirestore, initializeFirestore, type Firestore } from "firebase/firestore";
import { getEncuestaInformacionFirebaseApp } from "@/lib/firebase/encuestaInformacionClient";

let cachedDb: Firestore | null = null;

/**
 * Firestore del proyecto Encuesta Información.
 * En servidor (Vercel) usa long polling para evitar cuelgues en addDoc.
 */
export function getEncuestaFirestore(): Firestore | null {
  const app = getEncuestaInformacionFirebaseApp();
  if (!app) return null;
  if (cachedDb) return cachedDb;

  if (typeof window === "undefined") {
    cachedDb = initializeFirestore(app, { experimentalForceLongPolling: true });
  } else {
    cachedDb = getFirestore(app);
  }
  return cachedDb;
}
