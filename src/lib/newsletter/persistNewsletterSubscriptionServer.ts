import { addFirestoreDocumentRest } from "@/lib/firebase/firestoreRest";
import type { NewsletterSource } from "@/lib/newsletter/persistNewsletterSubscription";

const DEFAULT_COLLECTION = "newsletter_suscripciones";

export type NewsletterSubscriptionInput = {
  email: string;
  source: NewsletterSource;
  locale?: string;
  path?: string;
};

/** Guarda newsletter en Firestore (servidor → REST). */
export async function persistNewsletterSubscriptionServer(
  input: NewsletterSubscriptionInput,
): Promise<void> {
  const email = input.email.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("INVALID_EMAIL");
  }

  const collectionId =
    process.env.NEXT_PUBLIC_FIREBASE_NEWSLETTER_COLLECTION?.trim() ||
    process.env.FIREBASE_NEWSLETTER_COLLECTION?.trim() ||
    DEFAULT_COLLECTION;

  await addFirestoreDocumentRest(collectionId, {
    email,
    source: input.source,
    locale: input.locale ?? null,
    path: input.path ?? null,
    site: "precisar.net",
    createdAt: new Date().toISOString(),
  });
}
