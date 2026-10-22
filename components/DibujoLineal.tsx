import { cn } from "@/lib/utils";

type Props = {
  /** Título del servicio: de él se elige el dibujo (sin acentos, por palabras). */
  titulo: string;
  className?: string;
};

type Tipo =
  | "corredera"
  | "oscilobatiente"
  | "cerramiento"
  | "persiana"
  | "mosquitera"
  | "puerta"
  | "mampara"
  | "ventana";

/** Elige el dibujo por palabras del título. El orden importa: lo más específico primero. */
function tipoDe(titulo: string): Tipo {
  const t = titulo.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  if (/persian|lama|enrollable/.test(t)) return "persiana";
  if (/mosquit/.test(t)) return "mosquitera";
  if (/mampara|ducha|banera/.test(t)) return "mampara";
  if (/puerta|portal|acceso/.test(t)) return "puerta";
  if (/cerramiento|terraza|porche|balcon/.test(t)) return "cerramiento";
  if (/corredera|correder/.test(t)) return "corredera";
  if (/oscilo|batiente|abatible/.test(t)) return "oscilobatiente";
  return "ventana";
}

/** Rectángulo de hoja: marco exterior blanco + marco interior. */
function Hoja({ x, y, w, h, hueco = 6 }: { x: number; y: number; w: number; h: number; hueco?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} className="fill-tarjeta" />
      <rect x={x + hueco} y={y + hueco} width={w - hueco * 2} height={h - hueco * 2} />
    </>
  );
}

function Contenido({ tipo }: { tipo: Tipo }) {
  switch (tipo) {
    case "corredera":
      return (
        <>
          <rect x="8" y="22" width="84" height="56" className="fill-tarjeta" />
          <rect x="13" y="27" width="36" height="46" />
          <rect x="51" y="27" width="36" height="46" />
          <path d="M18 50h8M74 50h8" />
        </>
      );
    case "cerramiento":
      return (
        <>
          <rect x="4" y="20" width="92" height="60" className="fill-tarjeta" />
          <rect x="8" y="24" width="21" height="52" />
          <rect x="30" y="24" width="21" height="52" />
          <rect x="52" y="24" width="21" height="52" />
          <rect x="74" y="24" width="18" height="52" />
        </>
      );
    case "persiana":
      return (
        <>
          <rect x="16" y="8" width="68" height="10" className="fill-tarjeta" />
          <rect x="20" y="18" width="60" height="74" className="fill-tarjeta" />
          <path d="M20 26h60M20 34h60M20 42h60M20 50h60M20 58h60M20 66h60M20 74h60M20 82h60" />
        </>
      );
    case "mosquitera":
      return (
        <>
          <rect x="14" y="14" width="72" height="72" className="fill-tarjeta" />
          <rect x="20" y="20" width="60" height="60" />
          <path d="M20 32h60M20 44h60M20 56h60M20 68h60M32 20v60M44 20v60M56 20v60M68 20v60" strokeWidth="0.75" />
        </>
      );
    case "puerta":
      return (
        <>
          <Hoja x={28} y={6} w={44} h={88} hueco={6} />
          <circle cx="62" cy="52" r="2.5" />
        </>
      );
    case "mampara":
      return (
        <>
          <Hoja x={10} y={8} w={38} h={84} hueco={5} />
          <Hoja x={52} y={8} w={38} h={84} hueco={5} />
          <path d="M42 50h2M56 50h2" />
        </>
      );
    case "oscilobatiente":
      return (
        <>
          <Hoja x={20} y={10} w={60} h={80} />
          {/* Líneas de apertura (abatible) */}
          <path d="M26 16l48 68M74 16l-48 68" strokeDasharray="3 3" strokeWidth="0.75" />
          <path d="M70 50h4" />
        </>
      );
    default:
      return (
        <>
          <Hoja x={20} y={10} w={60} h={80} />
          <path d="M70 50h4" />
        </>
      );
  }
}

/** Dibujo lineal (plano) de una ventana, puerta, persiana… para tarjetas sin foto. Decorativo. */
export function DibujoLineal({ titulo, className }: Props) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={cn("h-24 w-auto text-tinta-suave", className)}
    >
      <Contenido tipo={tipoDe(titulo)} />
    </svg>
  );
}
