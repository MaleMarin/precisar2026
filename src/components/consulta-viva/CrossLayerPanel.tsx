"use client";

import { SOURCE_LABELS } from "@/lib/consulta-viva/aggregations";
import type { CountrySignal } from "@/lib/consulta-viva/types";
import styles from "./ConsultaVivaSide.module.css";

type Props = {
  pair: { fromIso: string; toIso: string } | null;
  signals: CountrySignal[];
};

export function CrossLayerPanel({ pair, signals }: Props) {
  if (!pair) {
    return (
      <div className={styles.panel}>
        <p className={styles.muted}>
          Elegí un país en el mapa. Te mostraremos un vínculo simple con otro país para comparar lecturas.
        </p>
      </div>
    );
  }

  const a = signals.find((s) => s.iso === pair.fromIso);
  const b = signals.find((s) => s.iso === pair.toIso);
  if (!a || !b) {
    return (
      <div className={styles.panel}>
        <p className={styles.muted}>Todavía no hay otro país con datos para enlazar.</p>
      </div>
    );
  }

  const sharedSource =
    a.dominantSource &&
    b.dominantSource &&
    a.dominantSource === b.dominantSource
      ? a.dominantSource
      : null;

  return (
    <div className={styles.panel}>
      <p className={styles.eyebrow}>Cruce</p>
      <h3 className={styles.title}>
        {a.name} y {b.name}
      </h3>
      <p className={styles.lead}>
        En el mapa ves una sola línea entre estos dos países. Sirve para comparar de un vistazo.
      </p>
      {sharedSource ? (
        <p className={styles.body}>
          En ambos, el canal que más se repite en esta sesión es:{" "}
          <strong>{SOURCE_LABELS[sharedSource]}</strong>.
        </p>
      ) : (
        <p className={styles.body}>
          No comparten el mismo canal principal todavía; igual podés leer cada país en la capa Región.
        </p>
      )}
    </div>
  );
}
