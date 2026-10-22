"use client";

import { useId, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

const LARGA = 150;
const noSuscribir = () => () => {};

/**
 * Texto de una reseña. Si pasa de 150 caracteres se corta a 5 líneas con CSS
 * (el texto completo sigue en el HTML) y, al montar, aparece «Leer más / Leer menos».
 * Sin JavaScript no hay botón, pero el texto entero está en la página para lectores de pantalla.
 */
export function ResenaTexto({ texto }: { texto: string }) {
  const id = useId();
  const [abierto, setAbierto] = useState(false);
  // false en el servidor y en la hidratación; true ya montado.
  const montado = useSyncExternalStore(noSuscribir, () => true, () => false);
  const larga = texto.length > LARGA;

  return (
    <>
      <p id={id} className={cn("m-0 text-base leading-[1.55] text-pretty", larga && !abierto && "line-clamp-5")}>
        {texto}
      </p>
      {larga && montado && (
        <button
          type="button"
          aria-expanded={abierto}
          aria-controls={id}
          onClick={() => setAbierto((a) => !a)}
          className="-my-2 inline-flex min-h-11 cursor-pointer items-center self-start text-sm font-semibold text-tinta underline underline-offset-4 hover:decoration-2"
        >
          {abierto ? "Leer menos" : "Leer más"}
        </button>
      )}
    </>
  );
}
