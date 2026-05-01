import type { ReactNode } from "react";
import { SaberesBreadcrumbs } from "@/components/saberes/SaberesBreadcrumbs";

export default function SaberesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-full shrink-0">
        <SaberesBreadcrumbs />
      </div>
      {children}
    </>
  );
}
