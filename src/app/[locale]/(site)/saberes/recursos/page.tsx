import type { Metadata } from "next";
import styles from "./RecursosPage.module.css";

export const metadata: Metadata = {
  title: "Recursos descargables · Precisar",
  description:
    "Guías, materiales y recursos de educación mediática e informacional de Precisar.",
};

const RECURSOS = [
  {
    titulo: "Inteligencia Artificial en el Aula: Qué, Cómo y Para Qué",
    descripcion:
      "Guía práctica para incorporar la IA en educación de forma responsable y equitativa —detalla oportunidades y riesgos, criterios éticos y de privacidad, requerimientos de infraestructura y formación docente, y pasos de gobernanza para centros y autoridades.",
    portada: "/covers/portada-ia-en-aula.png",
    pdf: "/recursos-ia-en-aula.pdf",
  },
  {
    titulo: "30 preguntas para explorar tu vida digital",
    descripcion:
      "Este recurso reúne 30 preguntas que invitan a observar con más atención nuestros hábitos digitales, emociones, decisiones y relaciones en línea. No están hechas para evaluar, sino para provocar curiosidad, conversación y pensamiento crítico.",
    portada: "/covers/30-preguntas-explora-vida-digital.png",
    pdf: "/recursos-30-preguntas.pdf",
  },
  {
    titulo: "Uso Consciente de la Inteligencia Artificial",
    descripcion:
      "Guía práctica sobre el uso consciente de la IA. Explica qué es la IA, cómo la usamos en la vida cotidiana y los principales riesgos asociados. Incluye ejemplos prácticos y consejos de seguridad.",
    portada: "/covers/portada-uso-consciente-ia.png",
    pdf: "/recursos-uso-consciente-ia.pdf",
  },
  {
    titulo: "Guía Práctica de Primeros Pasos en Educación Mediática e Informacional en Chile",
    descripcion:
      "La primera Guía Práctica de Educación Mediática e Informacional en Chile, creada por EducaMedios de Precisar. Una invitación a explorar el entorno digital con criterio y confianza.",
    portada: "/covers/portada-primeros-pasos-ami.png",
    pdf: "/recursos-guia-primeros-pasos-ami.pdf",
  },
  {
    titulo: "Guía Práctica sobre Inteligencia Artificial (IA)",
    descripcion:
      "Te guía paso a paso para entender qué es la IA, cómo funciona y cómo usarla de forma segura y responsable.",
    portada: "/covers/portada-guia-practica-ia.png",
    pdf: "/recursos-guia-practica-ia.pdf",
  },
  {
    titulo: "¿Por qué necesitamos evaluar críticamente los contenidos en línea?",
    descripcion:
      "Herramienta práctica con 12 preguntas clave para realizar actividades que enseñen a evaluar lo que vemos en internet antes de compartirlo.",
    portada: "/covers/portada-evaluar-contenidos.png",
    pdf: "/recursos-evaluar-contenidos.pdf",
  },
  {
    titulo: "Guía Práctica: Cómo Verificar Imágenes y Videos",
    descripcion:
      "Enseña paso a paso cómo identificar si una foto o un video son reales o han sido manipulados, usando herramientas simples y técnicas de observación crítica.",
    portada: "/covers/portada-verificar-imagenes.png",
    pdf: "/recursos-verificar-imagenes-videos.pdf",
  },
];

export default function RecursosPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.kicker}>Saberes · Recursos</p>
        <h1 className={styles.titulo}>
          Material para
          <br />
          descargar
        </h1>
        <p className={styles.bajada}>
          Guías, materiales y recursos de educación mediática e informacional de Precisar. Todos de libre descarga y uso bajo licencia Creative Commons CC BY 4.0.
        </p>
      </div>
      <div className={styles.grid}>
        {RECURSOS.map((r, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.portadaWrap}>
              <img src={r.portada} alt={`Portada: ${r.titulo}`} className={styles.portada} />
            </div>
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitulo}>{r.titulo}</h2>
              <p className={styles.cardDesc}>{r.descripcion}</p>
              <a
                href={r.pdf}
                download
                className={styles.descargaBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                DESCARGA ↓
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
