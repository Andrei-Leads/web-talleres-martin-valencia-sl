import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";

type Props = {
  trabajo: Trabajo;
};

const etiqueta =
  "absolute top-2 left-2 rounded-etiqueta border border-tinta-suave bg-tarjeta px-2.5 py-1 text-sm leading-none font-semibold text-tinta";

/** Par Antes/Después (si hay `antes`) o foto principal grande, y el resto en rejilla 4:3. */
export function ProyectoFotos({ trabajo }: Props) {
  const [principal, ...resto] = trabajo.imagenes;
  return (
    <div className="flex flex-col gap-4">
      {trabajo.antes ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Foto imagen={trabajo.antes} proporcion="4/3" sizes="(min-width: 1200px) 572px, (min-width: 768px) 50vw, 100vw">
            <span className={etiqueta}>Antes</span>
          </Foto>
          <Foto imagen={principal} proporcion="4/3" priority sizes="(min-width: 1200px) 572px, (min-width: 768px) 50vw, 100vw">
            <span className={etiqueta}>Después</span>
          </Foto>
        </div>
      ) : (
        <Foto imagen={principal} proporcion="16/9" priority sizes="(min-width: 1200px) 1160px, 100vw" />
      )}
      {resto.length > 0 && (
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {resto.map((img, i) => (
            <li key={`${img.src}-${i}`}>
              <Foto imagen={img} proporcion="4/3" sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
