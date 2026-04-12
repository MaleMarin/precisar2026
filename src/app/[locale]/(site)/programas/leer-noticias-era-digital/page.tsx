import type { Metadata } from "next"
import shell from "@/components/programs/ProgramShell.module.css"

export const metadata: Metadata = {
  title: "Educación Mediática Digital para Docentes · Precisar",
  description: "Recursos didácticos, guías de aula y talleres para que los docentes preparen a sus estudiantes para un presente digital consciente, seguro y participativo.",
}

const OBJETIVOS = [
  {
    titulo: "Fomentar el Pensamiento Crítico",
    desc: "Capacitar a los docentes para enseñar a los estudiantes a evaluar críticamente la información, identificar desinformación y reconocer sesgos en diversas fuentes digitales, incluyendo contenidos generados por IA.",
  },
  {
    titulo: "Promover la Producción Responsable",
    desc: "Brindar herramientas a los educadores para guiar a los estudiantes en la creación de contenidos digitales de forma ética y responsable, respetando derechos de autor y promoviendo mensajes constructivos.",
  },
  {
    titulo: "Enseñar Participación Ética",
    desc: "Formar a los docentes para que instruyan a sus alumnos sobre la participación activa, segura y respetuosa en redes y plataformas digitales, fomentando la ciudadanía digital.",
  },
  {
    titulo: "Integrar la Educación Mediática",
    desc: "Facilitar la integración de la educación mediática digital en el currículo escolar, proporcionando guías y recursos que se adapten a diferentes asignaturas y niveles educativos.",
  },
]

const BENEFICIOS = [
  {
    titulo: "Estudiantes Reflexivos y Resilientes",
    desc: "Ayuda a tus estudiantes a desarrollar habilidades para pensar críticamente, reconocer contenidos falsos y actuar con confianza y respeto en el mundo digital.",
  },
  {
    titulo: "Docentes Empoderados e Innovadores",
    desc: "Fortalece a tu equipo docente con herramientas prácticas, enfoque pedagógico actualizado y confianza para enfrentar los desafíos del entorno digital. Capacítalos para guiar a sus estudiantes en el uso crítico, seguro y creativo de la tecnología, y para liderar procesos de innovación educativa en sus comunidades escolares.",
  },
  {
    titulo: "Comunidad Educativa Fortalecida",
    desc: "Crea un ambiente de aprendizaje donde estudiantes, docentes y familias colaboren para un uso más consciente y ético de la tecnología.",
  },
  {
    titulo: "Seguridad y Privacidad Digital",
    desc: "Al incorporar buenas prácticas de protección de datos y control de privacidad, se reducen significativamente los riesgos de ciberacoso y usos indebidos de la tecnología, garantizando un entorno digital más seguro.",
  },
]

const METODOLOGIA = [
  {
    titulo: "Talleres Prácticos Online",
    desc: "4 sesiones en vivo por Zoom con actividades 'manos a la obra' y trabajo autocontrolado en la plataforma digital del Programa EducaMedios, para avanzar al ritmo de cada docente.",
  },
  {
    titulo: "Comunidad de Práctica",
    desc: "Conexión con otros docentes para compartir experiencias, co-crear materiales y resolver desafíos comunes.",
  },
  {
    titulo: "Recursos Didácticos",
    desc: "Acceso a guías, plantillas, videos y ejemplos listos para usar y adaptar en sus clases.",
  },
  {
    titulo: "Acompañamiento Continuo",
    desc: "Soporte y seguimiento personalizado para asegurar el acompañamiento en sala de aula.",
  },
]

const MODULOS = [
  {
    id: "fundamentos",
    label: "Fundamentos de la Educación Mediática Digital",
    desc: "Comprender, enseñar y transformar. Explora el impacto de los medios y plataformas digitales en la vida cotidiana y su vínculo con los objetivos educativos. Aprende a integrar la educación mediática y digital en el aula a través de proyectos aplicados como la creación de contenidos, el análisis crítico de información y el debate guiado, fortaleciendo así el rol del docente como formador de ciudadanía digital activa.",
  },
  {
    id: "desinformacion",
    label: "Desinformación, Verificación de Datos",
    desc: "Adquiere estrategias prácticas para enseñar a tus estudiantes a identificar y desmantelar la desinformación: aprenderán técnicas de verificación de datos, uso de herramientas de fact-checking y métodos para contrastar fuentes, reconocer patrones de manipulación y aplicar estas competencias tanto en sus investigaciones escolares como en su día a día.",
  },
  {
    id: "algoritmos",
    label: "Algoritmos y Inteligencia Artificial",
    desc: "Profundiza en cómo los algoritmos y la Inteligencia Artificial influyen en lo que vemos en línea, desde redes sociales hasta motores de búsqueda. Analizaremos los sesgos inherentes a la IA y su impacto en la información, y te daremos herramientas para enseñar a tus estudiantes a evaluar críticamente el contenido generado o filtrado por estas tecnologías. Además, aprenderás a establecer condiciones de uso claras —como acuerdos de responsabilidad digital, criterios de selección de fuentes automatizadas y proyectos colaborativos docente-estudiante— que fomenten un entorno seguro y reflexivo para explorar la IA en el aula.",
  },
  {
    id: "produccion",
    label: "Producción de Contenidos Digitales y Ciudadanía",
    desc: "Este módulo te capacitará para guiar a tus estudiantes en la creación de contenidos digitales responsables y significativos. Exploraremos herramientas para la producción de texto, imagen y video, enfocándonos en la ética, el respeto a la propiedad intelectual y el impacto de sus mensajes. Fomentaremos la participación activa y constructiva en el espacio digital, convirtiendo a los estudiantes en creadores conscientes y responsables.",
  },
  {
    id: "seguridad",
    label: "Seguridad, Privacidad y Bienestar Digital",
    desc: "Aprende a abordar temas cruciales como la ciberseguridad, la protección de datos personales y la gestión de la privacidad con tus estudiantes. Desarrollarás estrategias para promover un uso saludable y equilibrado de la tecnología, previniendo el ciberacoso y fomentando un bienestar digital que integre la vida online y offline.",
  },
  {
    id: "integracion",
    label: "Integración Curricular y Proyectos en Educación Mediática",
    desc: "Descubre cómo integrar la educación mediática digital en diversas asignaturas y niveles educativos. Te proporcionaremos ejemplos de proyectos exitosos y te guiaremos en el diseño de actividades prácticas que permitan a tus estudiantes aplicar sus conocimientos, culminando en proyectos significativos que demuestren su educación digital y mediática.",
  },
]

export default function DocentesPage() {
  return (
    <main className={shell.page} data-program="leer-noticias">

      {/* HERO */}
      <section className={shell.hero}>
        <div className={shell.heroInner}>
          <p className={shell.heroEyebrow}>
            Programas · Docentes
          </p>
          <h1 className={shell.heroTitle}>
            Educación Mediática Digital<br />
            para Docentes
          </h1>
          <p className={shell.heroSub}>
            Prepara a tus estudiantes para un presente
            digital consciente, seguro y participativo.
            Ponemos a tu disposición recursos didácticos,
            guías de aula y actividades prácticas que
            fortalecen la evaluación crítica de la
            información, la creación responsable de
            contenidos y la convivencia en entornos digitales.
            Una herramienta para tus clases que no significa
            más trabajo, sino más confianza, seguridad y
            reflexión para ti y tus estudiantes en el
            mundo digital.
          </p>
        </div>
      </section>

      {/* OBJETIVOS */}
      <section style={{
        background: "#F5F2EC",
        padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
      }}>
        <p style={{
          fontFamily: "'Avenir Next','Avenir',sans-serif",
          fontSize: "11px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#DB5227",
          margin: "0 0 1.5rem",
        }}>
          Nuestros objetivos
        </p>
        <h2 className={shell.programSectionTitle} style={{ color: "#0A0C12", margin: "0 0 3rem" }}>
          Lo que queremos<br />lograr contigo
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "1px",
          background: "rgba(10,12,18,0.08)",
        }}>
          {OBJETIVOS.map((obj, i) => (
            <div key={i} style={{
              background: "#F5F2EC",
              padding: "2rem",
              borderLeft: "3px solid #DB5227",
            }}>
              <p className={shell.programCardTitle} style={{ color: "#0A0C12", margin: "0 0 10px" }}>
                {obj.titulo}
              </p>
              <p style={{
                fontFamily: "'Avenir Next','Avenir',sans-serif",
                fontSize: "clamp(14px,1.4vw,17px)",
                color: "rgba(10,12,18,0.6)",
                lineHeight: 1.75,
                margin: 0,
              }}>
                {obj.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section style={{
        background: "#023661",
        padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
      }}>
        <p style={{
          fontFamily: "'Avenir Next','Avenir',sans-serif",
          fontSize: "11px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#DB5227",
          margin: "0 0 1.5rem",
        }}>
          Beneficios para tu comunidad escolar
        </p>
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 0.75rem" }}>
          Potencia la formación docente<br />y transforma la experiencia educativa
        </h2>
        <p style={{
          fontFamily: "'Avenir Next','Avenir',sans-serif",
          fontSize: "clamp(14px,1.4vw,17px)",
          color: "rgba(245,242,236,0.65)",
          lineHeight: 1.75,
          margin: "0 0 3rem",
          maxWidth: 640,
        }}>
          Potencia la formación docente y transforma
          la experiencia educativa de tus estudiantes.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "1px",
          background: "rgba(245,242,236,0.08)",
        }}>
          {BENEFICIOS.map((b, i) => (
            <div key={i} style={{
              background: "#023661",
              padding: "2rem",
            }}>
              <p className={shell.programCardTitle} style={{ color: "#F5F2EC", margin: "0 0 10px" }}>
                {b.titulo}
              </p>
              <p style={{
                fontFamily: "'Avenir Next','Avenir',sans-serif",
                fontSize: "clamp(14px,1.4vw,17px)",
                color: "rgba(245,242,236,0.65)",
                lineHeight: 1.75,
                margin: 0,
              }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section style={{
        background: "#DB5227",
        padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
      }}>
        <p style={{
          fontFamily: "'Avenir Next','Avenir',sans-serif",
          fontSize: "11px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(245,242,236,0.6)",
          margin: "0 0 1.5rem",
        }}>
          Nuestra metodología
        </p>
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 3rem" }}>
          Cómo aprendemos<br />juntos
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "1px",
          background: "rgba(245,242,236,0.08)",
        }}>
          {METODOLOGIA.map((met, i) => (
            <div key={i} style={{
              background: "#F5F2EC",
              padding: "2rem",
              borderLeft: "3px solid #DB5227",
            }}>
              <p className={shell.programCardTitle} style={{ color: "#0A0C12", margin: "0 0 10px" }}>
                {met.titulo}
              </p>
              <p style={{
                fontFamily: "'Avenir Next','Avenir',sans-serif",
                fontSize: "clamp(14px,1.4vw,17px)",
                color: "rgba(10,12,18,0.6)",
                lineHeight: 1.75,
                margin: 0,
              }}>
                {met.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MÓDULOS */}
      <section style={{
        background: "#0A0C12",
        padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
      }}>
        <p style={{
          fontFamily: "'Avenir Next','Avenir',sans-serif",
          fontSize: "11px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#DB5227",
          margin: "0 0 1.5rem",
        }}>
          Módulos formativos
        </p>
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 0.75rem" }}>
          Un camino estructurado<br />para el aprendizaje digital
        </h2>
        <p style={{
          fontFamily: "'Avenir Next','Avenir',sans-serif",
          fontSize: "clamp(14px,1.4vw,17px)",
          color: "rgba(245,242,236,0.55)",
          lineHeight: 1.75,
          margin: "0 0 3rem",
          maxWidth: 560,
        }}>
          Paso a paso, módulo a módulo.
        </p>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          background: "rgba(245,242,236,0.06)",
        }}>
          {MODULOS.map((mod, i) => (
            <div key={i} style={{
              background: "#0A0C12",
              padding: "2rem",
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: "2rem",
              alignItems: "start",
            }}>
              <div>
                <p style={{
                  fontFamily: "'Avenir Next','Avenir',sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#DB5227",
                  margin: "0 0 6px",
                }}>
                  Módulo {String(i + 1).padStart(2, "0")}
                </p>
                <p className={shell.programCardTitle} style={{ color: "#F5F2EC", margin: 0 }}>
                  {mod.label}
                </p>
              </div>
              <p style={{
                fontFamily: "'Avenir Next','Avenir',sans-serif",
                fontSize: "clamp(14px,1.4vw,17px)",
                color: "rgba(245,242,236,0.65)",
                lineHeight: 1.75,
                margin: 0,
              }}>
                {mod.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "#DB5227",
        padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
      }}>
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 1.5rem" }}>
          Lleva la educación mediática<br />a tu escuela
        </h2>
        <p style={{
          fontFamily: "'Avenir Next','Avenir',sans-serif",
          fontSize: "clamp(14px,1.4vw,17px)",
          color: "rgba(245,242,236,0.65)",
          lineHeight: 1.75,
          maxWidth: 560,
          margin: "0 0 2.5rem",
        }}>
          Contáctanos para diseñar una propuesta
          a medida de tu comunidad educativa.
        </p>

        <a
          href="#contacto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#F5F2EC",
            color: "#0A0C12",
            fontFamily: "'Avenir Next','Avenir',sans-serif",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "14px 28px",
            textDecoration: "none",
            transition: "opacity 0.2s ease",
          }}
        >
          Contáctanos →
        </a>
      </section>

    </main>
  )
}
