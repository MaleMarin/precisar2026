import {
  ProgramBandModule,
  ProgramChecklistModule,
  ProgramClosingModule,
  ProgramLeadModule,
  ProgramModShell,
  ProgramProcessModule,
  ProgramResourceModule,
} from "@/components/programs/modules";
import { ProgramLandingTemplate } from "@/components/templates/PageTemplates";
import { PDFS } from "@/lib/site";

export const metadata = { title: "Hub Digital Consciente" };

export default function Page() {
  return (
    <ProgramLandingTemplate title="Hub Digital Consciente" kicker="Programa">
      <ProgramLeadModule tone="flagship" eyebrow="Experiencia">
        <p>
          En nuestro Hub Digital Consciente, nos sumergimos en la cultura digital a través de una
          diversidad de muestras interactivas y temáticas. Cada una de ellas es portátil y será
          diseñada para explorar cómo los medios y la tecnología influyen en nuestra sociedad,
          llevando el conocimiento directamente a eventos, municipios, espacios públicos y más.
        </p>
        <p>
          Actualmente, estamos centrados en un proyecto que busca comprender cómo las personas
          desean recibir información. A través de consultas directas y participativas, buscamos
          entender las preferencias y necesidades de la ciudadanía para co-crear un presente y
          futuro digital más alineado con sus expectativas.
        </p>
        <p>
          Así, en el Hub, no solo presentamos temas; también abrimos un espacio para el diálogo y
          la acción. Con cada muestra, traducimos conceptos complejos —desde la desinformación,
          inteligencia artificial hasta la privacidad— en experiencias sensoriales accesibles,
          impulsando conversaciones significativas sobre el uso responsable de la tecnología y cómo
          construir un ecosistema digital que beneficie a toda la ciudad.
        </p>
      </ProgramLeadModule>

      <ProgramModShell className="prec-program-mod not-prose">
        <h2 className="prec-program-mod__title">¿Adónde y para quién?</h2>
        <p className="max-w-2xl text-[1.05rem] leading-relaxed text-[var(--muted)]">
          Esta experiencia se adapta a cualquier evento: plazas, bibliotecas, salas culturales,
          establecimientos educacionales, auditorios, cualquier espacio elegido y eventos corporativos
          que busquen generar una conversación necesaria. Pensada para un público amplio de cualquier
          edad y nivel educacional.
        </p>
      </ProgramModShell>

      <ProgramChecklistModule
        title="¿Qué encontrarás en cada muestra?"
        items={[
          {
            title: "Carteles visualmente impactantes",
            body: "Provocan conversación y reflexión inmediata.",
          },
          {
            title: "Animaciones de video",
            body: "Privacidad, noticias falsas, dilemas éticos e IA.",
          },
          {
            title: "Aplicaciones interactivas",
            body: "Datos personales, algoritmos, AR e IA.",
          },
          {
            title: "Experiencias prácticas",
            body: "Debates antes de talleres y charlas.",
          },
        ]}
        columns={2}
      />

      <ProgramProcessModule
        title="Modelos de instalación"
        numbered
        steps={[
          {
            title: "PIXEL — Formato básico para espacios reducidos",
            body: (
              <>
                2 carteles temáticos, 1 pantalla de animación, 2 experiencias interactivas. Espacio
                8–12 m²; instalación 45–60 min; 1–3 días; 50–100 personas/día.
              </>
            ),
          },
          {
            title: "VECTOR — Formato estándar para eventos medianos",
            body: (
              <>
                3 carteles, 3 pantallas, 3 estaciones interactivas, experiencias prácticas según
                objetivo. Espacio 15–25 m²; 2–3 h montaje; 3 días–2 semanas; 100–300 personas/día.
              </>
            ),
          },
          {
            title: "HOLO — Formato completo para instalaciones más duraderas",
            body: (
              <>
                6 carteles, 3 animaciones, 4 aplicaciones interactivas, consultas, zona central.
                Espacio 30–50 m²; 4–6 h montaje; 2 semanas–permanente; 200–500 personas/día.
              </>
            ),
          },
        ]}
      />

      <ProgramResourceModule
        title="Ediciones temáticas — descargas"
        links={[
          { href: PDFS.hubDesinformacion, label: "Edición Desinformación — Descargar" },
          { href: PDFS.hubIaAlgoritmos, label: "Edición IA y Algoritmos — Descargar" },
        ]}
      />

      <ProgramProcessModule
        title="Cómo trabajamos"
        steps={[
          {
            title: "Colaboración con Expertos",
            body: "Nos asociamos con profesionales en diversos campos para asegurar que nuestro contenido sea preciso y relevante",
          },
          {
            title: "Investigación en Campo",
            body: "Realizamos investigaciones directas con la audiencia para entender los desafíos reales y las perspectivas de la muestra.",
          },
        ]}
      />

      <ProgramBandModule variant="surface">
        <p>
          Transforma tu evento y fomenta el pensamiento crítico sobre medios y tecnología de forma
          sencilla: ¡asegura tu experiencia!
        </p>
      </ProgramBandModule>

      <ProgramClosingModule
        title="Siguiente paso"
        primaryCta={{ href: "/participa", label: "Contacto y participación" }}
      >
        <p>Contáctanos para más información</p>
      </ProgramClosingModule>
    </ProgramLandingTemplate>
  );
}
