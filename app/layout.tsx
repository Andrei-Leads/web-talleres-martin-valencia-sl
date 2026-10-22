import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { Analitica, crearMetadatos, DatosEstructurados } from "@andrei-leads/core";
import "./globals.css";
import config from "@/site.config";
import { menu } from "@/lib/navegacion";
import { mensajeGeneral } from "@/lib/mensajes";
import { Cabecera } from "@/components/secciones/Cabecera";
import { Pie } from "@/components/secciones/Pie";
import { BarraMovil } from "@/components/secciones/BarraMovil";

// next/font la descarga en el build y la sirve desde la propia web.
const plex = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-plex",
});

export const metadata: Metadata = crearMetadatos(config);

/**
 * Pone la clase `js` en <html> antes del primer pintado. El acordeón de preguntas
 * (components/ui/accordion.tsx) solo oculta las respuestas cerradas bajo `.js`: sin JavaScript se ven todas.
 */
const SCRIPT_JS = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const items = menu(config);
  return (
    <html
      lang="es"
      // El script de abajo añade `js` antes de hidratar: la clase difiere a propósito del HTML del servidor.
      suppressHydrationWarning
      style={{ "--color-primario": config.marca.colorPrimario } as React.CSSProperties}
      className={`${plex.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_JS }} />
      </head>
      {/* Columna a pantalla completa: la barra móvil (sticky, último hijo) queda siempre al final. */}
      <body className="flex min-h-dvh flex-col font-sans">
        <DatosEstructurados config={config} />
        <Analitica config={config} />
        <Cabecera
          nombre={config.negocio.nombre}
          logo={config.negocio.logo}
          telefono={config.contacto.telefono}
          whatsapp={config.contacto.whatsapp}
          mensajeWhatsapp={mensajeGeneral(config.contacto)}
          items={items}
        />
        <main className="flex-1">{children}</main>
        <Pie
          negocio={config.negocio}
          contacto={config.contacto}
          redes={config.redes}
          items={items}
        />
        <BarraMovil
          telefono={config.contacto.telefono}
          whatsapp={config.contacto.whatsapp}
          mensaje={mensajeGeneral(config.contacto)}
        />
      </body>
    </html>
  );
}
