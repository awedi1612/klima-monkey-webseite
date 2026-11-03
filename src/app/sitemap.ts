import type { MetadataRoute } from "next";
import { services, siteConfig } from "@/lib/site-config";
import { ratgeber } from "@/lib/ratgeber";
import { standorte } from "@/lib/standorte";

export default function sitemap(): MetadataRoute.Sitemap {
  const eintrag = (path: string, priority: number) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  });

  const staticRoutes = ["", "/ueber-uns", "/leistungen", "/referenzen", "/standorte", "/monkeys", "/kontakt", "/spiel"].map(
    (path) => eintrag(path, path === "" ? 1 : 0.8)
  );

  const serviceRoutes = services.map((service) => eintrag(`/leistungen/${service.slug}`, 0.7));

  const ratgeberRoutes = ratgeber.map((artikel) =>
    eintrag(`/leistungen/${artikel.parent}/${artikel.slug}`, 0.6)
  );

  // Standortseiten sind Verkaufsseiten und bekommen Vorrang vor den Ratgebern
  const standortRoutes = standorte.map((standort) => eintrag(`/standorte/${standort.slug}`, 0.8));

  return [...staticRoutes, ...serviceRoutes, ...standortRoutes, ...ratgeberRoutes];
}
