import { PageShell } from "@/components/PageShell";

export const metadata = { title: "Educación Mediática" };

export default function Page() {
  return (
    <PageShell title="Educación Mediática" kicker="En un minuto">
      <p>
        No se trata solo de ver, sino de entender y participar. En un minuto te contamos
        cómo.
      </p>
      <p className="text-sm text-[var(--muted)]">
        Incrustar aquí el recurso audiovisual o animación del sitio actual.
      </p>
    </PageShell>
  );
}
