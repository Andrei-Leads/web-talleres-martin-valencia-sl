import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Migas } from "@/components/Migas";
import { BloqueAsistente } from "@/components/secciones/BloqueAsistente";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Marcas } from "@/components/secciones/Marcas";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosCatalogo } from "@/components/secciones/ServiciosCatalogo";
import { seccion, seccionBorde } from "@/lib/estilos";
import { mensajeGeneral } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

export default function Page() {
  const { contacto } = config;
  return (
    <>
      <div className="contenedor pt-4">
        <Migas items={[{ href: "/", texto: "Inicio" }, { texto: "Servicios" }]} />
      </div>
      {/* El catálogo es la cabecera de la página: lleva el <h1>. */}
      <ServiciosCatalogo servicios={config.servicios} titulo="Qué hacemos" nivel="h1" />
      <Marcas marcas={config.marcas} />
      {/* El título del asistente (h2) hace de encabezado de la sección. */}
      <section className={`${seccion} ${seccionBorde}`}>
        <div className="contenedor">
          <BloqueAsistente
            servicios={config.servicios.map((s) => s.titulo)}
            contacto={contacto}
            className="max-w-[720px]"
          />
        </div>
      </section>
      <Resenas
        resenas={config.resenas}
        valoracion={config.valoracion}
        fichaGoogle={contacto.fichaGoogle}
      />
      <CtaFinal
        telefono={contacto.telefono}
        whatsapp={contacto.whatsapp}
        mensaje={mensajeGeneral(contacto)}
        conAsistente
      />
    </>
  );
}
