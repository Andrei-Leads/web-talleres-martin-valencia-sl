"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";

import { EnlacePresupuesto } from "@/components/EnlacePresupuesto";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Ancla } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  items: Ancla[];
  whatsapp?: string;
  /**
   * El `BotonLlamada` del panel, ya renderizado por el servidor (Cabecera). Este archivo es
   * "use client": si importara un valor de `@andrei-leads/core` (o de `lib/formato`, que lo
   * importa), arrastraría zod y el contrato entero al JavaScript de todas las páginas.
   */
  llamada: ReactNode;
};

/** Menú móvil (hasta 1023 px): botón + panel derecho con enlaces y, abajo, presupuesto y llamada. */
export function MenuMovil({ items, whatsapp, llamada }: Props) {
  const [abierto, setAbierto] = useState(false);
  // Si el panel se cierra al navegar, el foco no debe volver al botón del menú.
  const navegando = useRef(false);

  function navegar() {
    navegando.current = true;
    setAbierto(false);
  }

  return (
    <Sheet open={abierto} onOpenChange={setAbierto}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex size-11 flex-none cursor-pointer items-center justify-center rounded-boton text-tinta hover:bg-gris-claro lg:hidden"
        >
          <Menu aria-hidden="true" strokeWidth={1.5} className="size-[22px]" />
          <span className="sr-only">Abrir menú</span>
        </button>
      </SheetTrigger>
      <SheetContent
        aria-describedby={undefined}
        onCloseAutoFocus={(e) => {
          if (navegando.current) {
            e.preventDefault();
            navegando.current = false;
          }
        }}
      >
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <nav aria-label="Principal" className="flex flex-col">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={navegar}
              className="flex min-h-14 items-center justify-between border-b border-linea text-lg font-semibold text-tinta no-underline"
            >
              <span>{item.texto}</span>
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          {whatsapp && (
            <EnlacePresupuesto
              onNavegar={navegar}
              className={cn(buttonVariants({ variant: "whatsappAsistente" }), "min-h-13 text-base")}
            >
              Pedir presupuesto
            </EnlacePresupuesto>
          )}
          {llamada}
        </div>
      </SheetContent>
    </Sheet>
  );
}
