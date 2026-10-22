import type { SiteConfig } from "@andrei-leads/core";

import { Cota } from "@/components/Cota";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { seccion, seccionBorde } from "@/lib/estilos";

type Props = {
  proceso: SiteConfig["proceso"];
};

/** Pasos por defecto (sin plazos: los plazos solo pueden venir de los datos). */
const POR_DEFECTO: SiteConfig["proceso"] = [
  { titulo: "Medición", texto: "Vamos a tu casa, medimos los huecos y vemos qué hace falta." },
  { titulo: "Presupuesto", texto: "Te damos el precio final por escrito después de medir." },
  { titulo: "Fabricación", texto: "Fabricamos las piezas a la medida exacta de tus huecos." },
  { titulo: "Instalación", texto: "Quitamos lo viejo y colocamos lo nuevo, nivelado y sellado." },
  { titulo: "Limpieza", texto: "Lo dejamos todo limpio y nos llevamos los restos de la obra." },
  { titulo: "Garantía", texto: "Revisamos que todo cierre bien y te explicamos qué cubre la garantía." },
];

/** «Cómo trabajamos»: hasta 6 pasos unidos por una cota (vertical en móvil, horizontal en escritorio). */
export function Proceso({ proceso }: Props) {
  const pasos = (proceso.length > 0 ? proceso : POR_DEFECTO).slice(0, 6);
  return (
    <section className={`${seccion} ${seccionBorde}`}>
      <div className="contenedor flex flex-col gap-[clamp(20px,2.4vw,32px)]">
        <EncabezadoSeccion cota="proceso" titulo="Cómo trabajamos" />
        <ol
          style={{ "--n": pasos.length } as React.CSSProperties}
          className="m-0 flex list-none flex-col p-0 lg:grid lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
        >
          {pasos.map((p, i) => {
            const ultimo = i === pasos.length - 1;
            return (
              <li
                key={`${p.titulo}-${i}`}
                className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 lg:grid-cols-1 lg:gap-3.5 lg:pr-4"
              >
                {/* Cuadro numerado + cota hacia el siguiente paso */}
                <div className="flex flex-col items-center lg:flex-row lg:gap-1.5">
                  <span className="grid size-11 flex-none place-items-center border border-tinta bg-tarjeta text-[15px] font-semibold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {!ultimo && (
                    <>
                      <Cota orientacion="vertical" className="my-1 min-h-8 flex-1 lg:hidden" />
                      <Cota className="hidden w-auto flex-1 lg:flex" />
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-1 pb-6 lg:pb-0">
                  <h3 className="m-0 pt-2.5 text-lg leading-[1.3] font-semibold lg:pt-0">{p.titulo}</h3>
                  <p className="m-0 text-[15px] text-pretty text-tinta-suave">{p.texto}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
