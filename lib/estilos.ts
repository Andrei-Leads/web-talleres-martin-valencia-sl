/** Clases compartidas entre secciones y páginas. */

/** Padding vertical de sección: clamp(48px, 7vw, 96px). */
export const seccion = "py-[clamp(48px,7vw,96px)]";

/** Línea de plano entre secciones. */
export const seccionBorde = "border-t border-linea";

/** Clases de la nav de migas (ver components/Migas.tsx). */
export const migas = {
  nav: "text-[15px] text-tinta-suave",
  lista: "m-0 flex list-none flex-wrap items-center p-0",
  item: "flex items-center",
  enlace: "inline-flex min-h-11 items-center text-tinta underline underline-offset-4 hover:decoration-2",
  actual: "inline-flex min-h-11 items-center text-tinta-suave",
} as const;
