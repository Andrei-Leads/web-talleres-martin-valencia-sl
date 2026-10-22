import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { Foto } from "@/components/Foto";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  trabajo: Trabajo;
  orientacion: "horizontal" | "vertical";
  /** h3 bajo el h2 de la sección; h2 si el h1 de la página es otro título. */
  nivel?: "h2" | "h3";
};

/** Tarjeta de proyecto. Toda ella es un único enlace (el del título, estirado). */
export function TarjetaTrabajo({ trabajo, orientacion, nivel = "h3" }: Props) {
  const horizontal = orientacion === "horizontal";
  // Solo los campos que existen; sin ninguno no hay línea (nunca «— m²»).
  const ficha = [trabajo.ubicacion, trabajo.superficie, trabajo.duracion, trabajo.precio]
    .filter((v): v is string => Boolean(v))
    .join(" · ");
  const testimonio = trabajo.testimonio;

  return (
    <Card
      className={cn(
        "relative h-full has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-foco",
        horizontal && "md:grid md:grid-cols-2"
      )}
    >
      <Foto
        imagen={trabajo.imagenes[0]}
        proporcion="4/3"
        marco="ninguno"
        decorativa
        sizes={horizontal ? "(min-width: 768px) 560px, 100vw" : "(min-width: 768px) 380px, 100vw"}
        className={cn("border-b border-linea", horizontal && "md:h-full md:border-r md:border-b-0")}
      >
        {trabajo.antes && (
          <span className="absolute top-2 right-2 rounded-etiqueta border border-tinta-suave bg-tarjeta px-2 py-[3px] text-xs font-semibold text-tinta">
            Antes / Después
          </span>
        )}
      </Foto>
      <CardContent className={cn("gap-2.5 px-5 pt-[18px] pb-5", horizontal && "md:p-[clamp(18px,2.4vw,32px)]")}>
        <CardTitle as={nivel} className="text-balance">
          <Link
            href={`/trabajos/${trabajo.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {trabajo.titulo}
          </Link>
        </CardTitle>
        {ficha && (
          <p className="m-0 border-y border-linea py-2 text-sm font-medium text-tinta-suave tabular-nums">
            {ficha}
          </p>
        )}
        <p className="m-0 text-pretty">{trabajo.descripcion}</p>
        {testimonio && (
          <p className="m-0 truncate text-[15px] text-tinta-suave">
            «{testimonio.texto}» · {testimonio.autor}
          </p>
        )}
        <span aria-hidden="true" className={cn(buttonVariants({ variant: "enlaceFlecha" }), "mt-auto self-start")}>
          Ver proyecto
          <ArrowRight strokeWidth={1.5} className="size-4" />
        </span>
      </CardContent>
    </Card>
  );
}
