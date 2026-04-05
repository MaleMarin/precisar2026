import { PDFS } from "@/lib/site";

export type SaberesResource = {
  title: string;
  body: string;
  href: string;
  label: string;
  /** Imagen en `public/` (ej. `/saberes/covers/nombre.png`). */
  coverImage?: string;
  /** Página con experiencia ampliada (p. ej. tarjetas «Una pregunta al día»). */
  experienceHref?: string;
  experienceLabel?: string;
};

/** Títulos y PDFs actuales (misma fuente que el sitio previo). */
export const SABERES_RESOURCES: SaberesResource[] = [
  {
    title: "Inteligencia Artificial en el Aula: Qué, Cómo y Para Qué",
    body:
      "Guía práctica para incorporar la IA en educación de forma responsable y equitativa—detalla oportunidades y riesgos, criterios éticos y de privacidad, requerimientos de infraestructura y formación docente, y pasos de gobernanza para centros y autoridades.",
    href: PDFS.saberesIaAula1,
    label: "DESCARGA",
  },
  {
    title: "Guía Práctica de Educación Mediática e Informacional en Chile (EducaMedios)",
    body:
      "Presentamos la primera Guía Práctica de Educación Mediática e Informacional en Chile, creada por EducaMedios de Precisar. Una invitación a explorar el entorno digital con criterio y confianza.",
    href: PDFS.saberesIaAula2,
    label: "DESCARGA",
  },
  {
    title: "30 preguntas para explorar tu vida digital",
    body:
      "Este recurso reúne 30 preguntas que invitan a observar con más atención nuestros hábitos digitales, emociones, decisiones y relaciones en línea. No están hechas para evaluar, sino para provocar curiosidad, conversación y pensamiento crítico.",
    href: PDFS.saberes30Preguntas,
    label: "DESCARGA",
    experienceHref: "/unapreguntaaldia",
    experienceLabel: "Ver 30 tarjetas",
  },
  {
    title: "Guía práctica de Inteligencia Artificial",
    body:
      "La guía práctica de Inteligencia Artificial te guía paso a paso para entender qué es la IA, cómo funciona y cómo usarla de forma segura y responsable.",
    href: PDFS.saberesGuiaIa,
    label: "DESCARGA",
  },
  {
    title: "Uso Consciente de la Inteligencia Artificial",
    body:
      "Este documento es una guía práctica sobre el uso consciente de la Inteligencia Artificial. Explica qué es la IA, cómo la usamos en la vida cotidiana y los principales riesgos asociados, como información falsa, estafas, problemas de privacidad y sesgos. Incluye ejemplos prácticos y consejos de seguridad para que todas las personas puedan usar la IA de forma informada y segura.",
    href: PDFS.saberesUsoConscienteIa,
    label: "DESCARGA",
  },
  {
    title:
      "Guía para educadores y facilitadores: una herramienta práctica con 12 preguntas clave para realizar actividades que enseñen a evaluar lo que vemos en internet antes de compartirlo.",
    body: "",
    href: PDFS.saberesEducadores12,
    label: "DESCARGA",
  },
  {
    title: "Guía práctica para verificar imágenes",
    body:
      "La guía práctica para verificar imágenes enseña paso a paso cómo identificar si una foto o un vídeo son reales o han sido manipulados, usando herramientas simples y técnicas de observación crítica.",
    href: PDFS.saberesVerificarImagenes,
    label: "DESCARGA",
  },
];
