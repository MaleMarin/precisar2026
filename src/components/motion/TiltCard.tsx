"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./TiltCard.module.css";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Cuando el padre tiene role="list", exponer este nodo como listitem. */
  asListItem?: boolean;
};

export function TiltCard({ children, className, asListItem }: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const enabled = finePointer && !reduceMotion;

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled) return;
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner) return;
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const max = 9;
      const rx = -py * max * 2;
      const ry = px * max * 2;
      inner.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    },
    [enabled],
  );

  const onLeave = useCallback(() => {
    const inner = innerRef.current;
    if (inner) inner.style.transform = "";
  }, []);

  return (
    <div
      ref={wrapRef}
      role={asListItem ? "listitem" : undefined}
      className={[styles.wrap, className].filter(Boolean).join(" ")}
      onMouseMove={enabled ? onMove : undefined}
      onMouseLeave={enabled ? onLeave : undefined}
    >
      <div ref={innerRef} className={styles.inner}>
        {children}
      </div>
    </div>
  );
}
