import type { Pregunta } from "@andrei-leads/core";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { seccion, seccionBorde } from "@/lib/estilos";

type Props = {
  preguntas: Pregunta[];
  titulo?: string;
};

/** Preguntas frecuentes en acordeón (una abierta a la vez). Sin preguntas, nada. */
export function Preguntas({ preguntas, titulo = "Preguntas frecuentes" }: Props) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby="preguntas-titulo" className={`${seccion} ${seccionBorde}`}>
      <div className="contenedor">
        <div className="flex max-w-[880px] flex-col gap-4">
          <h2
            id="preguntas-titulo"
            className="m-0 text-[clamp(1.625rem,1.2rem+1.78vw,2.5rem)] leading-[1.1] font-bold tracking-[-0.02em] text-balance"
          >
            {titulo}
          </h2>
          <Accordion type="single" collapsible className="border-t border-tinta-suave">
            {preguntas.map((p, i) => (
              <AccordionItem key={`${p.pregunta}-${i}`} value={`p-${i}`}>
                <AccordionTrigger>{p.pregunta}</AccordionTrigger>
                <AccordionContent>{p.respuesta}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
