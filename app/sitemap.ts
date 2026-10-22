import type { MetadataRoute } from "next";
import { crearSitemap } from "@andrei-leads/core";
import config from "@/site.config";

// Vacío mientras `seo.indexar` no sea true.
export default function sitemap(): MetadataRoute.Sitemap {
  return crearSitemap(config);
}
