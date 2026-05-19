import type { FirebaseOptions } from "firebase/app";
import { getEncuestaFirebaseOptions } from "@/lib/firebase/encuestaFirebaseOptions";

type FirestoreValue =
  | { stringValue: string }
  | { nullValue: null }
  | { timestampValue: string }
  | { booleanValue: boolean }
  | { integerValue: string }
  | { doubleValue: number }
  | { arrayValue: { values: FirestoreValue[] } }
  | { mapValue: { fields: Record<string, FirestoreValue> } };

function toFirestoreValue(value: unknown): FirestoreValue {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    if (Number.isInteger(value)) return { integerValue: String(value) };
    return { doubleValue: value };
  }
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(toFirestoreValue) } };
  }
  if (typeof value === "object") {
    const fields: Record<string, FirestoreValue> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(value) };
}

function toFirestoreFields(data: Record<string, unknown>): Record<string, FirestoreValue> {
  const fields: Record<string, FirestoreValue> = {};
  for (const [key, value] of Object.entries(data)) {
    fields[key] = toFirestoreValue(value);
  }
  return fields;
}

/**
 * Crea un documento en Firestore vía REST (fiable en Vercel; no usa el SDK colgado).
 * Requiere reglas que permitan create y API key del proyecto.
 */
export async function addFirestoreDocumentRest(
  collectionId: string,
  data: Record<string, unknown>,
  opts?: FirebaseOptions | null,
): Promise<void> {
  const config = opts ?? getEncuestaFirebaseOptions();
  if (!config?.apiKey || !config.projectId) {
    throw new Error("MISSING_FIREBASE_ENCUESTA_CONFIG");
  }

  const url = `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents/${encodeURIComponent(collectionId)}?key=${encodeURIComponent(config.apiKey)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields: toFirestoreFields(data) }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[firestore-rest]", res.status, body);
    if (res.status === 403) {
      throw new Error("Firestore rechazó el guardado (revisa reglas de seguridad).");
    }
    throw new Error("No se pudo guardar en Firestore.");
  }
}
