/** Centroides aproximados para visualización (no cartografía exacta). */
export type CountryMeta = {
  iso: string;
  country: string;
  lat: number;
  lng: number;
};

export const LATAM_COUNTRIES: CountryMeta[] = [
  { iso: "MX", country: "México", lat: 23.5, lng: -102 },
  { iso: "GT", country: "Guatemala", lat: 15.5, lng: -90.25 },
  { iso: "BZ", country: "Belice", lat: 17.2, lng: -88.5 },
  { iso: "SV", country: "El Salvador", lat: 13.8, lng: -88.9 },
  { iso: "HN", country: "Honduras", lat: 14.6, lng: -86.24 },
  { iso: "NI", country: "Nicaragua", lat: 12.9, lng: -85.2 },
  { iso: "CR", country: "Costa Rica", lat: 9.75, lng: -83.75 },
  { iso: "PA", country: "Panamá", lat: 8.55, lng: -80.1 },
  { iso: "CU", country: "Cuba", lat: 21.5, lng: -79.5 },
  { iso: "JM", country: "Jamaica", lat: 18.1, lng: -77.3 },
  { iso: "HT", country: "Haití", lat: 18.97, lng: -72.29 },
  { iso: "DO", country: "Rep. Dominicana", lat: 18.74, lng: -70.16 },
  { iso: "PR", country: "Puerto Rico", lat: 18.22, lng: -66.59 },
  { iso: "TT", country: "Trinidad y Tobago", lat: 10.65, lng: -61.52 },
  { iso: "CO", country: "Colombia", lat: 4.57, lng: -74.3 },
  { iso: "VE", country: "Venezuela", lat: 6.42, lng: -66.59 },
  { iso: "GY", country: "Guyana", lat: 4.86, lng: -58.93 },
  { iso: "SR", country: "Surinam", lat: 3.92, lng: -56.03 },
  { iso: "EC", country: "Ecuador", lat: -1.83, lng: -78.18 },
  { iso: "PE", country: "Perú", lat: -9.19, lng: -75.02 },
  { iso: "BR", country: "Brasil", lat: -14.24, lng: -51.93 },
  { iso: "BO", country: "Bolivia", lat: -16.29, lng: -63.59 },
  { iso: "PY", country: "Paraguay", lat: -23.44, lng: -58.44 },
  { iso: "UY", country: "Uruguay", lat: -32.52, lng: -55.77 },
  { iso: "AR", country: "Argentina", lat: -38.42, lng: -63.62 },
  { iso: "CL", country: "Chile", lat: -35.68, lng: -71.54 },
];

export const countryByIso = new Map(LATAM_COUNTRIES.map((c) => [c.iso, c]));
