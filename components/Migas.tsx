import Link from "next/link";

import { migas } from "@/lib/estilos";

type Item = { href?: string; texto: string };

/** Migas: Inicio › Servicios › … El último elemento es la página actual. */
export function Migas({ items }: { items: Item[] }) {
  return (
    <nav aria-label="Migas" className={migas.nav}>
      <ol className={migas.lista}>
        {items.map((item, i) => {
          const ultimo = i === items.length - 1;
          return (
            <li key={`${i}-${item.texto}`} className={migas.item}>
              {item.href && !ultimo ? (
                <Link href={item.href} className={migas.enlace}>
                  {item.texto}
                </Link>
              ) : (
                <span aria-current={ultimo ? "page" : undefined} className={migas.actual}>
                  {item.texto}
                </span>
              )}
              {!ultimo && (
                <span aria-hidden="true" className="px-1.5 text-tinta-suave">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
