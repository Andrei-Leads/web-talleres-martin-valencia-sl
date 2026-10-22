import config from "@/site.config";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { Hero } from "@/components/secciones/Hero";
import { Marcas } from "@/components/secciones/Marcas";
import { Preguntas } from "@/components/secciones/Preguntas";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosCatalogo } from "@/components/secciones/ServiciosCatalogo";
import { TrabajosLista } from "@/components/secciones/TrabajosLista";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeGeneral } from "@/lib/mensajes";

// Inicio: el Hero (con el asistente) lleva el único <h1>; el resto son h2.
export default function Page() {
  const { negocio, contacto } = config;
  const imagen = config.imagenesHero[0] ?? config.trabajos[0]?.imagenes[0];
  return (
    <>
      <Hero
        sector={negocio.sector}
        descripcionCorta={negocio.descripcionCorta}
        ciudad={contacto.direccion.ciudad}
        valoracion={config.valoracion}
        imagen={imagen}
        servicios={config.servicios.map((s) => s.titulo)}
        contacto={contacto}
      />
      <Resenas
        resenas={config.resenas}
        valoracion={config.valoracion}
        fichaGoogle={contacto.fichaGoogle}
        max={3}
      />
      <ServiciosCatalogo servicios={config.servicios} max={6} verTodos />
      <Marcas marcas={config.marcas} />
      <TrabajosLista trabajos={config.trabajos} galeria={config.galeria} max={3} verTodos />
      <Proceso proceso={config.proceso} />
      <Garantias garantias={config.garantias} anioFundacion={negocio.anioFundacion} />
      <Zonas zonas={config.zonas} />
      <Preguntas preguntas={config.preguntas} />
      <CtaFinal
        telefono={contacto.telefono}
        whatsapp={contacto.whatsapp}
        mensaje={mensajeGeneral(contacto)}
        conAsistente
      />
    </>
  );
}
