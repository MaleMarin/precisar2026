"use client";

import { useState } from "react";
import styles from "./MultiStepForm.module.css";

export type MultiStepFormProps = {
  categories: string[];
  /** Llamado al enviar el paso 2 (no hace fetch por defecto). */
  onSubmit?: (payload: {
    categories: string[];
    message: string;
    name: string;
    email: string;
  }) => void;
};

export function MultiStepForm({ categories, onSubmit }: MultiStepFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selections, setSelections] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const toggleCategory = (c: string) => {
    setSelections((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  };

  const goStep2 = () => setStep(2);
  const backStep1 = () => setStep(1);

  const submitStep2 = () => {
    onSubmit?.({
      categories: selections,
      message,
      name,
      email,
    });
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className={styles.root}>
        <p className={styles.stepLabel}>Paso 3 de 3</p>
        <h2 className={styles.confirmTitle}>Mensaje recibido</h2>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className={styles.root}>
        <p className={styles.stepLabel}>Paso 2 de 3</p>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="msf-message">
            Mensaje
          </label>
          <textarea
            id="msf-message"
            className={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="msf-name">
            Nombre
          </label>
          <input
            id="msf-name"
            className={styles.input}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="msf-email">
            Email
          </label>
          <input
            id="msf-email"
            className={styles.input}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={backStep1}>
            Atrás
          </button>
          <button type="button" className={styles.btn} onClick={submitStep2}>
            Enviar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <p className={styles.stepLabel}>Paso 1 de 3 · Elige una o más</p>
      <div className={styles.chipGrid}>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`${styles.chip} ${selections.includes(c) ? styles.chipSelected : ""}`}
            onClick={() => toggleCategory(c)}
            aria-pressed={selections.includes(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.btn}
          onClick={goStep2}
          disabled={selections.length === 0}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
