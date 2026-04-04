import {
  ProgramChecklistModule,
  ProgramClosingModule,
  ProgramLeadModule,
  ProgramModShell,
  ProgramProcessModule,
} from "@/components/programs/modules";
import { ProgramLandingTemplate } from "@/components/templates/PageTemplates";

export const metadata = { title: "Formación en Pensamiento Crítico Digital" };

export default function Page() {
  return (
    <ProgramLandingTemplate title="Formación en Pensamiento Crítico Digital" kicker="Curso">
      <ProgramLeadModule tone="applied" eyebrow="Capacitación">
        <p>
          Para enfrentar este desafío, se han creado cursos diseñados para transformar a los
          participantes en consumidores críticos y competentes, entregándoles las herramientas
          necesarias para identificar, analizar y verificar la información que encuentran en el
          ecosistema digital actual.
        </p>
      </ProgramLeadModule>

      <ProgramModShell className="prec-program-mod not-prose">
        <h2 className="prec-program-mod__title">Flexibilidad para Aprender</h2>
        <div className="max-w-2xl space-y-4 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
          <p>
            <strong className="text-[var(--fg)]">Modalidad Online:</strong> Un/a facilitador una vez
            por semana cada sesión de 90 miutos con actividades prácticas con los participantes.
          </p>
          <p>
            <strong className="text-[var(--fg)]">Modalidad Presencial:</strong> Talleres vivenciales
            en grupos reducidos (máximo 15 personas) con ejercicios prácticos, dinámicas grupales y
            materiales impresos.
          </p>
        </div>
      </ProgramModShell>

      <ProgramModShell className="prec-program-mod not-prose">
        <h2 className="prec-program-mod__title prec-program-mod__title--split">
          Taller: Entendiendo las Noticias y Verificación de Hechos (Fact-Checking)
        </h2>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-medium text-[var(--accent)]">
          Taller Práctico: ¡Que no te engañen! Aprende a verificar lo que lees en internet.
        </h3>
        <div className="mt-6 max-w-2xl space-y-4 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
          <p>
            ¿Recibes cadenas en WhatsApp o ves noticias en Facebook y dudas si son ciertas? Este
            taller es una guía de herramientas y consejos prácticos para que aprendas a diferenciar
            la información real de la falsa en pocos minutos.
          </p>
          <p>
            <strong className="text-[var(--fg)]">¿A quién está dirigido?</strong> A cualquier
            persona que use redes sociales y quiera aprender a protegerse de los engaños y la
            desinformación. No necesitas saber nada de tecnología, ¡solo tener curiosidad!
          </p>
          <p>
            <strong className="text-[var(--fg)]">Al finalizar, serás capaz de:</strong> Aplicar una
            lista de chequeo de 3 pasos; reconocer señales de alerta; usar herramientas gratuitas
            para fotos; conversar con calma cuando alguien comparte información falsa.
          </p>
        </div>
      </ProgramModShell>

      <ProgramProcessModule
        title="Módulos del taller"
        numbered
        steps={[
          { title: "¿Por qué las noticias falsas son tan atractivas?" },
          { title: "El método de los 3 pasos: Pausa, Pregunta y Compara" },
          { title: "Herramientas fáciles al alcance de tu mano" },
          { title: "¿Y ahora qué hago?" },
        ]}
      />

      <ProgramModShell className="prec-program-mod not-prose">
        <p className="text-[0.9375rem] text-[var(--muted)]">
          <strong className="text-[var(--fg)]">Formato y Duración:</strong> Taller de medio día (4
          horas) o día completo (7 horas).
        </p>
      </ProgramModShell>

      <ProgramModShell className="prec-program-mod not-prose">
        <h2 className="prec-program-mod__title prec-program-mod__title--split">
          Taller: Alfabetización Mediática y Digital en la Era de la IA — Entendiendo el Mundo
          Digital: Cómo la IA y los Algoritmos deciden lo que ves
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
          <p>
            ¿Sientes que Instagram te lee la mente o que YouTube siempre sabe qué video
            recomendarte? No es magia, son algoritmos e inteligencia artificial (IA).
          </p>
          <p>
            Módulos sobre algoritmos, personalización y burbuja, llegada de la IA, y cómo navegar en
            un mundo con IA. Formatos de 4 y 7 horas.
          </p>
        </div>
      </ProgramModShell>

      <ProgramChecklistModule
        title="Beneficios para su Organización"
        columns={2}
        items={[
          { title: "Mejora en la Toma de Decisiones y Eficiencia" },
          { title: "Mitigación de Riesgos y Protección de la Reputación" },
          { title: "Fortalecimiento de la Cultura Interna" },
          { title: "Impacto Social" },
        ]}
      />

      <ProgramClosingModule title="Próximos Pasos" primaryCta={{ href: "/participa", label: "Contacto" }}>
        <p>
          Consideramos esta capacitación una oportunidad estratégica en el capital humano y la
          resiliencia de la administración pública. Estamos a su disposición para adaptar el programa
          a las necesidades específicas de su institución.
        </p>
        <p>Solicitar una Propuesta Detallada: Contáctenos para recibir una propuesta formal.</p>
        <p>Para coordinar, por favor, contacte aquí</p>
      </ProgramClosingModule>
    </ProgramLandingTemplate>
  );
}
