"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HomeConvocaHero } from "./HomeConvocaHero";
import { HomeConvocaLegacy } from "./HomeConvocaLegacy";
import styles from "./HomeConvocaHero.module.css";

export type ConvocaVersion = "nueva" | "legacy";

const STORAGE_KEY = "precisar-convoca-version";
const listeners = new Set<() => void>();

function emitVersionChange() {
  listeners.forEach((listener) => listener());
}

function subscribeVersion(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener("popstate", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
  };
}

function readVersion(): ConvocaVersion {
  const query = new URLSearchParams(window.location.search).get("convoca");
  if (query === "legacy" || query === "anterior") return "legacy";
  if (query === "nueva" || query === "new") return "nueva";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "legacy" || stored === "nueva") return stored;
  return "nueva";
}

function persistVersion(version: ConvocaVersion) {
  window.localStorage.setItem(STORAGE_KEY, version);
  const url = new URL(window.location.href);
  url.searchParams.set("convoca", version);
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  emitVersionChange();
}

export function HomeConvocaPanel() {
  const t = useTranslations("homeConvoca.compare");
  const reduceMotion = useReducedMotion() ?? false;
  const version = useSyncExternalStore(subscribeVersion, readVersion, () => "nueva" as const);

  const choose = useCallback(
    (next: ConvocaVersion) => {
      persistVersion(next);
      const node = document.getElementById("convoca");
      node?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    },
    [reduceMotion],
  );

  return (
    <div className={styles.shell}>
      {version === "legacy" ? <HomeConvocaLegacy /> : <HomeConvocaHero />}
      <div className={styles.compare} role="group" aria-label={t("label")}>
        <p className={styles.compareLabel}>{t("label")}</p>
        <div className={styles.compareSwitch}>
          <button
            type="button"
            className={`${styles.compareBtn} ${version === "nueva" ? styles.compareBtnActive : ""}`.trim()}
            aria-pressed={version === "nueva"}
            onClick={() => choose("nueva")}
          >
            {t("nueva")}
          </button>
          <button
            type="button"
            className={`${styles.compareBtn} ${version === "legacy" ? styles.compareBtnActive : ""}`.trim()}
            aria-pressed={version === "legacy"}
            onClick={() => choose("legacy")}
          >
            {t("legacy")}
          </button>
        </div>
        <p className={styles.compareHint}>{version === "nueva" ? t("hintNueva") : t("hintLegacy")}</p>
      </div>
    </div>
  );
}
