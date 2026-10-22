import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { TarjetaServicio } from "@/components/secciones/TarjetaServicio";
import { buttonVariants } from "@/components/ui/button";
import { seccion, seccionBorde } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  servicios: Servicio[];
  titulo?: string;
  /** `h1` cuando el catálogo es la cabecera de la página (/servicios). */
  nivel?: "h1" | "h2";
  cota?: string;
  /** Máximo de tarjetas (inicio: 6). */
  max?: number;
  /** «Ver todos los servicios» si hay más de `max`. */
  verTodos?: boolean;
  fondo?: "papel" | "gris";
};

/** Catálogo de servicios: 1 columna en móvil, 3 en escritorio (2 con 2; 1 tarjeta ancha con 1). */
export function ServiciosCatalogo({
  servicios,
  titulo = "Qué hacemos",
  nivel = "h2",
  cota = "catálogo",
  max,
  verTodos,
  fondo = "papel",
}: Props) {
  if (servicios.length === 0) return null;
  const visibles = max ? servicios.slice(0, max) : servicios;
  const hayMas = verTodos && servicios.length > visibles.length;
  const n = visibles.length;
  return (
    <section className={cn(seccion, seccionBorde, fondo === "gris" && "bg-gris-claro")}>
      <div className="contenedor flex flex-col gap-[clamp(20px,2.4vw,32px)]">
        <EncabezadoSeccion cota={cota} titulo={titulo} nivel={nivel} />
        <ul
          className={cn(
            "m-0 grid list-none gap-4 p-0",
            n === 2 && "md:grid-cols-2",
            n >= 3 && "md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {visibles.map((s) => (
            <li key={s.slug} className="flex">
              <div className="w-full">
                <TarjetaServicio servicio={s} ancha={n === 1} nivel={nivel === "h1" ? "h2" : "h3"} />
              </div>
            </li>
          ))}
        </ul>
        {hayMas && (
          <Link href="/servicios" className={cn(buttonVariants({ variant: "enlaceFlecha" }), "self-start")}>
            Ver todos los servicios
            <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
          </Link>
        )}
      </div>
    </section>
  );
}
