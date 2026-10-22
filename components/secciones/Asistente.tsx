"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BotonWhatsApp } from "@andrei-leads/core";
import { ChevronLeft, MessageCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { mensajeAsistente } from "@/lib/mensajes";
import { cn } from "@/lib/utils";
import { AsistentePregunta } from "./AsistentePregunta";
import { AsistenteResumen } from "./AsistenteResumen";

type Props = {
  /** Títulos de los servicios (un chip por servicio). */
  servicios: string[];
  /** contacto.whatsapp */
  numero: string;
  /** Mensaje del botón «Escribir por WhatsApp» (sin JavaScript). */
  mensajeDirecto: string;
  /** Servicio ya decidido (p. ej. la página /servicios/[slug]): el asistente empieza en el paso 2. */
  servicioFijo?: string;
};

const UNIDADES = ["1", "2–3", "4–6", "Más de 6", "No lo sé"];
const PLAZOS = ["Lo antes posible", "En 1–3 meses", "Solo estoy mirando"];
const OTRO = "Otro";
/** Con 7 o más servicios se muestran 6 + «Otro». */
const MAX_CHIPS = 6;
const PREGUNTAS = { 1: "¿Qué necesitas?", 2: "¿Cuántas unidades?", 3: "¿Para cuándo?" } as const;

// useSyncExternalStore da `false` al hidratar (= HTML del servidor) y `true` justo después:
// el primer render del cliente coincide con el del servidor sin setState en un efecto.
const sinSuscripcion = () => () => {};
const alMontar = () => true;
const enServidor = () => false;

/**
 * Asistente de WhatsApp: 3 toques (qué, cuántas unidades, para cuándo) que solo componen el
 * mensaje de BotonWhatsApp. No guarda ni envía datos. Única pieza con JavaScript de la página.
 *
 * Altura estable: las cuatro vistas (pasos 1–3 y resumen) están siempre en el DOM, apiladas en
 * la misma celda de una rejilla CSS; solo la activa es visible (las demás `invisible` + `inert`).
 * La celda mide lo que la vista más alta, a cualquier ancho, sin medir con JS ni estimar filas.
 * El resumen "fantasma" usa los valores más largos para que el salto de línea no cambie la altura.
 *
 * Sin JavaScript: el servidor pinta el título y «Escribir por WhatsApp» sobre esa misma
 * celda (las vistas, invisibles, reservan el hueco). Al montar, el botón se retira y aparece el paso 1.
 */
export function Asistente({ servicios, numero, mensajeDirecto, servicioFijo }: Props) {
  const montado = useSyncExternalStore(sinSuscripcion, alMontar, enServidor);

  const fijo = servicioFijo ?? (servicios.length === 1 ? servicios[0] : undefined);
  const primero = fijo ? 2 : 1;
  const total = fijo ? 2 : 3;
  const opcionesServicio =
    servicios.length >= 7 ? [...servicios.slice(0, MAX_CHIPS), OTRO] : servicios;

  const [paso, setPaso] = useState(primero);
  const [servicio, setServicio] = useState<string>();
  const [unidades, setUnidades] = useState<string>();
  const [plazo, setPlazo] = useState<string>();
  const [tocado, setTocado] = useState(false); // ya hubo interacción (para el aria-live)
  const [desdeResumen, setDesdeResumen] = useState(false); // «Cambiar»: tras elegir, vuelve al resumen

  const pasoActual = Math.max(paso, primero);
  const enResumen = pasoActual === 4;
  const servicioElegido = fijo ?? servicio;

  // Foco: al cambiar de paso (por una acción del usuario) va a la legend / título del paso.
  const titulos = useRef<Record<number, HTMLElement | null>>({});
  const moverFoco = useRef(false);
  useEffect(() => {
    if (!moverFoco.current) return;
    moverFoco.current = false;
    titulos.current[pasoActual]?.focus();
  }, [pasoActual]);

  function irA(n: number) {
    moverFoco.current = true;
    setTocado(true);
    setPaso(n);
  }

  function elegir(valor: string) {
    if (pasoActual === 1) setServicio(valor);
    else if (pasoActual === 2) setUnidades(valor);
    else setPlazo(valor);
    const siguiente = desdeResumen ? 4 : pasoActual + 1;
    if (siguiente === 4) setDesdeResumen(false);
    irA(siguiente);
  }

  function cambiar(n: number) {
    setDesdeResumen(true);
    irA(n);
  }

  function atras() {
    if (desdeResumen) {
      setDesdeResumen(false);
      irA(4);
    } else {
      irA(pasoActual - 1);
    }
  }

  const otro = !fijo && servicio === OTRO;
  const mensaje = mensajeAsistente({
    servicio: servicioElegido,
    otro,
    unidades: unidades ?? "",
    plazo: plazo ?? "",
  });

  // Valores del resumen: los reales si está activo; si no, los más largos (solo reservan altura).
  const masLargo = (lista: string[]) => lista.reduce((a, b) => (b.length > a.length ? b : a), "");
  const filas = [
    ...(fijo
      ? [{ clave: "Qué", valor: fijo, lector: " servicio" }]
      : [
          {
            clave: "Qué",
            valor: enResumen ? (servicio ?? "") : masLargo(opcionesServicio),
            lector: " servicio",
            onCambiar: () => cambiar(1),
          },
        ]),
    {
      clave: "Unidades",
      valor: enResumen ? (unidades ?? "") : masLargo(UNIDADES),
      lector: " unidades",
      onCambiar: () => cambiar(2),
    },
    {
      clave: "Para",
      valor: enResumen ? (plazo ?? "") : masLargo(PLAZOS),
      lector: " plazo",
      onCambiar: () => cambiar(3),
    },
  ];

  const idx = pasoActual - primero;
  const textoPaso = enResumen ? "Listo para enviar" : `Paso ${idx + 1} de ${total}`;
  const anuncio = !tocado
    ? ""
    : enResumen
      ? "Resumen listo para enviar. Revisa y envía por WhatsApp."
      : `Paso ${idx + 1} de ${total}. ${PREGUNTAS[pasoActual as 1 | 2 | 3]}`;
  const puedeAtras = pasoActual > primero;

  return (
    <Card className="gap-0 overflow-visible px-4 pt-3 pb-4 shadow-asistente lg:px-6 lg:pt-[22px] lg:pb-6">
      <h2
        id="asistente-titulo"
        tabIndex={-1}
        className="m-0 text-[17px] leading-[1.25] font-bold tracking-[-0.01em] lg:text-[21px]"
      >
        Pide tu presupuesto en {total} toques
      </h2>
      <span aria-live="polite" className="sr-only">
        {anuncio}
      </span>

      <div className="grid">
        {/* Capa del servidor / sin JavaScript. Se retira al montar. */}
        {!montado && (
          <div className="col-start-1 row-start-1 pt-1">
            <BotonWhatsApp
              numero={numero}
              mensaje={mensajeDirecto}
              className={buttonVariants({ variant: "whatsappDirecto" })}
            >
              <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none" />
              <span>Escribir por WhatsApp</span>
            </BotonWhatsApp>
          </div>
        )}

        {/* Capa interactiva: siempre en el DOM (reserva la altura); invisible hasta montar. */}
        <div
          inert={!montado}
          className={cn("col-start-1 row-start-1 flex min-w-0 flex-col", !montado && "invisible")}
        >
          <div className="mt-1 flex min-h-11 items-center gap-2.5">
            {puedeAtras && (
              <button
                type="button"
                onClick={atras}
                className={cn(buttonVariants({ variant: "textoAtras" }), "-ml-2 flex-none text-[15px] font-semibold")}
              >
                <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-[18px]" />
                Atrás
              </button>
            )}
            {/* Progreso visual: aria-hidden; el texto «Paso n de N» es el que cuenta. */}
            <div aria-hidden="true" className="flex flex-1 gap-1">
              {Array.from({ length: total }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-[3px] flex-1 rounded-[2px]",
                    enResumen || i < idx ? "bg-primario" : i === idx ? "bg-tinta" : "bg-linea"
                  )}
                />
              ))}
            </div>
            <span className="flex-none text-[13px] font-medium text-tinta-suave tabular-nums">{textoPaso}</span>
          </div>

          <div className="grid pt-1.5">
            {!fijo && (
              <AsistentePregunta
                pregunta={PREGUNTAS[1]}
                opciones={opcionesServicio}
                valor={servicio}
                activo={montado && pasoActual === 1}
                onElegir={elegir}
                legendRef={(el) => {
                  titulos.current[1] = el;
                }}
              />
            )}
            <AsistentePregunta
              pregunta={PREGUNTAS[2]}
              opciones={UNIDADES}
              valor={unidades}
              activo={montado && pasoActual === 2}
              onElegir={elegir}
              legendRef={(el) => {
                titulos.current[2] = el;
              }}
            />
            <AsistentePregunta
              pregunta={PREGUNTAS[3]}
              opciones={PLAZOS}
              valor={plazo}
              activo={montado && pasoActual === 3}
              onElegir={elegir}
              legendRef={(el) => {
                titulos.current[3] = el;
              }}
            />
            <AsistenteResumen
              filas={filas}
              numero={numero}
              mensaje={mensaje}
              activo={montado && enResumen}
              tituloRef={(el) => {
                titulos.current[4] = el;
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
