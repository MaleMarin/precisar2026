import Link from "next/link";
import { ProgramBandModule, ProgramSplitModule } from "@/components/programs/modules";
import { CourseLandingTemplate } from "@/components/templates/PageTemplates";

export const metadata = { title: "Curso Desinformación · Aquí No Pasa" };

export default function Page() {
  return (
    <CourseLandingTemplate title="Aquí No Pasa" kicker="Curso Desinformación" moduleCanvas>
      <ProgramSplitModule
        sideVariant="ink"
        main={
          <div>
            <p className="text-[1.05rem] leading-relaxed text-[var(--fg)]">
              Aquí comienza tu recorrido con el programa «Aquí No Pasa», una invitación a navegar con
              conciencia crítica y seguridad digital.
            </p>
            <p className="mt-6 font-[family-name:var(--font-display)] text-xl font-medium tracking-tight md:text-2xl">
              ¡Comienza ahora y no dejes que te la hagan!
            </p>
            <Link href="/aqui-no-pasa/modulos/1" className="prec-btn prec-btn--primary mt-10 inline-flex">
              Ir al módulo 1
            </Link>
          </div>
        }
        side={
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="prec-kicker text-[color-mix(in_oklab,var(--band-ink-fg)_55%,transparent)]">
                Estructura
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[color-mix(in_oklab,var(--band-ink-fg)_82%,transparent)]">
                25 módulos con título temático, esquema de contenido y enlace a la versión interactiva
                histórica en precisar.net.
              </p>
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-[color-mix(in_oklab,var(--band-ink-fg)_65%,transparent)]">
              Las URLs públicas <span className="text-[var(--band-ink-fg)]">/1</span> …{" "}
              <span className="text-[var(--band-ink-fg)]">/25</span> redirigen a{" "}
              <span className="text-[var(--band-ink-fg)]">/aqui-no-pasa/modulos/[n]</span>.
            </p>
          </div>
        }
      />

      <ProgramBandModule variant="ink">
        <p>
          25 módulos con título temático, esquema de contenido y enlace a la versión interactiva
          histórica en precisar.net.
        </p>
      </ProgramBandModule>
    </CourseLandingTemplate>
  );
}
