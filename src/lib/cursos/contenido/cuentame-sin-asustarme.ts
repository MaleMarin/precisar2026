import type { CursoContenido } from '@/lib/cursos/tipos'

export const CUENTAME_SIN_ASUSTARME: CursoContenido = {
  id: 'cuentame-sin-asustarme',
  titulo: 'Cuéntame sin asustarme',
  subtitulo: 'Cuando el miedo llega con voz de familia.',
  descripcion:
    'Tu mamá llama asustada: una cadena dice que el gobierno cerrará cuentas bancarias antes del viernes. Este módulo trabaja cómo acompañar sin validar el rumor ni invalidar su miedo.',
  duracion: '90 minutos',
  storagePrefix: 'csa',
  rutaQuiz: '/quiz/cuentame-sin-asustarme',
  pasos: [
    {
      slug: 'les-cuentame-sin-asustarme-bienvenida',
      numero: 0,
      tipo: 'bienvenida',
      label: 'PASO 0 DE 8 · BIENVENIDA',
      orientacion: 'Casos financieros y políticos se prestan para cadenas de miedo en América Latina.',
      titulo: 'Cuéntame sin asustarme',
      contenido: {
        tipo: 'bienvenida',
        descripcion:
          'Cuando alguien que querés llama con pánico, la prioridad es contención y verificación. Vas a practicar con un rumor que suena urgente y falso a la vez.',
        dato: 'La urgencia artificial es la herramienta más repetida en bulos que tocan el dinero.',
      },
    },
    {
      slug: 'les-cuentame-sin-asustarme-caso',
      numero: 1,
      tipo: 'caso_con_opciones',
      label: 'PASO 1 DE 8 · EL CASO',
      orientacion: 'Leé la llamada y elegí qué harías primero.',
      titulo: '¿Qué harías?',
      storageKey: 'csa-paso1-respuesta',
      contenido: {
        tipo: 'caso_con_opciones',
        intro:
          'Son las ocho de la noche. Tu mamá te llama con la voz temblorosa: le reenviaron un audio largo que “explica” que antes del viernes hay que sacar el dinero del banco porque el gobierno cerrará cuentas para una reorganización secreta.',
        caso:
          'El audio cita “un abogado conocido” y pide compartir antes de que “los medios lo tapen”. No hay enlace oficial. Ella ya le comentó a dos vecinas. Vos querés que esté tranquila sin repetir la cadena.',
        opciones: [
          { id: 'A', texto: 'Le digo que saque todo el dinero mañana temprano, por las dudas' },
          {
            id: 'B',
            texto: 'Le explico que vamos a verificar en la página del banco y en comunicados oficiales antes de mover fondos',
            esRecomendada: true,
          },
          { id: 'C', texto: 'Le cuelgo porque no quiero pelear' },
          { id: 'D', texto: 'Reenvío el audio a más gente para que “estén alerta”' },
        ],
      },
    },
    {
      slug: 'les-cuentame-sin-asustarme-emocion',
      numero: 2,
      tipo: 'selector_emocion',
      label: 'PASO 2 DE 8 · LO QUE SENTISTE',
      orientacion: 'No hay respuesta correcta — solo observa qué sentiste.',
      titulo: '¿Qué te activó?',
      storageKey: 'csa-emocion',
      contenido: {
        tipo: 'selector_emocion',
        intro: 'El dinero y la familia prenden rápido. ¿Qué sentiste al escucharla?',
        emociones: [
          {
            id: 'preocupacion',
            label: 'Preocupación',
            respuesta: 'Preocuparte por ella es humano. No es lo mismo que creer el audio.',
          },
          {
            id: 'rabia',
            label: 'Rabia',
            respuesta: 'La rabia contra quien fabrica miedo puede ayudarte a actuar con claridad, sin gritarle a tu mamá.',
          },
          {
            id: 'culpa',
            label: 'Culpa',
            respuesta: 'Si te culpás por no haberle “avisado antes”, recordá que el bulo no es responsabilidad tuya.',
          },
          {
            id: 'fatiga',
            label: 'Fatiga',
            respuesta: 'Cansa desmentir cadenas. La fatiga es real — igual un rato de verificación vale la pena.',
          },
          {
            id: 'ternura',
            label: 'Ternura',
            respuesta: 'La ternura te recuerda que ella no es el enemigo: el patrón de la cadena sí puede serlo.',
          },
        ],
      },
    },
    {
      slug: 'les-cuentame-sin-asustarme-senales',
      numero: 3,
      tipo: 'analisis_señales',
      label: 'PASO 3 DE 8 · MIRA MEJOR',
      orientacion: 'Toca o pasa el cursor por las frases resaltadas.',
      titulo: 'Patrones del rumor',
      contenido: {
        tipo: 'analisis_señales',
        intro: 'Observá el guion del miedo financiero sin juzgar a quien lo creyó.',
        texto:
          'El audio apura: “antes del viernes”, pide secreto y avisa que los medios van a tapar. Invoca autoridad vaga (“un abogado”) sin nombre ni colegio profesional. Mezcla consecuencias catastróficas con instrucciones de sacar efectivo sin explicar el canal institucional. Eso es ingeniería social, no comunicado bancario.',
        palabras: [
          { frase: 'antes del viernes', tooltip: 'Plazo artificial para impedir verificación tranquila' },
          { frase: 'tapar', tooltip: 'Paranoia institucional clásica para que nadie contradiga con calma' },
          { frase: 'un abogado conocido', tooltip: 'Autoridad sin nombre — señal de alerta' },
          { frase: 'sacar efectivo', tooltip: 'Acción irreversible que puede perjudicar a la persona' },
        ],
        cierre:
          'El miedo legítimo merece respuesta seria: fuentes oficiales y línea del banco, no panic selling por WhatsApp.',
      },
    },
    {
      slug: 'les-cuentame-sin-asustarme-explicacion',
      numero: 4,
      tipo: 'explicacion_tarjetas',
      label: 'PASO 4 DE 8 · CÓMO FUNCIONA',
      orientacion: 'Lee las tres capas antes de continuar.',
      titulo: 'Por qué estas cadenas funcionan',
      contenido: {
        tipo: 'explicacion_tarjetas',
        intro: 'No siempre el objetivo es político: a veces es estafa, clicks o caos.',
        tarjetas: [
          {
            titulo: 'Urgencia',
            descripcion: 'El tiempo corto impide llamar al banco o leer con calma.',
            colorBorde: '#3037D8',
          },
          {
            titulo: 'Autoridad falsa',
            descripcion: 'Títulos genéricos suenan creíbles si la voz es confiada.',
            colorBorde: '#2B4EFF',
          },
          {
            titulo: 'Costo emocional',
            descripcion: 'Tocar el sustento básico activa protección familiar inmediata.',
            colorBorde: '#E8342A',
          },
        ],
        dato_destacado: 'ACOMPAÑAR BIEN ES DECIR: VAMOS A VERIFICAR, NO: TENÉS RAZÓN EN TODO.',
      },
    },
    {
      slug: 'les-cuentame-sin-asustarme-kit',
      numero: 5,
      tipo: 'kit_preguntas',
      label: 'PASO 5 DE 8 · TU HERRAMIENTA',
      orientacion: 'Responde cada pregunta una por una.',
      titulo: 'Kit para llamadas de pánico',
      storageKey: 'csa-kit-respuestas',
      contenido: {
        tipo: 'kit_preguntas',
        intro: 'Cinco preguntas cuando alguien cercano cree un rumor financiero grave.',
        preguntas: [
          '¿Hay comunicado en web oficial del banco, regulador o ministerio?',
          '¿La persona puede llamar al número que figura en el dorso de la tarjeta, no el del audio?',
          '¿El mensaje pide secreto o no compartir con “los de afuera”?',
          '¿Alguien pidió PIN, clave o transferencia confidencial?',
          '¿Mover el dinero la deja más expuesta a robo o estafa que dejarlo en cuenta regulada?',
        ],
      },
    },
    {
      slug: 'les-cuentame-sin-asustarme-decision-accion',
      numero: 6,
      tipo: 'decision_accion',
      label: 'PASO 6 DE 8 · DECIDE',
      orientacion: 'Elegí una línea que combine cuidado y verificación.',
      titulo: '¿Qué harías ahora?',
      storageKey: 'csa-decision-accion',
      contenido: {
        tipo: 'decision_accion',
        intro: 'Pensá en la próxima llamada asustada.',
        opciones: [
          {
            id: 'llamada-banco',
            texto: 'Llamar juntos al banco con el número oficial',
            orientacion: 'El audio queda en segundo plano frente a la fuente.',
          },
          {
            id: 'web',
            texto: 'Abrir en la computadora o app oficial el comunicado de calma',
            orientacion: 'La pantalla compartida en videollamada ayuda.',
          },
          {
            id: 'no-compartir',
            texto: 'Frenar la cadena en el grupo familiar con un mensaje corto y sin ironía',
            orientacion: 'Pedís tiempo y fuente sin humillar.',
          },
          {
            id: 'acompanar',
            texto: 'Ir mañana a una sucursal solo si tras la llamada oficial hace falta',
            orientacion: 'No sacar efectivo bajo pánico la noche anterior.',
          },
        ],
      },
    },
    {
      slug: 'les-cuentame-sin-asustarme-responder',
      numero: 7,
      tipo: 'texto_libre',
      label: 'PASO 7 DE 8 · RESPONDER',
      orientacion: 'Escribe aunque sea una oración.',
      titulo: 'Frase para bajar el pánico',
      storageKey: 'csa-texto-responder',
      contenido: {
        tipo: 'texto_libre',
        intro: 'Tener una frase preparada evita improvisar bajo presión o sonar condescendiente.',
        pregunta: 'Escribí dos oraciones que dirías para validar su miedo y proponer verificación.',
        placeholder: 'Escribe aquí...',
        minCaracteres: 20,
      },
    },
    {
      slug: 'les-cuentame-sin-asustarme-decision',
      numero: 8,
      tipo: 'decision_final',
      label: 'PASO 8 DE 8 · CIERRE',
      orientacion: 'Completa los campos — no hay respuestas incorrectas.',
      titulo: 'Tu decisión final',
      storageKey: 'csa-decision-final',
      contenido: {
        tipo: 'decision_final',
        intro: 'Cuéntame sin asustarme también es: te escucho y vamos paso a paso.',
        campos: [
          'Lo que más me ayuda para no entrar en pánico con mi familia:',
          'El recurso oficial al que puedo recurrir en mi país o ciudad:',
          'Una frase que voy a evitar cuando alguien tenga miedo:',
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
      nombre: 'Pausar la decisión financiera',
      descripcion_fuerte: 'Evitás mover dinero bajo presión del audio.',
      descripcion_desarrollando: 'Instalás la idea de llamar antes que sacar.',
      descripcion_explorando: 'La noche del pánico es dura — la pausa es protección.',
    },
    {
      id: 'emocion',
      nombre: 'Validar emoción sin aceptar el bulo',
      descripcion_fuerte: 'Separás el miedo real del contenido falso del mensaje.',
      descripcion_desarrollando: 'Escuchás sin burlarte — verificás sin dejar pasar.',
      descripcion_explorando: 'Es un equilibrio — lo practicás conversación a conversación.',
    },
    {
      id: 'fuente',
      nombre: 'Ir a fuente oficial',
      descripcion_fuerte: 'Apelás al banco regulador o web gubernamental antes del rumor.',
      descripcion_desarrollando: 'Te planteás buscar comunicado aunque cueste tiempo.',
      descripcion_explorando: 'Las webs oficiales no siempre son claras — insistís.',
    },
    {
      id: 'evidencia',
      nombre: 'Usar el kit con la persona asustada',
      descripcion_fuerte: 'El kit te guió para cubrir riesgos y pasos concretos.',
      descripcion_desarrollando: 'Varias respuestas claras en el kit — buen signo.',
      descripcion_explorando: 'Volvé al kit cuando llegue el próximo audio.',
    },
    {
      id: 'amplificar',
      nombre: 'No amplificar cadenas de miedo',
      descripcion_fuerte: 'Frenás el reenvío masivo y ofrecés verificación.',
      descripcion_desarrollando: 'Pesás el costo de meter más pánico en el grupo.',
      descripcion_explorando: 'Compartir alerta puede ser daño — observalo.',
    },
    {
      id: 'criterio',
      nombre: 'Decidir con criterio y afecto',
      descripcion_fuerte: 'Tu cierre muestra cuidado y método al mismo tiempo.',
      descripcion_desarrollando: 'Tu reflexión es honesta — eso ya es criterio.',
      descripcion_explorando: 'Cada llamada difícil suma práctica.',
    },
  ],
}
