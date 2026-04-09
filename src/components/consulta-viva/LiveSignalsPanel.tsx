"use client";

type Props = {
  insights: string[];
  recentActivity: string[];
};

export function LiveSignalsPanel({ insights, recentActivity }: Props) {
  return (
    <div className="grid gap-4">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
        <div className="mb-1 text-xs uppercase tracking-[0.22em] text-slate-400">Lectura instantánea</div>
        <p className="mb-3 text-sm text-slate-500">Qué está pasando en la región, en pocas frases.</p>
        <div className="space-y-3">
          {insights.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
        <div className="mb-1 text-xs uppercase tracking-[0.22em] text-slate-400">Actividad reciente</div>
        <p className="mb-3 text-sm text-slate-500">Últimas respuestas que entraron al sistema.</p>
        <div className="space-y-2">
          {recentActivity.slice(0, 6).map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
