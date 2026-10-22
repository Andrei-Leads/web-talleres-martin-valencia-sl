import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BotonLlamada, BotonWhatsApp, metadatosServicio } from "@andrei-leads/core";
import { Check, MessageCircle, Phone } from "lucide-react";

import config from "@/site.config";
import { DibujoLineal } from "@/components/DibujoLineal";
import { Foto } from "@/components/Foto";
import { Migas } from "@/components/Migas";
import { BloqueAsistente } from "@/components/secciones/BloqueAsistente";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Preguntas } from "@/components/secciones/Preguntas";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosCatalogo } from "@/components/secciones/ServiciosCatalogo";
import { TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { seccion, seccionBorde } from "@/lib/estilos";
import { telefonoVisible } from "@/lib/formato";
import { mensajeServicio } from "@/lib/mensajes";

const h2Bloque =
  "m-0 text-[clamp(1.625rem,1.2rem+1.78vw,2.5rem)] leading-[1.1] font-bold tracking-[-0.02em] text-balance";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
// Con "navigation", Next espera al resultado completo: 404 desde la primera petición.
export const ensureStatic = "navigation";

// Con cacheComponents, generateStaticParams no puede devolver [].
export function generateStaticParams() {
  const params = config.servicios.map((s) => ({ slug: s.slug }));
  return params.length > 0 ? params : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosServicio(config, slug);
}

export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = config.servicios.find((s) => s.slug === slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const { telefono, whatsapp, direccion } = contacto;
  const numero = telefonoVisible(telefono);
  const [principal, ...resto] = servicio.imagenes;
  const trabajos = config.trabajos.filter((t) => t.servicio === servicio.slug);
  const otros = config.servicios.filter((s) => s.slug !== servicio.slug);
  const mensaje = mensajeServicio(servicio);

  return (
    <>
      <div className="contenedor pt-4 pb-[clamp(32px,5vw,64px)]">
        <Migas
          items={[
            { href: "/", texto: "Inicio" },
            { href: "/servicios", texto: "Servicios" },
            { texto: servicio.titulo },
          ]}
        />
        <div className="mt-2 grid items-start gap-x-[clamp(32px,5vw,72px)] gap-y-6 md:grid-cols-2">
          {/* Fotos: una grande 4:3 + miniaturas; sin fotos, el dibujo lineal como en la tarjeta. */}
          <div className="flex min-w-0 flex-col gap-3">
            {principal ? (
              <>
                <Foto imagen={principal} proporcion="4/3" priority sizes="(min-width: 768px) 560px, 100vw" />
                {resto.length > 0 && (
                  <ul className="m-0 grid list-none grid-cols-3 gap-3 p-0">
                    {resto.map((im) => (
                      <li key={im.src}>
                        <Foto imagen={im} proporcion="4/3" sizes="(min-width: 768px) 180px, 33vw" />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <div
                aria-hidden="true"
                className="flex aspect-[4/3] items-center justify-center rounded-tarjeta border border-linea bg-primario-tinte"
              >
                <DibujoLineal titulo={servicio.titulo} className="h-32 md:h-44" />
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-5">
            <h1 className="m-0 text-[clamp(1.75rem,1.09rem+2.8vw,3.125rem)] leading-[1.1] font-bold tracking-[-0.02em] text-balance">
              {servicio.titulo} en {direccion.ciudad}
            </h1>
            <p className="m-0 max-w-[60ch] text-[17px] text-pretty md:text-lg">{servicio.descripcion}</p>
            {servicio.precioDesde && (
              <div>
                <Badge variant="precio">{servicio.precioDesde}</Badge>
              </div>
            )}
            <div className="flex flex-col gap-3">
              {whatsapp ? (
                <>
                  <BotonWhatsApp
                    numero={whatsapp}
                    mensaje={mensaje}
                    className={buttonVariants({ variant: "whatsappServicio" })}
                  >
                    <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
                    Pedir presupuesto de {servicio.titulo}
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
        </div>
      </div>

      {servicio.contenido.length > 0 && (
        <section className={`${seccion} ${seccionBorde}`}>
          <div className="contenedor flex max-w-[68ch] flex-col gap-4">
            {servicio.contenido.map((p, i) => (
              <p key={i} className="m-0 text-[17px] text-pretty md:text-lg">
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {servicio.incluye.length > 0 && (
        <section aria-labelledby="incluye-titulo" className={`${seccion} ${seccionBorde} bg-tarjeta`}>
          <div className="contenedor flex flex-col gap-5">
            <h2 id="incluye-titulo" className={h2Bloque}>
              Qué incluye
            </h2>
            <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-3 p-0 md:grid-cols-2">
              {servicio.incluye.map((inc, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-6 flex-none text-tinta" />
                  <span className="text-[17px]">{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {trabajos.length > 0 && (
        <section aria-labelledby="proyectos-titulo" className={`${seccion} ${seccionBorde}`}>
          <div className="contenedor flex flex-col gap-5">
            <h2 id="proyectos-titulo" className={h2Bloque}>
              Proyectos de este servicio
            </h2>
            <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
              {trabajos.map((t) => (
                <li key={t.slug} className="flex">
                  <div className="w-full">
                    <TarjetaTrabajo trabajo={t} orientacion="vertical" nivel="h3" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Preguntas preguntas={servicio.preguntas} />

      {/* El título del asistente (h2) encabeza la sección; empieza en el paso 2. */}
      <section className={`${seccion} ${seccionBorde}`}>
        <div className="contenedor">
          <BloqueAsistente
            servicios={config.servicios.map((s) => s.titulo)}
            contacto={contacto}
            servicioFijo={servicio.titulo}
            className="max-w-[720px]"
          />
        </div>
      </section>

      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} />
      <ServiciosCatalogo servicios={otros} titulo="Otros servicios" max={6} cota="más servicios" />
      <CtaFinal telefono={telefono} whatsapp={whatsapp} mensaje={mensaje} conAsistente />
    </>
  );
}
