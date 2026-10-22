import type { Metadata } from "next";
import { metadatosPagina, type Trabajo } from "@andrei-leads/core";
import { notFound } from "next/navigation";

import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { Migas } from "@/components/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { GaleriaRejilla } from "@/components/secciones/GaleriaRejilla";
import { TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import config from "@/site.config";
import { hayTrabajos } from "@/lib/navegacion";
import { mensajeGeneral } from "@/lib/mensajes";
import { seccion } from "@/lib/estilos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Proyectos" });

const chip =
  "inline-flex min-h-11 items-center rounded-chip border border-tinta-suave bg-primario-tinte px-4 text-[15px] font-semibold text-tinta hover:bg-tarjeta";

function Rejilla({ trabajos, nivel }: { trabajos: Trabajo[]; nivel: "h2" | "h3" }) {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
      {trabajos.map((t) => (
        <li key={t.slug}>
          <TarjetaTrabajo trabajo={t} orientacion="vertical" nivel={nivel} />
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, servicios, galeria, contacto } = config;
  const conTrabajos = trabajos.length > 0;

  // Grupos por servicio (en el orden de los servicios) + los que no tienen servicio.
  const grupos = servicios
    .map((s) => ({ slug: s.slug, titulo: s.titulo, items: trabajos.filter((t) => t.servicio === s.slug) }))
    .filter((g) => g.items.length > 0);
  const slugsGrupo = new Set(grupos.map((g) => g.slug));
  const otros = trabajos.filter((t) => !t.servicio || !slugsGrupo.has(t.servicio));
  const conFiltro = grupos.length >= 2 && trabajos.length >= 4;

  return (
    <>
      <section className={`contenedor flex flex-col gap-[clamp(20px,2.4vw,32px)] pt-2 ${seccion}`}>
        <Migas items={[{ href: "/", texto: "Inicio" }, { texto: "Proyectos" }]} />
        <EncabezadoSeccion
          cota="proyectos"
          titulo="Proyectos"
          nivel="h1"
          entradilla={conTrabajos ? "Trabajos que hemos medido, fabricado e instalado nosotros." : undefined}
        />

        {!conTrabajos ? (
          <GaleriaRejilla galeria={galeria} />
        ) : conFiltro ? (
          <>
            <nav aria-label="Ir a un servicio" className="border-y border-linea py-3.5">
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                <li>
                  <a href="#proyectos-lista" className={chip}>
                    Todos
                  </a>
                </li>
                {grupos.map((g) => (
                  <li key={g.slug}>
                    <a href={`#servicio-${g.slug}`} className={chip}>
                      {g.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div id="proyectos-lista" className="flex flex-col gap-[clamp(32px,4vw,56px)]">
              {grupos.map((g) => (
                <section key={g.slug} id={`servicio-${g.slug}`} aria-labelledby={`titulo-${g.slug}`} className="flex flex-col gap-5">
                  <h2 id={`titulo-${g.slug}`} className="m-0 text-[clamp(1.375rem,1.2rem+0.8vw,1.75rem)] leading-[1.15] font-bold tracking-[-0.01em]">
                    {g.titulo}
                  </h2>
                  <Rejilla trabajos={g.items} nivel="h3" />
                </section>
              ))}
              {otros.length > 0 && (
                <section id="servicio-otros" aria-labelledby="titulo-otros" className="flex flex-col gap-5">
                  <h2 id="titulo-otros" className="m-0 text-[clamp(1.375rem,1.2rem+0.8vw,1.75rem)] leading-[1.15] font-bold tracking-[-0.01em]">
                    Otros proyectos
                  </h2>
                  <Rejilla trabajos={otros} nivel="h3" />
                </section>
              )}
            </div>
          </>
        ) : (
          <Rejilla trabajos={trabajos} nivel="h2" />
        )}
      </section>
      <CtaFinal
        telefono={contacto.telefono}
        whatsapp={contacto.whatsapp}
        mensaje={mensajeGeneral(contacto)}
        conAsistente={false}
      />
    </>
  );
}
