import type { ConsultaAnswers } from "@/lib/consulta/types";

function linesForMulti(label: string, values?: string[]): string {
  if (!values?.length) return `${label}: (sin respuesta)`;
  return `${label}:\n  - ${values.join("\n  - ")}`;
}

/** Texto plano para el correo de aviso de una consulta completada. */
export function formatConsultaForEmail(answers: ConsultaAnswers): string {
  const d = answers.p12;
  return [
    "Nueva respuesta — Consulta ciudadana Precisar (precisar.net/consulta)",
    "",
    linesForMulti("P1 · Fuentes de información", answers.p1),
    linesForMulti("P2 · Temas de interés", answers.p2),
    linesForMulti("P3 · Preocupaciones", answers.p3),
    linesForMulti("P4 · Confianza en medios", answers.p4),
    linesForMulti("P5 · Uso de redes", answers.p5),
    `P6 · Escala: ${answers.p6 ?? "(sin respuesta)"}`,
    linesForMulti("P7", answers.p7),
    linesForMulti("P8", answers.p8),
    linesForMulti("P9", answers.p9),
    linesForMulti("P10", answers.p10),
    "",
    "P11 · Respuesta abierta:",
    answers.p11?.trim() || "(vacío)",
    "",
    "Datos demográficos:",
    `  País: ${d?.pais ?? "—"}`,
    `  Región: ${d?.region ?? "—"}`,
    `  Entorno: ${d?.entorno ?? "—"}`,
    `  Edad: ${d?.edad ?? "—"}`,
    `  Género: ${d?.genero ?? "—"}`,
    `  Educación: ${d?.educacion ?? "—"}`,
    `  Idioma: ${d?.idioma ?? "—"}`,
    `  Correo: ${d?.correo ?? "—"}`,
    "",
    "También guardado en Firestore → colección consulta_respuestas (proyecto Encuesta Información).",
  ].join("\n");
}
