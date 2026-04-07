import type { ReactNode } from "react";

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "block",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#DB5227",
      }}
    >
      {children}
    </span>
  );
}
