import type { SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";

type Props = {
  galeria: SiteConfig["galeria"];
  max?: number;
};

/** Rejilla de fotos 4:3 con el título debajo (si existe). Sin fotos, nada. */
export function GaleriaRejilla({ galeria, max }: Props) {
  const fotos = max ? galeria.slice(0, max) : galeria;
  if (fotos.length === 0) return null;
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-x-4 gap-y-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {fotos.map((f, i) => (
        <li key={`${f.src}-${i}`} className="flex min-w-0 flex-col gap-2.5">
          <Foto imagen={f} proporcion="4/3" sizes="(min-width: 1024px) 373px, (min-width: 640px) 50vw, 100vw" />
          {f.titulo && <span className="text-base leading-[1.35] font-semibold text-balance">{f.titulo}</span>}
        </li>
      ))}
    </ul>
  );
}
