import Link from "next/link";
import { notFound } from "next/navigation";
import { InstitutionalTemplate } from "@/components/templates/PageTemplates";
import { SENTIDOS_DIGITALES } from "@/data/sentidos-digitales";
import { sentidoBySlug } from "@/data/sentidos-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SENTIDOS_DIGITALES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = sentidoBySlug(slug);
  if (!s) return { title: "Sentido digital" };
  return {
    title: `${s.title} · Sentidos digitales`,
    description: s.body[0],
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const s = sentidoBySlug(slug);
  if (!s) notFound();

  return (
    <InstitutionalTemplate title={s.title} kicker="Sentidos digitales">
      <aside className="max-w-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]">
        <p className="prec-kicker mb-2 text-[var(--accent)]">Versión en sitio anterior</p>
        <p>
          Experiencia interactiva en{" "}
          <a
            href={`https://www.precisar.net/${s.legacyPath}`}
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            precisar.net/{s.legacyPath}
          </a>
          . Las rutas históricas redirigen aquí.
        </p>
      </aside>
      <div className="prose-precisar prose-precisar--article mt-10 max-w-2xl space-y-5">
        {s.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <Link
        href="/experiencias/sentidos-digitales"
        className="prec-link-arrow mt-12 inline-flex items-center gap-2"
      >
        ← Volver a Sentidos digitales
      </Link>
    </InstitutionalTemplate>
  );
}
