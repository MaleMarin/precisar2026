import {
  ProgramChecklistModule,
  ProgramClosingModule,
  ProgramLeadModule,
  ProgramProcessModule,
} from "@/components/programs/modules";
import { ProgramLandingTemplate } from "@/components/templates/PageTemplates";

export const metadata = { title: "Capacitación para Funcionarios/as Públicos" };

export default function Page() {
  return (
    <ProgramLandingTemplate
      title="Capacitación en Educación Mediática para Funcionarios/as Públicos"
      kicker="Curso"
    >
      <ProgramLeadModule tone="applied" eyebrow="Administración pública">
        <p>
          En el entorno digital actual, la desinformación y la manipulación informativa no son solo
          un desafío social, sino un riesgo directo para la administración pública, la confianza
          ciudadana y la estabilidad democrática. La capacidad de los servidores públicos para
          navegar, evaluar y utilizar los medios de comunicación de manera eficaz y segura es una
          competencia fundamental.
        </p>
        <p>
          Este programa de formación en Educación Mediática ha sido diseñado específicamente para el
          contexto de la administración pública. Su objetivo es dotar a los funcionarios de las
          herramientas necesarias para trabajar de forma segura, confiable y eficiente en un mundo
          saturado de medios, fortaleciendo así la transparencia institucional, la participación
          ciudadana y la resiliencia frente a amenazas informacionales.
        </p>
      </ProgramLeadModule>

      <ProgramProcessModule
        title="Contenido y Estructura del Curso"
        steps={[
          {
            title: "Sesión 1: Una Vida Llena de Medios",
            body: "Introduce el rol central de los medios en la sociedad y los cuatro niveles de análisis mediático: la plataforma, el contenido, la industria y el entorno.",
          },
          {
            title: "Sesión 2: ¿Cómo Funcionan los Medios Digitales?",
            body: "Explora el impacto de la digitalización y el funcionamiento de los algoritmos, las cámaras de eco y la polarización.",
          },
          {
            title: "Sesiones 3 y 4: Confiabilidad y Evaluación de la Información",
            body: "Gestión de la sobrecarga de información, evaluación de fuentes, deepfakes y desinformación intencional.",
          },
          {
            title: "Sesión 5: Interacción en los Medios de Comunicación",
            body: "Herramientas para la interacción y comunicación efectiva y participación ciudadana a través de los medios.",
          },
          {
            title: "Sesión 6: Uso de Redes Sociales en la Administración Pública",
            body: "Oportunidades y responsabilidades del uso de redes sociales; actuar de forma imparcial, independiente y justa.",
          },
          {
            title: "Sesiones 7 y 8: Resumen y Autoevaluación",
            body: "Reflexión sobre objetivos de la educación mediática en el trabajo y evaluación del aprendizaje.",
          },
        ]}
      />

      <ProgramChecklistModule
        title="Beneficios para la institución pública"
        columns={2}
        items={[
          { title: "Toma de Decisiones Informada" },
          { title: "Mejora de la Comunicación Pública" },
          { title: "Reducción de Riesgos Institucionales" },
          { title: "Fomento de una Cultura de Pensamiento Crítico" },
        ]}
      />

      <ProgramClosingModule title="Próximos Pasos" primaryCta={{ href: "/participa", label: "Contacto" }}>
        <p>
          Consideramos esta capacitación una oportunidad estratégica en el capital humano y la
          resiliencia de la administración pública. Estamos a su disposición para adaptar el
          programa a las necesidades específicas de su institución.
        </p>
        <p>Solicitar una Propuesta Detallada: Contáctenos para recibir una propuesta formal.</p>
        <p>Para coordinar, por favor, contacte aquí</p>
      </ProgramClosingModule>
    </ProgramLandingTemplate>
  );
}
