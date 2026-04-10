import type { ReactNode } from "react";
import type { AggResult, QuestionDef } from "@/lib/consulta-observatorio/model";
import { scaleColor } from "@/lib/consulta-observatorio/model";

const STROKE = 8;
const GAP_DEG = 2.5;

type Props = {
  cx: number;
  cy: number;
  /** Radio al centro del trazo del anillo (px). */
  r: number;
  d: AggResult;
  qDef: QuestionDef;
};

export function DonutGlyph({ cx, cy, r, d, qDef }: Props) {
  if (d.tp === "scale") {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={STROKE}
        />
        {d.avg > 0 ? (
          (() => {
            const pct = (d.avg - 1) / 4;
            const arcDeg = pct * 340;
            const a1 = (-100 * Math.PI) / 180;
            const a2 = ((-100 + arcDeg) * Math.PI) / 180;
            const large = arcDeg > 180 ? 1 : 0;
            const x1 = cx + r * Math.cos(a1);
            const y1 = cy + r * Math.sin(a1);
            const x2 = cx + r * Math.cos(a2);
            const y2 = cy + r * Math.sin(a2);
            return (
              <path
                d={`M${x1},${y1} A${r},${r},0,${large},1,${x2},${y2}`}
                fill="none"
                stroke={scaleColor(d.avg)}
                strokeWidth={STROKE}
                strokeLinecap="round"
              />
            );
          })()
        ) : null}
      </g>
    );
  }

  if (d.tp === "text" || d.tp === "demo") {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(21,93,132,0.18)"
        strokeWidth={STROKE}
        strokeDasharray="4 4"
      />
    );
  }

  if (d.tp !== "multi") {
    return (
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(21,93,132,0.1)" strokeWidth={STROKE} />
    );
  }

  if (qDef.t !== "multi") return null;

  if (!d.cTotal) {
    return (
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(21,93,132,0.1)" strokeWidth={STROKE} />
    );
  }

  const active = qDef.slots.map((s, i) => ({ ...s, cnt: d.counts[i] ?? 0 })).filter((s) => s.cnt > 0);

  if (active.length === 1) {
    const only = active[0];
    return (
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={only.c} strokeWidth={STROKE} />
    );
  }

  const totDeg = 360 - GAP_DEG * active.length;
  let angle = -90;
  const paths: ReactNode[] = [];
  active.forEach((s) => {
    const arcDeg = (s.cnt / d.cTotal) * totDeg;
    const a1 = ((angle + GAP_DEG / 2) * Math.PI) / 180;
    const a2 = ((angle + GAP_DEG / 2 + arcDeg) * Math.PI) / 180;
    const large = arcDeg > 180 ? 1 : 0;
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2);
    const y2 = cy + r * Math.sin(a2);
    paths.push(
      <path
        key={`${s.l}-${angle}`}
        d={`M${x1},${y1} A${r},${r},0,${large},1,${x2},${y2}`}
        fill="none"
        stroke={s.c}
        strokeWidth={STROKE}
        strokeLinecap="butt"
      />,
    );
    angle += arcDeg + GAP_DEG;
  });
  return <g>{paths}</g>;
}
