import { cacheLife } from "next/cache";

/**
 * Año actual para el © del pie.
 *
 * Con `cacheComponents: true`, leer la hora (`new Date()`) durante el prerender
 * rompe el build. Dentro de una función con "use cache" sí se permite: el
 * resultado se guarda en caché y entra en el HTML estático. Con
 * cacheLife("days") la página se revalida como mucho cada día, así que el año
 * cambia solo el 1 de enero sin volver a desplegar.
 */
export async function anioActual(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
