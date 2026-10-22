import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { Migas } from "@/components/Migas";
import { Acreditaciones } from "@/components/secciones/Acreditaciones";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { EmpresaEquipo } from "@/components/secciones/EmpresaEquipo";
import { Garantias } from "@/components/secciones/Garantias";
import { Marcas } from "@/components/secciones/Marcas";
import { Proceso } from "@/components/secciones/Proceso";
import { Zonas } from "@/components/secciones/Zonas";
import config from "@/site.config";
import { mensajeGeneral } from "@/lib/mensajes";
import { seccion } from "@/lib/estilos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Quiénes somos" });

export default function Page() {
  const { negocio, empresa, contacto, acreditaciones, marcas, proceso, garantias, zonas } = config;
  const [principal, ...resto] = empresa.imagenes;
  const hayHistoria = empresa.historia.length > 0;
  // Con algún dato propio de la empresa, la página es «completa» y lleva también el proceso
  // (con los pasos por defecto si `proceso` está vacío). Con todo vacío: descripción + zonas + CTA.
  const hayEmpresa =
    hayHistoria ||
    empresa.imagenes.length > 0 ||
    empresa.equipo.length > 0 ||
    acreditaciones.length > 0 ||
    garantias.length > 0 ||
    marcas.length > 0 ||
    negocio.anioFundacion !== undefined;

  return (
    <>
      <section className={`contenedor flex flex-col gap-[clamp(20px,2.4vw,32px)] pt-2 ${seccion}`}>
        <Migas items={[{ href: "/", texto: "Inicio" }, { texto: "Quiénes somos" }]} />
        <div
          className={
            hayHistoria && principal
              ? "grid items-start gap-8 lg:grid-cols-2 lg:gap-14"
              : "flex flex-col gap-8"
          }
        >
          <div className="flex max-w-[68ch] flex-col gap-4">
            <h1 className="m-0 text-[clamp(1.75rem,1.09rem+2.8vw,3.125rem)] leading-[1.1] font-bold tracking-[-0.02em] text-balance">
              Quiénes somos
            </h1>
            <p className="m-0 text-lg text-tinta-suave text-pretty">{negocio.descripcionCorta}</p>
            {empresa.historia.map((p, i) => (
              <p key={i} className="m-0 text-pretty">
                {p}
              </p>
            ))}
          </div>
          {principal && (
            <Foto
              imagen={principal}
              proporcion="4/3"
              priority
              sizes={hayHistoria ? "(min-width: 1024px) 573px, 100vw" : "(min-width: 1200px) 1160px, 100vw"}
            />
          )}
        </div>
        {resto.length > 0 && (
          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {resto.map((img, i) => (
              <li key={`${img.src}-${i}`}>
                <Foto imagen={img} proporcion="4/3" sizes="(min-width: 1024px) 373px, (min-width: 640px) 50vw, 100vw" />
              </li>
            ))}
          </ul>
        )}
      </section>

      <EmpresaEquipo equipo={empresa.equipo} />
      <Acreditaciones acreditaciones={acreditaciones} />
      {/* Marcas lleva «Qué mirar en una ventana» fijo: en /empresa solo sale si hay marcas. */}
      {marcas.length > 0 && <Marcas marcas={marcas} />}
      {(proceso.length > 0 || hayEmpresa) && <Proceso proceso={proceso} />}
      <Garantias garantias={garantias} anioFundacion={negocio.anioFundacion} />
      <Zonas zonas={zonas} />

      <CtaFinal
        telefono={contacto.telefono}
        whatsapp={contacto.whatsapp}
        mensaje={mensajeGeneral(contacto)}
        conAsistente={false}
      />
    </>
  );
}
