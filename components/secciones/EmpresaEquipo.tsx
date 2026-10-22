import type { Empresa } from "@andrei-leads/core";

import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { Foto } from "@/components/Foto";
import { seccion, seccionBorde } from "@/lib/estilos";

type Props = {
  equipo: Empresa["equipo"];
};

function iniciales(nombre: string): string {
  return nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

/** Personas del equipo: foto 1:1 o iniciales sobre gris. Sin equipo, nada. */
export function EmpresaEquipo({ equipo }: Props) {
  if (equipo.length === 0) return null;
  return (
    <section className={`${seccion} ${seccionBorde}`}>
      <div className="contenedor flex flex-col gap-[clamp(20px,2.4vw,32px)]">
        <EncabezadoSeccion cota="equipo" titulo="Equipo" />
        <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-6 p-0 sm:grid-cols-3 lg:grid-cols-4">
          {equipo.map((p, i) => (
            <li key={`${p.nombre}-${i}`} className="flex min-w-0 flex-col gap-3">
              {p.foto ? (
                <Foto imagen={p.foto} proporcion="1/1" sizes="(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw" />
              ) : (
                <div
                  aria-hidden="true"
                  className="grid aspect-square place-items-center border border-linea bg-gris-claro text-[clamp(2rem,1.5rem+2vw,3rem)] font-semibold text-tinta-suave"
                >
                  {iniciales(p.nombre)}
                </div>
              )}
              <div className="flex flex-col">
                <h3 className="m-0 text-lg leading-[1.3] font-semibold">{p.nombre}</h3>
                {p.cargo && <p className="m-0 text-tinta-suave">{p.cargo}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
