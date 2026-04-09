"use client";

import { useCallback, useEffect, useRef } from "react";
import { countryByIso, projectUnit, unitToCanvas } from "@/lib/consulta-viva/countries";
import { sourceColorRgb } from "@/lib/consulta-viva/aggregations";
import type { CountrySignal, FlowEdge, SourceType } from "@/lib/consulta-viva/types";
import styles from "./LiveLatamMap.module.css";

const PAD = 44;

/**
 * Silueta esquemática en coordenadas normalizadas (misma proyección que los países).
 * Forma reconocible: México → Centroamérica → Caribe / norte de Sudamérica → Brasil → Cono sur → Pacífico.
 */
const LAND_RING: [number, number][] = [
  [0.06, 0.28],
  [0.18, 0.11],
  [0.36, 0.13],
  [0.46, 0.22],
  [0.54, 0.2],
  [0.66, 0.18],
  [0.82, 0.22],
  [0.93, 0.36],
  [0.9, 0.55],
  [0.78, 0.72],
  [0.55, 0.82],
  [0.38, 0.74],
  [0.22, 0.52],
  [0.1, 0.38],
];

type Props = {
  signals: CountrySignal[];
  flows: FlowEdge[];
  selectedIso: string | null;
  hoveredIso: string | null;
  activeCountryName: string | null;
  onHover: (iso: string | null) => void;
  onSelect: (iso: string | null) => void;
};

type NodeLayout = { iso: string; x: number; y: number; r: number };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function drawLandmass(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  pad: number,
) {
  ctx.beginPath();
  for (let i = 0; i < LAND_RING.length; i++) {
    const [ux, uy] = LAND_RING[i]!;
    const { x, y } = unitToCanvas(ux, uy, w, h, pad);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(32, 48, 72, 0.92)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

export function LiveLatamMap({
  signals,
  flows,
  selectedIso,
  hoveredIso,
  activeCountryName,
  onHover,
  onSelect,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layoutRef = useRef<NodeLayout[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef(0);
  const signalsRef = useRef(signals);
  const flowsRef = useRef(flows);
  const selectedRef = useRef(selectedIso);
  const hoveredRef = useRef(hoveredIso);

  useEffect(() => {
    signalsRef.current = signals;
  }, [signals]);
  useEffect(() => {
    flowsRef.current = flows;
  }, [flows]);
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
      const hitR = Math.max(n.r, 10);
      if (dx * dx + dy * dy <= hitR * hitR) return n.iso;
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
      onHover(pickIso(e.clientX - rect.left, e.clientY - rect.top));
    };
    const onLeave = () => onHover(null);
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      onSelect(pickIso(e.clientX - rect.left, e.clientY - rect.top));
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

    const draw = () => {
      const { w, h } = sizeRef.current;
      const sigs = signalsRef.current;
      const flowList = flowsRef.current;
      const sel = selectedRef.current;
      const hov = hoveredRef.current;

      if (w < 4 || h < 4) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = "#070d14";
      ctx.fillRect(0, 0, w, h);

      drawLandmass(ctx, w, h, PAD);

      const maxTotal = Math.max(...sigs.map((s) => s.responsesTotal), 1);
      const sinkX = w * 0.5;
      const sinkY = h - PAD * 0.65;

      for (const f of flowList) {
        const meta = countryByIso.get(f.fromIso);
        if (!meta) continue;
        const { ux, uy } = projectUnit(meta.lat, meta.lng);
        const { x: cx, y: cy } = unitToCanvas(ux, uy, w, h, PAD);
        const [r, g, b] = sourceColorRgb(f.source);
        const alpha = clamp(0.06 + f.pulseIntensity * 0.14, 0.05, 0.22);
        ctx.save();
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        const mx = (cx + sinkX) * 0.5;
        const my = (cy + sinkY) * 0.55 + h * 0.08;
        ctx.quadraticCurveTo(mx, my, sinkX, sinkY);
        ctx.stroke();
        ctx.restore();
      }

      const nodes: NodeLayout[] = [];
      for (const s of sigs) {
        const meta = countryByIso.get(s.iso);
        if (!meta) continue;
        const { ux, uy } = projectUnit(meta.lat, meta.lng);
        const { x: cx, y: cy } = unitToCanvas(ux, uy, w, h, PAD);
        const base =
          s.responsesTotal > 0
            ? Math.max(6, 7 + 20 * Math.sqrt(s.responsesTotal / maxTotal))
            : 4.5;
        const r = sel === s.iso ? base * 1.18 : base;
        nodes.push({ iso: s.iso, x: cx, y: cy, r });
      }
      layoutRef.current = nodes;

      for (const s of sigs) {
        const meta = countryByIso.get(s.iso);
        if (!meta) continue;
        const { ux, uy } = projectUnit(meta.lat, meta.lng);
        const { x: cx, y: cy } = unitToCanvas(ux, uy, w, h, PAD);
        const base =
          s.responsesTotal > 0
            ? Math.max(6, 7 + 20 * Math.sqrt(s.responsesTotal / maxTotal))
            : 4.5;
        const r = sel === s.iso ? base * 1.18 : base;
        const [rC, gC, bC] = s.dominantSource
          ? sourceColorRgb(s.dominantSource)
          : [130, 140, 158];
        const isSel = sel === s.iso;
        const isHov = hov === s.iso;
        const pulse = s.pulseIntensity;

        if (pulse > 0.05) {
          ctx.save();
          ctx.strokeStyle = `rgba(${rC},${gC},${bC},${0.12 + pulse * 0.35})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, r + 5 + pulse * 6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        if (isSel) {
          ctx.save();
          ctx.strokeStyle = "rgba(255,255,255,0.95)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cx, cy, r + 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle =
          s.responsesTotal > 0 ? `rgba(${rC},${gC},${bC},0.82)` : "rgba(100,110,128,0.35)";
        ctx.fill();
        ctx.strokeStyle = isSel
          ? "rgba(255,255,255,0.95)"
          : isHov
            ? "rgba(255,255,255,0.55)"
            : "rgba(255,255,255,0.2)";
        ctx.lineWidth = isSel ? 2.4 : 1.1;
        ctx.stroke();

        ctx.fillStyle = s.responsesTotal > 0 ? "rgba(6,8,12,0.88)" : "rgba(255,255,255,0.45)";
        ctx.font = `${Math.max(7, Math.min(10, r * 0.38))}px var(--font-mono-family), ui-monospace, monospace`;
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

  return (
    <div className={styles.stage}>
      <canvas ref={canvasRef} className={styles.canvas} aria-label="Mapa de América Latina y el Caribe" />
      {activeCountryName ? (
        <div className={styles.activeLabel}>
          <span className={styles.activeLabelMuted}>País seleccionado</span>
          <span className={styles.activeLabelName}>{activeCountryName}</span>
        </div>
      ) : null}
    </div>
  );
}
