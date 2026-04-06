"use client";

import { MediaticaTabs, type MediaticaTab } from "@/components/educacion-mediatica/MediaticaTabs";

const tabs: MediaticaTab[] = [
  {
    id: "diversa",
    label: "La cultura es diversa",
    paragraphs: [
      "La cultura no es una sola, homogénea o estática. Es múltiple, cambiante y viva. La educación mediática invita a reconocer esa diversidad como un valor, no como un obstáculo. Comprender que existen distintas formas de ver, narrar y habitar el mundo — desde una comunidad rural hasta un colectivo urbano digital — es esencial para construir una ciudadanía inclusiva, basada en el respeto mutuo y el diálogo intercultural.",
    ],
  },
  {
    id: "representan",
    label: "Los medios representan (y omiten)",
    paragraphs: [
      "Todo contenido mediático es una construcción. Ningún medio muestra la realidad tal cual es, sino que selecciona, jerarquiza y enmarca. Por eso, es clave preguntarse: ¿qué se muestra?, ¿qué se oculta?, ¿quién cuenta la historia? Reconocer lo omitido es el primer paso para construir narrativas más justas.",
    ],
  },
  {
    id: "digital",
    label: "Lo digital también es cultura",
    paragraphs: [
      "TikToks, memes, emojis, reels, podcasts… todo eso es lenguaje, identidad y expresión. Son nuevas formas de narrar lo cotidiano, lo político, lo íntimo. La educación mediática no puede tratar estas producciones como superficiales, sino como parte de la cultura contemporánea. Comprender sus códigos es fundamental para dialogar con las nuevas generaciones.",
    ],
  },
  {
    id: "crear",
    label: "Crear es participar",
    paragraphs: [
      "En la cultura digital, ya no somos solo receptores: también somos emisores. Hacer un video, compartir un meme, escribir un comentario… son actos comunicativos. La educación mediática impulsa a las personas a ejercer su derecho a contar desde su lugar, con su voz, con sus medios. Participar activamente es ejercer ciudadanía cultural.",
    ],
  },
  {
    id: "dialogo",
    label: "El diálogo genera sentido",
    paragraphs: [
      "Ni los medios ni los algoritmos reemplazan al encuentro humano. La comprensión no nace del monólogo, sino del intercambio. El diálogo, entre generaciones, territorios y saberes, es el corazón de una cultura democrática. La educación mediática propone crear espacios de conversación reales, donde se escuche con atención y se construya conocimiento colectivo.",
    ],
  },
  {
    id: "derecho",
    label: "Comunicar es un derecho",
    paragraphs: [
      "No basta con tener acceso a internet: es necesario tener voz. Poder decir, ser escuchado y expresarse sin miedo es parte esencial de una ciudadanía plena. La educación mediática no solo busca proteger del riesgo, sino habilitar el potencial expresivo de todas las personas. Comunicar no es un lujo, es una condición para participar en la vida pública de forma libre y significativa.",
    ],
  },
];

const CULTURA_SECTION_TITLE =
  "Las claves para entender la cultura en la educación mediática parten del reconocimiento de que toda forma de expresión refleja identidades, contextos y valores";

export function CulturaMediaticaTabs() {
  return (
    <MediaticaTabs
      headingId="claves-cultura-heading"
      idPrefix="cult"
      sectionTitle={CULTURA_SECTION_TITLE}
      tabs={tabs}
      longSectionTitle
    />
  );
}
