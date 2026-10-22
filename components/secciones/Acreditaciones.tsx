import type { Acreditacion } from "@andrei-leads/core";
import { Stamp } from "lucide-react";

import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { seccion, seccionBorde } from "@/lib/estilos";

type Props = {
  acreditaciones: Acreditacion[];
};

/** Acreditaciones reales: tarjetas con sello de línea. Sin datos, nada. */
export function Acreditaciones({ acreditaciones }: Props) {
  if (acreditaciones.length === 0) return null;
  return (
    <section className={`${seccion} ${seccionBorde}`}>
      <div className="contenedor flex flex-col gap-[clamp(20px,2.4vw,32px)]">
        <EncabezadoSeccion cota="acreditaciones" titulo="Acreditaciones" />
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3 p-0">
          {acreditaciones.map((a, i) => (
            <li
              key={`${a.nombre}-${i}`}
              className="flex min-h-[72px] items-center gap-3.5 rounded-tarjeta border border-linea bg-tarjeta px-[18px] py-3.5"
            >
              <span
                aria-hidden="true"
                className="grid size-11 flex-none place-items-center rounded-tarjeta border border-tinta-suave bg-tarjeta"
              >
                <Stamp strokeWidth={1.5} className="size-6" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-base leading-[1.35] font-semibold text-pretty">{a.nombre}</span>
                {a.numero && (
                  <span className="text-sm text-tinta-suave tabular-nums">n.º {a.numero}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
