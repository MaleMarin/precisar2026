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
      gsap.set(el, { y: 0 });
      return;
    }
    // Solo desplazamiento: si opacity queda en 0 (ticker GSAP/Lenis), la página se ve en blanco.
    gsap.fromTo(
      el,
      { y: 14 },
      { y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [pathname]);

  return (
    <div
      ref={ref}
      style={{
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
