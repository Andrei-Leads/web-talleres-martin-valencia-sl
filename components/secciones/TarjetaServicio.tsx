import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { Cota } from "@/components/Cota";
import { DibujoLineal } from "@/components/DibujoLineal";
import { Foto } from "@/components/Foto";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  servicio: Servicio;
  /** Tarjeta ancha partida (foto/dibujo a un lado): para cuando hay un solo servicio. */
  ancha?: boolean;
  /** Nivel del título: h3 bajo un h2 de sección; h2 si el título de la sección es el h1. */
  nivel?: "h2" | "h3";
};

/**
 * Tarjeta de servicio. Toda la tarjeta es un único enlace (el del título, estirado):
 * «Ver servicio» es solo visual para no duplicar enlaces.
 */
export function TarjetaServicio({ servicio, ancha, nivel = "h3" }: Props) {
  const foto = servicio.imagenes[0];
  return (
    <Card
      className={cn(
        "relative h-full has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-foco",
        ancha && "md:grid md:grid-cols-2"
      )}
    >
      {foto ? (
        <Foto
          imagen={foto}
          proporcion="4/3"
          marco="ninguno"
          sizes={ancha ? "(min-width: 768px) 560px, 100vw" : "(min-width: 768px) 380px, 100vw"}
          className={cn("border-b border-linea", ancha && "md:h-full md:border-r md:border-b-0")}
        />
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "flex aspect-[4/3] flex-col items-center justify-center gap-2 border-b border-linea bg-primario-tinte",
            ancha && "md:aspect-auto md:h-full md:border-r md:border-b-0"
          )}
        >
          <DibujoLineal titulo={servicio.titulo} className="h-24 md:h-28" />
          <Cota etiqueta="a medida" className="w-[130px]" />
        </div>
      )}
      <CardContent className="gap-2 px-5 pt-[18px] pb-5">
        <CardTitle as={nivel} className="text-[19px] md:text-[19px]">
          <Link
            href={`/servicios/${servicio.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {servicio.titulo}
          </Link>
        </CardTitle>
        <p className="m-0 text-pretty text-tinta-suave">{servicio.descripcion}</p>
        {/* La altura mínima se reserva siempre para igualar tarjetas con y sin precio. */}
        <div className="mt-auto flex min-h-[54px] flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-2.5">
          {servicio.precioDesde && <Badge variant="precio">{servicio.precioDesde}</Badge>}
          <span aria-hidden="true" className={cn(buttonVariants({ variant: "enlaceFlecha" }), "ml-auto")}>
            Ver servicio
            <ArrowRight strokeWidth={1.5} className="size-4" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
