"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DonutGlyph } from "./DonutGlyph";
import styles from "./ConsultaObservatorioLive.module.css";
import {
  addFakeResponse,
  agg,
  generateInsights,
  liveFinding,
  type MockResponseRow,
  OBSERVATORIO_COUNTRIES,
  QDEFS,
  scaleColor,
  seedObservatorioResponses,
} from "@/lib/consulta-observatorio/model";

function formatAge(seconds: number): string {
  if (seconds < 60) return `hace ${seconds}s`;
  if (seconds < 3600) return `hace ${Math.round(seconds / 60)}min`;
  return `hace ${Math.round(seconds / 3600)}h`;
}

export function ConsultaObservatorioLive() {
  const [responses, setResponses] = useState<MockResponseRow[]>(() => seedObservatorioResponses());
  const [selIso, setSelIso] = useState<string | null>(null);
  const [selQ, setSelQ] = useState(0);
  const [nowTs, setNowTs] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNowTs(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setResponses((prev) => addFakeResponse(prev));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const qDef = QDEFS[selQ];
  const finding = useMemo(() => liveFinding(responses, selQ, nowTs), [responses, selQ, nowTs]);
  const insights = useMemo(() => generateInsights(responses, selQ, nowTs), [responses, selQ, nowTs]);

  const setQuestion = useCallback((i: number) => {
    setSelQ(Math.max(0, Math.min(11, i)));
  }, []);

  const toggleCountry = useCallback((iso: string) => {
    setSelIso((prev) => (prev === iso ? null : iso));
  }, []);

  const activeCountries = useMemo(
    () => OBSERVATORIO_COUNTRIES.filter((c) => responses.some((r) => r.iso === c.iso)).length,
    [responses],
  );
  const recentSignals = useMemo(() => {
    const cut = nowTs - 5 * 60 * 1000;
    return responses.filter((r) => r.ts >= cut).length;
  }, [responses, nowTs]);
  const lastDiffSec = useMemo(() => {
    if (!responses.length) return null;
    return Math.round((nowTs - Math.max(...responses.map((r) => r.ts))) / 1000);
  }, [responses, nowTs]);

  const tickerItems = useMemo(() => {
    const recent = responses.slice(-20).reverse();
    return recent.map((r) => {
      const c = OBSERVATORIO_COUNTRIES.find((x) => x.iso === r.iso);
      const d0 = agg(responses, r.iso, 0, nowTs);
      const dom =
        d0.tp === "multi" && d0.cTotal > 0 && QDEFS[0].t === "multi"
          ? QDEFS[0].slots[d0.domIdx]
          : null;
      const td = Math.round((nowTs - r.ts) / 1000);
      const ts = formatAge(td);
      const col = dom ? dom.c : "rgba(5,242,242,0.5)";
      return { key: `${r.iso}-${r.ts}`, name: c?.name ?? r.iso, ts, col, domLabel: dom?.l };
    });
  }, [responses, nowTs]);

  const tickerDup = useMemo(() => [...tickerItems, ...tickerItems], [tickerItems]);

  return (
    <div className={styles.wrap}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <div className={styles.kicker}>Precisar · América Latina y el Caribe</div>
            <div className={styles.title}>¿Cómo te informas hoy? · Observatorio en vivo</div>
          </div>
          <span className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden />
            En tiempo real
          </span>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroRow}>
            <button
              type="button"
              className={styles.navBtn}
              style={{ opacity: selQ === 0 ? 0.3 : 1 }}
              disabled={selQ === 0}
              onClick={() => setQuestion(selQ - 1)}
              aria-label="Pregunta anterior"
            >
              ←
            </button>
            <div className={styles.heroMain}>
              <div className={styles.heroMeta}>
                <span className={styles.qnum}>Pregunta {selQ + 1} de 12</span>
                <div className={styles.pills}>
                  {QDEFS.map((q, i) => {
                    const dim = q.t === "text" || q.t === "demo";
                    const active = i === selQ;
                    return (
                      <button
                        key={q.s}
                        type="button"
                        className={`${styles.pill} ${active ? styles.pillActive : ""} ${dim && !active ? styles.pillDim : ""}`}
                        onClick={() => setQuestion(i)}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className={styles.qtext}>{qDef.f}</p>
              <p className={styles.qwhy}>{qDef.why}</p>
              <div className={styles.liveFinding}>
                {finding ? (
                  <>
                    <span
                      className={styles.liveFindingDot}
                      style={{ background: finding.c }}
                      aria-hidden
                    />
                    <span style={{ color: finding.c, fontWeight: 500 }}>{finding.text}</span>
                  </>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              className={styles.navBtn}
              style={{ opacity: selQ === 11 ? 0.3 : 1 }}
              disabled={selQ === 11}
              onClick={() => setQuestion(selQ + 1)}
              aria-label="Pregunta siguiente"
            >
              →
            </button>
          </div>
        </section>

        <div className={styles.body}>
          <div className={styles.mapCol}>
            <svg className={styles.mapSvg} viewBox="0 0 440 318" aria-label="Mapa de respuestas por país">
              <defs>
                <pattern id="obsDots" width={26} height={26} patternUnits="userSpaceOnUse">
                  <circle cx={13} cy={13} r={0.65} fill="rgba(5,242,242,0.09)" />
                </pattern>
              </defs>
              <rect width={440} height={318} fill="#021740" />
              <rect width={440} height={318} fill="url(#obsDots)" />
              <Legend selQ={selQ} />
              <g>
                {OBSERVATORIO_COUNTRIES.map((c) => (
                  <MapCountry
                    key={c.iso}
                    c={c}
                    selQ={selQ}
                    selIso={selIso}
                    responses={responses}
                    nowTs={nowTs}
                    onToggle={() => toggleCountry(c.iso)}
                  />
                ))}
              </g>
            </svg>
          </div>
          <aside className={styles.panel}>
            <SidePanel
              selIso={selIso}
              selQ={selQ}
              responses={responses}
              nowTs={nowTs}
              insights={insights}
            />
          </aside>
        </div>

        <div className={styles.tickerWrap}>
          <div className={styles.tickerLabel}>Señales</div>
          <div className={styles.tickerTrack}>
            {tickerItems.length > 0 ? (
              <div className={styles.tickerInner}>
                {tickerDup.map((it, idx) => (
                  <span key={`${it.key}-${idx}`} className={styles.tickerItem}>
                    <span style={{ color: it.col, fontWeight: 500 }}>{it.name}</span>
                    {" · "}
                    {it.ts}
                    {it.domLabel ? ` · ${it.domLabel}` : ""}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <footer className={styles.insightsBar}>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>
            Países activos: <strong style={{ color: "#fff" }}>{activeCountries}</strong>
          </span>
          <span className={styles.insightsSep}>·</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>
            Señales recientes: <strong style={{ color: "#05F2F2" }}>{recentSignals}</strong>
          </span>
          {lastDiffSec !== null ? (
            <>
              <span className={styles.insightsSep}>·</span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>
                Última:{" "}
                <strong style={{ color: "#F2A007" }}>
                  {lastDiffSec < 60 ? `hace ${lastDiffSec}s` : `hace ${Math.round(lastDiffSec / 60)}min`}
                </strong>
              </span>
            </>
          ) : null}
          <span className={styles.insightsSep}>·</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>
            Total: <strong style={{ color: "#fff" }}>{responses.length}</strong>
          </span>
        </footer>
      </div>
    </div>
  );
}

function Legend({ selQ }: { selQ: number }) {
  const q = QDEFS[selQ];
  if (q.t === "scale") {
    const items = [
      { c: "#F2A007", l: "1★ Nada" },
      { c: "#e879f9", l: "2★ Poca" },
      { c: "#0596A6", l: "3★ Intermedia" },
      { c: "#05F2F2", l: "4–5★ Alta" },
    ];
    const lx = [28, 108, 198, 308];
    return (
      <g>
        {items.map((it, i) => (
          <g key={it.l}>
            <circle cx={lx[i]} cy={14} r={4.5} fill={it.c} />
            <text
              x={lx[i] + 9}
              y={14}
              dominantBaseline="central"
              style={{ fontSize: 9, fontFamily: "sans-serif", fill: it.c, opacity: 0.9 }}
            >
              {it.l}
            </text>
          </g>
        ))}
      </g>
    );
  }
  if (q.t === "text" || q.t === "demo") {
    return (
      <text
        x={220}
        y={14}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 9, fontFamily: "sans-serif", fill: "rgba(5,242,242,0.35)" }}
      >
        Haz clic en un país para leer sus respuestas
      </text>
    );
  }
  if (q.t !== "multi") return null;
  const lx = [20, 106, 192, 278, 364];
  return (
    <g>
      {q.slots.map((s, i) => (
        <g key={s.l}>
          <circle cx={lx[i]} cy={14} r={4.5} fill={s.c} />
          <text
            x={lx[i] + 9}
            y={14}
            dominantBaseline="central"
            style={{ fontSize: 8.5, fontFamily: "sans-serif", fill: s.c, opacity: 0.85 }}
          >
            {s.l}
          </text>
        </g>
      ))}
    </g>
  );
}

function MapCountry({
  c,
  selQ,
  selIso,
  responses,
  nowTs,
  onToggle,
}: {
  c: (typeof OBSERVATORIO_COUNTRIES)[number];
  selQ: number;
  selIso: string | null;
  responses: MockResponseRow[];
  nowTs: number;
  onToggle: () => void;
}) {
  const qDef = QDEFS[selQ];
  const d = agg(responses, c.iso, selQ, nowTs);
  const isSel = c.iso === selIso;
  let domC = "#05F2F2";
  if (d.tp === "multi" && d.cTotal > 0) {
    if (qDef.t === "multi") domC = qDef.slots[d.domIdx].c;
  } else if (d.tp === "scale" && d.avg > 0) {
    domC = scaleColor(d.avg);
  }

  const centerLabel =
    d.tp === "scale" && d.avg > 0 ? d.avg.toFixed(1) : c.iso;
  const centerColor = d.total > 0 ? domC : "rgba(5,242,242,0.22)";

  return (
    <g
      style={{ cursor: "pointer" }}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      role="button"
      tabIndex={0}
    >
      {d.recent > 0 ? (
        <circle cx={c.x} cy={c.y} r={27} fill="none" stroke={domC} strokeWidth={1}>
          <animate attributeName="r" from="27" to="44" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.55" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
      ) : null}
      {isSel ? (
        <circle
          cx={c.x}
          cy={c.y}
          r={33}
          fill="none"
          stroke={domC}
          strokeWidth={1.5}
          strokeDasharray="5 4"
          opacity={0.45}
        />
      ) : null}
      <DonutGlyph cx={c.x} cy={c.y} d={d} qDef={qDef} />
      <circle cx={c.x} cy={c.y} r={13.5} fill="#021740" />
      <text
        x={c.x}
        y={c.y}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: 8.5,
          fontFamily: "sans-serif",
          fontWeight: 700,
          fill: d.tp === "scale" && d.avg > 0 ? domC : centerColor,
          pointerEvents: "none",
        }}
      >
        {centerLabel}
      </text>
      {d.total > 0 ? (
        <text
          x={c.x}
          y={c.y - 33}
          textAnchor="middle"
          style={{
            fontSize: 9.5,
            fontFamily: "sans-serif",
            fontWeight: 600,
            fill: domC,
            pointerEvents: "none",
          }}
        >
          {d.total}
        </text>
      ) : null}
      <text
        x={c.x}
        y={c.y + 35}
        textAnchor="middle"
        style={{
          fontSize: 8.5,
          fontFamily: "sans-serif",
          fill: d.total > 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)",
          pointerEvents: "none",
        }}
      >
        {c.name}
      </text>
      <title>{`${c.name} · ${d.total} respuestas`}</title>
    </g>
  );
}

function SidePanel({
  selIso,
  selQ,
  responses,
  nowTs,
  insights,
}: {
  selIso: string | null;
  selQ: number;
  responses: MockResponseRow[];
  nowTs: number;
  insights: ReturnType<typeof generateInsights>;
}) {
  if (!selIso) {
    return (
      <div>
        <div className={styles.panelSectionLabel}>Hallazgos · p{selQ + 1}</div>
        <div style={{ marginBottom: 16 }}>
          {insights.length ? (
            insights.map((i, idx) => (
              <div key={`${idx}-${i.t.slice(0, 24)}`} className={styles.insightRow}>
                <span className={styles.insightDot} style={{ background: i.c }} />
                <span className={styles.insightText}>{i.t}</span>
              </div>
            ))
          ) : (
            <div className={styles.accumulating}>Acumulando datos…</div>
          )}
        </div>
        <div className={styles.panelHint}>
          <p className={styles.panelHintText}>
            Haz clic en cualquier país para ver su perfil completo de las 12 preguntas.
          </p>
          <Link href="/consulta" className={styles.ctaAmber}>
            Suma tu voz al mapa ↗
          </Link>
        </div>
      </div>
    );
  }

  const country = OBSERVATORIO_COUNTRIES.find((x) => x.iso === selIso);
  const rows = responses.filter((r) => r.iso === selIso);
  const totalRows = rows.length;

  if (!totalRows) {
    return (
      <div className={styles.emptyCountry}>
        Sin respuestas
        <br />
        aún en {country?.name}
      </div>
    );
  }

  const lastTs = Math.max(...rows.map((r) => r.ts));
  const td = Math.round((nowTs - lastTs) / 1000);
  const ageStr = td < 60 ? `hace ${td}s` : `hace ${Math.round(td / 60)}min`;

  return (
    <div className={styles.panelAnimate}>
      <div className={styles.countryHead}>
        <div className={styles.countryName}>{country?.name}</div>
        <div className={styles.countryMeta}>
          {totalRows} respuestas · {ageStr}
        </div>
      </div>
      <div className={styles.profileLabel}>Perfil completo · 12 preguntas</div>
      <div style={{ marginBottom: 14 }}>
        {QDEFS.map((q, qi) => {
          const isActive = qi === selQ;
          const rowClass = `${styles.profileRow} ${isActive ? styles.profileRowActive : ""}`;
          if (q.t === "text" || q.t === "demo") {
            return (
              <div key={q.s} className={rowClass} style={{ alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.28)" }}>
                  p{qi + 1} {q.s}
                </span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>
                  {q.t === "text" ? "texto" : "datos"}
                </span>
              </div>
            );
          }
          const d = agg(responses, selIso, qi, nowTs);
          if (d.tp === "scale") {
            return (
              <div key={q.s} className={rowClass} style={{ alignItems: "center" }}>
                <span
                  style={{
                    fontSize: 10,
                    color: `rgba(255,255,255,${isActive ? 0.6 : 0.35})`,
                  }}
                >
                  p{qi + 1} {q.s}
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, color: scaleColor(d.avg) }}>
                  {d.avg > 0 ? `${d.avg.toFixed(1)}★` : "—"}
                </span>
              </div>
            );
          }
          if (d.tp !== "multi" || !d.cTotal) {
            return (
              <div key={q.s} className={rowClass}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.22)" }}>
                  p{qi + 1} {q.s}
                </span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)" }}>—</span>
              </div>
            );
          }
          if (q.t !== "multi") return null;
          const dom = q.slots[d.domIdx];
          const pct = Math.round((d.counts[d.domIdx] / d.cTotal) * 100);
          return (
            <div key={q.s} className={rowClass} style={{ alignItems: "center" }}>
              <span
                style={{
                  fontSize: 10,
                  color: `rgba(255,255,255,${isActive ? 0.6 : 0.35})`,
                }}
              >
                p{qi + 1} {q.s}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 4, maxWidth: 110 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: dom.c,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.55)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {dom.l} {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <Link href="/consulta" className={styles.ctaCyan}>
        Agregar mi respuesta ↗
      </Link>
    </div>
  );
}
