import type { Metadata } from "next";
import dynamic from "next/dynamic";
import styles from "./UnaPreguntaAlDiaExperience.module.css";

const UnaPreguntaAlDiaExperience = dynamic(
  () => import("./UnaPreguntaAlDiaExperience").then((m) => ({ default: m.UnaPreguntaAlDiaExperience })),
  {
    ssr: false,
    loading: () => (
      <div className={styles.page} style={{ minHeight: "100vh" }} aria-busy="true" aria-label="Cargando" />
    ),
  },
);

export const metadata: Metadata = {
  title: "Una pregunta al día · Saberes",
  description:
    "Treinta preguntas para explorar tu vida digital: tarjeta del día, reverso para reflexionar y descarga en PDF.",
};

export default function UnaPreguntaAlDiaPage() {
  return <UnaPreguntaAlDiaExperience />;
}
