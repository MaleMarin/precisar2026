import type { CursoContenido } from '@/lib/cursos/tipos'

export const ANTES_DE_COMPARTIR: CursoContenido = {
  id: 'antes-de-compartir',
  titulo: 'Antes de Compartir',
  subtitulo: 'Lo que pasa entre que ves algo y lo reenvías.',
  descripcion: 'En 90 minutos trabajas un solo caso real.',
  duracion: '90 minutos',
  storagePrefix: 'adc',
  rutaQuiz: '/quiz/antes-de-compartir',
  pasos: [
    {
      slug: 'les-antes-de-compartir-bienvenida',
      numero: 0,
      tipo: 'bienvenida',
      label: 'PASO 0 DE 8 · BIENVENIDA',
      orientacion: 'Este módulo dura 90 minutos. Trabajas un solo caso de principio a fin.',
      titulo: 'Antes de Compartir',
      contenido: {
        tipo: 'bienvenida',
        descripcion:
          'En los próximos 90 minutos vas a trabajar un solo caso real de principio a fin. No hay respuestas correctas al inicio. Hay un proceso.',
        dato: 'Este módulo trabaja un solo caso desde el principio hasta el final.',
      },
    },
    {
      slug: 'les-antes-de-compartir-caso',
      numero: 1,
      tipo: 'caso_con_opciones',
      label: 'PASO 1 DE 8 · EL CASO',
      orientacion: 'Lee la publicación y elige cómo responderías.',
      titulo: '¿Qué harías?',
      storageKey: 'adc-paso1-respuesta',
      contenido: {
        tipo: 'caso_con_opciones',
        intro: 'Te mostramos una publicación tal como llegaría en una red social.',
        caso: 'Algo no cuadra con Artemis II. La cápsula ya cayó al océano, pero los astronautas siguen adentro. Durante varios minutos no hubo comunicación. Dicen que todo salió bien, pero esta imagen deja muchas dudas. ¿Es realmente un procedimiento normal o están ocultando un problema?',
        opciones: [
          { id: 'A', texto: 'La comparto porque parece importante' },
          { id: 'B', texto: 'Espero para ver si se aclara' },
          {
            id: 'C',
            texto: 'Reviso qué parte está confirmada y qué es interpretación',
            esRecomendada: true,
          },
          { id: 'D', texto: 'Asumo que hubo un problema' },
        ],
      },
    },
    {
      slug: 'les-antes-de-compartir-emocion',
      numero: 2,
      tipo: 'selector_emocion',
      label: 'PASO 2 DE 8 · LO QUE SENTISTE',
      orientacion: 'No hay respuesta correcta — solo observa qué sentiste.',
      titulo: '¿Qué te hizo reaccionar?',
      storageKey: 'adc-emocion',
      contenido: {
        tipo: 'selector_emocion',
        intro:
          'Antes de verificar un contenido, vale la pena notar qué te hizo reaccionar. No para juzgarte, sino para recuperar un poco de distancia.',
        emociones: [
          {
            id: 'apuro',
            label: 'Apuro',
            respuesta:
              'El apuro es la emoción que más beneficia a la desinformación. La urgencia muchas veces es una táctica, no una realidad.',
          },
          {
            id: 'preocupacion',
            label: 'Preocupacion',
            respuesta:
              'La preocupación legítima puede nublarnos para evaluar si la amenaza es real o construida.',
          },
          {
            id: 'desconfianza',
            label: 'Desconfianza',
            respuesta:
              'La desconfianza puede ser bien fundada. También puede hacernos ver conspiraciones donde hay errores simples.',
          },
          {
            id: 'curiosidad',
            label: 'Curiosidad',
            respuesta: 'La curiosidad es el mejor punto de partida. Úsala para buscar, no para concluir.',
          },
          {
            id: 'alarma',
            label: 'Alarma',
            respuesta:
              'La alarma nos prepara para actuar. Pero actuar primero y pensar después suele empeorar las cosas.',
          },
        ],
      },
    },
    {
      slug: 'les-antes-de-compartir-senales',
      numero: 3,
      tipo: 'analisis_señales',
      label: 'PASO 3 DE 8 · MIRA MEJOR',
      orientacion: 'Pasa el cursor (o toca) las frases resaltadas.',
      titulo: 'Observa cómo está construido',
      contenido: {
        tipo: 'analisis_señales',
        intro:
          'Vuelve a mirar la publicación, pero esta vez con más calma. No para decidir si es verdadera o falsa, sino para observar cómo está construida.',
        texto:
          'Algo no cuadra con Artemis II. La cápsula ya cayó al océano, pero los astronautas siguen adentro. Durante varios minutos no hubo comunicación. Dicen que todo salió bien, pero esta imagen deja muchas dudas. ¿Es realmente un procedimiento normal o están ocultando un problema?',
        palabras: [
          { frase: 'algo no cuadra', tooltip: 'Afirmación sin evidencia concreta' },
          { frase: 'siguen adentro', tooltip: 'Dato real presentado como alarma' },
          { frase: 'no hubo comunicación', tooltip: 'Sin fuente que lo confirme' },
          { frase: 'ocultan un problema', tooltip: 'Conclusión presentada como hecho' },
        ],
        cierre: 'Estas frases mezclan datos reales con interpretaciones no verificadas.',
      },
    },
    {
      slug: 'les-antes-de-compartir-panico',
      numero: 4,
      tipo: 'explicacion_tarjetas',
      label: 'PASO 4 DE 8 · ASÍ FUNCIONA',
      orientacion: 'Lee las tres categorías antes de continuar.',
      titulo: 'Así se fabrica el pánico',
      contenido: {
        tipo: 'explicacion_tarjetas',
        intro:
          'Algunas publicaciones no inventan todo desde cero: combinan piezas reales con tono emocional, contexto parcial y conclusiones apresuradas.',
        tarjetas: [
          {
            titulo: 'DESINFORMACIÓN',
            descripcion: 'Información falsa o engañosa que puede afectar decisiones.',
            colorBorde: '#E8342A',
          },
          {
            titulo: 'DESCONTEXTUALIZACIÓN',
            descripcion: 'Foto o video real, contexto falso.',
            colorBorde: '#E8A020',
          },
          {
            titulo: 'SESGO MEDIÁTICO',
            descripcion: 'Selección de datos con tono emocional que distorsiona la realidad.',
            colorBorde: '#2B4EFF',
          },
        ],
        dato_destacado: 'LO VIRAL NO EQUIVALE A LO VERDADERO.',
      },
    },
    {
      slug: 'les-antes-de-compartir-kit',
      numero: 5,
      tipo: 'kit_preguntas',
      label: 'PASO 5 DE 8 · HERRAMIENTA',
      orientacion: 'Responde cada pregunta una por una.',
      titulo: 'Tu Kit de Pausa',
      storageKey: 'adc-kit-respuestas',
      contenido: {
        tipo: 'kit_preguntas',
        intro: '5 preguntas para antes de compartir cualquier contenido.',
        preguntas: [
          '¿Qué afirma exactamente?',
          '¿De dónde viene?',
          '¿Cuándo y dónde ocurrió?',
          '¿Qué evidencia muestra?',
          '¿Compartir ayuda o mete más ruido?',
        ],
      },
    },
    {
      slug: 'les-antes-de-compartir-decision-accion',
      numero: 6,
      tipo: 'decision_accion',
      label: 'PASO 6 DE 8 · DECIDE',
      orientacion: 'Elige la acción que tomarías ahora.',
      titulo: '¿Qué harías ahora?',
      storageKey: 'adc-decision-accion',
      contenido: {
        tipo: 'decision_accion',
        intro: 'Después de pausar, observar y contrastar, decide una acción concreta.',
        opciones: [
          {
            id: 'no-compartir',
            texto: 'No compartir todavía',
            orientacion:
              'Buena opción para evitar amplificar ruido mientras verificas mejor la información.',
          },
          {
            id: 'verificar',
            texto: 'Verificar más',
            orientacion:
              'Añade a tu revisión buscar fuente primaria, dar tiempo al contexto y separar lo que es dato de lo que es interpretación.',
          },
          {
            id: 'compartir-contexto',
            texto: 'Compartir con contexto',
            orientacion:
              'Si compartes, incluye lo que está confirmado y lo que no para reducir malentendidos.',
          },
          {
            id: 'responder',
            texto: 'Responder sin amplificar',
            orientacion:
              'Responde en privado o con enfoque didáctico, evitando repetir el mito de forma textual.',
          },
        ],
      },
    },
    {
      slug: 'les-antes-de-compartir-responder',
      numero: 7,
      tipo: 'texto_libre',
      label: 'PASO 7 DE 8 · RESPONDER',
      orientacion: 'Escribe aunque sea una oración.',
      titulo: 'Responder sin hacer eco',
      storageKey: 'adc-texto-responder',
      contenido: {
        tipo: 'texto_libre',
        intro:
          'A veces responder bien es más difícil que no responder. El modelo VMV ayuda: Verdad → Mito breve → Verdad reforzada.',
        ejemplo:
          'La cápsula amerizó según el procedimiento previsto (Verdad). Circularon mensajes que sugerían ocultamiento por una pausa de comunicación (Mito breve). Esa pausa está contemplada por seguridad y no implica una falla crítica (Verdad reforzada).',
        pregunta: '¿Cómo le explicarías esto a alguien de tu entorno?',
        placeholder: 'Escribe una o dos oraciones...',
        minCaracteres: 20,
      },
    },
    {
      slug: 'les-antes-de-compartir-decision',
      numero: 8,
      tipo: 'decision_final',
      label: 'PASO 8 DE 8 · CIERRE',
      orientacion: 'Completa los campos — no hay respuestas incorrectas.',
      titulo: 'Tu decisión final',
      storageKey: 'adc-decision-final',
      contenido: {
        tipo: 'decision_final',
        intro: 'Ya no estás en el punto de partida.',
        campos: [
          'Mi decisión final es...',
          'La elijo porque...',
          'Lo que intenté evitar fue...',
          'La próxima vez haré algo distinto:',
          '¿Cambió mi respuesta inicial?',
        ],
        mostrarRespuestaInicial: true,
      },
    },
  ],
  señales: [
    {
      id: 'pausar',
      nombre: 'Pausar antes de actuar',
      descripcion_fuerte: 'Lo aplicaste desde el inicio.',
      descripcion_desarrollando: 'Ya lo notas, puedes profundizar.',
      descripcion_explorando: 'Es el primer paso — vale la pena practicarlo.',
    },
    {
      id: 'emocion',
      nombre: 'Identificar la emoción',
      descripcion_fuerte: 'Reconociste qué te activó antes de reaccionar.',
      descripcion_desarrollando: 'Lo identificaste, ahora úsalo como señal.',
      descripcion_explorando: 'Es más difícil de lo que parece — sigue explorando.',
    },
    {
      id: 'fuente',
      nombre: 'Buscar la fuente original',
      descripcion_fuerte: 'Distingues el origen del reenvío.',
      descripcion_desarrollando: 'Ya sabes que importa — el siguiente paso es hacerlo.',
      descripcion_explorando: 'Este es el hábito más poderoso para desarrollar.',
    },
    {
      id: 'evidencia',
      nombre: 'Evaluar la evidencia',
      descripcion_fuerte: 'Distingues datos de interpretaciones.',
      descripcion_desarrollando: 'Lo intentaste — con práctica se vuelve automático.',
      descripcion_explorando: 'Es una habilidad que se construye con tiempo.',
    },
    {
      id: 'amplificar',
      nombre: 'Responder sin amplificar',
      descripcion_fuerte: 'Sabes cuándo no responder es la mejor respuesta.',
      descripcion_desarrollando: 'Lo entiendes — aplicarlo en el momento es el reto.',
      descripcion_explorando: 'Vale la pena practicarlo en situaciones reales.',
    },
    {
      id: 'criterio',
      nombre: 'Decidir con criterio propio',
      descripcion_fuerte: 'Tu decisión final lo demuestra.',
      descripcion_desarrollando: 'Tu decisión fue reflexiva — eso ya es criterio.',
      descripcion_explorando: 'Cada módulo completo fortalece esta señal.',
    },
  ],
}
