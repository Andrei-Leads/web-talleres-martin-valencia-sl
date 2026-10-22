import Link from "next/link";
import {
  BotonLlamada,
  BotonWhatsApp,
  enlacesLegales,
  formatearHorario,
  type SiteConfig,
} from "@andrei-leads/core";
import { ExternalLink, Mail, MessageCircle, Phone } from "lucide-react";

import { anioActual } from "@/lib/anio";
import {
  direccionLinea,
  emailVisible,
  enlaceMaps,
  listaRedes,
  telefonoVisible,
  type Ancla,
} from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  items: Ancla[];
};

/** Todos los enlaces del pie: área táctil de 44 px, texto blanco. */
const enlace = "flex min-h-11 items-center gap-2 text-white no-underline hover:underline hover:underline-offset-4";
const titulo = "mb-1.5 text-xs font-medium tracking-[0.14em] text-linea uppercase";

export async function Pie({ negocio, contacto, redes, items }: Props) {
  const anio = await anioActual();
  const listaDeRedes = listaRedes(redes);

  return (
    <footer
      data-tema="oscuro"
      className="bg-tinta pt-[clamp(40px,6vw,72px)] pb-8 text-white"
    >
      <div className="contenedor flex flex-col gap-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-10 gap-y-7">
          <div className="flex flex-col gap-2">
            <strong className="text-[19px] leading-[1.2] font-bold">{negocio.nombre}</strong>
            <span className="text-[15px] text-linea">{direccionLinea(contacto.direccion)}</span>
            <a
              href={enlaceMaps(contacto.direccion)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-1.5 self-start text-[15px] font-semibold text-white underline underline-offset-4"
            >
              Cómo llegar
              <ExternalLink aria-hidden="true" strokeWidth={1.5} className="size-4 flex-none" />
            </a>
          </div>

          <div className="flex flex-col">
            <p className={titulo}>Contacto</p>
            <BotonLlamada telefono={contacto.telefono} className={enlace + " tabular-nums"}>
              <Phone aria-hidden="true" strokeWidth={1.5} className="size-[18px] flex-none" />
              <span>{telefonoVisible(contacto.telefono)}</span>
            </BotonLlamada>
            {contacto.whatsapp && (
              <BotonWhatsApp
                numero={contacto.whatsapp}
                mensaje={mensajeGeneral(contacto)}
                className={enlace}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-[18px] flex-none" />
                <span>WhatsApp</span>
              </BotonWhatsApp>
            )}
            {emailVisible(contacto.email) && (
              <a href={`mailto:${contacto.email}`} className={enlace}>
                <Mail aria-hidden="true" strokeWidth={1.5} className="size-[18px] flex-none" />
                <span className="break-all">{contacto.email}</span>
              </a>
            )}
          </div>

          <div className="flex flex-col">
            <p className={titulo}>Horario</p>
            {formatearHorario(contacto.horario).map((h) => (
              <p key={h.dias} className="m-0 flex flex-col py-1 text-[15px]">
                <span className="font-semibold">{h.dias}</span>
                <span className="text-linea tabular-nums">{h.horas}</span>
              </p>
            ))}
          </div>

          <nav aria-label="Pie" className="flex flex-col">
            <p className={titulo}>Web</p>
            {items.map((item) => (
              <Link key={item.href} href={item.href} className={enlace}>
                {item.texto}
              </Link>
            ))}
            {listaDeRedes.map((red) => (
              <a
                key={red.href}
                href={red.href}
                target="_blank"
                rel="noopener noreferrer"
                className={enlace}
              >
                <span>{red.texto}</span>
                <ExternalLink aria-hidden="true" strokeWidth={1.5} className="size-4 flex-none" />
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-tinta-suave pt-5 text-sm text-linea">
          <span className="flex min-h-11 items-center">
            © {anio} {negocio.nombreLegal}{negocio.nif !== "PENDIENTE" && ` · NIF ${negocio.nif}`}
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {enlacesLegales.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex min-h-11 items-center text-white no-underline hover:underline hover:underline-offset-4"
              >
                {l.texto}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
