import { Check } from "lucide-react";

import { Cota } from "@/components/Cota";
import { seccion, seccionBorde } from "@/lib/estilos";
import { anioActual } from "@/lib/anio";

type Props = {
  garantias: string[];
  anioFundacion?: number;
};

const h2 =
  "m-0 text-[clamp(1.625rem,1.2rem+1.78vw,2.5rem)] leading-[1.1] font-bold tracking-[-0.02em] text-balance";

/** «Lo que te ofrecemos» (garantías) + años de oficio. Sin ninguna de las dos cosas, no sale. */
export async function Garantias({ garantias, anioFundacion }: Props) {
  const anios = anioFundacion ? (await anioActual()) - anioFundacion : 0;
  const conAnios = anioFundacion !== undefined && anios > 0;
  if (garantias.length === 0 && !conAnios) return null;

  const bloqueAnios = conAnios && (
    <div className="flex max-w-[280px] flex-col gap-2">
      <span className="text-[clamp(3.5rem,2.4rem+4.5vw,6rem)] leading-[0.9] font-bold tracking-[-0.04em] tabular-nums">
        {anios}
      </span>
      <Cota etiqueta={`desde ${anioFundacion}`} />
      {garantias.length > 0 ? (
        <span className="text-[17px] font-semibold">{anios} años fabricando e instalando</span>
      ) : (
        <h2 className="m-0 text-[17px] font-semibold">{anios} años fabricando e instalando</h2>
      )}
    </div>
  );

  return (
    <section className={`${seccion} ${seccionBorde} bg-gris-claro`}>
      <div
        className={
          garantias.length > 0 && conAnios
            ? "contenedor grid gap-[clamp(24px,4vw,64px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
            : "contenedor grid gap-[clamp(24px,4vw,64px)]"
        }
      >
        <div className="flex flex-col gap-4">
          {garantias.length > 0 && <h2 className={h2}>Lo que te ofrecemos</h2>}
          {bloqueAnios}
        </div>
        {garantias.length > 0 && (
          <ul className="m-0 flex list-none flex-col border-t border-tinta-suave p-0">
            {garantias.map((g, i) => (
              <li
                key={`${g}-${i}`}
                className="flex min-h-14 items-center gap-3.5 border-b border-linea py-2 text-[17px] font-medium"
              >
                <span
                  aria-hidden="true"
                  className="grid size-7 flex-none place-items-center rounded-etiqueta bg-primario text-sobre-primario"
                >
                  <Check strokeWidth={1.5} className="size-5" />
                </span>
                {g}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
