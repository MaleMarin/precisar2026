"use client";

import type { ReactNode } from "react";
import { CONCERN_LABELS, SOURCE_LABELS } from "@/lib/consulta-viva/aggregations";
import type { CountrySignal } from "@/lib/consulta-viva/types";

type Props = {
  signal: CountrySignal | null;
};

export function CountryDetailPanel({ signal }: Props) {
  if (!signal) {
    return (
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 text-slate-500 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
        Tocá un país en el mapa para ver cómo se informa ahí.
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
      <div className="mb-4 text-xs uppercase tracking-[0.22em] text-slate-400">País activo</div>
      <h3 className="mb-1 text-2xl font-semibold tracking-tight text-slate-900">{signal.name}</h3>
      <p className="mb-4 text-sm text-slate-500">Lectura acumulada en esta sesión y actividad reciente.</p>

      <div className="grid gap-3">
        <Row label="Canal dominante">
          {signal.dominantSource ? SOURCE_LABELS[signal.dominantSource] : "Todavía no alcanza para una lectura clara"}
        </Row>

        <Row label="Confianza promedio">
          {signal.avgTrust != null ? signal.avgTrust.toFixed(1) : "—"}
        </Row>

        <Row label="Principal preocupación">
          {signal.topConcern ? CONCERN_LABELS[signal.topConcern] : "—"}
        </Row>

        <Row label="Respuestas recientes">{signal.responsesRecent}</Row>
        <Row label="Respuestas totales">{signal.responsesTotal}</Row>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-medium text-slate-800">{children}</div>
    </div>
  );
}
