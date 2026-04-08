"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LiveResponse } from "@/lib/consulta-viva/types";
import { LATAM_COUNTRIES } from "@/lib/consulta-viva/countries";
import { SOURCE_LABELS } from "@/lib/consulta-viva/sourceColors";
import {
  aggregateByCountry,
  buildLiveInsights,
  buildSourceFlows,
  sumRecentBySource,
  timeAgo,
} from "@/lib/consulta-viva/aggregations";
import { createMockResponse } from "@/lib/consulta-viva/mockResponses";

import pageStyles from "./ConsultaVivaPage.module.css";
import { CountryDetailPanel } from "./CountryDetailPanel";
import { LiveLatamMap } from "./LiveLatamMap";
import { LiveSignalsPanel } from "./LiveSignalsPanel";
import { QuickResponseForm } from "./QuickResponseForm";
import { RecentInsights } from "./RecentInsights";
import { SourceFlowsLegend } from "./SourceFlowsLegend";

function useNowRaf(fps = 10) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const frameMs = 1000 / fps;

    const tick = (t: number) => {
      if (t - last >= frameMs) {
        last = t;
        setNow(Date.now());
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fps]);

  return now;
}

function useBufferedAppend(max = 300, flushMs = 220) {
  const [items, setItems] = useState<LiveResponse[]>([]);
  const buf = useRef<LiveResponse[]>([]);
  const timer = useRef<number | null>(null);
  const ids = useRef<Set<string>>(new Set());

  const seedFromServer = useCallback(
    (list: LiveResponse[]) => {
      ids.current.clear();
      for (const r of list) ids.current.add(r.id);
      setItems(list.length > max ? list.slice(list.length - max) : list);
    },
    [max],
  );

  const append = useCallback(
    (next: LiveResponse | LiveResponse[]) => {
      const arr = Array.isArray(next) ? next : [next];
      for (const r of arr) {
        if (ids.current.has(r.id)) continue;
        ids.current.add(r.id);
        buf.current.push(r);
      }

      if (timer.current != null) return;

      timer.current = window.setTimeout(() => {
        setItems((prev) => {
          const merged = prev.concat(buf.current);
          buf.current = [];
          timer.current = null;
          return merged.length > max ? merged.slice(merged.length - max) : merged;
        });
      }, flushMs);
    },
    [max, flushMs],
  );

  return { items, append, seedFromServer };
}

export function ConsultaVivaPage() {
  const now = useNowRaf(10);

  const [selectedIso, setSelectedIso] = useState<string | null>("CL");
  const [hoveredIso, setHoveredIso] = useState<string | null>(null);

  const { items: responses, append, seedFromServer } = useBufferedAppend(300, 220);
  const lastServerTs = useRef<number>(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/consulta-viva/responses", { cache: "no-store" });
        const json = (await res.json()) as { responses?: LiveResponse[] };
        if (!alive) return;
        const list = json.responses ?? [];
        seedFromServer(list.slice(-300));
        lastServerTs.current = list.length ? list[list.length - 1]!.createdAt : 0;
      } catch {
        /* sin API en build estático: queda vacío hasta cliente */
      }
    })();
    return () => {
      alive = false;
    };
  }, [seedFromServer]);

  useEffect(() => {
    const poll = window.setInterval(async () => {
      const since = lastServerTs.current || 0;
      try {
        const res = await fetch(`/api/consulta-viva/responses?since=${since}`, { cache: "no-store" });
        const json = (await res.json()) as { responses?: LiveResponse[] };
        const list = json.responses ?? [];
        if (list.length) {
          lastServerTs.current = list[list.length - 1]!.createdAt;
          append(list);
        }
      } catch {
        /* ignore */
      }
    }, 2000);
    return () => window.clearInterval(poll);
  }, [append]);

  useEffect(() => {
    const t = window.setInterval(async () => {
      const r = createMockResponse(Date.now());
      append(r);
      try {
        await fetch("/api/consulta-viva/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(r),
        });
      } catch {
        /* sin servidor: solo UI local */
      }
    }, 1850);
    return () => window.clearInterval(t);
  }, [append]);

  const signals = useMemo(() => aggregateByCountry(responses, now), [responses, now]);
  const flows = useMemo(() => buildSourceFlows(signals, 4), [signals]);
  const insights = useMemo(() => buildLiveInsights(signals, now), [signals, now]);
  const vol = useMemo(() => sumRecentBySource(signals), [signals]);

  const displayIso = hoveredIso ?? selectedIso;
  const displaySignal = useMemo(
    () => (displayIso ? signals.find((s) => s.iso === displayIso) ?? null : null),
    [signals, displayIso],
  );

  const activity = useMemo(() => {
    const last = responses.slice(-10).reverse();
    return last.map((r) => {
      const country = LATAM_COUNTRIES.find((c) => c.iso === r.countryIso)?.country ?? r.countryIso;
      const source = SOURCE_LABELS[r.source];
      return `${country} · ${source} · ${timeAgo(r.createdAt, now)}`;
    });
  }, [responses, now]);

  const onSubmitOptimistic = useCallback(
    (r: LiveResponse) => {
      append(r);
      setSelectedIso(r.countryIso);
      lastServerTs.current = Math.max(lastServerTs.current, r.createdAt);
    },
    [append],
  );

  return (
    <div className={pageStyles.root}>
      <div className={pageStyles.inner}>
        <header className={pageStyles.topBar}>
          <div>
            <p className={pageStyles.eyebrow}>Consulta · Observatorio regional · en vivo</p>
            <h1 className={pageStyles.title}>Mapa vivo de cómo se informa la región</h1>
            <p className={pageStyles.lead}>
              Cada nodo es un país. Color = fuente dominante reciente, tamaño = volumen en ventana de 5 min,
              pulso = recencia. Las curvas conectan países activos con hubs por tipo de fuente. Datos
              simulados + tu envío vía POST in‑memory (máx. 300 eventos).
            </p>
          </div>
        </header>

        <div className={pageStyles.grid}>
          <div className={pageStyles.mapCell}>
            <LiveLatamMap
              signals={signals}
              flows={flows}
              now={now}
              selectedIso={selectedIso}
              hoveredIso={hoveredIso}
              onHover={setHoveredIso}
              onSelect={setSelectedIso}
            />
            <span className={pageStyles.canvasHint} aria-hidden>
              América Latina y el Caribe · vista de sala de monitoreo
            </span>
          </div>

          <div className={pageStyles.sideStack}>
            <section className={pageStyles.panel} aria-labelledby="cv-country-heading">
              <h2 id="cv-country-heading" className={pageStyles.panelTitle}>
                Información por país
              </h2>
              <CountryDetailPanel signal={displaySignal} />
            </section>

            <section className={pageStyles.panel} aria-labelledby="cv-insights-heading">
              <h2 id="cv-insights-heading" className={pageStyles.panelTitle}>
                Lectura en tiempo real
              </h2>
              <RecentInsights lines={insights} activity={activity} />
            </section>

            <section className={pageStyles.panel} aria-labelledby="cv-flows-heading">
              <h2 id="cv-flows-heading" className={pageStyles.panelTitle}>
                Flujos y volumen
              </h2>
              <LiveSignalsPanel volumeBySource={vol} />
              <div className={pageStyles.legendSlot}>
                <SourceFlowsLegend />
              </div>
            </section>
          </div>
        </div>

        <section className={pageStyles.participation} aria-labelledby="cv-part-heading">
          <h2 id="cv-part-heading">Suma tu experiencia</h2>
          <p>
            Cuatro campos. Al enviar, la señal entra de inmediato al mapa (optimistic UI) y se persiste en el
            store del servidor cuando la API está disponible.
          </p>
          <QuickResponseForm
            key={selectedIso ?? "default"}
            defaultIso={selectedIso ?? "CL"}
            onSubmitOptimistic={onSubmitOptimistic}
          />
        </section>
      </div>
    </div>
  );
}
