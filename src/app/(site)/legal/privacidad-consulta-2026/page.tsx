import { LegalPageTemplate } from "@/components/templates/PageTemplates";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Política de Privacidad Consulta | Precisar",
};

export default function Page() {
  return (
    <LegalPageTemplate
      title="Política de Privacidad y Tratamiento de Datos Personales"
      kicker="Consulta: ¿Cómo te Informas Hoy? · DemocraTICa."
    >
      <p className="text-sm text-[var(--muted)]">
        Fecha de última actualización: 31 de diciembre de 2025
      </p>

      <h2 className="mt-12 font-[family-name:var(--font-display)] text-xl font-medium">
        1. Introducción
      </h2>
      <p>
        La presente Política de Privacidad y Tratamiento de Datos Personales (en adelante,
        la &quot;Política de Privacidad&quot;) tiene por objeto informar a los participantes
        de la consulta ciudadana &quot;¿Cómo te informas hoy?&quot; (en adelante, la
        &quot;Consulta&quot;), impulsada por la Fundación Democracia Abierta y su iniciativa
        Precisar (en adelante, &quot;DemocraTICa&quot; o &quot;nosotros&quot;), sobre cómo
        recolectamos, usamos, almacenamos, compartimos y protegemos sus datos personales,
        en conformidad con la legislación chilena vigente y las mejores prácticas
        internacionales en la materia.
      </p>
      <p>
        DemocraTICa está comprometida con el respeto y la protección de su privacidad y sus
        datos personales. Esta política se ha redactado en cumplimiento de la normativa
        chilena vigente, Ley N° 19.628 sobre Protección de la Vida Privada (en su versión
        vigente) y la nueva Ley N° 21.719 de Protección de Datos Personales, que moderniza
        la legislación y la alinea con los más altos estándares internacionales, como el
        Reglamento General de Protección de Datos (RGPD) de la Unión Europea.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        2. Responsable del Tratamiento de Datos
      </h2>
      <p>El responsable del tratamiento de sus datos personales es:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Razón social:</strong> Fundación Democracia Abierta
        </li>
        <li>
          <strong>RUT:</strong> 65.198.517-K
        </li>
        <li>
          <strong>Correo electrónico:</strong>{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        </li>
        <li>
          <strong>Representante legal:</strong> Ana Magdalena Marín Ladrón de Guevara
        </li>
      </ul>
      <p className="mt-4">
        <strong>Delegado de Protección de Datos</strong> (si la organización ha designado un
        Delegado conforme al artículo 50 de la Ley 21.719):
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <strong>Nombre:</strong> Ana Magdalena Marín Ladrón de Guevara
        </li>
        <li>
          <strong>Cargo:</strong> Delegado de Protección de Datos
        </li>
        <li>
          <strong>Correo electrónico:</strong>{" "}
          <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>
        </li>
      </ul>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        3. ¿Qué datos personales recolectamos?
      </h2>
      <p>En el marco de la Consulta, recolectaremos las siguientes categorías de datos personales:</p>

      <h3 className="mt-6 text-base font-medium">3.1 Datos de Identificación y Contacto</h3>
      <p>De manera opcional, podremos solicitar datos como: correo electrónico; nombre completo.</p>
      <p>
        <strong>Finalidad:</strong> Futuras comunicaciones sobre los resultados del estudio
        o para invitarle a participar en etapas posteriores del proyecto.
      </p>
      <p>
        <strong>Aclaración importante:</strong> Su participación en la consulta no está
        condicionada a la entrega de esta información. Puede participar de forma anónima.
      </p>

      <h3 className="mt-6 text-base font-medium">3.2 Datos Sociodemográficos</h3>
      <p>
        Recopilaremos datos como: edad (en rangos: 18-25, 26-35, 36-50, 51-65, 65+); género
        (masculino, femenino, otro, prefiero no especificar); nivel educacional (básico,
        medio, técnico, universitario, postgrado); comuna de residencia; región de
        residencia; estudios (en categorías generales).
      </p>
      <p>
        <strong>Protección:</strong> Estos datos se solicitarán en rangos o de forma
        anonimizada para proteger su identidad. No se recopilará información que permita
        identificarlo directamente.
      </p>

      <h3 className="mt-6 text-base font-medium">3.3 Datos sobre Hábitos y Preferencias de Información</h3>
      <p>La Consulta se centra en preguntas sobre: cómo se informa; qué medios utiliza (televisión, radio, prensa escrita, redes sociales, plataformas digitales, etc.); con qué frecuencia se informa; qué formatos prefiere (texto, video, audio, infografías, etc.); cuáles son sus temas de interés (política, economía, tecnología, salud, etc.).</p>

      <h3 className="mt-6 text-base font-medium">3.4 Datos sobre Habilidades y Necesidades de Alfabetización Mediática</h3>
      <p>
        Recopilaremos información sobre: sus habilidades para verificar información; su
        capacidad de usar tecnología; su comprensión de noticias y datos; su capacidad de
        identificar desinformación.
      </p>

      <h3 className="mt-6 text-base font-medium">3.5 Opiniones y Percepciones</h3>
      <p>
        Solicitaremos su opinión sobre: la desinformación y sus efectos; la inteligencia
        artificial en medios; las posibles soluciones a estos fenómenos; confianza en
        diferentes medios de comunicación.
      </p>

      <h3 className="mt-6 text-base font-medium">3.6 Datos Sensibles</h3>
      <p>
        La Consulta podría incluir preguntas sobre: sus opiniones políticas o ideológicas;
        sus creencias religiosas (si aplica); cualquier otra información considerada sensible
        conforme a la Ley 21.719.
      </p>
      <p>
        <strong>Protección especial:</strong> El tratamiento de estos datos sensibles se
        realizará únicamente con su consentimiento explícito y con las más estrictas medidas
        de seguridad. Le informaremos de manera clara y destacada cuando una pregunta
        involucre este tipo de datos, y podrá elegir no responder sin que esto afecte su
        participación en la consulta.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        4. ¿Para qué utilizamos sus datos personales?
      </h2>
      <p>
        Los datos personales que recolectamos serán utilizados exclusivamente para las
        siguientes finalidades:
      </p>
      <h3 className="mt-6 text-base font-medium">4.1 Análisis Estadístico</h3>
      <p>
        Para generar evidencia agregada y anonimizada sobre: hábitos informativos de la
        ciudadanía en Chile; necesidades de información; percepciones sobre desinformación y
        alfabetización mediática.
      </p>
      <p>
        <strong>Aclaración:</strong> Los análisis se presentarán siempre en forma agregada,
        sin posibilidad de identificar a participantes individuales.
      </p>
      <h3 className="mt-6 text-base font-medium">4.2 Investigación Académica y Social</h3>
      <p>
        Los resultados de la Consulta serán utilizados para: elaboración de informes;
        estudios académicos; publicaciones científicas; contribución al conocimiento sobre
        desinformación y alfabetización mediática.
      </p>
      <h3 className="mt-6 text-base font-medium">4.3 Diseño de Prototipos y Soluciones</h3>
      <p>
        La información recopilada servirá como insumo para: co-diseño de nuevos formatos de
        noticias; desarrollo de plataformas informativas; creación de recursos educativos;
        desarrollo de herramientas de verificación de información.
      </p>
      <h3 className="mt-6 text-base font-medium">4.4 Incidencia en Políticas Públicas</h3>
      <p>
        Los hallazgos del proyecto serán compartidos con: tomadores de decisión; medios de
        comunicación; organizaciones de la sociedad civil; organismos públicos.{" "}
        <strong>Objetivo:</strong> Promover políticas públicas y prácticas que fortalezcan
        el ecosistema informativo chileno.
      </p>
      <h3 className="mt-6 text-base font-medium">4.5 Comunicación y Difusión</h3>
      <p>
        Si usted ha consentido en ello, podremos utilizar su correo electrónico para:
        enviarle información sobre los avances del proyecto; compartir resultados y
        hallazgos; invitarle a participar en futuras iniciativas relacionadas.
      </p>
      <p>
        <strong>Derecho de revocación:</strong> Puede revocar este consentimiento en
        cualquier momento contactándonos.
      </p>
      <h3 className="mt-6 text-base font-medium">4.6 Cumplimiento de Obligaciones Legales</h3>
      <p>
        Podremos utilizar sus datos para: cumplir con obligaciones legales; responder a
        requerimientos de autoridades competentes; proteger nuestros derechos legales.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        5. Bases Legales para el Tratamiento de sus Datos
      </h2>
      <h3 className="mt-6 text-base font-medium">5.1 Consentimiento Libre, Informado, Específico e Inequívoco</h3>
      <p>
        Su participación en la Consulta es voluntaria. Al iniciar la encuesta, le
        solicitaremos su consentimiento de forma clara y explícita para el tratamiento de sus
        datos personales, de acuerdo con los fines descritos en esta política.
      </p>
      <p>
        Características del consentimiento: libre; informado; específico; inequívoco. Para
        datos sensibles: solicitaremos consentimiento explícito adicional antes de recopilar
        cualquier dato considerado sensible.
      </p>
      <h3 className="mt-6 text-base font-medium">5.2 Interés Legítimo</h3>
      <p>
        Podremos tratar sus datos de forma anonimizada y agregada para fines de
        investigación y estadística, en el marco del interés legítimo del proyecto de:
        generar conocimiento para el bien público; fortalecer el ecosistema informativo
        chileno; contribuir al debate público informado; mejorar la alfabetización mediática.
      </p>
      <p>
        <strong>Equilibrio de intereses:</strong> Este interés legítimo no prevalece sobre
        sus derechos fundamentales, y los datos se tratan siempre de forma anonimizada
        cuando se utiliza esta base legal.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        6. ¿Con quién compartimos sus datos personales?
      </h2>
      <p>
        DemocraTICa no venderá, alquilará ni cederá sus datos personales a terceros con
        fines de lucro. Sus datos podrán ser compartidos únicamente en las siguientes
        circunstancias:
      </p>
      <h3 className="mt-6 text-base font-medium">6.1 Equipo de Investigación</h3>
      <p>
        El equipo de DemocraTICa y sus colaboradores directos tendrán acceso a los datos
        para los fines del proyecto, bajo estrictos acuerdos de confidencialidad que
        incluyen: obligación de guardar secreto; restricción de uso a fines del proyecto;
        prohibición de comunicación a terceros; sanciones por incumplimiento.
      </p>
      <h3 className="mt-6 text-base font-medium">6.2 Aliados Estratégicos</h3>
      <p>
        Podremos compartir datos agregados y anonimizados con: organizaciones de la
        sociedad civil; universidades y centros de investigación; medios de comunicación;
        organismos públicos. <strong>Condición:</strong> Estos datos se compartirán siempre
        en forma agregada, sin posibilidad de identificar a participantes individuales.
      </p>
      <h3 className="mt-6 text-base font-medium">6.3 Publicaciones y Divulgación</h3>
      <p>
        Los informes y publicaciones derivados del proyecto presentarán los datos de forma
        agregada, estadística, anonimizada, sin posibilidad de identificar a participantes
        individuales.
      </p>
      <h3 className="mt-6 text-base font-medium">6.4 Requerimientos Legales</h3>
      <p>
        Podremos compartir sus datos personales si así lo exige: una ley vigente; un decreto
        o resolución; una orden judicial. <strong>Protección:</strong> En estos casos,
        informaremos al titular sobre el requerimiento, salvo que la ley lo prohiba
        expresamente.
      </p>
      <h3 className="mt-6 text-base font-medium">6.5 Proveedores de Servicios</h3>
      <p>
        Podremos compartir datos con proveedores de servicios que nos ayudan a operar
        (hosting, análisis, etc.), bajo contratos que garantizan: protección equivalente de
        datos; uso exclusivo para fines del proyecto; obligaciones de confidencialidad.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        7. ¿Por Cuánto Tiempo Conservamos sus Datos?
      </h2>
      <p>
        Conservaremos sus datos personales según el cronograma publicado en el sitio
        original: datos de identificación y contacto (3 años desde la última comunicación,
        eliminación segura); datos sociodemográficos, hábitos informativos y opiniones (5
        años desde recopilación, anonimización o eliminación); datos sensibles (3 años desde
        recopilación, eliminación segura); datos agregados/anonimizados (indefinido para
        investigación).
      </p>
      <p>
        Procedimiento de eliminación: los datos se eliminarán de forma segura mediante
        métodos criptográficos; se generará certificado de eliminación; se mantendrá registro
        de eliminaciones. Cuando sea posible, los datos se anonimizarán en lugar de
        eliminarse; los datos anonimizados pueden conservarse indefinidamente para
        investigación.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        8. ¿Cuáles son sus Derechos y Cómo Puede Ejercerlos?
      </h2>
      <p>Conforme a la Ley 21.719, usted tiene derecho a:</p>
      <ul className="mt-4 list-disc space-y-2 pl-5">
        <li>
          <strong>Acceso:</strong> acceder a los datos personales que tenemos sobre usted.
          Envíe un correo a {SITE.contactEmail} con asunto &quot;Solicitud de Acceso a Datos
          Personales&quot;, adjunte copia de su cédula. Plazo de respuesta: máximo 30 días
          hábiles.
        </li>
        <li>
          <strong>Rectificación:</strong> corregir datos inexactos. Asunto: &quot;Solicitud
          de Rectificación de Datos Personales&quot;.
        </li>
        <li>
          <strong>Supresión o cancelación:</strong> cuando carezca de fundamento legal,
          caduquen plazos, revoque consentimiento u oponga tratamiento. Asunto:
          &quot;Solicitud de Supresión de Datos Personales&quot;.
        </li>
        <li>
          <strong>Oposición:</strong> oponerse a tratamientos específicos. Asunto:
          &quot;Solicitud de Oposición al Tratamiento de Datos&quot;.
        </li>
        <li>
          <strong>Portabilidad:</strong> solicitar portabilidad en formato estructurado.
          Asunto: &quot;Solicitud de Portabilidad de Datos Personales&quot;.
        </li>
        <li>
          <strong>Revocación de consentimiento:</strong> en cualquier momento. Asunto:
          &quot;Revocación de Consentimiento&quot;. El tratamiento futuro se detendrá; los
          datos ya tratados lícitamente no serán afectados.
        </li>
      </ul>
      <p className="mt-4">
        Para ejercer cualquiera de estos derechos, envíe una solicitud al correo{" "}
        {SITE.contactEmail} con nombre completo, copia de cédula, descripción clara de lo
        solicitado y firma (en caso de envío físico). Confirmación de recepción dentro de 2
        días hábiles; respuesta dentro de 30 días hábiles máximo. Puede recurrir ante la
        Agencia de Protección de Datos Personales si no está satisfecho.
      </p>
      <p>
        Contacto de la APDP: sitio web, correo y teléfono se completarán cuando la APDP esté
        operativa. Plazo para reclamo: dentro de 1 año desde que conoce los hechos que lo
        motivan.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        10. Cambios a esta Política de Privacidad
      </h2>
      <p>
        Fundación Democracia Abierta se reserva el derecho de modificar esta Política de
        Privacidad en cualquier momento. Si no está de acuerdo con cambios significativos,
        puede: revocar su consentimiento; solicitar la supresión de sus datos; contactarnos
        para discutir alternativas.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        11. Contacto y Atención de Consultas
      </h2>
      <p>
        Si tiene alguna pregunta o inquietud sobre esta Política de Privacidad o sobre el
        tratamiento de sus datos personales, puede contactarnos a través de{" "}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
      </p>
      <p className="mt-4 text-sm text-[var(--muted)]">
        <strong>11.1 Vigencia:</strong> Esta Política entra en vigencia a partir del 31 de
        diciembre de 2025 y será aplicable a todos los datos recopilados a partir de esa
        fecha.
      </p>
      <p className="text-sm text-[var(--muted)]">
        <strong>11.2 Compatibilidad con normativa futura:</strong> Cuando la Agencia de
        Protección de Datos Personales esté operativa, nos alinearemos con sus directrices y
        recomendaciones.
      </p>
      <p className="text-sm text-[var(--muted)]">
        <strong>11.3 Jurisdicción:</strong> Cualquier disputa relacionada con esta Política
        será resuelta conforme a las leyes de la República de Chile y la competencia de los
        tribunales chilenos.
      </p>
      <p className="mt-6 text-sm text-[var(--muted)]">
        Versión: 1.0 · Fecha de última actualización: 31 de diciembre de 2025 · Próxima
        revisión prevista: 30 de junio de 2026
      </p>
      <p className="text-sm text-[var(--muted)]">
        Esta política ha sido redactada en cumplimiento de la Ley 21.719 de Protección de
        Datos Personales de Chile. Para información adicional sobre sus derechos, visite el
        sitio web de la Agencia de Protección de Datos Personales cuando esté operativa.
      </p>
    </LegalPageTemplate>
  );
}
