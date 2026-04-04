import {
  ProgramBandModule,
  ProgramChecklistModule,
  ProgramClosingModule,
  ProgramLeadModule,
  ProgramModShell,
  ProgramSplitModule,
} from "@/components/programs/modules";
import { ProgramLandingTemplate } from "@/components/templates/PageTemplates";
import { PDFS } from "@/lib/site";

export const metadata = { title: "Ciudades" };

export default function Page() {
  return (
    <ProgramLandingTemplate title="Formación en Cultura Digital para la Ciudadanía" kicker="Ciudades">
      <ProgramLeadModule tone="institutional" eyebrow="Territorio">
        <p>
          Ponemos a disposición de los municipios una oferta formativa, diseñada para capacitar a la
          comunidad con las habilidades críticas esenciales en la era digital.
        </p>
        <p>
          Nuestro trabajo en las ciudades se inspira directamente en el marco de las{" "}
          <a href={PDFS.ciudadesAmiUnesco} target="_blank" rel="noreferrer">
            &apos;Ciudades AMI&apos; (Alfabetización Mediática e Informacional) de la UNESCO
          </a>
          , adaptando sus principios para fomentar ecosistemas de información locales más críticos y
          resilientes.
        </p>
      </ProgramLeadModule>

      <ProgramBandModule variant="line">
        <p>
          Programas de capacitación: experiencias dinámicas y transformadoras orientadas a que cada
          participante comprenda, use y gestione los medios digitales de forma segura, responsable y
          autónoma.
        </p>
      </ProgramBandModule>

      <ProgramSplitModule
        title="Flexibilidad y alcance estratégico"
        main={
          <div className="space-y-5 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
            <p>
              <strong className="text-[var(--fg)]">Impacto Directo en la Ciudadanía:</strong>{" "}
              Talleres y actividades para vecinos/as de todas las edades.
            </p>
            <p>
              <strong className="text-[var(--fg)]">Capacitación de Formadores:</strong> Estrategias
              que multiplican el impacto con educadores, bibliotecarios, equipos municipales y
              organizaciones comunitarias.
            </p>
          </div>
        }
        side={
          <div>
            <ul className="space-y-2">
              <li>Inteligencia Artificial: Desmitificando el futuro y sus implicaciones.</li>
              <li>Bienestar Digital: Hábitos saludables en el uso de la tecnología.</li>
              <li>Privacidad y Seguridad en Línea: Protegiendo identidad y datos.</li>
              <li>Estrategias contra la Desinformación: Criterio para navegar la información.</li>
            </ul>
          </div>
        }
        mainNarrow
      />

      <ProgramModShell className="prec-program-mod not-prose">
        <h2 className="prec-program-mod__title">
          Diseño a tu medida: modular, flexible y personalizable
        </h2>
        <p className="max-w-2xl text-[1.05rem] leading-relaxed text-[var(--muted)]">
          Instancias modulares y 100% personalizables para prioridades, públicos y recursos de cada
          municipio.
        </p>
      </ProgramModShell>

      <ProgramChecklistModule
        title="Impacto en el municipio"
        items={[
          {
            title: "Ciudadanía activa y crítica",
            body: "Pensamiento analítico, desinformación, participación local informada.",
          },
          { title: "Mayor seguridad digital", body: "Fraudes, privacidad, uso ético." },
          {
            title: "Alfabetización en IA y algoritmos",
            body: "Sesgos y contenido generado por IA.",
          },
          { title: "Bienestar digital", body: "Hábitos saludables e inclusión." },
          {
            title: "Gobernanza local transparente",
            body: "AMI en políticas y servicios.",
          },
          {
            title: "Conexión y participación comunitaria",
            body: "Iniciativas en espacios urbanos.",
          },
        ]}
        columns={2}
      />

      <ProgramChecklistModule
        title="Nuestras propuestas formativas"
        items={[
          { title: "Inteligencia Artificial y su impacto" },
          { title: "Desinformación: Hechos vs. sentimientos sobre la información" },
          { title: "Prevención de Fraudes y Estafas en Línea" },
          { title: "Bienestar Digital y Salud Tecnológica" },
        ]}
        columns={2}
      />

      <ProgramModShell className="prec-program-mod border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 not-prose">
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          (Detalle de sesiones del taller de IA según sitio actual: desmitificación, algoritmos,
          sesgos, acoso en línea, etc.)
        </p>
      </ProgramModShell>

      <ProgramClosingModule
        title="¡Lleva la Cultura Digital a tu Municipio!"
        primaryCta={{ href: "/participa", label: "Contacto" }}
      >
        <p>Contáctanos para más información</p>
      </ProgramClosingModule>
    </ProgramLandingTemplate>
  );
}
