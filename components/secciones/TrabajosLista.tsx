import Link from "next/link";
import type { SiteConfig, Trabajo } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { GaleriaRejilla } from "@/components/secciones/GaleriaRejilla";
import { TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import { buttonVariants } from "@/components/ui/button";
import { seccion, seccionBorde } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  trabajos: Trabajo[];
  galeria: SiteConfig["galeria"];
  max?: number;
  verTodos?: boolean;
};

/** Proyectos instalados del inicio: tarjetas horizontales; sin trabajos, la galería; sin nada, nada. */
export function TrabajosLista({ trabajos, galeria, max = 3, verTodos }: Props) {
  const hayTrabajos = trabajos.length > 0;
  if (!hayTrabajos && galeria.length === 0) return null;

  return (
    <section className={cn(seccion, seccionBorde, "bg-gris-claro")}>
      <div className="contenedor flex flex-col gap-[clamp(20px,2.4vw,32px)]">
        <EncabezadoSeccion cota="instalados" titulo="Proyectos" />
        {hayTrabajos ? (
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {trabajos.slice(0, max).map((t) => (
              <li key={t.slug}>
                <TarjetaTrabajo trabajo={t} orientacion="horizontal" />
              </li>
            ))}
          </ul>
        ) : (
          <GaleriaRejilla galeria={galeria} max={max} />
        )}
        {verTodos && (
          <Link href="/trabajos" className={cn(buttonVariants({ variant: "enlaceFlecha" }), "self-start")}>
            Ver todos los proyectos
            <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
          </Link>
        )}
      </div>
    </section>
  );
}
