import type { NewsletterSubscriptionInput } from "@/lib/newsletter/persistNewsletterSubscription";

type SubscribeResponse = { ok?: boolean; error?: string; code?: string };

export async function subscribeNewsletterViaApi(
  input: NewsletterSubscriptionInput,
): Promise<void> {
  const res = await fetch("/api/newsletter/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  let data: SubscribeResponse = {};
  try {
    data = (await res.json()) as SubscribeResponse;
  } catch {
    /* respuesta no JSON */
  }

  if (!res.ok) {
    const err = new Error(data.error ?? "SUBSCRIBE_FAILED");
    (err as Error & { code?: string }).code = data.code;
    throw err;
  }
}

export async function fetchNewsletterStorageReady(): Promise<boolean> {
  try {
    const res = await fetch("/api/newsletter/status", { cache: "no-store" });
    if (!res.ok) return false;
    const data = (await res.json()) as { ready?: boolean };
    return Boolean(data.ready);
  } catch {
    return false;
  }
}
