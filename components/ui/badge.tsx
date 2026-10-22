import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center whitespace-nowrap text-tinta", {
  variants: {
    variant: {
      /* Pastilla de precio «desde…»: contorno, solo donde hay dato. */
      precio:
        "rounded-chip border border-tinta-suave px-3 py-1 text-sm font-semibold tabular-nums",
      /* Marcas y zonas: etiqueta blanca con borde de línea (no es un control). */
      etiqueta:
        "gap-2 rounded-etiqueta border border-linea bg-tarjeta px-3 py-1.5 text-[15px] font-medium",
    },
  },
  defaultVariants: {
    variant: "etiqueta",
  },
});

/** Etiqueta no interactiva (<span>). Para un enlace o botón, usa buttonVariants. */
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
