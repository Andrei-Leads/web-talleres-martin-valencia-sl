import Image from "next/image";
import type { ReactNode } from "react";
import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  imagen: Imagen;
  proporcion: "5/2" | "16/9" | "4/3" | "4/5" | "1/1";
  /** Atributo `sizes` de next/image (ancho real de la foto según el breakpoint). */
  sizes: string;
  priority?: boolean;
  /** Marco de 1 px: `linea` (tarjetas), `tinta` (hero de escritorio) o `ninguno`. */
  marco?: "linea" | "tinta" | "ninguno";
  /** Foto dentro de un enlace con texto propio: `alt=""` y etiqueta más pequeña. */
  decorativa?: boolean;
  className?: string;
  /** Etiquetas extra (p. ej. «Antes»), colocadas por el llamador. */
  children?: ReactNode;
};

const PROPORCION = {
  "5/2": "aspect-[5/2]",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
} as const;

const MARCO = {
  linea: "border border-linea",
  tinta: "border border-tinta-suave",
  ninguno: "",
} as const;

/** Etiqueta «Foto de ejemplo»: abajo a la izquierda, con cuadradito de plano. Decorativa (aria-hidden). */
function FotoEjemplo({ pequena }: { pequena?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute flex items-center rounded-etiqueta bg-etiqueta-ejemplo font-medium text-white",
        pequena
          ? "bottom-1 left-1 gap-1.5 px-1.5 py-0.5 text-[11px] leading-[1.4]"
          : "bottom-2 left-2 gap-1.5 px-2 py-[3px] text-xs leading-[1.4]"
      )}
    >
      <span className="size-1.5 flex-none border border-white" />
      Foto de ejemplo
    </span>
  );
}

/** Foto con next/image. Si es de ejemplo (`/ejemplo/…`) lleva la etiqueta «Foto de ejemplo». */
export function Foto({
  imagen,
  proporcion,
  sizes,
  priority,
  marco = "linea",
  decorativa,
  className,
  children,
}: Props) {
  const deEjemplo = imagen.src.startsWith("/ejemplo/");
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gris-claro",
        PROPORCION[proporcion],
        MARCO[marco],
        className
      )}
    >
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {deEjemplo && <FotoEjemplo pequena={decorativa} />}
      {children}
    </div>
  );
}
