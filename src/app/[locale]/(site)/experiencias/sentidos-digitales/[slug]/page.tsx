import { notFound } from "next/navigation";
import { InstitutionalTemplate } from "@/components/templates/PageTemplates";
import { SENTIDOS_DIGITALES } from "@/data/sentidos-digitales";
import { sentidoBySlug } from "@/data/sentidos-content";
import { Link } from "@/i18n/navigation";
import { EquilibrioDigitalExperience } from "./EquilibrioDigitalExperience";
import { EscuchaDigitalExperience } from "./EscuchaDigitalExperience";
import { OlfatoDigitalExperience } from "./OlfatoDigitalExperience";
import { SaborDigitalExperience } from "./SaborDigitalExperience";
import { TactoDigitalExperience } from "./TactoDigitalExperience";
import { VisionDigitalExperience } from "./VisionDigitalExperience";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SENTIDOS_DIGITALES.map((s) => ({ slug: s.slug }));
}

const VISION_DESCRIPTION =
  "La capacidad de seleccionar conscientemente lo que vemos en pantallas y cómo procesamos el contenido visual.";

const ESCUCHA_DESCRIPTION =
  "La habilidad para gestionar notificaciones y sonidos digitales, eligiendo conscientemente qué escuchar.";

const TACTO_DESCRIPTION =
  "La capacidad para establecer límites en interacciones digitales y gestionar el espacio personal online.";

const SABOR_DESCRIPTION =
  "La capacidad para discernir y seleccionar contenido de calidad, desarrollando un “paladar digital” que prefiere información nutritiva.";

const OLFATO_DESCRIPTION =
  "Tu radar para detectar señales sospechosas: ofertas “milagro”, mensajes dudosos y patrones que huelen raro.";

const EQUILIBRIO_DESCRIPTION =
  "La capacidad para mantener balance entre la vida online y offline, preservando el bienestar integral.";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = sentidoBySlug(slug);
  if (!s) return { title: "Sentido digital" };
  if (slug === "vision") {
    return {
      title: `${s.title} · Sentidos digitales`,
      description: VISION_DESCRIPTION,
    };
  }
  if (slug === "oido") {
    return {
      title: `${s.title} · Sentidos digitales`,
      description: ESCUCHA_DESCRIPTION,
    };
  }
  if (slug === "tacto") {
    return {
      title: `${s.title} · Sentidos digitales`,
      description: TACTO_DESCRIPTION,
    };
  }
  if (slug === "sabor") {
    return {
      title: `${s.title} · Sentidos digitales`,
      description: SABOR_DESCRIPTION,
    };
  }
  if (slug === "olfato") {
    return {
      title: `${s.title} · Sentidos digitales`,
      description: OLFATO_DESCRIPTION,
    };
  }
  if (slug === "equilibrio") {
    return {
      title: `${s.title} · Sentidos digitales`,
      description: EQUILIBRIO_DESCRIPTION,
    };
  }
  return {
    title: `${s.title} · Sentidos digitales`,
    description: s.body[0],
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const s = sentidoBySlug(slug);
  if (!s) notFound();

  if (slug === "vision") {
    return <VisionDigitalExperience />;
  }

  if (slug === "oido") {
    return <EscuchaDigitalExperience />;
  }

  if (slug === "tacto") {
    return <TactoDigitalExperience />;
  }

  if (slug === "sabor") {
    return <SaborDigitalExperience />;
  }

  if (slug === "olfato") {
    return <OlfatoDigitalExperience />;
  }

  if (slug === "equilibrio") {
    return <EquilibrioDigitalExperience />;
  }

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
