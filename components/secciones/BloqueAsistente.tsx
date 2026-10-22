import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible } from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";
import { cn } from "@/lib/utils";
import { Asistente } from "./Asistente";
import { TarjetaTelefono } from "./TarjetaTelefono";

type Props = {
  /** Títulos de los servicios. */
  servicios: string[];
  contacto: SiteConfig["contacto"];
  /** Servicio ya decidido: el asistente empieza en el paso 2. */
  servicioFijo?: string;
  /** Debajo del asistente: «Escribir por WhatsApp» + «o llama al {número}» (solo con WhatsApp). */
  respaldo?: boolean;
  className?: string;
};

/**
 * `<div id="asistente">`: es el destino de «Pedir presupuesto» (EnlacePresupuesto).
 * Con WhatsApp, el asistente; sin él, la tarjeta «Cuéntanos por teléfono» (que ya lleva la llamada).
 */
export function BloqueAsistente({ servicios, contacto, servicioFijo, respaldo, className }: Props) {
  const { whatsapp, telefono } = contacto;
  return (
    <div id="asistente" className={cn("flex flex-col gap-3", className)}>
      {whatsapp ? (
        <Asistente
          servicios={servicios}
          numero={whatsapp}
          mensajeDirecto={mensajeGeneral(contacto)}
          servicioFijo={servicioFijo}
        />
      ) : (
        <TarjetaTelefono telefono={telefono} horario={contacto.horario} />
      )}
      {respaldo && whatsapp && (
        <div className="flex flex-wrap gap-2">
          <BotonWhatsApp
            numero={whatsapp}
            mensaje={mensajeGeneral(contacto)}
            className={cn(buttonVariants({ variant: "whatsappDirecto" }), "w-auto flex-[1_1_220px]")}
          >
            <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
            <span>Escribir por WhatsApp</span>
          </BotonWhatsApp>
          <BotonLlamada
            telefono={telefono}
            className={cn(buttonVariants({ variant: "llamadaSecundaria" }), "w-auto flex-[1_1_200px]")}
          >
            <Phone aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
            <span>o llama al {telefonoVisible(telefono)}</span>
          </BotonLlamada>
        </div>
      )}
    </div>
  );
}
