import type { Metadata } from "next";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { buttonVariants } from "@/components/ui/button";
import config from "@/site.config";
import { seccion } from "@/lib/estilos";
import { telefonoVisible } from "@/lib/formato";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";

// Next añade <meta name="robots" content="noindex"> a toda respuesta 404. Aquí se
// anulan el robots y el canonical «/» que heredaría del layout (con seo.indexar: true,
// el del layout diría «index, follow»).
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

const enlaces = [
  { href: "/", texto: "Volver al inicio" },
  { href: "/servicios", texto: "Ver servicios" },
  { href: "/contacto", texto: "Contacto" },
];

/** 404 de «Medida»: encabezado con cota, enlaces con flecha y tarjeta de contacto (WhatsApp primero). */
export default function NotFound() {
  const { telefono, whatsapp } = config.contacto;
  const numero = telefonoVisible(telefono);
  return (
    <section className={`contenedor flex flex-col gap-[clamp(24px,3vw,40px)] ${seccion}`}>
      <EncabezadoSeccion
        cota="404"
        nivel="h1"
        titulo="No encontramos esta página"
        entradilla="Puede que el enlace esté mal o que la página ya no exista. Desde aquí puedes seguir mirando o preguntarnos directamente."
      />
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-14">
        <nav aria-label="Páginas principales">
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className={buttonVariants({ variant: "enlaceFlecha" })}>
                  {e.texto}
                  <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 rounded-tarjeta border border-linea bg-tarjeta p-5 md:p-6">
          {whatsapp ? (
            <>
              <BotonWhatsApp
                numero={whatsapp}
                mensaje={MENSAJE_NO_ENCONTRADA}
                className={buttonVariants({ variant: "whatsappServicio" })}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
                Escribir por WhatsApp
              </BotonWhatsApp>
              <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaSecundaria" })}>
                <Phone aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
                <span>o llama al {numero}</span>
              </BotonLlamada>
            </>
          ) : (
            <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaTarjeta" })}>
              <Phone aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
              Llamar al {numero}
            </BotonLlamada>
          )}
        </div>
      </div>
    </section>
  );
}
