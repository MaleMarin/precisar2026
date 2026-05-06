import type { CursoContenido } from '@/lib/cursos/tipos'

export const GRUPO_DE_PROFES: CursoContenido = {
  id: 'grupo-de-profes',
  titulo: 'Lo que llega al grupo de profes',
  subtitulo: 'Cuando el aula choca con una captura de pantalla.',
  descripcion:
    'En el grupo de WhatsApp del colegio aparece un estudiante que dice que “ChatGPT le confirmó” que el Holocausto fue exagerado. Este módulo recorre cómo responder con rigor sin humillar y sin normalizar la desinformación grave.',
  duracion: '90 minutos',
  storagePrefix: 'gdp',
  rutaQuiz: '/quiz/grupo-de-profes',
  pasos: [
    {
      slug: 'les-grupo-de-profes-bienvenida',
      numero: 0,
      tipo: 'bienvenida',
      label: 'PASO 0 DE 8 · BIENVENIDA',
      orientacion: 'Pensado para docentes en América Latina: grupos, capturas y presión de tiempo.',
      titulo: 'Lo que llega al grupo de profes',
      contenido: {
        tipo: 'bienvenida',
        descripcion:
          'Lo que pasa en el grupo de profes no es un debate abstracto: afecta cómo mirás al estudiante al día siguiente. Vas a practicar con un caso de negacionismo o minimización histórica presentado como “lo que dijo la IA”.',
        dato: 'Las herramientas de lenguaje pueden repetir sesgos o inventar citas si nadie verifica.',
      },
    },
    {
      slug: 'les-grupo-de-profes-caso',
      numero: 1,
      tipo: 'caso_con_opciones',
      label: 'PASO 1 DE 8 · EL CASO',
      orientacion: 'Lee la situación y elegí tu primera respuesta profesional.',
      titulo: '¿Qué harías?',
      storageKey: 'gdp-paso1-respuesta',
      contenido: {
        tipo: 'caso_con_opciones',
        intro:
          'Una captura circula en el grupo de profesores: un alumno escribió que usó ChatGPT y que “le explicó” que el Holocausto fue exagerado por los medios. Alguien pide expulsión inmediata; otra persona dice que hay que “dejar que los chicos piensen libre”.',
        caso:
          'Tenés clase con ese curso al día siguiente. El clima ya está cargado: algunos padres miraron el mensaje. El director te pidió “posición” antes del mediodía. No querés convertir el grupo en un juicio ni dejar pasar una afirmación grave como si fuera opinión legítima.',
        opciones: [
          { id: 'A', texto: 'Respondo en el grupo que es inaceptable y cierro el tema' },
          {
            id: 'B',
            texto: 'Coordino con convivencia y preparo una intervención con fuentes históricas primarias, sin exhibir al estudiante',
            esRecomendada: true,
          },
          { id: 'C', texto: 'Ignoro lo de la IA y trato el tema solo como falta de respeto al grupo' },
          { id: 'D', texto: 'Publico que la IA a veces se equivoca y listo, sin plan de aula' },
        ],
      },
    },
    {
      slug: 'les-grupo-de-profes-emocion',
      numero: 2,
      tipo: 'selector_emocion',
      label: 'PASO 2 DE 8 · LO QUE SENTISTE',
      orientacion: 'No hay respuesta correcta — solo observa qué sentiste.',
      titulo: '¿Qué te activó?',
      storageKey: 'gdp-emocion',
      contenido: {
        tipo: 'selector_emocion',
        intro: 'En la escuela, la mezcla de política, historia y disciplina prende rápido. ¿Qué sentiste primero?',
        emociones: [
          {
            id: 'agotamiento',
            label: 'Agotamiento',
            respuesta: 'Cargar con el clima del grupo y con el aula es peso real. Nombrarlo no te hace menos profesional.',
          },
          {
            id: 'indignacion',
            label: 'Indignación',
            respuesta: 'La indignación puede guiar límites claros; conviene canalizarla en protocolo y en aula.',
          },
          {
            id: 'temor',
            label: 'Temor',
            respuesta: 'Temor a hacer daño, a equivocarte o a politizar el curso — común cuando el tema es histórico sensible.',
          },
          {
            id: 'responsabilidad',
            label: 'Responsabilidad',
            respuesta: 'Sentirte responsable de la verdad y del cuidado del grupo es un buen punto de partida.',
          },
          {
            id: 'duda',
            label: 'Duda',
            respuesta: 'La duda sobre cómo intervenir sin viralizar el error es sana.',
          },
        ],
      },
    },
    {
      slug: 'les-grupo-de-profes-senales',
      numero: 3,
      tipo: 'analisis_señales',
      label: 'PASO 3 DE 8 · MIRA MEJOR',
      orientacion: 'Toca o pasa el cursor por las frases resaltadas.',
      titulo: 'Qué está en juego en el mensaje',
      contenido: {
        tipo: 'analisis_señales',
        intro: 'Antes de la sanción sola, mirá qué tipo de afirmación es y qué rol cumple invocar a la IA.',
        texto:
          'El estudiante presenta una negación o minimización histórica como si fuera “explicación” autorizada por una herramienta automática. Eso mezcla autoridad técnica, sensación de verdad y un tema que no admite debates falsamente simétricos. Además, el grupo de profes puede convertirse en escenario de juicio social.',
        palabras: [
          {
            frase: 'confirmó',
            tooltip: 'Las IA no “confirman” hechos históricos — generan texto estadístico',
          },
          { frase: 'exagerado', tooltip: 'Minimización que choca con registro documental y consenso historiográfico' },
          {
            frase: 'autoridad técnica',
            tooltip: 'El brillo de la interfaz puede dar sensación de validación indebida',
          },
          {
            frase: 'juicio social',
            tooltip: 'El grupo puede castigar sin pedagogía — útil separar contención y enseñanza',
          },
        ],
        cierre:
          'Intervenir bien implica límites éticos claros y enseñanza con fuentes — no confundir “opinión” con negación histórica.',
      },
    },
    {
      slug: 'les-grupo-de-profes-explicacion',
      numero: 4,
      tipo: 'explicacion_tarjetas',
      label: 'PASO 4 DE 8 · CÓMO FUNCIONA',
      orientacion: 'Lee las tres capas antes de continuar.',
      titulo: 'Por qué la IA no es fuente',
      contenido: {
        tipo: 'explicacion_tarjetas',
        intro: 'Para orientar al estudiante hace falta distinguir herramienta, evidencia y marco curricular.',
        tarjetas: [
          {
            titulo: 'Modelos probabilísticos',
            descripcion: 'La IA predice palabras plausibles, no validez histórica. Puede alucinar referencias.',
            colorBorde: '#00D96F',
          },
          {
            titulo: 'Sesgos en datos',
            descripcion: 'Si el corpus incluye voces negacionistas o metáforas ambiguas, puede reproducirlos.',
            colorBorde: '#2B4EFF',
          },
          {
            titulo: 'Deber de enseñanza',
            descripcion:
              'El marco escolar exige trabajo con fuentes, testimonio y memoria — no “debate” simétrico sobre crímenes de lesa humanidad.',
            colorBorde: '#E8342A',
          },
        ],
        dato_destacado: 'ENSEÑAR HISTORIA CON RIGOR ES UN ACTO DE CUIDADO COLECTIVO.',
      },
    },
    {
      slug: 'les-grupo-de-profes-kit',
      numero: 5,
      tipo: 'kit_preguntas',
      label: 'PASO 5 DE 8 · TU HERRAMIENTA',
      orientacion: 'Responde cada pregunta una por una.',
      titulo: 'Kit antes de responder en el grupo',
      storageKey: 'gdp-kit-respuestas',
      contenido: {
        tipo: 'kit_preguntas',
        intro: 'Cinco preguntas para ordenar protocolo, aula y comunicación con familia.',
        preguntas: [
          '¿Ya existe un protocolo de convivencia o de acompañamiento psicopedagógico?',
          '¿La intervención va a enseñar con fuentes o solo a castigar en público?',
          '¿Quién debe estar en la conversación con el estudiante además del docente?',
          '¿Cómo evitamos convertir el hecho en espectáculo en redes del colegio?',
          '¿Qué recurso docente verificable puedo usar sin improvisar datos?',
        ],
      },
    },
    {
      slug: 'les-grupo-de-profes-decision-accion',
      numero: 6,
      tipo: 'decision_accion',
      label: 'PASO 6 DE 8 · DECIDE',
      orientacion: 'Elegí una línea que puedas sostener mañana en clase.',
      titulo: '¿Qué harías ahora?',
      storageKey: 'gdp-decision-accion',
      contenido: {
        tipo: 'decision_accion',
        intro: 'Pensá en tu siguiente clase con ese curso.',
        opciones: [
          {
            id: 'fuentes',
            texto: 'Diseñar actividad con fuentes primarias y distinción entre evidencia y opinión',
            orientacion: 'El desmentido pedagógico suele superar el solo sermón.',
          },
          {
            id: 'protocolo',
            texto: 'Seguir protocolo institucional sin discutir el caso en el chat',
            orientacion: 'Protege al estudiante y delega sanciones según normativa.',
          },
          {
            id: 'equipo',
            texto: 'Coordinar con equipo directivo y orientación antes de contestar públicamente',
            orientacion: 'Una voz institucional reduce el rumor.',
          },
          {
            id: 'familias',
            texto: 'Comunicación breve a familias con enfoque en proceso educativo, no en linchamiento',
            orientacion: 'Marco de cuidado, no de escarnio.',
          },
        ],
      },
    },
    {
      slug: 'les-grupo-de-profes-responder',
      numero: 7,
      tipo: 'texto_libre',
      label: 'PASO 7 DE 8 · RESPONDER',
      orientacion: 'Escribe aunque sea una oración.',
      titulo: 'Frase para abrir la clase',
      storageKey: 'gdp-texto-responder',
      contenido: {
        tipo: 'texto_libre',
        intro: 'Tener una frase madura evita improvisar bajo presión.',
        pregunta:
          'Escribí una o dos frases con las que abrirías la clase sin exponer al estudiante ni trivializar el dolor histórico.',
        placeholder: 'Escribe aquí...',
        minCaracteres: 20,
      },
    },
    {
      slug: 'les-grupo-de-profes-decision',
      numero: 8,
      tipo: 'decision_final',
      label: 'PASO 8 DE 8 · CIERRE',
      orientacion: 'Completa los campos — no hay respuestas incorrectas.',
      titulo: 'Tu decisión final',
      storageKey: 'gdp-decision-final',
      contenido: {
        tipo: 'decision_final',
        intro: 'Sostener la escuela como espacio de verdad y de cuidado lleva trabajo invisible.',
        campos: [
          'Lo que no voy a hacer en el grupo de WhatsApp a partir de ahora:',
          'El recurso o institución a la que puedo acudir para fortalecer la clase:',
          'Un sesgo que detecté al leer capturas de IA:',
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
      nombre: 'Pausar la respuesta en el chat',
      descripcion_fuerte: 'Evitás convertir el grupo en tribunal.',
      descripcion_desarrollando: 'Pesás protocolo antes de escribir lo primero que sale.',
      descripcion_explorando: 'La presión del grupo es real — la pausa es profesionalismo.',
    },
    {
      id: 'emocion',
      nombre: 'Regular la indignación',
      descripcion_fuerte: 'Canalizás la indignación en plan de aula y normativa.',
      descripcion_desarrollando: 'Reconocés la carga sin usarla como ataque personal.',
      descripcion_explorando: 'Es difícil — el tema es sensible y merece sustento.',
    },
    {
      id: 'fuente',
      nombre: 'Enseñar con fuente, no con captura',
      descripcion_fuerte: 'Pasás de la pantalla de IA a documento, archivo o texto curricular.',
      descripcion_desarrollando: 'Te movés hacia evidencia histórica aunque cueste más tiempo.',
      descripcion_explorando: 'Buscar fuente en historia lleva curso — empezar ya cuenta.',
    },
    {
      id: 'evidencia',
      nombre: 'Distinguir evidencia de autoridad falsa',
      descripcion_fuerte: 'El kit refleja que separás IA de testimonio y registro.',
      descripcion_desarrollando: 'Estás cerrando la brecha entre “lo que dijo la app” y lo verificable.',
      descripcion_explorando: 'Cada pregunta del kit fortalece este hábito.',
    },
    {
      id: 'amplificar',
      nombre: 'No amplificar negacionismo',
      descripcion_fuerte: 'Evitás debates simétricos que legitimen minimización.',
      descripcion_desarrollando: 'Pesás cómo hablar sin dar pantalla al bulo.',
      descripcion_explorando: 'Encontrar tono justo lleva práctica — no bajes los brazos.',
    },
    {
      id: 'criterio',
      nombre: 'Decidir con criterio profesional',
      descripcion_fuerte: 'Tu cierre conecta límites, pedagogía y cuidado.',
      descripcion_desarrollando: 'Tu reflexión muestra oficio y ética.',
      descripcion_explorando: 'La docencia también es aprender a intervenir — seguí.',
    },
  ],
}
