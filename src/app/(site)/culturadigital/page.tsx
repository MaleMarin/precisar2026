import { PageShell } from "@/components/PageShell";

export const metadata = { title: "Cultura Digital" };

export default function Page() {
  return (
    <PageShell title="Cultura Digital" kicker="Interactivo">
      <p>
        Miradas y prácticas para una vida online consciente. Haciendo clic en cada barra
        se abre presentándote cada concepto de la cultura Digital
      </p>
      <p>...sigue el recorrido...</p>
      <p className="text-sm text-[var(--muted)]">
        Replicar en esta plantilla la galería o acordeón interactivo del sitio en
        producción.
      </p>
    </PageShell>
  );
}
