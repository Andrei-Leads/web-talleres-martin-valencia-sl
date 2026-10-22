import type { Metadata } from "next";
import { PoliticaCookies, metadatosPagina } from "@andrei-leads/core";
import config from "@/site.config";
import { Migas } from "@/components/Migas";
import { LecturaLegal } from "@/components/LecturaLegal";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/cookies", titulo: "Política de cookies", indexable: false });

// El <h1> lo pone core; aquí solo van las migas y la columna de lectura.
export default function Page() {
  return (
    <div className="contenedor pt-4 pb-[clamp(32px,5vw,64px)]">
      <LecturaLegal>
        {/* Migas alineadas con el texto de core (su <article> lleva px-6). */}
        <div className="px-6">
          <Migas items={[{ href: "/", texto: "Inicio" }, { texto: "Política de cookies" }]} />
        </div>
        <PoliticaCookies config={config} />
      </LecturaLegal>
    </div>
  );
}
