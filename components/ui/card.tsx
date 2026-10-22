import * as React from "react";

import { cn } from "@/lib/utils";

/** Tarjeta de Medida: fondo blanco, borde de línea, sin sombra (la del asistente va aparte). */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col overflow-hidden rounded-tarjeta border border-linea bg-tarjeta text-tinta",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 px-5 pt-5", className)}
      {...props}
    />
  );
}

/** Título de tarjeta (600 · 18→24 px). Por defecto <h3>; cambia el nivel con `as` según el contexto. */
function CardTitle({
  className,
  as: Tag = "h3",
  ...props
}: React.ComponentProps<"h3"> & { as?: "h2" | "h3" | "h4" | "div" }) {
  return (
    <Tag
      data-slot="card-title"
      className={cn(
        "m-0 text-[clamp(1.125rem,1rem+0.5vw,1.5rem)] leading-tight font-semibold tracking-[-0.01em]",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex flex-1 flex-col gap-3 px-5 py-4", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-3 px-5 pb-5", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
