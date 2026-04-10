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
    gsap.set(el, { opacity: 1 });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    /* Antes: y: 14 → y: 0 desplazaba todo el árbol (header incluido) y dejaba una franja del color de --bg
       sobre el hero oscuro. Transición muy suave solo por opacidad, sin translateY. */
    gsap.fromTo(
      el,
      { opacity: 0.985 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
    );
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
