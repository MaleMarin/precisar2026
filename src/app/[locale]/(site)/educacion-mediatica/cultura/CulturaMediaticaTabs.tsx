"use client";

import { MediaticaTabs, type MediaticaTab } from "@/components/educacion-mediatica/MediaticaTabs";

const tabs: MediaticaTab[] = [
  {
    id: "diversa",
    label: "La cultura es diversa",
    paragraphs: [
      "La cultura no es una sola, homogénea o estática. Es múltiple, cambiante y viva. La educación mediática invita a reconocer esa diversidad como un valor, no como un obstáculo. Comprender que existen distintas formas de ver, narrar y habitar el mundo —desde una comunidad rural hasta un colectivo urbano digital— es esencial para construir una ciudadanía inclusiva, basada en el respeto mutuo y el diálogo intercultural. No se trata solo de aceptar la diferencia, sino de aprender con ella.",
    ],
  },
  {
    id: "representan",
    label: "Los medios representan (y omiten)",
    paragraphs: [
      "Todo contenido mediático es una construcción. Ningún medio muestra la realidad tal cual es, sino que selecciona, jerarquiza y enmarca. Por eso, es clave preguntarse: ¿qué se muestra?, ¿qué se oculta?, ¿quién cuenta la historia? La educación mediática propone formar una mirada crítica frente a esas representaciones, entendiendo que lo que se ve en pantalla también moldea estereotipos, relaciones de poder y desigualdades. Reconocer lo omitido es el primer paso para construir narrativas más justas.",
    ],
  },
  {
    id: "digital",
    label: "Lo digital también es cultura",
    paragraphs: [
      "TikToks, memes, emojis, hilos de X, reels, podcasts… todo eso es lenguaje, identidad y expresión. Son nuevas formas de narrar lo cotidiano, lo político, lo íntimo. La educación mediática no puede tratar estas producciones como superficiales, sino como parte de la cultura contemporánea. Comprender sus códigos, su estética y sus modos de circulación es fundamental para dialogar con las nuevas generaciones y para validar las formas en que crean sentido sobre el mundo.",
    ],
  },
  {
    id: "crear",
    label: "Crear es participar",
    paragraphs: [
      "En la cultura digital, ya no somos solo receptores: también somos emisores. Hacer un video, compartir un meme, escribir un comentario… son actos comunicativos. Y toda comunicación es política, porque expresa visiones, afectos y posicionamientos. La educación mediática impulsa a las personas a ejercer su derecho a contar desde su lugar, con su voz, con sus medios. Participar activamente es ejercer ciudadanía cultural, es inscribirse en el presente con dignidad y sentido.",
    ],
  },
  {
    id: "dialogo",
    label: "El diálogo genera sentido",
    paragraphs: [
      "Ni los medios ni los algoritmos reemplazan al encuentro humano. La comprensión no nace del monólogo, sino del intercambio. El diálogo, entre generaciones, territorios, saberes, es el corazón de una cultura democrática. La educación mediática propone crear espacios de conversación reales, donde se escuche con atención, se disienta con respeto y se construya conocimiento colectivo. Porque entender al otro es también entenderse a uno mismo en un mundo compartido.",
    ],
  },
  {
    id: "derecho",
    label: "Comunicar es un derecho",
    paragraphs: [
      "No basta con tener acceso a internet: es necesario tener voz. Poder decir, ser escuchado y expresarse sin miedo es parte esencial de una ciudadanía plena. La educación mediática, desde la mirada de derechos humanos, no solo busca proteger del riesgo (como las fake news o el discurso de odio), sino habilitar el potencial expresivo de todas las personas. Comunicar no es un lujo, es una condición para participar en la vida pública de forma libre y significativa.",
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
