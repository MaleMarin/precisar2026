"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CountryDetailPanel } from "@/components/consulta-viva/CountryDetailPanel";
import { CrossLayerPanel } from "@/components/consulta-viva/CrossLayerPanel";
import { LiveLatamMap, type ConsultaVivaLayerMode } from "@/components/consulta-viva/LiveLatamMap";
import { LiveSignalsPanel } from "@/components/consulta-viva/LiveSignalsPanel";
import { QuickResponseForm } from "@/components/consulta-viva/QuickResponseForm";
import { countryByIso, LATAM_COUNTRIES } from "@/lib/consulta-viva/countries";
import {
  aggregateByCountry,
  buildLiveInsights,
  crossPairForSelection,
  SOURCE_LABELS,
} from "@/lib/consulta-viva/aggregations";
import { createMockResponse, seedMockResponses } from "@/lib/consulta-viva/mockResponses";
import type { LiveResponse } from "@/lib/consulta-viva/types";
import styles from "./page.module.css";

const LAYER_TABS: {
  id: ConsultaVivaLayerMode;
  label: string;
  hint: string;
}[] = [
  {
    id: "resultados",
    label: "Resultados",
    hint: "Lectura general de la región y últimas respuestas en el mapa.",
  },
  {
    id: "region",
    label: "Región",
    hint: "Detalle del país que elegiste en el mapa.",
  },
  {
    id: "cruce",
    label: "Cruce",
    hint: "Un solo enlace en el mapa entre dos países para comparar.",
  },
];

export default function ConsultaVivaPage() {
  const [responses, setResponses] = useState<LiveResponse[]>(() => seedMockResponses(48));
  const [selectedIso, setSelectedIso] = useState<string>("CL");
  const [hoveredIso, setHoveredIso] = useState<string | null>(null);
  const [layerMode, setLayerMode] = useState<ConsultaVivaLayerMode>("resultados");

  useEffect(() => {
    const interval = setInterval(() => {
      setResponses((prev) => [...prev.slice(-299), createMockResponse()]);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const aggregationNow = useMemo(() => {
    if (!responses.length) return 0;
    return Math.max(...responses.map((r) => r.createdAt));
  }, [responses]);

  const { signals, insights } = useMemo(() => {
    const now = aggregationNow || 0;
    const sig = aggregateByCountry(responses, now);
    const ins = buildLiveInsights(sig, now);
    return { signals: sig, insights: ins };
  }, [responses, aggregationNow]);

  const crossPair = useMemo(
    () => (selectedIso ? crossPairForSelection(selectedIso, signals) : null),
    [selectedIso, signals],
  );

  const selectedSignal =
    signals.find((s) => s.iso === selectedIso) || signals[0] || null;

  const activeCountryName =
    selectedSignal?.name ?? countryByIso.get(selectedIso)?.country ?? null;

  const recentActivity = useMemo(() => {
    const latest = responses.slice(-8).reverse();
    return latest.map((r) => {
      const country =
        LATAM_COUNTRIES.find((c) => c.iso === r.countryIso)?.country || r.countryIso;
      const source = SOURCE_LABELS[r.source];
      return `${country} · ${source}`;
    });
  }, [responses]);

  const handleSubmitResponse = useCallback((response: LiveResponse) => {
    setResponses((prev) => [...prev.slice(-299), response]);
    setSelectedIso(response.countryIso);
  }, []);

  const activeTab = LAYER_TABS.find((t) => t.id === layerMode)!;

  return (
    <main className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.hero}>
          <p className={styles.heroEyebrow}>Precisar · en vivo</p>
          <h1 className={styles.heroTitle}>Mapa vivo de los resultados de la consulta</h1>
          <p className={styles.heroLine}>
            América Latina y el Caribe en un solo tablero: países, lectura por capa y señales que se actualizan.
          </p>
        </header>

        <p className={styles.blurb}>
          <strong>No reemplaza la consulta principal:</strong> el cuestionario paso a paso sigue en{" "}
          <Link href="/consulta" className={styles.inlineLink}>
            /consulta
          </Link>
          . <strong>Esta página</strong> es solo el mapa y la lectura de resultados en vivo.{" "}
          <strong>Qué ves:</strong> un punto por país y un panel a la vez.{" "}
          <strong>Si sumás una señal abajo:</strong> aparece en el mapa y en la lista reciente.
        </p>

        <div className={styles.mainGrid}>
          <div className={styles.mapColumn}>
            <LiveLatamMap
              signals={signals}
              selectedIso={selectedIso}
              hoveredIso={hoveredIso}
              activeCountryName={activeCountryName}
              layerMode={layerMode}
              crossPair={layerMode === "cruce" ? crossPair : null}
              onHover={setHoveredIso}
              onSelect={(iso) => {
                if (iso) setSelectedIso(iso);
              }}
            />
          </div>

          <aside className={styles.sideColumn} aria-label="Panel de lectura">
            <div className={styles.layerTabs} role="tablist" aria-label="Capas del mapa">
              {LAYER_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={layerMode === t.id}
                  className={`${styles.layerTab} ${layerMode === t.id ? styles.layerTabActive : ""}`}
                  onClick={() => setLayerMode(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className={styles.layerHint}>{activeTab.hint}</p>

            {layerMode === "resultados" ? (
              <LiveSignalsPanel insights={insights} recentActivity={recentActivity} />
            ) : null}
            {layerMode === "region" ? <CountryDetailPanel signal={selectedSignal} /> : null}
            {layerMode === "cruce" ? <CrossLayerPanel pair={crossPair} signals={signals} /> : null}
          </aside>
        </div>

        <section className={styles.formSection} aria-labelledby="form-heading">
          <h2 id="form-heading" className={styles.formTitle}>
            Sumá tu respuesta
          </h2>
          <p className={styles.formLead}>
            Cuatro campos. Tu señal entra al mapa al instante y queda asociada al país que elijas.
          </p>
          <QuickResponseForm defaultIso={selectedIso} onSubmitOptimistic={handleSubmitResponse} />
        </section>
      </div>
    </main>
  );
}
