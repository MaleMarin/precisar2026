import { PageShell } from "@/components/PageShell";
import { SITE } from "@/lib/site";

export const metadata = { title: "Agenda de Educación Mediática" };

export default function Page() {
  return (
    <PageShell title="Agenda de Educación Mediática" kicker="Política pública">
      <p>
        En Precisar reconocemos que nuestro entorno tecnológico, mediático y social en
        constante evolución está brindando nuevas posibilidades para que todas las
        personas participen activamente en su sociedad y se involucren en la difusión, lo
        digital y otros contenidos y servicios mediáticos.
      </p>
      <p>
        Sin embargo, en Precisar también observamos que estos entornos cambiantes pueden
        facilitar la distribución y acceso a material que amenaza la cohesión social,
        incitando al odio hacia determinados grupos de personas (por motivos de
        nacionalidad, etnia, género) o promoviendo opiniones extremistas que socavan los
        valores democráticos fundamentales.
      </p>
      <p>
        Consideramos que la alfabetización mediática es la clave para empoderar a las
        personas con las habilidades y conocimientos necesarios para comprender cómo
        funcionan los medios en este entorno cambiante, interrogar la precisión de la
        información, contrarrestar representaciones injustas e inexactas, desafiar puntos
        de vista extremistas y, en última instancia, tomar decisiones mediáticas mejor
        informadas.
      </p>
      <p>
        Es en este contexto que Precisar ha desarrollado esta Propuesta de Política de
        Alfabetización Mediática Digital como parte de nuestro compromiso con la
        promoción, fomento e investigación de medidas y actividades dirigidas hacia el
        desarrollo de la alfabetización mediática en la sociedad digital contemporánea.
      </p>
      <h2>Objetivos de la Propuesta de Política</h2>
      <p>
        El objetivo general es dotar a los ciudadanos de las habilidades necesarias y
        conocimientos para tomar decisiones informadas sobre el contenido y los servicios
        mediáticos que consumen, crean y difunden.
      </p>
      <p>
        Objetivos estratégicos: comprensión crítica de medios; acceso seguro y eficaz;
        participación responsable; comprensión y uso de IA; innovación y adaptabilidad.
      </p>
      <p>
        El documento completo incluye marco estratégico, competencias, habilidades,
        indicadores de éxito y planes detallados por eje (acceso seguro, participación,
        IA, etc.).
      </p>
      <p>
        <a href={`${SITE.url}/agenda`} target="_blank" rel="noreferrer">
          Ver versión íntegra publicada en {SITE.url}/agenda
        </a>
      </p>
    </PageShell>
  );
}
