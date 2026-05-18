import {
  persistNewsletterSubscription,
  type NewsletterSubscriptionInput,
} from "@/lib/newsletter/persistNewsletterSubscription";
import { subscribeNewsletterViaApi } from "@/lib/newsletter/subscribeNewsletterViaApi";

const TIMEOUT_MS = 20_000;

function withTimeout<T>(promise: Promise<T>, ms: number, timeoutMessage: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(timeoutMessage)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

/**
 * Alta de newsletter: API (env en Vercel en runtime) y, si falla, Firestore en el navegador
 * (config embebida o cargada desde /api/newsletter/firebase-config).
 */
export async function subscribeNewsletter(input: NewsletterSubscriptionInput): Promise<void> {
  try {
    await subscribeNewsletterViaApi(input, TIMEOUT_MS);
    return;
  } catch (apiErr) {
    try {
      await withTimeout(
        persistNewsletterSubscription(input),
        TIMEOUT_MS,
        "La conexión tardó demasiado. Revisa tu red e intenta de nuevo.",
      );
    } catch (clientErr) {
      if (apiErr instanceof Error && apiErr.message && apiErr.message !== "SUBSCRIBE_FAILED") {
        throw apiErr;
      }
      if (clientErr instanceof Error && clientErr.message === "MISSING_FIREBASE_ENCUESTA_CONFIG") {
        throw new Error(
          "Firebase no está configurado en Vercel. Añade las 6 variables NEXT_PUBLIC_FIREBASE_ENCUESTA_* en Production y haz Redeploy.",
        );
      }
      throw clientErr;
    }
  }
}
