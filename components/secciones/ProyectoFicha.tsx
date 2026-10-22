import type { Trabajo } from "@andrei-leads/core";

type Props = {
  trabajo: Trabajo;
};

/** Franja de datos del proyecto entre líneas de plano. Sin ningún dato, no sale. */
export function ProyectoFicha({ trabajo }: Props) {
  const datos = [
    ["Ubicación", trabajo.ubicacion],
    ["Superficie", trabajo.superficie],
    ["Duración", trabajo.duracion],
    ["Año", trabajo.anio?.toString()],
    ["Precio", trabajo.precio],
  ].filter((d): d is [string, string] => Boolean(d[1]));
  if (datos.length === 0) return null;

  return (
    <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-linea py-4 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
      {datos.map(([etiqueta, valor]) => (
        <div key={etiqueta} className="flex min-w-0 flex-col gap-1">
          <dt className="text-sm font-medium text-tinta-suave">{etiqueta}</dt>
          <dd className="m-0 text-base font-semibold tabular-nums">{valor}</dd>
        </div>
      ))}
    </dl>
  );
}
