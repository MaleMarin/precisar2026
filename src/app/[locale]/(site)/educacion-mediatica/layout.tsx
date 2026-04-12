import type { ReactNode } from "react";
import { MediaticaBreadcrumbs } from "@/components/educacion-mediatica/MediaticaBreadcrumbs";

export default function EducacionMediaticaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MediaticaBreadcrumbs />
      {children}
    </>
  );
}
