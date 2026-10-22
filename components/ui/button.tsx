import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/*
 * Variantes de botón del diseño «Medida» (Specs §4).
 * Se usan con <Button> y como className de BotonLlamada / BotonWhatsApp de core
 * (core pone el comportamiento; el aspecto sale de aquí).
 * Todas con área ≥ 44 px, peso 600 y rounded-boton salvo los chips.
 * El radio va dentro de cada variante (no en la base) para no depender del orden del CSS.
 */
const base = "no-underline select-none transition-colors disabled:pointer-events-none disabled:opacity-50";
/** Relleno primario con texto blanco. */
const relleno = "bg-primario text-sobre-primario hover:brightness-110";
/** Contorno sobre blanco/papel (borde de control: siempre tinta-suave). */
const contorno = "border border-tinta-suave bg-tarjeta text-tinta hover:bg-gris-claro";
const caja = "inline-flex items-center justify-center rounded-boton";

const buttonVariants = cva(base, {
  variants: {
    variant: {
      /* Pasos del asistente. Elegido (aria-checked="true"): relleno primario, texto blanco. */
      chipOpcion:
        "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-chip border border-tinta-suave bg-primario-tinte px-4 text-[15px] font-semibold text-tinta hover:bg-gris-claro aria-checked:border-primario aria-checked:bg-primario aria-checked:text-sobre-primario aria-checked:hover:brightness-110",
      /* Final del asistente: todo el ancho, 56 px, 17 px. */
      whatsappAsistente: `flex min-h-14 w-full items-center justify-center gap-2.5 rounded-boton px-4 text-[17px] font-semibold ${relleno}`,
      /* Bajo el asistente, en /contacto y como respaldo sin JS. */
      whatsappDirecto: `flex min-h-12 w-full items-center justify-center gap-2 rounded-boton px-4 text-[15px] font-semibold ${contorno}`,
      /* Hero, servicio y contacto: icono + texto, contorno fino, peso 500. */
      llamadaSecundaria: `${caja} min-h-12 w-full gap-2 px-4 text-[15px] font-medium tabular-nums ${contorno}`,
      /* Cabecera: «Llamar» en móvil y tableta, número completo en escritorio (lg). */
      llamadaCabecera: `${caja} min-h-11 gap-1.5 px-3 text-[15px] font-semibold tabular-nums lg:gap-2 lg:px-3.5 ${contorno}`,
      /* Cabecera sin WhatsApp: el número pasa a relleno primario. */
      llamadaCabeceraPrimaria: `${caja} min-h-11 gap-1.5 px-3 text-[15px] font-semibold tabular-nums lg:gap-2 lg:px-[18px] ${relleno}`,
      /* «WhatsApp» en la cabecera (desde md; en móvil está la barra inferior). */
      whatsappCabecera: `${caja} min-h-11 gap-1.5 px-3 text-[15px] font-semibold lg:gap-2 lg:px-3.5 ${contorno}`,
      /* «Pedir presupuesto» en la cabecera (EnlacePresupuesto). */
      presupuestoCabecera: `${caja} min-h-11 px-[18px] text-[15px] font-semibold ${relleno}`,
      /* Barra móvil: 52 px. */
      barraWhatsapp: `flex min-h-13 flex-1 items-center justify-center gap-2 rounded-boton px-3 text-base font-semibold ${relleno}`,
      barraLlamar: `flex min-h-13 flex-1 items-center justify-center gap-2 rounded-boton px-3 text-base font-semibold ${contorno}`,
      barraLlamarAncho: `flex min-h-13 w-full flex-1 items-center justify-center gap-2 rounded-boton px-3 text-base font-semibold tabular-nums ${relleno}`,
      /* Página de servicio: 56 px. */
      whatsappServicio: `flex min-h-14 items-center justify-center gap-2.5 rounded-boton px-5 text-[17px] font-semibold ${relleno}`,
      /* TarjetaTelefono: todo el ancho, 56 px. */
      llamadaTarjeta: `flex min-h-14 w-full items-center justify-center gap-2.5 rounded-boton px-5 text-[17px] font-semibold tabular-nums ${relleno}`,
      /* Banda CTA (solo sobre fondo primario): botón blanco con texto primario. */
      bandaCta:
        "inline-flex min-h-14 items-center justify-center gap-2.5 rounded-boton bg-tarjeta px-6 text-[17px] font-bold text-primario hover:brightness-95",
      /* Enlace «o llama al …» en blanco subrayado, sobre la banda. */
      enlaceBandaCta:
        "inline-flex min-h-11 items-center gap-2 rounded-boton font-semibold tabular-nums text-sobre-primario underline underline-offset-4 hover:decoration-2",
      /* «Ver todos los proyectos», «Ver servicio»: texto con flecha. */
      enlaceFlecha:
        "inline-flex min-h-11 items-center gap-2 rounded-boton font-semibold text-tinta underline underline-offset-4 hover:decoration-2",
      /* «Atrás», «Cambiar»: botón de texto. */
      textoAtras:
        "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-boton px-2 font-medium text-tinta underline underline-offset-4 hover:decoration-2",
    },
  },
  defaultVariants: {
    variant: "llamadaSecundaria",
  },
});

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
