import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, type Imagen } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { EnlacePresupuesto } from "@/components/EnlacePresupuesto";
import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible, type Ancla } from "@/lib/formato";
import { cn } from "@/lib/utils";
import { MenuMovil } from "./MenuMovil";

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensajeWhatsapp: string;
  items: Ancla[];
};

/**
 * Cabecera sticky. Un único enlace a «/» con el logo (opcional) a la izquierda del nombre.
 * Móvil: nombre + «Llamar» + menú (WhatsApp va en la barra inferior).
 * Tableta (md): + «Pedir presupuesto» + «WhatsApp».
 * Escritorio (lg): enlaces del menú + «Pedir presupuesto» + «WhatsApp» + número.
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, mensajeWhatsapp, items }: Props) {
  // Nombre largo: en móvil (< 640 px) «Llamar» queda solo con el icono (texto sr-only)
  // para que el nombre quepa en 2 líneas y no empuje el asistente bajo la barra.
  const nombreLargo = nombre.length > 24;
  return (
    <header className="sticky top-0 z-20 border-b border-linea bg-papel/97">
      <div className="contenedor flex min-h-14 items-center gap-2 py-1.5 md:gap-3">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 text-tinta no-underline"
        >
          {logo && (
            <Image
              src={logo.src}
              alt=""
              width={160}
              height={48}
              className="h-10 w-auto max-w-[72px] flex-none object-contain object-left sm:max-w-32 md:h-12 md:max-w-40"
            />
          )}
          <span className="min-w-0 text-[15px] leading-[1.15] font-bold tracking-[-0.01em] text-balance sm:text-[17px]">
            {nombre}
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center px-3 text-[15px] font-medium text-tinta no-underline hover:underline hover:underline-offset-[6px]"
            >
              {item.texto}
            </Link>
          ))}
        </nav>
        {whatsapp && (
          <EnlacePresupuesto
            className={cn(buttonVariants({ variant: "presupuestoCabecera" }), "hidden md:inline-flex")}
          >
            Pedir presupuesto
          </EnlacePresupuesto>
        )}
        {whatsapp && (
          <BotonWhatsApp
            numero={whatsapp}
            mensaje={mensajeWhatsapp}
            className={cn(buttonVariants({ variant: "whatsappCabecera" }), "hidden md:inline-flex")}
          >
            <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-[18px] flex-none" />
            <span>WhatsApp</span>
          </BotonWhatsApp>
        )}
        <BotonLlamada
          telefono={telefono}
          className={cn(
            buttonVariants({ variant: whatsapp ? "llamadaCabecera" : "llamadaCabeceraPrimaria" }),
            "min-w-11"
          )}
        >
          <Phone aria-hidden="true" strokeWidth={1.5} className="size-[18px] flex-none" />
          <span className={nombreLargo ? "sr-only sm:not-sr-only lg:hidden" : "lg:hidden"}>Llamar</span>
          <span className="hidden lg:inline">{telefonoVisible(telefono)}</span>
        </BotonLlamada>
        <MenuMovil
          items={items}
          whatsapp={whatsapp}
          llamada={
            <BotonLlamada
              telefono={telefono}
              className={cn(buttonVariants({ variant: "llamadaSecundaria" }), "min-h-13 font-semibold")}
            >
              <Phone aria-hidden="true" strokeWidth={1.5} className="size-[18px] flex-none" />
              <span>{telefonoVisible(telefono)}</span>
            </BotonLlamada>
          }
        />
      </div>
    </header>
  );
}
