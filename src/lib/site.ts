export const SITE = {
  name: "Precisar",
  tagline: "Lo que circula, lo que importa, lo que hay que entender.",
  url: "https://www.precisar.net",
  contactEmail: "contacto@precisar.net",
  privacyEmail: "male@precisar.net",
} as const;

/**
 * Newsletter: asignar `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION` (Mailchimp, Brevo, etc.)
 * cuando el proveedor esté definido. Mientras sea null, el bloque en /participa no envía a terceros.
 */
export const NEWSLETTER = {
  formActionUrl: process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION ?? null,
} as const;

export const EXTERNAL = {
  botOnda: "https://onda2026.vercel.app/chat",
  consultaCiudadana: "https://encuesta-informacion.web.app/consulta-2026/",
  instagram: "https://www.instagram.com/_precisar/",
  youtube:
    "https://www.youtube.com/channel/UCQKEOqwm3pxIeO6E1Hsokhw/videos",
  whatsappShare: "https://api.whatsapp.com/send/?text=https://www.precisar.net",
} as const;

export type NavItem = { label: string; href: string };

export const NAV_PRIMARY: NavItem[] = [
  { label: "Somos", href: "/somos" },
  { label: "Programas", href: "/programas" },
  { label: "Saberes", href: "/saberes" },
  { label: "Precisando", href: "/precisando" },
  { label: "Participa", href: "/participa" },
  { label: "Agenda", href: "/agenda" },
];

export const NAV_SECONDARY: NavItem[] = [
  { label: "Hub Digital Consciente", href: "/programas/hub-digital-consciente" },
  { label: "Ciudades", href: "/programas/ciudades" },
  { label: "Aprender Digital", href: "/programas/aprender-digital" },
  { label: "Docentes", href: "/programas/docentes" },
  { label: "Aquí No Pasa", href: "/aqui-no-pasa" },
];

export const FOOTER_COLUMNS: { title: string; links: NavItem[] }[] = [
  {
    title: "Organización",
    links: [
      { label: "Somos Precisar", href: "/somos" },
      { label: "Participa / consulta", href: "/participa" },
      { label: "Bot ONDA", href: EXTERNAL.botOnda },
    ],
  },
  {
    title: "Programas e iniciativas",
    links: [
      { label: "Hub Digital Consciente", href: "/programas/hub-digital-consciente" },
      { label: "Ciudades conectadas", href: "/programas/ciudades" },
      { label: "Aprender Digital: Nunca es Tarde", href: "/programas/aprender-digital" },
      { label: "Educación mediática para docentes", href: "/programas/docentes" },
      {
        label: "Curso Leer Noticias (era digital)",
        href: "/programas/leer-noticias-era-digital",
      },
      { label: "Funcionarios públicos", href: "/programas/funcionarios-publicos" },
      { label: "Aquí No Pasa (curso)", href: "/aqui-no-pasa" },
    ],
  },
  {
    title: "Contenido",
    links: [
      { label: "Saberes / recursos", href: "/saberes" },
      { label: "Precisando", href: "/precisando" },
      { label: "Una pregunta al día", href: "/unapreguntaaldia" },
      { label: "Sentidos digitales", href: "/experiencias/sentidos-digitales" },
      { label: "Cultura digital", href: "/culturadigital" },
      { label: "Educación mediática (1 min)", href: "/educaciónmediática" },
      { label: "AMI vs. alfabetización digital", href: "/ami-vs-alfabetización-digital" },
    ],
  },
  {
    title: "Educación mediática ampliada",
    links: [
      { label: "Comunicación", href: "/marco/comunicacion" },
      { label: "Educación", href: "/marco/educacion" },
      { label: "Tecnología", href: "/marco/tecnologia" },
      { label: "Cultura", href: "/marco/cultura" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad consulta 2026", href: "/legal/privacidad-consulta-2026" },
      { label: "Privacidad Bot ONDA", href: "/legal/privacidad-bot-onda" },
    ],
  },
];

export const PDFS = {
  homeSaberes1:
    "https://www.precisar.net/_files/ugd/4c5e66_7b7d218709ff4052b58d9d9416715150.pdf",
  homeSaberes2:
    "https://www.precisar.net/_files/ugd/4c5e66_8b66a79c4ffd440e90dbd2d0474158a8.pdf",
  homeSaberes3:
    "https://www.precisar.net/_files/ugd/4c5e66_7ad4be65e84e4b7486b03de2cf0107ec.pdf",
  homeSaberes4:
    "https://www.precisar.net/_files/ugd/4c5e66_5cb6a7e00abd433b99f65d043f612653.pdf",
  ciudadesAmiUnesco:
    "https://www.precisar.net/_files/ugd/4c5e66_5c07eaf63a3a475b9b27c753d8da1c24.pdf",
  hubDesinformacion:
    "https://www.precisar.net/_files/ugd/4c5e66_537f933926e8489797b79c08a731362e.pdf",
  hubIaAlgoritmos:
    "https://www.precisar.net/_files/ugd/4c5e66_eca907526677459d9884ce83ed878df3.pdf",
  saberesIaAula1:
    "https://www.precisar.net/_files/ugd/4c5e66_ecfcd551d56e41fcaea57e21d5b9e20b.pdf",
  saberesIaAula2:
    "https://www.precisar.net/_files/ugd/4c5e66_7b7d218709ff4052b58d9d9416715150.pdf",
  saberes30Preguntas:
    "https://www.precisar.net/_files/ugd/4c5e66_7bbe4f8327d74d98a0851a9ea8af8ff6.pdf",
  saberesGuiaIa:
    "https://www.precisar.net/_files/ugd/4c5e66_601b191ddea74e71a326aa173fe28ab7.pdf",
  saberesUsoConscienteIa:
    "https://www.precisar.net/_files/ugd/4c5e66_7ad4be65e84e4b7486b03de2cf0107ec.pdf",
  saberesEducadores12:
    "https://www.precisar.net/_files/ugd/4c5e66_8b66a79c4ffd440e90dbd2d0474158a8.pdf",
  saberesVerificarImagenes:
    "https://www.precisar.net/_files/ugd/4c5e66_ae46236e41c2478dabe94a13e27c5fa6.pdf",
} as const;
