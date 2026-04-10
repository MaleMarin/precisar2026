import { InstitutionalTemplate } from "@/components/templates/PageTemplates";

export const metadata = {
  title: "Comunicación",
  description:
    "Eje de educación mediática Precisar: cómo se produce y circula la información, y cómo ejercer el derecho a informarnos y expresarnos con criterio.",
};

export default function Page() {
  return (
    <InstitutionalTemplate title="Comunicación" kicker="Educación mediática ampliada">
      <p>
        Este eje es una invitación a pensar la comunicación no solo como algo que
        recibimos, sino también como algo que creamos, compartimos y transformamos.
      </p>
      <p>
        Este eje, Comunicación es el punto de partida esencial para entender cómo se
        construyen nuestras ideas sobre el mundo. No se trata solo de medios de
        comunicación tradicionales, sino de todo el ecosistema que produce, distribuye y
        resignifica la información que consumimos a diario: desde un noticiero hasta un
        meme en redes sociales.
      </p>
      <p>
        Lo que propone este eje es mirar con lupa el camino que recorre la información,
        cuestionar quién la produce, por qué y con qué intención. También invita a
        fortalecer el derecho a expresarnos, a informarnos de manera libre y a reconocer
        cuándo ese derecho está en riesgo —por la censura, la desinformación o la
        invisibilización de ciertas comunidades.
      </p>
      <p>
        La comunicación no es neutra: puede conectar o dividir, visibilizar o excluir. Por
        eso, este eje promueve una ciudadanía crítica y activa, capaz de identificar
        mecanismos de manipulación (como las fake news), exigir transparencia en los
        medios, participar en experiencias comunicativas propias, defender la libertad de
        expresión con responsabilidad, y salir de burbujas y polarizaciones para escuchar
        otras miradas.
      </p>
      <h2>Claves para entender el mundo mediático</h2>
      <ul>
        <li>Ecosistema mediático</li>
        <li>Libertad de Expresión y Derecho a la Información</li>
        <li>Medios de Comunicación</li>
        <li>Desinformación</li>
        <li>Redes sociales</li>
      </ul>
      <p>
        Es el conjunto de medios, plataformas y actores que producen y difunden información.
        Incluye desde grandes canales hasta redes sociales y medios comunitarios. Entender
        quién comunica, cómo y con qué intereses es clave para leer mejor lo que vemos.
      </p>
    </InstitutionalTemplate>
  );
}
