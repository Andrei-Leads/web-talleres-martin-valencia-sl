"use client";

import type { ReactNode, MouseEvent } from "react";
import Link from "next/link";

type Props = {
  className?: string;
  children: ReactNode;
  /** Se llama al pulsar (p. ej. para cerrar el menú móvil). */
  onNavegar?: () => void;
};

/**
 * «Pedir presupuesto». Si la página tiene el asistente (`#asistente`), hace scroll suave hasta él
 * (con el offset de la cabecera, que da `scroll-padding-top`) y lleva el foco a su título.
 * Si no, navega a /contacto#asistente. La decisión se toma en el clic: el HTML del servidor
 * (y sin JavaScript) siempre apunta a /contacto#asistente.
 */
export function EnlacePresupuesto({ className, children, onNavegar }: Props) {
  function alPulsar(e: MouseEvent<HTMLAnchorElement>) {
    onNavegar?.();
    const asistente = document.getElementById("asistente");
    if (!asistente) return; // Link navega a /contacto#asistente
    e.preventDefault();
    const ir = () => {
      const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      asistente.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "start" });
      document.getElementById("asistente-titulo")?.focus({ preventScroll: true });
    };
    // Si venimos del menú, esperamos a que el panel se cierre y suelte el bloqueo de scroll.
    if (onNavegar) window.setTimeout(ir, 60);
    else ir();
  }

  return (
    <Link href="/contacto#asistente" onClick={alPulsar} className={className}>
      {children}
    </Link>
  );
}
