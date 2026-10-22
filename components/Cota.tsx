import { cn } from "@/lib/utils";

type Props = {
  /** Texto fijo de interfaz («a medida», «catálogo»…). Nunca datos del negocio. */
  etiqueta?: string;
  orientacion?: "horizontal" | "vertical";
  className?: string;
};

/** Flecha de 8×8 px que apunta hacia `hacia`. Hereda el color (text-cota). */
function Flecha({ hacia }: { hacia: "izquierda" | "derecha" | "arriba" | "abajo" }) {
  const d = {
    izquierda: "M8 0 0 4l8 4z",
    derecha: "M0 0l8 4-8 4z",
    arriba: "M0 8 4 0l4 8z",
    abajo: "M0 0h8L4 8z",
  }[hacia];
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" className="flex-none" focusable="false">
      <path d={d} fill="currentColor" />
    </svg>
  );
}

const etiquetaClases = "text-xs leading-[1.3] font-medium tracking-[0.14em] whitespace-nowrap text-tinta-suave uppercase";

/**
 * Cota de plano (adorno): remates 1×16, flechas 8×8, línea de 1 px en `cota`
 * y etiqueta opcional. Siempre aria-hidden; nunca sobre foto ni texto.
 */
export function Cota({ etiqueta, orientacion = "horizontal", className }: Props) {
  if (orientacion === "vertical") {
    return (
      <div
        aria-hidden="true"
        className={cn("flex h-full min-h-24 w-6 flex-col items-center text-cota", className)}
      >
        <span className="h-px w-4 flex-none bg-current" />
        <Flecha hacia="arriba" />
        <span className="w-px flex-1 bg-current" />
        {etiqueta && (
          <span className={cn(etiquetaClases, "py-2 [writing-mode:vertical-rl]")}>{etiqueta}</span>
        )}
        {etiqueta && <span className="w-px flex-1 bg-current" />}
        <Flecha hacia="abajo" />
        <span className="h-px w-4 flex-none bg-current" />
      </div>
    );
  }
  return (
    <div aria-hidden="true" className={cn("flex w-full items-center text-cota", className)}>
      <span className="h-4 w-px flex-none bg-current" />
      <Flecha hacia="izquierda" />
      <span className="h-px flex-1 bg-current" />
      {etiqueta && <span className={cn(etiquetaClases, "px-3")}>{etiqueta}</span>}
      {etiqueta && <span className="h-px flex-1 bg-current" />}
      <Flecha hacia="derecha" />
      <span className="h-4 w-px flex-none bg-current" />
    </div>
  );
}
