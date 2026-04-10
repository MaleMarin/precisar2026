export type PreguntaTarjeta = {
  pregunta: string;
  reflexion: string;
};

/** 30 preguntas + reverso (reflexión breve, tono Precisar). */
export const PREGUNTAS_VIDA_DIGITAL: PreguntaTarjeta[] = [
  {
    pregunta: "¿Cuánto tiempo pasaste hoy mirando una pantalla?",
    reflexion:
      "No se trata de culpa: se trata de ver cuánto de ese tiempo fue elección y cuánto, hábito o diseño. Nombrar el total ya es un primer acto de criterio.",
  },
  {
    pregunta: "¿Qué fue lo último que buscaste en internet?",
    reflexion:
      "Las búsquedas son huellas de urgencias, miedos y curiosidades. Mirarlas con calma ayuda a entender qué nos está pidiendo atención el día.",
  },
  {
    pregunta: "¿Compartiste algo hoy sin verificarlo antes?",
    reflexion:
      "Compartir es un gesto editorial mínimo: amplifica. Pausar un minuto —fuente, fecha, tono emocional— es cuidar a quienes nos leen.",
  },
  {
    pregunta: "¿Hay una app que uses más de lo que quisieras?",
    reflexion:
      "Cuando el uso se dispara, rara vez es solo ‘falta de fuerza de voluntad’. Notificaciones, recompensas y rutinas están pensadas para retener.",
  },
  {
    pregunta: "¿Recuerdas algo importante que aprendiste en línea?",
    reflexion:
      "Si algo quedó, pregúntate cómo lo sabes: ¿lo leíste, lo escuchaste, lo contrastaste? La pantalla también enseña; merece el mismo rigor que un libro.",
  },
  {
    pregunta: "¿Cómo sabes si una noticia es verdadera?",
    reflexion:
      "La veracidad casi nunca es un sí/no instantáneo: es cruce de fuentes, contexto y tiempo. La duda informada vale más que el compartir rápido.",
  },
  {
    pregunta: "¿Tu celular está presente cuando comes con otros?",
    reflexion:
      "La mesa compartida es un bien escaso. El teléfono boca abajo no es moralidad; es proteger espacio para escuchar sin competir con el feed.",
  },
  {
    pregunta: "¿Qué datos tuyos tienen las apps que usas?",
    reflexion:
      "Permisos y políticas aburridas esconden el trato real con tu información. Leerlos, aunque sea por partes, devuelve un poco de agencia.",
  },
  {
    pregunta: "¿Alguna vez borraste algo que publicaste?",
    reflexion:
      "Borrar no borra del todo: copias, capturas y memoria ajena existen. Publicar con pausa evita arrepentimientos que la red no olvida igual.",
  },
  {
    pregunta: "¿Sigues en redes a personas con las que no estás de acuerdo?",
    reflexion:
      "El desacuerdo incómodo puede ser saludable si no se vuelve solo ruido o hostigamiento. Elegir a quién escuchar es formar tu mapa mental.",
  },
  {
    pregunta: "¿Cuándo fue la última vez que leíste algo largo en papel?",
    reflexion:
      "El soporte cambia el ritmo: desplazar versus voltear, hipervínculo versus página seguida. Probar otros ritmos entrena la atención profunda.",
  },
  {
    pregunta: "¿Cómo te sientes después de ver las noticias?",
    reflexion:
      "Nombrar la emoción (rabia, miedo, cansancio) es el primer paso para no reaccionar en automático ni confundir estimulación con información.",
  },
  {
    pregunta: "¿Hay algo que no publicarías jamás? ¿Por qué?",
    reflexion:
      "Los límites personales delatan qué protegemos: intimidad, trabajo, familia. Escribirlos en voz alta ayuda a sostenerlos frente a la presión del ‘oversharing’.",
  },
  {
    pregunta: "¿Quién decide qué ves primero en tus redes?",
    reflexion:
      "Lo que parece ‘natural’ en el feed es resultado de reglas, negocios y señales de engagement. Saberlo no arruina la diversión; evita el engaño.",
  },
  {
    pregunta: "¿Tienes contraseñas seguras en todas tus cuentas?",
    reflexion:
      "Una clave débil o repetida encadena correo, banco y recuerdos. Gestores de contraseñas y la verificación en dos pasos son higiene digital básica.",
  },
  {
    pregunta: "¿Reconoces cuando un contenido quiere manipularte?",
    reflexion:
      "Titulares en mayúsculas, urgencias falsas y villanos claros suelen ser señales. Pregúntate: ¿qué me piden que sienta en los primeros tres segundos?",
  },
  {
    pregunta: "¿Buscas la misma información en varias fuentes?",
    reflexion:
      "Un solo relato, por brillante que sea, deja fuera matices. Comparar versiones es la vacuna más barata contra la desinformación.",
  },
  {
    pregunta: "¿Hay algo que el algoritmo te muestra demasiado?",
    reflexion:
      "Lo repetido no siempre es lo importante; a veces es lo rentable para la plataforma. Cambiar de cuenta, de fuente o de formato rompe el bucle.",
  },
  {
    pregunta: "¿Cuándo fue la última vez que te desconectaste un día entero?",
    reflexion:
      "La fricción de estar offline recuerda qué infraestructuras damos por sentadas: mapas, pagos, mensajes. Es un experimento útil, no castigo.",
  },
  {
    pregunta: "¿Usas el mismo tono en línea que en persona?",
    reflexion:
      "Coherencia no es performance: es coherencia con los afectos. El sarcasmo o la dureza que ‘funcionan’ en pantalla pueden herir igual que en la mesa.",
  },
  {
    pregunta: "¿Has cambiado de opinión por algo que leíste en internet?",
    reflexion:
      "Actualizar ideas con buena evidencia es señal de madurez, no de debilidad. El problema es cambiar solo por viralidad, sin contraste.",
  },
  {
    pregunta: "¿Sabes qué es una cámara de eco digital?",
    reflexion:
      "Espacios donde solo se confirma lo que ya creemos. Pueden dar consuelo, pero también empobrecen el juicio. Mezclar ecosystemas es educación mediática viva.",
  },
  {
    pregunta: "¿Qué harías si te hackearan una cuenta?",
    reflexion:
      "Tener un plan simple —cerrar sesiones, avisar contactos, revisar correo de recuperación— reduce el daño. Pensarlo antes es más barato que lamentarlo después.",
  },
  {
    pregunta: "¿Le has explicado a alguien mayor cómo usar una app?",
    reflexion:
      "Enseñar obliga a ordenar lo que damos por obvio: iconos, gestos, riesgos. Esa traducción intergeneracional es alfabetización compartida.",
  },
  {
    pregunta: "¿Qué tipo de contenido produces tú?",
    reflexion:
      "Cada post es huella ética: qué mostramos, a quién etiquetamos, qué omitimos. Producir con criterio es parte de la convivencia digital.",
  },
  {
    pregunta: "¿Tienes derecho a que te olviden en internet?",
    reflexion:
      "Depende del país y del tipo de dato; a veces hay vías legales. Aunque no exista el ‘olvido total’, informarse sobre derechos ARCO y borrado es un paso concreto.",
  },
  {
    pregunta: "¿Qué significa para ti la privacidad digital?",
    reflexion:
      "No es esconderse: es conservar margen para pensar, equivocarse y relacionarse sin ser perfilados al milímetro para terceros.",
  },
  {
    pregunta: "¿Hay diferencia entre información y conocimiento?",
    reflexion:
      "La información son datos; el conocimiento es esos datos ordenados con contexto y criterio. Sin el segundo, solo acumulamos ruido con prisa.",
  },
  {
    pregunta: "¿Qué pasaría si internet desapareciera un mes?",
    reflexion:
      "Imaginar el vacío revela qué servicios son lujo, cuáles son derecho, y cuánto delegamos en pocas empresas. Es un mapa de dependencias.",
  },
  {
    pregunta: "¿Qué quieres que diga internet de ti en 10 años?",
    reflexion:
      "La reputación se construye con constancia. Lo que publicamos hoy —y lo que elegimos no publicar— cuenta la historia que otros leerán mañana.",
  },
];
