import { addFirestoreDocumentRest } from "@/lib/firebase/firestoreRest";
import type { ConsultaAnswers } from "@/lib/consulta/types";

const DEFAULT_COLLECTION = "consulta_respuestas";

/** Guarda consulta en Firestore (servidor → REST, sin cuelgues del SDK). */
export async function persistConsultaSubmissionServer(answers: ConsultaAnswers): Promise<void> {
  const collectionId =
    process.env.NEXT_PUBLIC_FIREBASE_CONSULTA_COLLECTION?.trim() ||
    process.env.FIREBASE_CONSULTA_COLLECTION?.trim() ||
    DEFAULT_COLLECTION;

  await addFirestoreDocumentRest(collectionId, {
    answers,
    source: "precisar-net-consulta-2026",
    createdAt: new Date().toISOString(),
  });
}
