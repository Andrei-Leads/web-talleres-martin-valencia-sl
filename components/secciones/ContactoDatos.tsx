import { BotonLlamada, BotonWhatsApp, formatearHorario, type SiteConfig } from "@andrei-leads/core";
import { ExternalLink, Mail, MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { direccionLinea, emailVisible, enlaceMaps, telefonoVisible } from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type Props = {
  contacto: SiteConfig["contacto"];
};

const h2 = "m-0 text-[clamp(1.375rem,1.2rem+0.8vw,1.75rem)] leading-[1.15] font-bold tracking-[-0.01em]";

/** Columna de datos de /contacto: escribir, llamar, email, horario, dirección. Sin mapa incrustado. */
export function ContactoDatos({ contacto }: Props) {
  const { whatsapp, telefono, email, horario, direccion, fichaGoogle } = contacto;
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className={h2}>Escríbenos</h2>
        <div className="flex flex-col gap-2">
          {whatsapp && (
            <BotonWhatsApp
              numero={whatsapp}
              mensaje={mensajeGeneral(contacto)}
              className={buttonVariants({ variant: "whatsappDirecto" })}
            >
              <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
              <span>Escribir por WhatsApp</span>
            </BotonWhatsApp>
          )}
          <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaSecundaria" })}>
            <Phone aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
            <span>{telefonoVisible(telefono)}</span>
          </BotonLlamada>
          {emailVisible(email) && (
            <a
              href={`mailto:${email}`}
              className={cn(buttonVariants({ variant: "llamadaSecundaria" }), "tabular-nums")}
            >
              <Mail aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
              <span className="min-w-0 break-all">{email}</span>
            </a>
          )}
        </div>
      </div>

      {horario.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className={h2}>Horario</h2>
          <ul className="m-0 flex list-none flex-col p-0">
            {formatearHorario(horario).map((h) => (
              <li
                key={h.dias}
                className="flex flex-wrap justify-between gap-x-4 border-b border-linea py-2.5 first:border-t"
              >
                <span className="text-tinta-suave">{h.dias}</span>
                <span className="font-semibold tabular-nums">{h.horas}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <h2 className={h2}>Dirección</h2>
        <p className="m-0">{direccionLinea(direccion)}</p>
        <div className="flex flex-wrap gap-x-6">
          <a
            href={enlaceMaps(direccion)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "enlaceFlecha" })}
          >
            Cómo llegar ↗<span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
          {fichaGoogle && (
            <a
              href={fichaGoogle}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "enlaceFlecha" })}
            >
              Ver ficha en Google
              <ExternalLink aria-hidden="true" strokeWidth={1.5} className="size-4" />
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
