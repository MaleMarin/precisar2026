"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FooterContactLink } from "@/components/FooterContactLink";
import { SITE } from "@/lib/site";
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
  const t = useTranslations("multiStepForm");
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
        <p className={styles.stepLabel}>{t("stepConfirm")}</p>
        <div
          className={styles.confirmBox}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <h2 className={styles.confirmTitle}>{t("confirmTitle")}</h2>
          <p className={styles.confirmBody}>{t("confirmBody1")}</p>
          <p className={styles.confirmBody}>
            {t("confirmBody2Before")}{" "}
            <a href={`mailto:${SITE.contactEmail}`} className={styles.confirmLink}>
              {SITE.contactEmail}
            </a>{" "}
            {t("confirmBody2After")}{" "}
            <FooterContactLink className={styles.confirmLink}>{t("footerFormLink")}</FooterContactLink>.
          </p>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className={styles.root}>
        <p className={styles.stepLabel}>{t("step2Label")}</p>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="msf-message">
            {t("labelMessage")}
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
            {t("labelName")}
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
            {t("labelEmail")}
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
            {t("back")}
          </button>
          <button type="button" className={styles.btn} onClick={submitStep2}>
            {t("send")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <p className={styles.stepLabel}>{t("step1Label")}</p>
      <div className={styles.chipRow}>
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
          {t("continue")}
        </button>
      </div>
    </div>
  );
}
