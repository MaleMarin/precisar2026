"use client";

import { MediaticaTabs, type MediaticaTab } from "@/components/educacion-mediatica/MediaticaTabs";

const tabs: MediaticaTab[] = [
  {
    id: "algoritmo",
    label: "Algoritmo y Sesgo Informativo",
    paragraphs: [
      "La tecnología no es neutra. Lo que vemos en redes sociales, buscadores o plataformas está mediado por algoritmos que priorizan ciertos contenidos y silencian otros. Comprender cómo funcionan estos sistemas es clave para desarrollar una mirada crítica sobre la información que consumimos. No se trata solo de saber que existen, sino de entender su impacto en nuestras decisiones, percepciones y relaciones.",
    ],
  },
  {
    id: "privacidad",
    label: "Privacidad y Huella Digital",
    paragraphs: [
      "Cada clic deja una marca. En el mundo digital, nuestros datos son moneda de cambio. Saber proteger la privacidad no es solo una cuestión técnica, sino un acto de autonomía. Comprender qué compartimos, con quién y para qué, nos ayuda a ejercer un control más consciente sobre nuestra identidad digital y nuestros derechos.",
    ],
  },
  {
    id: "brecha",
    label: "Brecha Digital y Acceso",
    paragraphs: [
      "La tecnología amplifica desigualdades cuando el acceso no es garantizado para todos. Este eje visibiliza las barreras que impiden la participación plena en el entorno digital: desde la falta de conectividad hasta la ausencia de formación. Educar en tecnología con enfoque crítico es también educar para la justicia social.",
    ],
  },
  {
    id: "ia",
    label: "Inteligencia Artificial y Cultura Digital",
    paragraphs: [
      "La inteligencia artificial ya no es ciencia ficción. Desde asistentes virtuales hasta sistemas que generan contenido, la IA forma parte del entorno informativo actual. Educar en este contexto implica no solo usar estas tecnologías, sino comprender su funcionamiento y desarrollar una mirada crítica sobre su impacto en nuestras formas de comunicarnos, aprender y convivir.",
    ],
  },
  {
    id: "plataformas",
    label: "Uso Consciente de Plataformas",
    paragraphs: [
      "La conexión permanente no siempre significa una conexión saludable. Este eje propone reflexionar sobre nuestros hábitos digitales: el tiempo que dedicamos, las emociones que nos generan, los vínculos que construimos. Promueve el equilibrio entre vida online y offline, y enseña a usar la tecnología con sentido, intención y cuidado.",
    ],
  },
];

export function TecnologiaMediaticaTabs() {
  return (
    <MediaticaTabs
      headingId="claves-tecnologia-heading"
      idPrefix="tech"
      sectionTitle="Claves para entender la tecnología en la educación mediática"
      tabs={tabs}
    />
  );
}
