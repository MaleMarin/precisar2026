import type { CursoContenido } from '@/lib/cursos/tipos'

export const CLIMA_SIN_CATASTROFE: CursoContenido = {
  id: 'clima-sin-catastrofe',
  titulo: 'Clima sin catástrofe',
  subtitulo: 'Entre el negacionismo y el alarmismo hay datos.',
  descripcion:
    'Circula una nota viral: el volcán Villarrica habría emitido más CO₂ que todos los autos del mundo en 100 años. Este módulo practica cómo leer una cifra grande sin caer en el sensacionalismo ni negar el cambio climático.',
  duracion: '90 minutos',
  storagePrefix: 'csc',
  rutaQuiz: '/quiz/clima-sin-catastrofe',
  pasos: [
    {
      slug: 'les-clima-sin-catastrofe-bienvenida',
      numero: 0,
      tipo: 'bienvenida',
      label: 'PASO 0 DE 8 · BIENVENIDA',
      orientacion: 'Caso regional que suele aparecer como meme, titular o cadena de voz.',
      titulo: 'Clima sin catástrofe',
      contenido: {
        tipo: 'bienvenida',
        descripcion:
          'Las cifras de clima exigen orden: qué se mide, en qué periodo y comparado con qué. Eso no quita gravedad al problema — evita discursos que confunden o minimizan.',
        dato: 'Volcanes emiten CO₂; las emisiones humanas siguen dominando el largo plazo en el registro actual.',
      },
    },
    {
      slug: 'les-clima-sin-catastrofe-caso',
      numero: 1,
      tipo: 'caso_con_opciones',
      label: 'PASO 1 DE 8 · EL CASO',
      orientacion: 'Leé el titular que llega como verdad cerrada y elegí tu primera reacción.',
      titulo: '¿Qué harías?',
      storageKey: 'csc-paso1-respuesta',
      contenido: {
        tipo: 'caso_con_opciones',
        intro:
          'Te pasan una captura de un blog: “El Villarrica soltó más CO₂ que todos los autos del planeta en 100 años”. El tono es de revelación; los comentarios saltan entre “por eso el clima no es culpa nuestra” y “estamos perdidos”.',
        caso:
          'Tu primo lo reenvía al grupo familiar. Una tía lo usa para decir que el coche no importa. Otra quiere saber si es inventado. Vos no querés quedar como “el mala onda del clima” pero tampoco dejar pasar un dato sacado de contexto.',
        opciones: [
          { id: 'A', texto: 'Comparto el titular para mostrar que la culpa no es de la gente común' },
          {
            id: 'B',
            texto: 'Busco mediciones serias sobre emisiones volcánicas versus combustibles fósiles y comparto la conclusión con calma',
            esRecomendada: true,
          },
          { id: 'C', texto: 'No digo nada para no pelear en el grupo' },
          { id: 'D', texto: 'Afirmo sin leer que el volcán no emite nada y listo' },
        ],
      },
    },
    {
      slug: 'les-clima-sin-catastrofe-emocion',
      numero: 2,
      tipo: 'selector_emocion',
      label: 'PASO 2 DE 8 · LO QUE SENTISTE',
      orientacion: 'No hay respuesta correcta — solo observa qué sentiste.',
      titulo: '¿Qué te activó?',
      storageKey: 'csc-emocion',
      contenido: {
        tipo: 'selector_emocion',
        intro: 'El clima mezcla culpa, miedo y fatiga discursiva. ¿Qué apareció primero en vos?',
        emociones: [
          {
            id: 'cansancio',
            label: 'Cansancio',
            respuesta: 'Cansa pelear titulares en el grupo. Aun así, una aclaración corta puede evitar mucho ruido.',
          },
          {
            id: 'indignacion',
            label: 'Indignación',
            respuesta: 'La indignación contra el alarmismo o el negacionismo puede orientar, si la bajás a datos.',
          },
          {
            id: 'ansiedad',
            label: 'Ansiedad',
            respuesta: 'Las cifras gigantes generan pánico. Respirar y buscar escala temporal ayuda.',
          },
          {
            id: 'curiosidad',
            label: 'Curiosidad',
            respuesta: 'La curiosidad por el “en qué periodo” y el “comparado con qué” es el mejor antídoto.',
          },
          {
            id: 'esperanza',
            label: 'Esperanza',
            respuesta: 'Creer que hay espacio para entender mejor nutre acciones colectivas sin humo.',
          },
        ],
      },
    },
    {
      slug: 'les-clima-sin-catastrofe-senales',
      numero: 3,
      tipo: 'analisis_señales',
      label: 'PASO 3 DE 8 · MIRA MEJOR',
      orientacion: 'Toca o pasa el cursor por las frases resaltadas.',
      titulo: 'Señales de titular flojo',
      contenido: {
        tipo: 'analisis_señales',
        intro: 'Las comparaciones gigantes necesitan unidades, ventanas de tiempo y fuente metodológica.',
        texto:
          '“Más que todos los autos del mundo en 100 años” mezcla una emisión puntual o mal definida con un inventario terrestre complejo. Sin decir si habla de un día, un mes o erupción puntual, y sin fuente revisada, el titular es ruido. El clima se analiza con series largas y con modelos que separan fuerzas naturales y humanas.',
        palabras: [
          {
            frase: '100 años',
            tooltip: 'Ventana larga: mal mezclar un evento breve con un stock acumulado mal definido',
          },
          { frase: 'todos los autos', tooltip: 'Inventario mundial requiere fuente, no una analogía poética' },
          {
            frase: 'sin fuente revisada',
            tooltip: 'Ciencia apunta a papers o instituciones, no solo a mayúsculas en pantalla',
          },
          {
            frase: 'fuerzas naturales y humanas',
            tooltip: 'El debate serio separa variabilidad natural de la tendencia atribuible a humanos',
          },
        ],
        cierre:
          'Negar el cambio climático o exagerarlo sin datos perjudica el mismo planeta que queremos cuidar.',
      },
    },
    {
      slug: 'les-clima-sin-catastrofe-explicacion',
      numero: 4,
      tipo: 'explicacion_tarjetas',
      label: 'PASO 4 DE 8 · CÓMO PENSARLO',
      orientacion: 'Lee las tres ideas antes de continuar.',
      titulo: 'Escala, tiempo y consenso',
      contenido: {
        tipo: 'explicacion_tarjetas',
        intro: 'Entender el marco no quita responsabilidad: la ordena.',
        tarjetas: [
          {
            titulo: 'Inventarios',
            descripcion:
              'Las emisiones humanas se estiman con inventarios y satélites en escalas anuales y regionales.',
            colorBorde: '#FFD400',
          },
          {
            titulo: 'Eventos extremos',
            descripcion:
              'Atribución científica estudia cuánto aumentó la probabilidad por factores humanos.',
            colorBorde: '#2EA8E6',
          },
          {
            titulo: 'Volcanes',
            descripcion: 'Importan en ciclos geológicos; no sustituyen el rol de combustibles en décadas recientes.',
            colorBorde: '#E8342A',
          },
        ],
        dato_destacado: 'UN TITULAR FUERTE NO REEMPLAZA UN GRÁFICO CON EJE Y FUENTE.',
      },
    },
    {
      slug: 'les-clima-sin-catastrofe-kit',
      numero: 5,
      tipo: 'kit_preguntas',
      label: 'PASO 5 DE 8 · TU HERRAMIENTA',
      orientacion: 'Responde cada pregunta una por una.',
      titulo: 'Kit para un titular climático',
      storageKey: 'csc-kit-respuestas',
      contenido: {
        tipo: 'kit_preguntas',
        intro: 'Cinco preguntas antes de reenviar cifras que suenan apocalípticas o exculpatorias.',
        preguntas: [
          '¿El texto dice claramente qué variable midió y en qué periodo?',
          '¿La fuente es institución científica o solo un blog sin método?',
          '¿La comparación usa las mismas unidades y la misma escala temporal?',
          '¿El autor tiene formación o revisión independiente?',
          '¿Compartir esto ayuda a entender el problema o solo genera pelea?',
        ],
      },
    },
    {
      slug: 'les-clima-sin-catastrofe-decision-accion',
      numero: 6,
      tipo: 'decision_accion',
      label: 'PASO 6 DE 8 · DECIDE',
      orientacion: 'Elegí una acción útil en el grupo familiar.',
      titulo: '¿Qué harías ahora?',
      storageKey: 'csc-decision-accion',
      contenido: {
        tipo: 'decision_accion',
        intro: 'Pensá en la próxima cadena de clima que te llegue.',
        opciones: [
          {
            id: 'link',
            texto: 'Responder con un enlace breve a una fuente revisada y sin humillar',
            orientacion: 'Enlace de NOAA, IPCC u organismo nacional según el país.',
          },
          {
            id: 'pregunta',
            texto: 'Preguntar en el grupo de qué fuente salió la cifra antes de debatir',
            orientacion: 'Desvía la pelea hacia el método.',
          },
          {
            id: 'privado',
            texto: 'Escribir en privado a quien reenvió mal para no exponerlo',
            orientacion: 'Cuidás el vínculo.',
          },
          {
            id: 'pausa',
            texto: 'No alimentar la polémica si el clima del grupo ya está caliente',
            orientacion: 'A veces la pausa pública y la charla en persona es mejor.',
          },
        ],
      },
    },
    {
      slug: 'les-clima-sin-catastrofe-responder',
      numero: 7,
      tipo: 'texto_libre',
      label: 'PASO 7 DE 8 · RESPONDER',
      orientacion: 'Escribe aunque sea una oración.',
      titulo: 'Responder sin humillar',
      storageKey: 'csc-texto-responder',
      contenido: {
        tipo: 'texto_libre',
        intro: 'La pedagogía climática también es vínculo: nadie aprende a golpes en el chat.',
        pregunta:
          'Escribí dos frases que podrías enviar al grupo familiar para pedir fuente sin sonar superior.',
        placeholder: 'Escribe aquí...',
        minCaracteres: 20,
      },
    },
    {
      slug: 'les-clima-sin-catastrofe-decision',
      numero: 8,
      tipo: 'decision_final',
      label: 'PASO 8 DE 8 · CIERRE',
      orientacion: 'Completa los campos — no hay respuestas incorrectas.',
      titulo: 'Tu decisión final',
      storageKey: 'csc-decision-final',
      contenido: {
        tipo: 'decision_final',
        intro: 'Cuidar el clima y cuidar la conversación no van en contra.',
        campos: [
          'Un titular que antes me hubiera enganchado y ahora voy a revisar:',
          'Una fuente confiable a la que puedo volver cuando haya dudas:',
          'Una frase que voy a evitar al hablar de clima en familia:',
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
      nombre: 'Pausar el clic en titulares furiosos',
      descripcion_fuerte: 'No reenviás hasta ver eje temporal y fuente.',
      descripcion_desarrollando: 'Te frenás un minuto ante cifras gigantes.',
      descripcion_explorando: 'La urgencia del chat empuja — practicá la pausa.',
    },
    {
      id: 'emocion',
      nombre: 'Sostener la ansiedad con datos',
      descripcion_fuerte: 'Nombrás emoción y aun así pedís método.',
      descripcion_desarrollando: 'Separás miedo de análisis cuando podés.',
      descripcion_explorando: 'El terror vende titulares — observalo.',
    },
    {
      id: 'fuente',
      nombre: 'Exigir fuente primaria o institución',
      descripcion_fuerte: 'Apelás a organismos científicos antes del blog anónimo.',
      descripcion_desarrollando: 'Buscás el paper o el informe — ya es camino.',
      descripcion_explorando: 'No todo está accesible — igual podés preguntar de dónde salió.',
    },
    {
      id: 'evidencia',
      nombre: 'Leer el kit como brújula',
      descripcion_fuerte: 'El kit ordena la conversación en el grupo.',
      descripcion_desarrollando: 'Completaste varias respuestas con claridad.',
      descripcion_explorando: 'Volvé al kit cuando llegue el próximo meme.',
    },
    {
      id: 'amplificar',
      nombre: 'No amplificar negacionismo ni alarmismo',
      descripcion_fuerte: 'Elegís no reforzar titulares que distorsionan escala o culpa.',
      descripcion_desarrollando: 'Pesás si tu mensaje calma o enciende sin datos.',
      descripcion_explorando: 'Compartir menos pero mejor — objetivo válido.',
    },
    {
      id: 'criterio',
      nombre: 'Decidir con criterio propio',
      descripcion_fuerte: 'Tu cierre muestra hábitos concretos de lectura climática.',
      descripcion_desarrollando: 'Tu reflexión es honesta — eso ya es criterio.',
      descripcion_explorando: 'Cada cadena que revisás fortalece el hábito.',
    },
  ],
}
