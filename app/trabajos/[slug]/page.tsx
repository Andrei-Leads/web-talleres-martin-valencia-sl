import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metadatosTrabajo } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { Migas } from "@/components/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { ProyectoFicha } from "@/components/secciones/ProyectoFicha";
import { ProyectoFotos } from "@/components/secciones/ProyectoFotos";
import { TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import { buttonVariants } from "@/components/ui/button";
import config from "@/site.config";
import { mensajeTrabajo } from "@/lib/mensajes";
import { seccion, seccionBorde } from "@/lib/estilos";

// Con `cacheComponents` la lista no puede ser []: sin trabajos, un slug de relleno que acaba en 404.
// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
// Con "navigation", Next espera al resultado completo: 404 desde la primera petición.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  const params = config.trabajos.map((t) => ({ slug: t.slug }));
  return params.length > 0 ? params : [{ slug: "_" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trabajo = config.trabajos.find((t) => t.slug === slug);
  if (!trabajo) notFound();

  const servicio = trabajo.servicio ? config.servicios.find((s) => s.slug === trabajo.servicio) : undefined;
  const otros = config.trabajos.filter((t) => t.slug !== trabajo.slug).slice(0, 3);
  const { contacto } = config;

  return (
    <>
      <article className={`contenedor flex flex-col gap-[clamp(20px,2.4vw,32px)] pt-2 ${seccion}`}>
        <Migas
          items={[
            { href: "/", texto: "Inicio" },
            { href: "/trabajos", texto: "Proyectos" },
            { texto: trabajo.titulo },
          ]}
        />
        <h1 className="m-0 text-[clamp(1.75rem,1.09rem+2.8vw,3.125rem)] leading-[1.1] font-bold tracking-[-0.02em] text-balance">
          {trabajo.titulo}
        </h1>
        <ProyectoFicha trabajo={trabajo} />
        <ProyectoFotos trabajo={trabajo} />

        <div className="flex max-w-[68ch] flex-col gap-4">
          <p className="m-0 text-lg text-pretty">{trabajo.descripcion}</p>
          {trabajo.contenido.map((p, i) => (
            <p key={i} className="m-0 text-pretty">
              {p}
            </p>
          ))}
        </div>

        {trabajo.testimonio && (
          <figure className="m-0 flex max-w-[68ch] flex-col gap-3 border-y border-linea py-6">
            <blockquote className="m-0 text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] leading-[1.25] font-semibold text-pretty">
              «{trabajo.testimonio.texto}»
            </blockquote>
            <figcaption className="text-tinta-suave">{trabajo.testimonio.autor}</figcaption>
          </figure>
        )}

        {servicio && (
          <Link
            href={`/servicios/${servicio.slug}`}
            className={`${buttonVariants({ variant: "enlaceFlecha" })} self-start`}
          >
            Ver el servicio: {servicio.titulo}
            <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
          </Link>
        )}
      </article>

      {otros.length > 0 && (
        <section aria-labelledby="otros-proyectos" className={`${seccion} ${seccionBorde}`}>
          <div className="contenedor flex flex-col gap-[clamp(20px,2.4vw,32px)]">
            <h2
              id="otros-proyectos"
              className="m-0 text-[clamp(1.625rem,1.2rem+1.78vw,2.5rem)] leading-[1.1] font-bold tracking-[-0.02em] text-balance"
            >
              Otros proyectos
            </h2>
            <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
              {otros.map((t) => (
                <li key={t.slug}>
                  <TarjetaTrabajo trabajo={t} orientacion="vertical" nivel="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaFinal
        telefono={contacto.telefono}
        whatsapp={contacto.whatsapp}
        mensaje={mensajeTrabajo(trabajo)}
        conAsistente={false}
      />
    </>
  );
}
