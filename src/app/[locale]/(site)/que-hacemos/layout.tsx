import type { ReactNode } from "react";
import { ProgramBreadcrumbs } from "@/components/programs/ProgramBreadcrumbs";

export default function QueHacemosLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-w-0"
      style={{
        backgroundColor: "#0A0C12",
        color: "#ffffff",
        fontFamily: "var(--font-body)",
        minHeight: "100%",
      }}
    >
      <ProgramBreadcrumbs />
      {children}
    </div>
  );
}
