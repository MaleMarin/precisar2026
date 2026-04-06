"use client";

import { MediaticaTabs, type MediaticaTab } from "@/components/educacion-mediatica/MediaticaTabs";

const tabs: MediaticaTab[] = [
  {
    id: "pensamiento",
    label: "Pensamiento Crítico",
    paragraphs: [
      "No se trata solo de tener opiniones, sino de saber por qué las tenemos. El pensamiento crítico es la capacidad de observar, interpretar y cuestionar el mundo que nos rodea, incluyendo los mensajes mediáticos que consumimos. En un entorno saturado de estímulos, aprender a pausar, analizar y formular juicios propios se convierte en una competencia clave para la autonomía y la ciudadanía.",
    ],
  },
  {
    id: "aula",
    label: "Educación Mediática en Aula",
    paragraphs: [
      "La educación mediática no es un contenido más, es una forma de ver y enseñar el mundo. Integrarla en el aula es enseñar a los estudiantes a convivir con la información, a construir conocimiento colaborativo y a vincularse con el entorno digital con sentido. Desde la infancia hasta la adultez, permite una pedagogía más conectada con la realidad y más consciente de sus impactos.",
    ],
  },
  {
    id: "produccion",
    label: "Producción de Contenidos",
    paragraphs: [
      "Hoy todos somos potencialmente emisores. Crear contenidos no es solo una habilidad técnica, es una forma de intervención en el mundo. Aprender a producir mensajes — videos, podcasts, memes, textos — con propósito, con ética y con mirada crítica, permite ejercer la ciudadanía en red y dialogar desde lo local hacia lo global.",
    ],
  },
  {
    id: "evaluar",
    label: "Evaluar Información",
    paragraphs: [
      "La capacidad de discriminar entre información confiable y contenido dudoso es una de las alfabetizaciones fundamentales del siglo XXI. No basta con consumir datos: hay que aprender a verificar, a identificar fuentes, a reconocer sesgos. Evaluar información no es desconfiar de todo, sino aprender a mirar con lupa y a valorar el conocimiento bien fundamentado.",
    ],
  },
  {
    id: "vida",
    label: "Vida Digital y Convivencia",
    paragraphs: [
      "Estar en línea no es solo una experiencia técnica, es una experiencia humana. La educación mediática promueve formas de convivencia digital que respetan la diversidad, promueven el diálogo y rechazan la violencia. Aprender a vivir en red implica saber protegerse, pero también construir entornos más empáticos, colaborativos y democráticos.",
    ],
  },
];

export function EducacionMediaticaTabs() {
  return (
    <MediaticaTabs
      headingId="claves-educacion-heading"
      idPrefix="edu"
      sectionTitle="Claves para aprender con sentido crítico"
      tabs={tabs}
    />
  );
}
