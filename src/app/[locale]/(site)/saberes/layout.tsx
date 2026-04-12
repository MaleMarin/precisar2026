import type { ReactNode } from "react";
import { SaberesBreadcrumbs } from "@/components/saberes/SaberesBreadcrumbs";

export default function SaberesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SaberesBreadcrumbs />
      {children}
    </>
  );
}
