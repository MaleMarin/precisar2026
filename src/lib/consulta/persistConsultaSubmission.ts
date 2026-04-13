import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { getEncuestaInformacionFirebaseApp } from "@/lib/firebase/encuestaInformacionClient";
import type { ConsultaAnswers } from "@/lib/consulta/types";

const DEFAULT_COLLECTION = "consulta_respuestas";

/**
 * Guarda un envío completo de la consulta ciudadana en Firestore del proyecto Encuesta Información.
 * Requiere variables `NEXT_PUBLIC_FIREBASE_ENCUESTA_*` y reglas que permitan `addDoc` en la colección.
 */
export async function persistConsultaSubmission(answers: ConsultaAnswers): Promise<void> {
  const app = getEncuestaInformacionFirebaseApp();
  if (!app) {
    throw new Error("MISSING_FIREBASE_ENCUESTA_CONFIG");
  }
  const collectionId =
    process.env.NEXT_PUBLIC_FIREBASE_CONSULTA_COLLECTION?.trim() || DEFAULT_COLLECTION;
  const db = getFirestore(app);
  await addDoc(collection(db, collectionId), {
    answers,
    source: "precisar-net-consulta-2026",
    createdAt: serverTimestamp(),
  });
}
