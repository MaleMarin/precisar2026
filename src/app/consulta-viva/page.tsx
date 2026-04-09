"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CountryDetailPanel } from "@/components/consulta-viva/CountryDetailPanel";
import { LiveLatamMap } from "@/components/consulta-viva/LiveLatamMap";
import { LiveSignalsPanel } from "@/components/consulta-viva/LiveSignalsPanel";
import { QuickResponseForm } from "@/components/consulta-viva/QuickResponseForm";
import { countryByIso, LATAM_COUNTRIES } from "@/lib/consulta-viva/countries";
import {
  aggregateByCountry,
  buildLiveInsights,
  buildSparseFlows,
  SOURCE_LABELS,
} from "@/lib/consulta-viva/aggregations";
import { createMockResponse, seedMockResponses } from "@/lib/consulta-viva/mockResponses";
import type { LiveResponse } from "@/lib/consulta-viva/types";

export default function ConsultaVivaPage() {
  const [responses, setResponses] = useState<LiveResponse[]>([]);
  const [selectedIso, setSelectedIso] = useState<string>("CL");
  const [hoveredIso, setHoveredIso] = useState<string | null>(null);

  useEffect(() => {
    setResponses(seedMockResponses(48));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setResponses((prev) => [...prev.slice(-299), createMockResponse()]);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const { signals, insights } = useMemo(() => {
    const now = Date.now();
    const sig = aggregateByCountry(responses, now);
    const ins = buildLiveInsights(sig, now);
    return { signals: sig, insights: ins };
  }, [responses]);

  const flows = useMemo(() => buildSparseFlows(signals, 3), [signals]);

  const selectedSignal =
    signals.find((s) => s.iso === selectedIso) || signals[0] || null;

  const activeCountryName = selectedSignal?.name ?? countryByIso.get(selectedIso)?.country ?? null;

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

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f4f7fb_0%,#eef3f9_100%)] px-4 py-8 text-slate-900 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-[28px] border border-slate-200 bg-[linear-gradient(135deg,#214f97_0%,#517fd7_44%,#ea648f_100%)] p-8 shadow-[0_24px_70px_rgba(30,41,59,0.14)]">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-white/75">Consulta viva</p>
          <h1 className="mb-4 max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            ¿Cómo te informas hoy?
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Mira cómo se informa América Latina y el Caribe, mientras ocurre.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            Cada respuesta aparece como una señal en vivo y ayuda a leer cómo circula la información en la
            región.
          </p>
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-[1.55fr_0.95fr]">
          <div className="flex flex-col gap-4">
            <section
              className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
              aria-labelledby="how-to-read-heading"
            >
              <h2 id="how-to-read-heading" className="mb-3 text-lg font-semibold text-slate-900">
                Cómo leer este mapa
              </h2>
              <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-slate-600">
                <li>
                  <strong className="text-slate-800">Color</strong> = canal por el que más se informó en ese
                  país (en esta sesión).
                </li>
                <li>
                  <strong className="text-slate-800">Tamaño del punto</strong> = cuántas respuestas lleva
                  acumuladas ese país.
                </li>
                <li>
                  <strong className="text-slate-800">Pulso</strong> = si hubo actividad en los últimos
                  minutos.
                </li>
                <li>
                  <strong className="text-slate-800">Panel a la derecha</strong> = detalle del país que elijas.
                </li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Las líneas finas son solo una pista de hacia dónde apunta la actividad reciente; el mapa y el
                panel cuentan la historia principal.
              </p>
            </section>

            <LiveLatamMap
              signals={signals}
              flows={flows}
              selectedIso={selectedIso}
              hoveredIso={hoveredIso}
              activeCountryName={activeCountryName}
              onHover={setHoveredIso}
              onSelect={(iso) => {
                if (iso) setSelectedIso(iso);
              }}
            />
          </div>

          <aside className="grid gap-6">
            <CountryDetailPanel signal={selectedSignal} />
            <LiveSignalsPanel insights={insights} recentActivity={recentActivity} />
          </aside>
        </div>

        <section
          className="mt-10 rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_14px_34px_rgba(15,23,42,0.08)] md:p-8"
          aria-labelledby="form-heading"
        >
          <h2 id="form-heading" className="text-xl font-semibold text-slate-900 md:text-2xl">
            Suma tu experiencia
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
            Respondé cuatro campos y tu señal entra al mapa de inmediato.
          </p>
          <div className="mt-6">
            <QuickResponseForm defaultIso={selectedIso} onSubmitOptimistic={handleSubmitResponse} />
          </div>
        </section>
      </div>
    </main>
  );
}
