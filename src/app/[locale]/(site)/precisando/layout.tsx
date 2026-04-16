import { PrecisandoBreadcrumbs } from "@/components/precisando/PrecisandoBreadcrumbs";

export default function PrecisandoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PrecisandoBreadcrumbs />
      {children}
    </>
  );
}
