/** Resultado visual del «mapa de señales» al completar un módulo (quiz). */

export type MapaSeñal = {
  nombre: string;
  /** Texto corto tipo “Media / Alta…”. */
  nivelLabel: string;
  descripcion: string;
  /** Puntos rellenos 0–5 (cada nivel en la UI = un dot). */
  nivelDots: number;
};

export type MapaRecorrido = {
  alInicioElegiste: string;
  loQueSentiste: string;
  tuDecisionFinal: string;
  loQueTeLlevas: string;
};

export type MapaSiguientePaso = {
  label: string;
  texto: string;
  linkTexto: string;
  href: string;
};

export type MapaResultado = {
  nombreCurso: string;
  colorCurso: string;
  senales: MapaSeñal[];
  recorrido: MapaRecorrido;
  /** Texto de fecha legible en español (p. ej. “1 de mayo de 2026”). */
  fechaTexto: string;
  marca: string;
  siguientePaso: MapaSiguientePaso;
};

function hashId(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/** Variación determinista por id (misma entrada → mismo mapa). */
function pick<T>(seed: number, options: readonly T[]): T {
  return options[seed % options.length] as T;
}

const CURSOS: { match: RegExp; nombre: string; color: string }[] = [
  { match: /aqui|pasa|desinfo/i, nombre: '«Aquí no pasa» · Desinformación', color: '#023661' },
  { match: /edu|media|docent|crit/i, nombre: 'Educación mediática digital', color: '#DB5227' },
  { match: /hub|digital|consciente/i, nombre: 'Hub digital consciente', color: '#3F3A42' },
  { match: /ciudad|conect/i, nombre: 'Ciudades conectadas con sentido', color: '#533E2E' },
];

const SENAL_NOMBRES = [
  'Reconocer formatos',
  'Pausa emocional',
  'Contrastar fuentes',
  'Cuidado con la virality',
  'Contexto antes de opinar',
  'Protección y privacidad',
] as const;

const VARIANTES_LABEL = ['Baja', 'Media', 'Media-alta', 'Alta', 'Muy alta'] as const;

/**
 * Calcula texto y niveles para el mapa según `quizId` (slug o uuid).
 * Cuando falten datos reales desde la sesión, deriva valores deterministas del id.
 */
export function calcularMapa(quizId: string): MapaResultado {
  const h = hashId(quizId || 'default');

  let nombreCurso = 'Recorrido formativo Precisar';
  let colorCurso = '#023661';
  for (const c of CURSOS) {
    if (c.match.test(quizId)) {
      nombreCurso = c.nombre;
      colorCurso = c.color;
      break;
    }
  }

  const senales: MapaSeñal[] = SENAL_NOMBRES.map((nombre, i) => {
    const dots = 1 + ((h + i * 17) % 5);
    const nivelLabel = pick(h + dots + i, VARIANTES_LABEL);
    const descripcion =
      dots >= 4
        ? 'Una práctica muy presente en tus respuestas.'
        : dots >= 2
          ? 'Apareció con claridad moderada.'
          : 'Un punto inicial para fortalecer con el tiempo.';
    return {
      nombre,
      nivelLabel,
      descripcion,
      nivelDots: dots,
    };
  });

  const recorrido: MapaRecorrido = {
    alInicioElegiste: pick(h, ['Confiar con cautela', 'Verificar rápido', 'Preguntar el contexto', 'Marcar límites claros']),
    loQueSentiste: pick(h + 3, ['Curiosidad', 'Algo de incomodidad', 'Cansancio ante el ruido', 'Motivación para desmentir']),
    tuDecisionFinal: pick(h + 5, ['Comprobar antes de compartir', 'Guardar fuentes guardadas', 'Invitar al diálogo', 'Documentar evidencia']),
    loQueTeLlevas: pick(h + 7, ['Un hábito de pausa mental', 'Preguntas guía repetibles', 'Un lenguaje propio contra la desinformación', 'Enlaces de ayuda rápida']),
  };

  const now = new Date();
  const fechaTexto = new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);

  const siguientePaso: MapaSiguientePaso = {
    label: 'Siguiente paso',
    texto: 'Avanza al siguiente módulo cuando quieras; el ritmo es tuyo. Si quieres profundizar, este material resume buenas prácticas en tu misma línea:',
    linkTexto: 'Ver recursos relacionados →',
    href: '/es/saberes/recursos',
  };

  return {
    nombreCurso,
    colorCurso,
    senales,
    recorrido,
    fechaTexto,
    marca: 'Precisar · mapa reflexivo',
    siguientePaso,
  };
}
