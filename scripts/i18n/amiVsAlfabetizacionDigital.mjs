/** @type {Record<string, Record<string, unknown>>} */
export const amiVsAlfabetizacionDigital = {
  es: {
    metaTitle: "AMI vs Alfabetización Digital — Precisar",
    metaDescription:
      "¿En qué se diferencian la Alfabetización Mediática e Informacional (AMI) y la alfabetización digital? Tabla comparativa, ejercicio interactivo y tres razones clave para entender el enfoque de Precisar.",
    heroKicker: "Educación Mediática · AMI",
    heroTitle: "¿En qué se diferencian\nAMI y la Alfabetización Digital?",
    heroBajada:
      "AMI se centra en comprender, analizar y usar críticamente los medios y la información. La Alfabetización Digital prioriza las habilidades técnicas para usar herramientas y servicios tecnológicos con seguridad y eficacia.",
    amiColumn: {
      title: "AMI · Alfabetización Mediática e Informacional",
      sub: "Capacidades críticas sobre medios, mensajes y fuentes.",
      items: [
        "Analizar cómo se construye una noticia y distinguir opinión de hecho.",
        "Evaluar la credibilidad de una fuente y detectar publicidad nativa.",
        "Verificar con varias fuentes y entender sesgos/algoritmos.",
        "Derechos: acceso, autoría, privacidad, libertad de expresión, uso justo.",
      ],
      examplesLabel: "Ejemplos prácticos",
      examples: [
        "Detectar deepfakes en campaña",
        "Identificar titulares clickbait",
        "Comprobar autoría y fecha",
      ],
    },
    digitalColumn: {
      title: "Alfabetización Digital",
      sub: "Habilidades técnicas y operativas con dispositivos y apps.",
      items: [
        "Usar correo, videollamadas, hojas de cálculo, gestores de archivos.",
        "Configurar seguridad: contraseñas, 2FA, copias de seguridad.",
        "Administrar privacidad y permisos en redes y móviles.",
        "Resolver problemas básicos de software/hardware.",
      ],
      examplesLabel: "Ejemplos prácticos",
      examples: ["Activar 2FA en tus cuentas", "Compartir un Drive con permisos", "Limpiar malware del PC"],
    },
    tableKicker: "Tabla comparativa",
    tableTitle: "Dimensión a dimensión",
    tableHeaders: {
      dimension: "Dimensión",
      ami: "AMI",
      digital: "Alfabetización Digital",
    },
    tableRows: [
      {
        dimension: "Foco",
        ami: "Sentido crítico sobre mensajes, fuentes y contextos.",
        digital: "Uso eficiente y seguro de tecnologías y servicios.",
      },
      {
        dimension: "Preguntas guía",
        ami: "¿Quién lo dice? ¿con qué evidencia? ¿qué intención tiene?",
        digital: "¿Cómo lo hago? ¿qué botón? ¿qué ajuste de seguridad?",
      },
      {
        dimension: "Competencias",
        ami: "Analizar, evaluar, verificar, argumentar, derechos informacionales.",
        digital: "Instalar, configurar, operar, mantener, solucionar problemas.",
      },
      {
        dimension: "Ejemplos",
        ami: "Detectar sesgos; verificar una imagen; reconocer desinformación (integridad informativa).",
        digital: "Crear una videollamada; cifrar un disco; gestionar contraseñas.",
      },
      {
        dimension: "Resultado buscado",
        ami: "Pensamiento crítico y ciudadanía informada.",
        digital: "Autonomía técnica y seguridad operativa.",
      },
    ],
    exerciseKicker: "Prueba rápida",
    exerciseTitle: "Arrastra cada ejemplo\na su columna",
    exerciseTip:
      "Si dudas, pregúntate: ¿el ejemplo te pide pensar sobre la información (AMI) o usar herramientas con seguridad (Digital)?",
    poolEmpty: "Todos los ejemplos han sido asignados ✓",
    dropAmiLabel: "AMI",
    dropDigitalLabel: "Alfabetización Digital",
    dropHint: "Suelta aquí →",
    btnCheck: "Comprobar",
    btnReset: "Reiniciar",
    scoreTemplate: "{score} / {total} correctos",
    ejercicios: [
      { id: 1, texto: "Usar una herramienta de verificación de imágenes (OSINT)", respuesta: "ami" },
      { id: 2, texto: "Crear una videollamada con agenda y enlace", respuesta: "digital" },
      { id: 3, texto: "Compartir un documento en la nube con permisos correctos", respuesta: "digital" },
      { id: 4, texto: "Hacer una copia de seguridad automática", respuesta: "digital" },
      { id: 5, texto: "Citar correctamente y respetar licencias de autor", respuesta: "ami" },
      { id: 6, texto: "Eliminar malware y actualizar el antivirus", respuesta: "digital" },
      { id: 7, texto: "Explicar cómo un algoritmo sesga tu feed", respuesta: "ami" },
      { id: 8, texto: "Configurar autenticación en dos pasos (2FA)", respuesta: "digital" },
      { id: 9, texto: "Reconocer publicidad nativa en un portal", respuesta: "ami" },
      { id: 10, texto: "Contrastar una noticia con tres fuentes independientes", respuesta: "ami" },
    ],
    razonesKicker: "¿Por qué importa distinguirlas?",
    razonesTitle: "Tres razones clave",
    razones: [
      {
        titulo: "Diseño curricular",
        desc: "Equilibra pensamiento crítico (AMI) con habilidades técnicas (Digital).",
      },
      {
        titulo: "Políticas públicas",
        desc: "La brecha no es solo de acceso/uso; también de criterio y verificación.",
      },
      {
        titulo: "Ciudadanía",
        desc: "Reducir desinformación (integridad informativa) requiere AMI; reducir fraudes requiere Alfabetización Digital.",
      },
    ],
  },
  en: {
    metaTitle: "MLI vs Digital Literacy — Precisar",
    metaDescription:
      "How do Media and Information Literacy (MLI) and digital literacy differ? Comparative table, interactive exercise and three key reasons to understand Precisar's approach.",
    heroKicker: "Media Education · MLI",
    heroTitle: "How do MLI and\nDigital Literacy differ?",
    heroBajada:
      "MLI focuses on understanding, analyzing and critically using media and information. Digital Literacy prioritizes the technical skills to use tools and technological services safely and effectively.",
    amiColumn: {
      title: "MLI · Media and Information Literacy",
      sub: "Critical capacities regarding media, messages and sources.",
      items: [
        "Analyze how news is constructed and distinguish opinion from fact.",
        "Assess source credibility and detect native advertising.",
        "Verify with multiple sources and understand biases/algorithms.",
        "Rights: access, authorship, privacy, freedom of expression, fair use.",
      ],
      examplesLabel: "Practical examples",
      examples: [
        "Detect deepfakes in a campaign",
        "Identify clickbait headlines",
        "Verify authorship and date",
      ],
    },
    digitalColumn: {
      title: "Digital Literacy",
      sub: "Technical and operational skills with devices and apps.",
      items: [
        "Use email, video calls, spreadsheets, file managers.",
        "Configure security: passwords, 2FA, backups.",
        "Manage privacy and permissions on networks and mobile devices.",
        "Resolve basic software/hardware problems.",
      ],
      examplesLabel: "Practical examples",
      examples: ["Enable 2FA on your accounts", "Share a Drive with permissions", "Remove malware from a PC"],
    },
    tableKicker: "Comparative table",
    tableTitle: "Dimension by dimension",
    tableHeaders: {
      dimension: "Dimension",
      ami: "MLI",
      digital: "Digital Literacy",
    },
    tableRows: [
      {
        dimension: "Focus",
        ami: "Critical sense about messages, sources and contexts.",
        digital: "Efficient and safe use of technologies and services.",
      },
      {
        dimension: "Guiding questions",
        ami: "Who says it? With what evidence? What intention?",
        digital: "How do I do it? Which button? Which security setting?",
      },
      {
        dimension: "Competencies",
        ami: "Analyze, evaluate, verify, argue, informational rights.",
        digital: "Install, configure, operate, maintain, troubleshoot.",
      },
      {
        dimension: "Examples",
        ami: "Detect biases; verify an image; recognize disinformation (information integrity).",
        digital: "Create a video call; encrypt a disk; manage passwords.",
      },
      {
        dimension: "Desired outcome",
        ami: "Critical thinking and informed citizenship.",
        digital: "Technical autonomy and operational security.",
      },
    ],
    exerciseKicker: "Quick test",
    exerciseTitle: "Drag each example\nto its column",
    exerciseTip:
      "If in doubt, ask yourself: does the example ask you to think about information (MLI) or to use tools safely (Digital)?",
    poolEmpty: "All examples have been assigned ✓",
    dropAmiLabel: "MLI",
    dropDigitalLabel: "Digital Literacy",
    dropHint: "Drop here →",
    btnCheck: "Check",
    btnReset: "Reset",
    scoreTemplate: "{score} / {total} correct",
    ejercicios: [
      { id: 1, texto: "Use an image verification tool (OSINT)", respuesta: "ami" },
      { id: 2, texto: "Create a video call with calendar and link", respuesta: "digital" },
      { id: 3, texto: "Share a cloud document with correct permissions", respuesta: "digital" },
      { id: 4, texto: "Set up automatic backup", respuesta: "digital" },
      { id: 5, texto: "Cite correctly and respect copyright licenses", respuesta: "ami" },
      { id: 6, texto: "Remove malware and update antivirus", respuesta: "digital" },
      { id: 7, texto: "Explain how an algorithm biases your feed", respuesta: "ami" },
      { id: 8, texto: "Configure two-step authentication (2FA)", respuesta: "digital" },
      { id: 9, texto: "Recognize native advertising on a portal", respuesta: "ami" },
      { id: 10, texto: "Cross-check a news story with three independent sources", respuesta: "ami" },
    ],
    razonesKicker: "Why does it matter to distinguish them?",
    razonesTitle: "Three key reasons",
    razones: [
      {
        titulo: "Curriculum design",
        desc: "Balances critical thinking (MLI) with technical skills (Digital).",
      },
      {
        titulo: "Public policy",
        desc: "The gap is not only access/use; it is also judgment and verification.",
      },
      {
        titulo: "Citizenship",
        desc: "Reducing disinformation (information integrity) requires MLI; reducing fraud requires Digital Literacy.",
      },
    ],
  },
  pt: {
    metaTitle: "AMI vs Alfabetização Digital — Precisar",
    metaDescription:
      "Em que se diferenciam a Alfabetização Midiática e Informacional (AMI) e a alfabetização digital? Tabela comparativa, exercício interativo e três razões-chave para entender a abordagem da Precisar.",
    heroKicker: "Educação Midiática · AMI",
    heroTitle: "Em que se diferenciam\nAMI e Alfabetização Digital?",
    heroBajada:
      "A AMI centra-se em compreender, analisar e usar criticamente as mídias e a informação. A Alfabetização Digital prioriza as habilidades técnicas para usar ferramentas e serviços tecnológicos com segurança e eficácia.",
    amiColumn: {
      title: "AMI · Alfabetização Midiática e Informacional",
      sub: "Capacidades críticas sobre mídias, mensagens e fontes.",
      items: [
        "Analisar como se constrói uma notícia e distinguir opinião de fato.",
        "Avaliar a credibilidade de uma fonte e detectar publicidade nativa.",
        "Verificar com várias fontes e entender vieses/algoritmos.",
        "Direitos: acesso, autoria, privacidade, liberdade de expressão, uso justo.",
      ],
      examplesLabel: "Exemplos práticos",
      examples: [
        "Detectar deepfakes em campanha",
        "Identificar manchetes clickbait",
        "Comprovar autoria e data",
      ],
    },
    digitalColumn: {
      title: "Alfabetização Digital",
      sub: "Habilidades técnicas e operacionais com dispositivos e apps.",
      items: [
        "Usar e-mail, videoconferências, planilhas, gerenciadores de arquivos.",
        "Configurar segurança: senhas, 2FA, backups.",
        "Administrar privacidade e permissões em redes e celulares.",
        "Resolver problemas básicos de software/hardware.",
      ],
      examplesLabel: "Exemplos práticos",
      examples: ["Ativar 2FA nas suas contas", "Compartilhar um Drive com permissões", "Remover malware do PC"],
    },
    tableKicker: "Tabela comparativa",
    tableTitle: "Dimensão a dimensão",
    tableHeaders: {
      dimension: "Dimensão",
      ami: "AMI",
      digital: "Alfabetização Digital",
    },
    tableRows: [
      {
        dimension: "Foco",
        ami: "Senso crítico sobre mensagens, fontes e contextos.",
        digital: "Uso eficiente e seguro de tecnologias e serviços.",
      },
      {
        dimension: "Perguntas-guia",
        ami: "Quem diz? Com que evidência? Qual intenção?",
        digital: "Como faço? Qual botão? Qual ajuste de segurança?",
      },
      {
        dimension: "Competências",
        ami: "Analisar, avaliar, verificar, argumentar, direitos informacionais.",
        digital: "Instalar, configurar, operar, manter, solucionar problemas.",
      },
      {
        dimension: "Exemplos",
        ami: "Detectar vieses; verificar uma imagem; reconhecer desinformação (integridade informacional).",
        digital: "Criar uma videoconferência; cifrar um disco; gerenciar senhas.",
      },
      {
        dimension: "Resultado buscado",
        ami: "Pensamento crítico e cidadania informada.",
        digital: "Autonomia técnica e segurança operacional.",
      },
    ],
    exerciseKicker: "Teste rápido",
    exerciseTitle: "Arraste cada exemplo\npara sua coluna",
    exerciseTip:
      "Se tiver dúvida, pergunte-se: o exemplo pede pensar sobre a informação (AMI) ou usar ferramentas com segurança (Digital)?",
    poolEmpty: "Todos os exemplos foram atribuídos ✓",
    dropAmiLabel: "AMI",
    dropDigitalLabel: "Alfabetização Digital",
    dropHint: "Solte aqui →",
    btnCheck: "Verificar",
    btnReset: "Reiniciar",
    scoreTemplate: "{score} / {total} corretos",
    ejercicios: [
      { id: 1, texto: "Usar uma ferramenta de verificação de imagens (OSINT)", respuesta: "ami" },
      { id: 2, texto: "Criar uma videoconferência com agenda e link", respuesta: "digital" },
      { id: 3, texto: "Compartilhar um documento na nuvem com permissões corretas", respuesta: "digital" },
      { id: 4, texto: "Fazer um backup automático", respuesta: "digital" },
      { id: 5, texto: "Citar corretamente e respeitar licenças de autor", respuesta: "ami" },
      { id: 6, texto: "Eliminar malware e atualizar o antivírus", respuesta: "digital" },
      { id: 7, texto: "Explicar como um algoritmo enviesa seu feed", respuesta: "ami" },
      { id: 8, texto: "Configurar autenticação em dois passos (2FA)", respuesta: "digital" },
      { id: 9, texto: "Reconhecer publicidade nativa em um portal", respuesta: "ami" },
      { id: 10, texto: "Contrastar uma notícia com três fontes independentes", respuesta: "ami" },
    ],
    razonesKicker: "Por que importa distingui-las?",
    razonesTitle: "Três razões-chave",
    razones: [
      {
        titulo: "Desenho curricular",
        desc: "Equilibra pensamento crítico (AMI) com habilidades técnicas (Digital).",
      },
      {
        titulo: "Políticas públicas",
        desc: "A lacuna não é só de acesso/uso; também de critério e verificação.",
      },
      {
        titulo: "Cidadania",
        desc: "Reduzir desinformação (integridade informacional) requer AMI; reduzir fraudes requer Alfabetização Digital.",
      },
    ],
  },
};
