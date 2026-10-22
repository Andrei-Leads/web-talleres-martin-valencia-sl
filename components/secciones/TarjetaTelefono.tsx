import { BotonLlamada, type SiteConfig } from "@andrei-leads/core";
import { Phone, Ruler } from "lucide-react";

import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { horarioCorto, telefonoVisible } from "@/lib/formato";

type Props = {
  telefono: string;
  horario: SiteConfig["contacto"]["horario"];
  /** Nivel del título según la página. */
  titulo?: "h2" | "h3";
};

const PREGUNTAS = ["Qué necesitas", "Cuántas unidades", "Para cuándo"];

/**
 * Sustituye al asistente cuando no hay `contacto.whatsapp`: misma caja y misma sombra.
 * Componente de servidor, sin JavaScript. Dice qué se va a preguntar y lleva a la llamada.
 */
export function TarjetaTelefono({ telefono, horario, titulo: Titulo = "h2" }: Props) {
  return (
    <Card className="gap-2.5 overflow-visible px-4 pt-3 pb-4 shadow-asistente lg:gap-3.5 lg:px-6 lg:pt-[22px] lg:pb-6">
      <Titulo
        id="asistente-titulo"
        tabIndex={-1}
        className="m-0 text-[19px] leading-[1.25] font-bold tracking-[-0.01em] lg:text-[23px]"
      >
        Cuéntanos por teléfono
      </Titulo>
      <p className="m-0 text-base leading-[1.4] text-tinta-suave">
        Te preguntaremos qué necesitas, cuántas unidades y para cuándo.
      </p>
      <ol role="list" className="m-0 flex list-none flex-col border-t border-linea p-0">
        {PREGUNTAS.map((texto, i) => (
          <li
            key={texto}
            className="flex min-h-10 items-center gap-3 border-b border-linea font-semibold lg:min-h-[46px]"
          >
            <span
              aria-hidden="true"
              className="grid size-7 flex-none place-items-center rounded-etiqueta border border-tinta-suave text-[13px] tabular-nums"
            >
              {i + 1}
            </span>
            {texto}
          </li>
        ))}
      </ol>
      <div className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-3 rounded-tarjeta bg-primario-tinte p-2 lg:grid-cols-[44px_minmax(0,1fr)] lg:p-3">
        <span className="grid size-10 place-items-center rounded-tarjeta border border-tinta-suave bg-tarjeta text-tinta lg:size-11">
          <Ruler aria-hidden="true" strokeWidth={1.5} className="size-6" />
        </span>
        <p className="m-0 text-[15px] leading-[1.35] font-semibold">
          Ten a mano las medidas aproximadas del hueco
        </p>
      </div>
      <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaTarjeta" })}>
        <Phone aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
        <span>Llamar al {telefonoVisible(telefono)}</span>
      </BotonLlamada>
      {horario.length > 0 && (
        <p className="m-0 text-center text-sm leading-[1.4] text-tinta-suave">{horarioCorto(horario)}</p>
      )}
    </Card>
  );
}
