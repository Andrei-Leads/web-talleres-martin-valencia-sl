import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { EnlacePresupuesto } from "@/components/EnlacePresupuesto";
import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible } from "@/lib/formato";

type Props = {
  telefono: string;
  whatsapp?: string;
  /** Mensaje de WhatsApp según la página (general o del trabajo). */
  mensaje: string;
  /** La página tiene el asistente: el botón principal lleva a él. */
  conAsistente: boolean;
};

/** Banda final sobre primario (`data-tema="oscuro"`: el foco pasa a blanco). */
export function CtaFinal({ telefono, whatsapp, mensaje, conAsistente }: Props) {
  const numero = telefonoVisible(telefono);
  return (
    <section
      data-tema="oscuro"
      className="bg-primario py-[clamp(48px,7vw,88px)] text-sobre-primario"
    >
      <div className="contenedor flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
        <h2 className="m-0 text-[clamp(1.75rem,1.2rem+2.2vw,2.875rem)] leading-[1.05] font-bold tracking-[-0.02em] text-balance">
          ¿Cambiamos tus ventanas?
        </h2>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {whatsapp ? (
            <>
              {conAsistente ? (
                <EnlacePresupuesto className={buttonVariants({ variant: "bandaCta" })}>
                  <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-5" />
                  Pedir presupuesto
                </EnlacePresupuesto>
              ) : (
                <BotonWhatsApp
                  numero={whatsapp}
                  mensaje={mensaje}
                  className={buttonVariants({ variant: "bandaCta" })}
                >
                  <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-5" />
                  Pedir presupuesto por WhatsApp
                </BotonWhatsApp>
              )}
              <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "enlaceBandaCta" })}>
                o llama al {numero}
              </BotonLlamada>
            </>
          ) : (
            <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "bandaCta" })}>
              <Phone aria-hidden="true" strokeWidth={1.5} className="size-5" />
              Llamar al {numero}
            </BotonLlamada>
          )}
        </div>
      </div>
    </section>
  );
}
