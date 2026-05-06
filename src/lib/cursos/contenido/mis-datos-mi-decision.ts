import type { CursoContenido } from '@/lib/cursos/tipos'

export const MIS_DATOS_MI_DECISION: CursoContenido = {
  id: 'mis-datos-mi-decision',
  titulo: 'Mis datos, mi decisión',
  subtitulo: 'Cuando el anuncio parece leer tu vida.',
  descripcion:
    'Comentaste en voz alta que querés comprar una caminadora. Al día siguiente te aparece un anuncio de caminadoras en el teléfono. Este módulo recorre qué puede estar pasando y cómo decidir con más control.',
  duracion: '90 minutos',
  storagePrefix: 'mdd',
  rutaQuiz: '/quiz/mis-datos-mi-decision',
  pasos: [
    {
      slug: 'les-mis-datos-mi-decision-bienvenida',
      numero: 0,
      tipo: 'bienvenida',
      label: 'PASO 0 DE 8 · BIENVENIDA',
      orientacion: 'Un caso cotidiano: publicidad, micrófono, permisos y la sensación de ser espiado.',
      titulo: 'Mis datos, mi decisión',
      contenido: {
        tipo: 'bienvenida',
        descripcion:
          'No hace falta una red de espías para sentir que “te escuchan”: hay combinación de señales, historial y azar estadístico. Vas a practicar con un caso sin alarmismo ni negación.',
        dato: 'Las apps piden permisos; la publicidad segmenta por intereses inferidos y ubicación.',
      },
    },
    {
      slug: 'les-mis-datos-mi-decision-caso',
      numero: 1,
      tipo: 'caso_con_opciones',
      label: 'PASO 1 DE 8 · EL CASO',
      orientacion: 'Lee la situación y elegí qué harías primero.',
      titulo: '¿Qué harías?',
      storageKey: 'mdd-paso1-respuesta',
      contenido: {
        tipo: 'caso_con_opciones',
        intro:
          'En la cocina mencionás en familia que te duele la espalda y que estás mirando caminadoras para caminar en casa. No escribiste nada en el celular todavía. Esa tarde abrís una app de videos y la primera publicidad es de caminadoras con envío en tu ciudad.',
        caso:
          'Tu cuñado dice: “Te están grabando el micrófono”. Tu hermana cree que es casualidad. Vos querés saber qué está pasando sin paranoiquear ni ceder todo sin leer.',
        opciones: [
          { id: 'A', texto: 'Desinstalo todas las redes y asumo que todo me espía' },
          {
            id: 'B',
            texto: 'Reviso permisos del micrófono, historial de búsquedas y anuncios personalizados en ajustes',
            esRecomendada: true,
          },
          { id: 'C', texto: 'Ignoro el tema — total todos ya vendieron mis datos' },
          { id: 'D', texto: 'Comparto en redes que hay que tapar el micrófono con cinta sin verificar' },
        ],
      },
    },
    {
      slug: 'les-mis-datos-mi-decision-emocion',
      numero: 2,
      tipo: 'selector_emocion',
      label: 'PASO 2 DE 8 · LO QUE SENTISTE',
      orientacion: 'No hay respuesta correcta — solo observa qué sentiste.',
      titulo: '¿Qué te activó?',
      storageKey: 'mdd-emocion',
      contenido: {
        tipo: 'selector_emocion',
        intro: 'La sensación de vigilancia mezcla enojo, impotencia y curiosidad técnica. ¿Qué predominó en vos?',
        emociones: [
          {
            id: 'invasion',
            label: 'Invasión',
            respuesta: 'Sentir que tu cocina ya no es un espacio privado es incómodo. Nombrarlo ayuda a decidir.',
          },
          {
            id: 'rabia',
            label: 'Rabia',
            respuesta: 'La rabia puede impulsarte a revisar permisos o a pedir transparencia. Evitá solo el post de furia.',
          },
          {
            id: 'curiosidad',
            label: 'Curiosidad',
            respuesta: 'Curiosidad técnica: historial, cookies, segmentación y cuándo un anuncio es pura coincidencia.',
          },
          {
            id: 'desgano',
            label: 'Desgano',
            respuesta: 'El “no importa, igual ya perdí” es común. Aun así, pequeños cambios en permisos suman.',
          },
          {
            id: 'calma',
            label: 'Calma',
            respuesta: 'La calma no es conformismo: te deja revisar sin clicar en pánico.',
          },
        ],
      },
    },
    {
      slug: 'les-mis-datos-mi-decision-senales',
      numero: 3,
      tipo: 'analisis_señales',
      label: 'PASO 3 DE 8 · MIRA MEJOR',
      orientacion: 'Toca o pasa el cursor por las frases resaltadas.',
      titulo: 'Qué puede explicar el anuncio',
      contenido: {
        tipo: 'analisis_señales',
        intro: 'Varias cosas pueden hacer que un anuncio “pegue” sin que un micrófono haya grabado tu cocina.',
        texto:
          'Buscas un producto, mirás videos del tema o tu zona aparece en servicios locales. Los anunciantes compiten por intención de compra: a veces el producto es popular y el anuncio aparece para mucha gente parecida. Algunas apps piden micrófono para funciones razonables; otras abusan. Sin prueba no conviene afirmar grabación.',
        palabras: [
          { frase: 'intención de compra', tooltip: 'El sistema puede inferir interés aunque no hayas escrito aún' },
          { frase: 'compiten', tooltip: 'Subasta de anuncios: varias marcas pujan por el mismo perfil aproximado' },
          { frase: 'popular y el anuncio', tooltip: 'Coincidencia estadística no es prueba de escucha activa' },
          { frase: 'abusan', tooltip: 'Revisar permisos y políticas es el camino verificable' },
        ],
        cierre:
          'Ni paranoia total ni ingenuidad total: conviene revisar permisos, leer términos donde haya tiempo y ajustar publicidad personalizada.',
      },
    },
    {
      slug: 'les-mis-datos-mi-decision-explicacion',
      numero: 4,
      tipo: 'explicacion_tarjetas',
      label: 'PASO 4 DE 8 · CÓMO FUNCIONA',
      orientacion: 'Lee las tres ideas antes de continuar.',
      titulo: 'Cómo se arma el perfil publicitario',
      contenido: {
        tipo: 'explicacion_tarjetas',
        intro: 'Tu dispositivo mezcla datos que vos diste, inferencias y señales del mercado.',
        tarjetas: [
          {
            titulo: 'Datos declarados',
            descripcion: 'Edad, ciudad, intereses que pusiste en perfiles y compras pasadas.',
            colorBorde: '#FF6A00',
          },
          {
            titulo: 'Inferencias',
            descripcion: 'Lo que deduce el sistema por clics, tiempo en pantalla y categorías similares.',
            colorBorde: '#2B4EFF',
          },
          {
            titulo: 'Permisos',
            descripcion:
              'Ubicación, micrófono, cámara y contactos: cada uno puede activarse con un propósito distinto al anuncio.',
            colorBorde: '#E8342A',
          },
        ],
        dato_destacado: 'ENTENDER EL MODELO NO ES ACEPTAR TODO: ES ELEGIR QUÉ APAGAR.',
      },
    },
    {
      slug: 'les-mis-datos-mi-decision-kit',
      numero: 5,
      tipo: 'kit_preguntas',
      label: 'PASO 5 DE 8 · TU HERRAMIENTA',
      orientacion: 'Responde cada pregunta una por una.',
      titulo: 'Kit antes de gritar al micrófono',
      storageKey: 'mdd-kit-respuestas',
      contenido: {
        tipo: 'kit_preguntas',
        intro: 'Cinco preguntas para ordenar el pánico y la verificación.',
        preguntas: [
          '¿Qué apps tienen permiso de micrófono activo sin una razón clara para mí?',
          '¿Busqué o miré algo relacionado en otro dispositivo o cuenta de la familia?',
          '¿El anuncio es de una categoría muy masiva, tipo electrodomésticos?',
          '¿Puedo apagar publicidad personalizada o limitar seguimiento en ajustes?',
          '¿Tengo una fuente seria que explique la acusación de “escucha” o es un rumor viral?',
        ],
      },
    },
    {
      slug: 'les-mis-datos-mi-decision-decision-accion',
      numero: 6,
      tipo: 'decision_accion',
      label: 'PASO 6 DE 8 · DECIDE',
      orientacion: 'Elegí una acción que puedas hacer hoy.',
      titulo: '¿Qué harías ahora?',
      storageKey: 'mdd-decision-accion',
      contenido: {
        tipo: 'decision_accion',
        intro: 'Pequeños pasos tienen más impacto que un discurso largo en el grupo familiar.',
        opciones: [
          {
            id: 'permisos',
            texto: 'Revisar y apagar permisos de micrófono que no necesito',
            orientacion: 'Simple, concreto y revertible.',
          },
          {
            id: 'anuncios',
            texto: 'Configurar limitación de anuncios personalizados y reset de identificadores',
            orientacion: 'Muchos sistemas lo permiten en ajustes.',
          },
          {
            id: 'informar',
            texto: 'Explicar en familia la diferencia entre inferencia y grabación demostrada',
            orientacion: 'Evitás peleas y decisiones apuradas.',
          },
          {
            id: 'denuncia',
            texto: 'Si hay evidencia de abuso, usar canal oficial de la tienda de apps o regulador',
            orientacion: 'Para casos serios, no solo para coincidencias molestas.',
          },
        ],
      },
    },
    {
      slug: 'les-mis-datos-mi-decision-responder',
      numero: 7,
      tipo: 'texto_libre',
      label: 'PASO 7 DE 8 · RESPONDER',
      orientacion: 'Escribe aunque sea una oración.',
      titulo: 'Explicar sin asustar',
      storageKey: 'mdd-texto-responder',
      contenido: {
        tipo: 'texto_libre',
        intro: 'Muchas familias mezclan mito técnico con experiencia real. Una frase calmada ayuda.',
        pregunta: '¿Cómo explicarías en dos frases qué revisar antes de creer que los escuchan siempre?',
        placeholder: 'Escribe aquí...',
        minCaracteres: 20,
      },
    },
    {
      slug: 'les-mis-datos-mi-decision-decision',
      numero: 8,
      tipo: 'decision_final',
      label: 'PASO 8 DE 8 · CIERRE',
      orientacion: 'Completa los campos — no hay respuestas incorrectas.',
      titulo: 'Tu decisión final',
      storageKey: 'mdd-decision-final',
      contenido: {
        tipo: 'decision_final',
        intro: 'Tu privacidad es un hábito diario, no un discurso único.',
        campos: [
          'Un permiso que voy a revisar esta semana:',
          'Un mito digital que dejo de repetir:',
          'A quién le voy a explicar esto con calma:',
          'Un hábito concreto que adopté con este módulo:',
          '¿Cambió mi respuesta inicial? (sí/no + por qué)',
        ],
        mostrarRespuestaInicial: true,
      },
    },
  ],
  señales: [
    {
      id: 'pausar',
      nombre: 'Pausar la conclusión de “me graban”',
      descripcion_fuerte: 'Evitás afirmar sin revisar ajustes ni contexto.',
      descripcion_desarrollando: 'Te detenés antes de viralizar la teoría.',
      descripcion_explorando: 'La sensación es fuerte — la pausa te devuelve control.',
    },
    {
      id: 'emocion',
      nombre: 'Nombrar la incomodidad',
      descripcion_fuerte: 'Reconocés invasión o rabia sin convertirlas en verdad técnica sola.',
      descripcion_desarrollando: 'Separás emoción de evidencia cuando podés.',
      descripcion_explorando: 'Es difícil — seguí nombrando lo que sentís.',
    },
    {
      id: 'fuente',
      nombre: 'Buscar explicación verificable',
      descripcion_fuerte: 'Apelás a documentación del sistema o expertos, no solo a un audio viral.',
      descripcion_desarrollando: 'Te abrís a entender inferencias y permisos.',
      descripcion_explorando: 'Cada revisión suma — no hace falta ser experto.',
    },
    {
      id: 'evidencia',
      nombre: 'Entender el kit de señales',
      descripcion_fuerte: 'Respondiste el kit con criterio y distingues coincidencia de prueba.',
      descripcion_desarrollando: 'Ordenás variables antes de culpar al micrófono.',
      descripcion_explorando: 'El kit está para reutilizar.',
    },
    {
      id: 'amplificar',
      nombre: 'No amplificar teorías sin pasos prácticos',
      descripcion_fuerte: 'Evitás alarmar sin sugerir ajustes concretos.',
      descripcion_desarrollando: 'Pesás el costo de infundir miedo en familia.',
      descripcion_explorando: 'Compartir con cuidado es habilidad — practicá.',
    },
    {
      id: 'criterio',
      nombre: 'Decidir con criterio propio',
      descripcion_fuerte: 'Tu cierre muestra decisiones locales que sí podés controlar.',
      descripcion_desarrollando: 'Tu reflexión es honesta — eso ya es criterio.',
      descripcion_explorando: 'Pequeños hábitos acumulan privacidad real.',
    },
  ],
}
