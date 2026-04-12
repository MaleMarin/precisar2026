import type { ReactNode } from "react";
import { ProgramBreadcrumbs } from "@/components/programs/ProgramBreadcrumbs";

export default function ProgramasLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ProgramBreadcrumbs />
      {children}
    </>
  );
}
