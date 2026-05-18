import {
  persistNewsletterSubscription,
  type NewsletterSubscriptionInput,
} from "@/lib/newsletter/persistNewsletterSubscription";
import { subscribeNewsletterViaApi } from "@/lib/newsletter/subscribeNewsletterViaApi";

const CLIENT_TIMEOUT_MS = 15_000;
const API_TIMEOUT_MS = 10_000;

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
 * Alta de newsletter: primero Firestore en el navegador (como el bot);
 * respaldo corto por API si el cliente no puede conectar.
 */
export async function subscribeNewsletter(input: NewsletterSubscriptionInput): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      await withTimeout(
        persistNewsletterSubscription(input),
        CLIENT_TIMEOUT_MS,
        "La conexión tardó demasiado. Revisa tu red e intenta de nuevo.",
      );
      return;
    } catch (clientErr) {
      if (clientErr instanceof Error && clientErr.message === "MISSING_FIREBASE_ENCUESTA_CONFIG") {
        // Sin config en el bundle: sigue al respaldo API (lee env en Vercel en runtime).
      } else if (
        clientErr instanceof Error &&
        !clientErr.message.includes("tardó demasiado")
      ) {
        throw clientErr;
      }
    }
  }

  try {
    await subscribeNewsletterViaApi(input, API_TIMEOUT_MS);
  } catch (apiErr) {
    if (apiErr instanceof Error && apiErr.message) throw apiErr;
    throw new Error("No pudimos registrar tu correo. Intenta de nuevo.");
  }
}
