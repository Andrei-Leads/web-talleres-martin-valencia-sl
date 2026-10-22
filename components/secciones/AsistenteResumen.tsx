import { BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle, Ruler } from "lucide-react";

import { Cota } from "@/components/Cota";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Fila = {
  clave: string;
  valor: string;
  /** Texto solo para lector de pantalla tras «Cambiar» (p. ej. « unidades»). */
  lector: string;
  /** `undefined` = sin botón «Cambiar» (servicio fijo). */
  onCambiar?: () => void;
};

type Props = {
  filas: Fila[];
  numero: string;
  mensaje: string;
  activo: boolean;
  tituloRef: (el: HTMLHeadingElement | null) => void;
};

/**
 * Vista final del asistente: «Revisa y envía». Como el resto de vistas, si no está activa
 * sigue en el DOM (invisible, inerte) con los valores más largos, para reservar su altura.
 */
export function AsistenteResumen({ filas, numero, mensaje, activo, tituloRef }: Props) {
  return (
    <div
      inert={!activo}
      className={cn("col-start-1 row-start-1 flex min-w-0 flex-col gap-3", !activo && "invisible")}
    >
      <h3 ref={tituloRef} tabIndex={-1} className="m-0 text-[17px] leading-[1.3] font-semibold">
        Revisa y envía
      </h3>
      <dl className="m-0 flex flex-col border-t border-linea">
        {filas.map((fila) => (
          <div
            key={fila.clave}
            className="grid min-h-[46px] grid-cols-[76px_minmax(0,1fr)] items-center gap-2 border-b border-linea"
          >
            <dt className="text-[13px] font-medium tracking-[0.06em] text-tinta-suave uppercase">{fila.clave}</dt>
            <dd className="m-0 flex min-w-0 items-center justify-between gap-2">
              <span className="min-w-0 font-semibold tabular-nums">{fila.valor}</span>
              {fila.onCambiar && (
                <button
                  type="button"
                  onClick={fila.onCambiar}
                  className={cn(buttonVariants({ variant: "textoAtras" }), "flex-none text-sm")}
                >
                  Cambiar<span className="sr-only">{fila.lector}</span>
                </button>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <BotonWhatsApp
        numero={numero}
        mensaje={mensaje}
        className={buttonVariants({ variant: "whatsappAsistente" })}
      >
        <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
        <span>Pedir presupuesto por WhatsApp</span>
      </BotonWhatsApp>
      {/* Consejo destacado: es lo que más ahorra al taller. */}
      <div className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-3 rounded-tarjeta bg-primario-tinte p-3">
        <span className="grid size-11 place-items-center rounded-tarjeta border border-tinta-suave bg-tarjeta text-tinta">
          <Ruler aria-hidden="true" strokeWidth={1.5} className="size-6" />
        </span>
        <div className="flex min-w-0 flex-col gap-2">
          <p className="m-0 text-[15px] leading-[1.35] font-semibold">
            Envíanos una foto del hueco con un metro al lado
          </p>
          <Cota etiqueta="ancho" className="max-w-[220px]" />
        </div>
      </div>
    </div>
  );
}
