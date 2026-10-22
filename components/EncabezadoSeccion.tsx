import type { ReactNode } from "react";

import { Cota } from "@/components/Cota";
import { cn } from "@/lib/utils";

type Props = {
  /** Etiqueta de la cota decorativa («catálogo», «proceso»…). Texto fijo, no datos. */
  cota: string;
  titulo: string;
  nivel?: "h1" | "h2";
  id?: string;
  entradilla?: string;
  /** Enlace «Ver todos…» u otra acción: a la derecha en escritorio. */
  accion?: ReactNode;
  className?: string;
};

/** Cota encima + título (h2: 26→40 px · h1: 28→50 px) + entradilla y acción opcionales. */
export function EncabezadoSeccion({
  cota,
  titulo,
  nivel = "h2",
  id,
  entradilla,
  accion,
  className,
}: Props) {
  const Titulo = nivel;
  return (
    <div
      className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8", className)}
    >
      <div className="flex min-w-0 flex-col gap-4">
        <Cota etiqueta={cota} className="max-w-[560px]" />
        <Titulo
          id={id}
          className={cn(
            "m-0 leading-[1.1] font-bold tracking-[-0.02em] text-balance",
            nivel === "h1"
              ? "text-[clamp(1.75rem,1.09rem+2.8vw,3.125rem)]"
              : "text-[clamp(1.625rem,1.2rem+1.78vw,2.5rem)]"
          )}
        >
          {titulo}
        </Titulo>
        {entradilla && (
          <p className="m-0 max-w-[60ch] text-[17px] text-tinta-suave md:text-lg">{entradilla}</p>
        )}
      </div>
      {accion && <div className="flex-none">{accion}</div>}
    </div>
  );
}
