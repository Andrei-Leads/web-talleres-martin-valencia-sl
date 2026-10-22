import type { ReactNode } from "react";

/**
 * Columna de lectura de 68ch para los textos de core (no se puede tocar core).
 * El <article> de core ya trae px-6 y mx-auto max-w-3xl: el wrapper lo estrecha
 * a 68ch de texto + su padding, y los selectores de descendiente ajustan
 * tamaños: cuerpo 17px/1.65, h1 700, h2 de 20px con línea superior.
 */
export function LecturaLegal({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[calc(68ch+3rem)] text-[17px] [&_article]:py-8 [&_article]:leading-[1.65] md:[&_article]:py-12 [&_h1]:font-bold [&_h1]:tracking-[-0.02em] [&_h1]:text-balance [&_h2]:mt-6 [&_h2]:border-t [&_h2]:border-linea [&_h2]:pt-5 [&_h2]:text-xl [&_h2]:font-semibold">
      {children}
    </div>
  );
}
