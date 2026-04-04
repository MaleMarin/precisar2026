import { LegalPageTemplate } from "@/components/templates/PageTemplates";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Política de Privacidad BOT ONDA | Precisar",
};

export default function Page() {
  return (
    <LegalPageTemplate title="Política de Privacidad BOT ONDA" kicker="Legal">
      <p className="text-sm text-[var(--muted)]">
        Última actualización: 27 de febrero de 2026
      </p>
      <p className="mt-2 text-sm">
        <strong>Responsable:</strong> Fundación Precisar ({SITE.url.replace("https://", "")})
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        1. Quién es el responsable
      </h2>
      <p>
        El Chat ONDA (ONDA, el chat, el bot) es un servicio de la Fundación Precisar (en
        adelante, Precisar, nosotros). Esta política describe cómo tratamos la información
        en el uso del chat en web y, cuando corresponda, a través de WhatsApp.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        2. Qué datos recogemos y para qué
      </h2>
      <h3 className="mt-6 text-base font-medium">2.1 En la versión web (sitio web / precisar.net)</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Contenido que tú envías:</strong> mensajes de texto, enlaces, imágenes o
          audios que escribas o adjuntes en el chat.
        </li>
        <li>
          <strong>Datos técnicos:</strong> dirección IP, tipo de navegador y dispositivo, y
          datos de uso (por ejemplo, que se abrió el chat o que se envió un mensaje),
          necesarios para el funcionamiento del servicio y la seguridad.
        </li>
        <li>
          <strong>Finalidad:</strong> Atender tus consultas, generar respuestas con
          inteligencia artificial (IA) y mejorar la calidad del servicio. No usamos el
          contenido de tus mensajes para publicidad ni lo vendemos a terceros.
        </li>
      </ul>

      <h3 className="mt-6 text-base font-medium">2.2 En la versión WhatsApp</h3>
      <ul className="list-disc space-y-2 pl-5">
        <li>Número de teléfono asociado a tu cuenta de WhatsApp.</li>
        <li>
          <strong>Contenido que envías:</strong> texto, audios, imágenes o enlaces que
          mandas al número de ONDA por WhatsApp.
        </li>
        <li>
          Identificadores de mensaje que Meta/WhatsApp y nosotros usamos para entregar y
          procesar las respuestas.
        </li>
        <li>
          <strong>Finalidad:</strong> Prestar el mismo servicio de chat ONDA por WhatsApp:
          responder tus preguntas, procesar audios (transcripción) o imágenes cuando las
          envíes, y devolver respuestas en texto o en audio cuando el sistema lo permita.
        </li>
      </ul>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        3. Base legal y consentimiento
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Ejecución del servicio:</strong> el tratamiento es necesario para darte
          el chat y las respuestas.
        </li>
        <li>
          <strong>Consentimiento:</strong> al usar el chat (web o WhatsApp) aceptas esta
          política. Si eres menor de edad, se recomienda que un padre o tutor conozca el uso
          del servicio.
        </li>
        <li>
          En los lugares en que aplique (por ejemplo, Chile, Brasil o la UE), podremos
          apoyarnos además en el interés legítimo para mejorar el servicio y la seguridad,
          siempre dentro de lo descrito aquí.
        </li>
      </ul>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        4. Con quién compartimos datos
      </h2>
      <p>
        <strong>Proveedores necesarios para el servicio:</strong>
      </p>
      <ul className="mt-2 list-disc space-y-2 pl-5">
        <li>
          <strong>OpenAI:</strong> procesamiento de texto e imágenes y generación de
          respuestas (y, si se usa, de voz).
        </li>
        <li>
          <strong>Vercel (u otro proveedor de hosting):</strong> alojamiento del chat web.
        </li>
        <li>
          <strong>Meta / WhatsApp:</strong> cuando usas ONDA por WhatsApp, los mensajes
          pasan por la infraestructura de Meta según su Política de Privacidad de WhatsApp.
        </li>
      </ul>
      <p className="mt-4">
        No vendemos ni alquilamos tus datos personales. Solo los compartimos en la medida
        necesaria para ofrecer el chat y cumplir la ley.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        5. Retención de datos
      </h2>
      <p>
        <strong>Conversaciones:</strong> los mensajes y respuestas se procesan para generar
        la respuesta en el momento. Podemos conservar registros técnicos o de uso (por
        ejemplo, logs) durante un tiempo limitado necesario para seguridad, depuración o
        cumplimiento legal.
      </p>
      <p>
        <strong>WhatsApp:</strong> los identificadores y el contenido que envías por WhatsApp
        se tratan según esta política y las condiciones de Meta; no conservamos tu número
        para fines distintos al servicio.
      </p>
      <p>
        Puedes pedirnos que no conservemos datos identificables más allá de lo estrictamente
        necesario; en ese caso, contáctanos (ver sección 8).
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        6. Seguridad
      </h2>
      <p>
        Aplicamos medidas técnicas y organizativas para proteger los datos (comunicación
        cifrada, acceso limitado, variables sensibles en entorno seguro). Ningún sistema es
        infalible; si detectas un incidente, agradecemos que nos lo comuniques.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        7. Tus derechos
      </h2>
      <p>
        Según la ley que te aplique (por ejemplo, la Ley 19.628 en Chile o la LGPD en
        Brasil), puedes tener derecho a:
      </p>
      <ul className="mt-4 list-disc space-y-1 pl-5">
        <li>Acceso a los datos que tengamos sobre ti.</li>
        <li>Rectificación o actualización de datos inexactos.</li>
        <li>Eliminación de datos cuando la ley lo permita.</li>
        <li>Limitación u oposición a cierto tratamiento.</li>
        <li>Portabilidad de los datos, cuando sea aplicable.</li>
      </ul>
      <p className="mt-4">
        Para ejercer estos derechos, escríbenos al contacto indicado más abajo. También
        puedes presentar una reclamación ante la autoridad de protección de datos de tu
        país.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        8. Contacto
      </h2>
      <p>Fundación Precisar</p>
      <p>
        Web: <a href={SITE.url}>{SITE.url.replace("https://", "")}</a>
      </p>
      <p>
        Para temas de privacidad del chat ONDA:{" "}
        <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        9. Cambios
      </h2>
      <p>
        Podemos actualizar esta política. Los cambios relevantes se indicarán en la web (por
        ejemplo, en precisar.net o en la página donde se ofrezca el chat) con una nueva
        fecha de Última actualización. El uso continuado del chat después de esos cambios
        implica la aceptación de la política actualizada.
      </p>
      <p className="mt-4">
        Esta política aplica al Chat ONDA ofrecido por la Fundación Precisar en web y,
        cuando corresponda, en WhatsApp.
      </p>
    </LegalPageTemplate>
  );
}
