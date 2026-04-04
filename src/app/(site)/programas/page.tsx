import Link from "next/link";
import {
  ProgramBandModule,
  ProgramLeadModule,
  ProgramModShell,
} from "@/components/programs/modules";
import { ProgramLandingTemplate } from "@/components/templates/PageTemplates";

export const metadata = {
  title: "Programas e iniciativas",
  description:
    "Herramientas, contenidos y experiencias formativas para pensamiento crítico y cultura digital.",
};

const programs: { title: string; href: string; body: string }[] = [
  {
    title: "Hub Digital Consciente",
    href: "/programas/hub-digital-consciente",
    body:
      "Experiencias inmersivas de cultura digital para todas las edades, adaptables a eventos, municipios y entornos educativos.",
  },
  {
    title: "Ciudades conectadas con sentido",
    href: "/programas/ciudades",
    body:
      "Talleres y acompañamiento a instituciones y municipios en educación mediática y digital.",
  },
  {
    title: "Aprender Digital: Nunca es Tarde",
    href: "/programas/aprender-digital",
    body:
      "Programa para personas mayores: dispositivos, seguridad digital y autonomía en línea.",
  },
  {
    title: "Educación mediática para docentes",
    href: "/programas/docentes",
    body:
      "Talleres, guías de aula y formación práctica para el aula y la evaluación crítica de la información.",
  },
  {
    title: "Leer noticias en la era digital",
    href: "/programas/leer-noticias-era-digital",
    body:
      "Curso para identificar noticias falsas, analizar medios y participar informada en la vida digital.",
  },
  {
    title: "Funcionarios públicos",
    href: "/programas/funcionarios-publicos",
    body:
      "Formación en competencias digitales y pensamiento crítico para el sector público.",
  },
];

export default function Page() {
  const [featured, ...rest] = programs;

  return (
    <ProgramLandingTemplate title="Programas e iniciativas" kicker="Qué hacemos">
      <ProgramLeadModule tone="institutional" eyebrow="Panorama">
        <p>
          Diseñamos herramientas, contenidos útiles y experiencias formativas que fortalecen el
          pensamiento crítico, la seguridad digital, la expresión consciente y el compromiso
          ciudadano en entornos digitales.
        </p>
      </ProgramLeadModule>

      <ProgramModShell className="prec-program-mod not-prose">
        <div className="prec-program-hub-grid">
          <article className="prec-program-hub-featured">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
              Destacado
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-medium tracking-tight md:text-2xl">
              <Link href={featured.href} className="transition-colors hover:text-[var(--accent)]">
                {featured.title}
              </Link>
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
              {featured.body}
            </p>
            <Link href={featured.href} className="prec-link-arrow mt-8 inline-flex items-center gap-2">
              Ver programa <span aria-hidden>→</span>
            </Link>
          </article>
          {rest.map((p, i) => (
            <article
              key={p.href}
              className={`prec-program-hub-card ${i % 2 === 1 ? "prec-program-hub-card--alt" : ""}`}
            >
              <h2 className="font-[family-name:var(--font-display)] text-lg font-medium tracking-tight md:text-xl">
                <Link href={p.href} className="transition-colors hover:text-[var(--accent)]">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--muted)]">{p.body}</p>
              <Link href={p.href} className="prec-link-arrow mt-6 inline-flex items-center gap-2">
                Ver programa <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </ProgramModShell>

      <ProgramBandModule variant="fg">
        <p>
          <Link
            href="/aqui-no-pasa"
            className="font-semibold text-[var(--bg)] underline-offset-4 hover:underline"
          >
            Aquí No Pasa
          </Link>{" "}
          — curso breve sobre desinformación y navegación consciente (25 módulos).
        </p>
      </ProgramBandModule>
    </ProgramLandingTemplate>
  );
}
