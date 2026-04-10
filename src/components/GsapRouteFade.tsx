"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

type GsapRouteFadeProps = {
  children: React.ReactNode;
  overlayColor?: string;
};

/**
 * Transición de entrada por ruta (estructura “lienzo dinámico”): GSAP en lugar de animadores de página.
 */
export function GsapRouteFade({ children, overlayColor }: GsapRouteFadeProps) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const bg = overlayColor ?? "var(--bg)";

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* Sin tween de opacidad: en el primer frame puede verse el fondo del layout y parecer una raya clara arriba. */
    gsap.set(el, { opacity: 1, y: 0 });
  }, [pathname]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        zIndex: 1,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        minWidth: 0,
        background: bg,
      }}
    >
      {children}
    </div>
  );
}
