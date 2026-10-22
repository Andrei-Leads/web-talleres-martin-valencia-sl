import type { Resena, SiteConfig } from "@andrei-leads/core";
import { ExternalLink } from "lucide-react";

import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { ResenaTexto } from "@/components/secciones/ResenaTexto";
import { buttonVariants } from "@/components/ui/button";
import { estrellas, fechaLegible, mediaVisible } from "@/lib/formato";
import { seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  resenas: Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** Cuántas reseñas se muestran (las más recientes). */
  max?: number;
};

/** Las más recientes por fecha (AAAA-MM[-DD], comparación de cadenas); sin fecha, detrás y en el orden de los datos. */
function masRecientes(resenas: Resena[], max: number): Resena[] {
  const conFecha = resenas
    .filter((r) => r.fecha)
    .sort((a, b) => (a.fecha as string) < (b.fecha as string) ? 1 : (a.fecha as string) > (b.fecha as string) ? -1 : 0);
  const sinFecha = resenas.filter((r) => !r.fecha);
  return [...conFecha, ...sinFecha].slice(0, max);
}

/** Resumen de Google + reseñas. Móvil: scroll horizontal con la siguiente asomada; escritorio: 3 columnas. */
export function Resenas({ resenas, valoracion, fichaGoogle, max = 3 }: Props) {
  if (resenas.length === 0) return null;
  const visibles = masRecientes(resenas, max);

  return (
    <section aria-labelledby="resenas-titulo" className={seccion}>
      <div className="contenedor flex flex-col gap-[clamp(20px,2.4vw,32px)]">
        <EncabezadoSeccion
          cota="opiniones"
          titulo="Lo que dicen nuestros clientes"
          id="resenas-titulo"
          accion={
            valoracion && (
              <p className="m-0 flex items-center gap-3 tabular-nums">
                <span className="text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-none font-bold tracking-[-0.02em]">
                  {mediaVisible(valoracion.media)}
                </span>
                <span className="flex flex-col gap-0.5 text-sm text-tinta-suave">
                  <span aria-hidden="true" className="text-lg leading-none tracking-[2px] text-tinta">
                    {estrellas(valoracion.media)}
                  </span>
                  <span className="sr-only">Valoración media: {mediaVisible(valoracion.media)} de 5. </span>
                  <span>{valoracion.total} reseñas en Google</span>
                </span>
              </p>
            )
          }
        />

        {/* Lista desplazable: enfocable con teclado (flechas) y con nombre. */}
        <div
          role="region"
          aria-labelledby="resenas-titulo"
          tabIndex={0}
          className="relative -mx-5 snap-x snap-mandatory overflow-x-auto px-5 pb-1 [scroll-padding-inline:20px] md:mx-0 md:snap-none md:overflow-visible md:px-0"
        >
          <ul className="m-0 flex list-none gap-3 p-0 md:grid md:grid-cols-3 md:gap-4">
            {visibles.map((r, i) => (
              <li
                key={`${r.autor}-${i}`}
                className="flex basis-[84%] shrink-0 snap-start md:basis-auto md:shrink"
              >
                <article className="flex w-full flex-col gap-3 rounded-tarjeta border border-linea bg-tarjeta p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="m-0 text-lg leading-none tracking-[2px]">
                      <span aria-hidden="true">{estrellas(r.puntuacion)}</span>
                      <span className="sr-only">{r.puntuacion} de 5</span>
                    </p>
                    {r.fecha && <span className="text-[13px] text-tinta-suave">{fechaLegible(r.fecha)}</span>}
                  </div>
                  <ResenaTexto texto={r.texto} />
                  <p className="m-0 mt-auto border-t border-linea pt-3 text-sm font-semibold">{r.autor}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>

        {fichaGoogle && (
          <a
            href={fichaGoogle}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "enlaceFlecha" }), "self-start")}
          >
            Ver todas en Google
            <ExternalLink aria-hidden="true" strokeWidth={1.5} className="size-4" />
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        )}
      </div>
    </section>
  );
}
