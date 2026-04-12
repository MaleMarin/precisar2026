import { BeneficiosOrg } from "@/components/formacion/BeneficiosOrg";
import { FormacionHero } from "@/components/formacion/FormacionHero";
import { ModalidadesRow } from "@/components/formacion/ModalidadesRow";
import { TallerCard } from "@/components/formacion/TallerCard";
import { CtaBlock } from "@/components/ui/CtaBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formación en pensamiento crítico",
  description: "Talleres concretos de verificación y algoritmos — Precisar.",
};

const taller01 = {
  label: "■ TALLER 01",
  title: "Que no te engañen.\nAprende a verificar.",
  hook: "Para quien recibe cadenas en WhatsApp y ya no sabe qué creer.",
  description:
    "No necesitas saber de tecnología. Este taller te da un método de 3 pasos y herramientas gratuitas para distinguir información real de falsa en minutos, y saber qué decirle a quien la comparte.",
  outcomes: [
    "Aplicar una lista de chequeo de 3 pasos antes de creer o compartir",
    "Reconocer las señales de alerta más comunes en titulares falsos",
    "Usar búsqueda inversa de imágenes desde tu celular",
    "Conversar con calma con alguien que comparte desinformación",
  ],
  modulos: [
    {
      n: "01",
      title: "Por qué las noticias falsas funcionan",
      body: "Los titulares que provocan enojo están diseñados para que compartas sin pensar.",
    },
    {
      n: "02",
      title: "Pausa. Pregunta. Compara.",
      body: "¿Quién dice esto? ¿Por qué? ¿Algún otro medio serio lo confirma?",
    },
    {
      n: "03",
      title: "Herramientas en tu celular",
      body: "Búsqueda inversa de imágenes: descubre si esa foto es de hace 10 años en otro país.",
    },
    {
      n: "04",
      title: "¿Y ahora qué hago?",
      body: "Plan de acción personal y guía para hablar con tu círculo cercano.",
    },
  ],
};

const taller02 = {
  label: "■ TALLER 02",
  title: "Los algoritmos deciden\nlo que ves. ¿Tú también?",
  hook: "Para quien quiere entender qué hay detrás del scroll.",
  description:
    "No es magia. Es código que aprende de ti. Este taller abre el capó de las redes sociales para que entiendas cómo la IA y los algoritmos organizan lo que ves y qué puedes hacer para no quedar atrapado en tu propia burbuja.",
  outcomes: [
    "Explicar con un ejemplo simple qué es un algoritmo",
    "Reconocer el efecto de la «burbuja de filtros» en tu consumo diario",
    "Identificar cómo la IA crea contenido real y también falso",
    "Aplicar criterios para evaluar imágenes, audios y videos generados por IA",
  ],
  modulos: [
    {
      n: "01",
      title: "El chef secreto de tu internet",
      body: "Qué es un algoritmo, explicado con ejemplos de Spotify, Netflix y redes sociales.",
    },
    {
      n: "02",
      title: "Un mundo hecho para ti",
      body: "Cómo las plataformas construyen un perfil tuyo. La burbuja de filtros.",
    },
    {
      n: "03",
      title: "La IA ya llegó",
      body: "Qué puede crear la IA hoy: imágenes, textos, voces que parecen reales.",
    },
    {
      n: "04",
      title: "Navegar con criterio",
      body: "Herramientas y hábitos para moverse sin pánico ni ingenuidad.",
    },
  ],
};

export default function QueHacemosFormacionPage() {
  return (
    <main>
      <FormacionHero />
      <ModalidadesRow />
      <TallerCard {...taller01} />
      <div style={{ borderTop: "0.5px solid rgba(219, 82, 39, 0.2)" }} aria-hidden />
      <TallerCard {...taller02} />
      <BeneficiosOrg />
      <CtaBlock
        headline="Cada organización tiene necesidades distintas. Conversamos, ajustamos y ejecutamos. Sin propuestas genéricas."
        buttonLabel="Contáctanos"
      />
    </main>
  );
}
