import type { CursoContenido } from '@/lib/cursos/tipos'

export const SALUD_SIN_PANICO: CursoContenido = {
  id: 'salud-sin-panico',
  titulo: 'Salud sin pánico',
  subtitulo: 'Antes de confiar en un remedio que llegó por el chat.',
  descripcion:
    'Te llega un audio de WhatsApp: limón con bicarbonato “cura” infección de orina. Tu abuela ya lo está tomando. Este módulo ayuda a evaluar información de salud sin humillar y sin minimizar el riesgo.',
  duracion: '90 minutos',
  storagePrefix: 'ssp',
  rutaQuiz: '/quiz/salud-sin-panico',
  pasos: [
    {
      slug: 'les-salud-sin-panico-bienvenida',
      numero: 0,
      tipo: 'bienvenida',
      label: 'PASO 0 DE 8 · BIENVENIDA',
      orientacion: 'Trabajamos un caso muy común: remedios virales y mensajes de voz en familia.',
      titulo: 'Salud sin pánico',
      contenido: {
        tipo: 'bienvenida',
        descripcion:
          'La desinformación en salud no solo confunde: a veces hace que la gente deje tratamientos seguros o retrase una consulta. Acá vas a practicar con un caso que suena a cariño, no a maldad.',
        dato: 'Los bulos de salud circularon más en pandemia, pero siguen en audios y cadenas familiares.',
      },
    },
    {
      slug: 'les-salud-sin-panico-caso',
      numero: 1,
      tipo: 'caso_con_opciones',
      label: 'PASO 1 DE 8 · EL CASO',
      orientacion: 'Lee el caso y elige qué harías primero.',
      titulo: '¿Qué harías?',
      storageKey: 'ssp-paso1-respuesta',
      contenido: {
        tipo: 'caso_con_opciones',
        intro:
          'Tu primo reenvía un audio de WhatsApp. La voz suena segura: “Una cucharada de limón con bicarbonato en ayunas limpia la orina y cura la infección sin antibióticos.” Tu abuela ya lo preparó.',
        caso:
          'Ella tiene ardor al orinar desde hace dos días. Dice que siente alivio “porque es natural”. Vos sabés que una infección de orina puede complicarse. El grupo familiar pide que no la alarmes; otro tío dice que los médicos solo quieren vender medicina.',
        opciones: [
          { id: 'A', texto: 'Le digo en el grupo que es mentira y que es irresponsable' },
          {
            id: 'B',
            texto: 'Hablo en privado con ella y le propongo llamar al centro de salud o ir hoy',
            esRecomendada: true,
          },
          { id: 'C', texto: 'No digo nada para no crear conflicto familiar' },
          { id: 'D', texto: 'Comparto otro audio que contradice el primero, sin más contexto' },
        ],
      },
    },
    {
      slug: 'les-salud-sin-panico-emocion',
      numero: 2,
      tipo: 'selector_emocion',
      label: 'PASO 2 DE 8 · LO QUE SENTISTE',
      orientacion: 'No hay respuesta correcta — solo observa qué sentiste.',
      titulo: '¿Qué te activó?',
      storageKey: 'ssp-emocion',
      contenido: {
        tipo: 'selector_emocion',
        intro: 'Hablar de salud en familia suele cargarse de culpa, miedo o rabia. ¿Qué notaste primero?',
        emociones: [
          {
            id: 'miedo',
            label: 'Miedo',
            respuesta: 'El miedo a que algo le pase a alguien que querés es real. No es exagerado — es cuidado.',
          },
          {
            id: 'rabia',
            label: 'Rabia',
            respuesta:
              'La rabia puede venir contra quien reenvía o contra el sistema. Canalizarla en una acción concreta suele ayudar más que el insulto en el grupo.',
          },
          {
            id: 'culpa',
            label: 'Culpa',
            respuesta: 'La culpa de “no ser médico” o de contradecir a un mayor es muy frecuente. Nombrarla ya baja la tensión.',
          },
          {
            id: 'confusion',
            label: 'Confusión',
            respuesta: 'Con remedios caseros mezclados con síntomas reales, la confusión es esperable.',
          },
          {
            id: 'empatia',
            label: 'Empatía',
            respuesta: 'La empatía no contradice la ciencia: te permite acompañar sin avalar lo que no está probado.',
          },
        ],
      },
    },
    {
      slug: 'les-salud-sin-panico-senales',
      numero: 3,
      tipo: 'analisis_señales',
      label: 'PASO 3 DE 8 · MIRA MEJOR',
      orientacion: 'Toca o pasa el cursor por las frases resaltadas.',
      titulo: 'Señales en el mensaje',
      contenido: {
        tipo: 'analisis_señales',
        intro: 'Separá lo emocional de lo que el audio realmente afirma.',
        texto:
          'El audio dice que el remedio es “natural”, que “limpia” y que “evita antibióticos”. Promete alivio en casa, sin decir qué estudios lo respaldan ni qué síntomas son señal de urgencia. Eso no prueba que sea seguro para todos los cuerpos.',
        palabras: [
          { frase: 'natural', tooltip: '“Natural” no es sinónimo de inocuo ni de eficaz verificada' },
          { frase: 'limpia', tooltip: 'Metáfora vaga — no sustituye diagnóstico ni tratamiento acorde' },
          { frase: 'evita antibióticos', tooltip: 'Puede demorar un tratamiento que en algunos casos es necesario' },
          { frase: 'sin decir qué estudios', tooltip: 'Falta evidencia explícita: un estudio citado, institución, año' },
        ],
        cierre:
          'Prometer cura sin contexto clínico es un patrón clásico de bulo en salud, aunque el tono suene cercano.',
      },
    },
    {
      slug: 'les-salud-sin-panico-explicacion',
      numero: 4,
      tipo: 'explicacion_tarjetas',
      label: 'PASO 4 DE 8 · CÓMO PENSARLO',
      orientacion: 'Lee las tres ideas antes de continuar.',
      titulo: 'Por qué los bulos de salud pegan',
      contenido: {
        tipo: 'explicacion_tarjetas',
        intro: 'Entender los incentivos no es faltarle el respeto al cuidado — es proteger mejor.',
        tarjetas: [
          {
            titulo: 'Miedo y culpa',
            descripcion: 'Los síntomas generan ansiedad; una solución simple en voz baja calma rápido, aunque sea frágil.',
            colorBorde: '#2EA8E6',
          },
          {
            titulo: 'Desconfianza legítima',
            descripcion:
              'Muchas personas sintieron que el sistema de salud las escuchó poco. Eso favorece alternativas no verificadas.',
            colorBorde: '#2B4EFF',
          },
          {
            titulo: 'Formato audio',
            descripcion:
              'El audio parece íntimo y humano; cuesta pedir fuente como si fuera un artículo.',
            colorBorde: '#E8342A',
          },
        ],
        dato_destacado: 'CUIDAR NO ES CREER TODO LO QUE CALMA: A VECES CALMAR ES LLEVAR A TIEMPO A QUIEN SABE.',
      },
    },
    {
      slug: 'les-salud-sin-panico-kit',
      numero: 5,
      tipo: 'kit_preguntas',
      label: 'PASO 5 DE 8 · TU HERRAMIENTA',
      orientacion: 'Responde cada pregunta una por una.',
      titulo: 'Kit antes de compartir un remedio',
      storageKey: 'ssp-kit-respuestas',
      contenido: {
        tipo: 'kit_preguntas',
        intro: 'Cinco preguntas cuando alguien que querés confía en un audio o una cadena.',
        preguntas: [
          '¿Hay síntomas que requieren urgencia médica aunque el remedio “ayude” al dolor?',
          '¿La fuente muestra evidencia revisada por expertos o solo testimonios?',
          '¿Esta persona ya tiene diagnóstico o está automedicándose con información parcial?',
          '¿Puedo sugerir consulta sin invalidar su dolor?',
          '¿Compartir esto en cadena ayuda o solo aumenta el pánico?',
        ],
      },
    },
    {
      slug: 'les-salud-sin-panico-decision-accion',
      numero: 6,
      tipo: 'decision_accion',
      label: 'PASO 6 DE 8 · DECIDE',
      orientacion: 'Elige una línea de acción respetuosa y concreta.',
      titulo: '¿Qué harías ahora?',
      storageKey: 'ssp-decision-accion',
      contenido: {
        tipo: 'decision_accion',
        intro: 'Pensá en tu abuela o en quien está en el centro del relato.',
        opciones: [
          {
            id: 'acompanar',
            texto: 'Acompañar a consultar y ofrecer ayuda logística (turno, transporte)',
            orientacion: 'Separás el vínculo del bulo sin negar el malestar.',
          },
          {
            id: 'linea',
            texto: 'Buscar juntos la línea oficial de orientación del servicio de salud',
            orientacion: 'Un tercero institucional baja la pelea familiar.',
          },
          {
            id: 'privado',
            texto: 'Escribir en privado con información breve de una fuente confiable',
            orientacion: 'Evitás avergonzar en el grupo público.',
          },
          {
            id: 'pausa',
            texto: 'No debatir en cadena y pedir tiempo antes de seguir reenviando',
            orientacion: 'Cortás la espiral sin despreciar a nadie.',
          },
        ],
      },
    },
    {
      slug: 'les-salud-sin-panico-responder',
      numero: 7,
      tipo: 'texto_libre',
      label: 'PASO 7 DE 8 · RESPONDER',
      orientacion: 'Escribe aunque sea una oración.',
      titulo: 'Qué le dirías sin humillar',
      storageKey: 'ssp-texto-responder',
      contenido: {
        tipo: 'texto_libre',
        intro: 'Practicá un mensaje breve que combine cuidado y claridad.',
        pregunta:
          'Escribí un mensaje de dos oraciones que podrías enviarle a tu abuela en privado para invitarla a consultar sin invalidarla.',
        placeholder: 'Escribe aquí tu mensaje...',
        minCaracteres: 20,
      },
    },
    {
      slug: 'les-salud-sin-panico-decision',
      numero: 8,
      tipo: 'decision_final',
      label: 'PASO 8 DE 8 · CIERRE',
      orientacion: 'Completa los campos — no hay respuestas incorrectas.',
      titulo: 'Tu decisión final',
      storageKey: 'ssp-decision-final',
      contenido: {
        tipo: 'decision_final',
        intro: 'Llevar criterio en salud no es ser frío: es sostener el cuidado en el tiempo.',
        campos: [
          'Lo que más me costará en familia será...',
          'El recurso confiable al que puedo acudir en mi zona es...',
          'Una frase que voy a evitar al discutir bulos de salud:',
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
      nombre: 'Pausar el juicio en el grupo',
      descripcion_fuerte: 'Evitás el escarnio público y buscás canal privado o institucional.',
      descripcion_desarrollando: 'Reconocés que el chat familiar no es el mejor lugar para urgencias médicas.',
      descripcion_explorando: 'Entrar en debate grupal es tentador — la pausa te protege a vos y al vínculo.',
    },
    {
      id: 'emocion',
      nombre: 'Sostener la emoción sin ceder al bulo',
      descripcion_fuerte: 'Nombrás miedo o rabia y aun así proponés una acción segura.',
      descripcion_desarrollando: 'Ves la carga emocional sin usarla como prueba de verdad.',
      descripcion_explorando: 'Las emociones en salud son intensas — practicar las nombra sin vergüenza.',
    },
    {
      id: 'fuente',
      nombre: 'Exigir fuente cuando hay riesgo',
      descripcion_fuerte: 'Pedís evidencia o consulta ante síntomas que pueden empeorar.',
      descripcion_desarrollando: 'Te planteás quién audita el consejo, aunque suene “natural”.',
      descripcion_explorando: 'A veces no hay tiempo — igual podés anotar la pregunta para la consulta.',
    },
    {
      id: 'evidencia',
      nombre: 'Usar el kit en conversaciones difíciles',
      descripcion_fuerte: 'El kit te guió para no mezclar alivio emocional con cura verificada.',
      descripcion_desarrollando: 'Respondiste con claridad en varias preguntas difíciles.',
      descripcion_explorando: 'El kit está para volver cuando el tema sea delicado.',
    },
    {
      id: 'amplificar',
      nombre: 'No amplificar remedios no probados',
      descripcion_fuerte: 'Evitás reenviar cadenas que puedan sustituir atención necesaria.',
      descripcion_desarrollando: 'Pesás si compartir mete más miedo que orientación.',
      descripcion_explorando: 'Compartir es un acto — observalo cuando el tema es salud.',
    },
    {
      id: 'criterio',
      nombre: 'Decidir con criterio propio',
      descripcion_fuerte: 'Tu cierre muestra respeto y cuidado verificable.',
      descripcion_desarrollando: 'Tu reflexión es honesta — eso ya es criterio.',
      descripcion_explorando: 'Cada conversación en familia aporta — sin presión de ser perfecto.',
    },
  ],
}
