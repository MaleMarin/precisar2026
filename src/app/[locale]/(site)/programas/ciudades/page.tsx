import type { Metadata } from "next";
import shell from "@/components/programs/ProgramShell.module.css";

export const metadata: Metadata = {
  title: "Ciudades Conectadas · Precisar",
  description:
    "Formación en Cultura Digital para la Ciudadanía. Programas modulares para municipios.",
};

const IMPACTOS = [
  {
    titulo: "Ciudadanía activa y crítica",
    desc: "Desarrolla en la ciudadanía aptitudes de pensamiento analítico para cuestionar mensajes, detectar discursos de odio y desinformación, y participar en procesos de decisión local con argumentos basados en fuentes fiables.",
  },
  {
    titulo: "Mayor seguridad digital",
    desc: "Fortalece la resiliencia comunitaria frente a fraudes y amenazas en línea mediante la enseñanza de buenas prácticas de protección de datos, privacidad y uso ético de la tecnología.",
  },
  {
    titulo: "Alfabetización en IA y algoritmos",
    desc: "Promueve la comprensión de cómo funcionan los sistemas automatizados y sus sesgos, capacitando a los ciudadanos para evaluar críticamente el contenido filtrado o generado por IA.",
  },
  {
    titulo: "Bienestar digital",
    desc: "Incorpora hábitos saludables de uso tecnológico y fomenta espacios de aprendizaje permanente que reducen la brecha digital y mejoran la inclusión social.",
  },
  {
    titulo: "Gobernanza local transparente",
    desc: "Capacita a equipos municipales en la integración de Educación Mediática y Digital en políticas y servicios urbanos, generando espacios de rendición de cuentas y comunicación abierta.",
  },
  {
    titulo: "Conexión y participación comunitaria",
    desc: "Facilita el despliegue de iniciativas en plazas, centros de salud, transporte y otros espacios urbanos, creando una red de información accesible para todos los habitantes.",
  },
];

const TALLERES = [
  {
    id: "ia",
    label: "IA",
    titulo: "Inteligencia Artificial y su impacto",
    desc: "Este taller presenta los fundamentos de la IA, explorando qué es, cómo funciona y su impacto en las personas. Los participantes adquirirán habilidades cruciales y estrategias prácticas para abordar los desafíos que presenta la IA. Ideal para públicos de todas las edades y niveles de conocimiento.",
    sesiones: [
      "Desmitificando la IA: qué es, cómo funciona y sus impactos en las personas.",
      "Vivir con algoritmos: qué son los algoritmos y su relación con la IA y el aprendizaje automático.",
      "Desafíos de la IA y estrategias prácticas 1: Magnificación del sesgo.",
      "Desafíos de la IA y estrategias prácticas 2: Acoso en línea.",
    ],
  },
  {
    id: "desinformacion",
    label: "Desinformación",
    titulo: "Desinformación: Hechos vs. sentimientos sobre la información",
    desc: "Taller práctico para desarrollar el criterio necesario para navegar en un ecosistema de información complejo, distinguir hechos de opiniones, y detectar noticias falsas y manipulación informativa.",
    sesiones: [
      "Qué es la desinformación y por qué importa.",
      "Cómo detectar noticias falsas y verificar fuentes.",
      "Algoritmos y burbujas de información.",
      "Estrategias prácticas para la vida cotidiana.",
    ],
  },
  {
    id: "fraudes",
    label: "Fraudes",
    titulo: "Prevención de Fraudes y Estafas en Línea",
    desc: "Herramientas prácticas para reconocer y evitar fraudes digitales, proteger datos personales y actuar frente a situaciones de riesgo en línea.",
    sesiones: [
      "Tipos de fraudes digitales más comunes.",
      "Phishing, smishing y suplantación de identidad.",
      "Cómo proteger tus datos y contraseñas.",
      "Qué hacer si fuiste víctima de un fraude.",
    ],
  },
  {
    id: "bienestar",
    label: "Bienestar",
    titulo: "Bienestar Digital y Salud Tecnológica",
    desc: "Este taller fomenta hábitos saludables en el uso de la tecnología, abordando el bienestar emocional, la gestión del tiempo en pantalla y la construcción de una relación equilibrada con los dispositivos.",
    sesiones: [
      "Impacto del uso de tecnología en la salud mental.",
      "Gestión del tiempo de pantalla y adicción digital.",
      "Construcción de hábitos digitales saludables.",
      "Bienestar digital en familia y comunidad.",
    ],
  },
];

export default function CiudadesPage() {
  return (
    <main className={shell.page}>
      {/* HERO */}
      <section className={shell.hero}>
        <div className={shell.heroInner}>
          <p className={shell.heroEyebrow}>Programas · Ciudades Conectadas</p>
          <h1 className={shell.heroTitle}>
            Formación en Cultura Digital
            <br />
            para la Ciudadanía
          </h1>
          <p className={shell.heroSub}>
            Ponemos a disposición de los municipios una oferta formativa diseñada para capacitar a la
            comunidad con las habilidades críticas esenciales en la era digital.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section
        className={shell.inner}
        style={{
          background: "#F5F2EC",
          padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <p
            style={{
              fontFamily: "'Avenir Next','Avenir',sans-serif",
              fontSize: "clamp(14px,1.4vw,17px)",
              lineHeight: 1.75,
              color: "rgba(10,12,18,0.6)",
              marginBottom: "2rem",
            }}
          >
            Nuestro trabajo en las ciudades se inspira directamente en el marco de las{" "}
            <strong>Ciudades AMI (Alfabetización Mediática e Informacional) de la UNESCO</strong>,
            adaptando sus principios para fomentar ecosistemas de información locales más críticos y
            resilientes.
          </p>
          <p
            style={{
              fontFamily: "'Avenir Next','Avenir',sans-serif",
              fontSize: "clamp(14px,1.4vw,17px)",
              lineHeight: 1.75,
              color: "rgba(10,12,18,0.6)",
            }}
          >
            Experiencias dinámicas para que cada participante comprenda, use y gestione los medios
            digitales con autonomía.
          </p>
        </div>

        {/* Dos columnas flexibilidad */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "rgba(10,12,18,0.1)",
            marginTop: "3rem",
            maxWidth: 720,
          }}
        >
          {[
            {
              titulo: "Impacto Directo en la Ciudadanía",
              desc: "Talleres y actividades para vecinos de todas las edades.",
            },
            {
              titulo: "Capacitación de Formadores",
              desc: "Estrategias que multiplican el impacto con educadores, bibliotecarios, equipos municipales y organizaciones comunitarias.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "#F5F2EC",
                padding: "1.5rem",
              }}
            >
              <p className={shell.programCardTitle} style={{ color: "#0A0C12", margin: "0 0 8px" }}>
                {item.titulo}
              </p>
              <p
                style={{
                  fontFamily: "'Avenir Next','Avenir',sans-serif",
                  fontSize: "clamp(14px,1.4vw,17px)",
                  color: "rgba(10,12,18,0.6)",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 4 contenidos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "1px",
            background: "rgba(10,12,18,0.1)",
            marginTop: "1px",
            maxWidth: 720,
          }}
        >
          {[
            { titulo: "Inteligencia Artificial", desc: "Desmitificando el futuro y sus implicaciones." },
            { titulo: "Bienestar Digital", desc: "Hábitos saludables en el uso de la tecnología." },
            { titulo: "Privacidad y Seguridad en Línea", desc: "Protegiendo identidad y datos." },
            { titulo: "Estrategias contra la Desinformación", desc: "Criterio para navegar la información." },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "#F5F2EC",
                padding: "1.25rem 1.5rem",
                borderLeft: "3px solid #DB5227",
              }}
            >
              <p className={shell.programCardTitle} style={{ color: "#0A0C12", margin: "0 0 4px" }}>
                {item.titulo}
              </p>
              <p
                style={{
                  fontFamily: "'Avenir Next','Avenir',sans-serif",
                  fontSize: "clamp(13px,1.2vw,15px)",
                  lineHeight: 1.55,
                  color: "rgba(10,12,18,0.6)",
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACTOS */}
      <section
        style={{
          background: "#023661",
          padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
        }}
      >
        <p
          style={{
            fontFamily: "'Avenir Next','Avenir',sans-serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#DB5227",
            margin: "0 0 1.5rem",
          }}
        >
          Lo que cambia en tu municipio
        </p>
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 3rem" }}>
          Impacto en
          <br />
          el municipio
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1px",
            background: "rgba(245,242,236,0.08)",
          }}
        >
          {IMPACTOS.map((imp, i) => (
            <div
              key={i}
              style={{
                background: "#023661",
                padding: "2rem",
                borderBottom: "1px solid rgba(245,242,236,0.08)",
              }}
            >
              <p className={shell.programCardTitle} style={{ color: "#F5F2EC", margin: "0 0 10px" }}>
                {imp.titulo}
              </p>
              <p
                style={{
                  fontFamily: "'Avenir Next','Avenir',sans-serif",
                  fontSize: "clamp(14px,1.4vw,17px)",
                  color: "rgba(245,242,236,0.65)",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {imp.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TALLERES */}
      <section
        style={{
          background: "#0A0C12",
          padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
        }}
      >
        <p
          style={{
            fontFamily: "'Avenir Next','Avenir',sans-serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#DB5227",
            margin: "0 0 1.5rem",
          }}
        >
          Nuestras propuestas formativas
        </p>
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 3rem" }}>
          Programas modulares
          <br />y flexibles
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "1px",
            background: "rgba(245,242,236,0.08)",
          }}
        >
          {TALLERES.map((taller) => (
            <div
              key={taller.id}
              style={{
                background: "#0A0C12",
                padding: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Avenir Next','Avenir',sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#DB5227",
                  margin: "0 0 8px",
                }}
              >
                {taller.label}
              </p>
              <h3 className={shell.programCardTitle} style={{ color: "#F5F2EC", margin: "0 0 12px" }}>
                {taller.titulo}
              </h3>
              <p
                style={{
                  fontFamily: "'Avenir Next','Avenir',sans-serif",
                  fontSize: "clamp(14px,1.4vw,17px)",
                  color: "rgba(245,242,236,0.65)",
                  lineHeight: 1.75,
                  margin: "0 0 1.5rem",
                }}
              >
                {taller.desc}
              </p>
              <p
                style={{
                  fontFamily: "'Avenir Next','Avenir',sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(245,242,236,0.35)",
                  margin: "0 0 8px",
                }}
              >
                Sesiones incluidas
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {taller.sesiones.map((s, j) => (
                  <li
                    key={j}
                    style={{
                      fontFamily: "'Avenir Next','Avenir',sans-serif",
                      fontSize: "clamp(13px,1.2vw,15px)",
                      lineHeight: 1.55,
                      color: "rgba(245,242,236,0.65)",
                      padding: "6px 0",
                      borderBottom: "1px solid rgba(245,242,236,0.06)",
                      display: "flex",
                      gap: "8px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        color: "#DB5227",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      →
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#DB5227",
          padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
        }}
      >
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 1.5rem" }}>
          Lleva la cultura digital
          <br />a tu municipio
        </h2>
        <p
          style={{
            fontFamily: "'Avenir Next','Avenir',sans-serif",
            fontSize: "clamp(14px,1.4vw,17px)",
            color: "rgba(245,242,236,0.65)",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: "0 0 2.5rem",
          }}
        >
          Contáctanos para diseñar una propuesta a medida de tu comunidad.
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
          Contáctanos
        </a>
      </section>
    </main>
  );
}
