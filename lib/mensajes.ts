import type { SiteConfig, Servicio, Trabajo } from "@andrei-leads/core";

export const MENSAJE_GENERICO = "Hola, os escribo desde vuestra web.";

/** Página 404 (app/not-found.tsx). */
export const MENSAJE_NO_ENCONTRADA = "Hola, buscaba una página en vuestra web y no la encontré.";

export function mensajeGeneral(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return contacto.mensajeWhatsapp ?? MENSAJE_GENERICO;
}

export function mensajeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return servicio.mensajeWhatsapp ?? "Hola, quiero información sobre " + servicio.titulo;
}

export function mensajeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return `Hola, he visto el trabajo «${trabajo.titulo}» y quiero algo parecido`;
}

/**
 * Mensaje final del asistente de presupuesto.
 * `otro` (o sin servicio) = «otro trabajo de carpintería metálica».
 */
export function mensajeAsistente({
  servicio,
  otro,
  unidades,
  plazo,
}: {
  servicio?: string;
  otro?: boolean;
  unidades: string;
  plazo: string;
}): string {
  const necesito =
    otro || !servicio
      ? "Necesito otro trabajo de carpintería metálica."
      : `Necesito: ${servicio}.`;
  return `${MENSAJE_GENERICO} ${necesito} Unidades: ${unidades}. Para: ${plazo.toLowerCase()}. Os envío una foto del hueco con un metro.`;
}
