// Demo de Talleres Martín (La Zaïdia, València) sobre carpinteria-metalica-1 «Medida».
// Datos: ficha de Google, Páginas Amarillas y llamada del 22/10/2026 (Notion «Leads en seguimiento»).
// Fotos: la fachada (Street View) es la única propia; el resto, de ejemplo (IA) con su etiqueta.
// DEMO con los números reales del negocio (decisión de Ysst); seo.indexar sin activar.
// Sin precios, marcas, acreditaciones ni trabajos: no hay datos ni fotos validados por el cliente.
// La sociedad Talleres Martin Valencia S.L. se disolvió en 04/2025: sin su CIF ni «S.L.».
import { defineSiteConfig } from "@andrei-leads/core";

const f = (archivo: string) => `/fotos/${archivo}.jpg`;

export default defineSiteConfig({
  negocio: {
    nombre: "Talleres Martín",
    nombreLegal: "Talleres Martín", // PENDIENTE: nombre del titular actual (¿autónomo?), pedírselo a Martín
    nif: "PENDIENTE", // PENDIENTE: NIF del titular actual
    sector: "Carpintería de aluminio",
    descripcionCorta:
      "Ventanas Climalit, persianas, puertas de aluminio, mosquiteras y rejas a medida en València. Desde 1997, con exposición en la calle Sagunt.",
    anioFundacion: 1997,
    tipoSchema: ["HomeAndConstructionBusiness"],
  },
  contacto: {
    telefono: "+34963680051", // Fijo del negocio (el de Google y el del rótulo)
    whatsapp: "+34679923353", // Móvil de Martín (nos lo dio él para WhatsApp)
    email: "pendiente@talleres-martin.invalid", // PENDIENTE: no tiene email conocido. `.invalid` lo oculta en pie y /contacto
    direccion: { calle: "C/ de Sagunt, 149", cp: "46009", ciudad: "València", provincia: "Valencia" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "08:30", cierra: "14:00" },
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "15:30", cierra: "19:00" },
      { dias: ["viernes"], abre: "08:30", cierra: "14:00" },
      { dias: ["viernes"], abre: "15:30", cierra: "18:30" },
    ],
    coordenadas: { lat: 39.488871, lng: -0.375219 },
    mensajeWhatsapp: "Hola Martín, te escribo desde tu web. Quiero presupuesto para:",
    fichaGoogle: "https://www.google.com/maps/place/?q=place_id:ChIJDbr7Lv5FYA0Ruff628oO8-Q",
  },
  zonas: ["València"],
  valoracion: { media: 4.7, total: 12 },
  imagenesHero: [
    { src: "/ejemplo/hero.jpg", alt: "Salón con ventanal corredero de aluminio gris abierto a una terraza" },
  ],
  servicios: [
    {
      titulo: "Ventanas de aluminio con Climalit",
      descripcion: "Ventanas a medida con doble acristalamiento Climalit, que aíslan del frío, del calor y del ruido.",
      contenido: [
        "Fabricamos e instalamos ventanas de aluminio a medida de cada hueco, con doble acristalamiento Climalit para que la casa pierda menos calor en invierno y se oiga menos la calle.",
        "Te ayudamos a elegir la apertura que mejor te viene: corredera, abatible u oscilobatiente.",
      ],
      incluye: ["Medición en tu casa", "Fabricación a medida", "Retirada de la ventana vieja", "Instalación"],
      imagenes: [
        { src: "/ejemplo/servicio-corredera.jpg", alt: "Ventana corredera de aluminio en un salón luminoso" },
        { src: "/ejemplo/servicio-oscilobatiente.jpg", alt: "Ventana oscilobatiente blanca entreabierta en un dormitorio" },
      ],
      preguntas: [
        {
          pregunta: "¿Qué es el Climalit?",
          respuesta: "Es un doble acristalamiento: dos vidrios con una cámara de aire entre ellos. Aísla mucho mejor que un vidrio simple, del frío y del ruido.",
        },
      ],
      mensajeWhatsapp: "Hola Martín, quiero presupuesto para ventanas con Climalit. Te cuento cuántas y de qué tamaño:",
    },
    {
      titulo: "Persianas",
      descripcion: "Persianas de aluminio nuevas, cambio de lamas, cintas y recogedores.",
      contenido: [
        "Instalamos persianas de aluminio a medida, solas o junto con la ventana nueva.",
        "Si la persiana que tienes está bien, muchas veces basta con cambiar las lamas rotas, la cinta o el recogedor.",
      ],
      incluye: ["Medición", "Persiana a medida", "Instalación"],
      imagenes: [{ src: "/ejemplo/servicio-persiana.jpg", alt: "Persiana de aluminio a medio bajar en una fachada" }],
      mensajeWhatsapp: "Hola Martín, quiero presupuesto para una persiana. Te envío una foto:",
    },
    {
      titulo: "Puertas de aluminio",
      descripcion: "Puertas de entrada, de terraza y de local, de aluminio y a medida.",
      contenido: ["Fabricamos e instalamos puertas de aluminio para viviendas, terrazas y locales, a medida del hueco."],
      imagenes: [{ src: "/ejemplo/servicio-puerta.jpg", alt: "Puerta de entrada de aluminio gris en un chalet" }],
      mensajeWhatsapp: "Hola Martín, quiero presupuesto para una puerta de aluminio. Te envío una foto:",
    },
    {
      titulo: "Mosquiteras",
      descripcion: "Mosquiteras a medida para ventanas y puertas.",
      imagenes: [{ src: "/ejemplo/servicio-mosquitera.jpg", alt: "Mosquitera enrollable instalada en una ventana" }],
      mensajeWhatsapp: "Hola Martín, quiero presupuesto para mosquiteras. Te digo cuántas y de qué tamaño:",
    },
    {
      titulo: "Rejas",
      descripcion: "Rejas para ventanas, balcones y puertas, fabricadas a medida.",
      imagenes: [{ src: "/ejemplo/servicio-rejas.jpg", alt: "Soldador con careta trabajando en una puerta metálica" }],
      mensajeWhatsapp: "Hola Martín, quiero presupuesto para una reja. Te envío una foto de la ventana:",
    },
    {
      titulo: "Reparaciones a domicilio",
      descripcion: "Arreglamos persianas, ventanas y puertas de aluminio en tu casa.",
      contenido: [
        "Persianas que no suben, ventanas que no corren o no cierran, puertas de aluminio descolgadas: vamos a tu casa, vemos qué le pasa y lo arreglamos.",
        "Antes de cambiar nada, te decimos si compensa reparar.",
      ],
      incluye: ["Visita a domicilio", "Diagnóstico", "Reparación"],
      imagenes: [{ src: "/ejemplo/trabajo-persiana-antes.jpg", alt: "Persiana de aluminio caída y torcida en una fachada" }],
      mensajeWhatsapp: "Hola Martín, necesito una reparación. Te envío una foto y te cuento qué le pasa:",
    },
  ],
  resenas: [
    {
      autor: "Denise P.",
      texto: "Excelente servicio",
      puntuacion: 5,
      fecha: "2026-08",
      fuente: "google",
    },
    {
      autor: "GolfR",
      texto:
        "Acudí recomendado para colocar ventana climalit y persiana en salón comedor y habitación y la verdad muy contento con el trato y el precio sin duda volveré.",
      puntuacion: 5,
      fecha: "2025-11",
      fuente: "google",
    },
    {
      autor: "Víctor B.",
      texto:
        "Muy recomendable. Necesitaba un arreglo con una puerta de aluminio y la atención fue rápida, bastante bien de precio y muy profesional. Ha quedado perfecto.",
      puntuacion: 5,
      fecha: "2024-10",
      fuente: "google",
    },
    {
      autor: "Chelo",
      texto: "Lo mejor en este oficio",
      puntuacion: 5,
      fecha: "2024-10",
      fuente: "google",
    },
    {
      autor: "LS",
      texto:
        "Muy buenos profesionales. Se preocupan de que el cliente reciba un acabado perfecto y al detalle. Sin duda, volveré a contratarlos.",
      puntuacion: 5,
      fecha: "2023-10",
      fuente: "google",
    },
    {
      autor: "Inma M.",
      texto: "Profesionales y de calidad...",
      puntuacion: 5,
      fecha: "2021-10",
      fuente: "google",
    },
  ],
  // Pasos propios: los del template prometen presupuesto por escrito, limpieza y garantía sin validar.
  proceso: [
    { titulo: "Nos cuentas", texto: "Por WhatsApp, por teléfono o en el local: qué necesitas y, si puedes, una foto." },
    { titulo: "Medición", texto: "Vamos a tu casa, medimos los huecos y vemos qué hace falta." },
    { titulo: "Presupuesto", texto: "Te damos el presupuesto sin compromiso." },
    { titulo: "Fabricación e instalación", texto: "Fabricamos a la medida de tus huecos y lo instalamos nosotros." },
  ],
  garantias: [
    "Presupuestos sin compromiso",
    "Fabricación e instalación propias",
    "Servicio a domicilio",
    "Exposición en nuestro local de la calle Sagunt",
  ],
  empresa: {
    historia: [
      "Talleres Martín es una carpintería de aluminio de La Zaïdia, en la calle Sagunt. Desde 1997 fabricamos, vendemos e instalamos ventanas, persianas, puertas, mosquiteras y rejas.",
      "Trato directo con Martín, de la medición a la instalación. En el local tienes la exposición para ver los acabados antes de decidir.",
    ],
    imagenes: [
      { src: f("001-fachada-y-escaparate-de-talleres-martin"), alt: "Rótulo y escaparate de Talleres Martín en la calle Sagunt de València" },
      { src: "/ejemplo/empresa-taller.jpg", alt: "Taller de aluminio con perfiles y máquina de corte" },
    ],
    equipo: [{ nombre: "Martín" }],
  },
  preguntas: [
    {
      pregunta: "¿Cobráis por dar presupuesto?",
      respuesta: "No. Los presupuestos son sin compromiso: cuéntanos qué necesitas por WhatsApp o por teléfono.",
    },
    {
      pregunta: "¿Venís a casa?",
      respuesta: "Sí. Vamos a medir, a instalar y también a hacer reparaciones a domicilio.",
    },
    {
      pregunta: "¿Puedo ver los acabados antes?",
      respuesta: "Sí, en la exposición del local, en la calle Sagunt 149 (La Zaïdia).",
    },
  ],
  seo: {
    titulo: "Carpintería de aluminio en València | Talleres Martín",
    descripcion:
      "Ventanas Climalit, persianas, puertas de aluminio, mosquiteras y rejas a medida en València. Reparaciones a domicilio. Desde 1997 en la calle Sagunt.",
    url: "https://web-talleres-martin-valencia-s-l.vercel.app", // Provisional: corregir con la URL real de Vercel (paso 12)
  },
});
