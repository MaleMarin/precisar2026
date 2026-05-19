import type { NewsletterSubscriptionInput } from "@/lib/newsletter/persistNewsletterSubscription";
import { subscribeNewsletterViaApi } from "@/lib/newsletter/subscribeNewsletterViaApi";

const API_TIMEOUT_MS = 20_000;

/** Alta de newsletter siempre vía API del servidor (Firestore REST + aviso Resend). */
export async function subscribeNewsletter(input: NewsletterSubscriptionInput): Promise<void> {
  await subscribeNewsletterViaApi(input, API_TIMEOUT_MS);
}
