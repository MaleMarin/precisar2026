import type { CursoContenido } from '@/lib/cursos/tipos'

export const EL_QUE_MAS_GRITA: CursoContenido = {
  id: 'el-que-mas-grita',
  titulo: 'El que más grita',
  subtitulo: 'Cuando dos personas buscan lo mismo y ven mundos distintos.',
  descripcion:
    'Elena y Rosa viven en el mismo barrio y buscan lo mismo en Google. Lo que aparece en pantalla no coincide. Este módulo explica por qué pasa y cómo no sacar conclusiones demasiado rápido.',
  duracion: '90 minutos',
  storagePrefix: 'eg',
  rutaQuiz: '/quiz/el-que-mas-grita',
  pasos: [
    {
      slug: 'les-el-que-mas-grita-bienvenida',
      numero: 0,
      tipo: 'bienvenida',
      label: 'PASO 0 DE 8 · BIENVENIDA',
      orientacion: 'Trabajamos un caso cotidiano: buscar información y confiar en lo que aparece primero.',
      titulo: 'El que más grita',
      contenido: {
        tipo: 'bienvenida',
        descripcion:
          'No siempre gana lo más verdadero: muchas veces gana lo que la plataforma cree que te va a retener. En 90 minutos vas a ver un caso de dos vecinas que buscan lo mismo y no ven lo mismo.',
        dato: 'Los sistemas de recomendación priorizan señales de interacción, no verdad verificada.',
      },
    },
    {
      slug: 'les-el-que-mas-grita-caso',
      numero: 1,
      tipo: 'caso_con_opciones',
      label: 'PASO 1 DE 8 · EL CASO',
      orientacion: 'Lee la situación y elige qué harías primero.',
      titulo: '¿Qué harías?',
      storageKey: 'eg-paso1-respuesta',
      contenido: {
        tipo: 'caso_con_opciones',
        intro:
          'Elena y Rosa son amigas del mismo barrio. Un mismo día buscan en el celular: “campamento de vacunas barrio norte” para anotar a los hijos.',
        caso:
          'En los primeros resultados, Elena ve una nota alarmista y un comentario muy compartido. Rosa ve primero la página del municipio y un calendario actualizado. Las dos juran haber escrito la misma frase. Se miran la pantalla y no entienden.',
        opciones: [
          { id: 'A', texto: 'Asumo que una de las dos buscó distinto sin darse cuenta' },
          { id: 'B', texto: 'Publico en redes que Google está manipulando a la gente' },
          {
            id: 'C',
            texto: 'Abrimos búsqueda en ventana privada o con otro dispositivo y comparamos en calma',
            esRecomendada: true,
          },
          { id: 'D', texto: 'Lo dejo así — son cosas del algoritmo y no puedo hacer nada' },
        ],
      },
    },
    {
      slug: 'les-el-que-mas-grita-emocion',
      numero: 2,
      tipo: 'selector_emocion',
      label: 'PASO 2 DE 8 · LO QUE SENTISTE',
      orientacion: 'No hay respuesta correcta — solo observa qué sentiste.',
      titulo: '¿Qué te generó esta escena?',
      storageKey: 'eg-emocion',
      contenido: {
        tipo: 'selector_emocion',
        intro: 'Si te pasó algo parecido alguna vez, es normal sentir varias cosas a la vez.',
        emociones: [
          {
            id: 'injusticia',
            label: 'Injusticia',
            respuesta:
              'Cuesta ver que dos personas no partan del mismo lugar informativo aunque estén en el mismo barrio.',
          },
          {
            id: 'rabia',
            label: 'Rabia',
            respuesta:
              'La rabia aparece cuando sientes que alguien “te oculta” la realidad. Muchas veces es el sistema optimizando engagement, no una persona.',
          },
          {
            id: 'confusion',
            label: 'Confusión',
            respuesta: 'La confusión es sana: implica que no estás aceptando la primera explicación que llega.',
          },
          {
            id: 'curiosidad',
            label: 'Curiosidad',
            respuesta: 'La curiosidad te lleva a probar otra búsqueda, otro dispositivo o otra fuente.',
          },
          {
            id: 'desconfianza',
            label: 'Desconfianza',
            respuesta: 'Desconfiar de la primera pantalla no es paranoia: es cautela frente a un ranking que cambia.',
          },
        ],
      },
    },
    {
      slug: 'les-el-que-mas-grita-senales',
      numero: 3,
      tipo: 'analisis_señales',
      label: 'PASO 3 DE 8 · MIRA MEJOR',
      orientacion: 'Toca o pasa el cursor por las frases resaltadas.',
      titulo: 'Observa cómo se arma la diferencia',
      contenido: {
        tipo: 'analisis_señales',
        intro: 'Vuelve a leer la situación con otra lente: no quién tiene razón, sino qué factores ordenan resultados.',
        texto:
          'Elena y Rosa buscaron la misma frase. Elena vio primero titulares más sensacionalistas y contenido muy comentado. Rosa vio avisos institucionales arriba. El algoritmo personaliza según historial, ubicación aproximada y señales de uso: no es una verdad única en papel.',
        palabras: [
          { frase: 'misma frase', tooltip: 'La consulta es similar, pero el contexto de cada usuario no es idéntico' },
          { frase: 'primero', tooltip: 'El orden es una decisión del sistema, no un ranking moral de verdad' },
          { frase: 'comentado', tooltip: 'Alto engagement puede subir contenido aunque no sea el más sobrio' },
          {
            frase: 'personaliza',
            tooltip: 'Historial y hábitos cambian lo que ves, aunque el tema sea el mismo',
          },
        ],
        cierre:
          'Dos pantallas distintas no siempre implican mala fe de las usuarias: muchas veces implican personalización y señales distintas.',
      },
    },
    {
      slug: 'les-el-que-mas-grita-explicacion',
      numero: 4,
      tipo: 'explicacion_tarjetas',
      label: 'PASO 4 DE 8 · CÓMO FUNCIONA',
      orientacion: 'Lee las tres ideas antes de continuar.',
      titulo: 'Por qué no vemos lo mismo',
      contenido: {
        tipo: 'explicacion_tarjetas',
        intro: 'Los buscadores y redes combinan muchas señales para ordenar lo que aparece.',
        tarjetas: [
          {
            titulo: 'Personalización',
            descripcion:
              'Tu historial, ubicación y tipo de dispositivo influyen en qué enlaces suben o bajan.',
            colorBorde: '#2B4EFF',
          },
          {
            titulo: 'Engagement',
            descripcion:
              'Lo que genera clics y tiempo de lectura suele ganar visibilidad aunque sea más extremo.',
            colorBorde: '#FF0066',
          },
          {
            titulo: 'Momento y disponibilidad',
            descripcion:
              'Índices y anuncios cambian: dos minutos después, la lista puede verse otra cosa.',
            colorBorde: '#E8342A',
          },
        ],
        dato_destacado: 'EL QUE MÁS GRITA NO ES SIEMPRE EL QUE MÁS ACERTÓ.',
      },
    },
    {
      slug: 'les-el-que-mas-grita-kit',
      numero: 5,
      tipo: 'kit_preguntas',
      label: 'PASO 5 DE 8 · TU HERRAMIENTA',
      orientacion: 'Responde cada pregunta una por una.',
      titulo: 'Kit antes de concluir',
      storageKey: 'eg-kit-respuestas',
      contenido: {
        tipo: 'kit_preguntas',
        intro: 'Cinco preguntas breves antes de sacar una verdad sobre “lo que internet dijo”.',
        preguntas: [
          '¿Estoy viendo un hecho verificable o un titular cargado de emoción?',
          '¿Puedo repetir la búsqueda en incógnito o en otro dispositivo?',
          '¿Hay una fuente oficial o local que pueda llamar o revisar?',
          '¿Estoy comparando con alguien de confianza en la vida real?',
          '¿Mi conclusión cambiaría si el resultado apareciera en otro orden?',
        ],
      },
    },
    {
      slug: 'les-el-que-mas-grita-decision-accion',
      numero: 6,
      tipo: 'decision_accion',
      label: 'PASO 6 DE 8 · DECIDE',
      orientacion: 'Elige una acción concreta para la próxima vez.',
      titulo: '¿Qué harías ahora?',
      storageKey: 'eg-decision-accion',
      contenido: {
        tipo: 'decision_accion',
        intro: 'Piensa en la próxima vez que una búsqueda te deje incómoda o incómodo.',
        opciones: [
          {
            id: 'comparar',
            texto: 'Comparar con otra persona en vivo o por llamada',
            orientacion: 'Acuerdan la misma frase de búsqueda y comparan resultados sin pelear.',
          },
          {
            id: 'incognito',
            texto: 'Repetir la consulta en ventana privada o con navegador distinto',
            orientacion: 'Reduce el peso de tu historial en la sesión.',
          },
          {
            id: 'oficial',
            texto: 'Ir a la fuente oficial del servicio o del municipio',
            orientacion: 'Cuando hay riesgo concreto, la institución sigue siendo un ancla.',
          },
          {
            id: 'pausa',
            texto: 'No sacar conclusiones hasta tener segunda fuente',
            orientacion: 'La pausa es una acción: te protege de viralizar una lectura equivocada.',
          },
        ],
      },
    },
    {
      slug: 'les-el-que-mas-grita-responder',
      numero: 7,
      tipo: 'texto_libre',
      label: 'PASO 7 DE 8 · RESPONDER',
      orientacion: 'Escribe aunque sea una oración.',
      titulo: 'Contárselo sin alarmar',
      storageKey: 'eg-texto-responder',
      contenido: {
        tipo: 'texto_libre',
        intro:
          'En familia o en el barrio, muchas veces hay que explicar por qué dos celulares “dicen cosas distintas” sin culpar a nadie.',
        pregunta: '¿Cómo lo explicarías en dos frases a un familiar que cree que “internet sabe la verdad”?',
        placeholder: 'Escribe aquí tu explicación...',
        minCaracteres: 20,
      },
    },
    {
      slug: 'les-el-que-mas-grita-decision',
      numero: 8,
      tipo: 'decision_final',
      label: 'PASO 8 DE 8 · CIERRE',
      orientacion: 'Completa los campos — no hay respuestas incorrectas.',
      titulo: 'Tu decisión final',
      storageKey: 'eg-decision-final',
      contenido: {
        tipo: 'decision_final',
        intro: 'Lo que aprendiste hoy cambia cómo mirás la próxima lista de resultados.',
        campos: [
          'La próxima vez que algo me indigne en la primera pantalla, voy a...',
          'Una idea falsa que solía tener sobre los buscadores era...',
          'A quién le voy a contar esto sin crear alarma:',
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
      nombre: 'Pausar antes de concluir',
      descripcion_fuerte: 'Evitás tratar el primer resultado como verdad absoluta.',
      descripcion_desarrollando: 'Empezás a dudar del orden automático — buen paso.',
      descripcion_explorando: 'La primera pantalla siempre seduce — seguí practicando la pausa.',
    },
    {
      id: 'emocion',
      nombre: 'Nombrar la emoción',
      descripcion_fuerte: 'Relacionás injusticia o confusión con el diseño del sistema, no solo con las personas.',
      descripcion_desarrollando: 'Reconocés lo que sentís antes de discutir por política o culpas.',
      descripcion_explorando: 'Es difícil no personalizar — con práctica se vuelve más claro.',
    },
    {
      id: 'fuente',
      nombre: 'Buscar fuentes fuera del ranking',
      descripcion_fuerte: 'Apelás a institución, sitio oficial o llamada antes de viralizar.',
      descripcion_desarrollando: 'Te planteás buscar en otro canal — ya es avance.',
      descripcion_explorando: 'Encontrar la fuente toma tiempo — lo intentás cuando podés.',
    },
    {
      id: 'evidencia',
      nombre: 'Comparar evidencia entre personas',
      descripcion_fuerte: 'Usás el kit para contrastar con otra pantalla o otra persona.',
      descripcion_desarrollando: 'Completaste varias respuestas claras en el kit.',
      descripcion_explorando: 'El kit es una brújula — podés volver cuando quieras.',
    },
    {
      id: 'amplificar',
      nombre: 'Evitar amplificar la indignación',
      descripcion_fuerte: 'Elegís contrastar o verificar antes de publicar.',
      descripcion_desarrollando: 'Entendés el costo de gritar antes de mirar dos fuentes.',
      descripcion_explorando: 'Publicar rápido es tentador — observalo sin castigarte.',
    },
    {
      id: 'criterio',
      nombre: 'Decidir con criterio propio',
      descripcion_fuerte: 'Tu cierre muestra un hábito concreto que vas a repetir.',
      descripcion_desarrollando: 'Tu reflexión es honesta — eso ya es criterio.',
      descripcion_explorando: 'Cada módulo suma — volver a esto refuerza el hábito.',
    },
  ],
}
