import { isEncuestaFirebaseConfigured } from "@/lib/firebase/encuestaFirebaseOptions";
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
 * Alta de newsletter: primero Firestore en el navegador (como el bot);
 * si no hay config en el cliente, usa la API del servidor.
 */
export async function subscribeNewsletter(input: NewsletterSubscriptionInput): Promise<void> {
  const useBrowser =
    typeof window !== "undefined" && isEncuestaFirebaseConfigured();

  if (useBrowser) {
    await withTimeout(
      persistNewsletterSubscription(input),
      TIMEOUT_MS,
      "La conexión tardó demasiado. Revisa tu red e intenta de nuevo.",
    );
    return;
  }

  await subscribeNewsletterViaApi(input, TIMEOUT_MS);
}
