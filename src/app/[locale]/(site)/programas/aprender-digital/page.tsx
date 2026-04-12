import type { CSSProperties } from "react";
import type { Metadata } from "next";
import shell from "@/components/programs/ProgramShell.module.css";

export const metadata: Metadata = {
  title: "Aprender Digital: Nunca es Tarde · Precisar",
  description:
    "Un espacio seguro y amigable donde personas adultas y mayores desarrollan confianza y habilidades digitales.",
};

const MODULOS = [
  {
    titulo: "Educación Mediática Digital",
    desc: "Enseñamos a identificar la desinformación, reconocer sesgos y desarrollar un pensamiento crítico para navegar el mundo digital de forma informada. Esto te permitirá discernir la veracidad de la información y protegerte de contenidos engañosos.",
    color: "#DB5227",
  },
  {
    titulo: "Navegación Segura",
    desc: "Aprenderás a identificar y evitar fraudes en línea, proteger tus datos personales y gestionar tu privacidad en redes y aplicaciones, asegurando una experiencia digital tranquila y sin riesgos. Te daremos las herramientas para sentirte seguro en cada clic.",
    color: "#023661",
  },
  {
    titulo: "Inteligencia Artificial",
    desc: "La Inteligencia Artificial (IA) es la capacidad de las máquinas para imitar y realizar tareas que requieren inteligencia humana. Exploraremos cómo la IA está transformando nuestra vida diaria y el futuro. Descubriremos sus aplicaciones prácticas y cómo interactuar con ella de forma consciente.",
    color: "#DB5227",
  },
  {
    titulo: "Bienestar Digital",
    desc: "Encuentra un equilibrio saludable entre el tiempo que pasas en línea y tus actividades presenciales, utilizando las herramientas digitales para enriquecer tu vida y fortalecer tus vínculos sociales, sin que sustituyan las interacciones cara a cara. Promovemos un uso consciente y beneficioso de la tecnología.",
    color: "#023661",
  },
];

const IMPACTOS = [
  {
    titulo: "Mayor Autonomía",
    desc: "Facilita trámites y comunicaciones, brindando independencia digital.",
  },
  {
    titulo: "Reducción del Aislamiento",
    desc: "Fortalece lazos sociales y digitales con familiares y amigos.",
  },
  {
    titulo: "Acceso Ágil a Información",
    desc: "Información y servicios locales al alcance de la mano.",
  },
  {
    titulo: "Empoderamiento Cívico",
    desc: "Participación activa en iniciativas vecinales y plataformas ciudadanas.",
  },
];

const METODOLOGIA = [
  {
    titulo: "Sesiones Híbridas",
    desc: "Clases presenciales y virtuales, con apoyo individualizado.",
  },
  {
    titulo: "Aprendizaje Colaborativo y Co-creación",
    desc: "Participantes se apoyan mutuamente y co-crean materiales que enriquecen el taller.",
  },
  {
    titulo: "Acompañamiento Continuo",
    desc: "Línea de ayuda y encuentros mensuales de repaso para resolver dudas.",
  },
  {
    titulo: "Materiales Accesibles",
    desc: "Guías impresas y videos paso a paso para repasar a tu ritmo.",
  },
];

function IconModulo({ color }: { color: string }) {
  return (
    <svg width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width={22} height={22} fill={color} />
      <rect x={26} width={22} height={22} fill={color} opacity={0.5} />
      <rect y={26} width={22} height={22} fill={color} opacity={0.5} />
      <rect x={26} y={26} width={22} height={22} fill={color} />
    </svg>
  );
}

function IconImpacto({ index }: { index: number }) {
  const colors = ["#DB5227", "#023661", "#DB5227", "#023661"];
  const c = colors[index % colors.length]!;
  return (
    <svg width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx={24} cy={24} r={24} fill={c} opacity={0.15} />
      <circle cx={24} cy={24} r={14} fill={c} />
    </svg>
  );
}

const cardTitleBebas: CSSProperties = {
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: "clamp(20px, 2.5vw, 28px)",
  lineHeight: 1,
  color: "#0A0C12",
  margin: "0 0 10px",
};

const cardBody: CSSProperties = {
  fontFamily: "'Avenir Next', 'Avenir', sans-serif",
  fontSize: "clamp(13px, 1.2vw, 15px)",
  lineHeight: 1.55,
  color: "rgba(10,12,18,0.6)",
  margin: 0,
};

const sectionPad: CSSProperties = {
  padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 6vw, 4rem)",
};

const gridFineLines: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
  gap: "1px",
  background: "rgba(10,12,18,0.08)",
};

export default function AprenderDigitalPage() {
  return (
    <main className={shell.page} data-program="aprender">
      <section className={shell.hero}>
        <div className={shell.heroInner}>
          <p className={shell.heroEyebrow}>Programas · Aprender Digital</p>
          <h1 className={shell.heroTitle}>
            Aprender Digital:
            <br />
            Nunca es Tarde
          </h1>
          <p className={shell.heroSub}>
            Un espacio seguro, cercano y amigable, donde personas adultas y mayores desarrollan confianza, adquieren
            habilidades digitales y mediáticas útiles, y disfrutan conectarse con su entorno, su comunidad y sus seres
            queridos.
          </p>
        </div>
      </section>

      <section style={{ background: "#F5F2EC", ...sectionPad }}>
        <p
          style={{
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#DB5227",
            margin: "0 0 1rem",
          }}
        >
          Nuestros objetivos
        </p>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 0.9,
            color: "#0A0C12",
            margin: "0 0 0.75rem",
          }}
        >
          Capacitamos para una vida
          <br />
          digital plena y segura
        </h2>
        <p
          style={{
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "clamp(14px, 1.4vw, 17px)",
            color: "rgba(10,12,18,0.6)",
            lineHeight: 1.75,
            margin: "0 0 3rem",
            maxWidth: 560,
          }}
        >
          Capacitamos a nuestros participantes para una vida digital plena y segura.
        </p>
        <div style={gridFineLines}>
          {MODULOS.map((mod) => (
            <div
              key={mod.titulo}
              style={{
                background: "#F5F2EC",
                padding: "2rem",
                borderLeft: "3px solid #DB5227",
                borderRadius: 4,
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <IconModulo color={mod.color} />
              </div>
              <p style={cardTitleBebas}>{mod.titulo}</p>
              <p style={cardBody}>{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#0A0C12", ...sectionPad }}>
        <div style={{ maxWidth: 720 }}>
          {[
            "Aunque en Chile el 96,5% de la población cuenta con algún tipo de conectividad, esa cobertura no se traduce automáticamente en capacidades de navegación segura y autónoma en el entorno digital.",
            "Vivimos un momento histórico marcado por avances tecnológicos que amplían las posibilidades de producción y difusión de información, pero también generan un ecosistema saturado por la prisa, el inmediatismo y la dificultad para establecer relaciones profundas.",
            "Los beneficios y, sobre todo, los riesgos derivados de nuestra interacción con medios y tecnologías han situado a la educación mediática y digital como una herramienta que debería estar integrada en la agenda de múltiples instituciones.",
            "Reconocer el acceso a estas herramientas como un derecho no basta: es imprescindible incorporarlas en la educación formal y abrir espacios de debate más allá de las aulas, dirigidos especialmente a quienes ya no forman parte del sistema escolar.",
            "Tener la oportunidad de entender la cultura digital y participar de manera crítica resulta clave para personas adultas y mayores. Esa brecha amplifica sus vulnerabilidades, limitando su acceso al mercado laboral, a información confiable, a servicios básicos y a otros derechos fundamentales.",
            "Resulta imperativo diseñar e implementar políticas sólidas, destinar recursos adecuados y fomentar alianzas con empresas y organizaciones de diversos sectores.",
            "Solo así podremos democratizar el acceso a la educación mediática y digital, garantizando que personas de todas las edades desarrollen autonomía y pensamiento crítico, tanto en entornos en línea como fuera de línea.",
          ].map((text, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                fontSize: "clamp(14px, 1.4vw, 17px)",
                lineHeight: 1.75,
                color: i === 0 ? "#F5F2EC" : "rgba(245,242,236,0.65)",
                marginBottom: "1.25rem",
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </section>

      <section style={{ background: "#F5F2EC", ...sectionPad }}>
        <p
          style={{
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#DB5227",
            margin: "0 0 1rem",
          }}
        >
          Impacto en la comunidad
        </p>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 0.9,
            color: "#0A0C12",
            margin: "0 0 0.75rem",
          }}
        >
          Más allá de las habilidades
          <br />
          individuales
        </h2>
        <p
          style={{
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "clamp(14px, 1.4vw, 17px)",
            color: "rgba(10,12,18,0.6)",
            lineHeight: 1.75,
            margin: "0 0 3rem",
            maxWidth: 560,
          }}
        >
          Un programa que fortalece a todos.
        </p>
        <div style={gridFineLines}>
          {IMPACTOS.map((imp, i) => (
            <div
              key={imp.titulo}
              style={{
                background: "#F5F2EC",
                padding: "2rem",
                borderLeft: "3px solid #DB5227",
                borderRadius: 4,
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <IconImpacto index={i} />
              </div>
              <p style={cardTitleBebas}>{imp.titulo}</p>
              <p style={cardBody}>{imp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#DB5227", ...sectionPad }}>
        <p
          style={{
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(245,242,236,0.6)",
            margin: "0 0 1rem",
          }}
        >
          Nuestra metodología
        </p>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 0.9,
            color: "#F5F2EC",
            margin: "0 0 3rem",
          }}
        >
          Aprendemos juntos,
          <br />a tu ritmo
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "1px",
            background: "rgba(245,242,236,0.08)",
          }}
        >
          {METODOLOGIA.map((met) => (
            <div
              key={met.titulo}
              style={{
                background: "#F5F2EC",
                padding: "2rem",
                borderLeft: "3px solid #DB5227",
                borderRadius: 4,
              }}
            >
              <p style={cardTitleBebas}>{met.titulo}</p>
              <p style={cardBody}>{met.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#023661", ...sectionPad }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 0.9,
            color: "#F5F2EC",
            margin: "0 0 1.5rem",
          }}
        >
          Lleva Aprender Digital
          <br />a tu comunidad
        </h2>
        <p
          style={{
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "clamp(14px, 1.4vw, 17px)",
            color: "rgba(245,242,236,0.65)",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: "0 0 2.5rem",
          }}
        >
          ¿Representas a un municipio, junta de vecinos o centro comunitario? Te invitamos a comunicarte con nosotros
          para acercar este programa a los habitantes.
        </p>
        <a
          href="#contacto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#DB5227",
            color: "#F5F2EC",
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "14px 28px",
            textDecoration: "none",
            borderRadius: 4,
            transition: "opacity 0.2s ease",
          }}
        >
          Contáctanos para más información →
        </a>
      </section>
    </main>
  );
}
