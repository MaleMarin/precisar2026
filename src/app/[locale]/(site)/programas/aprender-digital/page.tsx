import {
  ProgramBandModule,
  ProgramChecklistModule,
  ProgramClosingModule,
  ProgramLeadModule,
  ProgramProcessModule,
  ProgramSplitModule,
} from "@/components/programs/modules";
import { ProgramLandingTemplate } from "@/components/templates/PageTemplates";
import { AprenderModulosTabs } from "./AprenderModulosTabs";
import modulosStyles from "./AprenderModulosSection.module.css";

export const metadata = { title: "Aprender Digital: Nunca es Tarde" };

export default function Page() {
  return (
    <ProgramLandingTemplate title="Aprender Digital: Nunca es Tarde" kicker="Programa">
      <ProgramLeadModule tone="warm" eyebrow="Comunidad">
        <p>
          Aprender Digital Nunca es Tarde: es un espacio seguro, cercano y amigable, donde personas
          adultas y mayores desarrollan confianza, adquieren habilidades digitales y mediáticas
          útiles, y disfrutan conectarse con su entorno, su comunidad y sus seres queridos.
        </p>
      </ProgramLeadModule>

      <ProgramSplitModule
        title="Educación Mediática Digital"
        main={
          <p className="text-[1.05rem] leading-relaxed text-[var(--muted)]">
            Enseñamos a identificar la desinformación, reconocer sesgos y desarrollar un pensamiento
            crítico para navegar el mundo digital de forma informada.
          </p>
        }
        side={
          <div className="space-y-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                Navegación segura
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Identificar y evitar fraudes en línea, proteger datos y privacidad en redes y
                aplicaciones.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                Inteligencia Artificial
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                La IA es la capacidad de las máquinas para imitar tareas que requieren inteligencia
                humana. Exploramos cómo transforma la vida diaria y el futuro y cómo interactuar con
                consciencia.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                Bienestar digital
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Equilibrio entre tiempo en línea y actividades presenciales; uso consciente y
                beneficioso de la tecnología.
              </p>
            </div>
          </div>
        }
      />

      <ProgramBandModule variant="ink">
        <p>
          Aunque en Chile el 96,5% de la población cuenta con algún tipo de conectividad, esa
          cobertura no se traduce automáticamente en capacidades de navegación segura y autónoma en
          el entorno digital.
        </p>
      </ProgramBandModule>

      <ProgramSplitModule
        title="Contexto"
        main={
          <div className="space-y-5 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
            <p>
              Vivimos un momento histórico marcado por avances tecnológicos que amplían las
              posibilidades de producción y difusión de información, pero también generan un
              ecosistema saturado por la prisa, el inmediatismo y la dificultad para establecer
              relaciones profundas.
            </p>
            <p>
              Los beneficios y, sobre todo, los riesgos derivados de nuestra interacción con medios
              y tecnologías han situado a la educación mediática y digital como una herramienta que
              debería estar integrada en la agenda de múltiples instituciones.
            </p>
            <p>
              Reconocer el acceso a estas herramientas como un derecho no basta: es imprescindible
              incorporarlas en la educación formal y abrir espacios de debate más allá de las aulas,
              dirigidos especialmente a quienes ya no forman parte del sistema escolar.
            </p>
            <p>
              Tener la oportunidad de entender la cultura digital y participar de manera crítica
              resulta clave para personas adultas y personas mayores. Esa brecha amplía sus
              vulnerabilidades, limitando su acceso al mercado laboral, a información confiable, a
              servicios básicos y a otros derechos fundamentales.
            </p>
            <p>
              Resulta imperativo diseñar e implementar políticas sólidas, destinar recursos adecuados
              y fomentar alianzas con empresas y organizaciones de diversos sectores.
            </p>
            <p>
              Solo así podremos democratizar el acceso a la educación mediática y digital,
              garantizando que personas de todas las edades desarrollen autonomía y pensamiento
              crítico, tanto en entornos en línea como fuera de línea.
            </p>
          </div>
        }
        side={
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
              Nuestros Objetivos
            </h3>
            <p className="mt-4 font-[family-name:var(--font-display)] text-lg font-medium leading-snug text-[var(--fg)]">
              Capacitamos a nuestros participantes para una vida digital plena y segura.
            </p>
          </div>
        }
        sideEmphasis
      />

      <ProgramChecklistModule
        title="Impacto en la Comunidad"
        items={[
          { title: "Mayor autonomía", body: "Trámites y comunicaciones, independencia digital." },
          { title: "Reducción del aislamiento", body: "Lazos sociales y digitales." },
          { title: "Acceso ágil a información", body: "Servicios locales al alcance." },
          {
            title: "Empoderamiento cívico",
            body: "Participación en iniciativas vecinales y plataformas ciudadanas.",
          },
        ]}
      />

      <ProgramProcessModule
        title="Nuestra Metodología"
        steps={[
          {
            title: "Sesiones Híbridas",
            body: "Clases presenciales y virtuales, con apoyo individualizado.",
          },
          {
            title: "Aprendizaje Colaborativo y Co-creación",
            body: "Participantes se apoyan mutuamente y co-crean materiales.",
          },
          {
            title: "Acompañamiento Continuo",
            body: "Línea de ayuda y encuentros mensuales de repaso.",
          },
          {
            title: "Materiales Accesibles",
            body: "Guías impresas y videos paso a paso.",
          },
        ]}
      />

      <section
        className={`${modulosStyles.section} ${modulosStyles.padSection}`}
        aria-labelledby="aprender-modulos-heading"
      >
        <div className={modulosStyles.inner}>
          <h2 id="aprender-modulos-heading" className={modulosStyles.title}>
            Módulos Formativos
          </h2>
          <p className={modulosStyles.sub}>
            Un camino estructurado para tu aprendizaje digital, paso a paso.
          </p>
          <AprenderModulosTabs />
        </div>
      </section>

      <ProgramClosingModule
        title="Lleva &quot;Aprender Digital&quot; a tu Comunidad"
        primaryCta={{ href: "/participa", label: "Contacto" }}
      >
        <p>Contáctanos para mas información</p>
      </ProgramClosingModule>
    </ProgramLandingTemplate>
  );
}
