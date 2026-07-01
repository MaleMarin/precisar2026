const CYLINDER_COLORS = [
  { bg: "#DB5227", tc: "#F5F2EC" },
  { bg: "#023661", tc: "#F5F2EC" },
  { bg: "#F5F2EC", tc: "#0A0C12" },
  { bg: "#DB5227", tc: "#F5F2EC" },
  { bg: "#023661", tc: "#F5F2EC" },
  { bg: "#F5F2EC", tc: "#0A0C12" },
];

function withColors(sections) {
  return sections.map((s, i) => ({ ...s, ...CYLINDER_COLORS[i] }));
}

const hubSectionsEs = withColors([
  {
    kicker: "01 · Introducción",
    title: "Cultura digital\nque viaja",
    subItinerantes: true,
    subSuffix: " Para cualquier espacio.",
    body: "En el Hub Digital Consciente nos sumergimos en la cultura digital a través de muestras interactivas y temáticas. Cada una es portátil y está diseñada para explorar cómo los medios y la tecnología influyen en nuestra sociedad, llevando el conocimiento directamente a eventos, municipios, espacios públicos y más.",
    groups: [
      {
        label: "¿Adónde y para quién?",
        items: [
          "Plazas, bibliotecas, salas culturales, establecimientos educacionales, auditorios y eventos corporativos.",
          "Pensada para un público amplio de cualquier edad y nivel educacional.",
          "Cada visitante obtiene perspectivas críticas sobre la cultura digital y herramientas prácticas.",
        ],
      },
      {
        label: "Nuestro enfoque",
        items: [
          "No solo presentamos temas: también abrimos un espacio para el diálogo y la acción.",
          "Traducimos conceptos complejos —desinformación (integridad informativa), IA, privacidad— en experiencias sensoriales accesibles.",
          "Impulsamos conversaciones significativas sobre el uso responsable de la tecnología.",
        ],
      },
    ],
  },
  {
    kicker: "02 · Contenido",
    title: "Lo que\nencontrarás",
    sub: "4 elementos que cautivarán.",
    body: "Ofrecemos una combinación de elementos visuales y prácticos que cautivarán a tus participantes desde el primer momento.",
    groups: [
      {
        label: "Elementos de cada muestra",
        items: [
          "Carteles visualmente impactantes — Diseñados para provocar conversación y reflexión inmediata sobre temas cruciales de la tecnología contemporánea. Cada póster actúa como un 'abre ojos' que presenta información de forma clara y estética.",
          "Aplicaciones interactivas — Invitan a experimentar de primera mano tecnologías de punta como realidad aumentada e IA para crear experiencias memorables que conectan con el público de manera lúdica.",
          "Animaciones de video — Dan pie a discusiones profundas sobre privacidad y detección de noticias falsas. Exploran dilemas éticos del mundo digital mediante historias visuales.",
          "Experiencias prácticas — Estimulan debates significativos entre participantes. Complemento perfecto antes de talleres, charlas o seminarios sobre cultura digital.",
        ],
      },
    ],
  },
  {
    kicker: "03 · Formatos",
    title: "Modelos de\ninstalación",
    sub: "PIXEL · VECTOR · HOLO",
    body: "Tres paquetes modulares que se ajustan al espacio, la duración y el público de tu evento.",
    groups: [
      {
        label: "PIXEL — Formato básico para espacios reducidos",
        items: [
          "2 Carteles Temáticos — Conceptos esenciales de la edición elegida. Diseño compacto que introduce los temas principales de forma visual e impactante.",
          "1 Pantalla de Animación — Monitor que reproduce contenido audiovisual básico con narrativas introductorias y datos clave.",
          "2 Experiencias Interactivas — Aplicaciones simples en tablets que permiten exploración básica de conceptos a través de simulaciones sencillas.",
          "Espacio requerido: 8–12 m²",
          "Tiempo de instalación: 45–60 minutos",
          "Duración recomendada: 1–3 días",
          "Audiencia: 50–100 personas por día",
        ],
      },
      {
        label: "VECTOR — Formato estándar para eventos medianos",
        items: [
          "3 Carteles Temáticos — Representan bloques clave como algoritmos, desinformación (integridad informativa), bots y manipulación informativa.",
          "3 Pantallas de Animación — Monitores horizontales que proyectan visualizaciones dinámicas, simulaciones o contenidos de contexto.",
          "3 Estaciones Interactivas — Paneles digitales verticales con pantallas táctiles para aplicaciones, juegos y módulos de verificación.",
          "Experiencias Prácticas para Debate (opcional según objetivo del evento).",
          "Espacio requerido: 15–25 m²",
          "Tiempo de instalación: 2–3 horas",
          "Duración recomendada: 3 días – 2 semanas",
          "Audiencia: 100–300 personas por día",
        ],
      },
      {
        label: "HOLO — Formato completo para instalaciones duraderas",
        items: [
          "6 Carteles Visuales — Tres paneles frontales y cuatro laterales que estructuran el espacio y capturan la atención.",
          "3 Animaciones de Video — Pantallas con datos, narrativas, visualizaciones y simulaciones interactivas.",
          "4 Aplicaciones Interactivas — Estaciones digitales diseñadas en coordinación con el cliente según objetivos del evento.",
          "Consultas o encuestas adaptadas al interés del público o del cliente.",
          "Zona Central — Área con mobiliario cómodo para la reflexión, el debate, el descanso o actividades guiadas.",
          "Espacio requerido: 30–50 m²",
          "Tiempo de instalación: 4–6 horas",
          "Duración recomendada: 2 semanas – permanente",
          "Audiencia: 200–500 personas por día",
        ],
      },
    ],
  },
  {
    kicker: "04 · Implementación",
    title: "10 formas de\nimplementar",
    sub: "De activaciones a experiencias inmersivas.",
    body: "Pueden integrarse de múltiples formas en el espacio y el tiempo de tu evento, sin limitarse a un tipo de público específico.",
    groups: [
      {
        label: "Posibilidades de implementación",
        items: [
          "01 · Activación previa al evento — Despliega módulos interactivos en pasillos o vestíbulos para que la audiencia descubra conceptos clave antes de cualquier actividad programada.",
          "02 · Puntos de encuentro temáticos — Crea estaciones dedicadas a la privacidad, la IA, la desinformación (integridad informativa) o la ética digital, permitiendo que los visitantes transiten libremente entre ellas.",
          "03 · Rutas autoguiadas — Diseña un recorrido cronológico o lógico que guíe a las personas por distintos retos y experiencias, cada uno acompañado de soportes visuales y multimedia.",
          "04 · Elementos móviles — Utiliza tablets, kioscos portátiles o gafas de realidad aumentada para llevar la instalación a espacios reducidos o itinerantes dentro del mismo recinto.",
          "05 · Material descargable — Ofrece a los visitantes códigos QR que enlacen a guías, infografías y recursos digitales para profundizar después del evento.",
          "06 · Salas de reflexión — Habilita áreas con mobiliario cómodo donde se proyecten cortos vídeos de discusión o paneles de expertos, invitando al diálogo espontáneo.",
          "07 · Interacción IA en vivo — Incluye chatbots o asistentes virtuales que respondan preguntas, generen análisis de perfiles de privacidad y ofrezcan recomendaciones personalizadas.",
          "08 · Experiencias inmersivas — Incorpora videoproyecciones 360°, realidad virtual y entornos sonoros para sumergir al visitante en escenarios que ilustran riesgos y oportunidades tecnológicas.",
          "09 · Gamificación — Implementa desafíos y juegos basados en preguntas sobre los temas decididos, recompensando la participación con insignias digitales o reconocimientos físicos.",
          "10 · Integración con ponencias — Combina las estaciones interactivas con conferencias, de modo que cada ponente pueda referirse a los módulos específicos para ejemplificar sus argumentos.",
        ],
      },
    ],
  },
  {
    kicker: "05 · Personalización",
    title: "Ediciones\ntemáticas",
    sub: "Desinformación (integridad informativa) · IA · Comunitaria",
    body: "Hub Digital Consciente ofrece tres paquetes modulares —Pixel, Vector, Holo— que se ajustan al espacio, la duración y el público del evento.",
    groups: [
      {
        label: "Ediciones temáticas",
        items: [
          "Profundiza en áreas específicas (IA, desinformación (integridad informativa), privacidad digital, etc.) incorporando contenidos y tecnologías especializadas, como estaciones de realidad virtual o simulaciones avanzadas.",
        ],
      },
      {
        label: "Edición comunitaria",
        items: [
          "Adapta la realidad de tu comuna o grupo objetivo, integrando dinámicas de participación local y fórums de debate que empoderan a vecinos de todas las edades.",
        ],
      },
      {
        label: "Componentes a la carta",
        items: [
          "Elige piezas sueltas, pósters, mini-experimentos interactivos, kits de cultura digital, para complementar la exposición según las necesidades.",
        ],
      },
      {
        id: "ediciones-disponibles",
        label: "Ediciones disponibles",
        items: [
          { text: "01 · Edición Desinformación (integridad informativa) — Ver especificaciones completas →", pdf: "desinformacion" },
          { text: "02 · Edición IA y Algoritmos — Ver especificaciones completas →", pdf: "ia-algoritmos" },
        ],
      },
    ],
  },
  {
    kicker: "06 · Proceso",
    title: "Lleva el Hub\na tu espacio",
    sub: "Diseñamos a medida.",
    body: "Definimos contigo espacio, público y duración, y armamos una propuesta alineada a tu evento o territorio.",
    groups: [
      {
        label: "El proceso",
        items: [
          "01 · Definimos espacio, público y duración imaginados para la muestra.",
          "02 · Diseñamos la propuesta a medida de tu comunidad y objetivos.",
          "03 · Co-creamos juntos el montaje, contenidos y cronograma.",
        ],
      },
    ],
  },
]);

export const programsHub = {
  es: {
    metaTitle: "Hub Digital Consciente",
    metaDescription:
      "Muestras portátiles e interactivas de cultura digital para plazas, bibliotecas, educación, corporativos y territorio.",
    heroEyebrow: "■ HUB DIGITAL CONSCIENTE · PROGRAMA 02",
    heroTitle: "Cultura digital que viaja a donde están las personas.",
    statSub: "Diseñada para cualquier espacio.",
    body1:
      "En el Hub Digital Consciente transformamos la cultura digital en experiencias tangibles. A través de muestras interactivas y portátiles, exploramos el impacto de la tecnología en nuestra sociedad, llevando el conocimiento especializado directamente a eventos, municipios y espacios públicos.",
    body2:
      "No solo exponemos contenidos; creamos espacios de diálogo y acción. Traducimos conceptos complejos, como la desinformación (integridad informativa), la IA y la privacidad, en experiencias sensoriales accesibles que impulsan el uso responsable de la tecnología en la ciudadanía.",
    interactiveAria: "Exploración interactiva del Hub Digital Consciente",
    ctaTitle: "Lleva el Hub Digital Consciente a tu espacio.",
    cylinder: {
      topTitle: "El Hub en 360°",
      topHint: "arrastra para girar",
      clickHint: "click para leer →",
      prevSection: "Sección anterior",
      nextSection: "Sección siguiente",
      sectionsAria: "Secciones",
      sectionN: "Sección {n}",
      backToHub: "← volver al Hub en 360°",
      nextNav: "Siguiente → {kicker}",
      downloadButton: "Descargar información completa ↓",
      printTitle: "Hub Digital Consciente",
      printSubtitle: "Programa 02 · Precisar",
      printSocialTitle: "Redes y web",
      printWeb: "Web: precisar.net",
      printX: "X / Twitter: x.com/precisar_",
      printInstagram: "Instagram: instagram.com/_precisar",
      printFacebook: "Facebook: facebook.com/precisar",
      printYouTube: "YouTube: youtube.com/channel/UCQKEOqwm3pxIeO6E1Hsokhw",
      printMadeIn: "© {year} Precisar. Hecho con criterio en Chile y México.",
      printLicense: "Contenidos bajo licencia Creative Commons CC BY 4.0",
      sections: hubSectionsEs,
    },
    modelos: {
      aria: "Modelos de instalación",
      label: "Modelos",
      specLabels: {
        espacio: "Espacio",
        instalacion: "Instalación",
        duracion: "Duración",
        audiencia: "Audiencia",
      },
      items: [
        {
          id: "pixel",
          nivel: "Básico",
          nombre: "PIXEL",
          subtitulo: "Espacios reducidos",
          items: ["2 Carteles temáticos", "1 Pantalla de animación", "2 Experiencias interactivas"],
          espacio: "8–12 m²",
          instalacion: "45–60 min",
          duracion: "1–3 días",
          audiencia: "50–100/día",
        },
        {
          id: "vector",
          nivel: "Estándar",
          nombre: "VECTOR",
          subtitulo: "Eventos medianos",
          items: ["3 Carteles temáticos", "3 Pantallas de animación", "3 Estaciones interactivas"],
          espacio: "15–25 m²",
          instalacion: "2–3 horas",
          duracion: "3 días – 2 semanas",
          audiencia: "100–300/día",
        },
        {
          id: "holo",
          nivel: "Completo",
          nombre: "HOLO",
          subtitulo: "Instalaciones duraderas",
          items: [
            "6 Carteles visuales",
            "3 Animaciones de video",
            "4 Aplicaciones interactivas",
            "Zona central de reflexión",
          ],
          espacio: "30–50 m²",
          instalacion: "4–6 horas",
          duracion: "2 semanas – permanente",
          audiencia: "200–500/día",
        },
      ],
    },
    posibilidades: {
      aria: "Posibilidades del hub interactivo",
      label: "Posibilidades",
      slideAria: "Ir a diapositiva",
      slideN: "Diapositiva {n} de {total}",
      prevSlide: "Diapositiva anterior",
      nextSlide: "Diapositiva siguiente",
      slides: [
        {
          title: "Activación previa al evento",
          desc: "Despliega módulos interactivos en pasillos o vestíbulos para que la audiencia descubra conceptos clave antes de cualquier actividad programada.",
        },
        {
          title: "Puntos de encuentro temáticos",
          desc: "Crea estaciones dedicadas a la privacidad, la IA, la desinformación (integridad informativa) o la ética digital, permitiendo que los visitantes transiten libremente entre ellas.",
        },
        {
          title: "Rutas autoguiadas",
          desc: "Diseña un recorrido cronológico o lógico que guíe a las personas por distintos retos y experiencias, cada uno acompañado de soportes visuales y multimedia.",
        },
        {
          title: "Elementos móviles",
          desc: "Utiliza tablets, kioscos portátiles o gafas de realidad aumentada para llevar la instalación a espacios reducidos o itinerantes dentro del mismo recinto.",
        },
        {
          title: "Material descargable",
          desc: "Ofrece a los visitantes códigos QR que enlacen a guías, infografías y recursos digitales para profundizar después del evento.",
        },
        {
          title: "Salas de reflexión",
          desc: "Habilita áreas con mobiliario cómodo donde se proyecten cortos videos de discusión o paneles de expertos, invitando al diálogo espontáneo.",
        },
        {
          title: "Interacción IA en vivo",
          desc: "Incluye chatbots o asistentes virtuales que respondan preguntas, generen análisis de perfiles de privacidad y ofrezcan recomendaciones personalizadas.",
        },
        {
          title: "Experiencias inmersivas",
          desc: "Incorpora videoproyecciones 360°, realidad virtual y entornos sonoros para sumergir al visitante en escenarios que ilustran riesgos y oportunidades tecnológicas.",
        },
        {
          title: "Gamificación",
          desc: "Implementa desafíos y juegos basados en preguntas sobre los temas decididos, recompensando la participación con insignias digitales o reconocimientos físicos.",
        },
        {
          title: "Integración con ponencias",
          desc: "Combina las estaciones interactivas con conferencias, de modo que cada ponente pueda referirse a los módulos específicos para ejemplificar sus argumentos.",
        },
      ],
    },
    personalizacion: {
      aria: "Personalización del hub",
      tabs: [
        {
          id: "tematicas",
          label: "Ediciones temáticas",
          content:
            "Profundiza en áreas específicas: IA, desinformación (integridad informativa), privacidad digital, incorporando contenidos y tecnologías especializadas como estaciones de realidad virtual o simulaciones avanzadas.",
        },
        {
          id: "comunitaria",
          label: "Edición comunitaria",
          content:
            "Adapta la realidad de tu comuna o grupo objetivo, integrando dinámicas de participación local y foros de debate que empoderan a vecinos de todas las edades.",
        },
        {
          id: "carta",
          label: "Componentes a la carta",
          content:
            "Elige piezas sueltas: pósters, mini-experimentos interactivos, kits de cultura digital, para complementar la exposición según tus necesidades.",
        },
      ],
    },
  },
  en: {
    metaTitle: "Conscious Digital Hub",
    metaDescription:
      "Portable, interactive digital culture exhibits for squares, libraries, education, corporate settings, and communities.",
    heroEyebrow: "■ CONSCIOUS DIGITAL HUB · PROGRAM 02",
    heroTitle: "Digital culture that travels to where people are.",
    statSub: "Designed for any space.",
    body1:
      "At the Conscious Digital Hub we turn digital culture into tangible experiences. Through interactive, portable exhibits, we explore technology's impact on society, bringing specialised knowledge directly to events, municipalities, and public spaces.",
    body2:
      "We don't just display content; we create spaces for dialogue and action. We translate complex concepts — such as disinformation (information integrity), AI, and privacy — into accessible sensory experiences that promote responsible technology use among citizens.",
    interactiveAria: "Interactive exploration of the Conscious Digital Hub",
    ctaTitle: "Bring the Conscious Digital Hub to your space.",
    cylinder: {
      topTitle: "The Hub in 360°",
      topHint: "drag to rotate",
      clickHint: "click to read →",
      prevSection: "Previous section",
      nextSection: "Next section",
      sectionsAria: "Sections",
      sectionN: "Section {n}",
      backToHub: "← back to the Hub in 360°",
      nextNav: "Next → {kicker}",
      downloadButton: "Download full information ↓",
      printTitle: "Conscious Digital Hub",
      printSubtitle: "Program 02 · Precisar",
      printSocialTitle: "Web and social",
      printWeb: "Web: precisar.net",
      printX: "X / Twitter: x.com/precisar_",
      printInstagram: "Instagram: instagram.com/_precisar",
      printFacebook: "Facebook: facebook.com/precisar",
      printYouTube: "YouTube: youtube.com/channel/UCQKEOqwm3pxIeO6E1Hsokhw",
      printMadeIn: "© {year} Precisar. Built with judgment in Chile and Mexico.",
      printLicense: "Content under Creative Commons CC BY 4.0 licence",
      sections: withColors([
        {
          kicker: "01 · Introduction",
          title: "Digital culture\nthat travels",
          subItinerantes: true,
          subSuffix: " For any space.",
          body: "At the Conscious Digital Hub we immerse ourselves in digital culture through interactive, thematic exhibits. Each one is portable and designed to explore how media and technology influence our society, bringing knowledge directly to events, municipalities, public spaces, and more.",
          groups: [
            {
              label: "Where and for whom?",
              items: [
                "Squares, libraries, cultural venues, schools, auditoriums, and corporate events.",
                "Designed for a broad audience of any age and educational level.",
                "Each visitor gains critical perspectives on digital culture and practical tools.",
              ],
            },
            {
              label: "Our approach",
              items: [
                "We don't just present topics: we also open a space for dialogue and action.",
                "We translate complex concepts — disinformation (information integrity), AI, privacy — into accessible sensory experiences.",
                "We foster meaningful conversations about responsible technology use.",
              ],
            },
          ],
        },
        {
          kicker: "02 · Content",
          title: "What you'll\nfind",
          sub: "4 elements that will captivate.",
          body: "We offer a combination of visual and hands-on elements that will captivate your participants from the first moment.",
          groups: [
            {
              label: "Elements of each exhibit",
              items: [
                "Visually striking posters — Designed to spark immediate conversation and reflection on crucial topics in contemporary technology. Each poster acts as an 'eye-opener' presenting information clearly and aesthetically.",
                "Interactive applications — Invite first-hand experimentation with cutting-edge technologies such as augmented reality and AI to create memorable experiences that connect with audiences playfully.",
                "Video animations — Lead to deep discussions about privacy and detecting fake news. Explore ethical dilemmas of the digital world through visual stories.",
                "Hands-on experiences — Stimulate meaningful debate among participants. The perfect complement before workshops, talks, or seminars on digital culture.",
              ],
            },
          ],
        },
        {
          kicker: "03 · Formats",
          title: "Installation\nmodels",
          sub: "PIXEL · VECTOR · HOLO",
          body: "Three modular packages that adapt to your event's space, duration, and audience.",
          groups: [
            {
              label: "PIXEL — Basic format for small spaces",
              items: [
                "2 Thematic Posters — Essential concepts from the chosen edition. Compact design that introduces main topics visually and impactfully.",
                "1 Animation Screen — Monitor playing basic audiovisual content with introductory narratives and key data.",
                "2 Interactive Experiences — Simple tablet applications allowing basic exploration of concepts through straightforward simulations.",
                "Space required: 8–12 m²",
                "Installation time: 45–60 minutes",
                "Recommended duration: 1–3 days",
                "Audience: 50–100 people per day",
              ],
            },
            {
              label: "VECTOR — Standard format for medium events",
              items: [
                "3 Thematic Posters — Represent key blocks such as algorithms, disinformation (information integrity), bots, and information manipulation.",
                "3 Animation Screens — Horizontal monitors projecting dynamic visualisations, simulations, or contextual content.",
                "3 Interactive Stations — Vertical digital panels with touch screens for applications, games, and verification modules.",
                "Debate Hands-on Experiences (optional depending on event goals).",
                "Space required: 15–25 m²",
                "Installation time: 2–3 hours",
                "Recommended duration: 3 days – 2 weeks",
                "Audience: 100–300 people per day",
              ],
            },
            {
              label: "HOLO — Full format for lasting installations",
              items: [
                "6 Visual Posters — Three front panels and four side panels structuring the space and capturing attention.",
                "3 Video Animations — Screens with data, narratives, visualisations, and interactive simulations.",
                "4 Interactive Applications — Digital stations designed in coordination with the client according to event goals.",
                "Surveys or polls adapted to audience or client interests.",
                "Central Zone — Area with comfortable furniture for reflection, debate, rest, or guided activities.",
                "Space required: 30–50 m²",
                "Installation time: 4–6 hours",
                "Recommended duration: 2 weeks – permanent",
                "Audience: 200–500 people per day",
              ],
            },
          ],
        },
        {
          kicker: "04 · Implementation",
          title: "10 ways to\nimplement",
          sub: "From activations to immersive experiences.",
          body: "They can be integrated in multiple ways into your event's space and timeline, without being limited to a specific audience.",
          groups: [
            {
              label: "Implementation possibilities",
              items: [
                "01 · Pre-event activation — Deploy interactive modules in corridors or lobbies so the audience discovers key concepts before any scheduled activity.",
                "02 · Thematic meeting points — Create stations dedicated to privacy, AI, disinformation (information integrity), or digital ethics, allowing visitors to move freely between them.",
                "03 · Self-guided routes — Design a chronological or logical path guiding people through different challenges and experiences, each supported by visual and multimedia materials.",
                "04 · Mobile elements — Use tablets, portable kiosks, or augmented reality glasses to bring the installation to small or itinerant spaces within the same venue.",
                "05 · Downloadable material — Offer visitors QR codes linking to guides, infographics, and digital resources to explore after the event.",
                "06 · Reflection rooms — Enable areas with comfortable furniture where short discussion videos or expert panels are projected, inviting spontaneous dialogue.",
                "07 · Live AI interaction — Include chatbots or virtual assistants that answer questions, generate privacy profile analyses, and offer personalised recommendations.",
                "08 · Immersive experiences — Incorporate 360° video projections, virtual reality, and sound environments to immerse visitors in scenarios illustrating technological risks and opportunities.",
                "09 · Gamification — Implement challenges and games based on questions about chosen topics, rewarding participation with digital badges or physical recognition.",
                "10 · Integration with talks — Combine interactive stations with conferences so each speaker can refer to specific modules to illustrate their arguments.",
              ],
            },
          ],
        },
        {
          kicker: "05 · Customisation",
          title: "Thematic\neditions",
          sub: "Disinformation (information integrity) · AI · Community",
          body: "Conscious Digital Hub offers three modular packages — Pixel, Vector, Holo — that adapt to the event's space, duration, and audience.",
          groups: [
            {
              label: "Thematic editions",
              items: [
                "Deepen specific areas (AI, disinformation (information integrity), digital privacy, etc.) by incorporating specialised content and technologies, such as virtual reality stations or advanced simulations.",
              ],
            },
            {
              label: "Community edition",
              items: [
                "Adapt to the reality of your municipality or target group, integrating local participation dynamics and debate forums that empower neighbours of all ages.",
              ],
            },
            {
              label: "À la carte components",
              items: [
                "Choose individual pieces, posters, mini interactive experiments, digital culture kits, to complement the exhibition according to your needs.",
              ],
            },
            {
              id: "ediciones-disponibles",
              label: "Available editions",
              items: [
                { text: "01 · Disinformation Edition (information integrity) — View full specifications →", pdf: "desinformacion" },
                { text: "02 · AI and Algorithms Edition — View full specifications →", pdf: "ia-algoritmos" },
              ],
            },
          ],
        },
        {
          kicker: "06 · Process",
          title: "Bring the Hub\nto your space",
          sub: "We design to measure.",
          body: "We define space, audience, and duration with you, and build a proposal aligned with your event or community.",
          groups: [
            {
              label: "The process",
              items: [
                "01 · We define the space, audience, and duration envisioned for the exhibit.",
                "02 · We design a proposal tailored to your community and goals.",
                "03 · We co-create the setup, content, and schedule together.",
              ],
            },
          ],
        },
      ]),
    },
    modelos: {
      aria: "Installation models",
      label: "Models",
      specLabels: { espacio: "Space", instalacion: "Installation", duracion: "Duration", audiencia: "Audience" },
      items: [
        {
          id: "pixel",
          nivel: "Basic",
          nombre: "PIXEL",
          subtitulo: "Small spaces",
          items: ["2 Thematic posters", "1 Animation screen", "2 Interactive experiences"],
          espacio: "8–12 m²",
          instalacion: "45–60 min",
          duracion: "1–3 days",
          audiencia: "50–100/day",
        },
        {
          id: "vector",
          nivel: "Standard",
          nombre: "VECTOR",
          subtitulo: "Medium events",
          items: ["3 Thematic posters", "3 Animation screens", "3 Interactive stations"],
          espacio: "15–25 m²",
          instalacion: "2–3 hours",
          duracion: "3 days – 2 weeks",
          audiencia: "100–300/day",
        },
        {
          id: "holo",
          nivel: "Full",
          nombre: "HOLO",
          subtitulo: "Lasting installations",
          items: [
            "6 Visual posters",
            "3 Video animations",
            "4 Interactive applications",
            "Central reflection zone",
          ],
          espacio: "30–50 m²",
          instalacion: "4–6 hours",
          duracion: "2 weeks – permanent",
          audiencia: "200–500/day",
        },
      ],
    },
    posibilidades: {
      aria: "Interactive hub possibilities",
      label: "Possibilities",
      slideAria: "Go to slide",
      slideN: "Slide {n} of {total}",
      prevSlide: "Previous slide",
      nextSlide: "Next slide",
      slides: [
        {
          title: "Pre-event activation",
          desc: "Deploy interactive modules in corridors or lobbies so the audience discovers key concepts before any scheduled activity.",
        },
        {
          title: "Thematic meeting points",
          desc: "Create stations dedicated to privacy, AI, disinformation (information integrity), or digital ethics, allowing visitors to move freely between them.",
        },
        {
          title: "Self-guided routes",
          desc: "Design a chronological or logical path guiding people through different challenges and experiences, each supported by visual and multimedia materials.",
        },
        {
          title: "Mobile elements",
          desc: "Use tablets, portable kiosks, or augmented reality glasses to bring the installation to small or itinerant spaces within the same venue.",
        },
        {
          title: "Downloadable material",
          desc: "Offer visitors QR codes linking to guides, infographics, and digital resources to explore after the event.",
        },
        {
          title: "Reflection rooms",
          desc: "Enable areas with comfortable furniture where short discussion videos or expert panels are projected, inviting spontaneous dialogue.",
        },
        {
          title: "Live AI interaction",
          desc: "Include chatbots or virtual assistants that answer questions, generate privacy profile analyses, and offer personalised recommendations.",
        },
        {
          title: "Immersive experiences",
          desc: "Incorporate 360° video projections, virtual reality, and sound environments to immerse visitors in scenarios illustrating technological risks and opportunities.",
        },
        {
          title: "Gamification",
          desc: "Implement challenges and games based on questions about chosen topics, rewarding participation with digital badges or physical recognition.",
        },
        {
          title: "Integration with talks",
          desc: "Combine interactive stations with conferences so each speaker can refer to specific modules to illustrate their arguments.",
        },
      ],
    },
    personalizacion: {
      aria: "Hub customisation",
      tabs: [
        {
          id: "tematicas",
          label: "Thematic editions",
          content:
            "Deepen specific areas: AI, disinformation (information integrity), digital privacy, incorporating specialised content and technologies such as virtual reality stations or advanced simulations.",
        },
        {
          id: "comunitaria",
          label: "Community edition",
          content:
            "Adapt to the reality of your municipality or target group, integrating local participation dynamics and debate forums that empower neighbours of all ages.",
        },
        {
          id: "carta",
          label: "À la carte components",
          content:
            "Choose individual pieces: posters, mini interactive experiments, digital culture kits, to complement the exhibition according to your needs.",
        },
      ],
    },
  },
  pt: {
    metaTitle: "Hub Digital Consciente",
    metaDescription:
      "Mostras portáteis e interativas de cultura digital para praças, bibliotecas, educação, empresas e território.",
    heroEyebrow: "■ HUB DIGITAL CONSCIENTE · PROGRAMA 02",
    heroTitle: "Cultura digital que viaja até onde estão as pessoas.",
    statSub: "Concebida para qualquer espaço.",
    body1:
      "No Hub Digital Consciente transformamos a cultura digital em experiências tangíveis. Através de mostras interativas e portáteis, exploramos o impacto da tecnologia na nossa sociedade, levando o conhecimento especializado diretamente a eventos, municípios e espaços públicos.",
    body2:
      "Não apenas expomos conteúdos; criamos espaços de diálogo e ação. Traduzimos conceitos complexos, como a desinformação (integridade informativa), a IA e a privacidade, em experiências sensoriais acessíveis que impulsionam o uso responsável da tecnologia na cidadania.",
    interactiveAria: "Exploração interativa do Hub Digital Consciente",
    ctaTitle: "Leve o Hub Digital Consciente ao seu espaço.",
    cylinder: {
      topTitle: "O Hub em 360°",
      topHint: "arraste para girar",
      clickHint: "clique para ler →",
      prevSection: "Secção anterior",
      nextSection: "Secção seguinte",
      sectionsAria: "Secções",
      sectionN: "Secção {n}",
      backToHub: "← voltar ao Hub em 360°",
      nextNav: "Seguinte → {kicker}",
      downloadButton: "Descarregar informação completa ↓",
      printTitle: "Hub Digital Consciente",
      printSubtitle: "Programa 02 · Precisar",
      printSocialTitle: "Redes e web",
      printWeb: "Web: precisar.net",
      printX: "X / Twitter: x.com/precisar_",
      printInstagram: "Instagram: instagram.com/_precisar",
      printFacebook: "Facebook: facebook.com/precisar",
      printYouTube: "YouTube: youtube.com/channel/UCQKEOqwm3pxIeO6E1Hsokhw",
      printMadeIn: "© {year} Precisar. Feito com critério no Chile e no México.",
      printLicense: "Conteúdos sob licença Creative Commons CC BY 4.0",
      sections: withColors([
        {
          kicker: "01 · Introdução",
          title: "Cultura digital\nque viaja",
          subItinerantes: true,
          subSuffix: " Para qualquer espaço.",
          body: "No Hub Digital Consciente mergulhamos na cultura digital através de mostras interativas e temáticas. Cada uma é portátil e está concebida para explorar como os meios e a tecnologia influenciam a nossa sociedade, levando o conhecimento diretamente a eventos, municípios, espaços públicos e mais.",
          groups: [
            {
              label: "Onde e para quem?",
              items: [
                "Praças, bibliotecas, salas culturais, estabelecimentos de ensino, auditórios e eventos corporativos.",
                "Pensada para um público amplo de qualquer idade e nível educacional.",
                "Cada visitante obtém perspetivas críticas sobre a cultura digital e ferramentas práticas.",
              ],
            },
            {
              label: "A nossa abordagem",
              items: [
                "Não apenas apresentamos temas: também abrimos um espaço para o diálogo e a ação.",
                "Traduzimos conceitos complexos — desinformação (integridade informativa), IA, privacidade — em experiências sensoriais acessíveis.",
                "Impulsionamos conversas significativas sobre o uso responsável da tecnologia.",
              ],
            },
          ],
        },
        {
          kicker: "02 · Conteúdo",
          title: "O que\nencontrará",
          sub: "4 elementos que cativarão.",
          body: "Oferecemos uma combinação de elementos visuais e práticos que cativarão os seus participantes desde o primeiro momento.",
          groups: [
            {
              label: "Elementos de cada mostra",
              items: [
                "Cartazes visualmente impactantes — Concebidos para provocar conversa e reflexão imediata sobre temas cruciais da tecnologia contemporânea. Cada póster actua como um 'abre-olhos' que apresenta informação de forma clara e estética.",
                "Aplicações interativas — Convida a experimentar em primeira mão tecnologias de ponta como realidade aumentada e IA para criar experiências memoráveis que conectam com o público de forma lúdica.",
                "Animações de vídeo — Dão lugar a discussões profundas sobre privacidade e deteção de notícias falsas. Exploram dilemas éticos do mundo digital mediante histórias visuais.",
                "Experiências práticas — Estimulam debates significativos entre participantes. Complemento perfeito antes de oficinas, palestras ou seminários sobre cultura digital.",
              ],
            },
          ],
        },
        {
          kicker: "03 · Formatos",
          title: "Modelos de\ninstalação",
          sub: "PIXEL · VECTOR · HOLO",
          body: "Três pacotes modulares que se ajustam ao espaço, duração e público do seu evento.",
          groups: [
            {
              label: "PIXEL — Formato básico para espaços reduzidos",
              items: [
                "2 Cartazes Temáticos — Conceitos essenciais da edição escolhida. Design compacto que introduz os temas principais de forma visual e impactante.",
                "1 Ecrã de Animação — Monitor que reproduz conteúdo audiovisual básico com narrativas introdutórias e dados-chave.",
                "2 Experiências Interativas — Aplicações simples em tablets que permitem exploração básica de conceitos através de simulações simples.",
                "Espaço requerido: 8–12 m²",
                "Tempo de instalação: 45–60 minutos",
                "Duração recomendada: 1–3 dias",
                "Audiência: 50–100 pessoas por dia",
              ],
            },
            {
              label: "VECTOR — Formato padrão para eventos médios",
              items: [
                "3 Cartazes Temáticos — Representam blocos-chave como algoritmos, desinformação (integridade informativa), bots e manipulação informativa.",
                "3 Ecrãs de Animação — Monitores horizontais que projetam visualizações dinâmicas, simulações ou conteúdos de contexto.",
                "3 Estações Interativas — Painéis digitais verticais com ecrãs tácteis para aplicações, jogos e módulos de verificação.",
                "Experiências Práticas para Debate (opcional consoante o objetivo do evento).",
                "Espaço requerido: 15–25 m²",
                "Tempo de instalação: 2–3 horas",
                "Duração recomendada: 3 dias – 2 semanas",
                "Audiência: 100–300 pessoas por dia",
              ],
            },
            {
              label: "HOLO — Formato completo para instalações duradouras",
              items: [
                "6 Cartazes Visuais — Três painéis frontais e quatro laterais que estruturam o espaço e captam a atenção.",
                "3 Animações de Vídeo — Ecrãs com dados, narrativas, visualizações e simulações interativas.",
                "4 Aplicações Interativas — Estações digitais concebidas em coordenação com o cliente consoante os objetivos do evento.",
                "Consultas ou inquéritos adaptados ao interesse do público ou do cliente.",
                "Zona Central — Área com mobiliário confortável para a reflexão, o debate, o descanso ou actividades guiadas.",
                "Espaço requerido: 30–50 m²",
                "Tempo de instalação: 4–6 horas",
                "Duração recomendada: 2 semanas – permanente",
                "Audiência: 200–500 pessoas por dia",
              ],
            },
          ],
        },
        {
          kicker: "04 · Implementação",
          title: "10 formas de\nimplementar",
          sub: "De activações a experiências imersivas.",
          body: "Podem integrar-se de múltiplas formas no espaço e tempo do seu evento, sem se limitar a um tipo de público específico.",
          groups: [
            {
              label: "Possibilidades de implementação",
              items: [
                "01 · Activação prévia ao evento — Desdobre módulos interactivos em corredores ou vestíbulos para que a audiência descubra conceitos-chave antes de qualquer actividade programada.",
                "02 · Pontos de encontro temáticos — Crie estações dedicadas à privacidade, à IA, à desinformação (integridade informativa) ou à ética digital, permitindo que os visitantes transitem livremente entre elas.",
                "03 · Rotas autoguiadas — Desenhe um percurso cronológico ou lógico que guie as pessoas por distintos desafios e experiências, cada um acompanhado de suportes visuais e multimédia.",
                "04 · Elementos móveis — Utilize tablets, quiosques portáteis ou óculos de realidade aumentada para levar a instalação a espaços reduzidos ou itinerantes dentro do mesmo recinto.",
                "05 · Material descarregável — Ofereça aos visitantes códigos QR que liguem a guias, infografias e recursos digitais para aprofundar depois do evento.",
                "06 · Salas de reflexão — Habilite áreas com mobiliário confortável onde se projectem curtos vídeos de discussão ou painéis de especialistas, convidando ao diálogo espontâneo.",
                "07 · Interacção IA ao vivo — Inclua chatbots ou assistentes virtuais que respondam a perguntas, gerem análises de perfis de privacidade e ofereçam recomendações personalizadas.",
                "08 · Experiências imersivas — Incorpore videoprojeções 360°, realidade virtual e ambientes sonoros para mergulhar o visitante em cenários que ilustram riscos e oportunidades tecnológicas.",
                "09 · Gamificação — Implemente desafios e jogos baseados em perguntas sobre os temas decididos, recompensando a participação com insígnias digitais ou reconhecimentos físicos.",
                "10 · Integração com palestras — Combine as estações interactivas com conferências, de modo que cada orador possa referir-se aos módulos específicos para exemplificar os seus argumentos.",
              ],
            },
          ],
        },
        {
          kicker: "05 · Personalização",
          title: "Edições\ntemáticas",
          sub: "Desinformação (integridade informativa) · IA · Comunitária",
          body: "Hub Digital Consciente oferece três pacotes modulares — Pixel, Vector, Holo — que se ajustam ao espaço, duração e público do evento.",
          groups: [
            {
              label: "Edições temáticas",
              items: [
                "Aprofunde áreas específicas (IA, desinformação (integridade informativa), privacidade digital, etc.) incorporando conteúdos e tecnologias especializadas, como estações de realidade virtual ou simulações avançadas.",
              ],
            },
            {
              label: "Edição comunitária",
              items: [
                "Adapte a realidade da sua comuna ou grupo-alvo, integrando dinâmicas de participação local e fóruns de debate que empoderam vizinhos de todas as idades.",
              ],
            },
            {
              label: "Componentes à carta",
              items: [
                "Escolha peças soltas, pósteres, mini-experimentos interactivos, kits de cultura digital, para complementar a exposição consoante as necessidades.",
              ],
            },
            {
              id: "ediciones-disponibles",
              label: "Edições disponíveis",
              items: [
                { text: "01 · Edição Desinformação (integridade informativa) — Ver especificações completas →", pdf: "desinformacion" },
                { text: "02 · Edição IA e Algoritmos — Ver especificações completas →", pdf: "ia-algoritmos" },
              ],
            },
          ],
        },
        {
          kicker: "06 · Processo",
          title: "Leve o Hub\nao seu espaço",
          sub: "Desenhamos à medida.",
          body: "Definimos consigo espaço, público e duração, e montamos uma proposta alinhada ao seu evento ou território.",
          groups: [
            {
              label: "O processo",
              items: [
                "01 · Definimos espaço, público e duração imaginados para a mostra.",
                "02 · Desenhamos a proposta à medida da sua comunidade e objectivos.",
                "03 · Co-criamos juntos a montagem, conteúdos e cronograma.",
              ],
            },
          ],
        },
      ]),
    },
    modelos: {
      aria: "Modelos de instalação",
      label: "Modelos",
      specLabels: { espacio: "Espaço", instalacion: "Instalação", duracion: "Duração", audiencia: "Audiência" },
      items: [
        {
          id: "pixel",
          nivel: "Básico",
          nombre: "PIXEL",
          subtitulo: "Espaços reduzidos",
          items: ["2 Cartazes temáticos", "1 Ecrã de animação", "2 Experiências interactivas"],
          espacio: "8–12 m²",
          instalacion: "45–60 min",
          duracion: "1–3 dias",
          audiencia: "50–100/dia",
        },
        {
          id: "vector",
          nivel: "Padrão",
          nombre: "VECTOR",
          subtitulo: "Eventos médios",
          items: ["3 Cartazes temáticos", "3 Ecrãs de animação", "3 Estações interactivas"],
          espacio: "15–25 m²",
          instalacion: "2–3 horas",
          duracion: "3 dias – 2 semanas",
          audiencia: "100–300/dia",
        },
        {
          id: "holo",
          nivel: "Completo",
          nombre: "HOLO",
          subtitulo: "Instalações duradouras",
          items: [
            "6 Cartazes visuais",
            "3 Animações de vídeo",
            "4 Aplicações interactivas",
            "Zona central de reflexão",
          ],
          espacio: "30–50 m²",
          instalacion: "4–6 horas",
          duracion: "2 semanas – permanente",
          audiencia: "200–500/dia",
        },
      ],
    },
    posibilidades: {
      aria: "Possibilidades do hub interactivo",
      label: "Possibilidades",
      slideAria: "Ir para diapositiva",
      slideN: "Diapositiva {n} de {total}",
      prevSlide: "Diapositiva anterior",
      nextSlide: "Diapositiva seguinte",
      slides: [
        {
          title: "Activação prévia ao evento",
          desc: "Desdobre módulos interactivos em corredores ou vestíbulos para que a audiência descubra conceitos-chave antes de qualquer actividade programada.",
        },
        {
          title: "Pontos de encontro temáticos",
          desc: "Crie estações dedicadas à privacidade, à IA, à desinformação (integridade informativa) ou à ética digital, permitindo que os visitantes transitem livremente entre elas.",
        },
        {
          title: "Rotas autoguiadas",
          desc: "Desenhe um percurso cronológico ou lógico que guie as pessoas por distintos desafios e experiências, cada um acompanhado de suportes visuais e multimédia.",
        },
        {
          title: "Elementos móveis",
          desc: "Utilize tablets, quiosques portáteis ou óculos de realidade aumentada para levar a instalação a espaços reduzidos ou itinerantes dentro do mesmo recinto.",
        },
        {
          title: "Material descarregável",
          desc: "Ofereça aos visitantes códigos QR que liguem a guias, infografias e recursos digitais para aprofundar depois do evento.",
        },
        {
          title: "Salas de reflexão",
          desc: "Habilite áreas com mobiliário confortável onde se projectem curtos vídeos de discussão ou painéis de especialistas, convidando ao diálogo espontâneo.",
        },
        {
          title: "Interacção IA ao vivo",
          desc: "Inclua chatbots ou assistentes virtuais que respondam a perguntas, gerem análises de perfis de privacidade e ofereçam recomendações personalizadas.",
        },
        {
          title: "Experiências imersivas",
          desc: "Incorpore videoprojeções 360°, realidade virtual e ambientes sonoros para mergulhar o visitante em cenários que ilustram riscos e oportunidades tecnológicas.",
        },
        {
          title: "Gamificação",
          desc: "Implemente desafios e jogos baseados em perguntas sobre os temas decididos, recompensando a participação com insígnias digitais ou reconhecimentos físicos.",
        },
        {
          title: "Integração com palestras",
          desc: "Combine as estações interactivas com conferências, de modo que cada orador possa referir-se aos módulos específicos para exemplificar os seus argumentos.",
        },
      ],
    },
    personalizacion: {
      aria: "Personalização do hub",
      tabs: [
        {
          id: "tematicas",
          label: "Edições temáticas",
          content:
            "Aprofunde áreas específicas: IA, desinformação (integridade informativa), privacidade digital, incorporando conteúdos e tecnologias especializadas como estações de realidade virtual ou simulações avançadas.",
        },
        {
          id: "comunitaria",
          label: "Edição comunitária",
          content:
            "Adapte a realidade da sua comuna ou grupo-alvo, integrando dinâmicas de participação local e fóruns de debate que empoderam vizinhos de todas as idades.",
        },
        {
          id: "carta",
          label: "Componentes à carta",
          content:
            "Escolha peças soltas: pósteres, mini-experimentos interactivos, kits de cultura digital, para complementar a exposição consoante as suas necessidades.",
        },
      ],
    },
  },
};
