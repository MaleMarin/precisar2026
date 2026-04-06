"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * Misma ganancia en X e Y por frame → diagonal hacia el objetivo (rincón ↔ palabra).
 */
export function HeroFlameMoteTrack({
  className,
  targetX,
  targetY,
}: {
  className: string;
  targetX: number;
  targetY: number;
}) {
  const targetRef = useRef({ x: targetX, y: targetY });
  useLayoutEffect(() => {
    targetRef.current = { x: targetX, y: targetY };
  }, [targetX, targetY]);

  const mx = useMotionValue(targetX);
  const my = useMotionValue(targetY);
  const smoothRef = useRef({ x: targetX, y: targetY });

  useEffect(() => {
    const k = 0.024;
    let id = 0;
    const loop = () => {
      const t = targetRef.current;
      let { x, y } = smoothRef.current;
      const dx = t.x - x;
      const dy = t.y - y;
      const dist = Math.hypot(dx, dy);
      if (dist < 0.01) {
        x = t.x;
        y = t.y;
      } else {
        x += dx * k;
        y += dy * k;
      }
      smoothRef.current = { x, y };
      mx.set(x);
      my.set(y);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [mx, my]);

  const leftPct = useTransform(mx, (x) => `${x}%`);
  const topPct = useTransform(my, (y) => `${y}%`);
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{
        left: leftPct,
        top: topPct,
        x: "-50%",
        y: "-50%",
      }}
    />
  );
}
