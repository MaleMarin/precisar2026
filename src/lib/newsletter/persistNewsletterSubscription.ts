import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { getEncuestaInformacionFirebaseApp } from "@/lib/firebase/encuestaInformacionClient";

const DEFAULT_COLLECTION = "newsletter_suscripciones";

export type NewsletterSource = "site-footer" | "participa";

export type NewsletterSubscriptionInput = {
  email: string;
  source: NewsletterSource;
  locale?: string;
  path?: string;
};

/**
 * Guarda una alta de newsletter en Firestore (proyecto Encuesta Información).
 * Requiere `NEXT_PUBLIC_FIREBASE_ENCUESTA_*` y reglas que permitan `addDoc` en la colección.
 */
export async function persistNewsletterSubscription(
  input: NewsletterSubscriptionInput,
): Promise<void> {
  const app = getEncuestaInformacionFirebaseApp();
  if (!app) {
    throw new Error("MISSING_FIREBASE_ENCUESTA_CONFIG");
  }

  const email = input.email.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("INVALID_EMAIL");
  }

  const collectionId =
    process.env.NEXT_PUBLIC_FIREBASE_NEWSLETTER_COLLECTION?.trim() || DEFAULT_COLLECTION;

  const db = getFirestore(app);
  await addDoc(collection(db, collectionId), {
    email,
    source: input.source,
    locale: input.locale ?? null,
    path: input.path ?? null,
    site: "precisar.net",
    createdAt: serverTimestamp(),
  });
}

export function isNewsletterFirebaseReady(): boolean {
  return getEncuestaInformacionFirebaseApp() !== null;
}
