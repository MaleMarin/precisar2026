"use client";
import { useRef } from "react";

type GsapRouteFadeProps = {
  children: React.ReactNode;
  overlayColor?: string;
};

export function GsapRouteFade({ children, overlayColor }: GsapRouteFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bg = overlayColor ?? "var(--bg)";

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        zIndex: 1,
        flex: "1 0 auto",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        minWidth: 0,
        background: bg,
        opacity: 1,
        transform: "translateY(0)",
      }}
    >
      {children}
    </div>
  );
}
