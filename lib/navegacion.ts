import type { SiteConfig } from "@andrei-leads/core";
import type { Ancla } from "./formato";

/** /trabajos existe si hay trabajos o, al menos, fotos en la galería. */
export function hayTrabajos(config: Pick<SiteConfig, "trabajos" | "galeria">): boolean {
  return config.trabajos.length > 0 || config.galeria.length > 0;
}

/** Menú de cabecera y pie: Servicios · Proyectos (solo si existe la ruta) · Empresa · Contacto. */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria">): Ancla[] {
  const items: Ancla[] = [{ href: "/servicios", texto: "Servicios" }];
  if (hayTrabajos(config)) items.push({ href: "/trabajos", texto: "Proyectos" });
  items.push({ href: "/empresa", texto: "Empresa" });
  items.push({ href: "/contacto", texto: "Contacto" });
  return items;
}
