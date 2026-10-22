import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Migas } from "@/components/Migas";
import { BloqueAsistente } from "@/components/secciones/BloqueAsistente";
import { ContactoDatos } from "@/components/secciones/ContactoDatos";
import { Zonas } from "@/components/secciones/Zonas";
import config from "@/site.config";
import { seccion } from "@/lib/estilos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

export default function Page() {
  const { contacto, servicios, zonas } = config;
  return (
    <>
      <section className={`contenedor flex flex-col gap-[clamp(20px,2.4vw,32px)] pt-2 ${seccion}`}>
        <Migas items={[{ href: "/", texto: "Inicio" }, { texto: "Contacto" }]} />
        <h1 className="m-0 text-[clamp(1.75rem,1.09rem+2.8vw,3.125rem)] leading-[1.1] font-bold tracking-[-0.02em] text-balance">
          Contacto
        </h1>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <BloqueAsistente servicios={servicios.map((s) => s.titulo)} contacto={contacto} />
          <ContactoDatos contacto={contacto} />
        </div>
      </section>
      <Zonas zonas={zonas} />
    </>
  );
}
