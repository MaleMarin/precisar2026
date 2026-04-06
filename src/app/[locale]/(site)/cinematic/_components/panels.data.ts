export const CINEMATIC_BRAND = "Atelier";

export type CinematicPanel = {
  kicker: string;
  title: string;
  body: string;
};

export const CINEMATIC_PANELS: readonly CinematicPanel[] = [
  {
    kicker: "Capítulo I",
    title: "Lorem ipsum",
    body:
      "Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    kicker: "Capítulo II",
    title: "Ut enim ad minim",
    body:
      "Veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute.",
  },
  {
    kicker: "Capítulo III",
    title: "Irure dolor",
    body:
      "In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.",
  },
  {
    kicker: "Capítulo IV",
    title: "Cupidatat non proident",
    body:
      "Sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis iste natus.",
  },
] as const;
