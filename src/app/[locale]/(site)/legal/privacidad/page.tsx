import { Link } from "@/i18n/navigation";
import { LegalPageTemplate } from "@/components/templates/PageTemplates";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Política de Privacidad | Precisar",
};

export default function Page() {
  return (
    <LegalPageTemplate title="Política de privacidad" kicker={`Sitio web · ${SITE.url.replace(/^https:\/\//, "")}`}>
      <p className="text-sm text-[var(--muted)]">Última actualización: 12 de abril de 2026</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">1. Alcance</h2>
      <p>
        Esta política describe cómo {SITE.name} trata la información personal y técnica asociada al uso
        público de nuestro sitio web ({SITE.url}), salvo que exista un aviso o política específica para
        un producto o formulario concreto.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">2. Responsable</h2>
      <p>
        El responsable del sitio y del tratamiento de los datos descritos aquí es la organización detrás
        de {SITE.name}. Para consultas sobre privacidad puedes escribir a{" "}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        {SITE.privacyEmail !== SITE.contactEmail ? (
          <>
            {" "}
            o, para asuntos sensibles de datos personales, a{" "}
            <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>
          </>
        ) : null}
        .
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        3. Qué información podemos tratar
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Datos que nos envías voluntariamente</strong> (por ejemplo, nombre, apellido, correo y
          mensaje en el formulario de contacto del pie de página u otros formularios publicados en el
          sitio), con la finalidad de responder o gestionar tu solicitud.
        </li>
        <li>
          <strong>Datos técnicos de conexión</strong> (por ejemplo, dirección IP, tipo de navegador o
          dispositivo, páginas visitadas y marcas de tiempo) que el alojamiento o servicios de seguridad
          del sitio pueden registrar de forma habitual para operar el servicio, prevenir abusos y
          mejorar la estabilidad.
        </li>
        <li>
          <strong>Newsletter u otros registros</strong> solo si activas explícitamente un formulario que
          indique esa finalidad y, cuando corresponda, el proveedor externo que procese la lista.
        </li>
      </ul>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">4. Conservación y seguridad</h2>
      <p>
        Conservamos la información el tiempo necesario para las finalidades indicadas y según obligaciones
        legales aplicables. Aplicamos medidas razonables de seguridad técnica y organizativa acordes al
        tipo de servicio.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">5. Tus derechos</h2>
      <p>
        Puedes solicitar acceso, rectificación, supresión u oposición al tratamiento de tus datos personales
        cuando la normativa aplicable lo permita, contactándonos por los correos indicados arriba. Si
        resides en Chile, también puedes informarte sobre la Ley de Protección de Datos Personales y sus
        canales oficiales.
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">
        6. Políticas específicas
      </h2>
      <p>Algunas experiencias de {SITE.name} tienen avisos propios, que prevalecen en su ámbito:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <Link href="/legal/privacidad-consulta-2026" className="underline underline-offset-2">
            Privacidad · Consulta ciudadana «¿Cómo te informas hoy?» (2026)
          </Link>
        </li>
        <li>
          <Link href="/legal/privacidad-bot-onda" className="underline underline-offset-2">
            Privacidad · Bot Onda
          </Link>
        </li>
      </ul>
    </LegalPageTemplate>
  );
}
