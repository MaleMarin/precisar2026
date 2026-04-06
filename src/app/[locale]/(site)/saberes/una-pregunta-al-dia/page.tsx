import type { Metadata } from "next";
import { UnaPreguntaAlDiaExperience } from "./UnaPreguntaAlDiaExperience";

export const metadata: Metadata = {
  title: "Una pregunta al día · Saberes",
  description:
    "Treinta preguntas para explorar tu vida digital: tarjeta del día, reverso para reflexionar y descarga en PDF.",
};

export default function UnaPreguntaAlDiaPage() {
  return <UnaPreguntaAlDiaExperience />;
}
