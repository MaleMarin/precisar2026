import {
  ProgramChecklistModule,
  ProgramClosingModule,
  ProgramLeadModule,
  ProgramModShell,
  ProgramProcessModule,
  ProgramSplitModule,
} from "@/components/programs/modules";
import { ProgramLandingTemplate } from "@/components/templates/PageTemplates";

export const metadata = { title: "Educación Mediática Digital para Docentes" };

export default function Page() {
  return (
    <ProgramLandingTemplate title="Educación Mediática Digital para Docentes" kicker="Programa">
      <ProgramLeadModule tone="pedagogical" eyebrow="Aula">
        <p>
          Prepara a tus estudiantes para un presente digital consciente, seguro y participativo.
          Ponemos a tu disposición recursos didácticos, guías de aula y actividades prácticas que
          fortalecen la evaluación crítica de la información, la creación responsable de contenidos y
          la convivencia en entornos digitales. Una herramienta para tus clases que no significa más
          trabajo, sino más confianza, seguridad y reflexión para ti y tus estudiantes en el mundo
          digital.
        </p>
      </ProgramLeadModule>

      <ProgramModShell className="prec-program-mod not-prose">
        <h2 className="prec-program-mod__title">Nuestros Objetivos para Docentes</h2>
        <p className="max-w-2xl text-[1.05rem] leading-relaxed text-[var(--muted)]">
          Proveemos a los docentes herramientas prácticas y listas para incorporar en sus
          asignaturas, de modo que fomenten el pensamiento crítico y la responsabilidad digital en sus
          estudiantes sin aumentar su carga de trabajo.
        </p>
      </ProgramModShell>

      <ProgramChecklistModule
        title="Objetivos"
        columns={1}
        items={[
          {
            title: "Fomentar el Pensamiento Crítico",
            body: (
              <>
                Capacitar a los docentes para enseñar a evaluar críticamente la información,
                identificar desinformación y reconocer sesgos en diversas fuentes digitales,
                incluyendo contenidos generados por IA.
              </>
            ),
          },
          {
            title: "Promover la Producción Responsable",
            body: (
              <>
                Brindar herramientas para guiar a los estudiantes en la creación de contenidos
                digitales de forma ética y responsable, respetando derechos de autor y promoviendo
                mensajes constructivos.
              </>
            ),
          },
          {
            title: "Enseñar Participación Ética",
            body: (
              <>
                Formar a los docentes para que instruyan a sus alumnos sobre la participación activa,
                segura y respetuosa en redes y plataformas digitales, fomentando la ciudadanía
                digital.
              </>
            ),
          },
          {
            title: "Integrar la Educación Mediática",
            body: (
              <>
                Facilitar la integración de la educación mediática digital en el currículo escolar,
                con guías y recursos adaptables.
              </>
            ),
          },
        ]}
      />

      <ProgramChecklistModule
        title="Beneficios para tu Comunidad Escolar"
        columns={2}
        items={[
          { title: "Estudiantes reflexivos y resilientes" },
          { title: "Docentes empoderados e innovadores" },
          { title: "Comunidad educativa fortalecida" },
          { title: "Seguridad y privacidad digital" },
        ]}
      />

      <ProgramProcessModule
        title="Nuestra Metodologia"
        steps={[
          {
            title: "Talleres Prácticos Online",
            body: "4 sesiones en vivo por Zoom con actividades “manos a la obra” y trabajo autocontrolado en la plataforma digital del Programa EducaMedios.",
          },
          {
            title: "Comunidad de Práctica",
            body: "Conexión con otros docentes para compartir experiencias y co-crear materiales.",
          },
          {
            title: "Recursos Didácticos",
            body: "Guías, plantillas, videos y ejemplos listos para usar y adaptar.",
          },
          {
            title: "Acompañamiento Continuo",
            body: "Soporte y seguimiento personalizado en sala de aula.",
          },
        ]}
      />

      <ProgramChecklistModule
        title="Módulos Formativos"
        columns={2}
        items={[
          { title: "Fundamentos de la Educación Mediática Digital" },
          { title: "Desinformación, Verificación de Datos" },
          { title: "Algoritmos y Inteligencia Artificial" },
          { title: "Producción de Contenidos Digitales y Ciudadanía" },
          { title: "Seguridad, Privacidad y Bienestar Digital" },
          { title: "Integración Curricular y Proyectos en Educación Mediática" },
        ]}
      />

      <ProgramModShell className="prec-program-mod not-prose">
        <h2 className="prec-program-mod__title prec-program-mod__title--split">
          Comprender, enseñar y transformar
        </h2>
        <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--muted)]">
          Explora el impacto de los medios y plataformas digitales en la vida cotidiana y su vínculo
          con los objetivos educativos. Aprende a integrar la educación mediática y digital en el
          aula a través de proyectos aplicados.
        </p>
      </ProgramModShell>

      <ProgramClosingModule
        title="¡Lleva la Educación Mediática Digital a tu Establecimiento Educacional!"
        primaryCta={{ href: "/participa", label: "Contacto" }}
      >
        <p>Contáctanos para mas información</p>
      </ProgramClosingModule>
    </ProgramLandingTemplate>
  );
}
