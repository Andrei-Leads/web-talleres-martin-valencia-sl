import { Badge } from "@/components/ui/badge";
import { seccion, seccionBorde } from "@/lib/estilos";

type Props = {
  zonas: string[];
};

/** Municipios donde se trabaja: etiquetas, nunca enlaces ni páginas. */
export function Zonas({ zonas }: Props) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="zonas-titulo" className={`${seccion} ${seccionBorde}`}>
      <div className="contenedor flex flex-col gap-5">
        <h2
          id="zonas-titulo"
          className="m-0 text-[clamp(1.625rem,1.2rem+1.78vw,2.5rem)] leading-[1.1] font-bold tracking-[-0.02em] text-balance"
        >
          Dónde trabajamos
        </h2>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {zonas.map((zona) => (
            <li key={zona}>
              <Badge className="min-h-10 px-3.5 py-0">
                <span aria-hidden="true" className="size-1.5 flex-none border border-tinta-suave" />
                {zona}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
