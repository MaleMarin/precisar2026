"use client";

import { useCallback, useEffect, useRef } from "react";
import { projectUnit, unitToCanvas } from "@/lib/consulta/liveMapProjection";
import { countryByIso } from "@/lib/consulta-viva/countries";
import { sourceColorRgb } from "@/lib/consulta-viva/sourceColors";
import type { CountrySignal, FlowEdge, SourceType } from "@/lib/consulta-viva/types";
import styles from "./LiveLatamMap.module.css";

const PAD = 36;

const HUB_X: Record<SourceType, number> = {
  whatsapp: 0.17,
  social: 0.345,
  tv_radio: 0.52,
  news: 0.695,
  ai: 0.87,
};

type Props = {
  signals: CountrySignal[];
  flows: FlowEdge[];
  now: number;
  selectedIso: string | null;
  hoveredIso: string | null;
  onHover: (iso: string | null) => void;
  onSelect: (iso: string | null) => void;
};

type NodeLayout = { iso: string; x: number; y: number; r: number };

function hubForSource(source: SourceType, w: number, h: number): { x: number; y: number } {
  return {
    x: HUB_X[source] * w,
    y: h - PAD * 0.85,
  };
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function LiveLatamMap({
  signals,
  flows,
  now,
  selectedIso,
  hoveredIso,
  onHover,
  onSelect,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layoutRef = useRef<NodeLayout[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef(0);
  const signalsRef = useRef(signals);
  const flowsRef = useRef(flows);
  const nowRef = useRef(now);
  const selectedRef = useRef(selectedIso);
  const hoveredRef = useRef(hoveredIso);

  useEffect(() => {
    signalsRef.current = signals;
  }, [signals]);
  useEffect(() => {
    flowsRef.current = flows;
  }, [flows]);
  useEffect(() => {
    nowRef.current = now;
  }, [now]);
  useEffect(() => {
    selectedRef.current = selectedIso;
  }, [selectedIso]);
  useEffect(() => {
    hoveredRef.current = hoveredIso;
  }, [hoveredIso]);

  const pickIso = useCallback((cx: number, cy: number): string | null => {
    const nodes = layoutRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i]!;
      const dx = cx - n.x;
      const dy = cy - n.y;
      if (dx * dx + dy * dy <= n.r * n.r) return n.iso;
    }
    return null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      sizeRef.current = { w, h };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    requestAnimationFrame(() => requestAnimationFrame(resize));
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      onHover(pickIso(x, y));
    };
    const onLeave = () => onHover(null);
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const iso = pickIso(x, y);
      onSelect(iso);
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    const touchXY = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (!touch) return { x: 0, y: 0 };
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    };
    const onTouchStart = (e: TouchEvent) => {
      const { x, y } = touchXY(e);
      const iso = pickIso(x, y);
      if (iso) {
        e.preventDefault();
        onSelect(iso);
        onHover(iso);
      }
    };
    const onTouchEnd = () => onHover(null);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    const t0 = performance.now();
    const draw = (frameNow: number) => {
      const { w, h } = sizeRef.current;
      const sigs = signalsRef.current;
      const flowList = flowsRef.current;
      const clock = nowRef.current;
      const sel = selectedRef.current;
      const hov = hoveredRef.current;
      const t = frameNow - t0;

      if (w < 4 || h < 4) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = "#03050a";
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.strokeStyle = "rgba(120, 160, 220, 0.06)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 8; i++) {
        const gx = (i / 8) * w;
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let j = 0; j <= 5; j++) {
        const gy = (j / 5) * h;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }
      ctx.restore();

      const maxRecent = Math.max(...sigs.map((s) => s.responsesRecent), 1);

      /* Tendencia: enlaces finos entre países al alza y misma fuente dominante */
      const trendNodes = sigs
        .filter((s) => s.trend === "up" && !!s.dominantSource && s.responsesRecent >= 3)
        .map((s) => {
          const meta = countryByIso.get(s.iso);
          if (!meta) return null;
          const { ux, uy } = projectUnit(meta.lat, meta.lng);
          const { x, y } = unitToCanvas(ux, uy, w, h, PAD);
          return { iso: s.iso, x, y, source: s.dominantSource as SourceType };
        })
        .filter(Boolean) as Array<{ iso: string; x: number; y: number; source: SourceType }>;

      for (let i = 0; i < trendNodes.length; i++) {
        for (let j = i + 1; j < trendNodes.length; j++) {
          const A = trendNodes[i]!;
          const B = trendNodes[j]!;
          if (A.source !== B.source) continue;
          const d = Math.hypot(A.x - B.x, A.y - B.y);
          if (d > 140) continue;
          ctx.save();
          ctx.strokeStyle = "rgba(255,255,255,0.14)";
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(A.x, A.y);
          ctx.lineTo(B.x, B.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      /* Flujos hacia hubs por fuente (volumen reciente) */
      for (const f of flowList) {
        const meta = countryByIso.get(f.fromIso);
        if (!meta) continue;
        const { ux, uy } = projectUnit(meta.lat, meta.lng);
        const { x: cx, y: cy } = unitToCanvas(ux, uy, w, h, PAD);
        const emit = hubForSource(f.source, w, h);
        const [r, g, b] = sourceColorRgb(f.source);
        const lineW = clamp(1.2 + f.value * 0.75, 1.2, 4.8);
        const recentScore =
          f.lastSeenAt == null ? 0 : clamp(1 - (clock - f.lastSeenAt) / (5 * 60 * 1000), 0, 1);
        const alpha = 0.12 + recentScore * 0.38;
        const dashPhase = (t * 0.08) % 24;
        ctx.save();
        ctx.strokeStyle = `rgba(${r},${g},${b},${recentScore < 0.22 ? alpha * 0.45 : alpha})`;
        ctx.lineWidth = lineW;
        ctx.setLineDash([10, 10]);
        ctx.lineDashOffset = -dashPhase;
        ctx.beginPath();
        ctx.moveTo(emit.x, emit.y);
        const mx = (emit.x + cx) * 0.52;
        const my = (emit.y + cy) * 0.48 + h * 0.06;
        ctx.quadraticCurveTo(mx, my, cx, cy);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      const nodes: NodeLayout[] = [];
      for (const s of sigs) {
        const meta = countryByIso.get(s.iso);
        if (!meta) continue;
        const { ux, uy } = projectUnit(meta.lat, meta.lng);
        const { x: cx, y: cy } = unitToCanvas(ux, uy, w, h, PAD);
        const r = Math.max(5.5, 6 + 22 * Math.sqrt(s.responsesRecent / maxRecent));
        nodes.push({ iso: s.iso, x: cx, y: cy, r });
      }
      layoutRef.current = nodes;

      for (const s of sigs) {
        const meta = countryByIso.get(s.iso);
        if (!meta) continue;
        const { ux, uy } = projectUnit(meta.lat, meta.lng);
        const { x: cx, y: cy } = unitToCanvas(ux, uy, w, h, PAD);
        const r = Math.max(5.5, 6 + 22 * Math.sqrt(s.responsesRecent / maxRecent));
        const [rC, gC, bC] = s.dominantSource
          ? sourceColorRgb(s.dominantSource)
          : [110, 118, 130];
        const isSel = sel === s.iso;
        const isHov = hov === s.iso;
        const last = s.lastSeenAt;
        const pulseScore =
          last == null ? 0 : clamp(1 - (clock - last) / (5 * 60 * 1000), 0, 1);
        const pulse = 0.1 + pulseScore * 0.42 * (0.5 + 0.5 * Math.sin(t * 0.004 + s.iso.charCodeAt(0)));

        if (pulseScore > 0.06) {
          ctx.save();
          ctx.strokeStyle = `rgba(${rC},${gC},${bC},${pulse * 0.88})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, r + 4 + pulse * 6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        const grd = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.15, cx, cy, r);
        grd.addColorStop(0, `rgba(${Math.min(255, rC + 40)},${Math.min(255, gC + 40)},${Math.min(255, bC + 40)},0.95)`);
        grd.addColorStop(1, `rgba(${rC},${gC},${bC},0.55)`);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.strokeStyle = isSel
          ? "rgba(255,255,255,0.95)"
          : isHov
            ? "rgba(255,255,255,0.55)"
            : "rgba(255,255,255,0.2)";
        ctx.lineWidth = isSel ? 2.2 : 1.2;
        ctx.stroke();

        if (s.trend === "up") {
          ctx.beginPath();
          ctx.arc(cx, cy, r + 6, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255,255,255,0.22)";
          ctx.lineWidth = 1.3;
          ctx.stroke();
        } else if (s.trend === "down") {
          ctx.beginPath();
          ctx.arc(cx, cy, r + 6, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255,255,255,0.12)";
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        ctx.fillStyle = "rgba(8,10,16,0.88)";
        ctx.font = `${Math.max(8, Math.min(11, r * 0.42))}px var(--font-mono-family), ui-monospace, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.iso, cx, cy);
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [onHover, onSelect, pickIso]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-label="Mapa regional de señales" />;
}
