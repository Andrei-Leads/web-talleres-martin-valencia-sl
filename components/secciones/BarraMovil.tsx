import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible } from "@/lib/formato";

type Props = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
};

/**
 * Barra inferior (solo < 768 px): WhatsApp | Llamar. Sin WhatsApp, «Llamar al {número}» a todo el ancho.
 * Es sticky y el último hijo del body: flota sobre el contenido al desplazarse y,
 * al llegar al final, queda debajo del pie sin taparlo.
 */
export function BarraMovil({ telefono, whatsapp, mensaje }: Props) {
  return (
    <div className="sticky bottom-0 z-30 flex gap-2 border-t border-linea bg-tarjeta px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] shadow-barra md:hidden">
      {whatsapp ? (
        <>
          <BotonWhatsApp
            numero={whatsapp}
            mensaje={mensaje}
            className={buttonVariants({ variant: "barraWhatsapp" })}
          >
            <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
            <span>WhatsApp</span>
          </BotonWhatsApp>
          <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "barraLlamar" })}>
            <Phone aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
            <span>Llamar</span>
          </BotonLlamada>
        </>
      ) : (
        <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "barraLlamarAncho" })}>
          <Phone aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
          <span>Llamar al {telefonoVisible(telefono)}</span>
        </BotonLlamada>
      )}
    </div>
  );
}
