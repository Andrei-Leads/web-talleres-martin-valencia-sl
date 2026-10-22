import { Ruler } from "lucide-react";

import { Cota } from "@/components/Cota";
import { Badge } from "@/components/ui/badge";
import { seccion, seccionBorde } from "@/lib/estilos";

type Props = {
  marcas: string[];
};

/* Pictogramas lineales de «Qué mirar»: decorativos, 56 px de alto. */
function PictoRpt() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 60 56" className="h-14 w-auto text-tinta-suave" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="6" width="18" height="44" className="fill-tarjeta" />
      <rect x="38" y="6" width="18" height="44" className="fill-tarjeta" />
      <path d="M24 6v44M36 6v44M24 12h12M24 20h12M24 28h12M24 36h12M24 44h12" strokeWidth="1" />
    </svg>
  );
}

function PictoVidrio() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 60 56" className="h-14 w-auto text-tinta-suave" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 4v48M44 4v48" strokeWidth="3" />
      <path d="M24 4v48M36 4v48" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  );
}

const MIRAR = [
  {
    titulo: "Rotura de puente térmico (RPT)",
    texto: "Una pieza aislante separa el aluminio de dentro y el de fuera, para que el frío y el calor no pasen.",
    picto: <PictoRpt />,
  },
  {
    titulo: "Doble vidrio con cámara",
    texto: "Dos cristales con aire entre ellos: menos ruido y menos frío.",
    picto: <PictoVidrio />,
  },
  {
    titulo: "Buena instalación",
    texto: "El mejor perfil falla si se coloca mal: medimos y sellamos nosotros.",
    picto: <Ruler aria-hidden="true" strokeWidth={1.5} className="h-12 w-12 text-tinta-suave" />,
  },
];

/** «Trabajamos con» (solo si hay marcas) + «Qué mirar en una ventana» (siempre, sin cifras). */
export function Marcas({ marcas }: Props) {
  return (
    <section className={`${seccion} ${seccionBorde} bg-tarjeta`}>
      <div className="contenedor flex flex-col gap-[clamp(24px,3vw,40px)]">
        <Cota etiqueta="sistemas" className="max-w-[560px]" />

        {marcas.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <h2 className="m-0 text-[clamp(1.375rem,1.2rem+0.8vw,1.75rem)] leading-[1.15] font-bold tracking-[-0.01em]">
              Trabajamos con
            </h2>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {marcas.map((m) => (
                <li key={m}>
                  <Badge className="min-h-10 rounded-etiqueta border-tinta-suave px-4 font-semibold tracking-[0.02em]">
                    {m}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-5 rounded-tarjeta bg-primario-tinte p-[clamp(20px,3vw,40px)]">
          <h2 className="m-0 text-[clamp(1.5rem,1.3rem+1vw,2.125rem)] leading-[1.15] font-bold tracking-[-0.02em]">
            Qué mirar en una ventana
          </h2>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[clamp(20px,3vw,40px)] p-0">
            {MIRAR.map((m) => (
              <li key={m.titulo} className="flex flex-col gap-2.5">
                <div aria-hidden="true" className="flex h-14 items-center">
                  {m.picto}
                </div>
                <h3 className="m-0 text-lg leading-[1.3] font-semibold">{m.titulo}</h3>
                <p className="m-0 text-pretty text-tinta-suave">{m.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
