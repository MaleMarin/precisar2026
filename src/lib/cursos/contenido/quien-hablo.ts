import type { CursoContenido } from '@/lib/cursos/tipos'

export const QUIEN_HABLO: CursoContenido = {
  id: 'quien-hablo',
  titulo: '¿Quién habló?',
  subtitulo: 'Lo que pasa cuando la IA suena como alguien que conoces.',
  descripcion:
    'Te llega un audio de WhatsApp con la voz de tu mamá pidiendo dinero urgente. ¿Cómo sabes si es ella? Este módulo explica cómo funciona la clonación de voz con IA y qué hacer antes de actuar.',
  duracion: '90 minutos',
  storagePrefix: 'qh',
  rutaQuiz: '/quiz/quien-hablo',
  pasos: [
    {
      slug: 'les-quien-hablo-bienvenida',
      numero: 0,
      tipo: 'bienvenida',
      label: 'PASO 0 DE 8 · BIENVENIDA',
      orientacion: 'Este módulo trabaja un caso que ya le ocurrió a millones de personas en América Latina.',
      titulo: '¿Quién habló?',
      contenido: {
        tipo: 'bienvenida',
        descripcion:
          'La voz de tu mamá. El número de tu mamá. Pero ¿es tu mamá? En 90 minutos vas a entender cómo funciona la clonación de voz con IA — y qué hacer antes de actuar.',
        dato: 'El 35% de las personas no puede distinguir una voz clonada con IA de una voz real. (Brightside AI, 2025)',
      },
    },
    {
      slug: 'les-quien-hablo-caso',
      numero: 1,
      tipo: 'caso_con_opciones',
      label: 'PASO 1 DE 8 · EL CASO',
      orientacion: 'Lee el mensaje y elige cómo responderías.',
      titulo: '¿Qué harías?',
      storageKey: 'qh-paso1-respuesta',
      contenido: {
        tipo: 'caso_con_opciones',
        intro: 'Son las 11 de la noche. Te llega un mensaje de voz de WhatsApp desde el número de tu mamá.',
        caso: 'Hijo, soy yo. Tuve un accidente y estoy en la clínica. Necesito que me transfieras $200 ahora, antes de medianoche, para la consulta de urgencia. No puedo hablar más, estoy muy mal. Por favor, hazlo ya.',
        opciones: [
          { id: 'A', texto: 'Transfiero el dinero de inmediato — suena a ella y es urgente' },
          {
            id: 'B',
            texto: 'Llamo al número que tengo guardado de mi mamá antes de hacer nada',
            esRecomendada: true,
          },
          { id: 'C', texto: 'Le pido más información por WhatsApp antes de transferir' },
          { id: 'D', texto: 'Ignoro el mensaje — probablemente es una estafa' },
        ],
      },
    },
    {
      slug: 'les-quien-hablo-emocion',
      numero: 2,
      tipo: 'selector_emocion',
      label: 'PASO 2 DE 8 · LO QUE SENTISTE',
      orientacion: 'No hay respuesta correcta — solo observa qué sentiste.',
      titulo: '¿Qué activó ese audio?',
      storageKey: 'qh-emocion',
      contenido: {
        tipo: 'selector_emocion',
        intro: 'Antes de pensar si es real o no, ¿qué sentiste al escuchar esa voz?',
        emociones: [
          {
            id: 'panico',
            label: 'Pánico',
            respuesta:
              'El pánico es exactamente la emoción que busca activar la estafa. Cuando entramos en pánico, dejamos de evaluar y empezamos a actuar.',
          },
          {
            id: 'culpa',
            label: 'Culpa',
            respuesta:
              'La culpa anticipada — "¿y si es real y no ayudo?" — es una de las palancas más poderosas de estas estafas.',
          },
          {
            id: 'duda',
            label: 'Duda',
            respuesta: 'La duda es tu mejor aliada. Reconocer que algo no cuadra es el primer paso para no caer.',
          },
          {
            id: 'urgencia',
            label: 'Urgencia',
            respuesta:
              'La urgencia artificial es una táctica clásica. Los plazos cortos ("antes de medianoche") impiden que pensemos con calma.',
          },
          {
            id: 'desconfianza',
            label: 'Desconfianza',
            respuesta: 'La desconfianza saludable te protege. No es cinismo — es criterio digital.',
          },
        ],
      },
    },
    {
      slug: 'les-quien-hablo-senales',
      numero: 3,
      tipo: 'analisis_señales',
      label: 'PASO 3 DE 8 · MIRA MEJOR',
      orientacion: 'Toca o pasa el cursor por las frases resaltadas.',
      titulo: 'Observa cómo está construido',
      storageKey: 'qh-tooltips-vistos',
      contenido: {
        tipo: 'analisis_señales',
        intro: 'Vuelve a escuchar el mensaje con más calma.',
        texto:
          'Hijo, soy yo. Tuve un accidente y estoy en la clínica. Necesito que me transfieras $200 ahora, antes de medianoche, para la consulta de urgencia. No puedo hablar más, estoy muy mal. Por favor, hazlo ya.',
        palabras: [
          { frase: 'antes de medianoche', tooltip: 'Plazo artificial — crea urgencia que impide verificar' },
          {
            frase: 'No puedo hablar más',
            tooltip: 'Bloquea la verificación — si no puede hablar, no puedes confirmar que es ella',
          },
          { frase: 'hazlo ya', tooltip: 'Imperativo de acción inmediata — técnica clásica de ingeniería social' },
          { frase: '$200', tooltip: 'Monto específico que suena creíble — ni muy poco ni demasiado' },
        ],
        cierre:
          'Estas señales son el patrón de una estafa de voz clonada con IA. No porque la voz suene falsa — sino por cómo está construido el mensaje.',
      },
    },
    {
      slug: 'les-quien-hablo-como-funciona',
      numero: 4,
      tipo: 'explicacion_tarjetas',
      label: 'PASO 4 DE 8 · CÓMO FUNCIONA',
      orientacion: 'Lee las tres etapas antes de continuar.',
      titulo: 'Cómo la IA clona una voz',
      contenido: {
        tipo: 'explicacion_tarjetas',
        intro: 'No necesitas horas de grabación. Con 30 segundos de audio, la IA puede clonar una voz.',
        tarjetas: [
          {
            titulo: 'Recopilan audio',
            descripcion:
              'Buscan videos, audios o llamadas grabadas donde aparezca la voz de la persona. Redes sociales, videos familiares, llamadas grabadas.',
            colorBorde: '#2B4EFF',
          },
          {
            titulo: 'Entrenan el modelo',
            descripcion:
              'La IA analiza los patrones de la voz — tono, ritmo, pronunciación — y aprende a replicarlos con texto nuevo.',
            colorBorde: '#7B2FBE',
          },
          {
            titulo: 'Generan el audio falso',
            descripcion:
              'Escriben el guión de la estafa y el modelo genera el audio con la voz clonada. En minutos, con calidad casi perfecta.',
            colorBorde: '#E8342A',
          },
        ],
        dato_destacado: 'LOS ATAQUES DE VOZ CLONADA AUMENTARON 1.600% EN EL PRIMER TRIMESTRE DE 2025.',
      },
    },
    {
      slug: 'les-quien-hablo-kit',
      numero: 5,
      tipo: 'kit_preguntas',
      label: 'PASO 5 DE 8 · TU HERRAMIENTA',
      orientacion: 'Responde cada pregunta una por una.',
      titulo: 'El protocolo de verificación',
      storageKey: 'qh-kit-respuestas',
      contenido: {
        tipo: 'kit_preguntas',
        intro: '5 pasos para antes de actuar cuando recibes un audio o llamada urgente.',
        preguntas: [
          '¿Puedo llamar directamente al número que tengo guardado de esa persona?',
          '¿El mensaje me pide dinero, contraseñas o datos personales con urgencia?',
          '¿Puedo verificar la información por otro canal antes de actuar?',
          '¿Hay una razón específica por la que no puedo esperar 10 minutos?',
          '¿Esta persona me pediría esto de esta manera en condiciones normales?',
        ],
      },
    },
    {
      slug: 'les-quien-hablo-decision-accion',
      numero: 6,
      tipo: 'decision_accion',
      label: 'PASO 6 DE 8 · DECIDE',
      orientacion: 'Elige la acción que tomarías ahora.',
      titulo: '¿Qué harías ahora?',
      storageKey: 'qh-decision-accion',
      contenido: {
        tipo: 'decision_accion',
        intro: 'Con lo que sabes ahora, ¿cuál sería tu primer movimiento?',
        opciones: [
          {
            id: 'llamar',
            texto: 'Llamar directamente al número guardado de esa persona',
            orientacion: 'La mejor primera acción. Si no contesta, llama a alguien cercano que pueda verificar.',
          },
          {
            id: 'esperar',
            texto: 'No actuar por 10 minutos y evaluar con calma',
            orientacion: 'Válido. La urgencia artificial se diluye cuando le das tiempo.',
          },
          {
            id: 'verificar-canal',
            texto: 'Verificar por otro canal (llamada, otra app, persona cercana)',
            orientacion: 'Excelente. Usar un canal distinto al que llegó el mensaje es clave.',
          },
          {
            id: 'reportar',
            texto: 'Reportar el número y no responder',
            orientacion: 'Correcto si ya identificaste que es una estafa. Guarda evidencia antes.',
          },
        ],
      },
    },
    {
      slug: 'les-quien-hablo-responder',
      numero: 7,
      tipo: 'texto_libre',
      label: 'PASO 7 DE 8 · RESPONDER',
      orientacion: 'Escribe aunque sea una oración.',
      titulo: 'Cómo contárselo a alguien',
      storageKey: 'qh-texto-responder',
      contenido: {
        tipo: 'texto_libre',
        intro:
          'Una de las mejores formas de consolidar lo que aprendiste es explicárselo a alguien. No para asustarlo — sino para prepararlo.',
        pregunta: '¿Cómo le explicarías esto a alguien mayor de tu familia en dos oraciones?',
        placeholder: 'Escribe aquí tu explicación...',
        minCaracteres: 20,
      },
    },
    {
      slug: 'les-quien-hablo-decision',
      numero: 8,
      tipo: 'decision_final',
      label: 'PASO 8 DE 8 · CIERRE',
      orientacion: 'Completa los campos — no hay respuestas incorrectas.',
      titulo: 'Tu decisión final',
      storageKey: 'qh-decision-final',
      contenido: {
        tipo: 'decision_final',
        intro: 'Ya sabes algo que la mayoría de personas no sabe todavía.',
        campos: [
          'Si recibiera ese audio ahora, lo primero que haría es...',
          'Lo que más me sorprendió de este módulo fue...',
          'La persona de mi familia a quien le voy a contar esto es...',
          'Una señal de alerta que voy a recordar siempre:',
          '¿Cambió mi respuesta inicial? (sí/no + por qué)',
        ],
        mostrarRespuestaInicial: true,
      },
    },
  ],
  señales: [
    {
      id: 'pausar',
      nombre: 'Pausar antes de actuar',
      descripcion_fuerte: 'Reconociste que la urgencia era una táctica.',
      descripcion_desarrollando: 'Notaste la presión — el siguiente paso es usarla como señal.',
      descripcion_explorando: 'La urgencia artificial es difícil de detectar — sigue practicando.',
    },
    {
      id: 'verificar',
      nombre: 'Verificar por otro canal',
      descripcion_fuerte: 'Sabes que el canal original no es suficiente para confirmar.',
      descripcion_desarrollando: 'Entiendes el principio — aplicarlo en el momento es el reto.',
      descripcion_explorando: 'Este hábito se construye con práctica — vale la pena.',
    },
    {
      id: 'senales',
      nombre: 'Identificar señales de estafa',
      descripcion_fuerte: 'Detectaste los patrones clásicos de ingeniería social.',
      descripcion_desarrollando: 'Identificaste algunas señales — hay más para explorar.',
      descripcion_explorando: 'Conocer los patrones es el primer paso para detectarlos.',
    },
    {
      id: 'emocion',
      nombre: 'Gestionar la emoción bajo presión',
      descripcion_fuerte: 'Reconociste que la emoción era parte del diseño de la estafa.',
      descripcion_desarrollando: 'Lo notaste — usarlo como señal de alerta es el siguiente paso.',
      descripcion_explorando: 'Bajo presión emocional, es difícil pensar con claridad — normal.',
    },
    {
      id: 'explicar',
      nombre: 'Explicarle esto a otros',
      descripcion_fuerte: 'Puedes traducir esto en lenguaje cercano para tu familia.',
      descripcion_desarrollando: 'Tienes las ideas — practicar la explicación las consolida.',
      descripcion_explorando: 'Enseñar es la forma más poderosa de aprender — inténtalo.',
    },
    {
      id: 'criterio',
      nombre: 'Decidir con criterio propio',
      descripcion_fuerte: 'Tu decisión final muestra criterio real.',
      descripcion_desarrollando: 'Tu reflexión fue honesta — eso ya es criterio.',
      descripcion_explorando: 'Cada módulo completo fortalece esta señal.',
    },
  ],
}
