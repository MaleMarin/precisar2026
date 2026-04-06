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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      el,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
    );
  }, [pathname]);

  return (
    <div ref={ref} style={{ minHeight: "100%", background: bg }}>
      {children}
    </div>
  );
}
