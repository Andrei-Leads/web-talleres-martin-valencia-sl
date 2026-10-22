import { formatearHorario, type SiteConfig } from "@andrei-leads/core";

type Contacto = SiteConfig["contacto"];

/** "+34600000000" → "600 00 00 00". Si no son 9 dígitos, lo devuelve tal cual. */
export function telefonoVisible(telefono: string): string {
  const d = telefono.replace(/\D/g, "").replace(/^34(?=\d{9}$)/, "");
  return d.length === 9
    ? `${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7)}`
    : telefono;
}

/** Enlace "Cómo llegar" a Google Maps (un enlace, no un iframe: sin cookies de terceros). */
export function enlaceMaps(direccion: Contacto["direccion"]): string {
  const { calle, cp, ciudad, provincia } = direccion;
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${calle}, ${cp} ${ciudad}, ${provincia}`)
  );
}

/** ["a", "b", "c"] → "a, b y c". */
export function listaY(lista: string[]): string {
  if (lista.length < 2) return lista.join("");
  return lista.slice(0, -1).join(", ") + " y " + lista[lista.length - 1];
}

/** "Lunes a viernes 8:00–18:00 · Sábados 9:00–13:00". */
export function horarioCorto(horario: Contacto["horario"]): string {
  return formatearHorario(horario).map((h) => `${h.dias} ${h.horas}`).join(" · ");
}

/** "★★★★☆" para una puntuación de 1 a 5. */
export function estrellas(puntuacion: number): string {
  const n = Math.max(0, Math.min(5, Math.round(puntuacion)));
  return "★".repeat(n) + "☆".repeat(5 - n);
}

/** 4.7 → "4,7". */
export function mediaVisible(media: number): string {
  return media.toFixed(1).replace(".", ",");
}

/** "2026-10-02" → "2 de octubre de 2026"; "2026-10" → "octubre de 2026". Sin Date: no depende de la zona horaria. */
export function fechaLegible(fecha: string): string {
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  const [anio, mes, dia] = fecha.split("-");
  const nombreMes = meses[Number(mes) - 1];
  if (!anio || !nombreMes) return fecha;
  return dia ? `${Number(dia)} de ${nombreMes} de ${anio}` : `${nombreMes} de ${anio}`;
}

export type Ancla = { href: string; texto: string };

/** Redes con URL, en orden fijo. */
export function listaRedes(redes: SiteConfig["redes"]): Ancla[] {
  const lista: Ancla[] = [];
  if (redes.instagram) lista.push({ href: redes.instagram, texto: "Instagram" });
  if (redes.facebook) lista.push({ href: redes.facebook, texto: "Facebook" });
  return lista;
}

/** "Calle de Ejemplo 7, bajo, 46920 Mislata (Valencia)". */
export function direccionLinea(d: Contacto["direccion"]): string {
  return `${d.calle}, ${d.cp} ${d.ciudad} (${d.provincia})`;
}

/** Email provisional (dominio reservado `.invalid`): se oculta en el pie y en /contacto. Las legales lo siguen mostrando. */
export function emailVisible(email: string): boolean {
  return !email.endsWith(".invalid");
}
