import type { Imagen, SiteConfig } from "@andrei-leads/core";

import { Cota } from "@/components/Cota";
import { Foto } from "@/components/Foto";
import { estrellas, mediaVisible } from "@/lib/formato";
import { cn } from "@/lib/utils";
import { BloqueAsistente } from "./BloqueAsistente";

type Props = {
  sector: string;
  descripcionCorta: string;
  ciudad: string;
  valoracion?: SiteConfig["valoracion"];
  /** imagenesHero[0] ?? trabajos[0]?.imagenes[0] (lo calcula la página). */
  imagen?: Imagen;
  /** Títulos de los servicios, para el asistente. */
  servicios: string[];
  contacto: SiteConfig["contacto"];
};

/** Cuadrícula de plano (decorativa) del hero sin foto: 32 px, líneas de 1 px. */
const CUADRICULA = {
  backgroundImage:
    "linear-gradient(#e2e7eb 1px, transparent 1px), linear-gradient(90deg, #e2e7eb 1px, transparent 1px)",
  backgroundSize: "32px 32px",
} as const;

/**
 * Hero del inicio (el único <h1> de la página).
 * Móvil con foto: foto 5:2 sin texto encima → h1 → descripción → estrellas → asistente.
 *   A 375×667 la primera fila de chips del paso 1 queda por encima de la barra móvil: por eso 5:2
 *   y los espacios ajustados (ver cálculo en el informe de la fase C1).
 * Escritorio con foto: texto + asistente (7/12) | foto 4:5 con marco y cotas FUERA de la foto (5/12).
 * Sin foto: fondo gris claro con cuadrícula; texto a la izquierda y asistente a la derecha (lg).
 */
export function Hero({ sector, descripcionCorta, ciudad, valoracion, imagen, servicios, contacto }: Props) {
  const conWhatsApp = Boolean(contacto.whatsapp);

  return (
    <section
      style={imagen ? undefined : CUADRICULA}
      className={cn(
        "border-b border-linea pb-7",
        imagen ? "lg:pt-12 lg:pb-[72px]" : "bg-gris-claro lg:pt-16 lg:pb-20"
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 items-start gap-y-4 lg:contenedor lg:gap-x-[clamp(32px,5vw,72px)] lg:gap-y-7",
          imagen ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        )}
      >
        {imagen && (
          <div className="flex min-w-0 flex-col gap-2.5 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="hidden lg:block lg:pr-[34px]">
              <Cota etiqueta="a medida" />
            </div>
            <div className="flex items-start gap-2.5">
              <Foto
                imagen={imagen}
                proporcion="5/2"
                marco="ninguno"
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="min-w-0 flex-1 lg:aspect-[4/5] lg:border lg:border-tinta-suave"
              />
              <Cota orientacion="vertical" etiqueta="tu hueco" className="hidden self-stretch lg:flex" />
            </div>
          </div>
        )}

        <div
          className={cn(
            "flex min-w-0 flex-col gap-[clamp(6px,1.1vw,16px)] px-5 lg:px-0",
            imagen ? "pt-3 lg:col-start-1 lg:row-start-1 lg:pt-0" : "pt-6 lg:col-start-1 lg:row-start-1 lg:pt-10"
          )}
        >
          <h1 className="m-0 text-[clamp(28px,3.9vw,50px)] leading-[1.1] font-bold tracking-[-0.02em] text-balance">
            {sector} en {ciudad}
          </h1>
          <p className="m-0 max-w-[50ch] text-[clamp(16px,1.45vw,19px)] leading-[1.4] text-tinta-suave text-pretty">
            {descripcionCorta}
          </p>
          {valoracion && (
            <p className="m-0 flex flex-wrap items-center gap-2 text-[15px] leading-[1.4] tabular-nums">
              <span aria-hidden="true">{estrellas(valoracion.media)}</span>
              <span>
                <strong>{mediaVisible(valoracion.media)}</strong>
                <span className="sr-only"> sobre 5</span> · {valoracion.total} reseñas en Google
              </span>
            </p>
          )}
        </div>

        <div
          className={cn(
            "flex min-w-0 flex-col gap-3 px-5 lg:px-0",
            imagen ? "lg:col-start-1 lg:row-start-2" : "lg:col-start-2 lg:row-start-1"
          )}
        >
          {/* Sin foto: cotas de plano decorativas alrededor del asistente (siempre fuera de la caja). */}
          {!imagen && conWhatsApp && (
            <div className="lg:pr-[34px]">
              <Cota etiqueta="tu hueco" />
            </div>
          )}
          <div className="flex items-start gap-2.5">
            <BloqueAsistente servicios={servicios} contacto={contacto} respaldo className="min-w-0 flex-1" />
            {!imagen && <Cota orientacion="vertical" etiqueta="a medida" className="hidden self-stretch lg:flex" />}
          </div>
        </div>
      </div>
    </section>
  );
}
