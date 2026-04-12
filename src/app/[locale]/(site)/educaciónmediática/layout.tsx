import type { ReactNode } from "react";
import { MediaticaBreadcrumbs } from "@/components/educacion-mediatica/MediaticaBreadcrumbs";

export default function EducacionMediaticaAccentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MediaticaBreadcrumbs />
      {children}
    </>
  );
}
