import type { KeyboardEvent } from "react";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  pregunta: string;
  opciones: string[];
  /** Opción ya elegida (marcada con aria-checked). */
  valor?: string;
  activo: boolean;
  onElegir: (valor: string) => void;
  /** Ref de la `legend`: recibe el foco al llegar a este paso. */
  legendRef: (el: HTMLLegendElement | null) => void;
};

const TECLAS = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];

/** Las flechas mueven el foco entre chips (no eligen: elegir cambia de paso). Enter/Espacio = clic nativo. */
function alTeclear(e: KeyboardEvent<HTMLDivElement>) {
  if (!TECLAS.includes(e.key)) return;
  const chips = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]'));
  if (chips.length === 0) return;
  const actual = chips.indexOf(e.target as HTMLButtonElement);
  let siguiente = actual;
  if (e.key === "Home") siguiente = 0;
  else if (e.key === "End") siguiente = chips.length - 1;
  else if (e.key === "ArrowRight" || e.key === "ArrowDown") siguiente = (actual + 1) % chips.length;
  else siguiente = (actual - 1 + chips.length) % chips.length;
  e.preventDefault();
  chips[siguiente]?.focus();
}

/**
 * Un paso del asistente: fieldset + legend (la pregunta) + radiogroup de chips.
 * Si no está activo se queda en el DOM pero invisible e inerte: así la rejilla del asistente
 * reserva la altura del paso más alto sin medir nada (ver Asistente.tsx).
 */
export function AsistentePregunta({ pregunta, opciones, valor, activo, onElegir, legendRef }: Props) {
  // Roving tabindex: Tab entra en el chip elegido (o en el primero) y sale del grupo.
  const tabulable = valor && opciones.includes(valor) ? valor : opciones[0];
  return (
    <fieldset
      inert={!activo}
      className={cn("col-start-1 row-start-1 m-0 min-w-0 border-0 p-0", !activo && "invisible")}
    >
      <legend ref={legendRef} tabIndex={-1} className="mb-2 p-0 text-[17px] leading-[1.3] font-semibold">
        {pregunta}
      </legend>
      <div role="radiogroup" aria-label={pregunta} onKeyDown={alTeclear} className="flex flex-wrap gap-2">
        {opciones.map((opcion, i) => {
          const elegido = opcion === valor;
          return (
            <button
              key={`${i}-${opcion}`}
              type="button"
              role="radio"
              aria-checked={elegido}
              tabIndex={opcion === tabulable ? 0 : -1}
              onClick={() => onElegir(opcion)}
              className={cn(buttonVariants({ variant: "chipOpcion" }), "text-left")}
            >
              {elegido && <Check aria-hidden="true" strokeWidth={1.5} className="size-[18px] flex-none" />}
              {opcion}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
