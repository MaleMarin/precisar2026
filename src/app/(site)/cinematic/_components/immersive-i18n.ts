export type ImmersiveLocale = "es" | "en" | "pt";

export const IMMERSIVE_LOCALES: ImmersiveLocale[] = ["es", "en", "pt"];

export const IMMERSIVE_LOCALE_LABEL: Record<ImmersiveLocale, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
};

type ChapterId = "programas" | "saberes" | "precisando" | "participa";

const CHAPTER_ORDER: ChapterId[] = ["programas", "saberes", "precisando", "participa"];

const CHAPTER_META: Record<
  ChapterId,
  { step: string; href: string; align: "left" | "right"; accentX: string }
> = {
  programas: { step: "01", href: "/programas", align: "left", accentX: "14%" },
  saberes: { step: "02", href: "/saberes", align: "right", accentX: "82%" },
  precisando: { step: "03", href: "/precisando", align: "left", accentX: "18%" },
  participa: { step: "04", href: "/participa", align: "right", accentX: "84%" },
};

export type ImmersiveChapter = {
  id: string;
  step: string;
  label: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  whisper: string[];
  align: "left" | "right";
  accentX: string;
};

export type ImmersiveCopy = {
  nav: {
    programas: string;
    saberes: string;
    precisando: string;
    participa: string;
    somos: string;
  };
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroBottom: string;
  heroCta: string;
  sceneWord: string;
  footerKicker: string;
  footerTitle: string;
  footerBody: string;
  footerLinks: {
    programas: string;
    saberes: string;
    precisando: string;
    participa: string;
    somos: string;
  };
  soundOn: string;
  soundOff: string;
  chapters: Record<
    ChapterId,
    { label: string; title: string; text: string; cta: string; whisper: string[] }
  >;
};

export const immersiveCopy: Record<ImmersiveLocale, ImmersiveCopy> = {
  es: {
    nav: {
      programas: "Programas",
      saberes: "Saberes",
      precisando: "Precisando",
      participa: "Participa",
      somos: "Somos",
    },
    heroEyebrow: "radical · immersive · chapters",
    heroTitle: "Potencia el uso de la tecnología",
    heroLead:
      "Más radical significa que el sitio no solo se mira: se atraviesa. Reacciona al mouse, revela sus capítulos con máscaras, genera foco, tensión y una sensación de espacio activo.",
    heroBottom:
      "No bajas por una página. Entras a una secuencia de umbrales. Cada capítulo se comporta como una escena con gravedad propia.",
    heroCta: "Entrar a la instalación",
    sceneWord: "scene",
    footerKicker: "Radical immersive site",
    footerTitle: "Más radical. Más inmersiva. Más entretenida.",
    footerBody:
      "Una web puede sostener mejor la atención cuando se comporta como experiencia y no solo como contenedor de contenido.",
    footerLinks: {
      programas: "Programas",
      saberes: "Saberes",
      precisando: "Precisando",
      participa: "Participa",
      somos: "Somos",
    },
    soundOn: "Silenciar ambiente",
    soundOff: "Activar ambiente",
    chapters: {
      programas: {
        label: "Programas",
        title: "Programas como una escena viva, enorme y mutable.",
        text: "Cada capítulo ocupa la pantalla, responde al mouse y se instala como una experiencia. No baja información: te obliga a entrar, mirar y quedarte un poco más.",
        cta: "Entrar a programas",
        whisper: ["HUB", "CIUDADES", "APRENDER", "DOCENTES", "RUTA", "ACTIVACIÓN"],
      },
      saberes: {
        label: "Saberes",
        title: "La colección se vuelve un paisaje de señales y capas.",
        text: "Saberes ya no es una biblioteca estática. Se siente como un campo de recursos que flota, se ilumina y cambia según la posición del usuario dentro del capítulo.",
        cta: "Abrir colección",
        whisper: ["GUÍAS", "RECURSOS", "PREGUNTAS", "VERIFICAR", "LECTURA", "CAPAS"],
      },
      precisando: {
        label: "Precisando",
        title: "La publicación entra como un capítulo de atmósfera, no como una lista.",
        text: "El capítulo editorial no muestra artículos como tarjetas. Construye una presencia: tipografía descomunal, ecos de palabras, foco variable y sensación de profundidad narrativa.",
        cta: "Ir a Precisando",
        whisper: ["LECTURA", "CRITERIO", "RITMO", "CONTEXTO", "SEÑALES", "UMBRAL"],
      },
      participa: {
        label: "Participa",
        title: "El final se convierte en una escena de activación, no en un formulario aburrido.",
        text: "La última sección concentra toda la energía del recorrido: una acción clara, una gran presencia visual y un cierre que todavía se siente vivo y reactivo.",
        cta: "Entregar opinión",
        whisper: ["CONSULTA", "OPINIÓN", "CIERRE", "ACCIÓN", "VOZ", "ENTRADA"],
      },
    },
  },
  en: {
    nav: {
      programas: "Programs",
      saberes: "Knowledge",
      precisando: "Precisando",
      participa: "Take part",
      somos: "About us",
    },
    heroEyebrow: "radical · immersive · chapters",
    heroTitle: "Empower the use of technology",
    heroLead:
      "Going radical means you do not just look at the site: you move through it. It responds to the cursor, reveals chapters through masks, builds focus, tension, and a sense of active space.",
    heroBottom:
      "You are not scrolling a flat page. You enter a sequence of thresholds. Each chapter behaves like a scene with its own gravity.",
    heroCta: "Enter the installation",
    sceneWord: "scene",
    footerKicker: "Radical immersive site",
    footerTitle: "More radical. More immersive. More engaging.",
    footerBody:
      "A website can hold attention better when it acts as an experience—not only as a container for content.",
    footerLinks: {
      programas: "Programs",
      saberes: "Knowledge",
      precisando: "Precisando",
      participa: "Take part",
      somos: "About us",
    },
    soundOn: "Mute atmosphere",
    soundOff: "Enable atmosphere",
    chapters: {
      programas: {
        label: "Programs",
        title: "Programs as a vast, living, mutable scene.",
        text: "Each chapter fills the screen, responds to the mouse, and lands as an experience. It does not dump information: it pulls you in to look and stay a little longer.",
        cta: "Go to programs",
        whisper: ["HUB", "CITIES", "LEARN", "EDUCATORS", "ROUTE", "ACTIVATION"],
      },
      saberes: {
        label: "Knowledge",
        title: "The collection becomes a landscape of signals and layers.",
        text: "Knowledge is no longer a static library. It reads as a field of resources that drifts, brightens, and shifts with where you stand inside the chapter.",
        cta: "Open the collection",
        whisper: ["GUIDES", "RESOURCES", "QUESTIONS", "VERIFY", "READING", "LAYERS"],
      },
      precisando: {
        label: "Precisando",
        title: "Editorial enters as an atmospheric chapter—not a list.",
        text: "The editorial beat does not show articles as cards. It builds presence: outsized type, word echoes, shifting focus, and a feeling of narrative depth.",
        cta: "Go to Precisando",
        whisper: ["READING", "CRITERIA", "RHYTHM", "CONTEXT", "SIGNALS", "THRESHOLD"],
      },
      participa: {
        label: "Take part",
        title: "The ending becomes an activation scene—not a dull form.",
        text: "The final section gathers the energy of the journey: a clear action, strong visual presence, and a close that still feels alive and responsive.",
        cta: "Share your view",
        whisper: ["INQUIRY", "VOICE", "CLOSE", "ACTION", "INPUT", "ENTRY"],
      },
    },
  },
  pt: {
    nav: {
      programas: "Programas",
      saberes: "Saberes",
      precisando: "Precisando",
      participa: "Participa",
      somos: "Somos",
    },
    heroEyebrow: "radical · imersivo · capítulos",
    heroTitle: "Potencia el uso de la tecnología",
    heroLead:
      "Ser radical significa que o site não se apenas olha: se atravessa. Reage ao cursor, revela capítulos com máscaras, cria foco, tensão e sensação de espaço ativo.",
    heroBottom:
      "Você não desce uma página. Entra numa sequência de limiares. Cada capítulo se comporta como uma cena com gravidade própria.",
    heroCta: "Entrar na instalação",
    sceneWord: "cena",
    footerKicker: "Site radical e imersivo",
    footerTitle: "Mais radical. Mais imersivo. Mais envolvente.",
    footerBody:
      "Um site pode sustentar melhor a atenção quando se comporta como experiência e não só como contêiner de conteúdo.",
    footerLinks: {
      programas: "Programas",
      saberes: "Saberes",
      precisando: "Precisando",
      participa: "Participa",
      somos: "Somos",
    },
    soundOn: "Silenciar ambiente",
    soundOff: "Ativar ambiente",
    chapters: {
      programas: {
        label: "Programas",
        title: "Programas como cena viva, enorme e mutável.",
        text: "Cada capítulo ocupa a tela, responde ao mouse e se instala como experiência. Não joga informação: obriga a entrar, olhar e ficar um pouco mais.",
        cta: "Ir aos programas",
        whisper: ["HUB", "CIDADES", "APRENDER", "DOCENTES", "ROTA", "ATIVAÇÃO"],
      },
      saberes: {
        label: "Saberes",
        title: "A coleção vira paisagem de sinais e camadas.",
        text: "Saberes deixa de ser biblioteca estática. Parece campo de recursos que flutua, se ilumina e muda conforme a posição de quem navega no capítulo.",
        cta: "Abrir coleção",
        whisper: ["GUIAS", "RECURSOS", "PERGUNTAS", "VERIFICAR", "LEITURA", "CAMADAS"],
      },
      precisando: {
        label: "Precisando",
        title: "A publicação entra como capítulo de atmosfera, não como lista.",
        text: "O capítulo editorial não mostra artigos como cards. Constrói presença: tipografia imensa, ecos de palavras, foco variável e sensação de profundidade narrativa.",
        cta: "Ir ao Precisando",
        whisper: ["LEITURA", "CRITÉRIO", "RITMO", "CONTEXTO", "SINAIS", "LIMIAR"],
      },
      participa: {
        label: "Participa",
        title: "O final vira cena de ativação, não formulário entediante.",
        text: "A última seção concentra a energia do percurso: ação clara, grande presença visual e um fecho que ainda parece vivo e reativo.",
        cta: "Enviar opinião",
        whisper: ["CONSULTA", "OPINIÃO", "FECHO", "AÇÃO", "VOZ", "ENTRADA"],
      },
    },
  },
};

export const CHAPTER_IDS: readonly ChapterId[] = CHAPTER_ORDER;

export function getImmersiveChapters(locale: ImmersiveLocale): ImmersiveChapter[] {
  const copy = immersiveCopy[locale];
  return CHAPTER_ORDER.map((id) => {
    const meta = CHAPTER_META[id];
    const ch = copy.chapters[id];
    return {
      id,
      step: meta.step,
      href: meta.href,
      align: meta.align,
      accentX: meta.accentX,
      label: ch.label,
      title: ch.title,
      text: ch.text,
      cta: ch.cta,
      whisper: ch.whisper,
    };
  });
}

export function detectInitialLocale(): ImmersiveLocale {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem("precisar-immersive-locale");
  if (stored === "en" || stored === "pt" || stored === "es") return stored;
  const lang = navigator.language.slice(0, 2).toLowerCase();
  if (lang === "en") return "en";
  if (lang === "pt") return "pt";
  return "es";
}
