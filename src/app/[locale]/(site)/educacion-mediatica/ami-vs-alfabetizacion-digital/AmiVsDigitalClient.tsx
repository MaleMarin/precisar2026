"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./AmiPage.module.css";

type ColId = "ami" | "digital";

type Ejercicio = { id: number; texto: string; respuesta: ColId };

type TableRow = { dimension: string; ami: string; digital: string };

export function AmiVsDigitalClient() {
  const t = useTranslations("amiVsAlfabetizacionDigital");
  const TABLA = t.raw("tableRows") as TableRow[];
  const EJERCICIOS = t.raw("ejercicios") as Ejercicio[];
  const amiItems = t.raw("amiColumn.items") as string[];
  const amiExamples = t.raw("amiColumn.examples") as string[];
  const digitalItems = t.raw("digitalColumn.items") as string[];
  const digitalExamples = t.raw("digitalColumn.examples") as string[];
  const razones = t.raw("razones") as { titulo: string; desc: string }[];

  const [dropped, setDropped] = useState<Record<number, ColId | null>>({});
  const [checked, setChecked] = useState(false);
  const [dragging, setDragging] = useState<number | null>(null);

  const pending = EJERCICIOS.filter((e) => !dropped[e.id]);
  const inCol = (col: ColId) => EJERCICIOS.filter((e) => dropped[e.id] === col);
  const score = EJERCICIOS.filter((e) => dropped[e.id] === e.respuesta).length;

  const handleDrop = (col: ColId) => {
    if (dragging === null) return;
    setDropped((p) => ({ ...p, [dragging]: col }));
    setDragging(null);
    setChecked(false);
  };

  const handleReset = () => {
    setDropped({});
    setChecked(false);
  };

  const heroTitleLines = t("heroTitle").split("\n");

  return (
    <div>
      <section className={styles.hero}>
        <p className={styles.kicker}>{t("heroKicker")}</p>
        <h1 className={styles.heroTitle}>
          {heroTitleLines.map((line, i) => (
            <span key={i}>
              {i > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </h1>
        <p className={styles.heroBajada}>{t("heroBajada")}</p>
      </section>

      <section className={styles.dosCol}>
        <div className={styles.colAmi}>
          <p className={styles.colTitulo}>{t("amiColumn.title")}</p>
          <p className={styles.colSub}>{t("amiColumn.sub")}</p>
          <ul className={styles.colList}>
            {amiItems.map((item, i) => (
              <li key={i} className={styles.colItem}>
                <span className={styles.arrow}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.ejemplosLabel}>{t("amiColumn.examplesLabel")}</p>
          <div className={styles.tags}>
            {amiExamples.map((e, i) => (
              <span key={i} className={styles.tagAmi}>
                {e}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.colDigital}>
          <p className={styles.colTituloD}>{t("digitalColumn.title")}</p>
          <p className={styles.colSubD}>{t("digitalColumn.sub")}</p>
          <ul className={styles.colListD}>
            {digitalItems.map((item, i) => (
              <li key={i} className={styles.colItemD}>
                <span className={styles.arrowD}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.ejemplosLabelD}>{t("digitalColumn.examplesLabel")}</p>
          <div className={styles.tags}>
            {digitalExamples.map((e, i) => (
              <span key={i} className={styles.tagDigital}>
                {e}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.tablaSection}>
        <p className={styles.kicker}>{t("tableKicker")}</p>
        <h2 className={styles.secTitulo}>{t("tableTitle")}</h2>
        <div className={styles.tabla}>
          <div className={styles.tablaHead}>
            <div className={styles.headCelda} style={{ color: "rgba(245,242,236,0.5)" }}>
              {t("tableHeaders.dimension")}
            </div>
            <div className={styles.headCelda} style={{ color: "#DB5227" }}>
              {t("tableHeaders.ami")}
            </div>
            <div className={styles.headCelda} style={{ color: "rgba(245,242,236,0.6)" }}>
              {t("tableHeaders.digital")}
            </div>
          </div>
          {TABLA.map((f, i) => (
            <div key={i} className={styles.tablaFila}>
              <div className={styles.celdaDim}>{f.dimension}</div>
              <div className={styles.celda}>{f.ami}</div>
              <div className={styles.celda}>{f.digital}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ejercicioSection}>
        <p className={styles.kickerLight}>{t("exerciseKicker")}</p>
        <h2 className={styles.secTituloLight}>
          {t("exerciseTitle")
            .split("\n")
            .map((line, i) => (
              <span key={i}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}
        </h2>
        <p className={styles.tip}>{t("exerciseTip")}</p>

        <div className={styles.pool}>
          {pending.map((item) => (
            <div key={item.id} className={styles.dragItem} draggable onDragStart={() => setDragging(item.id)}>
              {item.texto}
            </div>
          ))}
          {pending.length === 0 && <p className={styles.poolEmpty}>{t("poolEmpty")}</p>}
        </div>

        <div className={styles.dropGrid}>
          {(["ami", "digital"] as ColId[]).map((col) => (
            <div
              key={col}
              className={col === "ami" ? styles.dropAmi : styles.dropDigital}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col)}
            >
              <p className={col === "ami" ? styles.dropLabel : styles.dropLabelD}>
                {col === "ami" ? t("dropAmiLabel") : t("dropDigitalLabel")}
              </p>
              {inCol(col).length === 0 && <p className={styles.dropHint}>{t("dropHint")}</p>}
              {inCol(col).map((item) => (
                <div
                  key={item.id}
                  className={styles.droppedItem}
                  style={{
                    background: checked
                      ? item.respuesta === col
                        ? "rgba(34,197,94,0.2)"
                        : "rgba(239,68,68,0.2)"
                      : "rgba(245,242,236,0.08)",
                    borderColor: checked
                      ? item.respuesta === col
                        ? "rgba(34,197,94,0.5)"
                        : "rgba(239,68,68,0.5)"
                      : "rgba(245,242,236,0.15)",
                  }}
                >
                  {checked && <span style={{ marginRight: 6 }}>{item.respuesta === col ? "✓" : "✗"}</span>}
                  {item.texto}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.controles}>
          <button type="button" className={styles.btnComprobar} onClick={() => setChecked(true)} disabled={pending.length > 0}>
            {t("btnCheck")}
          </button>
          <button type="button" className={styles.btnReiniciar} onClick={handleReset}>
            {t("btnReset")}
          </button>
          {checked && (
            <p className={styles.score}>
              {t("scoreTemplate", { score, total: EJERCICIOS.length })}
            </p>
          )}
        </div>
      </section>

      <section className={styles.razonesSection}>
        <p className={styles.kicker}>{t("razonesKicker")}</p>
        <h2 className={styles.secTitulo}>{t("razonesTitle")}</h2>
        <div className={styles.razonesGrid}>
          {razones.map((r, i) => (
            <div key={i} className={styles.razonCard}>
              <p className={styles.razonTitulo}>{r.titulo}</p>
              <p className={styles.razonDesc}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
