"use client";

import { useState } from "react";
import { concernLabel, SOURCE_LABELS } from "@/lib/consulta-viva/aggregations";
import { LATAM_COUNTRIES } from "@/lib/consulta-viva/countries";
import type { ConcernType, LiveResponse, SourceType, TrustLevel } from "@/lib/consulta-viva/types";
import styles from "./QuickResponseForm.module.css";

const SOURCES: SourceType[] = ["whatsapp", "social", "tv_radio", "news", "ai"];
const CONCERNS: ConcernType[] = [
  "fake_news",
  "manipulation",
  "lack_context",
  "scams",
  "privacy",
  "other",
];
const TRUST: TrustLevel[] = [1, 2, 3, 4, 5];

const TRUST_SHORT: Record<number, string> = {
  1: "Muy baja",
  2: "Baja",
  3: "Intermedia",
  4: "Alta",
  5: "Muy alta",
};

function uid(): string {
  const c = globalThis.crypto as Crypto | undefined;
  if (c?.randomUUID) return c.randomUUID();
  return `${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
}

type Props = {
  defaultIso?: string;
  onSubmitOptimistic: (r: LiveResponse) => void;
};

export function QuickResponseForm({ defaultIso = "CL", onSubmitOptimistic }: Props) {
  const [iso, setIso] = useState(defaultIso);
  const [source, setSource] = useState<SourceType>("whatsapp");
  const [trust, setTrust] = useState<TrustLevel>(3);
  const [concern, setConcern] = useState<ConcernType>("lack_context");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const optimistic: LiveResponse = {
      id: uid(),
      countryIso: iso.toUpperCase(),
      source,
      trust,
      concern,
      createdAt: Date.now(),
    };

    onSubmitOptimistic(optimistic);

    try {
      const res = await fetch("/api/consulta-viva/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(optimistic),
      });
      if (!res.ok) throw new Error("POST failed");
      setStatus("ok");
      setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2600);
    }
  };

  const countries = [...LATAM_COUNTRIES].sort((a, b) => a.country.localeCompare(b.country, "es"));

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>País</span>
          <select className={styles.select} value={iso} onChange={(e) => setIso(e.target.value)}>
            {countries.map((c) => (
              <option key={c.iso} value={c.iso}>
                {c.country}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Canal principal</span>
          <select
            className={styles.select}
            value={source}
            onChange={(e) => setSource(e.target.value as SourceType)}
          >
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {SOURCE_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Nivel de confianza</span>
          <select
            className={styles.select}
            value={trust}
            onChange={(e) => setTrust(Number(e.target.value) as TrustLevel)}
          >
            {TRUST.map((t) => (
              <option key={t} value={t}>
                {TRUST_SHORT[t]}
              </option>
            ))}
          </select>
        </label>
        <label className={`${styles.field} ${styles.fieldWide}`}>
          <span className={styles.label}>Principal preocupación</span>
          <select
            className={styles.select}
            value={concern}
            onChange={(e) => setConcern(e.target.value as ConcernType)}
          >
            {CONCERNS.map((c) => (
              <option key={c} value={c}>
                {concernLabel(c)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Enviar al mapa"}
        </button>
        {status === "ok" ? <span className={styles.hintOk}>Listo: sincronizado</span> : null}
        {status === "error" ? <span className={styles.hintErr}>Error al sincronizar</span> : null}
      </div>
      <p className={styles.note}>Se guarda en el mapa al instante y en el servidor de prueba.</p>
    </form>
  );
}
