import type { MetadataRoute } from "next";
import { crearRobots } from "@andrei-leads/core";
import config from "@/site.config";

// `Disallow: /` mientras `seo.indexar` no sea true.
export default function robots(): MetadataRoute.Robots {
  return crearRobots(config);
}
